#!/usr/bin/env node
/**
 * verify_wrong_book_sync.js — Round 23.8 Wrong Book Sync Verifier
 *
 * Static analysis checks for the wrong book Supabase sync MVP:
 *  - SQL DDL: wrong_book_items table, fields, unique constraint, RLS
 *  - sync-engine.js: wrongBook push/pull/merge steps, no hardcoded keys
 *  - auth-ui.js: wrongBook summary rendering
 *  - i18n: all 7 locales have wrongBook keys
 *  - Round 23.12: retry settings are synced; retry history remains local
 *  - Dual-repo binary consistency for shared files
 *
 * Usage:
 *   node tools/verify_wrong_book_sync.js
 *   node tools/verify_wrong_book_sync.js --no-web
 *   node tools/verify_wrong_book_sync.js --web <path>
 */

"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ─── Config ───────────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, "..");
const WEB_DEFAULT = path.resolve(PROJECT_ROOT, "..", "sql-learning-hub-web-public");

const args = process.argv.slice(2);
const noWeb = args.includes("--no-web");
const webIdx = args.indexOf("--web");
const WEB_ROOT = webIdx >= 0 ? args[webIdx + 1] : WEB_DEFAULT;

const SHARED_FILES = [
  "assets/js/sync-engine.js",
  "assets/js/auth-ui.js",
  "assets/js/i18n-ui-dict.js",
  "assets/js/app.js",
];

// ─── Helpers ──────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
let warnings = 0;

function check(label, condition, detail) {
  if (condition) {
    passed++;
    console.log("  ✓ " + label);
  } else {
    failed++;
    console.log("  ✗ " + label + (detail ? " — " + detail : ""));
  }
}

function warn(label, detail) {
  warnings++;
  console.log("  ⚠ " + label + (detail ? " — " + detail : ""));
}

function readFile(fp) {
  try { return fs.readFileSync(fp, "utf8"); } catch (_) { return null; }
}

function sha256(fp) {
  try {
    return crypto.createHash("sha256").update(fs.readFileSync(fp)).digest("hex");
  } catch (_) { return null; }
}

// ─── 1. SQL DDL Checks ──────────────────────────────────────────────────

console.log("\n[1] SQL DDL — init_supabase.sql");
const sqlPath = path.join(PROJECT_ROOT, "tools", "init_supabase.sql");
const sqlContent = readFile(sqlPath);

check("SQL file exists", sqlContent !== null, "tools/init_supabase.sql not found");

if (sqlContent) {
  check("wrong_book_items table defined", /CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS\s+public\.wrong_book_items/i.test(sqlContent));
  check("item_key field exists", /item_key\s+TEXT/i.test(sqlContent));
  check("user_id field exists", /user_id\s+UUID\s+NOT\s+NULL/i.test(sqlContent));
  check("client_updated_at field exists", /client_updated_at\s+TIMESTAMPTZ/i.test(sqlContent));
  check("unique(user_id, item_key) constraint", /CONSTRAINT\s+uq_wrong_book_items\s+UNIQUE\s*\(user_id,\s*item_key\)/i.test(sqlContent));
  check("RLS enabled", /ALTER\s+TABLE\s+public\.wrong_book_items\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY/i.test(sqlContent));
  check("RLS isolation policy", /POLICY\s+wbi_isolation\s+ON\s+public\.wrong_book_items/i.test(sqlContent));
  check("archived field exists", /archived\s+BOOLEAN/i.test(sqlContent));
  check("archived_at field exists", /archived_at\s+TIMESTAMPTZ/i.test(sqlContent));
  check("schema_version field exists", /schema_version\s+INTEGER/i.test(sqlContent));
  check("module field exists", /module\s+TEXT/i.test(sqlContent));
  check("question_text field exists", /question_text\s+TEXT/i.test(sqlContent));
  check("choices jsonb field exists", /choices\s+JSONB/i.test(sqlContent));
  check("correct_answer jsonb field exists", /correct_answer\s+JSONB/i.test(sqlContent));
  check("user_answer jsonb field exists", /user_answer\s+JSONB/i.test(sqlContent));
  check("wrong_count field exists", /wrong_count\s+INTEGER/i.test(sqlContent));
  check("correct_retry_count field exists", /correct_retry_count\s+INTEGER/i.test(sqlContent));
  check("mastered field exists", /mastered\s+BOOLEAN/i.test(sqlContent));

  // Indexes
  const idxCount = (sqlContent.match(/CREATE\s+INDEX.*wrong_book/gi) || []).length;
  check("At least 3 indexes on wrong_book_items", idxCount >= 3, "found " + idxCount);
  check("user_settings has retry settings JSONB", /wrong_book_retry_settings\s+JSONB/i.test(sqlContent));
  check("Existing user_settings gets retry settings column", /ADD\s+COLUMN\s+IF\s+NOT\s+EXISTS\s+wrong_book_retry_settings\s+JSONB/i.test(sqlContent));
}

