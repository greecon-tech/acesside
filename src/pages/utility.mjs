import { btn, pageHero } from '../layout.mjs';

// Pages that are not part of the main journey: "not found".
export default [
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
</div>
</div>
</section>
`,
  },
];
