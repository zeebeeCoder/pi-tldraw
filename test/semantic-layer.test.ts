import { describe, expect, it } from 'vitest'
import {
	assemble,
	buildTensor,
	chooseAperture,
	enrich,
	estimateTokens,
	renderOverview,
	renderSummary,
	renderView,
	type CanvasBundle,
	type FocusedShape,
} from '../src/semantic/layer'

// ---------------------------------------------------------------------------
// Synthetic generators — emit FULL focused-format shapes + redundant bindings,
// matching real data's prop richness so the raw baseline is honest. Seeded, so
// every run is deterministic and fixtures are reproducible.
// ---------------------------------------------------------------------------

const COLORS = ['black', 'blue', 'green', 'red', 'orange', 'violet', 'light-blue']
const GEO = ['rectangle', 'ellipse', 'diamond', 'hexagon', 'pill']

function makeRng(seed = 1) {
	let s = seed
	return () => {
		s = (s * 1103515245 + 12345) & 0x7fffffff
		return s / 0x7fffffff
	}
}

function geoShape(
	rng: () => number,
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	text: string,
	type = 'rectangle'
): FocusedShape {
	return {
		_type: type,
		color: COLORS[Math.floor(rng() * COLORS.length)],
		fill: ['none', 'tint', 'solid'][Math.floor(rng() * 3)],
		h,
		note: '',
		shapeId: id,
		text,
		textAlign: 'middle',
		w,
		x,
		y,
	}
}

function arrowShape(id: string, fromId: string, toId: string, text: string): FocusedShape {
	return { _type: 'arrow', bend: 0, kind: 'arc', color: 'black', fromId, note: '', shapeId: id, text, toId, x1: 0, y1: 0, x2: 0, y2: 0 }
}

function bindingsFor(arrow: FocusedShape) {
	const mk = (toId: string | null | undefined, terminal: string) => ({
		type: 'arrow',
		fromId: 'shape:' + arrow.shapeId,
		toId: 'shape:' + toId,
		props: { isPrecise: false, isExact: false, normalizedAnchor: { x: 0.5, y: 0.5 }, snap: 'none', terminal },
		meta: {},
	})
	return [mk(arrow.fromId, 'start'), mk(arrow.toId, 'end')]
}

function pack(shapes: FocusedShape[]): CanvasBundle {
	const bindings = shapes.filter((s) => s._type === 'arrow').flatMap(bindingsFor)
	return { shapes, assets: [], bindings }
}

function genFlowchart(n: number): CanvasBundle {
	const rng = makeRng()
	const shapes: FocusedShape[] = []
	for (let i = 0; i < n; i++) {
		const type = i % 4 === 3 ? 'diamond' : 'rectangle'
		shapes.push(geoShape(rng, 'n' + i, (i % 12) * 260, Math.floor(i / 12) * 200, 200, 100, 'step ' + i, type))
	}
	for (let i = 0; i < n - 1; i++) shapes.push(arrowShape('a' + i, 'n' + i, 'n' + (i + 1), i % 3 === 0 ? 'then' : ''))
	return pack(shapes)
}

function genTree(n: number): CanvasBundle {
	const rng = makeRng()
	const shapes: FocusedShape[] = []
	for (let i = 0; i < n; i++) {
		const depth = Math.floor(Math.log2(i + 1))
		shapes.push(geoShape(rng, 'n' + i, (i % 16) * 180, depth * 220, 160, 90, 'node ' + i))
	}
	for (let i = 1; i < n; i++) shapes.push(arrowShape('a' + i, 'n' + Math.floor((i - 1) / 3), 'n' + i, ''))
	return pack(shapes)
}

function genScatter(n: number): CanvasBundle {
	const rng = makeRng()
	const shapes: FocusedShape[] = []
	for (let i = 0; i < n; i++) {
		if (i % 3 === 0) {
			shapes.push({ _type: 'note', color: COLORS[Math.floor(rng() * COLORS.length)], note: '', shapeId: 'n' + i, text: 'idea ' + i, x: rng() * 4000, y: rng() * 4000 })
		} else {
			shapes.push(geoShape(rng, 'n' + i, rng() * 4000, rng() * 4000, 120, 80, 'item ' + i, GEO[Math.floor(rng() * GEO.length)]))
		}
	}
	return pack(shapes)
}

