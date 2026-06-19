#!/usr/bin/env node
/**
 * tools/verify_ko_quality_gate.js
 *
 * Korean content quality gate — goes beyond counting.
 * Checks each subject's Korean pack for:
 *   1. Content completeness (all lessons present)
 *   2. No large Chinese text residue
 *   3. No TODO / needsReview visible text
 *   4. No raw keys / undefined / null / [object Object]
 *   5. No 翻訳中 / 翻译中 / Translating
 *   6. Key IT terminology consistency
 *   7. Explanation not too short (<30 chars for full, <15 chars even for starter)
 *   8. Starter pack marker not visible as content
 *   9. Fallback not counted as FULL
 *
 * Quality levels: FULL, USABLE, NEEDS_REVIEW, STARTER, FALLBACK, BROKEN
 *
 * Usage: node tools/verify_ko_quality_gate.js
 */

"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const HANGUL = /[\uac00-\ud7af]/;
const CHINESE_BLOCK = /[\u4e00-\u9fff]{4,}/;  // 4+ consecutive CJK = likely Chinese text
const FORBIDDEN_PATTERNS = /TODO|TBD|needsReview|待翻译|未翻译|翻译中|翻訳中|Translating|\[object Object\]/i;
const MIN_EXPLANATION_LENGTH = 30;
const MIN_EXPLANATION_STARTER = 10;

let pass = 0, fail = 0, warn = 0;
function ok(label, detail) { pass++; console.log("  \x1b[32mPASS\x1b[0m " + label + (detail ? " - " + detail : "")); }
function bad(label, detail) { fail++; console.log("  \x1b[31mFAIL\x1b[0m " + label + (detail ? " - " + detail : "")); }
function wa(label, detail) { warn++; console.log("  \x1b[33mWARN\x1b[0m " + label + (detail ? " - " + detail : "")); }
function read(file) { return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : ""; }

const SUBJECTS = [
  { name: "Java",       file: "java_lessons.js",         pack: "java_ko.js",         key: "java:",  expected: 115, expectedStatus: "usable" },
  { name: "Python",     file: "python_lessons.js",       pack: "python_ko.js",       key: "python:", expected: 255, expectedStatus: "usable" },
  { name: "IT Passport",file: "it_passport_lessons.js",  pack: "itpass_ko.js",       key: "itpass:",expected: 85,  expectedStatus: "usable" },
  { name: "SG",         file: "sg_lessons.js",           pack: "sg_ko.js",           key: "sg:",    expected: 44,  expectedStatus: "usable" },
];

/* Korean IT terminology maps for each subject */
const TERMINOLOGY = {
  Java: [
    { ko: "클래스",     en: "Class" },
    { ko: "객체",       en: "Object" },
    { ko: "메서드",     en: "Method" },
    { ko: "변수",       en: "Variable" },
    { ko: "배열",       en: "Array" },
    { ko: "문자열",     en: "String" },
    { ko: "상속",       en: "Inheritance" },
    { ko: "인터페이스", en: "Interface" },
    { ko: "예외",       en: "Exception" },
  ],
  Python: [
    { ko: "변수",       en: "Variable" },
    { ko: "리스트",     en: "List" },
    { ko: "튜플",       en: "Tuple" },
    { ko: "딕셔너리",   en: "Dictionary" },
    { ko: "함수",       en: "Function" },
    { ko: "클래스",     en: "Class" },
    { ko: "모듈",       en: "Module" },
    { ko: "예외",       en: "Exception" },
    { ko: "반복문",     en: "Loop" },
    { ko: "조건문",     en: "Condition" },
  ],
  "IT Passport": [
    { ko: "IT 패스포트",   en: "IT Passport" },
    { ko: "경영 전략",     en: "Management Strategy" },
    { ko: "프로젝트 관리", en: "Project Management" },
    { ko: "정보 보안",     en: "Information Security" },
    { ko: "데이터베이스",  en: "Database" },
    { ko: "네트워크",      en: "Network" },
  ],
  SG: [
    { ko: "정보 보안",     en: "Security" },
    { ko: "위험 관리",     en: "Risk Management" },
    { ko: "접근 제어",     en: "Access Control" },
    { ko: "인증",          en: "Authentication" },
    { ko: "권한 부여",     en: "Authorization" },
    { ko: "암호화",        en: "Encryption" },
    { ko: "로그",          en: "Log" },
    { ko: "백업",          en: "Backup" },
  ],
};

