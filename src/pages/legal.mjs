import { esc, pageHero, fmtDate, operator } from '../layout.mjs';

// Plain-language legal notice and terms, kept short on purpose. Accurate for a founding-stage alliance
// with no registered entity. docs/LEGAL.md lists what a lawyer must confirm before launch.
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
<p>This site has no contact form. Ace’s Side contacts people itself. The one address on this site, in the <a href="/privacy/">Privacy Notice</a>, is for data-protection requests only.</p>

<h2>What Ace’s Side is not</h2>
<p>Ace’s Side is <strong>not</strong> a government, an agency of any state, the United Nations or any intergovernmental body, a regulator, an emergency service or a security service. It holds no official powers and does not claim any.</p>
<p>If a life is at risk, contact your local emergency services.</p>

<h2>Information, not advice</h2>
<p>This site is general information. It is not professional, legal, medical, financial or security advice, and nothing on it is an offer to provide a service anywhere.</p>

<h2>No donations or payments</h2>
<p>This site does not take donations or payments. Ace’s Side will not describe any gift as tax-deductible unless it is registered to receive such gifts.</p>

<h2>Our name and Emblem</h2>
<p>Ace’s Side, Acesside, the Emblem and the wordmark identify the alliance. Please do not use them in a way that suggests endorsement by, or affiliation with, Ace’s Side. Permission is given only in writing by Ace’s Side.</p>
<p>The text of this site is © 2026 Ace’s Side. You may quote short passages if you credit Ace’s Side and link to the source page.</p>

<h2>Using this site</h2>
<ul>
<li>You may read, share and link to this site freely.</li>
<li>Please do not attempt to disrupt the site.</li>
<li>We work to keep the information accurate, but the site may change without notice.</li>
<li>Links to other sites are for your convenience. We are not responsible for their content.</li>
</ul>

<h2>Liability</h2>
<p>To the extent the law allows, Ace’s Side is not liable for loss arising from the use of this site. Nothing here limits any liability that the law does not allow to be limited.</p>

<h2>Governing law</h2>
<p>The governing law and courts for these terms will be stated here once Ace’s Side is registered.</p>

<h2>Fonts</h2>
<p>This site is set in Michroma and Inter, used under the SIL Open Font License 1.1 and served from our own domain.</p>
</div>
</div>
</section>
`,
};
