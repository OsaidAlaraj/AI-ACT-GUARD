# packages/db — the database adapter

**Responsibility:** Drizzle schema and migrations for PostgreSQL (Neon, EU Frankfurt, in
development; PGlite in tests), and implementations of the engine's storage ports: assessments,
expert cases, test runs, corrections, the versioned legal knowledge base.

**Belongs here:** tables, migrations, queries, port implementations. **Does not:** verdict logic,
HTTP, auth sessions (Better Auth owns its own tables, wired in `apps/web`).

**Change warnings:**

- Tests use `createTestDb()` from `@aag/db/testing` (real PostgreSQL in-process). Never point a test
  at `DATABASE_URL`.
- Every schema change ships with its migration (`drizzle-kit generate`) and a schema snapshot test.
- Legal knowledge base rows are versioned; never edit a published version in place, add a new one.
- A migration against Neon is an irreversible sink: name it in the ticket's Blast radius.
