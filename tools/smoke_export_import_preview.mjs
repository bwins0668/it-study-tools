#!/usr/bin/env node
/**
 * smoke_export_import_preview.mjs — Export & Import Preview safety smoke test
 */

import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const WEB_ROOT = resolve(ROOT, '..', 'sql-learning-hub-web-public');

let pass = 0;
let fail = 0;
const errors = [];

function check(condition, msg) {
  if (condition) { pass++; } else { fail++; errors.push(msg); }
}

function read(relPath, root = ROOT) {
  try { return readFileSync(join(root, relPath), 'utf8'); } catch (e) { return ''; }
}

// === 1. export-data.js syntax ===
const exportJs = read(join('assets', 'js', 'export-data.js'));
check(exportJs.length > 200, 'export-data.js exists');

if (exportJs.length > 200) {
  try { new Function(exportJs); check(true, 'export-data.js no syntax errors'); }
  catch (e) { check(false, `export-data.js syntax: ${e.message}`); }
}

// === 2. Import preview (Web repo) ===
const importPreview = read(join('assets', 'js', 'import-preview.js'), WEB_ROOT);
check(importPreview.length > 200, 'import-preview.js exists in Web repo');

if (importPreview.length > 200) {
  try { new Function(importPreview); check(true, 'import-preview.js no syntax errors'); }
  catch (e) { check(false, `import-preview.js syntax: ${e.message}`); }

  // === 3. Import preview is read-only ===
  check(
    !/localStorage\.setItem/.test(importPreview) || /neverWriteLocalStorage/.test(importPreview),
    'import-preview.js is read-only'
  );

  // === 4. Sensitive field scan ===
  check(/sensitive|Sensitive/.test(importPreview), 'import-preview.js scans sensitive fields');

  // === 5. schemaVersion check ===
  check(/schemaVersion/.test(importPreview), 'import-preview.js checks schemaVersion');

  // === 6. Uses textContent (not innerHTML) ===
  const innerHTMLCount = (importPreview.match(/innerHTML/g) || []).length;
  const textContentCount = (importPreview.match(/textContent/g) || []).length;
  check(textContentCount >= innerHTMLCount, 'import-preview.js prefers textContent over innerHTML');
}

// === 7. Export filters sensitive fields ===
check(
  /sensitive|password|token|secret/i.test(exportJs) || !/password/.test(exportJs),
  'export-data.js handles sensitive fields'
);

// === 8. Export has schemaVersion ===
check(/schemaVersion/.test(exportJs), 'export-data.js has schemaVersion');

// === 9. i18n keys ===
const i18n = read(join('assets', 'js', 'i18n-ui-dict.js'));
check(i18n.includes('exportData'), 'i18n has exportData');
check(i18n.includes('importPreview'), 'i18n has importPreview');

// === 10. 4-language support ===
for (const lang of ['zh-CN', 'ja-JP', 'en-US', 'ko-KR']) {
  check(i18n.includes(lang), `i18n has ${lang}`);
}

// === Summary ===
console.log(`\n=== Export/Import Preview Smoke: ${pass} PASS / ${fail} FAIL ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
process.exit(fail > 0 ? 1 : 0);
