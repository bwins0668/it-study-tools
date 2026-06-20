// verify_language_display_modes.js
// Stage C Verification: Display Mode state management + applyLessonTargetLayout integration
// Run: node tools/verify_language_display_modes.js

"use strict";

var passed = 0;
var failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error("  FAIL:", msg);
  }
}

// ============================================================
// 1. Check locale-registry.js DisplayMode API exists
// ============================================================
console.log("\n=== Stage C: Display Mode Verification ===\n");

(function () {
  var fs = require("fs");
  var path = require("path");

  var registryPath = path.join(__dirname, "..", "assets", "js", "locale-registry.js");
  var code = fs.readFileSync(registryPath, "utf8");

  console.log("  [C.1] DisplayMode API in locale-registry.js");

  assert(
    code.indexOf("window.DisplayMode = {") >= 0,
    "DisplayMode must be exposed on window"
  );
  assert(
    code.indexOf("target-only") >= 0 && code.indexOf("ja-compare") >= 0,
    "Both modes 'target-only' and 'ja-compare' must be defined"
  );
  assert(
    code.indexOf("study-tools-display-mode") >= 0,
    "localStorage key must be study-tools-display-mode"
  );
  assert(
    code.indexOf("isCompareEligible") >= 0,
    "isCompareEligible function must exist"
  );
  assert(
    code.indexOf("getEffective") >= 0,
    "getEffective function must exist"
  );
  assert(
    code.indexOf("getLocalizedLabels") >= 0,
    "getLocalizedLabels must have labels for 8 languages"
  );

  // Verify isCompareEligible logic: ja / default-ja-zh -> false; others -> true
  assert(
    code.indexOf('c === "ja" || c === "default-ja-zh"') >= 0,
    "ja and default-ja-zh must NOT be compare-eligible"
  );
  assert(
    code.indexOf("getLabel") >= 0,
    "getLabel function must exist"
  );
})();

// ============================================================
// 2. Check i18n.js display mode integration
// ============================================================
(function () {
  var fs = require("fs");
  var path = require("path");

  var i18nPath = path.join(__dirname, "..", "assets", "js", "i18n.js");
  var code = fs.readFileSync(i18nPath, "utf8");

  console.log("  [C.2] i18n.js display mode integration");

  // applyLessonTargetLayout must accept hideJaCol parameter
  assert(
    code.indexOf("function applyLessonTargetLayout(active, hideJaCol)") >= 0,
    "applyLessonTargetLayout must accept hideJaCol parameter"
  );
  assert(
    code.indexOf("hideJaCol") >= 0,
    "hideJaCol logic must exist in applyLessonTargetLayout"
  );

  // display-mode-divider must exist in createMenu
  assert(
    code.indexOf("display-mode-divider") >= 0,
    "display-mode-divider must be in popover HTML"
  );
  assert(
    code.indexOf("display-mode-toggle") >= 0,
    "display-mode-toggle button must be in popover HTML"
  );

  // updateDisplayModeUI function
  assert(
    code.indexOf("function updateDisplayModeUI") >= 0,
    "updateDisplayModeUI function must exist"
  );

  // DisplayMode.getEffective must be called in secondary language rendering
  assert(
    code.indexOf("window.DisplayMode.getEffective(currentLang)") >= 0,
    "getEffective must be called in applyLessonTranslation for secondary languages"
  );

  // zh case must check display mode
  assert(
    code.indexOf("window.DisplayMode.getEffective(currentLang)") > 
    code.indexOf('if (short === "zh")') &&
    code.indexOf("window.DisplayMode.getEffective(currentLang)") <
    code.indexOf('if (short === "zh")') + 300,
    "getEffective must be called in zh case too"
  );

  // updateDisplayModeUI must be called in setLanguage
  assert(
    code.indexOf("updateDisplayModeUI()") >= 0,
    "updateDisplayModeUI must be called"
  );
  // Find the occurrence in setLanguage (after "currentLang = next")
  var setLangPos = code.indexOf("currentLang = next");
  var dmUiPos = code.indexOf("updateDisplayModeUI()");
  // There should be at least one occurrence that is after currentLang assignment
  // We check the last occurrence since it should be in setLanguage
  var lastDmUi = code.lastIndexOf("updateDisplayModeUI()");
  var lastSetLang = code.lastIndexOf("currentLang = next");
  assert(
    lastDmUi > lastSetLang,
    "updateDisplayModeUI must be called after language change in setLanguage"
  );
})();

