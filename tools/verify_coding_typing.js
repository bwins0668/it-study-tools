#!/usr/bin/env node
/**
 * verify_coding_typing.js -- Coding Typing Practice Data Validator (v2, stricter)
 * Checks: counts, id uniqueness, trilingual fields, SQL fixtures, expectedResultNote key format, sub-category coverage.
 */
(function() {
  'use strict';
  var p = require("path");
  var vm = require("vm");
  var fs = require("fs");
  var ROOT = p.resolve(__dirname, "..");
  var DATADIR = p.join(ROOT, "data", "coding_typing");

  var FILES = {
    "python_basics.js": "CODING_TYPING_DATA_PYTHON",
    "java_basics.js":  "CODING_TYPING_DATA_JAVA",
    "sql_basics.js":   "CODING_TYPING_DATA_SQL",
    "coding_symbols.js":"CODING_TYPING_DATA_SYMBOLS"
  };

  var errors = [];
  var warnings = [];
  var allItems = [];

  function loadGlobalVar(src, varName) {
    var sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(src, sandbox);
    return sandbox.window[varName];
  }

  Object.keys(FILES).forEach(function(fileName) {
    var varName = FILES[fileName];
    var fp = p.join(DATADIR, fileName);
    var src;
    try {
      src = fs.readFileSync(fp, "utf-8");
    } catch (ex) {
      errors.push("CANNOT_READ: " + fileName + " -- " + ex.message);
      return;
    }
    try {
      var data = loadGlobalVar(src, varName);
      if (!data || !Array.isArray(data)) {
        errors.push("NOT_ARRAY: " + fileName);
        return;
      }
      data.forEach(function(item) { allItems.push(item); });
    } catch (ex) {
      errors.push("PARSE_FAIL: " + fileName + " -- " + ex.message);
    }
  });

  // Load CODING_TYPING_ALL_CATEGORIES from _index.js
  var categoryIndex = {};
  try {
    var idxSrc = fs.readFileSync(p.join(DATADIR, "_index.js"), "utf-8");
    var idxData = loadGlobalVar(idxSrc, "CODING_TYPING_ALL_CATEGORIES");
    if (idxData && typeof idxData === "object") {
      categoryIndex = idxData;
    } else {
      warnings.push("CODING_TYPING_ALL_CATEGORIES not found or invalid in _index.js");
    }
  } catch (ex) {
    warnings.push("Cannot read _index.js for category index: " + ex.message);
  }

  console.log("=== verify_coding_typing.js Report ===\n");

  // --- 1. Counts ---
  var total = allItems.length;
  console.log("Total items: " + total);
  var expected = { python: 45, java: 35, sql: 45, symbol: 25 };
  var langCounts = {};
  allItems.forEach(function(item) {
    var lang = item.language || "?";
    langCounts[lang] = (langCounts[lang] || 0) + 1;
  });
  Object.keys(expected).forEach(function(lang) {
    var got = langCounts[lang] || 0;
    if (got !== expected[lang]) {
      errors.push("COUNT_" + lang + ": expected " + expected[lang] + " got " + got);
    } else {
      console.log("  " + lang + ": " + got + " OK");
    }
  });
  console.log("");

  // --- 2. ID uniqueness ---
  var idMap = {};
  allItems.forEach(function(item) {
    if (idMap[item.id]) errors.push("DUP_ID: " + item.id);
    idMap[item.id] = true;
  });
  console.log("IDs unique: " + (Object.keys(idMap).length === total ? "PASS" : "FAIL"));

  var validLangs = { python: true, java: true, sql: true, symbol: true };
  var trilingualLocales = ["zh-CN", "ja-JP", "en-US"];
  var textFields = ["title", "explanation", "hint"];
  var seenCats = {};

  // --- 3. Per-item validation ---
  allItems.forEach(function(item) {
    var id = item.id || "?";
    if (!validLangs[item.language]) errors.push(id + ": bad language " + item.language);
    if (typeof item.level !== "number" || item.level < 1 || item.level > 5)
      errors.push(id + ": level " + item.level + " not in 1-5");
    if (typeof item.difficulty !== "number" || item.difficulty < 1 || item.difficulty > 5)
      errors.push(id + ": difficulty " + item.difficulty + " not in 1-5");
    if (!item.code || String(item.code).trim() === "")
      errors.push(id + ": code empty");
    if (!item.focus || !Array.isArray(item.focus) || item.focus.length === 0)
      warnings.push(id + ": focus empty");
    if (!item.source)
      warnings.push(id + ": source empty");

    // Check trilingual text fields
    textFields.forEach(function(field) {
      trilingualLocales.forEach(function(locale) {
        var val = item[field] && item[field][locale];
        if (!val || String(val).trim() === "")
          errors.push(id + ": " + field + "." + locale + " empty");
      });
    });

    // Code must not contain fixture SQL
    if (typeof item.code === "string") {
      if (/\bdrop\s+table\b/i.test(item.code)) errors.push(id + ": code has DROP TABLE");
      if (/\bcreate\s+table\b/i.test(item.code)) errors.push(id + ": code has CREATE TABLE");
    }

    if (item.language === "sql") {
      if (item.sandboxRunnable && (!item.sqlSchema || !item.sqlSeed))
        warnings.push(id + ": sandboxRunnable but missing sqlSchema/sqlSeed");
      if (item.sqlSchema) {
        if (!/\bdrop\s+table\s+if\s+exists\b/i.test(item.sqlSchema))
          warnings.push(id + ": sqlSchema missing DROP TABLE IF EXISTS");
        if (!/\bcreate\s+table\b/i.test(item.sqlSchema))
          errors.push(id + ": sqlSchema missing CREATE TABLE");
      }
      if (item.sqlSeed && !/\binsert\s+into\b/i.test(item.sqlSeed))
        warnings.push(id + ": sqlSeed missing INSERT INTO");
      if (item.expectedResultNote) {
        // OLD short key names must not be used
        if (item.expectedResultNote.zh || item.expectedResultNote.ja || item.expectedResultNote.en) {
          errors.push(id + ": expectedResultNote uses OLD key names (zh/ja/en)");
        }
        // All three full locale keys must be present and non-empty
        trilingualLocales.forEach(function(locale) {
          if (!item.expectedResultNote[locale] || String(item.expectedResultNote[locale]).trim() === "")
            errors.push(id + ": expectedResultNote." + locale + " empty");
        });
      }
    }

    if (item.language === "symbol" && item.sandboxRunnable)
      warnings.push(id + ": symbol should not be sandboxRunnable");

    // Track category for coverage check
    if (item.language && item.category) {
      var catKey = item.language + "|" + item.category;
      seenCats[catKey] = (seenCats[catKey] || 0) + 1;
    }
  });

  // --- 4. Category coverage check ---
  if (Object.keys(categoryIndex).length > 0) {
    Object.keys(seenCats).forEach(function(catKey) {
      var parts = catKey.split("|");
      var lang = parts[0];
      var cat = parts[1];
      var ref = categoryIndex[lang];
      if (!ref) {
        warnings.push("Category language " + lang + " not in CODING_TYPING_ALL_CATEGORIES");
        return;
      }
      if (ref.indexOf(cat) === -1) {
        warnings.push("Category " + cat + " in " + lang + " not listed in CODING_TYPING_ALL_CATEGORIES");
      }
    });
    // Check for unreferenced index entries
    Object.keys(categoryIndex).forEach(function(lang) {
      categoryIndex[lang].forEach(function(cat) {
        var ck = lang + "|" + cat;
        if (!seenCats[ck]) {
          warnings.push("CODING_TYPING_ALL_CATEGORIES [" + lang + "] has " + cat + " but no items");
        }
      });
    });
  } else {
    warnings.push("Skipping category coverage -- no CODING_TYPING_ALL_CATEGORIES loaded");
  }

  console.log("\nErrors: " + errors.length);
  errors.forEach(function(x) { console.log("  ERROR: " + x); });
  console.log("Warnings: " + warnings.length);
  warnings.forEach(function(x) { console.log("  WARN: " + x); });

  var exitCode = errors.length > 0 ? 1 : 0;
  console.log("\nResult: " + (exitCode === 0 ? "PASS" : "FAIL"));
  process.exit(exitCode);
})();
