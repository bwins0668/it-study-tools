#!/usr/bin/env node
/**
 * P14.2 回归门禁：setLanguage() 的 BCP-47 长码边界归一化。
 *
 * 背景：语言 registry 使用短码（default-ja-zh/ja/zh/ko/my/vi/th/fr），
 * UI dictionary 与程序化调用可能使用 BCP-47 长码（zh-CN/ja-JP/...）。
 * 本工具验证长码进入 setLanguage 时被归一化为短码，而不是静默坍缩为
 * DEFAULT_LANG（历史缺陷：0/321 静态写入、zh 状态被踢回 default）。
 *
 * 运行：node tools/verify_i18n_long_code_boundary.js
 * 退出码：0=PASS 1=FAIL
 */
"use strict";
const { spawn } = require("child_process");
const http = require("http");
const net = require("net");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const PYTHON = path.join(ROOT, "python", "python.exe");
const DEFAULT_LANG = "default-ja-zh";
const STORAGE_KEY = "study-tools-language";

function randomPort() {
  return new Promise((res, rej) => {
    const s = net.createServer();
    s.once("error", rej);
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close((e) => (e ? rej(e) : res(port)));
    });
  });
}
function httpGet(u) {
  return new Promise((res, rej) => {
    http.get(u, (r) => { r.resume(); res(r.statusCode); }).once("error", rej);
  });
}

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  | " + detail : ""}`);
}

