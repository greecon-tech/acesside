#!/usr/bin/env node
// Quality gate for the built site (./public). Run after `node build.mjs`:
//
//   npm install && npx playwright install chromium     (once)
//   npm run verify
//   SHOTS=/some/dir npm run verify                     also saves screenshots
//
// It serves ./public exactly as Netlify will (same headers, including the real Content-Security-Policy)
// and checks every page for: CSP violations, requests to other origins, console errors, horizontal
// overflow at 320px, axe-core accessibility (WCAG 2.2 A/AA + best practice), broken links and anchors,
// and the Brand Book rules (name spelling, banned words, one Beacon star per page, palette contrast).

import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve.mjs';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const { chromium } = require('playwright');
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
let checks = 0;
const ok = (cond, where, msg) => { checks++; if (!cond) fail(where, msg); };

// ---- 1. Palette contrast (Brand Book "Contrast rules") ---------------------------------------
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const C = { charcoal: '#444444', stone: '#A8A59F', bone: '#F7F1E8', void: '#050505', beacon: '#E8B04A' };
const palette = [
  ['bone on void (main text)', C.bone, C.void, 15],
  ['void on bone (text on light bands)', C.void, C.bone, 15],
  ['void on beacon (button label)', C.void, C.beacon, 7],
  ['beacon on void (signal, focus ring)', C.beacon, C.void, 7],
  ['stone on void (secondary text)', C.stone, C.void, 7],
];
console.log('Palette contrast');
for (const [label, a, b, min] of palette) {
  const r = ratio(a, b);
  console.log(`  ${r.toFixed(2)}:1  ${label}  (needs ${min})`);
  ok(r >= min, 'palette', `${label} is ${r.toFixed(2)}:1, needs ${min}`);
}

// ---- 2. Static checks on the built HTML -------------------------------------------------------
const pageFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) pageFiles.push(p);
  }
})(pub);
const urlOf = (f) => '/' + f.slice(pub.length + 1).replace(/index\.html$/, '');
const html = Object.fromEntries(pageFiles.map((f) => [urlOf(f), readFileSync(f, 'utf8')]));
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&shy;/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ');

