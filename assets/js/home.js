/**
 * HomeWorkspace — 学习工作台（PC UI Rebuild P2）
 *
 * 数据源全部为既有真实状态，不新增业务状态、不写入 localStorage：
 *  - 课程总数：各科 lessons 数组（与沙盒/侧边栏同源）
 *  - 完成数：*_completed* localStorage（与 dashboard.js getCourseStats 同一套 key）
 *  - 继续学习：max(completed)+1（与工具抽屉 continue-learning 同规则，扩展到五科）
 *  - 行动入口：switchSubject / load*Lesson / StudyDashboard.open /
 *              glossary-open-btn / tools-trigger-btn（全部复用既有实现）
 * 展示为 overlay（hidden 控制），不触碰 main-app-body 显示状态机。
 */
(function () {
  "use strict";

  var SUBJECTS = [
    { key: "sql",    icon: "fa-solid fa-database",       storageKey: "sql_hub_completed",        load: "loadLesson" },
    { key: "java",   icon: "fa-brands fa-java",          storageKey: "java_completed_lessons",   load: "loadJavaLesson" },
    { key: "python", icon: "fa-brands fa-python",        storageKey: "python_completed_lessons", load: "loadPythonLesson" },
    { key: "itpass", icon: "fa-solid fa-graduation-cap", storageKey: "itpass_completed_lessons", load: "loadItPassLesson" },
    { key: "sg",     icon: "fa-solid fa-shield-halved",  storageKey: "sg_completed_lessons",     load: "loadSgLesson" }
  ];

  var lastSubject = "sql"; // 由 switchSubject 包装钩子维护（let 全局变量无法跨脚本读取）

  function t(key, fallback) {
    if (window.I18n && typeof window.I18n.t === "function") return window.I18n.t(key, fallback);
    return fallback;
  }

  /* 课程数组为顶层 const（同全局词法环境跨脚本可见，但不在 window 上），
     与 java_sandbox.js 的 typeof 探测模式一致 */
  function lessonsOf(key) {
    switch (key) {
      case "sql":    return typeof SQL_LESSONS !== "undefined" ? SQL_LESSONS : null;
      case "java":   return typeof JAVA_LESSONS !== "undefined" ? JAVA_LESSONS : null;
      case "python": return typeof PYTHON_LESSONS !== "undefined" ? PYTHON_LESSONS : null;
      case "itpass": return typeof IT_PASSPORT_LESSONS !== "undefined" ? IT_PASSPORT_LESSONS : null;
      case "sg":     return typeof SG_LESSONS !== "undefined" ? SG_LESSONS : null;
    }
    return null;
  }

  function completedOf(storageKey) {
    try {
      var arr = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }

  function subjectStats(s) {
    var lessons = lessonsOf(s.key);
    var completed = completedOf(s.storageKey);
    var total = lessons ? lessons.length : 0;
    var done = completed.length;
    var next = null;
    if (total > 0) {
      next = done > 0 ? Math.max.apply(null, completed) + 1 : 1;
      if (next > total) next = null; // 全部完成
    }
    return { total: total, done: done, next: next, pct: total ? Math.round(done / total * 100) : 0 };
  }

  function subjectName(key) {
    return t("nav." + (key === "itpass" ? "itpass" : key), key.toUpperCase());
  }

  function esc(sInput) {
    return String(sInput).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render() {
    var root = document.getElementById("home-workspace");
    if (!root) return;

    var current = SUBJECTS.filter(function (s) { return s.key === lastSubject; })[0] || SUBJECTS[0];
    var curStats = subjectStats(current);
    var anyProgress = SUBJECTS.some(function (s) { return subjectStats(s).done > 0; });

    var lessonLabel = "";
    if (curStats.next) {
      lessonLabel = t("common.lessonIndex", "第{id}課").replace(/\{id\}/g, curStats.next);
    }

    var heroAction;
    if (!anyProgress) {
      heroAction = '<button type="button" class="ds-btn ds-btn--primary ds-btn--lg" data-home-action="continue">' +
        '<i class="fa-solid fa-play" aria-hidden="true"></i> <span data-i18n="home.startLearning">' + esc(t("home.startLearning", "学習を始める")) + "</span></button>";
    } else if (curStats.next) {
      heroAction = '<button type="button" class="ds-btn ds-btn--primary ds-btn--lg" data-home-action="continue">' +
        '<i class="fa-solid fa-play" aria-hidden="true"></i> <span data-i18n="home.continueLearning">' + esc(t("home.continueLearning", "続きから学習")) + "</span>" +
        (lessonLabel ? ' <span class="home-hero__next-label">· ' + esc(lessonLabel) + "</span>" : "") + "</button>";
    } else {
      heroAction = '<button type="button" class="ds-btn ds-btn--primary ds-btn--lg" data-home-action="review">' +
        '<i class="fa-solid fa-rotate-left" aria-hidden="true"></i> <span data-i18n="home.reviewCourse">' + esc(t("home.reviewCourse", "最初から復習")) + "</span></button>";
    }

    var rows = SUBJECTS.map(function (s) {
      var st = subjectStats(s);
      if (st.total === 0) return "";
      var isDone = st.next === null && st.done > 0;
      return '<button type="button" class="home-course-row' + (isDone ? " is-done" : "") + '" data-home-subject="' + s.key + '">' +
        '<span class="home-course-row__icon"><i class="' + s.icon + '" aria-hidden="true"></i></span>' +
        '<span class="home-course-row__name">' + esc(subjectName(s.key)) + "</span>" +
        '<span class="home-course-row__bar"><span class="ds-progress"><span class="ds-progress__fill" style="width:' + st.pct + '%"></span></span></span>' +
        '<span class="home-course-row__stat"><strong>' + st.done + "</strong> / " + st.total + "</span>" +
        '<span class="home-course-row__go">' +
        (isDone
          ? '<i class="fa-solid fa-check" aria-hidden="true"></i> <span data-i18n="home.courseDone">' + esc(t("home.courseDone", "完了")) + "</span>"
          : '<span data-i18n="home.goContinue">' + esc(t("home.goContinue", "続ける")) + '</span> <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>') +
        "</span></button>";
    }).join("");

    root.innerHTML =
      '<div class="home-inner">' +
        '<button type="button" class="ds-iconbtn home-close" data-home-action="close" aria-label="' + esc(t("common.close", "閉じる")) + '" data-i18n-aria-label="common.close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +

        '<header class="home-hero">' +
          '<div class="home-hero__eyebrow"><span class="ds-dot" aria-hidden="true"></span><span data-i18n="home.eyebrow">' + esc(t("home.eyebrow", "学習ワークスペース")) + "</span></div>" +
          '<h2 class="home-hero__title" data-i18n="home.title">' + esc(t("home.title", "今日も続けましょう")) + "</h2>" +
          '<p class="home-hero__context">' +
            '<span data-i18n="home.currentContext">' + esc(t("home.currentContext", "現在の学習")) + "</span>：" +
            "<strong>" + esc(subjectName(current.key)) + "</strong>" +
            (curStats.next && anyProgress ? " · " + esc(lessonLabel) : "") +
            " · " + curStats.done + " / " + curStats.total +
          "</p>" +
          (!anyProgress ? '<p class="home-empty-hint" data-i18n="home.emptyHint">' + esc(t("home.emptyHint", "学習記録はまだありません。SQL の第1課から始めるのがおすすめです。")) + "</p>" : "") +
          '<div class="home-hero__actions">' +
            heroAction +
            '<button type="button" class="ds-btn ds-btn--secondary" data-home-action="dashboard"><i class="fa-solid fa-chart-column" aria-hidden="true"></i> <span data-i18n="home.openDashboard">' + esc(t("home.openDashboard", "学習統計")) + "</span></button>" +
          "</div>" +
        "</header>" +

        '<section class="home-section" aria-labelledby="home-progress-title">' +
          '<div class="home-section__head"><h3 class="home-section__title" id="home-progress-title" data-i18n="home.progressOverview">' + esc(t("home.progressOverview", "コース進捗")) + "</h3></div>" +
          '<div class="home-course-list">' + rows + "</div>" +
        "</section>" +

        '<section class="home-section" aria-labelledby="home-actions-title">' +
          '<div class="home-section__head"><h3 class="home-section__title" id="home-actions-title" data-i18n="home.quickActions">' + esc(t("home.quickActions", "クイックアクション")) + "</h3></div>" +
          '<div class="home-actions">' +
            '<button type="button" class="home-action" data-home-subject-plain="typing"><i class="fa-solid fa-keyboard" aria-hidden="true"></i> <span data-i18n="nav.typing">' + esc(t("nav.typing", "日本語タイピング")) + "</span></button>" +
            '<button type="button" class="home-action" data-home-subject-plain="coding-typing"><i class="fa-solid fa-laptop-code" aria-hidden="true"></i> <span data-i18n="nav.codingTyping">' + esc(t("nav.codingTyping", "プログラミングタイピング")) + "</span></button>" +
            '<button type="button" class="home-action" data-home-action="glossary"><i class="fa-solid fa-book" aria-hidden="true"></i> <span data-i18n="home.openGlossary">' + esc(t("home.openGlossary", "用語辞典")) + "</span></button>" +
            '<button type="button" class="home-action" data-home-action="tools"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i> <span data-i18n="tools.tools">' + esc(t("tools.tools", "ツール")) + "</span></button>" +
          "</div>" +
        "</section>" +
      "</div>";
  }

  function loadNext(key) {
    var s = SUBJECTS.filter(function (x) { return x.key === key; })[0];
    if (!s) return;
    var st = subjectStats(s);
    var id = st.next || 1;
    var fn = window[s.load];
    if (typeof fn === "function") fn(id);
  }

  function open() {
    var root = document.getElementById("home-workspace");
    if (!root) return;
    // 与 switchSubject 同款清场：关闭全屏练习 hub（复用其真实 close）
    if (window.TypingHub && typeof window.TypingHub.close === "function") window.TypingHub.close();
    if (window.CodingTyping && typeof window.CodingTyping.close === "function") window.CodingTyping.close();
    render();
    root.removeAttribute("hidden");
    // 被 overlay 盖住的旧容器不应保留可 Tab 焦点（无障碍：防焦点泄漏）
    var legacy = document.querySelector(".app-frame__body > .app-container");
    if (legacy) legacy.setAttribute("inert", "");
  }

  function close() {
    var root = document.getElementById("home-workspace");
    if (root && !root.hasAttribute("hidden")) root.setAttribute("hidden", "");
    var legacy = document.querySelector(".app-frame__body > .app-container");
    if (legacy) legacy.removeAttribute("inert");
  }

  function isOpen() {
    var root = document.getElementById("home-workspace");
    return !!root && !root.hasAttribute("hidden");
  }

  function onRootClick(e) {
    var btn = e.target.closest("[data-home-action],[data-home-subject],[data-home-subject-plain]");
    if (!btn) return;

    var subj = btn.getAttribute("data-home-subject");
    if (subj) {
      close();
      if (window.switchSubject) window.switchSubject(subj);
      loadNext(subj);
      return;
    }
    var plain = btn.getAttribute("data-home-subject-plain");
    if (plain) {
      close();
      if (window.switchSubject) window.switchSubject(plain);
      return;
    }

    switch (btn.getAttribute("data-home-action")) {
      case "continue":
        close();
        if (window.switchSubject) window.switchSubject(lastSubject);
        loadNext(lastSubject);
        break;
      case "review":
        close();
        if (window.switchSubject) window.switchSubject(lastSubject);
        (function () {
          var s = SUBJECTS.filter(function (x) { return x.key === lastSubject; })[0];
          var fn = s && window[s.load];
          if (typeof fn === "function") fn(1);
        })();
        break;
      case "dashboard":
        if (window.StudyDashboard && window.StudyDashboard.open) window.StudyDashboard.open();
        break;
      case "glossary":
        (function () {
          var g = document.getElementById("glossary-open-btn");
          if (g) { close(); g.click(); }
        })();
        break;
      case "tools":
        (function () {
          var tBtn = document.getElementById("tools-trigger-btn");
          if (tBtn) tBtn.click();
        })();
        break;
      case "close":
        close();
        break;
    }
  }

  function init() {
    var root = document.getElementById("home-workspace");
    if (!root) return;
    root.addEventListener("click", onRootClick);

    // 记录真实当前科目（typing / coding-typing / mos365 不改变"继续学习"上下文）
    var orig = window.switchSubject;
    if (typeof orig === "function") {
      window.switchSubject = function (subject) {
        var result = orig.apply(this, arguments);
        if (subject && subject !== "typing" && subject !== "coding-typing" && subject !== "mos365") {
          lastSubject = subject;
        }
        return result;
      };
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.HomeWorkspace = {
    open: open, close: close, isOpen: isOpen, refresh: render,
    getSubject: function () { return lastSubject; }
  };
})();
