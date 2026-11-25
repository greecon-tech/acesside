import { esc, pageHero, fmtDate, operator } from '../layout.mjs';

// Privacy notice (GDPR Articles 12 to 14). Every statement here must stay true to how the site is built:
//   no cookies, no local storage, no JavaScript, no analytics, no third-party requests, self-hosted fonts;
//   the one form is handled by Netlify Forms (Netlify is the host and processor and screens submissions with Akismet).
// Retention is a proposed default for the founders and their lawyer to confirm (docs/LEGAL.md).
const record = (rows) => `<dl class="record">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

export default {
  path: '/privacy/',
  title: 'Privacy Notice',
  description: 'How Ace’s Side handles personal data: no cookies, no tracking, and only what you choose to send us.',
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
<li>We collect personal data only if you send us a message, and we use it only to answer it.</li>
<li>You can ask to see, correct or delete it at any time: <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>.</li>
</ul>
</div>

<h2>Who is responsible</h2>
<p>${esc(operator(config))} This is the “controller” of your personal data under data protection law, and it is who you contact about it.</p>
<p>Email: <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>. Ace’s Side has not appointed a data protection officer.</p>

<h2>What we collect, why, and for how long</h2>

<h3>When you visit the site</h3>
${record([
  ['What', 'Technical data your browser sends: your IP address, the page you asked for, the date and time, your browser type and the page you came from.'],
  ['Why', 'To deliver the site and to protect it from abuse. Our hosting provider, Netlify, handles this. We do not use it to profile you or combine it with anything else.'],
  ['Legal basis', 'Legitimate interests: delivering and securing the site (Article 6(1)(f) GDPR).'],
  ['Kept for', 'A short period set by our hosting provider.'],
])}

<h3>When you write to us</h3>
${record([
  ['What', 'Your name, email address, the topic and your message, through the contact form or by email.'],
  ['Why', 'To read and answer your message.'],
  ['Legal basis', 'Your consent for the form, which you can withdraw at any time (Article 6(1)(a)). Our legitimate interest in answering, for email you send us directly (Article 6(1)(f)).'],
  ['Kept for', '12 months after our last message to you.'],
])}

<h2>Who else handles your data</h2>
<ul>
<li><strong>Netlify, Inc.</strong> (United States) hosts this site, stores what you send through the contact form, and passes it on to us. It acts on our instructions as our processor.</li>
<li><strong>Akismet</strong> (Automattic Inc., United States). Netlify checks form submissions for spam with Akismet. Akismet receives the content of the submission with technical data such as your IP address and browser type.</li>
<li><strong>Our email provider</strong>, which delivers the messages that reach our mailboxes.</li>
<li><strong>Public authorities</strong>, only where the law requires it.</li>
</ul>
<p>We do not sell your data, and we do not use it for advertising.</p>

<h2>Transfers outside your country</h2>
<p>Netlify and Akismet are based in the United States. When personal data leaves the European Economic Area or the United Kingdom, we rely on safeguards such as the Standard Contractual Clauses approved by the European Commission, which form part of our providers’ data processing terms.</p>

<h2>Your rights</h2>
<p>You can ask us to:</p>
<ul>
<li>give you a copy of your personal data;</li>
<li>correct it, or delete it;</li>
<li>limit how we use it, or stop using it where we rely on legitimate interests;</li>
<li>give it to you, or to another organization, in a portable format.</li>
</ul>
<p>Where we rely on your consent, you can withdraw it at any time. That does not affect what we did before. Write to <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>. We will answer within one month.</p>
<p>You may also complain to the data protection authority in the country where you live or work, or where you think your rights were breached. In the United Kingdom this is the <a href="https://ico.org.uk/">Information Commissioner’s Office</a>; in the European Union, find yours on the <a href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_en">European Data Protection Board</a> site.</p>
<p>We make no decisions about you by automated means.</p>

<h2>Cookies and tracking</h2>
<p>This site does not set cookies, does not use browser storage, and does not load analytics, advertising, social media or font services from other companies. For that reason there is no cookie banner. If this ever changes, we will ask you first and update this notice.</p>

<h2>Children</h2>
<p>This site is not aimed at children. Please do not send us personal data about children.</p>

<h2>Security</h2>
<p>The site is served over HTTPS only, with security headers that limit what a page can load or do. Messages are stored by our host and are reachable only by the people who handle them. Please do not send sensitive personal data, such as health details, unless it is essential.</p>

<h2>Changes to this notice</h2>
<p>If our practice changes, we will update this notice and the date at the top.</p>
</div>
</div>
</section>
`,
};
