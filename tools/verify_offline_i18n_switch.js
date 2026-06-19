/*
 * Verify offline/local language switching for course content.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:5174 node tools/verify_offline_i18n_switch.js
 */

const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:5174";
const HEADLESS = process.env.HEADLESS !== "false";

const LANGUAGES = [
  { code: "default-ja-zh", label: "Default Ja/Zh" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "en", label: "English" },
  { code: "ko", label: "Korean" },
  { code: "my", label: "Burmese" },
  { code: "th", label: "Thai" },
  { code: "vi", label: "Vietnamese" },
  { code: "id", label: "Indonesian" },
];

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 414, height: 896 },
  { width: 430, height: 932 },
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
];

const TRANSLATION_REQUEST_PATTERNS = [
  /\/api\/i18n\/translate/i,
  /\/api\/translate/i,
  /libretranslate/i,
  /deepl/i,
  /googleapis.*translate/i,
  /translationapi/i,
  /machineTranslation/i,
  /remoteTranslate/i,
  /requestTranslation/i,
  /fetchTranslation/i,
  /openai/i,
  /gemini/i,
];

function hasHangul(text) {
  return /[\uac00-\ud7af]/.test(text || "");
}

function hasLatin(text) {
  return /[A-Za-z]{4,}/.test(text || "");
}

function hasBurmese(text) {
  return /[\u1000-\u109f]/.test(text || "");
}

function hasVietnamese(text) {
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text || "");
}

function hasThai(text) {
  return /[\u0e00-\u0e7f]/.test(text || "");
}

function hasIndonesian(text) {
  return /\b(adalah|yang|dan|untuk|dengan|pada|dari|tidak|sebagai|mengambil|pelajaran|data)\b/i.test(text || "");
}

function hasInvalidRawText(text) {
  return /undefined|null|\[object Object\]|NaN/i.test(text || "");
}

function looksLikeRequestedLanguage(code, text) {
  if (code === "ko") return hasHangul(text);
  if (code === "en") return hasLatin(text);
  if (code === "my") return hasBurmese(text);
  if (code === "th") return hasThai(text);
  if (code === "vi") return hasVietnamese(text);
  if (code === "id") return hasIndonesian(text);
  if (code === "zh") return /[\u4e00-\u9fff]/.test(text || "");
  if (code === "ja") return /[\u3040-\u30ff]/.test(text || "");
  return false;
}

async function collectState(page) {
  return page.evaluate(() => {
    const text = document.body ? document.body.innerText || "" : "";
    const concept = document.getElementById("concept-zh-body");
    const title = document.getElementById("lesson-title-zh");
    const badge = document.getElementById("lesson-section-badge");
    const targetHead = document.querySelector(".zh-col h4");
    const conceptContainer = document.getElementById("concept-container");
    const mission = document.getElementById("playground-task-text");
    const configTitle = document.getElementById("coding-config-title");
    const configDesc = document.getElementById("coding-config-desc");

    return {
      bodyText: text,
      title: title ? title.textContent.trim() : "",
      badge: badge ? badge.textContent.trim() : "",
      concept: concept ? concept.textContent.trim() : "",
      header: targetHead ? targetHead.textContent.trim() : "",
      actualLang: conceptContainer ? conceptContainer.getAttribute("data-actual-lang") || "" : "",
      isFallback: conceptContainer ? conceptContainer.getAttribute("data-is-fallback") === "true" : false,
      mission: mission ? mission.textContent.trim() : "",
      configTitle: configTitle ? configTitle.textContent.trim() : "",
      configDesc: configDesc ? configDesc.textContent.trim() : "",
      overflow: {
        innerWidth: window.innerWidth,
        docScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
      },
    };
  });
}

function checkState(code, state) {
  const issues = [];
  const warnings = [];
  const required = [state.title, state.concept, state.badge];

  if (required.some((value) => !value)) {
    issues.push("blank title/concept/badge");
  }
  if (hasInvalidRawText(state.bodyText)) {
    issues.push("raw undefined/null/[object Object]/NaN text found");
  }
  if (/翻訳中|翻译中|Translating/i.test(state.bodyText)) {
    issues.push("translation pending placeholder found");
  }
  if (
    state.overflow.docScrollWidth > state.overflow.innerWidth + 2 ||
    state.overflow.bodyScrollWidth > state.overflow.innerWidth + 2
  ) {
    issues.push(`horizontal overflow ${JSON.stringify(state.overflow)}`);
  }

  const fallbackVisible =
    state.isFallback ||
    /fallback/i.test(state.header) ||
    /日本語|中文|English|မြန်မာ|Tiếng Việt/.test(state.header);

  if (["en", "ko", "my", "vi"].includes(code)) {
    if (!looksLikeRequestedLanguage(code, state.concept)) {
      if (!fallbackVisible) {
        issues.push(`${code} content does not match target language and has no fallback label`);
      } else {
        warnings.push(`${code} uses fallback (${state.actualLang || "unknown"})`);
      }
    }
  }

  if (["th", "id"].includes(code)) {
    if (!state.isFallback && !looksLikeRequestedLanguage(code, state.concept)) {
      warnings.push(`${code} has no dedicated local lesson body; fallback should remain visible`);
    } else if (state.isFallback) {
      warnings.push(`${code} uses fallback (${state.actualLang || "unknown"})`);
    }
  }

  return { issues, warnings };
}

