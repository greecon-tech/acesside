// Page shell, header, footer and small UI builders. No dependencies.
// Everything here renders to plain HTML strings. The site ships no JavaScript.

import { readFileSync } from 'node:fs';

export const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// Who runs the site, in plain words. Until the founders register an entity, say so honestly.
export const operator = (config) => {
  const e = config.entity || {};
  if (!e.legalName) return 'Ace’s Side is in its founding stage and is being set up as a legal entity. Until that is complete, the site is run by its founders.';
  return `This site is run by ${e.legalName}${e.country ? `, registered in ${e.country}` : ''}${e.address ? `, ${e.address}` : ''}.`;
};

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- The Emblem --------------------------------------------------------------------------
// brand/aces-side-emblem.svg is the single source. Its path has four sub-paths, in this order:
// spire, star, left arc, right arc. They are split only so the hero can animate them in the
// order the Brand Book asks for (star, then spire, then the ring). The geometry is untouched.
export function loadEmblem(root) {
  const svg = readFileSync(`${root}/brand/aces-side-emblem.svg`, 'utf8');
  const d = svg.match(/ d="([^"]+)"/)?.[1];
  const parts = d?.split(/(?=M)/).filter(Boolean);
  if (!parts || parts.length !== 4) throw new Error('Emblem: expected 4 sub-paths (spire, star, left arc, right arc)');
  const [spire, star, arcL, arcR] = parts;
  return { all: d, spire, star, arcL, arcR };
}

// One copy of the geometry per page. The four parts are defined once; the full Emblem, the star
// alone, the hero and every small mark reference them. The bold small-size weight (below 64 px) is
// the same shape with every edge thickened outward by 3.5 units, done in CSS with a stroke (.bold).
const sprite = (e) => `<svg class="sprite" aria-hidden="true" focusable="false">
<defs>
<path id="p-spire" fill-rule="evenodd" d="${e.spire}"/>
<path id="p-star" fill-rule="evenodd" d="${e.star}"/>
<path id="p-arc-l" fill-rule="evenodd" d="${e.arcL}"/>
<path id="p-arc-r" fill-rule="evenodd" d="${e.arcR}"/>
</defs>
<symbol id="emblem" viewBox="0 0 1024 1024"><use href="#p-spire"/><use href="#p-star"/><use href="#p-arc-l"/><use href="#p-arc-r"/></symbol>
<symbol id="star" viewBox="240 597 544 244"><use href="#p-star"/></symbol>
</svg>`;

// Medium weight, for 64 px and larger. Animated once, slowly: star, then spire, then the ring closes.
export const heroEmblem = () => `<svg class="hero-emblem" viewBox="0 0 1024 1024" role="img" aria-label="The Ace’s Side Emblem: a spire, a broken ring and a four-point star">
<use class="em-spire" href="#p-spire"/>
<use class="em-star" href="#p-star"/>
<use class="em-arc-l" href="#p-arc-l"/>
<use class="em-arc-r" href="#p-arc-r"/>
</svg>`;

