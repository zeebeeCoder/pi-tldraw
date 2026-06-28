#!/usr/bin/env node
const endpoint = process.env.TLDRAW_MCP_URL || 'http://127.0.0.1:8787/mcp'
const resourceUri = process.env.TLDRAW_MCP_RESOURCE_URI || 'ui://show-canvas/mcp-app.html'
let nextId = 1
let sessionId = null

function parseMcpResponse(text) {
	const trimmed = text.trim()
	if (!trimmed) return undefined
	if (trimmed.startsWith('{') || trimmed.startsWith('[')) return JSON.parse(trimmed)
	for (const line of trimmed.split(/\r?\n/)) {
		if (line.startsWith('data:')) return JSON.parse(line.slice(5).trim())
	}
	throw new Error(`Could not parse MCP response: ${trimmed.slice(0, 200)}`)
}

async function post(body) {
	const headers = {
		'content-type': 'application/json',
		accept: 'application/json, text/event-stream',
	}
	if (sessionId) headers['mcp-session-id'] = sessionId
	const response = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body) })
	const text = await response.text()
	if (!response.ok) throw new Error(`MCP HTTP ${response.status}: ${text}`)
	return { response, payload: parseMcpResponse(text) }
}

async function request(method, params = {}) {
	const { payload } = await post({ jsonrpc: '2.0', id: nextId++, method, params })
	if (payload?.error) throw new Error(payload.error.message)
	return payload?.result
}

console.log(`checking ${endpoint}`)
const init = await post({
	jsonrpc: '2.0',
	id: nextId++,
	method: 'initialize',
	params: {
		protocolVersion: '2025-06-18',
		capabilities: {},
		clientInfo: { name: 'pi-tldraw-e2e', version: '0.0.1' },
	},
})
sessionId = init.response.headers.get('mcp-session-id')
if (!sessionId) throw new Error('missing mcp-session-id')
if (init.payload?.error) throw new Error(init.payload.error.message)
await post({ jsonrpc: '2.0', method: 'notifications/initialized' })

const [{ tools = [] }, { resources = [] }] = await Promise.all([
	request('tools/list'),
	request('resources/list'),
])
const toolNames = new Set(tools.map((tool) => tool.name))
for (const required of ['search', 'exec']) {
	if (!toolNames.has(required)) throw new Error(`missing required tool: ${required}`)
}
if (!resources.some((resource) => resource.uri === resourceUri)) {
	throw new Error(`missing canvas resource: ${resourceUri}`)
}

const resource = await request('resources/read', { uri: resourceUri })
const html = resource?.contents?.[0]?.text
if (typeof html !== 'string' || !html.includes('<')) {
	throw new Error('canvas resource did not return HTML text')
}

console.log(`ok: ${tools.length} tool(s), ${resources.length} resource(s), canvas html ${html.length} byte(s)`)
