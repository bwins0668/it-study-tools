/* verify_localized_course_navigation.js
   Validates navigation i18n packs coverage for all selectorEligible languages.
   Usage: node tools/verify_localized_course_navigation.js
   Exit 0 = PASS, Exit 1 = FAIL */
(function () {
  "use strict";

  var fs = require("fs");
  var path = require("path");
  var errors = [];
  var warnings = [];
  var passed = 0;

  function assert(cond, msg) {
    if (!cond) errors.push("FAIL: " + msg);
    else passed++;
  }

  var ROOT = path.resolve(__dirname, "..");
  var DATA_DIR = path.join(ROOT, "data");
  var NAV_DIR = path.join(ROOT, "data", "i18n_content");

  /* Load lesson data to get expected counts */
  function loadLessons(file, varName) {
    var src = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    return new Function(src + "; return " + varName + ";")();
  }

  var subjects = [
    { key: "sql", file: "lessons.js", varName: "SQL_LESSONS" },
    { key: "java", file: "java_lessons.js", varName: "JAVA_LESSONS" },
    { key: "python", file: "python_lessons.js", varName: "PYTHON_LESSONS" },
    { key: "itpass", file: "it_passport_lessons.js", varName: "IT_PASSPORT_LESSONS" },
    { key: "sg", file: "sg_lessons.js", varName: "SG_LESSONS" }
  ];

  var expectedCounts = {};
  var expectedChapters = {};
  subjects.forEach(function (subj) {
    var lessons = loadLessons(subj.file, subj.varName);
    expectedCounts[subj.key] = lessons.length;
    var chSet = {};
    lessons.forEach(function (l) { if (l.chapterName) chSet[l.chapterName] = true; });
    expectedChapters[subj.key] = Object.keys(chSet);
  });

  console.log("Expected lesson counts:");
  Object.keys(expectedCounts).forEach(function (k) {
    console.log("  " + k + ": " + expectedCounts[k] + " lessons, " + expectedChapters[k].length + " chapters");
  });

  /* Languages that must have navigation (from LOCALE_REGISTRY selectorEligible) */
  var navLangs = ["ko", "my", "vi", "th", "fr", "zh"];
  /* ja and default-ja-zh use built-in data, no nav pack needed */

  navLangs.forEach(function (lang) {
    var navFile = path.join(NAV_DIR, "navigation_" + lang + ".js");
    assert(fs.existsSync(navFile), "Navigation pack must exist: navigation_" + lang + ".js");

    if (!fs.existsSync(navFile)) return;

    var src = fs.readFileSync(navFile, "utf8");
    var windowObj = {};
    try {
      new Function("window", src)(windowObj);
    } catch (e) {
      errors.push("FAIL: Cannot evaluate navigation_" + lang + ".js: " + e.message);
      return;
    }

    var nav = windowObj.NAVIGATION_I18N && windowObj.NAVIGATION_I18N[lang];
    assert(!!nav, "navigation_" + lang + ".js must define NAVIGATION_I18N['" + lang + "']");
    if (!nav) return;

    subjects.forEach(function (subj) {
      var subjNav = nav[subj.key];
      assert(!!subjNav, lang + "/" + subj.key + ": must have subject navigation");
      if (!subjNav) return;

      /* Check chapters */
      assert(!!subjNav.chapters, lang + "/" + subj.key + ": must have chapters object");
      if (subjNav.chapters) {
        var expectedChs = expectedChapters[subj.key];
        var missingChs = expectedChs.filter(function (ch) { return !subjNav.chapters[ch]; });
        assert(missingChs.length === 0,
          lang + "/" + subj.key + ": missing " + missingChs.length + " chapter translations: " + missingChs.slice(0, 3).join(", "));

        /* Check no empty translations */
        Object.keys(subjNav.chapters).forEach(function (ch) {
          assert(subjNav.chapters[ch] && subjNav.chapters[ch].trim().length > 0,
            lang + "/" + subj.key + ": empty chapter translation for '" + ch + "'");
        });
      }

      /* Check titles */
      assert(!!subjNav.titles, lang + "/" + subj.key + ": must have titles object");
      if (subjNav.titles) {
        var expectedCount = expectedCounts[subj.key];
        var titleCount = Object.keys(subjNav.titles).length;
        assert(titleCount >= expectedCount,
          lang + "/" + subj.key + ": expected " + expectedCount + " titles, got " + titleCount);

        /* Check no empty titles */
        var emptyTitles = [];
        Object.keys(subjNav.titles).forEach(function (id) {
          if (!subjNav.titles[id] || String(subjNav.titles[id]).trim().length === 0) {
            emptyTitles.push(id);
          }
        });
        assert(emptyTitles.length === 0,
          lang + "/" + subj.key + ": " + emptyTitles.length + " empty title translations");
      }
    });
  });

  /* Verify app.js uses navigation API */
  var appSrc = fs.readFileSync(path.join(ROOT, "assets", "js", "app.js"), "utf8");
  assert(appSrc.indexOf("getLocalizedChapterName") >= 0,
    "app.js must use getLocalizedChapterName for chapter localization");
  assert(appSrc.indexOf("getLocalizedLessonTitle") >= 0,
    "app.js must use getLocalizedLessonTitle for lesson title localization");

  /* Verify content-i18n.js exposes navigation API */
  var ci18nSrc = fs.readFileSync(path.join(ROOT, "assets", "js", "content-i18n.js"), "utf8");
  assert(ci18nSrc.indexOf("getLocalizedChapterName") >= 0,
    "content-i18n.js must export getLocalizedChapterName");
  assert(ci18nSrc.indexOf("getLocalizedLessonTitle") >= 0,
    "content-i18n.js must export getLocalizedLessonTitle");
  assert(ci18nSrc.indexOf("hasNavigation") >= 0,
    "content-i18n.js must export hasNavigation");

  /* Report */
  console.log("\n=== Localized Course Navigation Verification ===\n");
  console.log("Passed: " + passed);
  console.log("Failed: " + errors.length);
  if (warnings.length) console.log("Warnings: " + warnings.length);

  warnings.forEach(function (w) { console.log("  " + w); });
  errors.forEach(function (e) { console.log("  ❌ " + e); });

  if (errors.length === 0) {
    console.log("\n✅ PASS — All navigation packs complete for " + navLangs.length + " languages × 5 subjects.");
    process.exit(0);
  } else {
    console.log("\n❌ FAIL — " + errors.length + " error(s) found.");
    process.exit(1);
  }
})();
