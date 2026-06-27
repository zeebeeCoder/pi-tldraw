import { describe, expect, it } from 'vitest'
import { parseTldrawCommand } from '../src/commands/tldraw-command'

describe('tldraw command parser', () => {
	it('defaults to status', () => {
		expect(parseTldrawCommand('')).toEqual({ type: 'status', force: false })
	})

	it('parses canvas ids and force flags', () => {
		expect(parseTldrawCommand('save! canvas-a')).toEqual({
			type: 'save',
			force: true,
			canvasId: 'canvas-a',
		})
		expect(parseTldrawCommand('save canvas-a --force')).toEqual({
			type: 'save',
			force: true,
			canvasId: 'canvas-a',
		})
	})

	it('falls back unknown actions to status without discarding evidence', () => {
		expect(parseTldrawCommand('wat canvas-a')).toEqual({
			type: 'status',
			force: false,
			requestedAction: 'wat',
			canvasId: 'canvas-a',
		})
	})
})
