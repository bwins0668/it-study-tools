// Upgraded Japanese Typing Practice Sandbox Module (タイピング練習)
// Supports scrollable line-by-line speed typing across 550 daily & business articles.

const TypingSandbox = (function() {
  // --- Syllable to Romaji Mappings ---
  const KANA_TO_ROMAJI_MAP = {
    // Vowels
    "あ": ["a"], "い": ["i", "yi"], "う": ["u", "wu"], "え": ["e"], "お": ["o"],
    // K-row
    "か": ["ka"], "き": ["ki"], "く": ["ku"], "け": ["ke"], "こ": ["ko"],
    // S-row
    "さ": ["sa"], "し": ["shi", "si"], "す": ["su"], "せ": ["se"], "そ": ["so"],
    // T-row
    "た": ["ta"], "ち": ["chi", "ti"], "つ": ["tsu", "tu"], "て": ["te"], "と": ["to"],
    // N-row
    "な": ["na"], "に": ["ni"], "ぬ": ["nu"], "ね": ["ne"], "の": ["no"],
    // H-row
    "は": ["ha"], "ひ": ["hi"], "ふ": ["fu", "hu"], "へ": ["he"], "ほ": ["ho"],
    // M-row
    "ま": ["ma"], "み": ["mi"], "む": ["mu"], "め": ["me"], "も": ["mo"],
    // Y-row
    "や": ["ya"], "ゆ": ["yu"], "よ": ["yo"],
    // R-row
    "ら": ["ra"], "り": ["ri"], "る": ["ru"], "れ": ["re"], "ろ": ["ro"],
    // W-row
    "わ": ["wa"], "を": ["wo"], "ん": ["nn", "n"],
    
    // G-row (Dakuon)
    "が": ["ga"], "ぎ": ["gi"], "ぐ": ["gu"], "げ": ["ge"], "ご": ["go"],
    // Z-row
    "ざ": ["za"], "じ": ["ji", "zi"], "ず": ["zu"], "ぜ": ["ze"], "ぞ": ["zo"],
    // D-row
    "だ": ["da"], "ぢ": ["ji", "di"], "づ": ["zu", "du"], "で": ["de"], "ど": ["do"],
    // B-row
    "ば": ["ba"], "び": ["bi"], "ぶ": ["bu"], "べ": ["be"], "ぼ": ["bo"],
    // P-row (Handakuon)
    "ぱ": ["pa"], "ぴ": ["pi"], "ぷ": ["pu"], "ぺ": ["pe"], "ぽ": ["po"],
    
    // Compound Sounds (Yoon)
    "きゃ": ["kya"], "きゅ": ["kyu"], "きょ": ["kyo"],
    "しゃ": ["sha", "sya"], "しゅ": ["shu", "syu"], "しょ": ["sho", "syo"],
    "ちゃ": ["cha", "tya"], "ちゅ": ["chu", "tyu"], "ちょ": ["cho", "tyo"],
    "にゃ": ["nya"], "にゅ": ["nyu"], "にょ": ["nyo"],
    "ひゃ": ["hya"], "ひゅ": ["hyu"], "ひょ": ["hyo"],
    "みゃ": ["mya"], "みゅ": ["myu"], "みょ": ["myo"],
    "りゃ": ["rya"], "りゅ": ["ryu"], "りょ": ["ryo"],
    "ぎゃ": ["gya"], "ぎゅ": ["gyu"], "ぎょ": ["gyo"],
    "じゃ": ["ja", "jya", "zya"], "じゅ": ["ju", "jyu", "zyu"], "じょ": ["jo", "jyo", "zyo"],
    "びゃ": ["bya"], "びゅ": ["byu"], "びょ": ["byo"],
    "ぴゃ": ["pya"], "ぴゅ": ["pyu"], "ぴょ": ["pyo"],
    
    // Small vowels
    "ぁ": ["la", "xa"], "ぃ": ["li", "xi"], "ぅ": ["lu", "xu"], "ぇ": ["le", "xe"], "ぉ": ["lo", "xo"],
    "ゃ": ["lya", "xya"], "ゅ": ["lyu", "xyu"], "ょ": ["lyo", "xyo"],
    
    // Long vowel mark and punctuation symbols
    "ー": ["-"],
    "。": ["."], "、": [","], "！": ["!"], "？": ["?"]
  };

  const KEYBOARD_LAYOUT = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "-"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", "."]
  ];

  // --- Local Settings & State ---
  const settings = {
    keyboard: true,
    romajiGuide: true
  };

  let isActive = false;
  let currentArticle = null;
  let currentLineIdx = 0;
  let currentLine = null;
  let syllables = [];
  let currentSyllableIdx = 0;
  let typedRomaji = "";
  
  let startTime = null;
  let correctHits = 0;
  let errorHits = 0;
  let comboCount = 0;
  let maxCombo = 0;
  let timerInterval = null;

  // --- Dynamic Syllable Parsing ---
  
  function getBaseRomajiList(kana) {
    if (KANA_TO_ROMAJI_MAP[kana]) {
      return [...KANA_TO_ROMAJI_MAP[kana]];
    }
    
    // Katakana conversion fallback
    const converted = kana.replace(/[\u30a1-\u30f6]/g, function(match) {
      return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
    if (KANA_TO_ROMAJI_MAP[converted]) {
      return [...KANA_TO_ROMAJI_MAP[converted]];
    }

    // Return character lowercase array
    return [kana.toLowerCase()];
  }

  function parseToSyllables(kanaStr) {
    const output = [];
    let i = 0;
    while (i < kanaStr.length) {
      let char = kanaStr[i];
      let nextChar = kanaStr[i+1] || "";
      
      // Check double consonant (促音)
      if (char === "っ") {
        if (nextChar !== "") {
          let nextSyllable = nextChar;
          let consumeCount = 1;
          let thirdChar = kanaStr[i+2] || "";
          
          if (["ゃ", "ゅ", "ょ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ"].includes(thirdChar)) {
            nextSyllable += thirdChar;
            consumeCount = 2;
          }
          
          const baseRomajis = getBaseRomajiList(nextSyllable);
          const doubledRomajis = baseRomajis.map(r => r[0] + r);
          
          output.push({
            kana: "っ" + nextSyllable,
            romajiList: doubledRomajis
          });
          i += 1 + consumeCount;
          continue;
        } else {
          output.push({
            kana: "っ",
            romajiList: ["ltu", "xtu", "ltsu", "xtsu"]
          });
          i++;
          continue;
        }
      }
      
      // Compound syllable (Yoon)
      if (["ゃ", "ゅ", "ょ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ"].includes(nextChar)) {
        const compound = char + nextChar;
        output.push({
          kana: compound,
          romajiList: getBaseRomajiList(compound)
        });
        i += 2;
      } else {
        output.push({
          kana: char,
          romajiList: getBaseRomajiList(char)
        });
        i += 1;
      }
    }
    return output;
  }

  // --- Dropdown Population & Navigation ---

  function populateArticlesDropdown(category) {
    const select = document.getElementById("typing-article-select");
    if (!select || typeof TYPING_ARTICLES === 'undefined') return;
    
    select.innerHTML = "";
    
    // Filter articles by category
    const filtered = TYPING_ARTICLES.filter(a => a.category === category);
    filtered.forEach(a => {
      const opt = document.createElement("option");
      opt.value = a.id;
      opt.innerText = a.title;
      select.appendChild(opt);
    });
  }

  function changeCategory() {
    const categorySelect = document.getElementById("typing-category-select");
    const cat = categorySelect ? categorySelect.value : "daily";
    
    populateArticlesDropdown(cat);
    restartSession();
  }

  function changeArticle() {
    restartSession();
  }

  // --- Session Lifecycle Functions ---

  function grabFocus() {
    try {
      window.focus();
      if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    } catch (e) {
      console.warn("Focus grab failed:", e);
    }
  }

  function activate() {
    isActive = true;
    document.addEventListener("keydown", handleKeypress);
    
    grabFocus();
    
    const typingContainer = document.getElementById("typing-container");
    if (typingContainer) {
      typingContainer.addEventListener("click", grabFocus);
    }
    
    const settingsKeyboard = document.getElementById("typing-setting-keyboard");
    const settingsRomaji = document.getElementById("typing-setting-romaji-guide");
    
    if (settingsKeyboard) settingsKeyboard.checked = settings.keyboard;
    if (settingsRomaji) settingsRomaji.checked = settings.romajiGuide;
    
    renderVirtualKeyboard();
    toggleKeyboard();
    
    // Make sure articles list is populated on activation
    const categorySelect = document.getElementById("typing-category-select");
    const cat = categorySelect ? categorySelect.value : "daily";
    populateArticlesDropdown(cat);
    
    restartSession();
  }

  function deactivate() {
    isActive = false;
    document.removeEventListener("keydown", handleKeypress);
    
    const typingContainer = document.getElementById("typing-container");
    if (typingContainer) {
      typingContainer.removeEventListener("click", grabFocus);
    }
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function toggleKeyboard() {
    const el = document.getElementById("typing-setting-keyboard");
    if (el) {
      settings.keyboard = el.checked;
      const keyboardEl = document.getElementById("typing-keyboard-wrapper");
      if (keyboardEl) {
        keyboardEl.style.display = settings.keyboard ? "block" : "none";
      }
    }
  }

  function toggleRomajiGuide() {
    const el = document.getElementById("typing-setting-romaji-guide");
    if (el) {
      settings.romajiGuide = el.checked;
      const romajiEl = document.getElementById("typing-word-romaji");
      if (romajiEl) {
        romajiEl.style.display = settings.romajiGuide ? "block" : "none";
      }
    }
  }

  function restartSession() {
    const select = document.getElementById("typing-article-select");
    if (!select || select.options.length === 0) return;
    
    const articleId = parseInt(select.value, 10);
    loadArticle(articleId);
    
    const resultsPanel = document.getElementById("typing-results-overlay");
    if (resultsPanel) resultsPanel.style.display = "none";
  }

  function loadArticle(id) {
    if (typeof TYPING_ARTICLES === 'undefined') return;
    
    currentArticle = TYPING_ARTICLES.find(a => a.id === id);
    if (!currentArticle) return;
    
    currentLineIdx = 0;
    correctHits = 0;
    errorHits = 0;
    comboCount = 0;
    maxCombo = 0;
    startTime = null;
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    // Update article title
    const titleEl = document.getElementById("typing-article-title");
    if (titleEl) titleEl.innerText = currentArticle.title;
    
    updateStatsUI();
    renderArticleScrollView();
    loadLine(currentLineIdx);
  }

  function loadLine(idx) {
    if (!currentArticle || idx >= currentArticle.lines.length) {
      finishSession();
      return;
    }
    
    currentLineIdx = idx;
    currentLine = currentArticle.lines[idx];
    currentSyllableIdx = 0;
    typedRomaji = "";
    
    syllables = parseToSyllables(currentLine.kana);
    
    // Update index labels
    const idxText = document.getElementById("typing-word-index");
    if (idxText) idxText.innerText = `行 ${idx + 1} / ${currentArticle.lines.length}`;
    
    const displayEl = document.getElementById("typing-word-display");
    if (displayEl) displayEl.innerText = currentLine.kanji;
    
    const transZh = document.getElementById("typing-trans-zh");
    if (transZh) transZh.innerText = currentLine.zh;
    
    const transDesc = document.getElementById("typing-trans-desc");
    if (transDesc) transDesc.innerText = `原文: ${currentLine.kanji}`;
    
    // Progress bar for the current article
    const progressFill = document.getElementById("typing-progress-fill");
    if (progressFill) {
      const pct = (idx / currentArticle.lines.length) * 100;
      progressFill.style.width = `${pct}%`;
    }
    
    renderArticleScrollView();
    renderFuriganaText();
    renderRomajiText();
    highlightVirtualKey();
  }

  function renderFuriganaText() {
    const furiganaEl = document.getElementById("typing-word-furigana");
    if (!furiganaEl) return;
    furiganaEl.innerHTML = "";
    
    syllables.forEach((syl, sIdx) => {
      const span = document.createElement("span");
      
      if (sIdx < currentSyllableIdx) {
        span.className = "char-typed";
        span.innerText = syl.kana;
      } else if (sIdx === currentSyllableIdx) {
        span.className = "char-current";
        span.innerText = syl.kana;
      } else {
        span.className = "char-remaining";
        span.innerText = syl.kana;
      }
      
      furiganaEl.appendChild(span);
    });
  }

  function renderArticleScrollView() {
    const container = document.getElementById("typing-article-scroll-view");
    if (!container || !currentArticle) return;
    
    container.innerHTML = "";
    currentArticle.lines.forEach((line, idx) => {
      const lineEl = document.createElement("div");
      lineEl.className = "typing-article-line";
      
      if (idx < currentLineIdx) {
        lineEl.classList.add("typed-line");
      } else if (idx === currentLineIdx) {
        lineEl.classList.add("active-line");
      } else {
        lineEl.classList.add("upcoming-line");
      }
      
      const textSpan = document.createElement("span");
      textSpan.className = "line-text";
      textSpan.innerText = `${idx + 1}. ${line.kanji}`;
      
      const transSpan = document.createElement("span");
      transSpan.className = "line-translation";
      transSpan.innerText = line.zh;
      
      lineEl.appendChild(textSpan);
      lineEl.appendChild(transSpan);
      container.appendChild(lineEl);
    });
    
    // Auto-scroll active line
    setTimeout(() => {
      const activeLineEl = container.querySelector(".active-line");
      if (activeLineEl) {
        activeLineEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 50);
  }

  function renderRomajiText() {
    const romajiEl = document.getElementById("typing-word-romaji");
    if (!romajiEl) return;
    romajiEl.innerHTML = "";
    
    syllables.forEach((syl, sIdx) => {
      const span = document.createElement("span");
      
      if (sIdx < currentSyllableIdx) {
        span.className = "char-typed";
        span.innerText = syl.typedVariant || syl.romajiList[0];
      } else if (sIdx === currentSyllableIdx) {
        const matches = syl.romajiList.filter(r => r.startsWith(typedRomaji));
        const activeOption = matches[0] || syl.romajiList[0];
        
        const typedSpan = document.createElement("span");
        typedSpan.className = "char-typed";
        typedSpan.innerText = typedRomaji;
        
        const currentSpan = document.createElement("span");
        currentSpan.className = "char-current";
        currentSpan.innerText = activeOption.charAt(typedRomaji.length);
        
        const remainingSpan = document.createElement("span");
        remainingSpan.className = "char-remaining";
        remainingSpan.innerText = activeOption.substring(typedRomaji.length + 1);
        
        span.appendChild(typedSpan);
        span.appendChild(currentSpan);
        span.appendChild(remainingSpan);
      } else {
        span.className = "char-remaining";
        span.innerText = syl.romajiList[0];
      }
      
      romajiEl.appendChild(span);
      if (sIdx < syllables.length - 1) {
        const space = document.createElement("span");
        space.innerText = " ";
        romajiEl.appendChild(space);
      }
    });
  }

  function highlightVirtualKey() {
    document.querySelectorAll(".virtual-keyboard .key.highlighted").forEach(k => {
      k.classList.remove("highlighted");
    });
    
    if (!currentArticle || currentLineIdx >= currentArticle.lines.length || !settings.keyboard) return;
    
    const syl = syllables[currentSyllableIdx];
    if (!syl) return;
    
    const matches = syl.romajiList.filter(r => r.startsWith(typedRomaji));
    const activeOption = matches[0] || syl.romajiList[0];
    const nextChar = activeOption.charAt(typedRomaji.length).toLowerCase();
    
    if (nextChar) {
      const keyEl = document.getElementById(`key-${nextChar}`);
      if (keyEl) {
        keyEl.classList.add("highlighted");
      }
    }
  }

  // --- Keyboard Event Handler ---

  function handleKeypress(e) {
    if (!isActive) return;
    
    // Only capture normal text characters
    if (!e.key || e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) return;
    
    // Prevent default scrolling on spacebar or slash
    if (e.key === " " || e.key === "/") {
      e.preventDefault();
    }
    
    const pressedKey = e.key.toLowerCase();
    
    // Physical key active effect on visual keyboard
    const visualKey = document.getElementById(`key-${pressedKey}`);
    if (visualKey) {
      visualKey.classList.add("active");
      setTimeout(() => {
        visualKey.classList.remove("active");
      }, 80);
    }
    
    // Initialize session timer on first keypress
    if (!startTime) {
      startTime = Date.now();
      timerInterval = setInterval(updateStatsUI, 1000);
    }
    
    // Get target syllable
    const syl = syllables[currentSyllableIdx];
    if (!syl) return;
    
    // Find matching Romaji strings that start with typedRomaji + pressedKey
    const testTyped = typedRomaji + pressedKey;
    const matchingVariants = syl.romajiList.filter(r => r.startsWith(testTyped));
    
    if (matchingVariants.length > 0) {
      // Correct keystroke!
      correctHits++;
      typedRomaji = testTyped;
      comboCount++;
      if (comboCount > maxCombo) maxCombo = comboCount;
      
      showComboUI();
      
      // Check if this fully completes the syllable group
      const exactMatch = matchingVariants.find(r => r === typedRomaji);
      if (exactMatch) {
        syl.typedVariant = exactMatch;
        currentSyllableIdx++;
        typedRomaji = "";
        renderFuriganaText();
      }
      
      // Check if current line is completed
      if (currentSyllableIdx >= syllables.length) {
        currentLineIdx++;
        setTimeout(() => {
          loadLine(currentLineIdx);
        }, 100);
      } else {
        renderRomajiText();
        highlightVirtualKey();
      }
    } else {
      // Incorrect keypress
      errorHits++;
      comboCount = 0;
      showComboUI();
      
      // Visual feedback: flash card outline red on incorrect key
      const cardEl = document.querySelector(".typing-word-card");
      if (cardEl) {
        cardEl.classList.add("has-miss");
        setTimeout(() => {
          cardEl.classList.remove("has-miss");
        }, 150);
      }
      
      if (visualKey) {
        visualKey.classList.add("miss");
        setTimeout(() => {
          visualKey.classList.remove("miss");
        }, 120);
      }
    }
    
    updateStatsUI();
  }

  // --- UI Update Utilities ---

  function updateStatsUI() {
    const wpmEl = document.getElementById("typing-stat-wpm");
    const accEl = document.getElementById("typing-stat-accuracy");
    const hitsEl = document.getElementById("typing-stat-correct");
    const errEl = document.getElementById("typing-stat-errors");
    
    const total = correctHits + errorHits;
    const accuracy = total > 0 ? Math.round((correctHits / total) * 100) : 100;
    
    let wpmDisplay = "--";
    if (startTime) {
      const minutes = (Date.now() - startTime) / 60000;
      if (minutes > 0.05) {
        wpmDisplay = Math.round((correctHits / 5) / minutes);
      }
    }
    
    if (wpmEl) wpmEl.innerText = wpmDisplay;
    if (accEl) accEl.innerText = `${accuracy}%`;
    if (hitsEl) hitsEl.innerText = correctHits;
    if (errEl) errEl.innerText = errorHits;
  }

  function showComboUI() {
    const comboDisplay = document.getElementById("typing-combo-display");
    const comboNum = document.getElementById("typing-combo-num");
    if (!comboDisplay || !comboNum) return;
    
    if (comboCount >= 3) {
      comboNum.innerText = comboCount;
      comboDisplay.style.opacity = "1";
      comboDisplay.classList.remove("hidden");
    } else {
      comboDisplay.style.opacity = "0";
    }
  }

  // --- Results Handling ---

  function finishSession() {
    deactivate();
    
    const resultsPanel = document.getElementById("typing-results-overlay");
    if (!resultsPanel) return;
    
    resultsPanel.style.display = "flex";
    
    const minutes = startTime ? (Date.now() - startTime) / 60000 : 0.1;
    const wpm = Math.round((correctHits / 5) / minutes);
    const total = correctHits + errorHits;
    const accuracy = total > 0 ? Math.round((correctHits / total) * 100) : 100;
    
    // Determine rank grade based on WPM and Accuracy
    let rank = "C";
    if (wpm >= 200 && accuracy >= 98) rank = "S";
    else if (wpm >= 160 && accuracy >= 95) rank = "A+";
    else if (wpm >= 120 && accuracy >= 92) rank = "A";
    else if (wpm >= 80 && accuracy >= 88) rank = "B+";
    else if (wpm >= 50 && accuracy >= 80) rank = "B";
    else if (wpm >= 30 && accuracy >= 70) rank = "C+";
    
    const rankEl = document.getElementById("typing-result-rank");
    const badgeEl = document.getElementById("typing-result-accuracy-badge");
    const rWpm = document.getElementById("typing-result-wpm");
    const rWpmBar = document.getElementById("typing-result-wpm-bar");
    const rAcc = document.getElementById("typing-result-accuracy");
    const rAccBar = document.getElementById("typing-result-accuracy-bar");
    const rHits = document.getElementById("typing-result-total-hits");
    const rErrs = document.getElementById("typing-result-total-errors");
    
    if (rankEl) rankEl.innerText = rank;
    if (badgeEl) {
      badgeEl.innerText = accuracy >= 80 ? "合格" : "不合格";
      badgeEl.className = `pass-status-badge ${accuracy >= 80 ? 'pass' : 'fail'}`;
      if (accuracy < 80) badgeEl.style.textShadow = "0 0 8px rgba(239, 68, 68, 0.4)";
    }
    
    if (rWpm) rWpm.innerText = `${wpm} WPM`;
    if (rWpmBar) rWpmBar.style.width = `${Math.min(wpm * 0.5, 100)}%`;
    if (rAcc) rAcc.innerText = `${accuracy}%`;
    if (rAccBar) rAccBar.style.width = `${accuracy}%`;
    if (rHits) rHits.innerText = correctHits;
    if (rErrs) rErrs.innerText = errorHits;
    
    // Fill article review table
    const tableBody = document.getElementById("typing-results-table-body");
    if (tableBody && currentArticle) {
      tableBody.innerHTML = "";
      currentArticle.lines.forEach((l, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>${idx + 1}. ${l.kanji}</strong></td>
          <td><code style="color: var(--neon-cyan);">${l.kana}</code></td>
          <td>${l.zh}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  }

  function closeResults() {
    const resultsPanel = document.getElementById("typing-results-overlay");
    if (resultsPanel) resultsPanel.style.display = "none";
    restartSession();
    activate();
  }

  function renderVirtualKeyboard() {
    const keyboardEl = document.getElementById("virtual-keyboard");
    if (!keyboardEl) return;
    
    keyboardEl.innerHTML = "";
    KEYBOARD_LAYOUT.forEach(row => {
      const rowEl = document.createElement("div");
      rowEl.className = "keyboard-row";
      row.forEach(key => {
        const keyEl = document.createElement("div");
        keyEl.className = "key";
        keyEl.id = `key-${key}`;
        
        let displayChar = key.toUpperCase();
        keyEl.innerText = displayChar;
        rowEl.appendChild(keyEl);
      });
      keyboardEl.appendChild(rowEl);
    });
  }

  // --- Exposed Interface ---
  return {
    activate,
    deactivate,
    toggleKeyboard,
    toggleRomajiGuide,
    changeCategory,
    changeArticle,
    restartSession,
    closeResults,
    renderVirtualKeyboard
  };
})();

// Export to window
window.TypingSandbox = TypingSandbox;
