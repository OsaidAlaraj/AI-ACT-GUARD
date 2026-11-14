# AI Act Guard — design brief: Decision Path

**Status:** confirmed by Osaid · **Date:** 2026-11-14 · **Revised:** 2026-11-14 — no metro or transport theme (Osaid: keep the design's mechanics, drop everything about metros or transportation).
**Built from:** PRODUCT.md, requirements (`2026-11-14-ai-act-guard.md`), Impeccable shape + direction round 2 (seed reference `seed:2d33afd64cd5a6c8`, re-roll 1). The chosen card was "Route Map"; its mechanics are kept, its transit imagery is removed.
**No code.** This brief feeds Greenfield (stack/scaffold) and then the build.

---

## 1. The idea

**The legal test is drawn as one decision path.** Every assessment is a path through the real steps of the legal test (D13), in their fixed order. As the customer answers, their path lights up step by step until it reaches the verdict. The same diagram is the question flow, the reasoning memo, the report and the expert's case view: one picture of how the answer was reached.

**What it refuses:** the category default (stepper + summary card + status pills), chat bubbles, compliance scores, shields and seals, a decorative diagram that doesn't carry the logic, and **any metro, rail, airport or transport imagery or wording** (no stations, tickets, lines, interchanges, departures or boarding passes).

**Why it works:** a branching diagram makes the legal logic (provider vs deployer, high-risk vs not, exemption) visible instead of hidden behind a stepper.

## 2. The path (steps = legal test)

Main path, in order:

1. **Start**: link pasted or product described
2. **Prohibited?** (Art. 5 screen)
3. **Your role** (provider / deployer / both): a **fork**; the path splits here
4. **High-risk?** (Art. 6 + Annex III)
5. **Exemption?** (Art. 6(3)); only reached when the path went through high-risk
6. **Transparency** (Art. 50)
7. **AI literacy** (Art. 4)
8. **Verdict** (end)

Branches:
- **High-risk branch**: when step 4 lands on "applies", the path takes a branch with a step for each duty (Arts 9–15 summary, 16 or 26 by role, 27, 49).
- **Expert review**: when any escalation rule fires (D13.4), the path visibly passes **through Expert review** before the verdict, with the reason on that step.

Step states (always shape + text, never colour alone):
- done: filled node, result word under it ("No", "Deployer")
- current: ringed node with a halo, "You are here"
- can't tell yet: open node with a "?" and the gap named
- not on your path: greyed node, dashed connector
- escalated: double ring, "Expert review: reason"

## 3. Surfaces

### A. Start (Operate)
- One job: start an assessment. Paste a link **or** "My product isn't public yet: describe it".
- The empty path is drawn faintly behind the input, so the visitor sees the steps ahead before starting.
- After submitting: "Reading the website" runs as the Start step filling in, with what was found listed live (not a spinner).

### B. Smart question flow (Operate) — the core screen
- **Top: the path**, full width, current step centred. On phones it turns vertical at the left edge.
- **Centre: the current question**, generated on the fly for this step. **Not a chat:** no bubbles, avatar or typing animation. A step label ("Step 6 · Article 50"), the question, a one-line "why we ask", choice options first, short input only when needed, "I don't know" always present. Only the active question is lit; the rest of the screen stays quiet.
- **Right: the persona card**, two parts: Company (decides the role) and Tool (decides the risk). Fills in live. Website facts arrive marked "from website, unconfirmed".
- **Confirmation only at key steps:** "Check your details" checkpoints (after Start, at the role fork, before the verdict) confirm the whole card; any single fact that changes a verdict is confirmed on its own. Confirmed fields get a quiet "confirmed" mark, not a seal.
- **Clarity:** how far along the path you are plus "about 3 more questions", never a score.
- **Contradictions:** shown at the step as a short "These two don't match" panel with both sources and a choice to resolve; unresolved ones pass through Expert review.

### C. Report (Read, on screen + PDF)
- **Top: the whole path** as taken, from Start to Verdict, with every step's result. Click a step to jump to its section.
- Sections follow D5: persona card, role, verdicts (Applies / Doesn't apply / Can't tell yet, because X), **what would change this** (drawn as a **dashed alternative path**: "If the tool ranked candidates, your path would go through High-risk"), rules that apply (binding / guidance), deadline timeline (a dated line with each duty marked on its applies-from date), what's missing, next steps (who, what, by when, effort), vendor questions (copyable text), reasoning memo, small print.
- **PDF:** same order; the path renders as a static diagram on page 1; sections paginate cleanly; "Indicative assessment, not legal advice", date and legal-content version in the footer of every page.

### D. Expert dashboard (Operate)
- **Left: the queue**, sorted and labelled by AI (scenario, risk, role, why escalated), dense rows, not airy cards.
- **Right: the case**: its path with the escalated step highlighted, the AI-written description, the reasoning memo step by step, and a field to write the reference answer or correction per step.
- Test cases and escalated live assessments share the list, told apart by a label.

## 4. Visual world (direction, not tokens)

- **Ground:** white and near-black, crisp; the diagram supplies the colour.
- **Colours do jobs:** one colour per legal domain (main test, high-risk branch, transparency, expert review), consistent across every surface. Verdict states pair colour with a word and a node shape.
- **Type:** a clear humanist sans for UI and step names; tabular figures for dates and articles. Final faces chosen at build.
- **Signature move:** the path drawing itself to the next step when an answer is confirmed, and the alternative path appearing dashed in the report. Everything else stays calm.
- **Motion:** one orchestrated move (the connector extending); respects reduced motion (it then simply appears).
- **No transport imagery anywhere.**
- The earlier navy/gold starting idea in `design-system/ai-act-guard/MASTER.md` is superseded by this direction.

## 5. Ranges and states to design

- Path length: 5 steps (simple chatbot, deployer) to 12+ (high-risk provider with branch).
- Persona card: 6–12 fields; long company names; tools with no website.
- Questions per assessment: about 5–15; under 30 minutes.
- States: empty start, reading website, unknown answer, contradiction, escalation, report ready, PDF, expert queue empty, case with several escalations.

## 6. Constraints

- WCAG 2.2 AA; full keyboard use; the path must be readable by screen readers as an ordered list of steps with their results.
- Desktop first, works on a phone (vertical path).
- English UI; banned wording from PRODUCT.md; no seals, badges or scores.
- Questions generated on the fly but never chat-styled.

## 7. Open decisions (the builder must not invent these)

- Exact colour assignment per legal domain.
- How the high-risk branch is shown on a phone when it has many steps.
- Fonts and final palette (at build, then recorded in DESIGN.md).
- PDF: react-pdf (decided in Greenfield setup), with the path drawn as SVG.
