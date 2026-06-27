import { describe, expect, it } from 'vitest'
import { createCanvasWorkflows, type CanvasHostPort } from '../src/canvas/workflow'
import type { StoredCanvasSnapshot } from '../src/store/project-store'

const snapshot = (canvasId: string, shapes: unknown[]): StoredCanvasSnapshot => ({
	version: 1,
	canvasId,
	cwd: '/tmp/project',
	updatedAt: 'now',
	shapeCount: shapes.length,
	assetCount: 0,
	bindingCount: 0,
	shapes,
	assets: [],
	bindings: [],
})

describe('canvas workflows', () => {
	it('initializes a new project canvas when a fresh browser has no snapshot', async () => {
		const execs: Array<{ code: string; canvasId?: string }> = []
		const host: CanvasHostPort = {
			open: async () => ({ url: 'http://host', spawned: true }),
			execOnCanvas: async (input) => { execs.push(input); return {} },
			getStatus: () => ({ url: 'http://host', browserConnected: true }),
		}
		const remembered: string[] = []
		const workflows = createCanvasWorkflows({
			canvasHost: host,
			loadCanvasSnapshot: async () => null,
			saveCanvasSnapshot: async (_cwd, canvasId, state) => snapshot(canvasId, state.shapes ?? []),
			resolveCanvasId: async () => undefined,
			rememberCanvasId: async (_cwd, canvasId) => { remembered.push(canvasId) },
			createProjectCanvasId: () => 'new-id',
		})

		const result = await workflows.ensureBrowserAndRestore('/tmp/project', undefined)

		expect(result.resolvedId).toBe('new-id')
		expect(execs).toEqual([{ code: 'return { initialized: true }', canvasId: 'new-id' }])
		expect(remembered).toEqual(['new-id'])
	})

	it('snapshots the live canvas through the host and persistence boundary', async () => {
		const savedStates: unknown[] = []
		const host: CanvasHostPort = {
			open: async () => ({ url: 'http://host', spawned: false }),
			execOnCanvas: async () => ({
				content: [{ type: 'text', text: 'Return value:\n{"shapes":[{"shapeId":"a"}]}\n\nCanvas ID: canvas-a' }],
			}),
			getStatus: () => ({ url: 'http://host', browserConnected: true }),
		}
		const workflows = createCanvasWorkflows({
			canvasHost: host,
			loadCanvasSnapshot: async () => null,
			saveCanvasSnapshot: async (_cwd, canvasId, state) => {
				savedStates.push(state)
				return snapshot(canvasId, state.shapes ?? [])
			},
			resolveCanvasId: async () => 'canvas-a',
			rememberCanvasId: async () => {},
			createProjectCanvasId: () => 'unused',
		})

		const saved = await workflows.snapshotLiveCanvas('/tmp/project', 'canvas-a')

		expect(saved.canvasId).toBe('canvas-a')
		expect(saved.shapeCount).toBe(1)
		expect(savedStates).toEqual([{ shapes: [{ shapeId: 'a' }], assets: [], bindings: [] }])
	})
})
