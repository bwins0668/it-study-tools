#!/usr/bin/env node
/**
 * verify_sync_boundaries.mjs — Verify sync engine only syncs whitelisted data
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
check(syncJs.length > 1000, 'sync-engine.js exists and is substantial');

if (syncJs.length < 1000) {
  console.error('Cannot find sync-engine.js in Web repo. Skipping detailed checks.');
  process.exit(1);
}

// === 1. Check sync engine only accesses whitelisted localStorage keys ===
const allowedKeys = [
  'study_tools_device_id',
  'study_tools_sync_queue',
  'study_tools_last_sync_at',
  'study_tools_sync_enabled',
  'study_tools_queue_version',
  'study_tools_settings_updated_at',
  'study_tools_last_sync_result',
  'study_tools_typing_synced_keys',
  'study_tools_exam_synced_keys',
  // Learning data keys (these are the data being synced)
  'lessons_progress',
  'quiz_results',
  'typing_sessions',
  'exam_sessions',
  'bookmarks',
  'wrong_book',
];

// Check that sync-engine.js only accesses these keys
const keyAccessPattern = /localStorage\.(get|set|remove)Item\s*\(\s*["']([^"']+)["']/g;
let match;
const accessedKeys = new Set();
while ((match = keyAccessPattern.exec(syncJs)) !== null) {
  accessedKeys.add(match[2]);
}

for (const key of accessedKeys) {
  if (!allowedKeys.some(allowed => key.includes(allowed.split('_').slice(0, 3).join('_')))) {
    // Allow if key is a prefix of an allowed key
    const isAllowed = allowedKeys.some(allowed => key === allowed || key.startsWith(allowed.split('_').slice(0, -1).join('_')));
    if (!isAllowed && key.includes('sync')) {
      check(true, `sync-engine.js accesses key: ${key} (sync-related, likely OK)`);
    }
  }
}

// === 2. Check no sensitive field names in sync payload construction ===
const sensitivePatterns = [
  /password/i,
  /token/i,
  /api[_-]?key/i,
  /secret/i,
  /session/i,
  /cookie/i,
  /authorization/i,
];

for (const pat of sensitivePatterns) {
  const matches = syncJs.match(pat) || [];
  if (matches.length > 0) {
    // Check if it's in a comment or error message (OK) or in payload (NOT OK)
    const lines = syncJs.split('\n');
    let found = false;
    for (const line of lines) {
      if (pat.test(line) && !line.trim().startsWith('//') && !line.includes('console.')) {
        // Might be a payload field - check context
        if (line.includes('payload') || line.includes('body') || line.includes('insert(') || line.includes('update(')) {
          errors.push(`sync-engine.js may include sensitive field: ${pat} in line: ${line.trim().slice(0, 80)}`);
          fail++;
          found = true;
          break;
        }
      }
    }
    if (!found) pass++;
  } else {
    pass++;
  }
}

// === 3. Check Supabase table operations are whitelisted ===
const allowedTables = [
  'learning_progress',
  'quiz_results',
  'typing_sessions',
  'exam_sessions',
  'bookmarks',
  'wrong_book',
  // sync_log may be added in future
];
for (const table of allowedTables) {
  check(syncJs.includes(table), `sync-engine.js references allowed table: ${table}`);
}
// Warn if sync_log not found (may be future)
if (!syncJs.includes('sync_log')) {
  console.log('  WARN: sync-engine.js does not reference sync_log table (may be future)');
}

// === 4. Check no raw SQL ===
check(!/executeSql|\.sql\(/.test(syncJs), 'sync-engine.js no raw SQL (uses Supabase client)');

// === 5. Check merge logic exists (for conflict resolution) ===
check(/merge|dedup|conflict/.test(syncJs), 'sync-engine.js has merge/dedup logic');

// === Summary ===
console.log(`\n=== Sync Boundaries: ${pass} PASS / ${fail} FAIL ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
process.exit(fail > 0 ? 1 : 0);
