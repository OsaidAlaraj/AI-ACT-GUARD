# T-NNN: <Phase> exit audit

**Type:** Phase audit · **Phase:** <Stage A | Stage B | Phase 1>

| Started | Completed |
| ------- | --------- |

## Goal

No direct user effect — close <Phase> clean before the next phase builds on it. A checkpoint audit
of the whole tree on `main`, not a diff.

## Precondition

Every other ticket in the phase is closed (row removed from `WORK-ITEMS.md`) and `main` is green.
This is always the last ticket of its phase. A Blocked/Deferred ticket is listed here with the
reason it carries forward.

## Run

From `/work`, in one parallel spawn, one reviewer per dimension over the full tree
(`git ls-files`), after running `pnpm verify` and `pnpm test:mutation`:

- **correctness** — correctness-reviewer (executes the suite)
- **architecture** — adr-001 boundary, port design, blast radius
- **patterns / rules** — patterns-auditor
- **legal** — legal-claims-reviewer: D13 order, knowledge-base citations, banned wording, dates
- **security** — security-reviewer: untrusted input, auth, secrets
- **accessibility** — a11y-reviewer
- **performance** — the four adr-001 benchmarks against their thresholds
- **loose ends** — deferred TODOs, cleared blockers, schema-doc drift, dead code, uncaptured
  retrospective lessons

Every finding is adversarially verified: default to not-real unless re-reading the source or
re-running the command confirms it.

## Findings → routing

Ranked by impact (never by lines of code or time), each `[severity] dimension — claim — file:line`.
Osaid decides per finding:

- **Fix in this ticket**
- **New ticket** (`(retro from <Phase> audit)`)
- **Accept / wontfix** with the rationale recorded below

No auto-filed tickets or auto-applied fixes without direction.

## Outcome

_Findings by disposition (fixed / ticketed / accepted) and the go-ahead for the next phase._
