# Deploying acesside.com on Netlify

The site is static. Netlify runs `node build.mjs` and publishes `public/`. Everything Netlify needs is already in `netlify.toml`.

> **Not checked from here:** I could not reach docs.netlify.com or acesside.com from the build environment. Everything below is from working knowledge of Netlify. Where Netlify shows you exact values (DNS records, form settings), use what its screen says, not this page.

## 1. First deploy

1. Netlify → **Add new site → Import an existing project** → choose GitHub → `greecon-tech/acesside`.
2. Production branch: pick the branch you want live (the work is on `claude/happy-lovelace-qp7ype`; merge it to `main` first if `main` is your live branch).
3. Build settings fill in from `netlify.toml` (build command `node build.mjs`, publish directory `public`). No framework, no install step.
4. Deploy. Open the `*.netlify.app` address and click through the site.

Prefer no Git? Run `node build.mjs` and drag the `public/` folder into Netlify. Forms and headers still work, because `public/` carries them.

## 2. Keep search engines out until you are ready (optional)

The Brand Book says: protect first, then launch (see `docs/LEGAL.md`). To deploy now without being indexed:

- Netlify → **Site configuration → Environment variables** → add `SITE_INDEXING` = `off`, then redeploy.
- Effect: `noindex` on every page, `X-Robots-Tag: noindex`, `robots.txt` disallows everything, no sitemap.
- To go live, delete the variable and redeploy. Nothing else changes.

Preview and branch deploys are always `noindex` (set in `netlify.toml`).

## 3. Domain and HTTPS

1. **Domain management → Add a domain** → `acesside.com` → make it the **primary domain**.
2. Add `www.acesside.com` as well. Netlify redirects it to the primary.
3. DNS, either way:
   - *Netlify DNS:* change the nameservers at your registrar to the ones Netlify shows.
   - *Registrar DNS:* add the records Netlify shows for the apex (A or ALIAS) and for `www` (CNAME).
4. **HTTPS → Verify DNS → Provision certificate** (Let's Encrypt, automatic). Then switch on **Force HTTPS**.
5. If your domain has CAA records, allow `letsencrypt.org`.
6. Once the custom domain is primary, the `*.netlify.app` address redirects to it.

The site already sends `Strict-Transport-Security` for one year. Do **not** add `includeSubDomains` or `preload` until every subdomain of acesside.com (a mail host, for example) is confirmed to work on HTTPS. Preload is hard to undo.

**Confirm who owns acesside.com.** The Brand Book lists this under Protect. Check the registrar account, the renewal date and the contact email, and turn on auto-renew and registrar lock.

## 4. The contact form

The site has one form, `contact`. Netlify finds it at deploy time.

1. **Forms** tab: confirm `contact` appears after the first deploy. If not, **Site configuration → Forms → Enable form detection**, then redeploy.
2. **Forms → Form notifications → Add notification**: send an email to the people who will read it. Do this before launch, or submissions sit unseen in the dashboard.
3. Submit the form once yourself and confirm the email arrives.
4. Spam: the honeypot field and Netlify's built-in filtering (Akismet) are on. **Do not turn on reCAPTCHA**: it loads Google scripts, sets cookies, is blocked by the site's Content-Security-Policy, and would make the Privacy Notice untrue.
5. Netlify keeps submissions until you delete them. The Privacy Notice promises deletion 12 months after the last reply. Put a recurring reminder in a calendar.
6. Check your plan's form limits on Netlify's pricing page (I found conflicting figures online). A paused site stops receiving submissions.

## If an earlier version was ever deployed

Version 1 of the site (commit `e8577fd`) contained the Doctrine and other internal pages. If you deployed it anywhere, redeploying this version removes those pages from the live address, and the old addresses now redirect to the home page. Three places can still hold the old pages:

- **Old Netlify deploys.** Every deploy keeps its own permanent address (`<id>--<site>.netlify.app`) that still serves that version. In Netlify → **Deploys**, open the old deploys and delete them. Then check that only the current deploy remains.
- **Search engines and caches.** If the site was indexed, use Google Search Console's **Removals** tool ("Remove outdated content") for the old addresses; Bing has an equivalent. The redirects help once crawlers revisit.
- **Anything that copied it.** Browsers, link previews and archive sites may hold copies. Nothing can be done about those except asking.

## Keeping search engines out in the meantime

Set `SITE_INDEXING=off` (section 2) before the first deploy, and no search engine will list the site.

## 5. Email addresses

The site names three addresses. Netlify does not host email, so create them (as aliases that forward to the people responsible is fine):

| Address | Used in |
| --- | --- |
| `hello@acesside.com` | Contact page, Legal notice, Accessibility statement |
| `privacy@acesside.com` | Privacy Notice, Contact page |
| `security@acesside.com` | `security.txt` (the public security contact file) |

Until they exist, mail to them bounces. To use one address for everything, edit `contact` in `site.config.json`.

At your DNS host, also set **SPF, DKIM and DMARC** for your mail provider, so nobody can send mail that looks like it comes from your name.

## 6. After going live

- `curl -I https://acesside.com` shows the security headers (`Content-Security-Policy`, `Strict-Transport-Security`, and the rest).
- Run a header scan (securityheaders.com or Mozilla Observatory) and a Lighthouse pass. The site was built to pass cleanly, but I could not run them against the live domain.
- LinkedIn is the Brand Book's first channel: paste the address into LinkedIn's **Post Inspector** so it caches the share card (`og-image.png`, now black and white).
- Submit `https://acesside.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Check `https://acesside.com/.well-known/security.txt` loads.

## 7. Keeping it healthy

- `security.txt` expires about 11 months after each build. **Redeploy at least every 10 months** (Netlify → Deploys → Trigger deploy) or edit the build to extend it.
- Edit `site.config.json` when the legal entity is registered (name, country, address).
- Roll back: Netlify deploys are atomic. **Deploys → pick an earlier deploy → Publish deploy.**
- Adding analytics later changes what the Privacy Notice may truthfully say. Prefer a cookieless, privacy-first tool, and update the notice first.
