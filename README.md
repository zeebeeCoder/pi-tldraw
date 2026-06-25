# pi-tldraw

A Pi extension that opens a local tldraw MCP canvas, lets the agent inspect/edit it, and persists canvas snapshots per project folder.

## Extension shape

This is a testable Pi extension package:

```text
pi-tldraw/
├── index.ts                 # Pi extension entry point
├── local-host.ts            # Local browser host + MCP AppBridge bridge
├── server-manager.ts        # Local tldraw MCP server lifecycle
├── project-store.ts         # Pure project-scoped snapshot persistence
├── project-store.test.ts    # Unit tests for persistence behavior
├── static/app-bridge-bundle.js
├── package.json             # Pi package metadata
└── tsconfig.json
```

Pi discovers the extension via:

```json
{
  "pi": {
    "extensions": ["./index.ts"]
  }
}
```

## Install for local use

```bash
cd ~/code/opti/pi-tldraw
npm install
ln -sfn ~/code/opti/pi-tldraw ~/.pi/agent/extensions/pi-tldraw
```

Then restart Pi or run:

```text
/reload
```

## MCP server lifecycle

The extension talks to a tldraw MCP server at:

```text
http://127.0.0.1:8787/mcp
```

If that endpoint is not reachable, the extension tries to auto-start a local tldraw MCP app.

Configure the MCP app source with:

```bash
export TLDRAW_MCP_APP_DIR=/path/to/tldraw/apps/mcp-app
```

For this development machine, the fallback path is the local tldraw checkout. For a packaged release, put an `mcp-app/` directory next to `index.ts` or set `TLDRAW_MCP_APP_DIR`.

## Normal UX

Start or restore the current project canvas:

```text
/tldraw open
```

Then work in the browser canvas. Edits are autosaved into the current project folder:

```text
.pi/tldraw-canvases/index.json
.pi/tldraw-canvases/<canvasId>.json
```

You should not need a manual save during normal use.

## Useful commands

```text
/tldraw open [canvasId]      # Open/restore canvas; creates one if needed
/tldraw host                 # Show host/server/autosave diagnostics
/tldraw canvases             # List saved project canvases
/tldraw current              # Show current project canvas id
/tldraw restart              # Restart local MCP app server
/tldraw save                 # Manual checkpoint; refuses unsafe blank overwrite
/tldraw save!                # Force manual empty overwrite
/tldraw reset                # Reset MCP HTTP session
```

## Agent tools

- `tldraw_canvas_open` — open/restore the local browser canvas host.
- `tldraw_canvas_state` — inspect live canvas state and optionally save it.
- `tldraw_canvas_exec` — execute JavaScript against the live tldraw editor.
- `tldraw_search` — inspect the tldraw Editor API via the MCP search tool.
- `tldraw_status` — check MCP server tools/resources.

## Persistence model

The durable source of truth is project-local JSON:

```text
<project>/.pi/tldraw-canvases/<canvasId>.json
```

The MCP server checkpoint store is treated as transient runtime state. If the browser port, MCP session, or Wrangler state changes, `/tldraw open` restores from the project snapshot.

Safety rules:

- Autosave and manual save refuse to overwrite a non-empty saved snapshot with an empty live canvas.
- Forced empty overwrite is available with `/tldraw save!`.
- Previous snapshots are copied to `.pi/tldraw-canvases/history/<canvasId>/` before overwrite.

## Development

```bash
npm test
npm run typecheck
npm run check
```

Keep logic that does not need Pi APIs in separate modules, such as `project-store.ts`, so it can be unit-tested without mocking Pi.
