import type { ExtensionAPI } from '@earendil-works/pi-coding-agent'
import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import { fileURLToPath } from 'node:url'

interface CanvasExecRequest {
	id: string
	code: string
	canvasId?: string
	createdAt: number
}

interface PendingExec {
	resolve(value: unknown): void
	reject(error: Error): void
	timer: ReturnType<typeof setTimeout>
}

interface CanvasHostOptions {
	onAutoSave?(input: {
		canvasId: string
		state: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }
		source?: string
	}): Promise<void>
}

export function createCanvasHost(
	pi: ExtensionAPI,
	endpoint: string,
	resourceUri: string,
	opts: CanvasHostOptions = {}
) {
	let server: Server | null = null
	let url: string | null = null
	let port: number | null = null
	let lastPollAt = 0
	const logs: string[] = []
	const queue: CanvasExecRequest[] = []
	const pending = new Map<string, PendingExec>()

	async function ensureStarted(signal?: AbortSignal) {
		if (server && url) return { url, port: port! }

		server = createServer((req, res) => {
			void handleRequest(req, res)
		})

		await new Promise<void>((resolve, reject) => {
			server!.once('error', reject)
			server!.listen(0, '127.0.0.1', () => resolve())
		})

		const address = server.address()
		if (!address || typeof address === 'string') throw new Error('Could not determine canvas host port')
		port = address.port
		url = `http://127.0.0.1:${port}/`
		return { url, port }
	}

	async function open(signal?: AbortSignal) {
		const started = await ensureStarted(signal)
		// If a browser is already actively polling, reuse it instead of spawning
		// another tab. This keeps pair diagramming on one shared canvas and
		// prevents blank duplicate windows from appearing on repeated calls.
		if (Date.now() - lastPollAt < 3000) return { ...started, spawned: false }
		await pi.exec('open', [started.url], { signal, timeout: 5000 }).catch(() => undefined)
		return { ...started, spawned: true }
	}

	async function execOnCanvas(input: { code: string; canvasId?: string; timeoutMs?: number }, signal?: AbortSignal) {
		await ensureStarted(signal)
		const id = randomUUID()
		const timeoutMs = input.timeoutMs ?? 60_000
		const promise = new Promise<unknown>((resolve, reject) => {
			const timer = setTimeout(() => {
				pending.delete(id)
				removeQueued(id)
				appendLog(`timeout ${id}: no browser result after ${timeoutMs}ms`)
				reject(
					new Error(
						`tldraw canvas host timed out after ${timeoutMs}ms. Is ${url} open in a browser?`
					)
				)
			}, timeoutMs)
			pending.set(id, { resolve, reject, timer })
		})

		const abort = () => {
			const entry = pending.get(id)
			if (!entry) return
			clearTimeout(entry.timer)
			pending.delete(id)
			removeQueued(id)
			appendLog(`cancelled ${id}`)
			entry.reject(new Error('Cancelled'))
		}
		signal?.addEventListener('abort', abort, { once: true })

		queue.push({ id, code: input.code, canvasId: input.canvasId, createdAt: Date.now() })
		appendLog(`queued ${id}: canvasId=${input.canvasId ?? 'new'} codeBytes=${input.code.length}`)
		return promise.finally(() => signal?.removeEventListener('abort', abort))
	}

	function removeQueued(id: string) {
		const index = queue.findIndex((item) => item.id === id)
		if (index !== -1) queue.splice(index, 1)
	}

	function appendLog(message: string) {
		logs.push(`${new Date().toISOString()} ${message}`)
		while (logs.length > 200) logs.shift()
	}

	async function close() {
		for (const [id, entry] of pending) {
			clearTimeout(entry.timer)
			entry.reject(new Error('Canvas host closed'))
			pending.delete(id)
		}
		queue.splice(0)
		if (!server) return
		await new Promise<void>((resolve) => server!.close(() => resolve()))
		server = null
		url = null
		port = null
	}

	function getStatus() {
		return {
			url,
			port,
			queued: queue.length,
			pending: pending.size,
			lastPollAt,
			browserConnected: Date.now() - lastPollAt < 3000,
			logs: logs.slice(-80),
		}
	}

	async function handleRequest(req: IncomingMessage, res: ServerResponse) {
		try {
			const reqUrl = new URL(req.url ?? '/', 'http://127.0.0.1')
			if (req.method === 'GET' && reqUrl.pathname === '/') {
				return send(res, 200, hostHtml(), 'text/html; charset=utf-8')
			}
			if (req.method === 'GET' && reqUrl.pathname === '/static/app-bridge-bundle.js') {
				const path = fileURLToPath(new URL('./static/app-bridge-bundle.js', import.meta.url))
				const body = await readFile(path, 'utf8')
				return send(res, 200, body, 'application/javascript; charset=utf-8')
			}
			if (req.method === 'GET' && reqUrl.pathname === '/api/config') {
				return sendJson(res, { endpoint, resourceUri })
			}
			if (req.method === 'GET' && reqUrl.pathname === '/api/status') {
				return sendJson(res, getStatus())
			}
			if (req.method === 'POST' && reqUrl.pathname === '/api/log') {
				const body = (await readJson(req)) as { level?: string; message?: string }
				appendLog(`${body.level ?? 'log'} ${body.message ?? ''}`)
				return sendJson(res, { ok: true })
			}
			if (req.method === 'GET' && reqUrl.pathname === '/api/next') {
				lastPollAt = Date.now()
				const next = queue.shift() ?? null
				if (next) appendLog(`dequeued ${next.id}: canvasId=${next.canvasId ?? 'new'}`)
				return sendJson(res, next)
			}
			if (req.method === 'POST' && reqUrl.pathname === '/api/autosave') {
				const body = (await readJson(req)) as {
					canvasId?: string
					state?: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }
					source?: string
				}
				if (!body.canvasId) return sendJson(res, { ok: false, error: 'Missing canvasId' }, 400)
				if (!body.state || typeof body.state !== 'object') {
					return sendJson(res, { ok: false, error: 'Missing state' }, 400)
				}
				try {
					await opts.onAutoSave?.({
						canvasId: body.canvasId,
						state: body.state,
						source: body.source,
					})
					appendLog(
						`autosave ${body.canvasId}: shapes=${Array.isArray(body.state.shapes) ? body.state.shapes.length : 0}`
					)
					return sendJson(res, { ok: true })
				} catch (error) {
					const message = error instanceof Error ? error.message : String(error)
					appendLog(`autosave ${body.canvasId}: error ${message}`)
					return sendJson(res, { ok: false, error: message }, 409)
				}
			}
			if (req.method === 'POST' && reqUrl.pathname === '/api/result') {
				const body = (await readJson(req)) as { id?: string; ok?: boolean; result?: unknown; error?: string }
				if (!body.id) return sendJson(res, { ok: false, error: 'Missing id' }, 400)
				const entry = pending.get(body.id)
				if (!entry) {
					appendLog(`late result ${body.id}: no pending request`)
					return sendJson(res, { ok: false, error: 'No pending request for id' }, 404)
				}
				clearTimeout(entry.timer)
				pending.delete(body.id)
				if (body.ok) {
					appendLog(`result ${body.id}: ok`)
					entry.resolve(body.result)
				} else {
					appendLog(`result ${body.id}: error ${body.error ?? 'unknown'}`)
					entry.reject(new Error(body.error ?? 'Unknown canvas host error'))
				}
				return sendJson(res, { ok: true })
			}
			return send(res, 404, 'Not found', 'text/plain; charset=utf-8')
		} catch (error) {
			return sendJson(
				res,
				{ ok: false, error: error instanceof Error ? error.message : String(error) },
				500
			)
		}
	}

	return { ensureStarted, open, execOnCanvas, close, getStatus }
}

