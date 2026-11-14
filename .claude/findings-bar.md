# The findings bar

Loaded on demand by every reviewer seat. One definition of "important" for all lenses.

## A finding qualifies only with a named production consequence

State the specific effect, or cut the finding:

- incorrect behaviour or a wrong verdict, data loss, security exposure;
- a legal-content error: wrong step order, a citation that does not resolve to the knowledge base,
  banned wording, a wrong applies-from date;
- an accessibility failure against WCAG 2.2 AA;
- performance past an adr-001 threshold at realistic load;
- compounding debt: a stale comment, dead code or misleading name that leads a reader wrong;
- a decision-completeness gap that blocks execution (a TBD, a missing API name);
- citation drift: a `file:line` or quoted mechanism that does not match the file;
- behaviour-claim drift: a load-bearing claim about library or runtime behaviour with no probe
  (command + output) or primary source. Flag `[UNVERIFIED]`; verify or cut before approval.

**Skip:** style preferences, edge cases the contract excludes, behaviour-neutral refactors,
"could be cleaner". When unsure, ask a question instead of recommending.

## Required format, three fields on every finding

- `TAG:` `[load-bearing]` (must close before approval) · `[induced]` (created by a fix this round)
  · `[polish]` (no consequence; skip unless asked)
- `LENS:` the domain that should have caught it: planner · fact-check · adversary · correctness ·
  patterns · legal · security · a11y · design
- `CONSEQUENCE:` one sentence naming the production effect

A late pass finding a `[load-bearing]` item in an earlier pass's lens means that earlier seat
drifted: tighten its prompt, don't only close the finding.
