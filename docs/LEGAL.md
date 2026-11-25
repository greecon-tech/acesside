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
| Division names cleared (Concord, Prosper, Ascend, Ward, Terra, Lumen) | Open | They are on the public site (home, Divisions, Doctrine-derived pages). The Brand Book says they need the same clearance as the name before public use. |

Use `SITE_INDEXING=off` (see `DEPLOY.md`) if you want to deploy before these are done.

## 2. Decisions the pages are waiting on

Each is one edit in `site.config.json` or one line in the named file.

1. **No contact details is a legal question.** The founders have chosen a site with no way to write to the alliance. Several rules expect an operator to be reachable, and the position depends on where the operator is:
   - **Imprint rules** (for example Germany and Austria) require a named responsible person, a postal address and an email address on the site.
   - **The EU e-Commerce Directive** (Article 5) expects a service provider to give an email address, which can apply to more than shops.
   - **Data protection law** (GDPR Article 13) requires the controller's contact details. This is why the Privacy Notice carries `privacy@acesside.com`. It says the address is for data-protection requests only.
   - **Accessibility feedback.** The Accessibility page points to the same address.
   
   Until the entity and country are chosen, the exposure is unknown. Ask the lawyer. The simplest fix, if needed, is to add the required details to `/legal/` and leave the rest of the site as it is.
2. **Who is the controller and operator?** Until `entity.legalName` is set, the pages say the site is run by the founders. Fill in `entity` when the entity exists (`src/layout.mjs` → `operator()`).
3. **Governing law and courts.** `/legal/` says they will be stated once Ace's Side is registered.
4. **Retention.** `/privacy/` proposes keeping an email sent to the data-protection address for 12 months after the last reply. Change it to what you will actually do.
5. **Lawful bases.** Legitimate interests for server logs; legal duty and legitimate interests for data-protection emails. Confirm.
6. **International transfers.** Netlify (US) hosts the site. The notice says transfers rely on safeguards "such as the Standard Contractual Clauses". I saw that Netlify publishes a DPA that refers to the EU Standard Contractual Clauses, but I could not confirm its current terms or whether Netlify is certified under the EU-US Data Privacy Framework. Sign Netlify's DPA and check its sub-processor list.
7. **Data protection officer.** The notice says none is appointed. Confirm.
8. **Representative.** If the entity is outside the EU/UK but the site targets people there, a representative may be required.
9. **Children.** The notice says the site is not aimed at children.

## 3. Public statements to approve

Everything below is on the public site, so a lawyer should read it.

- **The taglines and the one-line description**, from the Brand Book's own Voice and messaging section.
- **"Advises nations", "supports communities", "helps shape global systems"** and the division descriptions. The Brand Book warns that wording like "guiding nations" can imply official power. I did not use that wording, but the pages describe mediation, advising governments and similar work.
- **Ward.** The Doctrine says "secure digital and SCADA systems, defense against harmful autonomous systems". The Brand Book says to check licensing before offering any security service. The site says "secure digital and control systems, and safeguards against harmful autonomous systems". Confirm, or revert in `src/content.mjs`.
- **The Lines**, including "No action without standing" and "No false authority", are public commitments. So are the Articles and the Oath.
- **Commitments in the copy** that the founders must be able to keep: every signal is logged; a yearly report on missions, funding and mistakes (the first "will follow our first full year of work"); every candidate is checked for conflicts of interest; mistakes are reported, never hidden; "we reach out."
- **"Not a government, agency, UN or intergovernmental body, regulator, emergency service or security service."** (`/legal/`.) Keep it.
- **No donations.** `/legal/` says the site takes none, and that no gift will be called tax-deductible until Ace's Side is registered to receive such gifts.
- **Emergencies.** The Call page tells people to contact local emergency services first and says Ace's Side is not an emergency service.
- **Inspiration.** The site never names the source of its inspiration and uses none of its words, phrases or imagery. The Brand Book flags that the owner of those names holds trademarks on them, and that the Emblem's similarity to one of that owner's logos should be reviewed by a lawyer. The word the Brand Book says never to pair with that source ("Initiative") is not on the site.

## 4. What the site does and does not collect

- No cookies, no local storage, no JavaScript, no analytics, no ads, no social widgets.
- No request leaves acesside.com. Fonts are self-hosted (Google Fonts has had GDPR rulings against it in Germany).
- Because nothing is stored on or read from the visitor's device, there is no cookie banner. This is the standard reading of ePrivacy Article 5(3), but I did not find national guidance to cite. If you ever add analytics or an embed, add consent first.
- The site collects nothing from visitors directly. The host logs IP addresses to serve the site, and a person who emails the data-protection address sends their own email.
- The Content-Security-Policy blocks most third-party additions by design.

## 5. Accessibility law

The EU Accessibility Act (applying since 28 June 2025) covers certain consumer services; the site has no shop or payments, so it is probably out of scope, and a microenterprise exemption may also apply. The site targets WCAG 2.2 AA regardless. The accessibility statement says only what was checked: automated axe-core checks on every page, keyboard, tap-target and reflow checks on phone widths, and that no full screen-reader audit has been done. Do one before claiming more.

## 6. Fonts and images

- Michroma and Inter are under the SIL Open Font License 1.1, free for commercial use. Licence texts ship with the fonts. The display face in both PDFs is **Michroma** (its name is embedded in the PDF files).
- The site uses no photographs. When you add any, get signed releases (Brand Book).

## 7. Confidentiality

The Doctrine as a document is deliberately not on the website, though much of its substance is on the other pages (see `HANDOVER.md` for the exact line). Three things to remember:

- **Git history.** The Doctrine page is still in this repository's history (commit `e8577fd`). Keep the repository private, and tell me if you want the history cleaned.
- **The Brand Book's banned words.** `tools/verify.mjs` lists them, including the two it says to keep as private inspiration. Nothing in the published site mentions them, but a public repository would show the list.
- **If an earlier version went live.** See `DEPLOY.md`.
