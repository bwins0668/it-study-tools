#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

const ALLOW_JAPANESE_AREAS = [
  "courseToc",
  "lessonToc",
  "sidebarTitle",
  "japaneseExplanation",
  "jaExplanation",
  "jpExplanation",
  "nihongoExplanation",
  "originalJapaneseTitle",
  "originalJapaneseExplanation"
];

const MUST_LOCALIZE_AREAS = [
  "lessonBody",
  "concept",
  "summary",
  "description",
  "practiceIntro",
  "sandboxInstruction",
  "sandboxComment",
  "stdinPlaceholder",
  "expectedOutput",
  "dailyAnalogy",
  "wordCards",
  "flashcards",
  "quizExplanation",
  "runButtonLabel",
  "copyButtonLabel",
  "clearButtonLabel",
  "placeholder",
  "toast",
  "ariaLabel",
  "emptyState",
  "executionResult",
  "resultExplanation"
];

const SUBJECTS = [
  { id: "sql", label: "SQL", lessonsFile: "data/lessons.js", lessonsVar: "SQL_LESSONS" },
  { id: "java", label: "Java", lessonsFile: "data/java_lessons.js", lessonsVar: "JAVA_LESSONS" },
  { id: "python", label: "Python", lessonsFile: "data/python_lessons.js", lessonsVar: "PYTHON_LESSONS" },
  { id: "itpass", label: "IT Passport", lessonsFile: "data/it_passport_lessons.js", lessonsVar: "IT_PASSPORT_LESSONS" },
  { id: "sg", label: "SG", lessonsFile: "data/sg_lessons.js", lessonsVar: "SG_LESSONS" }
];

const LANGS = {
  ko: {
    full: "ko-KR",
    script: /[\uAC00-\uD7AF]/,
    forbidden: /[\u4E00-\u9FFF\u3040-\u30FF\u1000-\u109F\u0E00-\u0E7F]/,
    minStatus: "FULL"
  },
  my: {
    full: "my-MM",
    script: /[\u1000-\u109F]/,
    forbidden: /[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u0E00-\u0E7F]/,
    minStatus: "USABLE"
  },
  vi: {
    full: "vi-VN",
    script: /[À-ỹ]/,
    forbidden: /[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u1000-\u109F\u0E00-\u0E7F]/,
    minStatus: "USABLE"
  },
  th: {
    full: "th-TH",
    script: /[\u0E00-\u0E7F]/,
    forbidden: /[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u1000-\u109F]|[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i,
    minStatus: "USABLE"
  }
};

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8").replace(/^\uFEFF/, "");
}

function makeContext() {
  const win = {};
  win.window = win;
  return vm.createContext({
    window: win,
    console: { log() {}, warn() {}, error() {} },
    setTimeout() {},
    clearTimeout() {}
  });
}

function loadLessons(subject) {
  const ctx = makeContext();
  const code = read(subject.lessonsFile) + `\nwindow.__LESSONS__ = typeof ${subject.lessonsVar} !== "undefined" ? ${subject.lessonsVar} : [];`;
  vm.runInContext(code, ctx, { filename: subject.lessonsFile });
  return ctx.window.__LESSONS__ || [];
}

function loadContentContext() {
  const ctx = makeContext();
  vm.runInContext(read("assets/js/content-i18n.js"), ctx, { filename: "assets/js/content-i18n.js" });
  for (const subject of SUBJECTS) {
    for (const lang of Object.keys(LANGS)) {
      const file = `data/i18n_content/${subject.id}_${lang}.js`;
      if (fs.existsSync(path.join(ROOT, file))) {
        vm.runInContext(read(file), ctx, { filename: file });
      }
    }
  }
  return ctx;
}

function loadUiDict() {
  const ctx = makeContext();
  vm.runInContext(read("assets/js/i18n-ui-dict.js"), ctx, { filename: "assets/js/i18n-ui-dict.js" });
  return ctx.window.I18nUiDict || {};
}

