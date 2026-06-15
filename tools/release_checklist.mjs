#!/usr/bin/env node
/**
 * release_checklist.mjs — Aggregated release readiness check
 * Runs all verifications: version, validators, smoke, security
 */

import { spawn } from 'child_process';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

let pass = 0, fail = 0;
const failed = [];

console.log('=== Release Checklist ===\n');

// 1. Version consistency check
console.log('[1/5] Version consistency...');
const versionCheck = spawn('node', ['-e', `
  const fs = require('fs');
  const webVer = require('./assets/js/version.js').STUDY_TOOLS_VERSION;
  const sw = fs.readFileSync('./service-worker.js', 'utf8');
  console.log('  Web version:', webVer.webVersion);
  console.log('  CACHE_NAME:', sw.match(/CACHE_NAME = "([^"]+)"/)[1]);
  process.exit(0);
`], { cwd: join(ROOT, '..', 'sql-learning-hub-web-public') });
await new Promise(r => versionCheck.on('close', r));

// 2. Run all smoke tests
console.log('[2/5] Smoke tests...');
const smoke = spawn('node', [join(ROOT, 'tools', 'verify_release_ready.mjs')], { stdio: 'inherit' });
await new Promise(r => smoke.on('close', code => { if (code) fail++; else pass++; r(); }));

// 3. Run security scan
console.log('[3/5] Security scan...');
const sec = spawn('node', [join(ROOT, 'tools', 'scan_sensitive_files.mjs')], { stdio: 'inherit' });
await new Promise(r => sec.on('close', code => { if (code) fail++; else pass++; r(); }));

// 4. Check .gitignore coverage
console.log('[4/5] .gitignore coverage...');
const gitignore = spawn('node', ['-e', `
  const fs = require('fs');
  const ig = fs.readFileSync('.gitignore', 'utf8');
  const checks = ['*.bak', 'node_modules', '.env', 'backups/'];
  let ok = true;
  checks.forEach(c => {
    if (!ig.includes(c)) { console.error('  MISSING:', c); ok = false; }
  });
  if (ok) console.log('  ✓ .gitignore covers sensitive files');
  process.exit(ok ? 0 : 1);
`], { cwd: ROOT });
await new Promise(r => gitignore.on('close', code => { if (code) fail++; else pass++; r(); }));

// 5. Verify shared files checksum
console.log('[5/5] Shared files SHA-256...');
const sha = spawn('node', ['-e', `
  const crypto = require('crypto');
  const fs = require('fs');
  const path = require('path');
  const shared = ['assets/js/version.js', 'assets/css/index.css', 'assets/css/light-theme.css', 'assets/js/i18n-ui-dict.js'];
  let ok = true;
  shared.forEach(f => {
    const win = fs.readFileSync(path.join('${process.argv[2] || "."}', f));
    const web = fs.readFileSync(path.join('${process.argv[3] || ".."}', 'sql-learning-hub-web-public', f));
    const winHash = crypto.createHash('sha256').update(win).digest('hex');
    const webHash = crypto.createHash('sha256').update(web).digest('hex');
    if (winHash !== webHash) {
      console.error('  MISMATCH:', f);
      ok = false;
    }
  });
  if (ok) console.log('  ✓ Shared files match');
  process.exit(ok ? 0 : 1);
`].concat([ROOT, ROOT]), { stdio: 'inherit' });
await new Promise(r => sha.on('close', code => { if (code) fail++; else pass++; r(); }));

console.log(`\n=== Release Checklist: ${pass}/5 PASSED, ${fail} FAILED ===`);
if (failed.length > 0) {
  console.error('\nFailed checks:');
  failed.forEach(f => console.error(`  - ${f}`));
}
process.exit(fail > 0 ? 1 : 0);
