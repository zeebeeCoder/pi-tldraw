export type CanvasLayoutMode = 'horizontal' | 'vertical' | 'grid'
export type CanvasLayoutAlign = 'start' | 'center' | 'end'
export type CanvasLayoutAnchor = 'center' | 'top-left' | 'first'
export type CanvasLayoutOrdering = 'spatial' | 'explicit' | 'reading'

export interface CanvasLayoutBounds {
	x: number
	y: number
	w: number
	h: number
}

export interface CanvasLayoutShape extends CanvasLayoutBounds {
	id: string
}

export interface CanvasLayoutOptions {
	mode: CanvasLayoutMode
	gap?: number
	padding?: number
	columns?: number
	align?: CanvasLayoutAlign
	anchor?: CanvasLayoutAnchor
	ordering?: CanvasLayoutOrdering
	dryRun?: boolean
}

export interface CanvasLayoutMetrics {
	bounds: CanvasLayoutBounds
	overlapCount: number
	minGap: number | null
}

export interface CanvasLayoutMove {
	id: string
	from: CanvasLayoutBounds
	to: CanvasLayoutBounds
	dx: number
	dy: number
}

export interface CanvasLayoutResult {
	mode: CanvasLayoutMode
	order: string[]
	options: Required<Omit<CanvasLayoutOptions, 'columns' | 'dryRun'>> & {
		columns: number | null
		dryRun: boolean
	}
	before: CanvasLayoutMetrics
	after: CanvasLayoutMetrics
	moves: CanvasLayoutMove[]
}

export const DEFAULT_CANVAS_LAYOUT_GAP = 64

const LAYOUT_MODES = new Set(['horizontal', 'vertical', 'grid'])
const LAYOUT_ALIGNS = new Set(['start', 'center', 'end'])
const LAYOUT_ANCHORS = new Set(['center', 'top-left', 'first'])
const LAYOUT_ORDERINGS = new Set(['spatial', 'explicit', 'reading'])

export function normalizeCanvasLayoutMode(value?: string): CanvasLayoutMode {
	const normalized = value?.trim().toLowerCase()
	if (normalized && LAYOUT_MODES.has(normalized)) return normalized as CanvasLayoutMode
	throw new Error('mode must be one of: horizontal, vertical, grid')
}

export function normalizeCanvasLayoutAlign(value?: string): CanvasLayoutAlign {
	const normalized = value?.trim().toLowerCase()
	if (!normalized) return 'center'
	if (LAYOUT_ALIGNS.has(normalized)) return normalized as CanvasLayoutAlign
	throw new Error('align must be one of: start, center, end')
}

export function normalizeCanvasLayoutAnchor(value?: string): CanvasLayoutAnchor {
	const normalized = value?.trim().toLowerCase()
	if (!normalized) return 'center'
	if (LAYOUT_ANCHORS.has(normalized)) return normalized as CanvasLayoutAnchor
	throw new Error('anchor must be one of: center, top-left, first')
}

export function normalizeCanvasLayoutOrdering(value?: string): CanvasLayoutOrdering {
	const normalized = value?.trim().toLowerCase()
	if (!normalized) return 'spatial'
	if (LAYOUT_ORDERINGS.has(normalized)) return normalized as CanvasLayoutOrdering
	throw new Error('ordering must be one of: spatial, explicit, reading')
}

export function normalizeCanvasLayoutGap(value?: number): number {
	return normalizeNonNegativeNumber(value, DEFAULT_CANVAS_LAYOUT_GAP, 'gap')
}

export function normalizeCanvasLayoutPadding(value?: number): number {
	return normalizeNonNegativeNumber(value, 0, 'padding')
}

export function normalizeCanvasLayoutColumns(value?: number): number | undefined {
	if (value == null) return undefined
	if (!Number.isInteger(value) || value < 1) throw new Error('columns must be a positive integer')
	return value
}

