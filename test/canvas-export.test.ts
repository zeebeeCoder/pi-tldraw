import { describe, expect, it } from 'vitest'
import {
	buildCanvasExportCode,
	formatBytes,
	normalizeCanvasExportFormat,
	normalizeCanvasExportScope,
	parseCanvasExportPayload,
	parseDataUrl,
} from '../src/canvas/export'

describe('canvas export helpers', () => {
	it('normalizes export format and scope to safe defaults', () => {
		expect(normalizeCanvasExportFormat()).toBe('png')
		expect(normalizeCanvasExportFormat(' SVG ')).toBe('svg')
		expect(normalizeCanvasExportFormat('jpeg')).toBe('png')

		expect(normalizeCanvasExportScope()).toBe('selected')
		expect(normalizeCanvasExportScope(' all ')).toBe('all')
		expect(normalizeCanvasExportScope('everything')).toBe('selected')
	})

	it('builds export code that borrows working timers/fetch and reaches the real editor', () => {
		const code = buildCanvasExportCode({ format: 'svg', scope: 'all', background: false, padding: 24, pixelRatio: 2 })

		expect(code).toContain("const __piExportScope = \"all\"")
		expect(code).toContain("const __piExportFormat = \"svg\"")
		expect(code).toContain('"background":false')
		expect(code).toContain('"padding":24')
		expect(code).toContain('"pixelRatio":2')
		// Borrow working globals from a same-origin iframe so the export pipeline can use
		// setTimeout/fetch even though the exec sandbox disabled them on window.
		expect(code).toContain('__piSandboxFrame')
		expect(code).toContain('__piBorrowedWindow.setTimeout.bind')
		expect(code).toContain('__piBorrowedWindow.fetch.bind')
		// Reach the real editor (bypass the focused proxy ret:'this' bug) via a temp method.
		expect(code).toContain('editor[__piMethodName] = async function(ids, opts)')
		expect(code).toContain('this.toImageDataUrl(ids, opts)')
		// Restore the sandbox-disabled globals and remove the iframe afterwards.
		expect(code).toContain('window.setTimeout = __piPriorSetTimeout')
		expect(code).toContain('__piSandboxFrame.remove()')
	})

	it('defaults PNG exports to compact bitmap output', () => {
		const code = buildCanvasExportCode()
		expect(code).toContain('"format":"png"')
		expect(code).toContain('"pixelRatio":1')
	})

	it('parses canvas export payloads', () => {
		const payload = parseCanvasExportPayload({
			dataUrl: 'data:image/png;base64,aGVsbG8=',
			width: 640,
			height: 480,
			format: 'png',
			scope: 'selected',
			exportedShapeIds: ['a', 'b'],
			selectedCount: 2,
			fallbackToAll: false,
		})

		expect(payload.width).toBe(640)
		expect(payload.exportedShapeIds).toEqual(['a', 'b'])
	})

	it('parses base64 and url-encoded data URLs', () => {
		expect(parseDataUrl('data:image/png;base64,aGVsbG8=')).toEqual({
			mimeType: 'image/png',
			data: 'aGVsbG8=',
			bytes: 5,
		})
		expect(parseDataUrl('data:image/svg+xml,%3Csvg%3E%3C%2Fsvg%3E')).toEqual({
			mimeType: 'image/svg+xml',
			data: Buffer.from('<svg></svg>', 'utf8').toString('base64'),
			bytes: 11,
		})
	})

	it('formats byte counts compactly', () => {
		expect(formatBytes(100)).toBe('100 B')
		expect(formatBytes(2048)).toBe('2.0 KiB')
	})
})
