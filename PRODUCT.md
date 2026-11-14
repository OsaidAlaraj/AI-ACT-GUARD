# Product

<!-- impeccable:product-schema 1 -->

Full requirements: `.code-foundations/research/2026-11-14-ai-act-guard.md` (confirmed 2026-11-14). This file is the durable product summary; the requirements doc wins on detail.

## Platform

web

## Stack

Delegated (Osaid asked for a recommendation, 2026-11-14):

- **Next.js (React, TypeScript)** for the web app and its server routes. Server-side streaming lets the persona card fill in live during the conversation, and server routes host the single model gateway.
- **PostgreSQL** for assessments, expert cases, test runs and the versioned legal knowledge base.
- **Simple hosting in an EU region** for the prototype (invented data only), moving to AWS, Azure or GCP in an EU data centre for Phase 1.
- Expert sign-in, PDF report generation and the exact database/hosting providers are left to implementation planning.

## Users

- **SME owners and in-house legal professionals** at small and mid-sized EU firms (up to ~100 people). They are either **deployers** (they use an AI tool someone else built, e.g. a customer-support chatbot or CV-screening service) or **providers** (AI start-ups building a product for the EU market). Their job: find out which EU AI Act rules apply to one AI tool and what to do next, without a compliance team.
- **Experts**: a lawyer (Nimród), a senior legal adviser (the Professor) and compliance experts. Their job: write reference answers for test cases and review assessments the engine escalates, in an expert dashboard.

## Product Purpose

The user pastes a link to an AI tool (or describes an unlaunched product), has a short smart conversation, and gets a plain, evidence-backed assessment and a to-do list. Success for the prototype: the full flow works end to end on invented data for two scenarios (chatbot transparency, Art. 50; hiring, Annex III point 4), then holds up when lawyers check it against reference answers.

## Positioning

Existing AI Act checkers hedge, restate legal duties instead of giving tasks, skip the provider/deployer question, change verdicts unpredictably and show opaque scores. AI Act Guard instead:

- decides the user's role first;
- gives decisive verdicts (Applies / Doesn't apply / Can't tell yet, because X), each tied to evidence and a source;
- turns duties into concrete tasks (who, what, by when, effort);
- builds a live persona card of the company and tool from a smart question flow, treating website text as hints the customer confirms at key steps. Questions are generated on the fly but never presented as a chatbot: structured question steps, no chat bubbles, avatars or typing animation;
- explains its reasoning step by step, the way a lawyer writes a memo;
- cites only from its own versioned legal knowledge base, never the model's memory;
- sends high-stakes or uncertain cases to human experts under a written escalation rulebook.

## Operating Context

- A customer assessment takes under 30 minutes, usually in one sitting, on desktop first; it must also work on a phone.
- The output is a downloadable PDF report the customer may forward to a lawyer, a vendor or management.
- Experts work through a queue of AI-sorted cases, each with an AI-written description and reasoning memo, and write answers or corrections.
- The prototype is a proof of concept on invented data; real pilot firms come in Phase 1.

## Capabilities and Constraints

- English UI and reports; inputs in any language are read.
- Scope: AI tools offered online as their own product, including unlaunched provider products. Internal tools and AI features inside other software come later.
- Every result is labelled "indicative assessment, not legal advice" and AI-generated.
- Banned wording, anywhere: "compliant", "certified", "approved", "conformity assessment", "CE", "legal advice", "guaranteed".
- No single compliance score. A clarity bar shows how complete the information is, during the flow only.
- Three AI models (Claude, GPT, Mistral) behind one switchable gateway.
- Undecided: Stage B deadline, Phase 1 pricing, funding and ownership.

## Brand Commitments

- Name: **AI Act Guard**.
- Voice: plain, friendly and decisive, never intimidating; legal-grade precision without legalese.
- Credibility comes from transparency (evidence, sources labelled binding or guidance, legal-content version, reasoning shown), never from badges, seals or certification imagery.

A colour and font starting idea exists at `design-system/ai-act-guard/MASTER.md`. It is **not binding**; new visual work may replace it.

## Evidence on Hand

- Requirements, market research and legal timeline: `.code-foundations/research/2026-11-14-ai-act-guard.md`.
- No customers, testimonials, case studies, benchmarks, pricing or logos exist yet. Do not invent any.

## Product Principles

1. **Decisive, not vague.** Say what applies and why; hedge only where evidence is truly missing, and say what would settle it.
2. **Evidence or it didn't happen.** Every finding traces to a page quote, an answer or a document, and to a source in the knowledge base.
3. **Ask only what changes the answer.** The conversation follows the legal test; it never pads with questions that can't change a verdict.
4. **Humans own the hard calls.** Possible prohibited or high-risk results always reach an expert, however confident the AI is.
5. **Never over-claim.** The product informs; it never certifies.

## Accessibility & Inclusion

WCAG 2.2 AA across customer and expert screens (the EU baseline via EN 301 549). Users include non-lawyers, so reading level and plain language matter as much as contrast and keyboard access.