(async () => {
  const port = await randomPort();
  const base = `http://127.0.0.1:${port}`;
  const server = spawn(PYTHON, ["server.py", String(port), "--launcher"], { cwd: ROOT, windowsHide: true, stdio: "ignore" });
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try { if ((await httpGet(base + "/index.html")) === 200) break; } catch (_) {}
    await new Promise((r) => setTimeout(r, 250));
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => { try { sessionStorage.setItem("immersive_started", "true"); } catch (_) {} });
    const page = await ctx.newPage();

    const consoleErrors = [];
    const consoleWarns = [];
    page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
      if (msg.type() === "warning") consoleWarns.push(msg.text());
    });
    await page.route("**/api/updater/state", (route) => route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { currentVersion: "v1", signatureConfigured: false, downloadStage: "idle", downloadProgress: 0, updateReady: false, updateAvailable: false, autoDownload: true, lastError: null, latestVersion: null } }),
    }));

    await page.goto(base + "/index.html", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#main-app-body", { timeout: 20000 });
    await page.waitForTimeout(2000);

    const snap = () => page.evaluate((storageKey) => {
      const all = document.querySelectorAll("[data-i18n]");
      let managed = 0;
      all.forEach((el) => { if (el.getAttribute("data-i18n-managed") === "static") managed += 1; });
      return {
        currentLang: window.I18n.getLanguage(),
        docLang: document.documentElement.lang,
        storage: localStorage.getItem(storageKey),
        total: all.length,
        managedStatic: managed,
        bodyTextLen: (document.body.innerText || "").trim().length,
      };
    }, STORAGE_KEY);

    const switchTo = async (code) => {
      const err = await page.evaluate(async (c) => {
        try { await window.I18n.setLanguage(c); return null; }
        catch (e) { return e.message; }
      }, code);
      await page.waitForTimeout(600);
      return err;
    };

    // S0 初始状态
    const s0 = await snap();
    check("S0 初始 currentLang=default-ja-zh", s0.currentLang === DEFAULT_LANG, `got ${s0.currentLang}`);

    // 长码矩阵：BCP-47 → 期望短码（全部为 registry 支持语言）
    const LONG_CODE_MATRIX = [
      ["zh-CN", "zh"],
      ["ja-JP", "ja"],
      ["ko-KR", "ko"],
      ["my-MM", "my"],
      ["vi-VN", "vi"],
      ["th-TH", "th"],
      ["fr-FR", "fr"],
    ];

    // S1 首个长码切换 zh-CN：currentLang/storage/docLang/静态写入率
    {
      const err = await switchTo("zh-CN");
      const s = await snap();
      check("S1 setLanguage('zh-CN') 无异常", err === null, err || "");
      check("S1 currentLang=zh", s.currentLang === "zh", `got ${s.currentLang}`);
      check(`S1 localStorage(${STORAGE_KEY})=zh`, s.storage === "zh", `got ${s.storage}`);
      check("S1 document.documentElement.lang=zh", s.docLang === "zh", `got ${s.docLang}`);
      const ratio = s.total ? s.managedStatic / s.total : 0;
      check("S1 静态 data-i18n 写入率≥90% 且 ≥250 个", ratio >= 0.9 && s.managedStatic >= 250, `managed=${s.managedStatic}/${s.total}`);
      check("S1 页面未白屏", s.bodyTextLen > 100, `bodyTextLen=${s.bodyTextLen}`);
    }

    // S2 zh 状态下再次传 zh-CN：必须保持 zh，不得回退 default
    {
      const err = await switchTo("zh-CN");
      const s = await snap();
      check("S2 zh 状态再 setLanguage('zh-CN') 不回退 default", s.currentLang === "zh" && s.storage === "zh", `lang=${s.currentLang} storage=${s.storage} err=${err}`);
    }

    // S3-S8 其余长码逐一验证 currentLang + storage + 静态写入
    for (const [longCode, short] of LONG_CODE_MATRIX.slice(1)) {
      const err = await switchTo(longCode);
      const s = await snap();
      check(`setLanguage('${longCode}') → currentLang=${short}`, err === null && s.currentLang === short, `got ${s.currentLang} err=${err}`);
      check(`setLanguage('${longCode}') → storage=${short}`, s.storage === short, `got ${s.storage}`);
      const ratio = s.total ? s.managedStatic / s.total : 0;
      check(`setLanguage('${longCode}') → 静态写入率≥90%`, ratio >= 0.9, `managed=${s.managedStatic}/${s.total}`);
      check(`setLanguage('${longCode}') → 页面未白屏`, s.bodyTextLen > 100, `bodyTextLen=${s.bodyTextLen}`);
    }

    // S9 ja 状态下再次传 ja-JP：等价语言不得触发回退（先切 ja）
    {
      await switchTo("ja");
      const before = await snap();
      const err = await switchTo("ja-JP");
      const s = await snap();
      check("S9 ja 状态再 setLanguage('ja-JP') 保持 ja", before.currentLang === "ja" && s.currentLang === "ja" && s.storage === "ja", `before=${before.currentLang} after=${s.currentLang} err=${err}`);
    }

    // S10 en-US：registry 无英文 → 受控 fallback DEFAULT + 可见 warn + 无异常
    {
      const warnCountBefore = consoleWarns.filter((w) => w.includes("[I18n] setLanguage")).length;
      const err = await switchTo("en-US");
      const s = await snap();
      const warnCountAfter = consoleWarns.filter((w) => w.includes("[I18n] setLanguage")).length;
      check("S10 setLanguage('en-US') 无异常", err === null, err || "");
      check("S10 en-US fallback 到 DEFAULT_LANG", s.currentLang === DEFAULT_LANG && s.storage === DEFAULT_LANG, `lang=${s.currentLang} storage=${s.storage}`);
      check("S10 en-US 触发受控 warn", warnCountAfter > warnCountBefore, `warns=${warnCountAfter - warnCountBefore}`);
    }

    // S11 xx-YY：完全未知码 → fallback DEFAULT + warn + 无异常
    {
      await switchTo("zh"); // 先离开 default，验证 xx-YY 会真正切回而非静默
      const warnCountBefore = consoleWarns.filter((w) => w.includes("[I18n] setLanguage")).length;
      const err = await switchTo("xx-YY");
      const s = await snap();
      const warnCountAfter = consoleWarns.filter((w) => w.includes("[I18n] setLanguage")).length;
      check("S11 setLanguage('xx-YY') 无异常", err === null, err || "");
      check("S11 xx-YY fallback 到 DEFAULT_LANG", s.currentLang === DEFAULT_LANG && s.storage === DEFAULT_LANG, `lang=${s.currentLang} storage=${s.storage}`);
      check("S11 xx-YY 触发受控 warn", warnCountAfter > warnCountBefore, `warns=${warnCountAfter - warnCountBefore}`);
    }

    // S12 短码路径回归（selector 现有机制不得破坏）
    {
      const err = await switchTo("zh");
      const s = await snap();
      const ratio = s.total ? s.managedStatic / s.total : 0;
      check("S12 短码 setLanguage('zh') 仍正常", err === null && s.currentLang === "zh" && s.storage === "zh" && ratio >= 0.9, `lang=${s.currentLang} managed=${s.managedStatic}/${s.total}`);
    }

    // S13 全程 console 无 error
    check("S13 全程 console 无 error", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" || ") || "clean");

    await browser.close();
    browser = null;
  } catch (e) {
    check("RUNTIME 工具执行未中断", false, e.message);
  } finally {
    if (browser) { try { await browser.close(); } catch (_) {} }
    try { server.kill(); } catch (_) {}
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n==== i18n long-code boundary: ${results.length - failed.length}/${results.length} PASS ====`);
  if (failed.length) {
    console.log("FAILED:");
    failed.forEach((f) => console.log(`  - ${f.name} | ${f.detail || ""}`));
    process.exit(1);
  }
  process.exit(0);
})().catch((e) => { console.error("FATAL " + e.message); process.exit(1); });
