// App controller for SQL & IT Passport Multi-Subject Learning Portal

// Subject & Navigation state
let currentSubject = 'sql'; // 'sql' | 'itpass' | 'java' | 'sg' | 'python'
let itpassSubMode = 'lessons'; // 'lessons' | 'dojo'
let sgSubMode = 'lessons'; // 'lessons' | 'dojo'
let sqlSubMode = 'lessons'; // 'lessons' | 'exam'
let pythonSubMode = 'lessons'; // 'lessons' | 'exam'
let javaSubMode = 'lessons'; // 'lessons' | 'exam'

// Mobile navigation drawers toggle helpers
window.toggleMobileSidebar = function() {
  document.body.classList.toggle('mobile-sidebar-open');
  document.body.classList.remove('mobile-playground-open');
};
window.toggleMobilePlayground = function() {
  document.body.classList.toggle('mobile-playground-open');
  document.body.classList.remove('mobile-sidebar-open');
};
window.closeMobileDrawers = function() {
  document.body.classList.remove('mobile-sidebar-open', 'mobile-playground-open');
};


// SQL Hub original state
let currentLessonId = 1;
let completedLessons = [];
let selectedLang = 'both';
let selectedQuizOption = null;
let selectedSchemaTable = 'students_mst';
let isRandomPracticeActive = false;
let currentDBGroup = 'school';  // 'school' | 'shop'

// SQL Cross-lesson challenge state
let crossChallengeActive = false;
let crossChallengePool = [];
let crossChallengeIndex = 0;
let crossChallengeCurrentExercise = null;

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// IT Passport textbook curriculum state
let currentItPassLessonId = 1;
let completedItPassLessons = [];
let itpassQuizIdx = 0; // index of active question in the current chapter
let selectedItPassQuizOption = null;

// SG textbook curriculum state
let currentSgLessonId = 1;
let completedSgLessons = [];
let sgQuizIdx = 0;
let selectedSgQuizOption = null;

// IT Passport Flashcards state
let currentFlashcardIdx = 0;
let isFlashcardFlipped = false;

// Java Learning State
let currentJavaLessonId = 1;
let currentJavaSectionIndex = 0;
let lastLoadedJavaChapterId = null;
let currentJavaBook = 'nyumon';        // 'nyumon' | 'jissen'
let javaQuizIdx = 0;
let selectedJavaQuizOption = null;
let completedJavaLessons = [];         // array of lesson ids
    
// Python Learning State
let currentPythonLessonId = 1;
let pythonQuizIdx = 0;
let selectedPythonQuizOption = null;
let completedPythonLessons = []; // array of lesson ids
let lastLoadedPythonChapterId = null;

// IT Passport CBT Exam State
let activeCbtExam = null;
let cbtTimerInterval = null;

// Practical Coding Exam State
let activeCodingExam = null;

// Header elements references
let logoIcon = null;
let mainTitle = null;
let moduleSwitchTrigger = null;
let moduleSwitchPanel = null;
let moduleSwitchOpen = false;

// SG original textbook PDF
const SG_TEXTBOOK_PDF = "情報セキュリティー.pdf";

// IT Passport original textbook PDF
const ITPASS_TEXTBOOK_PDF = "令和08年-イメージ-クレバー方式でよくわかる-かやのき先生のITパスポート教室_00.pdf";
let currentPdfObjectUrl = null;

// Initialize the Mock SQL Engine
const sqlEngine = new MockSQLEngine();

// On Document Ready
document.addEventListener("DOMContentLoaded", () => {
  logoIcon = document.getElementById("main-logo-icon");
  mainTitle = document.getElementById("main-title-text");
  moduleSwitchTrigger = document.getElementById("module-switch-trigger");
  moduleSwitchPanel = document.getElementById("module-switch-panel");
  maximizeAppWindow();
  loadCompletedProgress();
  initSidebar();
  loadLesson(currentLessonId);
  initSchemaVisualizer();
  updateProgressUI();
  setupEditorLineNumbers();
  setupKeyboardShortcuts();

  // Set default values for calculators in IT Passport Mode
  initItPassCalculators();

  // Start heartbeat to keep local server alive
  startHeartbeat();

  // Initialize auth UI (try/catch — feature may not exist)
  try { if (window.StudyAuthUI) window.StudyAuthUI.initAuthUI(); }
  catch (_) { console.warn("[App] AuthUI init skipped"); }

  // Initialize module switch panel
  initModuleSwitch();

  // Initialize tools drawer
  initToolsDrawer();

  // Initialize exam history modal (Round 23.2)
  initExamHistoryModal();

  // Trigger initial subject setup (SQL) so that the sub-header and all widgets are correctly initialized on load
  currentSubject = "";
  switchSubject('sql');
  initTheme();
});

// Heartbeat function
function startHeartbeat() {
  setInterval(() => {
    fetch('/heartbeat', { method: 'POST' }).catch(() => {});
  }, 4000);
}

// Keyboard shortcuts

// Programmatic window maximization for start-up (especially Chrome App Mode)
function maximizeAppWindow() {
  try {
    window.focus();
    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
  } catch (err) {
    console.warn("Window maximization blocked:", err);
  }
}

function setupKeyboardShortcuts() {
  document.getElementById("sql-editor").addEventListener("keydown", (e) => {
    // Ctrl+Enter or Cmd+Enter to run query
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runPlaygroundQuery();
    }
  });
  // Escape to close maximized output
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const card = document.getElementById("output-card");
      if (card && card.classList.contains("maximized")) {
        toggleMaximizeOutput();
      }
      const javaCard = document.getElementById("java-output-card");
      if (javaCard && javaCard.classList.contains("maximized")) {
        toggleMaximizeJavaOutput();
      }
      const pythonCard = document.getElementById("python-output-card");
      if (pythonCard && pythonCard.classList.contains("maximized")) {
        toggleMaximizePythonOutput();
      }
    }
  });
}

// Load Progress from localStorage
function loadCompletedProgress() {
  const saved = localStorage.getItem("sql_hub_completed");
  if (saved) {
    try {
      completedLessons = JSON.parse(saved);
    } catch (e) {
      completedLessons = [];
    }
  }

  const savedItPass = localStorage.getItem("itpass_completed_lessons");
  if (savedItPass) {
    try {
      completedItPassLessons = JSON.parse(savedItPass);
    } catch (e) {
      completedItPassLessons = [];
    }
  }
  
  const savedSg = localStorage.getItem("sg_completed_lessons");
  if (savedSg) {
    try {
      completedSgLessons = JSON.parse(savedSg);
    } catch (e) {
      completedSgLessons = [];
    }
  }
  
  const savedPython = localStorage.getItem("python_completed_lessons");
  if (savedPython) {
    try {
      completedPythonLessons = JSON.parse(savedPython);
    } catch (e) {
      completedPythonLessons = [];
    }
  }
  
  const javaSaved = localStorage.getItem("java_completed_lessons");
  if (javaSaved) {
    try { 
      completedJavaLessons = JSON.parse(javaSaved); 
      // 迁移旧版进度数据 (nyumon-1 等字符串ID) 到扁平的子节数字ID
      if (completedJavaLessons.some(id => typeof id === 'string')) {
        let newIds = [];
        completedJavaLessons.forEach(oldId => {
          if (typeof oldId === 'string') {
            if (typeof JAVA_LESSONS !== 'undefined') {
              const matched = JAVA_LESSONS.filter(l => l.originalChapterId === oldId);
              matched.forEach(l => {
                if (!newIds.includes(l.id)) newIds.push(l.id);
              });
            }
          } else {
            if (!newIds.includes(oldId)) newIds.push(oldId);
          }
        });
        completedJavaLessons = newIds;
        localStorage.setItem("java_completed_lessons", JSON.stringify(completedJavaLessons));
      }
    } catch(e) { 
      completedJavaLessons = []; 
    }
  }
}

// Save Progress to localStorage
function saveProgress() {
  if (currentSubject === 'sql') {
    localStorage.setItem("sql_hub_completed", JSON.stringify(completedLessons));
  } else if (currentSubject === 'java') {
    localStorage.setItem("java_completed_lessons", JSON.stringify(completedJavaLessons));
  } else if (currentSubject === 'python') {
    localStorage.setItem("python_completed_lessons", JSON.stringify(completedPythonLessons));
  } else if (currentSubject === 'sg') {
    localStorage.setItem("sg_completed_lessons", JSON.stringify(completedSgLessons));
  } else {
    localStorage.setItem("itpass_completed_lessons", JSON.stringify(completedItPassLessons));
  }
  updateProgressUI();
}

// Switch Subject between SQL, IT Passport, Java and SG
function switchSubject(subject) {
  if (currentSubject === subject) return;
  
  // Prompt if a CBT or Coding mock exam is currently active
  if (activeCbtExam && !activeCbtExam.isSubmitted) {
    if (!confirmKey("dialog.switchExamConfirm")) {
      return;
    }
    if (cbtTimerInterval) clearInterval(cbtTimerInterval);
    activeCbtExam = null;
    if (currentSubject === 'itpass') itpassSubMode = 'lessons';
    else if (currentSubject === 'sg') sgSubMode = 'lessons';
  }

  if (activeCodingExam && !activeCodingExam.isSubmitted) {
    if (!confirmKey("dialog.switchExamConfirm")) {
      return;
    }
    if (cbtTimerInterval) clearInterval(cbtTimerInterval);
    activeCodingExam = null;
    if (currentSubject === 'sql') sqlSubMode = 'lessons';
    else if (currentSubject === 'java') javaSubMode = 'lessons';
    else if (currentSubject === 'python') pythonSubMode = 'lessons';
  }

  currentSubject = subject;
  if (window.TypingHub) window.TypingHub.close();
  if (window.CodingTyping && typeof window.CodingTyping.close === 'function') window.CodingTyping.close();

  // Hide all exam layouts and restore default textbook/workspace view by default
  const cbtContainer = document.getElementById("cbt-exam-container");
  if (cbtContainer) cbtContainer.style.display = "none";
  
  const configPanel = document.getElementById("coding-exam-config");
  const runningPanel = document.getElementById("coding-exam-panel");
  const resultsPanel = document.getElementById("coding-exam-results");
  if (configPanel) configPanel.style.display = "none";
  if (runningPanel) runningPanel.style.display = "none";
  if (resultsPanel) resultsPanel.style.display = "none";
  
  const textbookCard = document.querySelector(".lesson-content > .content-card:not([class*='coding-exam'])");
  if (textbookCard) textbookCard.style.display = "flex";
  
  const mainAppBody = document.getElementById("main-app-body");
  if (mainAppBody) mainAppBody.style.display = "flex";
  
  // Toggle tab buttons — replaced by module switch panel
  // Keep tab DOM elements alive for any legacy dependencies; remove visual classes
  document.querySelectorAll(".subject-tab").forEach(function(t) { t.classList.remove("active"); });

  // Update module switch panel active state
  document.querySelectorAll(".module-switch-option").forEach(function(opt) {
    opt.classList.toggle("active", opt.getAttribute("data-module") === subject);
  });
  
  // Update header content  // Clear body mode classes
  document.body.classList.remove('mode-java');
  document.body.classList.remove('mode-sg');
  document.body.classList.remove('mode-python');
  
  // Hide all sub-headers by default
  const subHeaders = ["sql-sub-header", "python-sub-header", "java-sub-header", "itpass-sub-header", "sg-sub-header"];
  subHeaders.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  
  // Update the CBT Year Select element options based on current subject
  updateCbtYearOptions();
  
  if (subject === "typing") {
    if (mainAppBody) mainAppBody.style.display = "none";
    document.getElementById("header-challenge").style.display = "none";
    if (window.TypingHub) window.TypingHub.open();
    if (mainTitle) {
      mainTitle.setAttribute("data-i18n", "nav.typing");
      mainTitle.innerText = I18n.t("nav.typing");
    }
  } else if (subject === "coding-typing") {
    if (mainAppBody) mainAppBody.style.display = "none";
    document.getElementById("header-challenge").style.display = "none";
    logoIcon.className = "fa-solid fa-laptop-code logo-icon";
    if (window.CodingTyping && typeof window.CodingTyping.open === 'function') {
      window.CodingTyping.open();
    }
    if (mainTitle) {
      mainTitle.setAttribute("data-i18n", "nav.codingTyping");
      mainTitle.innerText = I18n.t("nav.codingTyping");
    }
  } else if (subject === "sql") {
    logoIcon.className = "fa-solid fa-database logo-icon";
    mainTitle.setAttribute("data-i18n", "nav.sql");
    mainTitle.innerText = I18n.t("nav.sql");
    
    // Show/hide sub-headers and containers
    document.getElementById("sql-sub-header").style.display = "flex";
    document.getElementById("cbt-exam-container").style.display = "none";
    document.getElementById("main-app-body").style.display = "flex";
    
    // Toggle sidebar/widgets
    document.querySelectorAll(".sql-widget").forEach(el => el.style.display = "flex");
    document.querySelectorAll(".itpass-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".java-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".python-widget").forEach(el => el.style.display = "none");
    document.getElementById("python-vocab-section").style.display = "none";
    document.getElementById("itpass-flashcards-card").style.display = "none";
    document.getElementById("sidebar-pdf-container").style.display = "none";
    document.getElementById("locate-pdf-btn").style.display = "none";
    closeEmbeddedPdf();
    
    document.getElementById("header-challenge").style.display = "flex";
    
    // Hide glossary and show code
    document.getElementById("lesson-glossary").style.display = "none";
    document.getElementById("example-pre-block").style.display = "block";
    document.getElementById("copy-example-btn").style.display = "inline-flex";
    document.getElementById("example-header-title").innerHTML = `<i class="fa-solid fa-code"></i> <span data-i18n="lesson.sqlExample">${I18n.t("lesson.sqlExample")}</span>`;
    document.getElementById("java-vocab-section").style.display = "none";
    
    // Toggle sub-modes (Textbook vs Exam)
    switchSqlSubMode(sqlSubMode);
  } else if (subject === "java") {
    logoIcon.className = "fa-brands fa-java logo-icon";
    mainTitle.setAttribute("data-i18n", "nav.java");
    mainTitle.innerText = I18n.t("nav.java");
    document.body.classList.add('mode-java');
    
    document.getElementById("java-sub-header").style.display = "flex";
    document.getElementById("cbt-exam-container").style.display = "none";
    document.getElementById("main-app-body").style.display = "flex";
    document.getElementById("header-challenge").style.display = "none";
    document.getElementById("sidebar-pdf-container").style.display = "none";
    document.getElementById("locate-pdf-btn").style.display = "none";
    closeEmbeddedPdf();

    // Show Java widgets, hide SQL/ITpass widgets
    document.querySelectorAll(".java-widget").forEach(el => el.style.display = "");
    document.querySelectorAll(".sql-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".itpass-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".python-widget").forEach(el => el.style.display = "none");
    document.getElementById("python-vocab-section").style.display = "none";

    // Show example card with Java code
    document.getElementById("lesson-glossary").style.display = "none";
    document.getElementById("example-pre-block").style.display = "block";
    document.getElementById("copy-example-btn").style.display = "inline-flex";
    document.getElementById("itpass-quiz-nav").style.display = "none";
    document.getElementById("example-header-title").innerHTML = `<i class="fa-brands fa-java"></i> <span data-i18n="lesson.javaExample">${I18n.t("lesson.javaExample")}</span>`;

    // Toggle sub-modes (Textbook vs Exam)
    switchJavaSubMode(javaSubMode);
  } else if (subject === "python") {
    logoIcon.className = "fa-brands fa-python logo-icon";
    mainTitle.setAttribute("data-i18n", "nav.python");
    mainTitle.innerText = I18n.t("nav.python");
    document.body.classList.add('mode-python');
    
    document.getElementById("python-sub-header").style.display = "flex";
    document.getElementById("cbt-exam-container").style.display = "none";
    document.getElementById("main-app-body").style.display = "flex";
    document.getElementById("header-challenge").style.display = "none";
    document.getElementById("sidebar-pdf-container").style.display = "none";
    document.getElementById("locate-pdf-btn").style.display = "none";
    closeEmbeddedPdf();

    // Show Python widgets, hide SQL/ITpass/Java widgets
    document.querySelectorAll(".python-widget").forEach(el => el.style.display = "");
    document.querySelectorAll(".sql-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".itpass-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".java-widget").forEach(el => el.style.display = "none");

    // Hide glossary and show code
    document.getElementById("lesson-glossary").style.display = "none";
    document.getElementById("example-pre-block").style.display = "block";
    document.getElementById("copy-example-btn").style.display = "inline-flex";
    document.getElementById("itpass-quiz-nav").style.display = "none";
    document.getElementById("example-header-title").innerHTML = `<i class="fa-brands fa-python"></i> <span data-i18n="lesson.pythonExample">${I18n.t("lesson.pythonExample")}</span>`;
    document.getElementById("java-vocab-section").style.display = "none";

    // Toggle sub-modes (Textbook vs Exam)
    switchPythonSubMode(pythonSubMode);
  } else if (subject === "sg") {
    logoIcon.className = "fa-solid fa-shield-halved logo-icon";
    mainTitle.setAttribute("data-i18n", "nav.sg");
    mainTitle.innerText = I18n.t("nav.sg");
    document.body.classList.add('mode-sg');
    
    document.getElementById("sg-sub-header").style.display = "flex";
    document.getElementById("header-challenge").style.display = "none";
    document.getElementById("java-vocab-section").style.display = "none";
    
    // Hide SQL/Java widgets, show IT Passport widgets (re-used for SG!)
    document.querySelectorAll(".sql-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".itpass-widget").forEach(el => el.style.display = "flex");
    document.querySelectorAll(".java-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".python-widget").forEach(el => el.style.display = "none");
    document.getElementById("python-vocab-section").style.display = "none";
    
    // Hide calculators tool card specifically in SG mode
    document.getElementById("itpass-tools-card").style.display = "none";
    
    document.getElementById("sidebar-pdf-container").style.display = "block";
    
    // Toggle sub-modes (Textbook vs. Dojo)
    switchSgSubMode(sgSubMode);
  } else {
    logoIcon.className = "fa-solid fa-graduation-cap logo-icon";
    mainTitle.setAttribute("data-i18n", "nav.itpass");
    mainTitle.innerText = I18n.t("nav.itpass");
    
    document.getElementById("itpass-sub-header").style.display = "flex";
    document.getElementById("header-challenge").style.display = "none";
    document.getElementById("java-vocab-section").style.display = "none";
    
    // Hide SQL/Java widgets, show IT Passport widgets
    document.querySelectorAll(".sql-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".itpass-widget").forEach(el => el.style.display = "flex");
    document.querySelectorAll(".java-widget").forEach(el => el.style.display = "none");
    document.querySelectorAll(".python-widget").forEach(el => el.style.display = "none");
    document.getElementById("python-vocab-section").style.display = "none";
    document.getElementById("sidebar-pdf-container").style.display = "block";
    
    // Toggle sub-modes (Textbook vs. Dojo)
    switchItPassSubMode(itpassSubMode);
  }
  
  updateProgressUI();
}

function updateCbtYearOptions() {
  const select = document.getElementById("cbt-year-select");
  if (!select) return;
  
  select.innerHTML = "";
  
  if (currentSubject === "sg") {
    select.innerHTML = `
      <option value="all" selected>随机混合真题 (推荐 - 综合模考)</option>
      <option value="sg_07_haru">令和7年度 (R7) 公开问题</option>
      <option value="sg_06_haru">令和6年度 (R6) 公开问题</option>
      <option value="sg_05_haru">令和5年度 (R5) 公开问题</option>
      <option value="sg_01_aki">令和元年度秋 (R1) 真题</option>
      <option value="sg_31_haru">平成31年度春 (H31) 真题</option>
      <option value="sg_30_aki">平成30年度秋 (H30) 真题</option>
      <option value="sg_30_haru">平成30年度春 (H30) 真题</option>
      <option value="sg_29_aki">平成29年度秋 (H29) 真题</option>
      <option value="sg_29_haru">平成29年度春 (H29) 真题</option>
      <option value="sg_28_aki">平成28年度秋 (H28) 真题</option>
      <option value="sg_28_haru">平成28年度春 (H28) 真题</option>
    `;
  } else {
    select.innerHTML = `
      <option value="all" selected>随机混合真题 (推荐 - 综合模考)</option>
      <option value="08_haru">令和8年度 (R8) 公开问题</option>
      <option value="07_haru">令和7年度 (R7) 公开问题</option>
      <option value="06_haru">令和6年度 (R6) 公开问题</option>
      <option value="05_haru">令和5年度 (R5) 公开问题</option>
      <option value="04_haru">令和4年度 (R4) 公开问题</option>
      <option value="03_haru">令和3年度 (R3) 公开问题</option>
    `;
  }
}

// Switch IT Passport sub modes (lessons vs. dojo/mock exam)
function switchItPassSubMode(mode) {
  itpassSubMode = mode;
  document.getElementById("sub-tab-lessons").classList.toggle("active", mode === "lessons");
  document.getElementById("sub-tab-dojo").classList.toggle("active", mode === "dojo");
  
  if (mode === "lessons") {
    // Hide CBT and show main body
    document.getElementById("cbt-exam-container").style.display = "none";
    document.getElementById("main-app-body").style.display = "flex";
    
    // Populate sidebar with IT Passport chapters
    initSidebar();
    loadItPassLesson(currentItPassLessonId);
  } else {
    // Show CBT and hide main body
    document.getElementById("main-app-body").style.display = "none";
    document.getElementById("cbt-exam-container").style.display = "flex";
    closeEmbeddedPdf();
    
    // If an exam is currently active, show test screen, else show config screen
    if (activeCbtExam) {
      document.getElementById("cbt-config-screen").style.display = "none";
      document.getElementById("cbt-testing-screen").style.display = "flex";
      document.getElementById("cbt-results-screen").style.display = "none";
      renderCbtQuestion();
    } else {
      document.getElementById("cbt-config-screen").style.display = "flex";
      document.getElementById("cbt-testing-screen").style.display = "none";
      document.getElementById("cbt-results-screen").style.display = "none";
    }
  }
}

// Switch SG sub modes (lessons vs. dojo/mock exam)
function switchSgSubMode(mode) {
  sgSubMode = mode;
  document.getElementById("sg-sub-tab-lessons").classList.toggle("active", mode === "lessons");
  document.getElementById("sg-sub-tab-dojo").classList.toggle("active", mode === "dojo");
  
  if (mode === "lessons") {
    // Hide CBT and show main body
    document.getElementById("cbt-exam-container").style.display = "none";
    document.getElementById("main-app-body").style.display = "flex";
    
    // Populate sidebar with SG chapters
    initSidebar();
    loadSgLesson(currentSgLessonId);
  } else {
    // Show CBT and hide main body
    document.getElementById("main-app-body").style.display = "none";
    document.getElementById("cbt-exam-container").style.display = "flex";
    closeEmbeddedPdf();
    
    // If an exam is currently active, show test screen, else show config screen
    if (activeCbtExam) {
      document.getElementById("cbt-config-screen").style.display = "none";
      document.getElementById("cbt-testing-screen").style.display = "flex";
      document.getElementById("cbt-results-screen").style.display = "none";
      renderCbtQuestion();
    } else {
      document.getElementById("cbt-config-screen").style.display = "flex";
      document.getElementById("cbt-testing-screen").style.display = "none";
      document.getElementById("cbt-results-screen").style.display = "none";
    }
  }
}

// Reset all progress for the active subject
function resetAllProgress(skipConfirm) {
  const subjectNames = {
    sql: "SQL",
    itpass: "IT Passport",
    java: "Java",
    sg: "SG",
    python: "Python"
  };
  const doReset = skipConfirm || confirmKey("dialog.resetProgressConfirm", { subject: subjectNames[currentSubject] || currentSubject });
  if (doReset) {
    if (currentSubject === "sql") {
      completedLessons = [];
      localStorage.removeItem("sql_hub_completed");
      initSidebar();
      loadLesson(currentLessonId);
    } else if (currentSubject === "java") {
      completedJavaLessons = [];
      localStorage.removeItem("java_completed_lessons");
      if (typeof JAVA_LESSONS !== 'undefined') {
        JAVA_LESSONS.forEach(l => localStorage.removeItem('java_progress_' + l.id));
      }
      initSidebar();
      loadJavaLesson(currentJavaLessonId);
    } else if (currentSubject === "python") {
      completedPythonLessons = [];
      localStorage.removeItem("python_completed_lessons");
      if (typeof PYTHON_LESSONS !== 'undefined') {
        PYTHON_LESSONS.forEach(l => localStorage.removeItem('python_progress_' + l.id));
      }
      initSidebar();
      loadPythonLesson(currentPythonLessonId);
    } else if (currentSubject === "sg") {
      completedSgLessons = [];
      localStorage.removeItem("sg_completed_lessons");
      if (typeof SG_LESSONS !== 'undefined') {
        SG_LESSONS.forEach(l => {
          localStorage.removeItem(`sg_quiz_completed_${l.id}`);
          l.completedQuizIndices = [];
        });
      }
      initSidebar();
      loadSgLesson(currentSgLessonId);
    } else {
      completedItPassLessons = [];
      localStorage.removeItem("itpass_completed_lessons");
      IT_PASSPORT_LESSONS.forEach(l => {
        localStorage.removeItem(`itpass_quiz_completed_${l.id}`);
        l.completedQuizIndices = [];
      });
      initSidebar();
      loadItPassLesson(currentItPassLessonId);
    }
    updateProgressUI();
  }
}

// Tools Drawer Controller
function initToolsDrawer() {
  var trigger = document.getElementById('tools-trigger-btn');
  var drawer = document.getElementById('tools-drawer');
  var backdrop = document.getElementById('tools-drawer-backdrop');
  var closeBtn = document.getElementById('tools-drawer-close');
  if (!trigger || !drawer) return;

  function openDrawer() {
    drawer.removeAttribute('hidden');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function isDrawerOpen() { return !drawer.hasAttribute('hidden'); }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isDrawerOpen()) { closeDrawer(); } else { openDrawer(); }
  });

  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isDrawerOpen()) closeDrawer();
  });

  // Handle drawer item clicks
  drawer.addEventListener('click', function (e) {
    var item = e.target.closest('[data-action]');
    if (!item) return;
    var action = item.getAttribute('data-action');

    if (action === 'open-glossary') {
      closeDrawer();
      var glossaryBtn = document.getElementById('glossary-open-btn');
      if (glossaryBtn) {
        glossaryBtn.click();
      } else {
        // Fallback: open glossary modal directly
        var modal = document.getElementById('glossary-modal');
        if (modal && window.IT_TERMS_GLOSSARY) {
          modal.removeAttribute('hidden');
          document.body.style.overflow = 'hidden';
          var search = document.getElementById('glossary-search');
          if (search) setTimeout(function () { search.focus(); }, 100);
        }
      }
      return;
    }

    if (action === 'open-settings') {
      closeDrawer();
      if (window.StudyAI && window.StudyAI.openSettings) {
        window.StudyAI.openSettings();
      } else {
        var settingsBtn = document.getElementById('ai-settings-btn') || document.getElementById('ai-launcher-settings');
        if (settingsBtn) settingsBtn.click();
      }
      return;
    }

    if (action === 'reset-progress') {
      showResetConfirm();
      return;
    }

    if (action === 'open-exam-history') {
      closeDrawer();
      openExamHistoryModal();
      return;
    }
  });
}

