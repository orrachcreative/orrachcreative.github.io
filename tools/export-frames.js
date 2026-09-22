#!/usr/bin/env node
/*
 * Export full-page PNGs of every page at Desktop / Tablet / Mobile, for
 * dropping into Figma as reference.
 *
 * Run it on your own machine, not in a sandbox: the point of running it
 * locally is that fonts.googleapis.com is reachable, so Big Shoulders,
 * Archivo, Space Grotesk and Fraunces actually load. It refuses to write
 * anything if they haven't.
 *
 *   npm i playwright && npx playwright install chromium
 *   bundle exec jekyll serve        # in another terminal
 *   node export-frames.js
 *
 * Output: ./figma-frames/<page>-<label>-<width>.png at 1x, so each image
 * drops into a Figma frame of the same width at 100%.
 */
const { chromium } = require('playwright');
const fs = require('fs');

const BASE   = process.env.BASE || 'http://localhost:4000';
const OUTDIR = process.env.OUTDIR || 'figma-frames';
const GATE_KEY = 'aoc-preview-unlocked';   // set so the WIP gate doesn't block the shot

const PAGES = [
  ['home','/'], ['work','/work/'], ['afordal','/work/afordal/'],
  ['homeasap','/work/homeasap/'], ['high5','/work/high5/'],
  ['about','/about/'], ['projects','/projects/'],
  ['eagle-quality','/projects/eagle-quality/'], ['task-yeti','/projects/task-yeti/'],
  ['logos','/projects/logos/'], ['illustrations','/projects/illustrations/'],
];
const WIDTHS = [['desktop',1440], ['tablet',834], ['mobile',390]];
const FONTS  = ['Big Shoulders Text','Archivo','Space Grotesk','Fraunces'];

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const b = await chromium.launch();

  // Fail loudly rather than quietly exporting 33 images in the wrong typeface.
  {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await p.goto(BASE, { waitUntil: 'load' });
    await p.waitForTimeout(2500);
    const n = await p.evaluate(async () => { await document.fonts.ready; return document.fonts.size; });
    if (n === 0) {
      console.error('\nABORT: no @font-face rules loaded — the Google Fonts stylesheet did not arrive.');
      console.error('Every export would be in fallback system faces. Check network, then re-run.\n');
      await b.close(); process.exit(1);
    }
    console.log(`fonts ok (${n} faces registered): ${FONTS.join(', ')}\n`);
  }

  for (const [name, path] of PAGES) {
    for (const [label, w] of WIDTHS) {
      const ctx = await b.newContext({ viewport: { width: w, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      await ctx.addInitScript(k => { try { sessionStorage.setItem(k, '1'); } catch (e) {} }, GATE_KEY);
      const p = await ctx.newPage();
      await p.goto(BASE + path, { waitUntil: 'load' });
      await p.waitForTimeout(900);
      await p.evaluate(async () => { await document.fonts.ready; });
      // Settle motion, and force scroll-reveal elements visible so a full-page
      // shot doesn't capture half the page still faded out.
      await p.evaluate(() => {
        document.documentElement.setAttribute('data-motion', 'off');
        document.querySelectorAll('.kinetic-word,[class*="reveal"],[class*="fade"]')
          .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      });
      await p.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(500);
      const file = `${OUTDIR}/${name}-${label}-${w}.png`;
      await p.screenshot({ path: file, fullPage: true, animations: 'disabled' });
      console.log('  ' + file);
      await ctx.close();
    }
  }
  await b.close();
  console.log('\ndone — ' + PAGES.length * WIDTHS.length + ' frames in ./' + OUTDIR);
})();
