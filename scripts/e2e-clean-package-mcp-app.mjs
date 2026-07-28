#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
import { createServer } from 'node:net'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const npmEnv = { ...process.env, npm_config_dry_run: 'false' }

async function getFreePort() {
	return new Promise((resolve, reject) => {
		const server = createServer()
		server.once('error', reject)
		server.listen(0, '127.0.0.1', () => {
			const address = server.address()
			server.close(() => {
				if (!address || typeof address === 'string') reject(new Error('Could not allocate port'))
				else resolve(address.port)
			})
		})
	})
}

function run(command, args, opts = {}) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, { stdio: 'inherit', ...opts })
		child.on('error', reject)
		child.on('exit', (code) => {
			if (code === 0) resolve()
			else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`))
		})
	})
}

function waitForExit(child, timeoutMs = 5000) {
	if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve()
	return new Promise((resolve) => {
		const timer = setTimeout(resolve, timeoutMs)
		child.once('exit', () => {
			clearTimeout(timer)
			resolve()
		})
	})
}

async function stop(child) {
	if (child.exitCode !== null || child.signalCode !== null) return
	try {
		if (process.platform !== 'win32' && child.pid) process.kill(-child.pid, 'SIGTERM')
		else child.kill('SIGTERM')
	} catch {
		child.kill('SIGTERM')
	}
	await waitForExit(child)
}

async function waitForOptions(url, child) {
	for (let i = 0; i < 120; i++) {
		if (child.exitCode !== null) {
			throw new Error(`clean packaged mcp-app exited with ${child.exitCode}`)
		}
		try {
			const response = await fetch(url, { method: 'OPTIONS' })
			if (response.ok || response.status === 204) return
		} catch {}
		await new Promise((resolve) => setTimeout(resolve, 500))
	}
	throw new Error(`clean packaged mcp-app did not become reachable: ${url}`)
}

const tempDir = await mkdtemp(join(tmpdir(), 'pi-tldraw-clean-package-'))
let succeeded = false

try {
	const pack = spawnSync(
		'npm',
		['pack', '--ignore-scripts', '--json', '--pack-destination', tempDir],
		{ cwd: root, encoding: 'utf8', env: npmEnv },
	)
	if (pack.status !== 0) {
		throw new Error(`npm pack failed\n${pack.stdout}\n${pack.stderr}`)
	}
	const [packed] = JSON.parse(pack.stdout)
	if (!packed?.filename) throw new Error('npm pack did not report a tarball filename')
	const tarball = resolve(tempDir, packed.filename)

	const installDir = join(tempDir, 'install')
	await mkdir(installDir, { recursive: true })
	await writeFile(
		join(installDir, 'package.json'),
		JSON.stringify({ name: 'pi-tldraw-clean-package-test', private: true }, null, 2),
	)
	await run(
		'npm',
		['install', '--legacy-peer-deps', '--no-audit', '--no-fund', tarball],
		{ cwd: installDir, env: npmEnv },
	)

	const packageDir = join(installDir, 'node_modules', 'pi-tldraw')
	const requireFromPackage = createRequire(join(packageDir, 'package.json'))
	let aiPackagePath
	try {
		aiPackagePath = requireFromPackage.resolve('ai/package.json')
	} catch {
		throw new Error('clean --legacy-peer-deps install cannot resolve "ai"')
	}
	const aiPackage = JSON.parse(await readFile(aiPackagePath, 'utf8'))
	if (!aiPackage.version?.startsWith('6.')) {
		throw new Error(`Expected ai@6, found ${aiPackage.version ?? 'unknown'}`)
	}

	const port = await getFreePort()
	const endpoint = `http://127.0.0.1:${port}/mcp`
	const app = spawn(process.execPath, ['../scripts/run-mcp-app-dev.mjs'], {
		cwd: join(packageDir, 'mcp-app'),
		stdio: 'inherit',
		detached: process.platform !== 'win32',
		env: {
			...process.env,
			TLDRAW_MCP_APP_PORT: String(port),
			TLDRAW_MCP_URL: endpoint,
		},
	})

	try {
		await waitForOptions(endpoint, app)
		await run(process.execPath, [join(packageDir, 'scripts', 'e2e-mcp.mjs')], {
			cwd: packageDir,
			env: { ...process.env, TLDRAW_MCP_URL: endpoint },
		})
	} finally {
		await stop(app)
	}

	console.log(`clean package verified with ai@${aiPackage.version}`)
	succeeded = true
} catch (error) {
	console.error(`clean package artifacts kept at ${tempDir}`)
	throw error
} finally {
	if (succeeded) await rm(tempDir, { recursive: true, force: true })
}
