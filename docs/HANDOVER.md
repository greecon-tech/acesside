# Handover: the Ace's Side website

Version 4, 25 November 2026. Nine pages, no JavaScript, no cookies, no third-party requests, no forms.

## What this version is

Everything from the first version **except the Doctrine page**, plus the changes the founders asked for since:

| Asked for | Done |
| --- | --- |
| Do not publish the Doctrine | No `/doctrine/` page, no link to it, and the word "Doctrine" appears nowhere on the site (the checker enforces it). `/doctrine` redirects to the home page. |
| Black-and-white version as the main look | Night version, Bone on Void. Bone bands for rhythm. Beacon amber is the only signal. |
| Better mobile | Mobile-first; a Menu button on phones (a native disclosure, no JavaScript), thumb-sized tap targets, safe-area padding, the promise on the first screen. |
| A little new content, inspired by the Brand Book's source of inspiration | "One cause. Many strengths." on the home page, and the closing "Answer the call". |
| No way to contact the alliance; it reaches out | No forms, no contact page, no contact button, no `hello@` or `security@`, no `security.txt`. |

The founders' corrections to my earlier work: version 2 removed far more than the Doctrine page (Divisions, the Call, Membership, Accountability and most of the home page). Version 4 restores all of that.

## The pages

| Page | Address | Notes |
| --- | --- | --- |
| Home | `/` | Promise, "One cause. Many strengths.", Presence, six divisions, the Call, eight Lines, "Answer the call" |
| Divisions | `/divisions/` | The six divisions in detail |
| The Call | `/call/` | The six steps. **No form**: it says the site has no form for signals, and that Ace's Side reaches out |
| Membership | `/membership/` | Five stages with rank marks, four duties, call signs, the Oath. **No application form**: membership begins with an invitation |
| Accountability | `/accountability/` | Ten Articles, eight Lines, governance, what can never change, reports |
| Legal notice, Privacy, Accessibility | `/legal/` `/privacy/` `/accessibility/` | |
| Not found | `/404.html` | |

Short links: `/oath`, `/join`, `/signal`, `/privacy-policy`, `/terms`.

## What is public from the Doctrine, and what is not

"The Doctrine" as a document is not published. But the restored pages carry much of its substance, so the founders should know exactly where the line is:

| Public (on the site) | Not public |
| --- | --- |
| The Presence principle and its five parts | The Preface and the Seed |
| The six divisions, their areas and work | The restart protocol ("If Ace's Side is ever lost") |
| The Call: the six steps | The Legacy, and "To whoever finds this" |
| The Ten Articles and the eight Lines | The Doctrine's "Open decisions for the founders" |
| Membership stages, duties, call signs, the Oath | The version log and approval status |
| Governance, and the rules for amending | Any reference to the Doctrine by name |

If the founders also want any of the public column private, it is a one-file edit (`src/content.mjs` and the page that uses it). Ask me.

## Where the wording was changed

Each is one line in `src/content.mjs`:

| Source says | Site says | Why |
| --- | --- | --- |
| Ward: "secure digital and **SCADA** systems, **defense against** harmful autonomous systems" | "secure digital and control systems, and **safeguards against** harmful autonomous systems" | Brand Book legal flag on implying security powers |
| Assess: "Within **[response time]**" | "Within **a set response time**" | Not decided yet |
| Membership: "Applies or is nominated by a member" | Stage text kept; the page adds "there is no application form on this website" | No way to contact the alliance |
| Accountability: "The Doctrine can change…" | "The rules can change…" | The Doctrine is not mentioned |

## The new copy, and the inspiration

**The founders' quote:** “A team of people, standing together in service of humanity.” It is set as a pull quote on the home page, under "One cause. Many strengths.", with no attribution (`quote` in `src/content.mjs`). It did not come from the Brand Book or the Doctrine PDFs, so the founders supplied it directly.

The rest of the new copy:

"Hard problems are not solved by one person, one nation or one skill. They are met by people who are each excellent at something different, and who share one cause." and the closing "There is no form to fill in and no address to write to. When there is a place for you, or a need we can meet together, we reach out."

