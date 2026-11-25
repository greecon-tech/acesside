import { esc, btn, heroEmblem } from '../layout.mjs';
import { divisions, presence, presenceQuestion, callSteps, lines, shortDescription } from '../content.mjs';

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
<section class="band band--charcoal hero">
<div class="wrap hero__grid">
<div class="hero__text">
<p class="eyebrow">Ace’s Side</p>
<h1 class="display h1">When the world<br>needs us,<br>we are here.</h1>
<div class="rule" aria-hidden="true"></div>
<p class="lead">${esc(config.description)}</p>
<div class="actions">
${btn('/call/#signal', 'Raise a signal', 'primary', { star: true })}
${btn('/doctrine/', 'Read the Doctrine', 'ghost')}
</div>
<p class="status">Founding stage. Our Doctrine is version ${esc(config.doctrine.version)}${config.doctrine.status === 'draft' ? ' (draft)' : ''}, and every word of it is public.</p>
</div>
<div class="hero__emblem">${heroEmblem()}</div>
</div>
</section>

<section class="band band--bone" aria-labelledby="what">
<div class="wrap split split--wide-left">
<div>
<p class="eyebrow">What we are</p>
<h2 class="display h2" id="what">One alliance</h2>
<p class="lead">${esc(shortDescription)}</p>
</div>
<dl class="facts">
<div class="fact"><dt>6</dt><dd>Divisions, each covering one area of the founding text</dd></div>
<div class="fact"><dt>10</dt><dd>Articles that govern everything we do</dd></div>
<div class="fact"><dt>8</dt><dd>Lines we never cross, for any reason</dd></div>
<div class="fact"><dt>1</dt><dd>Oath, renewed by every member each year</dd></div>
</dl>
</div>
</section>

<section class="band band--charcoal" aria-labelledby="presence">
<div class="wrap">
<p class="eyebrow">The principle</p>
<h2 class="display h2" id="presence">Presence</h2>
<p class="lead">Presence is full awareness, responsibility and empowerment, held at the same time. Every leader and every member of Ace’s Side must embody it.</p>
<ul class="presence">
${presence.map((p) => `<li><strong>${esc(p.name)}</strong><span>${esc(p.text)}</span></li>`).join('\n')}
</ul>
<p class="pull"><strong>Before any decision</strong>${esc(presenceQuestion)}</p>
</div>
</section>

<section class="band band--bone" aria-labelledby="divisions">
<div class="wrap">
<p class="eyebrow">How we are organized</p>
<h2 class="display h2" id="divisions">Six divisions</h2>
<p class="lead">Like a team of specialists, each division has its own strength. The strongest missions draw on several at once.</p>
<div class="cards">
${divisions.map((d) => `<article class="card">
<span class="card__code">${d.code}</span>
<h3>${esc(d.name)}</h3>
<p class="card__area">${esc(d.area)}</p>
<p>${esc(d.protects)}</p>
</article>`).join('\n')}
</div>
<div class="actions">${btn('/divisions/', 'See each division', 'ghost')}</div>
</div>
</section>

<section class="band band--charcoal" aria-labelledby="call">
<div class="wrap">
<p class="eyebrow">How we answer</p>
<h2 class="display h2" id="call">The Call</h2>
<p class="lead">When the world needs Ace’s Side, the response follows six steps, in order, every time. A call is declined if it fails the assessment. Saying no to the wrong mission protects the right ones.</p>
<ol class="steps">
${callSteps.map((s) => `<li><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p></li>`).join('\n')}
</ol>
<div class="actions">${btn('/call/#signal', 'Raise a signal', 'ghost')}</div>
</div>
</section>

<section class="band band--bone" aria-labelledby="lines">
<div class="wrap">
<p class="eyebrow">Held to account</p>
<h2 class="display h2" id="lines">Eight Lines</h2>
<p class="lead">These lines are never crossed, by any member, for any reason. Crossing one ends membership.</p>
<ul class="lines">
${lines.map((l) => `<li>${esc(l.title)}</li>`).join('\n')}
</ul>
<div class="actions">${btn('/accountability/', 'How we are held to account', 'ghost')}</div>
</div>
</section>

<section class="band band--void" aria-labelledby="answer">
<div class="wrap">
<p class="eyebrow">Membership</p>
<h2 class="display h2" id="answer">Answer the call</h2>
<p class="lead">Three people who take the Oath and keep the Lines are enough to begin. Members earn their place through training and service.</p>
<div class="actions">
${btn('/membership/#apply', 'Become a candidate', 'ghost')}
${btn('/membership/#oath', 'Read the Oath', 'ghost')}
</div>
</div>
</section>
`,
};
