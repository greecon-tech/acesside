// The alliance's own words, published on the website.
//
// Everything here is shown on the public pages (home, divisions, the Call, membership, accountability).
// The Doctrine itself is NOT published as a page, by the founders' decision (25 Nov 2026): there is no
// /doctrine/ page and the word does not appear on the site. Do not add one without the founders' approval.
// The Doctrine's restart protocol and the founders' open decisions are internal and are not in this file.
//
// Voice rules applied (Brand Book, "Voice and messaging"):
//   say less, mean more · show, don't boast · no enemies · hope with proof.
// Words kept out of all public copy: army, soldiers, troops, empire, conquest, dominion, save the world,
// heroes, destiny, chosen few, awakened, assemble, and the name of the source of the Brand Book's inspiration.

export const divisions = [
  {
    code: 'CN', name: 'Concord', area: 'Peace and diplomacy',
    protects: 'Stability between nations',
    work: 'Mediation, advising governments, building systems of cooperation and balanced power.',
  },
  {
    code: 'PR', name: 'Prosper', area: 'Shared prosperity',
    protects: 'Economic mobility',
    work: 'Strategic partnerships, green industries, support for entrepreneurs, development ecosystems.',
  },
  {
    code: 'AS', name: 'Ascend', area: 'Human development',
    protects: 'Every person’s potential',
    work: 'Access to education and healthcare, mental well-being, youth empowerment, leadership training.',
  },
  {
    code: 'WD', name: 'Ward', area: 'Technology and protection',
    protects: 'Safe systems for people',
    // Doctrine says "defense against harmful autonomous systems". Softened per the Brand Book's
    // legal flag on implying security or official powers. See docs/HANDOVER.md.
    work: 'Sustainable infrastructure, intelligent governance, secure digital and control systems, and safeguards against harmful autonomous systems.',
  },
  {
    code: 'TR', name: 'Terra', area: 'Planet',
    protects: 'Harmony with nature',
    work: 'Renewable systems, agricultural innovation, water solutions, climate response.',
  },
  {
    code: 'LM', name: 'Lumen', area: 'Presence',
    protects: 'The alliance’s inner alignment',
    work: 'Training in awareness, purpose and self-mastery; keeping every division true to the Articles.',
  },
];

export const presence = [
  { name: 'Awareness', text: 'See the whole situation, including the people affected who are not in the room.' },
  { name: 'Responsibility', text: 'Own the outcome, including the parts that go wrong.' },
  { name: 'Empowerment', text: 'Leave people stronger and more capable than before we arrived.' },
  { name: 'Alignment', text: 'Act from integrity and purpose, never from ego, scarcity or ambition alone.' },
  { name: 'Self-mastery', text: 'Lead yourself first. Humility and clarity come before command.' },
];

export const presenceQuestion = 'Am I acting from Presence, or from fear, ego or haste?';

export const articles = [
  { title: 'Protect life.', text: 'No goal, partner or deadline outranks a human life.' },
  { title: 'Act from Presence.', text: 'Decisions come from awareness and integrity, never from ego, scarcity or fear.' },
  { title: 'Balance, not domination.', text: 'We prevent conflict through cooperation and respect for every nation’s sovereignty.' },
  { title: 'Wisdom decides.', text: 'Choices that affect humanity’s future rest on wisdom, data and collective well-being, not rivalry.' },
  { title: 'Prosperity is shared, not hoarded.', text: 'We remove the barriers that limit economic mobility.' },
  { title: 'Access for everyone.', text: 'Education, healthcare, mental well-being and opportunity are rights, not privileges.' },
  { title: 'Innovation with ethics.', text: 'Science and technology advance only with strong ethical grounding.' },
  { title: 'Harmony with the planet.', text: 'Progress must protect nature and the quality of life it supports.' },
  { title: 'Collaboration over competition.', text: 'We build movements, not rivals, and lift others as we rise.' },
  { title: 'Inner and outer mastery.', text: 'Personal evolution and global evolution are one path.' },
];

export const lines = [
  { title: 'No domination.', text: 'We never use power, money or force to control a people or a nation.' },
  { title: 'No action without standing.', text: 'We never act inside a country without an invitation or a legal basis.' },
  { title: 'No weapons of harm.', text: 'We never build, sell or deploy weapons or autonomous systems designed to hurt people.' },
  { title: 'No profit from crisis.', text: 'We never take advantage of people at their most vulnerable.' },
  { title: 'No false authority.', text: 'We never claim to be a government or official body, or to hold powers we do not have.' },
  { title: 'No misuse of data.', text: 'We never collect or use anyone’s personal data without their informed consent.' },
  { title: 'No hidden mistakes.', text: 'We never cover up failures or harm we have caused.' },
  { title: 'No glory-seeking.', text: 'No member takes credit ahead of the people we serve.' },
];

