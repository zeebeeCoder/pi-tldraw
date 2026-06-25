import type { ExtensionAPI } from '@earendil-works/pi-coding-agent'
import { randomUUID } from 'node:crypto'
import { Type } from 'typebox'
import { createCanvasHost } from './local-host'
import {
	getCanvasDir,
	getCurrentCanvasId as getStoredCurrentCanvasId,
	listCanvasSnapshots,
	loadCanvasSnapshot,
	saveCanvasSnapshot,
	setCurrentCanvasId as setStoredCurrentCanvasId,
} from './project-store'
import { createMcpServerManager } from './server-manager'

const DEFAULT_ENDPOINT = 'http://127.0.0.1:8787/mcp'
const MCP_PROTOCOL_VERSION = '2025-06-18'
const CANVAS_RESOURCE_URI = 'ui://show-canvas/mcp-app.html'

type JsonRpcResponse<T = unknown> = {
	jsonrpc: '2.0'
	id?: string | number
	result?: T
	error?: { code: number; message: string; data?: unknown }
}

type McpTool = {
	name: string
	title?: string
	description?: string
	inputSchema?: unknown
	_meta?: unknown
}

type McpResource = {
	uri: string
	name?: string
	title?: string
	description?: string
	mimeType?: string
}

class TldrawMcpClient {
	private sessionId: string | null = null
	private nextId = 1

	constructor(
		private readonly endpoint: string,
		private readonly ensureServer?: (signal?: AbortSignal) => Promise<void>
	) {}

	async initialize(signal?: AbortSignal) {
		if (this.sessionId) return
		await this.ensureServer?.(signal)

		const { response, payload } = await this.post<JsonRpcResponse>(
			{
				jsonrpc: '2.0',
				id: this.nextId++,
				method: 'initialize',
				params: {
					protocolVersion: MCP_PROTOCOL_VERSION,
					capabilities: {},
					clientInfo: { name: 'pi-tldraw', version: '0.0.1' },
				},
			},
			signal
		)

		const sessionId = response.headers.get('mcp-session-id')
		if (!sessionId) {
			throw new Error('tldraw MCP initialize succeeded but did not return mcp-session-id')
		}
		if (payload.error) throw new Error(payload.error.message)

		this.sessionId = sessionId
		await this.notifyInitialized(signal)
	}

	async listTools(signal?: AbortSignal): Promise<McpTool[]> {
		const result = await this.request<{ tools?: McpTool[] }>('tools/list', {}, signal)
		return result.tools ?? []
	}

	async listResources(signal?: AbortSignal): Promise<McpResource[]> {
		const result = await this.request<{ resources?: McpResource[] }>('resources/list', {}, signal)
		return result.resources ?? []
	}

	async callTool(name: string, args: Record<string, unknown>, signal?: AbortSignal) {
		return this.request('tools/call', { name, arguments: args }, signal)
	}

	async readResource(uri: string, signal?: AbortSignal) {
		return this.request('resources/read', { uri }, signal)
	}

	reset() {
		this.sessionId = null
	}

	private async notifyInitialized(signal?: AbortSignal) {
		await this.post(
			{
				jsonrpc: '2.0',
				method: 'notifications/initialized',
			},
			signal,
			{ sessionId: this.sessionId }
		)
	}

	private async request<T = unknown>(method: string, params: unknown, signal?: AbortSignal): Promise<T> {
		await this.initialize(signal)
		const { payload } = await this.post<JsonRpcResponse<T>>(
			{
				jsonrpc: '2.0',
				id: this.nextId++,
				method,
				params,
			},
			signal,
			{ sessionId: this.sessionId }
		)
		if (payload.error) throw new Error(payload.error.message)
		return payload.result as T
	}

	private async post<T>(body: unknown, signal?: AbortSignal, opts?: { sessionId?: string | null }) {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/event-stream',
		}
		if (opts?.sessionId) headers['mcp-session-id'] = opts.sessionId

		const response = await fetch(this.endpoint, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
			signal,
		})
		const text = await response.text()
		if (!response.ok) {
			throw new Error(`MCP HTTP ${response.status}: ${text}`)
		}
		return { response, payload: parseMcpResponse<T>(text) }
	}
}

