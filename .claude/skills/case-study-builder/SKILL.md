---
name: case-study-builder
description: Build a portfolio case study for a design project, from raw project memory through worksheet, decision points, page structure, and placeholder content. Use this any time the user wants to turn a project (real client work, internal product work, or a self-initiated redesign) into a portfolio case study, wants help figuring out which projects to feature, wants a worksheet or outline to fill out for a project, wants wireframe/layout options for a case study page, or wants placeholder text and image callouts for a case study. Trigger even if the user just says "help me write up this project" or "I need a case study for X" without using the words "portfolio" or "worksheet."
---

# Case study builder

Helps a designer turn a project into a portfolio case study that proves they can solve ambiguous problems, not just produce polished UI. The target reader is a hiring manager or recruiter skimming fast, often on a phone.

## Core principle

The differentiator at senior/principal level is showing the *messy middle*, not just the finished screens. A hiring panel has seen a hundred polished dashboards. What they haven't seen enough of is someone showing a rejected direction next to what shipped, and explaining the tradeoff in their own words. Every step below exists to surface that, not to make things look pretty.

## Step 1 — Qualify the project honestly

Before building anything, establish who actually made the decisions. This determines what can honestly go in "working it out."

Ask (or infer from context):
- What was your actual role — final call, some input, mostly execution, research support?
- Can this be shown publicly, or is any part under NDA?

Rules that follow from the answer:
- **Full ownership of key decisions** → proceed normally, full worksheet.
- **Some input, not the final call** → don't write someone else's reasoning as the user's own. Either skip "working it out" for this project, or if the user wants to feature it anyway (e.g. as a self-initiated redesign), see the sub-case below.
- **Self-initiated / passion project** (redesigning something nobody asked them to touch) → this is a legitimate case study, but it needs a *real* problem to anchor it, not just visual polish, or it reads as portfolio filler. If there's a real stakeholder (e.g. a real business, a friend's company), recommend getting real answers from them before writing "the real problem" section — a short questionnaire works well for this. See `references/stakeholder-questionnaire-template.md`.
- **A component that's mostly a reskin or reuse of existing work** (not a from-scratch decision) → doesn't belong in "working it out." It can still appear in "the ecosystem" section to show scope, but flag it honestly rather than presenting it as a solved problem.

## Step 2 — Fill out the worksheet

Use `references/worksheet-template.md`. Send it to the user as a document they fill out like an assignment, one project at a time — don't try to extract all of this through back-and-forth chat unless they prefer that. The worksheet gets at: the ask, the real problem (users + constraints), 2-3 genuine decision points (problem / first attempt / final direction / why), the system built (if any), the ecosystem (if more than one product/surface), and the outcome.

For each "working it out" entry, keep asking "why didn't the first attempt work, and what did the final direction cost you" until the answer is a real tradeoff, not just a preference. A good decision entry names something given up, not just something gained.

If the user can only think of 1-2 decisions, ask about: onboarding/entry points, edge cases with multiple user types, regulatory or platform constraints, a late-added feature that had to fit an existing flow, or a business/strategy call disguised as a placement question (e.g. where a CTA goes and why). These are reliable sources of genuine decisions.

## Step 3 — Turn worksheet answers into placeholder content

Once the worksheet is filled, draft actual placeholder copy per section — simple, concrete sentences, not marketing language. Every section pairs three things: what the section is proving to the reader, what image/screenshot is needed, and draft copy the user can react to and swap out. See `references/section-copy-guide.md` for the section-by-section pattern and tone (plain, short sentences, phone-readable).

## Step 3.5 — Brand identity showcase (optional, only if the project includes brand work)

If the project involved logo, color, typography, patterns, or real-world brand application (signage, apparel, packaging, vehicle wraps) alongside or instead of product/UX work, use `references/brand-identity-showcase.md`. It covers deciding whether the brand work belongs as a section inside the product case study or as its own standalone brand page, what to include (the system, then the system applied in the real world), and how to write it, lighter and more gallery-like than the "working it out" narrative used elsewhere, while still calling out genuine hard decisions when they exist.

## Step 4 — Page structure and layout

Use `references/layout-patterns.md` for the desktop/mobile structural options (narrative scroll, jump-nav with sticky summary, comparison-first, and the hybrid). Present 2-4 options as visuals (via the Visualizer or an artifact) rather than describing them in prose only — this is a visual decision, show it. Once real content exists from Step 3, re-render the chosen option(s) filled with real copy and labeled image placeholders so the user can compare options with actual context instead of empty boxes.

For the reject/ship comparison pattern specifically, a before/after drag slider is a strong mobile pattern (compresses two stacked images into one), but always pair it with a plain toggle or link fallback for accessibility — a drag-only comparison excludes screen reader users. Note this tradeoff explicitly rather than defaulting to slider-only.

## Step 5 — Build handoff notes

If the user is building this themselves (React, Webflow, etc.), summarize load-time, robustness, and accessibility implications of any interactive pattern chosen — favor native HTML elements (`<button aria-expanded>`, `<input type="range">`) over custom-built equivalents, since they carry keyboard/touch/focus behavior for free. Flag lazy-loading images inside any collapsed/expandable content as the main real load-time lever, not the interaction code itself.

## Output format

Package what's produced as downloadable files (worksheet answers, layout decisions, placeholder content) rather than leaving it only in chat — the user is treating this as homework they'll return to project by project. One file per project is fine; don't merge multiple projects' content into a single file.

## Style notes carried over from prior work with this user
- No em dashes in generated copy.
- Avoid AI-isms ("proven ability," "thrive in ambiguous environments," "leverage," "seamless," "unlock").
- Plain, short sentences — the target reader is skimming on a phone.
