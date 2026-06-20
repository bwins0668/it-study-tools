#!/usr/bin/env node
/*
 * Static i18n coverage matrix for lesson content, UI dictionary, glossary,
 * manifests, and offline-translation boundaries.
 *
 * The report is intentionally honest:
 *   complete = local target-language content exists and is not marked review-only
 *   usable   = local target-language content exists and is locally usable, but still wants human polish
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
const LANGS = ["zh", "ja", "en", "ko", "my", "th", "vi", "id", "fr"];
const TARGET_LANGS = ["zh", "ja", "en", "ko", "my", "th", "vi", "id", "fr", "default-ja-zh"];
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
const koreanFocusRows = [];

const STATUS_LABELS = {
  complete: "FULL",
  usable: "USABLE",
  starter: "STARTER",
  partial: "STARTER",
  fallback: "FALLBACK",
  missing: "MISSING",
  broken: "BROKEN",
  FULL: "FULL",
  USABLE: "USABLE",
  STARTER: "STARTER",
  FALLBACK: "FALLBACK",
  MISSING: "MISSING",
  BROKEN: "BROKEN",
};

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

function toCoverageLabel(kind) {
  return STATUS_LABELS[kind] || String(kind || "MISSING").toUpperCase();
}

function recordKoreanFocus(module, kind, detail) {
  koreanFocusRows.push({ module, kind: toCoverageLabel(kind), detail });
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

function hasFrenchSignal(text) {
  return /[àâçéèêëîïôûùüÿæœ]/i.test(String(text || "")) ||
    /\b(le|la|les|un|une|des|pour|dans|avec|est|sont|données|sécurité|système|réseau|exercice|notion)\b/i.test(String(text || ""));
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
  if (lang === "fr") return hasFrenchSignal(clean);
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

function evaluateUiDictFile() {
  const file = rel("assets", "js", "i18n-ui-dict.js");
  if (!fs.existsSync(file)) return {};
  const sandbox = { console, window: {} };
  vm.createContext(sandbox);
  vm.runInContext(readText(file), sandbox, { filename: file });
  return sandbox.window.I18nUiDict || {};
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
  if (lang === "my" || lang === "th" || lang === "vi" || lang === "id" || lang === "fr") return [lang, "ja", "zh", "en"];
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
    let usable = 0;
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
        if (meta && /usable/i.test(String(meta.coverageStatus || meta.qualityStatus || meta.sourceType || ""))) usable += 1;
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
      if (usable > 0) {
        kind = "usable";
        mark = "WARN";
      } else {
        kind = "complete";
        mark = "PASS";
      }
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
      (usable ? `, ${usable} usable` : "") +
      (starter ? `, ${starter} needsReview/starter` : "") +
      (badSignal ? `, ${badSignal} weak language signal` : "") +
      (badText ? `, ${badText} forbidden text` : "");
    rows.push({ module: subject.label, lang, kind, local, total, fallback, detail });
    status(mark, `[${subject.label}] ${lang}: ${kind}`, detail);
    if (lang === "ko") recordKoreanFocus(subject.label, kind, detail);
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
    if (lang === "ko") recordKoreanFocus("Glossary", kind, `${local}/${terms.length} local${starter ? `, ${starter} needsReview` : ""}`);
  }
}

function flattenStringEntries(obj, prefix = "", out = []) {
  if (!obj || typeof obj !== "object") return out;
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") out.push({ path: next, value });
    else if (value && typeof value === "object") flattenStringEntries(value, next, out);
  }
  return out;
}

function isTechOnlyText(text) {
  const clean = stripHtml(text);
  if (!clean) return true;
  if (clean.length <= 2) return true;
  if (/^(SQL|Java|Python|CBT|SG|IT|DB|ID|CPM|stdin|stdout|Alt\+[A-Z])$/i.test(clean)) return true;
  return clean.split(/\s+/).length <= 2 && /^[A-Za-z0-9 +/#().:_|%\-]+$/.test(clean);
}

function pathMatchesAny(pathName, matchers) {
  return matchers.some((matcher) => {
    if (matcher instanceof RegExp) return matcher.test(pathName);
    return typeof matcher === "function" ? matcher(pathName) : false;
  });
}

function auditKoreanUiCategory(label, dict, matchers) {
  const reference = flattenStringEntries(dict["en-US"] || {});
  const koEntries = flattenStringEntries(dict["ko-KR"] || {});
  const koByPath = new Map(koEntries.map((entry) => [entry.path, entry.value]));
  const refPaths = reference
    .filter((entry) => pathMatchesAny(entry.path, matchers))
    .map((entry) => entry.path);
  const uniqueRefPaths = [...new Set(refPaths)];
  const present = uniqueRefPaths.filter((entryPath) => koByPath.has(entryPath));
  const missing = uniqueRefPaths.filter((entryPath) => !koByPath.has(entryPath));
  const koTexts = present.map((entryPath) => ({ path: entryPath, value: koByPath.get(entryPath) }));
  const badText = koTexts.filter((entry) => hasForbidden(entry.value));
  const nonHangul = koTexts.filter((entry) => !isTechOnlyText(entry.value) && !hasHangul(entry.value));

  let kind = "FULL";
  let mark = "PASS";
  if (badText.length) {
    kind = "BROKEN";
    mark = "FAIL";
  } else if (!present.length && uniqueRefPaths.length) {
    kind = "MISSING";
    mark = "WARN";
  } else if (missing.length) {
    kind = "STARTER";
    mark = "WARN";
  } else if (nonHangul.length) {
    kind = "STARTER";
    mark = "WARN";
  }

  const detail = `${present.length}/${uniqueRefPaths.length} keys` +
    (missing.length ? `, ${missing.length} missing` : "") +
    (nonHangul.length ? `, ${nonHangul.length} non-Hangul review` : "") +
    (badText.length ? `, ${badText.length} forbidden text` : "");
  status(mark, `[Korean UI] ${label}: ${kind}`, detail);
  recordKoreanFocus(label, kind, detail);
}

function auditUiDict() {
  const raw = readText(rel("assets", "js", "i18n-ui-dict.js"));
  if (!raw) {
    status("FAIL", "[UI dictionary]", "assets/js/i18n-ui-dict.js missing");
    return;
  }
  const localeMap = { zh: "zh-CN", ja: "ja-JP", en: "en-US", ko: "ko-KR", my: "my-MM", th: "th-TH", vi: "vi-VN", id: "id-ID", fr: "fr-FR" };
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

  const dict = evaluateUiDictFile();
  auditKoreanUiCategory("Coding typing", dict, [/^codingTyping\./, /^nav\.codingTyping$/, /^moduleDesc\.codingTyping$/, /^dashboard\.codingTyping$/]);
  auditKoreanUiCategory("Japanese typing", dict, [/^typing\./, /^nav\.typing$/, /^moduleDesc\.typing$/, /^dashboard\.japaneseTyping$/]);
  auditKoreanUiCategory("Tools Dashboard", dict, [/^dashboard\./, /^tools\.dashboard/, /^tools\.learningTools$/, /^tools\.examTools$/]);
  auditKoreanUiCategory("Account / Settings / Tools", dict, [/^auth\./, /^settings\./, /^tools\./, /^common\.themeToggle$/]);
  auditKoreanUiCategory("Toast / aria / title", dict, [
    /^toast\./,
    (entryPath) => /(^|\.)(aria|title|placeholder|label|desc|triggerLabel)$/i.test(entryPath),
    (entryPath) => /(Title|Placeholder|Label|Desc)$/.test(entryPath.split(".").pop() || ""),
  ]);
}

function auditTypingData() {
  const japaneseFiles = [
    "data/japanese_typing_library.js",
    "data/japanese_typing_expansion.js",
  ];
  const codingFiles = [
    "data/coding_typing/_index.js",
    "data/coding_typing/coding_symbols.js",
    "data/coding_typing/java_basics.js",
    "data/coding_typing/python_basics.js",
    "data/coding_typing/sql_basics.js",
  ];
  const files = japaneseFiles.concat(codingFiles);
  let found = 0;
  let forbidden = 0;
  for (const f of files) {
    const raw = readText(rel(...f.split("/")));
    if (raw) found += 1;
    if (hasForbidden(raw)) forbidden += 1;
  }
  status(found === files.length ? "PASS" : "WARN", "[Typing] data files", `${found}/${files.length} present`);
  status(forbidden ? "WARN" : "PASS", "[Typing] forbidden markers", `${forbidden} file(s) with suspicious text`);

  const japaneseFound = japaneseFiles.filter((f) => readText(rel(...f.split("/")))).length;
  const codingFound = codingFiles.filter((f) => readText(rel(...f.split("/")))).length;
  recordKoreanFocus("Japanese typing data", japaneseFound === japaneseFiles.length ? "FULL" : "MISSING", `${japaneseFound}/${japaneseFiles.length} files present`);
  recordKoreanFocus("Coding typing data", codingFound === codingFiles.length ? "FULL" : "MISSING", `${codingFound}/${codingFiles.length} files present`);
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

function printKoreanFocusMatrix() {
  console.log("\nKorean Coverage Detail (Subround 1 focus)");
  for (const row of koreanFocusRows) {
    console.log(`- ${row.module}: ${row.kind} — ${row.detail}`);
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
  printKoreanFocusMatrix();

  console.log(`\n=== Results: ${pass} PASS / ${fail} FAIL / ${warn} WARN ===`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
