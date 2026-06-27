import { describe, expect, it } from 'vitest'
import {
	extractReturnValue,
	extractTextContent,
	parseCanvasIdFromResult,
	parseMcpResponse,
} from '../src/mcp/response'

describe('MCP response parsing', () => {
	it('parses JSON responses', () => {
		expect(parseMcpResponse('{"ok":true}')).toEqual({ ok: true })
	})

	it('parses streamable HTTP SSE data lines', () => {
		expect(parseMcpResponse('event: message\ndata: {"result":42}\n')).toEqual({ result: 42 })
	})

	it('extracts text content from MCP tool results', () => {
		const text = extractTextContent({ content: [{ type: 'text', text: 'hello' }, { type: 'image', url: 'x' }] })
		expect(text).toBe('hello\n{"type":"image","url":"x"}')
	})

	it('extracts canvas id and return value from exec text', () => {
		const result = {
			content: [
				{
					type: 'text',
					text: 'Return value:\n{"shapes":[{"id":"a"}]}\n\nCanvas ID: abc123',
				},
			],
		}

		expect(parseCanvasIdFromResult(result)).toBe('abc123')
		expect(extractReturnValue(result)).toEqual({ shapes: [{ id: 'a' }] })
	})
})
