import { describe, expect, it } from 'vitest'
import { applySceneLens, normalizeShapeId, toRawCanvasState } from '../src/canvas/state'

describe('canvas state pure helpers', () => {
	it('normalizes focused and internal shape ids', () => {
		expect(normalizeShapeId('shape:abc')).toBe('abc')
		expect(normalizeShapeId('abc')).toBe('abc')
		expect(normalizeShapeId(null)).toBeNull()
	})

	it('applies selected lens to shapes and touched bindings', () => {
		const bundle = {
			shapes: [
				{ shapeId: 'a', text: 'A' },
				{ id: 'shape:b', text: 'B' },
				{ shapeId: 'c', text: 'C' },
			],
			bindings: [
				{ fromId: 'shape:a', toId: 'shape:b' },
				{ fromId: 'shape:c', toId: 'shape:d' },
			],
			selectedIds: ['shape:b'],
		}

		const lensed = applySceneLens(bundle, 'selected')

		expect(lensed.shapes).toEqual([{ id: 'shape:b', text: 'B' }])
		expect(lensed.bindings).toEqual([{ fromId: 'shape:a', toId: 'shape:b' }])
		expect(lensed.selectedIds).toEqual(['b'])
	})

	it('keeps raw state arrays present for output', () => {
		expect(toRawCanvasState({ shapes: [] })).toEqual({ shapes: [], assets: [], bindings: [] })
	})
})
