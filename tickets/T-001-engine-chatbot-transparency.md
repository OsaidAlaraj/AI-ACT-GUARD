# T-001: Engine — chatbot transparency and AI literacy, end to end without UI

**Type:** Component · **Phase:** Stage A w1 · **Depends on:** none · **ADR:** creates adr-004 (cites adr-001)

| Started    | Completed |
| ---------- | --------- |
| 2026-11-14 | parked 2026-11-14 |

## Goal

No direct user effect yet — the engine can run a whole chatbot assessment from facts to a result,
choosing each next question itself and citing only the legal knowledge base. The UI ticket and the
website-reading ticket that follow build on it. First slice of requirements D13, D14 and D15 for
scenario 1 (chatbot / transparency, D3).

Legal scope here: **role** (D13 step 3), **transparency** (Art. 50(1)–(4), step 6), **AI literacy**
(Art. 4, step 7). Steps 2 (prohibited), 4 (high-risk) and 5 (exemption) are **not assessed** in this
ticket and the result marks them `status: "not-assessed"` — never a verdict. Escalation arrives with
the rulebook ticket.

## Acceptance criteria

- **C1** — The knowledge base (version `2026.11`) resolves these provision ids, each with title,
  text, `binding`, `sourceUrl`, and `appliesFrom` where it has one (the date the obligation applies, not the
  date its wording last changed; `AIA-Art4` is `2025-02-02`): verbatim law (`binding: true`)
  `AIA-Art3-1`, `AIA-Art3-3`, `AIA-Art3-4`, `AIA-Art4`, `AIA-Art50-1` … `AIA-Art50-5`,
  `AIA-Art111-4`, `AIA-Art113`; guidance summaries (`binding: false`) `EC-G50-2026` (Article 50
  guidelines C(2026) 5054) and `EC-AILQA-2026` (AI literacy Q&A). Unknown ids return `undefined`.
  · oracle: `packages/engine/src/knowledge/knowledge.test.ts`
- **C2** — The first question of every assessment is `usesAi` (is it an AI system, Art. 3(1)); the
  role follows only when it can change a result. · oracle: `packages/engine/src/assessment.test.ts`
  "asks whether the tool uses AI first"
- **C3** — Every question the engine asks can change the result: for every question asked in every
  scenario of `SCENARIOS` (`packages/engine/src/scenarios.ts`), at least one other answer to it,
  with the rest of the script unchanged, gives a different result. "Different" means a different
  verdict, applies-from date or set of missing facts for at least one rule; reason wording does not
  count. The engine asks exactly the facts listed for each scenario, in `FACTS` order; and on
  **every possible answer path** each question asked could change the result, is asked in `FACTS`
  order and never twice. · oracle: `assessment.test.ts` "asks exactly the scenario's facts",
  "every question asked can change the result, in every scenario", "on every possible answer path"
- **C4** — For every scenario in the table below, the result's verdicts and applies-from dates equal
  the expected values. · oracle: `packages/engine/src/rules.test.ts` "scenario table"
- **C5** — An "I don't know" answer gives "can't tell yet" on every verdict that needs it, and the
  verdict's `missingFacts` names that fact (scenarios S8, S9, S13). · oracle: `rules.test.ts` (S8, S9, S13 rows)
- **C6** — Every provision id any rule cites resolves in the knowledge base; the set is derived from
  the rule definitions (`RULES`), not typed by hand. · oracle: `rules.test.ts` "every citable
  provision resolves"
- **C7** — No question, option label, reason or vendor question in `FACTS` / `RULES` output contains
  banned wording (`findBannedWording`), checked over every fact's text, every scenario's result and every reason on every answer path.
  · oracle: `rules.test.ts` "no banned wording in any output text", `assessment.test.ts`
  "produces no banned wording on any answer path"
- **C8** — `runScripted(script)` runs an assessment end to end from answers keyed by fact id,
  records every question asked in order, throws on an unscripted question, and two runs of the same
  script give deep-equal output. · oracle: `packages/engine/src/runner.test.ts`
- **C9** — Steps `prohibited`, `high-risk`, `exemption` appear in every result with
  `status: "not-assessed"` and no verdict, and `role`, `transparency`, `literacy` with
  `status: "assessed"`. · oracle: `assessment.test.ts` "marks unassessed steps, never judges them"

### Scenario table (C4) — `packages/engine/src/scenarios.ts`

