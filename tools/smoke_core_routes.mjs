#!/usr/bin/env node
/**
 * smoke_core_routes.mjs — Core files existence and structure smoke test
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

let pass = 0;
let fail = 0;
const errors = [];

function check(condition, msg) {
  if (condition) { pass++; } else { fail++; errors.push(msg); }
}

function read(relPath) {
  try { return readFileSync(join(ROOT, relPath), 'utf8'); } catch (e) { return ''; }
}

// Core JS files
for (const f of [
  join('assets', 'js', 'app.js'),
  join('assets', 'js', 'dashboard.js'),
  join('assets', 'js', 'export-data.js'),
  join('assets', 'js', 'i18n.js'),
  join('assets', 'js', 'version.js'),
]) {
  const c = read(f);
  check(c.length > 50, `${f} exists`);
  if (c.length > 50) {
    try { new Function(c); check(true, `${f} no syntax errors`); }
    catch (e) { check(false, `${f} syntax: ${e.message}`); }
  }
}

// Core CSS files
for (const f of [
  join('assets', 'css', 'index.css'),
  join('assets', 'css', 'light-theme.css'),
]) {
  check(existsSync(join(ROOT, f)), `${f} exists`);
}

// index.html
const html = read('index.html');
check(html.length > 100, 'index.html exists');
if (html.length > 100) {
  check(/<!doctype/i.test(html), 'index.html has DOCTYPE');
  check(html.includes('charset'), 'index.html has charset');
  check(html.includes('viewport'), 'index.html has viewport');
  check(html.includes('<title>'), 'index.html has title');
  check(html.includes('index.css'), 'index.html links index.css');
  check(html.includes('app.js'), 'index.html links app.js');
}

// version.js
const versionJs = read(join('assets', 'js', 'version.js'));
check(versionJs.includes('STUDY_TOOLS_VERSION'), 'version.js sets STUDY_TOOLS_VERSION');

// Service worker (check Web repo sibling)
const swWeb = resolve(ROOT, '..', 'sql-learning-hub-web-public', 'service-worker.js');
if (existsSync(swWeb)) {
  const sw = readFileSync(swWeb, 'utf8');
  check(sw.includes('CACHE_NAME'), 'service-worker.js (Web) has CACHE_NAME');
} else {
  const swLocal = read('service-worker.js');
  check(swLocal.includes('CACHE_NAME'), 'service-worker.js (local) has CACHE_NAME');
}

// === Summary ===
console.log(`\n=== Core Routes Smoke: ${pass} PASS / ${fail} FAIL ===`);
errors.forEach(e => console.error(`  FAIL: ${e}`));
process.exit(fail > 0 ? 1 : 0);
