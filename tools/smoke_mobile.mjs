#!/usr/bin/env node
/**
 * smoke_mobile.mjs — Mobile viewport smoke test
 * Verifies mobile compatibility by checking CSS/HTML structure
 */

import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

let pass = 0;
let fail = 0;
const errors = [];

function check(condition, msg) {
  if (condition) { pass++; } else { fail++; errors.push(msg); }
}

function read(relPath) {
  try { return readFileSync(join(ROOT, relPath), 'utf8'); } catch (e) { return ''; }
}

// === 1. Viewport meta in index.html ===
const indexHtml = read('index.html');
check(indexHtml.includes('viewport'), 'index.html has viewport meta');
check(indexHtml.length > 1000, 'index.html is substantial');

// === 2. Mobile CSS rules ===
const indexCss = read(join('assets', 'css', 'index.css'));
check(/430px|390px|max-width|@media/.test(indexCss), 'index.css has responsive rules');

// === 3. No forbidden hard-coded wide widths ===
check(
  !/width:\s*1200px/.test(indexCss) || /max-width/.test(indexCss),
  'index.css responsive (no fixed wide widths without max-width)'
);

// === 4. Tools drawer scrollable ===
check(
  /overflow.*scroll|overflow.*auto/.test(indexCss),
  'index.css has scroll handling'
);

// === 5. Touch-friendly sizes ===
check(
  /44px|3rem|2\.5rem|min-height/.test(indexCss),
  'index.css has touch-friendly minimum sizes'
);

// === 6. Body overflow handling ===
check(
  /overflow-x|word-break|overflow-wrap/.test(indexCss),
  'index.css handles overflow'
);

// === 7. app.js exists ===
const appJs = read(join('assets', 'js', 'app.js'));
check(appJs.length > 100, 'app.js exists');

// === 8. No syntax errors in key JS files ===
for (const jsFile of ['assets/js/app.js', 'assets/js/dashboard.js']) {
  const content = read(jsFile);
  if (content.length > 100) {
    try { new Function(content); check(true, `${jsFile} no syntax errors`); }
    catch (e) { check(false, `${jsFile} syntax error: ${e.message}`); }
  }
}

// === 9. Service worker (in Web repo sibling) ===
const swPath = resolve(ROOT, '..', 'sql-learning-hub-web-public', 'service-worker.js');
try {
  const sw = readFileSync(swPath, 'utf8');
  check(sw.length > 100, 'service-worker.js exists (in Web repo)');
} catch {
  // Try local (if in Web repo)
  const swLocal = read('service-worker.js');
  check(swLocal.length > 100, 'service-worker.js exists locally or in Web repo');
}

// === Summary ===
console.log(`\n=== Mobile Smoke: ${pass} PASS / ${fail} FAIL ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
process.exit(fail > 0 ? 1 : 0);
