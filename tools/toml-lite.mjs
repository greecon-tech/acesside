// Minimal reader for the two TOML shapes netlify.toml uses here: [[headers]] and [[redirects]].
// Shared by build.mjs (to emit _headers / _redirects) and tools/serve.mjs (to mimic Netlify locally).
export function parseToml(text) {
  const headers = [], redirects = [];
  let cur = null, kind = null, inValues = false;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line === '[[headers]]') { cur = { for: '', values: {} }; headers.push(cur); kind = 'h'; inValues = false; continue; }
    if (line === '[[redirects]]') { cur = {}; redirects.push(cur); kind = 'r'; continue; }
    if (line.startsWith('[')) { inValues = line === '[headers.values]'; if (!inValues) { cur = null; kind = null; } continue; }
    const m = line.match(/^([\w-]+)\s*=\s*"(.*)"$/) || line.match(/^([\w-]+)\s*=\s*(\d+)$/);
    if (!m || !cur) continue;
    if (kind === 'h') { if (inValues) cur.values[m[1]] = m[2]; else if (m[1] === 'for') cur.for = m[2]; }
    else if (kind === 'r') cur[m[1]] = m[2];
  }
  return { headers, redirects };
}
