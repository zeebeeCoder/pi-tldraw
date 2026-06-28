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
	/** Project working directory the canvases belong to. Shown in the host UI. */
	cwd?: string
	/** Directory where canvas snapshots are persisted. Shown in the host UI. */
	canvasDir?: string
	onAutoSave?(input: {
		canvasId: string
		state: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }
		source?: string
	}): Promise<void>
	onRestore?(canvasId: string): Promise<{ shapes: unknown[]; assets?: unknown[]; bindings?: unknown[] } | null>
}

const ROUTES = [
	{ method: 'GET', path: '/', key: 'host' },
	{ method: 'GET', path: '/static/app-bridge-bundle.js', key: 'bridgeBundle' },
	{ method: 'GET', path: '/api/config', key: 'config' },
	{ method: 'GET', path: '/api/status', key: 'status' },
	{ method: 'POST', path: '/api/log', key: 'log' },
	{ method: 'GET', path: '/api/next', key: 'next' },
	{ method: 'POST', path: '/api/autosave', key: 'autosave' },
	{ method: 'GET', path: '/api/restore', key: 'restore' },
	{ method: 'POST', path: '/api/result', key: 'result' },
] as const

type RouteKey = (typeof ROUTES)[number]['key']

const routeFor = (method: string | undefined, path: string): RouteKey | null =>
	ROUTES.find((route) => route.method === method && route.path === path)?.key ?? null

export function createCanvasHost(
	pi: ExtensionAPI,
	endpoint: string,
	resourceUri: string,
	opts: CanvasHostOptions = {}
) {
	const cwd = opts.cwd
	const canvasDir = opts.canvasDir
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

	const routeHandlers: Record<RouteKey, (req: IncomingMessage, res: ServerResponse, reqUrl: URL) => Promise<void> | void> = {
		host: async (_req, res) => {
			const path = fileURLToPath(new URL('../../static/host.html', import.meta.url))
			const body = await readFile(path, 'utf8')
			return send(res, 200, body, 'text/html; charset=utf-8')
		},
		bridgeBundle: async (_req, res) => {
			const path = fileURLToPath(new URL('../../static/app-bridge-bundle.js', import.meta.url))
			const body = await readFile(path, 'utf8')
			return send(res, 200, body, 'application/javascript; charset=utf-8')
		},
		config: (_req, res) => sendJson(res, { endpoint, resourceUri, cwd, canvasDir }),
		status: (_req, res) => sendJson(res, getStatus()),
		log: async (req, res) => {
			const body = (await readJson(req)) as { level?: string; message?: string }
			appendLog(`${body.level ?? 'log'} ${body.message ?? ''}`)
			return sendJson(res, { ok: true })
		},
		next: (_req, res) => {
			lastPollAt = Date.now()
			const next = queue.shift() ?? null
			if (next) appendLog(`dequeued ${next.id}: canvasId=${next.canvasId ?? 'new'}`)
			return sendJson(res, next)
		},
		autosave: async (req, res) => {
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
		},
		restore: async (_req, res, reqUrl) => {
			const restoreCanvasId = reqUrl.searchParams.get('canvasId')
			if (!restoreCanvasId) return sendJson(res, { ok: false, error: 'Missing canvasId' }, 400)
			if (!opts.onRestore) return sendJson(res, { ok: false, error: 'No restore handler' }, 501)
			try {
				const snapshot = await opts.onRestore(restoreCanvasId)
				if (!snapshot) {
					appendLog(`restore ${restoreCanvasId}: no saved snapshot`)
					return sendJson(res, { ok: false, error: 'No saved snapshot' }, 404)
				}
				appendLog(`restore ${restoreCanvasId}: ${Array.isArray(snapshot.shapes) ? snapshot.shapes.length : 0} shape(s)`)
				return sendJson(res, { ok: true, snapshot })
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error)
				appendLog(`restore ${restoreCanvasId}: error ${message}`)
				return sendJson(res, { ok: false, error: message }, 500)
			}
		},
		result: async (req, res) => {
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
		},
	}

	async function handleRequest(req: IncomingMessage, res: ServerResponse) {
		try {
			const reqUrl = new URL(req.url ?? '/', 'http://127.0.0.1')
			const route = routeFor(req.method, reqUrl.pathname)
			if (!route) return send(res, 404, 'Not found', 'text/plain; charset=utf-8')
			return await routeHandlers[route](req, res, reqUrl)
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

async function readJson(req: IncomingMessage): Promise<unknown> {
	let body = ''
	for await (const chunk of req) body += chunk
	return body ? JSON.parse(body) : null
}
