import { esc, pageHero, fmtDate, operator } from '../layout.mjs';

// Plain-language legal notice and terms of use. Written to be accurate for a founding-stage
// alliance with no registered entity. docs/LEGAL.md lists what a lawyer must confirm before launch.
export default {
  path: '/legal/',
  title: 'Legal notice and terms',
  description: 'Who runs this site, what Ace’s Side is and is not, and the terms for using this website.',
  body: ({ config }) => `
${pageHero({ eyebrow: 'Legal', title: 'Legal notice<br>and terms' })}
<section class="band band--bone legal">
<div class="wrap">
<div class="prose">
<p class="updated">Last updated ${fmtDate(config.updated)}.</p>

<h2>Who runs this site</h2>
<p>${esc(operator(config))}</p>
<p>Contact: <a href="mailto:${esc(config.contact.general)}">${esc(config.contact.general)}</a>.</p>

<h2>What Ace’s Side is, and is not</h2>
<p>Ace’s Side is a leadership alliance of private people. It is <strong>not</strong> a government, an agency of any state, the United Nations or any intergovernmental body, a regulator, an emergency service or a security service. It holds no official powers and does not claim any. It acts only where it has an invitation or a legal basis.</p>
<p>If a life is at risk, contact your local emergency services first.</p>

<h2>Information, not advice</h2>
<p>This site describes the alliance and how it works. It is not professional, legal, medical, financial or security advice, and nothing on it is an offer to provide a service in any particular place.</p>

<h2>No donations or payments</h2>
<p>This site does not take donations or payments. Ace’s Side will not describe any gift as tax-deductible unless it is registered to receive such gifts.</p>

<h2>Our name, Emblem and words</h2>
<p>Ace’s Side, Acesside, the Emblem and the wordmark identify the alliance. Please do not use them in a way that suggests endorsement by, or affiliation with, Ace’s Side without written permission. To ask, <a href="/contact/">contact us</a>.</p>
<p>The text of this site is © 2026 Ace’s Side. You may quote short passages if you credit Ace’s Side and link to the source page.</p>

<h2>Using this site</h2>
<ul>
<li>You may read, share and link to this site freely.</li>
<li>Please do not misuse the forms: no spam, no false signals and no attempts to disrupt the site.</li>
<li>We work to keep the information accurate, but the Doctrine is a living document and the site may change without notice.</li>
<li>Links to other sites are for your convenience. We are not responsible for their content.</li>
</ul>

<h2>Liability</h2>
<p>To the extent the law allows, Ace’s Side is not liable for loss arising from the use of this site. Nothing here limits any liability that the law does not allow to be limited.</p>

<h2>Governing law</h2>
<p>The governing law and courts for these terms will be stated here once Ace’s Side is registered.</p>

<h2>Fonts</h2>
<p>This site is set in Michroma, Spectral and Inter, used under the SIL Open Font License 1.1 and served from our own domain.</p>
</div>
</div>
</section>
`,
};
