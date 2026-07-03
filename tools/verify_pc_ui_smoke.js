#!/usr/bin/env node
/**
 * PC UI 重建视觉回归 smoke（门禁 G6）
 *
 * 自起本地 server（随机端口）→ Chromium 遍历全部模块 × 主题 × 视口：
 *   - 截图矩阵（默认 8 模块 dark 1440 + sql 模块 light / 1280 / 1024 / 390）
 *   - 断言：Console 零 error / pageerror、网络零 4xx/5xx 与请求失败、
 *           1440/1024/390 无横向溢出、Tab 焦点链可记录
 * 用法：node tools/verify_pc_ui_smoke.js [--out docs/ui-rebuild-baseline] [--full]
 *   --full：全模块 × {dark,light} × {1440,1280,1024,390} 全矩阵（P8 验收用）
 * 退出码：断言失败 = 1（截图仅作证据，不参与断言）
 */
"use strict";

const { spawn } = require("child_process");
const http = require("http");
const net = require("net");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const PYTHON = path.join(ROOT, "python", "python.exe");

function readArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const FULL = process.argv.includes("--full");
const OUT = path.resolve(ROOT, readArg("--out", "docs/ui-rebuild-baseline"));

const MODULES = ["sql", "itpass", "sg", "java", "python", "typing", "coding-typing"];
const VIEWPORTS = { 1440: [1440, 900], 1280: [1280, 800], 1024: [1024, 768], 390: [390, 844] };

function reservePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.once("error", reject);
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close((e) => (e ? reject(e) : resolve(port)));
    });
  });
}

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (r) => { r.resume(); resolve(r.statusCode); }).once("error", reject);
  });
}

async function waitForServer(base) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try { if ((await get(base + "/index.html")) === 200) return; } catch (_) {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("server did not start");
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const port = await reservePort();
  const base = `http://127.0.0.1:${port}`;
  const server = spawn(PYTHON, ["server.py", String(port), "--launcher"], {
    cwd: ROOT, windowsHide: true, stdio: "ignore",
  });
  const failures = [];
  const consoleIssues = [];
  const netIssues = [];

  try {
    await waitForServer(base);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    page.on("console", (m) => {
      if (m.type() === "error") consoleIssues.push({ type: "error", text: m.text().slice(0, 300) });
    });
    page.on("pageerror", (e) => consoleIssues.push({ type: "pageerror", text: String(e).slice(0, 300) }));
    page.on("requestfailed", (r) => {
      // Supabase CDN 离线容错豁免（计划 R7：已有容错，不计失败）
      if (/supabase/i.test(r.url())) return;
      netIssues.push({ kind: "failed", url: r.url().slice(0, 160) });
    });
    page.on("response", (r) => {
      if (r.status() >= 400) netIssues.push({ kind: r.status(), url: r.url().slice(0, 160) });
    });

    async function dismissOverlay() {
      try {
        const blocked = await page.evaluate(() => {
          const o = document.getElementById("immersive-start-overlay");
          return !!(o && !o.hidden);
        });
        if (blocked) {
          await page.click("#immersive-skip-btn", { timeout: 3000 });
          await page.waitForTimeout(400);
        }
      } catch (_) {}
    }

    async function open() {
      await page.goto(base + "/index.html", { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector("#main-app-body", { timeout: 20000 });
      await page.waitForTimeout(2000);
      await dismissOverlay();
    }

    async function setTheme(theme) {
      await page.evaluate((t) => {
        const isLight = document.body.getAttribute("data-theme") === "light";
        if ((t === "light") !== isLight && window.toggleTheme) window.toggleTheme();
      }, theme);
      await page.waitForTimeout(600);
    }

    async function switchModule(mod) {
      const ok = await page.evaluate((m) => {
        if (m === "mos365") {
          const el = document.getElementById("module-switch-option-mos365");
          if (!el) return false;
          el.click();
          return true;
        }
        if (window.switchSubject) { window.switchSubject(m); return true; }
        return false;
      }, mod);
      await page.waitForTimeout(1200);
      return ok;
    }

    async function overflowCheck(width) {
      const ov = await page.evaluate(() => ({
        doc: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      if (ov.doc > ov.client + 1) {
        failures.push(`overflow@${width}: scrollWidth ${ov.doc} > clientWidth ${ov.client}`);
      }
    }

    async function shot(name) {
      await page.screenshot({ path: path.join(OUT, name + ".png"), timeout: 15000 });
      console.log("SHOT " + name);
    }

    await open();

    // ── 截图矩阵 ──
    const themes = FULL ? ["dark", "light"] : ["dark"];
    for (const theme of themes) {
      await setTheme(theme);
      for (const mod of MODULES) {
        try {
          await switchModule(mod);
          await shot(`${mod}-${theme}-1440`);
        } catch (e) { failures.push(`shot ${mod}-${theme}: ${e.message.split("\n")[0]}`); }
      }
      // MOS365 视图（入口为运行时注入；不触发任何 launch）
      try {
        if (await switchModule("mos365")) {
          await shot(`mos365-${theme}-1440`);
          // MOS365 为 overlay（is-open），switchSubject 不会关闭它；
          // reload 清态，避免其盖住后续主题/视口截图（主题经 localStorage 自动恢复）
          await open();
        } else console.log("SKIP mos365（入口未注入或面板未开）");
      } catch (_) { console.log("SKIP mos365"); }
    }

    // ── 非 full 模式仍覆盖：sql 浅色 + 多视口 ──
    if (!FULL) {
      await switchModule("sql");
      await setTheme("light");
      await shot("sql-light-1440");
      await setTheme("dark");
    }

    // ── 视口矩阵（sql；--full 时全模块） ──
    // --full 时上方主题循环以 light 结束，先归位 dark 保证 `-dark-` 命名属实
    await setTheme("dark");
    const vpModules = FULL ? MODULES : ["sql"];
    for (const [label, [w, h]] of Object.entries(VIEWPORTS)) {
      if (label === "1440") continue;
      await page.setViewportSize({ width: w, height: h });
      await page.waitForTimeout(900);
      for (const mod of vpModules) {
        await switchModule(mod);
        await shot(`${mod}-dark-${label}`);
      }
      await overflowCheck(label);
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(600);
    await overflowCheck("1440");

    // ── 焦点链记录（证据，不断言顺序；P2 后断言 skip-link 起步） ──
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("#main-app-body", { timeout: 20000 });
    await page.waitForTimeout(1500);
    await dismissOverlay();
    const chain = [];
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      chain.push(await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return "body";
        return el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") +
          (typeof el.className === "string" && el.className ? "." + el.className.split(" ")[0] : "");
      }));
    }
    fs.writeFileSync(path.join(OUT, "focus-chain.json"), JSON.stringify(chain, null, 2));
    console.log("FOCUS " + JSON.stringify(chain));

    await browser.close();
  } finally {
    try { server.kill(); } catch (_) {}
  }

  // ── 断言汇总 ──
  if (consoleIssues.length) failures.push(`console issues: ${JSON.stringify(consoleIssues.slice(0, 10))}`);
  if (netIssues.length) failures.push(`network issues: ${JSON.stringify(netIssues.slice(0, 10))}`);

  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify({
    date: new Date().toISOString(), full: FULL, failures, consoleIssues, netIssues,
  }, null, 2));

  if (failures.length) {
    console.error("FAIL\n" + failures.map((f) => "  - " + f).join("\n"));
    process.exit(1);
  }
  console.log("PASS verify_pc_ui_smoke");
})().catch((e) => { console.error("FATAL " + e.message); process.exit(1); });