function flattenText(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(flattenText).join("\n");
  if (typeof value === "object") return Object.values(value).map(flattenText).join("\n");
  return String(value);
}

function getPath(obj, dotted) {
  return dotted.split(".").reduce((cur, key) => (cur && cur[key] != null ? cur[key] : null), obj);
}

function hasBadScalar(text) {
  const value = String(text || "");
  const trimmed = value.trim();
  return /^(undefined|null)$/i.test(trimmed) || /\[object Object\]|(^|[^a-z])i18n[._-]/i.test(value);
}

function evaluateText(text, langInfo, requireScript) {
  const value = flattenText(text);
  const issues = [];
  if (!value.trim()) issues.push("missing");
  if (hasBadScalar(value)) issues.push("raw key / undefined / null residue");
  if (langInfo.forbidden.test(value)) issues.push("forbidden language residue");
  if (requireScript && !langInfo.script.test(value)) issues.push("target script not found");
  return issues;
}

function checkOfflineTranslation() {
  const files = ["assets/js/i18n.js", "assets/js/content-i18n.js"];
  const forbidden = /\/api\/translate|DeepL|Google Translate|Gemini|OpenAI|LibreTranslate|翻訳中|翻译中|Translating/;
  const hits = [];
  for (const file of files) {
    const text = read(file);
    if (forbidden.test(text)) hits.push(file);
  }
  return hits;
}

function printResult(name, status, detail) {
  const suffix = detail ? ` - ${detail}` : "";
  console.log(`${name}: ${status}${suffix}`);
}

function moduleStatus(failures, warnings, lang) {
  if (failures.length) return "BROKEN";
  if (lang === "ko" && warnings.length === 0) return "FULL";
  if (warnings.length) return "USABLE";
  return lang === "ko" ? "FULL" : "USABLE";
}

function compareStatus(actual, required) {
  const order = { BROKEN: 0, NEEDS_REVIEW: 1, USABLE: 2, FULL: 3 };
  return order[actual] >= order[required];
}

