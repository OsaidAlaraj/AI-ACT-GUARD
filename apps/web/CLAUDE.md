# apps/web — the Next.js app

**Responsibility:** the four screens from the design brief (start, smart question flow, report on
screen + PDF, expert dashboard), route handlers, expert sign-in (Better Auth, invite-only), PDF
generation (react-pdf), and wiring adapters (`@aag/gateway`, `@aag/db`) into the engine.

**Belongs here:** UI, routing, sessions, server actions that call the engine. **Does not:** verdict
rules or escalation logic (engine), model SDK calls (gateway), SQL (db).

**Change warnings:**

- Design source: `.code-foundations/research/2026-11-14-design-brief-decision-path.md`. Decision
  Path only: no metro or transport imagery or words, no chat bubbles, no seals, badges or scores.
- WCAG 2.2 AA; the decision path renders as an ordered list for screen readers.
- Text from customer websites, documents and answers is rendered as text, never as HTML.
- Expert routes require a session; customers have no accounts in the prototype.
- Secrets live in `.env.local` (from `.env.example`), never in code.
