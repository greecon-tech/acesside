# Handover: the Ace's Side website

Version 3, 25 November 2026. Five pages, no JavaScript, no cookies, no third-party requests, no forms. A first visit to the home page is about 72 KB.

## What this version does, and why

The founders asked for:

1. **A little real content**, not an empty page, drawing on the inspiration the Brand Book names.
2. **No way for visitors to contact Ace's Side.** The alliance reaches out; nobody writes in.

Earlier versions: black-and-white main look, mobile-first layout, and the Doctrine and everything derived from it kept off the site.

## The pages

| Page | Address | What it holds |
| --- | --- | --- |
| Home | `/` | The promise, the one-line description, "One cause. Many strengths.", the six areas, "How we show up", "Answer the call" |
| Legal notice and terms | `/legal/` | Who runs the site, what Ace's Side is not, terms |
| Privacy notice | `/privacy/` | What little is collected. Holds the one email address on the site |
| Accessibility | `/accessibility/` | What was checked |
| Not found | `/404.html` | |

## The content, and where it comes from

All of it is in `src/content.mjs` and `src/pages/home.mjs`. Three sources, and nothing else:

1. **The Brand Book's own public wording:** the three taglines, the one-line description, and the six areas it names in the approved short description (diplomacy, shared prosperity, human development, technology, the planet, inner mastery). The areas are named and never explained, and the word "divisions" is not used.
2. **New copy in the Brand Book's voice:** "Hard problems are not solved by one person, one nation or one skill…", the three "How we show up" lines (Together, Ready, Humble), and the closing "There is no form to fill in and no address to write to… we reach out."
3. **No Doctrine content.** No structure, names, ranks, oath, articles, lines or process.

**Inspiration, and how it was used.** The Brand Book says Ace's Side takes three things from the source of its inspiration: *a team of distinct specialists, one shared cause, and the readiness to answer a call*. The copy is built on those three, and only those: specialists become the six areas, the shared cause becomes the headline, the readiness becomes "Ready" and "Answer the call". **The source is never named on the site, and none of its words, phrases or imagery are used.** The Brand Book is explicit that this is private inspiration, that its owner holds trademarks on those names and phrases, and that Ace's Side leaves out spectacle, violence and superpowers. The checker enforces it: it fails the build if the name, "assemble", "heroes", "superpowers", "mightiest" or similar words appear.

**What the copy does not do:** claim members, a roster, past work or results (there is none to point to yet, and "show, don't boast" is a Brand Book rule). The six areas and the lines above are statements of belief, not claims of fact.

**Still internal:** the Doctrine and the alliance's internal structure. Removed pages are in git history, commit `e8577fd`; restore one with `git checkout e8577fd -- src/pages/doctrine.mjs`. Anyone with repository access can read that history, so keep the repository private. Cleaning the history would rewrite the repository for everyone who has a copy, so it needs the founders' decision.

## No way to contact the alliance

Removed: the contact form, the Contact button and page, the confirmation page, `hello@` and `security@`, `security.txt`, and Netlify Forms. The old addresses (`/contact/`, `/join`, `/signal` and so on) redirect to the home page.

**Enforced by the checker.** `tools/verify.mjs` fails if any page contains a form, input, `tel:` or messaging link, a link to a contact page, or any email link outside the privacy notice. I proved it by injecting a form, a phone link, a contact link and an email into the built page: all five were caught.

**The one exception: `privacy@acesside.com`, shown only on the Privacy Notice.** It is there because data-protection law lets people exercise rights over their data (the host logs visitors' IP addresses) and requires the controller to say how. The page says it is for data-protection requests only. The Accessibility and Legal pages point to the Privacy Notice instead of repeating it. If the founders want even this gone, see `docs/LEGAL.md` section 2 first: some countries also require a way to contact the site's operator.

## Brand and design

- **Main look: the black-and-white Night version, Bone on Void.** Bone bands give rhythm. Beacon amber is the only signal: the rule under the headline, and the star above "Answer the call" (the star appears once).
- **One extension to flag:** on the Bone bands the ink is Void, not Charcoal. Not one of the Brand Book's three listed pairings, but it uses only palette colors. One value in `src/css/main.css` changes it.
- Favicon, app icons and the share card are the Night version. `brand/` keeps the verified Emblem master and all masters.
- Rules enforced by the checker: name spelling, banned words, at most two typefaces per page (Michroma and Inter), one Beacon star, contrast.
- **Two Brand Book findings:** (1) Appendix A's Emblem code cannot be copied out of the PDF intact, because its line wrapping drops nine spaces; the verified master is `brand/aces-side-emblem.svg`. (2) The display typeface in both PDFs is Michroma, which is free for commercial use.

## Mobile

Built mobile-first and checked at six widths (320 to 430 px, touch, 2x): no sideways scroll, tap targets at least 44 px, safe-area padding for notched phones, pinch zoom allowed, and the Emblem, promise and description fit the first screen of common small phones. The header is a single row (the brand only).

## Engineering

- **Stack:** plain HTML and CSS from one dependency-free Node script (`build.mjs`). No framework, no runtime JavaScript.
- **Files:** `src/content.mjs` · `src/pages/*.mjs` · `src/layout.mjs` · `src/css/main.css` · `brand/` · `tools/` · `public/` (built, committed so it can be dragged into Netlify).
- **Commands:** `node build.mjs`; `npm start` (preview with the production headers); `npm run verify` (needs `npm install` and `npx playwright install chromium` once).
- **Verifier (about 470 checks):** the real Content-Security-Policy with no violations; no request leaves the site; no console errors; axe-core WCAG 2.2 A/AA on every page at desktop and phone width; six phone widths; the first screen; links; the name, banned-word, typeface and Beacon-star rules; the confidentiality scan; and the no-contact rule.
- **Security:** strict CSP, `frame-ancestors 'none'`, HSTS, `nosniff`, referrer and permissions policies. Headers also ship in `public/_headers`, so dragging `public/` into Netlify is as protected as a Git deploy.
- **Tested in Chromium only.** Not run in Safari or Firefox or on real phones. Worth a manual pass, especially an iPhone.

## Operations and legal

Hosting, DNS, the one mailbox and the soft-launch switch are in **`docs/DEPLOY.md`**. The legal checklist, including the contact-details question, is **`docs/LEGAL.md`**.

## Decisions I need from the founders

1. Go live now, or deploy with `SITE_INDEXING=off` until the Protect checklist is done?
2. Who owns `privacy@acesside.com`, and is a data-protection address the right single exception?
3. Is this the right amount of content? It can go either way: cut the six areas, or add one more short paragraph.
4. Void ink on Bone bands (current), or Charcoal?
5. Should the git history containing the removed pages be cleaned?
