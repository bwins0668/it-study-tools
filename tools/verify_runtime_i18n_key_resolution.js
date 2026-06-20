#!/usr/bin/env node
// tools/verify_runtime_i18n_key_resolution.js
// Stage E: Raw Key Resolution Gate
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const HTML_FILE = path.join(ROOT, "index.html");
const DICT_FILE = path.join(ROOT, "assets", "js", "i18n-ui-dict.js");

function extractI18nKeys(html) {
  const keys = new Set();
  for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) keys.add(m[1]);
  for (const m of html.matchAll(/data-i18n-placeholder="([^"]+)"/g)) keys.add(m[1]);
  for (const m of html.matchAll(/data-i18n-title="([^"]+)"/g)) keys.add(m[1]);
  for (const m of html.matchAll(/data-i18n-aria-label="([^"]+)"/g)) keys.add(m[1]);
  return [...keys].sort();
}

function loadDict(dictFile) {
  const src = fs.readFileSync(dictFile, "utf8");
  const ctx = { window: {} };
  vm.createContext(ctx);
  try { vm.runInContext(src, ctx, { filename: dictFile }); } catch(e) { throw new Error("VM eval: " + e.message); }
  return ctx.window.I18nUiDict;
}

function getNestedValue(obj, keyPath) {
  if (!obj) return null;
  const parts = keyPath.split(".");
  let val = obj;
  for (const part of parts) {
    if (val === null || val === undefined || typeof val !== "object") return null;
    if (val[part] === undefined) return null;
    val = val[part];
  }
  return (typeof val === "string" || typeof val === "number") ? val : null;
}

const LOCALE_TO_DICT = {
  "default-ja-zh": "default-ja-zh",
  "ja": "ja-JP",
  "zh": "zh-CN",
  "ko": "ko-KR",
  "my": "my-MM",
  "vi": "vi-VN",
  "th": "th-TH",
  "fr": "fr-FR",
};

function getFallbackChain(dictKey) {
  if (dictKey === "th-TH") return [dictKey, "en-US", "ja-JP", "zh-CN"];
  return [dictKey, "ja-JP", "zh-CN", "en-US"];
}

function main() {
  console.log("=== verify_runtime_i18n_key_resolution.js ===\n");
  const html = fs.readFileSync(HTML_FILE, "utf8");
  const keys = extractI18nKeys(html);
  console.log("Found " + keys.length + " data-i18n keys in index.html\n");

  const dict = loadDict(DICT_FILE);
  if (!dict) { console.error("ERROR: I18nUiDict not found"); process.exit(1); }

  const SELECTOR_LOCALES = ["default-ja-zh", "ja", "zh", "ko", "my", "vi", "th", "fr"];
  let totalFail = 0;

  for (const locale of SELECTOR_LOCALES) {
    const dictKey = LOCALE_TO_DICT[locale];
    const chain = getFallbackChain(dictKey);
    const failures = [];

    for (const key of keys) {
      let resolved = null;
      for (const fb of chain) {
        const d = dict[fb];
        if (d) { const v = getNestedValue(d, key); if (v !== null) { resolved = v; break; } }
      }
      if (resolved === null || resolved === undefined) failures.push(key + " [MISSING]");
    }

    if (failures.length === 0) {
      console.log("PASS " + locale + " (" + dictKey + "): all " + keys.length + " keys resolved");
    } else {
      console.log("FAIL " + locale + " (" + dictKey + "): " + failures.length + " missing:");
      failures.forEach(k => console.log("  - " + k));
      totalFail++;
    }
  }

  console.log("\nTotal locales: " + SELECTOR_LOCALES.length + "  FAIL: " + totalFail);
  if (totalFail > 0) process.exit(1);
  console.log("ALL PASS");
}

main();
