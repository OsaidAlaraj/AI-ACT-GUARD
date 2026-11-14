---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "e2e/**"
---

# Testing rules

- Specify first: write the test from the acceptance criterion and confirm it is **red** before
  implementing. A test never seen to fail proves nothing.
- Every test must fail when the code it covers is reverted (`pnpm test:mutation` checks this).
- Test the invariant, not a case list: e.g. "every banned term is flagged" iterates
  `BANNED_WORDING`, never a re-typed list.
- Deterministic: no wall clock, no randomness, no network. Inject time and ids through ports.
- Database tests use `createTestDb()` (PGlite). Never `DATABASE_URL`.
- Model calls in unit tests use a fake `ModelPort`. Real provider calls only in `e2e/` with caps.
- A cross-cutting change gets a default-settings fixture, so the default path is tested.
- A guard on an irreversible operation is tested in both directions, with a witness.
- Test data is invented: fictional companies, public product pages, no personal data.
