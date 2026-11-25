#!/usr/bin/env node
// Prints the guard hash for a term, so it can be protected without writing the term into the repository.
//   node tools/hash-term.mjs "the term"
import { norm, hashTerm } from './guard.mjs';
const words = norm(process.argv.slice(2).join(' '));
if (!words.length || words.length > 3) { console.error('Give one to three words.'); process.exit(1); }
console.log(`  '${hashTerm(words)}',`);
