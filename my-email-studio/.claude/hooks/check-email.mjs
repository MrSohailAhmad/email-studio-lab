#!/usr/bin/env node
// PostToolUse hook for Write and Edit: when the file is an email under campaigns/,
// run `mailroom check` on it. Problems go to stderr with exit 2, so Claude sees them and stops.
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

let call = {};
try {
  call = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  process.exit(0);
}

const file = String(call.tool_input?.file_path || "");
// The line that decides a file is an email: campaigns/<campaign>/.../emails/<name>.md
const isEmail = /(^|\/)campaigns\/.+\/emails\/[^/]+\.md$/.test(file);
if (!isEmail) process.exit(0);

const run = spawnSync("mailroom", ["check", file], { encoding: "utf8" });
if (run.error) {
  process.stderr.write(`Mailroom is not installed, so ${file} was not checked. Install it: uv tool install git+https://github.com/MrSohailAhmad/mailroom@v1.1\n`);
  process.exit(2);
}
if (run.status !== 0) {
  process.stderr.write(`Mailroom check found problems in ${file}:\n${run.stdout}${run.stderr}`);
  process.stderr.write("Fixed rules are checked by Mailroom. Stop and ask the user before keeping this email.\n");
  process.exit(2);
}
process.exit(0);
