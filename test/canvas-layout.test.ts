import { describe, expect, it } from 'vitest'
import {
	buildCanvasLayoutCode,
	calculateCanvasLayout,
	formatCanvasLayoutSummary,
	normalizeCanvasLayoutColumns,
	normalizeCanvasLayoutGap,
	normalizeCanvasLayoutMode,
	parseCanvasLayoutResult,
	type CanvasLayoutShape,
} from '../src/canvas/layout'

const shapes: CanvasLayoutShape[] = [
	{ id: 'b', x: 40, y: 220, w: 100, h: 80 },
	{ id: 'a', x: 0, y: 0, w: 200, h: 100 },
	{ id: 'c', x: 80, y: 50, w: 120, h: 120 },
]

describe('canvas layout geometry', () => {
	it('arranges horizontal layout deterministically with spacing and center alignment', () => {
		const first = calculateCanvasLayout(shapes, {
			mode: 'horizontal',
			gap: 50,
			align: 'center',
			anchor: 'top-left',
		})
		const second = calculateCanvasLayout(shapes, {
			mode: 'horizontal',
			gap: 50,
			align: 'center',
			anchor: 'top-left',
		})

		expect(first.order).toEqual(['a', 'b', 'c'])
		expect(first.moves.map((move) => [move.id, move.to])).toEqual([
			['a', { x: 0, y: 10, w: 200, h: 100 }],
			['b', { x: 250, y: 20, w: 100, h: 80 }],
			['c', { x: 400, y: 0, w: 120, h: 120 }],
		])
		expect(first.before.overlapCount).toBe(1)
		expect(first.after.overlapCount).toBe(0)
		expect(first.after.minGap).toBe(50)
		expect(second.moves).toEqual(first.moves)
	})

	it('arranges vertical layout in spatial order and preserves the aggregate center', () => {
		const result = calculateCanvasLayout(
			[
				{ id: 'top', x: 100, y: 0, w: 100, h: 100 },
				{ id: 'bottom', x: 200, y: 200, w: 200, h: 100 },
			],
			{ mode: 'vertical', gap: 40, anchor: 'center' }
		)

		expect(result.order).toEqual(['top', 'bottom'])
		expect(result.after.bounds.w).toBe(200)
		expect(result.after.bounds.h).toBe(240)
		expect(result.after.bounds.x + result.after.bounds.w / 2).toBeCloseTo(
			result.before.bounds.x + result.before.bounds.w / 2
		)
		expect(result.after.bounds.y + result.after.bounds.h / 2).toBeCloseTo(
			result.before.bounds.y + result.before.bounds.h / 2
		)
		expect(result.after.minGap).toBe(40)
	})

	it('arranges grid layout with explicit ordering, columns, gap, padding, and end alignment', () => {
		const result = calculateCanvasLayout(
			[
				{ id: 'one', x: 0, y: 0, w: 100, h: 100 },
				{ id: 'two', x: 300, y: 0, w: 50, h: 80 },
				{ id: 'three', x: 0, y: 300, w: 80, h: 60 },
			],
			{
				mode: 'grid',
				ordering: 'explicit',
				columns: 2,
				gap: 20,
				padding: 10,
				align: 'end',
				anchor: 'top-left',
			}
		)

		expect(result.options.columns).toBe(2)
		expect(result.moves.map((move) => [move.id, move.to])).toEqual([
			['one', { x: 10, y: 10, w: 100, h: 100 }],
			['two', { x: 130, y: 30, w: 50, h: 80 }],
			['three', { x: 30, y: 130, w: 80, h: 60 }],
		])
		expect(result.after.bounds).toEqual({ x: 10, y: 10, w: 170, h: 180 })
		expect(result.after.overlapCount).toBe(0)
	})

	it('uses stable reading order for grid spatial layout', () => {
		const result = calculateCanvasLayout(
			[
				{ id: 'bottom', x: 0, y: 200, w: 100, h: 100 },
				{ id: 'right', x: 200, y: 0, w: 100, h: 100 },
				{ id: 'left', x: 0, y: 0, w: 100, h: 100 },
			],
			{ mode: 'grid', gap: 10, columns: 2 }
		)

		expect(result.order).toEqual(['left', 'right', 'bottom'])
	})

	it('is idempotent when applied to its own output', () => {
		const options = { mode: 'horizontal', gap: 64, align: 'center', anchor: 'center' } as const
		const first = calculateCanvasLayout(shapes, options)
		const laidOut = first.moves.map((move) => ({ id: move.id, ...move.to }))
		const second = calculateCanvasLayout(laidOut, options)

		expect(second.before.overlapCount).toBe(0)
		expect(second.moves.every((move) => Math.abs(move.dx) < 1e-9 && Math.abs(move.dy) < 1e-9)).toBe(true)
	})

	it('rejects duplicate ids and invalid geometry controls', () => {
		expect(() =>
			calculateCanvasLayout(
				[
					{ id: 'a', x: 0, y: 0, w: 10, h: 10 },
					{ id: 'a', x: 20, y: 0, w: 10, h: 10 },
				],
				{ mode: 'horizontal' }
			)
		).toThrow('Duplicate layout shape id')
		expect(() => normalizeCanvasLayoutMode('diagonal')).toThrow('mode must be')
		expect(() => normalizeCanvasLayoutGap(-1)).toThrow('gap')
		expect(() => normalizeCanvasLayoutColumns(0)).toThrow('columns')
	})
})

