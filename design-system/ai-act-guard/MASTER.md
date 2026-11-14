# Design System Master File

> **Superseded (2026-11-14):** the confirmed visual direction is **Decision Path**; see `.code-foundations/research/2026-11-14-design-brief-decision-path.md`. The colours and fonts below were a starting idea only and are no longer the direction. DESIGN.md will be written from the built product.

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** AI Act Guard
**Generated:** 2026-11-14 04:46:51
**Category:** Legal Services

---

## Global Rules

### Color Palette

Chosen from the skill's "Legal Services" palette (authority navy + trust gold). The generator's first suggestion (purple/pink) was rejected because it contradicts its own anti-pattern "AI purple/pink gradients".

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#1E3A8A` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#1E40AF` | `--color-secondary` |
| Accent/CTA | `#B45309` | `--color-accent` |
| Background | `#F8FAFC` | `--color-background` |
| Card | `#FFFFFF` | `--color-card` |
| Foreground | `#0F172A` | `--color-foreground` |
| Muted | `#E9EEF5` | `--color-muted` |
| Muted Foreground | `#64748B` | `--color-muted-fg` |
| Border | `#CBD5E1` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#1E3A8A` | `--color-ring` |

**Verdict colours (always paired with an icon and a text label, never colour alone):**

| Verdict | Colour | Icon |
|---|---|---|
| Applies | `#B45309` amber | alert circle |
| Doesn't apply | `#15803D` green | check circle |
| Can't tell yet | `#475569` slate | help circle |
| Possibly prohibited / high-risk | `#DC2626` red | shield alert |

Dark mode: deepen surfaces (`#0B1220` background, `#111A2E` card), lighten primary to `#93B4FF`, keep 4.5:1 contrast; tested separately.

### Typography

- **Heading Font:** Lexend
- **Body Font:** Source Sans 3
- **Mood:** corporate, trustworthy, accessible, readable, friendly
- **Why:** Lexend is designed for readability; the audience includes non-lawyers. The generator's EB Garamond suggestion read as formal and intimidating, against the "legal-grade but not intimidating" brief.
- **Google Fonts:** https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #1E3A8A;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1E3A8A;
  border: 2px solid #1E3A8A;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1E3A8A;
  outline: none;
  box-shadow: 0 0 0 3px #1E3A8A33;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Trust & Authority, adapted.

- Credibility comes from **transparency**, not badges: evidence links, source labels (binding / guidance), legal-content version, the reasoning memo.
- **No certificates, seals or "compliant" badges** anywhere. They would break the product's own wording rule (requirements D5).
- Calm, spacious, document-like. One primary action per screen.

**Product pattern:** a working web app, not a landing page. The generator's "AI Personalization Landing" pattern does not apply to the four app screens.

---

## Anti-Patterns (Do NOT Use)

- ❌ Outdated design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients
- ❌ Certification seals, "compliant" badges, trust-badge carousels

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
