#!/usr/bin/env node
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const manifestPath = resolve(root, 'mcp-app-source.json')
const provenancePath = resolve(root, 'mcp-app/PI_TLDRAW_PROVENANCE.json')

function sha256(value) {
	return createHash('sha256').update(value).digest('hex')
}

async function readJson(path) {
	return JSON.parse(await readFile(path, 'utf8'))
}

if (!existsSync(manifestPath)) throw new Error('Missing mcp-app-source.json')
if (!existsSync(provenancePath)) throw new Error('Missing mcp-app/PI_TLDRAW_PROVENANCE.json')

const manifest = await readJson(manifestPath)
const provenance = await readJson(provenancePath)
const source = provenance.source ?? {}

for (const field of ['repo', 'commit', 'appPath']) {
	if (!manifest[field]) throw new Error(`mcp-app-source.json missing ${field}`)
	if (source[field] !== manifest[field]) {
		throw new Error(`mcp-app provenance ${field} does not match manifest`)
	}
}

const expectedPatches = []
for (const patchPath of manifest.patches ?? []) {
	const absolutePath = resolve(root, patchPath)
	if (!existsSync(absolutePath)) throw new Error(`Manifest patch does not exist: ${patchPath}`)
	const body = await readFile(absolutePath, 'utf8')
	expectedPatches.push({ path: patchPath, sha256: sha256(body) })
}

const actualPatches = source.patches ?? []
if (JSON.stringify(actualPatches) !== JSON.stringify(expectedPatches)) {
	throw new Error('mcp-app provenance patches do not match manifest patch hashes')
}

for (const file of ['mcp-app.html', 'editor-api.json', 'method-map.json']) {
	if (!provenance.dist?.[file]) throw new Error(`mcp-app provenance missing dist hash for ${file}`)
}

console.log('mcp-app source provenance verified')
