/**
 * Shell — 桌面工作台壳层控制器（PC UI Rebuild P1）
 *
 * 职责：
 *  - Nav Rail 点击 → 复用既有全局入口（switchSubject / MOS365 注入项 / 工具抽屉 / 主题）
 *  - 包装 window.switchSubject：任何来源的模块切换后同步 rail 高亮
 *    （这是新壳层唯一受控钩子，用于替代旧 setTimeout 导航补丁；P2 移除旧导航后保留）
 *  - 主题图标同步
 * 边界：不含任何业务逻辑；不注册全局快捷键（P2 起由本文件统一接管 Ctrl+1..9）。
 */
(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

  function updateRailActive(subject) {
    var items = document.querySelectorAll("#nav-rail .rail-item[data-module]");
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("active", items[i].getAttribute("data-module") === subject);
    }
  }

  function syncThemeIcon() {
    var btn = $("rail-theme");
    if (!btn) return;
    var icon = btn.querySelector("i");
    if (!icon) return;
    var isLight = document.body.getAttribute("data-theme") === "light";
    icon.className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }

  function activateModule(mod) {
    if (mod === "home") {
      // 学習ワークスペース（home.js 提供；overlay，不触碰 main-app-body 状态机）
      if (window.HomeWorkspace) {
        window.HomeWorkspace.open();
        updateRailActive("home");
      }
      return;
    }
    if (mod === "mos365") {
      // MOS365 入口由 mos365.js 运行时注入旧模块面板；复用其 click 行为（不触碰其状态机）
      var entry = $("module-switch-option-mos365");
      if (entry) {
        if (window.HomeWorkspace) window.HomeWorkspace.close();
        entry.click();
        updateRailActive("mos365");
      }
      return;
    }
    if (window.switchSubject) window.switchSubject(mod);
  }

  // 既有初始化脚本（内容区编辑器等）会挪动顺序焦点起点，导致首次 Tab
  // 不从文档头开始、skip-link 永远拿不到第一跳。一次性拦截：页面加载后
  // 用户按下的第一个键若是 Tab 且焦点仍在 body（无显式焦点），改聚焦 skip-link。
  // 键盘事件内的 focus() 触发 :focus-visible，skip-link 按 base.css 规则弹出。
  function initSkipLinkFirstTab() {
    document.addEventListener("keydown", function onFirstKey(e) {
      document.removeEventListener("keydown", onFirstKey, true);
      if (e.key !== "Tab" || e.shiftKey) return;
      if (document.activeElement && document.activeElement !== document.body) return;
      var sk = document.querySelector(".skip-link");
      if (sk) { e.preventDefault(); sk.focus(); }
    }, true);
  }

  function initRail() {
    var rail = $("nav-rail");
    if (!rail) return;

    rail.addEventListener("click", function (e) {
      var btn = e.target.closest(".rail-item");
      if (!btn) return;
      var mod = btn.getAttribute("data-module");
      if (mod) { activateModule(mod); return; }
      if (btn.id === "rail-tools") {
        var t = $("tools-trigger-btn");
        if (t) t.click();
        return;
      }
      if (btn.id === "rail-theme") {
        if (window.toggleTheme) window.toggleTheme();
        syncThemeIcon();
      }
    });

    // 受控同步钩子：所有 switchSubject 调用（rail、旧导航、程序化）后刷新高亮，
    // 并关闭学習ワークスペース overlay（进入具体模块即离开工作台）
    var orig = window.switchSubject;
    if (typeof orig === "function") {
      window.switchSubject = function (subject) {
        var result = orig.apply(this, arguments);
        if (window.HomeWorkspace) window.HomeWorkspace.close();
        updateRailActive(subject);
        return result;
      };
    }

    updateRailActive(window.currentSubject || "sql");
    syncThemeIcon();

    // 主题可由多处切换（rail / 旧 header 按钮 / initTheme 恢复）——
    // 以 body[data-theme] 为唯一事实源观察，保证 rail 图标恒同步
    new MutationObserver(syncThemeIcon).observe(document.body, {
      attributes: true, attributeFilter: ["data-theme"]
    });
  }

  // P10：目录触发按钮（取代 16px hover 竖条；44×44、click/键盘、焦点闭环）。
  // 开合复用 app.js 的 openDesktopSidebar/closeDesktopSidebar；
  // 展开态以 body.desktop-sidebar-expanded 为唯一事实源。
  function initContextNavToggle() {
    var btn = $("context-nav-toggle");
    if (!btn) return;

    function isOpen() { return document.body.classList.contains("desktop-sidebar-expanded"); }

    btn.addEventListener("click", function () {
      if (isOpen()) {
        if (window.closeDesktopSidebar) window.closeDesktopSidebar();
        btn.focus();
      } else if (window.openDesktopSidebar) {
        window.openDesktopSidebar();
        // 焦点进入目录：当前课时优先，其次目录标题
        window.setTimeout(function () {
          var target = document.querySelector("#lessons-nav .lesson-nav-item.active") ||
                       document.getElementById("sidebar-title-text");
          if (target) {
            if (!target.hasAttribute("tabindex") && target.tagName !== "BUTTON" && target.tagName !== "A") {
              target.setAttribute("tabindex", "-1");
            }
            target.focus({ preventScroll: false });
          }
        }, 240);
      }
    });

    // P11：收起按钮是目录头部结构的一部分（触发按钮在展开态淡出让位）
    var collapseBtn = $("sidebar-collapse-btn");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", function () {
        if (window.closeDesktopSidebar) window.closeDesktopSidebar();
        btn.focus();
      });
    }

    // 展开态同步 aria-expanded（关闭动作可能来自 Esc/外点/收起按钮/模式切换）
    new MutationObserver(function () {
      var open = isOpen();
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      // Esc/外点关闭后焦点若困在被藏目录内，交还按钮
      if (!open) {
        var sidebar = document.getElementById("app-sidebar");
        if (sidebar && sidebar.contains(document.activeElement)) btn.focus();
      }
    }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  function init() {
    initRail();
    initSkipLinkFirstTab();
    initContextNavToggle();
    // 供表面状态层（surfaces.js）在 overlay 关闭后恢复高亮
    window.ShellRail = { setActive: updateRailActive };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
