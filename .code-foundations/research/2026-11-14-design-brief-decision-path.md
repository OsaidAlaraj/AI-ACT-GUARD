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

Silver-grey ground, white cards, slate-blue actions. Calm, professional, comfortable. No gradients
or bevels. Rejected: vermilion accent, sage "Quiet layers", pale emerald + butter yellow.

**Depth rule (Osaid, 2026-11-14, Page 01 option E3; replaces "no raised shadows"):**
- **One background, always the same.** Every screen sits on `bg`; it never changes, darkens or
  splits into panels. No stage panels, stacked plates or tonal layers.
- **Cards float.** Cards are white with no border; their soft shadow is part of the card and
  travels with it. Nothing else on a page has depth (the arc and its circles sit flat on `bg`).
- **The shadow moves with the card.** Resting: `shadow-rest`. When a card lifts or flies (a
  question card arriving, the persona card sliding in, the entry card leaving), it rises and its
  shadow grows to `shadow-lift`, then eases back to `shadow-rest` as it lands.
- **Motion:** 0.7–0.85 s, gentle ease-out, no bounce. Reduced motion: no travel, a short
  cross-fade, shadow stays at rest.

Tokens (contrast measured with the WCAG formula, `node -e` script, 2026-11-14):

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `bg` | `#eef1f4` | the one background, every screen | — |
| `surface` | `#ffffff` | cards, inputs | — |
| `surface-sunk` | `#eef1f4` | switch track and wells inside a card | — |
| `ink` | `#2b3542` | headings, body | 10.96 on `bg`, 12.42 on `surface` |
| `ink-muted` | `#5d6976` | secondary text, step notes | 4.94 on `bg`, 5.60 on `surface` |
| `action` | `#3c5875` | buttons, current step, labels | 6.51 on `bg`; white on it 7.38 |
| `action-tint` | `#eaf0f6` | current-step pill, info panels | `action` on it 6.43 |
| `line` | `#dfe4ea` | input borders, row dividers inside cards (decorative) | — |
| `line-state` | `#7b8794` | step-node outlines, dashed connectors (they carry state) | 3.23 on `bg`, 3.66 on `surface` |
| `shadow-rest` | `0 1 2 rgba(31,41,56,.05), 0 6 18 rgba(31,41,56,.07)` | a card at rest | — |
| `shadow-lift` | `0 2 4 rgba(31,41,56,.06), 0 18 40 rgba(31,41,56,.12)` | a card in motion | — |

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

### 8.3 Page 01 · Entry — decided: E3 floating cards (frame `Page 01 · DECIDED · E3 floating cards`)

Options seen: A Guided, B Two routes, C Persona origin, A refined, D Single line, E Show the
outcome, E1/E2 depth variants. E3 chosen; A refined superseded (section renamed in Figma).

- **No decision path on this page.** The path (arc) first appears when the customer enters the
  questionnaire, with the first question, and draws in once (0.7–0.85 s). This supersedes §3A "the
  empty path is drawn faintly behind the input". Page 02 (reading the website) has no path either.
- **Left:** heading "Find out which AI Act rules apply to one AI tool"; one line "Paste its public
  product page. We read it, you check what we found, then answer only the questions that change
  the result."; then the **entry card**: two-way switch **Website | Not public yet**, URL field,
  primary button "Read website", prototype line "Invented company details only. No personal or
  customer data." Not public yet swaps the URL field for a description field in the same card.
- **Right:** the **example card**, "What you get · example with invented data": Support
  Assistant · Northstar Support Ltd · you use it (deployer), with one row per verdict type:
  - Applies — AI literacy · Article 4 — "Staff who run the tool need enough AI literacy."
  - Does not apply — Telling people they talk to AI · Article 50(1) — "That duty is the
    provider's. Ask your vendor how it is shown."
  - Can't tell yet — Disclosing AI-written text you publish · Article 50(4) — "Depends on whether
    you publish its text to inform the public. One question settles it."
  - Footer line: "Each verdict links to its evidence and source. Indicative, not legal advice."
  The example is static and must stay consistent with the engine's rules for a deployer. Verdict
  symbols here are placeholders until the icon set is decided (§8 later page).
- **Motion out:** on "Read website" the entry card lifts (`shadow-lift`) and travels into the
  Page 02 position; the example card fades back and leaves. The background does not move.
- Footer on every screen: "AI-generated indicative assessment. Not legal advice." · "No account
  required".
- States to build: empty, invalid URL (inline error under the field, words not colour), switch on
  Not public yet, submitting (button → "Reading…", disabled).
- Example data: Northstar Support Ltd, `https://northstar.example/support-assistant` (reserved
  `.example` domain, invented).
