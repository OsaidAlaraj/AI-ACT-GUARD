# ADR-001: Workspace with a hexagonal engine core

**Status:** Accepted · **Date:** 2026-11-14

## Context

AI Act Guard runs a fixed legal test (requirements D13) over facts gathered from a website, a smart
question flow and documents, calls three interchangeable AI models (D7), stores assessments,
expert cases and test runs (D9, D15), and must later run the same engine inside a company network
(Phase 3) and learn from expert corrections (Phase 2). Stack is fixed in PRODUCT.md: Next.js
(TypeScript) and PostgreSQL.

Two forces shape the architecture:

- **The legal logic must be testable and stable on its own.** Verdicts must be repeatable (D13.4),
  cite only the versioned legal knowledge base (D13.2), and be runnable by the automated test
  runner (D15) without a browser, a database server or a paid model call.
- **Every model call must go through one place** so switching provider, or moving to the EU route
  before Phase 1, is configuration and not a rebuild (D7).

## Decision

A **pnpm workspace** with a **hexagonal (ports-and-adapters) core**:

| Package | Role | May import |
|---|---|---|
| `packages/engine` | The core: legal-test step order, question selection, verdict rules, escalation rulebook, reasoning memo, test-case runner logic. Defines **ports** (`ModelPort`, `LegalKnowledgePort`, and later storage/fetch ports). | Nothing outside itself (plain TypeScript, standard library) |
| `packages/gateway` | Adapter: implements `ModelPort` with the Vercel AI SDK (Anthropic, OpenAI, Mistral). | `@aag/engine`, `ai`, `@ai-sdk/*` |
| `packages/db` | Adapter: Drizzle ORM schema, migrations, port implementations backed by PostgreSQL (Neon in dev, PGlite in tests). | `@aag/engine`, `drizzle-orm` |
| `apps/web` | Next.js 16 app: screens, route handlers, expert sign-in (Better Auth), PDF (react-pdf); wires adapters into the engine. | all of the above |

**The enforced boundary** (factor 7), checked by dependency-cruiser in `pnpm verify`
(`.dependency-cruiser.cjs`):

1. `packages/engine` imports no `next`, `react`, `react-dom`, `drizzle-orm`, `drizzle-kit`,
   `@electric-sql/pglite`, `ai`, `@ai-sdk/*`, `better-auth` or `@react-pdf/*` (`engine-is-pure`).
2. `packages/engine` imports no other workspace package (`engine-imports-no-workspace-package`).
3. Only `packages/gateway` imports `ai` or `@ai-sdk/*` (`model-sdk-only-in-gateway`).
4. No circular dependencies (`no-circular`).

Sources: the dependency rule, "dependencies must only point inwards"
([kroneman/hexagonal-architecture-ts](https://github.com/kroneman/hexagonal-architecture-ts)
enforces it with dependency-cruiser); Next.js `src` folder convention
([nextjs.org/docs](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder));
Vercel AI SDK providers `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/mistral` (npm registry,
checked 2026-11-14).

**Pinned stack (2026-11-14):** Node ≥ 24, pnpm 11, Next 16.4.6, React 19.3, TypeScript 6.0.3
(held below 6.1 because `typescript-eslint` 8.72 peers `<6.1.0`), AI SDK 7, Drizzle ORM 0.45,
PGlite 0.5, Vitest 5.1, ESLint 10, dependency-cruiser 18.7, Stryker 10.1. Hosting: Vercel,
Frankfurt (fra1); database: Neon, Frankfurt.

### Performance-sensitive surface (factor 17)

Present. Four surfaces, each with a benchmark and threshold run outside the fast gate (adr-002):

| Surface | Measure | Threshold |
|---|---|---|
| Question flow | time from confirmed answer to next question visible (p95) | ≤ 4 s |
| Model spend | cost of one full assessment per model, including the 3 stability runs | ≤ €0.40 |
| Report | PDF generation time | ≤ 5 s |
| Pages | Lighthouse performance score, start and report pages | ≥ 90 |

## Consequences

- The engine is unit-testable with fakes for every port; the D15 test runner drives the real
  engine with a scripted customer and no browser.
- Switching model provider is `AAG_MODEL_PROVIDER` / `AAG_MODEL_ID`; moving to the EU route is a
  gateway change only.
- Phase 3 (intranet) reuses `packages/engine` unchanged with different adapters.
- Cost: more packages and wiring than a single Next.js app; workspace packages ship TypeScript
  source and `apps/web` transpiles them (`transpilePackages`).
- **Invariants:** the four dependency rules above; the engine cites provisions only through
  `LegalKnowledgePort`; untrusted text (websites, documents, customer answers) never enters a
  model's system instructions.

## Alternatives considered

- **Hexagonal core inside one Next.js app** (`src/core` + adapters): less setup, but the engine
  would share the app's dependency graph, weaker separation for Phase 2/3. Rejected by Osaid in
  favour of the workspace.
- **Feature folders only:** the common Next.js convention; mixes legal logic with UI and data
  code, so the verdict rules cannot be tested or reused on their own.
- **Separate engine service (HTTP):** strongest isolation, but a network hop and deployment of two
  services is not justified in a one-month prototype; the workspace keeps that option open.
