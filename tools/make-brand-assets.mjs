#!/usr/bin/env node
// Rebuilds every brand file from the one canonical source: brand/aces-side-emblem.svg
// (the Emblem, restored from Appendix A of the Brand Book).
//
//   node tools/make-brand-assets.mjs
//
// Writes SVG masters to brand/ and site icons / social image to src/assets/static/.
// Needs Playwright (Chromium) only for the PNG exports. The normal site build does not.

import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const COLOR = { charcoal: '#444444', stone: '#A8A59F', bone: '#F7F1E8', void: '#050505', beacon: '#E8B04A' };

const src = readFileSync(join(root, 'brand/aces-side-emblem.svg'), 'utf8');
const d = src.match(/ d="([^"]+)"/)?.[1];
if (!d) throw new Error('Emblem path not found in brand/aces-side-emblem.svg');

const svg = (inner, size = 1024) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="${size}" height="${size}">${inner}</svg>\n`;
const mark = (fill, extra = '') => `<path fill="${fill}" fill-rule="evenodd"${extra} d="${d}"/>`;

// Superellipse (exponent 5): the "continuous corner" tile shape from the Brand Book.
function superellipse(n = 5, steps = 360) {
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t), s = Math.sin(t);
    const x = 512 + 512 * Math.sign(c) * Math.abs(c) ** (2 / n);
    const y = 512 + 512 * Math.sign(s) * Math.abs(s) ** (2 / n);
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}
const tile = (fill = COLOR.charcoal) => `<path fill="${fill}" d="${superellipse()}"/>`;
const square = (fill = COLOR.charcoal) => `<rect width="1024" height="1024" fill="${fill}"/>`;

// Medium weight on a transparent ground.
const emblem80 = (fill) => `<g transform="translate(102.4 102.4) scale(0.8)">${mark(fill)}</g>`;
// Bold small-size weight: every edge thickened outward by 3.5 units (stroke 7 centred on the edge).
const bold = (fill) => mark(fill, ` stroke="${fill}" stroke-width="7" stroke-linejoin="round"`);
// Favicon: the bold Emblem enlarged to fill the tile, centred on its own bounding box.
const faviconEmblem = (fill) =>
  `<g transform="translate(512 512) scale(1.28) translate(-512 -509)">${bold(fill)}</g>`;

const masters = {
  'brand/aces-side-medium-mark.svg': svg(mark(COLOR.stone)),
  'brand/mark-ink.svg': svg(mark(COLOR.charcoal)),
  'brand/mark-cream.svg': svg(mark(COLOR.bone)),
  'brand/aces-side-icon-small.svg': svg(bold(COLOR.stone)),
  'brand/aces-side-medium-tile.svg': svg(square() + emblem80(COLOR.stone)),
  'brand/aces-side-app-tile.svg': svg(tile() + emblem80(COLOR.stone)),
  'src/assets/static/favicon.svg': svg(tile() + faviconEmblem(COLOR.stone), 64),
};
for (const [file, body] of Object.entries(masters)) {
  mkdirSync(dirname(join(root, file)), { recursive: true });
  writeFileSync(join(root, file), body);
  console.log('wrote', file);
}

// ---- PNG exports (Chromium) ------------------------------------------------
const { chromium } = require('playwright');
const work = mkdtempSync(join(tmpdir(), 'acesside-brand-'));
const fontDir = pathToFileURL(join(root, 'src/assets/fonts') + '/').href;
const out = (f) => join(root, 'src/assets/static', f);

async function shot(page, html, file, w, h, { transparent = false, scale = 1 } = {}) {
  const f = join(work, 'p.html');
  writeFileSync(f, html);
  await page.setViewportSize({ width: w, height: h });
  await page.goto(pathToFileURL(f).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
}
const wrapSvg = (inner, size) =>
  `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg(inner, size)}`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

// Brand-spec app tile (superellipse, transparent corners) for the web manifest.
await shot(page, wrapSvg(tile() + emblem80(COLOR.stone), 192), out('icon-192.png'), 192, 192, { transparent: true });
await shot(page, wrapSvg(tile() + emblem80(COLOR.stone), 512), out('icon-512.png'), 512, 512, { transparent: true });
// Maskable: full-bleed so the OS can apply its own mask. Emblem sits well inside the safe zone.
await shot(page, wrapSvg(square() + emblem80(COLOR.stone), 512), out('icon-maskable-512.png'), 512, 512);
// iOS applies its own rounded mask, so it gets a full-bleed square.
await shot(page, wrapSvg(square() + emblem80(COLOR.stone), 180), out('apple-touch-icon.png'), 180, 180);
// Favicon sizes (bold Emblem), packed into one .ico.
const icoParts = [];
for (const s of [16, 32, 48]) {
  const f = join(work, `fav-${s}.png`);
  await shot(page, wrapSvg(tile() + faviconEmblem(COLOR.stone), s), f, s, s, { transparent: true });
  icoParts.push(f);
}
execFileSync('convert', [...icoParts, out('favicon.ico')]);

// Social share image, 1200 x 630.
const og = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:M;src:url(${fontDir}michroma-400.woff2) format('woff2')}
@font-face{font-family:I;src:url(${fontDir}inter-var.woff2) format('woff2');font-weight:100 900}
html,body{margin:0;width:1200px;height:630px;background:${COLOR.charcoal};overflow:hidden}
.wrap{position:absolute;inset:0;display:flex;align-items:center;padding:0 84px;gap:56px}
svg{width:300px;height:300px;flex:none}
.name{font:400 24px M;letter-spacing:.12em;color:${COLOR.bone};margin:0 0 28px}
h1{font:400 41px/1.32 M;letter-spacing:.12em;color:${COLOR.bone};margin:0;white-space:nowrap}
.rule{width:96px;height:5px;background:${COLOR.beacon};margin:34px 0 28px}
p{font:400 26px/1.45 I;color:${COLOR.bone};margin:0;max-width:620px}
</style><div class="wrap">${svg(mark(COLOR.stone), 300)}
<div><p class="name">ACE’S SIDE</p><h1>WHEN THE<br>WORLD NEEDS US,<br>WE ARE HERE.</h1><div class="rule"></div>
<p>A leadership alliance that answers when the world needs it.</p></div></div>`;
await shot(page, og, out('og-image.png'), 1200, 630);

await browser.close();
rmSync(work, { recursive: true, force: true });
for (const f of ['favicon.ico', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'og-image.png']) {
  console.log('wrote src/assets/static/' + f);
}
