# Open work

Written 2026-09-14, after the redesign merged to `main` and went live.

Last updated 2026-09-22. Closed since the last revision: the hero eyebrow
repetition, the footer toggle pair, the mobile hero's spacing, and the
home hero rebuild against the new Figma design. Added: the Figma sync
items, the dead `.hero__name` rules, and the CMS question.

Excluded from the Jekyll build (see `_config.yml`), so it never becomes a
page on the site. It is still visible in the public repo — nothing below
says anything the site doesn't already say about itself.

Ordered by how much it matters, not by effort.

---

## 1. High5 — replace the reconstructed copy, or pull the page

**Status: live, with a DRAFT banner that is the only thing keeping it honest.**

Only *The ask* and *The real problem* on `work/high5.html` came from
Anthony. The three decisions, *The system*, *Where the brand showed up*
and *Outcome* were written before he supplied copy and were never
verified against what actually happened. They are specific enough to read
as fact:

- Decision 1 — "A documented brand and style reference every designer worked from before starting, not after."
- Decision 2 — "One flexible brand system — type, color, logo lockups — built to extend cleanly to any format."
- Decision 3 — "An internal creative-direction framework I owned, so routine calls didn't need to go up the chain."

The page carries a draft banner and a "To verify before this goes live"
aside saying exactly this. **Do not remove either as tidy-up.** They come
off when the real account replaces the invented one, not before.

Three ways to close it:

1. Anthony supplies the real decisions and outcome → swap them in, drop the banner and the aside.
2. Cut the invented sections → leaves ask + problem + a short "more detail on request" note; drop the banner.
3. Unlink the page from `work/index.html` and the nav until it is ready.

**Also:** the High5 frames in Figma carry no equivalent banner, so the
unverified copy reads as settled there. If those frames get shared, that
context is missing. Either add a banner to them or keep the body copy out
of Figma until this is closed.

**Done when:** no section on the page asserts something unverified, the
banner and aside are gone, and Figma doesn't imply otherwise.

---

## 2. Real screenshots — 16 "Screenshot pending" tiles

Placeholder tiles across the work, project and about pages. They read as a
deliberate in-progress state rather than as broken, which is why they
were allowed to ship, but they are the main thing standing between this
and a portfolio that sells the work.

Find them with:

    grep -rn 'media-placeholder' --include=*.html . | grep -v _site

Currently on `work/afordal.html`, `work/high5.html`, `work/homeasap.html`,
`projects/task-yeti.html`, `projects/illustrations.html` and
`about/index.html`.

The placeholder shares the exact aspect ratio a real `<img>` will use, so
dropping images in will not shift any layout.

**Done when:** every tile is a real image, or the ones that will never
have one are removed rather than left pending.

---

## 3. Figma ↔ site sync

The AOC Figma file now has Desktop (1440), Tablet (834) and Mobile (430)
frames for all 11 pages — 37 screens. Home is fully copy-synced. The rest
is not.

Open:

- **~234 placeholders across six pages.** WORK, About, Projects, HomeASAP
  and Afordal still carry `[Replace: …]` template copy the site filled in
  long ago. Afordal's are mostly `[PLACEHOLDER: …]` image captions, so its
  count overstates the copy work.
- **Images cannot be pushed into Figma from a sandboxed session.** The
  `upload_assets` tool issues valid upload URLs, but the egress policy
  blocks `mcp.figma.com`, and inlining bytes as base64 silently truncates
  in transit — it produces a blank image that reports the right dimensions,
  so it fails without looking like it failed. Either drag the files in by
  hand, or run the sync from an environment whose network policy allows
  that host.
- **Home's "Also on the side" mismatch.** Figma has a grid of project
  cards; the site has a heading, one paragraph and a single Eagle Quality
  device mockup. Reconciling means deleting cards and rebuilding the
  section — a design call, not a sync.
- **Eagle Quality and Task Yeti are near-duplicates of one template.** Both
  read "A running collection of logo studies", which describes neither, and
  all four project pages carry a stray `Afordal` heading.
- **Afordal has three near-duplicate mobile frames.** The COMPONENT
  (`199:37643`, 430×9193, built from DecisionBlock instances) is the
  canonical one; `58:19961` is an older build using local DecisionCard
  frames. Nothing has been deleted.
