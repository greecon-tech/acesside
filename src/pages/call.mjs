import { esc, pageHero, form } from '../layout.mjs';
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
<section class="band band--charcoal" aria-labelledby="steps">
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
<h2 class="display h2" id="signal-h">Raise a signal</h2>
<p class="lead measure">A community, partner, nation or member can raise a need. Every signal is logged, even the ones we decline.</p>
<div class="notice" role="note">
<strong>If a life is at risk right now</strong>
<p>Contact your local emergency number first. Ace’s Side is not an emergency service and cannot respond in minutes.</p>
</div>
${form({
    name: 'signal',
    submit: 'Send the signal',
    star: true,
    purpose: 'assess and answer my signal and keep a record of it',
    fields: [
      { name: 'name', label: 'Your name', required: true, autocomplete: 'name' },
      { name: 'email', type: 'email', label: 'Email address', required: true, autocomplete: 'email', hint: 'We use it only to answer your signal.' },
      { name: 'role', type: 'select', label: 'Who is raising this signal?', required: true, options: ['A community', 'A partner organization', 'A nation or public body', 'A member of Ace’s Side', 'Someone else'] },
      { name: 'organization', label: 'Organization or community', autocomplete: 'organization' },
      { name: 'country', label: 'Country or region where help is needed', required: true, autocomplete: 'country-name' },
      { name: 'life-at-risk', type: 'radios', label: 'Is anyone’s life at risk right now?', required: true, options: ['Yes', 'No', 'Not sure'] },
      { name: 'invited', type: 'select', label: 'Has a local authority or partner asked for help?', required: true, options: ['Yes', 'No', 'Not sure'], hint: 'We act only with an invitation or a legal basis.' },
      { name: 'need', type: 'textarea', label: 'What is the need?', required: true, hint: 'Say what is happening, who is affected and what you are asking for. Please do not include sensitive personal details about other people.' },
    ],
  })}
</div>
</section>
`,
};