function sendJson(res: ServerResponse, value: unknown, status = 200) {
	return send(res, status, JSON.stringify(value, null, 2), 'application/json; charset=utf-8')
}

function send(res: ServerResponse, status: number, body: string, contentType: string) {
	res.writeHead(status, {
		'content-type': contentType,
		'cache-control': 'no-store',
	})
	res.end(body)
}

async function readJson(req: IncomingMessage) {
	let body = ''
	for await (const chunk of req) body += chunk
	return body ? JSON.parse(body) : null
}

function hostHtml() {
	return String.raw`<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Pi tldraw MCP host</title>
	<style>
		html, body { margin: 0; height: 100%; font-family: Inter, system-ui, sans-serif; }
		#bar { height: 36px; display: flex; align-items: center; gap: 12px; padding: 0 12px; border-bottom: 1px solid #ddd; background: #fafafa; font-size: 13px; }
		#status { color: #555; }
		#canvas { width: 100%; height: calc(100vh - 36px); border: 0; display: block; }
		button { font: inherit; }
	</style>
</head>
<body>
	<div id="bar">
		<strong>Pi tldraw MCP host</strong>
		<span id="status">Starting…</span>
		<button id="demo">Run demo</button>
	</div>
	<iframe id="canvas" allow="clipboard-write; fullscreen"></iframe>
	<script src="/static/app-bridge-bundle.js"></script>
	<script>
		const { AppBridge, PostMessageTransport } = window.McpAppsBridge

		const statusEl = document.getElementById('status')
		const iframe = document.getElementById('canvas')
		let bridge = null
		let ready = false
		let lastCanvasId = null
		// Start inline so the later fullscreen update is a real context change.
		// The tldraw MCP app initializes its React state to inline and only switches
		// when it receives an onhostcontextchanged notification.
		let displayMode = 'inline'

		function getHostContext() {
			return {
				theme: 'light',
				displayMode,
				availableDisplayModes: ['inline', 'fullscreen'],
				platform: 'desktop',
				containerDimensions: { width: window.innerWidth, height: Math.max(400, window.innerHeight - 36) },
			}
		}

		function setStatus(text) { statusEl.textContent = text; log('status', text) }
		function delay(ms) { return new Promise((resolve) => setTimeout(resolve, ms)) }
		function log(level, message) {
			console[level === 'error' ? 'error' : 'log']('[pi-tldraw-host]', message)
			fetch('/api/log', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ level, message: String(message) }) }).catch(() => {})
		}
		window.addEventListener('error', (event) => log('error', event.message + (event.filename ? ' @ ' + event.filename + ':' + event.lineno : '')))
		window.addEventListener('unhandledrejection', (event) => log('error', event.reason?.stack || event.reason?.message || event.reason))

		class McpHttpClient {
			constructor(endpoint) { this.endpoint = endpoint; this.sessionId = null; this.nextId = 1 }
			async initialize() {
				if (this.sessionId) return
				const { response, payload } = await this.post({
					jsonrpc: '2.0', id: this.nextId++, method: 'initialize',
					params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'pi-tldraw-browser-host', version: '0.0.1' } }
				})
				this.sessionId = response.headers.get('mcp-session-id')
				if (!this.sessionId) throw new Error('Missing mcp-session-id')
				if (payload.error) throw new Error(payload.error.message)
				await this.post({ jsonrpc: '2.0', method: 'notifications/initialized' })
			}
			async request(method, params) {
				await this.initialize()
				const { payload } = await this.post({ jsonrpc: '2.0', id: this.nextId++, method, params })
				if (payload.error) throw new Error(payload.error.message)
				return payload.result
			}
			async post(body) {
				const headers = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }
				if (this.sessionId) headers['mcp-session-id'] = this.sessionId
				const response = await fetch(this.endpoint, { method: 'POST', headers, body: JSON.stringify(body) })
				const text = await response.text()
				if (!response.ok) throw new Error('MCP HTTP ' + response.status + ': ' + text)
				return { response, payload: parseMcpResponse(text) }
			}
		}

		function parseMcpResponse(text) {
			const trimmed = text.trim()
			if (!trimmed) return undefined
			if (trimmed.startsWith('{') || trimmed.startsWith('[')) return JSON.parse(trimmed)
			for (const line of trimmed.split(/\r?\n/)) {
				if (line.startsWith('data:')) return JSON.parse(line.slice(5).trim())
			}
			throw new Error('Could not parse MCP response: ' + trimmed.slice(0, 200))
		}

		const fullscreenFixCss = [
			'html, body, #root { width: 100%; height: 100%; margin: 0; }',
			'.mcp-app__canvas-layout, .mcp-app__canvas-layout--fullscreen { height: 100vh !important; min-height: 100vh !important; max-height: none !important; }',
			'.mcp-app__canvas-layout--fullscreen { position: fixed !important; inset: 0 !important; width: 100vw !important; }',
			'.mcp-app__canvas-surface, .mcp-app__canvas-surface--fullscreen { height: auto !important; min-height: 0 !important; flex: 1 1 auto !important; }',
		].join('\n')

		function patchCanvasHtml(html) {
			const style = '<style id="pi-tldraw-host-fullscreen-fix">' + fullscreenFixCss + '</style>'
			return html.includes('</head>') ? html.replace('</head>', style + '</head>') : style + html
		}

		function installIframeFullscreenFix() {
			const inject = () => {
				const doc = iframe.contentDocument
				if (!doc?.head) return false
				let style = doc.getElementById('pi-tldraw-host-fullscreen-fix-live')
				if (!style) {
					style = doc.createElement('style')
					style.id = 'pi-tldraw-host-fullscreen-fix-live'
					doc.head.appendChild(style)
				}
				style.textContent = fullscreenFixCss
				return true
			}
			let attempts = 0
			const timer = setInterval(() => {
				attempts++
				inject()
				if (attempts > 80) clearInterval(timer)
			}, 100)
			iframe.addEventListener('load', inject)
			inject()
		}

		async function waitReady() {
			for (let i = 0; i < 200; i++) {
				if (ready) return
				await delay(100)
			}
			throw new Error('Timed out waiting for tldraw iframe to initialize')
		}

		async function init() {
			const config = await (await fetch('/api/config')).json()
			setStatus('Connecting to MCP…')
			const client = new McpHttpClient(config.endpoint)
			await client.initialize()

			setStatus('Fetching canvas resource…')
			const resource = await client.request('resources/read', { uri: config.resourceUri })
			let html = resource?.contents?.[0]?.text
			if (!html) throw new Error('Canvas resource did not contain HTML')
			html = patchCanvasHtml(html)

			bridge = new AppBridge(
				null,
				{ name: 'Pi tldraw host', version: '0.0.1' },
				{
					openLinks: {}, downloadFile: {}, logging: {},
					serverTools: { listChanged: true },
					serverResources: { listChanged: true },
					updateModelContext: { text: {}, structuredContent: {} },
					message: { text: {}, structuredContent: {} },
				},
				{ hostContext: getHostContext() }
			)
			bridge.oninitialized = () => {
				ready = true
				// The tldraw MCP app currently starts in inline mode even when the initial
				// host context says fullscreen. Flip to fullscreen after init and send the
				// notification a few times because the React handler may attach just after
				// the protocol initialization completes.
				displayMode = 'fullscreen'
				const sendFullscreenContext = () => {
					bridge.sendHostContextChange(getHostContext()).catch((err) => log('error', err?.message ?? err))
				}
				sendFullscreenContext()
				setTimeout(sendFullscreenContext, 100)
				setTimeout(sendFullscreenContext, 500)
				setTimeout(sendFullscreenContext, 1000)
				setStatus('Canvas ready')
			}
			bridge.onsizechange = () => {}
			bridge.oncalltool = (params) => client.request('tools/call', params)
			bridge.onlistresources = (params) => client.request('resources/list', params ?? {})
			bridge.onreadresource = (params) => client.request('resources/read', params)
			bridge.onlistresourcetemplates = async () => ({ resourceTemplates: [] })
			bridge.onmessage = async ({ content }) => { console.log('ui/message', content); return {} }
			bridge.onupdatemodelcontext = async (params) => { scheduleProjectAutoSave(params); return {} }
			bridge.onopenlink = async ({ url }) => { window.open(url, '_blank', 'noopener,noreferrer'); return {} }
			bridge.ondownloadfile = async () => ({})
			bridge.onrequestdisplaymode = async ({ mode }) => {
				displayMode = mode === 'fullscreen' ? 'fullscreen' : 'inline'
				bridge.setHostContext(getHostContext())
				return { mode: displayMode }
			}
			bridge.onloggingmessage = ({ level, data }) => console.log('[iframe]', level, data)

			const transport = new PostMessageTransport(iframe.contentWindow, iframe.contentWindow)
			await bridge.connect(transport)

			// Keep the iframe's WindowProxy object for PostMessageTransport source validation, but
			// use srcdoc instead of document.write so module scripts run consistently.
			iframe.srcdoc = html
			installIframeFullscreenFix()

			window.addEventListener('resize', () => {
				bridge.setHostContext(getHostContext())
			})

			pollLoop(client)
		}

		let autoSaveTimer = null
		let pendingAutoSave = null

		function scheduleProjectAutoSave(params) {
			const state = params?.structuredContent
			if (!lastCanvasId || !state || !Array.isArray(state.shapes)) return
			pendingAutoSave = {
				canvasId: lastCanvasId,
				state: {
					shapes: state.shapes,
					assets: Array.isArray(state.assets) ? state.assets : [],
					bindings: Array.isArray(state.bindings) ? state.bindings : [],
				},
				source: 'ui/update-model-context',
			}
			if (autoSaveTimer) clearTimeout(autoSaveTimer)
			autoSaveTimer = setTimeout(flushProjectAutoSave, 750)
		}

		async function flushProjectAutoSave() {
			const payload = pendingAutoSave
			pendingAutoSave = null
			autoSaveTimer = null
			if (!payload) return
			try {
				const response = await fetch('/api/autosave', {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify(payload),
				})
				const result = await response.json().catch(() => ({}))
				if (!response.ok || result.ok === false) throw new Error(result.error || 'autosave failed')
				log('status', 'Autosaved ' + payload.canvasId + ' · ' + payload.state.shapes.length + ' shape(s)')
			} catch (error) {
				log('error', 'Autosave failed: ' + String(error?.message ?? error))
			}
		}

		async function runExec(client, task) {
			await waitReady()
			const args = { code: task.code }
			if (task.canvasId || lastCanvasId) args.canvasId = task.canvasId || lastCanvasId

			setStatus('Running exec ' + task.id.slice(0, 8) + '…')
			const toolPromise = client.request('tools/call', { name: 'exec', arguments: args })
			// Give the server a moment to create its pending callback before the iframe calls _exec_callback.
			await delay(200)
			await bridge.sendToolInput({ arguments: args })
			const result = await toolPromise
			await bridge.sendToolResult(result).catch(() => {})

			const text = result?.content?.find?.((c) => c.type === 'text')?.text
			const match = typeof text === 'string' ? text.match(/Canvas ID: ([^\s]+)/) : null
			if (match) lastCanvasId = match[1]
			setStatus('Canvas ready' + (lastCanvasId ? ' · ' + lastCanvasId : ''))
			return result
		}

		async function pollLoop(client) {
			while (true) {
				try {
					const task = await (await fetch('/api/next')).json()
					if (!task) { await delay(500); continue }
					try {
						const result = await runExec(client, task)
						await fetch('/api/result', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: task.id, ok: true, result }) })
						// If the exec returned an error, the iframe's editor is now in a
						// broken state (error banner, editor disposed, never remounts).
						// Reload the host page to get a fresh iframe. The canvas state is
						// preserved — the next exec passes canvasId and the mcp-app
						// restores shapes from the server via _get_canvas_state.
						// This keeps the extension self-contained: no upstream patch needed.
						if (result?.isError) {
							log('status', 'Exec error, reloading host to recover...')
							setStatus('Recovering from error...')
							await delay(300)
							window.location.reload()
							return
						}
					} catch (error) {
						await bridge?.sendToolCancelled?.({ reason: String(error?.message ?? error) }).catch(() => {})
						await fetch('/api/result', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: task.id, ok: false, error: String(error?.message ?? error) }) })
						setStatus('Error: ' + String(error?.message ?? error))
					}
				} catch (error) {
					console.error(error)
					await delay(1000)
				}
			}
		}

		document.getElementById('demo').onclick = async () => {
			await fetch('/api/result', { method: 'POST', body: '{}' }).catch(() => {})
			const demoCode = "editor.createShape({ _type: 'rectangle', shapeId: 'pi', x: 120, y: 120, w: 280, h: 140, text: 'Pi extension', color: 'blue', fill: 'tint' });\neditor.createShape({ _type: 'rectangle', shapeId: 'canvas', x: 520, y: 120, w: 280, h: 140, text: 'tldraw canvas', color: 'green', fill: 'tint' });\ncreateArrowBetweenShapes('pi', 'canvas', { text: 'exec code' });"
			await runExec(new McpHttpClient((await (await fetch('/api/config')).json()).endpoint), { id: crypto.randomUUID(), code: demoCode })
		}

		init().catch((error) => { console.error(error); setStatus('Error: ' + error.message) })
	</script>
</body>
</html>`
}
