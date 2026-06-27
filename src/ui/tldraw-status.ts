export type TldrawPhase = 'idle' | 'starting' | 'ready' | 'connected' | 'working' | 'error' | 'disconnected'

export type StatusUi = {
	setStatus(name: string, value: string | undefined): void
	theme: { fg(color: string, text: string): string }
}

export type StatusContext = { hasUI: boolean; ui: StatusUi }

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] as const

export function createTldrawStatusIndicator() {
	let statusCtx: StatusContext | null = null
	let spinnerTimer: ReturnType<typeof setInterval> | null = null
	let spinnerPhase = 0

	const divider = () => statusCtx!.ui.theme.fg('dim', '│ ')

	const renderStatus = (phase: TldrawPhase) => {
		if (!statusCtx?.hasUI) return
		const iconColor = phaseIconColor(phase)
		const icon = phaseIcon(phase)
		statusCtx.ui.setStatus(
			'tldraw',
			divider() + statusCtx.ui.theme.fg(iconColor, icon) + statusCtx.ui.theme.fg('muted', ' tldraw')
		)
	}

	const renderSpinnerFrame = () => {
		if (!statusCtx?.hasUI) return
		const frame = SPINNER_FRAMES[spinnerPhase % SPINNER_FRAMES.length]
		statusCtx.ui.setStatus(
			'tldraw',
			divider() + statusCtx.ui.theme.fg('accent', frame) + statusCtx.ui.theme.fg('muted', ' tldraw')
		)
		spinnerPhase++
	}

	const startSpinner = () => {
		if (spinnerTimer) return
		spinnerPhase = 0
		spinnerTimer = setInterval(renderSpinnerFrame, 120)
	}

	const stopSpinner = () => {
		if (!spinnerTimer) return
		clearInterval(spinnerTimer)
		spinnerTimer = null
	}

	return {
		update(ctx: StatusContext, phase: TldrawPhase) {
			statusCtx = ctx
			if (phase === 'working' || phase === 'starting') startSpinner()
			else {
				stopSpinner()
				renderStatus(phase)
			}
		},
		stop: stopSpinner,
	}
}

const phaseIconColor = (phase: TldrawPhase): string => {
	switch (phase) {
		case 'error':
			return 'error'
		case 'connected':
			return 'success'
		case 'disconnected':
			return 'warning'
		default:
			return 'accent'
	}
}

const phaseIcon = (phase: TldrawPhase): string => {
	switch (phase) {
		case 'connected':
			return '●'
		case 'disconnected':
			return '○'
		case 'error':
			return '✗'
		default:
			return '•'
	}
}
