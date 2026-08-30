# Afordal case study — layout and build notes

## Structure decided on
Sticky-summary + jump-nav approach (option B/D family): a top summary bar (role, timeline, outcome), jump links to problem / decisions / system / outcome, full narrative underneath. Every "working it out" decision gets a real reject-vs-shipped comparison, not just a condensed line.

## Desktop
Two-column layout. Left column: sticky rail with the summary stats and jump nav, stays in view while the right column scrolls. Right column: full case study content, full-width comparison images since there's room to show real detail.

## Mobile
Three specific patterns instead of one long single-column stack:

1. **Horizontal scrolling chip nav** (not vertical) for the jump links, so it doesn't compete with thumb scrolling.
2. **Decision sections collapsed by default, expand on tap.** Still undecided whether this is the right call for Afordal specifically — revisit before final build. If skipped, decisions show at full length like desktop, just single-column.
3. **Before/after drag slider** for each reject-vs-shipped comparison, so it fits in one image's height instead of two stacked images. Needs a plain toggle/link alternative for accessibility (see below) — not gesture-only.

## Technical notes for the React build (Claude Code)

**Performance**
- Interaction logic itself (accordion state, range input) is negligible weight.
- Real load-time risk is the comparison images. Lazy-load images inside any collapsed section — don't render until expanded.
- Serve as WebP, reasonably sized, not full-resolution exports.

**Bugs/robustness**
- Use a real `<button>` with `aria-expanded` / `aria-controls` for any collapse/expand, not a `<div onClick>`.
- Use a real `<input type="range">` for the compare slider rather than a custom drag handler — free keyboard support, touch handling, focus behavior.

**Accessibility**
- The drag-slider comparison is visual only. Needs a plain toggle or link near it ("view rejected version / view shipped version") so the comparison isn't locked behind a drag gesture.
- Real alt text on both images regardless of slider state.
- Respect `prefers-reduced-motion` for accordion/expand transitions.

## Open decisions
- Whether decision sections should be collapsed-by-default on mobile, or shown open like desktop — parked for now, easy to change later since it's independent of the slider component.
