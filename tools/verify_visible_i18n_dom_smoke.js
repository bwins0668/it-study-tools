#!/usr/bin/env node
"use strict";

const DEFAULT_URLS = [
  process.env.STUDY_TOOLS_DOM_URL,
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://127.0.0.1:8080",
  "http://localhost:8080"
].filter(Boolean);

const CASES = [
  { lang: "ko", displayLang: "ko-KR", short: "ko", subject: "python" },
  { lang: "ko", displayLang: "ko-KR", short: "ko", subject: "java" },
  { lang: "ko", displayLang: "ko-KR", short: "ko", subject: "sql" },
  { lang: "my", displayLang: "my-MM", short: "my", subject: "python" },
  { lang: "my", displayLang: "my-MM", short: "my", subject: "java" },
  { lang: "my", displayLang: "my-MM", short: "my", subject: "sql" }
];

const LANG_RULES = {
  ko: {
    script: /[\uAC00-\uD7AF]/,
    forbidden: /[\u4E00-\u9FFF\u3040-\u30FF\u1000-\u109F\u0E00-\u0E7F]/
  },
  my: {
    script: /[\u1000-\u109F]/,
    forbidden: /[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u0E00-\u0E7F]/
  },
  th: {
    script: /[\u0E00-\u0E7F]/,
    forbidden: /[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u1000-\u109F]|[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i
  }
};

const DISPLAY_LANGS = {
  ko: "ko-KR",
  my: "my-MM",
  th: "th-TH"
};

function parseArgs() {
  const langIdx = process.argv.indexOf("--lang");
  const modulesIdx = process.argv.indexOf("--modules");
  const lang = langIdx !== -1 && process.argv[langIdx + 1]
    ? process.argv[langIdx + 1].toLowerCase()
    : null;
  const modules = modulesIdx !== -1 && process.argv[modulesIdx + 1]
    ? process.argv[modulesIdx + 1].split(",").map((item) => item.trim()).filter(Boolean)
    : null;
  return { lang, modules };
}

function buildCases() {
  const args = parseArgs();
  if (!args.lang) return CASES;
  const modules = args.modules && args.modules.length ? args.modules : ["sql", "java", "python"];
  return modules.map((subject) => ({
    lang: args.lang,
    displayLang: DISPLAY_LANGS[args.lang] || args.lang,
    short: args.lang,
    subject
  }));
}

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res.ok ? url : null;
  } catch (_) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function findBaseUrl() {
  for (const url of DEFAULT_URLS) {
    const ok = await probe(url);
    if (ok) return ok;
  }
  return null;
}

function evaluateText(label, text, rule, requireScript) {
  const issues = [];
  const value = String(text || "");
  if (!value.trim()) issues.push(`${label} missing`);
  if (/\b(undefined|null)\b|\[object Object\]|(^|[^a-z])i18n[._-]/i.test(value)) {
    issues.push(`${label} has raw key/null residue`);
  }
  if (rule.forbidden.test(value)) issues.push(`${label} has forbidden language residue`);
  if (requireScript && !rule.script.test(value)) issues.push(`${label} lacks target script`);
  return issues;
}

async function runCase(page, baseUrl, item) {
  await page.addInitScript((lang) => {
    localStorage.setItem("study-tools-language", lang);
  }, item.lang);
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => window.I18n && window.ContentI18n && typeof window.switchSubject === "function", null, { timeout: 10000 });
  await page.evaluate(async ({ lang, subject }) => {
    localStorage.setItem("study-tools-language", lang);
    if (window.I18n && typeof window.I18n.setLanguage === "function") {
      await window.I18n.setLanguage(lang);
    }
    if (window.ContentI18n && typeof window.ContentI18n.loadPack === "function") {
      await window.ContentI18n.loadPack(subject, lang);
    }
    window.switchSubject(subject);
    if (subject === "python" && typeof PYTHON_LESSONS !== "undefined" && typeof loadPythonLesson === "function") {
      loadPythonLesson(PYTHON_LESSONS[0].id);
    }
    if (subject === "java" && typeof JAVA_LESSONS !== "undefined" && typeof loadJavaLesson === "function") {
      loadJavaLesson(JAVA_LESSONS[0].id);
    }
    if (subject === "sql" && typeof SQL_LESSONS !== "undefined" && typeof loadLesson === "function") {
      loadLesson(SQL_LESSONS[0].id);
    }
    if (subject === "itpass" && typeof IT_PASSPORT_LESSONS !== "undefined" && typeof loadItPassLesson === "function") {
      loadItPassLesson(IT_PASSPORT_LESSONS[0].id);
    }
    if (subject === "sg" && typeof SG_LESSONS !== "undefined" && typeof loadSgLesson === "function") {
      loadSgLesson(SG_LESSONS[0].id);
    }
  }, item);
  await page.waitForTimeout(800);

  const data = await page.evaluate((subject) => {
    const text = (selector) => document.querySelector(selector)?.textContent || "";
    const attr = (selector, name) => document.querySelector(selector)?.getAttribute(name) || "";
    const value = (selector) => document.querySelector(selector)?.value || "";
    return {
      targetTitle: text("#lesson-title-zh"),
      targetBody: text("#concept-zh-body"),
      japaneseBody: text("#concept-ja-body"),
      analogy: text("#lesson-analogy"),
      stdinPlaceholder: subject === "sql"
        ? attr("#sql-editor", "placeholder")
        : subject === "java"
          ? attr("#java-input-content", "placeholder")
          : attr("#python-input-content", "placeholder"),
      sandboxComment: subject === "python" ? value("#python-editor") : value("#java-editor"),
      outputHeader: subject === "sql" ? text("#output-card") : subject === "java" ? text("#java-output-card") : text("#python-output-card")
    };
  }, item.subject);

  const rule = LANG_RULES[item.short];
  const issues = [];
  issues.push(...evaluateText("target body", data.targetBody, rule, item.short === "ko" || item.short === "th"));
  issues.push(...evaluateText("daily analogy", data.analogy, rule, true));
  if (["sql", "java", "python"].includes(item.subject)) {
    issues.push(...evaluateText("stdin placeholder", data.stdinPlaceholder, rule, true));
  }
  if ((item.subject === "python" || item.subject === "java") && data.sandboxComment) {
    issues.push(...evaluateText("sandbox comment", data.sandboxComment, rule, true));
  }
  if (["sql", "java", "python"].includes(item.subject)) {
    issues.push(...evaluateText("output header", data.outputHeader, rule, false));
  }

  const allowedJapanese = data.japaneseBody.trim() ? "ALLOWED_JA" : "MISSING";
  return { item, data, issues, allowedJapanese };
}

async function main() {
  const baseUrl = await findBaseUrl();
  if (!baseUrl) {
    console.log("DOM smoke skipped: dev server not available");
    process.exit(0);
  }

  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch (err) {
    console.log("DOM smoke skipped: Playwright dependency not available");
    process.exit(0);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  let failures = 0;
  console.log(`Visible i18n DOM smoke: ${baseUrl}`);
  for (const item of buildCases()) {
    if (!LANG_RULES[item.short]) {
      console.log(`FAIL unsupported language: ${item.short}`);
      failures += 1;
      continue;
    }
    const result = await runCase(page, baseUrl, item);
    const label = `${item.displayLang || item.lang} + ${item.subject}`;
    if (result.issues.length) {
      failures += result.issues.length;
      console.log(`FAIL ${label}`);
      result.issues.forEach((issue) => console.log(`  ${issue}`));
    } else {
      console.log(`PASS ${label} (Japanese explanation: ${result.allowedJapanese})`);
    }
  }
  await browser.close();
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