Verdicts: A = applies · N = doesn't apply · ? = can't tell yet. Columns are rule ids. Dates are
applies-from. Facts not listed are not asked in that scenario.

| id | Facts asked, in order | 50-1 | 50-2 | 50-3 | 50-4a | 50-4b | Art4 |
|---|---|---|---|---|---|---|---|
| S1 Vendor chatbot, deployer | usesAi=yes, role=deployer, emotionOrBiometric=no, deepfake=no, publicInterestText=no | N | N | N | N | N | A 2025-02-02 |
| S2 Chatbot product offered to other businesses, provider | usesAi=yes, role=provider, interaction=public-direct, writesOwnText=generates, onMarketBeforeAug2026=no | A 2026-08-02 | A 2026-08-02 | N | N | N | A 2025-02-02 |
| S3 Internal bot, obviously AI | usesAi=yes, role=both, interaction=staff-direct, aiObvious=yes, writesOwnText=generates, onMarketBeforeAug2026=no, emotionOrBiometric=no, deepfake=no, publicInterestText=no | N | A 2026-08-02 | N | N | N | A 2025-02-02 |
| S4 Drafting assistant, staff review | usesAi=yes, role=both, interaction=staff-assist-reviewed, writesOwnText=generates, onMarketBeforeAug2026=no, emotionOrBiometric=no, deepfake=no, publicInterestText=no | N | A 2026-08-02 | N | N | N | A 2025-02-02 |
| S5 Fixed rules, no AI | usesAi=no | N | N | N | N | N | N |
| S6 Emotion recognition, deployer | usesAi=yes, role=deployer, emotionOrBiometric=yes, deepfake=no, publicInterestText=no | N | N | A 2026-08-02 | N | N | A 2025-02-02 |
| S7 Public-interest text, no editorial control | usesAi=yes, role=deployer, emotionOrBiometric=no, deepfake=no, publicInterestText=yes, humanEditorialControl=no | N | N | N | N | A 2026-08-02 | A 2025-02-02 |
| S7b Public-interest text, editorial control | usesAi=yes, role=deployer, emotionOrBiometric=no, deepfake=no, publicInterestText=yes, humanEditorialControl=yes | N | N | N | N | N | A 2025-02-02 |
| S8 Role unknown | usesAi=yes, role=unknown, interaction=public-direct, writesOwnText=generates, emotionOrBiometric=no, deepfake=no, publicInterestText=no | ? (missing role) | ? (missing role) | N | N | N | A 2025-02-02 |
| S9 Interaction unknown | usesAi=yes, role=provider, interaction=unknown, writesOwnText=selects-only | ? (missing interaction) | N | N | N | N | A 2025-02-02 |
| S10 Generator already on the market | usesAi=yes, role=provider, interaction=public-direct, writesOwnText=generates, onMarketBeforeAug2026=yes | A 2026-08-02 | A 2026-12-02 | N | N | N | A 2025-02-02 |
| S11 Deepfakes, deployer | usesAi=yes, role=deployer, emotionOrBiometric=no, deepfake=yes, publicInterestText=no | N | N | N | A 2026-08-02 | N | A 2025-02-02 |
| S12 Text polishing only, provider | usesAi=yes, role=provider, interaction=public-direct, writesOwnText=assistive-editing | A 2026-08-02 | N | N | N | N | A 2025-02-02 |
| S13 Generator, market-entry date unknown | usesAi=yes, role=provider, interaction=public-direct, writesOwnText=generates, onMarketBeforeAug2026=unknown | A 2026-08-02 | A (missing onMarketBeforeAug2026) | N | N | N | A 2025-02-02 |

_Generated from `scenarios.ts`; regenerate rather than edit by hand._

Art. 4 applies from 2 Feb 2025 (Art. 113(a), Chapter I); its current wording, as replaced by
Reg. (EU) 2026/1744, applies from 27 Jul 2026 — both dates are in the verdict.

**Done when:** every oracle is green with its command + output in Evidence; `pnpm verify` green;
mutation score on changed files ≥ 60%; every reviewer verdict recorded (adr-003). No runtime-harness
run: no running-app behaviour changes.

## Research

