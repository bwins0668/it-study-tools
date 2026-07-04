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

  function init() {
    scan();
    // AI 抽屉 / MOS shell 由各自脚本延迟注入 → 观察 body 直接子级补挂
    new MutationObserver(scan).observe(document.body, { childList: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
