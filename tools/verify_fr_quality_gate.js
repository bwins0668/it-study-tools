"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED = {
  sql: { label: "SQL", lessonsFile: "data/lessons.js", lessonsVar: "SQL_LESSONS", count: 36 },
  java: { label: "Java", lessonsFile: "data/java_lessons.js", lessonsVar: "JAVA_LESSONS", count: 115 },
  python: { label: "Python", lessonsFile: "data/python_lessons.js", lessonsVar: "PYTHON_LESSONS", count: 255 },
  itpass: { label: "IT Passport", lessonsFile: "data/it_passport_lessons.js", lessonsVar: "IT_PASSPORT_LESSONS", count: 85 },
  sg: { label: "SG", lessonsFile: "data/sg_lessons.js", lessonsVar: "SG_LESSONS", count: 44 }
};

const FORBIDDEN_MARKERS = /TODO|TBD|needsReview|待翻译|未翻译|翻译中|翻訳中|Translating|\[object Object\]/i;
const FORBIDDEN_SCRIPT = /[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u1000-\u109F\u0E00-\u0E7F]/;
const FRENCH_SIGNAL = /[àâçéèêëîïôûùüÿæœ]/i;
const FRENCH_WORDS = /\b(le|la|les|un|une|des|du|de|pour|dans|avec|est|sont|permet|données|sécurité|système|réseau|exercice|notion|résultat|entrée|sortie|apprentissage|enregistrer|annuler|copier|vider|outils|mode|local|langue)\b/i;

let passes = 0;
let failures = 0;
let warnings = 0;

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function read(file) {
  return fs.readFileSync(rel(...file.split("/")), "utf8").replace(/^\uFEFF/, "");
}

function status(mark, label, detail) {
  if (mark === "PASS") passes += 1;
  else if (mark === "WARN") warnings += 1;
  else failures += 1;
  console.log(`${mark} ${label}${detail ? ` - ${detail}` : ""}`);
}

function hasFrench(text) {
  const value = String(text || "");
  return FRENCH_SIGNAL.test(value) || FRENCH_WORDS.test(value);
}

function hasBadText(text) {
  const value = String(text || "");
  if (!value.trim()) return "missing";
  if (FORBIDDEN_MARKERS.test(value)) return "forbidden marker";
  if (FORBIDDEN_SCRIPT.test(value)) return "forbidden language residue";
  if (!hasFrench(value)) return "weak French signal";
  return "";
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
  for (const subject of Object.keys(EXPECTED)) {
    vm.runInContext(read(`data/i18n_content/${subject}_fr.js`), ctx, { filename: `${subject}_fr.js` });
  }
  return ctx;
}

function loadUiDict() {
  const ctx = makeContext();
  vm.runInContext(read("assets/js/i18n-ui-dict.js"), ctx, { filename: "assets/js/i18n-ui-dict.js" });
  return ctx.window.I18nUiDict || {};
}

function flatten(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(flatten).join("\n");
  if (typeof value === "object") return Object.values(value).map(flatten).join("\n");
  return String(value);
}

function getPath(obj, dotted) {
  return dotted.split(".").reduce((cur, key) => (cur && cur[key] != null ? cur[key] : null), obj);
}

function checkContentPacks(ctx) {
  for (const [id, subject] of Object.entries(EXPECTED)) {
    const lessons = loadLessons(subject);
    const rawPack = ctx.window.CONTENT_I18N || {};
    let local = 0;
    let bad = 0;
    let needsReview = 0;
    let usable = 0;

    if (lessons.length !== subject.count) {
      status("FAIL", `[FR ${subject.label}] source count`, `${lessons.length}/${subject.count}`);
      continue;
    }

    for (const lesson of lessons) {
      const raw = rawPack[`${id}:${lesson.id}`] && rawPack[`${id}:${lesson.id}`].fr;
      const localized = ctx.window.ContentI18n.get(id, lesson.id, "fr");
      if (!raw || !localized) {
        bad += 1;
        continue;
      }
      local += 1;
      if (raw.needsReview) needsReview += 1;
      if (raw.coverageStatus === "usable-fr") usable += 1;
      const combined = [
        localized.title,
        localized.concept,
        localized.analogy || localized.dailyAnalogy,
        localized.sandboxInstruction,
        localized.sandboxComment,
        localized.stdinPlaceholder,
        localized.expectedOutput,
        localized.executionResult,
        localized.resultExplanation,
        localized.wordCards || localized.flashcards,
        localized.emptyState
      ].map(flatten).join("\n");
      if (hasBadText(combined)) bad += 1;
      if (!/ai-assisted|manual|local/i.test(String(raw.source || raw.sourceType || ""))) bad += 1;
    }

    const ok = local === subject.count && bad === 0 && needsReview === 0 && usable === subject.count;
    status(ok ? "PASS" : "FAIL", `[FR ${subject.label}] content pack`, `${local}/${subject.count} local, ${usable}/${subject.count} usable-fr, ${needsReview} needsReview, ${bad} bad entries`);
  }
}