- **Law** — `novel — validated via` Reg. (EU) 2024/1689, http://data.europa.eu/eli/reg/2024/1689/oj ,
  and Digital Omnibus Reg. (EU) 2026/1744 of 8 Jul 2026, OJ L 24.7.2026,
  http://data.europa.eu/eli/reg/2026/1744/oj (both read in full via the Publications Office Cellar
  copy, https://publications.europa.eu/resource/celex/32024R1689 and …/32026R1744, because EUR-Lex
  would not render and the ELI identifiers redirected to the Official Journal landing page on
  2026-11-14; the knowledge base keeps the ELI as the official source identifier; cross-checked against the non-binding AI Act Service Desk consolidation as at
  27 Jul 2026). Findings, by knowledge-base id:
  - `AIA-Art50-1` … `AIA-Art50-5`: unchanged by the Omnibus (only para. 7 replaced). Apply from
    2 Aug 2026 (`AIA-Art113`, second paragraph).
  - `AIA-Art111-4`: providers of generating systems placed on the market before 2 Aug 2026 comply
    with Art. 50(2) by 2 Dec 2026.
  - `AIA-Art4`: replaced in full by Omnibus Art. 1(5) ("take measures to support the development
    of AI literacy … does not require … to guarantee any specific level"); in force 27 Jul 2026
    (Omnibus Art. 4: third day after publication on 24 Jul 2026). Chapter I applies from
    2 Feb 2025 (`AIA-Art113`, point (a)).
  - `AIA-Art3-1`, `AIA-Art3-3`, `AIA-Art3-4`: unchanged.
- **Guidance** — `novel — validated via`
  https://ai-act-service-desk.ec.europa.eu/sites/default/files/2026-07/guidelines_on_the_implementation_of_the_transparency_obligations_for_certain_ai_systems_under_article_50_of_the_ai_act_bzptwqhk0ikg1dtlddap41psfy_131215.pdf
  (`EC-G50-2026`, C(2026) 5054 final, 20 Jul 2026, non-binding): para. 30 four cumulative
  conditions (AI system · intended to interact · directly · with natural persons), rule-based quick
  replies and staff-assist tools whose outputs staff review and send are out of scope; para. 45 the
  "obvious" exception is read restrictively and "cannot be relied upon" where the system may be
  accessed by the general public or by consumers that include vulnerable persons; paras 6, 13: 50(1)–(2) bind providers, 50(3)–(4) deployers; paras 10–11 (and the unnumbered example
  after para. 11) and 15: developing it
  (or having it developed), or modifying another provider's system ("e.g. with new training data")
  and putting it into service under your own name, makes you the provider, and one company can be
  both provider and deployer; para. 90: the 50(2) assistive-editing exception covers edits that do
  not generate new content; the 50(4) text exception needs real human review or editorial control
  ("superficial, solely formal or procedural checks" do not count, para. 135; the section 6.2.3
  examples box gives "a mere superficial, grammatical check") and someone holding editorial
  responsibility (para. 138); emotion recognition and biometric categorisation are defined by biometric data
  (Art. 3(39)–(40)); para. 153: interactive disclosure from 2 Aug 2026, only 50(2) gets the 2 Dec 2026
  transition. — `novel — validated via` https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers
  (`EC-AILQA-2026`, updated 20 Oct 2026, non-binding): Art. 4 still binds providers and deployers;
  no set level, no measurement duty, no certificate. Its "mid-July 2026" entry-into-force wording
  conflicts with the Official Journal (27 Jul 2026); the knowledge base follows the Official Journal.
- **Engine surface** — `proven — matches packages/engine/src/ports.ts:47-51` (`LegalKnowledgePort`),
  `packages/engine/src/legal-test.ts:4` (`LEGAL_TEST_STEPS`), `legal-test.ts:18` (`StepVerdict`).

## Technical Plan

All in `packages/engine` (pure; adr-001 boundary unchanged). Design recorded in adr-004.

- **`src/knowledge/aia-2026-11.ts`** — the C1 provisions as `Provision` records (verbatim law text
  from the Research sources; guidance as short summaries with paragraph references), and
  **`src/knowledge/in-memory.ts`** — `createInMemoryKnowledge(provisions, version)` implementing
  `LegalKnowledgePort`. Tag: `proven — matches packages/engine/src/ports.ts:47-51`.
- **`src/facts.ts`** — `FACTS`, ordered by step then question order. Each fact: `id`, `step`
  (a `LegalTestStep`), `question`, `why`, `options` (`{ value, label }`, always including
  `unknown` = "I don't know"). Facts and options:
  - `usesAi` (step `start`, asked first): `yes` "Yes, it uses AI or machine learning to work out its
    replies" · `no` "No, it only follows fixed rules a person wrote" · `unknown`. (Art. 3(1): a
    system that infers how to generate outputs; a bot that uses machine learning to pick a fixed
    answer is still an AI system.)
  - `role` (step `role`): `provider` "We developed it (or had it developed), or substantially
    changed someone else's (e.g. retrained it), and offer it to other organisations; we do not run
    it ourselves" · `deployer` "We use a tool someone else developed, without substantially
    changing it" · `both` "We developed it (or had it developed or substantially changed), and we
    also run it ourselves, e.g. on our own website" · `unknown`. Running your own system makes you
    its deployer too (Art. 3(4); guidelines para. 15). Renaming or rebranding alone does not make a
    business the provider outside high-risk systems (Art. 3(3); Art. 25 is limited to high-risk).
  - `interaction`: `public-direct` "The public or customers talk to it directly" · `staff-direct`
    "Only our staff talk to it directly" · `staff-assist-reviewed` "It drafts replies that our
    staff review and send" · `unknown`.
  - `aiObvious`: `yes` / `no` / `unknown` — "Would your staff obviously know they are talking to an
    AI?"
  - `writesOwnText`: `generates` "It writes new text (or audio, images or video) itself" ·
    `selects-only` "It only picks from answers people wrote" · `assistive-editing` "It only
    polishes or corrects text the user wrote, without adding new content" · `unknown`.
  - `onMarketBeforeAug2026`: `yes` / `no` / `unknown` — placed on the market or put into service
    before 2 Aug 2026.
  - `emotionOrBiometric`: `yes` / `no` / `unknown` — works out people's emotions or intentions, or
    sorts people into categories, from biometric data such as their face or voice (not from typed
    text alone).
  - `deepfake`: `yes` / `no` / `unknown` — creates or changes images, audio or video so that real
    people, objects, places or events appear authentic when they are not.
  - `publicInterestText`: `yes` / `no` / `unknown` — publishes AI text to inform the public on
    matters of public interest.
  - `humanEditorialControl`: `yes` "Both: a person reviews it properly before publication, and a
    named person or organisation takes editorial responsibility" · `no` "No, or only a quick
    surface check" · `unknown`.
  Tag: `novel — validated via` `EC-G50-2026` paras 10–11, 15, 30, 45, 90, 135, 138 and
  `AIA-Art3-1`.
