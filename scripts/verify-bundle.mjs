#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const bundlePath = resolve(root, 'static/app-bridge-bundle.js')
const metaPath = resolve(root, 'static/app-bridge-bundle.meta.json')

function sha256(value) {
	return createHash('sha256').update(value).digest('hex')
}

const [bundle, rawMeta] = await Promise.all([
	readFile(bundlePath, 'utf8'),
	readFile(metaPath, 'utf8'),
])
const meta = JSON.parse(rawMeta)

const requiredSnippets = [
	'AppBridge',
	'PostMessageTransport',
	'McpAppsBridge',
]

for (const snippet of requiredSnippets) {
	if (!bundle.includes(snippet)) {
		throw new Error(`Bridge bundle does not contain required snippet: ${snippet}`)
	}
}

if (meta?.artifact !== 'static/app-bridge-bundle.js') {
	throw new Error('Bridge bundle metadata has unexpected artifact path')
}

if (meta?.hashes?.bundleSha256 !== sha256(bundle)) {
	throw new Error('Bridge bundle hash does not match metadata; run npm run build:bridge')
}

console.log('bridge bundle verified')
