import { esc, pageHero } from '../layout.mjs';
import { articles, lines, governance, amending } from '../content.mjs';

export default {
  path: '/accountability/',
  title: 'Accountability',
  description: 'The Ten Articles govern what Ace’s Side does. The Lines mark what it never does. The Council answers for both.',
  body: () => `
${pageHero({
  eyebrow: 'Held to account',
  title: 'Account&shy;ability',
  lead: 'The Ten Articles govern what we do. The Lines mark what we never do. The Council answers for both.',
})}
<section class="band band--bone" aria-labelledby="articles">
<div class="wrap">
<h2 class="display h2" id="articles">The Ten Articles</h2>
<p class="lead">When two articles conflict, the lower number wins.</p>
<ol class="numbered">
${articles.map((a) => `<li><div><strong>${esc(a.title)}</strong>${esc(a.text)}</div></li>`).join('\n')}
</ol>
</div>
</section>

<section class="band band--void" aria-labelledby="lines">
<div class="wrap">
<h2 class="display h2" id="lines">The Lines</h2>
<p class="lead">These lines are never crossed, by any member, for any reason. Crossing one ends membership.</p>
<ul class="lines">
${lines.map((l) => `<li>${esc(l.title)}<span>${esc(l.text)}</span></li>`).join('\n')}
</ul>
</div>
</section>

<section class="band band--bone" aria-labelledby="governance">
<div class="wrap">
<h2 class="display h2" id="governance">Governance</h2>
<p class="lead">The Council governs Ace’s Side, and its power is checked so that no single person can steer the alliance alone.</p>
<ul class="pairs">
${governance.map((g) => `<li><strong>${esc(g.title)}</strong>${esc(g.text)}</li>`).join('\n')}
</ul>
</div>
</section>

<section class="band band--void" aria-labelledby="amending">
<div class="wrap">
<h2 class="display h2" id="amending">What can never change</h2>
<p class="lead">The rules can change, but their foundations cannot.</p>
<ul class="pairs">
${amending.map((a) => `<li>${esc(a)}</li>`).join('\n')}
</ul>
</div>
</section>

<section class="band band--bone" aria-labelledby="report">
<div class="wrap">
<h2 class="display h2" id="report">Reports</h2>
<p class="lead measure">Ace’s Side publishes a yearly report on missions, funding and mistakes. Our first report will follow our first full year of work.</p>
<p class="measure">Mistakes are reported, never hidden.</p>
</div>
</section>
`,
};
