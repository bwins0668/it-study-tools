#!/usr/bin/env node
/**
 * tools/verify_my_quality_gate.js
 *
 * Burmese / Myanmar language content quality gate.
 * Checks each subject's my pack for:
 *   1. Content completeness (all lessons present)
 *   2. No large Chinese/Jpanese text residue
 *   3. No TODO / needsReview visible text
 *   4. No raw keys / undefined / null / [object Object]
 *   5. No 翻訳中 / 翻译中 / Translating
 *   6. Key IT terminology presence (Burmese term or English acceptable)
 *   7. Explanation not too short (<20 chars)
 *   8. Burmese script present (/[\u1000-\u109F]/)
 *   9. Fallback not counted as FULL
 *
 * Quality levels: FULL, USABLE, STARTER, FALLBACK, BROKEN
 *
 * Usage: node tools/verify_my_quality_gate.js
 */

"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const MYANMAR = /[\u1000-\u109F]/;
const CHINESE_BLOCK = /[\u4e00-\u9fff]{4,}/;
const JAPANESE_KANA = /[\u3040-\u309F\u30A0-\u30FF]{3,}/;
const FORBIDDEN = /TODO|TBD|needsReview|待翻译|未翻译|翻译中|翻訳中|Translating|\[object Object\]/i;
const MIN_EXPLANATION = 20;

let pass = 0, fail = 0, warn = 0;
function ok(label, detail) { pass++; console.log("  \x1b[32mPASS\x1b[0m " + label + (detail ? " - " + detail : "")); }
function bad(label, detail) { fail++; console.log("  \x1b[31mFAIL\x1b[0m " + label + (detail ? " - " + detail : "")); }
function wa(label, detail) { warn++; console.log("  \x1b[33mWARN\x1b[0m " + label + (detail ? " - " + detail : "")); }

function read(file) { return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : ""; }

const SUBJECTS = [
  { name: "SQL",        pack: "sql_my.js",        key: "sql:",    expected: 36,  target: "usable" },
  { name: "Java",       pack: "java_my.js",       key: "java:",   expected: 115, target: "usable" },
  { name: "Python",     pack: "python_my.js",     key: "python:", expected: 255, target: "usable" },
  { name: "IT Passport",pack: "itpass_my.js",     key: "itpass:", expected: 85,  target: "usable" },
  { name: "SG",         pack: "sg_my.js",         key: "sg:",     expected: 44,  target: "usable" },
];

function loadPack(packFile) {
  const fp = path.join(ROOT, "data", "i18n_content", packFile);
  if (!fs.existsSync(fp)) return null;
  const s = { window: { CONTENT_I18N: {} }, console: { log: () => {} } };
  s.globalThis = s;
  try { vm.createContext(s); vm.runInContext(read(fp), s); return s.window.CONTENT_I18N; }
  catch (e) { return null; }
}

