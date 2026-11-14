---
paths:
  - "packages/engine/**"
---

# Engine boundary (adr-001)

- Import only from inside `packages/engine` and the standard library. `pnpm arch` fails otherwise.
- Need IO (model, database, clock, fetch)? Define or extend a port in `src/ports.ts`; an adapter
  implements it. A port change lists every implementing adapter in the ticket's Blast radius.
- Keep verdicts deterministic for the same facts: no `Date.now()`, `Math.random()` or env reads.
- Follow the D13 step order (`LEGAL_TEST_STEPS`) everywhere; changing it needs an ADR.
- Model prompts: instructions in `system`; customer website text, documents and answers only in
  `prompt`, clearly delimited as data (see `untrusted-input.md`).