- **`src/rules.ts`** — `RULES`, one per obligation, each `{ id, step, provisionIds, addressees,
  evaluate(facts) }` returning `{ verdict: StepVerdict, reason, missingFacts, appliesFrom?,
  vendorQuestion? }`:
  - `50-1` — addressees provider. `does-not-apply` if `usesAi=no`, `interaction=staff-assist-reviewed`,
    or `interaction=staff-direct ∧ aiObvious=yes`; `does-not-apply` ("your provider's duty", with a
    vendor question) if `role=deployer`; `applies` from 2026-08-02 if `role ∈ {provider, both}` ∧
    `usesAi=yes` ∧ (`interaction=public-direct` ∨ `interaction=staff-direct ∧ aiObvious=no`);
    otherwise `cannot-tell` naming the missing facts. Cites `AIA-Art50-1`, `AIA-Art50-5`,
    `AIA-Art3-1`, `EC-G50-2026`.
  - `50-2` — addressees provider. `does-not-apply` if `usesAi=no`, `writesOwnText=selects-only`,
    `writesOwnText=assistive-editing` (the assistive-function exception), or `role=deployer`;
    `applies` if `role ∈ {provider, both}` ∧ `usesAi=yes` ∧ `writesOwnText=generates`; `appliesFrom`
    2026-12-02 when `onMarketBeforeAug2026=yes`, 2026-08-02 when `no`, and no date with
    `missingFacts: ["onMarketBeforeAug2026"]` when `unknown`; cites `AIA-Art50-2`,
    `AIA-Art111-4`, `EC-G50-2026`.
  - `50-3` — addressees deployer. `applies` from 2026-08-02 if `role ∈ {deployer, both}` ∧
    `usesAi=yes` ∧ `emotionOrBiometric=yes`; cites `AIA-Art50-3`, `AIA-Art50-5`.
  - `50-4a` — addressees deployer; `deepfake=yes`; cites `AIA-Art50-4`, `AIA-Art50-5`.
  - `50-4b` — addressees deployer; checks `publicInterestText` first (`no` → does not apply), then
    the exception: `humanEditorialControl=no` applies, `yes` does not; cites `AIA-Art50-4`, `AIA-Art50-5`.
  - `Art4` — addressees provider and deployer: `applies` if `usesAi=yes` (any role, including
    `unknown`, since both roles are bound); `does-not-apply` if `usesAi=no`, worded as "not for this
    tool" (other AI the business uses may still bring Art. 4 in); `appliesFrom` 2025-02-02 with
    `currentTextFrom` 2026-07-27; cites `AIA-Art4`, `AIA-Art113`, `AIA-Art3-1`, `EC-AILQA-2026`.
  For a deployer-only or provider-only rule where `role` excludes the addressee, the reason names
  whose duty it is. Tag: `novel — validated via` http://data.europa.eu/eli/reg/2024/1689/oj ,
  http://data.europa.eu/eli/reg/2026/1744/oj , `EC-G50-2026`.
