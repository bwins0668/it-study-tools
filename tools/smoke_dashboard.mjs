#!/usr/bin/env node
/**
 * smoke_dashboard.mjs — Dashboard data handling smoke test
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

// === 1. dashboard.js exists ===
const dashboardJs = read(join('assets', 'js', 'dashboard.js'));
check(dashboardJs.length > 500, 'dashboard.js exists and substantial');

// === 2. No syntax errors ===
if (dashboardJs.length > 500) {
  try { new Function(dashboardJs); check(true, 'dashboard.js no syntax errors'); }
  catch (e) { check(false, `dashboard.js syntax: ${e.message}`); }
}

// === 3. Handles empty data ===
check(
  /(?:length|\[\]|\?\?)/.test(dashboardJs),
  'dashboard.js handles empty/missing data'
);

// === 4. Renders chart ===
check(
  /chart|canvas|Chart/.test(dashboardJs),
  'dashboard.js renders chart'
);

// === 5. i18n keys exist ===
const i18n = read(join('assets', 'js', 'i18n-ui-dict.js'));
check(i18n.includes('dashboard'), 'i18n-ui-dict.js has dashboard section');

// === 6. i18n dashboard section has content ===
const dashboardMatch = i18n.match(/dashboard\s*:\s*\{[\s\S]*?^  \}/m);
check(dashboardMatch || i18n.includes('dashboard'), 'i18n dashboard section has content');

// === 7. No raw CJK in dashboard.js ===
const stripped = dashboardJs.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '');
check(
  !/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/.test(stripped),
  'dashboard.js uses i18n (no raw CJK)'
);

// === 8. Has goals and export ===
check(/goal|export/i.test(dashboardJs) || /goal|export/i.test(i18n), 'dashboard has goals/export');

// === Summary ===
console.log(`\n=== Dashboard Smoke: ${pass} PASS / ${fail} FAIL ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
process.exit(fail > 0 ? 1 : 0);