function parseMcpResponse<T>(text: string): T {
	const trimmed = text.trim()
	if (!trimmed) return undefined as T
	if (trimmed.startsWith('{') || trimmed.startsWith('[')) return JSON.parse(trimmed) as T

	// Streamable HTTP responses commonly come back as SSE: `event: message\ndata: {...}`.
	for (const line of trimmed.split(/\r?\n/)) {
		if (!line.startsWith('data:')) continue
		return JSON.parse(line.slice('data:'.length).trim()) as T
	}

	throw new Error(`Could not parse MCP response: ${trimmed.slice(0, 200)}`)
}

function compactToolList(tools: McpTool[]) {
	return tools.map((tool) => {
		const appOnly = JSON.stringify(tool._meta ?? {}).includes('"app"')
		return `- ${tool.name}${tool.title ? ` (${tool.title})` : ''}${appOnly ? ' [app-only]' : ''}`
	})
}

function extractTextContent(result: any): string {
	const content = result?.content
	if (!Array.isArray(content)) return JSON.stringify(result, null, 2)
	return content
		.map((item) => {
			if (item?.type === 'text' && typeof item.text === 'string') return item.text
			return JSON.stringify(item)
		})
		.join('\n')
}

function isBlockedTool(name: string) {
	return name === 'exec' || name.startsWith('_') || name === 'save_checkpoint' || name === 'read_checkpoint'
}

function parseCanvasIdFromText(text: string) {
	return text.match(/Canvas ID: ([^\s]+)/)?.[1]
}

function parseCanvasIdFromResult(result: unknown) {
	return parseCanvasIdFromText(extractTextContent(result as any))
}

function extractReturnValue(result: any): any {
	const text = extractTextContent(result)
	const marker = 'Return value:\n'
	const start = text.indexOf(marker)
	if (start === -1) return undefined
	const afterMarker = text.slice(start + marker.length)
	const end = afterMarker.indexOf('\n\nCanvas ID:')
	const json = (end === -1 ? afterMarker : afterMarker.slice(0, end)).trim()
	if (!json) return undefined
	try {
		return JSON.parse(json)
	} catch {
		return undefined
	}
}

function summarizeSnapshot(snapshot: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }) {
	const shapeCount = Array.isArray(snapshot.shapes) ? snapshot.shapes.length : 0
	const assetCount = Array.isArray(snapshot.assets) ? snapshot.assets.length : 0
	const bindingCount = Array.isArray(snapshot.bindings) ? snapshot.bindings.length : 0
	return `${shapeCount} shape(s), ${assetCount} asset(s), ${bindingCount} binding(s)`
}

const READ_CANVAS_STATE_CODE = `
const shapes = editor.getCurrentPageShapes()
const assets = typeof editor.getAssets === 'function' ? editor.getAssets() : []
let bindings = []
try {
	for (const shape of shapes) {
		const shapeId = shape.shapeId ?? shape.id
		if (!shapeId || typeof editor.getBindingsFromShape !== 'function') continue
		const shapeBindings = editor.getBindingsFromShape(shapeId, 'arrow') ?? []
		bindings.push(...shapeBindings)
	}
} catch {
	bindings = []
}
return { shapes, assets, bindings }
`

function createProjectCanvasId() {
	return randomUUID().replace(/-/g, '').slice(0, 8)
}

const INITIALIZE_CANVAS_CODE = 'return { initialized: true }'

function restoreCanvasCode(snapshot: { shapes?: unknown[] }) {
	const shapes = Array.isArray(snapshot.shapes) ? snapshot.shapes : []
	return `
const snapshotShapes = ${JSON.stringify(shapes)}
const currentShapes = editor.getCurrentPageShapes()
const currentIds = currentShapes.map((shape) => shape.shapeId ?? shape.id).filter(Boolean)
if (currentIds.length) editor.deleteShapes(currentIds)
const nonArrows = snapshotShapes.filter((shape) => (shape._type ?? shape.type) !== 'arrow')
const arrows = snapshotShapes.filter((shape) => (shape._type ?? shape.type) === 'arrow')
for (const shape of nonArrows) editor.createShape(shape)
for (const shape of arrows) editor.createShape(shape)
const restoredIds = snapshotShapes.map((shape) => shape.shapeId ?? shape.id).filter(Boolean)
if (restoredIds.length) {
	editor.select(...restoredIds)
	editor.zoomToSelection()
	editor.selectNone()
}
return { restored: snapshotShapes.length, shapeIds: restoredIds }
`
}

