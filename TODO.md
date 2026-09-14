# Open work

Written 2026-09-14, after the redesign merged to `main` and went live.

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

**Done when:** no section on the page asserts something unverified, and
the banner and aside are gone.

---

## 2. Real screenshots — 9 "Screenshot pending" tiles

Placeholder tiles across the work and project pages. They read as a
deliberate in-progress state rather than as broken, which is why they
were allowed to ship, but they are the main thing standing between this
and a portfolio that sells the work.

Find them with:

    grep -rn 'media-placeholder' --include=*.html . | grep -v _site

The placeholder shares the exact aspect ratio a real `<img>` will use, so
dropping images in will not shift any layout.

**Done when:** every tile is a real image, or the ones that will never
have one are removed rather than left pending.

---

## 3. HomeASAP — put the product count back

`work/homeasap.html`, *The ask*, currently reads:

> HomeASAP had a full lineup of real estate products, and I got to give
> each one its own identity and its own place to buy it.

The exact count was unknown, so it was dropped rather than shipped as a
visible placeholder. The sentence is honest and reads normally as-is —
this is an enrichment, not a gap. A number is more persuasive than "a
full lineup".

**Done when:** the count is in that one sentence. Nothing else depends on it.

---

## 4. Home hero — the eyebrow now repeats the greeting

`index.html`. The eyebrow reads:

> Product design · Jacksonville, FL — open to remote

directly above:

> Hi, I'm Anthony Orrach, a product and brand designer based in Jacksonville, FL.

Both the discipline and the city are said twice. Trim the eyebrow to
"Open to remote", or drop it.

If it stays, keep its right padding below 900px — it reserves the seal's
corner (`.home-hero__top .eyebrow` in `assets/css/style.css`).

**Done when:** the hero says each thing once.

---

## 5. Motion toggle — temporary home in the footer

The mounted-knight motion toggle was moved out of the header and parked
next to the theme toggle. The two are visibly mismatched: the knight
needs roughly 34px to stay legible (below that the horse, rider and sword
fuse into one smudge), while the theme toggle is a 24px chip sized to
match the social icons.

Relevant: `.site-footer__controls`, `.site-footer__motion-toggle` and
`.site-footer__theme-toggle` in `assets/css/style.css`, and the REVISIT
note in `_includes/footer.html`.

The desktop footer is a three-column grid that places by source order, so
the wrapper must stay a single direct child or the layout wraps.

Options: grow both to a shared size; give the knight its own spot; make
the footer controls their own sized cluster; or simplify the artwork so
it survives at 24px (probably loses the horse).

**Done when:** the pair looks deliberate, and the REVISIT note is gone.

---

## 6. Second visual direction — "psychedelic cat" branch

Anthony flagged a reference he liked — a psychedelic cat in purple and
black line work — and explicitly did not want it copied. Parked for a
separate branch, not this one.

**Blocked:** needs the reference itself (link or screenshot) before
anything can start. "Inspired by, not copying" is a distinction worth
getting right from the actual source rather than from a description.

---

## Notes for whoever picks this up

- Work happens on `Design-Audit`, then merges to `main`. `main` is the
  live site — merging publishes immediately.
- Before any merge, check for scaffolding that was written for Anthony
  rather than for visitors:

      grep -rn 'draft-flag\|verify-list\|draft-mark' --include=*.html . | grep -v _site

  Today that returns High5 only, which is item 1 above.
- Local preview: build, then serve `_site`.

      bundle exec ruby /opt/rbenv/versions/3.3.6/lib/ruby/gems/3.3.0/gems/jekyll-4.4.1/exe/jekyll build
      cd _site && python3 -m http.server 8899
