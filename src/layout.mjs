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
// alone, the hero and the small header/footer marks all reference them. The bold small-size weight
// (below 64 px) is the same shape with every edge thickened outward by 3.5 units, done in CSS (.bold).
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

// ---- Navigation ----------------------------------------------------------------------------
// Deliberately small. The site is a front door, not a map, and it has no way to write to the alliance.
const FOOT = [
  ['/legal/', 'Legal notice'],
  ['/privacy/', 'Privacy'],
  ['/accessibility/', 'Accessibility'],
];

// ---- Small builders ---------------------------------------------------------------------------
export const btn = (href, label, kind = 'primary', { star = false } = {}) =>
  `<a class="btn btn--${kind}" href="${href}">${star ? '<svg class="btn__star" aria-hidden="true" focusable="false"><use href="#star"/></svg>' : ''}<span>${label}</span></a>`;

export const pageHero = ({ eyebrow, title, lead }) => `<section class="band band--void page-hero">
<div class="wrap">
<p class="eyebrow">${esc(eyebrow)}</p>
<h1 class="display h1">${title}</h1>
<div class="rule" aria-hidden="true"></div>
${lead ? `<p class="lead">${lead}</p>` : ''}
</div></section>`;

// The star on its own: the Emblem's signal. Beacon, decorative, used once per page at most.
export const starMark = () => '<svg class="signal-star" aria-hidden="true" focusable="false"><use href="#star"/></svg>';

// ---- Page shell ---------------------------------------------------------------------------------
export function renderPage(ctx, page) {
  const { config, assets, emblem, indexing } = ctx;
  const url = config.origin + page.path;
  const title = page.path === '/' ? page.title : `${page.title} · ${config.name}`;
  const noindex = !indexing || page.noindex;
  const ogImage = `${config.origin}/og-image.png`;
  const ogAlt = 'The Ace’s Side Emblem beside the words “When the world needs us, we are here.”';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<meta name="theme-color" content="#050505">
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
<link rel="preload" href="${assets.fonts['inter-var']}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assets.css}">
${page.jsonld ? `<script type="application/ld+json">${JSON.stringify(page.jsonld)}</script>\n` : ''}</head>
<body class="${page.bodyClass || ''}">
${sprite(emblem)}
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
<div class="wrap site-header__in">
<a class="brand" href="/"><svg class="brand__mark" aria-hidden="true" focusable="false"><use class="bold" href="#emblem"/></svg><span class="brand__name">ACE’S SIDE</span><span class="vh"> home</span></a>
</div>
</header>
<main id="main" tabindex="-1">
${page.body}
</main>
<footer class="site-footer">
<div class="wrap">
<div class="footer__top">
<div>
<a class="brand" href="/"><svg class="brand__mark" aria-hidden="true" focusable="false"><use class="bold" href="#emblem"/></svg><span class="brand__name">ACE’S SIDE</span><span class="vh"> home</span></a>
<p class="footer__tag">${esc(config.tagline)}</p>
</div>
<nav aria-label="Site"><ul>
${FOOT.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('\n')}
</ul></nav>
</div>
<div class="footer__base"><p>© 2026 Ace’s Side. This site sets no cookies and runs no tracking.</p></div>
</div>
</footer>
</body>
</html>
`;
}
