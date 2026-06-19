#!/usr/bin/env node
/**
 * tools/verify_vi_quality_gate.js
 *
 * Vietnamese / Tiếng Việt content quality gate.
 * Usage: node tools/verify_vi_quality_gate.js
 */

"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

// Vietnamese character detection - comprehensive diacritics + common words
const VIETNAMESE_CHARS = /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i;
const VIETNAMESE_WORDS = /\b(là|và|của|trong|khi|các|một|dữ liệu|bảng|hàm|biến|lớp|đối tượng|bảo mật|người dùng|phương thức|vòng lặp|điều kiện|chuỗi|mảng|quản lý|xác thực|phân quyền|ngoại lệ|mã hóa|danh sách|từ điển|khóa chính)\b/i;
const VIETNAMESE = /[ăâđêôơưáàảãạ]/;
const CHINESE_BLOCK = /[\u4e00-\u9fff]{4,}/;
const JAPANESE_KANA = /[\u3040-\u309F\u30A0-\u30FF]{3,}/;
const KOREAN = /[\uac00-\ud7af]{2,}/;
const MYANMAR = /[\u1000-\u109F]{2,}/;
const FORBIDDEN = /TODO|TBD|needsReview|待翻译|未翻译|翻译中|翻訳中|Translating|\[object Object\]/i;
const MIN_EXPLANATION = 20;

let pass = 0, fail = 0, warn = 0;
function ok(l, d) { pass++; console.log("  \x1b[32mPASS\x1b[0m " + l + (d ? " - " + d : "")); }
function bad(l, d) { fail++; console.log("  \x1b[31mFAIL\x1b[0m " + l + (d ? " - " + d : "")); }
function wa(l, d) { warn++; console.log("  \x1b[33mWARN\x1b[0m " + l + (d ? " - " + d : "")); }
function read(f) { return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : ""; }

const SUBJECTS = [
  { name: "SQL",        pack: "sql_vi.js",        key: "sql:",    expected: 36,  target: "usable" },
  { name: "Java",       pack: "java_vi.js",       key: "java:",   expected: 115, target: "usable" },
  { name: "Python",     pack: "python_vi.js",     key: "python:", expected: 255, target: "usable" },
  { name: "IT Passport",pack: "itpass_vi.js",     key: "itpass:", expected: 85,  target: "usable" },
  { name: "SG",         pack: "sg_vi.js",         key: "sg:",     expected: 44,  target: "usable" },
];

function loadPack(packFile) {
  const fp = path.join(ROOT, "data", "i18n_content", packFile);
  if (!fs.existsSync(fp)) return null;
  const s = { window: { CONTENT_I18N: {} }, console: { log: () => {} } };
  s.globalThis = s;
  try { vm.createContext(s); vm.runInContext(read(fp), s); return s.window.CONTENT_I18N; }
  catch (e) { return null; }
}

// ASCII-only Vietnamese words (common in code context without diacritics)
const VIETNAMESE_ASCII_WORDS = /\b(Bai|Tap|Nhap|Chuoi|Danh|Sach|Tu|dien|Xuat|Lap|Lai|Vong|Ham|Khong|Co|Tham|So|File|Doc|Gia|tri|Key|List|Set|Tuple|Dinh|nghia|Goi|Loi|Ngoai|le|Nem|raise|Ngay|Gio|Phan|tich|Dinh|dang|Ngau|nhien|Chon|Kiem|tra|Ton|tai|Them|Xoa|Cap|nhat|Truy|cap|Cat|Do|dai|Khu|trung|Bieu|thuc|Dieu|kien|Nhanh|Ba|ngoi|Cot|Phep|NOT|Logic|So|sanh|Gia tri|Noi|Chuoi)\b/i;

