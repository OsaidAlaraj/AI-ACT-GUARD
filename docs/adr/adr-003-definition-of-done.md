# ADR-003: Definition of done, and of a bug

**Status:** Accepted · **Date:** 2026-11-14

## Context

"Done" and "fixed" must be decidable from evidence, not from an agent saying so. This product
gives people legal orientation; a confidently wrong verdict is the worst failure it can have.

## Decision

### A ticket is done when

1. Every acceptance criterion `C1…Cn` has a named oracle (a test or a runtime-harness step) that was
   seen **red** before implementation and is **green** now, with its command and actual output in
   the ticket's `## Evidence`.
2. `pnpm verify` is green (enforced by the pre-commit hook and CI).
3. If a behaviour path changed, the runtime harness (or the runbook, until it exists) ran green and
   its report line is in Evidence.
4. Every reviewer seat `/work` spawned has its verdict recorded; `[load-bearing]` findings are
   closed.
5. The ticket's `## Outcome` is filled and its `WORK-ITEMS.md` row is removed in the same PR.

A broken design (`BREAKS (plan)` from the ticket adversary) gets **one** human-authorised retry on a
genuinely different approach; a second break parks the ticket with its evidence.

### A bug is

A `Type: Bug` ticket that carries, before any fix is written:

- **Consequence:** the observable wrong behaviour, in one line.
- **Reproduction:** exact steps or input.
- **Red regression test:** named by path, with the red output it produced before the fix.

The fix turns that test green. A bug that passed a green gate is also a harness defect: the
retrospective lands the fixture, rule, gate or harness step that catches its class.

### Done means, per dimension

| Dimension | Done means | Held afterwards by |
|---|---|---|
| Legal correctness | Verdicts follow the D13 order, cite only knowledge-base provisions, carry no banned wording | legal-claims-reviewer; `findBannedWording` tests; Stage B test runs |
| Bugs | Red regression test → green; class-level guard landed | the test suite; Phase 9 retrospective |
| Security | Untrusted input never steers the engine; expert routes need a session; no secrets in code | security-reviewer; `.claude/rules/untrusted-input.md` |
| Accessibility | WCAG 2.2 AA on changed screens; the decision path reads as an ordered list | a11y-reviewer; `.claude/rules/accessibility.md` |
| Architecture | `pnpm arch` green; no new boundary without an ADR | dependency-cruiser in the gate; ticket-planner |
| Performance | The surface's benchmark is under its adr-001 threshold | the `bench/` scripts, pre-merge |
| Design | UI matches the Decision Path brief; no chat styling, seals or scores | design-reviewer |

## Consequences

- No ticket closes on prose; every claim has a rerunnable command.
- Review rounds are bounded (one retry), so a misunderstood problem parks instead of looping.

## Alternatives considered

- **Green gate = done:** misses behaviour the unit suite cannot see and reviewer findings.
- **Open-ended review loops:** observed to run for many passes without converging; capped instead.
