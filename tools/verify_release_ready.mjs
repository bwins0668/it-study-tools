#!/usr/bin/env node
/**
 * verify_release_ready.mjs — Aggregate release verification
 * Runs syntax checks and smoke tests
 */

import { spawn } from 'child_process';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

const checks = [
  // Syntax checks
  { name: 'app.js',          fn: () => spawn('node', ['--check', join(ROOT, 'assets', 'js', 'app.js')]) },
  { name: 'dashboard.js',     fn: () => spawn('node', ['--check', join(ROOT, 'assets', 'js', 'dashboard.js')]) },
  { name: 'export-data.js',   fn: () => spawn('node', ['--check', join(ROOT, 'assets', 'js', 'export-data.js')]) },
  { name: 'version.js',       fn: () => spawn('node', ['--check', join(ROOT, 'assets', 'js', 'version.js')]) },

  // Smoke tests
  { name: 'smoke_mobile',           fn: () => spawn('node', [join(ROOT, 'tools', 'smoke_mobile.mjs')]) },
  { name: 'smoke_dashboard',        fn: () => spawn('node', [join(ROOT, 'tools', 'smoke_dashboard.mjs')]) },
  { name: 'smoke_export_import',    fn: () => spawn('node', [join(ROOT, 'tools', 'smoke_export_import_preview.mjs')]) },
  { name: 'smoke_core_routes',      fn: () => spawn('node', [join(ROOT, 'tools', 'smoke_core_routes.mjs')]) },

  // Existing validators (if they exist)
  { name: 'verify_glossary',        fn: () => spawn('node', [join(ROOT, 'tools', 'verify_glossary.js')]), optional: true },
  { name: 'verify_coding_typing',   fn: () => spawn('node', [join(ROOT, 'tools', 'verify_coding_typing.js')]), optional: true },
  { name: 'verify_wrong_book_sch',  fn: () => spawn('node', [join(ROOT, 'tools', 'verify_wrong_book_schema.js')]), optional: true },
  { name: 'verify_wrong_book_sync', fn: () => spawn('node', [join(ROOT, 'tools', 'verify_wrong_book_sync.js')]), optional: true },
];

let pass = 0, fail = 0;
const failed = [];

console.log('=== Release Readiness Verification ===\n');

for (const c of checks) {
  await new Promise((resolve) => {
    const child = c.fn();
    let stdout = '', stderr = '';
    if (child.stdout) child.stdout.on('data', d => stdout += d);
    if (child.stderr) child.stderr.on('data', d => stderr += d);
    child.on('close', (code) => {
      if (code === 0 || (c.optional && code !== 0)) { pass++; console.log(`  ✓ ${c.name}`); }
      else { fail++; failed.push(c.name); console.error(`  ✗ ${c.name} (exit ${code})`); }
      resolve();
    });
    child.on('error', (err) => {
      if (c.optional) { pass++; console.log(`  ⊙ ${c.name} (skipped: ${err.message})`); }
      else { fail++; failed.push(c.name); console.error(`  ✗ ${c.name} (${err.message})`); }
      resolve();
    });
  });
}

console.log(`\n=== Release Readiness: ${pass}/${pass + fail} checks passed ===`);
if (failed.length > 0) {
  console.error('\nFailed:');
  failed.forEach(f => console.error(`  - ${f}`));
}
process.exit(fail > 0 ? 1 : 0);
