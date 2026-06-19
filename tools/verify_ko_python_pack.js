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
  const file = path.join(ROOT, "data", "python_lessons.js");
  const code = read(file).replace(/^\s*const\s+PYTHON_LESSONS\s*=/m, "var PYTHON_LESSONS =") + "\n;globalThis.PYTHON_LESSONS = PYTHON_LESSONS;";
  const sandbox = { console: console, window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  return sandbox.PYTHON_LESSONS || [];
}
function loadPack() {
  const file = path.join(ROOT, "data", "i18n_content", "python_ko.js");
  const sandbox = { console: console, window: { CONTENT_I18N: {} } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window.CONTENT_I18N || {};
}

console.log("=== Korean Python Pack Verification ===");
const lessons = loadLessons();
if (lessons.length === 255) ok("PYTHON_LESSONS count", "255"); else bad("PYTHON_LESSONS count", String(lessons.length));
const packPath = path.join(ROOT, "data", "i18n_content", "python_ko.js");
if (fs.existsSync(packPath)) ok("python_ko.js exists"); else bad("python_ko.js exists");
const pack = loadPack();
const keys = Object.keys(pack).filter(function (key) { return key.startsWith("python:"); });
if (keys.length === 255) ok("python_ko entries", "255"); else bad("python_ko entries", String(keys.length));
const issues = [];
for (const lesson of lessons) {
  const id = "python:" + lesson.id;
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
if (issues.length) bad("python_ko quality gate", issues.slice(0, 20).join("; ")); else ok("python_ko quality gate", "0 issues");
const manifest = JSON.parse(read(path.join(ROOT, "data", "i18n_content", "manifest.json")));
const manifestPack = (manifest.packs || []).find(function (p) { return p.subject === "python" && p.lang === "ko"; });
if (manifestPack) ok("manifest includes python:ko"); else bad("manifest includes python:ko");
if (manifestPack && manifestPack.lessonCount === 255) ok("manifest python:ko lessonCount", "255"); else bad("manifest python:ko lessonCount", manifestPack && manifestPack.lessonCount);
if (manifestPack && manifestPack.coverageStatus === "usable-ko" && !manifestPack.needsReview) ok("manifest python:ko status", "usable-ko"); else bad("manifest python:ko status", JSON.stringify(manifestPack || {}));
const indexHtml = read(path.join(ROOT, "index.html"));
if (indexHtml.includes("data/i18n_content/python_ko.js")) ok("index loads python_ko.js"); else bad("index loads python_ko.js");
console.log("=== Results: " + pass + " PASS / " + fail + " FAIL ===");
process.exit(fail ? 1 : 0);