// Reset Progress Confirmation Modal
function showResetConfirm() {
  var overlay = document.getElementById('tools-confirm-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'tools-confirm-overlay';
    overlay.className = 'tools-confirm-overlay';
    overlay.setAttribute('hidden', '');
    document.body.appendChild(overlay);
  }

  var title = '确认重置进度？';
  var body = '此操作会清空当前学习进度，是否继续？';
  var cancelText = '取消';
  var confirmText = '确认重置';
  if (window.I18n && typeof window.I18n.t === 'function') {
    title = window.I18n.t('tools.confirmResetTitle') || title;
    body = window.I18n.t('tools.confirmResetBody') || body;
    cancelText = window.I18n.t('tools.cancel') || cancelText;
    confirmText = window.I18n.t('tools.confirmReset') || confirmText;
  }

  overlay.innerHTML =
    '<div class="tools-confirm-box">' +
      '<h3>' + escapeHtml(title) + '</h3>' +
      '<p>' + escapeHtml(body) + '</p>' +
      '<div class="tools-confirm-actions">' +
        '<button class="tools-confirm-cancel" id="tools-confirm-cancel">' + escapeHtml(cancelText) + '</button>' +
        '<button class="tools-confirm-ok" id="tools-confirm-ok">' + escapeHtml(confirmText) + '</button>' +
      '</div>' +
    '</div>';

  overlay.removeAttribute('hidden');

  function closeConfirm() {
    overlay.setAttribute('hidden', '');
    overlay.innerHTML = '';
  }

  document.getElementById('tools-confirm-cancel').addEventListener('click', function () {
    closeConfirm();
  });

  document.getElementById('tools-confirm-ok').addEventListener('click', function () {
    closeConfirm();
    resetAllProgress(true);
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeConfirm();
  });

  var escHandler = function (e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();
      closeConfirm();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler, true);
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Progress UI Update
function updateProgressUI() {
  if (currentSubject === 'sql') {
    const total = SQL_LESSONS.length;
    const completedCount = completedLessons.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    document.getElementById("progress-percentage").innerText = `${pct}%`;
    document.getElementById("progress-fraction").innerText = `(${completedCount} / ${total})`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
  } else if (currentSubject === 'java') {
    const total = (typeof JAVA_LESSONS !== 'undefined') ? JAVA_LESSONS.length : 19;
    const completedCount = completedJavaLessons.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    document.getElementById("progress-percentage").innerText = `${pct}%`;
    document.getElementById("progress-fraction").innerText = `(${completedCount} / ${total})`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
    if (typeof JavaSandbox !== 'undefined') JavaSandbox.updateProgressDisplay();
  } else if (currentSubject === 'python') {
    const total = (typeof PYTHON_LESSONS !== 'undefined') ? PYTHON_LESSONS.length : 240;
    const completedCount = completedPythonLessons.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    document.getElementById("progress-percentage").innerText = `${pct}%`;
    document.getElementById("progress-fraction").innerText = `(${completedCount} / ${total})`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
    if (typeof PythonSandbox !== 'undefined') PythonSandbox.updateProgressDisplay();
  } else if (currentSubject === 'sg') {
    const total = (typeof SG_LESSONS !== 'undefined') ? SG_LESSONS.length : 23;
    const completedCount = completedSgLessons.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    document.getElementById("progress-percentage").innerText = `${pct}%`;
    document.getElementById("progress-fraction").innerText = `(${completedCount} / ${total})`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
  } else {
    const total = IT_PASSPORT_LESSONS.length;
    const completedCount = completedItPassLessons.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    document.getElementById("progress-percentage").innerText = `${pct}%`;
    document.getElementById("progress-fraction").innerText = `(${completedCount} / ${total})`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
  }
}

// Generate the sidebar categories and items
function initSidebar() {
  const navContainer = document.getElementById("lessons-nav");
  navContainer.innerHTML = "";
  const titleText = document.getElementById("sidebar-title-text");
  
  if (isCodingExamActiveAndRunning()) {
    titleText.innerText = "問題リスト (考题列表)";
    const qList = activeCodingExam.questions;
    qList.forEach((q, idx) => {
      const item = document.createElement("div");
      item.id = `nav-item-exam-${idx}`;
      
      const isCompleted = activeCodingExam.userStatuses[q.id] === 'passed';
      const isActive = idx === activeCodingExam.currentQIdx;
      item.className = `lesson-nav-item exam-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      
      let iconClass = "fa-regular fa-circle";
      if (isCompleted) {
        iconClass = "fa-solid fa-circle-check";
      } else if (activeCodingExam.userStatuses[q.id] === 'failed') {
        iconClass = "fa-solid fa-circle-xmark";
      }
      
      const isFlagged = activeCodingExam.flags[idx];
      const flagIcon = isFlagged ? ` <i class="fa-solid fa-flag" style="color:#f87171; font-size:10px; margin-left:4px;"></i>` : "";
      
      item.innerHTML = `
        <span>問 ${idx + 1}: ${q.titleJa}${flagIcon}</span>
        <i class="${iconClass} nav-status-icon" style="${activeCodingExam.userStatuses[q.id] === 'failed' ? 'color:#f87171;' : ''}"></i>
      `;
      
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        jumpToCodingQuestion(idx);
      });
      navContainer.appendChild(item);
    });
    return;
  }
  
  // 通用扁平两层侧边栏渲染器
  function renderFlatSidebar(lessonsList, completedList, currentId, selectFunc, idPrefix) {
    const chapters = {};
    lessonsList.forEach(lesson => {
      const chName = lesson.chapterName || "基本部分";
      if (!chapters[chName]) {
        chapters[chName] = { lessons: [] };
      }
      chapters[chName].lessons.push(lesson);
    });
    
    Object.keys(chapters).forEach((chapterName, chIdx) => {
      const chId = chIdx + 1;
      const chLessons = chapters[chapterName].lessons;
      
      const completedInCh = chLessons.filter(l => completedList.includes(l.id)).length;
      const hasActiveLesson = chLessons.some(l => l.id === currentId);
      
      const chHeader = document.createElement("div");
      chHeader.className = `sidebar-chapter-header ${hasActiveLesson ? 'active-parent expanded' : ''}`;
      chHeader.id = `${idPrefix}-chapter-header-${chId}`;
      chHeader.innerHTML = `
        <div class="chapter-header-title">
          <i class="fa-solid fa-chevron-right chapter-arrow"></i>
          <span>${chapterName}</span>
        </div>
        <span class="chapter-progress-badge">${completedInCh} / ${chLessons.length}</span>
      `;
      navContainer.appendChild(chHeader);
      
      const chBody = document.createElement("div");
      chBody.className = "sidebar-chapter-body";
      chBody.id = `${idPrefix}-chapter-body-${chId}`;
      chBody.style.display = hasActiveLesson ? "block" : "none";
      
      chHeader.addEventListener("click", () => {
        const isExpanded = chBody.style.display === "block";
        chBody.style.display = isExpanded ? "none" : "block";
        chHeader.classList.toggle("expanded", !isExpanded);
      });
      
      chLessons.forEach(lesson => {
        const item = document.createElement("div");
        // 兼容原版 SQL ID 结构
        if (idPrefix === "sql") {
          item.id = `nav-item-${lesson.id}`;
        } else {
          item.id = `nav-item-${idPrefix}-${lesson.id}`;
        }
        
        const isCompleted = completedList.includes(lesson.id);
        const isActive = lesson.id === currentId;
        item.className = `lesson-nav-item ${idPrefix}-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
        
        const iconClass = isCompleted ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
        
        // 渲染格式：小节编号 + 课件标题
        const displayTitleJa = lesson.subSectionId
          ? `${lesson.subSectionId} ${lesson.titleJa || lesson.titleZh}`
          : (lesson.titleJa || lesson.titleZh);
        const displayTitleZh = lesson.subSectionId
          ? `${lesson.subSectionId} ${lesson.titleZh || lesson.titleJa}`
          : (lesson.titleZh || lesson.titleJa);
        const displayTitle = (window.I18n && window.I18n.isActive())
          ? displayTitleJa
          : displayTitleZh;
          
        item.innerHTML = `
          <span data-i18n-source-lang="ja" data-i18n-source-text="${escapeAttr(displayTitleJa)}">${displayTitle}</span>
          <i class="${iconClass} nav-status-icon"></i>
        `;
        
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          selectFunc(lesson.id);
        });
        chBody.appendChild(item);
      });
      
      navContainer.appendChild(chBody);
    });
  }

  if (currentSubject === "sql") {
    titleText.innerText = "単元リスト (课程目录)";
    const lessonsList = typeof SQL_LESSONS !== 'undefined' ? SQL_LESSONS : [];
    renderFlatSidebar(lessonsList, completedLessons, currentLessonId, selectLesson, "sql");
  } else if (currentSubject === "java") {
    titleText.innerText = "Java コース (課程目録)";
    const bookLessons = typeof JAVA_LESSONS !== 'undefined'
      ? JAVA_LESSONS.filter(l => l.book === (currentJavaBook === 'nyumon' ? '入門編' : '実践編'))
      : [];
    renderFlatSidebar(bookLessons, completedJavaLessons, currentJavaLessonId, selectJavaLesson, "java");
  } else if (currentSubject === "python") {
    titleText.innerText = "Python コース (課程目録)";
    const lessonsList = typeof PYTHON_LESSONS !== 'undefined' ? PYTHON_LESSONS : [];
    renderFlatSidebar(lessonsList, completedPythonLessons, currentPythonLessonId, selectPythonLesson, "python");
  } else if (currentSubject === "sg") {
    titleText.innerText = "テキスト章節 (SG 教科书章节)";
    const lessonsList = typeof SG_LESSONS !== 'undefined' ? SG_LESSONS : [];
    renderFlatSidebar(lessonsList, completedSgLessons, currentSgLessonId, selectSgLesson, "sg");
  } else {
    titleText.innerText = "テキスト章節 (教科书章节)";
    const lessonsList = typeof IT_PASSPORT_LESSONS !== 'undefined' ? IT_PASSPORT_LESSONS : [];
    renderFlatSidebar(lessonsList, completedItPassLessons, currentItPassLessonId, selectItPassLesson, "itpass");
  }
  scrollSidebarToActive();
}

