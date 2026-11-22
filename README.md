# Email Studio Lab (FDE-102)

My Email Studio Lab, built with Claude Code. Sample brand: **Kettlebird Tea**, launching
a monthly tea box called **The Steep Club**. No real email is sent: every lead uses `@example.com`,
and a guard hook only lets sends go to `@resend.dev` test addresses or my own address.

| Folder | What it is |
|---|---|
| [`my-email-studio/`](my-email-studio) | The Kettlebird studio (steps 1–13, 15) |
| [`studio-kit/`](studio-kit) | Reusable plugin built from the studio (step 14) |
| [`client-two/`](client-two) | Second made-up client, Rise & Crumb bakery, using the kit (step 14) |

## Steps

| # | Step | Where |
|---|---|---|
| 1 | Look before you build | `my-email-studio/notes/skills-i-chose.md` |
| 2 | Set up the studio (project plugin, CLAUDE.md, .gitignore) | `my-email-studio/CLAUDE.md`, `.claude/settings.json` |
| 3 | Brand voice, imported with `@brand/voice.md` | `my-email-studio/brand/voice.md` |
| 4 | Campaign plan | `my-email-studio/campaigns/steep-club-launch/plan.md` |
| 5 | Practice leads (24, 8 per group) + folder rules | `my-email-studio/leads/` |
| 6 | Path-scoped email rule + 4-email sequence | `.claude/rules/emails.md`, `campaigns/steep-club-launch/emails/` |
| 7 | Fresh-eyes brand review, fixes in one commit | `my-email-studio/notes/brand-review.md` |
| 8 | `personalize` skill + 12 group versions | `.claude/skills/personalize/`, `campaigns/steep-club-launch/groups/` |
| 9 | Resend over MCP in practice mode | `my-email-studio/.mcp.json` |
| 10 | Send guard (PreToolUse hook, exit 2 blocks) | `.claude/hooks/send-guard.mjs`, `.claude/settings.json` |
| 11 | Practice launch log | `my-email-studio/notes/practice-launch.md` |
| 12 | Resume / fork notes | `my-email-studio/notes/angle-a.md`, `angle-b.md`, `handoff.md` |
| 13 | Headless review with JSON schema + re-review | `review/findings.schema.json`, `scripts/review.mjs` |
| 14 | studio-kit plugin + client-two | `studio-kit/`, `client-two/` |
| 15 | 120 reviews + scratchpad | `my-email-studio/notes/reviews/`, `notes/scratchpad.md` |

## Run it

```bash
cd my-email-studio
claude
```

Practice mail server for steps 9–11 (second terminal): `npx emulate@0.12.3 start --service resend`.
Put your own address in `my-email-studio/.claude/settings.local.json` as `{"env": {"MY_EMAIL": "you@..."}}` (not committed).
