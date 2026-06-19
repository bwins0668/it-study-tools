#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
let pass = 0, fail = 0, warn = 0;
function check(cond, label, detail){ if(cond){ pass++; console.log("  PASS " + label + (detail ? " - " + detail : "")); } else { fail++; console.log("  FAIL " + label + (detail ? " - " + detail : "")); } }
function note(label, detail){ warn++; console.log("  WARN " + label + (detail ? " - " + detail : "")); }
function read(rel){ const file = path.join(ROOT, rel); return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : ""; }
console.log("\n=== PC offline i18n baseline check ===");
const content = read("assets/js/content-i18n.js");
check(content.includes("\"th\"") && content.includes("\"id\"") && content.includes("\"ko\""), "content-i18n supports ko/th/id");
check(!/api\/translate/i.test(content), "content-i18n has no translate API");
const manifestPath = path.join(ROOT, "data/i18n_content/manifest.json");
check(fs.existsSync(manifestPath), "i18n manifest exists");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : { packs: [] };
for (const lang of ["ko", "th", "id"]) {
  const rel = "data/i18n_content/sql_" + lang + ".js";
  const src = read(rel);
  check(src.length > 1000, rel + " exists");
  check((src.match(/sql:\d+/g) || []).length === 36, rel + " has 36 lessons");
  check(manifest.packs.some(p => p.subject === "sql" && p.lang === lang), "manifest includes sql:" + lang);
}
const version = read("assets/js/version.js");
const m = version.match(/desktopVersion:\s*"([^"]+)"/);
check(!!m, "version.js has desktopVersion", m && m[1]);
const index = read("index.html");
check(index.includes("sql_ko.js") && index.includes("sql_th.js") && index.includes("sql_id.js"), "index loads SQL ko/th/id packs");
check(!/翻訳中|翻译中|Translating/.test(index + content), "no translation pending labels in checked runtime files");
if (manifest.totalPacks < 23) note("manifest totalPacks", String(manifest.totalPacks));
console.log("\n=== Results: " + pass + " PASS / " + fail + " FAIL / " + warn + " WARN ===");
process.exit(fail ? 1 : 0);
