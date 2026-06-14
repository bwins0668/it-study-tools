'use strict';

window.StudyAI = (() => {
  const SUBJECT_LABELS = {
    sql: 'SQL',
    java: 'Java',
    python: 'Python',
    itpass: 'IT Passport',
    sg: 'SG'
  };
  const state = {
    messages: [],
    contextKey: '',
    providers: [],
    loading: false,
    generatedQuestion: null,
    generatedActive: false
  };

  const $ = (id) => document.getElementById(id);

  function scheduleI18n(root) {
    if (window.I18n && window.I18n.isActive()) {
      window.I18n.scheduleTranslate(root || document.body);
    }
  }

  function escapeText(value) {
    var str = String(value == null ? "" : value);
    // [R22.11] Remove mojibake patterns
    str = str.replace(/[\u9B2B\u9B2E\u9B77\u9B6C\u9B54\u9B36\u9B30\u9B2C\u9B3B\u9B48\u9B41\u9B3E\u9B32\u9B44\u9B34\u9B6B]/g, "");
    return str;
  }

  const ERROR_HINTS = {
    API_KEY_MISSING: '当前 Provider 缺少 API Key，请打开 AI 设置完成配置。',
    AUTH_FAILED: 'API Key 无效或没有模型权限，请检查后重试。',
    SERVICE_UNAVAILABLE: 'AI 服务暂时无法连接。使用 Ollama 时请确认本机服务已启动。',
    MODEL_NOT_FOUND: '所选模型不存在，请在 AI 设置中更换模型。',
    AI_TIMEOUT: 'AI 响应超时，请稍后重试或选择速度更快的模型。',
    RATE_LIMITED: '请求过于频繁或额度不足，请稍后重试。',
    INVALID_PROVIDER_RESPONSE: 'Provider 返回了无法识别的数据。',
    GENERATION_VALIDATION_FAILED: '题目未通过结构或执行校验，请换个知识点重试。'
  };

  function friendlyError(error) {
    return ERROR_HINTS[error && error.code] || (error && error.message) || '请求失败，请稍后重试。';
  }

  function toast(message, type = 'info') {
    const region = $('ai-toast-region');
    if (!region) return;
    const node = document.createElement('div');
    node.className = `ai-toast ${type}`;
    const icon = document.createElement('i');
    icon.className = `fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info'}`;
    const text = document.createElement('span');
    text.textContent = message;
    node.append(icon, text);
    region.appendChild(node);
    setTimeout(() => node.remove(), 3600);
  }

  function appendInline(parent, text) {
    const pattern = /(`[^`]+`|\*\*[^*]+\*\*)/g;
    let cursor = 0;
    let match;
    while ((match = pattern.exec(text))) {
      if (match.index > cursor) parent.appendChild(document.createTextNode(text.slice(cursor, match.index)));
      const token = match[0];
      const node = document.createElement(token.startsWith('`') ? 'code' : 'strong');
      node.textContent = token.startsWith('`') ? token.slice(1, -1) : token.slice(2, -2);
      parent.appendChild(node);
      cursor = match.index + token.length;
    }
    if (cursor < text.length) parent.appendChild(document.createTextNode(text.slice(cursor)));
  }

  function appendRichText(container, content) {
    const chunks = String(content || '').split(/```/);
    chunks.forEach((chunk, index) => {
      if (!chunk) return;
      if (index % 2 === 1) {
        const firstBreak = chunk.indexOf('\n');
        const language = firstBreak > -1 ? chunk.slice(0, firstBreak).trim() : 'code';
        const codeText = firstBreak > -1 ? chunk.slice(firstBreak + 1) : chunk;
        const block = document.createElement('div');
        block.className = 'ai-code-block';
        const head = document.createElement('div');
        head.className = 'ai-code-head';
        const label = document.createElement('span');
        label.textContent = language || 'code';
        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'ai-copy-btn';
        copy.innerHTML = '<i class="fa-regular fa-copy"></i> 复制';
        copy.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(codeText.trim());
            copy.innerHTML = '<i class="fa-solid fa-check"></i> 已复制';
            setTimeout(() => { copy.innerHTML = '<i class="fa-regular fa-copy"></i> 复制'; }, 1300);
          } catch (_) {
            toast('复制失败，请手动选择代码。', 'error');
          }
        });
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = codeText.trim();
        pre.appendChild(code);
        head.append(label, copy);
        block.append(head, pre);
        container.appendChild(block);
        return;
      }

      const groups = chunk.trim().split(/\n{2,}/);
      groups.forEach((group) => {
        const lines = group.split('\n').filter(Boolean);
        if (!lines.length) return;
        const isList = lines.every((line) => /^\s*([-*]|\d+\.)\s+/.test(line));
        if (isList) {
          const ordered = /^\s*\d+\./.test(lines[0]);
          const list = document.createElement(ordered ? 'ol' : 'ul');
          lines.forEach((line) => {
            const item = document.createElement('li');
            appendInline(item, line.replace(/^\s*([-*]|\d+\.)\s+/, ''));
            list.appendChild(item);
          });
          container.appendChild(list);
        } else {
          const paragraph = document.createElement('p');
          lines.forEach((line, lineIndex) => {
            if (lineIndex) paragraph.appendChild(document.createElement('br'));
            appendInline(paragraph, line);
          });
          container.appendChild(paragraph);
        }
      });
    });
  }

  function apiError(payload, fallback) {
    return payload && payload.error && payload.error.message
      ? payload.error.message
      : fallback;
  }

  async function api(path, options = {}) {
    // Web 公开版：所有本地后端请求直接跳过，避免 405 控制台刷屏
    if (window.STUDY_TOOLS_DISABLE_LOCAL_BACKEND) {
      throw new Error('Web 公开版已禁用本地后端请求');
    }
    const response = await fetch(path, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    let payload;
    try {
      payload = await response.json();
    } catch (_) {
      throw new Error(`服务器返回无效响应 (${response.status})`);
    }
    if (!response.ok || !payload.success) {
      const error = new Error(apiError(payload, `请求失败 (${response.status})`));
      error.code = payload && payload.error ? payload.error.code : 'REQUEST_FAILED';
      throw error;
    }
    return payload.data;
  }

  function settings() {
    return {
      provider: localStorage.getItem('study-ai-provider') || 'gemini',
      model: localStorage.getItem('study-ai-model') || '',
      ollamaUrl: localStorage.getItem('study-ai-ollama-url') || 'http://127.0.0.1:11434',
      apiKey: sessionStorage.getItem('study-ai-api-key') || ''
    };
  }

  function selectedProvider() {
    const config = settings();
    return state.providers.find((provider) => provider.id === config.provider) || null;
  }

  function providerIsReady() {
    const config = settings();
    const provider = selectedProvider();
    if (config.provider === 'ollama') return Boolean(provider && provider.configured && provider.models.length);
    return Boolean(config.apiKey || (provider && provider.configured));
  }

  function updateProviderIndicators() {
    const config = settings();
    const ready = providerIsReady();
    const launcherDot = $('ai-launcher-status');
    if (launcherDot) launcherDot.classList.toggle('ready', ready);
    const launcherState = $('ai-launcher-state');
    if (launcherState) {
      launcherState.textContent = ready
        ? `${config.provider.toUpperCase()} 已就绪`
        : `${config.provider.toUpperCase()} 需要配置`;
    }
    const chip = $('ai-current-provider');
    if (chip) {
      chip.className = `ai-provider-chip ${ready ? 'ready' : 'warning'}`;
      chip.innerHTML = `<i class="fa-solid ${ready ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>${config.provider.toUpperCase()}`;
    }
    scheduleI18n(document.querySelector('.ai-header-menu'));
  }

  function isExamActive() {
    return Boolean(
      (typeof activeCbtExam !== 'undefined' && activeCbtExam && !activeCbtExam.isSubmitted) ||
      (typeof activeCodingExam !== 'undefined' && activeCodingExam && !activeCodingExam.isSubmitted)
    );
  }

  function lessonForSubject(subject) {
    if (subject === 'sql' && typeof SQL_LESSONS !== 'undefined') {
      return SQL_LESSONS.find((item) => item.id === currentLessonId);
    }
    if (subject === 'java' && typeof JAVA_LESSONS !== 'undefined') {
      return JAVA_LESSONS.find((item) => item.id === currentJavaLessonId);
    }
    if (subject === 'python' && typeof PYTHON_LESSONS !== 'undefined') {
      return PYTHON_LESSONS.find((item) => item.id === currentPythonLessonId);
    }
    if (subject === 'itpass' && typeof IT_PASSPORT_LESSONS !== 'undefined') {
      return IT_PASSPORT_LESSONS.find((item) => item.id === currentItPassLessonId);
    }
    if (subject === 'sg' && typeof SG_LESSONS !== 'undefined') {
      return SG_LESSONS.find((item) => item.id === currentSgLessonId);
    }
    return null;
  }

  function codeAndOutput(subject) {
    const map = {
      sql: ['sql-editor', 'output-body'],
      java: ['java-editor', 'java-output-content'],
      python: ['python-editor', 'python-output-content']
    };
    const ids = map[subject] || [];
    const editor = ids[0] ? $(ids[0]) : null;
    const output = ids[1] ? $(ids[1]) : null;
    const input = subject === 'java'
      ? $('java-input-content')
      : subject === 'python'
        ? $('python-input-content')
        : null;
    return {
      code: editor ? editor.value : '',
      stdin: input ? input.value : '',
      output: output ? output.innerText : ''
    };
  }

  function getContext() {
    const subject = typeof currentSubject === 'string' && SUBJECT_LABELS[currentSubject]
      ? currentSubject
      : 'sql';
    const lesson = lessonForSubject(subject) || {};
    const codeState = codeAndOutput(subject);
    const itemId = lesson.id != null
      ? lesson.id
      : subject === 'sql'
        ? currentLessonId
        : '';
    return {
      subject,
      subjectLabel: SUBJECT_LABELS[subject],
      itemId,
      topic: lesson.titleZh || lesson.titleJa || lesson.topic || '当前练习',
      titleZh: lesson.titleZh || '',
      titleJa: lesson.titleJa || '',
      taskZh: lesson.taskZh || lesson.questionZh || '',
      taskJa: lesson.taskJa || lesson.questionJa || '',
      code: codeState.code.slice(0, 12000),
      stdin: codeState.stdin.slice(0, 4000),
      output: codeState.output.slice(0, 12000),
      examSubmitted: Boolean(
        (typeof activeCbtExam !== 'undefined' && activeCbtExam && activeCbtExam.isSubmitted) ||
        (typeof activeCodingExam !== 'undefined' && activeCodingExam && activeCodingExam.isSubmitted)
      )
    };
  }

  function contextKey() {
    const context = getContext();
    return `${context.subject}:${context.itemId}`;
  }

  function syncContext() {
    const next = contextKey();
    if (state.contextKey && state.contextKey !== next) {
      state.messages = [];
      renderMessages();
    }
    state.contextKey = next;
    updateContextCard();
    updateExamLock();
  }

  function updateContextCard() {
    const context = getContext();
    const subject = $('ai-context-subject');
    const topic = $('ai-context-topic');
    if (subject) subject.textContent = `${context.subjectLabel} · 当前学习上下文`;
    if (topic) topic.textContent = context.topic || '未选择课程';
    updateProviderIndicators();
    scheduleI18n($('ai-assistant-drawer'));
  }

  async function track(event) {
    try {
      return await api('/api/learning/events', {
        method: 'POST',
        body: JSON.stringify(event)
      });
    } catch (error) {
      // Web 公开版静默跳过，不打印 warning
      if (!window.STUDY_TOOLS_DISABLE_LOCAL_BACKEND) {
        console.warn('[StudyAI] event tracking failed:', error.message);
      }
      return null;
    }
  }

  async function importLegacyProgress() {
    const parse = (key) => {
      try {
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch (_) {
        return [];
      }
    };
    try {
      await api('/api/learning/import', {
        method: 'POST',
        body: JSON.stringify({
          progress: {
            sql: parse('sql_hub_completed'),
            java: parse('java_completed_lessons'),
            python: parse('python_completed_lessons'),
            itpass: parse('itpass_completed_lessons'),
            sg: parse('sg_completed_lessons')
          }
        })
      });
    } catch (error) {
      if (!window.STUDY_TOOLS_DISABLE_LOCAL_BACKEND) {
        console.warn('[StudyAI] legacy import failed:', error.message);
      }
    }
  }

  function addMessage(role, content, isError = false) {
    state.messages.push({ role, content: escapeText(content), isError });
    state.messages = state.messages.slice(-16);
    renderMessages();
  }

  function renderMessages() {
    const log = $('ai-chat-log');
    if (!log) return;
    log.textContent = '';
    if (!state.messages.length) {
      const welcome = document.createElement('div');
      welcome.className = 'ai-empty-state';
      welcome.innerHTML = `
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <h3>从当前课程开始提问</h3>
        <p>我会自动读取当前题目、代码、输入与运行结果。回答默认先中文，再附日文摘要。</p>
        <div class="ai-starter-prompts">
          <button type="button" class="ai-starter-prompt" data-starter="帮我总结这一课的核心知识点">总结本课</button>
          <button type="button" class="ai-starter-prompt" data-starter="检查我的代码思路，但先不要给答案">检查思路</button>
          <button type="button" class="ai-starter-prompt" data-starter="给我一个不泄露答案的第一级提示">给我提示</button>
        </div>`;
      welcome.querySelectorAll('[data-starter]').forEach((button) => {
        button.addEventListener('click', () => ask('chat', 1, button.dataset.starter));
      });
      log.appendChild(welcome);
    }
    state.messages.forEach((message) => {
      const wrap = document.createElement('div');
      wrap.className = `ai-message-wrap ${message.role}`;
      const meta = document.createElement('div');
      meta.className = 'ai-message-meta';
      meta.textContent = message.role === 'user' ? '你' : 'AI 导师';
      const node = document.createElement('div');
      node.className = `ai-message ${message.role}${message.isError ? ' error' : ''}`;
      appendRichText(node, message.content);
      wrap.append(meta, node);
      log.appendChild(wrap);
    });
    if (state.loading) {
      const wrap = document.createElement('div');
      wrap.className = 'ai-message-wrap assistant';
      const meta = document.createElement('div');
      meta.className = 'ai-message-meta';
      meta.textContent = 'AI 导师正在思考';
      const node = document.createElement('div');
      node.className = 'ai-message assistant';
      node.innerHTML = '<span class="ai-loading-dots" aria-label="正在生成"><i></i><i></i><i></i></span>';
      wrap.append(meta, node);
      log.appendChild(wrap);
    }
    log.scrollTop = log.scrollHeight;
    scheduleI18n(log);
  }

  function updateExamLock() {
    const locked = isExamActive();
    const banner = $('ai-exam-lock');
    if (banner) banner.style.display = locked ? 'block' : 'none';
    document.querySelectorAll('.ai-action-btn, #ai-send-btn').forEach((button) => {
      button.disabled = locked || state.loading;
    });
    const input = $('ai-chat-input');
    if (input) input.disabled = locked || state.loading;
    const sendLabel = $('ai-send-label');
    if (sendLabel) sendLabel.textContent = state.loading ? '生成中' : '发送';
    scheduleI18n($('ai-assistant-drawer'));
  }

  async function ask(action = 'chat', hintLevel = 1, explicitText = '') {
    syncContext();
    if (isExamActive()) {
      addMessage('assistant', '正式模拟考试进行中，AI 已禁用。提交后可进行错题讲解。\n模擬試験中はAIを利用できません。提出後に解説を利用できます。', true);
      return;
    }
    const input = $('ai-chat-input');
    const text = explicitText || (input ? input.value.trim() : '');
    if (action === 'chat' && !text) return;
    const prompts = {
      debug: '请分析当前代码或查询的错误，并给出修改步骤。',
      explain: '请解释当前代码或查询的关键逻辑。',
      trace: '请逐步模拟当前代码或查询的执行过程。',
      hint: `请给我第 ${hintLevel} 级提示。`,
      review: '请讲解当前错题，并给一道相近但不相同的变式。'
    };
    const userText = text || prompts[action] || prompts.explain;
    addMessage('user', userText);
    if (input) input.value = '';
    state.loading = true;
    renderMessages();
    updateExamLock();
    try {
      const config = settings();
      const data = await api('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          ...config,
          action,
          hintLevel,
          messages: state.messages
            .filter((item) => !item.isError)
            .slice(-16)
            .map(({ role, content }) => ({ role, content })),
          context: getContext()
        })
      });
      addMessage('assistant', data.message);
    } catch (error) {
      addMessage('assistant', friendlyError(error), true);
    } finally {
      state.loading = false;
      renderMessages();
      updateExamLock();
    }
  }

  function openAssistant(action) {
    syncContext();
    $('ai-assistant-drawer').classList.add('open');
    $('ai-assistant-drawer').setAttribute('aria-hidden', 'false');
    $('ai-drawer-scrim').classList.add('open');
    $('ai-assistant-btn').setAttribute('aria-expanded', 'true');
    closeLauncher();
    scheduleI18n($('ai-assistant-drawer'));
    setTimeout(() => $('ai-chat-input').focus(), 180);
    if (action) ask(action);
  }

  function closeAssistant() {
    $('ai-assistant-drawer').classList.remove('open');
    $('ai-assistant-drawer').setAttribute('aria-hidden', 'true');
    $('ai-drawer-scrim').classList.remove('open');
    $('ai-assistant-btn').setAttribute('aria-expanded', 'false');
  }

  async function loadProviders() {
    // Web 公开版：静默跳过，不请求本地后端
    if (window.STUDY_TOOLS_DISABLE_LOCAL_BACKEND) {
      state.providers = [];
      updateProviderIndicators();
      return;
    }
    try {
      const data = await api('/api/ai/providers');
      state.providers = data.providers || [];
      renderProviderStatus();
      updateProviderIndicators();
    } catch (error) {
      const node = $('ai-provider-status');
      if (node) node.textContent = friendlyError(error);
      updateProviderIndicators();
    }
  }

  function renderProviderStatus() {
    const node = $('ai-provider-status');
    if (!node) return;
    node.className = 'ai-provider-list';
    node.textContent = '';
    state.providers.forEach((provider) => {
      const item = document.createElement('div');
      item.className = 'ai-provider-item';
      const title = document.createElement('strong');
      const dot = document.createElement('span');
      dot.className = `ai-status-dot${provider.configured ? ' ready' : ''}`;
      title.append(dot, document.createTextNode(provider.id));
      const detail = document.createElement('small');
      detail.textContent = provider.id === 'ollama'
        ? (provider.configured ? `${provider.models.length} 个本地模型` : '本机服务未启动')
        : (provider.configured ? '已检测环境变量' : '可使用会话密钥');
      item.append(title, detail);
      node.appendChild(item);
    });
    scheduleI18n(node);
    return;
    node.textContent = state.providers.map((provider) => {
      if (provider.id === 'ollama') {
        return `Ollama: ${provider.configured ? `${provider.models.length} 个本地模型` : '未启动'}`;
      }
      return `${provider.id}: ${provider.configured ? '已检测到环境密钥' : '未检测到环境密钥'}`;
    }).join(' | ');
  }

  function openSettings() {
    const config = settings();
    $('ai-setting-provider').value = config.provider;
    $('ai-setting-model').value = config.model;
    $('ai-setting-ollama').value = config.ollamaUrl;
    $('ai-setting-key').value = config.apiKey;
    $('ai-settings-modal').classList.add('open');
    closeLauncher();
    updateModelPlaceholder();
    loadProviders();
    scheduleI18n($('ai-settings-modal'));
  }

  function saveSettings() {
    localStorage.setItem('study-ai-provider', $('ai-setting-provider').value);
    localStorage.setItem('study-ai-model', $('ai-setting-model').value.trim());
    localStorage.setItem('study-ai-ollama-url', $('ai-setting-ollama').value.trim());
    const key = $('ai-setting-key').value.trim();
    if (key) sessionStorage.setItem('study-ai-api-key', key);
    else sessionStorage.removeItem('study-ai-api-key');
    $('ai-settings-modal').classList.remove('open');
    updateProviderIndicators();
    toast('AI 设置已保存。API Key 仅保留在当前浏览器会话。', 'success');
  }

  async function openDashboard() {
    $('ai-dashboard-modal').classList.add('open');
    closeLauncher();
    scheduleI18n($('ai-dashboard-modal'));
    const body = $('ai-dashboard-body');
    body.innerHTML = '<div class="ai-generation-state"><i class="fa-solid fa-chart-line"></i>正在整理本地学习数据...</div>';
    try {
      const data = await api('/api/learning/dashboard');
      renderDashboard(data);
    } catch (error) {
      body.innerHTML = '';
      const failure = document.createElement('div');
      failure.className = 'ai-generation-state';
      failure.textContent = friendlyError(error);
      body.appendChild(failure);
      scheduleI18n(body);
    }
  }

  function card(label, value) {
    const node = document.createElement('div');
    node.className = 'ai-stat-card';
    const caption = document.createElement('span');
    caption.textContent = label;
    const strong = document.createElement('strong');
    strong.textContent = value;
    node.append(caption, strong);
    return node;
  }

  function renderDashboard(data) {
    renderDashboardV2(data);
    return;
    const root = $('ai-dashboard-body');
    root.textContent = '';
    const summary = document.createElement('div');
    summary.className = 'ai-dashboard-summary';
    summary.append(
      card('综合掌握度 / 総合習熟度', `${data.overallMastery}%`),
      card('连续学习 / 連続学習', `${data.streakDays} 天`),
      card('今日任务 / 今日の計画', `${data.todayPlan.filter((item) => !item.completed_at).length}`)
    );
    root.appendChild(summary);

    const subjectGrid = document.createElement('div');
    subjectGrid.className = 'ai-subject-grid';
    data.subjects.forEach((item) => {
      const node = document.createElement('div');
      node.className = 'ai-stat-card';
      const title = document.createElement('b');
      title.textContent = SUBJECT_LABELS[item.subject];
      const value = document.createElement('strong');
      value.textContent = `${item.mastery}%`;
      const detail = document.createElement('small');
      detail.textContent = `正确率 ${item.accuracy}% · ${item.attempts} 次记录`;
      const bar = document.createElement('div');
      bar.className = 'ai-mastery-bar';
      const fill = document.createElement('span');
      fill.style.width = `${item.mastery}%`;
      bar.appendChild(fill);
      node.append(title, value, detail, bar);
      subjectGrid.appendChild(node);
    });
    root.appendChild(subjectGrid);

    const columns = document.createElement('div');
    columns.className = 'ai-dashboard-columns';
    const planCard = document.createElement('section');
    planCard.className = 'ai-dashboard-card';
    const planTitle = document.createElement('h3');
    planTitle.textContent = '今日计划 / 今日の計画';
    planCard.appendChild(planTitle);
    data.todayPlan.forEach((item) => {
      const row = document.createElement('div');
      row.className = `ai-plan-row${item.completed_at ? ' done' : ''}`;
      const text = document.createElement('span');
      text.textContent = `${item.title_zh} / ${item.title_ja}`;
      const button = document.createElement('button');
      button.className = 'ai-secondary-btn';
      button.textContent = item.completed_at ? '已完成' : '完成';
      button.disabled = Boolean(item.completed_at);
      button.addEventListener('click', () => completePlan(item.id));
      row.append(text, button);
      planCard.appendChild(row);
    });

    const weakCard = document.createElement('section');
    weakCard.className = 'ai-dashboard-card';
    const weakTitle = document.createElement('h3');
    weakTitle.textContent = '薄弱知识点 / 弱点';
    weakCard.appendChild(weakTitle);
    if (!data.weakTopics.length) {
      const empty = document.createElement('p');
      empty.textContent = '完成更多练习后，这里会显示薄弱知识点。';
      weakCard.appendChild(empty);
    }
    data.weakTopics.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'ai-weak-row';
      const text = document.createElement('span');
      text.textContent = `${SUBJECT_LABELS[item.subject]} · ${item.topic}`;
      const count = document.createElement('b');
      count.textContent = `${item.failures} 次错误`;
      row.append(text, count);
      weakCard.appendChild(row);
    });
    columns.append(planCard, weakCard);
    root.appendChild(columns);
  }

  function createTrendChart(points) {
    const wrapper = document.createElement('div');
    if (!points || !points.length) {
      wrapper.className = 'ai-empty-inline';
      wrapper.textContent = '完成练习后，这里会显示最近 14 天的成绩趋势。';
      return wrapper;
    }
    const width = 720;
    const height = 130;
    const padding = 12;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;
    const normalized = points.map((point, index) => ({
      x: padding + (points.length === 1 ? usableWidth / 2 : index * usableWidth / (points.length - 1)),
      y: padding + usableHeight - Math.max(0, Math.min(100, Number(point.score || 0))) * usableHeight / 100
    }));
    const line = normalized.map((point) => `${point.x},${point.y}`).join(' ');
    const area = `${padding},${height - padding} ${line} ${width - padding},${height - padding}`;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('class', 'ai-trend-chart');
    [25, 50, 75, 100].forEach((value) => {
      const grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const y = padding + usableHeight - value * usableHeight / 100;
      grid.setAttribute('x1', padding);
      grid.setAttribute('x2', width - padding);
      grid.setAttribute('y1', y);
      grid.setAttribute('y2', y);
      grid.setAttribute('class', 'ai-trend-grid');
      svg.appendChild(grid);
    });
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', area);
    polygon.setAttribute('class', 'ai-trend-area');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', line);
    polyline.setAttribute('class', 'ai-trend-line');
    svg.append(polygon, polyline);
    normalized.forEach((point) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', point.x);
      dot.setAttribute('cy', point.y);
      dot.setAttribute('r', 3.5);
      dot.setAttribute('class', 'ai-trend-dot');
      svg.appendChild(dot);
    });
    const labels = document.createElement('div');
    labels.className = 'ai-trend-labels';
    labels.innerHTML = `<span>${points[0].day}</span><span>${points[points.length - 1].day}</span>`;
    wrapper.append(svg, labels);
    return wrapper;
  }

  function renderDashboardV2(data) {
    const root = $('ai-dashboard-body');
    root.textContent = '';

    const hero = document.createElement('div');
    hero.className = 'ai-dashboard-hero';
    const overview = document.createElement('section');
    overview.className = 'ai-mastery-overview';
    const ring = document.createElement('div');
    ring.className = 'ai-mastery-ring';
    ring.style.setProperty('--value', data.overallMastery);
    const mastery = document.createElement('strong');
    mastery.textContent = `${data.overallMastery}%`;
    ring.appendChild(mastery);
    const overviewLabel = document.createElement('span');
    overviewLabel.textContent = '五科综合掌握度';
    overview.append(ring, overviewLabel);

    const pending = data.todayPlan.filter((item) => !item.completed_at).length;
    const attempts = data.subjects.reduce((sum, item) => sum + Number(item.attempts || 0), 0);
    const averageAccuracy = data.subjects.length
      ? Math.round(data.subjects.reduce((sum, item) => sum + Number(item.accuracy || 0), 0) / data.subjects.length)
      : 0;
    const summary = document.createElement('div');
    summary.className = 'ai-dashboard-summary';
    summary.append(
      card('连续学习', `${data.streakDays} 天`),
      card('今日待办', `${pending} 项`),
      card('累计有效练习', `${attempts} 次`),
      card('五科平均正确率', `${averageAccuracy}%`)
    );
    hero.append(overview, summary);
    root.appendChild(hero);

    const subjectGrid = document.createElement('div');
    subjectGrid.className = 'ai-subject-grid';
    data.subjects.forEach((item) => {
      const node = document.createElement('article');
      node.className = 'ai-subject-card';
      const head = document.createElement('div');
      head.className = 'ai-subject-head';
      const title = document.createElement('b');
      title.textContent = SUBJECT_LABELS[item.subject];
      const value = document.createElement('strong');
      value.textContent = `${item.mastery}%`;
      head.append(title, value);
      const detail = document.createElement('small');
      detail.textContent = `正确率 ${item.accuracy}% · ${item.attempts} 次练习`;
      const bar = document.createElement('div');
      bar.className = 'ai-mastery-bar';
      const fill = document.createElement('span');
      fill.style.width = `${item.mastery}%`;
      bar.appendChild(fill);
      node.append(head, detail, bar);
      subjectGrid.appendChild(node);
    });
    root.appendChild(subjectGrid);

    const columns = document.createElement('div');
    columns.className = 'ai-dashboard-columns';
    const planCard = document.createElement('section');
    planCard.className = 'ai-dashboard-card';
    const planTitle = document.createElement('h3');
    planTitle.textContent = '今日学习计划';
    planCard.appendChild(planTitle);
    data.todayPlan.forEach((item) => {
      const row = document.createElement('div');
      row.className = `ai-plan-row${item.completed_at ? ' done' : ''}`;
      const copy = document.createElement('div');
      copy.className = 'ai-plan-copy';
      const icon = document.createElement('span');
      icon.className = 'ai-plan-icon';
      icon.innerHTML = `<i class="fa-solid ${item.task_type === 'review_errors' ? 'fa-rotate-left' : 'fa-bullseye'}"></i>`;
      const text = document.createElement('span');
      text.textContent = `${item.title_zh} / ${item.title_ja}`;
      copy.append(icon, text);
      const button = document.createElement('button');
      button.className = 'ai-secondary-btn';
      button.textContent = item.completed_at ? '已完成' : '完成';
      button.disabled = Boolean(item.completed_at);
      button.addEventListener('click', () => completePlan(item.id));
      row.append(copy, button);
      planCard.appendChild(row);
    });

    const weakCard = document.createElement('section');
    weakCard.className = 'ai-dashboard-card';
    const weakTitle = document.createElement('h3');
    weakTitle.textContent = '优先复习';
    weakCard.appendChild(weakTitle);
    if (!data.weakTopics.length) {
      const empty = document.createElement('div');
      empty.className = 'ai-empty-inline';
      empty.textContent = '暂无薄弱点。继续完成课程和测验后会自动分析。';
      weakCard.appendChild(empty);
    }
    data.weakTopics.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'ai-weak-row';
      const text = document.createElement('span');
      text.textContent = `${SUBJECT_LABELS[item.subject]} · ${item.topic}`;
      const count = document.createElement('b');
      count.textContent = `${item.failures} 次错误`;
      row.append(text, count);
      weakCard.appendChild(row);
    });
    columns.append(planCard, weakCard);
    root.appendChild(columns);

    const trendCard = document.createElement('section');
    trendCard.className = 'ai-dashboard-card ai-trend-card';
    const trendTitle = document.createElement('h3');
    trendTitle.textContent = '近 14 天成绩趋势';
    trendCard.append(trendTitle, createTrendChart(data.trend));
    root.appendChild(trendCard);
    scheduleI18n(root);
  }

  async function completePlan(id) {
    try {
      await api('/api/learning/plan/complete', {
        method: 'POST',
        body: JSON.stringify({ id })
      });
      await openDashboard();
    } catch (error) {
      toast(friendlyError(error), 'error');
    }
  }

  function suggestedDifficulty(subject) {
    const key = `study-ai-recent-${subject}`;
    let recent = [];
    try {
      recent = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (_) {}
    recent = recent.slice(-3);
    if (recent.length >= 2 && recent.slice(-2).every(Boolean)) return 3;
    if (recent.length >= 2 && recent.slice(-2).every((value) => !value)) return 1;
    return 2;
  }

  function sourceContext(subject) {
    const lesson = lessonForSubject(subject) || {};
    return {
      titleZh: lesson.titleZh || '',
      titleJa: lesson.titleJa || '',
      conceptZh: String(lesson.conceptZh || '').replace(/<[^>]+>/g, ' ').slice(0, 6000),
      conceptJa: String(lesson.conceptJa || '').replace(/<[^>]+>/g, ' ').slice(0, 6000),
      example: lesson.example || lesson.codeExample || ''
    };
  }

  function openGenerator() {
    if (isExamActive()) {
      toast('正式模拟考试期间不能生成 AI 题目。', 'error');
      return;
    }
    const subject = SUBJECT_LABELS[currentSubject] ? currentSubject : 'sql';
    $('ai-generate-subject').value = subject;
    $('ai-generate-topic').value = (lessonForSubject(subject) || {}).titleZh || '综合复习';
    $('ai-generate-difficulty').value = String(suggestedDifficulty(subject));
    $('ai-generated-result').textContent = '';
    $('ai-generator-modal').classList.add('open');
    closeLauncher();
    scheduleI18n($('ai-generator-modal'));
  }

  async function generateQuestion() {
    const button = $('ai-generate-submit');
    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 生成与校验中';
    $('ai-generated-result').innerHTML = '<div class="ai-generation-state"><i class="fa-solid fa-wand-magic-sparkles"></i>正在生成题目，并进行结构审核与执行校验。通常需要 20–90 秒。</div>';
    scheduleI18n($('ai-generator-modal'));
    try {
      const config = settings();
      const subject = $('ai-generate-subject').value;
      const data = await api('/api/ai/questions/generate', {
        method: 'POST',
        body: JSON.stringify({
          ...config,
          subject,
          topic: $('ai-generate-topic').value.trim(),
          difficulty: Number($('ai-generate-difficulty').value),
          sourceContext: sourceContext(subject)
        })
      });
      state.generatedQuestion = { subject, ...data };
      renderGeneratedQuestion();
    } catch (error) {
      $('ai-generated-result').innerHTML = '';
      const failure = document.createElement('div');
      failure.className = 'ai-generation-state';
      failure.textContent = friendlyError(error);
      $('ai-generated-result').appendChild(failure);
      scheduleI18n($('ai-generated-result'));
    } finally {
      button.disabled = false;
      button.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> 生成并自动校验';
      scheduleI18n($('ai-generator-modal'));
    }
  }

  function renderGeneratedQuestion() {
    const root = $('ai-generated-result');
    root.textContent = '';
    const payload = state.generatedQuestion;
    if (!payload) return;
    const q = payload.question;
    const cardNode = document.createElement('div');
    cardNode.className = 'ai-generated-card';
    const meta = document.createElement('div');
    meta.className = 'ai-generated-meta';
    meta.innerHTML = `<span>${SUBJECT_LABELS[payload.subject]}</span><span>难度 ${$('ai-generate-difficulty').value}</span><span>AI 临时题库</span><span>${payload.provider} · ${payload.model}</span>`;
    const title = document.createElement('h3');
    title.textContent = `${q.titleZh} / ${q.titleJa}`;
    cardNode.append(meta, title);
    if (q.type === 'choice') {
      const question = document.createElement('p');
      question.textContent = `${q.questionZh}\n${q.questionJa}`;
      question.style.whiteSpace = 'pre-wrap';
      cardNode.appendChild(question);
      const options = document.createElement('div');
      options.className = 'ai-question-options';
      q.optionsZh.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'ai-secondary-btn ai-question-option';
        button.textContent = `${String.fromCharCode(65 + index)}. ${option} / ${q.optionsJa[index]}`;
        button.addEventListener('click', () => gradeChoice(index));
        options.appendChild(button);
      });
      cardNode.appendChild(options);
    } else {
      const task = document.createElement('p');
      task.textContent = `${q.taskZh}\n${q.taskJa}`;
      task.style.whiteSpace = 'pre-wrap';
      const code = document.createElement('pre');
      code.className = 'ai-code-preview';
      code.textContent = q.templateCode || '-- 请在这里输入答案';
      const load = document.createElement('button');
      load.className = 'ai-primary-btn';
      load.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> 载入当前沙盒';
      load.addEventListener('click', loadGeneratedIntoSandbox);
      cardNode.append(task, code, load);
    }
    const validation = document.createElement('p');
    validation.className = 'ai-provider-status';
    validation.textContent = '已通过结构校验、第二轮 AI 审核及本地执行验证。';
    cardNode.appendChild(validation);
    root.appendChild(cardNode);
    scheduleI18n(root);
  }

  function gradeChoice(index) {
    const payload = state.generatedQuestion;
    if (!payload) return;
    const q = payload.question;
    document.querySelectorAll('.ai-question-option').forEach((button, idx) => {
      button.disabled = true;
      if (idx === q.answer) button.classList.add('correct');
      else if (idx === index) button.classList.add('incorrect');
    });
    const success = index === q.answer;
    const result = document.createElement('div');
    result.className = `ai-message ${success ? 'assistant' : 'error'}`;
    result.textContent = `${success ? '回答正确' : '回答错误'}\n${q.explanationZh}\n${q.explanationJa}`;
    $('ai-generated-result').appendChild(result);
    scheduleI18n($('ai-generated-result'));
    rememberAdaptiveResult(payload.subject, success);
    track({
      subject: payload.subject,
      eventType: 'ai_question_answer',
      itemId: q.id,
      topic: $('ai-generate-topic').value,
      success,
      score: success ? 100 : 0,
      source: 'ai_generated'
    });
  }

  function rememberAdaptiveResult(subject, success) {
    const key = `study-ai-recent-${subject}`;
    let recent = [];
    try {
      recent = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (_) {}
    recent.push(Boolean(success));
    localStorage.setItem(key, JSON.stringify(recent.slice(-10)));
  }

  function loadGeneratedIntoSandbox() {
    const payload = state.generatedQuestion;
    if (!payload) return;
    const q = payload.question;
    const ids = { sql: 'sql-editor', java: 'java-editor', python: 'python-editor' };
    const editor = $(ids[payload.subject]);
    if (!editor) {
      toast('请先切换到对应的编程科目，再载入题目。', 'error');
      return;
    }
    editor.value = q.templateCode || '';
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    state.generatedActive = true;
    $('ai-generator-modal').classList.remove('open');
    toast('题目模板已载入沙盒，运行代码后会自动评分。', 'success');
    track({
      subject: payload.subject,
      eventType: 'ai_question_loaded',
      itemId: q.id,
      topic: $('ai-generate-topic').value,
      source: 'ai_generated'
    });
  }

  function normalizeOutput(value) {
    return String(value == null ? '' : value).replace(/\r\n/g, '\n').trim();
  }

  function gradeGeneratedExecution(subject, result) {
    const payload = state.generatedQuestion;
    if (!state.generatedActive || !payload || payload.subject !== subject) return null;
    const q = payload.question;
    let success = false;
    if (subject === 'sql') {
      if (!result || !result.success) return false;
      try {
        const expected = sqlEngine.execute(q.solutionQuery);
        success = typeof compareSqlResults === 'function'
          ? compareSqlResults(result, expected)
          : JSON.stringify(result.rows || []) === JSON.stringify(expected.rows || []);
      } catch (_) {
        success = false;
      }
    } else {
      if (!result || result.compileError || result.runtimeError) {
        success = false;
      } else {
        success = normalizeOutput(result.output) === normalizeOutput(q.expectedOutput);
      }
    }
    state.generatedActive = false;
    rememberAdaptiveResult(subject, success);
    track({
      subject,
      eventType: 'ai_question_answer',
      itemId: q.id,
      topic: q.titleZh || q.titleJa,
      success,
      score: success ? 100 : 0,
      durationMs: result && result.executionTimeMs,
      source: 'ai_generated'
    });
    if (typeof showToast === 'function') {
      showToast(
        success
          ? 'AI 练习题判定通过 / AI問題に正解しました'
          : 'AI 练习题尚未通过，请继续修改 / もう一度修正してください',
        success ? 'success' : 'error'
      );
    }
    return success;
  }

  function closeModal(id) {
    $(id).classList.remove('open');
  }

  function closeLauncher() {
    const popover = $('ai-launcher-popover');
    const button = $('ai-assistant-btn');
    if (popover) popover.classList.remove('open');
    if (button) button.setAttribute('aria-expanded', 'false');
  }

  function toggleLauncher() {
    const popover = $('ai-launcher-popover');
    const button = $('ai-assistant-btn');
    const open = !popover.classList.contains('open');
    popover.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    if (open) updateProviderIndicators();
    scheduleI18n(popover);
  }

  function updateModelPlaceholder() {
    const provider = $('ai-setting-provider').value;
    const defaults = {
      gemini: 'gemini-2.5-flash',
      openai: 'gpt-5-mini',
      ollama: '留空时自动选择首个本地模型'
    };
    $('ai-setting-model').placeholder = defaults[provider];
    $('ai-setting-key').disabled = provider === 'ollama';
    $('ai-setting-ollama').disabled = provider !== 'ollama';
  }

  function createUiV2() {
    const header = document.querySelector('.app-header');
    const reset = document.querySelector('.reset-all-btn');
    const menu = document.createElement('div');
    menu.className = 'ai-header-menu';
    menu.innerHTML = `
      <button type="button" class="ai-header-btn" id="ai-assistant-btn" aria-expanded="false" aria-controls="ai-launcher-popover" title="打开 AI 学习中心">
        <span class="ai-launcher-status" id="ai-launcher-status"></span>
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span class="ai-header-label">AI 学习</span>
      </button>
      <div class="ai-launcher-popover" id="ai-launcher-popover" role="menu">
        <div class="ai-launcher-head">
          <div><strong>AI 学习中心</strong><small id="ai-launcher-state">正在检测服务状态...</small></div>
          <button type="button" class="ai-launcher-settings" id="ai-launcher-settings" aria-label="AI 设置"><i class="fa-solid fa-gear"></i></button>
        </div>
        <div class="ai-launcher-grid">
          <button type="button" class="ai-launcher-item" id="ai-open-tutor">
            <i class="fa-solid fa-robot"></i><span><strong>AI 导师</strong><small>结合当前课程与代码答疑</small></span>
          </button>
          <button type="button" class="ai-launcher-item" id="ai-dashboard-btn">
            <i class="fa-solid fa-chart-line"></i><span><strong>学习教练</strong><small>掌握度、趋势与今日计划</small></span>
          </button>
          <button type="button" class="ai-launcher-item" id="ai-generator-btn">
            <i class="fa-solid fa-bullseye"></i><span><strong>自适应出题</strong><small>按当前知识点生成练习</small></span>
          </button>
          <button type="button" class="ai-launcher-item" id="ai-settings-btn">
            <i class="fa-solid fa-sliders"></i><span><strong>Provider 设置</strong><small>模型、密钥与 Ollama</small></span>
          </button>
        </div>
      </div>`;
    header.insertBefore(menu, reset);

    document.body.insertAdjacentHTML('beforeend', `
      <div class="ai-drawer-scrim" id="ai-drawer-scrim"></div>
      <aside class="ai-assistant-drawer" id="ai-assistant-drawer" aria-label="AI 编程导师" aria-hidden="true">
        <div class="ai-drawer-header">
          <div class="ai-drawer-title">
            <span class="ai-drawer-title-icon"><i class="fa-solid fa-robot"></i></span>
            <div><h2>AI 学习导师</h2><small>当前课程上下文 · 中日双语</small></div>
          </div>
          <button type="button" class="ai-icon-btn" id="ai-drawer-close" aria-label="关闭 AI 导师"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="ai-context-card">
          <div class="ai-context-main"><small id="ai-context-subject">当前学习上下文</small><strong id="ai-context-topic">正在读取课程...</strong></div>
          <button type="button" class="ai-provider-chip" id="ai-current-provider" title="打开 AI 设置">未配置</button>
        </div>
        <div class="ai-exam-lock" id="ai-exam-lock"><i class="fa-solid fa-lock"></i> 正式模拟考试进行中，AI 已暂时禁用。提交试卷后可继续查看错题讲解。</div>
        <div class="ai-action-area">
          <div class="ai-section-label">快捷辅导</div>
          <div class="ai-quick-actions">
            <button type="button" class="ai-action-btn" data-action="debug"><i class="fa-solid fa-bug"></i><span>分析错误</span></button>
            <button type="button" class="ai-action-btn" data-action="explain"><i class="fa-solid fa-book-open"></i><span>解释代码</span></button>
            <button type="button" class="ai-action-btn" data-action="trace"><i class="fa-solid fa-list-ol"></i><span>逐步执行</span></button>
            <button type="button" class="ai-action-btn" data-action="review"><i class="fa-solid fa-rotate-left"></i><span>错题讲解</span></button>
          </div>
          <div class="ai-hint-rail">
            <span class="ai-hint-label">渐进提示</span>
            <button type="button" class="ai-action-btn ai-hint-btn" data-hint="1" data-step="1">只给思路</button>
            <button type="button" class="ai-action-btn ai-hint-btn" data-hint="2" data-step="2">给出结构</button>
            <button type="button" class="ai-action-btn ai-hint-btn" data-hint="3" data-step="3">参考代码</button>
          </div>
        </div>
        <div class="ai-chat-log" id="ai-chat-log" aria-live="polite"></div>
        <div class="ai-chat-compose">
          <div class="ai-compose-box">
            <textarea id="ai-chat-input" rows="2" placeholder="询问当前课程、代码或运行错误..."></textarea>
            <div class="ai-compose-footer">
              <small>Ctrl + Enter 发送 · 最近 8 轮上下文</small>
              <button type="button" class="ai-primary-btn ai-send-btn" id="ai-send-btn"><i class="fa-solid fa-paper-plane"></i> <span id="ai-send-label">发送</span></button>
            </div>
          </div>
        </div>
      </aside>

      <div class="ai-modal-backdrop" id="ai-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="ai-dashboard-title">
        <div class="ai-modal">
          <div class="ai-modal-head">
            <div><h2 class="ai-modal-title" id="ai-dashboard-title">学习教练</h2><div class="ai-modal-subtitle">本地规则计算，断网时仍然可用</div></div>
            <button type="button" class="ai-icon-btn" data-close="ai-dashboard-modal" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="ai-modal-body" id="ai-dashboard-body"></div>
        </div>
      </div>

      <div class="ai-modal-backdrop" id="ai-settings-modal" role="dialog" aria-modal="true" aria-labelledby="ai-settings-title">
        <div class="ai-modal small">
          <div class="ai-modal-head">
            <div><h2 class="ai-modal-title" id="ai-settings-title">AI Provider 设置</h2><div class="ai-modal-subtitle">密钥只保留在当前浏览器会话，不写入本地数据库</div></div>
            <button type="button" class="ai-icon-btn" data-close="ai-settings-modal" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="ai-modal-body">
            <form id="ai-settings-form">
            <div class="ai-field-row">
              <div class="ai-field"><label>Provider</label><select id="ai-setting-provider"><option value="gemini">Gemini</option><option value="openai">OpenAI</option><option value="ollama">Ollama</option></select></div>
              <div class="ai-field"><label>模型 <small>留空使用默认值</small></label><input id="ai-setting-model" autocomplete="off"></div>
            </div>
            <div class="ai-field"><label>API Key <small>仅存 sessionStorage</small></label><input id="ai-setting-key" type="password" autocomplete="off" placeholder="环境变量已配置时可留空"></div>
            <div class="ai-field"><label>Ollama 地址 <small>仅 Ollama 使用</small></label><input id="ai-setting-ollama" placeholder="http://127.0.0.1:11434"></div>
            <div id="ai-provider-status"></div>
            <div class="ai-form-actions"><button type="button" class="ai-secondary-btn" data-close="ai-settings-modal">取消</button><button type="button" class="ai-primary-btn" id="ai-settings-save">保存设置</button></div>
            </form>
          </div>
        </div>
      </div>

      <div class="ai-modal-backdrop" id="ai-generator-modal" role="dialog" aria-modal="true" aria-labelledby="ai-generator-title">
        <div class="ai-modal generator">
          <div class="ai-modal-head">
            <div><h2 class="ai-modal-title" id="ai-generator-title">AI 自适应出题</h2><div class="ai-modal-subtitle">AI 练习与官方真题成绩分开统计</div></div>
            <button type="button" class="ai-icon-btn" data-close="ai-generator-modal" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="ai-modal-body">
            <div class="ai-generator-intro"><strong>自动质量检查：</strong>题目会经过结构校验和第二轮 AI 审核；SQL、Java、Python 标准答案还会在本机实际运行。</div>
            <div class="ai-field-row">
              <div class="ai-field"><label>科目</label><select id="ai-generate-subject"><option value="sql">SQL</option><option value="java">Java</option><option value="python">Python</option><option value="itpass">IT Passport</option><option value="sg">SG</option></select></div>
              <div class="ai-field"><label>难度 <small>根据近期表现自动推荐</small></label><select id="ai-generate-difficulty"><option value="1">1 · 基础</option><option value="2">2 · 标准</option><option value="3">3 · 挑战</option></select></div>
            </div>
            <div class="ai-field"><label>知识点</label><input id="ai-generate-topic" placeholder="例如：JOIN、Java 集合、信息安全"></div>
            <button type="button" class="ai-primary-btn" id="ai-generate-submit"><i class="fa-solid fa-wand-magic-sparkles"></i> 生成并自动校验</button>
            <div id="ai-generated-result"></div>
          </div>
        </div>
      </div>
      <div class="ai-toast-region" id="ai-toast-region" aria-live="polite"></div>
    `);

    $('ai-assistant-btn').addEventListener('click', (event) => {
      event.stopPropagation();
      toggleLauncher();
    });
    $('ai-launcher-popover').addEventListener('click', (event) => event.stopPropagation());
    $('ai-open-tutor').addEventListener('click', () => openAssistant());
    $('ai-dashboard-btn').addEventListener('click', openDashboard);
    $('ai-generator-btn').addEventListener('click', openGenerator);
    $('ai-settings-btn').addEventListener('click', openSettings);
    $('ai-launcher-settings').addEventListener('click', openSettings);
    $('ai-current-provider').addEventListener('click', openSettings);
    $('ai-drawer-close').addEventListener('click', closeAssistant);
    $('ai-drawer-scrim').addEventListener('click', closeAssistant);
    $('ai-send-btn').addEventListener('click', () => ask('chat'));
    $('ai-chat-input').addEventListener('input', (event) => {
      event.target.style.height = 'auto';
      event.target.style.height = `${Math.min(event.target.scrollHeight, 150)}px`;
    });
    $('ai-chat-input').addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') ask('chat');
    });
    document.querySelectorAll('.ai-action-btn[data-action]').forEach((button) => {
      button.addEventListener('click', () => ask(button.dataset.action));
    });
    document.querySelectorAll('.ai-action-btn[data-hint]').forEach((button) => {
      button.addEventListener('click', () => ask('hint', Number(button.dataset.hint)));
    });
    document.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', () => closeModal(button.dataset.close));
    });
    document.querySelectorAll('.ai-modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) backdrop.classList.remove('open');
      });
    });
    $('ai-setting-provider').addEventListener('change', updateModelPlaceholder);
    $('ai-settings-form').addEventListener('submit', (event) => {
      event.preventDefault();
      saveSettings();
    });
    $('ai-settings-save').addEventListener('click', saveSettings);
    $('ai-generate-submit').addEventListener('click', generateQuestion);
    $('ai-generate-subject').addEventListener('change', () => {
      const subject = $('ai-generate-subject').value;
      $('ai-generate-difficulty').value = String(suggestedDifficulty(subject));
      $('ai-generate-topic').value = (lessonForSubject(subject) || {}).titleZh || '';
    });
    document.addEventListener('click', closeLauncher);
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeLauncher();
      closeAssistant();
      document.querySelectorAll('.ai-modal-backdrop.open').forEach((modal) => modal.classList.remove('open'));
    });
    updateModelPlaceholder();
    renderMessages();
    scheduleI18n(menu);
    scheduleI18n($('ai-assistant-drawer'));
  }

  function createUi() {
    const header = document.querySelector('.app-header');
    const reset = document.querySelector('.reset-all-btn');
    const buttons = [
      ['ai-dashboard-btn', 'fa-chart-line', '学习教练', openDashboard],
      ['ai-generator-btn', 'fa-wand-magic-sparkles', 'AI 出题', openGenerator],
      ['ai-assistant-btn', 'fa-robot', 'AI 导师', () => openAssistant()],
      ['ai-settings-btn', 'fa-gear', 'AI 设置', openSettings]
    ];
    buttons.forEach(([id, icon, label, handler]) => {
      const button = document.createElement('button');
      button.id = id;
      button.className = 'ai-header-btn';
      button.innerHTML = `<i class="fa-solid ${icon}"></i><span>${label}</span>`;
      button.addEventListener('click', handler);
      header.insertBefore(button, reset);
    });

    document.body.insertAdjacentHTML('beforeend', `
      <aside class="ai-assistant-drawer" id="ai-assistant-drawer" aria-label="AI 编程导师">
        <div class="ai-drawer-header">
          <h2><i class="fa-solid fa-robot"></i> AI 编程导师</h2>
          <button class="ai-icon-btn" id="ai-drawer-close" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="ai-exam-lock" id="ai-exam-lock">正式模拟考试进行中，AI 暂时禁用。<br>模擬試験中はAIを利用できません。</div>
        <div class="ai-panel-section ai-quick-actions">
          <button class="ai-action-btn" data-action="debug"><i class="fa-solid fa-bug"></i> 分析错误</button>
          <button class="ai-action-btn" data-action="explain"><i class="fa-solid fa-book-open"></i> 解释代码</button>
          <button class="ai-action-btn" data-action="trace"><i class="fa-solid fa-list-ol"></i> 逐步执行</button>
          <button class="ai-action-btn" data-action="review"><i class="fa-solid fa-rotate"></i> 错题讲解</button>
          <button class="ai-action-btn" data-hint="1">提示 1</button>
          <button class="ai-action-btn" data-hint="2">提示 2</button>
          <button class="ai-action-btn" data-hint="3">提示 3</button>
        </div>
        <div class="ai-chat-log" id="ai-chat-log"></div>
        <div class="ai-chat-compose">
          <textarea id="ai-chat-input" placeholder="输入问题... / 質問を入力..."></textarea>
          <button class="ai-primary-btn" id="ai-send-btn">发送</button>
        </div>
      </aside>

      <div class="ai-modal-backdrop" id="ai-dashboard-modal">
        <div class="ai-modal">
          <div class="ai-modal-head"><h2 class="ai-modal-title">个性化学习教练 / 学習コーチ</h2><button class="ai-icon-btn" data-close="ai-dashboard-modal"><i class="fa-solid fa-xmark"></i></button></div>
          <div class="ai-modal-body" id="ai-dashboard-body"></div>
        </div>
      </div>

      <div class="ai-modal-backdrop" id="ai-settings-modal">
        <div class="ai-modal small">
          <div class="ai-modal-head"><h2 class="ai-modal-title">AI 设置</h2><button class="ai-icon-btn" data-close="ai-settings-modal"><i class="fa-solid fa-xmark"></i></button></div>
          <div class="ai-modal-body">
            <div class="ai-field"><label>Provider</label><select id="ai-setting-provider"><option value="gemini">Gemini</option><option value="openai">OpenAI</option><option value="ollama">Ollama</option></select></div>
            <div class="ai-field"><label>模型名称（留空使用默认值）</label><input id="ai-setting-model" placeholder="gemini-2.5-flash / gpt-5-mini / local model"></div>
            <div class="ai-field"><label>API Key（仅保存在当前会话）</label><input id="ai-setting-key" type="password" autocomplete="off"></div>
            <div class="ai-field"><label>Ollama 地址</label><input id="ai-setting-ollama"></div>
            <div class="ai-provider-status" id="ai-provider-status"></div>
            <div class="ai-form-actions"><button class="ai-secondary-btn" data-close="ai-settings-modal">取消</button><button class="ai-primary-btn" id="ai-settings-save">保存</button></div>
          </div>
        </div>
      </div>

      <div class="ai-modal-backdrop" id="ai-generator-modal">
        <div class="ai-modal">
          <div class="ai-modal-head"><h2 class="ai-modal-title">AI 自适应出题 / AI適応問題</h2><button class="ai-icon-btn" data-close="ai-generator-modal"><i class="fa-solid fa-xmark"></i></button></div>
          <div class="ai-modal-body">
            <div class="ai-field"><label>科目</label><select id="ai-generate-subject"><option value="sql">SQL</option><option value="java">Java</option><option value="python">Python</option><option value="itpass">IT Passport</option><option value="sg">SG</option></select></div>
            <div class="ai-field"><label>知识点</label><input id="ai-generate-topic"></div>
            <div class="ai-field"><label>难度</label><select id="ai-generate-difficulty"><option value="1">1 - 基础</option><option value="2">2 - 标准</option><option value="3">3 - 挑战</option></select></div>
            <button class="ai-primary-btn" id="ai-generate-submit">生成并自动校验</button>
            <div id="ai-generated-result" style="margin-top:14px;"></div>
          </div>
        </div>
      </div>
    `);

    $('ai-drawer-close').addEventListener('click', closeAssistant);
    $('ai-send-btn').addEventListener('click', () => ask('chat'));
    $('ai-chat-input').addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') ask('chat');
    });
    document.querySelectorAll('.ai-action-btn[data-action]').forEach((button) => {
      button.addEventListener('click', () => ask(button.dataset.action));
    });
    document.querySelectorAll('.ai-action-btn[data-hint]').forEach((button) => {
      button.addEventListener('click', () => ask('hint', Number(button.dataset.hint)));
    });
    document.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', () => closeModal(button.dataset.close));
    });
    $('ai-settings-save').addEventListener('click', saveSettings);
    $('ai-generate-submit').addEventListener('click', generateQuestion);
    renderMessages();
  }

  function installContextWrappers() {
    ['switchSubject', 'selectLesson', 'selectJavaLesson', 'selectPythonLesson', 'selectItPassLesson', 'selectSgLesson']
      .forEach((name) => {
        const original = window[name];
        if (typeof original !== 'function') return;
        window[name] = function wrappedContextChange(...args) {
          const result = original.apply(this, args);
          setTimeout(syncContext, 0);
          return result;
        };
      });

    const originalQuiz = window.checkQuizAnswer;
    if (typeof originalQuiz === 'function') {
      window.checkQuizAnswer = function wrappedQuizAnswer(...args) {
        const context = getContext();
        let selected = null;
        let expected = null;
        if (context.subject === 'sql') {
          const lesson = lessonForSubject('sql');
          selected = selectedQuizOption;
          expected = lesson && lesson.quiz ? lesson.quiz.answerIdx : null;
        } else if (context.subject === 'java') {
          const lesson = lessonForSubject('java');
          selected = selectedJavaQuizOption;
          expected = lesson && lesson.quizList && lesson.quizList[javaQuizIdx]
            ? lesson.quizList[javaQuizIdx].answerIdx : null;
        } else if (context.subject === 'sg') {
          const lesson = lessonForSubject('sg');
          selected = selectedSgQuizOption;
          expected = lesson && lesson.quizList && lesson.quizList[sgQuizIdx]
            ? lesson.quizList[sgQuizIdx].answerIdx : null;
        } else if (context.subject === 'itpass') {
          const lesson = lessonForSubject('itpass');
          selected = selectedItPassQuizOption;
          expected = lesson && lesson.quizList && lesson.quizList[itpassQuizIdx]
            ? lesson.quizList[itpassQuizIdx].answerIdx : null;
        }
        const result = originalQuiz.apply(this, args);
        if (context.subject !== 'python' && selected != null && expected != null) {
          track({
            subject: context.subject,
            eventType: 'quiz_answer',
            itemId: context.itemId,
            topic: context.topic,
            success: selected === expected,
            score: selected === expected ? 100 : 0
          });
        }
        return result;
      };
    }

    [
      ['markLessonComplete', 'sql'],
      ['markItPassLessonComplete', 'itpass'],
      ['markSgLessonComplete', 'sg']
    ].forEach(([name, subject]) => {
      const original = window[name];
      if (typeof original !== 'function') return;
      window[name] = function wrappedLessonComplete(id, ...args) {
        const result = original.call(this, id, ...args);
        const lesson = lessonForSubject(subject);
        track({
          subject,
          eventType: 'lesson_complete',
          itemId: id,
          topic: lesson ? (lesson.titleZh || lesson.titleJa) : `${SUBJECT_LABELS[subject]} ${id}`,
          success: true,
          score: 100
        });
        return result;
      };
    });
  }

  function init() {
    createUiV2();
    installContextWrappers();
    importLegacyProgress();
    loadProviders();
    syncContext();
    setInterval(updateExamLock, 1000);
    window.triggerAiDebug = function triggerAiDebug() {
      openAssistant('debug');
    };
    window.loadTraceSteps = function loadTraceSteps() {
      // Execution tracing is requested explicitly from the unified assistant.
    };
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    track,
    ask,
    openAssistant,
    openDashboard,
    openGenerator,
    syncContext,
    isExamActive,
    gradeGeneratedExecution
  };
})();
