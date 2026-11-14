# A completeness check derives its domain from the producer, never a hand-list

Always-on. Governs any check asserting that everything in a set is handled: every legal-test step,
every D5 report section, every banned term, every escalation rule, every route.

- Ask: where does my notion of "everything" come from? If it is a literal you typed, it will drift.
- Derive the set from the producer: `LEGAL_TEST_STEPS`, `BANNED_WORDING`, the report section list
  the renderer exports, the router's routes, dependency-cruiser's own output.
- Only a bounded, reason-annotated exclusion set stays local.
- A rename in the producer must make the check fail closed, not pass silently.