- **The old kinetic headline is hidden, not deleted**, in all three Home
  frames. Fine as a parked alternative; worth deleting if the new hero
  is settled.

Notes for whoever picks it up: Figma cannot render text on a path
(`<textPath>` imports as a flat text node), which is why the seal's ring is
built from individually placed glyphs. And `figma.createAutoLayout()`
ships with an opaque white fill that has to be cleared on every layout
wrapper.

---

## 4. HomeASAP — put the product count back

`work/homeasap.html`, *The ask*, currently reads:

> HomeASAP had a full lineup of real estate products, and I got to give
> each one its own identity and its own place to buy it.

The exact count was unknown, so it was dropped rather than shipped as a
visible placeholder. The sentence is honest and reads normally as-is —
this is an enrichment, not a gap. A number is more persuasive than "a
full lineup".

**Done when:** the count is in that one sentence. Nothing else depends on it.

---

## 5. Dead `.hero__name` rules

The home hero rebuild promoted the greeting to the headline, so the
`.hero__name` markup is gone. No page uses the class now, but three rules
for it remain in `assets/css/style.css` — they were left in place while
the new hero was still being evaluated. That reason has expired.

    grep -n 'hero__name' assets/css/style.css

**Done when:** the rules are gone, or something uses them again.

---

## 6. A CMS, so the site can be edited without a developer

Viable on this stack — Jekyll on GitHub Pages is what git-based CMSes are
built for. The obstacle is not the tool, it's that roughly 94% of the
copy (~3,500 words) is hardcoded in page HTML; only ~200 words live in
`_data/*.yml`. A CMS installed today would edit the work and project card
blurbs and nothing else.

The case studies are 68% of the prose, and they are already
component-driven — `decision-block.html` takes named parameters, so moving
those eight blocks into front matter is mechanical rather than a rewrite.

Suggested order:

1. Extract content to front matter, one page as a spike (Afordal is the
   hardest, so it proves the pattern). Worth doing on its own merits.
2. Wire the CMS on top. Sveltia CMS is the current pick — Decap-compatible
   config, better media handling, which matters given item 2.

Unverified: authentication. GitHub Pages is static and can't run an OAuth
server, so this needs either a small auth proxy or a client-side flow.
Confirm against current docs before committing to an approach.

---

## 7. Second visual direction — "psychedelic cat" branch

Anthony flagged a reference he liked — a psychedelic cat in purple and
black line work — and explicitly did not want it copied. Parked for a
separate branch, not this one.

**Blocked:** needs the reference itself (link or screenshot) before
anything can start. "Inspired by, not copying" is a distinction worth
getting right from the actual source rather than from a description.

---

## Notes for whoever picks this up

- `main` is the live site — merging publishes immediately. Recent work has
  run on per-session `claude/*` branches rather than the older
  `Design-Audit`; either is fine, as long as nothing lands on `main`
  unreviewed.
- Before any merge, check for scaffolding that was written for Anthony
  rather than for visitors:

      grep -rn 'draft-flag\|verify-list\|draft-mark' --include=*.html . | grep -v _site

  Today that returns High5 only, which is item 1 above.
- The site is behind a client-side password gate (`assets/js/gate.js`). It
  is not real security — its own comment says so, and the hash is in the
  source — but it must not be removed by accident. `tools/build-preview.sh`
  deliberately strips it for shareable previews and writes only inside
  `_preview/`; check any change to that script carefully.
- Local preview: `bundle install` first on a fresh checkout (the gems are
  not vendored).

      bundle exec jekyll serve

  On some setups that fails with `bundler: command not found: jekyll` —
  the gem is installed but its binstub isn't linked. Call the gem's own
  executable instead:

      bundle exec ruby "$(bundle info jekyll --path)/exe/jekyll" serve

  `tools/build-preview.sh` already handles this fallback internally.

  For a build that can be hosted somewhere other than a domain root, and
  that opens without the password gate:

      tools/build-preview.sh
      cd _preview && python3 -m http.server 8900

- `tools/export-frames.js` renders all 11 pages at 1440/834/390 for Figma.
  Run it locally, not in a sandbox — it needs `fonts.googleapis.com` to
  reach the real typefaces, and it aborts rather than quietly exporting in
  fallback faces.
