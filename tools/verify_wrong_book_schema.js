#!/usr/bin/env node
/**
 * verify_wrong_book_schema.js — Wrong Book Schema Upgrade Validator
 *
 * Round 23.7: verifies that the wrong book local data structure has been
 * upgraded with updatedAt, archivedAt, schemaVersion, and soft-delete support.
 *
 * Performs static analysis of assets/js/app.js — no browser or localStorage needed.
 *
 * Usage:
 *   node tools/verify_wrong_book_schema.js
 *   node tools/verify_wrong_book_schema.js --web <path-to-web-repo>
 */

"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ─── Config ───────────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, "..");
const APP_JS = path.join(PROJECT_ROOT, "assets", "js", "app.js");

const args = process.argv.slice(2);
let WEB_APP_JS = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--web" && args[i + 1]) {
    WEB_APP_JS = path.join(args[i + 1], "assets", "js", "app.js");
    i++;
  }
}
if (!WEB_APP_JS) {
  const defaultWeb = path.resolve(PROJECT_ROOT, "..", "sql-learning-hub-web-public", "assets", "js", "app.js");
  if (fs.existsSync(defaultWeb)) WEB_APP_JS = defaultWeb;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
let warnings = 0;

function pass(msg) { passed++; console.log("  \x1b[32m✓\x1b[0m " + msg); }
function fail(msg) { failed++; console.log("  \x1b[31m✗\x1b[0m " + msg); }
function warn(msg) { warnings++; console.log("  \x1b[33m!\x1b[0m " + msg); }

function checkContains(src, pattern, label) {
  if (typeof pattern === "string") {
    return src.includes(pattern) ? pass(label) : fail(label + " — not found: " + pattern);
  }
  return pattern.test(src) ? pass(label) : fail(label + " — regex not matched: " + pattern);
}

function checkNotContains(src, pattern, label) {
  if (typeof pattern === "string") {
    return !src.includes(pattern) ? pass(label) : fail(label + " — found but should not: " + pattern);
  }
  return !pattern.test(src) ? pass(label) : fail(label + " — regex matched but should not: " + pattern);
}

// ─── Main Checks ──────────────────────────────────────────────────────────

function verifyAppJs(filePath, label) {
  console.log("\n\x1b[1m=== " + label + " ===\x1b[0m");
  console.log("  File: " + filePath);

  if (!fs.existsSync(filePath)) {
    fail("File does not exist: " + filePath);
    return null;
  }

  const src = fs.readFileSync(filePath, "utf8");
  console.log("  Size: " + (src.length / 1024).toFixed(1) + " KB, Lines: " + src.split("\n").length);

  // 1. WRONG_BOOK_SCHEMA_VERSION constant
  console.log("\n  --- Schema Version ---");
  checkContains(src, /const\s+WRONG_BOOK_SCHEMA_VERSION\s*=\s*2/, "WRONG_BOOK_SCHEMA_VERSION = 2 constant exists");
  checkContains(src, "schemaVersion: WRONG_BOOK_SCHEMA_VERSION", "normalizeWrongBookItem uses WRONG_BOOK_SCHEMA_VERSION");

  // 2. updatedAt field in normalizeWrongBookItem
  console.log("\n  --- updatedAt Field ---");
  checkContains(src, /updatedAt:\s*updatedAt/, "normalizeWrongBookItem returns updatedAt field");
  checkContains(src, /var\s+updatedAt\s*=\s*item\.updatedAt/, "updatedAt migration fallback chain exists");
  checkContains(src, "item.lastPracticedAt || item.lastWrongAt || item.firstWrongAt", "updatedAt fallback: lastPracticedAt → lastWrongAt → firstWrongAt → now");

  // 3. archivedAt field
  console.log("\n  --- archivedAt Field ---");
  checkContains(src, "archivedAt:", "normalizeWrongBookItem returns archivedAt field");
  checkContains(src, /archivedAt:\s*item\.archivedAt\s*\|\|\s*null/, "archivedAt defaults to null for old data");

  // 4. Soft delete in removeWrongBookItem
  console.log("\n  --- Soft Delete ---");
  checkContains(src, /item\.archived\s*=\s*true/, "removeWrongBookItem sets archived = true");
  checkContains(src, /item\.archivedAt\s*=\s*now/, "removeWrongBookItem sets archivedAt = now");
  checkNotContains(src, /\.filter\(function\s*\(entry\)\s*\{\s*return\s*entry\.key\s*!==\s*key\s*;\s*\}\)/, "removeWrongBookItem no longer hard-deletes via filter");

  // 5. recordWrongBookItem updatedAt + restore
  console.log("\n  --- recordWrongBookItem ---");
  checkContains(src, "existing.archivedAt = null", "recordWrongBookItem clears archivedAt on re-record (restore)");
  checkContains(src, "existing.updatedAt = now", "recordWrongBookItem sets updatedAt on existing item");
  checkContains(src, "item.updatedAt = now", "recordWrongBookItem sets updatedAt on new item");

  // 6. submitWrongBookRetryAnswer updatedAt
  console.log("\n  --- submitWrongBookRetryAnswer ---");
  checkContains(src, "stored.updatedAt = now", "submitWrongBookRetryAnswer sets updatedAt");

  // 7. toggleWrongBookMastered updatedAt
  console.log("\n  --- toggleWrongBookMastered ---");
  checkContains(src, /item\.mastered\s*=\s*!item\.mastered[\s\S]{0,50}item\.updatedAt\s*=\s*now/, "toggleWrongBookMastered sets updatedAt");

  // 8. Migration auto-save in loadWrongBook
  console.log("\n  --- Migration ---");
  checkContains(src, "needsMigration", "loadWrongBook detects items needing migration");
  checkContains(src, /parsed\.some/, "Migration checks raw parsed data before normalization");
  checkContains(src, /schemaVersion\s*\|\|\s*0\)\s*<\s*WRONG_BOOK_SCHEMA_VERSION/, "Migration checks schemaVersion with fallback for old data");

  // 9. archived filter still works
  console.log("\n  --- Archived Filter ---");
  checkContains(src, /return\s+!item\.archived/, "getFilteredWrongBookItems filters archived items");

  // 10. No forbidden patterns
  console.log("\n  --- Safety ---");
  checkNotContains(src, "html:not([data-theme=\"dark\"])", "No forbidden html:not([data-theme=dark]) selector");

  return src;
}

