import {
	INITIALIZE_CANVAS_CODE,
	READ_CANVAS_STATE_CODE,
	restoreCanvasCode,
	summarizeSnapshot,
	type CanvasStateBundle,
} from './state'
import { extractReturnValue, extractTextContent, parseCanvasIdFromText, type McpToolResult } from '../mcp/response'
import type { StoredCanvasSnapshot } from '../store/project-store'

export type CanvasHostPort = {
	open(signal?: AbortSignal): Promise<{ url: string; spawned: boolean }>
	execOnCanvas(
		input: { code: string; canvasId?: string; timeoutMs?: number },
		signal?: AbortSignal
	): Promise<unknown>
	getStatus(): { url: string | null; browserConnected: boolean }
}

export type CanvasWorkflowDeps = {
	canvasHost: CanvasHostPort
	loadCanvasSnapshot(cwd: string, canvasId?: string): Promise<StoredCanvasSnapshot | null>
	saveCanvasSnapshot(
		cwd: string,
		canvasId: string,
		state: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] },
		opts?: { allowEmptyOverwrite?: boolean }
	): Promise<StoredCanvasSnapshot>
	resolveCanvasId(cwd: string, explicitCanvasId?: string): Promise<string | undefined>
	rememberCanvasId(cwd: string, canvasId: string): Promise<void>
	createProjectCanvasId(): string
}

export function createCanvasWorkflows(deps: CanvasWorkflowDeps) {
	return {
		async ensureBrowserAndRestore(
			cwd: string,
			canvasId: string | undefined,
			signal?: AbortSignal,
			opts: { restore?: boolean } = {}
		) {
			const { url, spawned } = await deps.canvasHost.open(signal)
			let resolvedId = await deps.resolveCanvasId(cwd, canvasId)
			let restoreText = spawned
				? 'No project canvas restored.'
				: 'Browser already open; live canvas unchanged.'

			if (spawned && opts.restore !== false) {
				if (!resolvedId) resolvedId = deps.createProjectCanvasId()
				const snapshot = await deps.loadCanvasSnapshot(cwd, resolvedId)
				if (snapshot) {
					await deps.canvasHost.execOnCanvas(
						{ code: restoreCanvasCode(snapshot), canvasId: snapshot.canvasId },
						signal
					)
					await deps.rememberCanvasId(cwd, snapshot.canvasId)
					restoreText = `Restored project canvas ${snapshot.canvasId} (${summarizeSnapshot(snapshot)}). Autosave is on.`
				} else {
					await deps.canvasHost.execOnCanvas(
						{ code: INITIALIZE_CANVAS_CODE, canvasId: resolvedId },
						signal
					)
					await deps.rememberCanvasId(cwd, resolvedId)
					restoreText = `Started new project canvas ${resolvedId}. Autosave is on.`
				}
			}

			return { url, spawned, resolvedId, restoreText }
		},

		async snapshotLiveCanvas(
			cwd: string,
			canvasId: string | undefined,
			signal?: AbortSignal,
			opts?: { allowEmptyOverwrite?: boolean }
		) {
			const hostStatus = deps.canvasHost.getStatus()
			if (!hostStatus.browserConnected) {
				throw new Error(
					`No live browser canvas is connected. Open the canvas tab with /tldraw open, wait for "Canvas ready", then save again. Host: ${hostStatus.url ?? 'not started'}`
				)
			}
			const result = (await deps.canvasHost.execOnCanvas(
				{ code: READ_CANVAS_STATE_CODE, canvasId, timeoutMs: 60_000 },
				signal
			)) as McpToolResult
			const text = extractTextContent(result)
			const returnedCanvasId = parseCanvasIdFromText(text) ?? canvasId
			if (!returnedCanvasId) throw new Error('Could not determine canvasId from live canvas read.')
			const state = (result.structuredContent ?? extractReturnValue(result) ?? {}) as Partial<CanvasStateBundle>
			const saved = await deps.saveCanvasSnapshot(
				cwd,
				returnedCanvasId,
				{
					shapes: Array.isArray(state.shapes) ? state.shapes : [],
					assets: Array.isArray(state.assets) ? state.assets : [],
					bindings: Array.isArray(state.bindings) ? state.bindings : [],
				},
				{ allowEmptyOverwrite: opts?.allowEmptyOverwrite }
			)
			await deps.rememberCanvasId(cwd, returnedCanvasId)
			return saved
		},
	}
}
