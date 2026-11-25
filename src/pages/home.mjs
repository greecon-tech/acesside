import { esc, heroEmblem, starMark } from '../layout.mjs';
import { areas, ways } from '../content.mjs';

// A little content, in the Brand Book's voice. The site gives no way to contact the alliance:
// Ace's Side reaches out; nobody writes in.
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
</div>
<div class="hero__emblem">${heroEmblem()}</div>
</div>
</section>

<section class="band band--bone" aria-labelledby="who">
<div class="wrap">
<p class="eyebrow">Who we are</p>
<h2 class="display h2 h2--big" id="who">One cause.<br>Many strengths.</h2>
<div class="prose lead-prose">
<p>Hard problems are not solved by one person, one nation or one skill. They are met by people who are each excellent at something different, and who share one cause.</p>
<p>That is what Ace’s Side is built on.</p>
</div>
<ul class="areas" aria-label="Where we work">
${areas.map((a) => `<li>${esc(a)}</li>`).join('\n')}
</ul>
</div>
</section>

<section class="band band--void" aria-labelledby="ways">
<div class="wrap">
<p class="eyebrow">How we show up</p>
<h2 class="vh" id="ways">How we show up</h2>
<ul class="ways">
${ways.map((w) => `<li><h3>${esc(w.name)}</h3><p>${esc(w.text)}</p></li>`).join('\n')}
</ul>
<div class="closing">
${starMark()}
<h2 class="display h2 h2--big">Answer the call</h2>
<p class="lead">There is no form to fill in and no address to write to. When there is a place for you, or a need we can meet together, we reach out.</p>
</div>
</div>
</section>
`,
};
