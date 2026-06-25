import { spawn, type ChildProcess } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const DEV_APP_DIR = '/Users/zbigniewsiwiec/code/github/tldraw/apps/mcp-app'

export function createMcpServerManager(endpoint: string) {
	let proc: ChildProcess | null = null
	let starting: Promise<void> | null = null
	let startedAt: number | null = null
	let lastError: string | null = null
	const logs: string[] = []

	const appDir = resolveAppDir()
	const autoStart = process.env.TLDRAW_MCP_AUTO_START !== 'false' && isLocalEndpoint(endpoint)

	async function ensure(signal?: AbortSignal) {
		if (await isReachable(endpoint)) return
		if (!autoStart) {
			throw new Error(
				`tldraw MCP server is not reachable at ${endpoint}. Start it manually or unset TLDRAW_MCP_AUTO_START=false.`
			)
		}
		if (starting) return starting
		starting = startAndWait(signal).finally(() => {
			starting = null
		})
		return starting
	}

	async function start(signal?: AbortSignal) {
		if (await isReachable(endpoint)) return
		if (starting) return starting
		starting = startAndWait(signal).finally(() => {
			starting = null
		})
		return starting
	}

	async function startAndWait(signal?: AbortSignal) {
		if (!existsSync(appDir)) {
			throw new Error(
				`tldraw MCP app directory not found: ${appDir}. Set TLDRAW_MCP_APP_DIR to the packaged/local apps/mcp-app directory.`
			)
		}

		if (!proc || proc.exitCode !== null || proc.killed) {
			lastError = null
			appendLog(`starting: cd ${appDir} && yarn dev`)
			const child = spawn('yarn', ['dev'], {
				cwd: appDir,
				env: { ...process.env },
				stdio: ['ignore', 'pipe', 'pipe'],
				detached: true,
			})
			proc = child
			startedAt = Date.now()
			child.stdout?.on('data', (chunk) => appendLog(String(chunk)))
			child.stderr?.on('data', (chunk) => appendLog(String(chunk)))
			child.on('exit', (code, sig) => {
				appendLog(`process exited: code=${code ?? 'null'} signal=${sig ?? 'null'}`)
				if (code && code !== 0) lastError = `tldraw MCP server exited with code ${code}`
			})
		}

		const started = Date.now()
		while (Date.now() - started < 180_000) {
			if (signal?.aborted) throw new Error('Cancelled')
			if (await isReachable(endpoint)) return
			if (proc.exitCode !== null) {
				throw new Error(lastError ?? `tldraw MCP server exited before ${endpoint} became reachable`)
			}
			await delay(1000)
		}
		throw new Error(`Timed out waiting for tldraw MCP server at ${endpoint}. Recent logs:\n${logs.slice(-20).join('\n')}`)
	}

	async function restart(signal?: AbortSignal) {
		await stop()
		return startAndWait(signal)
	}

	async function stop() {
		if (!proc || proc.exitCode !== null || proc.killed) return
		appendLog('stopping managed server')
		try {
			// Kill the process group so the wrangler child exits too.
			if (proc.pid) process.kill(-proc.pid, 'SIGTERM')
			else proc.kill('SIGTERM')
		} catch {
			proc.kill('SIGTERM')
		}
		await delay(1000)
		if (proc.exitCode === null && !proc.killed) {
			try {
				if (proc.pid) process.kill(-proc.pid, 'SIGKILL')
				else proc.kill('SIGKILL')
			} catch {
				proc.kill('SIGKILL')
			}
		}
	}

	function getStatus() {
		return {
			endpoint,
			autoStart,
			appDir,
			managedPid: proc?.pid ?? null,
			startedAt,
			lastError,
			logs: logs.slice(-50),
		}
	}

	function appendLog(text: string) {
		for (const line of text.split(/\r?\n/)) {
			if (!line.trim()) continue
			logs.push(`${new Date().toISOString()} ${line}`)
		}
		while (logs.length > 200) logs.shift()
	}

	return { ensure, start, restart, stop, getStatus }
}

async function isReachable(endpoint: string) {
	try {
		const response = await fetch(endpoint, {
			method: 'OPTIONS',
			signal: AbortSignal.timeout(1500),
		})
		return response.ok || response.status === 204 || response.status === 405
	} catch {
		return false
	}
}

function isLocalEndpoint(endpoint: string) {
	try {
		const url = new URL(endpoint)
		return ['127.0.0.1', 'localhost', '0.0.0.0'].includes(url.hostname)
	} catch {
		return false
	}
}

function resolveAppDir() {
	if (process.env.TLDRAW_MCP_APP_DIR) return process.env.TLDRAW_MCP_APP_DIR
	const packagedAppDir = fileURLToPath(new URL('./mcp-app', import.meta.url))
	if (existsSync(packagedAppDir)) return packagedAppDir
	// Fall back to the dev app directory for local development.
	return DEV_APP_DIR
}

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
