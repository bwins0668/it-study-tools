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
  const file = path.join(ROOT, "data", "it_passport_lessons.js");
  const code = read(file).replace(/^\s*const\s+IT_PASSPORT_LESSONS\s*=/m, "var IT_PASSPORT_LESSONS =") + "\n;globalThis.IT_PASSPORT_LESSONS = IT_PASSPORT_LESSONS;";
  const sandbox = { console: console, window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  return sandbox.IT_PASSPORT_LESSONS || [];
}
function loadPack() {
  const file = path.join(ROOT, "data", "i18n_content", "itpass_ko.js");
  const sandbox = { console: console, window: { CONTENT_I18N: {} } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window.CONTENT_I18N || {};
}

console.log("=== Korean IT Passport Pack Verification ===");
const lessons = loadLessons();
if (lessons.length === 85) ok("IT_PASSPORT_LESSONS count", "85"); else bad("IT_PASSPORT_LESSONS count", String(lessons.length));
const packPath = path.join(ROOT, "data", "i18n_content", "itpass_ko.js");
if (fs.existsSync(packPath)) ok("itpass_ko.js exists"); else bad("itpass_ko.js exists");
const packText = read(packPath);
if (!/needsReview/.test(packText)) ok("no visible needsReview marker"); else bad("no visible needsReview marker");
const pack = loadPack();
const keys = Object.keys(pack).filter(function (key) { return key.startsWith("itpass:"); });
if (keys.length === 85) ok("itpass_ko entries", "85"); else bad("itpass_ko entries", String(keys.length));
const issues = [];
for (const lesson of lessons) {
  const id = "itpass:" + lesson.id;
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
  if (row.qualityStatus !== "USABLE") issues.push(id + ": qualityStatus should be USABLE");
}
if (issues.length) bad("itpass_ko quality gate", issues.slice(0, 20).join("; ")); else ok("itpass_ko quality gate", "0 issues");
const manifestPath = path.join(ROOT, "data", "i18n_content", "manifest.json");
const manifest = JSON.parse(read(manifestPath));
const manifestPack = (manifest.packs || []).find(function (p) { return p.subject === "itpass" && p.lang === "ko"; });
if (manifestPack) ok("manifest includes itpass:ko"); else bad("manifest includes itpass:ko");
if (manifestPack && manifestPack.lessonCount === 85) ok("manifest itpass:ko lessonCount", "85"); else bad("manifest itpass:ko lessonCount", manifestPack && manifestPack.lessonCount);
if (manifestPack && manifestPack.coverageStatus === "usable-ko" && !manifestPack.needsReview) ok("manifest itpass:ko status", "usable-ko"); else bad("manifest itpass:ko status", JSON.stringify(manifestPack || {}));
const indexHtml = read(path.join(ROOT, "index.html"));
if (indexHtml.includes("data/i18n_content/itpass_ko.js")) ok("index loads itpass_ko.js"); else bad("index loads itpass_ko.js");
console.log("=== Results: " + pass + " PASS / " + fail + " FAIL ===");
process.exit(fail ? 1 : 0);
