# tools

Development helpers. Excluded from the Jekyll build (see `_config.yml`), so
nothing in here is ever published.

## build-preview.sh

Builds a copy of the site into `_preview/` (gitignored) that can be hosted
somewhere other than a domain root, with the WIP password gate removed.

```sh
tools/build-preview.sh
cd _preview && python3 -m http.server 8900
```

Two things it fixes that a plain `jekyll build` does not:

- **Relative paths.** The site emits root-absolute URLs (`/work/`,
  `/assets/css/style.css`) because it assumes it is served from a domain
  root. Hosted under a sub-path, every link and stylesheet 404s.
  `relativize.py` rewrites them per file depth.
- **The password gate.** `gate-shim.js` replaces `assets/js/gate.js` with the
  same `reveal()` the real gate runs on a correct password, so a preview
  opens straight onto the site.

**It never writes to `_site/` or to the repo's own `assets/`.** The gate shim
is only ever copied inside `_preview/`, and the script refuses to run if that
path is changed. The live site's gate is untouched.

## export-frames.js

Full-page PNGs of all 11 pages at 1440 / 834 / 390, for dropping into Figma
as reference.

```sh
npm i playwright && npx playwright install chromium
bundle exec jekyll serve          # in another terminal
node tools/export-frames.js
```

Run it **locally, not in a sandbox** — the point is that `fonts.googleapis.com`
is reachable, so Big Shoulders, Archivo, Space Grotesk and Fraunces actually
load. It aborts if no webfonts registered, rather than quietly exporting 33
frames in fallback faces.

Output lands in `figma-frames/` at 1x, so each image drops into a Figma frame
of the same width at 100%.