The Brand Book says Ace's Side takes three things from its source of inspiration: *a team of distinct specialists, one shared cause, and the readiness to answer a call*. The new copy is built on those three. **The source is never named on the site, and none of its words, phrases or imagery are used.** The Brand Book is explicit that this is private inspiration and that its owner holds trademarks on those names and phrases. The checker fails the build if the name, "assemble", "heroes", "superpowers", "mightiest" or similar words appear.

## No way to contact the alliance

**Enforced by the checker.** `tools/verify.mjs` fails if any page contains a form, input, phone or messaging link, a link to a contact page, or an email link outside the Privacy Notice. Proven by injecting each of those into a built page.

**The one exception: `privacy@acesside.com`, on the Privacy Notice only.** Data-protection law lets people exercise rights over their data (the host logs IP addresses) and requires the controller to say how. The page says the address is for data-protection requests only. The Legal and Accessibility pages point to the Privacy Notice instead of repeating it. See `docs/LEGAL.md` section 2: some countries also require a way to contact the site's operator.

## Brand and design

- **Main look: Night, Bone on Void.** Beacon amber appears as the rule under headlines and as the single star above "Answer the call".
- **One extension to flag:** on the Bone bands the ink is Void, not Charcoal. Not one of the Brand Book's three listed pairings, but it uses only palette colors. One value in `src/css/main.css` changes it.
- Favicon, app icons and the share card are the Night version. `brand/` keeps the verified Emblem master and all masters.
- Enforced by the checker: name spelling, banned words, at most two typefaces per page (Michroma and Inter), one Beacon star, contrast.
- **Two Brand Book findings:** (1) Appendix A's Emblem code cannot be copied out of the PDF intact; its line wrapping drops nine spaces. The verified master is `brand/aces-side-emblem.svg`. (2) The display typeface in both PDFs is Michroma, free for commercial use.

## Mobile

Checked at six widths (320 to 430 px, touch, 2x): no sideways scroll, tap targets at least 44 px, pinch zoom allowed, safe-area padding, and the Emblem, promise and description on the first screen of common small phones. The navigation is a closed Menu button on phones and an inline row from 56 rem up; tested by tap, by keyboard and on desktop.

## Engineering

- **Stack:** plain HTML and CSS from one dependency-free Node script (`build.mjs`). No framework, no runtime JavaScript.
- **Files:** `src/content.mjs` (the alliance's words) · `src/pages/*.mjs` (one file per page) · `src/layout.mjs` · `src/css/main.css` · `brand/` · `tools/` · `public/` (built, committed so it can be dragged into Netlify).
- **Commands:** `node build.mjs`; `npm start` (preview with the production headers); `npm run verify` (needs `npm install` and `npx playwright install chromium` once).
- **Verifier (about 910 checks):** the real Content-Security-Policy with no violations; no request leaves the site; no console errors; axe-core WCAG 2.2 A/AA on every page at desktop and phone width; six phone widths; the first screen; the menu; links and anchors; the name, banned-word, typeface and Beacon-star rules; the no-Doctrine rule; the no-contact rule.
- **Security:** strict CSP, `frame-ancestors 'none'`, HSTS, `nosniff`, referrer and permissions policies. Headers also ship in `public/_headers`, so dragging `public/` into Netlify is as protected as a Git deploy.
- **Tested in Chromium only.** Not run in Safari or Firefox or on real phones. Worth a manual pass, especially an iPhone.

## Operations and legal

Hosting, DNS, the one mailbox and the soft-launch switch are in **`docs/DEPLOY.md`**. The legal checklist, including the contact-details question and the division-name clearance, is **`docs/LEGAL.md`**.

## Decisions I need from the founders

1. Go live now, or deploy with `SITE_INDEXING=off` until the Protect checklist is done? (The division names are public again, and they still need clearance.)
2. Who owns `privacy@acesside.com`, and is a data-protection address the right single exception?
3. Is the public/not-public split above right? In particular, the Oath, the Lines and the Articles are public.
4. Void ink on Bone bands (current), or Charcoal?
5. Should the git history be cleaned of anything the founders decide is private?