function scrollSidebarToActive() {
  let activeId;
  if (currentSubject === "sql") activeId = `nav-item-${currentLessonId}`;
  else if (currentSubject === "java") activeId = `nav-item-java-${currentJavaLessonId}`;
  else if (currentSubject === "python") activeId = `nav-item-python-${currentPythonLessonId}`;
  else if (currentSubject === "sg") activeId = `nav-item-sg-${currentSgLessonId}`;
  else activeId = `nav-item-itpass-${currentItPassLessonId}`;
  const activeItem = document.getElementById(activeId);
  if (activeItem) {
    activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

// Change selected SQL lesson
function selectLesson(id) {
  const oldActive = document.getElementById(`nav-item-${currentLessonId}`);
  if (oldActive) oldActive.classList.remove("active");
  
  currentLessonId = id;
  
  const newActive = document.getElementById(`nav-item-${currentLessonId}`);
  if (newActive) {
    newActive.classList.add("active");
    
    document.querySelectorAll(".sidebar-chapter-header").forEach(el => el.classList.remove("active-parent"));
    
    const chBody = newActive.parentElement;
    if (chBody && chBody.classList.contains("sidebar-chapter-body")) {
      const chHeader = chBody.previousElementSibling;
      if (chHeader && chHeader.classList.contains("sidebar-chapter-header")) {
        chHeader.classList.add("active-parent");
      }
    }
    
    newActive.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  
  loadLesson(currentLessonId);
}

// Change selected IT Passport lesson
function selectItPassLesson(id) {
  const oldActive = document.getElementById(`nav-item-itpass-${currentItPassLessonId}`);
  if (oldActive) oldActive.classList.remove("active");
  
  currentItPassLessonId = id;
  
  const newActive = document.getElementById(`nav-item-itpass-${currentItPassLessonId}`);
  if (newActive) {
    newActive.classList.add("active");
    
    document.querySelectorAll(".sidebar-chapter-header").forEach(el => el.classList.remove("active-parent"));
    
    const chBody = newActive.parentElement;
    if (chBody && chBody.classList.contains("sidebar-chapter-body")) {
      const chHeader = chBody.previousElementSibling;
      if (chHeader && chHeader.classList.contains("sidebar-chapter-header")) {
        chHeader.classList.add("active-parent");
      }
    }
    
    newActive.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  
  loadItPassLesson(currentItPassLessonId);
}

// Change selected SG lesson
function selectSgLesson(id) {
  const oldActive = document.getElementById(`nav-item-sg-${currentSgLessonId}`);
  if (oldActive) oldActive.classList.remove("active");
  
  currentSgLessonId = id;
  
  const newActive = document.getElementById(`nav-item-sg-${currentSgLessonId}`);
  if (newActive) {
    newActive.classList.add("active");
    
    document.querySelectorAll(".sidebar-chapter-header").forEach(el => el.classList.remove("active-parent"));
    
    const chBody = newActive.parentElement;
    if (chBody && chBody.classList.contains("sidebar-chapter-body")) {
      const chHeader = chBody.previousElementSibling;
      if (chHeader && chHeader.classList.contains("sidebar-chapter-header")) {
        chHeader.classList.add("active-parent");
      }
    }
    
    newActive.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  
  loadSgLesson(currentSgLessonId);
}

// Parse sub-sections dynamically from chapter concepts
function parseJavaSections(lesson) {
  const sections = [];
  const jaParts = lesson.conceptJa.split("<h3>");
  const zhParts = lesson.conceptZh.split("<h3>");
  
  const count = Math.min(jaParts.length, zhParts.length);
  for (let i = 1; i < count; i++) {
    const jaSub = jaParts[i].split("</h3>");
    const zhSub = zhParts[i].split("</h3>");
    
    sections.push({
      titleJa: jaSub[0].trim(),
      titleZh: zhSub[0].trim(),
      bodyJa: `<h3>${jaSub[0]}</h3>` + jaSub.slice(1).join("</h3>"),
      bodyZh: `<h3>${zhSub[0]}</h3>` + zhSub.slice(1).join("</h3>")
    });
  }
  
  if (sections.length === 0) {
    sections.push({
      titleJa: lesson.titleJa,
      titleZh: lesson.titleZh,
      bodyJa: lesson.conceptJa,
      bodyZh: lesson.conceptZh
    });
  }
  return sections;
}

// Change selected Java lesson
function selectJavaLesson(id) {
  const oldActive = document.getElementById(`nav-item-java-${currentJavaLessonId}`);
  if (oldActive) oldActive.classList.remove("active");
  
  currentJavaLessonId = id;
  
  const newActive = document.getElementById(`nav-item-java-${currentJavaLessonId}`);
  if (newActive) {
    newActive.classList.add("active");
    
    document.querySelectorAll(".sidebar-chapter-header").forEach(el => el.classList.remove("active-parent"));
    
    const chBody = newActive.parentElement;
    if (chBody && chBody.classList.contains("sidebar-chapter-body")) {
      const chHeader = chBody.previousElementSibling;
      if (chHeader && chHeader.classList.contains("sidebar-chapter-header")) {
        chHeader.classList.add("active-parent");
      }
    }
    
    newActive.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  
  loadJavaLesson(currentJavaLessonId);
}

// Select specific Java section (compatibility wrapper)
function selectJavaSection(lessonId, sectionIndex) {
  selectJavaLesson(lessonId);
}

// Switch between 入門編 and 実践編
function switchJavaBook(book) {
  currentJavaBook = book;
  javaSubMode = 'lessons';
  const examTab = document.getElementById("java-sub-tab-exam");
  if (examTab) examTab.classList.remove("active");
  JavaSandbox.setCurrentBook(book);

  document.getElementById("java-sub-tab-nyumon").classList.toggle("active", book === "nyumon");
  document.getElementById("java-sub-tab-jissen").classList.toggle("active", book === "jissen");
  
  handleSubModeViewToggle('lessons');
  
  // Set default lesson for this book
  if (typeof JAVA_LESSONS !== 'undefined') {
    const bookName = book === 'nyumon' ? '入門編' : '実践編';
    const first = JAVA_LESSONS.find(l => l.book === bookName);
    if (first) {
      currentJavaLessonId = first.id;
    }
  }
  
  initSidebar();
  loadJavaLesson(currentJavaLessonId);
}

// Load Java lesson into content panel
function loadJavaLesson(id) {
  document.body.classList.remove('mobile-sidebar-open');
  if (typeof JAVA_LESSONS === 'undefined') return;
  const lesson = JAVA_LESSONS.find(l => l.id === id);
  if (!lesson) return;
  
  currentJavaLessonId = id;

  // Resolve localized title/concept for current subject
  const localized = getLessonLocalizedText("java", lesson);

  // Header
  const badge = document.getElementById("lesson-section-badge");
  badge.innerText = `${lesson.book} — 第 ${lesson.subSectionId} 节`;
  badge.className = "lesson-badge java-badge";
  document.getElementById("lesson-title-ja").innerText = localized && localized.title ? localized.title : lesson.titleJa;
  document.getElementById("lesson-title-zh").innerText = lesson.titleZh;
  
  // 启用“显示原书 PDF”按钮！
  const pdfBtn = document.getElementById("locate-pdf-btn");
  if (pdfBtn) {
    pdfBtn.style.display = "inline-flex";
    pdfBtn.onclick = () => {
      const pdfName = lesson.book === "入門編" ? "java入門編.pdf" : "java実践編.pdf";
      openTextbookPdf(lesson.pdfPage, lesson.titleJa, pdfName);
    };
  }

  // Concept Body
  if (localized && localized.concept) {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(localized.concept);
  } else {
    document.getElementById("concept-ja-body").innerHTML = lesson.conceptJa;
  }
  document.getElementById("concept-zh-body").innerHTML = lesson.conceptZh;

  // Analogy
  document.getElementById("lesson-analogy").innerText = lesson.analogy || "";

  // Code Example
  const preBlock = document.getElementById("example-pre-block");
  const codeEl = document.getElementById("lesson-example");
  const copyBtn = document.getElementById("copy-example-btn");
  const glossaryBlock = document.getElementById("lesson-glossary");
  const exampleTitle = document.getElementById("example-header-title");

  // 收起代码面板
  const exCard = document.getElementById("example-card");
  exCard.classList.add("collapsed");
  preBlock.style.display = "none";
  glossaryBlock.style.display = "none";
  const exIcon = document.getElementById("example-toggle-icon");
  if (exIcon) exIcon.style.transform = "rotate(-90deg)";
  
  codeEl.textContent = lesson.example || "";
  codeEl.className = "language-java";
  copyBtn.style.display = "inline-flex";
  exampleTitle.innerHTML = `<i class="fa-brands fa-java"></i> Java コード例 (示例代码)`;

  // Vocab flashcards
  document.getElementById("java-vocab-section").style.display =
    (lesson.vocabList && lesson.vocabList.length > 0) ? "flex" : "none";
  
  // Quiz
  document.getElementById("itpass-quiz-nav").style.display = "none";
  loadJavaQuiz(lesson);

  if (window.I18n) window.I18n.applyLessonTranslation(lesson);

  // 加载代码沙箱（为了防止重复加载，我们以 大书-大章ID 变化为基准）
  const chapKey = `${lesson.book}-${lesson.chapterId}`;
  if (typeof JavaSandbox !== 'undefined' && lastLoadedJavaChapterId !== chapKey) {
    lastLoadedJavaChapterId = chapKey;
    JavaSandbox.loadLesson(lesson);
  }

  // Update lesson sandbox label
  const lbl = document.getElementById("java-sandbox-lesson-title");
  if (lbl) {
    lbl.textContent = `第 ${lesson.subSectionId} 节: ${lesson.titleJa}`;
  }

  // Scroll content to top
  document.querySelector(".lesson-content").scrollTop = 0;
}

// Load Java quiz
function loadJavaQuiz(lesson) {
  if (!lesson.quizList || lesson.quizList.length === 0) {
    document.getElementById("itpass-quiz-nav").style.display = "none";
    document.getElementById("quiz-question").innerText = "本章暂无课后练习。";
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }
  
  // Show navigation bar
  document.getElementById("itpass-quiz-nav").style.display = "flex";
  
  // Retrieve completed quizzes for this lesson from localStorage
  const completedJavaQuizSaved = localStorage.getItem(`java_quiz_completed_${lesson.id}`);
  let completedQuizIndices = [];
  if (completedJavaQuizSaved) {
    try {
      completedQuizIndices = JSON.parse(completedJavaQuizSaved);
    } catch(e) {
      completedQuizIndices = [];
    }
  }
  lesson.completedQuizIndices = completedQuizIndices;
  
  javaQuizIdx = 0;
  selectedJavaQuizOption = null;
  renderJavaQuizQuestion();
}

function renderJavaQuizQuestion() {
  const lesson = (typeof JAVA_LESSONS !== 'undefined') ? JAVA_LESSONS.find(l => l.id === currentJavaLessonId) : null;
  if (!lesson || !lesson.quizList || lesson.quizList.length === 0) return;

  const totalQuizzes = lesson.quizList.length;
  document.getElementById("itpass-quiz-progress-text").innerText = `問題 ${javaQuizIdx + 1} / 共 ${totalQuizzes} 题`;
  
  const quiz = lesson.quizList[javaQuizIdx];
  const useZhQuiz = selectedLang === 'zh' && !(window.I18n && window.I18n.isActive());
  document.getElementById("quiz-question").innerText = (useZhQuiz && quiz.questionZh) ? quiz.questionZh : quiz.question;
  
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";
  selectedJavaQuizOption = null;
  
  // Hide feedback
  const feedback = document.getElementById("quiz-feedback");
  feedback.className = "quiz-feedback hidden";
  
  quiz.options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "quiz-option";
    optDiv.innerHTML = `
      <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
      <div class="option-text">${opt}</div>
    `;
    optDiv.addEventListener("click", () => {
      document.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
      optDiv.classList.add("selected");
      selectedJavaQuizOption = idx;
    });
    optionsContainer.appendChild(optDiv);
  });
}

function javaQuizPrev() {
  if (javaQuizIdx > 0) {
    javaQuizIdx--;
    renderJavaQuizQuestion();
  } else {
    showToastKey("toast.alreadyFirst", "info");
  }
}

function javaQuizNext() {
  const lesson = (typeof JAVA_LESSONS !== 'undefined') ? JAVA_LESSONS.find(l => l.id === currentJavaLessonId) : null;
  if (lesson && javaQuizIdx < lesson.quizList.length - 1) {
    javaQuizIdx++;
    renderJavaQuizQuestion();
  } else {
    showToastKey("toast.alreadyLast", "info");
  }
}

// Unified Quiz Navigation Handlers
function quizPrev() {
  if (currentSubject === 'itpass') {
    itpassQuizPrev();
  } else if (currentSubject === 'java') {
    javaQuizPrev();
  } else if (currentSubject === 'sg') {
    sgQuizPrev();
  } else if (currentSubject === 'python') {
    pythonQuizPrev();
  }
}

function quizNext() {
  if (currentSubject === 'itpass') {
    itpassQuizNext();
  } else if (currentSubject === 'java') {
    javaQuizNext();
  } else if (currentSubject === 'sg') {
    sgQuizNext();
  } else if (currentSubject === 'python') {
    pythonQuizNext();
  }
}

// Mark Java lesson complete
function markJavaProgress(lessonId, action) {
  const key = 'java_progress_' + lessonId;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (action === 'quiz') data.quizDone = true;
  if (action === 'code_run') data.codeRun = true;
  localStorage.setItem(key, JSON.stringify(data));
  
  if (data.quizDone && !completedJavaLessons.includes(lessonId)) {
    completedJavaLessons.push(lessonId);
    saveProgress();
    
    // Update all section item checkmarks
    const lesson = (typeof JAVA_LESSONS !== 'undefined') ? JAVA_LESSONS.find(l => l.id === lessonId) : null;
    if (lesson) {
      const sections = parseJavaSections(lesson);
      sections.forEach((sec, secIdx) => {
        const navItem = document.getElementById(`nav-item-java-${lessonId}-${secIdx}`);
        if (navItem) {
          navItem.classList.add("completed");
          const icon = navItem.querySelector(".nav-status-icon");
          if (icon) icon.className = "fa-solid fa-circle-check";
        }
      });
      
      // Update chapter header progress badge
      const bookLessons = JAVA_LESSONS.filter(l => l.book === (currentJavaBook === 'nyumon' ? '入門編' : '実践編'));
      const chapIdx = bookLessons.findIndex(l => l.id === lessonId);
      if (chapIdx !== -1) {
        const badgeEl = document.querySelector(`#java-chapter-header-${chapIdx + 1} .java-progress-badge`);
        if (badgeEl) {
          badgeEl.textContent = `✓ ${sections.length}节`;
        }
      }
    }
    
    if (typeof JavaSandbox !== 'undefined') JavaSandbox.updateProgressDisplay();
    
    const title = lesson ? lesson.titleJa : lessonId;
    showToastKey("toast.lessonQuizPassed", "success", { title: title });
  }
}

/**
 * Resolve localized lesson title/concept from external language pack.
 * Currently supports: subject "sql", language en-US.
 * Falls back to null silently if ContentI18n is unavailable or no translation exists.
 */
function getLessonLocalizedText(subject, lesson) {
  if (!window.ContentI18n || !lesson || !lesson.id) return null;
  var lang = window.I18n && typeof window.I18n.getLanguage === "function"
    ? window.I18n.getLanguage()
    : "default-ja-zh";
  return window.ContentI18n.get(subject, lesson.id, lang);
}

// Load Lesson Details into Content Panel
function loadLesson(id) {
  document.body.classList.remove('mobile-sidebar-open');
  const lesson = SQL_LESSONS.find(l => l.id === id);
  if (!lesson) return;

  // Resolve localized title/concept for current subject
  const localized = getLessonLocalizedText("sql", lesson);

  // Header
  document.getElementById("lesson-section-badge").innerText = lesson.section;
  document.getElementById("lesson-title-ja").innerText = localized && localized.title ? localized.title : lesson.titleJa;
  document.getElementById("lesson-title-zh").innerText = lesson.titleZh;
  document.getElementById("locate-pdf-btn").style.display = "none";

  // Concept Body
  if (localized && localized.concept) {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(localized.concept);
  } else {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(lesson.conceptJa);
  }
  document.getElementById("concept-zh-body").innerHTML = formatMarkdown(lesson.conceptZh);
  
  // Analogy & Example
  document.getElementById("lesson-analogy").innerText = lesson.analogy;
  document.getElementById("lesson-example").innerText = lesson.example;
  
  // Collapse example card by default on SQL lesson load
  const exCardSql = document.getElementById("example-card");
  exCardSql.classList.add("collapsed");
  document.getElementById("example-pre-block").style.display = "none";
  document.getElementById("lesson-glossary").style.display = "none";
  const exIconSql = document.getElementById("example-toggle-icon");
  if (exIconSql) exIconSql.style.transform = "rotate(-90deg)";
  
  // Mission Task
  isRandomPracticeActive = false;
  updateMissionUI();

  // Reset editor text
  document.getElementById("sql-editor").value = "";
  updateLineNumbers();
  
  // Reset Console output and status
  resetOutputPlaceholder();
  
  // Initialize Quiz
  initQuiz(lesson);
  initFlashcards(id);
  if (window.I18n) window.I18n.applyLessonTranslation(lesson);
  
  // Hide IT Passport elements on quiz
  document.getElementById("itpass-quiz-nav").style.display = "none";
  
  // Scroll content to top
  document.querySelector(".lesson-content").scrollTop = 0;
}

// Load IT Passport Lesson details into Center
function loadItPassLesson(id) {
  document.body.classList.remove('mobile-sidebar-open');
  const lesson = IT_PASSPORT_LESSONS.find(l => l.id === id);
  if (!lesson) return;
  
  // Load checking quizzes completed index array
  const completedItPassQuizSaved = localStorage.getItem(`itpass_quiz_completed_${id}`);
  let completedQuizIndices = [];
  if (completedItPassQuizSaved) {
    try {
      completedQuizIndices = JSON.parse(completedItPassQuizSaved);
    } catch(e) {
      completedQuizIndices = [];
    }
  }
  lesson.completedQuizIndices = completedQuizIndices;
  
  // Reset active checking question
  itpassQuizIdx = 0;
  selectedItPassQuizOption = null;
  
  // Resolve localized text for IT Passport (Round 8.1 addition)
  const localized = getLessonLocalizedText("itpass", lesson);
  
  // Header details
  document.getElementById("lesson-section-badge").innerText = lesson.section;
  document.getElementById("lesson-title-ja").innerText = localized && localized.title ? localized.title : lesson.titleJa;
  document.getElementById("lesson-title-zh").innerText = lesson.titleZh;
  const locatePdfBtn = document.getElementById("locate-pdf-btn");
  locatePdfBtn.style.display = lesson.pdfPage ? "inline-flex" : "none";
  
  // Concepts & Analogy
  if (localized && localized.concept) {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(localized.concept);
  } else {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(lesson.conceptJa);
  }
  document.getElementById("concept-zh-body").innerHTML = formatMarkdown(lesson.conceptZh);
  document.getElementById("lesson-analogy").innerText = lesson.analogy;
  
  // Glossary card details
  const glossaryBlock = document.getElementById("lesson-glossary");
  const preBlock = document.getElementById("example-pre-block");
  const copyBtn = document.getElementById("copy-example-btn");
  const exampleHeaderTitle = document.getElementById("example-header-title");
  
  // Collapse example card by default on IT Passport lesson load
  const exCardItpass = document.getElementById("example-card");
  exCardItpass.classList.add("collapsed");
  preBlock.style.display = "none";
  copyBtn.style.display = "none";
  glossaryBlock.style.display = "none";
  const exIconItpass = document.getElementById("example-toggle-icon");
  if (exIconItpass) exIconItpass.style.transform = "rotate(-90deg)";
  exampleHeaderTitle.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> 重要用語・公式 (核心术语 & 公式)`;
  glossaryBlock.innerHTML = formatMarkdown(lesson.example);
  
  // Render Checklist
  renderChecklist(lesson);
  
  // Render Flashcards
  initFlashcards(id);
  
  // Show checking quizzes navigations
  document.getElementById("itpass-quiz-nav").style.display = "flex";
  
  // Render the quiz
  loadItPassChapterQuiz();
  if (window.I18n) window.I18n.applyLessonTranslation(lesson);
  
  // Auto-expand parent chapter accordion in sidebar
  const activeChapterId = lesson.chapterId;
  const chBody = document.getElementById(`chapter-body-${activeChapterId}`);
  const chHeader = document.getElementById(`chapter-header-${activeChapterId}`);
  if (chBody && chBody.style.display !== "block") {
    chBody.style.display = "block";
    if (chHeader) chHeader.classList.add("expanded");
  }
  
  // Update parent chapter active parent style
  document.querySelectorAll(".sidebar-chapter-header").forEach(el => el.classList.remove("active-parent"));
  if (chHeader) chHeader.classList.add("active-parent");
  
  // Reset scroll of lesson content
  document.querySelector(".lesson-content").scrollTop = 0;
}

// Load SG Lesson details into Center
function loadSgLesson(id) {
  document.body.classList.remove('mobile-sidebar-open');
  const lesson = SG_LESSONS.find(l => l.id === id);
  if (!lesson) return;
  
  // Load checking quizzes completed index array
  const completedSgQuizSaved = localStorage.getItem(`sg_quiz_completed_${id}`);
  let completedQuizIndices = [];
  if (completedSgQuizSaved) {
    try {
      completedQuizIndices = JSON.parse(completedSgQuizSaved);
    } catch(e) {
      completedQuizIndices = [];
    }
  }
  lesson.completedQuizIndices = completedQuizIndices;
  
  // Reset active checking question
  sgQuizIdx = 0;
  selectedSgQuizOption = null;
  
  // Resolve localized title/concept for current subject
  const localized = getLessonLocalizedText("sg", lesson);
  
  // Header details
  document.getElementById("lesson-section-badge").innerText = lesson.section;
  document.getElementById("lesson-title-ja").innerText = localized && localized.title ? localized.title : lesson.titleJa;
  document.getElementById("lesson-title-zh").innerText = lesson.titleZh;
  const locatePdfBtn = document.getElementById("locate-pdf-btn");
  locatePdfBtn.style.display = lesson.pdfPage ? "inline-flex" : "none";
  
  // Concepts & Analogy
  if (localized && localized.concept) {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(localized.concept);
  } else {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(lesson.conceptJa);
  }
  document.getElementById("concept-zh-body").innerHTML = formatMarkdown(lesson.conceptZh);
  document.getElementById("lesson-analogy").innerText = lesson.analogy;
  
  // Glossary card details
  const glossaryBlock = document.getElementById("lesson-glossary");
  const preBlock = document.getElementById("example-pre-block");
  const copyBtn = document.getElementById("copy-example-btn");
  const exampleHeaderTitle = document.getElementById("example-header-title");
  
  // Collapse example card by default on SG lesson load
  const exCardSg = document.getElementById("example-card");
  exCardSg.classList.add("collapsed");
  preBlock.style.display = "none";
  copyBtn.style.display = "none";
  glossaryBlock.style.display = "none";
  const exIconSg = document.getElementById("example-toggle-icon");
  if (exIconSg) exIconSg.style.transform = "rotate(-90deg)";
  exampleHeaderTitle.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> 重要用語・公式 (核心术语 & 公式)`;
  glossaryBlock.innerHTML = formatMarkdown(lesson.example);
  
  // Render Checklist
  renderChecklist(lesson);
  
  // Render Flashcards
  initFlashcards(id);
  
  // Show checking quizzes navigations
  document.getElementById("itpass-quiz-nav").style.display = "flex";
  
  // Render the quiz
  loadSgChapterQuiz();
  if (window.I18n) window.I18n.applyLessonTranslation(lesson);
  
  // Auto-expand parent chapter accordion in sidebar
  const activeChapterId = lesson.chapterId;
  const chBody = document.getElementById(`sg-chapter-body-${activeChapterId}`);
  const chHeader = document.getElementById(`sg-chapter-header-${activeChapterId}`);
  if (chBody && chBody.style.display !== "block") {
    chBody.style.display = "block";
    if (chHeader) chHeader.classList.add("expanded");
  }
  
  // Update parent chapter active parent style
  document.querySelectorAll(".sidebar-chapter-header").forEach(el => el.classList.remove("active-parent"));
  if (chHeader) chHeader.classList.add("active-parent");
  
  // Reset scroll of lesson content
  document.querySelector(".lesson-content").scrollTop = 0;
}

// Simple parser to render basic markdown bold, code blocks, and fenced code blocks into HTML safely
function formatMarkdown(text) {
  if (!text) return "";

  // Step 1: Extract fenced code blocks (``` ... ```) and replace with placeholders
  let codeBlocks = [];
  let idx = 0;
  let working = text;

  const fencedRegex = /```([a-zA-Z0-9_+-]*)\s*\n([\s\S]*?)```/gm;
  working = working.replace(fencedRegex, function(match, lang, code) {
    const placeholder = "@@CODE_BLOCK_" + idx + "@@";
    const safeLang = /^[a-zA-Z0-9_+-]*$/.test(lang) ? lang : "";
    const escapedCode = String(code || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const langClass = safeLang ? " class=\"language-" + safeLang + "\"" : "";
    const html = "<pre><code" + langClass + ">" + escapedCode + "</code></pre>";
    codeBlocks.push(html);
    idx++;
    return placeholder;
  });

  // Step 2: Escape HTML in the remaining text
  let escaped = working
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Step 3: Replace **bold** with <strong>bold</strong>
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Step 4: Replace `code` with <code>code</code>
  escaped = escaped.replace(/`(.*?)`/g, "<code>$1</code>");

  // Step 5: Highlight bilingual SQL and IT terms
  escaped = escaped.replace(/([ぁ-んァ-ヶa-zA-Z0-9_ー]+)\s*\((AND|OR|WHERE|SELECT|LIMIT|ORDER BY|GROUP BY|HAVING|JOIN|INNER JOIN|LEFT JOIN|SUM|AVG|COUNT|MAX|MIN|BETWEEN|LIKE|IS NULL|IS NOT NULL|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|COMMIT|ROLLBACK|CPU|RAM|ROM|HDD|SSD|OS|WAF|RAID|MTBF|MTTR|SLA|DNS|DHCP|VoIP|SWOT|PPM|ERP|SCM|CRM|DX|ROI|!=|&lt;&gt;|=|\s*&gt;=\s*|\s*&lt;=\s*|\s*&gt;\s*|\s*&lt;\s*)\)/g, '<span class="vocab-highlight">$1 ($2)</span>');

  // Step 6: Restore code block placeholders (use callback to avoid $1/$& replacement pattern issues)
  for (let i = 0; i < codeBlocks.length; i++) {
    escaped = escaped.replace(new RegExp("@@CODE_BLOCK_" + i + "@@", "g"), function() { return codeBlocks[i]; });
  }

  return escaped;
}

// Set translation tab view
function setLangView(view) {
  selectedLang = view;
  
  // Update button tabs
  document.querySelectorAll(".lang-tab").forEach(tab => {
    if (tab.getAttribute("data-lang") === view) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  
  const container = document.getElementById("concept-container");
  const jaCol = document.querySelector(".ja-col");
  const zhCol = document.querySelector(".zh-col");
  
  if (view === 'both') {
    jaCol.style.display = 'flex';
    zhCol.style.display = 'flex';
    container.style.flexDirection = 'row';
  } else if (view === 'ja') {
    jaCol.style.display = 'flex';
    zhCol.style.display = 'none';
  } else {
    jaCol.style.display = 'none';
    zhCol.style.display = 'flex';
  }

  if (window.I18n) {
    window.refreshI18nForCurrentLesson();
    window.I18n.scheduleTranslate(document.body);
  }
}

function getCurrentLessonForI18n() {
  if (currentSubject === 'sql' && typeof SQL_LESSONS !== 'undefined') {
    return SQL_LESSONS.find(l => l.id === currentLessonId);
  }
  if (currentSubject === 'java' && typeof JAVA_LESSONS !== 'undefined') {
    return JAVA_LESSONS.find(l => l.id === currentJavaLessonId);
  }
  if (currentSubject === 'python' && typeof PYTHON_LESSONS !== 'undefined') {
    return PYTHON_LESSONS.find(l => l.id === currentPythonLessonId);
  }
  if (currentSubject === 'sg' && typeof SG_LESSONS !== 'undefined') {
    return SG_LESSONS.find(l => l.id === currentSgLessonId);
  }
  if (typeof IT_PASSPORT_LESSONS !== 'undefined') {
    return IT_PASSPORT_LESSONS.find(l => l.id === currentItPassLessonId);
  }
  return null;
}

function refreshI18nForCurrentLesson() {
  const lesson = getCurrentLessonForI18n();
  if (lesson && window.I18n) {
    window.I18n.applyLessonTranslation(lesson);
  }
}

window.refreshI18nForCurrentLesson = refreshI18nForCurrentLesson;

// Copy Code Example to Playground Editor
function copyExampleToPlayground() {
  const exampleCode = document.getElementById("lesson-example").innerText;
  if (currentSubject === 'java') {
    // Copy to Java sandbox editor
    const javaEditor = document.getElementById("java-editor");
    if (javaEditor) {
      javaEditor.value = exampleCode;
      javaEditor.focus();
      if (typeof JavaSandbox !== 'undefined') {
        // trigger line numbers update
        javaEditor.dispatchEvent(new Event('input'));
      }
    }
  } else {
    const editor = document.getElementById("sql-editor");
    editor.value = exampleCode;
    editor.focus();
    updateLineNumbers();
  }
}

// Setup SQL Quiz
function initQuiz(lesson) {
  const quiz = lesson.quiz;
  document.getElementById("quiz-question").innerText = quiz.question;
  
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";
  selectedQuizOption = null;
  
  // Hide feedback
  const feedback = document.getElementById("quiz-feedback");
  feedback.className = "quiz-feedback hidden";
  
  quiz.options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "quiz-option";
    optDiv.innerHTML = `
      <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
      <div class="option-text">${opt}</div>
    `;
    optDiv.addEventListener("click", () => {
      document.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
      optDiv.classList.add("selected");
      selectedQuizOption = idx;
    });
    optionsContainer.appendChild(optDiv);
  });
}

// Setup IT Passport Chapter specific quizzes
function loadItPassChapterQuiz() {
  const lesson = IT_PASSPORT_LESSONS.find(l => l.id === currentItPassLessonId);
  if (!lesson || !lesson.quizList || lesson.quizList.length === 0) {
    document.getElementById("itpass-quiz-nav").style.display = "none";
    document.getElementById("quiz-question").innerText = "本章暂无课后练习小测。";
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }
  
  const totalQuizzes = lesson.quizList.length;
  document.getElementById("itpass-quiz-progress-text").innerText = `問題 ${itpassQuizIdx + 1} / 共 ${totalQuizzes} 题`;
  
  const quiz = lesson.quizList[itpassQuizIdx];
  document.getElementById("quiz-question").innerText = quiz.question;
  
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";
  selectedItPassQuizOption = null;
  
  // Hide feedback
  const feedback = document.getElementById("quiz-feedback");
  feedback.className = "quiz-feedback hidden";
  
  quiz.options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "quiz-option";
    optDiv.innerHTML = `
      <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
      <div class="option-text">${opt}</div>
    `;
    optDiv.addEventListener("click", () => {
      document.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
      optDiv.classList.add("selected");
      selectedItPassQuizOption = idx;
    });
    optionsContainer.appendChild(optDiv);
  });
}

function itpassQuizPrev() {
  if (itpassQuizIdx > 0) {
    itpassQuizIdx--;
    loadItPassChapterQuiz();
  } else {
    showToastKey("toast.alreadyFirst", "info");
  }
}

function itpassQuizNext() {
  const lesson = IT_PASSPORT_LESSONS.find(l => l.id === currentItPassLessonId);
  if (lesson && itpassQuizIdx < lesson.quizList.length - 1) {
    itpassQuizIdx++;
    loadItPassChapterQuiz();
  } else {
    showToastKey("toast.alreadyLast", "info");
  }
}

// Setup SG Chapter specific quizzes
function loadSgChapterQuiz() {
  const lesson = SG_LESSONS.find(l => l.id === currentSgLessonId);
  if (!lesson || !lesson.quizList || lesson.quizList.length === 0) {
    document.getElementById("itpass-quiz-nav").style.display = "none";
    document.getElementById("quiz-question").innerText = "本章暂无课后练习小测。";
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }
  
  const totalQuizzes = lesson.quizList.length;
  document.getElementById("itpass-quiz-progress-text").innerText = `問題 ${sgQuizIdx + 1} / 共 ${totalQuizzes} 题`;
  
  const quiz = lesson.quizList[sgQuizIdx];
  document.getElementById("quiz-question").innerText = quiz.question;
  
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";
  selectedSgQuizOption = null;
  
  // Hide feedback
  const feedback = document.getElementById("quiz-feedback");
  feedback.className = "quiz-feedback hidden";
  
  quiz.options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "quiz-option";
    optDiv.innerHTML = `
      <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
      <div class="option-text">${opt}</div>
    `;
    optDiv.addEventListener("click", () => {
      document.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
      optDiv.classList.add("selected");
      selectedSgQuizOption = idx;
    });
    optionsContainer.appendChild(optDiv);
  });
}

function sgQuizPrev() {
  if (sgQuizIdx > 0) {
    sgQuizIdx--;
    loadSgChapterQuiz();
  } else {
    showToastKey("toast.alreadyFirst", "info");
  }
}

function sgQuizNext() {
  const lesson = SG_LESSONS.find(l => l.id === currentSgLessonId);
  if (lesson && sgQuizIdx < lesson.quizList.length - 1) {
    sgQuizIdx++;
    loadSgChapterQuiz();
  } else {
    showToastKey("toast.alreadyLast", "info");
  }
}

// Mark Lesson Completed for SG
function markSgLessonComplete(id) {
  if (!completedSgLessons.includes(id)) {
    completedSgLessons.push(id);
    saveProgress();
    
    const navItem = document.getElementById(`nav-item-sg-${id}`);
    if (navItem) {
      navItem.classList.add("completed");
      const icon = navItem.querySelector(".nav-status-icon");
      if (icon) {
        icon.className = "fa-solid fa-circle-check";
      }
    }
    
    // Update parent chapter progress badge in sidebar
    updateSgChapterProgressBadge(id);
    
    const lesson = SG_LESSONS.find(l => l.id === id);
    const displayTitle = lesson ? lesson.titleZh : `第 ${id} 节`;
    showToastKey("toast.lessonQuizPassed", "success", { title: displayTitle });
  }
}

// Update parent chapter progress badge helper for SG
function updateSgChapterProgressBadge(lessonId) {
  const lesson = SG_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  
  const chapterName = lesson.chapterName;
  const chapterLessons = SG_LESSONS.filter(l => l.chapterName === chapterName);
  const chId = lesson.chapterId;
  
  const completedInCh = chapterLessons.filter(l => completedSgLessons.includes(l.id)).length;
  const badge = document.querySelector(`#sg-chapter-header-${chId} .chapter-progress-badge`);
  if (badge) {
    badge.innerText = `${completedInCh} / ${chapterLessons.length}`;
  }
}

// Check Quiz Answer for SQL or IT Passport
function checkQuizAnswer() {
  if (currentSubject === 'sql') {
    const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
    if (!lesson) return;
    const feedback = document.getElementById("quiz-feedback");
    if (selectedQuizOption === null) {
      feedback.innerText = "選択肢を選んでください。(请选择一个选项。)";
      feedback.className = "quiz-feedback error";
      return;
    }
    if (selectedQuizOption === lesson.quiz.answerIdx) {
      feedback.innerHTML = `<strong>正解！(答对了！)</strong><br>${lesson.quiz.hint}`;
      feedback.className = "quiz-feedback success";
      markLessonComplete(currentLessonId);
    } else {
      feedback.innerHTML = `<strong>不正解。(答错了，再想想。)</strong><br>ヒント: ${lesson.quiz.hint}`;
      feedback.className = "quiz-feedback error";
    }
  } else if (currentSubject === 'java') {
    // Java Mode
    const lesson = (typeof JAVA_LESSONS !== 'undefined') ? JAVA_LESSONS.find(l => l.id === currentJavaLessonId) : null;
    if (!lesson || !lesson.quizList || lesson.quizList.length === 0) return;
    const quiz = lesson.quizList[javaQuizIdx];
    const feedback = document.getElementById("quiz-feedback");
    if (selectedJavaQuizOption === null) {
      feedback.innerText = "選択肢を選んでください。(请选择一个选项。)";
      feedback.className = "quiz-feedback error";
      return;
    }
    if (selectedJavaQuizOption === quiz.answerIdx) {
      feedback.innerHTML = `<strong>正解！(答对了！)</strong><br>${quiz.hint}`;
      feedback.className = "quiz-feedback success";
      
      // Store completed quizzes indexes
      if (!lesson.completedQuizIndices) {
        lesson.completedQuizIndices = [];
      }
      if (!lesson.completedQuizIndices.includes(javaQuizIdx)) {
        lesson.completedQuizIndices.push(javaQuizIdx);
        localStorage.setItem(`java_quiz_completed_${currentJavaLessonId}`, JSON.stringify(lesson.completedQuizIndices));
      }
      
      // If all quizzes are complete, mark chapter complete
      if (lesson.completedQuizIndices.length === lesson.quizList.length) {
        markJavaProgress(currentJavaLessonId, 'quiz');
      }
    } else {
      feedback.innerHTML = `<strong>不正解。(答错了，再想想。)</strong><br>ヒント: ${quiz.hint}`;
      feedback.className = "quiz-feedback error";
    }
  } else if (currentSubject === 'python') {
    const lesson = (typeof PYTHON_LESSONS !== 'undefined') ? PYTHON_LESSONS.find(l => l.id === currentPythonLessonId) : null;
    if (!lesson || !lesson.quizList || lesson.quizList.length === 0) return;
    const quiz = lesson.quizList[pythonQuizIdx];
    const feedback = document.getElementById("quiz-feedback");
    if (selectedPythonQuizOption === null) {
      feedback.innerText = "请选择一个选项。 / 選択肢を選んでください。";
      feedback.className = "quiz-feedback error";
      return;
    }
    const isCorrect = selectedPythonQuizOption === quiz.answerIdx;
    feedback.innerHTML = isCorrect
      ? `<strong>回答正确！ / 正解！</strong><br>${quiz.hint}`
      : `<strong>回答错误，请再想想。 / 不正解です。</strong><br>${quiz.hint}`;
    feedback.className = `quiz-feedback ${isCorrect ? 'success' : 'error'}`;
    if (isCorrect) {
      if (!lesson.completedQuizIndices) lesson.completedQuizIndices = [];
      if (!lesson.completedQuizIndices.includes(pythonQuizIdx)) {
        lesson.completedQuizIndices.push(pythonQuizIdx);
        localStorage.setItem(`python_quiz_completed_${currentPythonLessonId}`, JSON.stringify(lesson.completedQuizIndices));
      }
      if (lesson.completedQuizIndices.length === lesson.quizList.length) {
        markPythonProgress(currentPythonLessonId, 'quiz');
      }
    }
    if (window.StudyAI) StudyAI.track({
      subject: 'python',
      eventType: 'quiz_answer',
      itemId: currentPythonLessonId,
      topic: lesson.titleZh || lesson.titleJa,
      success: isCorrect,
      score: isCorrect ? 100 : 0
    });
  } else if (currentSubject === 'sg') {
    // SG Mode
    const lesson = (typeof SG_LESSONS !== 'undefined') ? SG_LESSONS.find(l => l.id === currentSgLessonId) : null;
    if (!lesson || !lesson.quizList || lesson.quizList.length === 0) return;
    const quiz = lesson.quizList[sgQuizIdx];
    const feedback = document.getElementById("quiz-feedback");
    
    if (selectedSgQuizOption === null) {
      feedback.innerText = "選択肢を選んでください。(请选择一个选项。)";
      feedback.className = "quiz-feedback error";
      return;
    }
    
    if (selectedSgQuizOption === quiz.answerIdx) {
      feedback.innerHTML = `<strong>正解！(答对了！)</strong><br>${quiz.hint}`;
      feedback.className = "quiz-feedback success";
      
      // Store completed quizzes indexes
      if (!lesson.completedQuizIndices) {
        lesson.completedQuizIndices = [];
      }
      if (!lesson.completedQuizIndices.includes(sgQuizIdx)) {
        lesson.completedQuizIndices.push(sgQuizIdx);
        localStorage.setItem(`sg_quiz_completed_${currentSgLessonId}`, JSON.stringify(lesson.completedQuizIndices));
      }
      
      // If all quizzes are complete, mark chapter complete
      if (lesson.completedQuizIndices.length === lesson.quizList.length) {
        markSgLessonComplete(currentSgLessonId);
      }
    } else {
      feedback.innerHTML = `<strong>不正解。(答错了，再想想。)</strong><br>ヒント: ${quiz.hint}`;
      feedback.className = "quiz-feedback error";
    }
  } else {
    // IT Passport Mode
    const lesson = IT_PASSPORT_LESSONS.find(l => l.id === currentItPassLessonId);
    if (!lesson || !lesson.quizList) return;
    const quiz = lesson.quizList[itpassQuizIdx];
    const feedback = document.getElementById("quiz-feedback");
    
    if (selectedItPassQuizOption === null) {
      feedback.innerText = "選択肢を選んでください。(请选择一个选项。)";
      feedback.className = "quiz-feedback error";
      return;
    }
    
    if (selectedItPassQuizOption === quiz.answerIdx) {
      feedback.innerHTML = `<strong>正解！(答对了！)</strong><br>${quiz.hint}`;
      feedback.className = "quiz-feedback success";
      
      // Store completed quizzes indexes
      if (!lesson.completedQuizIndices.includes(itpassQuizIdx)) {
        lesson.completedQuizIndices.push(itpassQuizIdx);
        localStorage.setItem(`itpass_quiz_completed_${currentItPassLessonId}`, JSON.stringify(lesson.completedQuizIndices));
      }
      
      // If all quizzes are complete, mark chapter complete
      if (lesson.completedQuizIndices.length === lesson.quizList.length) {
        markItPassLessonComplete(currentItPassLessonId);
      }
    } else {
      feedback.innerHTML = `<strong>不正解。(答错了，再想想。)</strong><br>ヒント: ${quiz.hint}`;
      feedback.className = "quiz-feedback error";
    }
  }
}

// Mark Lesson Completed for SQL
function markLessonComplete(id) {
  if (!completedLessons.includes(id)) {
    completedLessons.push(id);
    saveProgress();
    
    // Update sidebar navigation list item
    const navItem = document.getElementById(`nav-item-${id}`);
    if (navItem) {
      navItem.classList.add("completed");
      const icon = navItem.querySelector(".nav-status-icon");
      if (icon) {
        icon.className = "fa-solid fa-circle-check";
      }
    }
  }
}

// Mark Lesson Completed for IT Passport
function markItPassLessonComplete(id) {
  if (!completedItPassLessons.includes(id)) {
    completedItPassLessons.push(id);
    saveProgress();
    
    const navItem = document.getElementById(`nav-item-itpass-${id}`);
    if (navItem) {
      navItem.classList.add("completed");
      const icon = navItem.querySelector(".nav-status-icon");
      if (icon) {
        icon.className = "fa-solid fa-circle-check";
      }
    }
    
    // Update parent chapter progress badge in sidebar
    updateChapterProgressBadge(id);
    
    const lesson = IT_PASSPORT_LESSONS.find(l => l.id === id);
    const displayTitle = lesson ? lesson.titleZh : `第 ${id} 节`;
    showToastKey("toast.lessonQuizPassed", "success", { title: displayTitle });
  }
}

// Update parent chapter progress badge helper
function updateChapterProgressBadge(lessonId) {
  const lesson = IT_PASSPORT_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  
  const chapterName = lesson.chapterName;
  const chapterLessons = IT_PASSPORT_LESSONS.filter(l => l.chapterName === chapterName);
  const chId = lesson.chapterId;
  
  const completedInCh = chapterLessons.filter(l => completedItPassLessons.includes(l.id)).length;
  const badge = document.querySelector(`#chapter-header-${chId} .chapter-progress-badge`);
  if (badge) {
    badge.innerText = `${completedInCh} / ${chapterLessons.length}`;
  }
}

// Line Numbers Helper for Editor
function setupEditorLineNumbers() {
  const editor = document.getElementById("sql-editor");
  editor.addEventListener("input", updateLineNumbers);
  editor.addEventListener("scroll", () => {
    const lineNumbers = document.getElementById("line-numbers");
    lineNumbers.scrollTop = editor.scrollTop;
  });
}

function updateLineNumbers() {
  const editor = document.getElementById("sql-editor");
  const lineNumbers = document.getElementById("line-numbers");
  const lines = editor.value.split('\n').length;
  let linesHtml = '';
  for (let i = 1; i <= lines; i++) {
    linesHtml += `${i}<br>`;
  }
  lineNumbers.innerHTML = linesHtml;
}

// DB Schema Visualizer
function initSchemaVisualizer() {
  const tabsContainer = document.getElementById("schema-tabs");
  tabsContainer.innerHTML = "";
  
  // Filter tables by current DB group
  const groupTables = DB_GROUPS[currentDBGroup] || Object.keys(DB_SCHEMA);
  const firstTable = groupTables.includes(selectedSchemaTable) ? selectedSchemaTable : groupTables[0];
  selectedSchemaTable = firstTable;

  groupTables.forEach(tableName => {
    const tab = document.createElement("button");
    tab.className = `schema-tab ${tableName === selectedSchemaTable ? 'active' : ''}`;
    tab.innerText = tableName;
    tab.addEventListener("click", () => selectSchemaTable(tableName));
    tabsContainer.appendChild(tab);
  });
  
  renderSchemaDetails(selectedSchemaTable);
}

// Switch DB group (school / shop)
function switchDBGroup(group) {
  if (currentDBGroup === group) return;
  currentDBGroup = group;
  // Update tab UI
  document.querySelectorAll('.db-group-tab').forEach(btn => {
    btn.classList.toggle('active', btn.id === `db-tab-${group}`);
  });
  // Reset selected schema table to first in group
  selectedSchemaTable = (DB_GROUPS[group] || [])[0] || 'students_mst';
  initSchemaVisualizer();
  // Open the schema panel so user can see the switch
  const body = document.getElementById('schema-body');
  const header = document.querySelector('.schema-header');
  const icon = document.getElementById('schema-toggle-icon');
  if (body && body.style.display === 'none') {
    body.style.display = 'flex';
    header.classList.remove('collapsed');
    icon.style.transform = 'rotate(0deg)';
  }
  showToastKey("toast.dbSwitched", "info", {
    dbName: group === 'shop' ? 'Bookstore / ブック店' : 'School / 学校',
    tables: DB_GROUPS[group].join(', ')
  });
}

function selectSchemaTable(tableName) {
  document.querySelectorAll(".schema-tab").forEach(tab => {
    if (tab.innerText === tableName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  selectedSchemaTable = tableName;
  renderSchemaDetails(tableName);
}

function renderSchemaDetails(tableName) {
  const meta = DB_SCHEMA[tableName];
  const detailsContainer = document.getElementById("schema-table-details");
  if (!meta) return;
  
  let html = `
    <h6>列構成 (字段信息) &bull; ${tableName}</h6>
    <ul class="schema-col-list">
  `;
  
  meta.columns.forEach(col => {
    const pkGlow = col.primary ? ' <i class="fa-solid fa-key" style="color: #fbbf24; font-size:10px;"></i>' : '';
    html += `
      <li>
        <div>
          <span class="schema-col-name ${col.primary ? 'primary-key' : ''}">${col.name}${pkGlow}</span>
          <span class="schema-col-desc">(${col.desc})</span>
        </div>
        <span class="schema-col-type">${col.type}</span>
      </li>
    `;
  });
  
  html += `
    </ul>
    <button class="console-btn" style="margin-top: 10px; width: 100%; justify-content: center; background: rgba(255,255,255,0.03);" onclick="previewTableData('${tableName}')">
      <i class="fa-solid fa-table"></i> テーブルをプレビュー (预览此表数据)
    </button>
  `;
  
  detailsContainer.innerHTML = html;
}

// Preview Data directly into SQL Editor
function previewTableData(tableName) {
  const editor = document.getElementById("sql-editor");
  editor.value = `SELECT * FROM ${tableName};`;
  editor.focus();
  updateLineNumbers();
  runPlaygroundQuery();
}

// Reset output container to initial state
function resetOutputPlaceholder() {
  const outputBody = document.getElementById("output-body");
  const countBadge = document.getElementById("output-row-count");
  countBadge.style.display = "none";
  outputBody.innerHTML = `
    <div class="output-placeholder">
      <i class="fa-solid fa-arrow-up-long"></i>
      <p>クエリを実行すると、ここに結果テーブルが表示されます。</p>
      <span>(执行 SQL 后，查询结果表格将在此处显示)</span>
    </div>
  `;
  
  // Status text resetting
  const statusDiv = document.getElementById("playground-status");
  statusDiv.innerHTML = `<span class="status-ready"><i class="fa-solid fa-circle-play"></i> 已就绪 (Ready)</span>`;
}

// Reset Database Mock State
function resetMockDB() {
  if (confirmKey("dialog.resetDbConfirm")) {
    sqlEngine.reset();
    showToastKey("toast.dbReset", "success");
    resetOutputPlaceholder();
  }
}

// Show toast notification (replaces alert)
function showToast(message, type = 'info') {
  // Remove existing toasts
  document.querySelectorAll('.sql-toast').forEach(t => t.remove());
  
  const toast = document.createElement('div');
  toast.className = `sql-toast sql-toast-${type}`;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info'}"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => toast.classList.add('visible'));
  
  // Auto-remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Hints for the task
function showPlaygroundHint() {
  const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
  if (!lesson) return;
  const exampleCode = isRandomPracticeActive && lesson.randomExercise
    ? lesson.randomExercise.example
    : lesson.example;
  showToastKey("toast.sqlHint", "info", { code: exampleCode });
}

// Run Query
function runPlaygroundQuery() {
  const editor = document.getElementById("sql-editor");
  const sql = editor.value.trim();
  
  if (!sql) {
    alertKey("message.inputSqlRequired");
    return;
  }
  
  // Auto-expand output card if it is collapsed
  const outputCard = document.getElementById("output-card");
  if (outputCard && outputCard.classList.contains("collapsed")) {
    toggleOutputDetails();
  }
  
  const statusDiv = document.getElementById("playground-status");
  const outputBody = document.getElementById("output-body");
  const countBadge = document.getElementById("output-row-count");
  
  // Run SQL logic through engine
  const res = sqlEngine.execute(sql);
  
  if (res.success) {
    // Show success status
    statusDiv.innerHTML = `<span class="status-success"><i class="fa-solid fa-circle-check"></i> 执行成功</span>`;
    
    // Render result table
    let tableHtml = "";
    
    if (res.message) {
      tableHtml += `<div class="output-message-box"><i class="fa-solid fa-circle-info"></i> ${res.message}</div>`;
    }
    
    if (res.columns && res.columns.length > 0) {
      countBadge.innerText = `${res.rows.length}行`;
      countBadge.style.display = "inline";
      
      tableHtml += `<div class="table-scroll-wrapper"><table class="result-table"><thead><tr>`;
      res.columns.forEach(col => {
        tableHtml += `<th>${col}</th>`;
      });
      tableHtml += `</tr></thead><tbody>`;

      res.rows.forEach(row => {
        tableHtml += `<tr>`;
        row.forEach(cell => {
          tableHtml += `<td>${cell === null ? '<span style="color:#64748b; font-style:italic;">NULL</span>' : cell}</td>`;
        });
        tableHtml += `</tr>`;
      });
      tableHtml += `</tbody></table></div>`;
    } else {
      countBadge.style.display = "none";
    }
    
    outputBody.innerHTML = tableHtml;
    
    // Validate whether the query matches the task goal
    validateTaskCompletion(sql);
    if (window.StudyAI) StudyAI.gradeGeneratedExecution('sql', res);
    if (window.StudyAI) {
      const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
      StudyAI.track({
        subject: 'sql',
        eventType: 'code_run',
        itemId: currentLessonId,
        topic: lesson ? (lesson.titleZh || lesson.titleJa) : 'SQL playground',
        success: true,
        metadata: { rowCount: res.rows ? res.rows.length : 0 }
      });
    }
    
  } else {
    // Show failed status
    statusDiv.innerHTML = `<span class="status-error"><i class="fa-solid fa-circle-exclamation"></i> 语法错误</span>`;
    countBadge.style.display = "none";
    
    // Render error message
    outputBody.innerHTML = `
      <div class="output-error-box">
        <i class="fa-solid fa-triangle-exclamation"></i> SQLエラー:<br><br>${res.error}
      </div>
    `;
    if (window.StudyAI) {
      const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
      StudyAI.track({
        subject: 'sql',
        eventType: 'code_run',
        itemId: currentLessonId,
        topic: lesson ? (lesson.titleZh || lesson.titleJa) : 'SQL playground',
        success: false,
        errorType: 'sql_error',
        metadata: { error: String(res.error || '').slice(0, 500) }
      });
    }
  }
}

// Validate task logic
function validateTaskCompletion(userSql) {
  const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
  if (!lesson) return;
  
  // Match check using pattern
  const expectedPattern = isRandomPracticeActive && lesson.randomExercise 
    ? lesson.randomExercise.expectedQuery 
    : lesson.expectedQuery;
    
  const isMatch = expectedPattern.test(userSql);
  
  if (isMatch) {
    // Show positive reinforcement in playground status
    const statusDiv = document.getElementById("playground-status");
    if (isRandomPracticeActive) {
      statusDiv.innerHTML = `<span class="status-success"><i class="fa-solid fa-star"></i> 随机练习达成！</span>`;
    } else {
      statusDiv.innerHTML = `<span class="status-success"><i class="fa-solid fa-star"></i> 任务完成！</span>`;
    }
    
    // Mark completed
    markLessonComplete(currentLessonId);
  }
}

// Toggle Schema View Card visibility (collapsible)
function toggleSchemaDetails() {
  const card = document.querySelector(".schema-card");
  const header = document.querySelector(".schema-header");
  const body = document.getElementById("schema-body");
  const icon = document.getElementById("schema-toggle-icon");
  
  const isCollapsed = body.style.display === "none";
  if (isCollapsed) {
    body.style.display = "flex";
    card.classList.remove("collapsed");
    header.classList.remove("collapsed");
    icon.style.transform = "rotate(0deg)";
  } else {
    body.style.display = "none";
    card.classList.add("collapsed");
    header.classList.add("collapsed");
    icon.style.transform = "rotate(-90deg)";
  }
}

// Toggle SQL Playground Console Card visibility (collapsible)
function toggleConsoleDetails() {
  const card = document.querySelector(".console-card");
  const header = document.querySelector(".console-header");
  const body = document.getElementById("console-card-body");
  const icon = document.getElementById("console-toggle-icon");
  
  const isCollapsed = body.style.display === "none";
  if (isCollapsed) {
    body.style.display = "flex";
    card.classList.remove("collapsed");
    header.classList.remove("collapsed");
    icon.style.transform = "rotate(0deg)";
  } else {
    body.style.display = "none";
    card.classList.add("collapsed");
    header.classList.add("collapsed");
    icon.style.transform = "rotate(-90deg)";
  }
}

// Toggle Query Output Card visibility (collapsible)
function toggleOutputDetails() {
  const card = document.getElementById("output-card");
  const header = document.querySelector(".output-header");
  const body = document.getElementById("output-card-body");
  const icon = document.getElementById("output-toggle-icon");
  
  const isCollapsed = body.style.display === "none";
  if (isCollapsed) {
    body.style.display = "flex";
    card.classList.remove("collapsed");
    header.classList.remove("collapsed");
    icon.style.transform = "rotate(0deg)";
  } else {
    body.style.display = "none";
    card.classList.add("collapsed");
    header.classList.add("collapsed");
    icon.style.transform = "rotate(-90deg)";
  }
}

// Toggle Maximize Query Output
function toggleMaximizeOutput() {
  const card = document.getElementById("output-card");
  const btn = document.getElementById("output-maximize-btn");
  const overlay = document.getElementById("maximize-overlay");
  const isMaximized = card.classList.toggle("maximized");
  
  if (isMaximized) {
    btn.innerHTML = `<i class="fa-solid fa-compress"></i> 还原`;
    btn.classList.add('active');
    if (overlay) overlay.classList.add('visible');
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
  } else {
    btn.innerHTML = `<i class="fa-solid fa-expand"></i> 最大化`;
    btn.classList.remove('active');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
}

// Collapsible toggle for dedicated Java output card

// Toggle Collapsible Lesson Example Card
function toggleExampleCard() {
  const card = document.getElementById("example-card");
  const pre = document.getElementById("example-pre-block");
  const glossary = document.getElementById("lesson-glossary");
  const icon = document.getElementById("example-toggle-icon");
  
  const isCollapsed = card.classList.contains("collapsed");
  if (isCollapsed) {
    card.classList.remove("collapsed");
    // Show either pre block or glossary block
    if (glossary.innerText.trim() !== "") {
      glossary.style.display = "block";
      pre.style.display = "none";
    } else {
      pre.style.display = "block";
      glossary.style.display = "none";
    }
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    card.classList.add("collapsed");
    pre.style.display = "none";
    glossary.style.display = "none";
    if (icon) icon.style.transform = "rotate(-90deg)";
  }
}

function toggleJavaOutputDetails() {
  const card = document.getElementById("java-output-card");
  const header = document.querySelector(".java-output-header");
  const body = document.getElementById("java-output-card-body");
  const icon = document.getElementById("java-output-toggle-icon");
  
  const isCollapsed = body.style.display === "none";
  if (isCollapsed) {
    body.style.display = "flex";
    card.classList.remove("collapsed");
    header.classList.remove("collapsed");
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    body.style.display = "none";
    card.classList.add("collapsed");
    header.classList.add("collapsed");
    if (icon) icon.style.transform = "rotate(-90deg)";
  }
}

// Maximize toggle for dedicated Java output card
function toggleMaximizeJavaOutput() {
  const card = document.getElementById("java-output-card");
  const btn = document.getElementById("java-output-maximize-btn");
  const overlay = document.getElementById("maximize-overlay");
  const isMaximized = card.classList.toggle("maximized");
  
  if (isMaximized) {
    if (btn) btn.innerHTML = `<i class="fa-solid fa-compress"></i> 还原`;
    if (btn) btn.classList.add('active');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  } else {
    if (btn) btn.innerHTML = `<i class="fa-solid fa-expand"></i> 最大化`;
    if (btn) btn.classList.remove('active');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
}

// Unified handle for backdrop overlay click
function handleMaximizeOverlayClick() {
  const sqlCard = document.getElementById("output-card");
  if (sqlCard && sqlCard.classList.contains("maximized")) {
    toggleMaximizeOutput();
    return;
  }
  const javaCard = document.getElementById("java-output-card");
  if (javaCard && javaCard.classList.contains("maximized")) {
    toggleMaximizeJavaOutput();
  }
}

// Toggle Collapsible Panels for IT Passport (Checklist, Flashcards, Tools)
function toggleItPassCard(cardName) {
  const cardMap = {
    'checklist': { card: 'itpass-checklist-card', body: 'checklist-body', icon: 'checklist-toggle-icon' },
    'flashcards': { card: 'itpass-flashcards-card', body: 'flashcards-body', icon: 'flashcards-toggle-icon' },
    'tools': { card: 'itpass-tools-card', body: 'tools-body', icon: 'tools-toggle-icon' }
  };
  
  const conf = cardMap[cardName];
  if (!conf) return;
  
  const card = document.getElementById(conf.card);
  const body = document.getElementById(conf.body);
  const icon = document.getElementById(conf.icon);
  
  const isCollapsed = body.style.display === "none";
  if (isCollapsed) {
    body.style.display = conf.body === "checklist-body" ? "block" : "flex";
    card.classList.remove("collapsed");
    icon.style.transform = "rotate(0deg)";
  } else {
    body.style.display = "none";
    card.classList.add("collapsed");
    icon.style.transform = "rotate(-90deg)";
  }
}

// Update Mission Text and Random Practice Toggle Button for SQL
function updateMissionUI() {
  const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
  if (!lesson) return;
  
  const label = document.getElementById("mission-label-text");
  const taskText = document.getElementById("playground-task-text");
  const btn = document.getElementById("random-practice-btn");
  const changeBtn = document.getElementById("change-practice-btn");
  
  if (isRandomPracticeActive) {
    label.innerText = "ランダム課題 (随机练习)";
    taskText.innerText = lesson.randomExercise ? lesson.randomExercise.task : "暂无随机练习";
    btn.innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i> 返回主线任务`;
    btn.classList.add('active-practice');
    if (changeBtn) changeBtn.style.display = "inline-flex";
  } else {
    label.innerText = "ミッション (当前任务)";
    taskText.innerText = lesson.playgroundTask;
    btn.innerHTML = `<i class="fa-solid fa-shuffle"></i> 随机指令练习`;
    btn.classList.remove('active-practice');
    if (changeBtn) changeBtn.style.display = "none";
  }
}

// Toggle Random Practice for SQL
function toggleRandomPractice() {
  isRandomPracticeActive = !isRandomPracticeActive;
  const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
  if (lesson && lesson.randomExercises && isRandomPracticeActive) {
    lesson.randomExerciseIndex = Math.floor(Math.random() * lesson.randomExercises.length);
    lesson.randomExercise = lesson.randomExercises[lesson.randomExerciseIndex];
  }
  updateMissionUI();
  resetOutputPlaceholder();
}

// Change to another random question in the current lesson for SQL
function changeRandomPracticeQuestion() {
  const lesson = SQL_LESSONS.find(l => l.id === currentLessonId);
  if (!lesson || !lesson.randomExercises || lesson.randomExercises.length === 0) return;
  
  let nextIdx = lesson.randomExerciseIndex;
  if (lesson.randomExercises.length > 1) {
    while (nextIdx === lesson.randomExerciseIndex) {
      nextIdx = Math.floor(Math.random() * lesson.randomExercises.length);
    }
  }
  lesson.randomExerciseIndex = nextIdx;
  lesson.randomExercise = lesson.randomExercises[nextIdx];
  
  updateMissionUI();
  resetOutputPlaceholder();
}

// ===================================================
//  SQL Cross-Lesson Comprehensive Challenge System
// ===================================================
function buildCrossPool() {
  const pool = [];
  SQL_LESSONS.forEach(lesson => {
    if (completedLessons.includes(lesson.id) && lesson.randomExercises) {
      lesson.randomExercises.forEach(ex => {
        pool.push({
          task: ex.task,
          example: ex.example,
          expectedQuery: ex.expectedQuery,
          sourceId: lesson.id,
          sourceTitle: lesson.titleZh || lesson.titleJa
        });
      });
    }
  });
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

function startCrossChallenge() {
  const pool = buildCrossPool();
  if (pool.length === 0) {
    showToastKey("toast.noCompletedLessons", "error");
    return;
  }
  crossChallengeActive = true;
  crossChallengePool = pool;
  crossChallengeIndex = 0;

  document.getElementById('challenge-start-btn').style.display = 'none';
  document.getElementById('challenge-controls').style.display = 'flex';
  document.getElementById('challenge-next-btn').style.display = 'inline-flex';
  document.getElementById('challenge-stop-btn').style.display = 'inline-flex';
  document.getElementById('challenge-source-tag').style.display = 'inline-block';

  renderCrossChallenge();
  showToastKey("toast.challengeStarted", "success", { lessonCount: completedLessons.length, count: pool.length });
}

function nextCrossChallenge() {
  if (!crossChallengeActive || crossChallengePool.length === 0) return;
  crossChallengeIndex = (crossChallengeIndex + 1) % crossChallengePool.length;
  renderCrossChallenge();
  resetOutputPlaceholder();
  document.getElementById('sql-editor').value = '';
  updateLineNumbers();
}

function renderCrossChallenge() {
  const ex = crossChallengePool[crossChallengeIndex];
  crossChallengeCurrentExercise = ex;
  
  const statusText = document.getElementById('challenge-status-text');
  if (statusText) {
    statusText.innerText = `挑战中 (${crossChallengeIndex + 1} / ${crossChallengePool.length})`;
  }

  const tag = document.getElementById('challenge-source-tag');
  tag.textContent = `第${ex.sourceId}节`;
  tag.style.display = 'inline-block';

  const label = document.getElementById('mission-label-text');
  const taskText = document.getElementById('playground-task-text');
  if (label) label.innerText = '🔥 综合挑战';
  if (taskText) taskText.innerText = ex.task;
}

function stopCrossChallenge() {
  crossChallengeActive = false;
  crossChallengeCurrentExercise = null;

  document.getElementById('challenge-start-btn').style.display = 'inline-flex';
  document.getElementById('challenge-controls').style.display = 'none';
  document.getElementById('challenge-next-btn').style.display = 'none';
  document.getElementById('challenge-stop-btn').style.display = 'none';
  document.getElementById('challenge-source-tag').style.display = 'none';

  updateMissionUI();
  resetOutputPlaceholder();
  showToastKey("toast.challengeEnded", "info");
}

const _originalValidateTaskCompletion = validateTaskCompletion;
validateTaskCompletion = function(userSql) {
  if (crossChallengeActive && crossChallengeCurrentExercise) {
    const ex = crossChallengeCurrentExercise;
    if (ex.expectedQuery && ex.expectedQuery.test(userSql)) {
      const statusDiv = document.getElementById('playground-status');
      if (statusDiv) {
        statusDiv.innerHTML = `<span class="status-success"><i class="fa-solid fa-fire-flame-curved"></i> 综合挑战达成！🎉 (${crossChallengeIndex + 1}/${crossChallengePool.length})</span>`;
      }
      showToastKey("toast.challengeQuestionCorrect", "success", { sourceId: ex.sourceId });
      return;
    }
  }
  _originalValidateTaskCompletion(userSql);
};


// ===================================================
//  IT Passport Checklists & Flashcards Populators
function renderChecklist(lesson) {
  const checklistBody = document.getElementById("checklist-body");
  if (!checklistBody) return;
  
  const items = {
    1: ["理解CPU的五大功能（控制、运算、存储、输入、输出）", "熟悉存储器层次结构（Cache > RAM > HDD/SSD）", "掌握2/10/16进制转换方法"],
    2: ["理解操作系统的多任务调度和文件路径管理", "掌握绝对路径和相对路径的区别", "能够区分完全、差分与增量备份"],
    3: ["理解C/S架构与云计算服务类型(SaaS/PaaS/IaaS)", "对比RAID 0, RAID 1和RAID 5磁盘阵列", "掌握MTBF、MTTR的定义和系统可用性公式"],
    4: ["熟悉TCP/IP通信协议分层和常用端口号", "理解DNS域名解析与DHCP自动分配过程", "掌握VoIP和IP网络通信的基本原理"],
    5: ["防范勒索软件和钓鱼网络攻击", "对比对称加密(共通键)与非对称加密(公开键)的区别", "理解数字签名的生成及防伪/防否认作用"],
    6: ["了解关系型数据库的基本概念（主键与外键）", "能够进行数据库第一、第二、第三规范化重构", "掌握事务的ACID特性"],
    7: ["掌握算法的三大基本控制流（顺序、选择、循环）", "熟悉变量存取与一维数组的声明遍历", "能够阅读伪代码逻辑"],
    8: ["理清软件开发生命周期流程各阶段任务", "对比瀑布开发模型与敏捷开发模型", "理清WBS工作分解结构与SLA协议指标"],
    9: ["了解B/S和P/L财务报表以及计算盈亏平衡点", "理解工业产权与著作权的保护范围", "区分外包合同(请负)和劳务派遣的区别"],
    10: ["掌握SWOT分析、3C分析 and PPM产品矩阵划分", "理解企业资源规划(ERP)和供应链管理(SCM)概念", "了解数字化转型(DX)的基本概念"]
  };
  
  // Use lesson.chapterId to load chapter-specific checklist for all sub-sections
  const curItems = items[lesson.chapterId] || ["认真学习章节重要概念", "完成课后练习小测"];
  checklistBody.innerHTML = curItems.map(item => `
    <div class="checklist-item">
      <i class="fa-solid fa-circle-check"></i>
      <span>${item}</span>
    </div>
  `).join("");
}

// Dynamic Flashcards Loader & Controller
function initFlashcards(lessonId) {
  let cards = [];
  if (currentSubject === 'itpass') {
    const lesson = IT_PASSPORT_LESSONS.find(l => l.id === lessonId);
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  } else if (currentSubject === 'sg') {
    const lesson = (typeof SG_LESSONS !== 'undefined') ? SG_LESSONS.find(l => l.id === lessonId) : null;
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  } else if (currentSubject === 'sql') {
    const lesson = (typeof SQL_LESSONS !== 'undefined') ? SQL_LESSONS.find(l => l.id === lessonId) : null;
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  }
  
  if (cards.length === 0) {
    const defaultTerm = currentSubject === 'sql' ? "SQL" : (currentSubject === 'sg' ? "情報セキュリティ" : "ITパスポート");
    cards = [{ ja: defaultTerm, zh: defaultTerm, desc: "核心术语概念学习卡片。" }];
  }

  currentFlashcardIdx = 0;
  isFlashcardFlipped = false;
  
  renderFlashcard(cards);
}

function initSgFlashcards(lessonId) {
  initFlashcards(lessonId);
}

function renderFlashcard(cards) {
  const cardElement = document.getElementById("flashcard-element");
  if (!cardElement) return;
  
  cardElement.classList.remove("flipped");
  isFlashcardFlipped = false;
  
  if (!cards || cards.length === 0) {
    document.getElementById("fc-ja-term").innerText = "暂无词卡";
    document.getElementById("fc-zh-term").innerText = "No cards";
    document.getElementById("fc-desc").innerText = "当前章节没有词卡。";
    document.getElementById("fc-counter").innerText = "0 / 0";
    return;
  }
  
  const currentCard = cards[currentFlashcardIdx];
  
  document.getElementById("fc-ja-term").innerText = currentCard.ja;
  document.getElementById("fc-zh-term").innerText = currentCard.zh;
  document.getElementById("fc-desc").innerText = currentCard.desc;
  
  document.getElementById("fc-counter").innerText = `${currentFlashcardIdx + 1} / ${cards.length}`;
}

function flipFlashcard() {
  const cardElement = document.getElementById("flashcard-element");
  isFlashcardFlipped = !isFlashcardFlipped;
  cardElement.classList.toggle("flipped", isFlashcardFlipped);
}

function prevFlashcard() {
  let cards = [];
  if (currentSubject === 'itpass') {
    const lesson = IT_PASSPORT_LESSONS.find(l => l.id === currentItPassLessonId);
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  } else if (currentSubject === 'sg') {
    const lesson = (typeof SG_LESSONS !== 'undefined') ? SG_LESSONS.find(l => l.id === currentSgLessonId) : null;
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  } else if (currentSubject === 'sql') {
    const lesson = (typeof SQL_LESSONS !== 'undefined') ? SQL_LESSONS.find(l => l.id === currentLessonId) : null;
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  }
  if (cards.length === 0) return;
  
  currentFlashcardIdx = (currentFlashcardIdx - 1 + cards.length) % cards.length;
  renderFlashcard(cards);
}

function nextFlashcard() {
  let cards = [];
  if (currentSubject === 'itpass') {
    const lesson = IT_PASSPORT_LESSONS.find(l => l.id === currentItPassLessonId);
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  } else if (currentSubject === 'sg') {
    const lesson = (typeof SG_LESSONS !== 'undefined') ? SG_LESSONS.find(l => l.id === currentSgLessonId) : null;
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  } else if (currentSubject === 'sql') {
    const lesson = (typeof SQL_LESSONS !== 'undefined') ? SQL_LESSONS.find(l => l.id === currentLessonId) : null;
    cards = (lesson && lesson.vocabList) ? lesson.vocabList : [];
  }
  if (cards.length === 0) return;
  
  currentFlashcardIdx = (currentFlashcardIdx + 1) % cards.length;
  renderFlashcard(cards);
}

function initItPassCalculators() {
  switchCalculatorTool();
}

function switchCalculatorTool() {
  const select = document.getElementById("calculator-select");
  const container = document.getElementById("tool-inputs-container");
  if (!select || !container) return;

  const tool = select.value;
  if (tool === "binary") {
    container.innerHTML = `
      <div class="tool-row">
        <label for="calc-number-input">数値</label>
        <input id="calc-number-input" type="text" value="42" oninput="calculateBinary()">
      </div>
      <div class="tool-result" id="calculator-result"></div>
    `;
    calculateBinary();
    return;
  }

  if (tool === "reliability") {
    container.innerHTML = `
      <div class="tool-row">
        <label for="calc-mtbf-input">MTBF</label>
        <input id="calc-mtbf-input" type="number" min="0" step="1" value="1000" oninput="calculateReliability()">
      </div>
      <div class="tool-row">
        <label for="calc-mttr-input">MTTR</label>
        <input id="calc-mttr-input" type="number" min="0" step="1" value="10" oninput="calculateReliability()">
      </div>
      <div class="tool-result" id="calculator-result"></div>
    `;
    calculateReliability();
    return;
  }

  container.innerHTML = `
    <div class="tool-row">
      <label for="calc-gain-input">收益</label>
      <input id="calc-gain-input" type="number" step="1" value="120000" oninput="calculateRoi()">
    </div>
    <div class="tool-row">
      <label for="calc-cost-input">投资额</label>
      <input id="calc-cost-input" type="number" step="1" value="80000" oninput="calculateRoi()">
    </div>
    <div class="tool-result" id="calculator-result"></div>
  `;
  calculateRoi();
}

function calculateBinary() {
  const input = document.getElementById("calc-number-input");
  const result = document.getElementById("calculator-result");
  if (!input || !result) return;

  const raw = input.value.trim();
  let decimal = Number.parseInt(raw, 10);
  if (/^0b[01]+$/i.test(raw)) decimal = Number.parseInt(raw.slice(2), 2);
  if (/^0x[0-9a-f]+$/i.test(raw)) decimal = Number.parseInt(raw.slice(2), 16);

  if (!Number.isFinite(decimal)) {
    result.innerHTML = "有效数字を入力してください。";
    return;
  }

  result.innerHTML = `
    <strong>10进制:</strong> ${decimal}<br>
    <strong>2进制:</strong> ${decimal.toString(2)}<br>
    <strong>16进制:</strong> ${decimal.toString(16).toUpperCase()}
  `;
}

function calculateReliability() {
  const mtbf = Number(document.getElementById("calc-mtbf-input")?.value || 0);
  const mttr = Number(document.getElementById("calc-mttr-input")?.value || 0);
  const result = document.getElementById("calculator-result");
  if (!result) return;

  const denominator = mtbf + mttr;
  if (mtbf < 0 || mttr < 0 || denominator <= 0) {
    result.innerHTML = "MTBF と MTTR は 0 以上で入力してください。";
    return;
  }

  const availability = mtbf / denominator;
  result.innerHTML = `
    <strong>稼働率:</strong> ${(availability * 100).toFixed(3)}%<br>
    <strong>公式:</strong> MTBF / (MTBF + MTTR)
  `;
}

function calculateRoi() {
  const gain = Number(document.getElementById("calc-gain-input")?.value || 0);
  const cost = Number(document.getElementById("calc-cost-input")?.value || 0);
  const result = document.getElementById("calculator-result");
  if (!result) return;

  if (cost === 0) {
    result.innerHTML = "投资额不能为 0。";
    return;
  }

  const roi = (gain - cost) / cost;
  result.innerHTML = `
    <strong>ROI:</strong> ${(roi * 100).toFixed(2)}%<br>
    <strong>收益 - 投资额:</strong> ${(gain - cost).toLocaleString()}
  `;
}

// ===================================================
const CBT_FALLBACK_QUESTIONS = [
  {
    id: "FALLBACK_Q1",
    year: "令和6年",
    yearId: "06_haru",
    number: 1,
    category: "ストラテジ系",
    topic: "マーケティングオートメーション",
    subcategory: "マーケティング",
    question: "マーケティングオートメーション(MA)に関する記述として，最も適切なものはどれか。",
    options: [
      "企業内に蓄積された大量のデータを分析して，事業戦略などに有効活用する。",
      "小売業やサービス業において，販売した商品単位の情報の収集・蓄積及び分析を行う。",
      "これまで人間が手作業で行っていた定型業務を，AIや機械学習などを取り入れたソフトウェアのロボットが代行することによって自動化や効率化を図る。",
      "見込み顧客の抽出，獲得，育成などの営業活动を効率化する。"
    ],
    answer: 3,
    explanation: "マーケティングオートメーションは、顧客獲得・維持のためのマーケティング活動をITシステムで自動化する仕組みであり、見込み顧客の管理について記述している「エ」が適切です。"
  },
  {
    id: "FALLBACK_Q2",
    year: "令和6年",
    yearId: "06_haru",
    number: 8,
    category: "ストラテジ系",
    topic: "販売費及び一般管理費",
    subcategory: "会計・財務",
    question: "損益計算書における「販売費及び一般管理費」に該当するものはどれか。",
    options: [
      "商品の売上原価",
      "営業外費用としての支払利息",
      "本社の広告宣伝費や事務員の給与",
      "特別損失としての固定資産売却損"
    ],
    answer: 2,
    explanation: "本社の広告宣伝費、事務員の給与、本社の減価償却費などは「販売費及び一般管理費」に分類されます。「ア」は売上原価、「イ」は営業外費用、「エ」は特別損失です。"
  },
  {
    id: "FALLBACK_Q3",
    year: "令和5年",
    yearId: "05_haru",
    number: 59,
    category: "テクノロジ系",
    topic: "稼働率",
    subcategory: "システム構成要素",
    question: "あるシステムのMTBFが90時間、MTTRが10時間であるとき、このシステムの稼働率はどれですか。",
    options: [
      "0.10",
      "0.80",
      "0.90",
      "0.99"
    ],
    answer: 2,
    explanation: "稼働率 = MTBF / (MTBF + MTTR) = 90 / (90 + 10) = 90 / 100 = 0.90 です。よってウが正解です。"
  }
];

// ── Exam History Persistence (Round 23.1) ──────────────────────────
const EXAM_HISTORY_STORAGE_KEY = 'study-tools-exam-history-v1';
const EXAM_HISTORY_MAX_RECORDS = 50;

function createExamSessionId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch (_) { /* fallback below */ }
  return 'exam-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
}

function getExamHistory() {
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('[ExamHistory] Failed to read localStorage:', e);
    return [];
  }
}

function clampExamHistory(records) {
  if (records.length > EXAM_HISTORY_MAX_RECORDS) {
    return records.slice(records.length - EXAM_HISTORY_MAX_RECORDS);
  }
  return records;
}

function saveExamHistoryRecord(record) {
  try {
    const history = getExamHistory();
    history.push(record);
    const clamped = clampExamHistory(history);
    localStorage.setItem(EXAM_HISTORY_STORAGE_KEY, JSON.stringify(clamped));
    console.info('[ExamHistory] Saved record, total:', clamped.length);
    return true;
  } catch (e) {
    console.warn('[ExamHistory] Failed to save to localStorage:', e);
    return false;
  }
}

function buildExamHistoryRecord(exam, reviews, scoreData) {
  var now = new Date();
  var elapsedSeconds = exam.startedAtMs
    ? Math.round((Date.now() - exam.startedAtMs) / 1000)
    : 0;

  var questionResults = reviews.map(function (r) {
    return {
      num: r.num,
      qId: r.qId || r.fallbackId || ('unknown:' + r.num),
      qNum: r.qNum,
      year: r.year || '',
      yearId: r.yearId || '',
      category: r.category || '',
      subcategory: r.subcategory || '',
      topic: r.topic || '',
      isCorrect: r.isCorrect,
      isAnswered: r.isAnswered,
      userAnswerIdx: r.userOriginalIdx,
      correctAnswerIdx: r.correctIdx
    };
  });

  var unansweredCount = questionResults.filter(function (r) { return !r.isAnswered; }).length;
  var wrongCount = questionResults.filter(function (r) { return r.isAnswered && !r.isCorrect; }).length;
  var accuracy = scoreData.totalQuestions > 0
    ? Math.round((scoreData.correctCount / scoreData.totalQuestions) * 1000) / 10
    : 0;

  return {
    schemaVersion: 1,
    sessionId: createExamSessionId(),
    subject: exam.subject || 'itpass',
    submittedAt: now.toISOString(),
    startedAt: exam.startedAt || now.toISOString(),
    elapsedSeconds: elapsedSeconds,

    totalQuestions: scoreData.totalQuestions,
    correctCount: scoreData.correctCount,
    wrongCount: wrongCount,
    unansweredCount: unansweredCount,
    accuracy: accuracy,

    scoreTotal: scoreData.scoreTotal,
    isPassed: scoreData.isPassed,

    fieldScores: {
      strat: scoreData.fieldScores.strat,
      man: scoreData.fieldScores.man,
      tech: scoreData.fieldScores.tech,
      subB: scoreData.fieldScores.subB
    },

    examConfig: exam.examConfig || {
      subject: exam.subject || 'itpass',
      yearFilter: 'all',
      questionCount: scoreData.totalQuestions,
      source: 'cbt',
      shuffle: true,
      version: 1
    },

    questionResults: questionResults
  };
}

// ── Exam History Modal UI (Round 23.2) ─────────────────────────────

var _examHistoryCurrentFilter = 'all';
var _examHistoryEscHandler = null;

function stripHtmlToText(html) {
  if (!html) return '';
  var div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || div.innerText || '').trim();
}

function findCbtQuestionById(subject, qId) {
  if (!qId) return null;
  var pool = null;
  if (subject === 'sg' && typeof SG_PAST_EXAMS !== 'undefined') {
    pool = SG_PAST_EXAMS;
  } else if (typeof IT_PASSPORT_PAST_EXAMS !== 'undefined') {
    pool = IT_PASSPORT_PAST_EXAMS;
  }
  if (!pool) return null;
  for (var i = 0; i < pool.length; i++) {
    if (pool[i].id === qId) return pool[i];
  }
  return null;
}

function openExamHistoryModal() {
  var modal = document.getElementById('exam-history-modal');
  if (!modal) return;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  _examHistoryCurrentFilter = 'all';
  var btns = modal.querySelectorAll('.exam-history-filter-btn');
  btns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-filter') === 'all'); });
  renderExamHistoryList();
  if (!_examHistoryEscHandler) {
    _examHistoryEscHandler = function (e) {
      if (e.key === 'Escape') {
        var m = document.getElementById('exam-history-modal');
        if (m && !m.hasAttribute('hidden')) {
          e.stopPropagation();
          e.preventDefault();
          closeExamHistoryModal();
        }
      }
    };
    document.addEventListener('keydown', _examHistoryEscHandler, true);
  }
}

function closeExamHistoryModal() {
  var modal = document.getElementById('exam-history-modal');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function setExamHistoryFilter(filter) {
  _examHistoryCurrentFilter = filter;
  var btns = document.querySelectorAll('#exam-history-filters .exam-history-filter-btn');
  btns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-filter') === filter); });
  renderExamHistoryList();
}

function renderExamHistoryList() {
  var container = document.getElementById('exam-history-list');
  if (!container) return;
  var history = getExamHistory();
  history.sort(function (a, b) { return (b.submittedAt || '').localeCompare(a.submittedAt || ''); });
  if (_examHistoryCurrentFilter !== 'all') {
    history = history.filter(function (r) { return r.subject === _examHistoryCurrentFilter; });
  }
  if (history.length === 0) {
    container.innerHTML = '<div class="exam-history-empty">' +
      '<p class="exam-history-empty__title">' + (typeof I18n !== 'undefined' ? I18n.t('examHistory.empty') : '还没有考试历史') + '</p>' +
      '<p class="exam-history-empty__hint">' + (typeof I18n !== 'undefined' ? I18n.t('examHistory.emptyHint') : '完成一次模拟考试后，这里会显示记录') + '</p>' +
      '</div>';
    return;
  }
  container.innerHTML = '';
  history.forEach(function (rec) {
    var card = document.createElement('div');
    card.className = 'exam-history-card';
    card.id = 'exam-hist-' + rec.sessionId;

    var subjectLabel = rec.subject === 'sg' ? 'SG' : 'IT Passport';
    var dateStr = '';
    try { dateStr = new Date(rec.submittedAt).toLocaleString(); } catch (_) { dateStr = rec.submittedAt || ''; }
    var elapsed = rec.elapsedSeconds || 0;
    var mm = Math.floor(elapsed / 60);
    var ss = elapsed % 60;
    var timeStr = (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss;
    var passLabel = rec.isPassed
      ? (typeof I18n !== 'undefined' ? I18n.t('examHistory.passed') : '合格')
      : (typeof I18n !== 'undefined' ? I18n.t('examHistory.failed') : '未合格');
    var passClass = rec.isPassed ? 'exam-history-pass' : 'exam-history-fail';

    var t = function (key, fallback) { return typeof I18n !== 'undefined' ? I18n.t(key) : fallback; };

    card.innerHTML =
      '<div class="exam-history-card__summary" data-session-id="' + rec.sessionId + '">' +
        '<span class="exam-history-card__subject">' + subjectLabel + '</span>' +
        '<span class="exam-history-card__date">' + dateStr + '</span>' +
        '<span class="exam-history-card__stat">' + t('examHistory.questions', '题量') + ': ' + (rec.totalQuestions || 0) + '</span>' +
        '<span class="exam-history-card__stat">' + t('examHistory.correct', '正确') + ': ' + (rec.correctCount || 0) + '/' + (rec.totalQuestions || 0) + '</span>' +
        '<span class="exam-history-card__stat">' + t('examHistory.accuracy', '正确率') + ': ' + (rec.accuracy || 0) + '%</span>' +
        '<span class="exam-history-card__stat">' + t('examHistory.score', '分数') + ': ' + (rec.scoreTotal || 0) + '</span>' +
        '<span class="exam-history-card__badge ' + passClass + '">' + passLabel + '</span>' +
        '<span class="exam-history-card__stat">' + t('examHistory.time', '用时') + ': ' + timeStr + '</span>' +
        '<button type="button" class="exam-history-card__toggle" aria-expanded="false">' +
          '<span>' + t('examHistory.viewDetails', '查看详情') + '</span> <i class="fa-solid fa-chevron-down"></i>' +
        '</button>' +
      '</div>' +
      '<div class="exam-history-card__detail" hidden></div>';

    var summaryRow = card.querySelector('.exam-history-card__summary');
    var toggleBtn = card.querySelector('.exam-history-card__toggle');
    var detailDiv = card.querySelector('.exam-history-card__detail');

    var toggleDetail = function () {
      var isHidden = detailDiv.hasAttribute('hidden');
      if (isHidden) {
        detailDiv.removeAttribute('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.querySelector('span').textContent = t('examHistory.hideDetails', '收起详情');
        toggleBtn.querySelector('i').className = 'fa-solid fa-chevron-up';
        if (!detailDiv.dataset.loaded) {
          detailDiv.innerHTML = buildExamDetailHtml(rec);
          detailDiv.dataset.loaded = '1';
        }
      } else {
        detailDiv.setAttribute('hidden', '');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.querySelector('span').textContent = t('examHistory.viewDetails', '查看详情');
        toggleBtn.querySelector('i').className = 'fa-solid fa-chevron-down';
      }
    };

    toggleBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleDetail(); });
    summaryRow.addEventListener('click', function (e) {
      if (e.target.closest('.exam-history-card__toggle')) return;
      toggleDetail();
    });

    container.appendChild(card);
  });
}

function buildExamDetailHtml(rec) {
  var t = function (key, fallback) { return typeof I18n !== 'undefined' ? I18n.t(key) : fallback; };
  var html = '';

  // Exam config
  html += '<div class="exam-detail-section">';
  html += '<h4>' + t('examHistory.examConfig', '考试配置') + '</h4>';
  html += '<div class="exam-detail-grid">';
  html += '<span>' + t('examHistory.yearFilter', '年度筛选') + ': ' + (rec.examConfig ? rec.examConfig.yearFilter || 'all' : '-') + '</span>';
  html += '<span>' + t('examHistory.questions', '题量') + ': ' + (rec.totalQuestions || 0) + '</span>';
  var dateStr2 = '';
  try { dateStr2 = new Date(rec.submittedAt).toLocaleString(); } catch (_) { dateStr2 = ''; }
  html += '<span>' + t('examHistory.submittedAt', '提交时间') + ': ' + dateStr2 + '</span>';
  var elapsed = rec.elapsedSeconds || 0;
  var mm = Math.floor(elapsed / 60); var ss = elapsed % 60;
  html += '<span>' + t('examHistory.time', '用时') + ': ' + (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss + '</span>';
  html += '</div></div>';

  // Field scores
  if (rec.fieldScores) {
    html += '<div class="exam-detail-section">';
    html += '<h4>' + t('examHistory.fieldScores', '分类子分') + '</h4>';
    var fields = [
      { key: 'strat', label: 'ストラテジ系' },
      { key: 'man', label: 'マネジメント系' },
      { key: 'tech', label: 'テクノロジ系' },
      { key: 'subB', label: '科目B' }
    ];
    fields.forEach(function (f) {
      var fs = rec.fieldScores[f.key];
      if (!fs) return;
      var passStr = fs.passes ? t('examHistory.passed', '合格') : t('examHistory.failed', '未合格');
      html += '<div class="exam-detail-field-row">';
      html += '<strong>' + f.label + '</strong>: ';
      html += fs.score + '/1000 (' + fs.correct + '/' + fs.count + ') — ' + passStr;
      html += '</div>';
    });
    html += '</div>';
  }

  // Per-question results
  if (rec.questionResults && rec.questionResults.length > 0) {
    html += '<div class="exam-detail-section">';
    html += '<h4>' + t('examHistory.questionResults', '逐题结果') + '</h4>';
    rec.questionResults.forEach(function (qr) {
      var statusIcon = !qr.isAnswered ? '—' : (qr.isCorrect ? '✓' : '✗');
      var statusClass = !qr.isAnswered ? 'exam-q-unanswered' : (qr.isCorrect ? 'exam-q-correct' : 'exam-q-wrong');
      var alphabet = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'];
      var userAns = qr.isAnswered && qr.userAnswerIdx >= 0 ? alphabet[qr.userAnswerIdx] || '?' : t('examHistory.unanswered', '未答');
      var correctAns = qr.correctAnswerIdx >= 0 ? alphabet[qr.correctAnswerIdx] || '?' : '?';

      html += '<div class="exam-q-row">';
      html += '<span class="exam-q-num">#' + qr.num + '</span>';
      html += '<span class="exam-q-id">' + (qr.qId || '-') + '</span>';
      if (qr.year) html += '<span class="exam-q-year">' + qr.year + '</span>';
      if (qr.category) html += '<span class="exam-q-cat">' + qr.category + '</span>';
      if (qr.topic) html += '<span class="exam-q-topic">' + qr.topic + '</span>';
      html += '<span class="exam-q-answers">';
      html += t('examHistory.yourAnswer', '用户答案') + ': <strong>' + userAns + '</strong> | ';
      html += t('examHistory.correctAnswer', '正确答案') + ': <strong>' + correctAns + '</strong>';
      html += '</span>';
      html += '<span class="' + statusClass + '">' + statusIcon + '</span>';

      // Question preview from question bank
      var found = findCbtQuestionById(rec.subject, qr.qId);
      if (found) {
        var preview = stripHtmlToText(found.question);
        if (preview.length > 120) preview = preview.substring(0, 120) + '…';
        html += '<div class="exam-q-preview">' + preview + '</div>';
      } else {
        html += '<div class="exam-q-preview exam-q-preview--missing">' + t('examHistory.questionNotFound', '题目数据未找到') + '</div>';
      }

      html += '</div>';
    });
    html += '</div>';
  }

  return html;
}

// Init exam history modal events (called from DOMContentLoaded)
function initExamHistoryModal() {
  var modal = document.getElementById('exam-history-modal');
  if (!modal) return;
  // Backdrop + close buttons
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-exam-history-close]')) {
      closeExamHistoryModal();
    }
  });
  // Filter buttons
  var filters = document.getElementById('exam-history-filters');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.exam-history-filter-btn');
      if (btn) setExamHistoryFilter(btn.getAttribute('data-filter'));
    });
  }
}

const getExamPool = () => {
  if (currentSubject === 'sg') {
    return (typeof SG_PAST_EXAMS !== 'undefined' && SG_PAST_EXAMS.length > 0) ? SG_PAST_EXAMS : [];
  }
  return (typeof IT_PASSPORT_PAST_EXAMS !== 'undefined' && IT_PASSPORT_PAST_EXAMS.length > 0) ? IT_PASSPORT_PAST_EXAMS : CBT_FALLBACK_QUESTIONS;
};

function startCbtExam() {
  const yearSelect = document.getElementById("cbt-year-select").value;
  const countSelect = parseInt(document.getElementById("cbt-count-select").value);
  const optShuffle = document.getElementById("cbt-opt-shuffle").checked;
  const optNoCalc = document.getElementById("cbt-opt-nocalc").checked;
  
  const fullPool = getExamPool();
  let filtered = [];
  
  if (yearSelect === "all") {
    filtered = [...fullPool];
  } else {
    filtered = fullPool.filter(q => q.yearId === yearSelect);
  }
  
  // Apply no calculation filter
  if (optNoCalc) {
    const calcRegex = /計算|MTBF|MTTR|稼働率|2進数|16進数|確率|売上高|利益|固定费|变动费|回收期间|损益分岐点/i;
    filtered = filtered.filter(q => !calcRegex.test(q.question) && !calcRegex.test(q.explanation));
  }
  
  if (filtered.length === 0) {
    showToastKey("toast.examEmpty", "error");
    return;
  }
  
  // Shuffle full pool and slice to requested count
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  
  const examQuestions = filtered.slice(0, countSelect);
  
  // Prepare questions options (and shuffle option keys if requested)
  const preparedQuestions = examQuestions.map(q => {
    let options = q.options.map((opt, idx) => ({ text: opt, originalIdx: idx }));
    if (optShuffle) {
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
    }
    return {
      ...q,
      options: options
    };
  });
  
  const yearsMapping = {
    "08_haru": "令和8年",
    "07_haru": "令和7年",
    "06_haru": "令和6年",
    "05_haru": "令和5年",
    "04_haru": "令和4年",
    "03_haru": "令和3年",
    "sg_07_haru": "令和7年 (SG)",
    "sg_06_haru": "令和6年 (SG)",
    "sg_05_haru": "令和5年 (SG)",
    "sg_01_aki": "令和元年秋 (SG)",
    "sg_31_haru": "平成31年春 (SG)",
    "sg_30_aki": "平成30年秋 (SG)",
    "sg_30_haru": "平成30年春 (SG)",
    "sg_29_aki": "平成29年秋 (SG)",
    "sg_29_haru": "平成29年春 (SG)",
    "sg_28_aki": "平成28年秋 (SG)",
    "sg_28_haru": "平成28年春 (SG)"
  };

  // Setup exam state
  var _now = new Date();
  activeCbtExam = {
    title: yearSelect === "all" ? "综合随机模拟考试" : `${yearsMapping[yearSelect] || yearSelect} 公开问题 模拟考试`,
    subject: currentSubject === 'sg' ? 'sg' : 'itpass',
    year: yearSelect !== "all" ? (yearsMapping[yearSelect] || yearSelect) : 'all',
    yearFilter: yearSelect,
    startedAt: _now.toISOString(),
    startedAtMs: Date.now(),
    questions: preparedQuestions,
    answers: new Array(preparedQuestions.length).fill(-1),
    flags: new Array(preparedQuestions.length).fill(false),
    currentQIdx: 0,
    timeRemaining: countSelect * 72, // 72 seconds per question
    examConfig: {
      subject: currentSubject === 'sg' ? 'sg' : 'itpass',
      yearFilter: yearSelect,
      questionCount: countSelect,
      source: 'cbt',
      shuffle: optShuffle,
      noCalc: optNoCalc,
      version: 1
    }
  };
  
  // Hide config screen, show testing screen
  document.getElementById("cbt-config-screen").style.display = "none";
  document.getElementById("cbt-testing-screen").style.display = "flex";
  document.getElementById("cbt-results-screen").style.display = "none";
  
  // Start Timer
  startCbtTimer();
  
  // Render CBT Question Navigator Grid
  initCbtNavigatorGrid();
  
  // Render First Question
  renderCbtQuestion();
  
  showToastKey("toast.examStarted", "success");
}

function startCbtTimer() {
  if (cbtTimerInterval) clearInterval(cbtTimerInterval);
  
  updateTimerDisplay();
  
  cbtTimerInterval = setInterval(() => {
    if (!activeCbtExam) {
      clearInterval(cbtTimerInterval);
      return;
    }
    
    activeCbtExam.timeRemaining--;
    updateTimerDisplay();
    
    if (activeCbtExam.timeRemaining <= 0) {
      clearInterval(cbtTimerInterval);
      showToastKey("toast.examTimeout", "error");
      submitCbtExam(true);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const display = document.getElementById("cbt-timer-display");
  if (!display || !activeCbtExam) return;
  
  const min = Math.floor(activeCbtExam.timeRemaining / 60);
  const sec = activeCbtExam.timeRemaining % 60;
  display.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  
  if (activeCbtExam.timeRemaining < 300) {
    display.style.color = "#f87171";
  } else {
    display.style.color = "#fca5a5";
  }
}

function initCbtNavigatorGrid() {
  const grid = document.getElementById("cbt-grid-canvas");
  if (!grid || !activeCbtExam) return;
  
  grid.innerHTML = "";
  activeCbtExam.questions.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.className = "cbt-grid-btn";
    btn.id = `cbt-grid-btn-${idx}`;
    btn.innerText = idx + 1;
    btn.addEventListener("click", () => jumpToCbtQuestion(idx));
    grid.appendChild(btn);
  });
  
  updateCbtNavigatorGridUI();
}

function updateCbtNavigatorGridUI() {
  if (!activeCbtExam) return;
  
  activeCbtExam.questions.forEach((q, idx) => {
    const btn = document.getElementById(`cbt-grid-btn-${idx}`);
    if (!btn) return;
    
    btn.classList.toggle("active", idx === activeCbtExam.currentQIdx);
    
    const isAnswered = activeCbtExam.answers[idx] !== -1;
    btn.classList.toggle("answered", isAnswered);
    
    const isFlagged = activeCbtExam.flags[idx];
    btn.classList.toggle("flagged", isFlagged);
  });
  
  const total = activeCbtExam.questions.length;
  const answered = activeCbtExam.answers.filter(a => a !== -1).length;
  document.getElementById("cbt-nav-status-text").innerText = `第 ${activeCbtExam.currentQIdx + 1} 题，共 ${total} 题 (已作答 ${answered} 题)`;
}

function renderCbtQuestion() {
  if (!activeCbtExam) return;

  const idx = activeCbtExam.currentQIdx;
  const q = activeCbtExam.questions[idx];

  document.getElementById("cbt-exam-display-title").innerText = activeCbtExam.title;
  document.getElementById("cbt-q-number-text").innerText = `第 ${idx + 1} 题 / 問 ${q.number}`;

  // Build short summary: year · category
  const catShort = q.subcategory || q.topic || q.category || "";
  const summary = [q.year, catShort].filter(Boolean).join(" / ");
  document.getElementById("cbt-q-field-text").innerHTML = summary ? `<span class="cbt-q-summary-text" title="${summary.replace(/"/g,'&quot;')}">${summary}</span>` : "";

  // Build full metadata string
  const metaParts = [];
  if (q.year) metaParts.push(`${I18n.t("exam.metaYear")}: ${q.year}`);
  if (q.number) metaParts.push(`${I18n.t("exam.metaQNum")}: 問${q.number}`);
  if (q.category) metaParts.push(`${I18n.t("exam.metaCategory")}: ${q.category}`);
  if (q.subcategory) metaParts.push(I18n.t("exam.metaSubcategory") + ": " + q.subcategory);
  if (q.topic) metaParts.push(I18n.t("exam.metaTopic") + ": " + q.topic);
  const metaFullText = metaParts.join("  |  ");
  const metaFullEl = document.getElementById("cbt-q-meta-full-text");
  if (metaFullEl) metaFullEl.innerText = metaFullText;

  // Show/hide the toggle button based on whether full metadata has extra info beyond summary
  const toggleBtn = document.getElementById("cbt-q-meta-toggle");
  const metaFullSection = document.getElementById("cbt-q-meta-full");
  if (toggleBtn && metaFullSection) {
    // Reset to collapsed state on each question
    toggleBtn.setAttribute("aria-expanded", "false");
    metaFullSection.hidden = true;
    // Show toggle only if there is meaningful metadata beyond year+category
    if (metaFullText.length > 0 && (q.subcategory || q.topic)) {
      toggleBtn.removeAttribute("hidden");
      toggleBtn.innerHTML = `${I18n.t("exam.metaExpand")}`;
    } else {
      toggleBtn.setAttribute("hidden", "");
    }
  }

  document.getElementById("cbt-q-body-text").innerHTML = q.question;

  const flagBtn = document.getElementById("cbt-q-flag-btn");
  flagBtn.classList.toggle("flagged", activeCbtExam.flags[idx]);
  flagBtn.innerHTML = activeCbtExam.flags[idx]
    ? `<i class="fa-solid fa-flag"></i> 已标记复查`
    : `<i class="fa-regular fa-flag"></i> 标记此题复查`;

  const optionsList = document.getElementById("cbt-q-options-list");
  optionsList.innerHTML = "";

  const alphabet = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"];
  q.options.forEach((opt, oIdx) => {
    const btn = document.createElement("button");
    btn.className = `cbt-option-item ${activeCbtExam.answers[idx] === oIdx ? 'selected' : ''}`;
    btn.innerHTML = `
      <div class="cbt-option-badge">${alphabet[oIdx]}</div>
      <div class="cbt-option-text">${opt.text}</div>
    `;
    btn.addEventListener("click", () => selectCbtAnswer(oIdx));
    optionsList.appendChild(btn);
  });

  updateCbtNavigatorGridUI();
  // Wrap tables for horizontal scroll
  if (window.GlossaryWrapper && typeof window.GlossaryWrapper.wrapAllTables === "function") {
    window.GlossaryWrapper.wrapAllTables();
  } else {
    wrapAllTablesWithScrollWrapper();
  }
}

window.toggleCbtQuestionMeta = function() {
  const toggleBtn = document.getElementById("cbt-q-meta-toggle");
  const metaFull = document.getElementById("cbt-q-meta-full");
  if (!toggleBtn || !metaFull) return;
  const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
  toggleBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
  metaFull.hidden = expanded;
  toggleBtn.innerHTML = expanded
    ? `${I18n.t("exam.metaExpand")}`
    : `${I18n.t("exam.metaCollapse")}`;
};

function selectCbtAnswer(oIdx) {
  if (!activeCbtExam) return;
  const idx = activeCbtExam.currentQIdx;
  activeCbtExam.answers[idx] = oIdx;
  renderCbtQuestion();
}

function toggleCbtQuestionFlag() {
  if (!activeCbtExam) return;
  const idx = activeCbtExam.currentQIdx;
  activeCbtExam.flags[idx] = !activeCbtExam.flags[idx];
  renderCbtQuestion();
}

function jumpToCbtQuestion(idx) {
  if (!activeCbtExam) return;
  activeCbtExam.currentQIdx = idx;
  renderCbtQuestion();
}

function cbtPrevQuestion() {
  if (!activeCbtExam) return;
  if (activeCbtExam.currentQIdx > 0) {
    activeCbtExam.currentQIdx--;
    renderCbtQuestion();
  } else {
    showToastKey("toast.alreadyFirst", "info");
  }
}

function cbtNextQuestion() {
  if (!activeCbtExam) return;
  if (activeCbtExam.currentQIdx < activeCbtExam.questions.length - 1) {
    activeCbtExam.currentQIdx++;
    renderCbtQuestion();
  } else {
    showToastKey("toast.alreadyLast", "info");
  }
}

function exitCbtExam() {
  if (confirmKey("dialog.exitExamConfirm")) {
    clearInterval(cbtTimerInterval);
    activeCbtExam = null;
    switchItPassSubMode("dojo");
  }
}

function submitCbtExam(auto = false) {
  if (!auto) {
    const unanswered = activeCbtExam.answers.filter(a => a === -1).length;
    if (unanswered > 0) {
      if (!confirmKey("dialog.submitExamUnansweredConfirm", { count: unanswered })) return;
    } else {
      if (!confirmKey("dialog.submitExamConfirm")) return;
    }
  }
  
  clearInterval(cbtTimerInterval);
  activeCbtExam.isSubmitted = true;
  
  const qList = activeCbtExam.questions;
  const answers = activeCbtExam.answers;
  
  let totalQuestions = qList.length;
  let correctCount = 0;
  
  const fields = {
    "ストラテジ系": { total: 0, correct: 0 },
    "マネジメント系": { total: 0, correct: 0 },
    "テクノロジ系": { total: 0, correct: 0 },
    "科目B": { total: 0, correct: 0 }
  };
  
  const reviews = [];
  
  qList.forEach((q, idx) => {
    const userChoiceIdx = answers[idx];
    const isAnswered = userChoiceIdx !== -1;
    
    let isCorrect = false;
    let originalUserAnswerIdx = -1;
    if (isAnswered) {
      originalUserAnswerIdx = q.options[userChoiceIdx].originalIdx;
      isCorrect = originalUserAnswerIdx === q.answer;
    }
    
    if (isCorrect) correctCount++;
    
    const fieldName = q.category;
    if (fields[fieldName]) {
      fields[fieldName].total++;
      if (isCorrect) fields[fieldName].correct++;
    }
    
    reviews.push({
      num: idx + 1,
      qId: q.id || `${currentSubject === 'sg' ? 'sg' : 'itpass'}:${q.yearId || 'unknown'}:${q.number || (idx + 1)}`,
      year: q.year || '',
      yearId: q.yearId || '',
      qNum: q.number,
      category: q.category,
      topic: q.topic,
      subcategory: q.subcategory,
      subject: currentSubject === 'sg' ? 'sg' : 'itpass',
      question: q.question,
      options: q.options,
      correctIdx: q.answer,
      userOriginalIdx: originalUserAnswerIdx,
      isCorrect: isCorrect,
      isAnswered: isAnswered,
      explanation: q.explanation
    });
  });
  
  const scoreTotal = Math.round((correctCount / totalQuestions) * 1000);
  
  const scoreStrat = fields["ストラテジ系"].total > 0 
    ? Math.round((fields["ストラテジ系"].correct / fields["ストラテジ系"].total) * 1000)
    : 1000;
    
  const scoreMan = fields["マネジメント系"].total > 0 
    ? Math.round((fields["マネジメント系"].correct / fields["マネジメント系"].total) * 1000)
    : 1000;
    
  const scoreTech = fields["テクノロジ系"].total > 0 
    ? Math.round((fields["テクノロジ系"].correct / fields["テクノロジ系"].total) * 1000)
    : 1000;

  const scoreSubB = fields["科目B"].total > 0
    ? Math.round((fields["科目B"].correct / fields["科目B"].total) * 1000)
    : 1000;
    
  const passesTotal = scoreTotal >= 600;
  const passesStrat = scoreStrat >= 300;
  const passesMan = scoreMan >= 300;
  const passesTech = scoreTech >= 300;
  const passesSubB = scoreSubB >= 300;
  
  const hasSubB = fields["科目B"].total > 0;
  const isPassed = passesTotal && passesStrat && passesMan && passesTech && (!hasSubB || passesSubB);
  if (window.StudyAI) StudyAI.track({
    subject: currentSubject === 'sg' ? 'sg' : 'itpass',
    eventType: 'exam_result',
    itemId: activeCbtExam.year || 'cbt',
    topic: 'CBT mock exam',
    success: isPassed,
    score: Math.round(scoreTotal / 10),
    source: 'official',
    metadata: { correctCount, totalQuestions, scoreTotal, autoSubmitted: auto }
  });
  
  // Render result view
  document.getElementById("cbt-testing-screen").style.display = "none";
  document.getElementById("cbt-results-screen").style.display = "flex";
  
  document.getElementById("cbt-score-total").innerText = scoreTotal;
  
  const badge = document.getElementById("cbt-pass-status-badge");
  badge.className = `pass-status-badge ${isPassed ? 'pass' : 'fail'}`;
  badge.innerText = isPassed ? "合格" : "不合格";
  
  document.getElementById("cbt-field-score-strat").innerText = `${scoreStrat} / 1000 点`;
  document.getElementById("cbt-field-bar-strat").style.width = `${scoreStrat / 10}%`;
  const stratStatus = document.getElementById("cbt-field-status-strat");
  stratStatus.innerText = passesStrat ? "合格 (>=300)" : "基準点未達 (<300)";
  stratStatus.style.color = passesStrat ? "var(--success-color)" : "#f87171";
  
  document.getElementById("cbt-field-score-man").innerText = `${scoreMan} / 1000 点`;
  document.getElementById("cbt-field-bar-man").style.width = `${scoreMan / 10}%`;
  const manStatus = document.getElementById("cbt-field-status-man");
  manStatus.innerText = passesMan ? "合格 (>=300)" : "基準点未達 (<300)";
  manStatus.style.color = passesMan ? "var(--success-color)" : "#f87171";
  
  document.getElementById("cbt-field-score-tech").innerText = `${scoreTech} / 1000 点`;
  document.getElementById("cbt-field-bar-tech").style.width = `${scoreTech / 10}%`;
  const techStatus = document.getElementById("cbt-field-status-tech");
  techStatus.innerText = passesTech ? "合格 (>=300)" : "基準点未達 (<300)";
  techStatus.style.color = passesTech ? "var(--success-color)" : "#f87171";

  // Subject B UI updates
  const subbItem = document.getElementById("cbt-field-score-item-subb");
  if (subbItem) {
    if (hasSubB) {
      subbItem.style.display = "block";
      document.getElementById("cbt-field-score-subb").innerText = `${scoreSubB} / 1000 点`;
      document.getElementById("cbt-field-bar-subb").style.width = `${scoreSubB / 10}%`;
      const subbStatus = document.getElementById("cbt-field-status-subb");
      subbStatus.innerText = passesSubB ? "合格 (>=300)" : "基準点未達 (<300)";
      subbStatus.style.color = passesSubB ? "var(--success-color)" : "#f87171";
    } else {
      subbItem.style.display = "none";
    }
  }
  
  // Render review records — card-based layout
  const reviewList = document.getElementById("cbt-results-table-body");
  reviewList.innerHTML = "";

  const alphabet = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"];
  reviews.forEach(r => {
    const card = document.createElement("div");
    card.className = "exam-review-card";
    card.id = `review-card-${r.num}`;

    const userAnsText = r.isAnswered ? alphabet[r.userOriginalIdx] : "未答";
    const statusIcon = r.isCorrect ? "correct" : "incorrect";
    const statusLabel = r.isCorrect ? I18n.t("exam.resultCorrect") : I18n.t("exam.resultIncorrect");

    // Build summary: strip HTML tags for a clean 2-line summary
    const questionText = r.question.replace(/<[^>]*>/g, "").trim();

    card.innerHTML = `
      <div class="exam-review-row">
        <div class="exam-review-qno">${r.num}</div>
        <div class="exam-review-question">${questionText}</div>
        <div class="exam-review-answer">${userAnsText}</div>
        <div class="exam-review-correct">${alphabet[r.correctIdx]}</div>
        <div class="exam-review-status ${statusIcon}">${statusIcon === "correct" ? "✓" : "✗"} ${statusLabel}</div>
        <div class="exam-review-action">
          <button class="exam-review-detail-btn" type="button" data-review-num="${r.num}">
            <span data-i18n="exam.tableActionDetail">${I18n.t("exam.tableActionDetail")}</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>
      <div class="exam-review-detail" id="review-detail-${r.num}" hidden>
        <div class="exam-review-detail-inner"></div>
      </div>
    `;

    // Click on row (not button) toggles expansion
    card.addEventListener("click", (e) => {
      if (e.target.closest(".exam-review-detail-btn")) return;
      toggleReviewRowExpansion(r);
    });

    // Detail button click
    const detailBtn = card.querySelector(".exam-review-detail-btn");
    detailBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleReviewRowExpansion(r);
    });

    reviewList.appendChild(card);
  });

  // ── Persist exam history to localStorage (Round 23.1) ──
  try {
    var _scoreData = {
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      scoreTotal: scoreTotal,
      isPassed: isPassed,
      fieldScores: {
        strat: { score: scoreStrat, count: fields["ストラテジ系"].total, correct: fields["ストラテジ系"].correct, passes: passesStrat },
        man:   { score: scoreMan,   count: fields["マネジメント系"].total, correct: fields["マネジメント系"].correct, passes: passesMan },
        tech:  { score: scoreTech,  count: fields["テクノロジ系"].total, correct: fields["テクノロジ系"].correct, passes: passesTech },
        subB:  hasSubB ? { score: scoreSubB, count: fields["科目B"].total, correct: fields["科目B"].correct, passes: passesSubB } : null
      }
    };
    var _record = buildExamHistoryRecord(activeCbtExam, reviews, _scoreData);
    saveExamHistoryRecord(_record);
  } catch (_histErr) {
    console.warn('[ExamHistory] Unexpected error during save:', _histErr);
  }

  activeCbtExam = null;
  
  showToastKey(isPassed ? "toast.examPassed" : "toast.examFailed", isPassed ? "success" : "info");
}

function buildTextbookPdfHash(page, highlightTerm = null) {
  const hashParts = [];
  const safePage = Number(page);
  if (Number.isFinite(safePage) && safePage > 0) {
    hashParts.push(`page=${Math.floor(safePage)}`);
  }
  hashParts.push("zoom=150");
  if (highlightTerm) {
    hashParts.push(`search="${encodeURIComponent(highlightTerm)}"`);
  }
  return `#${hashParts.join("&")}`;
}

function getActiveTextbookPdfName() {
  return currentSubject === 'sg' ? SG_TEXTBOOK_PDF : ITPASS_TEXTBOOK_PDF;
}

function buildTextbookPdfEndpoint() {
  return `/getpdf?file=${encodeURIComponent(getActiveTextbookPdfName())}`;
}

function buildDirectTextbookPdfUrl() {
  return encodeURI(getActiveTextbookPdfName());
}

async function resolveTextbookPdfUrl(page, overridePdfName = null, highlightTerm = null) {
  const hash = buildTextbookPdfHash(page, highlightTerm);

  if (currentPdfObjectUrl) {
    URL.revokeObjectURL(currentPdfObjectUrl);
    currentPdfObjectUrl = null;
  }

  const pdfFile = overridePdfName || getActiveTextbookPdfName();
  const endpoint = `/getpdf?file=${encodeURIComponent(pdfFile)}`;
  const directUrl = encodeURI(pdfFile);

  const candidates = [
    endpoint,
    directUrl
  ];

  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: "force-cache" });
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok || !contentType.toLowerCase().includes("pdf")) {
        throw new Error(`PDF request failed: ${response.status} ${contentType}`);
      }
      const blob = await response.blob();
      currentPdfObjectUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      return `${currentPdfObjectUrl}${hash}`;
    } catch (error) {
      console.warn(`Unable to load PDF through ${url}.`, error);
    }
  }

  return `${directUrl}${hash}`;
}

