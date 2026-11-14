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

---

## 8. Page decisions (page-by-page round, from 2026-11-14)

Decided with Osaid one page at a time. Figma file `xNTQw7xAGzT4o1pLIjHoM4`: decided frames sit in
sections named `Decided · …`; open options sit in sections named `Page NN · … · options`.

### 8.1 Approved design language (supersedes §4 "Ground" and the palette idea)

Flat silver-grey ground, white cards, slate-blue actions, fine borders. No gradients, bevels or
raised shadows. Calm, professional, comfortable. Slow motion: persona and step transitions
0.7–0.85 s, gentle ease-out, no bounce; reduced motion → appear without movement.
Rejected: vermilion accent, sage "Quiet layers", pale emerald + butter yellow.

Tokens (contrast measured with the WCAG formula, `node -e` script, 2026-11-14):

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `bg` | `#f4f6f8` | page ground | — |
| `surface` | `#ffffff` | cards, inputs | — |
| `surface-sunk` | `#eef1f4` | switch track, not-assessed node fill | — |
| `ink` | `#2b3542` | headings, body | 11.47 on `bg` |
| `ink-muted` | `#5d6976` | secondary text, step notes | 5.17 on `bg`, 4.94 on `surface-sunk` |
| `action` | `#3c5875` | buttons, current step, labels | 6.81 on `bg`; white on it 7.38 |
| `action-tint` | `#eaf0f6` | current-step pill, info panels | `action` on it 6.43 |
| `line` | `#dfe4ea` | card borders, dividers (decorative) | — |
| `line-state` | `#7b8794` | step-node outlines, dashed connectors (they carry state) | 3.38 on `bg`, 3.66 on `surface` |

Fixed from the Figma baseline: muted text `#687482` measured 4.40 on `bg` (fails AA for small
text) and is replaced by `ink-muted`. Fonts in the frames: Manrope (UI), Inter (labels, figures).

### 8.2 Resolved conflicts in the earlier Figma screens

1. **Arc shows every legal-test step.** Prohibited?, High-risk? and Exemption? keep their real
   place in the order, drawn as a dashed node and dashed connectors in `line-state`, with the
   words "Not assessed in this version" (engine `STEP_STATUS`). A one-line legend under the arc
   explains dashed steps. Never hidden, never given a verdict.
2. **Questions come from the engine.** Screens show the real question, "why we ask" and options
   from `FACTS` (`packages/engine/src/facts.ts`) and the verdict logic in `rules.ts`. The old
   example ("Will people know they're interacting with AI?" asked of a deployer) is withdrawn:
   Art. 50(1) is the provider's duty.
3. **No Person persona.** Two parts only: Company (decides the role) and Tool (decides the risk).
   No name, email or team role is collected.
4. **Live persona card + deeper page.** A compact Company + Tool card sits beside every question
   and fills in live; "Your persona" opens the full persona page for a closer look and edits.

### 8.3 Page 01 · Entry — decided: A refined (frame `Page 01 · DECIDED · A refined`)

- Left: the decision path, faint, all eight legal-test steps in order (Start, Prohibited?, Your
  role, High-risk?, Exemption?, Transparency, AI literacy, Verdict), numbered 01–08. Start is
  current (filled `action` node, 4 px `action-tint` ring, "You are here"). Assessed steps ahead:
  white node, `line-state` outline, short note (e.g. "Article 50"). Not-assessed: see 8.2.1.
- Right: "Which AI tool are you assessing?", one card with a two-way switch **Website | Not public
  yet** (replaces B's two cards and the "Describe your tool instead" link). Website: URL field,
  helper "We read public pages only. What we find stays 'from website, unconfirmed' until you
  check it.", primary button "Read website". Not public yet: a description field in the same card.
- Below: prototype notice (invented company details only, no personal or customer data), then
  "Next, you'll check what was found".
- Footer on every screen: "AI-generated indicative assessment. Not legal advice." · "No account
  required".
- States to build: empty, invalid URL (inline error under the field, words not colour), switch on
  Not public yet, submitting (button → "Reading…", disabled).
- Example data: Northstar Support Ltd, `https://northstar.example/support-assistant` (reserved
  `.example` domain, invented).

### 8.4 Page 02 · Reading the website — options open

Three options in section `Page 02 · Reading the website · options`, all with Start as the current
step ("Reading the website") and no spinner: **A** live checklist (done / now / waiting rows +
"Found so far"), **B** persona card fills in (Company + Tool fields arrive marked unconfirmed),
**C** evidence first (each finding shows the sentence and page it came from).