- Phone: one column; the example card moves below the entry card.

### 8.4 Page 02 · Reading the website — decided: B card fills in (frame `Page 02 · DECIDED · B card fills in`)

Options seen: A live checklist, B card fills in, C evidence first (redrawn in E3 style). B chosen
because the card that fills in here is the same persona card that later sits beside every
question and is confirmed at "Check your details": one object, growing, from entry to verdict.

- **No path, no spinner.** Heading "Reading northstar.example", line "Public pages only. This
  usually takes under a minute."
- **Motion in:** the Page 01 entry card flies here (`shadow-lift`) and becomes the persona card
  (`shadow-rest` when it lands). The background does not move.
- **The card:** title "What we are learning" with a plain count ("4 of about 9 details found",
  never a percentage or score). Two columns: **Company** "Decides your role" (name, based in,
  offers the tool to, runs the tool itself) and **Tool** "Decides which rules apply" (name, what it
  does, who uses it, writes its own replies). Each found value shows "From website, unconfirmed";
  each missing one shows a quiet placeholder bar and "Still reading". Facts arrive one at a time
  with a short fade (no typing animation). Footer line: "You will check every detail before it
  shapes the assessment."
- **States:** reading (as drawn); nothing found (card says so and offers "Describe it instead");
  page unreachable (words, with "Try again" and "Describe it instead"); done → moves on to "Check
  your details".
- Website text is data: shown as plain text, never as HTML, never as instructions to the model.

### 8.5 Question flow — not decided (first drafts rejected)

Real engine path for the chatbot deployer, driven 2026-11-14 (`nextStep` in a throwaway vitest
probe): `usesAi` → `role` → `emotionOrBiometric` → `deepfake` → `publicInterestText` → result.
For a deployer the engine never asks `interaction` (Art. 50(1) is the provider's duty).

Demo state for the screen: a deployer at `emotionOrBiometric` (Transparency, Art. 50(3)); Start
and Your role done; "About 2 more questions" (then `deepfake`, `publicInterestText`).

**Rejected 2026-11-14:** three layouts in Figma section `Rejected · Question flow drafts (QA / QB
/ QC)`: arc at the left, path across the top, arc around the question. Osaid: "all of them are so
ugly", "the colours are so bold and the page is annoying". Causes:

- too much slate blue (filled done nodes with checks, tinted halo, tinted selected answer, dark
  button all competing);
- too many things at once (eight labelled steps, "Not assessed in this version" three times, an
  open "why we ask" box, a five-row persona card, a clarity line);
- small type everywhere (11–15 px) and wireframe-level finish; three quick drafts instead of one
  finished screen.

**Direction for the next attempt (proposed, not yet approved): one quiet, finished version.**

- The question is the only loud thing: large calm type, generous space. Slate blue only on the
  Continue button.
- The arc is a whisper: hairline line, small open circles; done = small dot inside, current =
  slightly stronger ring. No fills, no halo.
- Not-assessed steps: name only, in faint text, plus one short note (not three repeated labels).
- Answers: white rows; the chosen one gets a fine slate outline, no coloured fill.
- "Why we ask": a small link that opens on demand, closed by default.
- Persona card: a slim summary ("Northstar · Support Assistant · Deployer") that expands on click.
- Same rules as before: one background, floating cards (8.1), real engine copy (8.2.2).

## 9. Status and hand-over (end of session 2026-11-14)

**Decided:** design language and depth rule (8.1); the four Figma conflicts (8.2); Page 01 entry,
E3 floating cards (8.3); Page 02 reading the website, B card fills in (8.4).

**Left, in order:**

1. Question flow (the arc): one quiet, finished version per 8.5, then Osaid approves or adjusts.
2. "Check your details" checkpoint (confirms the persona card from Page 02).
3. Contradiction and "Can't tell yet" states.
4. Report: screen and PDF look.
5. Verdict colours and the icon set (always word + shape, never colour alone); data
   representation.
6. Expert dashboard.
7. Customer dashboard + profile: vision page only, clearly labelled; outside Stage A (`PLAN.md`
   puts accounts in Phase 1). Ask Osaid before it becomes buildable.

**Next session goal:** get the question screen approved: build the quiet version from 8.5 as one
finished screen (ideally an HTML prototype that shows the real motion: arc drawing, cards flying
with their shadow), ask Osaid for 2–3 reference products Osaid likes if the quiet version still
misses, then record it here. After items 1–3, recommend the first build ticket: the first chatbot
screens + the Playwright runtime harness (Stage A week 1).

**How Osaid wants to work:** one page at a time, few options, Osaid picks. Quiet over bold. A single
finished screen beats several rough drafts. No pile of overlapping cards.
