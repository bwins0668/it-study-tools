/* verify_locale_selector_registry.js
   Validates the LOCALE_REGISTRY data structure and i18n.js integration.
   Usage: node tools/verify_locale_selector_registry.js
   Exit 0 = PASS, Exit 1 = FAIL */
(function () {
  "use strict";

  var fs = require("fs");
  var path = require("path");
  var errors = [];
  var warnings = [];
  var passed = 0;

  function assert(cond, msg) {
    if (!cond) { errors.push("FAIL: " + msg); }
    else { passed++; }
  }

  function warn(cond, msg) {
    if (!cond) { warnings.push("WARN: " + msg); }
  }

  var ROOT = path.resolve(__dirname, "..");

  /* ─── 1. Validate locale-registry.js exists and is valid JS ─── */
  var registryPath = path.join(ROOT, "assets", "js", "locale-registry.js");
  assert(fs.existsSync(registryPath), "locale-registry.js must exist");

  var registrySrc = "";
  try { registrySrc = fs.readFileSync(registryPath, "utf8"); }
  catch (e) { errors.push("FAIL: Cannot read locale-registry.js: " + e.message); }

  /* ─── 2. Evaluate registry and validate structure ─── */
  var registry = null;
  try {
    var window = {};
    var fn = new Function("window", registrySrc + "\n; return window.LOCALE_REGISTRY;");
    registry = fn(window);
  } catch (e) {
    errors.push("FAIL: Cannot evaluate locale-registry.js: " + e.message);
  }

  assert(registry !== null, "LOCALE_REGISTRY must be defined");

  if (registry) {
    assert(typeof registry.getSupported === "function", "getSupported() must be a function");
    assert(typeof registry.isSupported === "function", "isSupported() must be a function");
    assert(typeof registry.getMigrationTarget === "function", "getMigrationTarget() must be a function");
    assert(typeof registry.getSelectorCandidates === "function", "getSelectorCandidates() must be a function");
    assert(typeof registry.normalizeCode === "function", "normalizeCode() must be a function");

    var supported = registry.getSupported();
    assert(Array.isArray(supported), "getSupported() must return an array");
    assert(supported.length === 8, "Expected exactly 8 supported languages, got " + supported.length);

    var codes = supported.map(function (l) { return l.code; });

    /* 3. Required codes */
    var requiredCodes = ["default-ja-zh", "ja", "zh", "ko", "my", "vi", "th", "fr"];
    requiredCodes.forEach(function (c) {
      assert(codes.indexOf(c) >= 0, "Required code '" + c + "' must be in SUPPORTED");
    });

    /* 4. Removed codes must NOT be present */
    var removedCodes = ["en", "id", "ms", "tl", "hi", "bn", "ur", "ar", "fa", "he",
      "tr", "de", "es", "pt", "it", "ru", "uk", "pl", "nl", "la", "eo"];
    removedCodes.forEach(function (c) {
      assert(codes.indexOf(c) < 0, "Removed code '" + c + "' must NOT be in SUPPORTED");
    });

    /* 5. Each entry must have required fields */
    var requiredFields = ["code", "label", "native", "dir", "uiStatus", "courseStatus",
      "navigationStatus", "selectorEligible", "compareEligible", "supportLevel"];
    supported.forEach(function (entry) {
      requiredFields.forEach(function (f) {
        assert(entry[f] !== undefined && entry[f] !== null,
          "Entry '" + entry.code + "' must have field '" + f + "'");
      });
      assert(entry.dir === "ltr" || entry.dir === "rtl",
        "Entry '" + entry.code + "' dir must be 'ltr' or 'rtl'");
    });

    /* 6. selectorEligible must be true for all entries (since they're in the selector) */
    var eligible = registry.getSelectorCandidates();
    assert(eligible.length === supported.length,
      "All supported languages should be selectorEligible (got " + eligible.length + " eligible vs " + supported.length + " supported)");

    /* 7. Japanese should not be compareEligible (can't compare Japanese with Japanese) */
    var jaEntry = registry.getByCode("ja");
    if (jaEntry) {
      assert(jaEntry.compareEligible === false,
        "Japanese compareEligible should be false (can't compare ja with ja)");
    }

    /* 8. default-ja-zh should not be compareEligible */
    var defaultEntry = registry.getByCode("default-ja-zh");
    if (defaultEntry) {
      assert(defaultEntry.compareEligible === false,
        "default-ja-zh compareEligible should be false (built-in bilingual mode)");
    }

    /* 9. ko, my, vi, th, fr, zh should be compareEligible */
    ["zh", "ko", "my", "vi", "th", "fr"].forEach(function (c) {
      var entry = registry.getByCode(c);
      if (entry) {
        assert(entry.compareEligible === true,
          "Code '" + c + "' should be compareEligible = true");
      }
    });

    /* 10. French must be honestly labeled */
    var frEntry = registry.getByCode("fr");
    if (frEntry) {
      assert(frEntry.courseStatus === "usable",
        "French courseStatus must be 'usable' (AI-assisted), got '" + frEntry.courseStatus + "'");
      assert(frEntry.supportLevel === "usable",
        "French supportLevel must be 'usable', got '" + frEntry.supportLevel + "'");
    }

    /* 11. Migration targets */
    assert(registry.getMigrationTarget("en") === "default-ja-zh",
      "en must migrate to default-ja-zh");
    assert(registry.getMigrationTarget("id") === "default-ja-zh",
      "id must migrate to default-ja-zh");
    assert(registry.getMigrationTarget("xx-unknown") === "default-ja-zh",
      "Unknown codes must migrate to default-ja-zh");
    assert(registry.getMigrationTarget("ko") === "ko",
      "Supported codes should migrate to themselves");

    /* 12. normalizeCode */
    assert(registry.normalizeCode("ja-JP") === "ja", "normalizeCode('ja-JP') → 'ja'");
    assert(registry.normalizeCode("ko-KR") === "ko", "normalizeCode('ko-KR') → 'ko'");
    assert(registry.normalizeCode("") === "default-ja-zh", "normalizeCode('') → default");
  }

  /* ─── 13. Validate i18n.js uses LANGUAGES from registry ─── */
  var i18nPath = path.join(ROOT, "assets", "js", "i18n.js");
  assert(fs.existsSync(i18nPath), "i18n.js must exist");

  var i18nSrc = "";
  try { i18nSrc = fs.readFileSync(i18nPath, "utf8"); }
  catch (e) { errors.push("FAIL: Cannot read i18n.js: " + e.message); }

  assert(i18nSrc.indexOf("LOCALE_REGISTRY") >= 0,
    "i18n.js must reference LOCALE_REGISTRY");
  assert(i18nSrc.indexOf("getSelectorCandidates") >= 0,
    "i18n.js must call getSelectorCandidates");
  assert(i18nSrc.indexOf("getMigrationTarget") >= 0,
    "i18n.js must call getMigrationTarget for migration");
  assert(i18nSrc.indexOf("__i18nMigrationToast") >= 0,
    "i18n.js must set migration toast flag");

  /* 14. No removed language codes hardcoded in LANGUAGES section */
  var languagesSectionMatch = i18nSrc.match(/const LANGUAGES\s*=\s*\(function\s*\(\)[\s\S]*?\}\)\(\)/);
  assert(languagesSectionMatch !== null,
    "LANGUAGES should be populated from IIFE reading LOCALE_REGISTRY");

  /* 15. Validate index.html loads locale-registry.js before i18n.js */
  var indexPath = path.join(ROOT, "index.html");
  var indexSrc = "";
  try { indexSrc = fs.readFileSync(indexPath, "utf8"); }
  catch (e) { errors.push("FAIL: Cannot read index.html: " + e.message); }

  var registryScriptIdx = indexSrc.indexOf("locale-registry.js");
  var i18nScriptIdx = indexSrc.indexOf("i18n.js");
  assert(registryScriptIdx > 0, "index.html must load locale-registry.js");
  assert(registryScriptIdx < i18nScriptIdx,
    "locale-registry.js must be loaded BEFORE i18n.js");

  /* ─── Report ─── */
  console.log("\n=== Locale Selector Registry Verification ===\n");
  console.log("Passed: " + passed);
  console.log("Failed: " + errors.length);
  if (warnings.length) console.log("Warnings: " + warnings.length);

  warnings.forEach(function (w) { console.log("  " + w); });
  errors.forEach(function (e) { console.log("  ❌ " + e); });

  if (errors.length === 0) {
    console.log("\n✅ PASS — Locale selector registry is correctly configured.");
    console.log("   Supported languages: " + (registry ? registry.SUPPORTED_CODES.join(", ") : "N/A"));
    process.exit(0);
  } else {
    console.log("\n❌ FAIL — " + errors.length + " error(s) found.");
    process.exit(1);
  }
})();
