// === Main App Logic ===
(function() {
  'use strict';

  // ---- 全域狀態 ----
  const state = {
    currentPage: 'home',
    currentKanaTab: 'hira-basic',
    vocabLevel: 'N5',
    grammarLevel: 'N5',
    showRomaji: true,
    theme: 'light',
    quiz: null
  };

  // ---- 主題 ----
  const THEME_KEY = 'jp-learn-theme';
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
  }
  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  // ============================================================
  // ====           進度／SRS／錯題本／收藏資料層             ====
  // ============================================================
  const PROGRESS_KEY = 'jp-learn-progress';
  const SRS_INTERVALS = [
    0,                          // 0：剛剛答錯，立即複習
    1 * 24 * 60 * 60 * 1000,    // 1：1 天
    3 * 24 * 60 * 60 * 1000,    // 2：3 天
    7 * 24 * 60 * 60 * 1000,    // 3：7 天
    14 * 24 * 60 * 60 * 1000,   // 4：14 天
    30 * 24 * 60 * 60 * 1000    // 5：30 天（已熟）
  ];
  const MAX_MISTAKES = 100;
  const DAILY_GOAL = 20;  // 每日題數目標

  let progress = null;

  function defaultProgress() {
    return {
      srs: {},          // { itemKey: { level, due, lastSeen, correct, wrong } }
      mistakes: [],     // [ { key, at } ]
      favorites: [],    // [ key ]
      daily: {
        streak: 0,
        lastStudyDate: null,
        today: null     // { date, correct, total }
      }
    };
  }
  function loadProgress() {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        progress = Object.assign(defaultProgress(), parsed);
        progress.daily = Object.assign(defaultProgress().daily, progress.daily || {});
      } else {
        progress = defaultProgress();
      }
    } catch (e) {
      progress = defaultProgress();
    }
  }
  function saveProgress() {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); }
    catch (e) {}
  }
  function todayStr(d) {
    const dt = d || new Date();
    return dt.getFullYear() + '-' +
      String(dt.getMonth() + 1).padStart(2, '0') + '-' +
      String(dt.getDate()).padStart(2, '0');
  }
  function yesterdayStr() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return todayStr(d);
  }
  function ensureDailyState() {
    const today = todayStr();
    if (!progress.daily.today || progress.daily.today.date !== today) {
      progress.daily.today = { date: today, correct: 0, total: 0 };
    }
  }

  // ---- itemKey 編碼／查詢 ----
  function getItemKey(type, target) {
    if (type === 'hira-to-romaji' || type === 'romaji-to-hira' ||
        type === 'kata-to-romaji' || type === 'romaji-to-kata') {
      return 'k:' + target.kana;
    }
    if (type === 'vocab-jp-to-cn' || type === 'vocab-cn-to-jp') {
      return 'v:' + target.jp + '|' + target.cn;
    }
    if (type === 'grammar') {
      return 'g:' + target.pattern;
    }
    return null;
  }
  function lookupByKey(key) {
    if (!key) return null;
    const colonIdx = key.indexOf(':');
    if (colonIdx < 0) return null;
    const t = key.slice(0, colonIdx);
    const id = key.slice(colonIdx + 1);
    if (t === 'v') {
      const sep = id.indexOf('|');
      if (sep < 0) return null;
      const jp = id.slice(0, sep);
      const cn = id.slice(sep + 1);
      const item = VOCAB_DATA.find(v => v.jp === jp && v.cn === cn);
      return item ? { type: 'vocab', item } : null;
    }
    if (t === 'g') {
      const item = GRAMMAR_DATA.find(g => g.pattern === id);
      return item ? { type: 'grammar', item } : null;
    }
    if (t === 'k') {
      for (const groupName of Object.keys(KANA_DATA)) {
        for (const row of KANA_DATA[groupName].rows) {
          for (const cell of row) {
            if (cell && cell[0] === id) {
              return {
                type: 'kana',
                kanaType: groupName.startsWith('hira') ? 'hira' : 'kata',
                item: { kana: cell[0], romaji: cell[1] }
              };
            }
          }
        }
      }
    }
    return null;
  }

  // ---- 紀錄答題、更新 SRS、每日統計、錯題、連續天數 ----
  function recordAnswer(itemKey, isCorrect) {
    if (!itemKey) return;
    ensureDailyState();
    const now = Date.now();

    // SRS
    const entry = progress.srs[itemKey] || { level: 0, due: 0, lastSeen: 0, correct: 0, wrong: 0 };
    if (isCorrect) {
      entry.level = Math.min(5, entry.level + 1);
      entry.correct++;
    } else {
      entry.level = Math.max(0, entry.level - 1);
      entry.wrong++;
      // 加入錯題本（去重後置頂）
      progress.mistakes = progress.mistakes.filter(m => m.key !== itemKey);
      progress.mistakes.unshift({ key: itemKey, at: now });
      if (progress.mistakes.length > MAX_MISTAKES) {
        progress.mistakes.length = MAX_MISTAKES;
      }
    }
    entry.due = now + SRS_INTERVALS[entry.level];
    entry.lastSeen = now;
    progress.srs[itemKey] = entry;

    // 每日統計
    progress.daily.today.total++;
    if (isCorrect) progress.daily.today.correct++;

    // 連續學習天數
    const today = todayStr();
    if (progress.daily.lastStudyDate !== today) {
      if (progress.daily.lastStudyDate === yesterdayStr()) {
        progress.daily.streak++;
      } else {
        progress.daily.streak = 1;
      }
      progress.daily.lastStudyDate = today;
    }

    saveProgress();
  }

  // ---- 查詢：到期項目、收藏、錯題 ----
  function getDueKeys(typeFilter) {
    const now = Date.now();
    const keys = [];
    for (const k of Object.keys(progress.srs)) {
      const e = progress.srs[k];
      if (e.due <= now) {
        if (!typeFilter || k.startsWith(typeFilter + ':')) keys.push(k);
      }
    }
    return keys;
  }
  function getMistakeKeys() {
    return progress.mistakes.map(m => m.key);
  }
  function getFavoriteKeys() {
    return progress.favorites.slice();
  }
  function toggleFavorite(key) {
    if (!key) return;
    const idx = progress.favorites.indexOf(key);
    if (idx >= 0) progress.favorites.splice(idx, 1);
    else progress.favorites.push(key);
    saveProgress();
  }
  function isFavorite(key) {
    return progress.favorites.indexOf(key) >= 0;
  }
  function clearMistakes() {
    progress.mistakes = [];
    saveProgress();
  }

  // ---- 工具函式 ----
  function $(id) { return document.getElementById(id); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function randomPick(arr, n) {
    return shuffle(arr).slice(0, n);
  }
  function speak(text, lang) {
    if (!('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || 'ja-JP';
      u.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  // ---- 頁面切換 ----
  function showPage(name) {
    state.currentPage = name;
    $$('.page').forEach(p => p.classList.add('hidden'));
    const target = $('page-' + name);
    if (target) target.classList.remove('hidden');
    $$('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.page === name);
    });
    if (name === 'review') renderReview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- 羅馬拼音 ----
  function applyRomajiVisibility() {
    document.body.classList.toggle('no-romaji', !state.showRomaji);
  }

  // ---- 五十音渲染 ----
  function renderKana(group) {
    state.currentKanaTab = group;
    const data = KANA_DATA[group];
    const grid = $('kana-grid');
    grid.innerHTML = '';

    // 計算每列要幾欄（清音 5 欄、拗音 3 欄）
    const cols = data.rows[0].length;
    grid.style.gridTemplateColumns = `repeat(${cols}, minmax(64px, 1fr))`;

    for (const row of data.rows) {
      for (const cell of row) {
        const div = document.createElement('div');
        if (!cell) {
          div.className = 'kana-cell empty';
          grid.appendChild(div);
          continue;
        }
        const [kana, romaji] = cell;
        div.className = 'kana-cell';
        div.innerHTML = `<div class="kana-char">${kana}</div><div class="kana-romaji">${romaji}</div>`;
        div.addEventListener('click', () => speak(kana, 'ja-JP'));
        grid.appendChild(div);
      }
    }

    $$('#kana-tabs .tab').forEach(t => {
      t.classList.toggle('active', t.dataset.kana === group);
    });
  }

  // ---- 單字渲染 ----
  function renderVocabCategories() {
    const sel = $('vocab-category');
    const prev = sel.value;
    // 只列出當前等級內存在的分類
    const set = new Set();
    for (const v of VOCAB_DATA) {
      if (state.vocabLevel === 'all' || v.level === state.vocabLevel) set.add(v.cat);
    }
    const cats = [...set];
    sel.innerHTML = '<option value="all">全部分類</option>';
    for (const c of cats) {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    }
    // 嘗試保留之前的選擇
    if (prev && [...sel.options].some(o => o.value === prev)) {
      sel.value = prev;
    } else {
      sel.value = 'all';
    }
  }

  function renderVocabList() {
    const list = $('vocab-list');
    const stats = $('vocab-stats');
    const q = $('vocab-search').value.trim().toLowerCase();
    const cat = $('vocab-category').value;
    const lvl = state.vocabLevel;

    const filtered = VOCAB_DATA.filter(v => {
      if (lvl !== 'all' && v.level !== lvl) return false;
      if (cat !== 'all' && v.cat !== cat) return false;
      if (!q) return true;
      return (
        v.jp.toLowerCase().includes(q) ||
        v.kana.toLowerCase().includes(q) ||
        v.romaji.toLowerCase().includes(q) ||
        v.cn.toLowerCase().includes(q)
      );
    });

    const totalForLevel = lvl === 'all'
      ? VOCAB_DATA.length
      : VOCAB_DATA.filter(v => v.level === lvl).length;
    stats.textContent = `共 ${filtered.length} 個（${lvl === 'all' ? 'N5 + N4' : lvl} 總計 ${totalForLevel} 個）`;
    list.innerHTML = '';

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'vocab-empty';
      empty.textContent = '找不到符合的單字';
      list.appendChild(empty);
      return;
    }

    for (const v of filtered) {
      const key = 'v:' + v.jp + '|' + v.cn;
      const fav = isFavorite(key);
      const item = document.createElement('div');
      item.className = 'vocab-item';
      item.innerHTML = `
        <button class="fav-btn ${fav ? 'on' : ''}" data-key="${key}"
          title="${fav ? '取消收藏' : '加入收藏'}"
          aria-label="${fav ? '取消收藏' : '加入收藏'}">${fav ? '★' : '☆'}</button>
        <div class="vocab-jp">${v.jp}</div>
        <div class="vocab-kana">${v.kana}</div>
        <div class="vocab-romaji">${v.romaji}</div>
        <div class="vocab-meaning">${v.cn}</div>
        <div class="vocab-cat">${v.cat}</div>
      `;
      const favBtn = item.querySelector('.fav-btn');
      favBtn.addEventListener('click', e => {
        e.stopPropagation();
        toggleFavorite(key);
        const nowFav = isFavorite(key);
        favBtn.classList.toggle('on', nowFav);
        favBtn.textContent = nowFav ? '★' : '☆';
        favBtn.title = nowFav ? '取消收藏' : '加入收藏';
      });
      item.addEventListener('click', e => {
        if (e.target.closest('.fav-btn')) return;
        speak(v.kana.replace(/\s*\/\s*/g, '、'), 'ja-JP');
      });
      list.appendChild(item);
    }
  }

  // ---- 文法渲染 ----
  function renderGrammar() {
    const list = $('grammar-list');
    const stats = $('grammar-stats');
    const lvl = state.grammarLevel;
    const filtered = GRAMMAR_DATA.filter(g => lvl === 'all' || g.level === lvl);
    if (stats) {
      const totalForLevel = lvl === 'all'
        ? GRAMMAR_DATA.length
        : GRAMMAR_DATA.filter(g => g.level === lvl).length;
      stats.textContent = `共 ${filtered.length} 條（${lvl === 'all' ? 'N5 + N4' : lvl}）`;
    }
    list.innerHTML = '';
    filtered.forEach((g, idx) => {
      const key = 'g:' + g.pattern;
      const fav = isFavorite(key);
      const item = document.createElement('div');
      item.className = 'grammar-item';
      const examplesHtml = g.examples.map(ex => `
        <div class="grammar-example">
          <div class="ex-jp">${ex.jp}</div>
          <div class="ex-kana">${ex.kana}</div>
          <div class="ex-romaji">${ex.romaji}</div>
          <div class="ex-cn">${ex.cn}</div>
        </div>
      `).join('');

      item.innerHTML = `
        <div class="grammar-head">
          <div class="grammar-num">${idx + 1}</div>
          <div class="grammar-pattern">${g.pattern}</div>
          <div class="grammar-short">${g.short}</div>
          <button class="fav-btn ${fav ? 'on' : ''}" data-key="${key}"
            title="${fav ? '取消收藏' : '加入收藏'}">${fav ? '★' : '☆'}</button>
          <div class="grammar-toggle">▼</div>
        </div>
        <div class="grammar-body">
          <div class="grammar-explain">${g.explain}</div>
          <div class="grammar-examples">${examplesHtml}</div>
        </div>
      `;
      const head = item.querySelector('.grammar-head');
      const favBtn = item.querySelector('.fav-btn');
      head.addEventListener('click', e => {
        if (e.target.closest('.fav-btn')) return;
        item.classList.toggle('open');
      });
      favBtn.addEventListener('click', e => {
        e.stopPropagation();
        toggleFavorite(key);
        const nowFav = isFavorite(key);
        favBtn.classList.toggle('on', nowFav);
        favBtn.textContent = nowFav ? '★' : '☆';
        favBtn.title = nowFav ? '取消收藏' : '加入收藏';
      });
      list.appendChild(item);
    });
  }

  // ---- 複習頁 ----
  function renderReview() {
    ensureDailyState();

    // 連續天數（若昨天沒學、今天也還沒學 → 顯示昨日值；若已斷掉 → 0）
    const today = todayStr();
    let streak = progress.daily.streak;
    const last = progress.daily.lastStudyDate;
    if (last && last !== today && last !== yesterdayStr()) {
      streak = 0;
    }
    $('streak-num').textContent = streak;

    // 今日進度
    const t = progress.daily.today || { total: 0, correct: 0 };
    $('today-total').textContent = t.total;
    $('today-correct').textContent = t.correct;
    $('today-rate').textContent = t.total ? Math.round(t.correct / t.total * 100) + '%' : '—';
    $('daily-goal').textContent = DAILY_GOAL;
    $('daily-progress-fill').style.width = Math.min(100, t.total / DAILY_GOAL * 100) + '%';

    // SRS 概況
    const counts = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0 };
    for (const k of Object.keys(progress.srs)) counts[progress.srs[k].level]++;
    const totalLearned = Object.keys(progress.srs).length;
    $('srs-summary').innerHTML = `
      <div class="srs-label">已接觸 ${totalLearned} 個項目</div>
      <div class="srs-bar">
        ${[0,1,2,3,4,5].map(lv => `
          <div class="srs-seg srs-lv-${lv}" style="flex:${counts[lv] || 0.01}"
            title="Lv ${lv}：${counts[lv]} 個"></div>
        `).join('')}
      </div>
      <div class="srs-legend">
        <span>Lv 0 新／錯</span><span>Lv 1</span><span>Lv 2</span>
        <span>Lv 3</span><span>Lv 4</span><span>Lv 5 熟</span>
      </div>
    `;

    // 到期
    const dueAll = getDueKeys();
    const dueByType = { k: 0, v: 0, g: 0 };
    for (const key of dueAll) {
      const t = key.charAt(0);
      if (dueByType[t] !== undefined) dueByType[t]++;
    }
    $('due-count').textContent = dueAll.length;
    $('due-breakdown').innerHTML = `
      <span>假名 <b>${dueByType.k}</b></span>
      <span>單字 <b>${dueByType.v}</b></span>
      <span>文法 <b>${dueByType.g}</b></span>
    `;
    $('btn-review-due').disabled = dueAll.length === 0;

    // 錯題
    const mistakes = getMistakeKeys();
    $('mistake-count').textContent = mistakes.length;
    $('btn-review-mistakes').disabled = mistakes.length === 0;
    $('btn-clear-mistakes').disabled = mistakes.length === 0;

    // 收藏
    const favs = getFavoriteKeys();
    $('favorite-count').textContent = favs.length;
    $('btn-review-favorites').disabled = favs.length === 0;
    renderFavoritePreview(favs);
  }

  function renderFavoritePreview(favs) {
    const box = $('favorite-preview');
    if (!favs.length) {
      box.innerHTML = '';
      return;
    }
    const items = favs.slice(0, 12).map(k => {
      const l = lookupByKey(k);
      if (!l) return '';
      if (l.type === 'kana') return `<span class="fav-chip" data-key="${k}">${l.item.kana} <i>${l.item.romaji}</i></span>`;
      if (l.type === 'vocab') return `<span class="fav-chip" data-key="${k}">${l.item.jp} <i>${l.item.cn}</i></span>`;
      if (l.type === 'grammar') return `<span class="fav-chip" data-key="${k}">${l.item.pattern}</span>`;
      return '';
    }).join('');
    box.innerHTML = items + (favs.length > 12 ? `<span class="fav-more">+${favs.length - 12} more…</span>` : '');
  }

  // ---- 測驗 ----
  function startQuiz(type) {
    const count = parseInt($('quiz-count').value, 10);
    const lvl = $('quiz-level') ? $('quiz-level').value : 'all';
    let pool;

    if (type === 'hira-to-romaji' || type === 'romaji-to-hira') {
      pool = getAllHiragana();
    } else if (type === 'kata-to-romaji' || type === 'romaji-to-kata') {
      pool = getAllKatakana();
    } else if (type === 'vocab-jp-to-cn' || type === 'vocab-cn-to-jp') {
      pool = VOCAB_DATA.filter(v => lvl === 'all' || v.level === lvl);
    } else if (type === 'grammar') {
      pool = GRAMMAR_DATA.filter(g => lvl === 'all' || g.level === lvl);
    } else {
      return;
    }

    if (pool.length === 0) {
      alert('此等級沒有可出題的內容');
      return;
    }

    const questionCount = Math.min(count, pool.length);
    const questions = randomPick(pool, questionCount).map(q => buildQuestion(type, q, pool));

    launchQuiz(type, questions);
  }

  function launchQuiz(type, questions) {
    state.quiz = {
      type,
      questions,
      currentIdx: 0,
      correctCount: 0,
      answers: []
    };
    showPage('quiz');
    $('quiz-setup').classList.add('hidden');
    $('quiz-result').classList.add('hidden');
    $('quiz-active').classList.remove('hidden');
    renderQuizQuestion();
  }

  // 從一組 itemKey 建立題目（自動依項目類型決定題型）
  function buildReviewQuestions(keys, limit) {
    const questions = [];
    const shuffled = shuffle(keys).slice(0, limit || keys.length);
    for (const key of shuffled) {
      const lookup = lookupByKey(key);
      if (!lookup || !lookup.item) continue;

      let qType, pool;
      if (lookup.type === 'kana') {
        const isHira = lookup.kanaType === 'hira';
        const dir = Math.random() < 0.5 ? 'to-romaji' : 'from-romaji';
        if (isHira) qType = dir === 'to-romaji' ? 'hira-to-romaji' : 'romaji-to-hira';
        else qType = dir === 'to-romaji' ? 'kata-to-romaji' : 'romaji-to-kata';
        pool = isHira ? getAllHiragana() : getAllKatakana();
      } else if (lookup.type === 'vocab') {
        qType = Math.random() < 0.5 ? 'vocab-jp-to-cn' : 'vocab-cn-to-jp';
        pool = VOCAB_DATA;
      } else if (lookup.type === 'grammar') {
        qType = 'grammar';
        pool = GRAMMAR_DATA;
      } else {
        continue;
      }
      questions.push(buildQuestion(qType, lookup.item, pool));
    }
    return questions;
  }

  function startReviewSession(mode) {
    let keys;
    if (mode === 'due') keys = getDueKeys();
    else if (mode === 'mistakes') keys = getMistakeKeys();
    else if (mode === 'favorites') keys = getFavoriteKeys();
    else return;

    if (!keys.length) return;
    const questions = buildReviewQuestions(keys, 30);
    if (!questions.length) return;
    launchQuiz('review-' + mode, questions);
  }

  function buildQuestion(type, target, pool) {
    let question, correct, options;
    if (type === 'hira-to-romaji' || type === 'kata-to-romaji') {
      question = { prompt: '這個假名的羅馬拼音是？', content: target.kana, small: false };
      correct = target.romaji;
      const distractors = randomPick(pool.filter(p => p.romaji !== correct), 3).map(p => p.romaji);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'romaji-to-hira' || type === 'romaji-to-kata') {
      question = { prompt: '這個羅馬拼音對應的假名是？', content: target.romaji, small: true };
      correct = target.kana;
      const distractors = randomPick(pool.filter(p => p.kana !== correct), 3).map(p => p.kana);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'vocab-jp-to-cn') {
      question = { prompt: `這個單字的中文意思是？（${target.kana}）`, content: target.jp, small: false };
      correct = target.cn;
      const distractors = randomPick(pool.filter(p => p.cn !== correct), 3).map(p => p.cn);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'vocab-cn-to-jp') {
      question = { prompt: '對應的日文是？', content: target.cn, small: true };
      correct = `${target.jp}（${target.kana}）`;
      const distractors = randomPick(pool.filter(p => p.jp !== target.jp), 3)
        .map(p => `${p.jp}（${p.kana}）`);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'grammar') {
      question = { prompt: '這個文法的意思是？', content: target.pattern, small: true };
      correct = target.short;
      const distractors = randomPick(pool.filter(p => p.short !== correct), 3).map(p => p.short);
      options = shuffle([correct, ...distractors]);
    }
    return { question, correct, options, target, itemKey: getItemKey(type, target), type };
  }

  function renderQuizQuestion() {
    const q = state.quiz;
    const cur = q.questions[q.currentIdx];

    $('quiz-progress-text').textContent =
      `第 ${q.currentIdx + 1} / ${q.questions.length} 題　·　目前答對 ${q.correctCount} 題`;
    $('quiz-progress-fill').style.width =
      `${(q.currentIdx / q.questions.length) * 100}%`;

    const qBox = $('quiz-question');
    qBox.innerHTML = `
      <div class="q-prompt">${cur.question.prompt}</div>
      <div class="q-content${cur.question.small ? ' small' : ''}">${cur.question.content}</div>
    `;

    const optBox = $('quiz-options');
    optBox.innerHTML = '';
    cur.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(opt, btn));
      optBox.appendChild(btn);
    });

    $('quiz-feedback').classList.add('hidden');
    $('quiz-next').classList.add('hidden');
  }

  function handleAnswer(picked, btn) {
    const q = state.quiz;
    const cur = q.questions[q.currentIdx];
    const isCorrect = picked === cur.correct;

    if (isCorrect) q.correctCount++;
    q.answers.push({ q: cur, picked, isCorrect });

    // 紀錄到 SRS／錯題本／每日統計
    recordAnswer(cur.itemKey, isCorrect);

    // 標記顏色 + 鎖住所有按鈕
    $$('.quiz-option').forEach(b => {
      b.disabled = true;
      if (b.textContent === cur.correct) b.classList.add('correct');
      else if (b === btn && !isCorrect) b.classList.add('wrong');
    });

    const fb = $('quiz-feedback');
    fb.classList.remove('hidden');
    if (isCorrect) {
      fb.className = 'quiz-feedback good';
      fb.textContent = '✓ 答對了！';
    } else {
      fb.className = 'quiz-feedback bad';
      fb.textContent = `✗ 答錯了。正確答案：${cur.correct}`;
    }

    $('quiz-next').classList.remove('hidden');
    $('quiz-next').textContent =
      q.currentIdx === q.questions.length - 1 ? '看結果 →' : '下一題 →';
  }

  function nextQuestion() {
    const q = state.quiz;
    q.currentIdx++;
    if (q.currentIdx >= q.questions.length) {
      finishQuiz();
    } else {
      renderQuizQuestion();
    }
  }

  function finishQuiz() {
    const q = state.quiz;
    $('quiz-active').classList.add('hidden');
    $('quiz-result').classList.remove('hidden');

    $('quiz-score').innerHTML =
      `${q.correctCount}<span class="total"> / ${q.questions.length}</span>`;

    const review = $('quiz-review');
    review.innerHTML = '';
    q.answers.forEach((a, idx) => {
      const item = document.createElement('div');
      item.className = 'review-item';
      const mark = a.isCorrect ? 'ok' : 'no';
      const sym = a.isCorrect ? '✓' : '✗';
      item.innerHTML = `
        <span class="review-mark ${mark}">${sym}</span>
        <span><b>${idx + 1}.</b> ${a.q.question.content}　→
          ${a.isCorrect
            ? `<span style="color:var(--good)">${a.q.correct}</span>`
            : `<span style="color:var(--bad)">${a.picked}</span> （正解：${a.q.correct}）`}
        </span>
      `;
      review.appendChild(item);
    });
  }

  function quitQuiz() {
    state.quiz = null;
    $('quiz-active').classList.add('hidden');
    $('quiz-result').classList.add('hidden');
    $('quiz-setup').classList.remove('hidden');
  }

  // ---- 事件綁定 ----
  function bindEvents() {
    // 導航
    $$('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => showPage(btn.dataset.page));
    });

    // 首頁卡片
    $$('.card[data-goto]').forEach(card => {
      card.addEventListener('click', () => showPage(card.dataset.goto));
    });

    // 羅馬拼音 toggle
    $('romaji-toggle').addEventListener('change', e => {
      state.showRomaji = e.target.checked;
      applyRomajiVisibility();
    });

    // 主題切換
    $('theme-toggle').addEventListener('click', toggleTheme);

    // 五十音分頁
    $$('#kana-tabs .tab').forEach(t => {
      t.addEventListener('click', () => renderKana(t.dataset.kana));
    });

    // 單字 search / category
    $('vocab-search').addEventListener('input', renderVocabList);
    $('vocab-category').addEventListener('change', renderVocabList);

    // 等級下拉（單字）
    $('vocab-level-select').addEventListener('change', e => {
      state.vocabLevel = e.target.value;
      renderVocabCategories();
      renderVocabList();
    });

    // 等級下拉（文法）
    $('grammar-level-select').addEventListener('change', e => {
      state.grammarLevel = e.target.value;
      renderGrammar();
    });

    // 測驗類型
    $$('.quiz-type').forEach(b => {
      b.addEventListener('click', () => startQuiz(b.dataset.type));
    });
    $('quiz-next').addEventListener('click', nextQuestion);
    $('quiz-quit').addEventListener('click', quitQuiz);
    $('quiz-restart').addEventListener('click', quitQuiz);

    // 複習頁面按鈕
    $('btn-review-due').addEventListener('click', () => startReviewSession('due'));
    $('btn-review-mistakes').addEventListener('click', () => startReviewSession('mistakes'));
    $('btn-review-favorites').addEventListener('click', () => startReviewSession('favorites'));
    $('btn-clear-mistakes').addEventListener('click', () => {
      if (confirm('確定要清空錯題本嗎？')) {
        clearMistakes();
        renderReview();
      }
    });
  }

  // ---- 初始化 ----
  function init() {
    initTheme();
    loadProgress();
    bindEvents();
    applyRomajiVisibility();
    renderKana('hira-basic');
    renderVocabCategories();
    renderVocabList();
    renderGrammar();
    renderHomeStats();
    showPage('home');
  }

  // 首頁迷你進度資訊
  function renderHomeStats() {
    const el = $('home-stats');
    if (!el) return;
    ensureDailyState();
    const today = todayStr();
    let streak = progress.daily.streak;
    const last = progress.daily.lastStudyDate;
    if (last && last !== today && last !== yesterdayStr()) streak = 0;
    const t = progress.daily.today || { total: 0, correct: 0 };
    const due = getDueKeys().length;
    el.innerHTML = `
      <span><b>🔥 ${streak}</b> 連續天</span>
      <span><b>${t.total}</b> 今日題數</span>
      <span><b>${due}</b> 待複習</span>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
