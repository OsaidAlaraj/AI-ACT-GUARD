# packages/engine — the core

**Responsibility:** the legal test (D13 step order), question selection (D14), verdict rules,
escalation rulebook, reasoning memo, test-case runner logic (D15), banned-wording check.

**Import boundary (enforced, adr-001):** plain TypeScript and the standard library only. No `next`,
`react`, `drizzle-orm`, `ai`, `@ai-sdk/*`, `better-auth`, `@react-pdf/*`, and no other workspace
package. Need something from outside? Add a port in `src/ports.ts`; an adapter implements it.

**Belongs here:** rules that decide a verdict, which question comes next, when to escalate, what the
memo says. **Does not:** HTTP, SQL, prompts' transport, rendering, environment variables.

**Change warnings:**

- `LEGAL_TEST_STEPS` order is the D13 order; the UI path, memo, report and expert view all follow
  it. Changing it is an ADR, not an edit.
- A port change breaks every adapter that implements it; list them in the ticket's Blast radius.
- Verdicts must be deterministic for the same facts (D13.4): no clocks, randomness or model calls
  except through ports, and every model call goes through `ModelPort` at temperature 0.
