/**
 * Semantic layer for tldraw canvases.
 *
 * Turns the raw focused-shape "flood" into a compact, meaning-first view that is
 * cheap for an LLM to read. The pipeline is a small set of pure functions over a
 * uniform element table (the "tensor"):
 *
 *     bundle ──assemble──▶ RawRow[] ──enrich──▶ ElementRow[] ──render──▶ string
 *
 * Rendering is parameterized by an *aperture* — a named reduction policy:
 *   - 'overview' : census + edge list + reading-order nodes. Right for small/medium
 *                  canvases. Output grows with the canvas (O(nodes + edges)).
 *   - 'summary'  : census + graph statistics (components, hubs) + size distribution.
 *                  Bounded output (O(topK)) regardless of canvas size. Right for
 *                  large/dense canvases where an edge list would itself be a flood.
 *
 * This module is deliberately a *walking skeleton*: the columns and renderers are
 * the minimum that demonstrably reduces tokens while staying correct. Clustering,
 * containment, role inference, handles, focus/halo scoping, and image rendering are
 * later rings that enrich the same tensor — they are intentionally not here yet.
 */

export type ElementKind = 'node' | 'edge' | 'note' | 'text' | 'freehand' | 'frame' | 'group' | 'image'

/** A shape in the tldraw "focused" format (the shape that exec reads/writes). */
export interface FocusedShape {
	_type?: string
	type?: string
	shapeId?: string
	id?: string
	x?: number
	y?: number
	w?: number
	h?: number
	text?: string
	fromId?: string | null
	toId?: string | null
	[key: string]: unknown
}

export interface CanvasBundle {
	shapes: FocusedShape[]
	assets?: unknown[]
	/**
	 * Arrow→shape bindings. Intentionally ignored by the semantic layer: arrow
	 * `fromId`/`toId` already carry the graph, so bindings are pure redundancy for
	 * a reader. Kept in the type only so callers can pass a full bundle through.
	 */
	bindings?: unknown[]
}

/** Raw columns: a uniform row per element, before any derivation. */
export interface RawRow {
	id: string
	kind: ElementKind
	type: string
	x: number
	y: number
	w: number
	h: number
	text: string
	fromId: string | null
	toId: string | null
}

/** Enriched row: raw columns + the minimal derived columns the renderers use. */
export interface ElementRow extends RawRow {
	cx: number
	cy: number
	area: number
	degree: number
}

export type Aperture = 'overview' | 'summary'

export interface RenderOptions {
	aperture?: Aperture
	/** Element-count threshold above which 'auto' picks 'summary'. */
	autoThreshold?: number
	/** Top-K hubs/largest nodes to list in the summary aperture. */
	topK?: number
}

function kindOf(type: string): ElementKind {
	switch (type) {
		case 'arrow':
			return 'edge'
		case 'note':
			return 'note'
		case 'text':
			return 'text'
		case 'line':
		case 'draw':
			return 'freehand'
		case 'frame':
			return 'frame'
		case 'group':
			return 'group'
		case 'image':
			return 'image'
		default:
			return 'node'
	}
}

const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)

/** Stage 1 — flatten every shape into a uniform raw row. Lossless w.r.t. the columns we keep. */
export function assemble(bundle: CanvasBundle): RawRow[] {
	const shapes = Array.isArray(bundle.shapes) ? bundle.shapes : []
	return shapes.map((s) => {
		const type = s._type ?? s.type ?? 'unknown'
		return {
			id: String(s.shapeId ?? s.id ?? ''),
			kind: kindOf(type),
			type,
			x: Math.round(num(s.x)),
			y: Math.round(num(s.y)),
			w: Math.round(num(s.w)),
			h: Math.round(num(s.h)),
			text: (typeof s.text === 'string' ? s.text : '').trim(),
			fromId: s.fromId != null ? String(s.fromId) : null,
			toId: s.toId != null ? String(s.toId) : null,
		}
	})
}

/** Stage 2 — add the minimal derived columns (center, area, graph degree). */
export function enrich(rows: RawRow[]): ElementRow[] {
	const degree = new Map<string, number>()
	for (const r of rows) {
		if (r.kind !== 'edge') continue
		if (r.fromId) degree.set(r.fromId, (degree.get(r.fromId) ?? 0) + 1)
		if (r.toId) degree.set(r.toId, (degree.get(r.toId) ?? 0) + 1)
	}
	return rows.map((r) => ({
		...r,
		cx: r.x + r.w / 2,
		cy: r.y + r.h / 2,
		area: r.w * r.h,
		degree: degree.get(r.id) ?? 0,
	}))
}

/** Build the full tensor in one call. */
export function buildTensor(bundle: CanvasBundle): ElementRow[] {
	return enrich(assemble(bundle))
}

function splitNodesEdges(rows: ElementRow[]) {
	const nodes = rows.filter((r) => r.kind !== 'edge')
	const edges = rows.filter((r) => r.kind === 'edge')
	return { nodes, edges }
}

function census(rows: ElementRow[]): string {
	const counts: Record<string, number> = {}
	for (const r of rows) counts[r.kind] = (counts[r.kind] ?? 0) + 1
	return (
		Object.entries(counts)
			.sort(([, a], [, b]) => b - a)
			.map(([k, v]) => `${v} ${k}${v > 1 ? 's' : ''}`)
			.join(' · ') || 'empty'
	)
}

function medianArea(nodes: ElementRow[]): number {
	const areas = nodes
		.map((n) => n.area)
		.filter((a) => a > 0)
		.sort((a, b) => a - b)
	return areas.length ? areas[Math.floor(areas.length / 2)] : 0
}

