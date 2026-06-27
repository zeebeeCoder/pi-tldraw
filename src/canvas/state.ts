import type { CanvasBundle } from '../semantic/layer'

export type CanvasStateBundle = {
	shapes: unknown[]
	assets?: unknown[]
	bindings?: unknown[]
	selectedIds?: unknown[]
}

export type SceneLens = 'all' | 'selected'

export const INITIALIZE_CANVAS_CODE = 'return { initialized: true }'

export const READ_CANVAS_STATE_CODE = `
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
let selectedIds = []
try { selectedIds = (editor.getSelectedShapeIds() || []).map((id) => String(id)) } catch { selectedIds = [] }
return { shapes, assets, bindings, selectedIds }
`

export function summarizeSnapshot(snapshot: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }) {
	const shapeCount = Array.isArray(snapshot.shapes) ? snapshot.shapes.length : 0
	const assetCount = Array.isArray(snapshot.assets) ? snapshot.assets.length : 0
	const bindingCount = Array.isArray(snapshot.bindings) ? snapshot.bindings.length : 0
	return `${shapeCount} shape(s), ${assetCount} asset(s), ${bindingCount} binding(s)`
}

export const normalizeShapeId = (id: unknown): string | null =>
	id == null ? null : String(id).replace(/^shape:/, '')

export function shapeIdOf(shape: unknown): string | null {
	if (!shape || typeof shape !== 'object') return null
	const record = shape as Record<string, unknown>
	return normalizeShapeId(record.shapeId ?? record.id)
}

export function bindingTouchesSelection(binding: unknown, selectedIds: ReadonlySet<string>): boolean {
	if (!binding || typeof binding !== 'object') return false
	const record = binding as Record<string, unknown>
	return [record.fromId, record.toId].some((id) => {
		const normalized = normalizeShapeId(id)
		return normalized != null && selectedIds.has(normalized)
	})
}

export function applySceneLens(bundle: CanvasStateBundle, lens: SceneLens): CanvasStateBundle {
	if (lens === 'all') return bundle

	const selectedIds = selectedIdSet(bundle.selectedIds)
	return {
		...bundle,
		shapes: bundle.shapes.filter((shape) => {
			const id = shapeIdOf(shape)
			return id != null && selectedIds.has(id)
		}),
		bindings: Array.isArray(bundle.bindings)
			? bundle.bindings.filter((binding) => bindingTouchesSelection(binding, selectedIds))
			: bundle.bindings,
		selectedIds: [...selectedIds],
	}
}

export const selectedIdSet = (selectedIds: unknown): ReadonlySet<string> =>
	new Set(
		(Array.isArray(selectedIds) ? selectedIds : [])
			.map((id) => normalizeShapeId(id))
			.filter((id): id is string => id != null)
	)

export function asCanvasBundle(bundle: CanvasStateBundle): CanvasBundle {
	return {
		shapes: bundle.shapes as CanvasBundle['shapes'],
		assets: bundle.assets,
		bindings: bundle.bindings,
	}
}

export function toRawCanvasState(bundle: CanvasStateBundle) {
	return {
		shapes: bundle.shapes,
		assets: bundle.assets ?? [],
		bindings: bundle.bindings ?? [],
	}
}

export function restoreCanvasCode(snapshot: { shapes?: unknown[] }) {
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
