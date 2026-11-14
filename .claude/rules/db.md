---
paths:
  - "packages/db/**"
---

# Database rules

- Every schema change ships its migration (`drizzle-kit generate`) and a schema snapshot test.
- Tests use `createTestDb()`; nothing in tests reads `DATABASE_URL`.
- Legal knowledge base: versions are append-only; publish a new version, never edit an old one.
- Store only invented test data in the prototype (D7).
- A migration or delete against Neon is an irreversible sink: name it and its guard in the ticket.
