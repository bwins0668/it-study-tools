#!/usr/bin/env node
/**
 * scan_sensitive_files.mjs — Scan repo for sensitive data
 * Comprehensive security scan for tokens, passwords, API keys
 */

import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

let pass = 0, fail = 0;
const errors = [], warnings = [];

function check(cond, msg) { cond ? pass++ : (fail++, errors.push(msg)); }

function read(rel) {
  try { return readFileSync(join(ROOT, rel), 'utf8'); } catch { return ''; }
}

// Sensitive patterns to scan for
const SENSITIVE_PATTERNS = [
  { pattern: /password\s*[:=]\s*["'][^"']+["']/i, desc: 'password assignment' },
  { pattern: /token\s*[:=]\s*["'][^"']+["']/i, desc: 'token assignment' },
  { pattern: /api[_-]?key\s*[:=]\s*["'][^"']+["']/i, desc: 'API key assignment' },
  { pattern: /secret\s*[:=]\s*["'][^"']+["']/i, desc: 'secret assignment' },
  { pattern: /authorization\s*[:=]\s*["'][^"']+["']/i, desc: 'authorization header' },
  { pattern: /gemini_api_key/, desc: 'Gemini API key' },
  { pattern: /supabase.*key/i, desc: 'Supabase key' },
];

// Files to scan (exclude node_modules, .git, etc.)
const SCAN_EXTENSIONS = ['.js', '.html', '.css', '.json', '.md', '.mjs'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'backups', 'dist', 'build'];

function scanDir(dir, baseDir = '') {
  let results = [];
  let files;
  try { files = readdirSync(dir, { withFileTypes: true }); } catch { return results; }

  for (const f of files) {
    const relPath = join(baseDir, f.name);
    if (f.isDirectory()) {
      if (EXCLUDE_DIRS.includes(f.name)) continue;
      results = results.concat(scanDir(join(dir, f.name), relPath));
    } else if (f.isFile()) {
      const ext = '.' + f.name.split('.').pop();
      if (SCAN_EXTENSIONS.includes(ext)) {
        results.push(scanFile(join(dir, f.name), relPath));
      }
    }
  }
  return results.filter(r => r !== null);
}

function scanFile(fullPath, relPath) {
  const content = readFileSync(fullPath, 'utf8');
  for (const { pattern, desc } of SENSITIVE_PATTERNS) {
    if (pattern.test(content)) {
      // Check if it's a comment or documentation
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (pattern.test(lines[i])) {
          const trimmed = lines[i].trim();
          if (!trimmed.startsWith('//') && !trimmed.startsWith('*') && !trimmed.startsWith('<!--')) {
            return { file: relPath, line: i + 1, desc };
          }
        }
      }
    }
  }
  return null;
}

// === 1. Scan for sensitive patterns ===
console.log('Scanning for sensitive patterns...');
const results = scanDir(ROOT);
if (results.length > 0) {
  errors.push(`Found ${results.length} potentially sensitive occurrences`);
  results.forEach(r => console.error(`  FAIL: ${r.file}:${r.line} - ${r.desc}`));
  fail++;
} else {
  pass++;
  console.log('  ✓ No sensitive patterns found');
}

// === 2. Check export-data.js filter coverage ===
const exportJs = read(join('assets', 'js', 'export-data.js'));
if (exportJs.length > 100) {
  const denylistMatch = exportJs.match(/DENY_?PARTS|DENY_?LIST|sensitive/i);
  check(denylistMatch, 'export-data.js has sensitive field filter');
}

// === 3. Check backup test files not in repo ===
const backupFiles = readdirSync(ROOT).filter(f => f.endsWith('.backup.json') || f.includes('backup-test'));
if (backupFiles.length > 0) {
  warnings.push(`Found backup test files in repo root: ${backupFiles.join(', ')}`);
} else {
  pass++;
}

// === 4. Check .gitignore covers sensitive files ===
const gitignore = read('.gitignore');
check(gitignore.includes('*.bak'), '.gitignore covers *.bak files');
check(gitignore.includes('node_modules'), '.gitignore covers node_modules');
check(gitignore.includes('.env'), '.gitignore covers .env');

// === Summary ===
console.log(`\n=== Security Scan: ${pass} PASS / ${fail} FAIL / ${warnings.length} WARN ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
warnings.forEach(w => console.warn(`  WARN: ${w}`));
process.exit(fail > 0 ? 1 : 0);
