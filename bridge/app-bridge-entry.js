import { AppBridge, PostMessageTransport } from '@modelcontextprotocol/ext-apps/app-bridge'

// Browser host entry point for Pi's local tldraw iframe host.
// Keep this intentionally small: the build step owns bundling MCP Apps bridge
// dependencies into static/app-bridge-bundle.js for zero-build installs.
globalThis.McpAppsBridge = { AppBridge, PostMessageTransport }
