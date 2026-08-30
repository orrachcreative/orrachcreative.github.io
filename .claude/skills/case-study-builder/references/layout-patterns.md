# Layout patterns for case study pages

Present these as visuals when helping a user choose, not as prose descriptions only.

## Structural options
- **Narrative scroll** — single column, top to bottom, no navigation. Forces the reader through the story in order. Good default when the story is short enough not to need navigation.
- **Jump-nav with sticky summary** — a summary bar (role, timeline, outcome stat) plus jump links to problem/decisions/system/outcome. Lets a time-crunched reader skip straight to "working it out." Recommended default for longer case studies.
- **Comparison-first** — every decision gets a full-width reject/ship comparison as the visual anchor, connective narrative text trimmed to a line or two. Punchier but risks feeling like a portfolio reel instead of a case study, since it strips out most of the reasoning.
- **Hybrid** — sticky summary + jump nav from the jump-nav option, combined with full-width comparison treatment for every decision from comparison-first. Usually the strongest balance: fast to scan, but doesn't sacrifice the reasoning.

## Desktop vs mobile — don't just stack to one column
Desktop has room a phone doesn't; use it rather than porting the mobile layout up.

**Desktop**: two-column layout works well — a sticky left rail (summary stats + jump nav) stays in view while the right column scrolls through the full case study content, wider comparison images since there's room.

**Mobile**, three patterns to avoid one long undifferentiated scroll:
1. Horizontal scrolling chip nav instead of a vertical list, so it doesn't compete with thumb scrolling.
2. Collapsed-by-default decision sections, expand on tap — turns a long scroll into something much shorter unless the reader chooses to go deeper. (Note: whether this is right for a given project is a judgment call, not a default — ask the user rather than assuming.)
3. Before/after drag slider for reject/ship comparisons instead of two stacked images — same information in half the vertical space, and reads as a small technical flex in its own right.

## Accessibility note for the drag-slider pattern
A drag-only comparison is visual-only and excludes screen reader / keyboard-only users. Always pair it with a plain toggle or link ("view rejected version / view shipped version") so the comparison isn't gesture-locked. Use a real `<input type="range">` rather than a custom drag handler — it comes with keyboard and touch support built in.

## Build notes to pass along if the user is coding this themselves
- Interaction logic (accordion state, range input) is lightweight; the real load-time cost is unoptimized comparison images. Lazy-load images inside collapsed sections, serve as compressed WebP.
- Prefer native semantic elements (`<button aria-expanded>`, `<input type="range">`) over custom-built equivalents for free keyboard/touch/focus behavior.
- Respect `prefers-reduced-motion` for any expand/collapse transitions.
