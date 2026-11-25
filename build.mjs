#!/usr/bin/env node
// Builds the Ace’s Side website into ./public. Zero dependencies: Node 20+ only.
//
//   node build.mjs                      normal build (search engines allowed)
//   SITE_INDEXING=off node build.mjs    soft launch: noindex on every page, robots.txt disallows all
//
// Netlify runs this on every deploy (see netlify.toml). The generated ./public folder is also
// committed, so the site can be deployed by dragging that folder into Netlify.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEmblem, renderPage } from './src/layout.mjs';
import { parseToml } from './tools/toml-lite.mjs';
import { leaks } from './tools/guard.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'public');
const config = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));
const indexing = (process.env.SITE_INDEXING ?? 'on').toLowerCase() !== 'off';

const write = (rel, data) => {
  const f = join(out, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, data);
  return f;
};
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// 1. Fonts, then CSS. File names carry a content hash so they can be cached for a year.
const fonts = {};
for (const f of readdirSync(join(root, 'src/assets/fonts')).filter((n) => n.endsWith('.woff2'))) {
  const key = f.replace(/\.woff2$/, '');
  const buf = readFileSync(join(root, 'src/assets/fonts', f));
  const url = `/assets/fonts/${key}.${hash(buf)}.woff2`;
  write(url.slice(1), buf);
  fonts[key] = url;
}
for (const f of readdirSync(join(root, 'src/assets/fonts')).filter((n) => n.startsWith('LICENSE'))) {
  copyFileSync(join(root, 'src/assets/fonts', f), join(out, 'assets/fonts', f));
}
let css = readFileSync(join(root, 'src/css/main.css'), 'utf8').replace(/\{\{font:([\w-]+)\}\}/g, (_, k) => {
  if (!fonts[k]) throw new Error(`CSS references unknown font "${k}"`);
  return fonts[k];
});
const cssUrl = `/assets/css/main.${hash(css)}.css`;
write(cssUrl.slice(1), css);

// 2. Static root files: favicons, app icons, social image.
for (const f of readdirSync(join(root, 'src/assets/static'))) copyFileSync(join(root, 'src/assets/static', f), join(out, f));

// 3. Pages.
const ctx = { config, indexing, emblem: loadEmblem(root), assets: { css: cssUrl, fonts } };
const pages = [];
for (const f of readdirSync(join(root, 'src/pages')).filter((n) => n.endsWith('.mjs')).sort()) {
  const mod = (await import(pathToFileURL(join(root, 'src/pages', f)).href)).default;
  pages.push(...(Array.isArray(mod) ? mod : [mod]));
}
const problems = [];
for (const p of pages) {
  const body = p.body(ctx);
  const html = renderPage(ctx, { ...p, body, jsonld: typeof p.jsonld === 'function' ? p.jsonld(ctx) : p.jsonld });
  // A protected term must never reach a published page. Stops the deploy; never prints the term.
  if (leaks(html)) { problems.push(`${p.path}: contains a term the founders keep confidential (see tools/guard.mjs). Nothing was published.`); continue; }
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${p.path}: needs exactly one <h1>`);
  if (p.description.length > 160) problems.push(`${p.path}: description is ${p.description.length} chars (max 160)`);
  write(p.file || (p.path === '/' ? 'index.html' : `${p.path.slice(1)}index.html`), html);
}

// 4. Generated files.
const origin = config.origin;
const indexable = pages.filter((p) => !p.noindex);
write('robots.txt', indexing
  ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
  : `# Soft launch: this site is not yet open to search engines.\nUser-agent: *\nDisallow: /\n`);
if (indexing) {
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((p) => `<url><loc>${origin}${p.path}</loc><lastmod>${config.updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
}
// netlify.toml is the single source for headers and redirects. They are also written out as
// _headers / _redirects so a drag-and-drop deploy of just ./public is exactly as secure as a Git deploy.
const toml = parseToml(readFileSync(join(root, 'netlify.toml'), 'utf8'));
write('_headers', toml.headers.map((h) => {
  const values = { ...h.values };
  if (!indexing && h.for === '/*') values['X-Robots-Tag'] = 'noindex, nofollow';
  return `${h.for}\n${Object.entries(values).map(([k, v]) => `  ${k}: ${v}`).join('\n')}\n`;
}).join('\n'));
write('_redirects', toml.redirects.map((r) => `${r.from}  ${r.to}  ${r.status || 301}`).join('\n') + '\n');
write('site.webmanifest', JSON.stringify({
  name: config.name, short_name: config.name, description: config.description, start_url: '/', display: 'browser',
  background_color: '#444444', theme_color: '#444444',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n');
// 5. Report.
if (problems.length) {
  rmSync(out, { recursive: true, force: true }); // never leave a half-built site that could be dragged into Netlify
  console.error('Build problems:\n  ' + problems.join('\n  '));
  process.exit(1);
}
const count = (dir) => readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(join(dir, e.name)) : 1), 0);
console.log(`Built ${pages.length} pages, ${count(out)} files → public/  (indexing ${indexing ? 'ON' : 'OFF: soft launch'})`);