// ─── Run ──────────────────────────────────────────────────────────────────

console.log("Wrong Book Schema Upgrade Validator (Round 23.7)");
console.log("================================================");

const winSrc = verifyAppJs(APP_JS, "Windows (sql-learning-hub)");

let webSrc = null;
if (WEB_APP_JS) {
  webSrc = verifyAppJs(WEB_APP_JS, "Web (sql-learning-hub-web-public)");

  // Binary consistency check
  if (winSrc && webSrc) {
    console.log("\n\x1b[1m=== Binary Consistency ===\x1b[0m");
    const winHash = crypto.createHash("sha256").update(winSrc).digest("hex").slice(0, 16);
    const webHash = crypto.createHash("sha256").update(webSrc).digest("hex").slice(0, 16);
    if (winHash === webHash) {
      pass("app.js SHA256 match: " + winHash);
    } else {
      fail("app.js SHA256 mismatch: Windows=" + winHash + " Web=" + webHash);
    }
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────

console.log("\n\x1b[1m=== Summary ===\x1b[0m");
console.log("  Passed:   " + passed);
console.log("  Failed:   " + failed);
console.log("  Warnings: " + warnings);

if (failed > 0) {
  console.log("\n\x1b[31mFAILED — " + failed + " check(s) did not pass.\x1b[0m");
  process.exit(1);
} else {
  console.log("\n\x1b[32mALL CHECKS PASSED\x1b[0m");
  process.exit(0);
}