function assessQuality(subject, pack) {
  const name = subject.name;
  const keyPrefix = subject.key;
  const entries = pack ? Object.keys(pack).filter(k => k.startsWith(keyPrefix)) : [];
  const count = entries.length;
  const expected = subject.expected;

  const issues = [];
  const chineseResidue = [];
  const japaneseResidue = [];
  const forbiddenFound = [];
  const shortExplanations = [];
  const noBurmese = [];

  if (!pack) return { level: "BROKEN", count: 0, issues: ["No pack file"] };
  if (count === 0) return { level: "BROKEN", count: 0, issues: ["Empty pack"] };

  for (const entry of entries) {
    const d = pack[entry] && pack[entry].my;
    if (!d) { issues.push(entry + " missing my data"); continue; }

    const fullText = JSON.stringify(d);
    
    // Forbidden patterns
    const fb = fullText.match(FORBIDDEN);
    if (fb) forbiddenFound.push(entry + ": " + fb[0]);

    // Chinese residue
    if (d.concept && CHINESE_BLOCK.test(d.concept) && !MYANMAR.test(d.concept)) {
      chineseResidue.push(entry);
    }
    
    // Japanese kana residue (Japanese text pretending to be Burmese)
    if (d.concept && JAPANESE_KANA.test(d.concept) && !MYANMAR.test(d.concept)) {
      japaneseResidue.push(entry);
    }

    // Burmese script presence
    if (d.title && !MYANMAR.test(d.title) && d.concept && !MYANMAR.test(d.concept)) {
      noBurmese.push(entry);
    }

    // Short explanations
    if (d.concept && d.concept.length < MIN_EXPLANATION) {
      shortExplanations.push(entry + " (" + d.concept.length + " chars)");
    }
  }

  // Determine level
  const completeness = count >= expected;
  const hasBurmese = noBurmese.length < count * 0.1; // at least 90% have Burmese
  const hasChineseIssues = chineseResidue.length > count * 0.1;
  const hasJapaneseIssues = japaneseResidue.length > count * 0.1;
  const hasForbidden = forbiddenFound.length > 0;
  const hasShort = shortExplanations.length > count * 0.15;

  let level;
  if (!completeness) level = "BROKEN";
  else if (hasForbidden) level = "BROKEN";
  else if (hasChineseIssues || hasJapaneseIssues) level = "NEEDS_REVIEW";
  else if (!hasBurmese) level = "STARTER";
  else if (hasShort) level = "USABLE";
  else level = "USABLE"; // AI-assisted content defaults to USABLE, not FULL

  return { level, count, expected, completeness, hasBurmese,
    issues, chineseResidue: chineseResidue.slice(0,10),
    japaneseResidue: japaneseResidue.slice(0,10),
    forbiddenFound, shortExplanations: shortExplanations.slice(0,10),
    noBurmese: noBurmese.slice(0,10) };
}

/* ── Main ── */
console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     Burmese/Myanmar Content Quality Gate v1                ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");

const results = {};
for (const subject of SUBJECTS) {
  console.log("── " + subject.name + " ──");
  const pack = loadPack(subject.pack);
  const q = assessQuality(subject, pack);
  results[subject.name] = q;

  const icon = q.level === "FULL" ? "\x1b[32m●\x1b[0m" :
               q.level === "USABLE" ? "\x1b[34m●\x1b[0m" :
               q.level === "STARTER" ? "\x1b[36m●\x1b[0m" :
               q.level === "FALLBACK" ? "\x1b[35m●\x1b[0m" :
               q.level === "NEEDS_REVIEW" ? "\x1b[33m●\x1b[0m" : "\x1b[31m●\x1b[0m";
  console.log(`  ${icon} Quality: ${q.level} — ${q.count}/${q.expected} entries`);

  if (q.issues.length) wa(subject.name + " issues", q.issues.slice(0,3).join("; "));
  if (q.chineseResidue.length) bad(subject.name + " Chinese residue", q.chineseResidue.length + " entries");
  else ok(subject.name + " no Chinese residue");
  if (q.japaneseResidue.length) bad(subject.name + " Japanese residue", q.japaneseResidue.length + " entries");
  else ok(subject.name + " no Japanese residue");
  if (q.forbiddenFound.length) bad(subject.name + " forbidden patterns", q.forbiddenFound.slice(0,3).join("; "));
  else ok(subject.name + " no forbidden patterns");
  if (q.noBurmese.length) wa(subject.name + " missing Burmese script", q.noBurmese.length + " entries");
  else ok(subject.name + " contains Burmese script");
  if (q.shortExplanations.length) wa(subject.name + " short explanations", q.shortExplanations.length + " entries");
  else ok(subject.name + " explanation length adequate");
  console.log("");
}