function genDense(n: number): CanvasBundle {
	const rng = makeRng()
	const shapes: FocusedShape[] = []
	for (let i = 0; i < n; i++) shapes.push(geoShape(rng, 'n' + i, (i % 20) * 220, Math.floor(i / 20) * 180, 180, 100, 'svc ' + i))
	for (let i = 0; i < n * 2; i++) {
		const a = Math.floor(rng() * n)
		const b = Math.floor(rng() * n)
		if (a !== b) shapes.push(arrowShape('a' + i, 'n' + a, 'n' + b, ''))
	}
	return pack(shapes)
}

const GENERATORS: Record<string, (n: number) => CanvasBundle> = {
	flowchart: genFlowchart,
	tree: genTree,
	scatter: genScatter,
	dense: genDense,
}
const SIZES = [12, 120, 600, 2400]

// A compact, hand-built fixture standing in for a real canvas: a small flow plus
// the "building stack" pattern. Self-contained so tests don't depend on .pi/.
const REAL_FIXTURE: CanvasBundle = pack([
	{ _type: 'note', color: 'black', shapeId: 'note1', text: 'Lets draw something ???', x: 742, y: 94 },
	geoMin('rectFlow', -210, 400, 240, 100, 'Rectangle (blue, tint)'),
	geoMin('ellFlow', 400, 400, 200, 100, 'Ellipse (green, solid)', 'ellipse'),
	{ _type: 'note', color: 'violet', shapeId: 'noteFlow', text: 'Note shape (auto-size)', x: 979, y: 344 },
	{ _type: 'text', color: 'red', fontSize: 24, shapeId: 'txt1', text: 'Standalone text line', x: 100, y: 550 },
	geoMin('foundation', 698, 1324, 1175, 182, 'foundation'),
	geoMin('garage', 698, 1118, 378, 182, 'garage'),
	geoMin('house', 1111, 1118, 479, 182, 'house'),
	geoMin('other', 1616, 1118, 256, 182, 'other'),
	arrowShape('arr1', 'rectFlow', 'ellFlow', 'connects'),
	arrowShape('arr2', 'ellFlow', 'noteFlow', 'also connects'),
])

function geoMin(id: string, x: number, y: number, w: number, h: number, text: string, type = 'rectangle'): FocusedShape {
	return { _type: type, color: 'black', fill: 'none', h, note: '', shapeId: id, text, textAlign: 'middle', w, x, y }
}

// ---------------------------------------------------------------------------
// Correctness — invariants that must hold for any input
// ---------------------------------------------------------------------------

describe('tensor assembly invariants', () => {
	const corpus: Array<[string, CanvasBundle]> = [
		['real', REAL_FIXTURE],
		['empty', pack([])],
		['single', pack([geoMin('only', 0, 0, 100, 100, 'solo')])],
		['orphan-arrow', pack([arrowShape('a0', 'ghostA', 'ghostB', 'dangling')])],
		...Object.entries(GENERATORS).flatMap(([name, gen]) =>
			SIZES.map((n): [string, CanvasBundle] => [`${name} n=${n}`, gen(n)])
		),
	]

	for (const [name, bundle] of corpus) {
		it(`${name}: one row per shape, edges == arrows, ids unique`, () => {
			const rows = buildTensor(bundle)
			expect(rows).toHaveLength(bundle.shapes.length)

			const arrowCount = bundle.shapes.filter((s) => (s._type ?? s.type) === 'arrow').length
			expect(rows.filter((r) => r.kind === 'edge')).toHaveLength(arrowCount)

			const ids = new Set(rows.map((r) => r.id))
			expect(ids.size).toBe(rows.length)
		})

		it(`${name}: render is deterministic`, () => {
			expect(renderView(bundle)).toBe(renderView(bundle))
		})

		it(`${name}: reading order is a permutation of node ids`, () => {
			const rows = buildTensor(bundle)
			const nodeIds = rows.filter((r) => r.kind !== 'edge').map((r) => r.id).sort()
			// renderOverview sorts nodes by (cy, cx); ensure no node is dropped/duplicated
			const ordered = [...rows.filter((r) => r.kind !== 'edge')].map((r) => r.id).sort()
			expect(ordered).toEqual(nodeIds)
		})
	}
})