// Rank marks from the Brand Book: Initiate = outline star (Stone), Member = solid star (Stone),
// Ace = solid star (Beacon), Council = Beacon star inside a closed ring.
export function rankMark(kind) {
  const label = { initiate: 'Initiate mark: outline star', member: 'Member mark: solid star', ace: 'Ace mark: solid Beacon star', council: 'Council mark: Beacon star inside a closed ring' }[kind];
  const star = (cls, x, y, w, h) => `<use class="${cls}" href="#star" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const inner = {
    initiate: star('rank rank--outline', 102, 102, 435, 195),
    member: star('rank rank--stone', 102, 102, 435, 195),
    ace: star('rank rank--beacon', 102, 102, 435, 195),
    council: `<circle class="rank-ring" cx="320" cy="200" r="190"/>${star('rank rank--beacon', 167, 131, 305, 137)}`,
  }[kind];
  return `<svg class="rank-mark" viewBox="0 0 640 400" role="img" aria-label="${label}">${inner}</svg>`;
}

// ---- Navigation ----------------------------------------------------------------------------
const NAV = [
  ['/doctrine/', 'Doctrine'],
  ['/divisions/', 'Divisions'],
  ['/call/', 'The Call'],
  ['/membership/', 'Membership'],
  ['/accountability/', 'Accountability'],
  ['/contact/', 'Contact'],
];
const FOOT_SITE = [
  ['/legal/', 'Legal notice'],
  ['/privacy/', 'Privacy'],
  ['/accessibility/', 'Accessibility'],
];

// ---- Small builders ---------------------------------------------------------------------------
export const btn = (href, label, kind = 'primary', { star = false } = {}) =>
  `<a class="btn btn--${kind}" href="${href}">${star ? '<svg class="btn__star" aria-hidden="true" focusable="false"><use href="#star"/></svg>' : ''}<span>${label}</span></a>`;

export const pageHero = ({ eyebrow, title, lead, status }) => `<section class="band band--charcoal page-hero">
<div class="wrap">
<p class="eyebrow">${esc(eyebrow)}</p>
<h1 class="display h1">${title}</h1>
<div class="rule" aria-hidden="true"></div>
${lead ? `<p class="lead">${lead}</p>` : ''}
${status ? `<p class="status">${status}</p>` : ''}
</div></section>`;

// Form pieces. Forms post to Netlify Forms (see netlify.toml / docs/DEPLOY.md). No JavaScript needed.
const REQ = '<span class="req"> (required)</span>';
function control(f, id) {
  const common = `id="${id}" name="${f.name}"${f.required ? ' required' : ''}${f.autocomplete ? ` autocomplete="${f.autocomplete}"` : ''}${f.hint ? ` aria-describedby="${id}-hint"` : ''}`;
  if (f.type === 'textarea') return `<textarea ${common} rows="${f.rows || 7}" maxlength="${f.maxlength || 3000}"></textarea>`;
  if (f.type === 'select') {
    return `<select ${common}><option value="">Choose one</option>${f.options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`;
  }
  return `<input ${common} type="${f.type || 'text'}" maxlength="${f.maxlength || 200}">`;
}
export function field(form, f) {
  const id = `${form}-${f.name}`;
  if (f.type === 'radios') {
    return `<fieldset class="field field--group"><legend>${esc(f.label)}${f.required ? REQ : ''}</legend>
${f.hint ? `<p class="hint">${f.hint}</p>` : ''}
<div class="choices">${f.options.map((o) => `<label class="choice"><input type="radio" name="${f.name}" value="${esc(o)}"${f.required ? ' required' : ''}> <span>${esc(o)}</span></label>`).join('')}</div></fieldset>`;
  }
  return `<div class="field"><label for="${id}">${esc(f.label)}${f.required ? REQ : ' <span class="opt">(optional)</span>'}</label>
${f.hint ? `<p class="hint" id="${id}-hint">${f.hint}</p>` : ''}${control(f, id)}</div>`;
}
export const consent = (form, purpose) => `<div class="field field--consent"><label class="choice" for="${form}-consent"><input id="${form}-consent" type="checkbox" name="consent" value="yes" required> <span>I have read the <a href="/privacy/">Privacy Notice</a> and agree that Ace’s Side may store what I send here to ${purpose}.${REQ}</span></label></div>`;
export function form({ name, fields, purpose, submit, star = false, intro = '' }) {
  return `<form class="form" name="${name}" method="POST" action="/thanks/" data-netlify="true" netlify-honeypot="bot-field">
<input type="hidden" name="form-name" value="${name}">
<div class="hp" aria-hidden="true"><label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></div>
${intro}
${fields.map((f) => field(name, f)).join('\n')}
${consent(name, purpose)}
<button class="btn btn--primary" type="submit">${star ? '<svg class="btn__star" aria-hidden="true" focusable="false"><use href="#star"/></svg>' : ''}<span>${submit}</span></button>
</form>`;
}

// ---- Page shell ---------------------------------------------------------------------------------
export function renderPage(ctx, page) {
  const { config, assets, emblem, indexing } = ctx;
  const url = config.origin + page.path;
  const title = page.path === '/' ? page.title : `${page.title} · ${config.name}`;
  const noindex = !indexing || page.noindex;
  const bodyFont = page.reading ? assets.fonts['spectral-400'] : assets.fonts['inter-var'];
  const ogImage = `${config.origin}/og-image.png`;
  const ogAlt = 'The Ace’s Side Emblem beside the words “When the world needs us, we are here.”';
  const current = (href) => (page.path === href ? ' aria-current="page"' : '');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<meta name="theme-color" content="#444444">
<meta property="og:site_name" content="${esc(config.name)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="${assets.fonts['michroma-400']}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${bodyFont}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assets.css}">
${page.jsonld ? `<script type="application/ld+json">${JSON.stringify(page.jsonld)}</script>\n` : ''}</head>
<body class="${page.reading ? 'is-reading ' : ''}${page.bodyClass || ''}">
${sprite(emblem)}
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
<div class="wrap site-header__in">
<a class="brand" href="/"><svg class="brand__mark" aria-hidden="true" focusable="false"><use class="bold" href="#emblem"/></svg><span class="brand__name">ACE’S SIDE</span><span class="vh"> home</span></a>
<nav class="nav" aria-label="Main"><ul>
${NAV.map(([href, label]) => `<li><a href="${href}"${current(href)}>${label}</a></li>`).join('\n')}
</ul></nav>
</div>
</header>
<main id="main" tabindex="-1">
${page.body}
</main>
<footer class="site-footer">
<div class="wrap footer__grid">
<div class="footer__id">
<a class="brand" href="/"><svg class="brand__mark" aria-hidden="true" focusable="false"><use class="bold" href="#emblem"/></svg><span class="brand__name">ACE’S SIDE</span><span class="vh"> home</span></a>
<p class="footer__tag">${esc(config.tagline)}</p>
</div>
<nav aria-label="Alliance"><h2 class="footer__h">Alliance</h2><ul>
${NAV.slice(0, 5).map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('\n')}
</ul></nav>
<nav aria-label="Site"><h2 class="footer__h">Site</h2><ul>
<li><a href="/contact/">Contact</a></li>
${FOOT_SITE.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('\n')}
</ul></nav>
</div>
<div class="wrap footer__base">
<p>Founding stage. The Doctrine is version ${esc(config.doctrine.version)}${config.doctrine.status === 'draft' ? ' (draft)' : ''}, ${esc(fmtDate(config.doctrine.date))}.</p>
<p>© 2026 Ace’s Side. This site sets no cookies and runs no tracking.</p>
</div>
</footer>
</body>
</html>
`;
}
