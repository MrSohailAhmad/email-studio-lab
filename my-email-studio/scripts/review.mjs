#!/usr/bin/env node
// Headless brand/rules review of a campaign folder.
// Usage: node scripts/review.mjs campaigns/<name>
// Writes review/findings.json and exits 1 if any finding is high severity.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign folder>");
  process.exit(2);
}

const schemaPath = join(root, "review", "findings.schema.json");
const outPath = join(root, "review", "findings.json");
const schema = readFileSync(schemaPath, "utf8");

let prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// Re-review: include earlier findings for the same folder.
if (existsSync(outPath)) {
  try {
    const prev = JSON.parse(readFileSync(outPath, "utf8"));
    if (prev.folder === folder && Array.isArray(prev.findings) && prev.findings.length) {
      prompt += `\n\nThese are findings from the last review:\n${JSON.stringify(prev.findings, null, 2)}\n` +
        "Report only problems that are new or still not fixed. Don't repeat ones that have been fixed.";
    }
  } catch {
    // unreadable previous file: ignore and do a full review
  }
}

const run = spawnSync("claude", [
  "-p", prompt,
  "--output-format", "json",
  "--json-schema", schema,
  "--allowedTools", "Read,Glob,Grep",
], { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 });

if (run.error || run.status !== 0) {
  console.error(`Review failed: claude exited with ${run.status ?? run.error?.message}`);
  if (run.stderr) console.error(run.stderr.trim());
  process.exit(2);
}

let parsed;
try {
  parsed = JSON.parse(run.stdout);
} catch {
  console.error("Review failed: could not parse claude output as JSON.");
  process.exit(2);
}
// Output may be one object, or a list whose last item is the result.
const result = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
const structured = result?.structured_output;
if (!structured || !Array.isArray(structured.findings)) {
  console.error("Review failed: no structured_output.findings in claude result.");
  process.exit(2);
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({ folder, findings: structured.findings }, null, 2) + "\n");

const counts = { high: 0, medium: 0, low: 0 };
for (const f of structured.findings) counts[f.severity] = (counts[f.severity] || 0) + 1;
console.log(`${folder}: ${structured.findings.length} findings (high ${counts.high}, medium ${counts.medium}, low ${counts.low}) -> review/findings.json`);
process.exit(counts.high > 0 ? 1 : 0);