- **`src/assessment.ts`** — `nextStep(answers)` → `{ kind: "question", fact }` or
  `{ kind: "result", result }`. **Relevance is derived, not hand-written:** an unanswered fact is
  relevant iff evaluating `RULES` with each of its option values (the rest unchanged) gives at
  least two different results, compared on each rule's verdict, applies-from date and missing
  facts (not reason text). The next question is the first relevant unanswered fact in `FACTS`
  order, with no forced question: `usesAi` is first because it is first in `FACTS` and always relevant
  at the start. `result` = `{ legalContentVersion, steps, obligations }`;
  `steps` lists every `LEGAL_TEST_STEPS` entry, `prohibited` / `high-risk` / `exemption` as
  `{ status: "not-assessed" }`, the others `{ status: "assessed" }` with their obligations.
  `StepVerdict` is unchanged. Tag: `novel — driven via` the C2/C3/C9 tests (output in Evidence).
- **`src/scenarios.ts`** — `SCENARIOS`: the table above as data (script + expected verdicts and
  dates), shared by the C3, C4, C5, C7 and C8 tests.
- **`src/runner.ts`** — `runScripted(script)` loops `nextStep`, answering from `script[fact.id]`,
  throwing `UnscriptedQuestionError` if a fact is missing; returns `{ questionsAsked, result }`.
  Tag: `novel — driven via` C8 test.
- **`src/index.ts`** — export the new public API.

## Blast radius

- **Signature change:** none to existing exports; new exports only. `StepVerdict` unchanged.
- **Port change:** none.
- **Architecture:** engine stays pure; `pnpm arch` stays green.
- **Irreversible sink:** none — no model call, database or network.
- **Untrusted input:** none yet (answers come from tests; website text arrives later).
- **Legal content:** provisions in C1; dates 2025-02-02, 2026-07-27, 2026-08-02, 2026-12-02; banned
  wording checked by C7. Rule-based bots and staff-assist tools are out of Art. 50(1) per guidance,
  which is non-binding: reasons say "under the Commission's guidelines".

## Verification (specify-first)

- Red oracles: the C1–C9 test files, written first; red output recorded in Evidence before any
  implementation.
- Commands: `pnpm exec vitest run packages/engine`, `pnpm verify`,
  `pnpm exec stryker run --mutate "packages/engine/src/**/*.ts"`.

## Evidence

**Red oracles, before any implementation (2026-11-14, after the pivot, against typed stubs that
throw "not implemented"):**

```
$ pnpm exec vitest run packages/engine | grep -E "Error: not implemented|Test Files|Tests " | sort | uniq -c
     14 Error: not implemented
      1 ⎯⎯⎯⎯⎯⎯ Failed Tests 29 ⎯⎯⎯⎯⎯⎯⎯
      1  Test Files  4 failed | 1 passed (5)
      1       Tests  29 failed | 9 passed (38)
```

Every C1–C9 oracle fails on the stubs; typecheck is clean (`pnpm --filter @aag/engine typecheck`
prints no errors), so each red is the assertion itself, not a missing module.

## Decisions

- Approach pass (Osaid, 2026-11-14): **engine first, no UI**; **the engine decides the next step**.
  Rejected: AI-driven conversation (harder to keep verdicts stable and in D13 order); streaming
  first (complexity before the core exists). Recorded as adr-004.
- Relevance derived from the rules instead of hand-written predicates (planner gap 4/C3): it makes
  "ask only what changes the answer" true by construction and testable as a property.
- "Not assessed" is a step status, not a fourth verdict (planner gap 3).
- Art. 50(1) for a deployer: "Doesn't apply to you — it is your provider's duty", plus a vendor
  question, because the paragraph is addressed to providers only.

