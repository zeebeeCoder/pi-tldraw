import { describe, expect, it } from 'vitest'
import { buildDiagramGuidance, normalizeFocus } from '../src/diagram/guidance'

describe('diagram guidance', () => {
	it('normalizes optional focus text', () => {
		expect(normalizeFocus('  breathing room  ')).toBe('breathing room')
		expect(normalizeFocus('   ')).toBeUndefined()
	})

	it('offers minimalist drawing guidance instead of diagram templates', () => {
		const guidance = buildDiagramGuidance({ focus: 'breathing room' })

		expect(guidance.focus).toBe('breathing room')
		expect(guidance.text).toContain('Draw for legibility')
		expect(guidance.text).toContain('Use negative space deliberately')
		expect(guidance.text).toContain('Route connections through open space')
		expect(guidance.text).not.toContain('flowchart')
		expect(guidance.text).not.toContain('architecture')
		expect(guidance.text).not.toContain('```')
		expect(guidance.text).not.toContain('const ')
	})
})