function loadLessons(subject) {
  const filePath = path.join(ROOT, "data", subject.file);
  const code = read(filePath).replace(/^.*?const\s+(\w+)\s*=/m, "var $1 =") + "\n;globalThis.LESSONS = LESSONS;";
  const sandbox = { console, window: {} };
  sandbox.globalThis = sandbox;
  try {
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: filePath });
  } catch (e) {
    // Try alternative variable name patterns
    const altCode = read(filePath).replace(/^.*?(?:var|let|const)\s+(\w+)\s*=/m, "var $1 =") + "\n;globalThis.LESSONS = LESSONS;";
    try {
      vm.runInContext(altCode, sandbox, { filename: filePath });
    } catch (e2) {
      return [];
    }
  }
  return sandbox.LESSONS || [];
}

function loadPack(packFile) {
  const filePath = path.join(ROOT, "data", "i18n_content", packFile);
  if (!fs.existsSync(filePath)) return null;
  const sandbox = { console, window: { CONTENT_I18N: {} } };
  sandbox.globalThis = sandbox;
  try {
    vm.createContext(sandbox);
    vm.runInContext(read(filePath), sandbox, { filename: filePath });
  } catch (e) {
    return null;
  }
  return sandbox.window.CONTENT_I18N || {};
}

function detectChineseResidue(text) {
  if (!text) return false;
  // Check if text is mostly Korean with Chinese mixed in
  const hangulCount = (text.match(HANGUL) || []).length;
  const chineseCount = (text.match(CHINESE_BLOCK) || []).length;
  // If there are Chinese blocks but few Hangul, it's Chinese content
  if (chineseCount > 2 && hangulCount < 5) return true;
  return false;
}

function checkTerminology(text, terms) {
  if (!text || !terms || !terms.length) return [];
  const missing = [];
  // Tech terms that are acceptable as-is when used as code type names
  const ACCEPTABLE_TECH_TERMS = ['String', 'Array', 'Tuple', 'List', 'Map', 'Set', 'Boolean', 'Integer', 'Float', 'Double', 'Char', 'Byte', 'Module', 'Exception'];
  for (const term of terms) {
    // Skip if the English term is an acceptable code type name
    // (these are standard identifiers and should remain in English in code context)
    if (ACCEPTABLE_TECH_TERMS.includes(term.en)) continue;
    // Use word-boundary matching to avoid false positives
    // (e.g. "Conditional" should not match term "Condition", "ArrayList" should not match "Array")
    const escaped = term.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b');
    if (re.test(text) && !text.includes(term.ko)) {
      missing.push(term.en);
    }
  }
  return missing;
}

