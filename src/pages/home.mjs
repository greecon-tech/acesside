import { esc, btn, heroEmblem } from '../layout.mjs';
import { taglines } from '../content.mjs';

// The home page says only what the Brand Book wrote for public use: the promise, the one-line
// description and the two supporting taglines. It deliberately explains nothing else.
export default {
  path: '/',
  title: 'Ace’s Side · When the world needs us, we are here',
  description: 'Ace’s Side is a leadership alliance that answers when the world needs it, uniting innovation and ethics through Presence.',
  bodyClass: 'home',
  jsonld: ({ config }) => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.origin + '/',
    logo: config.origin + '/icon-512.png',
    slogan: config.tagline,
    description: config.description,
  }),
  body: ({ config }) => `
<section class="band band--void hero">
<div class="wrap hero__grid">
<div class="hero__text">
<p class="eyebrow">Ace’s Side</p>
<h1 class="display h1">When the world<br>needs us,<br>we are here.</h1>
<div class="rule" aria-hidden="true"></div>
<p class="lead">${esc(config.description)}</p>
<div class="actions">
${btn('/contact/', 'Get in touch', 'primary', { star: true })}
</div>
</div>
<div class="hero__emblem">${heroEmblem()}</div>
</div>
</section>

<section class="band band--bone" aria-label="${esc(taglines.secondary)}">
<div class="wrap">
<p class="display statement">Shaped by<br>Presence.<br>Guided by<br>purpose.</p>
</div>
</section>

<section class="band band--void" aria-labelledby="answer">
<div class="wrap">
<h2 class="display h2" id="answer">Answer the call</h2>
<p class="lead">To reach Ace’s Side, write to us.</p>
<div class="actions">${btn('/contact/', 'Contact', 'ghost')}</div>
</div>
</section>
`,
};
