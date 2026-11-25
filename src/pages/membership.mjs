import { esc, pageHero, rankMark } from '../layout.mjs';
import { stages, duties, oath } from '../content.mjs';

export default {
  path: '/membership/',
  title: 'Membership',
  description: 'Members of Ace’s Side earn their place through training and service, in five stages. Read the Oath and apply to become a candidate.',
  body: () => `
${pageHero({
  eyebrow: 'Join the alliance',
  title: 'Membership',
  lead: 'Members earn their place through training and service, in five stages. No one buys a rank.',
})}
<section class="band band--void" aria-labelledby="stages">
<div class="wrap">
<h2 class="display h2" id="stages">Five stages</h2>
<ol class="stage-list">
${stages.map((s) => `<li>
<div class="stage__mark">${s.mark ? rankMark(s.mark) : ''}</div>
<h3>${esc(s.name)}</h3>
<p>${esc(s.text)}</p>
</li>`).join('\n')}
</ol>
</div>
</section>

<section class="band band--bone" aria-labelledby="duties">
<div class="wrap split">
<div>
<h2 class="display h2" id="duties">Four standing duties</h2>
<ul class="pairs">
${duties.map((d) => `<li><strong>${esc(d)}</strong></li>`).join('\n')}
</ul>
</div>
<div class="prose">
<h2 class="display h2" id="callsigns">Call signs</h2>
<p>A call sign is one word, chosen by the member with their team. It must not be a real person’s name or a character owned by another company.</p>
</div>
</div>
</section>

<section class="band band--void" id="oath" aria-labelledby="oath-h">
<div class="wrap">
<p class="eyebrow">The Oath</p>
<h2 class="display h2" id="oath-h">When the world needs us, we are here.</h2>
<p class="lead">Every member makes one public promise. The full oath is spoken at induction, and renewed each year.</p>
<div class="oath">
${oath.map((l) => `<p>${esc(l)}</p>`).join('\n')}
</div>
</div>
</section>

<section class="band band--bone" id="apply" aria-labelledby="apply-h">
<div class="wrap">
<p class="eyebrow">Stage one</p>
<h2 class="display h2" id="apply-h">Membership begins with an invitation</h2>
<p class="lead measure">Every candidate is checked for conflicts of interest and for fit with the Articles.</p>
<p class="measure">There is no application form on this website. Ace’s Side reaches out.</p>
</div>
</section>
`,
};