function runForLang(lang, contentCtx, uiDict) {
  const langInfo = LANGS[lang];
  if (!langInfo) throw new Error(`Unsupported language: ${lang}`);

  console.log("Visible Content Gold Gate");
  console.log("");
  console.log(`Language: ${langInfo.full}`);
  console.log(`ALLOW_JAPANESE_AREAS: ${ALLOW_JAPANESE_AREAS.join(", ")}`);
  console.log(`MUST_LOCALIZE_AREAS: ${MUST_LOCALIZE_AREAS.join(", ")}`);
  console.log("");

  let totalFailures = 0;
  let totalWarnings = 0;

  for (const subject of SUBJECTS) {
    const lessons = loadLessons(subject);
    const failures = [];
    const warnings = [];

    console.log(`Module: ${subject.label}`);
    printResult("TOC", "ALLOWED_JA", "course directory intentionally Japanese");
    printResult("Japanese explanation", "ALLOWED_JA", "learning support block");

    for (const lesson of lessons) {
      const localized = contentCtx.window.ContentI18n.get(subject.id, lesson.id, lang);
      if (!localized) {
        failures.push(`${lesson.id}: content pack entry missing`);
        continue;
      }

      const checks = [
        ["Lesson body", localized.concept, lang === "ko" || lang === "th"],
        ["Practice intro", localized.practiceIntro, false],
        ["Daily analogy", localized.analogy || localized.dailyAnalogy, true],
        ["Sandbox instruction", localized.sandboxInstruction, true],
        ["Sandbox comments", localized.sandboxComment, true],
        ["Stdin placeholder", localized.stdinPlaceholder, true],
        ["Expected output", localized.expectedOutput, true],
        ["Execution result", localized.executionResult, true],
        ["Result explanation", localized.resultExplanation, true],
        ["Word cards", localized.wordCards || localized.flashcards, true],
        ["Empty state", localized.emptyState, true]
      ];

      for (const [label, value, requireScript] of checks) {
        const issues = evaluateText(value, langInfo, requireScript);
        if (issues.length) {
          const message = `${lesson.id}: ${label} ${issues.join(", ")}`;
          if (label === "Lesson body" && lang !== "ko" && issues.length === 1 && issues[0] === "target script not found") {
            warnings.push(message);
          } else {
            failures.push(message);
          }
        }
      }
    }

    const dict = uiDict[langInfo.full] || {};
    const uiChecks = [
      ["Buttons/placeholders", [
        getPath(dict, "sandbox.stdinPlaceholder"),
        getPath(dict, "sandbox.runCode"),
        getPath(dict, "sandbox.toolbarCopy"),
        getPath(dict, "sandbox.toolbarClear"),
        getPath(dict, "toast.verifySuccess"),
        getPath(dict, "toast.outputMismatch")
      ], true]
    ];
    for (const [label, value, requireScript] of uiChecks) {
      const issues = evaluateText(value, langInfo, requireScript);
      if (issues.length) failures.push(`UI: ${label} ${issues.join(", ")}`);
    }

    const status = moduleStatus(failures, warnings, lang);
    totalFailures += failures.length;
    totalWarnings += warnings.length;

    printResult("Lesson body", failures.some(f => f.includes("Lesson body")) ? "FAIL" : "PASS");
    printResult("Daily analogy", failures.some(f => f.includes("Daily analogy")) ? "FAIL" : "PASS");
    printResult("Sandbox comments", failures.some(f => f.includes("Sandbox comments")) ? "FAIL" : "PASS");
    printResult("Stdin placeholder", failures.some(f => f.includes("Stdin placeholder")) ? "FAIL" : "PASS");
    printResult("Execution result", failures.some(f => f.includes("Execution result")) ? "FAIL" : "PASS");
    printResult("Buttons/placeholders", failures.some(f => f.includes("UI: Buttons/placeholders")) ? "FAIL" : "PASS");
    printResult("Raw key / undefined / null", failures.some(f => /raw key|undefined|null/.test(f)) ? "FAIL" : "PASS");
    printResult("Overall", status, `${lessons.length}/${lessons.length} entries checked`);

    if (failures.length) {
      for (const failure of failures.slice(0, 12)) console.log(`  FAIL ${failure}`);
      if (failures.length > 12) console.log(`  ... ${failures.length - 12} more failures`);
    }
    if (warnings.length) {
      for (const warning of warnings.slice(0, 8)) console.log(`  WARN ${warning}`);
      if (warnings.length > 8) console.log(`  ... ${warnings.length - 8} more warnings`);
    }

    if (!compareStatus(status, langInfo.minStatus)) {
      totalFailures += 1;
      console.log(`  FAIL status ${status} is below required ${langInfo.minStatus}`);
    }
    console.log("");
  }

  const offlineHits = checkOfflineTranslation();
  printResult("Offline translation API requests", offlineHits.length ? "FAIL" : "PASS", offlineHits.length ? offlineHits.join(", ") : "0 suspicious patterns");
  console.log("");
  console.log(`${totalFailures ? "FAIL" : "PASS"} ${langInfo.full}: ${totalFailures} fail / ${totalWarnings} warn`);
  return totalFailures === 0;
}

function parseArgs() {
  const idx = process.argv.indexOf("--lang");
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1].toLowerCase();
  return "all";
}

function main() {
  const requested = parseArgs();
  const langs = requested === "all" ? Object.keys(LANGS) : [requested];
  const contentCtx = loadContentContext();
  const uiDict = loadUiDict();
  let ok = true;
  for (const lang of langs) {
    ok = runForLang(lang, contentCtx, uiDict) && ok;
  }
  process.exit(ok ? 0 : 1);
}

main();
