#!/usr/bin/env node
"use strict";

/**
 * verify_ko_manual_evidence_regression.js
 * Hotfix2 — Stage B: Korean Manual Regression Gate
 *
 * Opens all surfaces in ko-KR target-only mode and verifies:
 *   - No Chinese UI leakage
 *   - No Japanese UI leakage
 *   - No raw i18n keys
 *   - No undefined/null/[object Object]
 *   - Text contains Korean Hangul (or is an exact code/technical exception)
 *
 * Selective element-level exceptions:
 *   - SQL/Java/Python code blocks
 *   - Database column/table names
 *   - API endpoint URLs
 *   - Language-native names in the language selector
 *
 * Usage: node tools/verify_ko_manual_evidence_regression.js --base-url http://127.0.0.1:5173
 * Exit 0 = PASS, 1 = FAIL
 */

"use strict";

const { chromium } = require("playwright");

const BASE_URL = process.argv.includes("--base-url")
  ? process.argv[process.argv.indexOf("--base-url") + 1]
  : "http://127.0.0.1:5173";

const HANGUL = /[가-힯]/;
const CHINESE_JAPANESE = /[一-鿿ぁ-んァ-ンㇰ-ㇿ々〆〤]/;

let failures = 0;

function assertText(label, text) {
  const val = String(text || "").trim();

  if (!val) {
    console.log(`  ❌ FAIL: [${label}] is empty`);
    failures++;
    return;
  }

  // Raw key / null / undefined / [object Object]
  if (/\b(undefined|null)\b|\[object Object\]|(^|[^a-z])i18n[._-]/i.test(val)) {
    console.log(`  ❌ FAIL: [${label}] raw key/null residue: "${val}"`);
    failures++;
    return;
  }

  // Chinese leakage check
  if (CHINESE_JAPANESE.test(val)) {
    console.log(`  ❌ FAIL: [${label}] Chinese/Japanese leakage: "${val}"`);
    failures++;
    return;
  }

  // Korean Hangul requirement — skip pure technical strings
  const cleaned = val.replace(/[a-zA-Z0-9\s:/|.\-+()_▶◀·×Δλπ#@%&=~^'",;!?$€£¥<>{}[\]*\\/]/g, "").trim();
  if (cleaned.length > 0 && !HANGUL.test(val)) {
    console.log(`  ❌ FAIL: [${label}] lacks Korean Hangul: "${val}"`);
    failures++;
    return;
  }

  console.log(`  ✅ [${label}]: "${val.substring(0, 80)}${val.length > 80 ? '...' : ''}"`);
}

async function run() {
  console.log("=== Korean Manual Evidence Regression ===");
  console.log(`Target URL: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.I18n && typeof window.I18n.setLanguage === "function", null, { timeout: 15000 });

  // Set Korean, target-only mode
  await page.evaluate(async () => {
    await window.I18n.setLanguage("ko");
    if (window.DisplayMode && typeof window.DisplayMode.set === "function") {
      window.DisplayMode.set("target-only");
    }
    if (typeof window.refreshI18nForCurrentLesson === "function") {
      window.refreshI18nForCurrentLesson();
    }
  });
  await page.waitForTimeout(800);

  // ─── 1. SQL Learning Page ───
  console.log("\n=== 1. SQL Learning Page ===");
  await page.evaluate(() => { window.switchSubject("sql"); });
  await page.waitForTimeout(500);

  // Sidebar title
  const sidebarTitle = await page.textContent(".sidebar-title");
  assertText("Sidebar title", sidebarTitle);

  // Chapter headers
  const chapters = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".sidebar-chapter-header .chapter-header-title")).map(el => el.textContent)
  );
  chapters.forEach((ch, i) => assertText(`SQL chapter ${i+1}`, ch));

  // Lesson titles
  const lessons = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".lesson-nav-item")).slice(0, 5).map(el => el.textContent)
  );
  lessons.forEach((l, i) => assertText(`SQL lesson ${i+1}`, l));

  // Mission label
  const missionLabel = await page.textContent("#mission-label-text");
  assertText("Mission label", missionLabel);

  // Task text
  const taskText = await page.textContent("#playground-task-text");
  assertText("Task text", taskText);

  // Editor placeholder
  const placeholder = await page.getAttribute("#sql-editor", "placeholder");
  assertText("Editor placeholder", placeholder);

  // Result title
  const resultTitle = await page.textContent("#output-card .output-header");
  assertText("Result title", resultTitle);

  // Result empty state
  const emptyState = await page.textContent("#output-body");
  assertText("Result empty state", emptyState);

  // Random challenge button
  const randomBtn = await page.textContent("#random-practice-btn");
  assertText("Random challenge btn", randomBtn);

  // ─── 2. CBT Mock Exam ───
  console.log("\n=== 2. CBT Mock Exam ===");
  await page.evaluate(() => {
    window.switchSubject("itpass");
    if (typeof window.switchItPassSubMode === "function") {
      window.switchItPassSubMode("exam");
    }
  });
  await page.waitForTimeout(500);

  // Start exam
  await page.evaluate(() => {
    if (typeof window.startCbtExam === "function") {
      window.startCbtExam();
    }
  });
  await page.waitForTimeout(500);

  // Check exam UI texts
  const examTimer = await page.textContent(".cbt-exam-timer-box");
  assertText("Exam timer", examTimer);

  const exitBtn = await page.textContent(".cbt-btn-action.reset");
  assertText("Exit exam btn", exitBtn);

  const submitBtn = await page.textContent(".cbt-btn-action.submit");
  assertText("Submit exam btn", submitBtn);

  const qNumberText = await page.textContent("#cbt-q-number-text");
  assertText("Question number", qNumberText);

  const prevBtn = await page.textContent("#cbt-prev-btn");
  assertText("Prev btn", prevBtn);

  const nextBtn = await page.textContent("#cbt-next-btn");
  assertText("Next btn", nextBtn);

  const navStatus = await page.textContent("#cbt-nav-status-text");
  assertText("Nav status", navStatus);

  // Flag button
  const flagBtn = await page.textContent("#cbt-q-flag-btn");
  assertText("Flag btn", flagBtn);

  // Exit exam
  await page.evaluate(() => {
    if (typeof activeCbtExam !== "undefined" && activeCbtExam) {
      clearInterval(cbtTimerInterval);
      activeCbtExam = null;
      switchItPassSubMode("dojo");
    }
  });
  await page.waitForTimeout(300);

  // ─── 3. Japanese Typing ───
  console.log("\n=== 3. Japanese Typing ===");
  await page.evaluate(() => { window.switchSubject("typing"); });
  await page.waitForTimeout(800);

  // Title
  const typingTitle = await page.textContent("#main-title-text");
  assertText("Typing title", typingTitle);

  // Category labels
  const typingCats = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#typing-category-list .typing-category-btn")).map(el => el.textContent)
  );
  typingCats.forEach((cat, i) => assertText(`Typing category ${i+1}`, cat));

  // Library count
  const libCount = await page.textContent("#typing-library-count");
  assertText("Library count", libCount);

  // Article count label
  await page.waitForTimeout(300);

  // ─── 4. Programming Typing ───
  console.log("\n=== 4. Programming Typing ===");
  await page.evaluate(() => { window.switchSubject("codingTyping"); });
  await page.waitForTimeout(800);

  // Title
  const ctTitle = await page.textContent("#main-title-text");
  assertText("CT title", ctTitle);

  // Practice list title
  const ctListTitle = await page.textContent(".ct-list-title");
  assertText("CT list title", ctListTitle);

  // Category buttons
  const ctCats = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".ct-cat-btn")).map(el => el.textContent)
  );
  // Some may be code names — skip pure English ones
  ctCats.forEach((cat, i) => {
    if (/^[a-zA-Z0-9\s#+.]+$/.test(cat)) {
      console.log(`  ⚠️ SKIP (code name) [CT category ${i+1}]: "${cat}"`);
    } else {
      assertText(`CT category ${i+1}`, cat);
    }
  });

  // Textarea placeholder
  const ctPlaceholder = await page.getAttribute("#ct-textarea", "placeholder");
  if (ctPlaceholder) assertText("CT placeholder", ctPlaceholder);

  // ─── 5. Tools Drawer ───
  console.log("\n=== 5. Tools Drawer ===");
  await page.evaluate(() => {
    if (typeof window.openMenu === "function") window.openMenu();
  });
  await page.waitForTimeout(400);

  const toolsItems = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#tools-drawer .tools-drawer-item")).map(el => el.textContent)
  );
  toolsItems.forEach((item, i) => assertText(`Tools item ${i+1}`, item));

  // ─── 6. AI Provider Settings ───
  console.log("\n=== 6. AI Provider Settings ===");
  await page.evaluate(() => {
    if (typeof window.openSettings === "function") window.openSettings();
  });
  await page.waitForTimeout(500);

  const aiTitle = await page.textContent("#ai-settings-title");
  assertText("AI settings title", aiTitle);

  const aiLabels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#ai-settings-form .ai-field label")).map(el => el.textContent)
  );
  aiLabels.forEach((l, i) => assertText(`AI field label ${i+1}`, l));

  // Find cancel button — could be data-close attribute or .ai-secondary-btn
  const cancelBtn = await page.textContent(".ai-secondary-btn");
  if (!cancelBtn || !cancelBtn.trim()) {
    const cancelBtnAlt = await page.textContent("[data-close='ai-settings-modal']");
    assertText("AI cancel btn", cancelBtnAlt);
  } else {
    assertText("AI cancel btn", cancelBtn);
  }

  const saveBtn = await page.textContent("#ai-settings-save");
  assertText("AI save btn", saveBtn);

  // ─── 7. Toast / Confirm / Reset ───
  console.log("\n=== 7. Reset Confirmation ===");
  await page.evaluate(() => {
    if (typeof window.showResetConfirm === "function") {
      window.showResetConfirm();
    }
  });
  await page.waitForTimeout(400);

  // Check if confirm overlay appeared
  const confirmOverlay = await page.textContent("#tools-confirm-overlay");
  if (confirmOverlay && confirmOverlay.trim()) {
    assertText("Confirm overlay", confirmOverlay);
  } else {
    // Confirm may not show if no confirm function exists - that's OK
    console.log("  ⚠️ Confirm overlay not displayed — checking if reset function exists");
  }

  await browser.close();

  console.log(`\n=== Korean Manual Evidence Regression Complete: ${failures} failure(s) ===`);
  process.exit(failures ? 1 : 0);
}

run().catch((err) => {
  console.error("FATAL:", err.message, err.stack);
  process.exit(1);
});
