# Roadmap

Source of truth for scope: `.code-foundations/research/2026-11-14-ai-act-guard.md` (requirements),
`PRODUCT.md`, and `.code-foundations/research/2026-11-14-design-brief-decision-path.md` (design).
Each phase ends with an exit audit ticket (`tickets/TEMPLATE-phase-audit.md`); the next phase starts
only after it closes.

## Stage A — Build (1 month, ~40 h/week)

Goal: the web app is able to do everything in the requirements, on test data only (D3, D7). No
accuracy targets.

| Week | Work |
|---|---|
| 1 | Link → website reading → smart question flow → report, end to end on the chatbot scenario (Art. 50, Art. 4). Builds the Playwright runtime harness (adr-002). First slice of the legal knowledge base. |
| 1–2 | Chatbot scenario complete: persona card, confirmation checkpoints, contradictions, decision path UI, report (screen + react-pdf). Expert dashboard: invite-only sign-in (Better Auth), AI-sorted queue, case view. |
| 3–4 | Hiring scenario (Annex III point 4): role fork, high-risk branch, Art. 6(3) exemption, duties per role. Escalation rulebook v1 (from Mike's list + disagreement + high-stakes rules). Model switching across Claude / GPT / Mistral. D15 test runner. Performance benchmarks. |
| end | **Stage A exit audit.** |

Done when (D3): legal knowledge base versioned; both scenarios run link → report; report has every
D5 section; expert dashboard works; model switch by configuration; test runner records results;
escalation rulebook v1 in place.

## Stage B — Evaluate (own deadline, to set)

~20 test cases (about 10 per scenario), reference answers by Nimród in the dashboard; run on all
three models; compare; pick one. Professor signs off the escalation rulebook. Pass criteria
proposed in D3 (to approve). **Stage B exit audit.**

## Phase 1 — The online tool

Real pilot firms. Move models to the EU routes with zero data retention (D7); move hosting to AWS,
Azure or GCP in an EU region (D12); customer accounts; Mike's 30-case hiring golden set.
**Phase 1 exit audit.**

## Later

Phase 2 — own engine learning from expert corrections. Phase 3 — the engine inside company
networks on their documents.
