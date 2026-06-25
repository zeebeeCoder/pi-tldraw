import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { afterEach, describe, expect, it } from 'vitest'
import {
	getCanvasDir,
	getCurrentCanvasId,
	listCanvasSnapshots,
	loadCanvasSnapshot,
	saveCanvasSnapshot,
} from './project-store'

let dirs: string[] = []

async function tempProject() {
	const dir = await mkdtemp(join(tmpdir(), 'pi-tldraw-mcp-'))
	dirs.push(dir)
	return dir
}

afterEach(async () => {
	await Promise.all(dirs.map((dir) => rm(dir, { recursive: true, force: true })))
	dirs = []
})

describe('project canvas store', () => {
	it('saves a canvas snapshot, index entry, and current canvas id', async () => {
		const cwd = await tempProject()

		const saved = await saveCanvasSnapshot(cwd, 'canvas-a', {
			shapes: [{ _type: 'text', shapeId: 'hello', text: 'Hello' }],
			assets: [],
			bindings: [],
		})

		expect(saved.canvasId).toBe('canvas-a')
		expect(saved.shapeCount).toBe(1)
		expect(await getCurrentCanvasId(cwd)).toBe('canvas-a')

		const loaded = await loadCanvasSnapshot(cwd, 'canvas-a')
		expect(loaded?.shapes).toEqual([{ _type: 'text', shapeId: 'hello', text: 'Hello' }])

		const listed = await listCanvasSnapshots(cwd)
		expect(listed).toHaveLength(1)
		expect(listed[0]).toMatchObject({ canvasId: 'canvas-a', shapeCount: 1 })
	})

	it('refuses to overwrite a non-empty snapshot with an empty snapshot by default', async () => {
		const cwd = await tempProject()
		await saveCanvasSnapshot(cwd, 'canvas-a', {
			shapes: [{ _type: 'text', shapeId: 'hello', text: 'Hello' }],
		})

		await expect(saveCanvasSnapshot(cwd, 'canvas-a', { shapes: [] })).rejects.toThrow(
			/Refusing to overwrite/
		)

		const loaded = await loadCanvasSnapshot(cwd, 'canvas-a')
		expect(loaded?.shapeCount).toBe(1)
	})

	it('can force an empty overwrite and keeps history', async () => {
		const cwd = await tempProject()
		await saveCanvasSnapshot(cwd, 'canvas-a', {
			shapes: [{ _type: 'text', shapeId: 'hello', text: 'Hello' }],
		})

		await saveCanvasSnapshot(cwd, 'canvas-a', { shapes: [] }, { allowEmptyOverwrite: true })

		const loaded = await loadCanvasSnapshot(cwd, 'canvas-a')
		expect(loaded?.shapeCount).toBe(0)

		const canvasDir = getCanvasDir(cwd)
		const historyDir = join(canvasDir, 'history', 'canvas-a')
		const historyFiles = await import('node:fs/promises').then((fs) => fs.readdir(historyDir))
		expect(historyFiles.length).toBeGreaterThan(0)
		const history = JSON.parse(await readFile(join(historyDir, historyFiles[0]), 'utf8'))
		expect(history.shapes).toHaveLength(1)
	})
})
