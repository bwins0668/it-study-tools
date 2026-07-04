/**
 * PracticeLayer — 练习区交互增强（PC UI Rebuild P3）
 *
 * 五科共用 #quiz-options / #quiz-feedback（app.js 以 div 渲染选项）。
 * 本层只做交互与状态表达增强，不触碰判分、题库与完成逻辑：
 *  - 选项键盘可达性：tabindex + role=radio + Enter/Space 激活（委托）
 *  - 选中态 aria-checked 同步；切题/重选时清除结果标注
 *  - 提交后为所选项叠加正误视觉标注（观察 quiz-feedback class 变化，
 *    判定结果仍完全由 checkQuizAnswer 产生）
 *  - 反馈区 role=status（读屏播报）
 */
(function () {
  "use strict";

  function init() {
    var opts = document.getElementById("quiz-options");
    var feedback = document.getElementById("quiz-feedback");
    if (!opts) return;

    var group = opts.closest(".quiz-section") || opts;
    opts.setAttribute("role", "radiogroup");

    function enhance() {
      var items = opts.querySelectorAll(".quiz-option");
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
        if (!el.hasAttribute("role")) el.setAttribute("role", "radio");
        el.setAttribute("aria-checked", el.classList.contains("selected") ? "true" : "false");
      }
    }

    function syncSelection() {
      var items = opts.querySelectorAll(".quiz-option");
      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute("aria-checked", items[i].classList.contains("selected") ? "true" : "false");
        items[i].classList.remove("is-correct", "is-wrong");
      }
    }

    // 渲染/切题（childList 变化）→ 补语义；选项 class 变化 → 同步 aria
    new MutationObserver(function (muts) {
      var childChanged = false;
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].type === "childList") { childChanged = true; break; }
      }
      if (childChanged) enhance();
    }).observe(opts, { childList: true });
    enhance();

    // 键盘激活（Enter / Space）
    opts.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      var opt = e.target.closest(".quiz-option");
      if (!opt) return;
      e.preventDefault();
      opt.click();
    });

    // 点击选中后同步 aria + 清结果标注（重新作答）
    opts.addEventListener("click", function (e) {
      if (!e.target.closest(".quiz-option")) return;
      requestAnimationFrame(syncSelection);
    });

    // 多题导航（五科共用 #itpass-quiz-nav）：边界禁用同步。
    // 旧行为是末题点「下一题」静默 no-op；据进度文本（"問題 x / 共 y 題"）解析边界。
    var progressText = document.getElementById("itpass-quiz-progress-text");
    if (progressText) {
      var syncNavBounds = function () {
        var m = (progressText.textContent || "").match(/(\d+)\D+(\d+)/);
        if (!m) return;
        var cur = parseInt(m[1], 10);
        var total = parseInt(m[2], 10);
        var btns = document.querySelectorAll("#itpass-quiz-nav .quiz-nav-btn");
        if (btns.length >= 2) {
          btns[0].disabled = cur <= 1;
          btns[1].disabled = cur >= total;
        }
      };
      new MutationObserver(syncNavBounds).observe(progressText, { childList: true, characterData: true, subtree: true });
      syncNavBounds();
    }

    if (feedback) {
      if (!feedback.hasAttribute("role")) feedback.setAttribute("role", "status");
      new MutationObserver(function () {
        var cls = feedback.className || "";
        if (/hidden/.test(cls)) return;
        var sel = opts.querySelector(".quiz-option.selected");
        if (!sel) return; // 「選択してください」等无选中的错误提示
        if (/success/.test(cls)) {
          sel.classList.add("is-correct");
          sel.classList.remove("is-wrong");
        } else if (/error/.test(cls)) {
          sel.classList.add("is-wrong");
          sel.classList.remove("is-correct");
        }
      }).observe(feedback, { attributes: true, attributeFilter: ["class"] });
    }

    void group;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
