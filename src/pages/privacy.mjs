import { esc, pageHero, fmtDate, operator } from '../layout.mjs';

// Privacy notice (GDPR Articles 12 to 14). Every statement here must stay true to how the site is built:
//   no cookies, no local storage, no JavaScript, no analytics, no third-party requests, self-hosted fonts;
//   there is NO form and no way to write to the alliance through the site (the alliance reaches out; nobody writes in).
// The one address below exists only so people can use their data-protection rights, which the law requires.
// Retention is a proposed default for the founders and their lawyer to confirm (docs/LEGAL.md).
const record = (rows) => `<dl class="record">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

export default {
  path: '/privacy/',
  title: 'Privacy Notice',
  description: 'How Ace’s Side handles personal data: no cookies, no tracking, and nothing collected through this site.',
  body: ({ config }) => `
${pageHero({ eyebrow: 'Your data', title: 'Privacy<br>notice' })}
<section class="band band--bone legal">
<div class="wrap">
<div class="prose">
<p class="updated">Last updated ${fmtDate(config.updated)}.</p>

<div class="summary" role="note">
<strong>In short</strong>
<ul>
<li>This site sets no cookies and runs no analytics, advertising or tracking.</li>
<li>Every file, including the fonts, comes from our own domain.</li>
<li>This site has no forms and collects nothing from you directly.</li>
<li>To use your data-protection rights, write to <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>. That address is for data-protection requests only.</li>
</ul>
</div>

<h2>Who is responsible</h2>
<p>${esc(operator(config))} This is the “controller” of your personal data under data protection law, and it is who you contact about it.</p>
<p>Email, for data-protection requests only: <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>. Ace’s Side has not appointed a data protection officer.</p>

<h2>What we collect, why, and for how long</h2>

<h3>When you visit the site</h3>
${record([
  ['What', 'Technical data your browser sends: your IP address, the page you asked for, the date and time, your browser type and the page you came from.'],
  ['Why', 'To deliver the site and to protect it from abuse. Our hosting provider, Netlify, handles this. We do not use it to profile you or combine it with anything else.'],
  ['Legal basis', 'Legitimate interests: delivering and securing the site (Article 6(1)(f) GDPR).'],
  ['Kept for', 'A short period set by our hosting provider.'],
])}

<h3>If you write to the data-protection address</h3>
${record([
  ['What', 'Your email address and what you tell us.'],
  ['Why', 'To deal with your request and answer you.'],
  ['Legal basis', 'Our legitimate interest in answering you, and our legal duty to deal with data-protection requests (Article 6(1)(c) and (f)).'],
  ['Kept for', '12 months after our last message to you.'],
])}

<h2>Who else handles your data</h2>
<ul>
<li><strong>Netlify, Inc.</strong> (United States) hosts this site. It acts on our instructions as our processor.</li>
<li><strong>Our email provider</strong>, which delivers the messages that reach our mailbox.</li>
<li><strong>Public authorities</strong>, only where the law requires it.</li>
</ul>
<p>We do not sell your data, and we do not use it for advertising.</p>

<h2>Transfers outside your country</h2>
<p>Netlify is based in the United States. When personal data leaves the European Economic Area or the United Kingdom, we rely on safeguards such as the Standard Contractual Clauses approved by the European Commission, which form part of our providers’ data processing terms.</p>

<h2>Your rights</h2>
<p>You can ask us to:</p>
<ul>
<li>give you a copy of your personal data;</li>
<li>correct it, or delete it;</li>
<li>limit how we use it, or stop using it where we rely on legitimate interests;</li>
<li>give it to you, or to another organization, in a portable format.</li>
</ul>
<p>Write to <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>. We will answer within one month.</p>
<p>You may also complain to the data protection authority in the country where you live or work, or where you think your rights were breached. In the United Kingdom this is the <a href="https://ico.org.uk/">Information Commissioner’s Office</a>; in the European Union, find yours on the <a href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_en">European Data Protection Board</a> site.</p>
<p>We make no decisions about you by automated means.</p>

<h2>Cookies and tracking</h2>
<p>This site does not set cookies, does not use browser storage, and does not load analytics, advertising, social media or font services from other companies. For that reason there is no cookie banner. If this ever changes, we will ask you first and update this notice.</p>

<h2>Children</h2>
<p>This site is not aimed at children. Please do not send us personal data about children.</p>

<h2>Security</h2>
<p>The site is served over HTTPS only, with security headers that limit what a page can load or do.</p>

<h2>Changes to this notice</h2>
<p>If our practice changes, we will update this notice and the date at the top.</p>
</div>
</div>
</section>
`,
};
