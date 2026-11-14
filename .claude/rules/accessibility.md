---
paths:
  - "apps/web/**/*.tsx"
  - "apps/web/**/*.css"
---

# Accessibility (WCAG 2.2 AA)

- Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI component boundaries).
- Never colour alone: step states use node shape + word + colour (design brief §2).
- The decision path is an ordered list for screen readers, each step with its result.
- Full keyboard use, visible focus, logical tab order; target size ≥ 24×24 CSS px.
- Every input has a visible label; choice options are real radio/checkbox controls.
- Respect `prefers-reduced-motion`: the path's drawing animation becomes an instant change.
- Plain language for non-lawyers; legal terms explained in place.
