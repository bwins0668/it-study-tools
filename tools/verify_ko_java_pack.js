#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const HANGUL = /[\uac00-\ud7af]/;
const RESIDUAL_CJK = /[\u3040-\u30ff\u3400-\u9fff]/;
const FORBIDDEN = /TODO|TBD|needsReview|待翻译|未翻译|翻译中|翻訳中|Translating|undefined|null\s+undefined/i;
const REQUIRED_FIELDS = ["title", "subtitle", "concept", "practiceIntro", "sandboxInstruction", "examIntro", "challengeIntro"];

let pass = 0;
let fail = 0;
function ok(label, detail) { pass += 1; console.log("  PASS " + label + (detail ? " - " + detail : "")); }
function bad(label, detail) { fail += 1; console.log("  FAIL " + label + (detail ? " - " + detail : "")); }
function read(file) { return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : ""; }
function loadLessons() {
  const file = path.join(ROOT, "data", "java_lessons.js");
  const code = read(file).replace(/^\s*const\s+JAVA_LESSONS\s*=/m, "var JAVA_LESSONS =") + "\n;globalThis.JAVA_LESSONS = JAVA_LESSONS;";
  const sandbox = { console: console, window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  return sandbox.JAVA_LESSONS || [];
}
function loadPack() {
  const file = path.join(ROOT, "data", "i18n_content", "java_ko.js");
  const sandbox = { console: console, window: { CONTENT_I18N: {} } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window.CONTENT_I18N || {};
}

console.log("=== Korean Java Pack Verification ===");
const lessons = loadLessons();
if (lessons.length === 115) ok("JAVA_LESSONS count", "115"); else bad("JAVA_LESSONS count", String(lessons.length));

const packPath = path.join(ROOT, "data", "i18n_content", "java_ko.js");
if (fs.existsSync(packPath)) ok("java_ko.js exists"); else bad("java_ko.js exists");
const pack = loadPack();
const javaKeys = Object.keys(pack).filter(function (key) { return key.startsWith("java:"); });
if (javaKeys.length === 115) ok("java_ko entries", "115"); else bad("java_ko entries", String(javaKeys.length));

const issues = [];
for (const lesson of lessons) {
  const id = "java:" + lesson.id;
  const row = pack[id] && pack[id].ko;
  if (!row) { issues.push(id + ": missing ko row"); continue; }
  for (const field of REQUIRED_FIELDS) {
    const value = String(row[field] || "");
    if (!value.trim()) issues.push(id + "." + field + ": empty");
    if (!HANGUL.test(value)) issues.push(id + "." + field + ": no Hangul");
    if (RESIDUAL_CJK.test(value)) issues.push(id + "." + field + ": residual Chinese/Japanese");
    if (FORBIDDEN.test(value)) issues.push(id + "." + field + ": forbidden marker");
  }
  if (!Array.isArray(row.keyPoints) || row.keyPoints.length < 3) issues.push(id + ".keyPoints: expected >=3");
  if (row.needsReview) issues.push(id + ": needsReview must not be present");
  if (row.coverageStatus !== "usable-ko") issues.push(id + ": coverageStatus should be usable-ko");
}
if (issues.length) bad("java_ko quality gate", issues.slice(0, 20).join("; ")); else ok("java_ko quality gate", "0 issues");

const manifestPath = path.join(ROOT, "data", "i18n_content", "manifest.json");
const manifest = JSON.parse(read(manifestPath));
const manifestPack = (manifest.packs || []).find(function (p) { return p.subject === "java" && p.lang === "ko"; });
if (manifestPack) ok("manifest includes java:ko"); else bad("manifest includes java:ko");
if (manifestPack && manifestPack.lessonCount === 115) ok("manifest java:ko lessonCount", "115"); else bad("manifest java:ko lessonCount", manifestPack && manifestPack.lessonCount);
if (manifestPack && manifestPack.coverageStatus === "usable-ko" && !manifestPack.needsReview) ok("manifest java:ko status", "usable-ko"); else bad("manifest java:ko status", JSON.stringify(manifestPack || {}));

const indexHtml = read(path.join(ROOT, "index.html"));
if (indexHtml.includes("data/i18n_content/java_ko.js")) ok("index loads java_ko.js"); else bad("index loads java_ko.js");

console.log("=== Results: " + pass + " PASS / " + fail + " FAIL ===");
process.exit(fail ? 1 : 0);
