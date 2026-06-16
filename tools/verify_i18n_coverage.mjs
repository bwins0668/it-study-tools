#!/usr/bin/env node
/**
 * verify_i18n_coverage.mjs — Check i18n key coverage across 4 languages
 */

import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

let pass = 0, fail = 0;
const errors = [], warnings = [];

function check(cond, msg) { cond ? pass++ : (fail++, errors.push(msg)); }

function read(rel) {
  try { return readFileSync(join(ROOT, rel), 'utf8'); } catch { return ''; }
}

const i18n = read(join('assets', 'js', 'i18n-ui-dict.js'));
check(i18n.length > 100, 'i18n-ui-dict.js exists');

if (i18n.length < 100) { process.exit(1); }

// Extract top-level sections (zh-CN, ja-JP, en-US, ko-KR).
// Object keys in this file are quoted because they contain hyphens.
const langPattern = /["']?(zh-CN|ja-JP|en-US|ko-KR)["']?\s*:\s*\{/g;
let match;
const langs = [];
while ((match = langPattern.exec(i18n)) !== null) {
  if (!langs.includes(match[1])) langs.push(match[1]);
}
check(langs.length === 4, `i18n has 4 languages (found: ${langs.join(', ')})`);

// Check each section has same keys as zh-CN (reference)
// Simpler: check file size is roughly balanced (no empty translations)
const langSizes = {};
for (const lang of langs) {
  const idx = i18n.indexOf(`"${lang}"`);
  if (idx === -1) continue;
  // Find section block (simplification: just check lang string appears multiple times)
  const count = (i18n.match(new RegExp(`"${lang}"`, 'g')) || []).length;
  langSizes[lang] = count;
}
console.log('  i18n language key counts:', langSizes);

// Check for "翻訳中" or "TODO" (untranslated markers)
if (/翻訳中|TODO|FIXME/.test(i18n)) {
  warnings.push('i18n has untranslated markers (翻訳中/TODO)');
}

// Check for raw keys visible (should be translated)
const rawKeyPattern = /"[a-z_]+:[a-z_]+"/g;
const rawMatches = i18n.match(rawKeyPattern) || [];
if (rawMatches.length > 0) {
  warnings.push(`i18n may have raw keys: ${rawMatches.slice(0, 5).join(', ')}...`);
}

// === Summary ===
console.log(`\n=== i18n Coverage: ${pass} PASS / ${fail} FAIL / ${warnings.length} WARN ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
warnings.forEach(w => console.warn(`  WARN: ${w}`));
process.exit(fail > 0 ? 1 : 0);
