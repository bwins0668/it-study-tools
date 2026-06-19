#!/usr/bin/env node
/*
 * Static i18n coverage matrix for lesson content, UI dictionary, glossary,
 * manifests, and offline-translation boundaries.
 *
 * The report is intentionally honest:
 *   complete = local target-language content exists and is not marked review-only
 *   starter  = local target-language content exists but is marked needsReview/starter
 *   partial  = some local target-language content exists
 *   fallback = no local content, but another local language can be shown honestly
 *   missing  = no usable local content found
 */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const LANGS = ["zh", "ja", "en", "ko", "my", "th", "vi", "id"];
const TARGET_LANGS = ["zh", "ja", "en", "ko", "my", "th", "vi", "id", "default-ja-zh"];
const SUBJECTS = [
  { id: "sql", label: "SQL lessons", file: "data/lessons.js", globalName: "SQL_LESSONS" },
  { id: "java", label: "Java lessons", file: "data/java_lessons.js", globalName: "JAVA_LESSONS" },
  { id: "python", label: "Python lessons", file: "data/python_lessons.js", globalName: "PYTHON_LESSONS" },
  { id: "itpass", label: "IT Passport", file: "data/it_passport_lessons.js", globalName: "IT_PASSPORT_LESSONS" },
  { id: "sg", label: "SG", file: "data/sg_lessons.js", globalName: "SG_LESSONS" },
];

const FATAL_TEXT = [
  /待翻译/,
  /翻訳中/,
  /翻译中/,
  /\bTranslating\b/i,
  /\[object Object\]/i,
];
const REVIEW_MARKERS = [/TODO/i, /FIXME/i];

let pass = 0;
let fail = 0;
let warn = 0;
const rows = [];

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function status(kind, label, detail) {
  if (kind === "PASS") pass += 1;
  else if (kind === "FAIL") fail += 1;
  else warn += 1;
  console.log(`[${kind}] ${label}${detail ? " - " + detail : ""}`);
}

