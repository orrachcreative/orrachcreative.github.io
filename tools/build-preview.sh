#!/usr/bin/env bash
#
# Build a shareable copy of the site that works when hosted somewhere other
# than a domain root, and that opens without the WIP password gate.
#
# Writes to _preview/ (gitignored). Never touches _site/ or anything in the
# repo, so the real build and the real gate are always left alone.
#
#   tools/build-preview.sh
#   cd _preview && python3 -m http.server 8900
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$REPO/_preview"
cd "$REPO"

echo "1/4 building"
# `bundle exec jekyll` fails on some setups where the binstub isn't linked,
# so fall back to invoking the gem's own executable directly.
if bundle exec jekyll build >/dev/null 2>&1; then
  :
else
  JEKYLL_EXE="$(bundle show jekyll 2>/dev/null || bundle info jekyll --path 2>/dev/null)/exe/jekyll"
  [ -f "$JEKYLL_EXE" ] || { echo "ERROR: cannot find the jekyll executable. Run 'bundle install' first." >&2; exit 1; }
  bundle exec ruby "$JEKYLL_EXE" build >/dev/null
fi

echo "2/4 copying to _preview"
rm -rf "$OUT"
cp -r "$REPO/_site" "$OUT"

echo "3/4 relativizing paths (the site assumes a domain root; previews are sub-pathed)"
python3 "$REPO/tools/relativize.py" "$OUT"

echo "4/4 stripping the WIP password gate"
# Guard: only ever write the shim inside _preview. If this line is edited to
# point at the repo's own assets/, the live site loses its gate.
case "$OUT" in
  "$REPO/_preview") cp "$REPO/tools/gate-shim.js" "$OUT/assets/js/gate.js" ;;
  *) echo "ERROR: refusing to write the gate shim outside _preview" >&2; exit 1 ;;
esac

echo "done -> $OUT"