describe('canvas layout tool payload', () => {
	it('embeds the deterministic runtime and selection-scoped behavior in exec code', () => {
		const code = buildCanvasLayoutCode({
			shapeIds: ['b', 'shape:a'],
			mode: 'grid',
			columns: 2,
			gap: 96,
			padding: 24,
			align: 'center',
			ordering: 'explicit',
			dryRun: true,
		})

		expect(code).toContain('const __piRequestedShapeIds = ["b","a"]')
		expect(code).toContain('"mode":"grid"')
		expect(code).toContain('"gap":96')
		expect(code).toContain('"padding":24')
		expect(code).toContain('"columns":2')
		expect(code).toContain('"dryRun":true')
		expect(code).toContain('const __piCalculateCanvasLayout = function calculateCanvasLayout')
		expect(code).toContain('No shapes selected for layout')
		expect(code).toContain('connector-or-freehand-preserved')
		expect(code).toContain('connector-crosses-unrelated-shape')
		expect(code).toContain('__piCollectCanvasLayoutArrows')
		expect(code).toContain('__piCollectCanvasLayoutObstacles')
		expect(code).toContain('this.run(() =>')
		expect(code).toContain('Layout verification failed; changes were rolled back')
	})

	it('parses and formats compact tool results', () => {
		const parsed = parseCanvasLayoutResult({
			ok: true,
			mode: 'horizontal',
			dryRun: false,
			requestedShapeIds: ['a', 'b'],
			selectedCount: 2,
			order: ['a', 'b'],
			options: {
				mode: 'horizontal',
				gap: 64,
				padding: 0,
				columns: null,
				align: 'center',
				anchor: 'center',
				ordering: 'spatial',
				dryRun: false,
			},
			before: { bounds: { x: 0, y: 0, w: 220, h: 100 }, overlapCount: 1, minGap: -20 },
			after: { bounds: { x: 0, y: 0, w: 264, h: 100 }, overlapCount: 0, minGap: 64 },
			moves: [],
			movedShapeIds: ['a', 'b'],
			warnings: [{ id: 'arrow1', reason: 'connector-or-freehand-preserved' }],
		})

		const summary = formatCanvasLayoutSummary(parsed)
		expect(summary).toContain('Applied layout: 2 shape(s) moved')
		expect(summary).toContain('overlaps 1 → 0')
		expect(summary).toContain('min gap -20px → 64px')
		expect(summary).toContain('Connections: no deterministic connector crossings detected.')
		expect(summary).toContain('Warnings: arrow1')
	})
})
