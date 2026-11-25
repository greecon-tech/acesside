import { esc, pageHero, form } from '../layout.mjs';

export default {
  path: '/contact/',
  title: 'Contact',
  description: 'Write to Ace’s Side about a partnership, a press question or anything else.',
  body: ({ config }) => `
${pageHero({
  eyebrow: 'Get in touch',
  title: 'Contact',
  lead: 'Write to us about a partnership, a press question or anything else.',
})}
<section class="band band--bone" aria-labelledby="write">
<div class="wrap split">
<div>
<h2 class="display h2" id="write">Send a message</h2>
${form({
    name: 'contact',
    submit: 'Send message',
    purpose: 'read and answer my message',
    fields: [
      { name: 'name', label: 'Your name', required: true, autocomplete: 'name' },
      { name: 'email', type: 'email', label: 'Email address', required: true, autocomplete: 'email' },
      { name: 'topic', type: 'select', label: 'What is this about?', required: true, options: ['A partnership or collaboration', 'Press or media', 'Something else'] },
      { name: 'message', type: 'textarea', label: 'Your message', required: true },
    ],
  })}
</div>
<div class="contact-aside">
<div><h2>By email</h2><p><a href="mailto:${esc(config.contact.general)}">${esc(config.contact.general)}</a></p></div>
<div><h2>Your data</h2><p>See, correct or delete what you have sent us: <a href="mailto:${esc(config.contact.privacy)}">${esc(config.contact.privacy)}</a>. Read the <a href="/privacy/">Privacy Notice</a>.</p></div>
</div>
</div>
</section>
`,
};
