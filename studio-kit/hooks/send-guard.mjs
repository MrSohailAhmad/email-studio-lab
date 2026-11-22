#!/usr/bin/env node
// PreToolUse guard for the resend MCP server.
// Exit 0 = allow. Exit 2 = block (stderr is shown to Claude as the reason).
import { readFileSync } from "node:fs";

const BULK_TOOLS = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const SEND_TOOLS = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`Send guard: ${reason}\n`);
  process.exit(2);
}

let call;
try {
  call = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  block("could not read the tool call, so it was blocked to be safe.");
}

const toolName = String(call.tool_name || "");
const shortName = toolName.replace(/^mcp__resend__/, "");
const input = call.tool_input || {};
const myEmail = (process.env.MY_EMAIL || "").trim().toLowerCase();

if (BULK_TOOLS.has(shortName)) {
  block(`${shortName} is always blocked because it can reach whole lists of people.`);
}

if (!SEND_TOOLS.has(shortName)) process.exit(0);

function addresses(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(addresses);
  if (typeof value === "object") return addresses(value.email || value.address);
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.match(/<([^>]+)>/)?.[1] || s).trim().toLowerCase());
}

const messages = shortName === "send-batch-emails"
  ? (Array.isArray(input.emails) ? input.emails : Array.isArray(input) ? input : [input])
  : [input];

for (const msg of messages) {
  for (const field of ["to", "cc", "bcc"]) {
    for (const addr of addresses(msg?.[field])) {
      const ok = addr.endsWith("@resend.dev") || (myEmail && addr === myEmail);
      if (!ok) {
        block(`${addr} is not a test address (@resend.dev) or your own email (MY_EMAIL), so this send was blocked.`);
      }
    }
  }
}
process.exit(0);
