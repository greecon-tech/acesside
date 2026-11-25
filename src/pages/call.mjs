import { esc, pageHero } from '../layout.mjs';
import { callSteps } from '../content.mjs';

export default {
  path: '/call/',
  title: 'The Call',
  description: 'How Ace’s Side answers: signal, assess, convene, act, account, hand over. Raise a signal if a community, partner or nation needs help.',
  body: () => `
${pageHero({
  eyebrow: 'How we answer',
  title: 'The Call',
  lead: 'When the world needs Ace’s Side, the response follows six steps, in order, every time.',
})}
<section class="band band--void" aria-labelledby="steps">
<div class="wrap">
<h2 class="vh" id="steps">The six steps</h2>
<ol class="steps steps--long">
${callSteps.map((s) => `<li><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></li>`).join('\n')}
</ol>
<p class="measure">A call is declined if it fails the assessment. Saying no to the wrong mission protects the right ones.</p>
</div>
</section>

<section class="band band--bone" id="signal" aria-labelledby="signal-h">
<div class="wrap">
<p class="eyebrow">Step one</p>
<h2 class="display h2" id="signal-h">Signals</h2>
<p class="lead measure">A community, partner, nation or member can raise a need. Every signal is logged, even the ones we decline.</p>
<p class="measure">There is no form for signals on this website. Ace’s Side reaches out.</p>
<div class="notice" role="note">
<strong>If a life is at risk right now</strong>
<p>Contact your local emergency number first. Ace’s Side is not an emergency service and cannot respond in minutes.</p>
</div>
</div>
</section>
`,
};
