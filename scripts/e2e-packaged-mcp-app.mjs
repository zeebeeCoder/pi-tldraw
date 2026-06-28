#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

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

async function waitForOptions(url, child) {
	for (let i = 0; i < 120; i++) {
		if (child.exitCode !== null) throw new Error(`packaged mcp-app exited with ${child.exitCode}`)
		try {
			const response = await fetch(url, { method: 'OPTIONS' })
			if (response.ok || response.status === 204) return
		} catch {}
		await new Promise((resolve) => setTimeout(resolve, 500))
	}
	throw new Error(`packaged mcp-app did not become reachable: ${url}`)
}

const port = await getFreePort()
const endpoint = `http://127.0.0.1:${port}/mcp`
const app = spawn('yarn', ['-s', 'dev'], {
	cwd: 'mcp-app',
	stdio: 'inherit',
	detached: true,
	env: {
		...process.env,
		TLDRAW_MCP_APP_PORT: String(port),
		TLDRAW_MCP_URL: endpoint,
	},
})

try {
	await waitForOptions(endpoint, app)
	await run(process.execPath, ['scripts/e2e-mcp.mjs'], {
		env: { ...process.env, TLDRAW_MCP_URL: endpoint },
	})
} finally {
	try {
		process.kill(-app.pid, 'SIGTERM')
	} catch {
		app.kill('SIGTERM')
	}
}