export const callSteps = [
  {
    name: 'Signal',
    short: 'A community, partner, nation or member raises a need. Every signal is logged.',
    text: 'A community, partner, nation or member raises a need. Every signal is logged, even the ones we decline.',
  },
  {
    name: 'Assess',
    short: 'Is life at risk? Are we the right responder? Do we have an invitation or a legal basis?',
    text: 'Within a set response time, the duty lead answers three questions: Is life at risk? Are we the right responder? Do we have an invitation or a legal basis to act?',
  },
  {
    name: 'Convene',
    short: 'A lead forms a mission team from the divisions the need requires.',
    text: 'The lead forms a mission team from the divisions the need requires. Each member has a defined role and a named lead.',
  },
  {
    name: 'Act',
    short: 'One clear objective and a defined end point. Local partners lead wherever they can.',
    text: 'The team works to one clear objective with a defined end point. Local partners lead wherever they can.',
  },
  {
    name: 'Account',
    short: 'We report what was done, what it cost and what went wrong.',
    text: 'The team reports what was done, what it cost and what went wrong. Mistakes are reported, never hidden.',
  },
  {
    name: 'Hand over',
    short: 'We leave capacity behind and withdraw once local partners can carry the work.',
    text: 'The team leaves capacity behind and withdraws once local partners can carry the work.',
  },
];

export const oath = [
  'I stand on Ace’s Side.',
  'I answer when I am called, and I do not wait to be thanked.',
  'I act from Presence, not from ego, scarcity or fear.',
  'I protect life, respect every nation’s sovereignty and serve the common good.',
  'I hold the line with my team, and my team holds it with me.',
  'When the world needs us, we are here.',
];

export const stages = [
  { key: 'candidate', name: 'Candidate', text: 'Applies or is nominated by a member. Is checked for conflicts of interest and fit with the Articles.' },
  { key: 'initiate', name: 'Initiate', text: 'Completes Presence training through Lumen, takes the Oath and joins a division.', mark: 'initiate' },
  { key: 'member', name: 'Member', text: 'Serves on missions, earns a call sign and receives the member card.', mark: 'member' },
  { key: 'ace', name: 'Ace', text: 'Leads mission teams and mentors initiates. The title is earned through service and peer recognition, never bought.', mark: 'ace' },
  { key: 'council', name: 'Council', text: 'A small group of Aces who govern the alliance, as set out under Accountability.', mark: 'council' },
];

export const duties = [
  'Keep training.',
  'Keep the Lines.',
  'Renew the Oath each year.',
  'Answer the Call when able.',
];

export const governance = [
  { title: 'Decisions.', text: 'The Council seeks consensus. Where consensus fails, a decision needs two-thirds of the Council.' },
  { title: 'Conflicts of interest.', text: 'Every member declares them in writing. A member never votes on a matter where they have one.' },
  { title: 'Ethics review.', text: 'A reviewer independent of the Council checks every major mission against the Articles and the Lines.' },
  { title: 'Transparency.', text: 'Ace’s Side publishes a yearly report on missions, funding and mistakes.' },
  { title: 'Removal.', text: 'Any member, including a Council member, can be removed for crossing a Line.' },
];

export const amending = [
  'The Oath, Articles 1 to 3 and the Lines are never amended. They can only be restated more clearly, by unanimous Council vote.',
  'Any other change needs three-quarters of the Council and 90 days of open comment from all members.',
  'Every change is dated and recorded in the version log, with who approved it.',
  'If two copies disagree, the one with the later approved date wins. If neither has a date, the one signed by more Council members wins.',
];

export const shortDescription =
  'Ace’s Side is a visionary leadership alliance built on Presence: consciousness, justice and progress working as one force. ' +
  'Through six divisions covering diplomacy, shared prosperity, human development, technology, the planet and inner mastery, ' +
  'it supports communities, advises nations and helps shape global systems. It exists for one moment above all others. ' +
  'When the world needs us, we are here.';

export const taglines = {
  primary: 'When the world needs us, we are here.',
  secondary: 'Shaped by Presence. Guided by purpose.',
  campaign: 'Answer the call.',
};

// A line of the founders', set as a quote on the home page. No attribution: it is the alliance's own.
export const quote = 'A team of people, standing together in service of humanity.';

// Initiatives. Only one is stated so far. Its public name, "Presence OS", is the founders' decision (25 Nov 2026).
// Anything beyond that name stays in plain, general words: do not describe what it is or does, and do not
// invent further initiatives. Add each one only when the founders provide it. The build refuses to publish
// the founders' private name for it (tools/guard.mjs). (Voice: show, don't boast; no claim about work done,
// partners or results.)
export const mainInitiative = {
  label: 'Our main initiative',
  name: 'Presence OS',
  text: 'Presence OS is the ground everything else stands on. We are building it step by step: first in ourselves, then wherever we are called.',
  status: 'In progress',
};
export const initiativesNote = 'Other initiatives will follow. We announce them when they are ready, not before.';
