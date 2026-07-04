#!/usr/bin/env node
/**
 * P14.3 版本化 i18n 运行时状态诊断（只读）。
 *
 * 输出当前页面的语言运行时事实，用于诊断"语言是否真正切换、静态翻译
 * 是否真正写入"，替代曾位于 gitignored evidence 目录的一次性诊断脚本：
 *   - currentLang（I18n.getLanguage()）
 *   - document.documentElement.lang
 *   - localStorage["study-tools-language"]（canonical key）
 *   - data-i18n-managed 总数（任意值）
 *   - 已写入数量（data-i18n-managed="static"）
 *   - 未写入数量（带 data-i18n 但无 static 标记）
 *
 * 只读约定：不修改项目文件与持久状态（浏览器 profile 为临时实例）；
 * 输出不包含用户数据、Token、私钥或系统绝对路径。
 *
 * 用法：
 *   node tools/verify_i18n_runtime_state.js            # 默认语言初始状态
 *   node tools/verify_i18n_runtime_state.js --lang zh-CN  # 切换后观察（支持短码/BCP-47）
 * 退出码：0=诊断完成 1=执行失败
 */
"use strict";
const { spawn } = require("child_process");
const http = require("http");
const net = require("net");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const PYTHON = path.join(ROOT, "python", "python.exe");
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
function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

(async () => {
  const lang = argValue("--lang");
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
    await page.route("**/api/updater/state", (route) => route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: { currentVersion: "v1", signatureConfigured: false, downloadStage: "idle", downloadProgress: 0, updateReady: false, updateAvailable: false, autoDownload: true, lastError: null, latestVersion: null } }),
    }));
    await page.goto(base + "/index.html", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#main-app-body", { timeout: 20000 });
    await page.waitForFunction(() => window.I18n && typeof window.I18n.getLanguage === "function", null, { timeout: 10000 });
    await page.waitForTimeout(1500);

    if (lang) {
      await page.evaluate(async (l) => { await window.I18n.setLanguage(l); }, lang);
      await page.waitForTimeout(800);
    }

    const state = await page.evaluate((storageKey) => {
      const withKey = document.querySelectorAll("[data-i18n]");
      const managedAny = document.querySelectorAll("[data-i18n-managed]");
      let written = 0;
      withKey.forEach((el) => { if (el.getAttribute("data-i18n-managed") === "static") written += 1; });
      return {
        currentLang: window.I18n.getLanguage(),
        documentLang: document.documentElement.lang,
        storageValue: localStorage.getItem(storageKey),
        managedTotal: managedAny.length,
        writtenStatic: written,
        unwritten: withKey.length - written,
        dataI18nElements: withKey.length,
      };
    }, STORAGE_KEY);

    console.log("== i18n runtime state ==");
    if (lang) console.log(`requestedLang: ${lang}`);
    console.log(`currentLang: ${state.currentLang}`);
    console.log(`document.documentElement.lang: ${state.documentLang}`);
    console.log(`localStorage["${STORAGE_KEY}"]: ${state.storageValue}`);
    console.log(`data-i18n-managed 总数: ${state.managedTotal}`);
    console.log(`已写入数量 (managed="static"): ${state.writtenStatic}`);
    console.log(`未写入数量 (data-i18n 无 static): ${state.unwritten}`);
    console.log(`(data-i18n 元素总数: ${state.dataI18nElements})`);

    await browser.close();
    browser = null;
    process.exitCode = 0;
  } catch (e) {
    console.error("FAIL " + e.message.split("\n")[0]);
    process.exitCode = 1;
  } finally {
    if (browser) { try { await browser.close(); } catch (_) {} }
    try { server.kill(); } catch (_) {}
  }
})();