const BANNED = /\b(avengers?|marvel|assemble|armies|army|soldiers?|troops?|empire|conquest|dominion|save the world|heroes|super-?heroes?|superpowers?|mightiest|destiny|awakened|the chosen|chosen (one|ones|few|people))\b/i;
// Founders' decision (25 Nov 2026): the Doctrine is not published. There is no /doctrine/ page, no link to
// one, and the word does not appear anywhere the site serves. Everything else on the site is public.
const CONFIDENTIAL = /\bdoctrines?\b/i;
const MISSPELLED = /\bAces Side\b|\bAce Side\b|\bAces[’'] Side\b|AcesSide|\bAce's Side\b/;
const ids = {};
for (const [u, h] of Object.entries(html)) ids[u] = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const redirects = new Set([...readFileSync(join(root, 'netlify.toml'), 'utf8').matchAll(/from = "([^"]+)"/g)].map((m) => m[1]));
const exists = (p) => p in html || existsSync(join(pub, p)) && !/\/$/.test(p) || redirects.has(p);

for (const [u, h] of Object.entries(html)) {
  const t = text(h);
  ok(!BANNED.test(t), u, `banned word in copy: ${t.match(BANNED)?.[0]}`);
  ok(!BANNED.test(h), u, `banned word in markup: ${h.match(BANNED)?.[0]}`);
  ok(!CONFIDENTIAL.test(t), u, `the Doctrine must not be mentioned: ${t.match(CONFIDENTIAL)?.[0]}`);
  ok(!CONFIDENTIAL.test(h), u, `the Doctrine must not be mentioned: ${h.match(CONFIDENTIAL)?.[0]}`);
  ok(!/user-scalable\s*=\s*no|maximum-scale/.test(h), u, 'viewport must allow pinch zoom');
  ok(/viewport-fit=cover/.test(h), u, 'viewport-fit=cover missing (notched phones)');
  ok(!MISSPELLED.test(t), u, `name misspelled: ${t.match(MISSPELLED)?.[0]}`);
  ok(!/\w'\w/.test(t), u, `straight apostrophe in visible text: ${t.match(/.{15}\w'\w.{10}/)?.[0]}`);
  ok(!/\sstyle="/.test(h), u, 'inline style attribute (blocked by CSP)');
  ok(!/\son[a-z]+="/.test(h), u, 'inline event handler (blocked by CSP)');
  ok(!/<script(?![^>]*application\/ld\+json)[^>]*>/.test(h), u, 'unexpected script element: the site ships no JavaScript');
  ok((h.match(/class="(btn__star|signal-star)"/g) || []).length <= 1, u, 'more than one Beacon star accent on a page');
  ok(/<html lang="en">/.test(h), u, 'missing lang');
  ok(/<title>[^<]{3,}<\/title>/.test(h), u, 'missing title');
  ok(/<meta name="description" content="[^"]{20,}"/.test(h), u, 'missing description');
  ok(!/<img\b(?![^>]*\balt=)/.test(h), u, 'img without alt');
  // internal links and anchors
  for (const [, href] of h.matchAll(/\shref="([^"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const [path0, frag] = href.split('#');
    const path = path0 || u;
    if (path.startsWith('/assets/') || /\.(png|ico|svg|txt|xml|webmanifest)$/.test(path) || path.startsWith('/.well-known/')) { ok(existsSync(join(pub, path)), u, `missing file ${path}`); continue; }
    ok(exists(path), u, `broken link ${href}`);
    if (frag && !redirects.has(path)) ok(ids[path]?.has(frag), u, `anchor #${frag} not found on ${path}`);
  }
  // The alliance reaches out; nobody writes in. No channel for visitors to contact it may exist.
  ok(!/<(form|input|textarea|select)\b/i.test(h), u, 'the site must have no form or input: there is no way to contact the alliance');
  ok(!/data-netlify|netlify-honeypot/.test(h), u, 'Netlify Forms attribute found');
  ok(!/href="tel:|href="sms:|href="https?:\/\/(wa\.me|t\.me|api\.whatsapp)/i.test(h), u, 'phone or messaging link found');
  ok(!/href="\/contact/i.test(h), u, 'link to a contact page');
  const mails = [...h.matchAll(/href="mailto:([^"?]+)/gi)].map((m) => m[1].toLowerCase());
  if (u === '/privacy/') ok(mails.length > 0 && mails.every((m) => m.startsWith('privacy@')), u, 'the privacy notice must give only the data-protection address');
  else ok(mails.length === 0, u, `email link outside the privacy notice: ${mails.join(', ')}`);
}
const hdr = existsSync(join(pub, '_headers')) ? readFileSync(join(pub, '_headers'), 'utf8') : '';
ok(/Content-Security-Policy: default-src 'self'/.test(hdr) && /Strict-Transport-Security: max-age=/.test(hdr), 'site', '_headers is missing the CSP or HSTS (drag-and-drop deploys would be unprotected)');
const redirectsFile = existsSync(join(pub, '_redirects')) ? readFileSync(join(pub, '_redirects'), 'utf8') : '';
ok(/^\/doctrine\s+\/\s+301/m.test(redirectsFile) && /^\/doctrine\/\*\s+\/\s+301/m.test(redirectsFile) && /^\/contact\s+\/\s+301/m.test(redirectsFile), 'site', '/doctrine and /contact must redirect to the home page in _redirects');
for (const f of ['robots.txt', 'sitemap.xml', 'site.webmanifest']) {
  const body = existsSync(join(pub, f)) ? readFileSync(join(pub, f), 'utf8') : '';
  ok(!CONFIDENTIAL.test(body), f, `confidential term in ${f}: ${body.match(CONFIDENTIAL)?.[0]}`);
}
for (const gone of ['doctrine', 'contact', 'thanks', '.well-known']) ok(!existsSync(join(pub, gone)), 'site', `/${gone}/ must not be published`);
const titles = Object.values(html).map((h) => h.match(/<title>([^<]*)/)[1]);
ok(new Set(titles).size === titles.length, 'site', 'duplicate <title> values');

// ---- 3. Browser checks -------------------------------------------------------------------------
const server = await startServer(8899);
const base = 'http://localhost:8899';
const browser = await chromium.launch();
const shotsDir = process.env.SHOTS;
if (shotsDir) mkdirSync(shotsDir, { recursive: true });
const urls = Object.keys(html).sort();
console.log(`\nBrowser checks on ${urls.length} pages (desktop 1280px, phone 320px)`);

