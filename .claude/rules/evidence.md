# Evidence

Always-on.

## The three rules that prevent data loss

- **A behavioural claim is proven by DRIVING the code, never by citing it.** "The engine picks
  this question", "the gateway returns valid JSON", "this verdict is stable" — a `file:line` only
  shows the code exists. Run the real function, paste its actual output, and choose inputs that
  could **falsify** the claim. This binds your PLAN as hard as your fix: drive each claim before
  building on it, on the real path, not a reconstruction of it. A claim about the running app is a
  runtime-harness step (`e2e/`, adr-002).
- **A NEGATIVE from an unvalidated instrument is worth nothing, and evidence HANDED to you is
  unvalidated.** Never conclude absent / clean / no matches from a probe you have not watched
  produce a positive on a known-true case. A reviewer's or subagent's negative is a claim, not a
  verdict: re-derive it before repeating or acting on it.
- **A guard on an IRREVERSIBLE operation gets both directions, once, in the suite**: the case
  that must fire and the neighbour that must not. Here: the spend cap on model calls, the "never
  touch Neon from tests" guard, migrations, anything that deletes rows or knowledge-base versions.

## Conventions tickets cite by name

- **Stable names in durable prose; `file:line` only for point-in-time evidence** (ticket anchors,
  review findings).
- **One measurement, one number** across a ticket and its ADR; reconcile at execution.
- **The evidence tag** on every ticket change: `proven — matches <file:line>` ·
  `novel — validated via <url>` · `novel — driven via <probe + output>`. Recall is not a fourth tag.
- **Legal claims** cite a legal-knowledge-base provision id, never memory.
- **Counts come from a tool, with the command inline.**

## Incidents belong in the suite, not in this file

When a rule here would grow a war story, write the test and delete the story.

| Lesson | Enforced by |
| ------ | ----------- |
| Under pnpm, an undeclared package does not resolve, so a boundary rule matching only `node_modules/<pkg>/` passed with `ai` and `drizzle-orm` imported inside the engine (found by negative control at setup, 2026-11-14). | `.dependency-cruiser.cjs`: rules match bare specifiers too, plus `not-to-unresolvable` |
| The gate (tsc, Vitest) was green while `next build` failed: Turbopack does not map `./x.js` to `./x.ts` in workspace source (found at setup, 2026-11-14). | `pnpm build` in CI (`.github/workflows/verify.yml`); relative imports carry no `.js` extension |
| The AI SDK's `jsonSchema()` does not validate model replies; an off-schema reply passed through the gateway (found by a red test at setup, 2026-11-14). | `packages/gateway/src/index.test.ts` "rejects a response that does not match the schema" |
