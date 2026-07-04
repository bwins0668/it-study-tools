/**
 * LessonNav — 课时页导航层（PC UI Rebuild P2）
 *
 * 在课时正文（.content-card）末尾提供：上一課 / 完成状态徽标 / 次の課。
 * 位置跟踪：包装既有 load*Lesson 函数（全局 let 课时变量无法跨脚本读取）。
 * 完成状态为只读展示（读取与 dashboard 同源的 *_completed* localStorage）；
 * 完成的写入仍由既有学习行为驱动（quiz / 任务判定），本层不提供手动标记，
 * 避免绕过学习验证语义。
 */
(function () {
  "use strict";

  var SUBJECTS = {
    sql:    { load: "loadLesson",       storageKey: "sql_hub_completed",        lessons: function () { return typeof SQL_LESSONS !== "undefined" ? SQL_LESSONS : null; } },
    java:   { load: "loadJavaLesson",   storageKey: "java_completed_lessons",   lessons: function () { return typeof JAVA_LESSONS !== "undefined" ? JAVA_LESSONS : null; } },
    python: { load: "loadPythonLesson", storageKey: "python_completed_lessons", lessons: function () { return typeof PYTHON_LESSONS !== "undefined" ? PYTHON_LESSONS : null; } },
    itpass: { load: "loadItPassLesson", storageKey: "itpass_completed_lessons", lessons: function () { return typeof IT_PASSPORT_LESSONS !== "undefined" ? IT_PASSPORT_LESSONS : null; } },
    sg:     { load: "loadSgLesson",     storageKey: "sg_completed_lessons",     lessons: function () { return typeof SG_LESSONS !== "undefined" ? SG_LESSONS : null; } }
  };

  var current = { subject: "sql", id: 1 };

  function t(key, fallback) {
    if (window.I18n && typeof window.I18n.t === "function") return window.I18n.t(key, fallback);
    return fallback;
  }

  function isCompleted(subject, id) {
    try {
      var arr = JSON.parse(localStorage.getItem(SUBJECTS[subject].storageKey) || "[]");
      return Array.isArray(arr) && arr.indexOf(id) !== -1;
    } catch (_) { return false; }
  }

  function ensureFooter() {
    var footer = document.getElementById("lesson-nav-footer");
    if (footer) return footer;
    var card = document.querySelector(".lesson-content > .content-card");
    if (!card) return null;

    footer = document.createElement("nav");
    footer.id = "lesson-nav-footer";
    footer.className = "lesson-nav-footer ds-scope";
    footer.setAttribute("aria-label", t("lessonNav.title", "レッスンナビゲーション"));
    footer.setAttribute("data-i18n-aria-label", "lessonNav.title");
    footer.innerHTML =
      '<button type="button" class="ds-btn ds-btn--secondary lesson-nav-footer__prev" id="lesson-nav-prev">' +
        '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i> <span data-i18n="lessonNav.prev">' + t("lessonNav.prev", "前の課") + "</span>" +
      "</button>" +
      '<span class="lesson-nav-footer__status" id="lesson-nav-status" role="status"></span>' +
      '<button type="button" class="ds-btn ds-btn--secondary lesson-nav-footer__next" id="lesson-nav-next">' +
        '<span data-i18n="lessonNav.next">' + t("lessonNav.next", "次の課") + '</span> <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' +
      "</button>";
    card.appendChild(footer);

    footer.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var delta = btn.id === "lesson-nav-prev" ? -1 : btn.id === "lesson-nav-next" ? 1 : 0;
      if (!delta) return;
      var conf = SUBJECTS[current.subject];
      var lessons = conf && conf.lessons();
      if (!lessons) return;
      var target = current.id + delta;
      if (target < 1 || target > lessons.length) return;
      var fn = window[conf.load];
      if (typeof fn === "function") {
        fn(target);
        // 阅读起点回到课时标题（键盘焦点管理）
        var title = document.getElementById("lesson-title-ja");
        if (title) {
          title.setAttribute("tabindex", "-1");
          title.focus({ preventScroll: true });
        }
        var content = document.querySelector(".lesson-content");
        if (content) content.scrollTop = 0;
      }
    });
    return footer;
  }

  function update() {
    var footer = ensureFooter();
    if (!footer) return;
    var conf = SUBJECTS[current.subject];
    var lessons = conf && conf.lessons();
    if (!lessons || !lessons.length) { footer.hidden = true; return; }
    footer.hidden = false;

    var prev = document.getElementById("lesson-nav-prev");
    var next = document.getElementById("lesson-nav-next");
    var status = document.getElementById("lesson-nav-status");
    if (prev) prev.disabled = current.id <= 1;
    if (next) next.disabled = current.id >= lessons.length;

    if (status) {
      var done = isCompleted(current.subject, current.id);
      status.className = "lesson-nav-footer__status " + (done ? "is-done" : "is-open");
      status.innerHTML = done
        ? '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> <span data-i18n="lessonNav.completed">' + t("lessonNav.completed", "この課は完了済み") + "</span>"
        : '<i class="fa-regular fa-circle" aria-hidden="true"></i> <span data-i18n="lessonNav.notCompleted">' + t("lessonNav.notCompleted", "未完了 · 課題クリアで完了") + "</span>" +
          ' <span class="lesson-nav-footer__count">' + current.id + " / " + lessons.length + "</span>";
      if (done) {
        status.innerHTML += ' <span class="lesson-nav-footer__count">' + current.id + " / " + lessons.length + "</span>";
      }
    }
  }

  function wrapLoaders() {
    Object.keys(SUBJECTS).forEach(function (subject) {
      var name = SUBJECTS[subject].load;
      var orig = window[name];
      if (typeof orig !== "function") return;
      window[name] = function (id) {
        var result = orig.apply(this, arguments);
        if (typeof id === "number" && isFinite(id)) {
          current = { subject: subject, id: id };
          update();
        }
        return result;
      };
    });
    // 完成状态由学习行为随时写入（quiz 判定等），saveProgress 是统一出口 → 挂钩刷新徽标
    var origSave = window.saveProgress;
    if (typeof origSave === "function") {
      window.saveProgress = function () {
        var result = origSave.apply(this, arguments);
        update();
        return result;
      };
    }
  }

  function init() {
    wrapLoaders();
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.LessonNav = { refresh: update };
})();
