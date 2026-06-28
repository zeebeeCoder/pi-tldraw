export type CanvasExportFormat = 'png' | 'svg'
export type CanvasExportScope = 'selected' | 'all'

export interface CanvasExportCodeOptions {
	format?: string
	scope?: string
	background?: boolean
	padding?: number
	scale?: number
	pixelRatio?: number
}

export interface CanvasExportPayload {
	dataUrl: string
	width: number
	height: number
	format: CanvasExportFormat
	scope: CanvasExportScope
	exportedShapeIds: string[]
	selectedCount: number
	fallbackToAll: boolean
}

export interface ParsedDataUrl {
	mimeType: string
	data: string
	bytes: number
}

export function normalizeCanvasExportFormat(format?: string): CanvasExportFormat {
	const normalized = format?.toLowerCase().trim()
	return normalized === 'svg' ? 'svg' : 'png'
}

export function normalizeCanvasExportScope(scope?: string): CanvasExportScope {
	const normalized = scope?.toLowerCase().trim()
	return normalized === 'all' ? 'all' : 'selected'
}

export function buildCanvasExportCode(options: CanvasExportCodeOptions = {}) {
	const format = normalizeCanvasExportFormat(options.format)
	const scope = normalizeCanvasExportScope(options.scope)
	const exportOptions: Record<string, unknown> = {
		format,
		background: options.background ?? true,
	}
	if (typeof options.pixelRatio === 'number' && Number.isFinite(options.pixelRatio)) {
		exportOptions.pixelRatio = options.pixelRatio
	} else if (format === 'png') {
		exportOptions.pixelRatio = 1
	}
	if (typeof options.padding === 'number' && Number.isFinite(options.padding)) exportOptions.padding = options.padding
	if (typeof options.scale === 'number' && Number.isFinite(options.scale)) exportOptions.scale = options.scale

	return `
const __piExportScope = ${JSON.stringify(scope)}
const __piExportFormat = ${JSON.stringify(format)}
const __piExportOptions = ${JSON.stringify(exportOptions)}
const __piToTldrawId = (id) => {
	const value = String(id)
	return value.startsWith('shape:') ? value : 'shape:' + value
}
const __piAllShapeIds = editor.getCurrentPageShapes()
	.map((shape) => shape.shapeId ?? shape.id)
	.filter(Boolean)
	.map(String)
let __piSelectedShapeIds = []
try { __piSelectedShapeIds = (editor.getSelectedShapeIds() || []).map(String) } catch { __piSelectedShapeIds = [] }
const __piFallbackToAll = __piExportScope === 'selected' && __piSelectedShapeIds.length === 0
const __piFocusedIds = __piExportScope === 'selected' && __piSelectedShapeIds.length > 0 ? __piSelectedShapeIds : __piAllShapeIds
if (__piFocusedIds.length === 0) throw new Error('No shapes to export.')
const __piInternalIds = __piFocusedIds.map(__piToTldrawId)

// The mcp-app exec sandbox disables window.setTimeout/setInterval/fetch/XMLHttpRequest
// while user code runs. tldraw's export pipeline (exportToSvg + getSvgAsImage) needs
// setTimeout (to unmount the react root on the next tick) and may need fetch (to embed
// fonts/images). Borrow working globals from a hidden same-origin about:blank iframe and
// install them on window only for the duration of the export call.
const __piSandboxFrame = document.createElement('iframe')
__piSandboxFrame.setAttribute('aria-hidden', 'true')
__piSandboxFrame.style.cssText = 'width:0;height:0;border:0;position:absolute;left:-9999px;'
document.body.appendChild(__piSandboxFrame)
const __piBorrowedWindow = __piSandboxFrame.contentWindow
const __piPriorSetTimeout = window.setTimeout
const __piPriorSetInterval = window.setInterval
const __piPriorFetch = window.fetch
const __piPriorXHR = window.XMLHttpRequest
try {
	window.setTimeout = __piBorrowedWindow.setTimeout.bind(__piBorrowedWindow)
	window.setInterval = __piBorrowedWindow.setInterval.bind(__piBorrowedWindow)
	window.fetch = __piBorrowedWindow.fetch.bind(__piBorrowedWindow)
	window.XMLHttpRequest = __piBorrowedWindow.XMLHttpRequest

	// The focused editor proxy marks toImageDataUrl with ret:'this', so a direct call
	// returns the proxy instead of the image result. Install a temp method on the real
	// editor; the proxy invokes it via value.apply(target, args) with this === the real
	// editor, so this.toImageDataUrl reaches the genuine implementation and its return
	// value flows back untouched.
	const __piMethodName = '__piExportImage_' + Math.random().toString(36).slice(2)
	editor[__piMethodName] = async function(ids, opts) {
		return await this.toImageDataUrl(ids, opts)
	}
	try {
		const __piImage = await editor[__piMethodName](__piInternalIds, __piExportOptions)
		return {
			dataUrl: __piImage.url,
			width: __piImage.width,
			height: __piImage.height,
			format: __piExportFormat,
			scope: __piExportScope,
			exportedShapeIds: __piFocusedIds,
			selectedCount: __piSelectedShapeIds.length,
			fallbackToAll: __piFallbackToAll,
		}
	} finally {
		try { delete editor[__piMethodName] } catch {}
	}
} finally {
	window.setTimeout = __piPriorSetTimeout
	window.setInterval = __piPriorSetInterval
	window.fetch = __piPriorFetch
	window.XMLHttpRequest = __piPriorXHR
	__piSandboxFrame.remove()
}
`
}

export function parseCanvasExportPayload(value: unknown): CanvasExportPayload {
	if (!value || typeof value !== 'object') throw new Error('Canvas export did not return an object.')
	const record = value as Record<string, unknown>
	if (typeof record.dataUrl !== 'string') throw new Error('Canvas export did not return a data URL.')
	if (typeof record.width !== 'number' || typeof record.height !== 'number') {
		throw new Error('Canvas export did not return image dimensions.')
	}
	return {
		dataUrl: record.dataUrl,
		width: record.width,
		height: record.height,
		format: normalizeCanvasExportFormat(typeof record.format === 'string' ? record.format : undefined),
		scope: normalizeCanvasExportScope(typeof record.scope === 'string' ? record.scope : undefined),
		exportedShapeIds: Array.isArray(record.exportedShapeIds)
			? record.exportedShapeIds.map(String)
			: [],
		selectedCount: typeof record.selectedCount === 'number' ? record.selectedCount : 0,
		fallbackToAll: record.fallbackToAll === true,
	}
}

export function parseDataUrl(dataUrl: string): ParsedDataUrl {
	const match = dataUrl.match(/^data:([^;,]+)(;base64)?,(.*)$/s)
	if (!match) throw new Error('Invalid image data URL returned by canvas export.')
	const mimeType = match[1]
	const isBase64 = Boolean(match[2])
	const payload = match[3]
	const data = isBase64 ? payload : Buffer.from(decodeURIComponent(payload), 'utf8').toString('base64')
	return { mimeType, data, bytes: Buffer.byteLength(data, 'base64') }
}

export function formatBytes(bytes: number) {
	if (bytes < 1024) return `${bytes} B`
	const kib = bytes / 1024
	if (kib < 1024) return `${kib.toFixed(1)} KiB`
	return `${(kib / 1024).toFixed(1)} MiB`
}
