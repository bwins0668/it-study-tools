/* Study Tools Content I18n — Lesson Content Translation Lookup v2 (lazy-load) */
(function () {
  "use strict";

  var CONTENT_KEY = "CONTENT_I18N";
  var loadedPacks = {};
  var loadingPacks = {};

  function ensureContentStore() {
    var existing = window[CONTENT_KEY] || {};
    if (existing && existing.__contentI18nMergeStore) return existing;
    if (typeof Proxy === "undefined") {
      window[CONTENT_KEY] = existing;
      return existing;
    }
    var store = new Proxy(existing, {
      set: function (target, key, value) {
        if (
          typeof key === "string" &&
          value &&
          typeof value === "object" &&
          target[key] &&
          typeof target[key] === "object"
        ) {
          target[key] = Object.assign({}, target[key], value);
        } else {
          target[key] = value;
        }
        return true;
      }
    });
    Object.defineProperty(store, "__contentI18nMergeStore", { value: true });
    window[CONTENT_KEY] = store;
    return store;
  }

  ensureContentStore();

  function normalizeLang(code) {
    if (window.I18n && window.I18n.normalizeLang) {
      return window.I18n.normalizeLang(code);
    }
    var c = String(code || "").toLowerCase();
    if (c === "default-ja-zh" || c === "ja-zh") return "default-ja-zh";
    if (c === "zh" || c === "zh-cn") return "zh";
    if (c === "ja" || c === "ja-jp") return "ja";
    if (c === "en" || c === "en-us") return "en";
    if (c === "ko" || c === "ko-kr") return "ko";
    if (c === "my" || c === "my-mm") return "my";
    if (c === "th" || c === "th-th") return "th";
    if (c === "vi" || c === "vi-vn") return "vi";
    if (c === "id" || c === "id-id") return "id";
    if (c === "fr" || c === "fr-fr") return "fr";
    return "en";
  }

  function getCurrentLang() {
    if (window.I18n && typeof window.I18n.getLanguage === "function") {
      return window.I18n.getLanguage();
    }
    return "default-ja-zh";
  }

  function getEntry(subject, id) {
    var key = String(subject) + ":" + String(id);
    var dict = window[CONTENT_KEY];
    if (!dict) return null;
    return dict[key] || null;
  }

  function hasLoadedContentFor(subject, lang) {
    var dict = window[CONTENT_KEY];
    if (!dict) return false;
    var prefix = String(subject) + ":";
    for (var key in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, key) && key.indexOf(prefix) === 0 && dict[key] && dict[key][lang]) {
        return true;
      }
    }
    return false;
  }

  var VISIBLE_DEFAULTS = {
    ko: {
      subjects: { sql: "SQL", java: "Java", python: "Python", itpass: "IT Passport", sg: "SG 정보 보안" },
      subtitle: "핵심 개념과 실습 정리",
      analogy: function (title, subjectName) {
        return "일상 비유: " + title + "은(는) " + subjectName + " 학습 노트처럼, 입력과 처리 순서를 한 단계씩 확인하면 전체 흐름을 더 쉽게 이해할 수 있습니다.";
      },
      sandboxInstruction: function (title, subjectName) {
        return subjectName + " 샌드박스에서 " + title + " 관련 예제를 조금씩 바꾸어 실행 결과를 비교하세요.";
      },
      sandboxComment: function (title, subjectName) {
        return subjectName + " 샌드박스: " + title + "의 입력, 처리, 출력 흐름을 확인하세요.";
      },
      stdinPlaceholder: "프로그램에 전달할 입력 데이터...",
      expectedOutput: "예상 출력 결과",
      executionResult: "실행 결과",
      resultExplanation: "출력과 예상 결과를 비교하여 코드 흐름을 점검하세요.",
      emptyState: "아직 표시할 결과가 없습니다.",
      wordCardDesc: function (title) {
        return title + "의 핵심 용어와 사용 장면을 정리하는 단어 카드입니다.";
      },
      codeExampleLabel: function (subjectName) { return subjectName + " 코드 예"; },
      conceptLessonStatus: "이론 수업: 실행이 필요하지 않습니다.",
      readyStatus: "준비 완료",
      runningStatus: "실행 중...",
      gradingStatus: "판정 중...",
      compileErrorStatus: "컴파일 오류",
      runtimeErrorStatus: "실행 오류",
      syntaxErrorStatus: "구문 오류",
      successStatus: "성공",
      failedStatus: "실패",
      errorStatus: "오류",
      outputLabel: "출력",
      incorrectOutputLabel: "판정 실패 - 예상 출력 결과"
    },
    my: {
      subjects: { sql: "SQL", java: "Java", python: "Python", itpass: "IT Passport", sg: "SG လုံခြုံရေး" },
      subtitle: "အဓိကအယူအဆနှင့် လက်တွေ့လေ့ကျင့်ခန်း",
      analogy: function (title, subjectName) {
        return "နေ့စဉ်ဥပမာ: " + title + " ကို " + subjectName + " မှတ်စုတစ်ခုလို သဘောထားပြီး input၊ လုပ်ဆောင်မှုနှင့် output ကို အဆင့်လိုက်ကြည့်ပါ။";
      },
      sandboxInstruction: function (title, subjectName) {
        return subjectName + " sandbox တွင် " + title + " နှင့်ဆိုင်သော code ကို အနည်းငယ်ပြောင်းပြီး ရလဒ်ကို နှိုင်းယှဉ်ပါ။";
      },
      sandboxComment: function (title, subjectName) {
        return subjectName + " sandbox: " + title + " ၏ input၊ လုပ်ဆောင်မှုနှင့် output ကို စစ်ဆေးပါ။";
      },
      stdinPlaceholder: "ပရိုဂရမ်အတွက် လိုအပ်သော input ဒေတာ...",
      expectedOutput: "မျှော်မှန်းရလဒ်",
      executionResult: "လုပ်ဆောင်မှုရလဒ်",
      resultExplanation: "Output နှင့် မျှော်မှန်းရလဒ်ကို နှိုင်းယှဉ်ပြီး code လုပ်ဆောင်မှုအစဉ်ကို စစ်ဆေးပါ။",
      emptyState: "ပြသရန် ရလဒ် မရှိသေးပါ။",
      wordCardDesc: function (title) {
        return title + " နှင့်ဆိုင်သော အဓိကဝေါဟာရနှင့် အသုံးပြုမှုကို စုစည်းထားသော word card ဖြစ်သည်။";
      },
      codeExampleLabel: function (subjectName) { return subjectName + " code ဥပမာ"; },
      conceptLessonStatus: "သီအိုရီသင်ခန်းစာ: runရန် မလိုအပ်ပါ။",
      readyStatus: "အဆင်သင့်ဖြစ်ပါပြီ",
      runningStatus: "လုပ်ဆောင်နေသည်...",
      gradingStatus: "စစ်ဆေးနေသည်...",
      compileErrorStatus: "Compile အမှား",
      runtimeErrorStatus: "Runtime အမှား",
      syntaxErrorStatus: "Syntax အမှား",
      successStatus: "အောင်မြင်သည်",
      failedStatus: "မအောင်မြင်ပါ",
      errorStatus: "အမှား",
      outputLabel: "Output",
      incorrectOutputLabel: "စစ်ဆေးမှုမအောင်မြင် - မျှော်မှန်းရလဒ်"
    },
    vi: {
      subjects: { sql: "SQL", java: "Java", python: "Python", itpass: "IT Passport", sg: "SG bảo mật thông tin" },
      subtitle: "Tóm tắt khái niệm và thực hành",
      analogy: function (title, subjectName) {
        return "Ví dụ thực tế: hãy xem " + title + " như một ghi chú học " + subjectName + ", rồi kiểm tra từng bước từ đầu vào, xử lý đến đầu ra.";
      },
      sandboxInstruction: function (title, subjectName) {
        return "Trong sandbox " + subjectName + ", hãy thay đổi nhẹ ví dụ liên quan đến " + title + " và so sánh kết quả chạy.";
      },
      sandboxComment: function (title, subjectName) {
        return "Sandbox " + subjectName + ": kiểm tra luồng đầu vào, xử lý và đầu ra của " + title + ".";
      },
      stdinPlaceholder: "Dữ liệu đầu vào cho chương trình...",
      expectedOutput: "Kết quả mong đợi",
      executionResult: "Kết quả thực thi",
      resultExplanation: "So sánh đầu ra với kết quả mong đợi để kiểm tra luồng mã.",
      emptyState: "Chưa có kết quả để hiển thị.",
      wordCardDesc: function (title) {
        return "Thẻ từ vựng tóm tắt thuật ngữ và ngữ cảnh sử dụng của " + title + ".";
      },
      codeExampleLabel: function (subjectName) { return "Ví dụ mã " + subjectName; },
      conceptLessonStatus: "Bài lý thuyết: không cần chạy mã.",
      readyStatus: "Sẵn sàng",
      runningStatus: "Đang chạy...",
      gradingStatus: "Đang kiểm tra...",
      compileErrorStatus: "Lỗi biên dịch",
      runtimeErrorStatus: "Lỗi thực thi",
      syntaxErrorStatus: "Lỗi cú pháp",
      successStatus: "Thành công",
      failedStatus: "Không đạt",
      errorStatus: "Lỗi",
      outputLabel: "Đầu ra",
      incorrectOutputLabel: "Không đạt - kết quả mong đợi"
    },
    fr: {
      subjects: { sql: "SQL", java: "Java", python: "Python", itpass: "IT Passport", sg: "SG sécurité de l'information" },
      subtitle: "Résumé des concepts et exercices pratiques",
      analogy: function (title, subjectName) {
        return "Exemple concret : considérez " + title + " comme une note d'apprentissage " + subjectName + ", puis vérifiez l'entrée, le traitement et la sortie étape par étape.";
      },
      sandboxInstruction: function (title, subjectName) {
        return "Dans le bac à sable " + subjectName + ", modifiez légèrement l'exemple lié à " + title + " et comparez le résultat d'exécution.";
      },
      sandboxComment: function (title, subjectName) {
        return "Bac à sable " + subjectName + " : vérifiez le flux d'entrée, de traitement et de sortie pour " + title + ".";
      },
      stdinPlaceholder: "Données d'entrée à transmettre au programme...",
      expectedOutput: "Résultat attendu",
      executionResult: "Résultat d'exécution",
      resultExplanation: "Comparez la sortie au résultat attendu afin de vérifier le déroulement du code.",
      emptyState: "Aucun résultat à afficher pour le moment.",
      wordCardDesc: function (title) {
        return "Carte de vocabulaire résumant les termes clés et le contexte d'utilisation de " + title + ".";
      },
      codeExampleLabel: function (subjectName) { return "Exemple de code " + subjectName; },
      conceptLessonStatus: "Leçon théorique : aucune exécution de code n'est nécessaire.",
      readyStatus: "Prêt",
      runningStatus: "Exécution en cours...",
      gradingStatus: "Vérification en cours...",
      compileErrorStatus: "Erreur de compilation",
      runtimeErrorStatus: "Erreur d'exécution",
      syntaxErrorStatus: "Erreur de syntaxe",
      successStatus: "Réussi",
      failedStatus: "Échec",
      errorStatus: "Erreur",
      outputLabel: "Sortie",
      incorrectOutputLabel: "Échec - résultat attendu"
    },
    th: {
      subjects: { sql: "SQL", java: "Java", python: "Python", itpass: "IT Passport", sg: "SG ความมั่นคงสารสนเทศ" },
      subtitle: "สรุปแนวคิดและแบบฝึก",
      analogy: function (title, subjectName) {
        return "ตัวอย่างใกล้ตัว: ให้มอง " + title + " เป็นบันทึกการเรียน " + subjectName + " แล้วตรวจลำดับ input การประมวลผล และ output ทีละขั้น";
      },
      sandboxInstruction: function (title, subjectName) {
        return "ใน sandbox " + subjectName + " ให้ลองแก้ตัวอย่างของ " + title + " เล็กน้อย แล้วเปรียบเทียบผลลัพธ์";
      },
      sandboxComment: function (title, subjectName) {
        return "Sandbox " + subjectName + ": ตรวจลำดับ input การประมวลผล และ output ของ " + title;
      },
      stdinPlaceholder: "ข้อมูล input สำหรับโปรแกรม...",
      expectedOutput: "ผลลัพธ์ที่คาดหวัง",
      executionResult: "ผลการรัน",
      resultExplanation: "เปรียบเทียบ output กับผลลัพธ์ที่คาดหวังเพื่อตรวจลำดับของโค้ด",
      emptyState: "ยังไม่มีผลลัพธ์ให้แสดง",
      wordCardDesc: function (title) {
        return "บัตรคำสำหรับทบทวนคำสำคัญและบริบทการใช้งานของ " + title;
      },
      codeExampleLabel: function (subjectName) { return "ตัวอย่างโค้ด " + subjectName; },
      conceptLessonStatus: "บทเรียนทฤษฎี: ไม่จำเป็นต้องรันโค้ด",
      readyStatus: "พร้อมแล้ว",
      runningStatus: "กำลังรัน...",
      gradingStatus: "กำลังตรวจ...",
      compileErrorStatus: "Compile error",
      runtimeErrorStatus: "Runtime error",
      syntaxErrorStatus: "Syntax error",
      successStatus: "สำเร็จ",
      failedStatus: "ไม่ผ่าน",
      errorStatus: "ข้อผิดพลาด",
      outputLabel: "Output",
      incorrectOutputLabel: "ไม่ผ่าน - ผลลัพธ์ที่คาดหวัง"
    }
  };

  function cleanVisibleTitle(text, fallback) {
    var value = String(text || fallback || "").replace(/<[^>]+>/g, " ");
    value = value.replace(/[*_`#>\[\]()]+/g, " ").replace(/\s+/g, " ").trim();
    return value || String(fallback || "lesson");
  }

  function commentPrefixFor(subject) {
    if (subject === "python") return "# ";
    if (subject === "sql") return "-- ";
    return "// ";
  }

  function buildVisibleDefaults(subject, id, lang, localized) {
    var template = VISIBLE_DEFAULTS[lang];
    if (!template) return {};
    var subjectName = (template.subjects && template.subjects[subject]) || subject || "lesson";
    var title = cleanVisibleTitle(localized && localized.title, subjectName + " " + id);
    var sandboxComment = commentPrefixFor(subject) + template.sandboxComment(title, subjectName);
    return {
      subtitle: template.subtitle,
      analogy: template.analogy(title, subjectName),
      dailyAnalogy: template.analogy(title, subjectName),
      practiceIntro: localized && localized.practiceIntro ? localized.practiceIntro : template.sandboxInstruction(title, subjectName),
      sandboxInstruction: localized && localized.sandboxInstruction ? localized.sandboxInstruction : template.sandboxInstruction(title, subjectName),
      sandboxComment: sandboxComment,
      stdinPlaceholder: template.stdinPlaceholder,
      expectedOutput: template.expectedOutput,
      executionResult: template.executionResult,
      resultExplanation: template.resultExplanation,
      emptyState: template.emptyState,
      wordCards: [
        {
          ja: title,
          target: title,
          desc: template.wordCardDesc(title)
        }
      ],
      flashcards: [
        {
          ja: title,
          target: title,
          desc: template.wordCardDesc(title)
        }
      ],
      codeExampleLabel: template.codeExampleLabel(subjectName),
      conceptLessonStatus: template.conceptLessonStatus,
      readyStatus: template.readyStatus,
      runningStatus: template.runningStatus,
      gradingStatus: template.gradingStatus,
      compileErrorStatus: template.compileErrorStatus,
      runtimeErrorStatus: template.runtimeErrorStatus,
      syntaxErrorStatus: template.syntaxErrorStatus,
      successStatus: template.successStatus,
      failedStatus: template.failedStatus,
      errorStatus: template.errorStatus,
      outputLabel: template.outputLabel,
      incorrectOutputLabel: template.incorrectOutputLabel,
      visibleDefaultsApplied: true
    };
  }

  /**
   * Get localized content for a lesson.
   * @param {string} subject — e.g. "sql", "itpass"
   * @param {string|number} id — lesson.id
   * @param {string} [lang] — language code, defaults to current UI language
   * @returns {object|null} — complete localized visible content or null
   */
  function get(subject, id, lang) {
    var entry = getEntry(subject, id);
    if (!entry) return null;

    var normalized = normalizeLang(lang || getCurrentLang());

    // default-ja-zh: prefer zh content
    if (normalized === "default-ja-zh") {
      var zhContent = entry["zh"];
      if (zhContent) return zhContent;
      var jaContent = entry["ja"];
      if (jaContent) return jaContent;
    }

    var localized = entry[normalized];
    if (!localized) return null;

    var visibleDefaults = buildVisibleDefaults(subject, id, normalized, localized);
    var result = Object.assign({}, visibleDefaults, localized);
    result.title = result.title || null;
    result.concept = result.concept || null;
    result.needsReview = !!localized.needsReview;
    result.actualLang = normalized;
    return result;
  }

  /**
   * Check if a localized title or concept exists for the current language.
   */
  function has(subject, id, lang) {
    var result = get(subject, id, lang);
    return result !== null && (result.title !== null || result.concept !== null);
  }

  /**
   * Dynamically load a content language pack.
   * Supports both (subject, lang) and (lang, subject) argument orders.
   * @param {string} subject — "sql" | "itpass" | "sg" | "java" | "python"
   * @param {string} [lang] — language code, defaults to current UI language
   * @param {boolean} [isHighPriority] — if true, sets fetchpriority to high, else low
   * @returns {Promise<boolean>} — true if pack was loaded, false if not needed or failed
   */
  function loadPack(subject, lang, isHighPriority) {
    var subjectsList = ["sql", "itpass", "sg", "java", "python"];
    var langsWithPacks = ["en", "vi", "my", "fr", "ko", "th", "id"];

    // Swap arguments if they are passed in reverse order: (lang, subject)
    if (typeof subject === "string" && typeof lang === "string") {
      var sLower = subject.toLowerCase();
      var lLower = lang.toLowerCase();
      if (subjectsList.indexOf(lLower) !== -1 || langsWithPacks.indexOf(sLower) !== -1 || sLower === "ko" || sLower === "ja" || sLower === "zh") {
        var temp = subject;
        subject = lang;
        lang = temp;
      }
    }

    if (!lang) lang = getCurrentLang();
    var normLang = normalizeLang(lang);

    // Validate subject and language to prevent requesting non-existent files (e.g. ko, ja, zh)
    if (subjectsList.indexOf(subject) === -1) {
      return Promise.resolve(false);
    }
    if (langsWithPacks.indexOf(normLang) === -1) {
      var k = subject + ":" + normLang;
      loadedPacks[k] = true;
      return Promise.resolve(false);
    }

    var key = subject + ":" + normLang;

    // Already present through a static <script> tag in index.html.
    if (hasLoadedContentFor(subject, normLang)) {
      loadedPacks[key] = true;
      return Promise.resolve(true);
    }

    // Already loaded
    if (loadedPacks[key]) {
      return Promise.resolve(true);
    }

    // Currently loading
    if (loadingPacks[key]) {
      return loadingPacks[key];
    }

    loadingPacks[key] = new Promise(function (resolve) {
      var script = document.createElement("script");
      var version = "";
      if (window.STUDY_TOOLS_VERSION && window.STUDY_TOOLS_VERSION.assetVersion) {
        version = "?v=" + encodeURIComponent(window.STUDY_TOOLS_VERSION.assetVersion);
      }
      script.src = "data/i18n_content/" + subject + "_" + normLang + ".js" + version;
      
      // Set fetch priority if supported
      if (typeof isHighPriority !== "undefined") {
        script.setAttribute("fetchpriority", isHighPriority ? "high" : "low");
      } else {
        script.setAttribute("fetchpriority", "low"); // default to low for background preheat
      }

      script.onload = function () {
        loadedPacks[key] = true;
        delete loadingPacks[key];
        resolve(true);
      };
      script.onerror = function () {
        console.warn("ContentI18n: pack load failed —", subject + "_" + normLang + ".js");
        loadedPacks[key] = true; // mark as loaded so we don't retry
        delete loadingPacks[key];
        resolve(false);
      };
      document.head.appendChild(script);
    });

    return loadingPacks[key];
  }

  /**
   * Check whether a specific content pack (subject:lang) has been loaded.
   */
  function isPackLoaded(subject, lang) {
    var normLang = normalizeLang(lang || getCurrentLang());
    return !!loadedPacks[subject + ":" + normLang];
  }

  /**
   * Preheat all existing content packs in the background.
   */
  function preheatAllPacks() {
    var subjects = ["sql", "itpass", "sg", "java", "python"];
    var langs = ["vi", "my", "fr", "ko", "th"];
    
    var promises = [];
    for (var i = 0; i < subjects.length; i++) {
      for (var j = 0; j < langs.length; j++) {
        promises.push(loadPack(subjects[i], langs[j], false));
      }
    }
    
    return Promise.all(promises).then(function () {
      return true;
    }).catch(function (err) {
      console.warn("ContentI18n: preheat failed silently —", err);
      return false;
    });
  }

  // Auto-trigger preheating 1.5 seconds after DOMContentLoaded
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(preheatAllPacks, 1500);
      });
    } else {
      setTimeout(preheatAllPacks, 1500);
    }
  }

  /**
   * Navigation I18n API — query localized chapter names and lesson titles.
   * Navigation packs are loaded as inline <script> tags (not lazy-loaded).
   */
  function getNav(lang) {
    var norm = normalizeLang(lang || getCurrentLang());
    if (!window.NAVIGATION_I18N) return null;
    return window.NAVIGATION_I18N[norm] || null;
  }

  function getLocalizedChapterName(subject, chapterName, lang) {
    var nav = getNav(lang);
    if (!nav) return chapterName;
    var subjNav = nav[subject];
    if (!subjNav || !subjNav.chapters) return chapterName;
    return subjNav.chapters[chapterName] || chapterName;
  }

  function getLocalizedLessonTitle(subject, lessonId, lang) {
    var nav = getNav(lang);
    if (!nav) return null;
    var subjNav = nav[subject];
    if (!subjNav || !subjNav.titles) return null;
    return subjNav.titles[lessonId] || null;
  }

  function hasNavigation(lang) {
    return !!getNav(lang);
  }

  window.ContentI18n = {
    normalizeLang: normalizeLang,
    getCurrentLang: getCurrentLang,
    get: get,
    has: has,
    loadPack: loadPack,
    isPackLoaded: isPackLoaded,
    preheatAllPacks: preheatAllPacks,
    getLocalizedChapterName: getLocalizedChapterName,
    getLocalizedLessonTitle: getLocalizedLessonTitle,
    hasNavigation: hasNavigation
  };
})();