// ─── 2. sync-engine.js Checks ────────────────────────────────────────────

console.log("\n[2] sync-engine.js — Wrong Book Sync Functions");
const syncPath = path.join(PROJECT_ROOT, "assets", "js", "sync-engine.js");
const syncContent = readFile(syncPath);

check("sync-engine.js exists", syncContent !== null);

if (syncContent) {
  // Functions exist
  check("collectWrongBookForSync function", /function\s+collectWrongBookForSync/.test(syncContent));
  check("pushWrongBook function", /async\s+function\s+pushWrongBook/.test(syncContent));
  check("pullWrongBook function", /async\s+function\s+pullWrongBook/.test(syncContent));
  check("mergeWrongBookRemoteToLocal function", /function\s+mergeWrongBookRemoteToLocal/.test(syncContent));

  // Schema version filter
  check("schemaVersion >= 2 filter in collect", /schemaVersion.*<\s*WRONG_BOOK_SYNC_MIN_SCHEMA/.test(syncContent));

  // Archived data included in push
  check("archived items included in push (no archived filter in collect)", !/if\s*\(.*\.archived\s*===?\s*true\)\s*continue/.test(syncContent));

  // Upsert with conflict target
  check("upsert with onConflict user_id,item_key", /onConflict:\s*["']user_id,item_key["']/.test(syncContent));

  // Batch upsert
  check("batched upsert (WRONG_BOOK_UPSERT_BATCH)", /WRONG_BOOK_UPSERT_BATCH/.test(syncContent));

  // Integration into runManualSync
  check("wrongbook_pull step in runManualSync", /\["wrongbook_pull",\s*pullWrongBook\]/.test(syncContent));
  check("wrongbook_push step in runManualSync", /\["wrongbook_push",\s*pushWrongBook\]/.test(syncContent));

  // Summary fields
  check("wrongbook_pushed in summaryData", /wrongbook_pushed:/.test(syncContent));
  check("wrongbook_pulled in summaryData", /wrongbook_pulled:/.test(syncContent));
  check("wrongbook_merged in summaryData", /wrongbook_merged:/.test(syncContent));
  check("wrongbook_skipped in summaryData", /wrongbook_skipped:/.test(syncContent));
  check("wrong_book in scope array", /"wrong_book"/.test(syncContent));

  // Public API
  check("pushWrongBook in public API", /pushWrongBook:\s*pushWrongBook/.test(syncContent));
  check("pullWrongBook in public API", /pullWrongBook:\s*pullWrongBook/.test(syncContent));

  // No hardcoded Supabase keys
  const hardcodedKeys = (syncContent.match(/eyJ[A-Za-z0-9_-]{20,}\.eyJ[A-Za-z0-9_-]{20,}/g) || []).length;
  check("No hardcoded JWT/API keys in sync-engine", hardcodedKeys === 0, "found " + hardcodedKeys);

  // No hardcoded Supabase URLs
  const hardcodedUrls = (syncContent.match(/https:\/\/[a-z0-9]+\.supabase\.co/gi) || []).length;
  check("No hardcoded Supabase URLs in sync-engine", hardcodedUrls === 0, "found " + hardcodedUrls);

  // Conflict merge rules
  check("LWW conflict strategy (Math.max for timestamps)", /Math\.max\(.*localTs.*remoteTs/.test(syncContent));
  check("wrongCount uses Math.max", /Math\.max.*wrongCount.*wrong_count/.test(syncContent));
  check("correctRetryCount uses Math.max", /Math\.max.*correctRetryCount.*correct_retry_count/.test(syncContent));
  check("newerTimestamp helper used for lastWrongAt", /newerTimestamp\(.*lastWrongAt/.test(syncContent));
  check("Archived restore logic (archivedAt vs lastWrongAt)", /localLwa\s*>\s*archTs.*remoteLwa\s*>\s*archTs/.test(syncContent));

  // retry settings synced; retry history remains local
  check("retry-history-v1 NOT referenced in sync", !/study-tools-wrong-book-retry-history-v1/.test(syncContent));
  check("retry-settings-v1 referenced in sync", /study-tools-wrong-book-retry-settings-v1/.test(syncContent));
  check("syncWrongBookRetrySettings function", /async\s+function\s+syncWrongBookRetrySettings/.test(syncContent));
  check("retry settings step in runManualSync", /\["wrongbook_retry_settings",\s*syncWrongBookRetrySettings\]/.test(syncContent));
  check("retry settings uses updatedAt LWW", /retrySettingsTimestamp\(remote\)\s*>\s*retrySettingsTimestamp\(local\)/.test(syncContent));
  check("retry settings schemaVersion", /finalSettings\.schemaVersion\s*=\s*1/.test(syncContent));
  check("retry settings remote column", /wrong_book_retry_settings:\s*finalSettings/.test(syncContent));

  // Uses normalizeWrongBookItem if available
  check("Calls normalizeWrongBookItem if available", /typeof\s+normalizeWrongBookItem\s*===\s*["']function["']/.test(syncContent));
}

// ─── 3. auth-ui.js Checks ────────────────────────────────────────────────

console.log("\n[3] auth-ui.js — Sync Summary Rendering");
const authPath = path.join(PROJECT_ROOT, "assets", "js", "auth-ui.js");
const authContent = readFile(authPath);

check("auth-ui.js exists", authContent !== null);

if (authContent) {
  check("wrongbookPushed variable extracted", /wrongbookPushed\s*=.*summaryDetails.*wrongbook_pushed/.test(authContent));
  check("wrongbookPulled variable extracted", /wrongbookPulled\s*=.*summaryDetails.*wrongbook_pulled/.test(authContent));
  check("wrongbookMerged variable extracted", /wrongbookMerged\s*=.*summaryDetails.*wrongbook_merged/.test(authContent));
  check("wrongbookSkipped variable extracted", /wrongbookSkipped\s*=.*summaryDetails.*wrongbook_skipped/.test(authContent));
  check("wrongBookPushed rendered in detailsList", /wrongbookPushed.*wrongBookPushed/.test(authContent));
  check("wrongBookPulled rendered in detailsList", /wrongbookPulled.*wrongBookPulled/.test(authContent));
  check("wrongBookMerged rendered in detailsList", /wrongbookMerged.*wrongBookMerged/.test(authContent));
  check("retry settings pushed rendered", /retrySettingsPushed.*wrongBookRetrySettingsPushed/.test(authContent));
  check("retry settings pulled rendered", /retrySettingsPulled.*wrongBookRetrySettingsPulled/.test(authContent));
  check("retry settings merged rendered", /retrySettingsMerged.*wrongBookRetrySettingsMerged/.test(authContent));
  check("retry settings failed rendered", /retrySettingsFailed.*wrongBookRetrySettingsFailed/.test(authContent));
}

// ─── 4. i18n Checks ─────────────────────────────────────────────────────

console.log("\n[4] i18n-ui-dict.js — Wrong Book Sync Keys");
const i18nPath = path.join(PROJECT_ROOT, "assets", "js", "i18n-ui-dict.js");
const i18nContent = readFile(i18nPath);

check("i18n-ui-dict.js exists", i18nContent !== null);

if (i18nContent) {
  const LOCALES = ["zh-CN", "ja-JP", "en-US", "vi-VN", "fr-FR", "my-MM", "ko-KR"];
  const REQUIRED_KEYS = ["wrongBookPushed", "wrongBookPulled", "wrongBookMerged", "wrongBookSkipped", "wrongBookFailed"];

  check("AUTH_SYNC_ROUND_23_8 block exists", /AUTH_SYNC_ROUND_23_8/.test(i18nContent));
  check("Object.assign for AUTH_SYNC_ROUND_23_8", /Object\.assign.*AUTH_SYNC_ROUND_23_8/.test(i18nContent));

  LOCALES.forEach(function (locale) {
    // Check each locale has the block
    var localeRegex = new RegExp('"' + locale.replace("-", "\\-") + '"[\\s\\S]*?wrongBookPushed');
    check("Locale " + locale + " has wrongBookPushed", localeRegex.test(i18nContent));
  });

  REQUIRED_KEYS.forEach(function (key) {
    // Count occurrences across all locales (should be 7)
    var count = (i18nContent.match(new RegExp(key + ":", "g")) || []).length;
    check("Key '" + key + "' appears in " + count + "/7 locales", count >= 7, "found " + count);
  });

  const RETRY_SETTINGS_KEYS = [
    "wrongBookRetrySettingsPushed",
    "wrongBookRetrySettingsPulled",
    "wrongBookRetrySettingsMerged",
    "wrongBookRetrySettingsFailed",
  ];
  check("AUTH_SYNC_ROUND_23_12 block exists", /AUTH_SYNC_ROUND_23_12/.test(i18nContent));
  RETRY_SETTINGS_KEYS.forEach(function (key) {
    var count = (i18nContent.match(new RegExp(key + ":", "g")) || []).length;
    check("Key '" + key + "' appears in " + count + "/7 locales", count >= 7, "found " + count);
  });
}

const appPath = path.join(PROJECT_ROOT, "assets", "js", "app.js");
const appContent = readFile(appPath);
check("app.js retry settings has updatedAt", appContent && /updatedAt:\s*timestamp/.test(appContent));
check("app.js retry settings has schemaVersion", appContent && /schemaVersion:\s*1/.test(appContent));
check("app.js validates retry limits", appContent && /validLimits\s*=\s*\[10,\s*20,\s*30,\s*-1\]/.test(appContent));
check("No password written to localStorage", !/localStorage\.setItem\([^)]*password/i.test((syncContent || "") + (authContent || "") + (appContent || "")));
check("No Supabase Management API token code", !/SUPABASE_ACCESS_TOKEN|management\.supabase\.com/i.test((syncContent || "") + (authContent || "") + (appContent || "")));

// ─── 5. Dual-repo Consistency ─────────────────────────────────────────────

console.log("\n[5] Dual-repo Consistency");

if (noWeb) {
  warn("--no-web flag set, skipping dual-repo checks");
} else if (!fs.existsSync(WEB_ROOT)) {
  warn("Web repo not found at " + WEB_ROOT + ", skipping dual-repo checks");
} else {
  let consistencyOk = true;
  SHARED_FILES.forEach(function (rel) {
    const winPath = path.join(PROJECT_ROOT, rel);
    const webPath = path.join(WEB_ROOT, rel);
    const winHash = sha256(winPath);
    const webHash = sha256(webPath);
    if (!winHash || !webHash) {
      check("SHA256 " + rel, false, "file missing");
      consistencyOk = false;
    } else if (winHash === webHash) {
      check("SHA256 match " + rel, true);
    } else {
      check("SHA256 match " + rel, false, "Windows=" + winHash.slice(0, 8) + "… Web=" + webHash.slice(0, 8) + "…");
      consistencyOk = false;
    }
  });

  // Web-only files should exist
  const versionPath = path.join(WEB_ROOT, "assets", "js", "version.js");
  const swPath = path.join(WEB_ROOT, "service-worker.js");
  check("Web version.js exists", fs.existsSync(versionPath));
  check("Web service-worker.js exists", fs.existsSync(swPath));
}

// ─── 6. Syntax Check (node --check) ──────────────────────────────────────

console.log("\n[6] Syntax Check");

var syntaxFiles = [
  "assets/js/sync-engine.js",
  "assets/js/auth-ui.js",
  "assets/js/i18n-ui-dict.js",
];

syntaxFiles.forEach(function (rel) {
  var fp = path.join(PROJECT_ROOT, rel);
  if (!fs.existsSync(fp)) {
    check("Syntax " + rel, false, "file not found");
    return;
  }
  try {
    var code = fs.readFileSync(fp, "utf8");
    // Quick syntax check: wrap in Function constructor
    new Function(code);
    check("Syntax OK " + rel, true);
  } catch (e) {
    check("Syntax OK " + rel, false, e.message);
  }
});

// ─── Summary ──────────────────────────────────────────────────────────────

console.log("\n════════════════════════════════════════════");
console.log("Results: " + passed + " passed, " + failed + " failed, " + warnings + " warnings");
console.log("════════════════════════════════════════════\n");

process.exit(failed > 0 ? 1 : 0);
