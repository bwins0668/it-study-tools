#!/usr/bin/env node
/**
 * verify_glossary.js — Glossary Data Validator
 *
 * Checks data/glossary/it_terms.js for structural integrity,
 * duplicate IDs, required fields, v1/v2 compatibility,
 * exam_tags/examTags consistency, related reference validity,
 * and optional Windows/Web file consistency.
 *
 * Usage:
 *   node tools/verify_glossary.js
 *   node tools/verify_glossary.js --no-web
 *   node tools/verify_glossary.js --web <path>
 */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

// ─── Config ───────────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, "..");
const LOCAL_PATH = path.join(PROJECT_ROOT, "data", "glossary", "it_terms.js");
const WEB_PATH = path.resolve(
  PROJECT_ROOT,
  "..",
  "sql-learning-hub-web-public",
  "data",
  "glossary",
  "it_terms.js"
);

const ALLOWED_LEVELS = new Set(["basic", "intermediate", "advanced"]);

// ─── CLI flags ────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const noWeb = args.includes("--no-web");
let webPath = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--web" && args[i + 1]) {
    webPath = path.resolve(args[i + 1]);
  }
}
if (!webPath && !noWeb) {
  webPath = WEB_PATH;
}

// ─── Utilities ────────────────────────────────────────────────────────────

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

let errorCount = 0;
let warningCount = 0;

function error(msg) {
  errorCount++;
  console.error("  [ERROR] " + msg);
}

function warn(msg) {
  warningCount++;
  console.warn("  [WARN]  " + msg);
}

function report(label, hasErr, hasWarn) {
  const status = hasErr ? "FAIL" : "PASS";
  console.log("  result: " + status);
  return !hasErr;
}

// ─── Load Glossary ────────────────────────────────────────────────────────

function loadGlossary(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  const sandbox = {
    window: {},
    globalThis: {},
    module: { exports: {} },
    exports: {},
    console: { log: function () {}, warn: function () {}, error: function () {} },
  };
  const context = vm.createContext(sandbox);
  vm.runInContext(code, context, { filename: filePath });

  let terms = null;

  // Try multiple export paths
  if (Array.isArray(context.window.IT_TERMS_GLOSSARY)) {
    terms = context.window.IT_TERMS_GLOSSARY;
  } else if (Array.isArray(context.globalThis.IT_TERMS_GLOSSARY)) {
    terms = context.globalThis.IT_TERMS_GLOSSARY;
  } else if (Array.isArray(context.IT_TERMS_GLOSSARY)) {
    terms = context.IT_TERMS_GLOSSARY;
  } else if (Array.isArray(context.module.exports)) {
    terms = context.module.exports;
  }

  if (!terms) {
    throw new Error("Could not load IT_TERMS_GLOSSARY from " + filePath);
  }
  return terms;
}

// ─── Validators ───────────────────────────────────────────────────────────

