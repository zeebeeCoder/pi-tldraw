export interface DiagramGuidanceOptions {
	focus?: string
}

export interface DiagramGuidance {
	focus?: string
	text: string
}

export function normalizeFocus(focus?: string) {
	const value = focus?.trim()
	return value ? value : undefined
}

export function buildDiagramGuidance(options: DiagramGuidanceOptions = {}): DiagramGuidance {
	const focus = normalizeFocus(options.focus)
	const lines = ['# tldraw drawing guidance', '']

	if (focus) lines.push(`Focus: ${focus}`, '')

	lines.push(
		'## One rule',
		'',
		'Draw for legibility: make space do the explanatory work.',
		'',
		'## Ideas while drawing',
		'',
		'- Begin with the relationship the viewer should understand, then place shapes so that relationship is visible before any label is read.',
		'- Use negative space deliberately. Leave breathing room around shapes, groups, arrow paths, and labels.',
		'- Prefer simple alignment over clever geometry. Order and rhythm make diagrams easier to scan.',
		'- Let grouping emerge from spacing and containment, not from crowding.',
		'- Route connections through open space. If a connector competes with another mark, move the shapes rather than forcing the line.',
		'- Keep labels short and readable. Put explanatory text where it does not interrupt the drawing.',
		'- Use visual weight sparingly. Color, fill, and shape should clarify attention, not decorate every element.',
		'',
		'## Finish by looking, not explaining',
		'',
		'- Step back and inspect the canvas as a reader.',
		'- Ask what feels cramped, ambiguous, or noisy.',
		'- Add space, simplify marks, or reposition elements until the relationships can breathe.'
	)

	return { focus, text: lines.join('\n') }
}
