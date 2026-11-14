# AI Act Guard — requirements

**Summary:** A web app that tells EU firms which EU AI Act rules apply to an AI tool, starting from a link and a short smart conversation, and gives them a plain, evidence-backed assessment and a to-do list.

**Date:** 2026-11-14 · **Status:** confirmed (grill and cold read done; remaining open items accepted as non-blocking)

**Design direction:** Decision Path, confirmed 2026-11-14 (`2026-11-14-design-brief-decision-path.md`); no metro or transport theme.

**What's still open:** Stage B deadline and criteria approval, rulebook sign-off, legal sources to track, overall timeline, funding. None block Stage A. See the last section.

---

## Context for a reader who wasn't there

- **Starting point:** greenfield. The project folder holds no code yet. Nothing on the Miro boards (architecture, gateway, flows) exists in code; those are plans.
- **Sources read:** Miro board "AI Act Guard: Roadmap and Requirements", Miro board "AI Act Guard: brainstorm", and `AI_Act_Guard_expanded_answers.docx` (Mike, 9 Nov 2026). None of these are in the repo. Everything this doc relies on from them is restated here.
- **People:**
  - **Osaid**: builds the product (engine, web app). Owner of this doc.
  - **Mike**: business and legal mapping, pilots, pricing.
  - **Nimród**: lawyer; validates legal mappings and writes reference answers.
  - **The Professor**: senior legal adviser; decides legal scope and owns the escalation rulebook.
- **Stack:** chosen in `PRODUCT.md` (Next.js + TypeScript, PostgreSQL); tooling details are settled in Greenfield setup.

### Phase map

| Name in this doc | Name on the roadmap board | What it is |
|---|---|---|
| **Stage A: Build** (1 month) | Phase 0: Prototype | Build the full proof-of-concept web app. Invented data only. |
| **Stage B: Evaluate** (own deadline) | Phase 0: Prototype | Write test cases, run all three models, compare, pick one. |
| **Phase 1** | The online tool phase | Real pilot firms, EU hosting, customer accounts. |
| Phase 2 | The engine phase | Own engine/model, learning from expert corrections. |
| Phase 3 | The enterprise phase | Runs inside a company's network on its documents. |

"The prototype" in this doc means Stage A + Stage B.

---

## Decisions

### D1. Two kinds of customer, one product
Both groups are in scope:
- **Deployers**: small and mid-sized firms that *use* an AI tool someone else built.
- **Providers**: AI companies (start-ups up to ~100 people) that *build* an AI product for the EU market.

Every assessment starts by working out the user's role (provider, deployer, or both). The role decides which obligations apply.