async function openTextbookPdf(page = null, title = "原书 PDF", overridePdfName = null, highlightTerm = null) {
  const panel = document.getElementById("pdf-viewer-panel");
  const iframe = document.getElementById("embedded-pdf-iframe");
  const lessonContent = document.querySelector(".lesson-content");
  const titleEl = document.getElementById("pdf-panel-title");

  if (!panel || !iframe || !lessonContent) return;

  const pageLabel = page ? ` / p.${page}` : "";
  titleEl.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${title}${pageLabel}`;
  panel.style.display = "flex";
  panel.setAttribute("aria-hidden", "false");
  lessonContent.classList.add("pdf-active");

  iframe.removeAttribute("src");
  iframe.src = await resolveTextbookPdfUrl(page, overridePdfName, highlightTerm);
}

function openTextbookPdfForCurrentLesson() {
  if (currentSubject === 'sg') {
    const lesson = (typeof SG_LESSONS !== 'undefined') ? SG_LESSONS.find(l => l.id === currentSgLessonId) : null;
    if (!lesson) {
      openTextbookPdf();
      return;
    }
    openTextbookPdf(lesson.pdfPage, lesson.titleJa || "原书 PDF", null, lesson.pdfHighlightTerm);
  } else if (currentSubject === 'java') {
    const lesson = (typeof JAVA_LESSONS !== 'undefined') ? JAVA_LESSONS.find(l => l.id === currentJavaLessonId) : null;
    if (!lesson) {
      openTextbookPdf();
      return;
    }
    const pdfName = lesson.book === "入門編" ? "java入門編.pdf" : "java実践編.pdf";
    openTextbookPdf(lesson.pdfPage, lesson.titleJa, pdfName, lesson.pdfHighlightTerm);
  } else {
    const lesson = IT_PASSPORT_LESSONS.find(l => l.id === currentItPassLessonId);
    if (!lesson) {
      openTextbookPdf();
      return;
    }
    openTextbookPdf(lesson.pdfPage, lesson.titleJa || "原书 PDF", null, lesson.pdfHighlightTerm);
  }
}

function closeEmbeddedPdf() {
  const panel = document.getElementById("pdf-viewer-panel");
  const iframe = document.getElementById("embedded-pdf-iframe");
  const lessonContent = document.querySelector(".lesson-content");
  const btnText = document.getElementById("pdf-minimize-text");
  const btnIcon = document.getElementById("pdf-minimize-icon");

  if (panel) {
    panel.style.display = "none";
    panel.setAttribute("aria-hidden", "true");
    panel.classList.remove("minimized");
  }
  if (btnText) btnText.innerText = "最小化";
  if (btnIcon) btnIcon.className = "fa-solid fa-compress";
  if (iframe) iframe.removeAttribute("src");
  if (currentPdfObjectUrl) {
    URL.revokeObjectURL(currentPdfObjectUrl);
    currentPdfObjectUrl = null;
  }
  if (lessonContent) lessonContent.classList.remove("pdf-active");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeEmbeddedPdf();
  }
});

function toggleReviewRowExpansion(r) {
  const targetCard = document.getElementById(`review-card-${r.num}`);
  const detailDiv = document.getElementById(`review-detail-${r.num}`);
  const detailInner = detailDiv ? detailDiv.querySelector(".exam-review-detail-inner") : null;
  const detailBtn = targetCard ? targetCard.querySelector(".exam-review-detail-btn") : null;

  if (!detailDiv || !detailInner) return;

  // If already expanded, collapse
  if (!detailDiv.hidden) {
    detailDiv.hidden = true;
    if (detailBtn) {
      detailBtn.innerHTML = `<span>${I18n.t("exam.tableActionDetail")}</span> <i class="fa-solid fa-chevron-down"></i>`;
      detailBtn.setAttribute("aria-expanded", "false");
    }
    return;
  }

  // Collapse any other open details first
  document.querySelectorAll(".exam-review-detail:not([hidden])").forEach(el => {
    el.hidden = true;
    const btn = el.closest(".exam-review-card")?.querySelector(".exam-review-detail-btn");
    if (btn) {
      btn.innerHTML = `<span>${I18n.t("exam.tableActionDetail")}</span> <i class="fa-solid fa-chevron-down"></i>`;
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Build expansion content
  const alphabet = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"];
  let choicesHtml = "";
  r.options.forEach((opt, oIdx) => {
    let statusClass = "";
    if (opt.originalIdx === r.correctIdx) {
      statusClass = "correct";
    } else if (opt.originalIdx === r.userOriginalIdx) {
      statusClass = "incorrect";
    }

    choicesHtml += `
      <div class="review-choice-item-box ${statusClass}">
        <span class="review-choice-badge">${alphabet[oIdx]}.</span>
        <span>${opt.text}</span>
      </div>
    `;
  });

  // Build meta info (weakened, at bottom)
  const metaParts = [];
  if (r.category) metaParts.push(r.category);
  if (r.subcategory) metaParts.push(r.subcategory);
  if (r.topic) metaParts.push(r.topic);
  if (r.qNum) metaParts.push("問" + r.qNum);
  const metaText = metaParts.length ? I18n.t("exam.metaSource") + " " + metaParts.join(" / ") : "";

  detailInner.innerHTML = `
    <div class="review-q-text">${r.question}</div>

    <div class="review-q-choices-panel">
      ${choicesHtml}
    </div>

    <div class="review-kaisetsu-box">
      <h4><i class="fa-solid fa-clipboard-question"></i> ${I18n.t("exam.reviewExplanation")}</h4>
      <div class="review-kaisetsu-text">
        ${formatMarkdown(r.explanation)}
      </div>
    </div>

    ${metaText ? `<div class="exam-review-meta-info">${metaText}</div>` : ""}
  `;

  // Open
  detailDiv.hidden = false;
  if (detailBtn) {
    detailBtn.innerHTML = `<span>${I18n.t("exam.reviewCollapse")}</span> <i class="fa-solid fa-chevron-up"></i>`;
    detailBtn.setAttribute("aria-expanded", "true");
  }

  detailDiv.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function closeCbtResults() {
  document.getElementById("cbt-results-screen").style.display = "none";
  document.getElementById("cbt-config-screen").style.display = "flex";
}


// ==================== PYTHON LEARNING HUB FUNCTIONS ====================

function selectPythonLesson(id) {
  const oldActive = document.getElementById(`nav-item-python-${currentPythonLessonId}`);
  if (oldActive) oldActive.classList.remove("active");
  
  currentPythonLessonId = id;
  
  const newActive = document.getElementById(`nav-item-python-${currentPythonLessonId}`);
  if (newActive) {
    newActive.classList.add("active");
    
    document.querySelectorAll(".sidebar-chapter-header").forEach(el => el.classList.remove("active-parent"));
    
    const chBody = newActive.parentElement;
    if (chBody && chBody.classList.contains("sidebar-chapter-body")) {
      const chHeader = chBody.previousElementSibling;
      if (chHeader && chHeader.classList.contains("sidebar-chapter-header")) {
        chHeader.classList.add("active-parent");
      }
    }
    newActive.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  
  loadPythonLesson(id);
}

function loadPythonLesson(id) {
  document.body.classList.remove('mobile-sidebar-open');
  if (typeof PYTHON_LESSONS === 'undefined') return;
  const lesson = PYTHON_LESSONS.find(l => l.id === id);
  if (!lesson) return;

  currentPythonLessonId = id;

  // Resolve localized title/concept for current subject
  const localized = getLessonLocalizedText("python", lesson);

  // Header
  const badge = document.getElementById("lesson-section-badge");
  badge.innerText = `${lesson.book} — 第 ${lesson.subSectionId} 节`;
  badge.className = "lesson-badge python-badge";
  document.getElementById("lesson-title-ja").innerText = localized && localized.title ? localized.title : lesson.titleJa;
  document.getElementById("lesson-title-zh").innerText = lesson.titleZh;

  // Hide locate PDF button
  const pdfBtn = document.getElementById("locate-pdf-btn");
  if (pdfBtn) {
    pdfBtn.style.display = "none";
  }

  // Concept Body
  if (localized && localized.concept) {
    document.getElementById("concept-ja-body").innerHTML = formatMarkdown(localized.concept);
  } else {
    document.getElementById("concept-ja-body").innerHTML = lesson.conceptJa;
  }
  document.getElementById("concept-zh-body").innerHTML = lesson.conceptZh;

  // Analogy
  document.getElementById("lesson-analogy").innerText = lesson.analogy || "";

  // Code Example
  const preBlock = document.getElementById("example-pre-block");
  const codeEl = document.getElementById("lesson-example");
  const copyBtn = document.getElementById("copy-example-btn");
  const glossaryBlock = document.getElementById("lesson-glossary");
  const exampleTitle = document.getElementById("example-header-title");

  // Collapse example card
  const exCard = document.getElementById("example-card");
  exCard.classList.add("collapsed");
  preBlock.style.display = "none";
  glossaryBlock.style.display = "none";
  const exIcon = document.getElementById("example-toggle-icon");
  if (exIcon) exIcon.style.transform = "rotate(-90deg)";
  
  codeEl.textContent = lesson.example || "";
  codeEl.className = "language-python";
  copyBtn.style.display = "inline-flex";
  exampleTitle.innerHTML = `<i class="fa-brands fa-python"></i> Python コード例 (示例代码)`;

  // Theory lesson locker
  const pythonEditor = document.getElementById("python-editor");
  const pythonRunBtn = document.querySelector(".python-run-btn");
  if (!lesson.example) {
    exCard.style.display = "none";
    if (pythonEditor) {
      pythonEditor.value = "# 本节为纯概念理论课，无需编写或运行代码。\n# 请阅读左侧的教材讲解，并完成随堂练习！";
      pythonEditor.readOnly = true;
      pythonEditor.style.opacity = "0.7";
      pythonEditor.style.cursor = "not-allowed";
    }
    if (pythonRunBtn) {
      pythonRunBtn.disabled = true;
      pythonRunBtn.style.opacity = "0.4";
      pythonRunBtn.style.cursor = "not-allowed";
      pythonRunBtn.style.animation = "none";
    }
    const statusLbl = document.getElementById("python-sandbox-status");
    if (statusLbl) {
      statusLbl.textContent = "理论课免执行 / Concept Lesson";
    }
  } else {
    exCard.style.display = "block";
    if (pythonEditor) {
      pythonEditor.readOnly = false;
      pythonEditor.style.opacity = "1";
      pythonEditor.style.cursor = "text";
    }
    if (pythonRunBtn) {
      pythonRunBtn.disabled = false;
      pythonRunBtn.style.opacity = "1";
      pythonRunBtn.style.cursor = "pointer";
      pythonRunBtn.style.animation = "pulse-glow 3s infinite ease-in-out";
    }
    const statusLbl = document.getElementById("python-sandbox-status");
    if (statusLbl) {
      statusLbl.textContent = "準備完了 / Ready";
    }
  }

  // Vocab flashcards section display
  document.getElementById("python-vocab-section").style.display =
    (lesson.vocabList && lesson.vocabList.length > 0) ? "flex" : "none";
  
  // Quiz
  document.getElementById("itpass-quiz-nav").style.display = "none";
  loadPythonQuiz(lesson);
  if (window.I18n) window.I18n.applyLessonTranslation(lesson);

  // Load code sandbox
  const chapKey = `python-${lesson.chapterId}`;
  if (typeof PythonSandbox !== 'undefined' && lastLoadedPythonChapterId !== chapKey) {
    lastLoadedPythonChapterId = chapKey;
    PythonSandbox.loadLesson(lesson);
  } else if (typeof PythonSandbox !== 'undefined') {
    PythonSandbox.loadLesson(lesson);
  }

  // Update sandbox header label
  const lbl = document.getElementById("python-sandbox-lesson-title");
  if (lbl) {
    lbl.textContent = `第 ${lesson.subSectionId} 节: ${lesson.titleJa}`;
  }

  // Scroll content to top
  document.querySelector(".lesson-content").scrollTop = 0;
}

function loadPythonQuiz(lesson) {
  if (!lesson.quizList || lesson.quizList.length === 0) {
    document.getElementById("itpass-quiz-nav").style.display = "none";
    document.getElementById("quiz-question").innerText = "本章暂无课后练习。";
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }
  
  document.getElementById("itpass-quiz-nav").style.display = "flex";
  
  const completedPythonQuizSaved = localStorage.getItem(`python_quiz_completed_${lesson.id}`);
  let completedQuizIndices = [];
  if (completedPythonQuizSaved) {
    try {
      completedQuizIndices = JSON.parse(completedPythonQuizSaved);
    } catch(e) {
      completedQuizIndices = [];
    }
  }
  lesson.completedQuizIndices = completedQuizIndices;
  
  pythonQuizIdx = 0;
  selectedPythonQuizOption = null;
  renderPythonQuizQuestion();
}

function renderPythonQuizQuestion() {
  const lesson = (typeof PYTHON_LESSONS !== 'undefined') ? PYTHON_LESSONS.find(l => l.id === currentPythonLessonId) : null;
  if (!lesson || !lesson.quizList || lesson.quizList.length === 0) return;

  const totalQuizzes = lesson.quizList.length;
  document.getElementById("itpass-quiz-progress-text").innerText = `問題 ${pythonQuizIdx + 1} / 共 ${totalQuizzes} 题`;
  
  const quiz = lesson.quizList[pythonQuizIdx];
  const useZhQuiz = selectedLang === 'zh' && !(window.I18n && window.I18n.isActive());
  document.getElementById("quiz-question").innerText = (useZhQuiz && quiz.questionZh) ? quiz.questionZh : quiz.question;
  
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";
  selectedPythonQuizOption = null;
  
  const feedback = document.getElementById("quiz-feedback");
  feedback.className = "quiz-feedback hidden";
  
  quiz.options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "quiz-option";
    optDiv.innerHTML = `
      <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
      <div class="option-text">${opt}</div>
    `;
    optDiv.addEventListener("click", () => {
      document.querySelectorAll(".quiz-option").forEach(el => el.classList.remove("selected"));
      optDiv.classList.add("selected");
      selectedPythonQuizOption = idx;
    });
    optionsContainer.appendChild(optDiv);
  });
}

function pythonQuizPrev() {
  if (pythonQuizIdx > 0) {
    pythonQuizIdx--;
    renderPythonQuizQuestion();
  } else {
    showToastKey("toast.alreadyFirst", "info");
  }
}

function pythonQuizNext() {
  const lesson = (typeof PYTHON_LESSONS !== 'undefined') ? PYTHON_LESSONS.find(l => l.id === currentPythonLessonId) : null;
  if (lesson && pythonQuizIdx < lesson.quizList.length - 1) {
    pythonQuizIdx++;
    renderPythonQuizQuestion();
  } else {
    showToastKey("toast.alreadyLast", "info");
  }
}

function markPythonProgress(lessonId, action) {
  const key = 'python_progress_' + lessonId;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (action === 'quiz') data.quizDone = true;
  if (action === 'code_run') data.codeRun = true;
  localStorage.setItem(key, JSON.stringify(data));
  
  if (data.quizDone && !completedPythonLessons.includes(lessonId)) {
    completedPythonLessons.push(lessonId);
    saveProgress();
    
    const lesson = (typeof PYTHON_LESSONS !== 'undefined') ? PYTHON_LESSONS.find(l => l.id === lessonId) : null;
    if (lesson) {
      const navItem = document.getElementById(`nav-item-python-${lessonId}`);
      if (navItem) {
        navItem.classList.add("completed");
        const icon = navItem.querySelector(".nav-status-icon");
        if (icon) {
          icon.className = "fa-solid fa-circle-check nav-status-icon";
        }
      }
      initSidebar();
    }
  }
}

function togglePythonOutputDetails() {
  const card = document.getElementById("python-output-card");
  const header = document.querySelector(".python-output-header");
  const body = document.getElementById("python-output-card-body");
  const icon = document.getElementById("python-output-toggle-icon");
  
  const isCollapsed = body.style.display === "none";
  if (isCollapsed) {
    body.style.display = "flex";
    card.classList.remove("collapsed");
    header.classList.remove("collapsed");
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    body.style.display = "none";
    card.classList.add("collapsed");
    header.classList.add("collapsed");
    if (icon) icon.style.transform = "rotate(-90deg)";
  }
}

function toggleMaximizePythonOutput() {
  const card = document.getElementById("python-output-card");
  const btn = document.getElementById("python-output-maximize-btn");
  const overlay = document.getElementById("maximize-overlay");
  const isMaximized = card.classList.toggle("maximized");
  
  if (isMaximized) {
    if (btn) btn.innerHTML = `<i class="fa-solid fa-compress"></i> 还原`;
    if (btn) btn.classList.add('active');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  } else {
    if (btn) btn.innerHTML = `<i class="fa-solid fa-expand"></i> 最大化`;
    if (btn) btn.classList.remove('active');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
}

// ============================================================================
// ==================== PRACTICAL CODING EXAM MODE SYSTEM ====================
// ============================================================================

// Switch SQL sub modes (Lessons/Sandbox vs Mock Exam)
function switchSqlSubMode(mode) {
  sqlSubMode = mode;
  document.getElementById("sql-sub-tab-lessons").classList.toggle("active", mode === "lessons");
  document.getElementById("sql-sub-tab-exam").classList.toggle("active", mode === "exam");
  
  handleSubModeViewToggle(mode);
  
  if (mode === "lessons") {
    initSidebar();
    loadLesson(currentLessonId);
  } else {
    initCodingExamSubLayout();
  }
}

// Switch Python sub modes (Lessons/Sandbox vs Mock Exam)
function switchPythonSubMode(mode) {
  pythonSubMode = mode;
  document.getElementById("python-sub-tab-lessons").classList.toggle("active", mode === "lessons");
  document.getElementById("python-sub-tab-exam").classList.toggle("active", mode === "exam");
  
  handleSubModeViewToggle(mode);
  
  if (mode === "lessons") {
    initSidebar();
    loadPythonLesson(currentPythonLessonId);
  } else {
    initCodingExamSubLayout();
  }
}

// Switch Java sub modes (Lessons/Sandbox vs Mock Exam)
function switchJavaSubMode(mode) {
  javaSubMode = mode;
  
  // Update tabs (NYUMON/JISSEN / EXAM)
  document.getElementById("java-sub-tab-nyumon").classList.toggle("active", mode === "lessons" && currentJavaBook === "nyumon");
  document.getElementById("java-sub-tab-jissen").classList.toggle("active", mode === "lessons" && currentJavaBook === "jissen");
  document.getElementById("java-sub-tab-exam").classList.toggle("active", mode === "exam");
  
  handleSubModeViewToggle(mode);
  
  if (mode === "lessons") {
    initSidebar();
    loadJavaLesson(currentJavaLessonId);
  } else {
    initCodingExamSubLayout();
  }
}

// Helper to toggle between textbook concept views and exam configurations
function handleSubModeViewToggle(mode) {
  // Select the textbook concept card (first .content-card without exam prefixes)
  const textbookCard = document.querySelector(".lesson-content > .content-card:not([class*='coding-exam'])");
  const configPanel = document.getElementById("coding-exam-config");
  const runningPanel = document.getElementById("coding-exam-panel");
  const resultsPanel = document.getElementById("coding-exam-results");
  
  if (mode === "lessons") {
    if (textbookCard) textbookCard.style.display = "flex";
    if (configPanel) configPanel.style.display = "none";
    if (runningPanel) runningPanel.style.display = "none";
    if (resultsPanel) resultsPanel.style.display = "none";
    closeEmbeddedPdf();
  } else {
    if (textbookCard) textbookCard.style.display = "none";
    closeEmbeddedPdf();
  }
}

// Initialize the launch config panel or resume the running exam
function initCodingExamSubLayout() {
  const configPanel = document.getElementById("coding-exam-config");
  const runningPanel = document.getElementById("coding-exam-panel");
  const resultsPanel = document.getElementById("coding-exam-results");
  
  const configTitle = document.getElementById("coding-config-title");
  const configDesc = document.getElementById("coding-config-desc");
  
  if (currentSubject === "sql") {
    configTitle.innerText = "SQL 实操模拟考试 (実技模試)";
    configDesc.innerText = "本考试模拟日本 IT 专门学校的 SQL 实操考试模式。在限定时间内，根据给定的日文文字任务在右侧 SQL 沙盒中查询对应的数据，点击“判定”按钮提交测试。";
  } else if (currentSubject === "java") {
    configTitle.innerText = "Java 实操模拟考试 (実技模試)";
    configDesc.innerText = "本考试模拟日本 IT 专门学校的 Java 编程能力测试。在限定时间内，在右侧 Java 沙盒中实现对应程序逻辑，通过编译与 stdout 输出比对即算通过。";
  } else if (currentSubject === "python") {
    configTitle.innerText = "Python 实操模拟考试 (実技模試)";
    configDesc.innerText = "本考试模拟日本 IT 专门学校的 Python 编程能力测试。在限定时间内，在右侧 Python 沙盒中编写对应程序逻辑，完成预期的 stdout 输出比对即算通过。";
  }
  
  // Show right panel based on current state
  if (activeCodingExam && activeCodingExam.subject === currentSubject) {
    if (activeCodingExam.isSubmitted) {
      if (configPanel) configPanel.style.display = "none";
      if (runningPanel) runningPanel.style.display = "none";
      if (resultsPanel) resultsPanel.style.display = "flex";
      renderCodingExamResults();
    } else {
      if (configPanel) configPanel.style.display = "none";
      if (runningPanel) runningPanel.style.display = "flex";
      if (resultsPanel) resultsPanel.style.display = "none";
      renderCodingQuestion();
    }
  } else {
    if (configPanel) configPanel.style.display = "flex";
    if (runningPanel) runningPanel.style.display = "none";
    if (resultsPanel) resultsPanel.style.display = "none";
  }
  initSidebar();
}

// Determine if a coding exam is running and matches subject
function isCodingExamActiveAndRunning() {
  return activeCodingExam && activeCodingExam.subject === currentSubject && !activeCodingExam.isSubmitted;
}

// Start Coding Exam (Launches the timer and prepares questions)
function startCodingExam() {
  const countSelect = parseInt(document.getElementById("coding-exam-count").value);
  
  let pool = [];
  if (currentSubject === 'sql') pool = [...SQL_EXAM_QUESTIONS];
  else if (currentSubject === 'java') pool = [...JAVA_EXAM_QUESTIONS];
  else if (currentSubject === 'python') pool = [...PYTHON_EXAM_QUESTIONS];
  
  if (pool.length === 0) {
    showToastKey("toast.examDbNotFound", "error");
    return;
  }
  
  // Randomly select count questions (and sort by ID)
  const poolCopy = [...pool];
  for (let i = poolCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]];
  }
  const selectedQ = poolCopy.slice(0, countSelect).sort((a, b) => a.id - b.id);
  
  // Set global state
  activeCodingExam = {
    subject: currentSubject,
    title: currentSubject === "sql" ? "SQL 实操能力模拟测试" : (currentSubject === "java" ? "Java 编程能力模拟测试" : "Python 编程能力模拟测试"),
    questions: selectedQ,
    currentQIdx: 0,
    userCodes: {},
    userStatuses: {},
    flags: new Array(selectedQ.length).fill(false),
    timeRemaining: countSelect * 180, // 3 minutes per question
    timeSpent: 0,
    isSubmitted: false
  };
  
  // Initialize grid states
  selectedQ.forEach(q => {
    activeCodingExam.userStatuses[q.id] = 'idle'; // 'idle' | 'passed' | 'failed'
    
    // Set standard templates
    if (currentSubject === 'sql') {
      activeCodingExam.userCodes[q.id] = '-- 这里输入 SQL 语句...\n';
    } else if (currentSubject === 'java') {
      activeCodingExam.userCodes[q.id] = q.templateCode || '';
    } else if (currentSubject === 'python') {
      activeCodingExam.userCodes[q.id] = q.templateCode || '';
    }
  });
  
  // Switch layouts
  document.getElementById("coding-exam-config").style.display = "none";
  document.getElementById("coding-exam-panel").style.display = "flex";
  document.getElementById("coding-exam-results").style.display = "none";
  
  // Start Timer
  startCodingTimer();
  
  // Render
  renderCodingQuestion();
  initSidebar();
  
  showToastKey("toast.practicalExamStarted", "success");
}

// Timer loops every 1 second
function startCodingTimer() {
  if (cbtTimerInterval) clearInterval(cbtTimerInterval);
  
  const timerDisplay = document.getElementById("coding-timer-display");
  if (timerDisplay) {
    const min = Math.floor(activeCodingExam.timeRemaining / 60);
    const sec = activeCodingExam.timeRemaining % 60;
    timerDisplay.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
  
  cbtTimerInterval = setInterval(() => {
    if (!activeCodingExam || activeCodingExam.isSubmitted) {
      clearInterval(cbtTimerInterval);
      return;
    }
    
    activeCodingExam.timeRemaining--;
    activeCodingExam.timeSpent++;
    
    const min = Math.floor(activeCodingExam.timeRemaining / 60);
    const sec = activeCodingExam.timeRemaining % 60;
    if (timerDisplay) {
      timerDisplay.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
      if (activeCodingExam.timeRemaining < 180) {
        timerDisplay.parentElement.style.background = "rgba(239, 68, 68, 0.25)";
        timerDisplay.style.color = "#ef4444";
      } else {
        timerDisplay.parentElement.style.background = "rgba(239, 68, 68, 0.1)";
        timerDisplay.style.color = "#f87171";
      }
    }
    
    if (activeCodingExam.timeRemaining <= 0) {
      clearInterval(cbtTimerInterval);
      showToastKey("toast.examTimeout", "error");
      submitCodingExam(true);
    }
  }, 1000);
}

// Render the active question in the running panel
function renderCodingQuestion() {
  if (!activeCodingExam) return;
  
  const idx = activeCodingExam.currentQIdx;
  const q = activeCodingExam.questions[idx];
  
  document.getElementById("coding-exam-display-title").innerText = activeCodingExam.title;
  document.getElementById("eq-number-text").innerText = `第 ${idx + 1} 题 / 問 ${idx + 1}`;
  document.getElementById("eq-diff-text").innerText = `难度: ${q.difficulty}`;
  
  // Set rules and texts
  document.getElementById("eq-task-ja").innerHTML = q.taskJa.replace(/\n/g, "<br>");
  document.getElementById("eq-task-zh").innerHTML = q.taskZh.replace(/\n/g, "<br>");
  
  // Set expected output box
  const expectedBox = document.getElementById("eq-expected-output-box");
  if (currentSubject === 'sql') {
    expectedBox.style.display = "none";
  } else {
    expectedBox.style.display = "block";
    document.getElementById("eq-expected-output").innerText = q.expectedOutput;
  }
  
  // Update flag button state
  const flagBtn = document.getElementById("eq-flag-btn");
  if (flagBtn) {
    const isFlagged = activeCodingExam.flags[idx];
    flagBtn.classList.toggle("flagged", isFlagged);
    flagBtn.innerHTML = isFlagged 
      ? `<i class="fa-solid fa-flag" style="color:#f87171;"></i> 已标记复查`
      : `<i class="fa-regular fa-flag"></i> 标记此题复查`;
  }
  
  // Update Verification Status Badge
  const statusBadge = document.getElementById("eq-verify-status-badge");
  const status = activeCodingExam.userStatuses[q.id];
  statusBadge.className = "verify-status-badge";
  if (status === 'passed') {
    statusBadge.innerText = "判定通过 (Passed ✓)";
    statusBadge.classList.add("passed");
    statusBadge.style.color = "var(--success-color)";
    statusBadge.style.background = "var(--success-glow)";
  } else if (status === 'failed') {
    statusBadge.innerText = "未通过 (Failed ✗)";
    statusBadge.classList.add("failed");
    statusBadge.style.color = "var(--error-color)";
    statusBadge.style.background = "var(--error-glow)";
  } else {
    statusBadge.innerText = "未作答 (未着手)";
    statusBadge.style.color = "var(--text-muted)";
    statusBadge.style.background = "rgba(255,255,255,0.05)";
  }
  
  // Load code in Editor
  const currentCode = activeCodingExam.userCodes[q.id];
  if (currentSubject === 'sql') {
    const editor = document.getElementById("sql-editor");
    if (editor) {
      editor.value = currentCode;
      setupEditorLineNumbers();
    }
    
    // SQL Schema check
    if (q.dbGroup && q.dbGroup !== currentDBGroup) {
      switchDBGroup(q.dbGroup);
    }
  } else if (currentSubject === 'java') {
    const editor = document.getElementById("java-editor");
    if (editor) {
      editor.value = currentCode;
      if (typeof JavaSandbox !== 'undefined') {
        JavaSandbox.setTemplate(currentCode);
      }
    }
    // Set standard input
    const stdinEl = document.getElementById("java-input-content");
    if (stdinEl) stdinEl.value = q.stdinExample || "";
  } else if (currentSubject === 'python') {
    const editor = document.getElementById("python-editor");
    if (editor) {
      editor.value = currentCode;
      if (typeof PythonSandbox !== 'undefined') {
        PythonSandbox.setTemplate(currentCode);
      }
    }
    // Set standard input
    const stdinEl = document.getElementById("python-input-content");
    if (stdinEl) stdinEl.value = q.stdinExample || "";
  }
  
  // Render navigator grid
  renderCodingNavigatorGrid();
  // Wrap tables for horizontal scroll
  if (window.GlossaryWrapper && typeof window.GlossaryWrapper.wrapAllTables === "function") {
    window.GlossaryWrapper.wrapAllTables();
  } else {
    wrapAllTablesWithScrollWrapper();
  }
}

// Render grid navigator indices
function renderCodingNavigatorGrid() {
  const container = document.getElementById("coding-navigator-grid");
  if (!container || !activeCodingExam) return;
  
  container.innerHTML = "";
  activeCodingExam.questions.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.className = "cbt-grid-btn";
    btn.id = `coding-grid-btn-${idx}`;
    btn.innerText = idx + 1;
    
    // Colors
    btn.classList.toggle("active", idx === activeCodingExam.currentQIdx);
    
    const status = activeCodingExam.userStatuses[q.id];
    if (status === 'passed') btn.classList.add("answered");
    else if (status === 'failed') btn.classList.add("flagged"); // red/grey indicator
    
    btn.addEventListener("click", () => jumpToCodingQuestion(idx));
    container.appendChild(btn);
  });
}

// Jump to specific index in active exam
function jumpToCodingQuestion(idx) {
  if (!activeCodingExam) return;
  
  // Save current code
  const oldQ = activeCodingExam.questions[activeCodingExam.currentQIdx];
  if (activeCodingExam.subject === 'sql') {
    activeCodingExam.userCodes[oldQ.id] = document.getElementById("sql-editor").value;
  } else if (activeCodingExam.subject === 'java') {
    activeCodingExam.userCodes[oldQ.id] = document.getElementById("java-editor").value;
  } else if (activeCodingExam.subject === 'python') {
    activeCodingExam.userCodes[oldQ.id] = document.getElementById("python-editor").value;
  }
  
  activeCodingExam.currentQIdx = idx;
  renderCodingQuestion();
  initSidebar();
}

function codingPrevQuestion() {
  if (!activeCodingExam) return;
  if (activeCodingExam.currentQIdx > 0) {
    jumpToCodingQuestion(activeCodingExam.currentQIdx - 1);
  } else {
    showToastKey("toast.alreadyFirst", "info");
  }
}

function codingNextQuestion() {
  if (!activeCodingExam) return;
  if (activeCodingExam.currentQIdx < activeCodingExam.questions.length - 1) {
    jumpToCodingQuestion(activeCodingExam.currentQIdx + 1);
  } else {
    showToastKey("toast.alreadyLast", "info");
  }
}

function toggleCodingQuestionFlag() {
  if (!activeCodingExam) return;
  const idx = activeCodingExam.currentQIdx;
  activeCodingExam.flags[idx] = !activeCodingExam.flags[idx];
  renderCodingQuestion();
  initSidebar();
}

// Helper to normalize newline chars and trim strings
function cleanStringOutput(str) {
  if (!str) return "";
  return str.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

// Compare SQL results objects (columns and rows list)
function compareSqlResults(resUser, resSol) {
  if (!resUser.success || !resSol.success) return false;
  if (!resUser.columns || !resSol.columns) return false;
  if (resUser.columns.length !== resSol.columns.length) return false;
  if (resUser.rows.length !== resSol.rows.length) return false;
  
  // Check column names
  for (let i = 0; i < resSol.columns.length; i++) {
    if (resUser.columns[i].toLowerCase() !== resSol.columns[i].toLowerCase()) return false;
  }
  
  // Format rows to string representation
  const formatRow = row => row.map(cell => cell === null ? 'NULL' : String(cell).trim()).join('|');
  const rowsUser = resUser.rows.map(formatRow);
  const rowsSol = resSol.rows.map(formatRow);
  
  // Verify order if it specifies ORDER BY
  const isOrdered = /ORDER\s+BY/i.test(resSol.message || '') || /ORDER\s+BY/i.test(resUser.message || '');
  if (!isOrdered) {
    rowsUser.sort();
    rowsSol.sort();
  }
  
  for (let i = 0; i < rowsSol.length; i++) {
    if (rowsUser[i] !== rowsSol[i]) return false;
  }
  return true;
}

// Verify student code against solution criteria (Auto-graders)
async function verifyCurrentCodingQuestion() {
  if (!activeCodingExam) return;
  
  const idx = activeCodingExam.currentQIdx;
  const q = activeCodingExam.questions[idx];
  const statusBadge = document.getElementById("eq-verify-status-badge");
  
  statusBadge.innerText = "正在验证 (判定中)...";
  statusBadge.className = "verify-status-badge";
  statusBadge.style.color = "var(--text-muted)";
  statusBadge.style.background = "rgba(255,255,255,0.05)";
  
  if (currentSubject === "sql") {
    const editor = document.getElementById("sql-editor");
    const code = editor ? editor.value.trim() : '';
    activeCodingExam.userCodes[q.id] = code;
    
    // Auto-expand output details
    const outputCard = document.getElementById("output-card");
    if (outputCard && outputCard.classList.contains("collapsed")) {
      toggleOutputDetails();
    }
    
    const statusDiv = document.getElementById("playground-status");
    const outputBody = document.getElementById("output-body");
    const countBadge = document.getElementById("output-row-count");
    
    // 1. Run User Code
    const resUser = sqlEngine.execute(code);
    
    if (!resUser.success) {
      statusDiv.innerHTML = `<span class="status-error"><i class="fa-solid fa-circle-exclamation"></i> 语法错误</span>`;
      countBadge.style.display = "none";
      outputBody.innerHTML = `<div class="output-error-box"><i class="fa-solid fa-triangle-exclamation"></i> SQLエラー:<br><br>${resUser.error}</div>`;
      
      activeCodingExam.userStatuses[q.id] = 'failed';
      renderCodingQuestion();
      initSidebar();
      showToastKey("toast.sqlSyntaxError", "error");
      return;
    }
    
    // 2. Render execution output
    let tableHtml = "";
    if (resUser.columns && resUser.columns.length > 0) {
      countBadge.innerText = `${resUser.rows.length}行`;
      countBadge.style.display = "inline";
      
      tableHtml += `<table class="result-table"><thead><tr>`;
      resUser.columns.forEach(col => {
        tableHtml += `<th>${col}</th>`;
      });
      tableHtml += `</tr></thead><tbody>`;
      resUser.rows.forEach(row => {
        tableHtml += `<tr>`;
        row.forEach(cell => {
          tableHtml += `<td>${cell === null ? '<span style="color:#64748b; font-style:italic;">NULL</span>' : cell}</td>`;
        });
        tableHtml += `</tr>`;
      });
      tableHtml += `</tbody></table>`;
    } else {
      countBadge.style.display = "none";
    }
    outputBody.innerHTML = tableHtml;
    statusDiv.innerHTML = `<span class="status-success"><i class="fa-solid fa-circle-check"></i> 実行成功 (执行成功)</span>`;
    
    // 3. Run Reference Query
    const resSol = sqlEngine.execute(q.solutionQuery);
    
    // 4. Compare Results
    const isCorrect = compareSqlResults(resUser, resSol);
    if (isCorrect) {
      activeCodingExam.userStatuses[q.id] = 'passed';
      statusDiv.innerHTML = `<span class="status-success"><i class="fa-solid fa-star"></i> 判定成功 (Passed ✓)</span>`;
    showToastKey("toast.verifySuccess", "success");
    } else {
      activeCodingExam.userStatuses[q.id] = 'failed';
      statusDiv.innerHTML = `<span class="status-error"><i class="fa-solid fa-circle-xmark"></i> 判定失敗 (结果不一致)</span>`;
      showToastKey("toast.sqlOutputMismatch", "error");
    }
    
    renderCodingQuestion();
    initSidebar();
    
  } else if (currentSubject === "java") {
    const editor = document.getElementById("java-editor");
    const code = editor ? editor.value.trim() : '';
    activeCodingExam.userCodes[q.id] = code;
    
    const outputCard = document.getElementById("java-output-card");
    const outputContent = document.getElementById("java-output-content");
    const sandboxStatus = document.getElementById("java-sandbox-status");
    
    if (outputCard && outputCard.classList.contains("collapsed")) {
      toggleJavaOutputDetails();
    }
    
    if (sandboxStatus) {
      sandboxStatus.innerText = "実行中... / Running...";
      sandboxStatus.className = "java-sandbox-status java-status-running";
    }
    if (outputContent) {
      outputContent.textContent = "// コンパイル中 / Compiling...\n// 判定を行っています / Grading...";
    }
    
    try {
      const response = await fetch('/runjava', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin: q.stdinExample || "" }),
        signal: AbortSignal.timeout(15000)
      });
      
      if (!response.ok) throw new Error("HTTP connection error");
      const res = await response.json();
      
      // Update output display
      let textToShow = "";
      if (res.compileError) {
        textToShow = "❌ コンパイルエラー / Compile Error:\n\n" + res.compileError;
        outputContent.className = "java-output-content java-output-error";
        if (sandboxStatus) {
          sandboxStatus.innerText = "コンパイルエラー";
          sandboxStatus.className = "java-sandbox-status java-status-error";
        }
        activeCodingExam.userStatuses[q.id] = 'failed';
        showToastKey("toast.compileError", "error");
      } else if (res.runtimeError) {
        textToShow = (res.output ? '// 出力 / Output:\n' + res.output + '\n\n' : '') + "⚠️ 実行エラー / Runtime Error:\n" + res.runtimeError;
        outputContent.className = "java-output-content java-output-error";
        if (sandboxStatus) {
          sandboxStatus.innerText = "実行エラー";
          sandboxStatus.className = "java-sandbox-status java-status-error";
        }
        activeCodingExam.userStatuses[q.id] = 'failed';
        showToastKey("toast.runtimeError", "error");
      } else {
        textToShow = res.output || '';
        outputContent.className = "java-output-content java-output-success";
        
        // Match comparison
        const isMatch = cleanStringOutput(res.output) === cleanStringOutput(q.expectedOutput);
        if (isMatch) {
          activeCodingExam.userStatuses[q.id] = 'passed';
          if (sandboxStatus) {
            sandboxStatus.innerText = "成功 / Success ✓";
            sandboxStatus.className = "java-sandbox-status java-status-success";
          }
        showToastKey("toast.verifySuccess", "success");
        } else {
          activeCodingExam.userStatuses[q.id] = 'failed';
          textToShow += `\n\n[⚠️ 判定失敗 / Incorrect Output]\n-- 期望输出结果 (Expected):\n${q.expectedOutput}`;
          if (sandboxStatus) {
            sandboxStatus.innerText = "不適合 / Failed ✗";
            sandboxStatus.className = "java-sandbox-status java-status-error";
          }
          showToastKey("toast.outputMismatch", "error");
        }
      }
      
      outputContent.textContent = textToShow;
      renderCodingQuestion();
      initSidebar();
      
    } catch (e) {
      if (sandboxStatus) {
        sandboxStatus.innerText = "エラー / Error";
        sandboxStatus.className = "java-sandbox-status java-status-error";
      }
      if (outputContent) {
        outputContent.textContent = `// 判定エラー / Exception during grading:\n${e.message}`;
      }
      activeCodingExam.userStatuses[q.id] = 'failed';
      renderCodingQuestion();
      initSidebar();
    }
    
  } else if (currentSubject === "python") {
    const editor = document.getElementById("python-editor");
    const code = editor ? editor.value.trim() : '';
    activeCodingExam.userCodes[q.id] = code;
    
    const outputCard = document.getElementById("python-output-card");
    const outputContent = document.getElementById("python-output-content");
    const sandboxStatus = document.getElementById("python-sandbox-status");
    
    if (outputCard && outputCard.classList.contains("collapsed")) {
      togglePythonOutputDetails();
    }
    
    if (sandboxStatus) {
      sandboxStatus.innerText = "実行中... / Running...";
      sandboxStatus.className = "python-sandbox-status python-status-running";
    }
    if (outputContent) {
      outputContent.textContent = "# 判定中... / Running checks...";
    }
    
    try {
      const response = await fetch('/runpython', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin: q.stdinExample || "" }),
        signal: AbortSignal.timeout(15000)
      });
      
      if (!response.ok) throw new Error("HTTP connection error");
      const res = await response.json();
      
      // Update output display
      let textToShow = "";
      if (res.compileError) {
        textToShow = "❌ 構文エラー / Syntax Error:\n\n" + res.compileError;
        outputContent.className = "python-output-content python-output-error";
        if (sandboxStatus) {
          sandboxStatus.innerText = "構文エラー";
          sandboxStatus.className = "python-sandbox-status python-status-error";
        }
        activeCodingExam.userStatuses[q.id] = 'failed';
        showToastKey("toast.sqlSyntaxError", "error");
      } else if (res.runtimeError) {
        textToShow = (res.output ? '# 出力 / Output:\n' + res.output + '\n\n' : '') + "⚠️ 実行エラー / Runtime Error:\n" + res.runtimeError;
        outputContent.className = "python-output-content python-output-error";
        if (sandboxStatus) {
          sandboxStatus.innerText = "実行エラー";
          sandboxStatus.className = "python-sandbox-status python-status-error";
        }
        activeCodingExam.userStatuses[q.id] = 'failed';
        showToastKey("toast.runtimeError", "error");
      } else {
        textToShow = res.output || '';
        outputContent.className = "python-output-content python-output-success";
        
        // Match comparison
        const isMatch = cleanStringOutput(res.output) === cleanStringOutput(q.expectedOutput);
        if (isMatch) {
          activeCodingExam.userStatuses[q.id] = 'passed';
          if (sandboxStatus) {
            sandboxStatus.innerText = "成功 / Success ✓";
            sandboxStatus.className = "python-sandbox-status python-status-success";
          }
        showToastKey("toast.verifySuccess", "success");
        } else {
          activeCodingExam.userStatuses[q.id] = 'failed';
          textToShow += `\n\n# [⚠️ 判定失敗 / Incorrect Output]\n# -- 期望输出结果 (Expected):\n# ${q.expectedOutput}`;
          if (sandboxStatus) {
            sandboxStatus.innerText = "不適合 / Failed ✗";
            sandboxStatus.className = "python-sandbox-status python-status-error";
          }
          showToastKey("toast.outputMismatch", "error");
        }
      }
      
      outputContent.textContent = textToShow;
      renderCodingQuestion();
      initSidebar();
      
    } catch (e) {
      if (sandboxStatus) {
        sandboxStatus.innerText = "エラー / Error";
        sandboxStatus.className = "python-sandbox-status python-status-error";
      }
      if (outputContent) {
        outputContent.textContent = `# 判定エラー / Exception during grading:\n${e.message}`;
      }
      activeCodingExam.userStatuses[q.id] = 'failed';
      renderCodingQuestion();
      initSidebar();
    }
  }
}

