# ADR-004: The engine decides the next question; relevance is derived from the rules

**Status:** Accepted · **Date:** 2026-11-14

## Context

Requirements D14 asks for questions "generated on the fly" that only ask what can change a verdict,
and D13.4 requires the same facts to give the same result. An AI model could lead the conversation,
but then the order of the legal test, the stopping point and the stability of verdicts would depend
on model behaviour. Every scenario after the chatbot (hiring, later Annex III areas) will reuse
whatever shape the first one sets.

## Decision

The engine (`packages/engine`) owns the flow:

- **Facts** (`FACTS`): a catalogue of the facts a scenario can need, each with its legal-test step,
  question, "why we ask" line and fixed options, always including "I don't know".
- **Rules** (`RULES`): one per obligation, each citing knowledge-base provision ids and evaluating
  facts to a verdict (`applies` / `does-not-apply` / `cannot-tell`), a reason, missing facts and an
  applies-from date.
- **Next step** (`nextStep`): an unanswered fact is relevant if and only if trying each of its
  options against `RULES` gives at least two different results, compared on each rule's verdict,
  applies-from date and missing facts (reason wording does not count). The next question is the first
  relevant fact in catalogue order. With no relevant fact left, the engine returns the result.
- Steps a scenario does not assess are marked `status: "not-assessed"`, never given a verdict.
- The AI model has two jobs, added in later tickets: phrasing a question for the customer's context
  and reading websites and documents into fact hints the customer confirms. It never picks the next
  fact and never decides a verdict.

## Consequences

- "Ask only what changes the answer" holds by construction and is tested as a property over every
  scenario.
- Verdicts are deterministic for the same facts; the 3-run stability check (D13.4) then only covers
  the model's fact extraction, not the rules.
- Adding a scenario means adding facts and rules; the flow, relevance and runner are reused.
- Relevance costs one rule evaluation per option per unanswered fact per step: trivial at tens of
  facts; revisit if a scenario grows to hundreds.
- **Invariants:** a question is never asked unless, given the answers so far, an answer could change a result
  (a later answer may still make it moot; no adaptive questionnaire can rule that out); rules cite only
  knowledge-base ids; no rule reads a clock or a model.

## Alternatives considered

- **Model-led conversation:** flexible, but order, stopping and stability depend on the model.
  Rejected (Osaid, approach pass).
- **Hand-written relevance predicates per fact:** simple to start, but drifts from the rules as they
  change and can ask pointless questions without anyone noticing.
- **A static questionnaire:** predictable, but asks questions that cannot matter, against D14.
