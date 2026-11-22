---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Input: a campaign folder, for example `campaigns/steep-club-launch`.

If no campaign folder is given, stop. Use Glob to list the folders in `campaigns/` and reply with that list, asking which one to use. Write nothing.

Steps:
1. Read `leads/leads.csv` and collect the distinct values of the `group` column (for this studio: tea-curious, gift-buyers, daily-drinkers).
2. Use Glob to find every email in `<campaign folder>/emails/*.md`.
3. For each email and each group, write a copy to `<campaign folder>/groups/<group>/emails/<same file name>`.
4. In each copy, keep everything identical (Subject, Preview, greeting, structure, the one link, sign-off and footer) **except**:
   - the opening line after the greeting, rewritten to speak to that group;
   - one example sentence, swapped for an example that fits that group.
5. Follow brand/voice.md and .claude/rules/emails.md. No new links, no new claims.

When finished, reply with a short summary only:
- how many files you wrote;
- one example opening line per group.