### D2. Input: link first, then a conversation; providers can add documents
- Everyone starts by pasting a link to the AI tool's public page, if one exists.
- **Deployers**: the vendor's page plus the conversation (D14) is usually enough.
- **Providers**: their pages are marketing, so they also get extra questions and can upload documents about the product (how it works, training data, who it's sold to).
- **Providers without a public page yet** (product not launched): can still be assessed. They skip the link and start by describing the product and/or uploading documents; the conversation then works the same way.

### D3. Stage A and Stage B
**Stage A, Build (1 month, ~40 h/week with AI coding support):** build the web app so it is *able* to do everything in this doc. No accuracy targets, no training or tuning.

Two scenarios:
1. **Chatbot / transparency**: Art. 50, plus Art. 4 AI literacy. Built first.
2. **Hiring (Annex III point 4)**: provider vs deployer, Art. 6(3) filter, obligations per role (Arts 9–15 summary, 16, 26, 27, 49), dates (Annex III applies from 2 Dec 2027). Built second.

Stage A is done when, on test data (D7):
- the legal knowledge base (D13) holds the prototype's articles and guidelines, versioned;
- a user can paste a link, go through the conversation (and upload documents as a provider), and download a report, for both scenarios;
- the report contains every section in D5;
- the expert dashboard works (D9);
- the model can be switched between Claude, GPT and Mistral by configuration;
- the tool can run a set of test cases (D15) automatically and record each result for comparison;
- a first version of the escalation rulebook (D13) is in place, built from Mike's list.

**Stage B, Evaluate (own deadline, to set):** ~20 test cases (about 10 per scenario). Reference answers written by Nimród in the dashboard. Run all cases on all three models, compare, and pick one model. The Professor signs off the escalation rulebook before Stage B results are used.

Stage B pass criteria (proposed from Mike's doc, scaled down; to approve):
- zero high-risk cases called "fine";
- risk level right in at least 18 of 20;
- every cited article real and correct, no invented sources;
- same input gives the same result over 3 runs (D13);
- a non-lawyer finishes an assessment in under 30 minutes;
- one model chosen and approved by Nimród.

**Then Phase 1:** Mike's full 30-case hiring golden set, and real pilot firms on the EU route (D7). Mike's "3 pilot firms complete an assessment, 2 would pay" is a Phase 1 criterion.

### D4. Language: English only
Screens and reports are in English. Legal citations point to the official EUR-Lex text. Websites and documents in other languages (e.g. Hungarian) are still read; only the output is English.

### D5. The report
Downloadable as a PDF. "Shareable" means the user can send the file; there are no share links in the prototype.

1. **Persona card**: the company and the tool (D14), with any unconfirmed facts marked.
2. **Your role**: provider / deployer / both, shown at the top; every duty below is labelled with its role.
3. **Verdicts**: risk level and each legal test, as **Applies / Doesn't apply / Can't tell yet, because X**, each with its confidence and reason. No single compliance score.
4. **What would change this**: for each verdict, the one fact that would flip it.
5. **Rules that apply**: article, plain-words meaning, applies-from date, binding or guidance.
6. **Your deadline timeline**: the user's duties on a timeline, using the post-Omnibus dates.
7. **What's missing**: evidence gaps, unconfirmed facts, "I don't know" answers, unresolved contradictions.
8. **Next steps**: prioritised tasks, each naming who, what artifact, by when, rough effort.
9. **Vendor questions** (deployers): a drafted list or email text the user can copy and send to the tool's vendor. The app does not send email.
10. **How we reached this**: the reasoning memo (D13).
11. **Small print**: "indicative assessment, not legal advice"; AI-generated (Art. 50); date; legal-content version; model used; the user's answers; data-handling note; "talk to an expert" with the reason.

Every finding links to its evidence (page quote, user answer or document) and its source (article or guideline).

Wording rule (from the boards): never "compliant", "certified", "approved", "conformity assessment", "CE", "legal advice", "guaranteed".

### D6. What makes us different (all in the prototype)
Built in Stage A; proving the stability and contradiction rows hold is Stage B. Based on the market research below.

- Role decided first and shown at the top
- Decisive verdicts (Applies / Doesn't / Can't tell yet, because X), no vague hedging
- Concrete tasks, not restated duties
- Contradiction checks between website, answers and documents
- Stable verdicts: same facts, same answer; never changes on pushback alone
- No opaque score; confidence per finding with its reason
- Lifecycle duties covered in the hiring scenario
- Data handling explained up front; "how we reached this" per finding
- Downloadable report
- Plus: "what would change this", personal deadline timeline, vendor questions

### D7. Models, data and the easy path
**Prototype:** Claude, GPT and Mistral through their standard APIs with ordinary keys (or one gateway service reaching all three). No EU-residency or zero-data-retention (ZDR) approvals needed.

**What makes this safe:** the prototype is a proof of concept. It runs on **test data only**:
- **links** to real, publicly available AI products (public information only);
- **invented companies** and invented answers playing the customer;
- **invented documents** for provider uploads.

No real customer, no pilot firm's information and no personal data goes in. Pilot firms may watch a demo.

**Before Phase 1 (real data):** switch to EU-hosted routes and get ZDR approved. All model calls must go through one place in the code (a model gateway) so this is a configuration change, not a rebuild.

**EU routes for Phase 1** (research 2026-11-14, mostly third-party sources; confirm with each provider):

| Model | Direct API in EU? | EU route | ZDR |
|---|---|---|---|
| **Claude** (Anthropic) | No: first-party API is US/global only | AWS Bedrock in an EU region, or Google Cloud "Google managed" EU multi-region | On request; some models excluded |
| **GPT** (OpenAI) | Yes: EU data-residency Project (`eu.api.openai.com`), +10% price | OpenAI EU Project (Azure OpenAI EU not checked) | Approval-gated; needed before EU residency works |
| **Mistral** | Yes: EU by default via the dedicated EU endpoint | EU endpoint (no Agents/Batch/Files there) | On request, stateless endpoints only; check training opt-out |

The EU-US Data Privacy Framework is valid but under appeal at the CJEU (Latombe), so EU-hosted routes are the safer default.

### D8. Tool scope: online products only
The prototype assesses AI tools that are offered online as their own product: SaaS products and online tools (e.g. a customer-support chatbot, a CV-screening service), including a provider's product that hasn't launched yet (D2). Out of scope until Phase 1: internal tools a company built for itself, and AI features inside other software.

### D9. Expert dashboard (simple version in the prototype)
- **Who signs in:** a small number of invited experts (Nimród, the Professor, compliance experts). The same screens serve the "compliance expert" and "lawyer" review levels (D13). No customer accounts.
- **What a case is:** (a) a test case that needs a reference answer, or (b) an assessment the engine escalated for review. One list holds both.
- **What it shows:** open cases, sorted and labelled by AI (scenario, risk level, role, why escalated), each with an AI-written description (summary of the tool, draft verdicts, reason for escalation) and the reasoning memo.
- **What the expert does:** writes the reference answer (D15) or the correction. Corrections are saved and feed the test set.
- **Later (Phase 1):** richer filtering, assignment between experts, four-eyes sign-off, full history.

### D10. Order of work in Stage A
Week 1: link → conversation → report flow. Weeks 1–2: chatbot scenario + expert dashboard. Weeks 3–4: hiring scenario, model switching, test runner.

### D11. Defaults
- **Report reader:** a legal professional or the firm's owner. Plain language first, article references for the lawyer.
- **Assessment length:** under 30 minutes.
- **"Preliminary":** every result is labelled "indicative assessment, not legal advice".

### D12. Hosting
Stage A and B: a simple hosting service, in an EU region where offered. Phase 1: AWS, Azure or GCP in an EU data centre, data kept at most 3 years (from the board).

### D13. Escalation standard and reasoning memo
Escalation follows a versioned rulebook, owned and signed off by the Professor. Every decision against it is explained.

**1. Reasoning memo** (in the report and the dashboard). The AI walks the legal test in a fixed order:
1. Facts, each with its evidence (page quote, user answer, document)
2. Art. 5 screen: every prohibited practice in Art. 5 checked at indicator level, in both scenarios
3. Role: provider / deployer (Arts 3, 25)
4. Art. 6 + Annex III classification, then the Art. 6(3) filter
5. Art. 50 transparency, Art. 4 literacy
6. Result per step: Applies / Doesn't apply / Can't tell yet, with reason, source, confidence
7. Which escalation rules fired, and why

**2. Sources, each labelled binding or guidance:** the AI Act (Reg. 2024/1689 as amended by Reg. 2026/1744); the Commission's prohibited-practices and AI-system-definition guidelines (Feb 2025); the Commission's draft high-risk classification guidelines (published 19 May 2026; final status to track), whose worked examples become test cases; harmonised standards once cited in the Official Journal (so far EN 18286:2026, quality management, cited 14 Oct 2026, relevant to Art. 17). **Legal knowledge base:** the tool keeps its own curated, versioned copy of these texts and only cites from it, never from the model's memory. Every report names the legal-content version it used. Prototype scope: the articles the two scenarios need (Arts 2–6, 9–16, 25–27, 49, 50, 99, Annex III, Annex VIII) and the guidelines above. A citation that doesn't resolve to the knowledge base is an error.

**3. Review levels:** automatic (clear, low-risk; report goes out marked preliminary) → compliance expert (missing evidence, unclear answers) → lawyer. In the prototype, "goes out" means the report is downloadable, and an escalated assessment also appears in the dashboard.

**4. Lawyer escalation rules:** Mike's list (any Art. 5 indicator; biometrics or emotion recognition; provider of a high-risk system; public-sector or essential-services deployer; multiple jurisdictions or sector law; user asks) plus:
- **Disagreement:** each assessment's verdict step runs **3 times** at fixed settings. If the runs disagree, the case is escalated, and in Stage B any disagreement counts against "same input, same result".
- **High stakes overrides confidence:** any "possibly prohibited" or "possibly high-risk" result goes to a lawyer even when the AI is confident.

**5. Measured in Stage B:** compare the AI's escalation decisions with the experts', and track override rates.

### D14. Smart, interactive question flow
Goal: get every legally important fact from the customer, not rely on what happens to be on their website.

- **Driven by the legal test (D13):** the next question is always the one whose answer could change a verdict. Questions that can't change any verdict are not asked.
- **Persona card, built live:** from the website, answers and documents, the engine builds a friendly profile card that fills in on screen. Two parts: the **company** (who they are, size, sector, whether they sell in the EU; decides the role) and the **tool** (what it does, who uses it and on whom, what data it touches; decides the risk level). Website facts are hints, not findings. In Phase 1 the company part is saved for reuse.
- **Confirm only at important steps:** the persona card at key checkpoints ("Is this you?", edit inline), and individually any fact that changes a verdict. Unconfirmed facts are marked in the report.
- **Clarity bar:** how complete the information is ("60% of what we need, 3 more questions"), shown during the flow only.
- **Generated on the fly, but not a chatbot:** the questions are generated live from what is still missing, but they are **not** shown as a chat: no chat bubbles, no avatar, no typing animation, no message thread. Each question appears as a structured step (choice cards first, short input when needed) next to the persona card, which updates as answers land.
- **Behaviour:** friendly, plain words, a few questions at a time, says why it asks, choices before free text, "I don't know" allowed and recorded as a gap.
- **Contradictions:** raised immediately. If the customer can't or won't resolve one, it is recorded as unresolved in the report and the case is escalated.
- **Hand-over:** when the customer can't help further, the assessment is escalated to the dashboard (D9).
- **Target:** under 30 minutes.

### D15. Test cases
Defined so the adaptive flow can be tested automatically.

A test case holds:
- a **link** to a public AI product, or, for an unlaunched provider product, an invented product description;
- a **scripted customer**: the invented company's facts, keyed by fact (e.g. "ranks candidates: yes"), not by question, so the test runner can answer whatever the flow asks;
- optional **invented documents** (providers);
- the **reference answer**, written by an expert in the dashboard: the expected role, the result of each D13 step, the expected escalation, and the articles that must be cited.

A test run records, per case and model: every question asked, the answers given, the verdicts, the citations, escalation, time taken and cost.

### Left to planning
Hosting provider; expert sign-in method; document upload file types and size limits (and how documents are read); what is stored (at least: assessments, dashboard cases, test runs, corrections); how many experts.

---

## Market research: where existing checkers fail (2026-11-14)

Main source: an empirical study of 12 EU AI Act compliance checkers, 48 reports, 6 scenarios ([arXiv 2609.36228](https://arxiv.org/html/2609.36228v1)). Supporting: [ZwillGen](https://www.zwillgen.com/?p=25495), [Themio](https://www.themio.ai/en/blog/best-ai-act-compliance-tools-sme-2026).

| What users get today | Evidence | Our answer (D6) |
|---|---|---|
| Role not determined | Only 4 of 8 checkers determine provider vs deployer | Role first, every duty labelled by role |
| Vague, hedged answers | Mean hedge-sentence rate 0.65 (normal scientific text ≈ 0.13–0.23) | Applies / Doesn't / Can't tell yet, because X |
| Duties restated, not tasks | 84% of recommendation sentences lack specifics | Who, what artifact, by when, effort |
| No input sanity checks | 0 of 12 check inputs for contradictions | Contradiction checks |
| Unstable verdicts | One flipped verdict on model change and on user pushback | Pinned model + legal-content version; 3-run check |
| Opaque scores | Score basis unclear | Confidence per finding, with reason |
| Weak lifecycle coverage | Arts 9–15 covered by 4–5 of 12; Arts 27, 49 by 3 | Hiring scenario covers them |
| Black box, unclear data use | Most don't disclose logic or data handling | Data note up front; reasoning memo |
| Transient results | Some can't be downloaded | PDF report |

Other sources for escalation design: [Osborne Clarke](https://www.osborneclarke.com/insights/european-commission-publishes-draft-ai-act-guidelines-high-risk-classification-and), [Bird & Bird](https://www.twobirds.com/en/insights/2026/the-commission's-draft-high-risk-ai-guidelines-under-the-eu-ai-act-a-first-read), [kla.digital](https://kla.digital/blog/ai-act-standards-timeline-2026), [jtc21.eu](https://jtc21.eu/), [arXiv 2608.14617](https://arxiv.org/pdf/2608.14617), [arXiv 2401.01301](https://arxiv.org/pdf/2401.01301).

Legal timeline (checked 2026-11-14 against secondary sources, not yet EUR-Lex): Digital Omnibus = Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027; Annex I from 2 Aug 2028; Art. 50 since 2 Aug 2026; new prohibitions from 2 Dec 2026.

### Board items replaced by decisions here
- "Prototype leaves out reports, expert review": replaced by D5, D9, D13.
- "Data stays in EU, ZDR": applies from Phase 1; prototype uses the easy path (D7, D12).
- "Never ask what the pages already say": replaced by D14 (persona card, confirm at key steps).

---

## Still open

- **O1. Stage B:** its deadline; approval of the proposed pass criteria; Nimród confirmed as reference-answer writer.
- **O2. Escalation rulebook:** Professor's sign-off on the first version.
- **O3. Legal sources to track:** final status of the Commission's high-risk guidelines; confirm the post-Omnibus dates against EUR-Lex.
- **O4. Overall timeline:** whether the board's "~3 months" covers Stage A + B + start of Phase 1.
- **O5. Funding and ownership** (Mike; doesn't block the build): Scrativist as funder vs joint company with the Professor with vesting.
