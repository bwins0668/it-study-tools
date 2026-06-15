#!/usr/bin/env node
/**
 * verify_routes_integrity.mjs — Check all linked routes/files exist
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

let pass = 0, fail = 0;
const errors = [];

function check(cond, msg) { cond ? pass++ : (fail++, errors.push(msg)); }

function read(rel) {
  try { return readFileSync(join(ROOT, rel), 'utf8'); } catch { return ''; }
}

// === 1. Check index.html linked CSS/JS exist ===
const html = read('index.html');
if (html.length > 100) {
  // Extract href/src links
  const linkPattern = /(?:href|src)\s*=\s*["']([^"']+\.(css|js))["']/g;
  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const relPath = match[1];
    // Handle query params (?v=...)
    const cleanPath = relPath.split('?')[0];
    check(existsSync(join(ROOT, cleanPath)), `index.html links ${relPath}`);
  }
}

// === 2. Check glossary.html (if exists) linked files ===
const glossaryHtml = read('glossary.html');
if (glossaryHtml.length > 100) {
  const linkPattern = /(?:href|src)\s*=\s*["']([^"']+\.(css|js|html))["']/g;
  let match;
  while ((match = linkPattern.exec(glossaryHtml)) !== null) {
    const relPath = match[1];
    const cleanPath = relPath.split('?')[0];
    if (!cleanPath.startsWith('http')) {
      check(existsSync(join(ROOT, cleanPath)), `glossary.html links ${relPath}`);
    }
  }
}

// === 3. Check data files referenced in JS exist ===
const dataFiles = [
  'data/lessons.js',
  'data/glossary.js',
  'data/java_lessons.js',
  'data/python_lessons.js',
];
for (const f of dataFiles) {
  check(existsSync(join(ROOT, f)), `${f} exists`);
}

// === 4. Check no broken internal links (href="#..." should have matching id) ===
// Simplification: just check for obviously broken external links
const brokenLinkPattern = /href\s*=\s*["'](https?:\/\/[^"']+)["']/g;
let match2;
while ((match2 = brokenLinkPattern.exec(html)) !== null) {
  const url = match2[1];
  // Can't fetch URLs here, just log for manual check
  if (url.includes('example.com') || url.includes('localhost')) {
    warnings.push(`index.html has placeholder URL: ${url}`);
  }
}

// === Summary ===
console.log(`\n=== Routes Integrity: ${pass} PASS / ${fail} FAIL ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
if (typeof warnings !== 'undefined' && warnings.length > 0) {
  warnings.forEach(w => console.warn(`  WARN: ${w}`));
}
process.exit(fail > 0 ? 1 : 0);
