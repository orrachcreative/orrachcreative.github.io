# Afordal case study — plan + placeholder content

How to read this: every section below has three parts.
- **What this section proves** — the point you're making to the hiring manager, so you never lose the thread.
- **Image needed** — what to screenshot or diagram, in plain terms.
- **Placeholder copy** — draft text, written simple on purpose. Swap in real specifics, keep the plain tone.

---

## 1. Hero

**What this proves:** you shipped something real, not a Dribbble shot.

**Image needed:** one strong screen or a short looping clip of the app in use. Not a logo, not a cover graphic. The actual product.

**Placeholder copy:**
> Afordal — a real estate platform for buyers, sellers, agents, and loan officers
> Solo product designer. Six months. From two unfinished wireframes to a shipped, live real estate platform, since reused as the foundation for a separate commercial real estate joint venture.

---

## 2. The ask

**What this proves:** you started with almost nothing. This kills the "just executes a spec" doubt before it forms.

**Image needed:** if you kept the old 3-year-old wireframes, show a small thumbnail of one, low-fidelity, next to your finished screen. The contrast does the work for you.

**Placeholder copy:**
> A stakeholder had a rough idea and a set of wireframes that were three years old and never finished. That was it. No user flows, no content strategy, no design system. My job was to figure out what this product actually needed to be before I could design a single real screen.

---

## 3. The real problem

**What this proves:** the hard part wasn't the UI, it was untangling who the product was for and what rules it had to obey.

**Image needed:** a simple diagram, boxes and arrows, showing the different people involved (buyer, seller, agent, loan officer) and how they connect. This can be one of the wireframe/diagram visuals we build together, doesn't need to be fancy.

**Placeholder copy:**
> Afordal wasn't one user with one journey. A buyer might already have an agent, or might not. A seller might be working with a loan officer, or might not need one yet. On top of that, IDX and MLS rules put hard limits on what listing data I could show and how. I couldn't design a single screen until I understood how these people and these rules intersected.

---

## 4. Working it out (repeat this block 2–3 times, once per key decision)

**What this proves:** this is the whole case study. This is where you show you can think, not just draw.

**Image needed:** for each decision — one rejected wireframe/sketch, one final version, side by side.

**Placeholder copy (example — onboarding entry points):**
> **The problem:** a buyer could land on Afordal three different ways — invited by their agent, invited by a loan officer, or arriving with no agent at all. One onboarding flow couldn't serve all three without confusing people or asking questions that didn't apply to them.
>
> **What I tried first:** a single linear onboarding form, same questions for everyone. [rejected screen] It was simple to build but it either asked people things they'd already answered, or left gaps for people who needed more guidance.
>
> **What I landed on:** branching onboarding that adapts based on how someone entered the product. [final screen] An agent-invited buyer skips straight past agent-matching. Someone with no agent gets that step built in. Same core form, different path through it.
>
> **Why:** this kept one system instead of three separate products, but respected that people were arriving in genuinely different situations.

**Placeholder copy (example — IDX/MLS constraint):**
> **The problem:** I wanted to show rich listing detail directly in the buyer/seller dashboard, but IDX and MLS compliance rules restrict how listing data can be displayed and attributed outside the source system.
>
> **What I tried first:** [rejected screen — full listing detail inline]
>
> **What I landed on:** [final screen — compliant summary view with clear path to full listing]
>
> **Why:** the constraint wasn't a limitation to work around quietly, it shaped the information architecture. I designed the dashboard to summarize and route, not duplicate, which kept us compliant and actually made the dashboard less cluttered.

**Placeholder copy (example — financing education CTAs):**
> **The problem:** special financing options were added late as a differentiator, meant to expose buyers and sellers to programs they'd normally only hear about from an agent or loan officer. The easy move was to bolt on a CTA at the end of the flow, right at the financing step. But by then, the decision path was mostly already set.
>
> **What I tried first:** [rejected screen — financing CTA placed only at the final financing step]
>
> **What I landed on:** [final screen — financing education surfaced earlier, woven into the decision path rather than tacked on at the end]
>
> **Why:** the goal wasn't just to mention financing options, it was to help people make better decisions earlier. That meant treating financing education as part of the core journey, not a late add-on, so users had the full picture before they were already locked into a direction.

---

## 5. The system

**What this proves:** you don't just design screens, you build the thing that lets a product scale.

**Image needed:** a grid or sheet showing components, type, color, spacing — your actual design system artifacts.

**Placeholder copy:**
> Because there was no existing system, I built one from scratch: a component library, type and color rules, and a brand asset library. This wasn't just for the buyer/seller app. It's the same system that carried into the agent and loan officer CRM and the marketing site, which meant every new screen after this point got faster and more consistent to design and build.

---

## 6. The ecosystem

**What this proves:** you can architect one system serving multiple products and audiences, which is a Principal-level signal, not a mid-level one.

**Image needed:** screens side by side, one from the buyer/seller app, one from the CRM, one from the marketing site, one from the IDX home search, with a short label under each naming the audience.

**Placeholder copy:**
> Afordal isn't a single app. It's four connected pieces built on one design system: the buyer/seller experience, a CRM for agents and loan officers to manage their pipeline, a marketing site to bring agents and loan officers onto the platform, and a shareable IDX home search agents can send to their own contacts to search single or multiple MLSs. Designing all of it off one system meant a consistent brand and interaction language across every audience, without separate design efforts for each piece.
>
> Note: the IDX search was a reskin of an existing HomeASAP tool rather than a from-scratch design problem, worth being upfront about if asked directly, but it still shows the reach of the system into a fourth product surface.

---

## 7. Outcome

**What this proves:** it wasn't just delivered, it's still working.

**Image needed:** optional — a simple stat card or quote block, no chart needed if you don't have hard numbers.

**Placeholder copy:**
> Afordal shipped as a solo six-month build, covering brand, design system, product, and marketing site, and is live today. Separately, that same UI foundation was reused as the basis for a commercial real estate SaaS product through a joint venture, a downstream application beyond the original consumer-facing platform, and proof the system was built to extend past its first use case.

---

## Notes for next pass
- Swap every [rejected screen] / [final screen] bracket with an actual export once you've pulled screens from the Figma files.
- Keep sentences short throughout, this is meant to read fast on a phone.
- If you want, we can do the same plan for Eagle Quality and HomeASAP next, then move to actually building the page.
