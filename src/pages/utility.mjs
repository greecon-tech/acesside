import { btn, pageHero } from '../layout.mjs';

// Pages that are not part of the main journey: form confirmation and "not found".
export default [
  {
    path: '/thanks/',
    title: 'Received',
    description: 'Your message has reached Ace’s Side.',
    noindex: true,
    body: () => `
${pageHero({
  eyebrow: 'Received',
  title: 'Thank you',
  lead: 'Your message has reached Ace’s Side. We use what you sent only to deal with it, as set out in the Privacy Notice.',
})}
<section class="band band--bone">
<div class="wrap">
<p class="measure">If a life is at risk right now, contact your local emergency number. Ace’s Side is not an emergency service.</p>
<div class="actions">${btn('/', 'Back to the home page', 'primary')}</div>
</div>
</section>
`,
  },
  {
    path: '/404.html',
    file: '404.html',
    title: 'Page not found',
    description: 'This page is not here.',
    noindex: true,
    body: () => `
${pageHero({
  eyebrow: 'Error 404',
  title: 'Not here',
  lead: 'The page you asked for is not here. It may have moved, or the link may be wrong.',
})}
<section class="band band--bone">
<div class="wrap">
<div class="actions">
${btn('/', 'Go to the home page', 'primary')}
${btn('/doctrine/', 'Read the Doctrine', 'ghost')}
${btn('/contact/', 'Contact us', 'ghost')}
</div>
</div>
</section>
`,
  },
];
