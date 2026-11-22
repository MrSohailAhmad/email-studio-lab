# Automatic review runs (step 13)

Script: `node scripts/review.mjs <campaign folder>` runs `claude -p ... --output-format json --json-schema <schema text> --allowedTools "Read,Glob,Grep"`, saves `review/findings.json` (with the folder name) and exits 1 on any high-severity finding.

| Run | Folder | Findings | Exit code |
|---|---|---|---|
| 1 | campaigns/test-bad | 6 (high 5, medium 1) – detox/miracle/last chance subject, "hurry, act now" preview, health claims, **two links**, wrong sign-off, missing footer | **1** |
| 2 | campaigns/steep-club-launch | 1 (medium: a dangling "Either way" in one group's email 03) | **0** |
| 3 | campaigns/test-bad (fresh) | 8 (high 6, medium 2) | **1** |

Second-link finding (run 1): *"Two links present ([Buy now] and [Or click here]). Rules require exactly one main link."*

## Re-review
The detox claim in `campaigns/test-bad/emails/01-bad.md` was fixed ("A warm cup is a nice way to slow down."). The re-review (which sends the previous findings and asks only for new or still-unfixed problems) could not run yet: the Claude Code account hit its usage limit. Run it again with:

    node scripts/review.mjs campaigns/test-bad

Expected: the detox finding is gone and nothing is reported twice.