async function setLanguage(page, code) {
  await page.evaluate(async (langCode) => {
    if (!window.I18n || typeof window.I18n.setLanguage !== "function") {
      throw new Error("window.I18n.setLanguage is unavailable");
    }
    await window.I18n.setLanguage(langCode);
    if (typeof window.refreshI18nForCurrentLesson === "function") {
      window.refreshI18nForCurrentLesson();
    }
  }, code);
  await page.waitForTimeout(120);
}

async function run() {
  const suspiciousRequests = [];
  const results = [];
  let failCount = 0;
  let warnCount = 0;

  const browser = await chromium.launch({ headless: HEADLESS });

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport,
      serviceWorkers: "block",
    });
    const page = await context.newPage();

    page.on("request", (request) => {
      const url = request.url();
      if (TRANSLATION_REQUEST_PATTERNS.some((pattern) => pattern.test(url))) {
        suspiciousRequests.push(url);
      }
    });

    await page.goto(`${BASE_URL}/?module=sql&lesson=1`, {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    await page.waitForFunction(() => window.I18n && typeof SQL_LESSONS !== "undefined" && document.getElementById("concept-zh-body"), null, {
      timeout: 15000,
    });
    await page.evaluate(() => {
      if (typeof window.refreshI18nForCurrentLesson === "function") {
        window.refreshI18nForCurrentLesson();
      }
    });

    for (const lang of LANGUAGES) {
      await setLanguage(page, lang.code);
      const state = await collectState(page);
      const { issues, warnings } = checkState(lang.code, state);

      if (issues.length) failCount += 1;
      if (warnings.length) warnCount += warnings.length;

      results.push({
        viewport: `${viewport.width}x${viewport.height}`,
        language: lang.code,
        status: issues.length ? "FAIL" : warnings.length ? "WARN" : "PASS",
        actualLang: state.actualLang,
        fallback: state.isFallback,
        title: state.title.slice(0, 70),
        header: state.header,
        issues,
        warnings,
      });
    }

    await setLanguage(page, "ko");
    await page.evaluate(() => {
      if (typeof window.toggleRandomPractice === "function") window.toggleRandomPractice();
    });
    await page.waitForTimeout(120);
    const randomState = await collectState(page);
    if (!hasHangul(randomState.mission)) {
      failCount += 1;
      results.push({
        viewport: `${viewport.width}x${viewport.height}`,
        language: "ko-random-practice",
        status: "FAIL",
        issues: [`random practice is not Korean: ${randomState.mission.slice(0, 80)}`],
        warnings: [],
      });
    } else {
      results.push({
        viewport: `${viewport.width}x${viewport.height}`,
        language: "ko-random-practice",
        status: "PASS",
        title: randomState.mission.slice(0, 70),
        issues: [],
        warnings: [],
      });
    }

    await page.evaluate(() => {
      if (typeof window.toggleRandomPractice === "function") window.toggleRandomPractice();
      if (typeof window.switchSqlSubMode === "function") window.switchSqlSubMode("exam");
    });
    await page.waitForTimeout(120);
    const examState = await collectState(page);
    if (!hasHangul(examState.configTitle) || !hasHangul(examState.configDesc)) {
      failCount += 1;
      results.push({
        viewport: `${viewport.width}x${viewport.height}`,
        language: "ko-practical-exam",
        status: "FAIL",
        issues: [`exam text is not Korean: ${examState.configTitle} / ${examState.configDesc.slice(0, 80)}`],
        warnings: [],
      });
    } else {
      results.push({
        viewport: `${viewport.width}x${viewport.height}`,
        language: "ko-practical-exam",
        status: "PASS",
        title: examState.configTitle,
        issues: [],
        warnings: [],
      });
    }

    await page.close();
    await context.close();
  }

  await browser.close();

  console.log("\nOffline I18n Switch Report");
  for (const result of results) {
    const detail = result.issues && result.issues.length
      ? result.issues.join("; ")
      : result.warnings && result.warnings.length
        ? result.warnings.join("; ")
        : `actual=${result.actualLang || "-"} fallback=${result.fallback ? "yes" : "no"}`;
    console.log(`- ${result.viewport} ${result.language}: ${result.status} ${detail}`);
  }

  const uniqueSuspicious = [...new Set(suspiciousRequests)];
  console.log("\nTranslation network requests:");
  console.log(`- ${uniqueSuspicious.length} request(s)`);
  uniqueSuspicious.forEach((url) => console.log(`  ${url}`));

  console.log("\nLanguage summary:");
  for (const lang of LANGUAGES.filter((item) => item.code !== "default-ja-zh")) {
    const langResults = results.filter((item) => item.language === lang.code);
    const hasFail = langResults.some((item) => item.status === "FAIL");
    const hasWarn = langResults.some((item) => item.status === "WARN");
    console.log(`- ${lang.code}: ${hasFail ? "FAIL" : hasWarn ? "fallback WARN" : "local content PASS"}`);
  }
  console.log(`- translation requests: ${uniqueSuspicious.length === 0 ? "0 PASS" : `${uniqueSuspicious.length} FAIL`}`);

  if (uniqueSuspicious.length || failCount) {
    process.exit(1);
  }
  if (warnCount) {
    console.log(`\nCompleted with ${warnCount} fallback warning(s).`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
