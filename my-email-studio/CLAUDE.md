# Kettlebird email studio

This studio plans and writes email campaigns for a small business (Kettlebird Tea).

## Folders
- `brand/` – how the brand sounds: voice, words to use and avoid, sign-off.
- `leads/` – made-up practice contacts for campaigns (never real people).
- `campaigns/` – one folder per campaign: the plan, the emails and per-group versions.
- `notes/` – research, decisions and working notes.

## Rules
- Write in plain English.
- Never send email to real people.
- Practice sends go only to @example.com and @resend.dev addresses. Mailroom's guard decides (`mailroom guard`, called by the send-guard hook).
- Every email under campaigns/ is checked by `mailroom check` when it is saved. Fixed rules are checked by Mailroom. Claude handles the judgment: if Mailroom reports a problem, stop and ask me.
- Ask me before deleting anything.

## Brand
@brand/voice.md