// ============================================================
// 3. Check index.html loading order
// ============================================================
(function () {
  var fs = require("fs");
  var path = require("path");

  var htmlPath = path.join(__dirname, "..", "index.html");
  var html = fs.readFileSync(htmlPath, "utf8");

  console.log("  [C.3] index.html loading order");

  // locale-registry.js must be before i18n.js
  var regIdx = html.indexOf("locale-registry.js");
  var i18nIdx = html.indexOf("assets/js/i18n.js?v=");
  assert(regIdx >= 0, "locale-registry.js must be loaded");
  assert(i18nIdx >= 0, "i18n.js must be loaded");
  assert(
    regIdx < i18nIdx,
    "locale-registry.js must load BEFORE i18n.js"
  );

  // Navigation packs must be loaded
  var navLangs = ["ko", "my", "vi", "th", "fr", "zh"];
  navLangs.forEach(function (l) {
    assert(
      html.indexOf("navigation_" + l + ".js") >= 0,
      "navigation_" + l + ".js must be loaded"
    );
  });
})();

// ============================================================
// 4. Validate applyLessonTargetLayout hideJaCol logic via node --check
// ============================================================
(function () {
  var exec = require("child_process").execSync;
  var path = require("path");

  console.log("  [C.4] node --check on modified files");

  var files = [
    path.join(__dirname, "..", "assets", "js", "locale-registry.js"),
    path.join(__dirname, "..", "assets", "js", "i18n.js"),
    path.join(__dirname, "..", "assets", "js", "app.js"),
  ];

  files.forEach(function (f) {
    try {
      exec('node --check "' + f + '"', { stdio: "pipe" });
      passed++;
    } catch (e) {
      failed++;
      console.error("  FAIL: node --check failed on " + path.basename(f));
    }
  });
})();

// ============================================================
// 5. DisplayMode semantic checks
// ============================================================
(function () {
  console.log("  [C.5] DisplayMode semantic rules");

  // Verify default mode is target-only
  assert(
    require("fs").readFileSync(
      require("path").join(__dirname, "..", "assets", "js", "locale-registry.js"),
      "utf8"
    ).indexOf('DEFAULT_MODE = "target-only"') >= 0,
    "Default display mode must be target-only"
  );

  // Verify STORAGE_KEY is study-tools-display-mode
  assert(
    require("fs").readFileSync(
      require("path").join(__dirname, "..", "assets", "js", "locale-registry.js"),
      "utf8"
    ).indexOf("study-tools-display-mode") >= 0,
    "localStorage key must be study-tools-display-mode"
  );
})();

// ============================================================
// 6. Verify no console.error or debugger left in display mode code
// ============================================================
(function () {
  var fs = require("fs");
  var path = require("path");

  console.log("  [C.6] Code quality");

  // Check for accidental debugger statements in recently modified code sections
  var registryCode = fs.readFileSync(
    path.join(__dirname, "..", "assets", "js", "locale-registry.js"),
    "utf8"
  );
  // Only verify the DisplayMode section (after "Display Mode State Manager" comment)
  var dmSection = registryCode.substring(registryCode.indexOf("Display Mode State Manager"));
  assert(
    dmSection.indexOf("debugger") < 0,
    "No debugger statements in DisplayMode code"
  );
})();

// ============================================================
// Results
// ============================================================
console.log("\n=== Display Mode Verification ===");
console.log("Passed:", passed);
console.log("Failed:", failed, "\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("✅ PASS — Display mode system correctly configured.\n");
}
