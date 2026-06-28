# pi-tldraw

A Pi extension that opens a local tldraw MCP canvas, lets the agent inspect/edit it, and persists canvas snapshots per project folder.

## Install

From npm:

```bash
pi install npm:pi-tldraw
```

Pinned:

```bash
pi install npm:pi-tldraw@0.1.0
```

Before the npm package is published, you can install from GitHub after a repo/tag exists:

```bash
pi install git:github.com/<github-owner>/pi-tldraw@v0.1.0
```

Or quick-run a local checkout without installing:

```bash
pi -e .
```

## Runtime requirement: tldraw MCP app

The extension talks to a tldraw MCP server at:

```text
http://127.0.0.1:8787/mcp
```

If that endpoint is not reachable, the extension tries to auto-start a local tldraw MCP app when the endpoint is local. Auto-start uses:

1. `TLDRAW_MCP_APP_DIR`, if set.
2. `./mcp-app` at the package root, if present.

For a development checkout of tldraw:

```bash
export TLDRAW_MCP_APP_DIR=/path/to/tldraw/apps/mcp-app
```

If you prefer to run the MCP server yourself, start it separately and disable auto-start:

```bash
export TLDRAW_MCP_AUTO_START=false
```

## Extension shape

This is a testable Pi extension package:

```text
pi-tldraw/
├── src/
│   ├── index.ts             # Pi extension entry point / registration shell
│   ├── canvas/              # pure canvas state helpers + workflows
│   ├── commands/            # pure slash-command parsing
│   ├── host/                # local browser host adapter
│   ├── mcp/                 # MCP HTTP client + response parsing
│   ├── semantic/            # pure canvas semantic rendering layer
│   ├── server/              # local MCP server lifecycle adapter
│   ├── store/               # project snapshot persistence
│   └── ui/                  # Pi status widget adapter
├── test/                    # pure helper/workflow/unit tests
├── static/app-bridge-bundle.js
├── static/host.html
├── package.json             # Pi package metadata
└── tsconfig.json
```

Pi discovers the extension via:

```json
{
  "pi": {
    "extensions": ["./src/index.ts"]
  }
}
```

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
- `tldraw_diagram_tips` — get minimalist drawing guidance before creating or revising a diagram.
- `tldraw_canvas_export` — export the current selection or whole canvas as a PNG/SVG image for visual feedback.
- `tldraw_canvas_scene` — compact semantic canvas view; falls back to saved snapshots.
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
npm install
npm run check
npm run pack:dry
```

Keep logic that does not need Pi APIs in separate modules, such as `src/store/project-store.ts`, so it can be unit-tested without mocking Pi.
