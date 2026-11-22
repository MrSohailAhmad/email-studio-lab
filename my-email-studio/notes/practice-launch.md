# Practice launch (step 11)

Plan: send each group's version of email 01 (`campaigns/steep-club-launch/groups/<group>/emails/01-doors-open.md`)
to `delivered@resend.dev`, subject tagged with the group, `{{first_name}}` replaced with "there".

| Group | Subject | To | Status |
|---|---|---|---|
| tea-curious | [tea-curious] The Steep Club is open | delivered@resend.dev | to run |
| gift-buyers | [gift-buyers] The Steep Club is open | delivered@resend.dev | to run |
| daily-drinkers | [daily-drinkers] The Steep Club is open | delivered@resend.dev | to run |

To run: start the practice server in a second terminal (`npx emulate@0.12.3 start --service resend`),
start `claude` in this folder, approve the resend server, then paste the step 11 build prompt.
Update the Status column with the ids and "delivered" from the resend tools.

## Guard tested directly (step 10)
Piping tool calls into `.claude/hooks/send-guard.mjs` with MY_EMAIL set:

| Call | Result |
|---|---|
| send-email to ayesha.khan@example.com | blocked, exit 2: "Send guard: ayesha.khan@example.com is not a test address (@resend.dev) or your own email (MY_EMAIL), so this send was blocked." |
| send-email to delivered@resend.dev | allowed, exit 0 |
| send-email to my own email | allowed, exit 0 |
| send-email to my email with cc x@gmail.com | blocked, exit 2 (names x@gmail.com) |
| send-batch-emails with one @example.com address | blocked, exit 2 |
| send-broadcast | blocked, exit 2 ("can reach whole lists of people") |
| list-emails | allowed, exit 0 |
