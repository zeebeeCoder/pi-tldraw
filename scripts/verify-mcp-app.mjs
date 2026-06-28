#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const appDir = resolve(root, 'mcp-app')

const requiredFiles = [
	'package.json',
	'wrangler.toml',
	'src/worker.ts',
	'src/register-tools.ts',
	'dist/mcp-app.html',
	'dist/editor-api.json',
	'dist/method-map.json',
	'PI_TLDRAW_PROVENANCE.json',
]

for (const file of requiredFiles) {
	if (!existsSync(resolve(appDir, file))) {
		throw new Error(`Packaged mcp-app is missing ${file}; run npm run assemble:mcp-app`)
	}
}

const pkg = JSON.parse(await readFile(resolve(appDir, 'package.json'), 'utf8'))
const devScript = pkg.scripts?.['dev:http'] || ''
if (devScript.includes('yarn build') || devScript.includes('vite build')) {
	throw new Error('Packaged mcp-app dev script must use prebuilt dist assets, not rebuild on user machines')
}

const html = await readFile(resolve(appDir, 'dist/mcp-app.html'), 'utf8')
if (!html.includes('<html') && !html.includes('<!doctype html')) {
	throw new Error('Packaged mcp-app dist/mcp-app.html does not look like HTML')
}

console.log('packaged mcp-app verified')
