# Codex Agent Session Manager

Agent-facing Codex App Server session manager with an MCP validation harness.

This repository is reserved for a clean extraction from the
`codex-mcp-hot-reloader` research and validation work. The goal is to expose
selected Codex App Server session operations as safe MCP tools that a Codex
agent can call from inside its own workflow.

Early scope:

- discover loaded and persisted Codex threads;
- identify the intended thread with cwd, status, and marker evidence;
- reload MCP server processes and continue after an idle boundary;
- close or replace stale managed remote sessions;
- track operations with status, logs, and next actions;
- validate MCP callable-catalog changes from a fresh model turn.

The project is intentionally starting from the session-management architecture,
not from a generic App Server SDK or a human session browser.

