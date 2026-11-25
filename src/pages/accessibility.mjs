import { esc, pageHero, fmtDate } from '../layout.mjs';

// Accessibility statement. States only what was actually done and checked (see tools/verify.mjs).
export default {
  path: '/accessibility/',
  title: 'Accessibility',
  description: 'How this site is built to be usable by everyone, what we have checked, and how to tell us about a problem.',
  body: ({ config }) => `
${pageHero({ eyebrow: 'Open to everyone', title: 'Accessibility' })}
<section class="band band--bone legal">
<div class="wrap">
<div class="prose">
<p class="updated">Last reviewed ${fmtDate(config.updated)}.</p>

<h2>Our aim</h2>
<p>Ace’s Side is open to everyone, and so is its website. We aim for the Web Content Accessibility Guidelines (WCAG) 2.2, level AA.</p>

<h2>How the site is built</h2>
<ul>
<li>It works without JavaScript, so nothing depends on a script running.</li>
<li>Every page uses real headings, landmarks and a “Skip to content” link.</li>
<li>You can use the whole site with a keyboard, and the focus is always visible.</li>
<li>Text and background colors meet the AA contrast ratio. Our body text is off-white on black at about 18 to 1.</li>
<li>Pages reflow down to a 320 pixel width, and text can be enlarged without losing content.</li>
<li>The one animation, on the home page, plays once and stops. It does not play if your device asks for reduced motion.</li>
<li>The contact form has a visible label on every field, says what is required, and brings up the right keyboard on a phone.</li>
<li>Buttons and links are large enough to tap easily on a phone.</li>
</ul>

<h2>What we have checked</h2>
<p>On ${fmtDate(config.updated)} we ran automated accessibility checks (axe-core, against WCAG 2.2 A and AA rules) on every page, and checked keyboard use, tap-target size and reflow on phone-width screens. We have not yet carried out a full audit with screen readers and other assistive technology. We plan to.</p>

<h2>Tell us about a problem</h2>
<p>If something on this site is hard to use, please tell us, and say what you were trying to do. Write to <a href="mailto:${esc(config.contact.general)}">${esc(config.contact.general)}</a> or use the <a href="/contact/">contact form</a>. We will do our best to fix it, or to give you the information another way.</p>
<p>If you are not satisfied with our reply, you can contact the body that enforces accessibility rules in your country.</p>
</div>
</div>
</section>
`,
};