function checkGlossary() {
  const ctx = makeContext();
  vm.runInContext(read("data/glossary/it_terms.js"), ctx, { filename: "data/glossary/it_terms.js" });
  const terms = ctx.window.IT_TERMS_GLOSSARY || [];
  let local = 0;
  let needsReview = 0;
  let bad = 0;
  for (const term of terms) {
    const fr = term.fr;
    if (fr && fr.term && (fr.explanation || fr.desc || fr.note)) {
      local += 1;
      if (fr.needsReview) needsReview += 1;
      const text = `${fr.term}\n${fr.explanation || fr.desc || fr.note}`;
      if (hasBadText(text)) bad += 1;
      if (fr.coverageStatus !== "usable-fr") bad += 1;
    } else {
      bad += 1;
    }
  }
  const ok = terms.length === 1500 && local === 1500 && needsReview === 0 && bad === 0;
  status(ok ? "PASS" : "FAIL", "[FR Glossary] coverage", `${local}/1500 local, ${needsReview} needsReview, ${bad} bad entries`);
}

function checkUiDictionary() {
  const dict = loadUiDict();
  const fr = dict["fr-FR"] || {};
  const required = [
    "common.save",
    "common.cancel",
    "sandbox.runCode",
    "sandbox.stdinPlaceholder",
    "sandbox.toolbarCopy",
    "sandbox.toolbarClear",
    "toast.verifySuccess",
    "toast.outputMismatch",
    "tools.tools",
    "auth.localMode",
    "settings.language",
    "codingTyping.title"
  ];
  let bad = 0;
  for (const key of required) {
    const issue = hasBadText(flatten(getPath(fr, key)));
    if (issue) bad += 1;
  }
  status(bad === 0 ? "PASS" : "FAIL", "[FR UI] required visible keys", `${required.length - bad}/${required.length} clean`);
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(rel(...file.split("/")))).digest("hex");
}

function checkManifest() {
  const manifest = JSON.parse(read("data/i18n_content/manifest.json"));
  const entries = manifest.packs.filter((pack) => pack.lang === "fr");
  let bad = 0;
  for (const entry of entries) {
    const expected = EXPECTED[entry.subject];
    if (!expected) {
      bad += 1;
      continue;
    }
    const file = rel(...entry.path.split("/"));
    if (!fs.existsSync(file)) {
      bad += 1;
      continue;
    }
    const stat = fs.statSync(file);
    if (entry.lessonCount !== expected.count) bad += 1;
    if (entry.coverageStatus !== "usable-fr") bad += 1;
    if (!/ai-assisted|local-usable/i.test(String(entry.sourceType || ""))) bad += 1;
    if (entry.sizeBytes !== stat.size) bad += 1;
    if (entry.sha256 !== sha256(entry.path)) bad += 1;
  }
  status(entries.length === 5 && bad === 0 ? "PASS" : "FAIL", "[FR Manifest] pack metadata", `${entries.length}/5 fr packs, ${bad} metadata mismatches`);
}

function checkOfflineBoundary() {
  const files = ["assets/js/i18n.js", "assets/js/content-i18n.js"];
  const forbidden = /\/api\/translate|DeepL|Google Translate|Gemini|OpenAI|LibreTranslate|翻訳中|翻译中|Translating/;
  const hits = files.filter((file) => forbidden.test(read(file)));
  status(hits.length === 0 ? "PASS" : "FAIL", "[FR Offline] translation API boundary", hits.length ? hits.join(", ") : "0 suspicious patterns");
}

function main() {
  const ctx = loadContentContext();
  checkContentPacks(ctx);
  checkGlossary();
  checkUiDictionary();
  checkManifest();
  checkOfflineBoundary();
  console.log("");
  const ok = failures === 0 && warnings === 0;
  console.log(`${ok ? "PASS" : "FAIL"} French quality gate: ${passes} pass / ${failures} fail / ${warnings} warn`);
  process.exit(ok ? 0 : 1);
}

main();