- **Adversary (pre-execution, 2026-11-14): `BREAKS (plan)`.** "Role always first" contradicted
  C3: with `usesAi=no` the role cannot change any result (S5; 36 of 6994 answer paths). Also found:
  S2 told a firm running its own chatbot that deployer duties were not its own; the knowledge base
  dated `AIA-Art4` from its 2026 wording instead of 2 Feb 2025; `onMarketBeforeAug2026=unknown` had
  no defined verdict or oracle. It could not break: relevance asking exactly the table's facts, order
  across all paths, determinism, citations, banned wording.
- **Pivot (Osaid, 2026-11-14, the one retry):** `usesAi` first, no forced question; role labels
  separate "offer it to others" from "also run it ourselves"; `AIA-Art4` dated 2025-02-02; S13
  added for an unknown market-entry date; oracles strengthened (exhaustive answer-path walk for C3
  and C7, assessed steps in C9, guidance text in C1). Rejected: role first with a C3 exception
  (weakens the rule); fully free order (no change needed beyond this).
- Fact-check (pre-execution, 2026-11-14): 21 OK, 3 WRONG, 2 UNVERIFIED. Fixed: para. 45 wording
  restored to the guideline's "general public or consumers that include vulnerable persons";
  editorial-control citations moved to paras 135, 138 and the section 6.2.3 examples; ELI links
  noted as unreachable at fetch time (content verified via Cellar). UNVERIFIED items: scenario facts
  in `FACTS` order (proven by the C3 "asks exactly the scenario's facts" test once implemented);
  Art. 50(5) has no addressee, which the ticket does not claim.
- Legal review (pre-execution, 2026-11-14) — 6 load-bearing findings, all verified against the
  guidelines text and folded in: a bot that writes its own replies generates text, so Art. 50(2)
  applies (S3, S4 re-expected; new `writesOwnText` fact with the para. 90 assistive-editing
  exception; S12 added); wrong guideline paragraph numbers (248, 259–262 do not exist; role text is
  paras 10–11, 15); rebranding alone is not "provider"; "uses AI" follows Art. 3(1) inference, not
  fixed vs free replies; emotion recognition needs biometric data; the 50(4) text exception needs
  both real review and editorial responsibility. Polish: deepfake and on-market labels widened.

- **Adversary round 2 (2026-11-14): `BREAKS (plan)` again → ticket PARKED** (plan-break protocol: a
  second broken design parks the ticket; no third attempt in this ticket).
  - **Counterexample 2 (C3):** the plan turned 43 of 44 oracles green; the exhaustive answer-path C3
    oracle failed on 16 of 3697 paths, all on `role`, e.g.
    `{"usesAi":"yes","role":"both","interaction":"staff-direct","aiObvious":"yes","writesOwnText":"selects-only","emotionOrBiometric":"no","deepfake":"no","publicInterestText":"no"}`:
    `role` was relevant when asked (second), then later answers made every rule role-neutral.
  - **Counterexample 1 (round 1):** `{"usesAi":"no"}` with role forced first (S5; 36 of 6994 paths).
  - **The problem, understood:** "every question asked can change the FINAL result" is not
    achievable by any adaptive questionnaire in general: a question relevant when asked can be made
    moot by later answers. Both rounds hit the same class. The achievable property is "relevant at
    the time it is asked", which derived relevance guarantees by construction.
  - **Legal error found in round 2:** `onMarketBeforeAug2026` said "placed on the market or put into
    service"; binding Art. 111(4) (Omnibus, OJ 2026/1744) says only "placed on the market", so an
    in-house tool was given 2026-12-02 instead of 2026-08-02. Guideline para. 153 is wider than the
    law; the law wins (as for Art. 4). Fix in the follow-up ticket.
  - **What survives and carries over:** everything else held across both rounds: relevance asks
    exactly each scenario's facts; order and no repeats on all paths; determinism; citations (C6
    fires on a fake id); banned wording on all paths; the legal conditions of 50-1, 50-2, 50-3,
    50-4a, 50-4b and Art4; the dates. The adversary's reference implementation is in its round-2
    report; its knowledge-base generator is kept in the session scratchpad (`genkb.mjs`).

## Outcome

**Parked, then superseded by T-002 (2026-11-14).** Not built here. Osaid chose "relevant when
asked" for C3; T-002 carries the surviving plan and the Art. 111(4) fix.


_(filled at close)_
