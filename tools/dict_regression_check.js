const fs = require('fs'), vm = require('vm');

function loadDict(path) {
  const src = fs.readFileSync(path, 'utf8');
  const sb = { window: {}, console: { warn() {} } };
  sb.globalThis = sb;
  vm.createContext(sb);
  vm.runInContext(src, sb);
  return sb.window.I18nUiDict;
}

const NEW = loadDict('E:/项目/sql-learning-hub/assets/js/i18n-ui-dict.js');
const OLD = loadDict('E:/项目/sql-learning-hub-web-public/assets/js/i18n-ui-dict.js');

const LOCALES = ["ja-JP","zh-CN","en-US","my-MM","vi-VN","fr-FR","ko-KR","th-TH","id-ID"];
let pass = 0, fail = 0;
function ok(cond, label) {
  if (cond) { pass++; console.log("PASS  " + label); }
  else { fail++; console.log("FAIL  " + label); }
}
const g = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);

// ── P0-3: namespaces restored as objects ──
for (const loc of ["th-TH", "id-ID"]) {
  for (const ns of ["glossary", "dashboard", "tools", "settings"]) {
    const v = g(NEW[loc], ns);
    if (v !== undefined) ok(typeof v === "object" && v !== null, `${loc}.${ns} is object (not shadowing string)`);
  }
}
ok(g(NEW["th-TH"], "glossary.currentLanguage") === "ภาษาปัจจุบัน", "th-TH.glossary.currentLanguage rescued");
ok(g(NEW["id-ID"], "glossary.currentLanguage") === "Bahasa saat ini", "id-ID.glossary.currentLanguage rescued");
ok(g(NEW["th-TH"], "auth.account") === "บัญชี", "th-TH.auth.account rescued");
ok(g(NEW["th-TH"], "auth.sync") === "ซิงค์", "th-TH.auth.sync rescued");
ok(g(NEW["id-ID"], "auth.account") === "Akun", "id-ID.auth.account rescued");
ok(g(NEW["id-ID"], "auth.loginTitle") === "Masuk", "id-ID.auth.loginTitle rescued");
ok(g(NEW["th-TH"], "dashboard.japaneseTyping") === "พิมพ์ภาษาญี่ปุ่น", "th-TH.dashboard.japaneseTyping rescued");
ok(g(NEW["id-ID"], "dashboard.japaneseTyping") === "Mengetik Jepang", "id-ID.dashboard.japaneseTyping rescued");

// ── P0-2: native translations no longer overwritten by English patch ──
ok(g(NEW["vi-VN"], "common.cancel") === "Hủy", "vi-VN.common.cancel restored to native (was 'Cancel')");
ok(g(NEW["vi-VN"], "common.save") === "Lưu", "vi-VN.common.save native preserved");
ok(g(NEW["vi-VN"], "common.confirm") === "Xác nhận", "vi-VN.common.confirm native preserved");
ok(g(NEW["fr-FR"], "common.cancel") === "Annuler", "fr-FR.common.cancel French");
ok(g(NEW["fr-FR"], "common.confirm") === "Confirmer", "fr-FR.common.confirm French");
ok(/[\uac00-\ud7a3]/.test(g(NEW["ko-KR"], "common.cancel")), "ko-KR.common.cancel still Korean");
ok(/[\uac00-\ud7a3]/.test(g(NEW["ko-KR"], "common.save")), "ko-KR.common.save still Korean");
ok(/[\u1000-\u109f]/.test(g(NEW["my-MM"], "common.cancel")), "my-MM.common.cancel restored to native Burmese (was overwritten to 'Cancel')");
ok(/[\u1000-\u109f]/.test(g(NEW["my-MM"], "common.confirm")), "my-MM.common.confirm restored to native Burmese");
ok(g(NEW["en-US"], "common.cancel") === "Cancel", "en-US.common.cancel intact");

// ── no locale lost the universal baseline keys ──
const BASE = ["common.save","common.cancel","common.confirm","common.loading","nav.sql","glossary.title","exam.submit"];
for (const loc of LOCALES) {
  const missing = BASE.filter(k => g(NEW[loc], k) === undefined || typeof g(NEW[loc], k) !== "string");
  ok(missing.length === 0, `${loc} baseline keys present` + (missing.length ? ` (missing: ${missing.join(",")})` : ""));
}

// ── default-ja-zh untouched ──
ok(NEW["default-ja-zh"] && typeof NEW["default-ja-zh"].common === "object", "default-ja-zh intact");

// ── diff census: NEW vs OLD ──
let changed = 0, added = 0, removed = 0, typeFixed = 0;
const removedPaths = [];
const perLocale = {};
function walk(o, n, prefix) {
  const keys = new Set([...Object.keys(o || {}), ...Object.keys(n || {})]);
  for (const k of keys) {
    const ov = o ? o[k] : undefined, nv = n ? n[k] : undefined;
    const p = prefix ? prefix + "." + k : k;
    if (ov === undefined && nv !== undefined) { added++; }
    else if (nv === undefined && ov !== undefined) { removed++; removedPaths.push(p); }
    else if (typeof ov !== typeof nv) { typeFixed++; }
    else if (typeof ov === "object" && ov !== null) { walk(ov, nv, p); continue; }
    else if (ov !== nv) { changed++; }
  }
}
for (const loc of [...LOCALES, "default-ja-zh"]) {
  const before = JSON.stringify({ added, removed, changed, typeFixed });
  walk(OLD[loc], NEW[loc], loc);
  const a = JSON.parse(before);
  perLocale[loc] = { added: added - a.added, removed: removed - a.removed, changed: changed - a.changed, typeFixed: typeFixed - a.typeFixed };
}
console.log("\n── runtime dict diff (OLD broken → NEW fixed) ──");
for (const loc of Object.keys(perLocale)) {
  const d = perLocale[loc];
  console.log(`${loc}: changed=${d.changed} added=${d.added} removed=${d.removed} typeFixed=${d.typeFixed}`);
}
const BARE_KEYS = ["aiLearning","language","account","login","logout","sync","manualSync","bookmarks","randomChallenge","practiceSandbox","fallback","error","success","currentLanguage","settings"];
const EXPECTED_REMOVED = new Set([...BARE_KEYS.map(k => "th-TH." + k), ...BARE_KEYS.map(k => "id-ID." + k)]);
const unexpected = removedPaths.filter(p => !EXPECTED_REMOVED.has(p));
const missing = [...EXPECTED_REMOVED].filter(p => !removedPaths.includes(p));
console.log("removed paths: " + removedPaths.length + (unexpected.length ? " | UNEXPECTED: " + unexpected.join(",") : ""));
ok(unexpected.length === 0 && missing.length === 0, "removals exactly match the 30 intentional P0-3 bare keys");

console.log(`\n=== ${pass} passed, ${fail} failed ===`);
process.exit(fail ? 1 : 0);
