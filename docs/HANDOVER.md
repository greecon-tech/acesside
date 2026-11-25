# Handover: the Ace's Side website

Built from the Brand Book and the Doctrine (both v1.0 draft, 24 Nov 2026). Twelve pages, no JavaScript, no cookies, no third-party requests, about 78 KB for a first visit to the home page.

| Page | Address | Notes |
| --- | --- | --- |
| Home | `/` | Hero with the animated Emblem, what we are, Presence, divisions, the Call, the Lines |
| The Doctrine | `/doctrine/` | Full text, print-ready. The only page set in Spectral |
| The six divisions | `/divisions/` | |
| The Call | `/call/` | Six steps, plus the **Raise a signal** form |
| Membership | `/membership/` | Five stages with rank marks, the Oath, the **candidacy** form |
| Accountability | `/accountability/` | Ten Articles, Lines, governance, what can never change |
| Contact | `/contact/` | **Contact** form |
| Legal notice and terms, Privacy, Accessibility | `/legal/` `/privacy/` `/accessibility/` | |
| Thank you, Not found | `/thanks/` `/404.html` | |

Short links: `/oath`, `/join`, `/signal`, `/privacy-policy`, `/terms`, `/security.txt`.

## Communication

**Voice.** Every rule in the Brand Book's Voice section is applied: short sentences; no boasting; no enemies; each big idea followed by one concrete action (a button, a form, a page). The home page's four numbers (6 divisions, 10 Articles, 8 Lines, 1 Oath) are counts of things in the Doctrine, not claims about past work. The site claims no missions, no members and no results, because there is nothing yet to point to.

**Where the words come from.** `src/content.mjs` holds the Doctrine's own text once; the home page, Doctrine page, divisions page and accountability page all draw from it, so they cannot disagree. The one-line and 60-word descriptions, the tagline and the Oath are verbatim.

**Where I changed the source text** (each is one line in `src/content.mjs` or a page file):

| Source says | Site says | Why |
| --- | --- | --- |
| "moving toward a shared **destiny**" (Legacy) | "shared **future**" | Brand Book lists "destiny" under words to avoid |
| Ward: "secure digital and **SCADA** systems, **defense against** harmful autonomous systems" | "secure digital and control systems, and **safeguards against** harmful autonomous systems" | Brand Book legal flag on implying security powers |
| Assess: "Within **[response time]**" | "Within **a set response time**" | The founders have not decided it |
| Preface: "Everything here beyond the founding text is a proposal for the founders to confirm" | removed; replaced by a visible **draft notice** on the Doctrine page | It was a note to the founders |
| "Open decisions for the founders", the restart log table, the Brand Book's open typeface question | not published | Internal |

**Left out on purpose.** The INITIATIVE descriptor (the Brand Book allows it but does not require it, and its Legal protection section flags that word; it is one line to add back in the hero). Division insignia (the Brand Book says they are still "to be drawn"). Photography (none exists, and the Brand Book requires signed releases). The Brand Book's private inspiration is not mentioned anywhere.

**New copy I wrote** (everything not in the Doctrine): page leads and headings, form labels, the emergency notice, "Raise a concern", the legal pages. Read these as drafts.

**The site shows its own status.** The footer says "Founding stage. The Doctrine is version 1.0 (draft)", and the Doctrine page carries a notice that the founders have not yet approved it. The Doctrine's own rule "No hidden mistakes" argues for starting honest. When the founders approve: set `doctrine.status` to `"approved"` in `site.config.json`.

## Brand and design

Every checkable Brand Book rule is enforced by `tools/verify.mjs`, which fails the build if one is broken:

- **Name:** always "Ace’s Side" with a curly apostrophe; never "Aces Side", "Ace Side", "AcesSide". Capitals in the wordmark, lower case `acesside` for the web.
- **Palette:** Charcoal, Stone, Bone, Void, Beacon only. No gradients, glows or shadows. Contrast measured: body text 8.67:1; Beacon on Charcoal 4.98:1; Stone on Charcoal 3.96:1, so Stone is used only for display text of 24 px and larger, as the Brand Book says.
- **Beacon star:** at most one per page (home hero and the signal form).
- **Typefaces:** at most two per page. Michroma for the name and short headlines; Spectral for the Doctrine; Inter for everything else.
- **Emblem:** medium weight at 64 px and above; bold weight below that (header and footer). Never stretched, recoloured or decorated. Clear space and minimum size observed.
- **Motion:** the hero Emblem animates once, slowly: star first, then the spire rises, then the ring closes. Nothing bounces. It is off when the visitor asks for reduced motion.
- **Banned words** (army, empire, destiny, assemble…) cannot appear in the output.

