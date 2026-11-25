// Guard against publishing a confidential term by accident.
//
// The founders keep certain terms private and share them only in coded form. This file deliberately does
// NOT contain those terms: it holds salted SHA-256 hashes of them. Any text is split into words (letters and
// digits only, lower case), every run of one to three words is hashed, and a match means the text must not
// be published. The build (build.mjs) refuses to publish a page that matches; tools/verify.mjs also scans the
// content files and documents.
//
// To protect another term without writing it anywhere in the repository:
//     node tools/hash-term.mjs "the term"      then paste the printed hash into SECRET_HASHES below.
//
// Honest limit: a hash hides a term from anyone reading the repository, but a short, guessable phrase can be
// recovered by guessing and hashing it. This stops accidents and casual reading, not a determined attacker.
// Keep the repository private.

import { createHash } from 'node:crypto';

export const norm = (text) => String(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
export const hashTerm = (words) => createHash('sha256').update('acesside-guard:' + words.join(' ')).digest('hex');

export const SECRET_HASHES = new Set([
  // Hashes only; see the header. The founders know what each one stands for.
  'b5abacc8652a8d9f6fd73fa5a5b0abf4804dd49587234ff50290727f9b32aec1',
  '3c57db28c5f9da518cca72f963167afaa9e2e28895b9d8826ec1fc4a8ddc6992',
  '7529056872da35c8e4e43db8318f92d885eb0f6de11fb44116e3fee016bc6a62',
  '72fe2b8217eea8c41dc3bd008e76c4f6582a538573b0b29848c12e928b1bf219',
  '0ced2f2e67a130facdb41f4e92b3780a55a6e5856f83e684c3bf6ef229eb37be',
]);

// True if the text contains any protected term. Never returns or logs the match.
export function leaks(text) {
  const w = norm(text);
  for (let n = 1; n <= 3; n++) {
    for (let i = 0; i + n <= w.length; i++) {
      if (SECRET_HASHES.has(hashTerm(w.slice(i, i + n)))) return true;
    }
  }
  return false;
}
