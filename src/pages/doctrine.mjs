import { esc, pageHero, fmtDate as fmt } from '../layout.mjs';
import { divisions, presence, presenceQuestion, articles, lines, callSteps, oath, stages, duties, governance, amending, restart } from '../content.mjs';

const toc = [
  ['preface', 'Preface'], ['seed', 'The Seed'], ['oath', 'The Oath'], ['presence', 'Presence'],
  ['articles', 'The Ten Articles'], ['divisions', 'The Six Divisions'], ['call', 'The Call'],
  ['lines', 'The Lines'], ['membership', 'Membership'], ['governance', 'Governance and accountability'],
  ['lost', 'If Ace’s Side is ever lost'], ['legacy', 'The Legacy'], ['finds', 'To whoever finds this'],
];

export default {
  path: '/doctrine/',
  reading: true,
  title: 'The Doctrine',
  description: 'The Doctrine of Ace’s Side: the Oath, the Ten Articles, the Six Divisions, the Call, the Lines, and how the alliance is governed and restarted.',
  body: ({ config }) => `
${pageHero({
  eyebrow: 'Ace’s Side',
  title: 'The Doctrine',
  lead: esc(config.tagline),
  status: `Version ${esc(config.doctrine.version)}${config.doctrine.status === 'draft' ? ' draft' : ''} · ${fmt(config.doctrine.date)}`,
})}
<div class="band band--bone">
<div class="wrap doc">
<nav class="toc" aria-label="Contents"><h2>Contents</h2><ol>
${toc.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('\n')}
</ol></nav>
<div class="doc-body">
${config.doctrine.status === 'draft' ? `<p class="draft">This is version ${esc(config.doctrine.version)}, a draft dated ${fmt(config.doctrine.date)}. It has not yet been approved by the founders. The Oath, Articles 1 to 3 and the Lines are the foundation and are never amended. Everything else can change through the process set out under <a href="#governance">Governance and accountability</a>.</p>` : ''}

<section id="preface" aria-labelledby="h-preface">
<h2 class="display h2" id="h-preface">Preface</h2>
<p>Ace’s Side is a leadership alliance that answers when the world needs it. It is built on one principle, Presence: consciousness, justice and progress working as one force.</p>
<p>It is more than an organization. It is a call to people and nations to treat peace, prosperity and human potential as the normal state of civilization, not a distant dream.</p>
<p>Ace’s Side exists to move the world from chaotic development to enlightened development: progress refined by wisdom and guided by purpose. It works at every scale at once, supporting communities, advising nations and shaping global systems.</p>
<p>This Doctrine turns the founding text into rules a team can live by.</p>
</section>

<section id="seed" aria-labelledby="h-seed">
<h2 class="display h2" id="h-seed">The Seed</h2>
<p>If you read only one section, read this one. It holds everything needed to start Ace’s Side again.</p>
<ul>
<li><strong>What it is:</strong> a leadership alliance that answers when the world needs it.</li>
<li><strong>Its promise:</strong> When the world needs us, we are here.</li>
<li><strong>Its principle:</strong> Presence: full awareness, responsibility and empowerment.</li>
<li><strong>Its law:</strong> the Ten Articles, and the Lines it never crosses.</li>
<li><strong>Its shape:</strong> six divisions (Concord, Prosper, Ascend, Ward, Terra, Lumen), a Council, and members who take the Oath.</li>
<li><strong>Its method:</strong> the Call: signal, assess, convene, act, account, hand over.</li>
<li><strong>Its mark:</strong> the Emblem, which can be rebuilt from its source code.</li>
</ul>
<p>Three people who take the Oath and keep the Lines are enough to begin.</p>
</section>

<section id="oath" aria-labelledby="h-oath">
<h2 class="display h2" id="h-oath">The Oath</h2>
<p>Every member makes one public promise: <strong>When the world needs us, we are here.</strong></p>
<p>The full oath is spoken at induction:</p>
<blockquote class="doc-oath">
${oath.map((l) => `<p>${esc(l)}</p>`).join('\n')}
</blockquote>
<p>The short line is what the world hears. The full oath is what members live by, and they renew it each year.</p>
</section>

<section id="presence" aria-labelledby="h-presence">
<h2 class="display h2" id="h-presence">Presence: the spirit engine</h2>
<p>Presence is full awareness, responsibility and empowerment, held at the same time. Every leader and every member of Ace’s Side must embody it.</p>
<p>A society’s strength is not only its infrastructure or wealth. It is the consciousness of the people who guide it.</p>
<p>Presence has five parts:</p>
<ul>
${presence.map((p) => `<li><strong>${esc(p.name)}:</strong> ${esc(p.text.charAt(0).toLowerCase() + p.text.slice(1))}</li>`).join('\n')}
</ul>
<p>Before any decision, every member asks one question: <em>${esc(presenceQuestion)}</em></p>
</section>

<section id="articles" aria-labelledby="h-articles">
<h2 class="display h2" id="h-articles">The Ten Articles</h2>
<p>Ten principles from the founding text govern everything Ace’s Side does. When two articles conflict, the lower number wins.</p>
<ol>
${articles.map((a) => `<li><strong>${esc(a.title)}</strong> ${esc(a.text)}</li>`).join('\n')}
</ol>
</section>

<section id="divisions" aria-labelledby="h-divisions">
<h2 class="display h2" id="h-divisions">The Six Divisions</h2>
<p>Ace’s Side works through six divisions, each covering one area of the founding text. Like a team of specialists, each division has its own strength, and the strongest missions draw on several at once.</p>
<div class="table-wrap" role="region" aria-label="Divisions table" tabindex="0">
<table>
<thead><tr><th scope="col">Division</th><th scope="col">Area</th><th scope="col">What it protects</th><th scope="col">Its work</th></tr></thead>
<tbody>
${divisions.map((d) => `<tr><td>${esc(d.name)}</td><td>${esc(d.area)}</td><td>${esc(d.protects)}</td><td>${esc(d.work)}</td></tr>`).join('\n')}
</tbody>
</table>
</div>
<p>Lumen sits at the center. Every member trains through Lumen before joining another division, because Presence comes first.</p>
</section>

<section id="call" aria-labelledby="h-call">
<h2 class="display h2" id="h-call">The Call</h2>
<p>When the world needs Ace’s Side, the response follows six steps, in order, every time.</p>
<ol>
${callSteps.map((s) => `<li><strong>${esc(s.name)}.</strong> ${esc(s.text)}</li>`).join('\n')}
</ol>
<p>A call is declined if it fails the assessment. Saying no to the wrong mission protects the right ones.</p>
</section>

<section id="lines" aria-labelledby="h-lines">
<h2 class="display h2" id="h-lines">The Lines</h2>
<p>These lines are never crossed, by any member, for any reason. Crossing one ends membership.</p>
<ul>
${lines.map((l) => `<li><strong>${esc(l.title)}</strong> ${esc(l.text)}</li>`).join('\n')}
</ul>
</section>

<section id="membership" aria-labelledby="h-membership">
<h2 class="display h2" id="h-membership">Membership</h2>
<p>Members earn their place through training and service, in five stages:</p>
<ol>
${stages.map((s) => `<li><strong>${esc(s.name)}.</strong> ${esc(s.text.replace('under Accountability', 'in the next section'))}</li>`).join('\n')}
</ol>
<p>Call signs are one word, chosen by the member with their team. They must not be a real person’s name or a character owned by another company.</p>
<p>Every member has four standing duties: ${duties.map((d) => esc(d.charAt(0).toLowerCase() + d.slice(1).replace(/\.$/, ''))).join(', ').replace(/, ([^,]*)$/, ' and $1')}.</p>
</section>

<section id="governance" aria-labelledby="h-governance">
<h2 class="display h2" id="h-governance">Governance and accountability</h2>
<p>The Council governs Ace’s Side, and its power is checked so that no single person can steer the alliance alone.</p>
<ul>
${governance.map((g) => `<li><strong>${esc(g.title)}</strong> ${esc(g.text)}</li>`).join('\n')}
</ul>
<p><strong>Amending this Doctrine.</strong> The Doctrine can change, but its foundations cannot.</p>
<ul>
${amending.map((a) => `<li>${esc(a)}</li>`).join('\n')}
</ul>
</section>

<section id="lost" aria-labelledby="h-lost">
<h2 class="display h2" id="h-lost">If Ace’s Side is ever lost</h2>
<p>Organizations fade, files vanish and websites close. This Doctrine is written so that Ace’s Side can come back from almost nothing.</p>
<p><strong>Restart protocol:</strong></p>
<ol>
${restart.map((r) => `<li><strong>${esc(r.name)}</strong> ${esc(r.text)}</li>`).join('\n')}
</ol>
<p><strong>If the name cannot be recovered,</strong> keep the Doctrine, the Oath and the Emblem, and choose a new name by Council vote. The name is a label; Presence is the alliance.</p>
</section>

<section id="legacy" aria-labelledby="h-legacy">
<h2 class="display h2" id="h-legacy">The Legacy</h2>
<p>Ace’s Side is built to endure, grow and lift humanity for generations. It marks the move from survival-based civilizations to enlightened ones.</p>
<p>In that future, nations act not as separate rivals but as one force moving toward a shared future. Peace, progress and justice are the ground we stand on, not the prize we chase.</p>
<p>Ace’s Side is not just an initiative. It is a legacy in the making, shaped by Presence and guided by purpose.</p>
<p><strong>When the world needs us, we are here.</strong></p>
</section>

<section id="finds" aria-labelledby="h-finds">
<h2 class="display h2" id="h-finds">To whoever finds this</h2>
<p>If you are reading this, Ace’s Side may have gone quiet. That does not mean it is over.</p>
<p>Everything it stood for is on these pages: a team that answers when the world needs it, guided by Presence and bound by the Ten Articles and the Lines. You do not need a building or a budget to begin. You need two other people and the Oath.</p>
<p>Start with the Seed, then follow the restart protocol. Be humble, be steady and be present.</p>
<p><strong>When the world needs us, we are here.</strong></p>
</section>

</div>
</div>
</div>
`,
};
