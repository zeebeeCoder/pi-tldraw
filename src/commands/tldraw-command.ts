const TLDRAW_COMMAND_TYPES = [
	'reset',
	'current',
	'canvases',
	'save',
	'start',
	'restart',
	'tools',
	'open',
	'host',
	'resource',
	'status',
] as const

export type TldrawCommandType = (typeof TLDRAW_COMMAND_TYPES)[number]

export type ParsedTldrawCommand = {
	type: TldrawCommandType
	force: boolean
	canvasId?: string
	requestedAction?: string
}

const COMMANDS: ReadonlySet<string> = new Set(TLDRAW_COMMAND_TYPES)

export function parseTldrawCommand(args: string): ParsedTldrawCommand {
	const parts = args.trim().split(/\s+/).filter(Boolean)
	const rawAction = parts[0] ?? 'status'
	const force = rawAction.endsWith('!') || parts.includes('--force')
	const normalizedAction = rawAction.endsWith('!') ? rawAction.slice(0, -1) : rawAction
	const canvasId = parts.slice(1).find((part) => !part.startsWith('--'))

	return isTldrawCommandType(normalizedAction)
		? withOptionalCanvasId({ type: normalizedAction, force }, canvasId)
		: withOptionalCanvasId(
			{ type: 'status', force, requestedAction: normalizedAction },
			canvasId
		)
}

const isTldrawCommandType = (value: string): value is TldrawCommandType => COMMANDS.has(value)

function withOptionalCanvasId<T extends Omit<ParsedTldrawCommand, 'canvasId'>>(
	command: T,
	canvasId: string | undefined
): T | (T & { canvasId: string }) {
	return canvasId ? { ...command, canvasId } : command
}
