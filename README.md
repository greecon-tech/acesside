# Ace’s Side: website

The site for **acesside.com**. *When the world needs us, we are here.*

Static, no JavaScript, no cookies, no third-party requests. Built from the Brand Book and the alliance's published wording, in its black-and-white (Night) version, and deployed on Netlify. The Doctrine itself is **not** published, and the site has **no way to contact the alliance** (it reaches out; nobody writes in).

```bash
node build.mjs        # build into ./public
npm start             # preview at http://localhost:8888 (with the production headers)
npm run verify        # build, then ~1,100 checks: CSP, accessibility, mobile, menu, no-Doctrine, no-contact, brand rules
```

`npm run verify` needs `npm install` and `npx playwright install chromium` once. `node build.mjs` needs only Node 20+.

| Read this | When |
| --- | --- |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | You are putting the site on Netlify and acesside.com |
| [`docs/HANDOVER.md`](docs/HANDOVER.md) | You want to know what was built, by department, and what was decided |
| [`docs/LEGAL.md`](docs/LEGAL.md) | You are the lawyer, or you are deciding when to launch |

## Where things live

- `src/content.mjs`: the alliance's words, as published on the pages. There is no Doctrine page.
- `src/pages/`: one file per page (home, divisions, call, membership, accountability, legal, privacy, accessibility). `src/layout.mjs`: header, footer, the Emblem.
- `src/css/main.css`: all styling, mobile-first, Bone on Void.
- `site.config.json`: name, addresses, legal entity (blank until it exists).
- `brand/aces-side-emblem.svg`: the verified master of the Emblem. Everything else is generated from it: `node tools/make-brand-assets.mjs`.
- `netlify.toml`: build, security headers, redirects.
- `public/`: the built site (committed so it can also be deployed by dragging the folder).

Keep this repository private: `tools/verify.mjs` lists the Brand Book's banned words.

Terms the founders keep confidential are protected by hashes in `tools/guard.mjs`; the build refuses to publish them. See `docs/HANDOVER.md`.