export default function (pi: ExtensionAPI) {
	const endpoint = process.env.TLDRAW_MCP_URL || DEFAULT_ENDPOINT
	const serverManager = createMcpServerManager(endpoint)
	const client = new TldrawMcpClient(endpoint, serverManager.ensure)
	let sessionCwd = process.cwd()
	let sessionCanvasId: string | undefined
	const canvasHost = createCanvasHost(pi, endpoint, CANVAS_RESOURCE_URI, {
		async onAutoSave({
			canvasId,
			state,
		}: {
			canvasId: string
			state: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }
		}) {
			const saved = await saveCanvasSnapshot(sessionCwd, canvasId, state)
			await rememberCanvasId(sessionCwd, saved.canvasId)
		},
	})

	async function resolveCanvasId(cwd: string, explicitCanvasId?: string) {
		return explicitCanvasId ?? sessionCanvasId ?? (await getStoredCurrentCanvasId(cwd))
	}

	async function rememberCanvasId(cwd: string, canvasId: string) {
		sessionCanvasId = canvasId
		await setStoredCurrentCanvasId(cwd, canvasId)
	}

	/**
	 * Open the browser host if needed and restore the project snapshot into a
	 * freshly spawned (blank) window. If a browser is already connected, the
	 * live canvas is left untouched so the user's in-progress edits survive —
	 * this is what makes pair diagramming work: Pi and the user share one canvas.
	 */
	async function ensureBrowserAndRestore(
		cwd: string,
		canvasId: string | undefined,
		signal?: AbortSignal,
		opts: { restore?: boolean } = {}
	) {
		const { url, spawned } = await canvasHost.open(signal)
		let resolvedId = await resolveCanvasId(cwd, canvasId)
		let restoreText = spawned
			? 'No project canvas restored.'
			: 'Browser already open; live canvas unchanged.'
		// Only restore when we just spawned a fresh (blank) browser window.
		if (spawned && opts.restore !== false) {
			if (!resolvedId) resolvedId = createProjectCanvasId()
			const snapshot = await loadCanvasSnapshot(cwd, resolvedId)
			if (snapshot) {
				await canvasHost.execOnCanvas(
					{ code: restoreCanvasCode(snapshot), canvasId: snapshot.canvasId },
					signal
				)
				await rememberCanvasId(cwd, snapshot.canvasId)
				restoreText = `Restored project canvas ${snapshot.canvasId} (${summarizeSnapshot(snapshot)}). Autosave is on.`
			} else {
				await canvasHost.execOnCanvas(
					{ code: INITIALIZE_CANVAS_CODE, canvasId: resolvedId },
					signal
				)
				await rememberCanvasId(cwd, resolvedId)
				restoreText = `Started new project canvas ${resolvedId}. Autosave is on.`
			}
		}
		return { url, spawned, resolvedId, restoreText }
	}

	async function snapshotLiveCanvas(
		cwd: string,
		canvasId: string | undefined,
		signal?: AbortSignal,
		opts?: { allowEmptyOverwrite?: boolean }
	) {
		const hostStatus = canvasHost.getStatus()
		if (!hostStatus.browserConnected) {
			throw new Error(
				`No live browser canvas is connected. Open the canvas tab with /tldraw open, wait for "Canvas ready", then save again. Host: ${hostStatus.url ?? 'not started'}`
			)
		}
		const result: any = await canvasHost.execOnCanvas(
			{ code: READ_CANVAS_STATE_CODE, canvasId, timeoutMs: 60_000 },
			signal
		)
		const text = extractTextContent(result)
		const returnedCanvasId = parseCanvasIdFromText(text) ?? canvasId
		if (!returnedCanvasId) throw new Error('Could not determine canvasId from live canvas read.')
		const state = result?.structuredContent ?? extractReturnValue(result)
		const saved = await saveCanvasSnapshot(
			cwd,
			returnedCanvasId,
			{
				shapes: Array.isArray(state?.shapes) ? state.shapes : [],
				assets: Array.isArray(state?.assets) ? state.assets : [],
				bindings: Array.isArray(state?.bindings) ? state.bindings : [],
			},
			{ allowEmptyOverwrite: opts?.allowEmptyOverwrite }
		)
		await rememberCanvasId(cwd, returnedCanvasId)
		return saved
	}

	pi.registerTool({
		name: 'tldraw_status',
		label: 'tldraw MCP Status',
		description:
			'Check the configured tldraw MCP server, list exposed MCP tools, and report whether the canvas app resource is available.',
		promptSnippet: 'Check local tldraw MCP server health and list its tools/resources.',
		parameters: Type.Object({}),
		async execute(_toolCallId, _params, signal) {
			const [tools, resources] = await Promise.all([
				client.listTools(signal),
				client.listResources(signal),
			])
			const hasCanvas = resources.some((resource) => resource.uri === CANVAS_RESOURCE_URI)
			const text = [
				`tldraw MCP endpoint: ${endpoint}`,
				`Tools: ${tools.length}`,
				...compactToolList(tools),
				`Resources: ${resources.length}`,
				...resources.map((resource) => `- ${resource.uri}${resource.title ? ` (${resource.title})` : ''}`),
				hasCanvas
					? 'Canvas app resource is available. It still needs an MCP app-capable host to render the iframe.'
					: 'Canvas app resource was not advertised.',
			].join('\n')
			return { content: [{ type: 'text', text }], details: { endpoint, tools, resources, hasCanvas } }
		},
	})

	pi.registerTool({
		name: 'tldraw_search',
		label: 'tldraw MCP Search',
		description:
			'Call the tldraw MCP search tool. This is read-only and works without rendering the canvas widget.',
		promptSnippet: 'Search the tldraw Editor API exposed by the local tldraw MCP server.',
		promptGuidelines: [
			'Use tldraw_search to inspect tldraw Editor APIs before proposing canvas execution code.',
		],
		parameters: Type.Object({
			code: Type.String({
				description:
					'JavaScript code for the MCP search tool. It receives `spec`; use `return` to produce output.',
			}),
		}),
		async execute(_toolCallId, params, signal) {
			const result = await client.callTool('search', { code: params.code }, signal)
			return {
				content: [{ type: 'text', text: extractTextContent(result) }],
				details: { endpoint, mcpTool: 'search', result },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_read_canvas_resource',
		label: 'Read tldraw MCP Canvas Resource',
		description:
			'Read metadata for the tldraw MCP canvas app resource. This proves the artifact HTML is exposed, but Pi does not render MCP app iframes yet.',
		parameters: Type.Object({}),
		async execute(_toolCallId, _params, signal) {
			const result: any = await client.readResource(CANVAS_RESOURCE_URI, signal)
			const html = result?.contents?.[0]?.text
			const text = [
				`Resource: ${CANVAS_RESOURCE_URI}`,
				`HTML bytes: ${typeof html === 'string' ? html.length : 0}`,
				'Pi can fetch this MCP app resource, but this terminal session does not mount the iframe.',
				'To see drawings, open the same MCP server from an MCP client that supports app resources.',
			].join('\n')
			return {
				content: [{ type: 'text', text }],
				details: { endpoint, resourceUri: CANVAS_RESOURCE_URI, htmlBytes: typeof html === 'string' ? html.length : 0 },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_open',
		label: 'Open tldraw Canvas Host',
		description:
			'Open a local browser host that renders the tldraw MCP app iframe and bridges it to Pi. Optionally restore a project-scoped saved canvas.',
		parameters: Type.Object({
			canvasId: Type.Optional(
				Type.String({ description: 'Project canvas ID to restore. Omit to use the current project canvas if one exists.' })
			),
			restore: Type.Optional(
				Type.Boolean({ description: 'Whether to restore the project snapshot after opening. Defaults to true.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			const { url, restoreText } = await ensureBrowserAndRestore(cwd, params.canvasId, signal, {
				restore: params.restore !== false,
			})
			return {
				content: [
					{
						type: 'text',
						text: `Opened local tldraw canvas host: ${url}\n${restoreText}\nKeep that browser tab open while using tldraw_canvas_exec.`,
					},
				],
				details: { url, status: canvasHost.getStatus(), currentCanvasId: sessionCanvasId },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_exec',
		label: 'Execute on tldraw Canvas',
		description:
			'Execute JavaScript on the visible local tldraw canvas host. This starts/opens a browser bridge if needed, then sends code to the tldraw MCP exec app tool.',
		promptSnippet: 'Draw or update a visible tldraw canvas through the local browser bridge.',
		promptGuidelines: [
			'Use tldraw_canvas_exec when the user asks to create a visible tldraw diagram from Pi.',
			'Use focused shape objects with editor.createShape({ _type, shapeId, x, y, w, h, text, color, fill }) in tldraw_canvas_exec code.',
			'Use createArrowBetweenShapes(fromId, toId, { text }) in tldraw_canvas_exec code to connect diagram boxes.',
		],
		parameters: Type.Object({
			code: Type.String({
				description:
					'JavaScript code to run in the tldraw MCP app iframe. It has editor and helpers like createArrowBetweenShapes and boxShapes.',
			}),
			canvasId: Type.Optional(
				Type.String({ description: 'Canvas ID returned by an earlier tldraw MCP exec result.' })
			),
			open: Type.Optional(
				Type.Boolean({ description: 'Whether to open/focus the local browser host before executing.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			let started: { url: string | null; port?: number | null; spawned?: boolean }
			let canvasId: string | undefined
			if (params.open === false) {
				started = await canvasHost.ensureStarted(signal)
				canvasId = await resolveCanvasId(cwd, params.canvasId)
			} else {
				const opened = await ensureBrowserAndRestore(cwd, params.canvasId, signal)
				started = opened
				canvasId = opened.resolvedId
			}
			const result = await canvasHost.execOnCanvas(
				{ code: params.code, canvasId },
				signal
			)
			const resultText = extractTextContent(result)
			const returnedCanvasId = parseCanvasIdFromResult(result) ?? canvasId
			let saveText = 'Project snapshot was not saved.'
			if (returnedCanvasId) {
				await rememberCanvasId(cwd, returnedCanvasId)
				try {
					const snapshot = await snapshotLiveCanvas(cwd, returnedCanvasId, signal)
					saveText = `Saved project snapshot ${snapshot.canvasId} to ${getCanvasDir(cwd)} (${summarizeSnapshot(snapshot)}).`
				} catch (error) {
					saveText = `Could not save project snapshot: ${error instanceof Error ? error.message : String(error)}`
				}
			}
			return {
				content: [
					{
						type: 'text',
						text: `Executed code on local tldraw canvas host: ${started.url}\n\n${resultText}\n\n${saveText}`,
					},
				],
				details: { endpoint, host: canvasHost.getStatus(), canvasId: returnedCanvasId, result },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_state',
		label: 'Inspect tldraw Canvas State',
		description:
			'Read the visible tldraw canvas state through the local browser host and optionally save it to the project-scoped .pi/tldraw-canvases store.',
		promptSnippet: 'Inspect the current visible tldraw canvas shapes without changing the drawing.',
		parameters: Type.Object({
			canvasId: Type.Optional(
				Type.String({ description: 'Canvas ID to read. Omit to use the current project canvas.' })
			),
			save: Type.Optional(
				Type.Boolean({ description: 'Whether to save the snapshot to .pi/tldraw-canvases. Defaults to true.' })
			),
			open: Type.Optional(
				Type.Boolean({ description: 'Whether to open/focus the local browser host before reading.' })
			),
			force: Type.Optional(
				Type.Boolean({ description: 'Allow overwriting a non-empty saved snapshot with an empty live canvas.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			let started: { url: string | null; port?: number | null; spawned?: boolean }
			if (params.open === true) {
				started = await ensureBrowserAndRestore(cwd, params.canvasId, signal)
			} else {
				started = await canvasHost.ensureStarted(signal)
			}
			if (!canvasHost.getStatus().browserConnected) {
				throw new Error('No live browser canvas is connected. Use /tldraw open first, wait for Canvas ready, then inspect/save.')
			}
			const canvasId = await resolveCanvasId(cwd, params.canvasId)
			const result: any = await canvasHost.execOnCanvas(
				{ code: READ_CANVAS_STATE_CODE, canvasId },
				signal
			)
			const returnedCanvasId = parseCanvasIdFromResult(result) ?? canvasId
			const state = extractReturnValue(result) ?? {}
			let saveText = 'Snapshot not saved.'
			if (params.save !== false && returnedCanvasId) {
				const snapshot = await saveCanvasSnapshot(
					cwd,
					returnedCanvasId,
					{
						shapes: Array.isArray(state.shapes) ? state.shapes : [],
						assets: Array.isArray(state.assets) ? state.assets : [],
						bindings: Array.isArray(state.bindings) ? state.bindings : [],
					},
					{ allowEmptyOverwrite: params.force === true }
				)
				await rememberCanvasId(cwd, returnedCanvasId)
				saveText = `Saved project snapshot ${snapshot.canvasId} to ${getCanvasDir(cwd)} (${summarizeSnapshot(snapshot)}).`
			} else if (returnedCanvasId) {
				await rememberCanvasId(cwd, returnedCanvasId)
			}
			return {
				content: [
					{
						type: 'text',
						text: [
							`Canvas host: ${started.url}`,
							`Canvas ID: ${returnedCanvasId ?? 'none'}`,
							`State: ${summarizeSnapshot(state)}`,
							saveText,
						].join('\n'),
					},
				],
				details: { endpoint, host: canvasHost.getStatus(), canvasId: returnedCanvasId, state },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_call_readonly_tool',
		label: 'Call read-only tldraw MCP tool',
		description:
			'Experimental curated MCP bridge: call a non-app-only, non-exec tldraw MCP tool by name. Blocks exec and app-only checkpoint/callback tools.',
		parameters: Type.Object({
			toolName: Type.String({ description: 'MCP tool name to call, e.g. search' }),
			argsJson: Type.String({ description: 'Tool arguments as a JSON object string' }),
		}),
		async execute(_toolCallId, params, signal) {
			if (isBlockedTool(params.toolName)) {
				throw new Error(
					`Blocked ${params.toolName}: this Pi experiment only exposes read-only MCP calls. The tldraw MCP exec tool requires an MCP app iframe host.`
				)
			}
			const args = JSON.parse(params.argsJson)
			if (!args || typeof args !== 'object' || Array.isArray(args)) {
				throw new Error('argsJson must parse to a JSON object')
			}
			const result = await client.callTool(params.toolName, args, signal)
			return {
				content: [{ type: 'text', text: extractTextContent(result) }],
				details: { endpoint, mcpTool: params.toolName, result },
			}
		},
	})

	pi.registerCommand('tldraw', {
		description: 'Inspect/control tldraw MCP (/tldraw status|start|restart|tools|resource|open [canvasId]|save|canvases|current|host|reset).',
		handler: async (args, ctx) => {
			const parts = args.trim().split(/\s+/).filter(Boolean)
			const action = parts[0] || 'status'
			const force = action.endsWith('!') || parts.includes('--force')
			const normalizedAction = action.endsWith('!') ? action.slice(0, -1) : action
			const argCanvasId = parts.slice(1).find((part) => !part.startsWith('--'))
			try {
				if (normalizedAction === 'reset') {
					client.reset()
					ctx.ui.notify('tldraw MCP session reset.', 'info')
					return
				}
				if (normalizedAction === 'current') {
					const current = await getStoredCurrentCanvasId(ctx.cwd)
					ctx.ui.setWidget('tldraw-current', [
						'tldraw current canvas:',
						`cwd: ${ctx.cwd}`,
						`canvasId: ${sessionCanvasId ?? current ?? 'none'}`,
						`store: ${getCanvasDir(ctx.cwd)}`,
					])
					return
				}
				if (normalizedAction === 'canvases') {
					const canvases = await listCanvasSnapshots(ctx.cwd)
					ctx.ui.setWidget('tldraw-canvases', [
						`tldraw project canvases (${canvases.length}):`,
						`store: ${getCanvasDir(ctx.cwd)}`,
						...canvases.map(
							(entry: { canvasId: string; shapeCount: number; updatedAt: string }) =>
								`- ${entry.canvasId} · ${entry.shapeCount} shape(s) · ${entry.updatedAt || 'unknown time'}`
						),
					])
					return
				}
				if (normalizedAction === 'save') {
					ctx.ui.setStatus('tldraw', 'tldraw MCP: saving canvas')
					await serverManager.ensure(ctx.signal)
					const status = canvasHost.getStatus()
					if (!status.url) {
						throw new Error('Canvas host is not started. Use /tldraw open first, make edits, then /tldraw save.')
					}
					if (!status.browserConnected) {
						throw new Error(`No live browser canvas is connected at ${status.url}. Reopen with /tldraw open before saving.`)
					}
					const canvasId = await resolveCanvasId(ctx.cwd, argCanvasId)
					const snapshot = await snapshotLiveCanvas(ctx.cwd, canvasId, ctx.signal, { allowEmptyOverwrite: force })
					ctx.ui.notify(`Saved ${snapshot.canvasId} (${summarizeSnapshot(snapshot)})`, 'info')
					ctx.ui.setStatus('tldraw', `tldraw MCP: saved ${snapshot.canvasId}`)
					return
				}
				if (normalizedAction === 'start') {
					ctx.ui.setStatus('tldraw', 'tldraw MCP: starting')
					await serverManager.start(ctx.signal)
					ctx.ui.notify(`tldraw MCP server reachable at ${endpoint}`, 'info')
					ctx.ui.setStatus('tldraw', 'tldraw MCP: started')
					return
				}
				if (normalizedAction === 'restart') {
					ctx.ui.setStatus('tldraw', 'tldraw MCP: restarting')
					client.reset()
					await serverManager.restart(ctx.signal)
					ctx.ui.notify(`tldraw MCP server restarted at ${endpoint}`, 'info')
					ctx.ui.setStatus('tldraw', 'tldraw MCP: restarted')
					return
				}
				if (normalizedAction === 'tools') {
					const tools = await client.listTools(ctx.signal)
					ctx.ui.setWidget('tldraw', ['tldraw MCP tools:', ...compactToolList(tools)])
					return
				}
				if (normalizedAction === 'open') {
					ctx.ui.setStatus('tldraw', 'tldraw MCP: ensuring server')
					await serverManager.ensure(ctx.signal)
					const { url, restoreText } = await ensureBrowserAndRestore(ctx.cwd, argCanvasId, ctx.signal)
					ctx.ui.notify(`Opened tldraw canvas host: ${url}. ${restoreText}`, 'info')
					ctx.ui.setStatus('tldraw', `canvas host: ${url}`)
					return
				}
				if (normalizedAction === 'host') {
					const status = canvasHost.getStatus()
					const server = serverManager.getStatus()
					ctx.ui.setWidget('tldraw-host', [
						'tldraw canvas host:',
						`url: ${status.url ?? 'not started'}`,
						`browser connected: ${status.browserConnected ? 'yes' : 'no'}`,
						`queued: ${status.queued}`,
						`pending: ${status.pending}`,
						'canvas logs:',
						...status.logs.slice(-12),
						'',
						'tldraw MCP server:',
						`endpoint: ${server.endpoint}`,
						`auto start: ${server.autoStart ? 'yes' : 'no'}`,
						`managed pid: ${server.managedPid ?? 'none'}`,
						`app dir: ${server.appDir}`,
						...server.logs.slice(-8),
					])
					return
				}
				if (normalizedAction === 'resource') {
					const result: any = await client.readResource(CANVAS_RESOURCE_URI, ctx.signal)
					const bytes = typeof result?.contents?.[0]?.text === 'string' ? result.contents[0].text.length : 0
					ctx.ui.notify(`Canvas resource fetched (${bytes} bytes).`, 'info')
					return
				}
				const [tools, resources] = await Promise.all([
					client.listTools(ctx.signal),
					client.listResources(ctx.signal),
				])
				const server = serverManager.getStatus()
				ctx.ui.setStatus('tldraw', `tldraw MCP: ${tools.length} tools, ${resources.length} resources`)
				ctx.ui.notify(`tldraw MCP OK at ${endpoint}${server.managedPid ? ` (pid ${server.managedPid})` : ''}`, 'info')
			} catch (error) {
				ctx.ui.setStatus('tldraw', 'tldraw MCP: error')
				ctx.ui.notify(error instanceof Error ? error.message : String(error), 'error')
			}
		},
	})

	pi.on('session_start', async (_event, ctx) => {
		sessionCwd = ctx.cwd
		sessionCanvasId = await getStoredCurrentCanvasId(ctx.cwd)
		if (ctx.hasUI) {
			ctx.ui.setStatus(
				'tldraw',
				sessionCanvasId ? `tldraw MCP: lazy · canvas ${sessionCanvasId}` : 'tldraw MCP: lazy'
			)
		}
	})

	pi.on('session_shutdown', async () => {
		client.reset()
		await canvasHost.close()
		await serverManager.stop()
	})
}
