import { parseMcpResponse, type JsonRpcResponse } from './response'

export type McpTool = {
	name: string
	title?: string
	description?: string
	inputSchema?: unknown
	_meta?: unknown
}

export type McpResource = {
	uri: string
	name?: string
	title?: string
	description?: string
	mimeType?: string
}

const MCP_PROTOCOL_VERSION = '2025-06-18'

export class TldrawMcpClient {
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