function normalizeNonNegativeNumber(value: number | undefined, fallback: number, name: string) {
	if (value == null) return fallback
	if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a non-negative finite number`)
	return value
}

/**
 * Deterministically arrange a subset of rectangular bounds.
 *
 * This function is deliberately self-contained: buildCanvasLayoutCode embeds
 * its runtime source into the browser exec sandbox. Do not make it depend on
 * module-local helpers unless those helpers are nested inside this function.
 */
export function calculateCanvasLayout(
	shapes: CanvasLayoutShape[],
	options: CanvasLayoutOptions
): CanvasLayoutResult {
	if (!Array.isArray(shapes) || shapes.length === 0) {
		throw new Error('At least one shape is required for layout.')
	}
	const seen = new Set<string>()
	for (const shape of shapes) {
		if (!shape || typeof shape.id !== 'string' || !shape.id) {
			throw new Error('Every layout shape needs a non-empty string id.')
		}
		if (seen.has(shape.id)) throw new Error(`Duplicate layout shape id: ${shape.id}`)
		seen.add(shape.id)
		for (const field of ['x', 'y', 'w', 'h'] as const) {
			if (!Number.isFinite(shape[field])) throw new Error(`Shape ${shape.id} has invalid ${field}.`)
		}
		if (shape.w <= 0 || shape.h <= 0) throw new Error(`Shape ${shape.id} must have positive bounds.`)
	}

	const mode = options.mode
	const gap = options.gap ?? 64
	const padding = options.padding ?? 0
	const align = options.align ?? 'center'
	const anchor = options.anchor ?? 'center'
	const ordering = options.ordering ?? 'spatial'
	const dryRun = options.dryRun === true
	if (!Number.isFinite(gap) || gap < 0) throw new Error('gap must be a non-negative finite number')
	if (!Number.isFinite(padding) || padding < 0) {
		throw new Error('padding must be a non-negative finite number')
	}
	if (options.columns != null && (!Number.isInteger(options.columns) || options.columns < 1)) {
		throw new Error('columns must be a positive integer')
	}

	function boundsOf(items: CanvasLayoutBounds[]): CanvasLayoutBounds {
		const minX = Math.min(...items.map((item) => item.x))
		const minY = Math.min(...items.map((item) => item.y))
		const maxX = Math.max(...items.map((item) => item.x + item.w))
		const maxY = Math.max(...items.map((item) => item.y + item.h))
		return { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
	}

	function pairMetrics(a: CanvasLayoutBounds, b: CanvasLayoutBounds) {
		const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
		const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
		const overlaps = overlapX > 0 && overlapY > 0
		if (overlaps) return { overlaps, clearance: -Math.min(overlapX, overlapY) }
		const horizontalGap = Math.max(0, Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w))
		const verticalGap = Math.max(0, Math.max(a.y, b.y) - Math.min(a.y + a.h, b.y + b.h))
		return { overlaps, clearance: Math.max(horizontalGap, verticalGap) }
	}

	function measure(items: CanvasLayoutBounds[]): CanvasLayoutMetrics {
		let overlapCount = 0
		let minGap: number | null = null
		for (let i = 0; i < items.length; i++) {
			for (let j = i + 1; j < items.length; j++) {
				const pair = pairMetrics(items[i], items[j])
				if (pair.overlaps) overlapCount++
				minGap = minGap == null ? pair.clearance : Math.min(minGap, pair.clearance)
			}
		}
		return { bounds: boundsOf(items), overlapCount, minGap }
	}

	function byIdAscending(a: CanvasLayoutShape, b: CanvasLayoutShape) {
		return a.id.localeCompare(b.id)
	}

	function orderedShapes() {
		if (ordering === 'explicit') return [...shapes]
		const sorted = [...shapes]
		if (mode === 'horizontal') {
			sorted.sort((a, b) => a.x - b.x || a.y - b.y || byIdAscending(a, b))
		} else if (mode === 'vertical') {
			sorted.sort((a, b) => a.y - b.y || a.x - b.x || byIdAscending(a, b))
		} else {
			sorted.sort((a, b) => a.y - b.y || a.x - b.x || byIdAscending(a, b))
		}
		return sorted
	}

	function alignOffset(container: number, size: number) {
		if (align === 'start') return 0
		if (align === 'end') return container - size
		return (container - size) / 2
	}

	function anchorOrigin(
		original: CanvasLayoutBounds,
		first: CanvasLayoutShape,
		outerW: number,
		outerH: number
	) {
		if (anchor === 'top-left') return { x: original.x, y: original.y }
		if (anchor === 'first') return { x: first.x - padding, y: first.y - padding }
		return {
			x: original.x + original.w / 2 - outerW / 2,
			y: original.y + original.h / 2 - outerH / 2,
		}
	}

	const ordered = orderedShapes()
	const originalBounds = boundsOf(shapes)
	const placements = new Map<string, CanvasLayoutBounds>()
	let columns: number | null = null

	if (mode === 'horizontal') {
		const contentW = ordered.reduce((sum, shape) => sum + shape.w, 0) + gap * (ordered.length - 1)
		const contentH = Math.max(...ordered.map((shape) => shape.h))
		const outerW = contentW + padding * 2
		const outerH = contentH + padding * 2
		const origin = anchorOrigin(originalBounds, ordered[0], outerW, outerH)
		let x = origin.x + padding
		for (const shape of ordered) {
			placements.set(shape.id, {
				x,
				y: origin.y + padding + alignOffset(contentH, shape.h),
				w: shape.w,
				h: shape.h,
			})
			x += shape.w + gap
		}
	} else if (mode === 'vertical') {
		const contentW = Math.max(...ordered.map((shape) => shape.w))
		const contentH = ordered.reduce((sum, shape) => sum + shape.h, 0) + gap * (ordered.length - 1)
		const outerW = contentW + padding * 2
		const outerH = contentH + padding * 2
		const origin = anchorOrigin(originalBounds, ordered[0], outerW, outerH)
		let y = origin.y + padding
		for (const shape of ordered) {
			placements.set(shape.id, {
				x: origin.x + padding + alignOffset(contentW, shape.w),
				y,
				w: shape.w,
				h: shape.h,
			})
			y += shape.h + gap
		}
	} else {
		columns = Math.min(options.columns ?? Math.ceil(Math.sqrt(ordered.length)), ordered.length)
		const rows = Math.ceil(ordered.length / columns)
		const columnWidths = Array.from({ length: columns }, () => 0)
		const rowHeights = Array.from({ length: rows }, () => 0)
		ordered.forEach((shape, index) => {
			const column = index % columns!
			const row = Math.floor(index / columns!)
			columnWidths[column] = Math.max(columnWidths[column], shape.w)
			rowHeights[row] = Math.max(rowHeights[row], shape.h)
		})
		const contentW = columnWidths.reduce((sum, width) => sum + width, 0) + gap * (columns - 1)
		const contentH = rowHeights.reduce((sum, height) => sum + height, 0) + gap * (rows - 1)
		const outerW = contentW + padding * 2
		const outerH = contentH + padding * 2
		const origin = anchorOrigin(originalBounds, ordered[0], outerW, outerH)
		const columnX: number[] = []
		const rowY: number[] = []
		let x = origin.x + padding
		for (const width of columnWidths) {
			columnX.push(x)
			x += width + gap
		}
		let y = origin.y + padding
		for (const height of rowHeights) {
			rowY.push(y)
			y += height + gap
		}
		ordered.forEach((shape, index) => {
			const column = index % columns!
			const row = Math.floor(index / columns!)
			placements.set(shape.id, {
				x: columnX[column] + alignOffset(columnWidths[column], shape.w),
				y: rowY[row] + alignOffset(rowHeights[row], shape.h),
				w: shape.w,
				h: shape.h,
			})
		})
	}

	const moves = ordered.map((shape) => {
		const to = placements.get(shape.id)!
		return {
			id: shape.id,
			from: { x: shape.x, y: shape.y, w: shape.w, h: shape.h },
			to,
			dx: to.x - shape.x,
			dy: to.y - shape.y,
		}
	})

	return {
		mode,
		order: ordered.map((shape) => shape.id),
		options: { mode, gap, padding, columns, align, anchor, ordering, dryRun },
		before: measure(shapes),
		after: measure(moves.map((move) => move.to)),
		moves,
	}
}

export interface CanvasLayoutCodeOptions
	extends Omit<CanvasLayoutOptions, 'mode' | 'align' | 'anchor' | 'ordering'> {
	mode: string
	align?: string
	anchor?: string
	ordering?: string
	shapeIds?: string[]
}

export function buildCanvasLayoutCode(options: CanvasLayoutCodeOptions) {
	const normalizedOptions: CanvasLayoutOptions = {
		mode: normalizeCanvasLayoutMode(options.mode),
		gap: normalizeCanvasLayoutGap(options.gap),
		padding: normalizeCanvasLayoutPadding(options.padding),
		columns: normalizeCanvasLayoutColumns(options.columns),
		align: normalizeCanvasLayoutAlign(options.align),
		anchor: normalizeCanvasLayoutAnchor(options.anchor),
		ordering: normalizeCanvasLayoutOrdering(options.ordering),
		dryRun: options.dryRun === true,
	}
	const requestedIds = Array.isArray(options.shapeIds)
		? options.shapeIds.map((id) => String(id).replace(/^shape:/, '')).filter(Boolean)
		: []

	return `
const __piRequestedShapeIds = ${JSON.stringify(requestedIds)}
const __piLayoutOptions = ${JSON.stringify(normalizedOptions)}
const __piCalculateCanvasLayout = ${calculateCanvasLayout.toString()}
const __piToTldrawId = (id) => {
	const value = String(id)
	return value.startsWith('shape:') ? value : 'shape:' + value
}
const __piToSimpleId = (id) => String(id).replace(/^shape:/, '')
let __piSelectedShapeIds = []
try { __piSelectedShapeIds = (editor.getSelectedShapeIds() || []).map(__piToSimpleId) } catch { __piSelectedShapeIds = [] }
const __piLayoutShapeIds = __piRequestedShapeIds.length > 0 ? __piRequestedShapeIds : __piSelectedShapeIds
if (__piLayoutShapeIds.length === 0) {
	throw new Error('No shapes selected for layout. Select the shapes in tldraw or pass shapeIds explicitly.')
}

const __piCollectMethod = '__piCollectCanvasLayoutShapes'
const __piApplyMethod = '__piApplyCanvasLayout'
const __piCollectArrowsMethod = '__piCollectCanvasLayoutArrows'
const __piCollectObstaclesMethod = '__piCollectCanvasLayoutObstacles'
const __piOriginalCollect = Object.prototype.hasOwnProperty.call(editor, __piCollectMethod) ? editor[__piCollectMethod] : undefined
const __piOriginalApply = Object.prototype.hasOwnProperty.call(editor, __piApplyMethod) ? editor[__piApplyMethod] : undefined
const __piOriginalCollectArrows = Object.prototype.hasOwnProperty.call(editor, __piCollectArrowsMethod) ? editor[__piCollectArrowsMethod] : undefined
const __piOriginalCollectObstacles = Object.prototype.hasOwnProperty.call(editor, __piCollectObstaclesMethod) ? editor[__piCollectObstaclesMethod] : undefined

try {
	editor[__piCollectMethod] = function(ids) {
		return ids.map((id) => {
			const shape = this.getShape(id)
			if (!shape) return { requestedId: __piToSimpleId(id), missing: true }
			const bounds = this.getShapePageBounds(shape)
			const parent = shape.parentId ? this.getShape(shape.parentId) : undefined
			return {
				requestedId: __piToSimpleId(id),
				id: __piToSimpleId(shape.id),
				type: shape.type,
				isLocked: shape.isLocked === true,
				parentType: parent?.type ?? null,
				rawX: shape.x,
				rawY: shape.y,
				bounds: bounds ? { x: bounds.x, y: bounds.y, w: bounds.w, h: bounds.h } : null,
				missing: false,
			}
		})
	}
	editor[__piApplyMethod] = function(partials) {
		return this.run(() => {
			this.updateShapes(partials)
		})
	}
	editor[__piCollectArrowsMethod] = function(layoutShapeIds) {
		const touchedIds = new Set(layoutShapeIds.map(__piToTldrawId))
		const arrows = []
		for (const arrow of this.getCurrentPageShapes()) {
			if (arrow.type !== 'arrow') continue
			const bindings = this.getBindingsFromShape(arrow.id, 'arrow') ?? []
			const startBinding = bindings.find((binding) => binding.props?.terminal === 'start')
			const endBinding = bindings.find((binding) => binding.props?.terminal === 'end')
			const fromId = startBinding?.toId ?? null
			const toId = endBinding?.toId ?? null
			if (![fromId, toId].some((id) => id && touchedIds.has(id))) continue
			if (!arrow.props?.start || !arrow.props?.end) continue
			const transform = this.getShapePageTransform(arrow)
			const start = transform.applyToPoint(arrow.props.start)
			const end = transform.applyToPoint(arrow.props.end)
			const fromShape = fromId ? this.getShape(fromId) : undefined
			const toShape = toId ? this.getShape(toId) : undefined
			const fromBounds = fromShape ? this.getShapePageBounds(fromShape) : undefined
			const toBounds = toShape ? this.getShapePageBounds(toShape) : undefined
			arrows.push({
				id: __piToSimpleId(arrow.id),
				fromId: fromId ? __piToSimpleId(fromId) : null,
				toId: toId ? __piToSimpleId(toId) : null,
				start: { x: start.x, y: start.y },
				end: { x: end.x, y: end.y },
				fromBounds: fromBounds ? { x: fromBounds.x, y: fromBounds.y, w: fromBounds.w, h: fromBounds.h } : null,
				toBounds: toBounds ? { x: toBounds.x, y: toBounds.y, w: toBounds.w, h: toBounds.h } : null,
			})
		}
		return arrows
	}

	editor[__piCollectObstaclesMethod] = function(layoutShapeIds) {
		const excludedIds = new Set(layoutShapeIds.map(__piToTldrawId))
		const obstacles = []
		for (const shape of this.getCurrentPageShapes()) {
			if (excludedIds.has(shape.id)) continue
			if (shape.type !== 'geo' && shape.type !== 'note' && shape.type !== 'text') continue
			const bounds = this.getShapePageBounds(shape)
			if (!bounds) continue
			obstacles.push({
				id: __piToSimpleId(shape.id),
				type: shape.type,
				x: bounds.x,
				y: bounds.y,
				w: bounds.w,
				h: bounds.h,
			})
		}
		return obstacles
	}

	const __piPointInsideBounds = (point, bounds) =>
		point.x > bounds.x && point.x < bounds.x + bounds.w && point.y > bounds.y && point.y < bounds.y + bounds.h
	const __piSegmentIntersectsBounds = (start, end, bounds) => {
		const inset = Math.min(4, Math.max(0, (Math.min(bounds.w, bounds.h) - 1) / 2))
		const rect = {
			x: bounds.x + inset,
			y: bounds.y + inset,
			w: bounds.w - inset * 2,
			h: bounds.h - inset * 2,
		}
		if (rect.w <= 0 || rect.h <= 0) return false
		if (__piPointInsideBounds(start, rect) || __piPointInsideBounds(end, rect)) return true
		const dx = end.x - start.x
		const dy = end.y - start.y
		let tMin = 0
		let tMax = 1
		const checks = [
			[-dx, start.x - rect.x],
			[dx, rect.x + rect.w - start.x],
			[-dy, start.y - rect.y],
			[dy, rect.y + rect.h - start.y],
		]
		for (const [p, q] of checks) {
			if (p === 0) {
				if (q < 0) return false
				continue
			}
			const t = q / p
			if (p < 0) tMin = Math.max(tMin, t)
			else tMax = Math.min(tMax, t)
			if (tMin > tMax) return false
		}
		return true
	}
	const __piConnectionWarningsFor = (arrows, shapes, movesById, simulateMoves) => {
		const warnings = []
		const shapesById = new Map(shapes.map((shape) => [shape.id, shape]))
		const endpointBounds = (arrow, terminal) => {
			const id = terminal === 'from' ? arrow.fromId : arrow.toId
			if (!id) return null
			const proposed = shapesById.get(id)
			if (proposed) return proposed
			const original = terminal === 'from' ? arrow.fromBounds : arrow.toBounds
			if (!original) return null
			const move = simulateMoves ? movesById.get(id) : undefined
			return move
				? { ...original, x: original.x + move.dx, y: original.y + move.dy }
				: original
		}
		const centerOf = (bounds) => ({ x: bounds.x + bounds.w / 2, y: bounds.y + bounds.h / 2 })
		for (const arrow of arrows) {
			const fromBounds = endpointBounds(arrow, 'from')
			const toBounds = endpointBounds(arrow, 'to')
			const start = fromBounds ? centerOf(fromBounds) : arrow.start
			const end = toBounds ? centerOf(toBounds) : arrow.end
			for (const shape of shapes) {
				if (shape.id === arrow.fromId || shape.id === arrow.toId) continue
				if (!__piSegmentIntersectsBounds(start, end, shape)) continue
				warnings.push({
					id: arrow.id,
					shapeId: shape.id,
					reason: 'connector-crosses-unrelated-shape',
				})
			}
		}
		return warnings
	}

	const __piWarnings = []
	const __piCollected = editor[__piCollectMethod](__piLayoutShapeIds.map(__piToTldrawId))
	const __piEligible = []
	for (const shape of __piCollected) {
		const id = shape.id ?? shape.requestedId
		if (shape.missing) {
			__piWarnings.push({ id, reason: 'missing-shape' })
			continue
		}
		if (shape.type === 'arrow' || shape.type === 'line' || shape.type === 'draw') {
			__piWarnings.push({ id, type: shape.type, reason: 'connector-or-freehand-preserved' })
			continue
		}
		if (shape.type === 'group' || shape.parentType === 'group') {
			__piWarnings.push({ id, type: shape.type, parentType: shape.parentType, reason: 'grouped-shape-preserved' })
			continue
		}
		if (shape.parentType) {
			__piWarnings.push({ id, type: shape.type, parentType: shape.parentType, reason: 'parented-shape-preserved' })
			continue
		}
		if (shape.isLocked) {
			__piWarnings.push({ id, type: shape.type, reason: 'locked-shape-preserved' })
			continue
		}
		if (!shape.bounds) {
			__piWarnings.push({ id, type: shape.type, reason: 'bounds-unavailable' })
			continue
		}
		if (shape.type !== 'geo' && shape.type !== 'note' && shape.type !== 'text') {
			__piWarnings.push({ id, type: shape.type, reason: 'unsupported-shape-type-v1' })
			continue
		}
		__piEligible.push(shape)
	}

	if (__piEligible.length === 0) {
		return {
			ok: false,
			error: 'No eligible shapes to lay out.',
			mode: __piLayoutOptions.mode,
			dryRun: __piLayoutOptions.dryRun,
			requestedShapeIds: __piLayoutShapeIds,
			selectedCount: __piSelectedShapeIds.length,
			movedShapeIds: [],
			warnings: __piWarnings,
		}
	}

	const __piMeasured = __piEligible.map((shape) => ({
		id: shape.id,
		x: shape.bounds.x,
		y: shape.bounds.y,
		w: shape.bounds.w,
		h: shape.bounds.h,
	}))
	const __piLayout = __piCalculateCanvasLayout(__piMeasured, __piLayoutOptions)
	const __piEligibleById = new Map(__piEligible.map((shape) => [shape.id, shape]))
	const __piMovesById = new Map(__piLayout.moves.map((move) => [move.id, move]))
	const __piArrowsBefore = editor[__piCollectArrowsMethod](__piEligible.map((shape) => shape.id))
	const __piObstaclesBefore = editor[__piCollectObstaclesMethod](__piEligible.map((shape) => shape.id))
	let __piConnectionWarnings = __piConnectionWarningsFor(
		__piArrowsBefore,
		[
			...__piLayout.moves.map((move) => ({ id: move.id, ...move.to })),
			...__piObstaclesBefore,
		],
		__piMovesById,
		true
	)
	let __piAfter = __piLayout.after
	let __piVerificationWarnings = []
	let __piRolledBack = false

	if (!__piLayoutOptions.dryRun) {
		const __piUpdates = __piLayout.moves
			.map((move) => {
				const source = __piEligibleById.get(move.id)
				return source ? {
					id: __piToTldrawId(move.id),
					x: source.rawX + move.dx,
					y: source.rawY + move.dy,
				} : null
			})
			.filter(Boolean)
		const __piPrevious = __piEligible.map((shape) => ({ id: __piToTldrawId(shape.id), x: shape.rawX, y: shape.rawY }))
		editor[__piApplyMethod](__piUpdates)

		const __piAfterRaw = editor[__piCollectMethod](__piEligible.map((shape) => __piToTldrawId(shape.id)))
		const __piAfterMeasured = __piAfterRaw
			.filter((shape) => !shape.missing && shape.bounds)
			.map((shape) => ({
				id: shape.id,
				x: shape.bounds.x,
				y: shape.bounds.y,
				w: shape.bounds.w,
				h: shape.bounds.h,
			}))
		const __piAfterProbe = __piCalculateCanvasLayout(__piAfterMeasured, __piLayoutOptions)
		__piAfter = __piAfterProbe.before
		const __piArrowsAfter = editor[__piCollectArrowsMethod](__piEligible.map((shape) => shape.id))
		const __piObstaclesAfter = editor[__piCollectObstaclesMethod](__piEligible.map((shape) => shape.id))
		__piConnectionWarnings = __piConnectionWarningsFor(
			__piArrowsAfter,
			[...__piAfterMeasured, ...__piObstaclesAfter],
			new Map(),
			false
		)
		const __piExpectedById = new Map(__piLayout.moves.map((move) => [move.id, move.to]))
		for (const actual of __piAfterMeasured) {
			const expected = __piExpectedById.get(actual.id)
			if (!expected) continue
			if (Math.abs(actual.x - expected.x) > 0.5 || Math.abs(actual.y - expected.y) > 0.5) {
				__piVerificationWarnings.push({ id: actual.id, reason: 'position-verification-failed' })
			}
		}
		if (__piAfter.overlapCount > 0 || __piVerificationWarnings.length > 0) {
			editor[__piApplyMethod](__piPrevious)
			__piRolledBack = true
			return {
				ok: false,
				error: 'Layout verification failed; changes were rolled back.',
				mode: __piLayout.mode,
				dryRun: false,
				requestedShapeIds: __piLayoutShapeIds,
				selectedCount: __piSelectedShapeIds.length,
				order: __piLayout.order,
				options: __piLayout.options,
				before: __piLayout.before,
				after: __piAfter,
				moves: __piLayout.moves,
				movedShapeIds: [],
				warnings: [...__piWarnings, ...__piVerificationWarnings, ...__piConnectionWarnings, { reason: 'rolled-back' }],
			}
		}
	}

	return {
		ok: true,
		mode: __piLayout.mode,
		dryRun: __piLayoutOptions.dryRun,
		requestedShapeIds: __piLayoutShapeIds,
		selectedCount: __piSelectedShapeIds.length,
		order: __piLayout.order,
		options: __piLayout.options,
		before: __piLayout.before,
		after: __piAfter,
		moves: __piLayout.moves,
		movedShapeIds: __piLayoutOptions.dryRun ? [] : __piLayout.moves.map((move) => move.id),
		warnings: [...__piWarnings, ...__piConnectionWarnings],
		connectionWarningCount: __piConnectionWarnings.length,
		rolledBack: __piRolledBack,
	}
} finally {
	try {
		if (__piOriginalCollect === undefined) delete editor[__piCollectMethod]
		else editor[__piCollectMethod] = __piOriginalCollect
	} catch {}
	try {
		if (__piOriginalApply === undefined) delete editor[__piApplyMethod]
		else editor[__piApplyMethod] = __piOriginalApply
	} catch {}
	try {
		if (__piOriginalCollectArrows === undefined) delete editor[__piCollectArrowsMethod]
		else editor[__piCollectArrowsMethod] = __piOriginalCollectArrows
	} catch {}
	try {
		if (__piOriginalCollectObstacles === undefined) delete editor[__piCollectObstaclesMethod]
		else editor[__piCollectObstaclesMethod] = __piOriginalCollectObstacles
	} catch {}
}
`
}

export interface CanvasLayoutWarning {
	id?: string
	type?: string
	parentType?: string
	shapeId?: string
	reason: string
}

export interface CanvasLayoutToolResult {
	ok: boolean
	error?: string
	mode: CanvasLayoutMode
	dryRun: boolean
	requestedShapeIds: string[]
	selectedCount: number
	order?: string[]
	options?: CanvasLayoutResult['options']
	before?: CanvasLayoutMetrics
	after?: CanvasLayoutMetrics
	moves?: CanvasLayoutMove[]
	movedShapeIds: string[]
	warnings: CanvasLayoutWarning[]
	connectionWarningCount?: number
	rolledBack?: boolean
}

export function parseCanvasLayoutResult(value: unknown): CanvasLayoutToolResult {
	if (!value || typeof value !== 'object') throw new Error('Canvas layout did not return an object.')
	const record = value as Record<string, unknown>
	if (typeof record.mode !== 'string') throw new Error('Canvas layout result is missing mode.')
	const result: CanvasLayoutToolResult = {
		ok: record.ok === true,
		error: typeof record.error === 'string' ? record.error : undefined,
		mode: normalizeCanvasLayoutMode(record.mode),
		dryRun: record.dryRun === true,
		requestedShapeIds: Array.isArray(record.requestedShapeIds)
			? record.requestedShapeIds.map(String)
			: [],
		selectedCount: typeof record.selectedCount === 'number' ? record.selectedCount : 0,
		order: Array.isArray(record.order) ? record.order.map(String) : undefined,
		options: record.options as CanvasLayoutResult['options'] | undefined,
		before: record.before as CanvasLayoutMetrics | undefined,
		after: record.after as CanvasLayoutMetrics | undefined,
		moves: Array.isArray(record.moves) ? (record.moves as CanvasLayoutMove[]) : undefined,
		movedShapeIds: Array.isArray(record.movedShapeIds)
			? record.movedShapeIds.map(String)
			: [],
		warnings: Array.isArray(record.warnings) ? (record.warnings as CanvasLayoutWarning[]) : [],
		connectionWarningCount:
			typeof record.connectionWarningCount === 'number' ? record.connectionWarningCount : undefined,
		rolledBack: record.rolledBack === true,
	}
	if (!result.ok && !result.error) throw new Error(result.warnings.map((warning) => warning.reason).join(', ') || 'Canvas layout failed.')
	return result
}

function formatNumber(value: number | null | undefined) {
	if (value == null || !Number.isFinite(value)) return 'n/a'
	return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '')
}

function formatBounds(bounds: CanvasLayoutBounds | undefined) {
	if (!bounds) return 'n/a'
	return `x=${formatNumber(bounds.x)}, y=${formatNumber(bounds.y)}, w=${formatNumber(bounds.w)}, h=${formatNumber(bounds.h)}`
}

export function formatCanvasLayoutSummary(result: CanvasLayoutToolResult) {
	const before = result.before
	const after = result.after
	const overlapText = before && after ? `overlaps ${before.overlapCount} → ${after.overlapCount}` : 'overlap metrics unavailable'
	const gapText = before && after ? `min gap ${formatNumber(before.minGap)}px → ${formatNumber(after.minGap)}px` : 'gap metrics unavailable'
	const modeOptions: string[] = [result.mode]
	if (result.options?.columns) modeOptions.push(`${result.options.columns} columns`)
	if (result.options) {
		modeOptions.push(`gap ${formatNumber(result.options.gap)}px`)
		if (result.options.padding > 0) modeOptions.push(`padding ${formatNumber(result.options.padding)}px`)
	}
	const verb = result.dryRun ? 'Dry-run layout' : 'Applied layout'
	const movedText = result.dryRun
		? `${result.moves?.length ?? 0} shape(s) would move`
		: `${result.movedShapeIds.length} shape(s) moved`
	const connectorWarningCount =
		result.connectionWarningCount ??
		result.warnings.filter((warning) => warning.reason === 'connector-crosses-unrelated-shape').length
	const lines = [
		`${verb}: ${movedText} (${modeOptions.join(', ')}).`,
		`Spacing: ${overlapText}; ${gapText}.`,
		after ? `Bounds: ${formatBounds(after.bounds)}.` : undefined,
		result.order?.length ? `Order: ${result.order.join(' → ')}.` : undefined,
		connectorWarningCount > 0
			? `Connections: ${connectorWarningCount} connector(s) cross an unrelated shape; adjust ordering/mode or route them manually.`
			: 'Connections: no deterministic connector crossings detected.',
	]
	if (result.warnings.length) {
		lines.push(
			`Warnings: ${result.warnings
				.map((warning) =>
					`${warning.id ?? 'layout'}${warning.shapeId ? `→${warning.shapeId}` : ''} (${warning.reason})`
				)
				.join('; ')}`
		)
	}
	return lines.filter(Boolean).join('\n')
}
