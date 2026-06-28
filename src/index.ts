import type { ExtensionAPI } from '@earendil-works/pi-coding-agent'
import { randomUUID } from 'node:crypto'
import { Type } from 'typebox'
import {
	applySceneLens,
	asCanvasBundle,
	READ_CANVAS_STATE_CODE,
	type CanvasStateBundle,
	type SceneLens,
	summarizeSnapshot,
	toRawCanvasState,
} from './canvas/state'
import {
	buildCanvasExportCode,
	formatBytes,
	parseCanvasExportPayload,
	parseDataUrl,
} from './canvas/export'
import { createCanvasWorkflows } from './canvas/workflow'
import { createCanvasHost } from './host/local-host'
import { TldrawMcpClient, type McpTool } from './mcp/client'
import {
	extractReturnValue,
	extractTextContent,
	parseCanvasIdFromResult,
	type McpToolResult,
} from './mcp/response'
import {
	getCanvasDir,
	getCurrentCanvasId as getStoredCurrentCanvasId,
	listCanvasSnapshots,
	loadCanvasSnapshot,
	saveCanvasSnapshot,
	setCurrentCanvasId as setStoredCurrentCanvasId,
} from './store/project-store'
import { saveCanvasImageExport } from './store/export-store'
import { createMcpServerManager } from './server/server-manager'
import {
	buildTensor,
	chooseAperture,
	renderOverview,
	renderSummary,
	type Aperture,
} from './semantic/layer'
import { parseTldrawCommand } from './commands/tldraw-command'
import { createTldrawStatusIndicator } from './ui/tldraw-status'
import { buildDiagramGuidance } from './diagram/guidance'

const DEFAULT_ENDPOINT = 'http://127.0.0.1:8787/mcp'
const CANVAS_RESOURCE_URI = 'ui://show-canvas/mcp-app.html'

function compactToolList(tools: McpTool[]) {
	return tools.map((tool) => {
		const appOnly = JSON.stringify(tool._meta ?? {}).includes('"app"')
		return `- ${tool.name}${tool.title ? ` (${tool.title})` : ''}${appOnly ? ' [app-only]' : ''}`
	})
}

function isBlockedTool(name: string) {
	return name === 'exec' || name.startsWith('_') || name === 'save_checkpoint' || name === 'read_checkpoint'
}

function createProjectCanvasId() {
	return randomUUID().replace(/-/g, '').slice(0, 8)
}

