#!/usr/bin/env node
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const args = new Set(process.argv.slice(2))
const usePinnedSource = args.has('--pinned')
const skipBuild = args.has('--skip-build')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = resolve(root, 'mcp-app-source.json')
const manifest = existsSync(manifestPath) ? JSON.parse(await readText(manifestPath)) : null
const defaultSource = resolve(root, '../tldraw/apps/mcp-app')
const targetDir = resolve(root, 'mcp-app')
const sourceDir = usePinnedSource
	? await preparePinnedSource()
	: resolve(process.env.TLDRAW_MCP_APP_SOURCE_DIR || defaultSource)

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

function run(command, commandArgs, opts = {}) {
	const result = spawnSync(command, commandArgs, { encoding: 'utf8', stdio: 'pipe', ...opts })
	if (result.status !== 0) {
		throw new Error(
			[
				`Command failed: ${command} ${commandArgs.join(' ')}`,
				result.stdout?.trim(),
				result.stderr?.trim(),
			]
				.filter(Boolean)
				.join('\n')
		)
	}
	return result.stdout.trim()
}

function git(cwd, gitArgs) {
	const result = spawnSync('git', gitArgs, { cwd, encoding: 'utf8' })
	return result.status === 0 ? result.stdout.trim() : ''
}

function shell(cwd, command) {
	const result = spawnSync(command, { cwd, encoding: 'utf8', stdio: 'inherit', shell: true })
	if (result.status !== 0) throw new Error(`Command failed in ${cwd}: ${command}`)
}

function findGitRoot(path) {
	const result = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd: path, encoding: 'utf8' })
	return result.status === 0 ? result.stdout.trim() : undefined
}

async function patchMetadata() {
	if (!manifest?.patches?.length) return []
	return Promise.all(
		manifest.patches.map(async (patchPath) => {
			const absolutePath = resolve(root, patchPath)
			const body = await readText(absolutePath)
			return { path: patchPath, sha256: sha256(body) }
		})
	)
}

async function preparePinnedSource() {
	if (!manifest) throw new Error(`Missing ${manifestPath}; cannot assemble pinned mcp-app source`)
	const buildRoot = resolve(process.env.TLDRAW_MCP_APP_BUILD_DIR || resolve(root, '.pi/build/tldraw-mcp-source'))
	await rm(buildRoot, { recursive: true, force: true })
	await mkdir(dirname(buildRoot), { recursive: true })

	console.log(`cloning ${manifest.repo} -> ${buildRoot}`)
	run('git', ['clone', manifest.repo, buildRoot], { cwd: root })
	run('git', ['checkout', manifest.commit], { cwd: buildRoot })

	for (const patchPath of manifest.patches ?? []) {
		const absolutePatch = resolve(root, patchPath)
		console.log(`applying ${patchPath}`)
		run('git', ['apply', absolutePatch], { cwd: buildRoot })
	}

	if (!skipBuild) {
		for (const step of manifest.build ?? []) {
			const cwd = resolve(buildRoot, step.cwd ?? '.')
			console.log(`building in ${cwd}: ${step.command}`)
			shell(cwd, step.command)
		}
	} else {
		console.warn('skipping pinned source build because --skip-build was passed')
	}

	return resolve(buildRoot, manifest.appPath)
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

for (const path of manifest?.assembledFiles ?? [
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
	await copyIfExists(path.replace(/\/$/, ''))
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
const patches = await patchMetadata()
const sourceGitCommit = gitRoot ? git(gitRoot, ['rev-parse', 'HEAD']) : undefined
const sourceGitStatus = gitRoot ? git(gitRoot, ['status', '--short', '--', manifest?.appPath ?? 'apps/mcp-app']) : undefined
const provenance = {
	artifact: 'mcp-app/',
	builder: 'scripts/assemble-mcp-app.mjs',
	source: {
		mode: usePinnedSource ? 'pinned' : 'local',
		repo: manifest?.repo,
		commit: manifest?.commit,
		appPath: manifest?.appPath,
		patches,
		build: manifest?.build,
		sourceGitCommit,
		...(process.env.PI_TLDRAW_INCLUDE_LOCAL_PROVENANCE === 'true'
			? { sourceDir, sourceGitRoot: gitRoot, sourceGitStatus }
			: {}),
	},
	dist: {
		'mcp-app.html': sha256(await readText(resolve(targetDir, 'dist/mcp-app.html'))),
		'editor-api.json': sha256(await readText(resolve(targetDir, 'dist/editor-api.json'))),
		'method-map.json': sha256(await readText(resolve(targetDir, 'dist/method-map.json'))),
	},
}
await writeFile(resolve(targetDir, 'PI_TLDRAW_PROVENANCE.json'), `${JSON.stringify(provenance, null, 2)}\n`, 'utf8')
await writeFile(resolve(targetDir, '.npmignore'), '.wrangler/\nnode_modules/\n*.log\n', 'utf8')

console.log(`assembled ${targetDir}`)
console.log(`source: ${sourceDir}`)
if (sourceGitStatus) {
	console.warn('source has mcp-app changes:')
	console.warn(sourceGitStatus)
}