function validateTerms(terms, label) {
  var hasError = false;
  var hasWarning = false;

  if (!Array.isArray(terms)) {
    error(label + ": terms is not an array");
    return false;
  }

  if (terms.length === 0) {
    error(label + ": empty glossary");
    return false;
  }

  console.log("  terms: " + terms.length);
  console.log("");

  // ── Collect all IDs for uniqueness check ──
  var idSet = {};
  var idOrder = [];
  var hasDuplicates = false;

  for (var i = 0; i < terms.length; i++) {
    var term = terms[i];
    var idx = "term[" + i + "]";

    if (!term || typeof term !== "object" || Array.isArray(term)) {
      error(idx + ": not a plain object");
      hasError = true;
      continue;
    }

    // ── id ──
    if (typeof term.id !== "string" || term.id.trim() === "") {
      error(idx + ': id is missing or empty. Found: ' + JSON.stringify(term.id));
      hasError = true;
      continue;
    }

    if (idSet[term.id] !== undefined) {
      error(idx + ' id="' + term.id + '": duplicate id (first at term[' + idSet[term.id] + '])');
      hasError = true;
      hasDuplicates = true;
    } else {
      idSet[term.id] = i;
      idOrder.push(term.id);
    }

    // id naming convention (warning)
    if (!/^[a-z][a-z0-9_-]*$/.test(term.id)) {
      warn(idx + ' id="' + term.id + '": id should be lowercase snake_case or kebab-case');
      hasWarning = true;
    }

    // ── category ──
    if (typeof term.category !== "string" || term.category.trim() === "") {
      error(idx + ' id="' + term.id + '": category is missing or not a string');
      hasError = true;
    }

    // ── level ──
    if (typeof term.level !== "string" || term.level.trim() === "") {
      error(idx + ' id="' + term.id + '": level is missing or not a string');
      hasError = true;
    } else if (!ALLOWED_LEVELS.has(term.level)) {
      warn(idx + ' id="' + term.id + '": unexpected level "' + term.level + '" (expected basic/intermediate/advanced)');
      hasWarning = true;
    }

    // ── source ──
    if (typeof term.source !== "string" || term.source.trim() === "") {
      warn(idx + ' id="' + term.id + '": source is missing or not a string');
      hasWarning = true;
    }

    // ── keepEnglish ──
    if (term.keepEnglish !== undefined && typeof term.keepEnglish !== "boolean") {
      warn(idx + ' id="' + term.id + '": keepEnglish should be boolean');
      hasWarning = true;
    }

    // ── Language fields ──
    var langInfo = [
      { key: "ja", reqTerm: true, reqExpl: false },
      { key: "zh", reqTerm: true, reqExpl: true },
      { key: "en", reqTerm: true, reqExpl: true },
      { key: "ko", reqTerm: true, reqExpl: true },
    ];

    for (var li = 0; li < langInfo.length; li++) {
      var lk = langInfo[li].key;
      var val = term[lk];
      if (!val || typeof val !== "object") {
        error(idx + ' id="' + term.id + '": ' + lk + ' field is missing or not an object');
        hasError = true;
        continue;
      }
      if (langInfo[li].reqTerm && (typeof val.term !== "string" || val.term.trim() === "")) {
        error(idx + ' id="' + term.id + '": ' + lk + '.term is missing or empty');
        hasError = true;
      }
      if (langInfo[li].reqExpl && (typeof val.explanation !== "string" || val.explanation.trim() === "")) {
        error(idx + ' id="' + term.id + '": ' + lk + '.explanation is missing or empty');
        hasError = true;
      }
    }

    // ja specific subfields
    var jaVal = term["ja"];
    if (jaVal && typeof jaVal === "object") {
      if (jaVal.kana !== undefined && typeof jaVal.kana !== "string") {
        warn(idx + ' id="' + term.id + '": ja.kana should be string');
        hasWarning = true;
      }
      if (jaVal.note !== undefined && typeof jaVal.note !== "string") {
        warn(idx + ' id="' + term.id + '": ja.note should be string');
        hasWarning = true;
      }
    }

    // my / vi / fr (optional, but if present must be valid)
    var optionalLangs = ["my", "vi", "fr"];
    for (var oi = 0; oi < optionalLangs.length; oi++) {
      var ok = optionalLangs[oi];
      var ov = term[ok];
      if (ov !== undefined) {
        if (typeof ov !== "object" || Array.isArray(ov)) {
          error(idx + ' id="' + term.id + '": ' + ok + ' should be an object');
          hasError = true;
        } else {
          if (ov.term !== undefined && typeof ov.term !== "string") {
            warn(idx + ' id="' + term.id + '": ' + ok + '.term should be string');
            hasWarning = true;
          }
          if (ov.explanation !== undefined && typeof ov.explanation !== "string") {
            warn(idx + ' id="' + term.id + '": ' + ok + '.explanation should be string');
            hasWarning = true;
          }
          if (ov.needsReview !== undefined && typeof ov.needsReview !== "boolean") {
            warn(idx + ' id="' + term.id + '": ' + ok + '.needsReview should be boolean');
            hasWarning = true;
          }
        }
      }
    }

    // ── Array fields ──
    var arrayFields = ["aliases", "related", "exam_tags", "examTags", "skillTags"];
    for (var af = 0; af < arrayFields.length; af++) {
      var afName = arrayFields[af];
      var afVal = term[afName];
      if (afVal !== undefined) {
        if (!Array.isArray(afVal)) {
          error(idx + ' id="' + term.id + '": ' + afName + ' should be an array');
          hasError = true;
        } else {
          for (var ae = 0; ae < afVal.length; ae++) {
            if (typeof afVal[ae] !== "string") {
              error(idx + ' id="' + term.id + '": ' + afName + '[' + ae + '] should be a string');
              hasError = true;
            }
          }
        }
      }
    }

    // ── exam_tags / examTags consistency ──
    var hasOldTags = Array.isArray(term.exam_tags);
    var hasNewTags = Array.isArray(term.examTags);
    if (hasOldTags && hasNewTags) {
      var sortedOld = term.exam_tags.slice().sort();
      var sortedNew = term.examTags.slice().sort();
      if (JSON.stringify(sortedOld) !== JSON.stringify(sortedNew)) {
        error(idx + ' id="' + term.id + '": exam_tags and examTags content mismatch');
        hasError = true;
        console.error("      exam_tags: " + JSON.stringify(sortedOld));
        console.error("      examTags:  " + JSON.stringify(sortedNew));
      }
    }

    // ── related reference check ──
    if (Array.isArray(term.related)) {
      for (var ri = 0; ri < term.related.length; ri++) {
        var refId = term.related[ri];
        if (idSet[refId] === undefined) {
          // We may not have processed the referenced term yet, so check in the full id set later.
          // Defer to a second pass below.
        }
      }
    }

    // ── v1 / v2 compatibility ──
    var schemaVer = term.schemaVersion;
    if (schemaVer === "v2") {
      // v2 required fields
      if (!term.subcategory || typeof term.subcategory !== "string" || term.subcategory.trim() === "") {
        error(idx + ' id="' + term.id + '": schemaVersion=v2 requires non-empty subcategory');
        hasError = true;
      }
      if (!Array.isArray(term.examTags) || term.examTags.length === 0) {
        error(idx + ' id="' + term.id + '": schemaVersion=v2 requires non-empty examTags array');
        hasError = true;
      }
      if (!Array.isArray(term.skillTags) || term.skillTags.length === 0) {
        error(idx + ' id="' + term.id + '": schemaVersion=v2 requires non-empty skillTags array');
        hasError = true;
      }
      if (typeof term.searchBoost !== "number" || !Number.isFinite(term.searchBoost)) {
        error(idx + ' id="' + term.id + '": schemaVersion=v2 requires numeric searchBoost');
        hasError = true;
      }
      if (typeof term.updatedAt !== "string" || term.updatedAt.trim() === "") {
        error(idx + ' id="' + term.id + '": schemaVersion=v2 requires non-empty updatedAt string');
        hasError = true;
      }
      // subcategory naming convention (warning)
      if (term.subcategory && !/^[a-z][a-z0-9_-]*$/.test(term.subcategory)) {
        warn(idx + ' id="' + term.id + '": subcategory "' + term.subcategory + '" should be lowercase key');
        hasWarning = true;
      }
      // skillTags naming convention (warning)
      if (Array.isArray(term.skillTags)) {
        for (var sti = 0; sti < term.skillTags.length; sti++) {
          if (!/^[a-z][a-z0-9-]*$/.test(term.skillTags[sti])) {
            warn(idx + ' id="' + term.id + '": skillTag "' + term.skillTags[sti] + '" should be lowercase kebab-case');
            hasWarning = true;
          }
        }
      }
      // updatedAt format (warning)
      if (term.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(term.updatedAt)) {
        warn(idx + ' id="' + term.id + '": updatedAt "' + term.updatedAt + '" should be YYYY-MM-DD');
        hasWarning = true;
      }
    }
  }

  // ── Second pass: related reference check (all IDs now known) ──
  for (var j = 0; j < terms.length; j++) {
    var t = terms[j];
    if (!t || typeof t !== "object" || !t.id) continue;
    if (Array.isArray(t.related)) {
      for (var rj = 0; rj < t.related.length; rj++) {
        var ref = t.related[rj];
        if (idSet[ref] === undefined) {
          error('term id="' + t.id + '": related "' + ref + '" does not exist in glossary');
          hasError = true;
        }
      }
    }
  }

  return report(label, hasError, hasWarning);
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  console.log("");
  console.log("=== Glossary validation report ===");
  console.log("");

  var totalFail = false;

  // ── Local ──
  if (!fs.existsSync(LOCAL_PATH)) {
    console.error("Local file not found: " + LOCAL_PATH);
    process.exitCode = 1;
    return;
  }

  console.log("Local:");
  console.log("  file: " + LOCAL_PATH);
  var localTerms;
  try {
    localTerms = loadGlossary(LOCAL_PATH);
  } catch (e) {
    console.error("  LOAD ERROR: " + e.message);
    process.exitCode = 1;
    return;
  }
  var localOk = validateTerms(localTerms, "local");
  if (!localOk) totalFail = true;

  console.log("");

  // ── Web (optional) ──
  var webOk = true;
  if (webPath && fs.existsSync(webPath)) {
    console.log("Web:");
    console.log("  file: " + webPath);

    try {
      var webTerms = loadGlossary(webPath);
      webOk = validateTerms(webTerms, "web");
      if (!webOk) totalFail = true;
    } catch (e) {
      console.error("  LOAD ERROR: " + e.message);
      process.exitCode = 1;
      return;
    }

    // ── SHA256 consistency ──
    console.log("");
    console.log("Dual-end consistency:");
    var localHash = sha256(LOCAL_PATH);
    var webHash = sha256(webPath);
    console.log("  local SHA256: " + localHash);
    console.log("  web SHA256:  " + webHash);
    if (localHash === webHash) {
      console.log("  match: PASS");
    } else {
      console.log("  match: FAIL");
      error("local and web it_terms.js SHA256 mismatch");
      totalFail = true;
    }
  } else if (webPath && !noWeb) {
    console.log("Web:");
    console.log("  file: " + webPath + " (not found, skipped)");
    console.log("  result: SKIP");
  }

  console.log("");
  console.log("=== Summary ===");
  console.log("  errors:   " + errorCount);
  console.log("  warnings: " + warningCount);
  if (totalFail) {
    console.log("  Final result: FAIL");
    process.exitCode = 1;
  } else {
    console.log("  Final result: PASS");
  }
  console.log("");
}

main();
