import { esc, pageHero, form } from '../layout.mjs';

export default {
  path: '/contact/',
  title: 'Contact',
  description: 'Write to Ace’s Side about partnerships, press, the use of our name, or a concern. To ask for help, raise a signal.',
  body: ({ config }) => `
${pageHero({
  eyebrow: 'Get in touch',
  title: 'Contact',
  lead: 'Write to us about a partnership, a press question, the use of our name or Emblem, or a concern.',
})}
<section class="band band--bone" aria-labelledby="write">
<div class="wrap split split--wide-left">
<div>
<h2 class="display h2" id="write">Send a message</h2>
${form({
    name: 'contact',
    submit: 'Send message',
    purpose: 'read and answer my message',
    fields: [
      { name: 'name', label: 'Your name', required: true, autocomplete: 'name' },
      { name: 'email', type: 'email', label: 'Email address', required: true, autocomplete: 'email' },
      { name: 'topic', type: 'select', label: 'What is this about?', required: true, options: ['A partnership or collaboration', 'Press or media', 'Use of the name or Emblem', 'A concern about Ace’s Side or a member', 'Something else'] },
      { name: 'message', type: 'textarea', label: 'Your message', required: true },
    ],
  })}
</div>
<div class="prose">
<h2 class="h3">Need help?</h2>
<p>If a community, partner or nation needs Ace’s Side, <a href="/call/#signal">raise a signal</a>. If a life is at risk right now, contact your local emergency number first.</p>
<h2 class="h3">Want to join?</h2>
<p>Apply to <a href="/membership/#apply">become a candidate</a>.</p>
<h2 class="h3">By email</h2>
<p><a href="mailto:${esc(config.contact.general)}">${esc(config.contact.general)}</a></p>
<h2 class="h3">Your data</h2>
<p>To see, correct or delete what you have sent us, write to <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>. See the <a href="/privacy/">Privacy Notice</a>.</p>
<h2 class="h3">Security</h2>
<p>If you have found a weakness in this site, please tell us at <a href="mailto:${esc(config.contact.security)}">${esc(config.contact.security)}</a>. Details are in our <a href="/.well-known/security.txt">security.txt</a>.</p>
</div>
</div>
</section>
`,
};
