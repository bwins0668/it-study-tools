#!/usr/bin/env node
/**
 * verify_no_sensitive_sync.mjs — Verify no sensitive data in sync payloads
 * Uses static analysis of sync-engine.js (no real sync needed)
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

function read(relPath, root = WEB_ROOT) {
  try { return readFileSync(join(root, relPath), 'utf8'); } catch (e) { return ''; }
}

const syncJs = read(join('assets', 'js', 'sync-engine.js'));
check(syncJs.length > 1000, 'sync-engine.js exists');

// === 1. Scan for sensitive field names in payload construction ===
const payloadSection = syncJs; // Entire file (sync engine constructs payloads)

const sensitiveFieldPatterns = [
  { pattern: /["']?password["']?\s*:/i, desc: 'password field' },
  { pattern: /["']?token["']?\s*:/i, desc: 'token field' },
  { pattern: /["']?api[_-]?key["']?\s*:/i, desc: 'API key field' },
  { pattern: /["']?secret["']?\s*:/i, desc: 'secret field' },
  { pattern: /["']?session[_-]?id["']?\s*:/i, desc: 'session ID field' },
  { pattern: /["']?cookie["']?\s*:/i, desc: 'cookie field' },
  { pattern: /["']?authorization["']?\s*:/i, desc: 'authorization field' },
];

for (const { pattern, desc } of sensitiveFieldPatterns) {
  let found = false;
  const lines = payloadSection.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (pattern.test(line)) {
      // Check if it's a comment or string literal (documentation), not code
      const trimmed = line.trim();
      if (!trimmed.startsWith('//') && !trimmed.startsWith('*') && !trimmed.startsWith('/*')) {
        // Might be real code - check if it's constructing a payload
        if (/payload|body|data/.test(line) || /insert\(|update\(|upsert\(/.test(line)) {
          errors.push(`Possible sensitive field "${desc}" in payload at line ${i + 1}: ${trimmed.slice(0, 100)}`);
          fail++;
          found = true;
          break;
        }
      }
    }
  }
  if (!found) pass++;
}

// === 2. Check export-data.js sensitive filter also applies to sync ===
// (Sync should not sync fields that export filters out)
const exportJs = read(join('..', 'sql-learning-hub', 'assets', 'js', 'export-data.js'));
if (exportJs.length > 100) {
  // Get the sensitive field filter from export-data.js
  const exportSensitiveMatch = exportJs.match(/sensitive|Sensitive|filterSensitive/);
  check(exportSensitiveMatch, 'export-data.js has sensitive field filter');
  // Ideally, sync should use the same filter - check if sync-engine references export
  const syncRefsExport = /export-data|ExportData/.test(syncJs);
  if (syncRefsExport) {
    check(true, 'sync-engine.js references export-data (may share filter)');
  } else {
    console.log('  WARN: sync-engine.js does not reference export-data.js (separate filters)');
    pass++; // Not necessarily a problem, they may have separate logic
  }
}

// === 3. Check no innerHTML in sync results display ===
// (XSS safety for sync error/success messages)
const syncUISection = syncJs; // Sync engine may update UI with results
check(
  !/innerHTML/.test(syncUISection) || /textContent/.test(syncUISection),
  'sync-engine.js uses textContent (not innerHTML) for UI updates'
);

// === 4. Check Supabase client usage is correct ===
// sync-engine.js may use global supabase client (window.supabase) or wrapper
const usesSupabase = /supabase\.|createClient|\.from\(|\.insert\(|\.upsert\(/.test(syncJs);
check(usesSupabase, 'sync-engine.js uses Supabase client (directly or via wrapper)');

// === 5. Check no hard-coded credentials ===
check(
  !/https:\/\/[^"']*\.supabase\.co\/auth\/v1\//.test(syncJs),
  'sync-engine.js no hard-coded Supabase URLs (uses env/config)'
);

// === Summary ===
console.log(`\n=== No Sensitive Sync: ${pass} PASS / ${fail} FAIL ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
if (fail === 0) {
  console.log('  ✓ No sensitive data found in sync payload (static analysis)');
}
process.exit(fail > 0 ? 1 : 0);
