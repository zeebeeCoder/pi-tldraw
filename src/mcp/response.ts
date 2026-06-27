export type JsonRpcResponse<T = unknown> = {
	jsonrpc: '2.0'
	id?: string | number
	result?: T
	error?: { code: number; message: string; data?: unknown }
}

export type McpContentItem =
	| { type: 'text'; text: string }
	| Record<string, unknown>

export type McpToolResult = {
	content?: unknown
	structuredContent?: unknown
	[key: string]: unknown
}

export function parseMcpResponse<T>(text: string): T {
	const trimmed = text.trim()
	if (!trimmed) return undefined as T
	if (isJsonPayload(trimmed)) return JSON.parse(trimmed) as T

	const dataLine = trimmed.split(/\r?\n/).find((line) => line.startsWith('data:'))
	if (dataLine) return JSON.parse(dataLine.slice('data:'.length).trim()) as T

	throw new Error(`Could not parse MCP response: ${trimmed.slice(0, 200)}`)
}

const isJsonPayload = (text: string): boolean => text.startsWith('{') || text.startsWith('[')

export function extractTextContent(result: McpToolResult): string {
	const content = result.content
	if (!Array.isArray(content)) return JSON.stringify(result, null, 2)
	return content.map(contentItemText).join('\n')
}

function contentItemText(item: unknown): string {
	if (isTextContent(item)) return item.text
	return JSON.stringify(item)
}

const isTextContent = (item: unknown): item is { type: 'text'; text: string } =>
	Boolean(
		item &&
			typeof item === 'object' &&
			(item as Record<string, unknown>).type === 'text' &&
			typeof (item as Record<string, unknown>).text === 'string'
	)

export function parseCanvasIdFromText(text: string): string | undefined {
	return text.match(/Canvas ID: ([^\s]+)/)?.[1]
}

export function parseCanvasIdFromResult(result: McpToolResult): string | undefined {
	return parseCanvasIdFromText(extractTextContent(result))
}

export function extractReturnValue(result: McpToolResult): unknown {
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
