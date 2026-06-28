#!/usr/bin/env node
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const defaultSource = resolve(root, '../tldraw/apps/mcp-app')
const sourceDir = resolve(process.env.TLDRAW_MCP_APP_SOURCE_DIR || defaultSource)
const targetDir = resolve(root, 'mcp-app')

const requiredFiles = [
	'package.json',
	'wrangler.toml',
	'src/worker.ts',
	'src/register-tools.ts',
	'dist/mcp-app.html',
	'dist/editor-api.json',
	'dist/method-map.json',
]

function sha256(value) {
	return createHash('sha256').update(value).digest('hex')
}

async function readText(path) {
	return readFile(path, 'utf8')
}

function git(cwd, args) {
	const result = spawnSync('git', args, { cwd, encoding: 'utf8' })
	return result.status === 0 ? result.stdout.trim() : ''
}

function findGitRoot(path) {
	const result = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd: path, encoding: 'utf8' })
	return result.status === 0 ? result.stdout.trim() : undefined
}

async function copyIfExists(relativePath) {
	const src = resolve(sourceDir, relativePath)
	if (!existsSync(src)) return false
	const dest = resolve(targetDir, relativePath)
	await mkdir(dirname(dest), { recursive: true })
	await cp(src, dest, { recursive: true })
	return true
}

for (const file of requiredFiles) {
	if (!existsSync(resolve(sourceDir, file))) {
		throw new Error(
			`Missing ${file} in ${sourceDir}. Build the tldraw MCP app first, e.g. cd ${sourceDir} && yarn build`
		)
	}
}

await rm(targetDir, { recursive: true, force: true })
await mkdir(targetDir, { recursive: true })

for (const path of [
	'LICENSE.md',
	'README.md',
	'package.json',
	'server.json',
	'tsconfig.json',
	'vite.config.ts',
	'wrangler.toml',
	'dev-tunnel.sh',
	'src',
	'scripts',
	'plugins',
	'dist',
]) {
	await copyIfExists(path)
}

const pkgPath = resolve(targetDir, 'package.json')
const pkg = JSON.parse(await readText(pkgPath))
pkg.private = true
pkg.scripts = {
	...pkg.scripts,
	// Runtime packages ship prebuilt dist assets. Do not rebuild tldraw on user machines.
	dev: 'yarn dev:http',
	'dev:http': 'node ../scripts/run-mcp-app-dev.mjs',
	build: 'node -e "const fs=require(\'fs\'); for (const f of [\'dist/mcp-app.html\',\'dist/editor-api.json\',\'dist/method-map.json\']) if (!fs.existsSync(f)) throw new Error(`Missing ${f}`); console.log(\'prebuilt mcp-app dist is present\')"',
}
await writeFile(pkgPath, `${JSON.stringify(pkg, null, '\t')}\n`, 'utf8')

const gitRoot = findGitRoot(sourceDir)
const provenance = {
	artifact: 'mcp-app/',
	builder: 'scripts/assemble-mcp-app.mjs',
	sourceDir,
	sourceGitRoot: gitRoot,
	sourceGitCommit: gitRoot ? git(gitRoot, ['rev-parse', 'HEAD']) : undefined,
	sourceGitStatus: gitRoot ? git(gitRoot, ['status', '--short', '--', 'apps/mcp-app']) : undefined,
	dist: {
		'mcp-app.html': sha256(await readText(resolve(targetDir, 'dist/mcp-app.html'))),
		'editor-api.json': sha256(await readText(resolve(targetDir, 'dist/editor-api.json'))),
		'method-map.json': sha256(await readText(resolve(targetDir, 'dist/method-map.json'))),
	},
	assembledAt: new Date().toISOString(),
}
await writeFile(resolve(targetDir, 'PI_TLDRAW_PROVENANCE.json'), `${JSON.stringify(provenance, null, 2)}\n`, 'utf8')
await writeFile(resolve(targetDir, '.npmignore'), '.wrangler/\nnode_modules/\n*.log\n', 'utf8')

console.log(`assembled ${targetDir}`)
console.log(`source: ${sourceDir}`)
if (provenance.sourceGitStatus) {
	console.warn('source has mcp-app changes:')
	console.warn(provenance.sourceGitStatus)
}
