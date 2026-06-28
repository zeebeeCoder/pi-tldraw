#!/usr/bin/env node
import { spawnSync } from 'node:child_process'

const required = [
	'bridge/app-bridge-entry.js',
	'static/app-bridge-bundle.js',
	'static/app-bridge-bundle.meta.json',
	'mcp-app-source.json',
	'patches/tldraw-mcp-app/001-pi-runtime.patch',
	'mcp-app/PI_TLDRAW_PROVENANCE.json',
	'mcp-app/package.json',
	'mcp-app/wrangler.toml',
	'mcp-app/src/worker.ts',
	'mcp-app/src/register-tools.ts',
	'mcp-app/dist/mcp-app.html',
	'mcp-app/dist/editor-api.json',
	'mcp-app/dist/method-map.json',
	'scripts/run-mcp-app-dev.mjs',
]

const forbiddenPrefixes = [
	'node_modules/',
	'mcp-app/node_modules/',
	'mcp-app/.wrangler/',
	'.pi/',
]

const result = spawnSync('npm', ['pack', '--dry-run', '--json'], {
	encoding: 'utf8',
	stdio: ['ignore', 'pipe', 'pipe'],
})

if (result.status !== 0) {
	throw new Error(`npm pack --dry-run --json failed\n${result.stdout}\n${result.stderr}`)
}

const packs = JSON.parse(result.stdout)
const files = new Set((packs[0]?.files ?? []).map((file) => file.path))

const missing = required.filter((path) => !files.has(path))
if (missing.length > 0) {
	throw new Error(`Package tarball is missing required file(s):\n${missing.join('\n')}`)
}

const forbidden = [...files].filter((path) => forbiddenPrefixes.some((prefix) => path.startsWith(prefix)))
if (forbidden.length > 0) {
	throw new Error(`Package tarball contains forbidden file(s):\n${forbidden.join('\n')}`)
}

console.log(`package files verified (${files.size} files)`)
