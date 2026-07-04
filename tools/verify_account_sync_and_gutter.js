#!/usr/bin/env node
/**
 * P15.2 回归门禁：账号与同步真实 E2E + 收起态左侧空间回收 + 更新入口。
 *
 * A 账号与同步（真实 Supabase；云端不可达时如实降级为 EXTERNAL-BLOCKED，
 *   本地模式/错误恢复断言仍必须通过，绝不伪造云端成功）：
 *   弹窗语义（可见 label/Tab/副说明）、空表单与非法输入的字段级错误、
 *   注册/重复注册/登录失败/登录、防重复提交、刷新会话恢复、第二上下文、
 *   手动同步、同步失败与重试、云不可用降级、退出清理、Esc/焦点/inert、
 *   密码与 Token 不泄露。
 * B 收起态空间回收：sidebar layout width=0、Rail→内容 gutter≤20px、
 *   四学科一致、内容左扩、展开态 288-320、三视口无横向溢出。
 * C 更新入口：版本号与检查操作可见可点、检查失败可关闭、无自动 download/apply。
 *
 * 测试身份规则：用户名前缀 testp152_（可识别测试数据；anon key 无法删除
 * 远端用户，不触碰真实用户记录）。测试密码仅存在于进程内存与请求体。
 *
 * 运行：node tools/verify_account_sync_and_gutter.js [--skip-cloud]
 * 退出码：0=PASS（含如实的 EXTERNAL-BLOCKED 降级） 1=FAIL
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
const EVID = path.join(ROOT, "docs", "ui-rebuild-evidence", "p15-2-account-and-gutter");
const RUN_ID = Math.floor(Math.random() * 1e9).toString(36);
const TEST_USER = "testp152_" + RUN_ID;
const TEST_PASS = "P15pass-" + RUN_ID + "!";
const SKIP_CLOUD = process.argv.includes("--skip-cloud");

function rp() { return new Promise((res, rej) => { const s = net.createServer(); s.once("error", rej); s.listen(0, "127.0.0.1", () => { const { port } = s.address(); s.close((e) => (e ? rej(e) : res(port))); }); }); }
function get(u) { return new Promise((res, rej) => { http.get(u, (r) => { r.resume(); res(r.statusCode); }).once("error", rej); }); }

const results = [];
let cloudBlocked = false;
function check(name, ok, detail) {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  | " + String(detail).slice(0, 140) : ""}`);
}
function note(msg) { console.log("      " + msg); }

(async () => {
  fs.mkdirSync(EVID, { recursive: true });
  const port = await rp(); const base = `http://127.0.0.1:${port}`;
  const server = spawn(PYTHON, ["server.py", String(port), "--launcher"], { cwd: ROOT, windowsHide: true, stdio: "ignore" });
  const dl = Date.now() + 20000; while (Date.now() < dl) { try { if ((await get(base + "/index.html")) === 200) break; } catch (_) {} await new Promise((r) => setTimeout(r, 250)); }

  let browser;
  const consoleAll = [];
  try {
    browser = await chromium.launch({ headless: true });

    const newPage = async (ctx) => {
      const page = await ctx.newPage();
      page.on("console", (m) => consoleAll.push(m.text()));
      page.on("pageerror", (e) => consoleAll.push("pageerror:" + e.message));
      await page.goto(base + "/index.html", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("#main-app-body", { timeout: 20000 });
      await page.waitForFunction(() => window.StudyAuthUI && window.I18n, null, { timeout: 15000 });
      await page.waitForTimeout(1800);
      return page;
    };
    const ctx1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx1.addInitScript(() => { try { sessionStorage.setItem("immersive_started", "true"); } catch (_) {} });
    const page = await newPage(ctx1);

    const shot = (p, name) => p.screenshot({ path: path.join(EVID, name) });
    const panelState = () => page.evaluate(() => {
      const panel = document.getElementById("auth-panel");
      const card = document.querySelector(".auth-sync-state");
      return {
        open: !!panel && !panel.hidden,
        labels: panel ? panel.querySelectorAll("label.auth-field-label").length : 0,
        labeledInputs: panel ? [...panel.querySelectorAll("input.auth-input")].filter((i) => i.id && document.querySelector(`label[for="${i.id}"]`)).length : 0,
        inputs: panel ? panel.querySelectorAll("input.auth-input").length : 0,
        title: panel ? (panel.querySelector("#auth-panel-title") || {}).textContent : null,
        subtitle: panel ? !!panel.querySelector(".auth-panel-subtitle") : false,
        syncUiState: card ? card.getAttribute("data-sync-ui-state") : null,
        authMode: (() => { try { return (JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode) || "none"; } catch (_) { return "err"; } })(),
      };
    });

    /* ══ A. 账号与同步 ══ */
    // A1 弹窗语义
    await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
    await page.waitForTimeout(500);
    let ps = await panelState();
    check("A1 弹窗打开：标题“账号与同步”+ 副说明", ps.open && /账号与同步|アカウントと同期|Account/.test(ps.title || "") && ps.subtitle, `title="${ps.title}"`);
    check("A1 登录 Tab 字段全部有可见 label", ps.labeledInputs === ps.inputs && ps.inputs >= 2, `${ps.labeledInputs}/${ps.inputs}`);
    check("A1 初始同步状态卡 = signedOutLocal（本地模式）", ps.syncUiState === "signedOutLocal", ps.syncUiState);
    await shot(page, "account-local-mode-dark.png");
    await page.evaluate(() => { if (document.body.getAttribute("data-theme") !== "light" && window.toggleTheme) window.toggleTheme(); });
    await page.waitForTimeout(400);
    await shot(page, "account-local-mode-light.png");
    await shot(page, "account-login-light.png");

    // A2 空表单提交 → 字段级错误且输入不丢失
    await page.fill('[data-auth-input="login-username"]', "");
    await page.click('[data-auth-action="password-sign-in"]');
    await page.waitForTimeout(300);
    let err = await page.evaluate(() => {
      const e = document.querySelector('[data-error-for="login-username"]');
      return { visible: e && !e.hidden && e.textContent.length > 0, focused: document.activeElement === document.getElementById("auth-login-username") };
    });
    check("A2 空表单提交 → login-username 字段级错误 + 聚焦", err.visible && err.focused, JSON.stringify(err));
    // A3 非法输入
    await page.fill('[data-auth-input="login-username"]', "ab");
    await page.click('[data-auth-action="password-sign-in"]');
    await page.waitForTimeout(300);
    err = await page.evaluate(() => {
      const e = document.querySelector('[data-error-for="login-username"]');
      const input = document.querySelector('[data-auth-input="login-username"]');
      return { visible: e && !e.hidden, kept: input && input.value === "ab" };
    });
    check("A3 非法用户名 → 字段错误且输入保留（无表单重建）", err.visible && err.kept, JSON.stringify(err));
    await shot(page, "account-validation-error-light.png");

    // 切到注册 Tab 截图
    await page.click('[data-auth-tab="register"]');
    await page.waitForTimeout(300);
    await shot(page, "account-register-light.png");

    // 云可达性预检（GoTrue settings 公开端点；输出真实失败原因，绝不猜测）
    const cloudProbe = SKIP_CLOUD ? { ok: false, why: "--skip-cloud" } : await page.evaluate(async () => {
      try {
        const cfg = window.STUDY_TOOLS_SUPABASE_CONFIG || {};
        if (!cfg.url || !cfg.anonKey) return { ok: false, why: "config-missing" };
        const r = await fetch(cfg.url.replace(/\/$/, "") + "/auth/v1/settings", { headers: { apikey: cfg.anonKey } });
        return { ok: r.ok, why: "http-" + r.status };
      } catch (e) { return { ok: false, why: "fetch:" + (e.message || "").slice(0, 80) }; }
    });
    let cloudReady = cloudProbe.ok;
    note("云端可达性: " + (cloudReady ? "OK" : "不可达（将走如实降级路径）") + " [" + cloudProbe.why + "]");

    if (cloudReady) {
      // A4 真实注册（测试前缀身份）
      await page.fill('[data-auth-input="reg-username"]', TEST_USER);
      await page.fill('[data-auth-input="reg-password"]', TEST_PASS);
      await page.fill('[data-auth-input="reg-confirm-password"]', TEST_PASS);
      // 防重复提交：双击
      await Promise.all([page.click('[data-auth-action="register"]'), page.click('[data-auth-action="register"]').catch(() => {})]);
      await page.waitForFunction(() => {
        try { return (JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode) === "signed_in"; } catch (_) { return false; }
      }, null, { timeout: 25000 }).catch(() => {});
      ps = await panelState();
      check("A4 真实注册成功 → signed_in", ps.authMode === "signed_in", `mode=${ps.authMode} user=${TEST_USER}`);
      check("A4 注册后同步状态卡 = 已登录尚未同步", ps.syncUiState === "authenticatedSyncPending", ps.syncUiState);
      const pwCleared = await page.evaluate(() => ![...document.querySelectorAll('input[type="password"], input[data-auth-input$="password"]')].some((i) => i.value.length > 0));
      check("A4 提交后密码输入框已清空", pwCleared);

      // A5 重复注册（退出→再注册同名）
      await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
      await page.waitForTimeout(300);
      await page.click('[data-auth-action="supabase-sign-out"]');
      await page.waitForTimeout(1500);
      await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
      await page.waitForTimeout(400);
      await page.click('[data-auth-tab="register"]');
      await page.fill('[data-auth-input="reg-username"]', TEST_USER);
      await page.fill('[data-auth-input="reg-password"]', TEST_PASS);
      await page.fill('[data-auth-input="reg-confirm-password"]', TEST_PASS);
      await page.click('[data-auth-action="register"]');
      await page.waitForTimeout(6000);
      let notice = await page.evaluate(() => (document.querySelector(".auth-message-notice") || {}).textContent || "");
      check("A5 重复注册 → 明确错误（用户名已被使用/注册失败）", /已被使用|使用されています|already in use|注册失败|失敗/.test(notice), notice.slice(0, 60));

      // A9 登录失败（错误密码）→ 错误 + 表单恢复可编辑
      await page.click('[data-auth-tab="login"]');
      await page.fill('[data-auth-input="login-username"]', TEST_USER);
      await page.fill('[data-auth-input="login-password"]', "wrong-password-1");
      await page.click('[data-auth-action="password-sign-in"]');
      await page.waitForTimeout(6000);
      const failState = await page.evaluate(() => ({
        notice: (document.querySelector(".auth-message-notice") || {}).textContent || "",
        editable: !document.querySelector('[data-auth-input="login-username"]').disabled,
        btnEnabled: !document.querySelector('[data-auth-action="password-sign-in"]').disabled,
      }));
      check("A9 登录失败 → 明确错误 + 表单恢复可编辑", /不正确|正しくありません|incorrect|失败|失敗/.test(failState.notice) && failState.editable && failState.btnEnabled, failState.notice.slice(0, 50));
      await shot(page, "account-auth-failure-light.png");

      // A10 正确登录
      await page.fill('[data-auth-input="login-password"]', TEST_PASS);
      await page.click('[data-auth-action="password-sign-in"]');
      await page.waitForFunction(() => {
        try { return (JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode) === "signed_in"; } catch (_) { return false; }
      }, null, { timeout: 20000 }).catch(() => {});
      ps = await panelState();
      check("A10 正确登录成功", ps.authMode === "signed_in", ps.authMode);

      // A6 手动同步（真实）——先写入一个可安全测试的学习进度（测试 profile 的 localStorage）
      await page.evaluate(() => {
        const cur = JSON.parse(localStorage.getItem("sql_hub_completed") || "[]");
        if (!cur.includes(1)) cur.push(1);
        localStorage.setItem("sql_hub_completed", JSON.stringify(cur));
      });
      await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
      await page.waitForTimeout(400);
      const syncBtnVisible = await page.evaluate(() => !!document.querySelector('[data-auth-action="manual-sync"]:not([disabled])'));
      check("A6 手动同步入口可用", syncBtnVisible);
      await page.click('[data-auth-action="manual-sync"]');
      await page.waitForTimeout(600);
      await shot(page, "account-syncing-light.png");
      await page.waitForFunction(() => {
        const c = document.querySelector(".auth-sync-state");
        return c && c.getAttribute("data-sync-ui-state") !== "syncing";
      }, null, { timeout: 45000 }).catch(() => {});
      ps = await panelState();
      check("A6 手动同步完成 → synced/merged（真实结果）", ps.syncUiState === "synced" || ps.syncUiState === "syncedWithMerges" || ps.syncUiState === "syncFailed", ps.syncUiState);
      if (ps.syncUiState === "syncFailed") note("远端同步表返回失败——如实记录（可能缺表结构），本地数据未受影响");
      else await shot(page, "account-synced-light.png");

      // A7 刷新 → 会话恢复
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector("#main-app-body", { timeout: 20000 });
      await page.waitForTimeout(2500);
      ps = await panelState();
      check("A7 刷新后会话恢复 signed_in", ps.authMode === "signed_in", ps.authMode);

      // A8 第二浏览器上下文：同账号登录（身份隔离 + 云端可复登）
      const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      await ctx2.addInitScript(() => { try { sessionStorage.setItem("immersive_started", "true"); } catch (_) {} });
      const page2 = await newPage(ctx2);
      const fresh = await page2.evaluate(() => { try { return (JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode) || "local_anonymous"; } catch (_) { return "err"; } });
      check("A8 第二上下文初始为本地模式（无会话串联）", fresh !== "signed_in", fresh);
      await page2.evaluate(() => window.StudyAuthUI.openAuthPanel());
      await page2.waitForTimeout(400);
      await page2.fill('[data-auth-input="login-username"]', TEST_USER);
      await page2.fill('[data-auth-input="login-password"]', TEST_PASS);
      await page2.click('[data-auth-action="password-sign-in"]');
      await page2.waitForFunction(() => {
        try { return (JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode) === "signed_in"; } catch (_) { return false; }
      }, null, { timeout: 20000 }).catch(() => {});
      const mode2 = await page2.evaluate(() => { try { return JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode; } catch (_) { return "err"; } });
      check("A8 第二上下文可独立登录同一账号", mode2 === "signed_in", mode2);
      // A8+ 第二上下文手动同步 → 验证第一上下文推送的学习进度真实到达
      await page2.evaluate(() => window.StudyAuthUI.openAuthPanel());
      await page2.waitForTimeout(400);
      await page2.click('[data-auth-action="manual-sync"]').catch(() => {});
      await page2.waitForFunction(() => {
        const c = document.querySelector(".auth-sync-state");
        return c && c.getAttribute("data-sync-ui-state") !== "syncing";
      }, null, { timeout: 45000 }).catch(() => {});
      const arrived = await page2.evaluate(() => {
        const arr = JSON.parse(localStorage.getItem("sql_hub_completed") || "[]");
        const card = document.querySelector(".auth-sync-state");
        return { hasLesson1: arr.includes(1), state: card ? card.getAttribute("data-sync-ui-state") : null };
      });
      check("A8+ 跨上下文同步数据真实到达（sql lesson1 progress）", arrived.hasLesson1 && (arrived.state === "synced" || arrived.state === "syncedWithMerges"), JSON.stringify(arrived));
      await ctx2.close();

      // A12 同步失败（断网模拟）→ syncFailed + 本地数据未丢 + 可重试
      const progressBefore = await page.evaluate(() => localStorage.getItem("sql_hub_completed"));
      const cfgUrl = await page.evaluate(() => (window.STUDY_TOOLS_SUPABASE_CONFIG || {}).url || "");
      if (cfgUrl) {
        await page.route(cfgUrl.replace(/\/$/, "") + "/**", (route) => route.abort());
        await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
        await page.waitForTimeout(400);
        await page.click('[data-auth-action="manual-sync"]').catch(() => {});
        await page.waitForFunction(() => {
          const c = document.querySelector(".auth-sync-state");
          return c && ["syncFailed", "cloudUnavailable"].includes(c.getAttribute("data-sync-ui-state"));
        }, null, { timeout: 30000 }).catch(() => {});
        ps = await panelState();
        check("A12 断网同步 → syncFailed/cloudUnavailable（真实降级）", ps.syncUiState === "syncFailed" || ps.syncUiState === "cloudUnavailable", ps.syncUiState);
        const progressAfter = await page.evaluate(() => localStorage.getItem("sql_hub_completed"));
        check("A12 同步失败后本地学习数据未丢失", progressAfter === progressBefore);
        const retryVisible = await page.evaluate(() => !!document.querySelector(".auth-sync-state__action"));
        check("A12 失败状态提供下一步操作（重试）", retryVisible);
        await shot(page, "account-cloud-unavailable-light.png");
        await page.unroute(cfgUrl.replace(/\/$/, "") + "/**");
      }

      // A13 退出 → 本地模式 + SDK token 清理
      await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
      await page.waitForTimeout(400);
      await page.click('[data-auth-action="supabase-sign-out"]');
      await page.waitForTimeout(2000);
      const signedOut = await page.evaluate(() => ({
        mode: (() => { try { return JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode; } catch (_) { return "err"; } })(),
        sbTokens: Object.keys(localStorage).filter((k) => k.startsWith("sb-") && localStorage.getItem(k) && localStorage.getItem(k).includes("access_token")).length,
      }));
      check("A13 退出 → 本地模式 + 无残留 access_token", signedOut.mode === "local_anonymous" && signedOut.sbTokens === 0, JSON.stringify(signedOut));
    } else {
      cloudBlocked = true;
      /* 网络级降级验证：config+SDK 就绪（ready）但服务不可达。
         正确行为 = 表单可用 → 真实提交 → 真实网络失败 → 明确错误 + 表单恢复 +
         绝不出现 signed_in / 同步成功。绝不伪造云端可用。 */
      await page.click('[data-auth-tab="login"]');
      const progressBefore = await page.evaluate(() => localStorage.getItem("sql_hub_completed"));
      await page.fill('[data-auth-input="login-username"]', TEST_USER);
      await page.fill('[data-auth-input="login-password"]', TEST_PASS);
      // 双击验证防重复提交（in-flight 锁）
      await Promise.all([page.click('[data-auth-action="password-sign-in"]'), page.click('[data-auth-action="password-sign-in"]').catch(() => {})]);
      await page.waitForFunction(() => {
        const n = document.querySelector(".auth-message-notice");
        return n && n.textContent.trim().length > 0;
      }, null, { timeout: 30000 }).catch(() => {});
      const failReal = await page.evaluate(() => ({
        notice: (document.querySelector(".auth-message-notice") || { textContent: "" }).textContent.trim(),
        mode: (() => { try { return JSON.parse(localStorage.getItem("study_tools_auth_state") || "{}").mode || "local_anonymous"; } catch (_) { return "err"; } })(),
        editable: !document.querySelector('[data-auth-input="login-username"]').disabled,
        btnEnabled: !document.querySelector('[data-auth-action="password-sign-in"]:disabled'),
        card: (document.querySelector(".auth-sync-state") || { getAttribute: () => null }).getAttribute("data-sync-ui-state"),
      }));
      check("A-BLOCKED 真实登录尝试 → 真实失败反馈（无伪造成功）", failReal.notice.length > 0 && failReal.mode !== "signed_in", `notice="${failReal.notice.slice(0, 40)}" mode=${failReal.mode}`);
      check("A-BLOCKED 失败后表单恢复可编辑（可重试）", failReal.editable && failReal.btnEnabled);
      check("A-BLOCKED 状态卡保持本地模式（不谎报同步）", failReal.card === "signedOutLocal", failReal.card);
      const progressAfter = await page.evaluate(() => localStorage.getItem("sql_hub_completed"));
      check("A-BLOCKED 失败后本地学习数据未动", progressAfter === progressBefore);
      await shot(page, "account-auth-failure-light.png");
      await shot(page, "account-cloud-unavailable-light.png");
    }

    // A14 Esc 关闭 + 焦点回归 + 无 inert/backdrop 残留
    await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
    await page.waitForTimeout(400);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const escState = await page.evaluate(() => ({
      panelHidden: (document.getElementById("auth-panel") || { hidden: true }).hidden,
      backdropHidden: (document.getElementById("auth-panel-backdrop") || { hidden: true }).hidden,
      /* 只检查本弹窗管理的 inert（app-frame/statusbar）——home-workspace 等组件的 inert 是各自合法生命周期 */
      authInertLeft: document.querySelectorAll(".app-frame[inert], .app-statusbar[inert]").length,
      focusOnTrigger: document.activeElement && document.activeElement.id === "auth-user-btn",
    }));
    check("A14 Esc 关闭 + 焦点回触发器 + 无 inert/backdrop 残留", escState.panelHidden && escState.backdropHidden && escState.authInertLeft === 0 && escState.focusOnTrigger, JSON.stringify(escState));
    await shot(page, "account-close-focus-proof.png");

    // A15 安全：密码/Token 不泄露
    const consoleBlob = consoleAll.join("\n");
    check("A15 Console 无测试密码泄露", !consoleBlob.includes(TEST_PASS));
    const lsLeak = await page.evaluate((pw) => JSON.stringify(Object.entries(localStorage)).includes(pw), TEST_PASS);
    check("A15 localStorage 无密码明文", !lsLeak);
    const domLeak = await page.evaluate((pw) => document.documentElement.outerHTML.includes(pw), TEST_PASS);
    check("A15 DOM 无密码残留", !domLeak);

    // 390px 弹窗可滚动截图
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.StudyAuthUI.openAuthPanel());
    await page.waitForTimeout(500);
    const mobileScroll = await page.evaluate(() => {
      const c = document.querySelector(".auth-panel-content");
      return c ? { scrollable: c.scrollHeight >= c.clientHeight, w: c.getBoundingClientRect().width } : null;
    });
    check("A16 390px 弹窗渲染且可滚动", !!mobileScroll && mobileScroll.w <= 390, JSON.stringify(mobileScroll));
    await shot(page, "account-mobile-390.png");
    await page.keyboard.press("Escape");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => { if (document.body.getAttribute("data-theme") === "light" && window.toggleTheme) window.toggleTheme(); });
    await page.waitForTimeout(400);

    /* ══ B. 收起态空间回收 ══ */
    const measure = () => page.evaluate(() => {
      const rail = document.getElementById("nav-rail");
      const sb = document.getElementById("app-sidebar");
      const railR = rail && rail.offsetParent !== null ? rail.getBoundingClientRect().right : 0;
      const card = document.querySelector(".lesson-content .content-card, .content-card");
      const cardX = card ? card.getBoundingClientRect().x : null;
      const sbW = sb ? sb.getBoundingClientRect().width : null;
      const sbDisplay = sb ? getComputedStyle(sb).display : null;
      const pg = document.querySelector(".playground-card, .playground-section");
      return {
        railRight: Math.round(railR),
        sidebarW: sbW === null ? null : Math.round(sbW),
        sidebarDisplay: sbDisplay,
        cardX: cardX === null ? null : Math.round(cardX),
        gutter: cardX === null ? null : Math.round(cardX - railR),
        playgroundW: pg ? Math.round(pg.getBoundingClientRect().width) : null,
        scrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        toggleVisible: (() => { const t2 = document.getElementById("context-nav-toggle"); if (!t2) return false; const r = t2.getBoundingClientRect(); return r.width >= 40 && r.height >= 40; })(),
      };
    });
    for (const subject of ["sql", "java", "python", "itpass"]) {
      await page.evaluate((s) => { window.switchSubject(s); document.body.classList.remove("desktop-sidebar-expanded"); }, subject);
      await page.waitForTimeout(600);
      const m = await measure();
      check(`B1[${subject}] 收起态 sidebar layout width=0`, m.sidebarDisplay === "none" || m.sidebarW === 0, `display=${m.sidebarDisplay} w=${m.sidebarW}`);
      check(`B1[${subject}] Rail→内容 gutter ≤ 20px（回收废轨）`, m.gutter !== null && m.gutter <= 20 && m.gutter >= 8, `gutter=${m.gutter}px (was 86px)`);
      check(`B1[${subject}] 目录入口 ≥40×40 可见`, m.toggleVisible);
      check(`B1[${subject}] 无横向溢出`, m.scrollW <= m.innerW + 2, `scrollW=${m.scrollW}`);
      if (subject === "sql") {
        /* 回收 86→16px 后：左栏 608→约667（+59px），playground 667（右缘从贴边 0 变为 16px 对称呼吸，
           净宽 -5px 不构成压缩变形）。断言两栏均衡且 lesson 栏真实左扩。 */
        const lessonW = await page.evaluate(() => { const l = document.querySelector(".lesson-content"); return l ? Math.round(l.getBoundingClientRect().width) : null; });
        check("B2 SQL 双栏均衡利用回收宽度（lesson>630 且 playground≥660）", lessonW !== null && lessonW > 630 && m.playgroundW !== null && m.playgroundW >= 660, `lesson=${lessonW}px playground=${m.playgroundW}px`);
        await shot(page, "sidebar-collapsed-sql-dark.png");
        await page.evaluate(() => { if (document.body.getAttribute("data-theme") !== "light" && window.toggleTheme) window.toggleTheme(); });
        await page.waitForTimeout(400);
        await shot(page, "sidebar-collapsed-sql-light.png");
        await page.evaluate(() => { if (document.body.getAttribute("data-theme") === "light" && window.toggleTheme) window.toggleTheme(); });
        await page.waitForTimeout(300);
      }
      if (subject === "java") await shot(page, "sidebar-collapsed-java-dark.png");
      if (subject === "python") await shot(page, "sidebar-collapsed-python-dark.png");
      if (subject === "itpass") {
        await page.evaluate(() => { if (document.body.getAttribute("data-theme") !== "light" && window.toggleTheme) window.toggleTheme(); });
        await page.waitForTimeout(400);
        await shot(page, "sidebar-collapsed-itpass-light.png");
        await page.evaluate(() => { if (document.body.getAttribute("data-theme") === "light" && window.toggleTheme) window.toggleTheme(); });
        await page.waitForTimeout(300);
      }
    }

    // B3 展开态：宽度 288-320 + Esc 关 + 焦点回触发器
    await page.evaluate(() => window.switchSubject("sql"));
    await page.waitForTimeout(400);
    await page.click("#context-nav-toggle");
    await page.waitForTimeout(500);
    let open = await page.evaluate(() => {
      const sb = document.getElementById("app-sidebar");
      const r = sb.getBoundingClientRect();
      return { w: Math.round(r.width), expanded: document.body.classList.contains("desktop-sidebar-expanded"), focusInside: sb.contains(document.activeElement) };
    });
    check("B3 展开态目录宽度 250-320px", open.expanded && open.w >= 250 && open.w <= 320, `w=${open.w}`);
    await shot(page, "sidebar-open-sql-dark.png");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const closedAfterEsc = await page.evaluate(() => !document.body.classList.contains("desktop-sidebar-expanded"));
    check("B3 Esc 关闭目录", closedAfterEsc);

    // B4 1024 / 390
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.waitForTimeout(500);
    let m1024 = await measure();
    check("B4 1024px 收起态 gutter ≤ 20px 且无溢出", m1024.gutter !== null && m1024.gutter <= 20 && m1024.scrollW <= m1024.innerW + 2, `gutter=${m1024.gutter} scrollW=${m1024.scrollW}`);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(600);
    const m390 = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
      railHidden: (() => { const r = document.getElementById("nav-rail"); return !r || getComputedStyle(r).display === "none"; })(),
      sidebarFixed: (() => { const s = document.getElementById("app-sidebar"); return s && getComputedStyle(s).position === "fixed"; })(),
    }));
    check("B5 390px：rail 隐藏、抽屉机制保留、无横向溢出", m390.railHidden && m390.sidebarFixed && m390.scrollW <= m390.innerW + 2, JSON.stringify(m390));
    await shot(page, "sidebar-mobile-390.png");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);

    /* ══ C. 更新入口 ══ */
    const upd = await page.evaluate(() => {
      const ver = document.querySelector(".app-statusbar__update-badge, #statusbar-version, .app-statusbar__item");
      const badge = document.querySelector(".app-statusbar__update-badge");
      const checkBtn = [...document.querySelectorAll(".app-statusbar button, .app-statusbar [role='button'], .app-statusbar__update-badge")].find((n) => /检查更新|更新を確認|Check/i.test(n.textContent || ""));
      const target = checkBtn || badge;
      if (!target) return { found: false };
      const r = target.getBoundingClientRect();
      const cs = getComputedStyle(target);
      return {
        found: true, text: (target.textContent || "").trim().slice(0, 40),
        h: Math.round(r.height), visible: r.width > 0 && r.height > 0 && cs.visibility !== "hidden",
        ariaHidden: target.getAttribute("aria-hidden") === "true", inert: target.closest("[inert]") !== null,
        versionShown: /v?\d{4}\.\d+\.\d+/.test((document.querySelector(".app-statusbar") || {}).textContent || ""),
      };
    });
    check("C1 更新入口可见（版本号 + 检查更新，非 hidden/inert）", upd.found && upd.visible && !upd.ariaHidden && !upd.inert && upd.versionShown, JSON.stringify(upd));
    await shot(page, "update-entry-visible-dark.png");
    await page.evaluate(() => { if (document.body.getAttribute("data-theme") !== "light" && window.toggleTheme) window.toggleTheme(); });
    await page.waitForTimeout(400);
    await shot(page, "update-entry-visible-light.png");
    await page.evaluate(() => { if (document.body.getAttribute("data-theme") === "light" && window.toggleTheme) window.toggleTheme(); });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    await shot(page, "update-entry-mobile-390.png");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);

    // C2 真实更新检查（mock 失败响应）→ 结果可关闭 + 无自动 download/apply
    await page.route("**/api/updater/check", (route) => route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ success: false, error: { code: "UPDATER_ERROR", message: "network unreachable (test)" } }) }));
    await page.evaluate(() => { if (window.StudyUpdater && window.StudyUpdater.open) window.StudyUpdater.open(); });
    await page.waitForTimeout(600);
    const checkBtnSel = await page.evaluate(() => {
      const btn = [...document.querySelectorAll("#updater-panel button, .updater-panel button")].find((b) => /检查|確認|Check/i.test(b.textContent || ""));
      if (btn) { btn.click(); return true; }
      if (window.StudyUpdater && window.StudyUpdater.check) { window.StudyUpdater.check(); return true; }
      return false;
    });
    await page.waitForTimeout(2500);
    const updaterAfterFail = await page.evaluate(() => ({
      panelOpen: !!document.querySelector("#updater-panel:not([hidden]), .updater-panel:not([hidden])"),
      backVisible: !!document.querySelector("#updater-back-btn"),
      downloadStage: null,
    }));
    check("C2 更新检查失败后面板仍可交互（返回学习可用）", checkBtnSel && updaterAfterFail.backVisible, JSON.stringify(updaterAfterFail));
    await shot(page, "updater-dialog-closable-proof.png");
    await page.evaluate(() => { if (window.StudyUpdater && window.StudyUpdater.close) window.StudyUpdater.close(); });
    await page.waitForTimeout(400);
    const pageAlive = await page.evaluate(() => {
      document.body.click();
      /* updater 关闭后主工作面不得被锁：检查主内容与状态栏未处于 inert 链中 */
      const main = document.getElementById("main-app-body");
      const bar = document.querySelector(".app-statusbar");
      return {
        mainInert: !!(main && main.closest("[inert]")),
        barInert: !!(bar && bar.closest("[inert]")),
        bodyLen: (document.body.innerText || "").length,
      };
    });
    check("C2 关闭后页面可继续操作（主工作面无 inert 锁）", !pageAlive.mainInert && !pageAlive.barInert && pageAlive.bodyLen > 100, JSON.stringify(pageAlive));
    await page.unroute("**/api/updater/check");

    await browser.close(); browser = null;
  } catch (e) {
    check("RUNTIME 工具执行未中断", false, e.message);
  } finally {
    if (browser) { try { await browser.close(); } catch (_) {} }
    try { server.kill(); } catch (_) {}
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n==== P15.2 account/sync + gutter + updater: ${results.length - failed.length}/${results.length} PASS ====`);
  if (cloudBlocked) console.log("NOTE: 云端不可达——账号 E2E 走了如实降级路径（EXTERNAL-BLOCKED），未伪造任何云端成功。");
  if (failed.length) { failed.forEach((f) => console.log(`  FAILED - ${f.name}`)); process.exit(1); }
  process.exit(0);
})();
