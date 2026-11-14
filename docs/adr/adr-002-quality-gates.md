# ADR-002: Quality gates

**Status:** Accepted · **Date:** 2026-11-14

## Context

Most code in this project is agent-written. The gate must run on every commit without relying on
anyone remembering it, stay fast enough that it is never bypassed, and prove its own enforcement.
Slow checks (mutation testing, benchmarks, the real-browser harness) still need a home, outside
the fast path. The gate is one condition of done, not the whole definition (adr-003).

## Decision

### The fast gate: `pnpm verify`

Runs, in order, failing on the first red step:

1. `node scripts/verify-hooks-live.mjs`: git will actually run the committed pre-commit hook.
2. `pnpm -r --if-present typecheck`: `tsc` in every package (strict, `noUncheckedIndexedAccess`,
   `exactOptionalPropertyTypes`).
3. `prettier --check .`: formatting.
4. `eslint . --max-warnings=0`: typescript-eslint recommended + Next.js rules for `apps/web`.
5. `depcruise apps packages --config .dependency-cruiser.cjs`: the architecture boundary
   (adr-001).
6. `vitest run`: unit and integration tests (PGlite for database tests, fakes for model calls).

**Enforcement:**

- `scripts/hooks/pre-commit` runs `pnpm verify` at commit creation (authoritative) and blocks
  direct commits to `main` after the first commit. Installed by `pnpm install` (`prepare` sets
  `core.hooksPath scripts/hooks`).
- Claude Code `Stop` hook (`.claude/hooks/verify-on-stop.mjs`) runs it at turn end (backstop).
- Claude Code `PostToolUse` hook (`.claude/hooks/format-edited.mjs`) formats edited files.
- GitHub Actions (`.github/workflows/verify.yml`) runs it on every push to `main` and every PR,
  followed by `pnpm build` (the real Next.js build), because the fast gate cannot see bundler
  module resolution.

### Separate steps (never in the fast gate)

- **Test-strength (factor 14):** Stryker with the Vitest runner, `pnpm test:mutation`,
  incremental. Runs in `/work` Phase 5b on changed files, and as the `mutation` CI job on every
  PR. Break threshold 60% (high 80, low 70) on mutated engine and adapter code.
- **Performance (factor 17):** the four benchmarks in adr-001, each built by the first ticket that
  creates its surface, as a script under `bench/` with its threshold failing the run (non-zero
  exit). Run pre-merge for tickets that touch the surface. Profiling on a breach: Chrome DevTools
  performance panel for pages, `node --cpu-prof` for server code, the gateway's per-call usage log
  for cost.

### Runtime harness (factor 16): deferred to the first behavioural ticket

The real system is the web app running locally (`next dev` or `next start`) driven by
**Playwright** in a real browser, asserting on rendered DOM and network, never component internals.
It is **not built at setup**. The first ticket whose claim is about the running system (Stage A
week 1: link → questions → report) builds it under `e2e/` with its two proofs: `--negative-control`
(a planted fault turns the run red) and `--twice` (two runs, same result).

Interlocks the harness must carry: model calls in harness runs use a cheap pinned model with a
hard per-run call cap and spend cap; the harness never targets the Neon database (PGlite or a
throwaway database only); it never sends real customer data (D7).

Until it exists, the fallback is a scripted runbook: each step writes its output to a file and
diffs it against a committed expected output; the ticket's Evidence cites the run.

## Consequences

- Every commit on every branch is green; `main` changes only through PRs with green CI.
- A missing or disabled hook fails the gate itself.
- Mutation and benchmarks cost CI minutes on PRs, not developer seconds on every commit.

## Alternatives considered

- **husky + lint-staged:** an extra dependency for what a committed hook script and
  `core.hooksPath` already do.
- **Mutation testing in the commit gate:** too slow; it would get bypassed.
- **Building the Playwright harness at setup:** there is no behaviour to drive yet; a harness with
  nothing to assert proves nothing.