function sizeClass(area: number, median: number): string {
	if (!area || !median) return '·'
	if (area < median * 0.5) return 's'
	if (area > median * 2) return 'L'
	return 'm'
}

function nodeLabel(id: string | null, byId: Map<string, ElementRow>): string {
	if (!id) return '∅'
	const n = byId.get(id)
	if (!n) return `${id}?` // unresolved endpoint (orphan arrow)
	return n.text ? `"${n.text}"` : n.type
}

/**
 * 'overview' aperture — census + full edge list + reading-order node list.
 * Output scales with the canvas; ideal for small/medium diagrams.
 */
export function renderOverview(rows: ElementRow[]): string {
	const { nodes, edges } = splitNodesEdges(rows)
	const byId = new Map(nodes.map((n) => [n.id, n]))
	const median = medianArea(nodes)

	const out: string[] = [`CANVAS · ${census(rows)}`, '']

	if (edges.length) {
		out.push('GRAPH')
		for (const e of edges) {
			const arrow = e.text ? ` —${e.text}→ ` : ' → '
			out.push(`  ${nodeLabel(e.fromId, byId)}${arrow}${nodeLabel(e.toId, byId)}`)
		}
		out.push('')
	}

	out.push(`NODES (reading order, ${nodes.length})`)
	const ordered = [...nodes].sort((a, b) => a.cy - b.cy || a.cx - b.cx)
	for (const n of ordered) {
		const loose = n.degree === 0 ? ' ·loose' : ''
		out.push(`  [${sizeClass(n.area, median)}] ${n.type}${n.text ? ` "${n.text}"` : ''}${loose}`)
	}
	return out.join('\n')
}

/** Weakly-connected components over the node/edge graph (union-find). */
function connectedComponents(nodes: ElementRow[], edges: ElementRow[]) {
	const parent = new Map<string, string>()
	const find = (x: string): string => {
		let root = x
		while (parent.get(root) !== root) root = parent.get(root)!
		while (parent.get(x) !== root) {
			const next = parent.get(x)!
			parent.set(x, root)
			x = next
		}
		return root
	}
	const union = (a: string, b: string) => {
		const ra = find(a)
		const rb = find(b)
		if (ra !== rb) parent.set(ra, rb)
	}
	for (const n of nodes) parent.set(n.id, n.id)
	for (const e of edges) {
		if (e.fromId && e.toId && parent.has(e.fromId) && parent.has(e.toId)) union(e.fromId, e.toId)
	}
	const sizes = new Map<string, number>()
	for (const n of nodes) {
		const root = find(n.id)
		sizes.set(root, (sizes.get(root) ?? 0) + 1)
	}
	return [...sizes.values()].sort((a, b) => b - a)
}

/**
 * 'summary' aperture — census + graph statistics + size distribution. Bounded
 * output (O(topK)) regardless of canvas size; ideal for large/dense diagrams
 * where listing every edge would itself be a flood.
 */
export function renderSummary(rows: ElementRow[], topK = 8): string {
	const { nodes, edges } = splitNodesEdges(rows)
	const byId = new Map(nodes.map((n) => [n.id, n]))
	const out: string[] = [`CANVAS · ${census(rows)}`, '']

	// --- Graph shape ---
	if (edges.length) {
		const comps = connectedComponents(nodes, edges)
		const isolated = nodes.filter((n) => n.degree === 0).length
		const labeled = edges.filter((e) => e.text).length
		out.push('GRAPH')
		out.push(`  ${edges.length} edges · ${comps.length} component${comps.length === 1 ? '' : 's'} (largest ${comps[0] ?? 0}) · ${isolated} isolated`)
		out.push(`  ${labeled}/${edges.length} edges labeled`)
		const hubs = [...nodes]
			.filter((n) => n.degree > 0)
			.sort((a, b) => b.degree - a.degree)
			.slice(0, topK)
		if (hubs.length) {
			out.push('  hubs:')
			for (const h of hubs) out.push(`    ${nodeLabel(h.id, byId)} (deg ${h.degree})`)
		}
		out.push('')
	}

	// --- Size distribution ---
	const median = medianArea(nodes)
	const buckets: Record<string, number> = { s: 0, m: 0, L: 0, '·': 0 }
	for (const n of nodes) buckets[sizeClass(n.area, median)]++
	out.push('SIZE')
	out.push(`  small ${buckets.s} · medium ${buckets.m} · large ${buckets.L} · sizeless ${buckets['·']}`)
	const biggest = [...nodes]
		.filter((n) => n.area > 0)
		.sort((a, b) => b.area - a.area)
		.slice(0, topK)
	if (biggest.length) {
		out.push('  largest:')
		for (const n of biggest) out.push(`    ${nodeLabel(n.id, byId)}`)
	}
	return out.join('\n')
}

/** Pick an aperture from canvas size when the caller asks for 'auto' (default). */
export function chooseAperture(rows: ElementRow[], threshold = 60): Aperture {
	return rows.length > threshold ? 'summary' : 'overview'
}

/** Top-level convenience: build the tensor and render at the chosen aperture. */
export function renderView(bundle: CanvasBundle, opts: RenderOptions = {}): string {
	const rows = buildTensor(bundle)
	const aperture = opts.aperture ?? chooseAperture(rows, opts.autoThreshold)
	return aperture === 'summary' ? renderSummary(rows, opts.topK) : renderOverview(rows)
}

/** Rough token estimate (chars/4). Exported for metrics/tests. */
export function estimateTokens(text: string): number {
	return Math.round(text.length / 4)
}
