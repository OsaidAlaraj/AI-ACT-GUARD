---
paths:
  - "packages/engine/**"
  - "apps/web/**"
---

# Legal wording and citations

- Never write "compliant", "certified", "approved", "conformity assessment", "CE", "legal advice"
  or "guaranteed" in product output. "not legal advice" is the required disclaimer.
  `findBannedWording()` is the check; run it on generated text before showing it.
- Every result is labelled "indicative assessment, not legal advice" and as AI-generated (Art. 50).
- Cite only provisions from the legal knowledge base, by id, with the legal-content version. A
  citation that does not resolve is an error, never a fallback to model memory.
- Verdicts are only Applies / Doesn't apply / Can't tell yet, each with its reason and source. No
  compliance score anywhere.
- Label each source binding or guidance. Dates follow the post-Omnibus timeline in the
  requirements (Annex III from 2 Dec 2027; Art. 50 since 2 Aug 2026).