**Two findings about the Brand Book itself:**

1. **The Emblem cannot be restored by copying Appendix A out of the PDF.** The PDF wraps the code in a box and the line breaks swallow nine spaces (for example `648.54395.87` instead of `648.54 395.87`). Pasted as-is, it draws a broken shape. I repaired it and checked it against the Brand Book's own size check (x 244–780, y 181–837) and for left-right symmetry; the verified master is `brand/aces-side-emblem.svg`. Please fix Appendix A (for example, break the lines only at spaces, and print it in a smaller monospaced size) and store `brand/` in the three places Appendix B asks for. `node tools/make-brand-assets.mjs` regenerates every variant, the tile, the favicons and the social card from that one file.
2. **The open typeface question has an answer.** Both PDFs embed **Michroma** (display) and **Spectral** (reading). Michroma is open-licensed and free for commercial use, so the site uses it. If the founders want a different display face, change one `@font-face` line.

**Not made, and not asked for:** LinkedIn profile picture, banners, business cards, letterhead and member cards (the Brand Book's other touchpoints). The generator in `tools/` makes the 800 × 800 profile picture in a few lines if you want it.

## Engineering

- **Stack:** plain HTML and CSS generated by one dependency-free Node script (`build.mjs`). No framework, no bundler, no runtime JavaScript. This follows the Brand Book's "built to outlive its files": one person with Node can rebuild everything.
- **Layout of the repo:** `src/content.mjs` (the words) · `src/pages/*.mjs` (one file per page) · `src/layout.mjs` (header, footer, forms, Emblem) · `src/css/main.css` · `brand/` (Emblem masters) · `tools/` (preview server, verifier, brand-asset generator) · `public/` (the built site, committed so it can be dragged into Netlify) · `docs/`.
- **Commands:** `node build.mjs` builds. `npm start` previews at http://localhost:8888 with the production headers. `npm run verify` builds and runs the quality gate (needs `npm install` and `npx playwright install chromium` once).
- **What `verify` checks** (about 960 checks): the real Content-Security-Policy is enforced with zero violations; no request leaves the site; no console errors; no horizontal scroll at 320 px; axe-core against WCAG 2.2 A and AA plus best practice, on every page at desktop and phone width; every link and anchor resolves; forms have the right Netlify attributes and require consent; keyboard skip link works; reduced motion is respected; the Brand Book rules above.
- **Security:** strict CSP (`default-src 'self'`, no inline script or style), `frame-ancestors 'none'`, HSTS, `nosniff`, referrer and permissions policies. Hashed asset file names with one-year caching.
- **Performance:** home page 6.5 KB HTML + 5.2 KB CSS (gzip) + 66 KB fonts, five requests. Fonts are self-hosted and preloaded.
- **Browsers:** current Chrome, Edge, Safari and Firefox. The hero headline uses container-query units (2023+) with a plain `vw` fallback for older browsers.
- **Tested in Chromium only.** Not run in Safari or Firefox, and not on real phones. Worth a manual pass before launch.

## Technology and operations

Hosting, DNS, forms, email, soft-launch switch and rollback are in **`docs/DEPLOY.md`**. Three things need people, not code: **create the three mailboxes**, **set form notification emails in Netlify**, and **point DNS**.

## Legal

The full list is in **`docs/LEGAL.md`**. The headline: the Brand Book's own Protect checklist (trademark clearance, entity registration, domain ownership, designer assignments, division-name clearance) is still open, and the privacy notice contains proposed retention periods and transfer wording that a lawyer must confirm. The site makes no claim to be registered, official, or tax-exempt.

## Decisions I need from the founders

1. Go live now, or deploy with `SITE_INDEXING=off` until the Protect checklist is done?
2. Are applications and signals open now? (The forms are live; someone must read them.)
3. Who receives each form's notifications, and who owns `hello@`, `privacy@` and `security@`?
4. Retention periods and the lawful bases in the Privacy Notice (`docs/LEGAL.md` §2).
5. Approve, change or revert the four wording changes in the table above.
6. Keep the INITIATIVE descriptor off the site, or add it back?
