#!/usr/bin/env node
"use strict";

/**
 * verify_global_visible_locale_surfaces.js
 * Hotfix2 — Stage D: Global Surface DOM Crawl
 *
 * Dynamic per-locale real browser scan. No broad skipSelectors.
 * Only element-level policy exceptions (data-i18n-policy).
 *
 * Usage: node tools/verify_global_visible_locale_surfaces.js --base-url http://127.0.0.1:5173
 * Exit 0 = PASS, 1 = FAIL
 */

"use strict";

const { chromium } = require("playwright");

const BASE_URL = process.argv.includes("--base-url")
  ? process.argv[process.argv.indexOf("--base-url") + 1]
  : "http://127.0.0.1:5173";

// Unicode ranges
const HANGUL = /[가-힯]/;
const CJK = /[一-鿿]/;
const HIRAKATA = /[ぁ-んァ-ンㇰ-ㇿ]/;

let failures = 0;
let scannedElements = 0;
let allowedExceptions = 0;
const LOG_ALLOWED_EXCEPTIONS = process.env.LOG_ALLOWED_I18N_EXCEPTIONS === "1";
const ALLOWED_POLICIES = new Set(["source-ja", "code", "technical-token", "language-name"]);

function summarizeText(text) {
  return String(text || "").replace(/\s+/g, " ").trim().slice(0, 120);
}

