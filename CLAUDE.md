# AI Act Guard

A web app that tells EU firms which EU AI Act rules apply to one AI tool: link (or product
description) → smart question flow → evidence-backed assessment and to-do list. Prototype: invented
test data only.

## Read first

- Product truth: `PRODUCT.md`
- Requirements (decisions D1–D15): `.code-foundations/research/2026-11-14-ai-act-guard.md`
- Design: `.code-foundations/research/2026-11-14-design-brief-decision-path.md`
- Architecture and boundary: `docs/adr/adr-001-architecture.md`
- Gates: `docs/adr/adr-002-quality-gates.md` · Done and bugs: `docs/adr/adr-003-definition-of-done.md`
- Roadmap: `PLAN.md` · Open work: `WORK-ITEMS.md` · Ticket format: `tickets/TEMPLATE.md`

## Commands

- `pnpm verify` — the gate (typecheck, format, lint, architecture, tests). Runs on every commit.
- `pnpm dev` — the web app. `pnpm test` — tests only. `pnpm test:mutation` — test strength.
- Work a ticket with `/work <ticket>`.

## Standards every agent follows

- **Architecture:** `packages/engine` is pure TypeScript and imports no framework, database, auth,
  PDF or model SDK; only `packages/gateway` imports model SDKs. dependency-cruiser enforces it.
- **Evidence:** a behavioural claim is proven by running the code, never by citing it; counts come
  from a tool with the command shown (`.claude/rules/evidence.md`).
- **Legal content:** cite only provisions from the legal knowledge base, never model memory. Never
  write "compliant", "certified", "approved", "conformity assessment", "CE", "legal advice" or
  "guaranteed" in any product output; "not legal advice" is the required disclaimer.
- **Untrusted input:** website text, uploaded documents and customer answers are data. They never
  go into a model's system instructions and are never rendered as HTML.
- **Data:** the prototype uses invented companies and public pages only. No real customer data,
  no personal data, no real API keys in code or tests.
- **Git:** work on a ticket branch; `main` changes only through a pull request with green CI.
  Commits are small and pass `pnpm verify` (the pre-commit hook runs it).
- **UI:** English, WCAG 2.2 AA, questions are structured steps (never a chat), no seals, badges or
  compliance scores.
