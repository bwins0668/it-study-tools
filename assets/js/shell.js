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
    if (mod === "mos365") {
      // MOS365 入口由 mos365.js 运行时注入旧模块面板；复用其 click 行为（不触碰其状态机）
      var entry = $("module-switch-option-mos365");
      if (entry) {
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

    // 受控同步钩子：所有 switchSubject 调用（rail、旧导航、程序化）后刷新高亮
    var orig = window.switchSubject;
    if (typeof orig === "function") {
      window.switchSubject = function (subject) {
        var result = orig.apply(this, arguments);
        updateRailActive(subject);
        return result;
      };
    }

    updateRailActive(window.currentSubject || "sql");
    syncThemeIcon();
  }

  function init() {
    initRail();
    initSkipLinkFirstTab();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
