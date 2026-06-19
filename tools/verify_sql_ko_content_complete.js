#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
let pass = 0, fail = 0;
function check(cond, label, detail){ if(cond){ pass++; console.log("  PASS " + label + (detail ? " - " + detail : "")); } else { fail++; console.log("  FAIL " + label + (detail ? " - " + detail : "")); } }
function read(rel){ return fs.readFileSync(path.join(ROOT, rel), "utf8"); }
function hasHangul(text){ return /[\uac00-\ud7af]/.test(text || ""); }
console.log("\n=== PC SQL Korean content check ===");
const lessonsSrc = read("data/lessons.js").replace(/^const\s+SQL_LESSONS\s*=/m, "var SQL_LESSONS =");
const sandbox = { console, window: {}, Math, JSON, Date, RegExp, String, Number, Array, Object };
vm.createContext(sandbox);
vm.runInContext(lessonsSrc, sandbox);
const lessons = sandbox.SQL_LESSONS || [];
check(lessons.length === 36, "SQL_LESSONS has 36 lessons", String(lessons.length));
const src = read("data/i18n_content/sql_ko.js");
const packSandbox = { console, window: { CONTENT_I18N: {} } };
vm.createContext(packSandbox);
vm.runInContext(src, packSandbox);
const dict = packSandbox.window.CONTENT_I18N || {};
let count = 0, hangul = 0;
for(let i=1;i<=36;i++){
  const entry = dict["sql:" + i];
  if(entry && entry.ko && entry.ko.title && entry.ko.concept){ count++; if(hasHangul(entry.ko.title + entry.ko.concept)) hangul++; }
}
check(count === 36, "sql_ko.js complete entries", String(count));
check(hangul === 36, "sql_ko.js entries contain Hangul", String(hangul));
const index = read("index.html");
check(index.includes("sql_ko.js"), "index references sql_ko.js");
const manifest = JSON.parse(read("data/i18n_content/manifest.json"));
check(manifest.packs.some(p => p.subject === "sql" && p.lang === "ko"), "manifest includes sql:ko");
console.log("\n=== Results: " + pass + " PASS / " + fail + " FAIL ===");
process.exit(fail ? 1 : 0);
