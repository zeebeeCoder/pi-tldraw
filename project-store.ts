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
	const shapes = Array.isArray(input.shapes) ? input.shapes : []
	const assets = Array.isArray(input.assets) ? input.assets : []
	const bindings = Array.isArray(input.bindings) ? input.bindings : []
	const updatedAt = new Date().toISOString()
	const snapshot: StoredCanvasSnapshot = {
		version: 1,
		canvasId,
		cwd,
		updatedAt,
		shapeCount: shapes.length,
		assetCount: assets.length,
		bindingCount: bindings.length,
		shapes,
		assets,
		bindings,
	}

	await mkdir(getCanvasDir(cwd), { recursive: true })
	const file = getCanvasFileName(canvasId)
	const canvasPath = join(getCanvasDir(cwd), file)
	const existing = await readExistingSnapshot(canvasPath)
	if (!opts?.allowEmptyOverwrite && shapes.length === 0 && (existing?.shapeCount ?? 0) > 0) {
		throw new Error(
			`Refusing to overwrite ${canvasId}: live canvas has 0 shapes but saved snapshot has ${existing!.shapeCount}. Use a force save only if this deletion is intentional.`
		)
	}
	if (existing?.raw) {
		const historyDir = join(getCanvasDir(cwd), 'history', sanitizeCanvasId(canvasId))
		await mkdir(historyDir, { recursive: true })
		await writeFile(
			join(historyDir, `${new Date().toISOString().replace(/[:.]/g, '-')}.json`),
			existing.raw,
			'utf8'
		)
	}
	await writeFile(canvasPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8')

	const index = await readCanvasIndex(cwd)
	index.currentCanvasId = canvasId
	index.canvases[canvasId] = {
		canvasId,
		file,
		updatedAt,
		shapeCount: shapes.length,
		assetCount: assets.length,
		bindingCount: bindings.length,
	}
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
