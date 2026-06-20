#!/usr/bin/env node
"use strict";

const { chromium } = require("playwright");

const BASE_URL = process.argv.includes("--base-url")
  ? process.argv[process.argv.indexOf("--base-url") + 1]
  : "http://127.0.0.1:5173";

let failures = 0;
let maxLanguageLatency = 0;
let maxModeLatency = 0;
let totalNetworkRequests = 0;

function fail(message) {
  console.log(`  FAIL: ${message}`);
  failures++;
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

async function snapshotState(page, selectors) {
  return page.evaluate((cfg) => {
    const editor = document.querySelector(cfg.editorSelector);
    const stdin = document.querySelector(cfg.stdinSelector);
    const output = document.querySelector(cfg.outputSelector);
    const rows = output ? Array.from(output.querySelectorAll("table tr")).map((row) => row.children.length) : [];
    return {
      currentSubject: typeof currentSubject !== "undefined" ? currentSubject : null,
      currentLessonId: typeof currentLessonId !== "undefined" ? currentLessonId : null,
      editorValue: editor ? editor.value : "",
      stdinPresent: !!stdin,
      stdinValue: stdin ? stdin.value : "",
      outputText: output ? output.innerText : "",
      outputHasTable: rows.length > 0,
      outputSignature: rows.join(",")
    };
  }, selectors);
}

function checkState(label, actual, expected) {
  if (actual.currentSubject !== expected.currentSubject) {
    fail(`${label}: subject state lost. Expected "${expected.currentSubject}", got "${actual.currentSubject}"`);
  }
  if (actual.currentLessonId !== expected.currentLessonId) {
    fail(`${label}: lesson state lost. Expected "${expected.currentLessonId}", got "${actual.currentLessonId}"`);
  }
  if (actual.editorValue !== expected.editorValue) {
    fail(`${label}: editor code state lost. Expected "${expected.editorValue}", got "${actual.editorValue}"`);
  }
  if (expected.stdinPresent && actual.stdinValue !== expected.stdinValue) {
    fail(`${label}: stdin state lost. Expected "${expected.stdinValue}", got "${actual.stdinValue}"`);
  }
  if (expected.outputHasTable) {
    if (!actual.outputHasTable || actual.outputSignature !== expected.outputSignature) {
      fail(`${label}: run result state lost. Expected table signature "${expected.outputSignature}", got "${actual.outputSignature}"`);
    }
  } else if (!normalizeText(actual.outputText)) {
    fail(`${label}: run result state lost. Expected non-empty output text.`);
  }
}

function isIgnoredDevSocket(url) {
  return url.includes("ws://") || url.includes("live-server") || url.includes("hot-reload") || url.endsWith("/heartbeat");
}

async function run() {
  console.log("=== Running Instant Locale Switch and State Retention Test ===");
  console.log(`Target URL: ${BASE_URL}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.I18n && typeof window.I18n.setLanguage === "function", null, { timeout: 10000 });

  const eligibleLocales = await page.evaluate(() => {
    return window.LOCALE_REGISTRY.getEligible().map(l => l.code);
  });

  console.log("Locales to test instant switch:", eligibleLocales);

  await page.evaluate(() => {
    window.switchSubject("sql");
  });
  await page.waitForTimeout(300);

  const selectors = {
    editorSelector: "#sql-editor",
    stdinSelector: "#sandbox-stdin-input",
    outputSelector: "#output-body"
  };
  const testCode = "SELECT * FROM students_mst WHERE grade = 3;";
  const testStdin = "TEST_STDIN_123";

  await page.fill(selectors.editorSelector, testCode);
  const hasStdin = await page.evaluate((sel) => !!document.querySelector(sel), selectors.stdinSelector);
  if (hasStdin) await page.fill(selectors.stdinSelector, testStdin);

  await page.evaluate(() => {
    if (typeof window.runPlaygroundQuery === "function") window.runPlaygroundQuery();
  });
  await page.waitForTimeout(300);

  const initial = await snapshotState(page, selectors);
  const expected = {
    currentSubject: "sql",
    currentLessonId: initial.currentLessonId,
    editorValue: testCode,
    stdinPresent: hasStdin,
    stdinValue: testStdin,
    outputText: normalizeText(initial.outputText),
    outputHasTable: initial.outputHasTable,
    outputSignature: initial.outputSignature
  };
  if (!expected.outputHasTable && !expected.outputText) {
    fail("initial SQL run result was empty; cannot verify run result retention");
  }

  let networkRequestsCount = 0;
  const requests = [];
  function resetNetworkCounter() {
    networkRequestsCount = 0;
    requests.length = 0;
  }
  page.on("request", (request) => {
    const url = request.url();
    const type = request.resourceType();
    if ((type === "fetch" || type === "xhr" || type === "websocket") && !isIgnoredDevSocket(url)) {
      networkRequestsCount++;
      totalNetworkRequests++;
      requests.push({ type, url });
    }
  });

  async function assertNoNetwork(label) {
    if (networkRequestsCount > 0) {
      fail(`${label}: triggered ${networkRequestsCount} fetch/xhr/websocket request(s): ${JSON.stringify(requests)}`);
    }
  }

  for (const locale of eligibleLocales) {
    console.log(`\n--- Test switches for: "${locale}" ---`);

    for (let cycle = 1; cycle <= 2; cycle++) {
      resetNetworkCounter();
      const t0 = Date.now();
      await page.evaluate(async (l) => {
        await window.I18n.setLanguage(l);
      }, locale);
      await page.waitForTimeout(50);
      const duration = Date.now() - t0;
      maxLanguageLatency = Math.max(maxLanguageLatency, duration);
      console.log(`  Language switch ${cycle}/2 latency: ${duration}ms`);
      if (duration > 1000) fail(`language switch latency exceeds 1000ms for ${locale}: ${duration}ms`);
      await assertNoNetwork(`language switch ${locale} cycle ${cycle}`);

      const actualLocale = await page.evaluate(() => window.I18n.getLanguage());
      if (actualLocale !== locale) fail(`language switch did not apply. Expected "${locale}", got "${actualLocale}"`);
      checkState(`language switch ${locale} cycle ${cycle}`, await snapshotState(page, selectors), expected);
    }

    const compareEligible = await page.evaluate((l) => {
      return window.DisplayMode && typeof window.DisplayMode.isCompareEligible === "function" && window.DisplayMode.isCompareEligible(l);
    }, locale);

    if (compareEligible) {
      console.log("  Testing mode switches (target-only <-> ja-compare), two cycles each...");
      for (let cycle = 1; cycle <= 2; cycle++) {
        for (const mode of ["ja-compare", "target-only"]) {
          resetNetworkCounter();
          const m0 = Date.now();
          await page.evaluate((m) => {
            window.DisplayMode.set(m);
            if (typeof window.refreshI18nForCurrentLesson === "function") {
              window.refreshI18nForCurrentLesson();
            }
          }, mode);
          await page.waitForTimeout(50);
          const modeDuration = Date.now() - m0;
          maxModeLatency = Math.max(maxModeLatency, modeDuration);
          console.log(`    Mode switch ${cycle}/2 to ${mode} latency: ${modeDuration}ms`);
          if (modeDuration > 500) fail(`mode switch latency exceeds 500ms for ${locale}/${mode}: ${modeDuration}ms`);
          await assertNoNetwork(`mode switch ${locale}/${mode} cycle ${cycle}`);

          const actualMode = await page.evaluate(() => {
            const lang = window.I18n.getLanguage();
            return window.DisplayMode.getEffective(lang);
          });
          if (actualMode !== mode) fail(`mode switch did not apply. Expected "${mode}", got "${actualMode}"`);
          checkState(`mode switch ${locale}/${mode} cycle ${cycle}`, await snapshotState(page, selectors), expected);
        }
      }
    }
  }

  await browser.close();

  console.log(`\nInstant Switch Summary: max language ${maxLanguageLatency}ms, max mode ${maxModeLatency}ms, fetch/xhr/websocket ${totalNetworkRequests}`);
  console.log(`Instant Switch Test Finished: ${failures} failure(s)`);
  process.exit(failures ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