function stripHtml(text) {
  return String(text || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasHangul(text) {
  return /[\uac00-\ud7af]/.test(String(text || ""));
}

function hasCjk(text) {
  return /[\u4e00-\u9fff]/.test(String(text || ""));
}

function hasLatin(text) {
  return /[A-Za-z]{4,}/.test(String(text || ""));
}

function hasThai(text) {
  return /[\u0e00-\u0e7f]/.test(String(text || ""));
}

function hasVietnamese(text) {
  return /[A-Za-z]*[A-Za-z\u00c0-\u1ef9]*[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(String(text || ""));
}

function hasBurmese(text) {
  return /[\u1000-\u109f]/.test(String(text || ""));
}

function hasIndonesianSignal(text) {
  return /\b(yang|dan|dengan|untuk|dari|pada|adalah|dalam|data|tabel|basis)\b/i.test(String(text || ""));
}

function langSignal(lang, text) {
  const clean = stripHtml(text);
  if (!clean) return false;
  if (lang === "ko") return hasHangul(clean);
  if (lang === "zh" || lang === "ja") return hasCjk(clean) || /[\u3040-\u30ff]/.test(clean);
  if (lang === "en") return hasLatin(clean);
  if (lang === "my") return hasBurmese(clean);
  if (lang === "th") return hasThai(clean);
  if (lang === "vi") return hasVietnamese(clean);
  if (lang === "id") return hasIndonesianSignal(clean) || hasLatin(clean);
  return true;
}

function hasForbidden(text) {
  const clean = String(text || "");
  return FATAL_TEXT.find((pattern) => pattern.test(clean)) || null;
}

function hasReviewMarker(text) {
  const clean = String(text || "");
  return REVIEW_MARKERS.find((pattern) => pattern.test(clean)) || null;
}

function evaluateJsArray(file, globalName) {
  const src = readText(file);
  if (!src) return [];
  const code = src.replace(
    new RegExp(`^\\s*const\\s+${globalName}\\s*=`, "m"),
    `var ${globalName} =`
  );
  const sandbox = { console, window: {}, globalThis: {}, Math, JSON, Date, RegExp, String, Number, Array, Object };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  return sandbox[globalName] || sandbox.window[globalName] || [];
}

function evaluateContentPack(file) {
  if (!fs.existsSync(file)) return {};
  const sandbox = { console, window: { CONTENT_I18N: {} } };
  vm.createContext(sandbox);
  vm.runInContext(readText(file), sandbox, { filename: file });
  return sandbox.window.CONTENT_I18N || {};
}

function evaluateGlossary(file) {
  if (!fs.existsSync(file)) return [];
  const sandbox = { console, window: {} };
  vm.createContext(sandbox);
  vm.runInContext(readText(file), sandbox, { filename: file });
  return sandbox.window.IT_TERMS_GLOSSARY || [];
}

function lessonLocalValue(lesson, field, lang) {
  if (lesson.locales && lesson.locales[field] && lesson.locales[field][lang]) {
    return lesson.locales[field][lang];
  }
  if (lang === "zh") return lesson[field + "Zh"] || "";
  if (lang === "ja") return lesson[field + "Ja"] || "";
  if (lang === "en" && lesson[field + "En"]) return lesson[field + "En"];
  return "";
}

function loadAllPacks(subject) {
  const result = {};
  for (const lang of LANGS) {
    const file = rel("data", "i18n_content", `${subject}_${lang}.js`);
    result[lang] = evaluateContentPack(file);
  }
  return result;
}

function packValue(packs, subject, id, lang, field) {
  const pack = packs[lang] || {};
  const entry = pack[`${subject}:${id}`];
  return entry && entry[lang] ? entry[lang][field] || "" : "";
}

function packMeta(packs, subject, id, lang) {
  const pack = packs[lang] || {};
  const entry = pack[`${subject}:${id}`];
  return entry && entry[lang] ? entry[lang] : null;
}

function fallbackOrder(lang) {
  if (lang === "default-ja-zh") return ["zh", "ja", "en"];
  if (lang === "zh") return ["zh", "ja", "en"];
  if (lang === "ja") return ["ja", "zh", "en"];
  if (lang === "en") return ["en", "ja", "zh"];
  if (lang === "ko") return ["ko", "ja", "zh", "en"];
  if (lang === "my" || lang === "th" || lang === "vi" || lang === "id") return [lang, "ja", "zh", "en"];
  return [lang, "ja", "zh", "en"];
}

function hasAnyFallback(lesson, packs, subject, requested) {
  for (const lang of fallbackOrder(requested)) {
    const title = lessonLocalValue(lesson, "title", lang) || packValue(packs, subject, lesson.id, lang, "title");
    const concept = lessonLocalValue(lesson, "concept", lang) || packValue(packs, subject, lesson.id, lang, "concept");
    if (title && concept) return lang;
  }
  return "";
}

function evaluateSubject(subject) {
  const lessons = evaluateJsArray(rel(...subject.file.split("/")), subject.globalName);
  const packs = loadAllPacks(subject.id);
  const total = Array.isArray(lessons) ? lessons.length : 0;

  if (!total) {
    status("FAIL", `${subject.label} source`, "no lessons loaded");
    return;
  }

  for (const lang of TARGET_LANGS) {
    let local = 0;
    let starter = 0;
    let badSignal = 0;
    let badText = 0;
    let fallback = 0;
    let fallbackLangs = new Set();

    for (const lesson of lessons) {
      const actualLang = lang === "default-ja-zh" ? "zh" : lang;
      const localTitle = lessonLocalValue(lesson, "title", actualLang) || packValue(packs, subject.id, lesson.id, actualLang, "title");
      const localConcept = lessonLocalValue(lesson, "concept", actualLang) || packValue(packs, subject.id, lesson.id, actualLang, "concept");
      const meta = packMeta(packs, subject.id, lesson.id, actualLang);

      if (localTitle && localConcept) {
        local += 1;
        const combined = `${localTitle}\n${localConcept}`;
        if (!langSignal(actualLang, combined)) badSignal += 1;
        if (hasForbidden(combined)) badText += 1;
        if (meta && (meta.needsReview || /starter|seed|draft/i.test(String(meta.coverageStatus || meta.source || "")))) starter += 1;
      } else {
        const fb = hasAnyFallback(lesson, packs, subject.id, lang);
        if (fb) {
          fallback += 1;
          fallbackLangs.add(fb);
        }
      }
    }

    let kind = "missing";
    let mark = "FAIL";
    if (local === total && badText === 0 && badSignal === 0 && starter === 0) {
      kind = "complete";
      mark = "PASS";
    } else if (local === total && badText === 0 && badSignal === 0 && starter > 0) {
      kind = "starter";
      mark = "WARN";
    } else if (local > 0 && badText === 0) {
      kind = "partial";
      mark = "WARN";
    } else if (fallback === total) {
      kind = "fallback";
      mark = "WARN";
    }

    const detail = `${local}/${total} local, ${fallback}/${total} fallback` +
      (fallbackLangs.size ? ` via ${Array.from(fallbackLangs).join("/")}` : "") +
      (starter ? `, ${starter} needsReview/starter` : "") +
      (badSignal ? `, ${badSignal} weak language signal` : "") +
      (badText ? `, ${badText} forbidden text` : "");
    rows.push({ module: subject.label, lang, kind, local, total, fallback, detail });
    status(mark, `[${subject.label}] ${lang}: ${kind}`, detail);
  }
}

function auditGlossary() {
  const terms = evaluateGlossary(rel("data", "glossary", "it_terms.js"));
  if (!terms.length) {
    status("WARN", "[Glossary] source", "not found or empty");
    return;
  }
  for (const lang of LANGS) {
    let local = 0;
    let starter = 0;
    for (const term of terms) {
      const item = term[lang];
      if (item && item.term && (item.explanation || item.desc || item.note)) {
        local += 1;
        if (item.needsReview) starter += 1;
      }
    }
    const kind = local === terms.length && starter === 0 ? "complete" : local > 0 ? "partial" : "missing";
    status(kind === "complete" ? "PASS" : "WARN", `[Glossary] ${lang}: ${kind}`, `${local}/${terms.length} local${starter ? `, ${starter} needsReview` : ""}`);
  }
}

function auditUiDict() {
  const raw = readText(rel("assets", "js", "i18n-ui-dict.js"));
  if (!raw) {
    status("FAIL", "[UI dictionary]", "assets/js/i18n-ui-dict.js missing");
    return;
  }
  const localeMap = { zh: "zh-CN", ja: "ja-JP", en: "en-US", ko: "ko-KR", my: "my-MM", th: "th-TH", vi: "vi-VN", id: "id-ID" };
  for (const lang of LANGS) {
    const code = localeMap[lang];
    const count = (raw.match(new RegExp(`["']${code}["']\\s*:`, "g")) || []).length;
    status(count ? "PASS" : "WARN", `[UI dictionary] ${lang}`, `${count} block(s) for ${code}`);
  }
  const forbidden = hasForbidden(raw);
  if (forbidden) status("WARN", "[UI dictionary] fatal marker", String(forbidden));
  const reviewMarker = hasReviewMarker(raw);
  if (reviewMarker) status("WARN", "[UI dictionary] review marker", String(reviewMarker));
  if (/sandbox\.playground/.test(raw)) status("FAIL", "[UI dictionary] raw key", "sandbox.playground literal found");
  else status("PASS", "[UI dictionary] raw key", "sandbox.playground not visible as literal");
}

function auditTypingData() {
  const files = [
    "data/japanese_typing_library.js",
    "data/japanese_typing_expansion.js",
    "data/coding_typing/_index.js",
    "data/coding_typing/coding_symbols.js",
    "data/coding_typing/java_basics.js",
    "data/coding_typing/python_basics.js",
    "data/coding_typing/sql_basics.js",
  ];
  let found = 0;
  let forbidden = 0;
  for (const f of files) {
    const raw = readText(rel(...f.split("/")));
    if (raw) found += 1;
    if (hasForbidden(raw)) forbidden += 1;
  }
  status(found === files.length ? "PASS" : "WARN", "[Typing] data files", `${found}/${files.length} present`);
  status(forbidden ? "WARN" : "PASS", "[Typing] forbidden markers", `${forbidden} file(s) with suspicious text`);
}

function auditManifest() {
  const manifestFile = rel("data", "i18n_content", "manifest.json");
  if (!fs.existsSync(manifestFile)) {
    status("WARN", "[i18n manifest]", "data/i18n_content/manifest.json missing");
    return;
  }
  let manifest;
  try {
    manifest = JSON.parse(readText(manifestFile));
  } catch (err) {
    status("FAIL", "[i18n manifest]", err.message);
    return;
  }
  const packs = Array.isArray(manifest.packs) ? manifest.packs : [];
  let missing = 0;
  for (const pack of packs) {
    if (!pack.path || !fs.existsSync(rel(...pack.path.split("/")))) missing += 1;
  }
  status(missing ? "FAIL" : "PASS", "[i18n manifest] listed pack files", `${packs.length} listed, ${missing} missing`);
}

function auditOfflineBoundary() {
  const files = [
    "assets/js/i18n.js",
    "assets/js/content-i18n.js",
    "assets/js/app.js",
    "index.html",
  ];
  const patterns = [
    /api\/translate/i,
    /translation overlay/i,
    /翻訳中/,
    /翻译中/,
    /\bTranslating\b/i,
    /deepl/i,
    /libretranslate/i,
    /googleapis/i,
    /gemini/i,
    /fetchTranslation/i,
    /translateLesson/i,
    /translateContent/i,
  ];
  let hits = [];
  for (const f of files) {
    const raw = readText(rel(...f.split("/")));
    for (const pattern of patterns) {
      if (pattern.test(raw)) hits.push(`${f}:${pattern}`);
    }
  }
  const i18nRaw = readText(rel("assets", "js", "i18n.js"));
  const overlayDisabled = /DISABLE_TRANSLATION_OVERLAY\s*=\s*true/.test(i18nRaw);
  status(overlayDisabled ? "PASS" : "FAIL", "[Offline boundary] overlay disabled", "DISABLE_TRANSLATION_OVERLAY=true");
  status(hits.length ? "WARN" : "PASS", "[Offline boundary] translation patterns", hits.length ? hits.slice(0, 12).join("; ") : "0 suspicious hits in runtime files");
}

function printCompactMatrix() {
  console.log("\nCoverage Matrix (local content status)");
  const modules = [...new Set(rows.map((r) => r.module))];
  const header = ["Module".padEnd(18)].concat(TARGET_LANGS.map((l) => l.padEnd(14))).join(" ");
  console.log(header);
  console.log("-".repeat(header.length));
  for (const module of modules) {
    const parts = [module.slice(0, 18).padEnd(18)];
    for (const lang of TARGET_LANGS) {
      const r = rows.find((x) => x.module === module && x.lang === lang);
      const text = r ? `${r.kind} ${r.local}/${r.total}` : "-";
      parts.push(text.slice(0, 14).padEnd(14));
    }
    console.log(parts.join(" "));
  }
}

function main() {
  console.log("=== i18n Coverage Matrix Audit ===");
  for (const subject of SUBJECTS) evaluateSubject(subject);
  auditGlossary();
  auditUiDict();
  auditTypingData();
  auditManifest();
  auditOfflineBoundary();
  printCompactMatrix();

  console.log(`\n=== Results: ${pass} PASS / ${fail} FAIL / ${warn} WARN ===`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