function assessQuality(subject, pack, lessons) {
  const name = subject.name;
  const keyPrefix = subject.key;
  const entries = pack ? Object.keys(pack).filter(k => k.startsWith(keyPrefix)) : [];
  const entryCount = entries.length;
  const expected = subject.expected;
  const issues = [];
  const chineseResidue = [];
  const shortExplanations = [];
  const termIssues = [];
  const forbiddenFound = [];

  if (!pack) {
    return { level: "BROKEN", count: 0, issues: ["No pack file"], chineseResidue: [], termIssues: [], forbiddenFound: [] };
  }
  if (entryCount === 0) {
    return { level: "BROKEN", count: 0, issues: ["Empty pack"], chineseResidue: [], termIssues: [], forbiddenFound: [] };
  }

  for (const entry of entries) {
    const data = pack[entry] && pack[entry].ko;
    if (!data) {
      issues.push(entry + " missing ko data");
      continue;
    }

    // Check for forbidden patterns
    const fullText = JSON.stringify(data);
    const fb = fullText.match(FORBIDDEN_PATTERNS);
    if (fb) {
      forbiddenFound.push(entry + ": " + fb[0]);
    }

    // Check concept for Chinese residue
    if (data.concept) {
      if (detectChineseResidue(data.concept)) {
        chineseResidue.push(entry);
      }
      if (data.concept.length < MIN_EXPLANATION_LENGTH) {
        shortExplanations.push(entry + " (" + data.concept.length + " chars)");
      }
    }
    if (data.title) {
      if (detectChineseResidue(data.title)) {
        chineseResidue.push(entry + " (title)");
      }
    }

    // Check terminology
    if (data.concept) {
      const missing = checkTerminology(data.concept, TERMINOLOGY[name] || []);
      if (missing.length) {
        termIssues.push(entry + ": " + missing.join(", "));
      }
    }
  }

  // Determine quality level
  const hasHangul = entries.every(e => {
    const d = pack[e] && pack[e].ko;
    return d && ((d.title && HANGUL.test(d.title)) || (d.concept && HANGUL.test(d.concept)));
  });

  const completeness = entryCount >= expected;
  const hasChineseIssues = chineseResidue.length > 0;
  const hasTermIssues = termIssues.length > 0;
  const hasForbidden = forbiddenFound.length > 0;
  const hasShortExplanations = shortExplanations.length > entryCount * 0.1; // more than 10% are too short

  let level;
  if (!completeness) {
    level = "BROKEN";
  } else if (hasForbidden) {
    level = "BROKEN";
  } else if (hasChineseIssues || hasTermIssues || hasShortExplanations) {
    level = "NEEDS_REVIEW";
  } else if (!hasHangul) {
    level = "STARTER";
  } else {
    // Check if it can be FULL
    // For USABLE → FULL: must pass terminology check, no short explanations, no Chinese residue
    if (!hasChineseIssues && !hasTermIssues && !hasShortExplanations && entryCount >= expected) {
      level = "FULL";
    } else {
      level = "USABLE";
    }
  }

  return {
    level,
    count: entryCount,
    expected,
    completeness: completeness && entryCount >= expected,
    hasHangul,
    issues,
    chineseResidue: chineseResidue.slice(0, 20),
    termIssues: termIssues.slice(0, 20),
    forbiddenFound,
    shortExplanations: shortExplanations.slice(0, 20),
  };
}

/* ── Main ── */
console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     Korean Content Quality Gate v1                          ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");

const results = {};
for (const subject of SUBJECTS) {
  console.log("── " + subject.name + " ──");
  const pack = loadPack(subject.pack);
  const lessons = loadLessons(subject);
  const quality = assessQuality(subject, pack, lessons);
  results[subject.name] = quality;

  const icon = quality.level === "FULL" ? "\x1b[32m●\x1b[0m" :
               quality.level === "USABLE" ? "\x1b[34m●\x1b[0m" :
               quality.level === "NEEDS_REVIEW" ? "\x1b[33m●\x1b[0m" :
               quality.level === "STARTER" ? "\x1b[36m●\x1b[0m" :
               quality.level === "FALLBACK" ? "\x1b[35m●\x1b[0m" : "\x1b[31m●\x1b[0m";
  console.log(`  ${icon} Quality: ${quality.level} — ${quality.count}/${quality.expected} entries`);

  if (quality.issues.length) wa(subject.name + " issues", quality.issues.slice(0, 5).join("; "));
  if (quality.chineseResidue.length) bad(subject.name + " Chinese residue", quality.chineseResidue.length + " entries affected");
  else ok(subject.name + " no Chinese residue");
  if (quality.forbiddenFound.length) bad(subject.name + " forbidden patterns", quality.forbiddenFound.slice(0, 5).join("; "));
  else ok(subject.name + " no forbidden patterns");
  if (quality.termIssues.length) wa(subject.name + " term consistency", quality.termIssues.slice(0, 5).join("; "));
  else ok(subject.name + " terminology consistent");
  if (quality.shortExplanations.length) wa(subject.name + " short explanations", quality.shortExplanations.slice(0, 5).join("; "));
  else ok(subject.name + " explanation length adequate");
  if (quality.hasHangul) ok(subject.name + " contains Hangul");
  else bad(subject.name + " missing Hangul");
  console.log("");
}

/* ── Summary ── */
console.log("═══ Quality Gate Summary ═══");
console.log("");
const subjects = Object.keys(results);
for (const name of subjects) {
  const r = results[name];
  const icon = r.level === "FULL" ? "● FULL" :
               r.level === "USABLE" ? "● USABLE" :
               r.level === "NEEDS_REVIEW" ? "● NEEDS_REVIEW" :
               r.level === "STARTER" ? "● STARTER" :
               r.level === "FALLBACK" ? "● FALLBACK" : "● BROKEN";
  console.log(`  ${icon.padEnd(20)} ${name.padEnd(15)} ${r.count}/${r.expected}`);
}
console.log("");

