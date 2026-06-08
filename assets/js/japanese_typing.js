const TypingHub = (() => {
  const STORAGE_KEY = "study-tools-japanese-typing-v1";
  const categoryLabels = {
    all: "全部", daily: "生活", social: "社交", workplace: "职场",
    business_mail: "商务邮件", it: "IT开发", public: "公共手续",
    news: "新闻", literature: "文学随笔", culture: "趣味文化", special: "专项"
  };

  let state = {
    category: "all", query: "", currentId: null, startedAt: null,
    timer: null, elapsed: 0, corrections: 0, lastLength: 0,
    sessionErrors: [], favorites: [], history: [], reviewIds: []
  };

  const $ = id => document.getElementById(id);
  const library = () => window.JAPANESE_TYPING_LIBRARY || [];
  const current = () => library().find(item => item.id === state.currentId);
  const normalize = value => value.replace(/\r\n/g, "\n").normalize("NFKC");

  function loadStored() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      state.favorites = Array.isArray(saved.favorites) ? saved.favorites : [];
      state.history = Array.isArray(saved.history) ? saved.history.slice(0, 50) : [];
      state.reviewIds = Array.isArray(saved.reviewIds) ? saved.reviewIds : [];
    } catch (_) {}
  }

  function saveStored() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      favorites: state.favorites, history: state.history, reviewIds: state.reviewIds
    }));
  }

  function init() {
    loadStored();
    renderCategories();
    renderLibrary();
    renderHistory();
    const input = $("typing-ime-input");
    if (input) {
      input.addEventListener("input", handleInput);
      input.addEventListener("keydown", event => {
        if (event.key === "Tab") {
          event.preventDefault();
          input.value += "\t";
          handleInput();
        }
      });
    }
    chooseArticle(filteredArticles()[0]?.id || library()[0]?.id);
  }

  function open() {
    const hub = $("typing-hub");
    const main = $("main-app-body");
    if (main) main.style.display = "none";
    if (hub) hub.classList.add("is-active");
    document.querySelectorAll(".sub-header-bar").forEach(el => el.style.display = "none");
    document.querySelectorAll(".subject-tab").forEach(el => el.classList.remove("active"));
    $("subject-tab-typing")?.classList.add("active");
    $("header-challenge") && ($("header-challenge").style.display = "none");
    const title = $("main-title-text");
    const icon = $("main-logo-icon");
    if (title) title.innerText = "日本語タイピング";
    if (icon) icon.className = "fa-solid fa-keyboard logo-icon";
    setTimeout(() => $("typing-ime-input")?.focus(), 50);
  }

  function close() {
    $("typing-hub")?.classList.remove("is-active");
    stopTimer();
  }

  function filteredArticles() {
    const q = state.query.trim().toLowerCase();
    return library().filter(item => {
      const categoryOk = state.category === "all" || item.category === state.category ||
        (state.category === "favorites" && state.favorites.includes(item.id)) ||
        (state.category === "review" && state.reviewIds.includes(item.id));
      const haystack = `${item.title} ${item.text} ${item.tags.join(" ")}`.toLowerCase();
      return categoryOk && (!q || haystack.includes(q));
    });
  }

  function renderCategories() {
    const root = $("typing-category-list");
    if (!root) return;
    const entries = [...Object.entries(categoryLabels), ["favorites", "收藏"], ["review", "错句复练"]];
    root.innerHTML = entries.map(([key, label]) =>
      `<button class="typing-category-btn ${state.category === key ? "active" : ""}" data-category="${key}">${label}</button>`
    ).join("");
    root.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
      state.category = btn.dataset.category;
      renderCategories();
      renderLibrary();
    }));
  }

  function renderLibrary() {
    const root = $("typing-article-list");
    if (!root) return;
    const items = filteredArticles();
    root.innerHTML = items.length ? items.map(item => `
      <button class="typing-article-item ${item.id === state.currentId ? "active" : ""}" data-id="${item.id}">
        <strong>${escapeHtml(item.title)}</strong>
        <span class="typing-article-meta">${escapeHtml(categoryLabels[item.category])} · ${item.text.length}字 · ${escapeHtml(item.tags.join(" / "))}</span>
      </button>`).join("") : `<p class="typing-empty">没有符合条件的文章。</p>`;
    root.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => chooseArticle(btn.dataset.id)));
    $("typing-library-count").textContent = `${items.length} 篇`;
  }

  function chooseArticle(id) {
    if (!id) return;
    stopTimer();
    state.currentId = id;
    state.startedAt = null;
    state.elapsed = 0;
    state.corrections = 0;
    state.lastLength = 0;
    state.sessionErrors = [];
    const item = current();
    if (!item) return;
    $("typing-current-title").textContent = item.title;
    $("typing-current-tags").innerHTML = item.tags.map(tag => `<span class="typing-tag">${escapeHtml(tag)}</span>`).join("");
    $("typing-ime-input").value = "";
    $("typing-ime-input").disabled = false;
    $("typing-result").classList.remove("show");
    $("typing-favorite-btn").classList.toggle("active", state.favorites.includes(id));
    renderSource("");
    updateStats("");
    renderLibrary();
  }

  function handleInput() {
    const input = $("typing-ime-input");
    const item = current();
    if (!input || !item) return;
    if (!state.startedAt && input.value.length) startTimer();
    if (input.value.length < state.lastLength) state.corrections++;
    state.lastLength = input.value.length;
    const typed = normalize(input.value);
    const target = normalize(item.text);
    const prefix = commonPrefix(typed, target);
    const wrong = typed.length > prefix;
    input.classList.toggle("has-error", wrong);
    if (wrong) state.sessionErrors.push({ expected: target[prefix] || "", actual: typed[prefix] || "" });
    renderSource(typed);
    updateStats(typed);
    if (typed === target) finish();
  }

  function renderSource(typed) {
    const root = $("typing-source");
    const item = current();
    if (!root || !item) return;
    const target = normalize(item.text);
    const prefix = commonPrefix(typed, target);
    const currentChar = target[prefix] || "";
    root.innerHTML = `<span class="done">${escapeHtml(target.slice(0, prefix))}</span>` +
      `<span class="current">${escapeHtml(currentChar)}</span>` +
      `<span class="rest">${escapeHtml(target.slice(prefix + (currentChar ? 1 : 0)))}</span>`;
    $("typing-progress-fill").style.width = `${Math.min(100, (prefix / target.length) * 100)}%`;
  }

  function updateStats(typed) {
    const item = current();
    if (!item) return;
    const target = normalize(item.text);
    const prefix = commonPrefix(typed, target);
    const wrongCount = Math.max(0, typed.length - prefix);
    const total = Math.max(typed.length, 1);
    const accuracy = Math.max(0, Math.round(((total - wrongCount) / total) * 100));
    const minutes = Math.max(state.elapsed / 60, 1 / 60);
    const kpm = state.startedAt ? Math.round(prefix / minutes) : 0;
    $("typing-stat-kpm").textContent = kpm;
    $("typing-stat-accuracy").textContent = `${accuracy}%`;
    $("typing-stat-progress").textContent = `${prefix}/${target.length}`;
    $("typing-stat-corrections").textContent = state.corrections;
    $("typing-stat-time").textContent = formatTime(state.elapsed);
  }

  function startTimer() {
    state.startedAt = Date.now();
    state.timer = setInterval(() => {
      state.elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
      updateStats(normalize($("typing-ime-input").value));
      const limit = Number($("typing-time-limit").value || 0);
      if (limit && state.elapsed >= limit) finish(true);
    }, 250);
  }

  function stopTimer() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
  }

  function finish(timedOut = false) {
    const item = current();
    if (!item || !state.startedAt) return;
    stopTimer();
    const typed = normalize($("typing-ime-input").value);
    const target = normalize(item.text);
    const prefix = commonPrefix(typed, target);
    const seconds = Math.max(1, Math.floor((Date.now() - state.startedAt) / 1000));
    state.elapsed = seconds;
    const kpm = Math.round(prefix / (seconds / 60));
    const wrongCount = levenshtein(typed, target);
    const accuracy = Math.max(0, Math.round((1 - wrongCount / Math.max(target.length, 1)) * 100));
    const record = { id: item.id, title: item.title, date: new Date().toISOString(), kpm, accuracy, seconds, completed: !timedOut && typed === target };
    state.history.unshift(record);
    state.history = state.history.slice(0, 50);
    if (accuracy < 98 && !state.reviewIds.includes(item.id)) state.reviewIds.push(item.id);
    if (accuracy >= 100) state.reviewIds = state.reviewIds.filter(id => id !== item.id);
    saveStored();
    renderHistory();
    $("typing-ime-input").disabled = true;
    $("typing-result-title").textContent = record.completed ? "练习完成" : "限时结束";
    $("typing-result-summary").textContent = `${kpm} KPM · 正确率 ${accuracy}% · ${formatTime(seconds)} · 修改 ${state.corrections} 次`;
    $("typing-result").classList.add("show");
    updateStats(typed);
  }

  function restart() {
    chooseArticle(state.currentId);
    $("typing-ime-input")?.focus();
  }

  function randomArticle() {
    const items = filteredArticles().length ? filteredArticles() : library();
    const choice = items[Math.floor(Math.random() * items.length)];
    chooseArticle(choice.id);
    $("typing-ime-input")?.focus();
  }

  function toggleFavorite() {
    const id = state.currentId;
    if (!id) return;
    state.favorites = state.favorites.includes(id) ? state.favorites.filter(x => x !== id) : [...state.favorites, id];
    saveStored();
    $("typing-favorite-btn").classList.toggle("active", state.favorites.includes(id));
    if (state.category === "favorites") renderLibrary();
  }

  function search(value) {
    state.query = value;
    renderLibrary();
  }

  function renderHistory() {
    const root = $("typing-history-list");
    if (!root) return;
    root.innerHTML = state.history.length ? state.history.slice(0, 6).map(row => `
      <div class="typing-history-row"><span>${escapeHtml(row.title)}</span><strong>${row.kpm} KPM / ${row.accuracy}%</strong></div>
    `).join("") : `<p class="typing-empty">完成一次练习后，这里会显示最近成绩。</p>`;
    $("typing-review-count").textContent = `${state.reviewIds.length} 篇待复练`;
  }

  function commonPrefix(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  }

  function levenshtein(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const temp = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = temp;
      }
    }
    return row[b.length];
  }

  function formatTime(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }

  function escapeHtml(value = "") {
    return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  document.addEventListener("DOMContentLoaded", init);
  return { open, close, restart, randomArticle, toggleFavorite, search };
})();

window.TypingHub = TypingHub;
