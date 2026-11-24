#!/usr/bin/env node
// PreToolUse guard for the resend MCP server.
// Bulk tools are always blocked here. Every other call is passed to `mailroom guard`,
// which holds the one tested copy of the recipient rule. Exit 2 blocks the call.
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const BULK_TOOLS = new Set(["send-broadcast", "create-automation", "send-inbox-draft", "send-new-inbox-email"]);

const input = readFileSync(0, "utf8");
let call = {};
try {
  call = JSON.parse(input || "{}");
} catch {
  process.stderr.write("Send guard: could not read the tool call, so it was blocked to be safe.\n");
  process.exit(2);
}

const shortName = String(call.tool_name || "").replace(/^mcp__resend__/, "");
if (BULK_TOOLS.has(shortName)) {
  process.stderr.write(`Send guard: ${shortName} is always blocked because it can reach whole lists of people.\n`);
  process.exit(2);
}

const run = spawnSync("mailroom", ["guard"], { input, encoding: "utf8" });
if (run.error) {
  process.stderr.write("Send guard: mailroom is not installed, so the send was blocked. Install: uv tool install git+https://github.com/MrSohailAhmad/mailroom@v1.1\n");
  process.exit(2);
}
if (run.stderr) process.stderr.write(run.stderr);
process.exit(run.status === 0 ? 0 : 2);
