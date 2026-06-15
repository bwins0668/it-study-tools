#!/usr/bin/env node
/**
 * verify_content_integrity.mjs — Check content files for integrity issues
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

let pass = 0, fail = 0;
const errors = [], warnings = [];

function check(cond, msg) { cond ? pass++ : (fail++, errors.push(msg)); }

function read(rel) {
  try { return readFileSync(join(ROOT, rel), 'utf8'); } catch { return ''; }
}

// === 1. Check lessons.js for duplicate IDs ===
const lessonsFiles = [
  'data/lessons.js',
  'data/java_lessons.js',
  'data/python_lessons.js',
  'data/it_passport_lessons.js',
];
for (const f of lessonsFiles) {
  const c = read(f);
  if (c.length < 100) { warnings.push(`${f} empty or missing`); continue; }

  // Extract IDs (simple regex, may have false positives)
  const idMatch = c.match(/id\s*:\s*["']([^"']+)["']/g) || [];
  const ids = idMatch.map(m => m.match(/["']([^"']+)["']/)[1]);
  const dups = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dups.length > 0) {
    errors.push(`${f} duplicate IDs: ${[...new Set(dups)].join(', ')}`);
    fail++;
  } else { pass++; }
}

// === 2. Check for syntax errors in data files ===
for (const f of lessonsFiles) {
  const c = read(f);
  if (c.length < 100) continue;
  try { new Function(c); check(true, `${f} no syntax errors`); }
  catch (e) { check(false, `${f} syntax error: ${e.message.slice(0, 80)}`); }
}

// === 3. Check glossary.js ===
const glossary = read('data/glossary.js');
if (glossary.length > 100) {
  try { new Function(glossary); check(true, 'glossary.js no syntax errors'); }
  catch (e) { check(false, `glossary.js syntax: ${e.message.slice(0, 80)}`); }

  // Check for duplicate terms
  const termMatch = glossary.match(/term\s*:\s*["']([^"']+)["']/g) || [];
  const terms = termMatch.map(m => m.match(/["']([^"']+)["']/)[1]);
  const dups = terms.filter((v, i) => terms.indexOf(v) !== i);
  if (dups.length > 0) {
    warnings.push(`glossary.js possible duplicate terms: ${dups.length}`);
  }
}

// === 4. Check empty titles/content in lessons ===
for (const f of lessonsFiles) {
  const c = read(f);
  if (c.length < 100) continue;
  const emptyTitle = /title\s*:\s*["']\s*["']/.test(c);
  if (emptyTitle) { warnings.push(`${f} has empty title(s)`); }
  else { pass++; }
}

// === Summary ===
console.log(`\n=== Content Integrity: ${pass} PASS / ${fail} FAIL / ${warnings.length} WARN ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
warnings.forEach(w => console.warn(`  WARN: ${w}`));
process.exit(fail > 0 ? 1 : 0);
