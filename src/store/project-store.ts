import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface StoredCanvasSnapshot {
	version: 1
	canvasId: string
	cwd: string
	updatedAt: string
	shapeCount: number
	assetCount: number
	bindingCount: number
	shapes: unknown[]
	assets: unknown[]
	bindings: unknown[]
}

export interface CanvasIndexEntry {
	canvasId: string
	file: string
	updatedAt: string
	shapeCount: number
	assetCount: number
	bindingCount: number
}

export interface CanvasIndex {
	version: 1
	currentCanvasId?: string
	canvases: Record<string, CanvasIndexEntry>
}

const INDEX_FILE = 'index.json'

type SnapshotArrays = Pick<StoredCanvasSnapshot, 'shapes' | 'assets' | 'bindings'>

function normalizeSnapshotInput(input: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] }): SnapshotArrays {
	return {
		shapes: Array.isArray(input.shapes) ? input.shapes : [],
		assets: Array.isArray(input.assets) ? input.assets : [],
		bindings: Array.isArray(input.bindings) ? input.bindings : [],
	}
}

function createStoredCanvasSnapshot(
	cwd: string,
	canvasId: string,
	updatedAt: string,
	arrays: SnapshotArrays
): StoredCanvasSnapshot {
	return {
		version: 1,
		canvasId,
		cwd,
		updatedAt,
		shapeCount: arrays.shapes.length,
		assetCount: arrays.assets.length,
		bindingCount: arrays.bindings.length,
		...arrays,
	}
}

function canvasIndexEntry(snapshot: StoredCanvasSnapshot, file: string): CanvasIndexEntry {
	return {
		canvasId: snapshot.canvasId,
		file,
		updatedAt: snapshot.updatedAt,
		shapeCount: snapshot.shapeCount,
		assetCount: snapshot.assetCount,
		bindingCount: snapshot.bindingCount,
	}
}

function shouldRefuseEmptyOverwrite(input: {
	allowEmptyOverwrite?: boolean
	newShapeCount: number
	existingShapeCount: number
}): boolean {
	return !input.allowEmptyOverwrite && input.newShapeCount === 0 && input.existingShapeCount > 0
}

async function archiveExistingSnapshot(cwd: string, canvasId: string, raw: string) {
	const historyDir = join(getCanvasDir(cwd), 'history', sanitizeCanvasId(canvasId))
	await mkdir(historyDir, { recursive: true })
	await writeFile(
		join(historyDir, `${new Date().toISOString().replace(/[:.]/g, '-')}.json`),
		raw,
		'utf8'
	)
}

export function getCanvasDir(cwd: string) {
	return join(cwd, '.pi', 'tldraw-canvases')
}

export function getCanvasFileName(canvasId: string) {
	return `${sanitizeCanvasId(canvasId)}.json`
}

export function getCanvasPath(cwd: string, canvasId: string) {
	return join(getCanvasDir(cwd), getCanvasFileName(canvasId))
}

export function getIndexPath(cwd: string) {
	return join(getCanvasDir(cwd), INDEX_FILE)
}

export async function readCanvasIndex(cwd: string): Promise<CanvasIndex> {
	try {
		const raw = await readFile(getIndexPath(cwd), 'utf8')
		const parsed = JSON.parse(raw)
		if (!parsed || typeof parsed !== 'object') throw new Error('invalid index')
		return {
			version: 1,
			currentCanvasId:
				typeof parsed.currentCanvasId === 'string' ? parsed.currentCanvasId : undefined,
			canvases:
				parsed.canvases && typeof parsed.canvases === 'object' && !Array.isArray(parsed.canvases)
					? parsed.canvases
					: {},
		}
	} catch {
		return { version: 1, canvases: {} }
	}
}

export async function writeCanvasIndex(cwd: string, index: CanvasIndex) {
	await mkdir(getCanvasDir(cwd), { recursive: true })
	await writeFile(getIndexPath(cwd), `${JSON.stringify(index, null, 2)}\n`, 'utf8')
}

export async function getCurrentCanvasId(cwd: string) {
	const index = await readCanvasIndex(cwd)
	return index.currentCanvasId
}

export async function setCurrentCanvasId(cwd: string, canvasId: string) {
	const index = await readCanvasIndex(cwd)
	index.currentCanvasId = canvasId
	await writeCanvasIndex(cwd, index)
}

