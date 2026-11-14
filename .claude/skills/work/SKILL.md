---
name: work
description: Execute a ticket end-to-end with the review pipeline (branch → plan + research + approach → pre-exec review → red oracles → implement → gate → test strength → post-impl review → close-out → PR → retrospective → next ticket). User-invocable only.
argument-hint: "[ticket path or task description]"
disable-model-invocation: true
---

The gate (`pnpm verify`) runs at commit time via the pre-commit hook (authoritative) and at turn end
via the Stop hook (backstop). Do not run it as a ritual. Spawn reviewers of one phase in a single
message (parallel). Run each review pass once; verify fixes yourself. Agents live in
`.claude/agents/`; the finding format is `.claude/findings-bar.md`.

## Phase 0 — Branch

`git switch -c t-NNN-<slug>` from an up-to-date `main` (`git pull --ff-only` when a remote exists).
Never commit on `main` (the pre-commit hook blocks it).

## Phase 1 — Ticket shape & prep

Classify: **Small change** (single purpose, obvious decisions) · **Component** (anything else; write
the ticket from `tickets/TEMPLATE.md` and register it in `WORK-ITEMS.md`) · **Bug** (a defect).

- **Bug intake:** Consequence, Reproduction and a red regression test (path + red output) exist
  before any fix (`.claude/rules/defect.md`).
- **Acceptance criteria and oracles:** number them `C1…Cn`; each names a test or an `e2e/` step.
  Before Phase 3 every oracle exists and is **RED on the current tree**; commit the red tests on the
  branch with their output in Verification.
- **Research:** Small change: at most one targeted lookup. Component: 2–3 parallel research agents
  (`Explore` or `general-purpose`) on the specific API, library or legal provision this ticket needs,
  from primary sources (installed `node_modules` types and docs; EUR-Lex / knowledge-base provisions
  for legal content). Findings feed Research and the Proven/Novel tags.
- **Approach pass (Component):** present 2–4 approaches (mechanism + trade-off) and ask Osaid to
  pick with one AskUserQuestion. A durable cross-ticket decision (a new port, a package boundary, a
  pattern others inherit) gets an ADR from `docs/adr/TEMPLATE.md` now; set `ADR: creates adr-NNN`.
- **Completeness gate:** spawn `ticket-planner`; resolve every gap; proceed only on `COMPLETE`.

## Phase 2 — Pre-execution review

- Small change: `fact-checker`.
- Component and Bug, in parallel: `fact-checker` ∥ `ticket-adversary`, plus `legal-claims-reviewer`
  if the ticket changes legal logic or knowledge-base content, plus `security-reviewer` if it
  touches website fetching, uploads, model prompts, auth or secrets.

Resolve every `WRONG`/`UNVERIFIED` citation and blocking finding before Phase 3.

`ticket-adversary` verdicts: `BREAKS (evidence)` → repair the record, re-derive, continue (no retry
used). `BREAKS (plan)` → the plan-break pivot below. Run every probe it handed over; do not rebuild it.

## Phase 3 — Execute

Start at the red oracles, implement until each is green. Adjacent bug fixes are fine; a design-shape
change halts the work, goes back into the ticket, then resumes. **Drive before you build on it:**
each behavioural claim in the plan is run on the real path before more code stands on it; a claim
about the running app is driven through the Playwright harness in `e2e/` (build it if this is the
first ticket that needs it, adr-002). Real model calls only through the harness, with its call and
spend caps.

## Phase 4 — Self-check

Re-read the diff against Blast radius. What could be silently wrong? What drifted from the plan?
Any claim without `file:line`, URL or probe output? Run `findBannedWording` over new user-facing
strings. Fix; cite; skip nits.

## Phase 5 — Mechanical gate

Runs at commit (hook). For a spot check mid-work run one sub-step (`pnpm test`, `pnpm arch`).

## Phase 5b — Test strength

`pnpm exec stryker run --mutate "<changed source files>"`. Kill every surviving mutant by adding the
missing assertion. Always for a Bug fix; for a trivial Small change it may be left to the PR's
`mutation` CI job.

## Phase 6 — Post-implementation review

**Freeze the diff first: commit before spawning reviewers.** In parallel:

- always `correctness-reviewer` (executes the suite);
- Component: + `patterns-auditor`;
- diff touches `packages/engine`, legal copy, the report or the knowledge base: + `legal-claims-reviewer`;
- diff touches `packages/gateway`, prompt building, route handlers, server actions or auth: + `security-reviewer`;
- diff touches `apps/web` UI: + `a11y-reviewer` ∥ `design-reviewer`.

Close every `[load-bearing]` finding; re-verify by re-running. Record each verdict in the ticket.

## Phase 7 — Close-out

Fill `## Outcome` and `## Evidence` (each oracle's command and actual green output). Remove the
`WORK-ITEMS.md` row on this branch. Commit (the hook proves it green).

## Phase 8 — Integrate

**Runtime run:** if behaviour changed, run the `e2e/` harness (or the runbook until it exists) and
paste its report line into Evidence. A red run stops and asks.

Push the branch and open a PR to `main` with the Outcome as its body (`gh pr create` if available;
otherwise print the GitHub compare URL). CI (`verify` + `mutation`) gates the merge. Until a GitHub
remote exists, stop here and tell Osaid the branch is ready.

**Stop and ask only on a surprise:** CI red; an unresolved blocking finding; a design decision made
mid-ticket; a pre-existing bug surfaced; anything needing approval (new spend, a Neon migration).

## Phase 9 — Retrospective (always)

Inspect the session: ticket, CLAUDE.md files, rules, gate, reviewers, friction. Only items with a
named consequence. Small in-scope fix → its own branch + PR. Larger → a ticket. Nothing → say so.

**Escaped defect:** a bug that passed a green gate is a harness defect. Land the fixture, rule, gate
or harness step that catches the **class** before closing, or write the test and delete the story.

## Phase 10 — Next ticket (always, last)

Read `WORK-ITEMS.md` and `PLAN.md`; recommend the single next actionable ticket (earliest open
phase, skipping blocked/deferred) and print the exact `/work` command. At the end of a phase, the
next ticket is its exit audit (`tickets/TEMPLATE-phase-audit.md`).

---

## Plan-break pivot protocol

When the design is proven wrong (`BREAKS (plan)`, or a spike shows the approach cannot meet
Verification):

1. Do not patch to the counterexample. Step back: 2–4 approaches, mechanism + trade-off, class-first.
2. Where available, get a second opinion from a different model than the judgment seats; treat its
   output as claims to ground, not verdicts.
3. One retry, authorised by Osaid via AskUserQuestion. It SURVIVES → continue. A second
   `BREAKS (plan)` → park the ticket: keep the problem, the evidence and both counterexamples.

An evidence break is not a design break: repair the record and continue.
