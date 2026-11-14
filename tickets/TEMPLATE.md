# T-NNN: <title>

**Type:** Small change | Component | Bug · **Phase:** <Stage A wN | Stage B | Phase 1 | infra | design> · **Depends on:** <T-NNN, …> · **ADR:** creates adr-NNN | cites adr-NNN | none

| Started | Completed |
| ------- | --------- |
| <date>  | <date>    |

## Goal

What this delivers and its effect for customers (SME owners, lawyers) or experts. For infra-only
work: "No direct user effect — <downstream impact>".

## Acceptance criteria

Numbered `C1…Cn`. Each names its **oracle**: the test, or for a claim about the running app the
runtime-harness step, that proves it. Written from the criterion, not the plan, and seen RED
before implementation (Verification records the red). A criterion with no oracle, or one already
green on the current tree, is a gap.

- **C1** — <criterion> · oracle: `<test path or e2e step>`
- **C2** — …

**Done when:** every oracle is green with its command + output in Evidence; `pnpm verify` is green;
the runtime run is green if a behaviour path changed; every reviewer seat's verdict is recorded
(adr-003).

## Research

Primary sources validated before execution: doc URL, repo path, or saved note. Component tickets
get this from the `/work` Phase 1 research fan-out. Legal claims cite the knowledge-base provision
id, never memory.

## Technical Plan

For each change:

- **What:** files / functions / tables / config that change, and which package
  (engine, gateway, db, web).
- **Why it works:** the mechanism, 1–2 sentences.
- **Proven / Novel:** `proven — matches <file:line>` OR `novel — validated via <url>` OR
  `novel — driven via <probe + output>`. Recall is not a fourth tag; an untagged change does not
  ship.

Schema changes name the exact columns and the migration. UI changes name the screen and states
from the Decision Path brief (`.code-foundations/research/2026-11-14-design-brief-decision-path.md`).

## Blast radius

Keep the rows that apply; delete the rest.

- **Signature change** → every call site (production + test).
- **Port change** (`packages/engine/src/ports.ts`) → every adapter that implements it + its tests.
- **Schema / data change** → all readers + a schema snapshot test + the migration number.
- **Architecture** → `pnpm arch` (adr-001 boundary).
- **Irreversible sink** → anything that cannot be undone: model API spend (name the call cap and
  spend cap), a migration or delete on the Neon database, an outbound fetch to a customer website,
  an email. Name it, its guard, and the input this ticket did NOT stage. An empty row on a change
  that writes data or calls a model is itself a finding.
- **Untrusted input** → any website text, uploaded document or customer answer this change
  reads: how it is kept out of model instructions and out of rendered HTML.
- **Legal content** → provisions cited, banned-wording exposure, D13 step order.
- **UX** → screens and states affected (Decision Path §3, §5), keyboard and screen-reader path.

## Verification (specify-first)

- **Red oracles, one per criterion:** path, the command that runs it, and the red output it
  produced before implementation. For a running-app claim, an `e2e/` step (building the harness
  is in scope when none exists, adr-002).
- **Commands:** `pnpm verify` (green after); `pnpm test:mutation` on changed files (Phase 5b);
  the `bench/` script if a performance surface changed.

## Evidence

The commands behind this ticket's claims and the output they ACTUALLY produced. Every number lives
in a block here.

```
$ <exact command>
<actual output>
```

## Decisions

Open questions resolved during planning. Component tickets: the approaches weighed in the Phase 1
approach pass and why the chosen one won; a durable cross-ticket choice becomes an ADR instead.

## Outcome

Filled at close. Small change: one line. Component: Before / After / what shipped, with evidence.

---

<!--
## Bug variant (Type: Bug) — required BEFORE any fix (adr-003, factor 15)

- **Consequence:** the observable wrong behaviour, one line.
- **Reproduction:** exact steps or input.
- **Red regression test:** path + the red output it produced before the fix.

The Goal states the consequence; Verification's red test is the regression test; Evidence carries
its red-then-green output.
-->
