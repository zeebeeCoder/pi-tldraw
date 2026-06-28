#!/usr/bin/env node
import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entry = resolve(root, 'bridge/app-bridge-entry.js')
const outfile = resolve(root, 'static/app-bridge-bundle.js')
const metafile = resolve(root, 'static/app-bridge-bundle.meta.json')
const lockfile = resolve(root, 'package-lock.json')

function sha256(value) {
	return createHash('sha256').update(value).digest('hex')
}

async function readText(path) {
	return readFile(path, 'utf8')
}

function packageVersionFromLock(lock, packageName) {
	const entry = lock.packages?.[`node_modules/${packageName}`]
	if (!entry?.version) throw new Error(`Could not find ${packageName} in package-lock.json`)
	return entry.version
}

await mkdir(dirname(outfile), { recursive: true })

const result = await esbuild.build({
	entryPoints: [entry],
	bundle: true,
	outfile,
	format: 'iife',
	platform: 'browser',
	target: ['es2020'],
	charset: 'utf8',
	legalComments: 'inline',
	minify: false,
	metafile: true,
	logLevel: 'info',
})

const [entryText, lockText, bundleText] = await Promise.all([
	readText(entry),
	readText(lockfile),
	readText(outfile),
])
const lock = JSON.parse(lockText)

const metadata = {
	artifact: 'static/app-bridge-bundle.js',
	builder: 'scripts/build-bridge.mjs',
	entry: 'bridge/app-bridge-entry.js',
	format: 'iife',
	platform: 'browser',
	target: 'es2020',
	dependencies: {
		'@modelcontextprotocol/ext-apps': packageVersionFromLock(lock, '@modelcontextprotocol/ext-apps'),
		'@modelcontextprotocol/sdk': packageVersionFromLock(lock, '@modelcontextprotocol/sdk'),
		zod: packageVersionFromLock(lock, 'zod'),
		esbuild: packageVersionFromLock(lock, 'esbuild'),
	},
	hashes: {
		entrySha256: sha256(entryText),
		packageLockSha256: sha256(lockText),
		bundleSha256: sha256(bundleText),
	},
	inputs: Object.keys(result.metafile.inputs).sort(),
}

await writeFile(metafile, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8')
console.log(`built ${outfile}`)
console.log(`wrote ${metafile}`)
