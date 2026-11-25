# Legal notes for the founders and their lawyer

This is a checklist of what the website assumes, not legal advice. The Brand Book says the same of its own Legal protection section: confirm every step with a lawyer. The public legal pages (`/legal/`, `/privacy/`, `/accessibility/`) are short, accurate for the site as built, and easy for a lawyer to adjust.

## 1. Gates the Brand Book puts before launch ("Protect")

The website is step 3 of the Brand Book's Rollout. Step 1, Protect, is still open, and none of it can be done from code.

| Brand Book item | Status | Why the site cares |
| --- | --- | --- |
| Lawyer compares the Emblem with the logo flagged in Legal protection, row 1 | Open | The Emblem is on every page, the favicon and the share card. |
| Trademark search: Ace's Side, Acesside, the marks | Open | A quick web search found no organization of that name, and found many ACE trademarks. That is **not** a clearance. |
| Choose legal form, register the entity | Open | The site says honestly that Ace's Side is in its founding stage (`site.config.json` → `entity`). |
| File trademark applications | Open | The site uses no ™ or ® symbol. Do not add ® before registration. |
| Confirm ownership of acesside.com, secure handles | Open | I could not look the domain up from here. |
| Signed rights assignments from every designer | Open | Includes the Emblem and anything made with AI image tools. |
| Division names cleared | No longer blocks the site | The names are **not** on the public site any more. They still need clearance before any public use. |

Use `SITE_INDEXING=off` (see `DEPLOY.md`) if you want to deploy before these are done.

## 2. Decisions the pages are waiting on

Each is one edit in `site.config.json` or one line in the named file.

1. **Who is the controller and operator?** Until `entity.legalName` is set, the pages say the site is run by the founders. Fill in `entity` when the entity exists (`src/layout.mjs` → `operator()`).
2. **Governing law and courts.** `/legal/` says they will be stated once Ace's Side is registered.
3. **Imprint rules.** If the operator is based in Germany, Austria or another country that requires an imprint (named person, address, contact), `/legal/` must carry it.
4. **Retention.** `/privacy/` proposes deleting contact messages 12 months after the last reply. Change it to what you will actually do, and delete submissions on that schedule.
5. **Lawful bases.** The notice relies on consent for the contact form, and on legitimate interests for server logs and for email sent directly. Confirm.
6. **International transfers.** Netlify (US) hosts the site and stores form submissions; Netlify uses Akismet (Automattic, US) to screen them. The notice says transfers rely on safeguards "such as the Standard Contractual Clauses". I saw that Netlify publishes a DPA that refers to the EU Standard Contractual Clauses, but I could not confirm its current terms, or whether Netlify or Akismet is certified under the EU-US Data Privacy Framework. Sign Netlify's DPA and check its sub-processor list.
7. **Data protection officer.** The notice says none is appointed. Confirm that is right.
8. **Representative.** If the entity is outside the EU/UK but the site targets people there, a representative may be required.
9. **Children.** The notice says the site is not aimed at children.

## 3. Public statements to approve

Much less is public than in version 1, which also shrinks the legal exposure. What remains:

- **The one-line description and the taglines**, taken from the Brand Book's own Voice and messaging section.
- **"Not a government, agency, UN or intergovernmental body, regulator, emergency service or security service."** (`/legal/`.) Keep it: it protects against implying official status, which the Brand Book flags as a risk.
- **No donations.** `/legal/` says the site takes none, and that no gift will be called tax-deductible until Ace's Side is registered to receive such gifts. The site has no donate button.
- **No commitments about how the alliance works.** The earlier promises (every signal logged, a yearly report, how applications are handled) were removed with the pages that made them.

## 4. What the site does and does not collect

- No cookies, no local storage, no JavaScript, no analytics, no ads, no social widgets.
- No request leaves acesside.com. Fonts are self-hosted (Google Fonts has had GDPR rulings against it in Germany).
- Because nothing is stored on or read from the visitor's device, there is no cookie banner. This is the standard reading of ePrivacy Article 5(3), but I did not find national guidance to cite. If you ever add analytics or an embed, add consent first.
- Personal data arrives only through the one contact form (and email). Netlify stores form submissions and sends notifications.
- The Content-Security-Policy blocks most third-party additions by design.

## 5. Accessibility law

The EU Accessibility Act (applying since 28 June 2025) covers certain consumer services; the site has no shop or payments, so it is probably out of scope, and a microenterprise exemption may also apply. The site targets WCAG 2.2 AA regardless. The accessibility statement says only what was checked: automated axe-core checks on every page, keyboard, tap-target and reflow checks on phone widths, and that no full screen-reader audit has been done. Do one before claiming more.

## 6. Fonts and images

- Michroma and Inter are under the SIL Open Font License 1.1, free for commercial use. Licence texts ship with the fonts. The display face in both PDFs is **Michroma** (its name is embedded in the PDF files).
- The site uses no photographs. When you add any, get signed releases (Brand Book).

## 7. Confidentiality

The Doctrine and the internal structure of the alliance are deliberately not on the website (see `HANDOVER.md`). Three things to remember:

- **Git history.** The removed pages are still in this repository's history (commit `e8577fd`). Keep the repository private, and tell me if you want the history cleaned.
- **The Brand Book's banned words.** `tools/verify.mjs` lists them, including the two it says to keep as private inspiration. Nothing in the published site mentions them, but a public repository would show the list.
- **If an earlier version went live.** See `DEPLOY.md`.