for (const [label, vp] of [['desktop', { width: 1280, height: 900 }], ['phone', { width: 320, height: 640 }]]) {
  const context = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  for (const u of urls) {
    const where = `${u} [${label}]`;
    const page = await context.newPage();
    const problems = [];
    const foreign = [];
    page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) problems.push(`console ${m.type()}: ${m.text()}`); });
    page.on('pageerror', (e) => problems.push(`page error: ${e.message}`));
    page.on('requestfailed', (r) => problems.push(`request failed: ${r.url()}`));
    page.on('request', (r) => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) foreign.push(r.url()); });
    page.on('response', (r) => { if (r.status() >= 400 && !u.endsWith('404.html')) problems.push(`HTTP ${r.status()}: ${r.url()}`); });
    const res = await page.goto(base + u, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    ok(res.status() === 200, where, `HTTP ${res.status()}`);
    const h = res.headers();
    ok(/default-src 'self'/.test(h['content-security-policy'] || ''), where, 'CSP header missing');
    ok(h['x-content-type-options'] === 'nosniff', where, 'nosniff header missing');
    ok(/max-age=\d+/.test(h['strict-transport-security'] || ''), where, 'HSTS header missing');
    ok(foreign.length === 0, where, `requests to other origins: ${foreign.join(', ')}`);
    for (const p of problems) fail(where, p);
    checks++;
    const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, h1: document.querySelectorAll('h1').length }));
    ok(m.sw <= m.iw, where, `horizontal overflow: content ${m.sw}px wide in a ${m.iw}px window`);
    ok(m.h1 === 1, where, `${m.h1} <h1> elements`);
    // Brand Book: never more than two typefaces on one page.
    const faces = await page.evaluate(() => {
      const used = new Set();
      for (const el of document.body.querySelectorAll('*')) {
        if (el.closest('.sprite, .vh') || !el.childNodes.length) continue;
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        used.add(getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim());
      }
      return [...used];
    });
    ok(faces.length <= 2, where, `more than two typefaces on the page: ${faces.join(', ')}`);
    // axe-core against WCAG 2.2 A/AA and best practice
    await page.evaluate(axeSource);
    const axe = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
    for (const v of axe.violations) fail(where, `axe ${v.id} (${v.impact}): ${v.help} → ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
    checks++;
    if (shotsDir && ['/', '/privacy/', '/legal/'].includes(u)) {
      await page.waitForTimeout(label === 'desktop' && u === '/' ? 5200 : 200); // let the hero animation finish
      await page.screenshot({ path: join(shotsDir, `${label}${u.replace(/\//g, '_') || '_'}png`.replace('_png', '.png')), fullPage: true });
    }
    await page.close();
  }
  await context.close();
}

// ---- Mobile: six phone widths, touch emulation, real device pixel ratio ------------------------
const MOBILE_WIDTHS = [320, 360, 375, 390, 412, 430];
console.log(`Mobile checks at ${MOBILE_WIDTHS.join(', ')} px (touch, 2x)`);
for (const w of MOBILE_WIDTHS) {
  const context = await browser.newContext({ viewport: { width: w, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  for (const u of urls) {
    const where = `${u} [mobile ${w}px]`;
    const page = await context.newPage();
    await page.goto(base + u, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const visible = (el) => el.getClientRects().length > 0 && !el.closest('.hp, .vh');
      const sel = 'a.btn, button, .nav a, .site-footer a, .brand, select, textarea, label.choice, input:not([type=hidden]):not([type=checkbox]):not([type=radio])';
      const small = [...document.querySelectorAll(sel)].filter(visible)
        .map((el) => ({ n: (el.className || el.tagName) + ' "' + (el.textContent || el.name || '').trim().slice(0, 24) + '"', h: el.getBoundingClientRect().height }))
        .filter((x) => x.h < 43.5);
      const zoomy = [...document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]), select, textarea')]
        .filter(visible).filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16).map((el) => el.name);
      return { sw: document.documentElement.scrollWidth, iw: window.innerWidth, small, zoomy };
    });
    ok(m.sw <= m.iw, where, `horizontal overflow: ${m.sw}px content in ${m.iw}px`);
    ok(m.small.length === 0, where, `tap targets under 44px: ${m.small.map((x) => `${x.n} ${x.h.toFixed(0)}px`).join(', ')}`);
    ok(m.zoomy.length === 0, where, `form text under 16px makes iOS zoom in: ${m.zoomy.join(', ')}`);
    await page.close();
  }
  await context.close();
}
// First screen: on common small phones the Emblem, the promise and the description must be visible without scrolling.
for (const [w, h] of [[375, 667], [360, 640], [390, 844]]) {
  const context = await browser.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => ({ lead: document.querySelector('.hero .lead').getBoundingClientRect().bottom }));
  ok(r.lead <= h, `home [first screen ${w}x${h}]`, `the promise and description end at ${r.lead.toFixed(0)}px, below the ${h}px fold`);
  await context.close();
}