function classifyText(text, localeConfig) {
  const val = String(text || "").trim();
  if (!val) return null;

  const allowCJK = localeConfig.allowCJK;     // for zh, default-ja-zh, ja
  const allowKana = localeConfig.allowKana;    // for ja, default-ja-zh
  const requireKorean = localeConfig.requireKorean;

  // Raw key / null / undefined / [object Object]
  if (/\b(undefined|null)\b|\[object Object\]/.test(val)) {
    return "null/undefined/object residue";
  }

  // Raw i18n key pattern
  if (/^[a-z][a-zA-Z0-9-]*\.[a-zA-Z0-9.-]+$/.test(val) && val.includes(".") && val.length > 3) {
    if (!/^[a-zA-Z0-9_.*()]+$/.test(val)) {
      return "Raw i18n key";
    }
  }

  // CJK leakage (Chinese Hanzi / Japanese Kanji)
  if (!allowCJK && CJK.test(val)) {
    return "CJK leakage";
  }

  // Kana leakage (Hiragana / Katakana)
  if (!allowKana && HIRAKATA.test(val)) {
    return "Kana leakage";
  }

  // Korean requirement
  if (requireKorean) {
    const asciiClean = val.replace(/[a-zA-Z0-9\s:/|.\-+()_▶◀·×Δλπ#@%&=~^'",;!?$€£¥<>{}[\]*\\/]/g, "").trim();
    if (asciiClean.length > 0 && !HANGUL.test(val)) {
      return "Expected Korean, lacks Hangul";
    }
  }

  return null;
}

function isAllowedPolicyException(locale, mode, surfaceName, element) {
  if (!element.policy || !ALLOWED_POLICIES.has(element.policy)) return false;
  if (element.policy === "code" || element.policy === "technical-token" || element.policy === "language-name") return true;
  if (element.policy !== "source-ja") return false;

  const text = String(element.text || "");
  const hasJapaneseSourceText = HIRAKATA.test(text) || CJK.test(text);
  if (!hasJapaneseSourceText) return false;
  if (surfaceName === "Japanese Typing") return true;
  if (mode === "ja-compare" && (surfaceName === "IT Passport page" || surfaceName === "SG page")) return true;
  if (locale === "default-ja-zh" || locale === "ja") return true;
  return false;
}

function checkText(locale, mode, surfaceName, el, localeConfig) {
  const val = String(el.text || "").trim();
  if (!val) return;

  if (el.policy && !ALLOWED_POLICIES.has(el.policy)) {
    console.log(`  ❌ [${locale}] [${surfaceName}] FAIL: Unknown data-i18n-policy="${el.policy}" at ${el.selector}: "${summarizeText(val)}"`);
    failures++;
    return;
  }

  const reason = classifyText(val, localeConfig);
  if (reason) {
    if (isAllowedPolicyException(locale, mode, surfaceName, el)) {
      if (LOG_ALLOWED_EXCEPTIONS) {
        console.log(`  ⚠️ [${locale}] [${surfaceName}] ALLOWED_EXCEPTION policy=${el.policy} selector=${el.selector}: "${summarizeText(val)}"`);
      }
      allowedExceptions++;
      return;
    }
    console.log(`  ❌ [${locale}] [${surfaceName}] FAIL: ${reason}: "${val}" (${el.type} in ${el.tagName})`);
    failures++;
    return;
  }
  scannedElements++;
}

async function scanPage(page, locale, mode, surfaceName, config) {
  const elements = await page.evaluate((cfg) => {
    const results = [];

    function isUniversalSkip(el) {
      if (!el) return true;
      const tag = el.tagName ? el.tagName.toLowerCase() : "";
      return ["script", "style", "noscript"].includes(tag);
    }

    function describe(el) {
      if (!el || !el.tagName) return "";
      let out = el.tagName.toLowerCase();
      if (el.id) out += "#" + el.id;
      if (el.className && typeof el.className === "string") {
        const classes = el.className.trim().split(/\s+/).filter(Boolean).slice(0, 3);
        if (classes.length) out += "." + classes.join(".");
      }
      return out;
    }

    function policyInfo(el) {
      const policyEl = el && el.closest ? el.closest("[data-i18n-policy]") : null;
      return policyEl ? {
        policy: policyEl.getAttribute("data-i18n-policy") || "",
        selector: describe(policyEl)
      } : { policy: "", selector: "" };
    }

    const walk = (node) => {
      if (node.nodeType === 3) {
        const val = node.nodeValue.trim();
        if (!val) return;
        const parent = node.parentElement;
        if (!parent || isUniversalSkip(parent)) return;

        const style = window.getComputedStyle(parent);
        if (style.display === "none" || style.visibility === "hidden") return;

        results.push(Object.assign({ type: "text", text: val, tagName: parent.tagName, className: parent.className, id: parent.id || "" }, policyInfo(parent)));
      } else if (node.nodeType === 1) {
        if (isUniversalSkip(node)) return;

        if (node.closest("pre, code, .CodeMirror")) {
          for (let i = 0; i < node.childNodes.length; i++) walk(node.childNodes[i]);
          return;
        }

        const style = window.getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden") return;

        const placeholder = node.getAttribute && node.getAttribute("placeholder");
        const title = node.getAttribute && node.getAttribute("title");
        const ariaLabel = node.getAttribute && node.getAttribute("aria-label");

        if (placeholder) {
          // Skip code editor textareas - code is always in ASCII
          if (!node.closest("textarea, .CodeMirror, pre, code")) {
            results.push(Object.assign({ type: "placeholder", text: placeholder, tagName: node.tagName, id: node.id }, policyInfo(node)));
          }
        }
        if (title) results.push(Object.assign({ type: "title", text: title, tagName: node.tagName, id: node.id }, policyInfo(node)));
        if (ariaLabel) results.push(Object.assign({ type: "aria-label", text: ariaLabel, tagName: node.tagName, id: node.id }, policyInfo(node)));
      }

      for (let i = 0; i < node.childNodes.length; i++) walk(node.childNodes[i]);
    };

    const selectors = cfg.rootSelector.split(",").map(s => s.trim()).filter(Boolean);
    let foundAny = false;
    for (const sel of selectors) {
      const nodes = document.querySelectorAll(sel);
      if (nodes.length > 0) { nodes.forEach(n => walk(n)); foundAny = true; }
    }
    if (!foundAny) results.push({ error: `no elements found for rootSelector "${cfg.rootSelector}"` });
    return results;
  }, { rootSelector: config.rootSelector });

  const hasError = elements.find(el => el.error);
  if (hasError) {
    console.log(`  ❌ [${locale}] [${surfaceName}] FAIL: ${hasError.error}`);
    failures++;
    return;
  }

  const localeConfig = {
    allowCJK: locale === "zh" || locale === "default-ja-zh" || locale === "ja",
    allowKana: locale === "ja" || locale === "default-ja-zh",
    requireKorean: locale === "ko"
  };

  elements.forEach(el => checkText(locale, mode, surfaceName, el, localeConfig));
}

async function run() {
  console.log("=== Global Visible Locale Surfaces Scan ===");
  console.log(`Target URL: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.I18n && typeof window.I18n.setLanguage === "function", null, { timeout: 15000 });
  await page.waitForTimeout(800);

  const eligibleLocales = await page.evaluate(() => {
    if (window.LOCALE_REGISTRY && typeof window.LOCALE_REGISTRY.getEligible === "function") {
      return window.LOCALE_REGISTRY.getEligible().map(l => l.code);
    }
    return ["default-ja-zh", "ja", "zh", "ko", "my", "vi", "th", "fr"];
  });

  console.log("Eligible locales:", eligibleLocales, "\n");

  for (const locale of eligibleLocales) {
    console.log(`\n=== Auditing Locale: "${locale}" ===`);

    await page.evaluate(async (l) => { await window.I18n.setLanguage(l); }, locale);
    await page.waitForTimeout(800);

    const compareEligible = await page.evaluate((l) => {
      return window.DisplayMode && typeof window.DisplayMode.isCompareEligible === "function" && window.DisplayMode.isCompareEligible(l);
    }, locale);
    const modes = compareEligible ? ["target-only", "ja-compare"] : ["target-only"];

    for (const mode of modes) {
      console.log(`\n  Mode: "${mode}"`);

      await page.evaluate((m) => {
        if (window.DisplayMode && typeof window.DisplayMode.set === "function") window.DisplayMode.set(m);
        if (typeof window.refreshI18nForCurrentLesson === "function") window.refreshI18nForCurrentLesson();
      }, mode);
      await page.waitForTimeout(500);

      // A. SQL page
      await page.evaluate(() => window.switchSubject && window.switchSubject("sql"));
      await page.waitForTimeout(600);
      await scanPage(page, locale, mode, "SQL learning + sandbox", { rootSelector: "#playground-section" });
      await scanPage(page, locale, mode, "SQL sidebar", { rootSelector: "#app-sidebar" });

      // B. Java
      await page.evaluate(() => window.switchSubject && window.switchSubject("java"));
      await page.waitForTimeout(600);
      await scanPage(page, locale, mode, "Java learning + sandbox", { rootSelector: "#playground-section" });

      // C. Python
      await page.evaluate(() => window.switchSubject && window.switchSubject("python"));
      await page.waitForTimeout(600);
      await scanPage(page, locale, mode, "Python learning + sandbox", { rootSelector: "#playground-section" });

      // D. IT Passport & E. SG
      await page.evaluate(() => window.switchSubject && window.switchSubject("itpass"));
      await page.waitForTimeout(600);
      await scanPage(page, locale, mode, "IT Passport page", { rootSelector: "#main-app-body" });
      await page.evaluate(() => window.switchSubject && window.switchSubject("sg"));
      await page.waitForTimeout(600);
      await scanPage(page, locale, mode, "SG page", { rootSelector: "#main-app-body" });

      // F. Mock Exam
      await page.evaluate(() => {
        window.switchSubject && window.switchSubject("itpass");
        if (typeof window.switchItPassSubMode === "function") window.switchItPassSubMode("exam");
      });
      await page.waitForTimeout(600);
      await page.evaluate(() => { if (typeof window.startCbtExam === "function") window.startCbtExam(); });
      await page.waitForTimeout(600);
      await scanPage(page, locale, mode, "CBT Mock Exam", { rootSelector: "#cbt-exam-display-title,#cbt-timer-display,.cbt-question-area,.cbt-navigator-panel,.cbt-btn-action" });
      await page.evaluate(() => {
        if (typeof activeCbtExam !== "undefined" && activeCbtExam) {
          clearInterval(cbtTimerInterval); activeCbtExam = null;
          if (typeof switchItPassSubMode === "function") switchItPassSubMode("dojo");
        }
      });
      await page.waitForTimeout(300);

      // G. Japanese Typing
      await page.evaluate(() => window.switchSubject && window.switchSubject("typing"));
      await page.waitForTimeout(800);
      await scanPage(page, locale, mode, "Japanese Typing", { rootSelector: "#typing-hub" });

      // H. Programming Typing
      await page.evaluate(() => window.switchSubject && window.switchSubject("codingTyping"));
      await page.waitForTimeout(800);
      await scanPage(page, locale, mode, "Coding Typing", { rootSelector: "#coding-typing-hub" });

      // I. Tools Drawer
      await page.evaluate(() => { if (typeof window.openMenu === "function") window.openMenu(); });
      await page.waitForTimeout(500);
      await scanPage(page, locale, mode, "Tools Drawer", { rootSelector: "#tools-drawer" });
      await page.evaluate(() => { if (typeof window.closeMenu === "function") window.closeMenu(); });
      await page.waitForTimeout(300);

      // J. AI Provider Settings
      await page.evaluate(() => { if (typeof window.openSettings === "function") window.openSettings(); });
      await page.waitForTimeout(600);
      await scanPage(page, locale, mode, "AI Provider", { rootSelector: "#ai-settings-modal" });

      // K. Reset confirmation
      await page.evaluate(() => {
        if (typeof showResetConfirm === "function") showResetConfirm();
        else { const r = document.getElementById("danger-reset-btn") || document.querySelector(".reset-all-btn"); if (r) r.click(); }
      });
      await page.waitForTimeout(500);
      await scanPage(page, locale, mode, "Reset Confirm", { rootSelector: "#tools-confirm-overlay" });

      // Close modals
      await page.evaluate(() => {
        document.querySelectorAll(".modal-overlay, .settings-modal-overlay, .ai-settings-modal, .confirm-overlay").forEach(el => {
          el.classList.remove("open", "is-active", "show");
          if (el.style) el.style.display = "none";
        });
      });
      await page.waitForTimeout(200);
    }
  }

  await browser.close();
  console.log(`\n=== COMPLETE: PASS ${scannedElements} elements, ALLOWED_EXCEPTION ${allowedExceptions}, FAIL ${failures} ===`);
  process.exit(failures ? 1 : 0);
}

run().catch((err) => { console.error("FATAL:", err.message); process.exit(1); });
