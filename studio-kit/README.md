# studio-kit

Reusable tools for running an email studio with Claude Code, for any client.

## What's inside
| Part | File | What it does |
|---|---|---|
| Skill | `skills/personalize/SKILL.md` | Writes one version of each campaign email per lead group (`context: fork`) |
| Hook | `hooks/hooks.json`, `hooks/send-guard.mjs` | PreToolUse guard on `mcp__resend__.*`: only `@resend.dev` or `MY_EMAIL` recipients; bulk tools always blocked |
| Agent | `agents/email-reviewer.md` | Read-only reviewer (Read, Glob, Grep) against the project's brand voice and email rules |
| Review | `review/findings.schema.json`, `scripts/review.mjs` | Headless `claude -p` review with JSON schema output; exits 1 on high-severity findings |

## Install
Try it without installing:

    claude --plugin-dir ../studio-kit

Or add it as a marketplace and install for one project:

    claude plugin marketplace add ../studio-kit --scope project
    claude plugin install studio-kit@studio-kit-marketplace --scope project

Copy `review/` and `scripts/` into the client repo if you want to run the headless review there (`node scripts/review.mjs campaigns/<name>`).

## What stays in each client's repo, and why
Brand voice (`brand/voice.md`), leads, campaigns, `CLAUDE.md`, `.claude/rules/emails.md` and `.mcp.json` stay with each client.
They describe one business: its voice, its customers, its footer and links. Putting them in the kit would leak one client's brand and contacts into another's work. The kit only holds tools that work the same everywhere.

## Won't travel on its own
- The guard needs `MY_EMAIL` set in each client's `.claude/settings.local.json`.
- The resend MCP server comes from each client's own `.mcp.json`.
- The review script reads the client's `brand/voice.md` and `.claude/rules/emails.md`, so those must exist.