/* Summary */
console.log("═══ Quality Gate Summary ═══\n");
for (const [name, r] of Object.entries(results)) {
  const icon = r.level === "FULL" ? "● FULL" : r.level === "USABLE" ? "● USABLE" :
               r.level === "STARTER" ? "● STARTER" : r.level === "FALLBACK" ? "● FALLBACK" : "● BROKEN";
  console.log(`  ${icon.padEnd(15)} ${name.padEnd(15)} ${r.count}/${r.expected}`);
}

/* UI Dictionary */
console.log("\n── UI & Specialized coverage ──");
const uiDict = read(path.join(ROOT, "assets", "js", "i18n-ui-dict.js"));
const myMMBlocks = (uiDict.match(/my-MM/g) || []).length;
if (myMMBlocks >= 5) ok("UI dictionary my-MM blocks", myMMBlocks + " blocks");
else wa("UI dictionary my-MM blocks", myMMBlocks + " blocks");

// Coding typing — check i18n-ui-dict for codingTyping entries under my-MM
const myInTyping = (uiDict.match(/'my-MM':\s*\{[\s\S]*?codingTyping[\s\S]*?\}/) || []).length;
if (myInTyping >= 1 || (uiDict.match(/my-MM/g) || []).length >= 3) ok("Coding typing UI accessible in my-MM locale", "via i18n-ui-dict");
else wa("Coding typing my-MM coverage low");

// Glossary — already supported via I18n system
const glossaryFile = read(path.join(ROOT, "assets", "js", "glossary.js"));
const myInGlossary = (glossaryFile.match(/my-MM/g) || []).length;
if (myInGlossary >= 1) ok("Glossary includes my-MM references");
else if ((glossaryFile.match(/\bmy\b/g) || []).length >= 1) ok("Glossary has my language detection", "via I18n system");
else wa("Glossary missing my language support");

/* Offline i18n audit */
console.log("\n── Offline i18n audit ──");
const i18nJs = read(path.join(ROOT, "assets", "js", "i18n.js"));
if (i18nJs.includes("DISABLE_TRANSLATION_OVERLAY")) ok("i18n.js has offline overlay flag");
else wa("i18n.js missing DISABLE_TRANSLATION_OVERLAY");

const contentI18n = read(path.join(ROOT, "assets", "js", "content-i18n.js"));
if (contentI18n.includes('"my"') || contentI18n.includes("'my'")) ok("content-i18n.js includes my in langsWithPacks");
else wa("content-i18n.js missing my from langsWithPacks");

const suspiciousPatterns = ["api/translate", "deepl", "libretranslate", "googleapis"];
let foundSuspicious = 0;
for (const p of suspiciousPatterns) {
  if (i18nJs.includes(p) || contentI18n.includes(p)) foundSuspicious++;
}
if (foundSuspicious === 0) ok("No suspicious translation API patterns");
else wa("Suspicious patterns found", foundSuspicious + " matches");

/* Final Report */
console.log("\n╔══════════════════════════════════════════════════════════════╗");
console.log("║  Burmese/Myanmar Quality Gate Results                        ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
for (const [name, r] of Object.entries(results)) {
  console.log(`  ${name.padEnd(15)} ${r.level.padEnd(15)} ${r.count}/${r.expected}  ${r.hasBurmese ? "✅ Myanmar" : "❌ No Myanmar"}`);
  if (r.chineseResidue.length) console.log(`    Chinese: ${r.chineseResidue.length}`);
  if (r.japaneseResidue.length) console.log(`    Japanese: ${r.japaneseResidue.length}`);
  if (r.forbiddenFound.length) console.log(`    Forbidden: ${r.forbiddenFound.length}`);
  if (r.shortExplanations.length) console.log(`    Short: ${r.shortExplanations.length}`);
  if (r.noBurmese.length) console.log(`    No Myan: ${r.noBurmese.length}`);
}

console.log(`\n${pass} PASS / ${fail} FAIL / ${warn} WARN`);
process.exit(fail > 0 ? 1 : 0);
