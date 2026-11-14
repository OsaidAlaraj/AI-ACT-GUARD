---
paths:
  - "packages/engine/**"
  - "packages/gateway/**"
  - "apps/web/src/app/**/route.ts"
  - "apps/web/src/app/**/actions.ts"
  - "apps/web/src/server/**"
---

# Untrusted input (prompt injection, XSS, SSRF)

Untrusted: text fetched from customer websites, uploaded documents, customer answers, anything a
model returns.

- Never place untrusted text in a model's `system` instructions. Put it in `prompt`, inside
  clearly marked data delimiters, with an instruction that it is data to analyse, not instructions.
- Validate every model response against its JSON Schema before use; an invalid response is an
  error, not a best guess.
- Render untrusted text as text (React escaping); never `dangerouslySetInnerHTML`.
- Website fetching: http(s) only, block private and link-local addresses, size and time limits, no
  following redirects into private ranges.
- Uploaded documents: type and size limits, parsed server-side, never executed.
- Expert routes and actions check the Better Auth session server-side.
