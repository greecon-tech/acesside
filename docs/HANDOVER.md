# Handover: the Ace's Side website

Version 2, 25 November 2026. Seven pages, no JavaScript, no cookies, no third-party requests. A first visit to the home page is about 75 KB.

## What changed in this version, and why

The founders asked for four things:

1. **Do not publish the Doctrine.**
2. **Share much less.** Keep most things internal and confidential.
3. **Make the black-and-white version of the brand the main one.**
4. **Optimise the site better for mobile.**

## Public and internal

The site is a front door, not a map. It publishes only the wording the Brand Book itself wrote for public use (its "Voice and messaging" section), a contact form, and the legal pages.

| On the public site | Kept internal (not on the site) |
| --- | --- |
| The tagline, the two supporting taglines | The Doctrine, in whole or in part |
| The one-line description | The Oath, the Ten Articles, the Lines |
| A contact form | Divisions: names, areas and work |
| Legal notice, privacy notice, accessibility statement | The Call, membership stages, ranks, the Council, governance, the restart protocol |
| | The Brand Book's rules and Legal protection analysis |

The word "Presence" appears only because it is in the approved one-line description.

`src/content.mjs` is the only file of alliance wording the build reads. It holds three taglines and says, in a comment, not to add Doctrine content without the founders' approval.

**Enforced by the verifier.** `tools/verify.mjs` fails if any page, `robots.txt`, `sitemap.xml`, the manifest or `security.txt` contains Doctrine vocabulary (doctrine, council, the division names, oath, member, candidate and so on), or if any of the removed pages is published.

### The removed pages

The Doctrine, Divisions, The Call, Membership and Accountability pages are gone from the site. Their old addresses redirect to the home page (`netlify.toml`), so old links and any search engine that saw an earlier deploy land somewhere sensible. The signal and candidacy forms are gone; there is one form, Contact.

**They are not deleted from history.** The pages and their text are in git commit `e8577fd`. To bring one back:

```bash
git show e8577fd:src/pages/doctrine.mjs      # print it
git checkout e8577fd -- src/pages/doctrine.mjs   # restore it
```

Anyone with access to this repository can read that history. It is private, so this is only a risk if access is shared too widely. Cleaning the history is possible, but it rewrites the repository for everyone who has a copy, so it needs a deliberate decision from the founders. See `docs/DEPLOY.md`, "If an earlier version was ever deployed", for the other places the old pages could still exist.

Other things removed with the pages: the Spectral typeface (it was used only for the Doctrine), the rank marks, and the "Founding stage / Doctrine v1.0 draft" notices in the footer and home page.

## Black and white as the main version

The Brand Book approves three versions of the Emblem. The main look is now the black-and-white one, **Night: Bone on Void**:

- Header, hero, closing band and footer are Void (`#050505`) with the Bone Emblem and Bone text.
- A Bone band gives rhythm and carries the contact form and the legal text, in Void ink.
- **Beacon amber stays the single signal:** the rule under the headline, the call-to-action button and the star in it. Stone is used only for secondary text on Void (8.3:1).
- Favicon, app icons and the share card (the LinkedIn preview) are all the Night version. Masters for it are in `brand/` (`aces-side-night-tile.svg`, `aces-side-night-app-tile.svg`, `mark-cream.svg`). The original Stone-on-Charcoal masters are still there for other uses.

**One extension to flag.** The Brand Book's approved pairings are Stone on Charcoal, Bone on Void and Charcoal on Bone. On the Bone bands I use **Void ink** rather than Charcoal, because Charcoal reads as grey and the brief is black and white. It uses only palette colors, so no new color is introduced, but it is not one of the three listed pairings. If the founders prefer Charcoal ink, it is one value in `src/css/main.css`.

## Mobile

Rebuilt mobile-first, and checked at 320, 360, 375, 390, 412 and 430 px with touch emulation:

- **One-row header.** The Emblem, the name and one Contact button, instead of a navigation block that wrapped onto three lines.
- **The promise and its button arrive together.** The hero fills the visible screen (using `svh`, so the browser's address bar does not push the button off), and the button is checked to sit above the fold on 375 × 667, 360 × 640 and 390 × 844 screens.
- **Thumb-sized.** Buttons are full width and at least 52 px tall; every tappable item is checked to be at least 44 px.
- **No iOS zoom on focus.** Every form field is 17 px, and the check fails below 16 px.
- **Right keyboard.** The email field brings up the email keyboard and does not autocorrect; names get capitals.
- **Notches and rounded corners.** `viewport-fit=cover` with safe-area padding on the header, the page edges and the footer.
- **Pinch zoom stays allowed.** The browser theme color is Void.
- **Smaller.** Without the removed pages and the Spectral font, the home page is lighter.

## Where I changed your wording

| What | Note |
| --- | --- |
| Everything not in the Brand Book's public messaging | Removed |
| New copy on the site | Page leads, the form labels, the Contact page, the legal pages. Read these as drafts. |

## Brand findings from the first version (still true)

1. **The Emblem cannot be restored by copying Appendix A out of the PDF.** The PDF's line wrapping swallows nine spaces, and the pasted code draws a broken shape. I repaired it and checked it against the Brand Book's size and symmetry test. The verified master is `brand/aces-side-emblem.svg`. The Brand Book's Appendix A should be corrected. `node tools/make-brand-assets.mjs` regenerates every variant, the tiles, the favicons and the share card from that file.
2. **The display typeface is Michroma**, named in the PDFs' embedded fonts, and free for commercial use. That answers the Brand Book's open typeface question.

## Engineering

- **Stack:** plain HTML and CSS generated by one dependency-free Node script (`build.mjs`). No framework, no runtime JavaScript.
- **Files:** `src/content.mjs` (the three taglines) · `src/pages/*.mjs` (one file per page) · `src/layout.mjs` (header, footer, form builder, the Emblem) · `src/css/main.css` · `brand/` · `tools/` · `public/` (the built site, committed so it can be dragged into Netlify).
- **Commands:** `node build.mjs` builds. `npm start` previews at http://localhost:8888 with the production headers. `npm run verify` builds and runs the quality gate (needs `npm install` and `npx playwright install chromium` once).
- **What `verify` checks (about 630 checks):** the real Content-Security-Policy is enforced with no violations; no request leaves the site; no console errors; axe-core against WCAG 2.2 A and AA on every page at desktop and phone width; six phone widths for overflow, tap-target size and input text size; the first screen on three phone sizes; every link and anchor; the form's Netlify attributes and required consent; the skip link; reduced motion; the Brand Book's name, banned-word, typeface and Beacon-star rules; and the confidentiality scan above.
- **Security:** strict CSP (`default-src 'self'`), `frame-ancestors 'none'`, HSTS, `nosniff`, referrer and permissions policies. Hashed asset names with one-year caching. The headers also ship in `public/_headers` so a drag-and-drop deploy is just as protected.
- **Tested in Chromium only.** Not run in Safari or Firefox, and not on real phones. Worth a manual pass, especially an iPhone, before launch.

## Technology and operations

Hosting, DNS, the form, email, the soft-launch switch and rollback are in **`docs/DEPLOY.md`**. Three things need people, not code: **create the three mailboxes**, **set the form's notification email in Netlify**, and **point DNS**.

## Legal

See **`docs/LEGAL.md`**. The Brand Book's own Protect checklist is still open (trademark clearance, entity registration, domain ownership, designer assignments), and the privacy notice contains a proposed retention period and transfer wording a lawyer must confirm. The site makes no claim to be registered, official or tax-exempt.

## Decisions I need from the founders

1. Go live now, or deploy with `SITE_INDEXING=off` until the Protect checklist is done?
2. Who receives the contact form's notifications, and who owns `hello@`, `privacy@` and `security@`?
3. Is the home page the right amount of information, or even less? (For example, the one-line description could be the only text.)
4. Void ink on Bone bands (current) or Charcoal ink?
5. Should the git history that contains the removed pages be cleaned?