// Exit coding exam completely (cleans timer and restores normal book view)
function exitCodingExam() {
  if (confirmKey("dialog.exitExamConfirm")) {
    if (cbtTimerInterval) clearInterval(cbtTimerInterval);
    activeCodingExam = null;
    
    // Switch sub-mode back to lessons
    if (currentSubject === "sql") {
      switchSqlSubMode("lessons");
    } else if (currentSubject === "java") {
      switchJavaSubMode("lessons");
    } else if (currentSubject === "python") {
      switchPythonSubMode("lessons");
    }
  }
}

// Stop exam and submit all codes for final scoring
function submitCodingExam(auto = false) {
  if (!activeCodingExam) return;
  
  if (!auto) {
    const unanswered = activeCodingExam.questions.filter(q => activeCodingExam.userStatuses[q.id] === 'idle').length;

    if (unanswered > 0) {
      if (!confirmKey("dialog.submitCodingExamUnansweredConfirm", { count: unanswered })) return;
    } else {
      if (!confirmKey("dialog.submitExamConfirm")) return;
    }
  }
  
  // Save active code of current question
  const currQ = activeCodingExam.questions[activeCodingExam.currentQIdx];
  if (activeCodingExam.subject === 'sql') {
    activeCodingExam.userCodes[currQ.id] = document.getElementById("sql-editor").value;
  } else if (activeCodingExam.subject === 'java') {
    activeCodingExam.userCodes[currQ.id] = document.getElementById("java-editor").value;
  } else if (activeCodingExam.subject === 'python') {
    activeCodingExam.userCodes[currQ.id] = document.getElementById("python-editor").value;
  }
  
  if (cbtTimerInterval) clearInterval(cbtTimerInterval);
  activeCodingExam.isSubmitted = true;
  if (window.StudyAI) {
    const total = activeCodingExam.questions.length;
    const passed = activeCodingExam.questions.filter(q => activeCodingExam.userStatuses[q.id] === 'passed').length;
    StudyAI.track({
      subject: activeCodingExam.subject,
      eventType: 'exam_result',
      itemId: 'coding-exam',
      topic: activeCodingExam.title || 'Coding mock exam',
      success: total > 0 && passed / total >= 0.6,
      score: total > 0 ? Math.round(passed * 100 / total) : 0,
      durationMs: activeCodingExam.timeSpent * 1000,
      source: 'official',
      metadata: { passed, total, autoSubmitted: auto }
    });
  }
  
  // Show results view
  document.getElementById("coding-exam-panel").style.display = "none";
  document.getElementById("coding-exam-results").style.display = "flex";
  
  renderCodingExamResults();
  initSidebar();
  
  showToastKey("toast.practicalExamSubmitted", "success");
}