export default function (pi: ExtensionAPI) {
	const endpoint = process.env.TLDRAW_MCP_URL || DEFAULT_ENDPOINT
	const serverManager = createMcpServerManager(endpoint)
	const client = new TldrawMcpClient(endpoint, serverManager.ensure)
	let sessionCwd = process.cwd()
	let sessionCanvasId: string | undefined

	const statusIndicator = createTldrawStatusIndicator()
	const canvasHost = createCanvasHost(pi, endpoint, CANVAS_RESOURCE_URI, {
		async onAutoSave({
			canvasId,
			state,
		}: {
			canvasId: string
			state: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }
		}) {
			const saved = await saveCanvasSnapshot(sessionCwd, canvasId, state)
			await rememberCanvasId(sessionCwd, saved.canvasId)
		},
		async onRestore(canvasId: string) {
			return loadCanvasSnapshot(sessionCwd, canvasId)
		},
	})

	async function resolveCanvasId(cwd: string, explicitCanvasId?: string) {
		return explicitCanvasId ?? sessionCanvasId ?? (await getStoredCurrentCanvasId(cwd))
	}

	async function rememberCanvasId(cwd: string, canvasId: string) {
		sessionCanvasId = canvasId
		await setStoredCurrentCanvasId(cwd, canvasId)
	}


	const workflows = createCanvasWorkflows({
		canvasHost,
		loadCanvasSnapshot,
		saveCanvasSnapshot,
		resolveCanvasId,
		rememberCanvasId,
		createProjectCanvasId,
	})

	pi.registerTool({
		name: 'tldraw_status',
		label: 'tldraw MCP Status',
		description:
			'Check the configured tldraw MCP server, list exposed MCP tools, and report whether the canvas app resource is available.',
		promptSnippet: 'Check local tldraw MCP server health and list its tools/resources.',
		parameters: Type.Object({}),
		async execute(_toolCallId, _params, signal) {
			const [tools, resources] = await Promise.all([
				client.listTools(signal),
				client.listResources(signal),
			])
			const hasCanvas = resources.some((resource) => resource.uri === CANVAS_RESOURCE_URI)
			const text = [
				`tldraw MCP endpoint: ${endpoint}`,
				`Tools: ${tools.length}`,
				...compactToolList(tools),
				`Resources: ${resources.length}`,
				...resources.map((resource) => `- ${resource.uri}${resource.title ? ` (${resource.title})` : ''}`),
				hasCanvas
					? 'Canvas app resource is available. It still needs an MCP app-capable host to render the iframe.'
					: 'Canvas app resource was not advertised.',
			].join('\n')
			return { content: [{ type: 'text', text }], details: { endpoint, tools, resources, hasCanvas } }
		},
	})

	pi.registerTool({
		name: 'tldraw_search',
		label: 'tldraw MCP Search',
		description:
			'Call the tldraw MCP search tool. This is read-only and works without rendering the canvas widget.',
		promptSnippet: 'Search the tldraw Editor API exposed by the local tldraw MCP server.',
		promptGuidelines: [
			'Use tldraw_search to inspect tldraw Editor APIs before proposing canvas execution code.',
		],
		parameters: Type.Object({
			code: Type.String({
				description:
					'JavaScript code for the MCP search tool. It receives `spec`; use `return` to produce output.',
			}),
		}),
		async execute(_toolCallId, params, signal) {
			const result = (await client.callTool('search', { code: params.code }, signal)) as McpToolResult
			return {
				content: [{ type: 'text', text: extractTextContent(result) }],
				details: { endpoint, mcpTool: 'search', result },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_read_canvas_resource',
		label: 'Read tldraw MCP Canvas Resource',
		description:
			'Read metadata for the tldraw MCP canvas app resource. This proves the artifact HTML is exposed, but Pi does not render MCP app iframes yet.',
		parameters: Type.Object({}),
		async execute(_toolCallId, _params, signal) {
			const result = (await client.readResource(CANVAS_RESOURCE_URI, signal)) as {
				contents?: Array<{ text?: unknown }>
			}
			const html = result.contents?.[0]?.text
			const text = [
				`Resource: ${CANVAS_RESOURCE_URI}`,
				`HTML bytes: ${typeof html === 'string' ? html.length : 0}`,
				'Pi can fetch this MCP app resource, but this terminal session does not mount the iframe.',
				'To see drawings, open the same MCP server from an MCP client that supports app resources.',
			].join('\n')
			return {
				content: [{ type: 'text', text }],
				details: { endpoint, resourceUri: CANVAS_RESOURCE_URI, htmlBytes: typeof html === 'string' ? html.length : 0 },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_open',
		label: 'Open tldraw Canvas Host',
		description:
			'Open a local browser host that renders the tldraw MCP app iframe and bridges it to Pi. Optionally restore a project-scoped saved canvas.',
		parameters: Type.Object({
			canvasId: Type.Optional(
				Type.String({ description: 'Project canvas ID to restore. Omit to use the current project canvas if one exists.' })
			),
			restore: Type.Optional(
				Type.Boolean({ description: 'Whether to restore the project snapshot after opening. Defaults to true.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			const { url, restoreText } = await workflows.ensureBrowserAndRestore(cwd, params.canvasId, signal, {
				restore: params.restore !== false,
			})
			return {
				content: [
					{
						type: 'text',
						text: `Opened local tldraw canvas host: ${url}\n${restoreText}\nKeep that browser tab open while using tldraw_canvas_exec.`,
					},
				],
				details: { url, status: canvasHost.getStatus(), currentCanvasId: sessionCanvasId },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_diagram_tips',
		label: 'tldraw Diagram Tips',
		description:
			'Return minimalist drawing guidance for spacious, readable tldraw diagrams: negative space, legibility, alignment, connection routing, and visual restraint.',
		promptSnippet: 'Get minimalist drawing guidance before creating or revising a tldraw diagram.',
		promptGuidelines: [
			'Use tldraw_diagram_tips before tldraw_canvas_exec when creating or significantly rearranging any non-trivial tldraw diagram.',
			'Use tldraw_diagram_tips when a tldraw diagram looks cramped, has overlapping arrows, unclear hierarchy, or needs visual polish.',
		],
		parameters: Type.Object({
			focus: Type.Optional(
				Type.String({ description: 'Optional drawing concern to emphasize.' })
			),
		}),
		async execute(_toolCallId, params) {
			const guidance = buildDiagramGuidance(params)
			return {
				content: [{ type: 'text', text: guidance.text }],
				details: { focus: guidance.focus },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_export',
		label: 'Export tldraw Canvas Image',
		description:
			'Export the current tldraw selection or whole canvas as an image through the live browser host. Returns PNG by default for immediate visual feedback; SVG is also supported.',
		promptSnippet: 'Export the current tldraw selection or whole canvas as a PNG/SVG image for visual feedback.',
		promptGuidelines: [
			'Use tldraw_canvas_export after drawing or rearranging a diagram when visual appearance matters and the model needs immediate feedback.',
			'Use tldraw_canvas_export with scope:"selected" when the user has selected the region of interest; use scope:"all" for the whole canvas.',
			'tldraw_canvas_export requires a live browser canvas. If it fails because no browser is connected, open the canvas with tldraw_canvas_open first.',
		],
		parameters: Type.Object({
			scope: Type.Optional(
				Type.String({ description: 'selected | all. Defaults to selected; if nothing is selected, selected falls back to all.' })
			),
			format: Type.Optional(
				Type.String({ description: 'png | svg. Defaults to png.' })
			),
			canvasId: Type.Optional(
				Type.String({ description: 'Canvas ID to export. Omit to use the current project canvas.' })
			),
			open: Type.Optional(
				Type.Boolean({ description: 'Whether to open/focus the local browser host before exporting. Defaults to true.' })
			),
			background: Type.Optional(
				Type.Boolean({ description: 'Include a background in the export. Defaults to true.' })
			),
			padding: Type.Optional(
				Type.Number({ description: 'Optional fixed export padding in pixels. Omit to let tldraw trim automatically.' })
			),
			scale: Type.Optional(
				Type.Number({ description: 'Optional logical export scale.' })
			),
			pixelRatio: Type.Optional(
				Type.Number({ description: 'Optional bitmap pixel ratio. Defaults to 1 to keep feedback images compact.' })
			),
			save: Type.Optional(
				Type.Boolean({ description: 'Save a copy under .pi/tldraw-exports. Defaults to true.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			let started: { url: string | null; port?: number | null; spawned?: boolean }
			let canvasId: string | undefined
			if (params.open === false) {
				started = await canvasHost.ensureStarted(signal)
				canvasId = await resolveCanvasId(cwd, params.canvasId)
			} else {
				const opened = await workflows.ensureBrowserAndRestore(cwd, params.canvasId, signal)
				started = opened
				canvasId = opened.resolvedId
			}
			if (!canvasHost.getStatus().browserConnected) {
				throw new Error('No live browser canvas is connected. Use tldraw_canvas_open first, wait for Canvas ready, then export.')
			}

			const code = buildCanvasExportCode(params)
			const result = (await canvasHost.execOnCanvas(
				{ code, canvasId, timeoutMs: 60_000 },
				signal
			)) as McpToolResult
			const returnedCanvasId = parseCanvasIdFromResult(result) ?? canvasId
			if (returnedCanvasId) await rememberCanvasId(cwd, returnedCanvasId)

			const payload = parseCanvasExportPayload(extractReturnValue(result))
			const image = parseDataUrl(payload.dataUrl)
			let savedPath: string | undefined
			if (params.save !== false) {
				savedPath = await saveCanvasImageExport(cwd, {
					canvasId: returnedCanvasId,
					format: payload.format,
					scope: payload.scope,
					data: image.data,
				})
			}

			const fallbackText = payload.fallbackToAll ? ' Selection was empty, so exported the whole canvas.' : ''
			const text = [
				`Exported ${payload.exportedShapeIds.length} shape(s) as ${payload.format.toUpperCase()} (${payload.width}×${payload.height}, ${formatBytes(image.bytes)}).${fallbackText}`,
				`Scope: ${payload.scope}. Canvas host: ${started.url}`,
				savedPath ? `Saved: ${savedPath}` : 'Saved: no',
			].join('\n')

			return {
				content: [
					{ type: 'text', text },
					{ type: 'image', data: image.data, mimeType: image.mimeType },
				],
				details: {
					endpoint,
					host: canvasHost.getStatus(),
					canvasId: returnedCanvasId,
					format: payload.format,
					scope: payload.scope,
					width: payload.width,
					height: payload.height,
					bytes: image.bytes,
					mimeType: image.mimeType,
					exportedShapeIds: payload.exportedShapeIds,
					selectedCount: payload.selectedCount,
					fallbackToAll: payload.fallbackToAll,
					savedPath,
				},
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_exec',
		label: 'Execute on tldraw Canvas',
		description:
			'Execute JavaScript on the visible local tldraw canvas host. This starts/opens a browser bridge if needed, then sends code to the tldraw MCP exec app tool.',
		promptSnippet: 'Draw or update a visible tldraw canvas through the local browser bridge.',
		promptGuidelines: [
			'Use tldraw_canvas_exec when the user asks to create a visible tldraw diagram from Pi.',
			'Before creating or significantly rearranging a non-trivial diagram with tldraw_canvas_exec, call tldraw_diagram_tips and follow its drawing principles.',
			'When laying out diagrams with tldraw_canvas_exec, add generous negative space: large gaps between nodes, roomy group padding, clear lanes, and no arrows or labels running through unrelated shapes.',
			'After drawing with tldraw_canvas_exec, call tldraw_canvas_scene to review structure and fix cramped clusters, overlapping arrows, or ambiguous relationships before declaring the diagram done.',
			'Shapes use the FOCUSED format with _type — NOT tldraw\'s internal types. Valid _type values: rectangle, ellipse, triangle, diamond, hexagon, pill, cloud, x-box, check-box, heart, pentagon, octagon, star, parallelogram-right, parallelogram-left, fat-arrow-right, fat-arrow-left, fat-arrow-up, fat-arrow-down, arrow, note, text, line, draw.',
			'DO NOT use _type: "geo" — that is tldraw\'s internal type name. Use _type: "rectangle" instead.',
			'Create shapes: editor.createShape({ _type: \'rectangle\', shapeId: \'box1\', x: 100, y: 100, w: 240, h: 120, text: \'Label\', color: \'blue\', fill: \'tint\' }).',
			'Connect shapes: createArrowBetweenShapes(\'box1\', \'box2\', { text: \'label\' }) — pass shape IDs as strings, not shape objects.',
			'Group shapes: boxShapes([\'box1\', \'box2\'], { text: \'Group label\', color: \'blue\' }) — pass shape IDs as strings.',
			'Available colors: black, grey, light-grey, red, orange, yellow, green, blue, light-blue, violet, light-violet.',
			'Available fills: none, tint, solid.',
			'Shape IDs must be unique strings. Reuse an ID to update an existing shape.',
			'Read shapes: const shapes = editor.getCurrentPageShapes() — returns focused shapes with _type, shapeId, text, x, y, w, h, color.',
			'Note: note shapes auto-size and do NOT have w/h. Use editor.getShapePageBounds(shapeId) for bounds if needed (but this method may return the editor object via the proxy — prefer reading w/h from focused shapes for geo shapes).',
		],
		parameters: Type.Object({
			code: Type.String({
				description:
					'JavaScript code to run in the tldraw MCP app iframe. It has access to `editor` (focused proxy — use _type not type), `createArrowBetweenShapes(fromId, toId, opts)`, and `boxShapes(ids, opts)`. Use _type: "rectangle" not "geo".',
			}),
			canvasId: Type.Optional(
				Type.String({ description: 'Canvas ID returned by an earlier tldraw MCP exec result.' })
			),
			open: Type.Optional(
				Type.Boolean({ description: 'Whether to open/focus the local browser host before executing.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			let started: { url: string | null; port?: number | null; spawned?: boolean }
			let canvasId: string | undefined
			if (params.open === false) {
				started = await canvasHost.ensureStarted(signal)
				canvasId = await resolveCanvasId(cwd, params.canvasId)
			} else {
				const opened = await workflows.ensureBrowserAndRestore(cwd, params.canvasId, signal)
				started = opened
				canvasId = opened.resolvedId
			}
			const result = (await canvasHost.execOnCanvas(
				{ code: params.code, canvasId },
				signal
			)) as McpToolResult
			const resultText = extractTextContent(result)
			const returnedCanvasId = parseCanvasIdFromResult(result) ?? canvasId
			let saveText = 'Project snapshot was not saved.'
			if (returnedCanvasId) {
				await rememberCanvasId(cwd, returnedCanvasId)
				try {
					const snapshot = await workflows.snapshotLiveCanvas(cwd, returnedCanvasId, signal)
					saveText = `Saved project snapshot ${snapshot.canvasId} to ${getCanvasDir(cwd)} (${summarizeSnapshot(snapshot)}).`
				} catch (error) {
					saveText = `Could not save project snapshot: ${error instanceof Error ? error.message : String(error)}`
				}
			}
			return {
				content: [
					{
						type: 'text',
						text: `Executed code on local tldraw canvas host: ${started.url}\n\n${resultText}\n\n${saveText}`,
					},
				],
				details: { endpoint, host: canvasHost.getStatus(), canvasId: returnedCanvasId, result },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_state',
		label: 'Inspect tldraw Canvas State',
		description:
			'Read RAW tldraw canvas shapes (every shape with exact x/y/w/h and all props) through the local browser host, and optionally save to the project-scoped .pi/tldraw-canvases store. This is verbose; to UNDERSTAND the canvas prefer tldraw_canvas_scene (compact semantic view). Use this when you need precise geometry to edit a specific shape, or to force a project save.',
		promptSnippet: 'Read raw tldraw shapes with exact geometry (verbose) or save the project snapshot. For understanding the canvas, prefer tldraw_canvas_scene.',
		promptGuidelines: [
			'Prefer tldraw_canvas_scene to look at or reason about the canvas — it is far cheaper. Use tldraw_canvas_state only for exact per-shape geometry before an edit, or to save a snapshot.',
		],
		parameters: Type.Object({
			canvasId: Type.Optional(
				Type.String({ description: 'Canvas ID to read. Omit to use the current project canvas.' })
			),
			save: Type.Optional(
				Type.Boolean({ description: 'Whether to save the snapshot to .pi/tldraw-canvases. Defaults to true.' })
			),
			open: Type.Optional(
				Type.Boolean({ description: 'Whether to open/focus the local browser host before reading.' })
			),
			force: Type.Optional(
				Type.Boolean({ description: 'Allow overwriting a non-empty saved snapshot with an empty live canvas.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			let started: { url: string | null; port?: number | null; spawned?: boolean }
			if (params.open === true) {
				started = await workflows.ensureBrowserAndRestore(cwd, params.canvasId, signal)
			} else {
				started = await canvasHost.ensureStarted(signal)
			}
			if (!canvasHost.getStatus().browserConnected) {
				throw new Error('No live browser canvas is connected. Use /tldraw open first, wait for Canvas ready, then inspect/save.')
			}
			const canvasId = await resolveCanvasId(cwd, params.canvasId)
			const result = (await canvasHost.execOnCanvas(
				{ code: READ_CANVAS_STATE_CODE, canvasId },
				signal
			)) as McpToolResult
			const returnedCanvasId = parseCanvasIdFromResult(result) ?? canvasId
			const state = (extractReturnValue(result) ?? {}) as Partial<CanvasStateBundle>
			let saveText = 'Snapshot not saved.'
			if (params.save !== false && returnedCanvasId) {
				const snapshot = await saveCanvasSnapshot(
					cwd,
					returnedCanvasId,
					{
						shapes: Array.isArray(state.shapes) ? state.shapes : [],
						assets: Array.isArray(state.assets) ? state.assets : [],
						bindings: Array.isArray(state.bindings) ? state.bindings : [],
					},
					{ allowEmptyOverwrite: params.force === true }
				)
				await rememberCanvasId(cwd, returnedCanvasId)
				saveText = `Saved project snapshot ${snapshot.canvasId} to ${getCanvasDir(cwd)} (${summarizeSnapshot(snapshot)}).`
			} else if (returnedCanvasId) {
				await rememberCanvasId(cwd, returnedCanvasId)
			}
			return {
				content: [
					{
						type: 'text',
						text: [
							`Canvas host: ${started.url}`,
							`Canvas ID: ${returnedCanvasId ?? 'none'}`,
							`State: ${summarizeSnapshot(state)}`,
							saveText,
						].join('\n'),
					},
				],
				details: { endpoint, host: canvasHost.getStatus(), canvasId: returnedCanvasId, state },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_canvas_scene',
		label: 'Read tldraw Canvas (semantic view)',
		description:
			'Read the canvas as a compact, meaning-first view — a census, the connection graph, and the spatial structure, NOT raw coordinates. This is the cheap "glance at the canvas" read; the level of detail is chosen automatically by canvas size, so it scales to large canvases. Use this FIRST whenever you need to look at, understand, or build on what is drawn. Falls back to the saved snapshot when no live browser is connected, so it also works offline.',
		promptSnippet: 'Glance at the canvas as a compact semantic view (cheap; scales to large canvases).',
		promptGuidelines: [
			'tldraw_canvas_scene is the DEFAULT way to look at the canvas — call it first to understand what the user has drawn. You do not choose the detail level; it is picked automatically (overview for small canvases, summary for large ones).',
			'It returns a meaning-first view (graph + structure), not raw geometry. This is far cheaper than reading raw shapes and is what you should reason over for layout, relationships, and intent.',
			'Use lens:"selected" when the user has selected shapes and wants a semantic view of only that selection; use lens:"all" or omit it for the whole canvas.',
			'Reach for tldraw_canvas_state (raw shapes with exact x/y/w/h) ONLY when you need precise geometry to move or resize a specific shape — i.e. right before an edit. For understanding, always prefer the scene.',
			'You can override the level with detail: "overview" | "summary" | "raw" if you really need to; the default "auto" is almost always correct.',
		],
		parameters: Type.Object({
			detail: Type.Optional(
				Type.String({
					description:
						'auto | overview | summary | raw. Default "auto" picks overview for small canvases and summary for large ones. Use "raw" only when you need exact per-shape geometry to edit.',
				})
			),
			open: Type.Optional(
				Type.Boolean({ description: 'Open/focus the browser host before reading. Defaults to false (reuse a connected browser, else fall back to the saved snapshot).' })
			),
			canvasId: Type.Optional(
				Type.String({ description: 'Canvas to read from the saved snapshot when no live browser is connected.' })
			),
			lens: Type.Optional(
				Type.String({ description: 'all | selected. Default "all" reads the whole canvas; "selected" reads only currently selected shapes.' })
			),
		}),
		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const cwd = ctx?.cwd ?? sessionCwd
			await serverManager.ensure(signal)
			const detail = (params.detail ?? 'auto') as 'auto' | Aperture | 'raw'
			const lensParam = params.lens ?? 'all'
			if (lensParam !== 'all' && lensParam !== 'selected') throw new Error('lens must be "all" or "selected"')
			const lens = lensParam as SceneLens

			if (params.open === true) await workflows.ensureBrowserAndRestore(cwd, params.canvasId, signal)
			else await canvasHost.ensureStarted(signal)

			// Prefer the live canvas; fall back to the saved snapshot so this read
			// works headless/offline. The semantic layer runs in-extension on either.
			let resolvedCanvasId = await resolveCanvasId(cwd, params.canvasId)
			let bundle: CanvasStateBundle | null = null
			let source = 'live'
			if (canvasHost.getStatus().browserConnected) {
				const result = (await canvasHost.execOnCanvas(
					{ code: READ_CANVAS_STATE_CODE, canvasId: resolvedCanvasId },
					signal
				)) as McpToolResult
				resolvedCanvasId = parseCanvasIdFromResult(result) ?? resolvedCanvasId
				bundle = (result.structuredContent ?? extractReturnValue(result) ?? null) as CanvasStateBundle | null
			} else {
				const snapshot = await loadCanvasSnapshot(cwd, resolvedCanvasId)
				if (snapshot) {
					bundle = { shapes: snapshot.shapes, assets: snapshot.assets, bindings: snapshot.bindings }
					source = 'snapshot'
				}
			}
			if (!bundle || !Array.isArray(bundle.shapes)) {
				throw new Error(
					'No canvas to read. Open the canvas with /tldraw open (wait for "Canvas ready"), or pass a canvasId that has a saved snapshot.'
				)
			}
			if (resolvedCanvasId) await rememberCanvasId(cwd, resolvedCanvasId)

			const selectedCount = Array.isArray(bundle.selectedIds) ? bundle.selectedIds.length : 0
			const lensedBundle = applySceneLens(bundle, lens)

			if (detail === 'raw') {
				const raw = toRawCanvasState(lensedBundle)
				return {
					content: [{ type: 'text', text: JSON.stringify(raw, null, 2) }],
					details: { endpoint, source, canvasId: resolvedCanvasId, detail: 'raw', lens, selectedCount },
				}
			}

			const rows = buildTensor(asCanvasBundle(lensedBundle))
			const aperture: Aperture = detail === 'auto' ? chooseAperture(rows) : detail
			const view = aperture === 'summary' ? renderSummary(rows) : renderOverview(rows)
			const lensNote = lens === 'selected' ? ' · lens=selected' : ''
			const emptySelectionNote = lens === 'selected' && selectedCount === 0 ? ' · no selected shapes' : ''
			const header = `tldraw canvas · ${rows.length} elements · aperture=${aperture}${lensNote}${source === 'snapshot' ? ' · from saved snapshot' : ''}${selectedCount ? ` · ${selectedCount} selected` : ''}${emptySelectionNote}`
			const hint =
				aperture === 'summary'
					? 'Bounded summary of a large canvas. For a specific node\'s edges use detail:"overview"; for exact geometry to edit, use tldraw_canvas_state or detail:"raw".'
					: 'For exact x/y/w/h to move or resize a shape, call tldraw_canvas_state or detail:"raw".'
			return {
				content: [{ type: 'text', text: `${header}\n\n${view}\n\n${hint}` }],
				details: { endpoint, source, canvasId: resolvedCanvasId, aperture, lens, elements: rows.length, selectedCount },
			}
		},
	})

	pi.registerTool({
		name: 'tldraw_call_readonly_tool',
		label: 'Call read-only tldraw MCP tool',
		description:
			'Experimental curated MCP bridge: call a non-app-only, non-exec tldraw MCP tool by name. Blocks exec and app-only checkpoint/callback tools.',
		parameters: Type.Object({
			toolName: Type.String({ description: 'MCP tool name to call, e.g. search' }),
			argsJson: Type.String({ description: 'Tool arguments as a JSON object string' }),
		}),
		async execute(_toolCallId, params, signal) {
			if (isBlockedTool(params.toolName)) {
				throw new Error(
					`Blocked ${params.toolName}: this Pi experiment only exposes read-only MCP calls. The tldraw MCP exec tool requires an MCP app iframe host.`
				)
			}
			const args = JSON.parse(params.argsJson) as unknown
			if (!args || typeof args !== 'object' || Array.isArray(args)) {
				throw new Error('argsJson must parse to a JSON object')
			}
			const toolArgs = args as Record<string, unknown>
			const result = (await client.callTool(params.toolName, toolArgs, signal)) as McpToolResult
			return {
				content: [{ type: 'text', text: extractTextContent(result) }],
				details: { endpoint, mcpTool: params.toolName, result },
			}
		},
	})

	pi.registerCommand('tldraw', {
		description: 'Inspect/control tldraw MCP (/tldraw status|start|restart|tools|resource|open [canvasId]|save|canvases|current|host|reset).',
		handler: async (args, ctx) => {
			const command = parseTldrawCommand(args)
			const clearStatus = () => ctx.ui.setStatus('tldraw', undefined)
			const commandHandlers: Record<typeof command.type, () => Promise<void>> = {
				reset: async () => {
					client.reset()
					ctx.ui.notify('tldraw MCP session reset.', 'info')
				},
				current: async () => {
					const current = await getStoredCurrentCanvasId(ctx.cwd)
					ctx.ui.setWidget('tldraw-current', [
						'tldraw current canvas:',
						`cwd: ${ctx.cwd}`,
						`canvasId: ${sessionCanvasId ?? current ?? 'none'}`,
						`store: ${getCanvasDir(ctx.cwd)}`,
					])
				},
				canvases: async () => {
					const canvases = await listCanvasSnapshots(ctx.cwd)
					ctx.ui.setWidget('tldraw-canvases', [
						`tldraw project canvases (${canvases.length}):`,
						`store: ${getCanvasDir(ctx.cwd)}`,
						...canvases.map(
							(entry: { canvasId: string; shapeCount: number; updatedAt: string }) =>
								`- ${entry.canvasId} · ${entry.shapeCount} shape(s) · ${entry.updatedAt || 'unknown time'}`
						),
					])
				},
				save: async () => {
					clearStatus()
					statusIndicator.update(ctx, 'working')
					await serverManager.ensure(ctx.signal)
					const status = canvasHost.getStatus()
					if (!status.url) {
						throw new Error('Canvas host is not started. Use /tldraw open first, make edits, then /tldraw save.')
					}
					if (!status.browserConnected) {
						throw new Error(`No live browser canvas is connected at ${status.url}. Reopen with /tldraw open before saving.`)
					}
					const canvasId = await resolveCanvasId(ctx.cwd, command.canvasId)
					const snapshot = await workflows.snapshotLiveCanvas(ctx.cwd, canvasId, ctx.signal, {
						allowEmptyOverwrite: command.force,
					})
					ctx.ui.notify(`Saved ${snapshot.canvasId} (${summarizeSnapshot(snapshot)})`, 'info')
					clearStatus()
					statusIndicator.update(ctx, canvasHost.getStatus().browserConnected ? 'connected' : 'ready')
				},
				start: async () => {
					clearStatus()
					statusIndicator.update(ctx, 'starting')
					await serverManager.start(ctx.signal)
					ctx.ui.notify(`tldraw MCP server reachable at ${endpoint}`, 'info')
					clearStatus()
					statusIndicator.update(ctx, 'ready')
				},
				restart: async () => {
					clearStatus()
					statusIndicator.update(ctx, 'starting')
					client.reset()
					await serverManager.restart(ctx.signal)
					ctx.ui.notify(`tldraw MCP server restarted at ${endpoint}`, 'info')
					clearStatus()
					statusIndicator.update(ctx, 'ready')
				},
				tools: async () => {
					const tools = await client.listTools(ctx.signal)
					ctx.ui.setWidget('tldraw', ['tldraw MCP tools:', ...compactToolList(tools)])
				},
				open: async () => {
					clearStatus()
					statusIndicator.update(ctx, 'starting')
					await serverManager.ensure(ctx.signal)
					const { url, restoreText } = await workflows.ensureBrowserAndRestore(ctx.cwd, command.canvasId, ctx.signal)
					ctx.ui.notify(`Opened tldraw canvas host: ${url}. ${restoreText}`, 'info')
					clearStatus()
					statusIndicator.update(ctx, canvasHost.getStatus().browserConnected ? 'connected' : 'ready')
				},
				host: async () => {
					const status = canvasHost.getStatus()
					const server = serverManager.getStatus()
					ctx.ui.setWidget('tldraw-host', [
						'tldraw canvas host:',
						`url: ${status.url ?? 'not started'}`,
						`browser connected: ${status.browserConnected ? 'yes' : 'no'}`,
						`queued: ${status.queued}`,
						`pending: ${status.pending}`,
						'canvas logs:',
						...status.logs.slice(-12),
						'',
						'tldraw MCP server:',
						`endpoint: ${server.endpoint}`,
						`auto start: ${server.autoStart ? 'yes' : 'no'}`,
						`managed pid: ${server.managedPid ?? 'none'}`,
						`app dir: ${server.appDir}`,
						...server.logs.slice(-8),
					])
				},
				resource: async () => {
					const result = (await client.readResource(CANVAS_RESOURCE_URI, ctx.signal)) as {
						contents?: Array<{ text?: unknown }>
					}
					const html = result.contents?.[0]?.text
					const bytes = typeof html === 'string' ? html.length : 0
					ctx.ui.notify(`Canvas resource fetched (${bytes} bytes).`, 'info')
				},
				status: async () => {
					await Promise.all([client.listTools(ctx.signal), client.listResources(ctx.signal)])
					const server = serverManager.getStatus()
					clearStatus()
					statusIndicator.update(ctx, 'ready')
					ctx.ui.notify(`tldraw MCP OK at ${endpoint}${server.managedPid ? ` (pid ${server.managedPid})` : ''}`, 'info')
				},
			}

			try {
				await commandHandlers[command.type]()
			} catch (error) {
				clearStatus()
				statusIndicator.update(ctx, 'error')
				ctx.ui.notify(error instanceof Error ? error.message : String(error), 'error')
			}
		},
	})

	pi.on('session_start', async (_event, ctx) => {
		sessionCwd = ctx.cwd
		sessionCanvasId = await getStoredCurrentCanvasId(ctx.cwd)
		statusIndicator.update(ctx, 'idle')
	})

	pi.on('session_shutdown', async () => {
		statusIndicator.stop()
		client.reset()
		await canvasHost.close()
		await serverManager.stop()
	})
}