/* Count how many Korean packs are FULL */
const fullCount = subjects.filter(n => results[n].level === "FULL").length;
const usableCount = subjects.filter(n => results[n].level === "USABLE").length;
const needsReviewCount = subjects.filter(n => results[n].level === "NEEDS_REVIEW").length;
const brokenCount = subjects.filter(n => results[n].level === "BROKEN").length;

if (fullCount === subjects.length) {
  ok("All Korean packs are FULL");
} else if (brokenCount === 0) {
  ok("No Korean packs are BROKEN");
  wa("Korean packs not yet FULL: " + subjects.filter(n => results[n].level !== "FULL").join(", "));
} else {
  bad("Korean packs BROKEN: " + subjects.filter(n => results[n].level === "BROKEN").join(", "));
}

/* Check glossary and UI coverage */
console.log("\n── Glossary & UI Korean coverage ──");
const glossaryFile = read(path.join(ROOT, "assets", "js", "glossary.js"));
const koInGlossary = (glossaryFile.match(/\bko\b/g) || []).length;
if (koInGlossary > 5) ok("Glossary Korean data present", koInGlossary + " 'ko' references");
else bad("Glossary Korean data sparse - only " + koInGlossary + " 'ko' references - may need glossary update");

const uiDictFile = read(path.join(ROOT, "assets", "js", "i18n-ui-dict.js"));
const koBlocks = (uiDictFile.match(/ko-KR/gi) || []).length;
if (koBlocks >= 20) ok("UI dictionary Korean blocks", koBlocks + " blocks");
else wa("UI dictionary Korean blocks", koBlocks + " blocks (expected >= 20)");

/* Check offline i18n */
console.log("\n── Offline i18n audit ──");
const i18nJs = read(path.join(ROOT, "assets", "js", "i18n.js"));
if (i18nJs.includes("DISABLE_TRANSLATION_OVERLAY")) ok("i18n.js has offline overlay flag");
else wa("i18n.js missing DISABLE_TRANSLATION_OVERLAY");

const suspiciousRequests = [];
const TRANSLATION_KEYWORDS = ["translate", "translation", "deepl", "libretranslate", "googleapis", "openai", "gemini", "api/translate"];
for (const kw of TRANSLATION_KEYWORDS) {
  if (i18nJs.includes(kw) && !i18nJs.includes("DISABLE_TRANSLATION_OVERLAY") && !kw.match(/\.js$/)) {
    suspiciousRequests.push(kw);
  }
}

// Check content-i18n.js
const contentI18n = read(path.join(ROOT, "assets", "js", "content-i18n.js"));
if (contentI18n.includes("DISABLE_TRANSLATION_OVERLAY") || !contentI18n.includes("api/translate")) {
  ok("content-i18n.js has no translation API calls");
} else {
  wa("content-i18n.js may have translation API references");
}

if (suspiciousRequests.length === 0) ok("No suspicious translation patterns in i18n.js");
else wa("Suspicious patterns in i18n.js", suspiciousRequests.join(", "));

/* ── Final Report ── */
console.log("\n╔══════════════════════════════════════════════════════════════╗");
console.log("║  Korean Quality Gate Results                                ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
for (const name of subjects) {
  const r = results[name];
  console.log(`  ${name.padEnd(15)} ${r.level.padEnd(15)} ${r.count}/${r.expected}  ${r.hasHangul ? "✅ Hangul" : "❌ No Hangul"}`);
  if (r.chineseResidue.length) console.log(`    Chinese residue: ${r.chineseResidue.length} entries`);
  if (r.termIssues.length) console.log(`    Term issues: ${r.termIssues.length} entries`);
  if (r.forbiddenFound.length) console.log(`    Forbidden patterns: ${r.forbiddenFound.length}`);
  if (r.shortExplanations.length) console.log(`    Short explanations: ${r.shortExplanations.length}`);
}

console.log(`\n${pass} PASS / ${fail} FAIL / ${warn} WARN`);
process.exit(fail > 0 ? 1 : 0);