export async function saveCanvasSnapshot(
	cwd: string,
	canvasId: string,
	input: { shapes?: unknown[]; assets?: unknown[]; bindings?: unknown[] },
	opts?: { allowEmptyOverwrite?: boolean }
): Promise<StoredCanvasSnapshot> {
	const arrays = normalizeSnapshotInput(input)
	const snapshot = createStoredCanvasSnapshot(cwd, canvasId, new Date().toISOString(), arrays)

	await mkdir(getCanvasDir(cwd), { recursive: true })
	const file = getCanvasFileName(canvasId)
	const canvasPath = join(getCanvasDir(cwd), file)
	const existing = await readExistingSnapshot(canvasPath)
	if (
		shouldRefuseEmptyOverwrite({
			allowEmptyOverwrite: opts?.allowEmptyOverwrite,
			newShapeCount: snapshot.shapeCount,
			existingShapeCount: existing?.shapeCount ?? 0,
		})
	) {
		throw new Error(
			`Refusing to overwrite ${canvasId}: live canvas has 0 shapes but saved snapshot has ${existing!.shapeCount}. Use a force save only if this deletion is intentional.`
		)
	}
	if (existing?.raw) await archiveExistingSnapshot(cwd, canvasId, existing.raw)
	await writeFile(canvasPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')

	const index = await readCanvasIndex(cwd)
	index.currentCanvasId = canvasId
	index.canvases[canvasId] = canvasIndexEntry(snapshot, file)
	await writeCanvasIndex(cwd, index)
	return snapshot
}

export async function loadCanvasSnapshot(
	cwd: string,
	canvasId?: string
): Promise<StoredCanvasSnapshot | null> {
	const resolvedCanvasId = canvasId ?? (await getCurrentCanvasId(cwd))
	if (!resolvedCanvasId) return null
	try {
		const raw = await readFile(getCanvasPath(cwd, resolvedCanvasId), 'utf8')
		const parsed = JSON.parse(raw)
		if (!parsed || typeof parsed !== 'object') return null
		if (parsed.canvasId !== resolvedCanvasId) return null
		return {
			version: 1,
			canvasId: resolvedCanvasId,
			cwd: typeof parsed.cwd === 'string' ? parsed.cwd : cwd,
			updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
			shapeCount: Array.isArray(parsed.shapes) ? parsed.shapes.length : 0,
			assetCount: Array.isArray(parsed.assets) ? parsed.assets.length : 0,
			bindingCount: Array.isArray(parsed.bindings) ? parsed.bindings.length : 0,
			shapes: Array.isArray(parsed.shapes) ? parsed.shapes : [],
			assets: Array.isArray(parsed.assets) ? parsed.assets : [],
			bindings: Array.isArray(parsed.bindings) ? parsed.bindings : [],
		}
	} catch {
		return null
	}
}

export async function listCanvasSnapshots(cwd: string): Promise<CanvasIndexEntry[]> {
	const index = await readCanvasIndex(cwd)
	const fromIndex = Object.values(index.canvases)
	if (fromIndex.length > 0) {
		return fromIndex.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
	}

	try {
		const dir = getCanvasDir(cwd)
		const files = await readdir(dir)
		const entries: CanvasIndexEntry[] = []
		for (const file of files) {
			if (!file.endsWith('.json') || file === INDEX_FILE) continue
			try {
				const raw = await readFile(join(dir, file), 'utf8')
				const parsed = JSON.parse(raw)
				if (typeof parsed.canvasId !== 'string') continue
				entries.push({
					canvasId: parsed.canvasId,
					file,
					updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
					shapeCount: Array.isArray(parsed.shapes) ? parsed.shapes.length : 0,
					assetCount: Array.isArray(parsed.assets) ? parsed.assets.length : 0,
					bindingCount: Array.isArray(parsed.bindings) ? parsed.bindings.length : 0,
				})
			} catch {
				// Ignore malformed canvas files.
			}
		}
		return entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
	} catch {
		return []
	}
}

async function readExistingSnapshot(path: string): Promise<{ raw: string; shapeCount: number } | null> {
	try {
		const raw = await readFile(path, 'utf8')
		const parsed = JSON.parse(raw)
		return { raw, shapeCount: Array.isArray(parsed.shapes) ? parsed.shapes.length : 0 }
	} catch {
		return null
	}
}

function sanitizeCanvasId(canvasId: string) {
	return canvasId.replace(/[^a-zA-Z0-9_-]/g, '_')
}
