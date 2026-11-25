import { esc, btn, pageHero } from '../layout.mjs';
import { divisions } from '../content.mjs';

export default {
  path: '/divisions/',
  title: 'The Six Divisions',
  description: 'Ace’s Side works through six divisions: Concord, Prosper, Ascend, Ward, Terra and Lumen. Each covers one area of the founding text.',
  body: () => `
${pageHero({
  eyebrow: 'How we are organized',
  title: 'The six<br>divisions',
  lead: 'Ace’s Side works through six divisions, each covering one area of the founding text. Like a team of specialists, each has its own strength, and the strongest missions draw on several at once.',
})}
<section class="band band--bone" aria-labelledby="list">
<div class="wrap">
<h2 class="vh" id="list">The divisions</h2>
<div class="cards">
${divisions.map((d) => `<article class="card${d.name === 'Lumen' ? ' card--lumen' : ''}">
<span class="card__code">${d.code}</span>
<h3>${esc(d.name)}</h3>
<p class="card__area">${esc(d.area)}</p>
<dl>
<div><dt>Protects</dt><dd>${esc(d.protects)}</dd></div>
<div><dt>Its work</dt><dd>${esc(d.work)}</dd></div>
</dl>
</article>`).join('\n')}
</div>
</div>
</section>
<section class="band band--void" aria-labelledby="center">
<div class="wrap">
<p class="eyebrow">Where every member starts</p>
<h2 class="display h2" id="center">Lumen at the center</h2>
<p class="lead">Every member trains through Lumen before joining another division, because Presence comes first.</p>
<div class="actions">${btn('/membership/', 'How membership works', 'ghost')}</div>
</div>
</section>
`,
};
