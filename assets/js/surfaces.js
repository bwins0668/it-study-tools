/**
 * Surfaces — 工具 / AI / MOS365 表面状态一致性（PC UI Rebuild P4）
 *
 * 1) AI 抽屉焦点泄漏修复：抽屉以 transform 移出画面（off-canvas），
 *    aria-hidden 不阻止 Tab 焦点进入。无 .open 时补 inert（含初始注入态），
 *    有 .open 时移除。抽屉 DOM 由 ai_assistant.js 运行时注入 → body 子级观察。
 * 2) MOS365 overlay（全屏考试遮罩，有意覆盖 rail/statusbar）关闭后，
 *    rail 高亮从 mos365 恢复到真实当前上下文（workspace 或当前科目）。
 * 3) AI 相关模态（ai-modal-backdrop：设置/统计/出题）无 .open 时同样 inert。
 * 不触碰 MOS365 状态机与 AI 业务逻辑，只做表面状态同步。
 */
(function () {
  "use strict";

  function syncInertByClass(el, openClass) {
    if (el.classList.contains(openClass)) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }

  function hookInert(el, openClass) {
    if (!el || el.__surfaceHooked) return;
    el.__surfaceHooked = true;
    syncInertByClass(el, openClass);
    new MutationObserver(function () { syncInertByClass(el, openClass); })
      .observe(el, { attributes: true, attributeFilter: ["class"] });
  }

  function hookMos(shell) {
    if (!shell || shell.__surfaceHooked) return;
    shell.__surfaceHooked = true;
    new MutationObserver(function () {
      if (shell.classList.contains("is-open")) return;
      // 关闭 → rail 高亮恢复（workspace 打开时回 home，否则回当前科目）
      if (!window.ShellRail) return;
      var target = "sql";
      if (window.HomeWorkspace) {
        if (window.HomeWorkspace.isOpen()) target = "home";
        else if (typeof window.HomeWorkspace.getSubject === "function") target = window.HomeWorkspace.getSubject();
      }
      window.ShellRail.setActive(target);
    }).observe(shell, { attributes: true, attributeFilter: ["class"] });
  }

  function scan() {
    hookInert(document.getElementById("ai-assistant-drawer"), "open");
    var modals = document.querySelectorAll(".ai-modal-backdrop");
    for (var i = 0; i < modals.length; i++) hookInert(modals[i], "open");
    hookMos(document.getElementById("mos365-shell"));
  }

  // P6：桌面端 rail 为唯一主模块导航；header brand 下拉与其完全重复。
  // >=721px 时 brand 点击重定向到学習ワークスペース（模块面板仅移动端保留；
  // 面板 DOM 不删除——MOS365 注入入口 module-switch-option-mos365 经 JS click() 调用，
  // display:none 不影响其触发）。capture 阶段拦截，先于 app.js 的面板开关处理。
  function redirectBrandOnDesktop() {
    document.addEventListener("click", function (e) {
      if (!window.matchMedia("(min-width: 721px)").matches) return;
      if (e.target.closest("#mobile-sidebar-toggle")) return; // 内嵌汉堡按钮各行其职
      var trigger = e.target.closest("#header-brand-trigger");
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      if (window.HomeWorkspace) window.HomeWorkspace.open();
      if (window.ShellRail) window.ShellRail.setActive("home");
    }, true);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (!window.matchMedia("(min-width: 721px)").matches) return;
      var trigger = e.target.closest && e.target.closest("#header-brand-trigger");
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      if (window.HomeWorkspace) window.HomeWorkspace.open();
      if (window.ShellRail) window.ShellRail.setActive("home");
    }, true);
  }

  // P13.1：CBT 双态合成——config 卡隐藏且容器可见 = 考试进行态。
  // 仅呈现层状态类（body.cbt-exam-active），不触碰考试判定与数据。
  function watchCbtExamState() {
    var container = document.getElementById("cbt-exam-container");
    if (!container) return;
    var sync = function () {
      var visible = getComputedStyle(container).display !== "none";
      // 正向判定：题目画布真实可见（checkVisibility 穿透全祖先；
      // offsetParent 在 fixed 祖先链下恒为 null，不可用）
      var canvas = container.querySelector(".cbt-question-canvas");
      var canvasVisible = !!canvas && (canvas.checkVisibility
        ? canvas.checkVisibility()
        : canvas.getBoundingClientRect().width > 0);
      document.body.classList.toggle("cbt-exam-active", visible && canvasVisible);
    };
    new MutationObserver(sync).observe(container, {
      attributes: true, attributeFilter: ["style", "class"],
      childList: true, subtree: true
    });
    sync();
  }

  // P11：statusbar 版本号 = 低打扰更新入口（复用既有 StudyUpdater 面板）
  function bindVersionEntry() {
    var entry = document.getElementById("statusbar-version-entry");
    if (!entry) return;
    entry.addEventListener("click", function () {
      if (window.StudyUpdater && typeof window.StudyUpdater.open === "function") {
        window.StudyUpdater.open();
      }
    });
  }

  function init() {
    scan();
    // AI 抽屉 / MOS shell 由各自脚本延迟注入 → 观察 body 直接子级补挂
    new MutationObserver(scan).observe(document.body, { childList: true });
    redirectBrandOnDesktop();
    bindVersionEntry();
    watchCbtExamState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