// ---- Navigation menu: a native <details> disclosure (no JavaScript) --------------------------------
{
  const links = (page) => page.locator('.menu li a');
  const visible = async (page) => Promise.all([0, 1, 2, 3].map((i) => links(page).nth(i).isVisible()));
  // Phone: closed by default behind a Menu button; opens on tap; each link is a big tap target.
  const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const mp = await phone.newPage();
  await mp.goto(base + '/', { waitUntil: 'networkidle' });
  ok(await mp.locator('.menu summary').isVisible(), 'menu [phone]', 'the Menu button must be visible on a phone');
  ok((await visible(mp)).every((v) => !v), 'menu [phone]', 'the links must be hidden until the Menu is opened');
  await mp.tap('.menu summary');
  ok((await visible(mp)).every(Boolean), 'menu [phone]', 'tapping Menu must show all four links');
  const heights = await links(mp).evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
  ok(heights.every((h) => h >= 44), 'menu [phone]', `menu links are under 44px tall: ${heights.join(', ')}`);
  ok(await mp.locator('.site-header').evaluate((h) => h.getBoundingClientRect().height <= 70), 'menu [phone]', 'the closed header must be a single row');
  await mp.tap('.menu a[href="/divisions/"]');
  await mp.waitForURL(/\/divisions\/$/);
  ok((await mp.locator('h1').innerText()).length > 0, 'menu [phone]', 'a menu link did not open its page');
  await phone.close();
  // Desktop: the links sit in the header row, with no Menu button.
  const desk = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const dp = await desk.newPage();
  await dp.goto(base + '/', { waitUntil: 'networkidle' });
  ok(!(await dp.locator('.menu summary').isVisible()), 'menu [desktop]', 'no Menu button on a wide screen');
  ok((await visible(dp)).every(Boolean), 'menu [desktop]', 'all four links must show in the header row');
  await desk.close();
  // Keyboard: Tab reaches the Menu button, Enter opens it, Tab then reaches the first link.
  const kb = await browser.newContext({ viewport: { width: 700, height: 700 } });
  const kp = await kb.newPage();
  await kp.goto(base + '/', { waitUntil: 'networkidle' });
  for (let i = 0; i < 3; i++) await kp.keyboard.press('Tab');
  ok(await kp.evaluate(() => document.activeElement?.tagName === 'SUMMARY'), 'menu [keyboard]', 'the Menu button is not the third Tab stop (skip link, brand, menu)');
  await kp.keyboard.press('Enter');
  ok(await kp.evaluate(() => document.querySelector('.menu').open), 'menu [keyboard]', 'Enter must open the menu');
  await kp.keyboard.press('Tab');
  ok(await kp.evaluate(() => document.activeElement?.textContent.trim() === 'Divisions'), 'menu [keyboard]', 'Tab after opening must reach the first link');
  await kb.close();
}

// Keyboard: the first Tab stop on every page must be the skip link, and Enter must move focus to <main>.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(base + '/');
  await page.keyboard.press('Tab');
  ok(await page.evaluate(() => document.activeElement?.classList.contains('skip')), 'keyboard', 'first Tab stop is not the skip link');
  await page.keyboard.press('Enter');
  ok(await page.evaluate(() => document.activeElement?.id === 'main'), 'keyboard', 'skip link does not move focus to main');
  await context.close();
}

// Reduced motion: the Emblem must be fully visible with no animation.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base + '/');
  const r = await page.evaluate(() => [...document.querySelectorAll('.hero-emblem use')].map((u) => [getComputedStyle(u).animationName, getComputedStyle(u).opacity]));
  ok(r.length === 4 && r.every(([a, o]) => a === 'none' && o === '1'), 'motion', `reduced-motion emblem not static: ${JSON.stringify(r)}`);
  await context.close();
}

await browser.close();
server.close();

console.log(`\n${checks} checks run.`);
if (failures.length) {
  console.error(`\n${failures.length} FAILED:\n  - ${failures.join('\n  - ')}`);
  process.exit(1);
}
console.log('All checks passed.');
