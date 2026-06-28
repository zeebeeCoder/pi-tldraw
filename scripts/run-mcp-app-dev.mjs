#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const wranglerPkgPath = require.resolve('wrangler/package.json')
const wranglerPkg = require(wranglerPkgPath)
const wranglerBin = resolve(dirname(wranglerPkgPath), wranglerPkg.bin?.wrangler || './bin/wrangler.js')

const endpoint = new URL(process.env.TLDRAW_MCP_URL || 'http://127.0.0.1:8787/mcp')
const port = process.env.TLDRAW_MCP_APP_PORT || endpoint.port || '8787'
const origin = process.env.TLDRAW_MCP_WORKER_ORIGIN || `${endpoint.protocol}//${endpoint.hostname}:${port}`

const args = [
	wranglerBin,
	'dev',
	'--var',
	'MCP_IS_DEV:true',
	'--var',
	`WORKER_ORIGIN:${origin}`,
	...process.argv.slice(2),
]

if (process.env.TLDRAW_MCP_APP_PORT && !args.includes('--port')) {
	args.splice(2, 0, '--port', port)
}

const child = spawn(process.execPath, args, {
	cwd: process.cwd(),
	stdio: 'inherit',
	env: process.env,
})

for (const signal of ['SIGINT', 'SIGTERM']) {
	process.on(signal, () => {
		child.kill(signal)
	})
}

child.on('exit', (code) => {
	process.exit(code ?? 0)
})