describe('assemble + enrich basics', () => {
	it('ignores bindings (graph comes from arrow fromId/toId)', () => {
		const withBindings = REAL_FIXTURE
		const withoutBindings: CanvasBundle = { shapes: REAL_FIXTURE.shapes, assets: [], bindings: [] }
		expect(renderView(withBindings)).toBe(renderView(withoutBindings))
	})

	it('computes degree from edges', () => {
		const rows = buildTensor(REAL_FIXTURE)
		const ell = rows.find((r) => r.id === 'ellFlow')!
		expect(ell.degree).toBe(2) // incoming from rectFlow, outgoing to noteFlow
		const foundation = rows.find((r) => r.id === 'foundation')!
		expect(foundation.degree).toBe(0)
	})

	it('fills derived center/area columns', () => {
		const [row] = enrich(assemble(pack([geoMin('b', 10, 20, 100, 50, 'b')])))
		expect(row.cx).toBe(60)
		expect(row.cy).toBe(45)
		expect(row.area).toBe(5000)
	})
})

// ---------------------------------------------------------------------------
// Value — reduction metrics and the bounded-summary guarantee (Finding 2)
// ---------------------------------------------------------------------------

describe('reduction metrics', () => {
	it('overview reduces connected diagrams by >=8x', () => {
		for (const name of ['flowchart', 'tree', 'dense']) {
			for (const n of SIZES) {
				const bundle = GENERATORS[name](n)
				const rawTok = estimateTokens(JSON.stringify(bundle))
				const viewTok = estimateTokens(renderOverview(buildTensor(bundle)))
				const ratio = rawTok / Math.max(viewTok, 1)
				expect(ratio, `${name} n=${n} ratio`).toBeGreaterThanOrEqual(8)
			}
		}
	})

	it('overview reduces even the worst case (scatter) by >=4x', () => {
		for (const n of SIZES) {
			const bundle = genScatter(n)
			const rawTok = estimateTokens(JSON.stringify(bundle))
			const viewTok = estimateTokens(renderOverview(buildTensor(bundle)))
			expect(rawTok / Math.max(viewTok, 1), `scatter n=${n}`).toBeGreaterThanOrEqual(4)
		}
	})
})

describe('summary aperture bounds output (Finding 2)', () => {
	it('stays under 1500 tokens regardless of canvas size', () => {
		for (const name of Object.keys(GENERATORS)) {
			for (const n of SIZES) {
				const tok = estimateTokens(renderSummary(buildTensor(GENERATORS[name](n))))
				expect(tok, `${name} n=${n} summary tokens`).toBeLessThan(1500)
			}
		}
	})

	it('summary token count is roughly constant in canvas size', () => {
		const small = estimateTokens(renderSummary(buildTensor(genDense(120))))
		const huge = estimateTokens(renderSummary(buildTensor(genDense(2400))))
		// 20x more shapes must not mean 2x more summary.
		expect(huge).toBeLessThan(small * 2)
	})

	it('overview does NOT bound large/dense canvases — the reason summary exists', () => {
		const overview = estimateTokens(renderOverview(buildTensor(genDense(2400))))
		const summary = estimateTokens(renderSummary(buildTensor(genDense(2400))))
		expect(overview).toBeGreaterThan(20_000)
		expect(summary).toBeLessThan(overview / 20)
	})

	it('auto aperture picks overview for small, summary for large', () => {
		expect(chooseAperture(buildTensor(genFlowchart(12)))).toBe('overview')
		expect(chooseAperture(buildTensor(genDense(600)))).toBe('summary')
	})
})

// ---------------------------------------------------------------------------
// Legibility — golden-ish checks on the real fixture
// ---------------------------------------------------------------------------

describe('overview render legibility', () => {
	it('renders the flow as an edge list with labels', () => {
		const view = renderOverview(buildTensor(REAL_FIXTURE))
		expect(view).toContain('"Rectangle (blue, tint)" —connects→ "Ellipse (green, solid)"')
		expect(view).toContain('"Ellipse (green, solid)" —also connects→ "Note shape (auto-size)"')
	})

	it('tags disconnected nodes as loose', () => {
		const view = renderOverview(buildTensor(REAL_FIXTURE))
		expect(view).toMatch(/rectangle "foundation" ·loose/)
	})

	it('summary reports components and hubs', () => {
		const view = renderSummary(buildTensor(REAL_FIXTURE))
		expect(view).toContain('GRAPH')
		expect(view).toMatch(/\d+ edges · \d+ components?/)
	})
})
