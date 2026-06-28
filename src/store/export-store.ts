import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { CanvasExportFormat, CanvasExportScope } from '../canvas/export'

export interface SaveCanvasImageExportInput {
	canvasId?: string
	format: CanvasExportFormat
	scope: CanvasExportScope
	data: string
}

export function getExportDir(cwd: string) {
	return join(cwd, '.pi', 'tldraw-exports')
}

export function createExportFileName(input: Pick<SaveCanvasImageExportInput, 'canvasId' | 'format' | 'scope'>) {
	const stamp = new Date().toISOString().replace(/[:.]/g, '-')
	const canvas = sanitizeFilePart(input.canvasId ?? 'canvas')
	return `${stamp}-${canvas}-${input.scope}.${input.format}`
}

export async function saveCanvasImageExport(cwd: string, input: SaveCanvasImageExportInput) {
	const dir = getExportDir(cwd)
	await mkdir(dir, { recursive: true })
	const file = createExportFileName(input)
	const path = join(dir, file)
	await writeFile(path, Buffer.from(input.data, 'base64'))
	return path
}

function sanitizeFilePart(value: string) {
	return value.replace(/[^a-zA-Z0-9_-]/g, '_')
}