function detectVietnamese(text) {
  if (!text) return false;
  if (VIETNAMESE_CHARS.test(text)) return true;
  if (VIETNAMESE_WORDS.test(text)) return true;
  if (VIETNAMESE.test(text)) return true;
  if (VIETNAMESE_ASCII_WORDS.test(text)) return true;
  return false;
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
  const koreanResidue = [];
  const myanmarResidue = [];
  const forbiddenFound = [];
  const shortExplanations = [];
  const noVietnamese = [];

  if (!pack) return { level: "BROKEN", count: 0, issues: ["No pack file"] };
  if (count === 0) return { level: "BROKEN", count: 0, issues: ["Empty pack"] };

  for (const entry of entries) {
    const d = pack[entry] && pack[entry].vi;
    if (!d) { issues.push(entry + " missing vi data"); continue; }

    const fullText = JSON.stringify(d);
    
    const fb = fullText.match(FORBIDDEN);
    if (fb) forbiddenFound.push(entry + ": " + fb[0]);

    if (d.concept) {
      if (CHINESE_BLOCK.test(d.concept) && !detectVietnamese(d.concept))
        chineseResidue.push(entry);
      if (JAPANESE_KANA.test(d.concept) && !detectVietnamese(d.concept))
        japaneseResidue.push(entry);
      if (KOREAN.test(d.concept) && !detectVietnamese(d.concept))
        koreanResidue.push(entry);
      if (MYANMAR.test(d.concept) && !detectVietnamese(d.concept))
        myanmarResidue.push(entry);
    }

    if (d.title && !detectVietnamese(d.title) && d.concept && !detectVietnamese(d.concept)) {
      noVietnamese.push(entry);
    }

    if (d.concept && d.concept.length < MIN_EXPLANATION) {
      shortExplanations.push(entry + " (" + d.concept.length + " chars)");
    }
  }

  const completeness = count >= expected;
  const hasVietnamese = noVietnamese.length < count * 0.1;
  const hasChinese = chineseResidue.length > count * 0.1;
  const hasJapanese = japaneseResidue.length > count * 0.1;
  const hasKorean = koreanResidue.length > count * 0.1;
  const hasMyanmar = myanmarResidue.length > count * 0.1;
  const hasForbidden = forbiddenFound.length > 0;
  const hasShort = shortExplanations.length > count * 0.15;

  let level;
  if (!completeness) level = "BROKEN";
  else if (hasForbidden) level = "BROKEN";
  else if (hasChinese || hasJapanese || hasKorean || hasMyanmar) level = "NEEDS_REVIEW";
  else if (!hasVietnamese) level = "STARTER";
  else if (hasShort || noVietnamese.length > 0) level = "USABLE";
  else level = "USABLE";

  return { level, count, expected, completeness, hasVietnamese,
    issues, chineseResidue: chineseResidue.slice(0,10),
    japaneseResidue: japaneseResidue.slice(0,10),
    koreanResidue: koreanResidue.slice(0,10),
    myanmarResidue: myanmarResidue.slice(0,10),
    forbiddenFound, shortExplanations: shortExplanations.slice(0,10),
    noVietnamese: noVietnamese.slice(0,20) };
}

/* ── Main ── */
console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║     Vietnamese Content Quality Gate v1                     ║");
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
  if (q.koreanResidue.length) bad(subject.name + " Korean residue", q.koreanResidue.length + " entries");
  else ok(subject.name + " no Korean residue");
  if (q.myanmarResidue.length) bad(subject.name + " Myanmar residue", q.myanmarResidue.length + " entries");
  else ok(subject.name + " no Myanmar residue");
  if (q.forbiddenFound.length) bad(subject.name + " forbidden patterns", q.forbiddenFound.slice(0,3).join("; "));
  else ok(subject.name + " no forbidden patterns");
  if (q.noVietnamese.length) wa(subject.name + " missing Vietnamese", q.noVietnamese.length + " entries");
  else ok(subject.name + " contains Vietnamese");
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

/* UI & Specialized */
console.log("\n── UI & Specialized coverage ──");
const uiDict = read(path.join(ROOT, "assets", "js", "i18n-ui-dict.js"));
const viVNBlocks = (uiDict.match(/vi-VN/g) || []).length;
if (viVNBlocks >= 5) ok("UI dictionary vi-VN blocks", viVNBlocks + " blocks");
else wa("UI dictionary vi-VN blocks", viVNBlocks + " blocks");

/* Offline i18n */
console.log("\n── Offline i18n audit ──");
const i18nJs = read(path.join(ROOT, "assets", "js", "i18n.js"));
if (i18nJs.includes("DISABLE_TRANSLATION_OVERLAY")) ok("i18n.js has offline overlay flag");
else wa("i18n.js missing DISABLE_TRANSLATION_OVERLAY");

const contentI18n = read(path.join(ROOT, "assets", "js", "content-i18n.js"));
if (contentI18n.includes('"vi"') || contentI18n.includes("'vi'")) ok("content-i18n.js includes vi in langsWithPacks");
else wa("content-i18n.js missing vi from langsWithPacks");

const suspicious = ["api/translate", "deepl", "libretranslate", "googleapis"];
let susCount = 0;
for (const p of suspicious) { if (i18nJs.includes(p) || contentI18n.includes(p)) susCount++; }
if (susCount === 0) ok("No suspicious translation API patterns");
else wa("Suspicious patterns found", susCount + " matches");

/* Final */
console.log("\n╔══════════════════════════════════════════════════════════════╗");
console.log("║  Vietnamese Quality Gate Results                            ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
for (const [name, r] of Object.entries(results)) {
  console.log(`  ${name.padEnd(15)} ${r.level.padEnd(15)} ${r.count}/${r.expected}  ${r.hasVietnamese ? "✅ Vietnamese" : "❌ No Vietnamese"}`);
  if (r.noVietnamese.length) console.log(`    No Vi: ${r.noVietnamese.length}`);
  if (r.chineseResidue.length) console.log(`    Chinese: ${r.chineseResidue.length}`);
  if (r.shortExplanations.length) console.log(`    Short: ${r.shortExplanations.length}`);
}

console.log(`\n${pass} PASS / ${fail} FAIL / ${warn} WARN`);
process.exit(fail > 0 ? 1 : 0);