// Render scorecard results
function renderCodingExamResults() {
  if (!activeCodingExam) return;
  
  const qList = activeCodingExam.questions;
  const totalCount = qList.length;
  const correctCount = qList.filter(q => activeCodingExam.userStatuses[q.id] === 'passed').length;
  const percentage = Math.round((correctCount / totalCount) * 100);
  
  // Qualified standard (60% or higher is considered a Pass in Japanese IT schools)
  const isPassed = percentage >= 60;
  
  // Update UI Elements
  const badge = document.getElementById("coding-pass-badge");
  if (badge) {
    badge.className = `pass-status-badge ${isPassed ? 'pass' : 'fail'}`;
    badge.innerText = isPassed ? "合格 (PASS)" : "不合格 (FAIL)";
    badge.style.color = "#fff";
    badge.style.background = isPassed ? "var(--success-color)" : "var(--error-color)";
  }
  
  document.getElementById("coding-score-correct-count").innerText = correctCount;
  document.getElementById("coding-score-correct-count").nextElementSibling.innerText = ` / ${totalCount} 题通过`;
  
  document.getElementById("coding-results-percentage-text").innerText = `${percentage}%`;
  document.getElementById("coding-results-progress-bar").style.width = `${percentage}%`;
  
  // Format spent time
  const timeSpentSec = activeCodingExam.timeSpent;
  const m = Math.floor(timeSpentSec / 60);
  const s = timeSpentSec % 60;
  document.getElementById("coding-results-time-spent").innerText = `${m}分${s}秒`;
  
  // Populate details table rows
  const tbody = document.getElementById("coding-results-table-body");
  tbody.innerHTML = "";
  
  qList.forEach((q, idx) => {
    const tr = document.createElement("tr");
    tr.style.borderBottom = "1px solid rgba(255, 255, 255, 0.05)";
    
    const status = activeCodingExam.userStatuses[q.id];
    let statusHtml = "";
    if (status === 'passed') {
      statusHtml = `<span style="color:var(--success-color); font-weight:600;"><i class="fa-solid fa-circle-check"></i> Passed ✓</span>`;
    } else if (status === 'failed') {
      statusHtml = `<span style="color:var(--error-color); font-weight:600;"><i class="fa-solid fa-circle-xmark"></i> Failed ✗</span>`;
    } else {
      statusHtml = `<span style="color:var(--text-muted); font-style:italic;"><i class="fa-regular fa-circle"></i> Unattempted</span>`;
    }
    
    tr.innerHTML = `
      <td style="padding: 12px 16px;"><strong>${idx + 1}</strong></td>
      <td style="padding: 12px 16px;"><strong>${q.titleJa}</strong></td>
      <td style="padding: 12px 16px; color:var(--text-muted);">${q.difficulty}</td>
      <td style="padding: 12px 16px; text-align: center;">${statusHtml}</td>
      <td style="padding: 12px 16px; text-align: center;">
        <button onclick="reviewCodingExamQuestion(${idx})" style="padding:4px 10px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:var(--text-main); font-size:11px; cursor:pointer; transition:var(--transition-smooth);">查看代码</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Allows looking at the submitted codes and details after exam completes
function reviewCodingExamQuestion(idx) {
  if (!activeCodingExam) return;
  activeCodingExam.currentQIdx = idx;
  
  // Hide results, show run panel (but read-only? Actually let them interact with the sandboxes to see results)
  document.getElementById("coding-exam-results").style.display = "none";
  document.getElementById("coding-exam-panel").style.display = "flex";
  
  renderCodingQuestion();
  initSidebar();
}

// Close results card and return to textbook mode
function closeCodingExamResults() {
  if (cbtTimerInterval) clearInterval(cbtTimerInterval);
  activeCodingExam = null;
  
  // Return to textbook
  if (currentSubject === "sql") {
    switchSqlSubMode("lessons");
  } else if (currentSubject === "java") {
    switchJavaSubMode("lessons");
  } else if (currentSubject === "python") {
    switchPythonSubMode("lessons");
  }
}


function toggleMinimizePdf() {
  const panel = document.getElementById("pdf-viewer-panel");
  const btnText = document.getElementById("pdf-minimize-text");
  const btnIcon = document.getElementById("pdf-minimize-icon");
  if (!panel) return;
  
  const isMinimized = panel.classList.toggle("minimized");
  if (isMinimized) {
    if (btnText) btnText.innerText = "展开";
    if (btnIcon) {
      btnIcon.className = "fa-solid fa-expand";
    }
  } else {
    if (btnText) btnText.innerText = "最小化";
    if (btnIcon) {
      btnIcon.className = "fa-solid fa-compress";
    }
  }
}

/* ====================================================
   Module Switch Panel (Round 22.2)
   ==================================================== */

function initModuleSwitch() {
  if (!moduleSwitchTrigger || !moduleSwitchPanel) return;

  // Toggle panel on trigger click
  moduleSwitchTrigger.addEventListener("click", function(e) {
    e.stopPropagation();
    toggleModuleSwitchPanel();
  });

  // Close button
  var closeBtn = moduleSwitchPanel.querySelector(".module-switch-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      closeModuleSwitchPanel();
    });
  }

  // Click outside to close
  document.addEventListener("click", function(e) {
    if (moduleSwitchOpen && !moduleSwitchPanel.contains(e.target) && e.target !== moduleSwitchTrigger && !moduleSwitchTrigger.contains(e.target)) {
      closeModuleSwitchPanel();
    }
  });

  // Escape key to close
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && moduleSwitchOpen) {
      closeModuleSwitchPanel();
    }
  });

  // Close panel when switching modules
  moduleSwitchPanel.addEventListener("click", function(e) {
    var option = e.target.closest(".module-switch-option");
    if (option && option.hasAttribute("data-module")) {
      closeModuleSwitchPanel();
    }
  });
}

function toggleModuleSwitchPanel() {
  if (moduleSwitchOpen) {
    closeModuleSwitchPanel();
  } else {
    openModuleSwitchPanel();
  }
}

function openModuleSwitchPanel() {
  if (!moduleSwitchPanel || !moduleSwitchTrigger) return;
  moduleSwitchPanel.hidden = false;
  moduleSwitchOpen = true;
  moduleSwitchTrigger.setAttribute("aria-expanded", "true");
  moduleSwitchTrigger.classList.add("active");
  // Small delay then focus first option
  requestAnimationFrame(function() {
    var first = moduleSwitchPanel.querySelector(".module-switch-option");
    if (first) first.focus();
  });
}

function closeModuleSwitchPanel() {
  if (!moduleSwitchPanel || !moduleSwitchTrigger) return;
  moduleSwitchPanel.hidden = true;
  moduleSwitchOpen = false;
  moduleSwitchTrigger.setAttribute("aria-expanded", "false");
  moduleSwitchTrigger.classList.remove("active");
  moduleSwitchTrigger.focus();
}

/* ====================================================
   Table Scroll Wrapper (UI-005, UI-007)
   ==================================================== */

function wrapAllTablesWithScrollWrapper() {
  var containers = [
    document.getElementById('concept-ja-body'),
    document.getElementById('concept-zh-body'),
    document.getElementById('cbt-q-body-text'),
    document.getElementById('eq-task-ja'),
    document.getElementById('eq-task-zh'),
    document.getElementById('quiz-feedback'),
    document.querySelector('.quiz-section'),
    document.querySelector('.eq-expected-box')
  ];
  containers.forEach(function (container) {
    if (!container) return;
    var tables = container.querySelectorAll('table');
    tables.forEach(function (table) {
      if (table.parentElement && table.parentElement.classList.contains('table-scroll-wrapper')) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'table-scroll-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  });
}

/* ====================================================
   Theme Toggle (Dark / Light)
   ==================================================== */

const RUNTIME_LIGHT_THEME_STYLE_ID = "runtime-light-theme-override";
const RUNTIME_LIGHT_THEME_CSS = `
body[data-theme="light"],
body[data-theme="light"] *,
body[data-theme="light"] :where(div, header, nav, aside, main, section, article, form, fieldset, details, summary, dialog, table, thead, tbody, tfoot, tr, th, td, ul, ol, li, p, h1, h2, h3, h4, h5, h6, pre, code, textarea, input, select, option, button, label, span) {
  background: #ffffff !important;
  background-color: #ffffff !important;
  background-image: none !important;
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  text-shadow: none !important;
  box-shadow: none !important;
  border-color: #111111 !important;
}
body[data-theme="light"] *::before,
body[data-theme="light"] *::after {
  color: #000000 !important;
  text-shadow: none !important;
  box-shadow: none !important;
  border-color: #111111 !important;
}
body[data-theme="light"] ::placeholder {
  color: #333333 !important;
  opacity: 1 !important;
}
body[data-theme="light"] .progress-bar-fill,
body[data-theme="light"] .field-score-fill,
body[data-theme="light"] .ai-mastery-bar span {
  background: #000000 !important;
  background-image: none !important;
}
`;

function setRuntimeLightThemeOverride(enabled) {
  let style = document.getElementById(RUNTIME_LIGHT_THEME_STYLE_ID);
  if (!enabled) {
    if (style) style.remove();
    return;
  }
  if (!style) {
    style = document.createElement("style");
    style.id = RUNTIME_LIGHT_THEME_STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = RUNTIME_LIGHT_THEME_CSS;
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.getAttribute("data-theme") === "light";
  const btn = document.getElementById("theme-toggle-btn");
  const icon = btn ? btn.querySelector("i") : null;

  if (isLight) {
    body.removeAttribute("data-theme");
    localStorage.setItem("study-tools-theme", "dark");
    if (icon) icon.className = "fa-solid fa-sun";
    setRuntimeLightThemeOverride(false);
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("study-tools-theme", "light");
    if (icon) icon.className = "fa-solid fa-moon";
    setRuntimeLightThemeOverride(true);
  }
}

function initTheme() {
  const badLightMigrationKey = "study-tools-theme-light-default-20260608";
  const darkRestoreKey = "study-tools-theme-dark-default-20260608";
  if (
    localStorage.getItem(badLightMigrationKey) === "done" &&
    localStorage.getItem(darkRestoreKey) !== "done" &&
    localStorage.getItem("study-tools-theme") === "light"
  ) {
    localStorage.setItem("study-tools-theme", "dark");
    localStorage.setItem(darkRestoreKey, "done");
  }

  const saved = localStorage.getItem("study-tools-theme");
  const btn = document.getElementById("theme-toggle-btn");
  const icon = btn ? btn.querySelector("i") : null;

  if (saved !== "light") {
    document.body.removeAttribute("data-theme");
    if (icon) icon.className = "fa-solid fa-sun";
    setRuntimeLightThemeOverride(false);
  } else {
    document.body.setAttribute("data-theme", "light");
    if (icon) icon.className = "fa-solid fa-moon";
    setRuntimeLightThemeOverride(true);
  }
}


// Expose StudySync debug entry (no-op if sync-engine.js not loaded)
window.StudySync = window.StudySync || null;
