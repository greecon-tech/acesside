#!/usr/bin/env node
// Local preview that behaves like Netlify for this site: same headers as netlify.toml (so the real
// Content-Security-Policy is exercised), pretty URLs, 404.html, redirects, and form POSTs landing on /thanks/.
//
//   npm run build && npm start        then open http://localhost:8888

import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseToml } from './toml-lite.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const toml = readFileSync(join(root, 'netlify.toml'), 'utf8');

export const config = parseToml(toml);
const toRegex = (pat) => new RegExp('^' + pat.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json', '.json': 'application/json' };

function resolveFile(pathname) {
  const p = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  let f = join(pub, p);
  if (!f.startsWith(pub)) return null;
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  return existsSync(f) && statSync(f).isFile() ? f : null;
}

export function startServer(port = 8888) {
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const send = (status, body, type, extra = {}) => {
      const h = { 'Content-Type': type, ...extra };
      for (const rule of config.headers) if (toRegex(rule.for).test(url.pathname)) Object.assign(h, rule.values, { 'Content-Type': h['Content-Type'] });
      res.writeHead(status, h); res.end(body);
    };
    // Netlify Forms: a POST to any path is captured and the visitor lands on the form's action page.
    if (req.method === 'POST') { req.resume(); return send(200, readFileSync(join(pub, 'thanks/index.html')), TYPES['.html']); }
    for (const r of config.redirects) {
      if (toRegex(r.from).test(url.pathname.replace(/(.)\/$/, '$1'))) return send(Number(r.status) || 301, '', 'text/plain', { Location: r.to });
    }
    // Pretty URLs: /doctrine -> /doctrine/
    if (!extname(url.pathname) && !url.pathname.endsWith('/') && existsSync(join(pub, url.pathname, 'index.html'))) {
      return send(301, '', 'text/plain', { Location: url.pathname + '/' });
    }
    const file = resolveFile(url.pathname);
    if (file) return send(200, readFileSync(file), TYPES[extname(file)] || 'application/octet-stream');
    const nf = join(pub, '404.html');
    return send(404, existsSync(nf) ? readFileSync(nf) : 'Not found', TYPES['.html']);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 8888;
  await startServer(port);
  console.log(`Preview on http://localhost:${port}  (headers from netlify.toml applied)`);
}
