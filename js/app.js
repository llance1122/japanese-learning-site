// === Main App Logic ===
(function() {
  'use strict';

  // ---- 全域狀態 ----
  const state = {
    currentPage: 'home',
    currentKanaTab: 'hira-basic',
    vocabLevel: 'N5',
    grammarLevel: 'N5',
    grammarTag: 'all',        // 功能分類篩選（'all' = 全部）
    grammarSearch: '',        // 文法搜尋字串
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
      notes: {},        // { itemKey: { text, updatedAt } }
      daily: {
        streak: 0,
        lastStudyDate: null,
        today: null     // { date, correct, total }
      },
      upgradeDismissed: {}, // { 'N5->N4': true }：被使用者「稍後再說」的升級提示
      kanaDrillBest: {}     // { 'hira-basic-all': { time, accuracy, date }, ... }
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
    // 若已登入，推到雲端（auth 模組會做防抖）
    if (window.AuthState && window.AuthState.user) {
      window.AuthState.pushProgress(progress);
      updateSyncStatus('syncing');
    }
  }

  // 合併雲端進度進本機。策略：
  // - srs：每個 itemKey 取 lastSeen 較大者
  // - mistakes：合併後依 at 排序，去重，取最近 100
  // - favorites：聯集
  // - daily.streak：取較大者
  // - daily.lastStudyDate：取較新日期
  // - daily.today：日期相同時 total/correct 取最大
  function mergeProgress(local, cloud) {
    if (!cloud) return local;
    const merged = JSON.parse(JSON.stringify(local));

    // srs
    merged.srs = merged.srs || {};
    if (cloud.srs) {
      for (const k of Object.keys(cloud.srs)) {
        const a = merged.srs[k];
        const b = cloud.srs[k];
        if (!a || (b.lastSeen || 0) > (a.lastSeen || 0)) {
          merged.srs[k] = b;
        }
      }
    }

    // favorites（聯集）
    const favSet = new Set([...(local.favorites || []), ...(cloud.favorites || [])]);
    merged.favorites = [...favSet];

    // mistakes（合併、去重、依 at 倒序、保留 100）
    const mistakeMap = new Map();
    for (const m of [...(cloud.mistakes || []), ...(local.mistakes || [])]) {
      const prev = mistakeMap.get(m.key);
      if (!prev || (m.at || 0) > (prev.at || 0)) mistakeMap.set(m.key, m);
    }
    merged.mistakes = [...mistakeMap.values()]
      .sort((a, b) => (b.at || 0) - (a.at || 0))
      .slice(0, 100);

    // notes（同 key 取較新 updatedAt）
    merged.notes = merged.notes || {};
    if (cloud.notes) {
      for (const k of Object.keys(cloud.notes)) {
        const a = merged.notes[k];
        const b = cloud.notes[k];
        if (!a || (b.updatedAt || 0) > (a.updatedAt || 0)) {
          merged.notes[k] = b;
        }
      }
    }

    // upgradeDismissed（聯集）
    merged.upgradeDismissed = Object.assign(
      {},
      local.upgradeDismissed || {},
      cloud.upgradeDismissed || {}
    );

    // kanaDrillBest（每 key 取時間較短者 = 較佳）
    merged.kanaDrillBest = merged.kanaDrillBest || {};
    if (cloud.kanaDrillBest) {
      for (const k of Object.keys(cloud.kanaDrillBest)) {
        const a = merged.kanaDrillBest[k];
        const b = cloud.kanaDrillBest[k];
        if (!a || (b && typeof b.time === 'number' && b.time < (a.time || Infinity))) {
          merged.kanaDrillBest[k] = b;
        }
      }
    }

    // daily
    merged.daily = merged.daily || { streak: 0, lastStudyDate: null, today: null };
    if (cloud.daily) {
      merged.daily.streak = Math.max(merged.daily.streak || 0, cloud.daily.streak || 0);
      const aDate = merged.daily.lastStudyDate || '';
      const bDate = cloud.daily.lastStudyDate || '';
      if (bDate > aDate) merged.daily.lastStudyDate = bDate;

      // today：同日合併，否則保留新的
      const todayStrNow = todayStr();
      const aToday = (merged.daily.today && merged.daily.today.date === todayStrNow) ? merged.daily.today : null;
      const bToday = (cloud.daily.today && cloud.daily.today.date === todayStrNow) ? cloud.daily.today : null;
      if (aToday && bToday) {
        merged.daily.today = {
          date: todayStrNow,
          total: Math.max(aToday.total, bToday.total),
          correct: Math.max(aToday.correct, bToday.correct)
        };
      } else if (bToday) {
        merged.daily.today = bToday;
      }
    }

    return merged;
  }

  let syncStatusEl = null;
  function updateSyncStatus(state) {
    if (!syncStatusEl) syncStatusEl = document.getElementById('user-sync-status');
    if (!syncStatusEl) return;
    if (state === 'syncing') syncStatusEl.textContent = '☁️ 同步中…';
    else if (state === 'synced') syncStatusEl.textContent = '☁️ 已同步';
    else if (state === 'offline') syncStatusEl.textContent = '⚠️ 未登入（本機）';
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
    if (type === 'vocab-jp-to-cn' || type === 'vocab-cn-to-jp' ||
        type === 'vocab-kanji-to-kana') {
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
  // ---- 個人筆記 ----
  function getNote(key) {
    const n = progress.notes && progress.notes[key];
    return n && n.text ? n.text : '';
  }
  function saveNote(key, text) {
    progress.notes = progress.notes || {};
    const trimmed = (text || '').trim();
    if (!trimmed) {
      delete progress.notes[key];
    } else {
      progress.notes[key] = { text: trimmed, updatedAt: Date.now() };
    }
    saveProgress();
  }

  function isFavorite(key) {
    return progress.favorites.indexOf(key) >= 0;
  }
  function clearMistakes() {
    progress.mistakes = [];
    saveProgress();
  }

  // ============================================================
  // ====      D 方案：能力估算 + 每日推薦 + 升級提示         ====
  // ============================================================
  const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const NEXT_LEVEL  = { N5: 'N4', N4: 'N3', N3: 'N2', N2: 'N1', N1: null };
  const MIN_ATTEMPTS_PER_LEVEL = 20;   // 該等級答題數門檻，未達不顯示估算
  const PASS_SCORE = 0.65;             // 達到此分視為「該等級已掌握，可挑戰下一級」
  const UPGRADE_MASTERY = 0.80;        // 升級提示門檻：精熟率 ≥ 80%

  // 計算每個 JLPT 等級的學習統計
  function computeLevelStats() {
    const stats = {};
    for (const lv of JLPT_LEVELS) {
      stats[lv] = {
        total: 0, seen: 0, mastered: 0,
        correct: 0, wrong: 0, attempts: 0,
        seenRate: 0, masteryRate: 0, accuracy: 0, score: 0
      };
    }
    for (const v of VOCAB_DATA) {
      if (!stats[v.level]) continue;
      const s = stats[v.level];
      s.total++;
      const e = progress.srs['v:' + v.jp + '|' + v.cn];
      if (e) {
        s.seen++;
        if (e.level >= 4) s.mastered++;
        s.correct += e.correct || 0;
        s.wrong   += e.wrong   || 0;
      }
    }
    for (const g of GRAMMAR_DATA) {
      if (!stats[g.level]) continue;
      const s = stats[g.level];
      s.total++;
      const e = progress.srs['g:' + g.pattern];
      if (e) {
        s.seen++;
        if (e.level >= 4) s.mastered++;
        s.correct += e.correct || 0;
        s.wrong   += e.wrong   || 0;
      }
    }
    for (const lv of JLPT_LEVELS) {
      const s = stats[lv];
      s.attempts    = s.correct + s.wrong;
      s.seenRate    = s.total ? s.seen / s.total : 0;
      s.masteryRate = s.seen ? s.mastered / s.seen : 0;
      s.accuracy    = s.attempts ? s.correct / s.attempts : 0;
      s.score       = 0.5 * s.masteryRate + 0.5 * s.accuracy;
    }
    return stats;
  }

  // 估算當前實力等級 + 段位
  function estimateLevel() {
    const stats = computeLevelStats();
    // 找已挑戰過、且樣本足夠的最高等級
    let highest = null;
    for (const lv of JLPT_LEVELS) {
      if (stats[lv].attempts >= MIN_ATTEMPTS_PER_LEVEL) highest = lv;
    }
    if (!highest) return { ready: false, stats };

    const s = stats[highest].score;
    let segment;
    if (s >= 0.85) segment = '精通';
    else if (s >= PASS_SCORE) segment = '後段';
    else if (s >= 0.45) segment = '中段';
    else if (s >= 0.25) segment = '初段';
    else segment = '入門';

    // 已可挑戰下一級？
    const next = (s >= PASS_SCORE) ? NEXT_LEVEL[highest] : null;

    return { ready: true, level: highest, segment, score: s, next, stats };
  }

  // 偵測「某等級精熟率 ≥ 80%」→ 顯示升級橫幅
  function checkLevelUpgrade() {
    const stats = computeLevelStats();
    // 從低到高找：第一個達標、且還沒夠多挑戰下一級的
    for (const lv of JLPT_LEVELS) {
      const next = NEXT_LEVEL[lv];
      if (!next) continue;
      const a = stats[lv], b = stats[next];
      if (a.seen >= MIN_ATTEMPTS_PER_LEVEL && a.masteryRate >= UPGRADE_MASTERY) {
        // 若下一級已經練得差不多了（樣本 ≥ 門檻），就不再提示
        if (b.attempts >= MIN_ATTEMPTS_PER_LEVEL) continue;
        const dismissKey = lv + '->' + next;
        if (progress.upgradeDismissed && progress.upgradeDismissed[dismissKey]) continue;
        return {
          from: lv,
          to: next,
          masteryPct: Math.round(a.masteryRate * 100),
          dismissKey
        };
      }
    }
    return null;
  }

  // 推薦清單聚焦的等級：優先用使用者目前正在練的單字等級
  function getFocusLevel() {
    if (state.vocabLevel && state.vocabLevel !== 'all') return state.vocabLevel;
    const est = estimateLevel();
    if (est.ready) return est.level;
    return 'N5';
  }

  // 建構今日推薦清單
  function buildDailyRecommendation() {
    const goal = DAILY_GOAL;
    const focusLevel = getFocusLevel();

    const dueKeys     = shuffle(getDueKeys());
    const mistakeKeys = shuffle(getMistakeKeys().filter(k => !dueKeys.includes(k)));

    // 新詞：聚焦等級內、尚未進入 SRS 的單字/文法
    const newKeysAll = [];
    for (const v of VOCAB_DATA) {
      if (v.level !== focusLevel) continue;
      const k = 'v:' + v.jp + '|' + v.cn;
      if (!progress.srs[k]) newKeysAll.push(k);
    }
    for (const g of GRAMMAR_DATA) {
      if (g.level !== focusLevel) continue;
      const k = 'g:' + g.pattern;
      if (!progress.srs[k]) newKeysAll.push(k);
    }
    const newKeys = shuffle(newKeysAll);

    // 預期比例：到期 50%、新詞 30%、錯題 20%
    let nDue     = Math.round(goal * 0.5);
    let nNew     = Math.round(goal * 0.3);
    let nMistake = goal - nDue - nNew;

    nDue     = Math.min(nDue,     dueKeys.length);
    nNew     = Math.min(nNew,     newKeys.length);
    nMistake = Math.min(nMistake, mistakeKeys.length);

    // 不足時依序從其他來源補：到期 → 新詞 → 錯題
    function topUp() {
      const pools = [
        { arr: dueKeys,     used: () => nDue,     bump: () => nDue++ },
        { arr: newKeys,     used: () => nNew,     bump: () => nNew++ },
        { arr: mistakeKeys, used: () => nMistake, bump: () => nMistake++ }
      ];
      while (nDue + nNew + nMistake < goal) {
        let progressed = false;
        for (const p of pools) {
          if (nDue + nNew + nMistake >= goal) break;
          if (p.used() < p.arr.length) { p.bump(); progressed = true; }
        }
        if (!progressed) break;
      }
    }
    topUp();

    return {
      focusLevel,
      goal,
      nDue, nNew, nMistake,
      dueKeys:     dueKeys.slice(0, nDue),
      newKeys:     newKeys.slice(0, nNew),
      mistakeKeys: mistakeKeys.slice(0, nMistake),
      hasNewPool:  newKeysAll.length > 0,
      duePool:     dueKeys.length,
      mistakePool: mistakeKeys.length
    };
  }

  // 開始今日推薦的混合練習
  function startDailyRecommendation() {
    const rec = buildDailyRecommendation();
    const keys = [...rec.dueKeys, ...rec.newKeys, ...rec.mistakeKeys];
    if (!keys.length) {
      alert('目前沒有可推薦的題目，先去單字或文法頁挑些內容練習吧！');
      return;
    }
    const questions = buildReviewQuestions(keys);
    if (!questions.length) {
      alert('產題失敗，請稍後再試');
      return;
    }
    launchQuiz('daily', shuffle(questions));
  }

  // 一鍵把單字／文法／測驗的等級下拉切到目標等級
  function applyLevelUpgrade(toLevel) {
    state.vocabLevel = toLevel;
    state.grammarLevel = toLevel;
    const vSel = $('vocab-level-select'); if (vSel) vSel.value = toLevel;
    const gSel = $('grammar-level-select'); if (gSel) gSel.value = toLevel;
    const qSel = $('quiz-level'); if (qSel && [...qSel.options].some(o => o.value === toLevel)) qSel.value = toLevel;
    renderVocabCategories();
    renderVocabList();
    renderGrammarTagBar();
    renderGrammar();
    renderReview();
  }

  function dismissUpgrade(key) {
    progress.upgradeDismissed = progress.upgradeDismissed || {};
    progress.upgradeDismissed[key] = true;
    saveProgress();
  }

  // ---- 工具函式 ----
  // HTML escape for safe inline output
  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 通用：綁定一個 item 內的筆記按鈕事件（給 vocab/grammar 共用）
  function bindNoteUI(item, key, onSaved) {
    const noteBtn = item.querySelector('.note-btn');
    const area = item.querySelector('.note-area');
    if (!noteBtn || !area) return;
    const textarea = area.querySelector('.note-textarea');
    const saveBtn = area.querySelector('.note-save');
    const cancelBtn = area.querySelector('.note-cancel');

    noteBtn.addEventListener('click', e => {
      e.stopPropagation();
      const visible = !area.hidden;
      area.hidden = visible;
      if (!visible) {
        textarea.value = getNote(key);
        textarea.focus();
      }
    });
    saveBtn.addEventListener('click', e => {
      e.stopPropagation();
      const text = textarea.value;
      saveNote(key, text);
      area.hidden = true;
      item.classList.toggle('has-note', !!text.trim());
      noteBtn.textContent = text.trim() ? '📝' : '📝＋';
      noteBtn.title = text.trim() ? '編輯筆記' : '加筆記';
      if (onSaved) onSaved(text);
    });
    cancelBtn.addEventListener('click', e => {
      e.stopPropagation();
      area.hidden = true;
    });
    // 防止 textarea 點擊冒泡觸發外層 click
    textarea.addEventListener('click', e => e.stopPropagation());
  }

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
    if (name === 'quiz') renderDailyChallengeCard();
    if (name === 'leaderboard') renderLeaderboard();
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
    stats.textContent = `共 ${filtered.length} 個（${lvl === 'all' ? '全部' : lvl} 總計 ${totalForLevel} 個）`;
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
      const note = getNote(key);
      const item = document.createElement('div');
      item.className = 'vocab-item' + (note ? ' has-note' : '');
      item.innerHTML = `
        <button class="fav-btn ${fav ? 'on' : ''}" data-key="${key}"
          title="${fav ? '取消收藏' : '加入收藏'}"
          aria-label="${fav ? '取消收藏' : '加入收藏'}">${fav ? '★' : '☆'}</button>
        <div class="vocab-jp">${v.jp}</div>
        <div class="vocab-kana">${v.kana}</div>
        <div class="vocab-romaji">${v.romaji}</div>
        <div class="vocab-meaning">${v.cn}</div>
        <div class="vocab-cat">${v.cat}</div>
        <button class="note-btn" data-key="${key}"
          title="${note ? '編輯筆記' : '加筆記'}"
          aria-label="筆記">📝${note ? '' : '＋'}</button>
        <div class="note-area" data-noteare-key="${key}" hidden>
          <textarea class="note-textarea" placeholder="記下你的記憶法、聯想、踩過的雷…">${escapeHTML(note)}</textarea>
          <div class="note-actions">
            <button class="note-save">儲存</button>
            <button class="note-cancel">取消</button>
          </div>
        </div>
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
      bindNoteUI(item, key);
      item.addEventListener('click', e => {
        if (e.target.closest('.fav-btn')) return;
        if (e.target.closest('.note-btn')) return;
        if (e.target.closest('.note-area')) return;
        speak(v.kana.replace(/\s*\/\s*/g, '、'), 'ja-JP');
      });
      list.appendChild(item);
    }
  }

  // ---- 文法渲染 ----
  // 渲染功能分類橫條（chip 列表）
  function renderGrammarTagBar() {
    const bar = $('grammar-tag-bar');
    if (!bar || typeof window.GRAMMAR_TAG_ORDER === 'undefined') return;
    const lvl = state.grammarLevel;
    // 計算各 tag 在當前等級內的覆蓋數
    const inScope = GRAMMAR_DATA.filter(g => lvl === 'all' || g.level === lvl);
    const counts = { all: inScope.length };
    for (const tag of window.GRAMMAR_TAG_ORDER) counts[tag] = 0;
    for (const g of inScope) {
      for (const t of window.getGrammarTags(g.pattern)) counts[t]++;
    }
    const chips = ['<button class="tag-chip ' + (state.grammarTag === 'all' ? 'active' : '') + '" data-tag="all">全部 <span>' + counts.all + '</span></button>'];
    for (const tag of window.GRAMMAR_TAG_ORDER) {
      if (counts[tag] === 0) continue; // 該等級下沒有條目的 tag 不顯示
      const active = state.grammarTag === tag ? 'active' : '';
      chips.push('<button class="tag-chip ' + active + '" data-tag="' + tag + '">' + tag + ' <span>' + counts[tag] + '</span></button>');
    }
    bar.innerHTML = chips.join('');
    bar.querySelectorAll('.tag-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        state.grammarTag = btn.dataset.tag;
        renderGrammarTagBar();
        renderGrammar();
      });
    });
  }

  function renderGrammar() {
    const list = $('grammar-list');
    const stats = $('grammar-stats');
    const lvl = state.grammarLevel;
    const tag = state.grammarTag;
    const q = (state.grammarSearch || '').trim().toLowerCase();
    const filtered = GRAMMAR_DATA.filter(g => {
      if (lvl !== 'all' && g.level !== lvl) return false;
      if (tag !== 'all') {
        const tags = window.getGrammarTags ? window.getGrammarTags(g.pattern) : [];
        if (!tags.includes(tag)) return false;
      }
      if (q) {
        const hay = (g.pattern + ' ' + g.short + ' ' + g.explain).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (stats) {
      const tagLabel = tag === 'all' ? '' : '・' + tag;
      stats.textContent = `共 ${filtered.length} 條（${lvl === 'all' ? '全部' : lvl}${tagLabel}）`;
    }
    list.innerHTML = '';
    filtered.forEach((g, idx) => {
      const key = 'g:' + g.pattern;
      const fav = isFavorite(key);
      const note = getNote(key);
      const item = document.createElement('div');
      item.className = 'grammar-item' + (note ? ' has-note' : '');
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
          <button class="note-btn" data-key="${key}"
            title="${note ? '編輯筆記' : '加筆記'}"
            aria-label="筆記">📝${note ? '' : '＋'}</button>
          <div class="grammar-toggle">▼</div>
        </div>
        <div class="grammar-body">
          <div class="grammar-explain">${g.explain}</div>
          <div class="grammar-examples">${examplesHtml}</div>
          <div class="note-area" hidden>
            <textarea class="note-textarea" placeholder="記下你的記憶法、聯想、踩過的雷…">${escapeHTML(note)}</textarea>
            <div class="note-actions">
              <button class="note-save">儲存</button>
              <button class="note-cancel">取消</button>
            </div>
          </div>
        </div>
      `;
      const head = item.querySelector('.grammar-head');
      const favBtn = item.querySelector('.fav-btn');
      head.addEventListener('click', e => {
        if (e.target.closest('.fav-btn')) return;
        if (e.target.closest('.note-btn')) return;
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
      // 筆記：grammar 的筆記按鈕點擊要先展開卡片再開 note area
      const noteBtn = item.querySelector('.note-btn');
      const noteArea = item.querySelector('.note-area');
      const noteTextarea = noteArea.querySelector('.note-textarea');
      const noteSave = noteArea.querySelector('.note-save');
      const noteCancel = noteArea.querySelector('.note-cancel');
      noteBtn.addEventListener('click', e => {
        e.stopPropagation();
        // 確保卡片展開才看得到 note-area
        item.classList.add('open');
        const visible = !noteArea.hidden;
        noteArea.hidden = visible;
        if (!visible) {
          noteTextarea.value = getNote(key);
          noteTextarea.focus();
        }
      });
      noteSave.addEventListener('click', e => {
        e.stopPropagation();
        const text = noteTextarea.value;
        saveNote(key, text);
        noteArea.hidden = true;
        item.classList.toggle('has-note', !!text.trim());
        noteBtn.textContent = text.trim() ? '📝' : '📝＋';
        noteBtn.title = text.trim() ? '編輯筆記' : '加筆記';
      });
      noteCancel.addEventListener('click', e => {
        e.stopPropagation();
        noteArea.hidden = true;
      });
      noteTextarea.addEventListener('click', e => e.stopPropagation());
      list.appendChild(item);
    });
  }

  // ---- 複習頁 ----
  function renderReview() {
    ensureDailyState();

    // D 方案：升級橫幅 + 能力估算 + 今日推薦
    renderUpgradeBanner();
    renderLevelEstimate();
    renderDailyRecommendation();
    renderUserDropdownEstimate();

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

  // ---- D 方案：能力估算 / 推薦 / 升級 的 render ----
  function renderLevelEstimate() {
    const card = $('level-estimate-card');
    if (!card) return;
    const badge = $('level-estimate-badge');
    const body  = $('level-estimate-body');
    const bars  = $('level-estimate-bars');
    const est = estimateLevel();

    if (!est.ready) {
      badge.classList.add('hidden');
      body.innerHTML = '<div class="level-estimate-empty">每等級答滿 ' +
        MIN_ATTEMPTS_PER_LEVEL + ' 題以上才會出現估算結果。先去測驗或複習練幾輪！</div>';
      bars.innerHTML = '';
      return;
    }

    badge.classList.remove('hidden');
    badge.className = 'level-estimate-badge level-' + est.level;
    badge.textContent = est.level + ' ' + est.segment;

    let msg = '你目前實力 ≈ <b>' + est.level + ' ' + est.segment + '</b>';
    if (est.next) msg += '（已可挑戰 <b>' + est.next + '</b>）';
    else if (est.level !== 'N1') msg += '，繼續累積看看能否突破到下一級！';
    else msg += '，N1 路上加油！';
    body.innerHTML = '<div class="level-estimate-msg">' + msg + '</div>';

    // 畫每個等級的迷你進度條
    bars.innerHTML = JLPT_LEVELS.map(lv => {
      const s = est.stats[lv];
      const enough = s.attempts >= MIN_ATTEMPTS_PER_LEVEL;
      const pct = Math.round(s.score * 100);
      const detail = enough
        ? '精熟 ' + Math.round(s.masteryRate * 100) + '%　·　正確 ' +
          Math.round(s.accuracy * 100) + '%　·　' + s.attempts + ' 題'
        : '尚未練習（' + s.attempts + '/' + MIN_ATTEMPTS_PER_LEVEL + ' 題）';
      return (
        '<div class="lv-row">' +
          '<div class="lv-row-head">' +
            '<span class="lv-tag lv-tag-' + lv + '">' + lv + '</span>' +
            '<span class="lv-row-detail">' + detail + '</span>' +
            (enough ? '<span class="lv-row-score">' + pct + '</span>' : '') +
          '</div>' +
          '<div class="lv-row-bar">' +
            '<div class="lv-row-fill ' + (enough ? '' : 'pending') +
              '" style="width:' + (enough ? pct : 0) + '%"></div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderDailyRecommendation() {
    const card = $('daily-recommend-card');
    if (!card) return;
    const rec = buildDailyRecommendation();
    const body = $('daily-recommend-body');
    const focusEl = $('daily-recommend-focus');
    const btn = $('btn-start-daily');

    focusEl.textContent = '聚焦：' + rec.focusLevel;
    body.innerHTML =
      '<div class="rec-chip rec-due"><b>' + rec.nDue + '</b> 到期複習</div>' +
      '<div class="rec-chip rec-new"><b>' + rec.nNew + '</b> 新詞</div>' +
      '<div class="rec-chip rec-mistake"><b>' + rec.nMistake + '</b> 錯題</div>';

    const total = rec.nDue + rec.nNew + rec.nMistake;
    btn.disabled = total === 0;
    btn.textContent = total === 0
      ? '今日已無可推薦題目'
      : '開始今日學習（' + total + ' 題）';

    // 提示：若 hasNewPool 為 false（聚焦等級已全部接觸過），補一行
    const hint = $('daily-recommend-hint');
    if (hint) {
      if (total === 0) {
        hint.textContent = '到期 0 / 新詞 0 / 錯題 0 — 等項目到期再來吧！';
      } else if (!rec.hasNewPool) {
        hint.textContent = focusLevelHintForExhausted(rec.focusLevel);
      } else {
        hint.textContent = '比例：到期 50% / 新詞 30% / 錯題 20%（不足會自動互補）';
      }
    }
  }

  function focusLevelHintForExhausted(lv) {
    const next = NEXT_LEVEL[lv];
    if (next) return lv + ' 內所有項目都已接觸，可以考慮把單字／文法等級切到 ' + next + '。';
    return 'N1 所有項目都已接觸 — 太強了！';
  }

  function renderUpgradeBanner() {
    const banner = $('upgrade-banner');
    if (!banner) return;
    const up = checkLevelUpgrade();
    if (!up) { banner.classList.add('hidden'); return; }
    banner.classList.remove('hidden');
    banner.innerHTML =
      '<div class="upgrade-text">🎉 你的 <b>' + up.from + '</b> 精熟度已達 ' +
        up.masteryPct + '%，建議開始挑戰 <b>' + up.to + '</b>！</div>' +
      '<div class="upgrade-actions">' +
        '<button class="upgrade-btn primary" data-upgrade-to="' + up.to + '">升級到 ' + up.to + '</button>' +
        '<button class="upgrade-btn ghost" data-upgrade-dismiss="' + up.dismissKey + '">稍後再說</button>' +
      '</div>';
    banner.querySelector('[data-upgrade-to]').addEventListener('click', () => {
      applyLevelUpgrade(up.to);
    });
    banner.querySelector('[data-upgrade-dismiss]').addEventListener('click', () => {
      dismissUpgrade(up.dismissKey);
      renderReview();
    });
  }

  function renderUserDropdownEstimate() {
    const el = $('user-dropdown-est');
    if (!el) return;
    const est = estimateLevel();
    if (!est.ready) {
      el.textContent = '🎯 實力估算：資料累積中…';
      return;
    }
    el.innerHTML = '🎯 實力 ≈ <b>' + est.level + ' ' + est.segment + '</b>';
  }

  // ---- 測驗 ----
  function startQuiz(type) {
    const count = parseInt($('quiz-count').value, 10);
    const lvl = $('quiz-level') ? $('quiz-level').value : 'all';
    let pool;

    const kanaRange = $('kana-range') ? $('kana-range').value : 'all';
    if (type === 'hira-to-romaji' || type === 'romaji-to-hira') {
      pool = getHiraganaByRange(kanaRange);
    } else if (type === 'kata-to-romaji' || type === 'romaji-to-kata') {
      pool = getKatakanaByRange(kanaRange);
    } else if (type === 'vocab-jp-to-cn' || type === 'vocab-cn-to-jp') {
      pool = VOCAB_DATA.filter(v => lvl === 'all' || v.level === lvl);
    } else if (type === 'vocab-listening-jp' || type === 'vocab-listening-cn') {
      // 聽力題：排除 jp == kana 的純假名單字（聽到等於看到，沒挑戰），含漢字才有意思
      pool = VOCAB_DATA.filter(v =>
        (lvl === 'all' || v.level === lvl) &&
        v.kana && v.kana.length >= 2
      );
    } else if (type === 'vocab-kanji-to-kana') {
      // 只挑含漢字、且 jp ≠ kana 的詞
      pool = VOCAB_DATA.filter(v =>
        (lvl === 'all' || v.level === lvl) &&
        v.jp !== v.kana &&
        /[一-鿿]/.test(v.jp)
      );
    } else if (type === 'grammar') {
      pool = GRAMMAR_DATA.filter(g => lvl === 'all' || g.level === lvl);
    } else if (type === 'verb-conjugation') {
      pool = window.VerbConj ? window.VerbConj.getVerbPool(lvl) : [];
    } else if (type === 'jlpt-mock') {
      return startMockExam(lvl, count);
    } else {
      return;
    }

    if (pool.length === 0) {
      alert('此等級沒有可出題的內容');
      return;
    }

    const questionCount = Math.min(count, pool.length);
    const questions = randomPick(pool, questionCount).map(q => buildQuestion(type, q, pool));

    launchQuiz(type, questions, () => startQuiz(type));
  }

  function launchQuiz(type, questions, restartFn) {
    state.quiz = {
      type,
      questions,
      currentIdx: 0,
      correctCount: 0,
      answers: [],
      restart: restartFn || null,
      mode: $('quiz-mode') ? $('quiz-mode').value : 'choice'
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

  // JLPT 模擬試卷：混合多個題型，按 JLPT 大題分配
  function startMockExam(level, totalCount) {
    const vocabPool = VOCAB_DATA.filter(v => level === 'all' || v.level === level);
    const kanjiPool = vocabPool.filter(v => v.jp !== v.kana && /[一-鿿]/.test(v.jp));
    const grammarPool = GRAMMAR_DATA.filter(g => level === 'all' || g.level === level);

    if (vocabPool.length === 0 || grammarPool.length === 0) {
      alert('此等級的題目資料不足');
      return;
    }

    // 分配比例：漢字読み 30%、文字・語彙(jp→cn) 25%、語彙(cn→jp) 20%、文法 25%
    const sections = [
      { type: 'vocab-kanji-to-kana', pool: kanjiPool,  ratio: 0.30, label: '漢字読み' },
      { type: 'vocab-jp-to-cn',      pool: vocabPool,  ratio: 0.25, label: '文字・語彙' },
      { type: 'vocab-cn-to-jp',      pool: vocabPool,  ratio: 0.20, label: '語彙置き換え' },
      { type: 'grammar',             pool: grammarPool, ratio: 0.25, label: '文法' }
    ];

    const questions = [];
    for (const sec of sections) {
      if (!sec.pool.length) continue;
      const n = Math.max(1, Math.round(totalCount * sec.ratio));
      const targets = randomPick(sec.pool, Math.min(n, sec.pool.length));
      for (const t of targets) {
        const q = buildQuestion(sec.type, t, sec.pool);
        q.section = sec.label;
        questions.push(q);
      }
    }
    // 打亂題目順序，避免按 section 排序
    const shuffled = shuffle(questions).slice(0, totalCount);
    if (!shuffled.length) {
      alert('產題失敗');
      return;
    }
    launchQuiz('jlpt-mock', shuffled, () => startMockExam(level, totalCount));
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
    launchQuiz('review-' + mode, questions, () => startReviewSession(mode));
  }

  function buildQuestion(type, target, pool) {
    let question, correct, options, acceptable;
    if (type === 'hira-to-romaji' || type === 'kata-to-romaji') {
      question = { prompt: '這個假名的羅馬拼音是？', content: target.kana, small: false };
      correct = target.romaji;
      acceptable = [target.romaji];
      const distractors = randomPick(pool.filter(p => p.romaji !== correct), 3).map(p => p.romaji);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'romaji-to-hira' || type === 'romaji-to-kata') {
      question = { prompt: '這個羅馬拼音對應的假名是？', content: target.romaji, small: true };
      correct = target.kana;
      acceptable = [target.kana];
      const distractors = randomPick(pool.filter(p => p.kana !== correct), 3).map(p => p.kana);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'vocab-jp-to-cn') {
      question = { prompt: `這個單字的中文意思是？（${target.kana}）`, content: target.jp, small: false };
      correct = target.cn;
      acceptable = [target.cn];
      const distractors = randomPick(pool.filter(p => p.cn !== correct), 3).map(p => p.cn);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'vocab-cn-to-jp') {
      question = { prompt: '對應的日文是？', content: target.cn, small: true };
      correct = `${target.jp}（${target.kana}）`;
      // 輸入模式可寫漢字、假名、或組合形（半全形括號都接受）
      acceptable = [
        target.jp,
        target.kana,
        `${target.jp}（${target.kana}）`,
        `${target.jp}(${target.kana})`
      ];
      const distractors = randomPick(pool.filter(p => p.jp !== target.jp), 3)
        .map(p => `${p.jp}（${p.kana}）`);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'vocab-kanji-to-kana') {
      question = { prompt: '請選出正確的讀法（文字・語彙）', content: target.jp, small: false };
      correct = target.kana;
      acceptable = [target.kana];
      const distractors = randomPick(
        pool.filter(p => p.kana !== correct && /[一-鿿]/.test(p.jp)),
        3
      ).map(p => p.kana);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'vocab-listening-jp') {
      question = { prompt: '聽音選漢字（按 🔊 重播）', content: target.kana, small: false, isAudio: true };
      correct = target.jp;
      acceptable = [target.jp, target.kana];  // 輸入時假名也接受
      const distractors = randomPick(pool.filter(p => p.jp !== correct), 3).map(p => p.jp);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'vocab-listening-cn') {
      question = { prompt: '聽音選意思（按 🔊 重播）', content: target.kana, small: false, isAudio: true };
      correct = target.cn;
      acceptable = [target.cn];
      const distractors = randomPick(pool.filter(p => p.cn !== correct), 3).map(p => p.cn);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'grammar') {
      question = { prompt: '這個文法的意思是？', content: target.pattern, small: true };
      correct = target.short;
      acceptable = [target.short];
      const distractors = randomPick(pool.filter(p => p.short !== correct), 3).map(p => p.short);
      options = shuffle([correct, ...distractors]);
    } else if (type === 'verb-conjugation') {
      const forms = window.VerbConj.FORMS;
      const form = forms[Math.floor(Math.random() * forms.length)];
      const correctConj = window.VerbConj.conjugate(target, form.key);
      if (!correctConj) return buildQuestion('vocab-jp-to-cn', target, pool);
      question = {
        prompt: `將「${target.jp}（${target.kana}）」變化為 ${form.label}`,
        content: target.cn,
        small: true
      };
      correct = correctConj.kana;
      // 輸入時假名 / 漢字寫法都接受
      acceptable = [correctConj.kana];
      if (correctConj.jp && correctConj.jp !== correctConj.kana) acceptable.push(correctConj.jp);
      const distrSet = new Set();
      for (const f of forms) {
        if (f.key === form.key) continue;
        const c = window.VerbConj.conjugate(target, f.key);
        if (c && c.kana !== correct) distrSet.add(c.kana);
      }
      const distractors = shuffle([...distrSet]).slice(0, 3);
      options = shuffle([correct, ...distractors]);
      question.formLabel = form.label;
    }
    return { question, correct, options, acceptable: acceptable || [correct], target, itemKey: getItemKey(type, target), type };
  }

  // 答案模糊比對：trim、忽略大小寫、忽略全/半形空白
  function normalizeAnswer(s) {
    return String(s || '').trim().replace(/[\s　]+/g, '').toLowerCase();
  }
  function checkAnswerInput(userInput, q) {
    const u = normalizeAnswer(userInput);
    if (!u) return false;
    return (q.acceptable || [q.correct]).some(a => normalizeAnswer(a) === u);
  }

  function renderQuizQuestion() {
    const q = state.quiz;
    const cur = q.questions[q.currentIdx];

    $('quiz-progress-text').textContent =
      `第 ${q.currentIdx + 1} / ${q.questions.length} 題　·　目前答對 ${q.correctCount} 題`;
    $('quiz-progress-fill').style.width =
      `${(q.currentIdx / q.questions.length) * 100}%`;

    const qBox = $('quiz-question');
    const sectionTag = cur.section
      ? `<div class="q-section">［${cur.section}］</div>` : '';
    if (cur.question.isAudio) {
      // 聽力題：不顯示讀音、給播放按鈕
      qBox.innerHTML = `
        ${sectionTag}
        <div class="q-prompt">${cur.question.prompt}</div>
        <button class="q-audio-btn" id="q-audio-btn" aria-label="播放讀音">
          <span class="q-audio-icon">🔊</span>
          <span class="q-audio-label">播放讀音</span>
        </button>
      `;
      const audioBtn = $('q-audio-btn');
      const playAudio = () => speak(cur.question.content.replace(/\s*\/\s*/g, '、'), 'ja-JP');
      audioBtn.addEventListener('click', playAudio);
      // 自動播一次
      setTimeout(playAudio, 200);
    } else {
      qBox.innerHTML = `
        ${sectionTag}
        <div class="q-prompt">${cur.question.prompt}</div>
        <div class="q-content${cur.question.small ? ' small' : ''}">${cur.question.content}</div>
      `;
    }

    const optBox = $('quiz-options');
    optBox.innerHTML = '';

    if (q.mode === 'input') {
      // 輸入題：textbox + 提交
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'quiz-input';
      input.id = 'quiz-input';
      input.autocomplete = 'off';
      input.autocapitalize = 'off';
      input.spellcheck = false;
      input.placeholder = '在此輸入答案，按 Enter 送出';
      const submit = document.createElement('button');
      submit.className = 'quiz-submit';
      submit.id = 'quiz-submit';
      submit.textContent = '送出';
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); submitInputAnswer(); }
      });
      submit.addEventListener('click', submitInputAnswer);
      optBox.appendChild(input);
      optBox.appendChild(submit);
      setTimeout(() => input.focus(), 50);
    } else {
      // 選擇題：4 個按鈕
      cur.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswer(opt, btn));
        optBox.appendChild(btn);
      });
    }

    $('quiz-feedback').classList.add('hidden');
    $('quiz-next').classList.add('hidden');
  }

  function submitInputAnswer() {
    const input = $('quiz-input');
    if (!input || input.disabled) return;
    const picked = input.value;
    handleAnswer(picked, null);
  }

  function handleAnswer(picked, btn) {
    const q = state.quiz;
    const cur = q.questions[q.currentIdx];
    // 輸入模式用 acceptable 模糊比對；選擇模式維持嚴格比對
    const isCorrect = q.mode === 'input'
      ? checkAnswerInput(picked, cur)
      : picked === cur.correct;

    if (isCorrect) q.correctCount++;
    q.answers.push({ q: cur, picked, isCorrect });
    recordAnswer(cur.itemKey, isCorrect);

    if (q.mode === 'input') {
      const input = $('quiz-input');
      const submit = $('quiz-submit');
      if (input) {
        input.disabled = true;
        input.classList.add(isCorrect ? 'correct' : 'wrong');
      }
      if (submit) submit.disabled = true;
    } else {
      // 選擇題：標顏色 + 鎖按鈕
      $$('.quiz-option').forEach(b => {
        b.disabled = true;
        if (b.textContent === cur.correct) b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
    }

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

    // 每日挑戰：寫本機 + 提交雲端（伺服器算折扣 + 取 max）
    if (q.type === 'daily-challenge' && q.dailyDate) {
      const rawScore = q.correctCount * 10;       // 原始：每題 10 分
      const maxScore = q.questions.length * 10;
      if (window.AuthState && window.AuthState.user) {
        window.AuthState.submitDailyScore(q.dailyDate, rawScore, maxScore)
          .then(result => {
            if (!result) {
              showToast('上傳成功，但伺服器沒回傳資料', 'info');
              return;
            }
            const discounted = Math.round(rawScore * result.multiplier_pct / 100);
            saveDailyChallengeLocal(q.dailyDate, result.final_score, maxScore, result.total_attempts);
            showToast(
              `第 ${result.total_attempts} 次挑戰：本次 ${rawScore} × ${result.multiplier_pct}% = ${discounted} 分　·　今日最佳 ${result.final_score} / ${maxScore}`,
              'success', 8000
            );
            renderDailyChallengeCard();
          })
          .catch(err => {
            console.error('submitDailyScore failed', err);
            showToast('分數上傳失敗：' + (err.message || '請稍後再試'), 'error');
          });
      } else {
        // 未登入：本機自算折扣
        const prev = getTodayLocalScore();
        const newAttempts = (prev?.attempts || 0) + 1;
        const mult = multiplierForAttempt(newAttempts);
        const discounted = Math.round(rawScore * mult);
        const finalScore = Math.max(prev?.score || 0, discounted);
        saveDailyChallengeLocal(q.dailyDate, finalScore, maxScore, newAttempts);
        showToast(
          `未登入：第 ${newAttempts} 次挑戰，本次 ${discounted} 分（×${Math.round(mult * 100)}%）·  最佳 ${finalScore} / ${maxScore}`,
          'info', 7000
        );
      }
    }
  }

  // 第 N 次挑戰的折扣倍率（跟 SQL submit_daily_score 對齊）
  function multiplierForAttempt(n) {
    if (n <= 1) return 1.00;
    if (n === 2) return 0.70;
    if (n === 3) return 0.50;
    if (n === 4) return 0.35;
    return 0.25;
  }

  function quitQuiz() {
    state.quiz = null;
    $('quiz-active').classList.add('hidden');
    $('quiz-result').classList.add('hidden');
    $('quiz-setup').classList.remove('hidden');
    // 回 setup 時刷一下每日挑戰卡片（顯示分數）
    renderDailyChallengeCard();
  }

  // 用同樣的設定再跑一次 quiz
  function restartQuiz() {
    const fn = state.quiz && state.quiz.restart;
    if (!fn) { quitQuiz(); return; }
    state.quiz = null;
    $('quiz-active').classList.add('hidden');
    $('quiz-result').classList.add('hidden');
    fn();
  }

  // ============================================================
  // ====              每日挑戰（Daily Challenge）            ====
  // ============================================================
  const DAILY_LOCAL_KEY = 'jp-learn-daily-challenge';

  function loadDailyChallengeLocal() {
    try {
      const raw = localStorage.getItem(DAILY_LOCAL_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveDailyChallengeLocal(date, score, maxScore, attempts) {
    try {
      localStorage.setItem(DAILY_LOCAL_KEY, JSON.stringify({
        date, score, maxScore, attempts: attempts || 1, completedAt: Date.now()
      }));
    } catch (e) {}
  }
  function getTodayLocalScore() {
    const r = loadDailyChallengeLocal();
    if (!r || !window.DailyChallenge) return null;
    return r.date === window.DailyChallenge.todayDate() ? r : null;
  }

  function startDailyChallenge() {
    if (!window.DailyChallenge) { showToast('每日挑戰模組未載入', 'error'); return; }
    const dc = window.DailyChallenge.getTodayChallenge();
    if (!dc.items || !dc.items.length) {
      showToast('今天的題目產生失敗', 'error');
      return;
    }
    // 把 (type, target) → 完整 question
    const questions = dc.items.map(it => {
      let pool;
      if (it.type === 'vocab-kanji-to-kana' || it.type === 'vocab-jp-to-cn' || it.type === 'vocab-listening-jp') {
        pool = VOCAB_DATA;
      } else if (it.type === 'grammar') {
        pool = GRAMMAR_DATA;
      } else if (it.type === 'hira-to-romaji') {
        pool = getAllHiragana();
      }
      const q = buildQuestion(it.type, it.target, pool);
      q.section = '每日挑戰';
      return q;
    });
    state.quiz = {
      type: 'daily-challenge',
      dailyDate: dc.date,
      questions,
      currentIdx: 0,
      correctCount: 0,
      answers: [],
      restart: startDailyChallenge
    };
    showPage('quiz');
    $('quiz-setup').classList.add('hidden');
    $('quiz-result').classList.add('hidden');
    $('quiz-active').classList.remove('hidden');
    renderQuizQuestion();
  }

  async function renderDailyChallengeCard() {
    if (!window.DailyChallenge) return;
    const dateStr = window.DailyChallenge.todayDate();
    const dEl = $('dc-date');
    if (dEl) dEl.textContent = dateStr;

    const status = $('dc-status');
    const btn = $('dc-start-btn');
    if (!status || !btn) return;

    let myToday = getTodayLocalScore();
    // 已登入時也問問雲端（防換裝置 / 多裝置同步）
    if (window.AuthState && window.AuthState.user) {
      const cloud = await window.AuthState.fetchMyDailyScore(dateStr);
      if (cloud) {
        // 雲端為準，覆蓋本機
        myToday = {
          date: dateStr,
          score: cloud.score,
          maxScore: cloud.max_score,
          attempts: cloud.attempts || 1
        };
        saveDailyChallengeLocal(dateStr, cloud.score, cloud.max_score, cloud.attempts || 1);
      }
    }

    if (myToday) {
      const pct = Math.round((myToday.score / myToday.maxScore) * 100);
      const attempts = myToday.attempts || 1;
      status.innerHTML =
        `✅ 今日最佳 <b>${myToday.score} / ${myToday.maxScore}</b> 分（${pct}%）　·　已挑戰 <b>${attempts}</b> 次`;
      status.classList.add('done');
      const nextMult = Math.round(multiplierForAttempt(attempts + 1) * 100);
      btn.textContent = `再挑戰一次（下次得分 ×${nextMult}%）`;
    } else {
      status.innerHTML = '尚未挑戰　·　第 1 次拿滿分機會（×100%）';
      status.classList.remove('done');
      btn.textContent = '開始今日挑戰';
    }
  }

  // ============================================================
  // ====                   排行榜（Leaderboard）             ====
  // ============================================================
  let lbCache = null;
  let lbCurrentTab = 'total';

  async function renderLeaderboard(forceRefresh) {
    const tbody = $('lb-tbody');
    const loading = $('lb-loading');
    const empty = $('lb-empty');
    const need = $('lb-need-login');
    const wrap = document.querySelector('.lb-table-wrap');
    if (!tbody) return;

    if (!window.AuthState || !window.AuthState.user) {
      need.classList.remove('hidden');
      wrap.classList.add('hidden');
      loading.classList.add('hidden');
      empty.classList.add('hidden');
      tbody.innerHTML = '';
      return;
    }
    need.classList.add('hidden');
    wrap.classList.remove('hidden');

    if (!lbCache || forceRefresh) {
      loading.classList.remove('hidden');
      empty.classList.add('hidden');
      tbody.innerHTML = '';
      try {
        lbCache = await window.AuthState.fetchLeaderboard();
      } catch (e) {
        lbCache = [];
        showToast('載入排行榜失敗', 'error');
      }
      loading.classList.add('hidden');
    }

    const rows = lbCache.slice();
    if (lbCurrentTab === 'total') rows.sort((a, b) => b.total_score - a.total_score);
    else if (lbCurrentTab === 'week') rows.sort((a, b) => b.week_score - a.week_score);
    else if (lbCurrentTab === 'today') rows.sort((a, b) => b.today_score - a.today_score);

    // 今日 tab 過濾掉 today_score == 0
    const filtered = lbCurrentTab === 'today'
      ? rows.filter(r => r.today_score > 0)
      : rows;

    if (!filtered.length) {
      empty.classList.remove('hidden');
      tbody.innerHTML = '';
      return;
    }
    empty.classList.add('hidden');

    const myId = window.AuthState.user.id;
    tbody.innerHTML = filtered.map((r, i) => {
      const isMe = r.user_id === myId;
      let scoreVal, extraText;
      if (lbCurrentTab === 'total') {
        scoreVal = r.total_score;
        extraText = `${r.best_score} / ${r.days_played} 天`;
      } else if (lbCurrentTab === 'week') {
        scoreVal = r.week_score;
        extraText = `${r.best_score} / ${r.days_played} 天`;
      } else {
        scoreVal = r.today_score;
        extraText = `${r.today_attempts || 0} 次`;
      }
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
      const name = escapeHtml(r.display_name || '匿名玩家');
      return `
        <tr class="${isMe ? 'lb-me' : ''}">
          <td class="lb-rank">${medal}</td>
          <td>${name}${isMe ? ' <span class="lb-me-tag">你</span>' : ''}</td>
          <td class="lb-score"><b>${scoreVal}</b></td>
          <td class="lb-extra">${extraText}</td>
          <td class="lb-extra">${r.last_played || '—'}</td>
        </tr>
      `;
    }).join('');

    // 更新欄標題
    const header = $('lb-score-header');
    if (header) {
      header.textContent = lbCurrentTab === 'total' ? '總分'
        : lbCurrentTab === 'week' ? '本週分' : '今日分';
    }
    const extra1 = $('lb-extra1-header');
    if (extra1) {
      extra1.textContent = lbCurrentTab === 'today' ? '今日挑戰次數' : '最佳單日 / 連戰';
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
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

    // 回頂端按鈕：捲動超過 300px 顯示，點擊平滑回頂
    const backBtn = $('back-to-top');
    if (backBtn) {
      const SHOW_THRESHOLD = 300;
      let ticking = false;
      const updateBackBtn = () => {
        backBtn.classList.toggle('visible', window.scrollY > SHOW_THRESHOLD);
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateBackBtn);
          ticking = true;
        }
      }, { passive: true });
      // 初始檢查一次（例如刷新時頁面已在底部）
      updateBackBtn();
      backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

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

    // 等級下拉（文法）— 切等級時 tag 過濾要回到「全部」否則容易看不到資料
    $('grammar-level-select').addEventListener('change', e => {
      state.grammarLevel = e.target.value;
      state.grammarTag = 'all';
      renderGrammarTagBar();
      renderGrammar();
    });

    // 文法搜尋
    const gs = $('grammar-search');
    if (gs) gs.addEventListener('input', e => {
      state.grammarSearch = e.target.value;
      renderGrammar();
    });

    // 測驗類型
    $$('.quiz-type').forEach(b => {
      b.addEventListener('click', () => startQuiz(b.dataset.type));
      if (b.dataset.noLevel != null) {
        b.addEventListener('mouseenter', () => $('quiz-config')?.classList.add('level-dimmed'));
        b.addEventListener('mouseleave', () => $('quiz-config')?.classList.remove('level-dimmed'));
      }
    });

    // 答題方式：記到 localStorage
    const modeSel = $('quiz-mode');
    if (modeSel) {
      try {
        const saved = localStorage.getItem('jp-learn-quiz-mode');
        if (saved === 'input' || saved === 'choice') modeSel.value = saved;
      } catch (e) {}
      modeSel.addEventListener('change', () => {
        try { localStorage.setItem('jp-learn-quiz-mode', modeSel.value); } catch (e) {}
      });
    }
    $('quiz-next').addEventListener('click', nextQuestion);
    $('quiz-quit').addEventListener('click', quitQuiz);
    $('quiz-restart').addEventListener('click', restartQuiz);
    const qb = $('quiz-back');
    if (qb) qb.addEventListener('click', quitQuiz);

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

    // 今日推薦：一鍵開始
    const btnDaily = $('btn-start-daily');
    if (btnDaily) btnDaily.addEventListener('click', startDailyRecommendation);

    // 每日挑戰
    const dcStart = $('dc-start-btn');
    if (dcStart) dcStart.addEventListener('click', startDailyChallenge);
    const dcLb = $('dc-leaderboard-btn');
    if (dcLb) dcLb.addEventListener('click', () => showPage('leaderboard'));

    // 排行榜：分頁切換 / 重新整理 / 登入按鈕
    $$('.lb-tab').forEach(t => {
      t.addEventListener('click', () => {
        lbCurrentTab = t.dataset.lbTab;
        $$('.lb-tab').forEach(x => x.classList.toggle('active', x === t));
        renderLeaderboard();
      });
    });
    const lbR = $('lb-refresh');
    if (lbR) lbR.addEventListener('click', () => renderLeaderboard(true));
    const lbLogin = $('lb-login-btn');
    if (lbLogin) lbLogin.addEventListener('click', () => $('auth-signin-btn').click());
  }

  // ---- 開場刀斬動畫 ----
  function initIntro() {
    const splash = document.getElementById('intro-splash');
    if (!splash) return;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      splash.remove();
      return;
    }
    let seen = false;
    try { seen = sessionStorage.getItem('jp-learn-intro-seen') === '1'; } catch (e) {}
    if (seen) {
      splash.remove();
      return;
    }
    try { sessionStorage.setItem('jp-learn-intro-seen', '1'); } catch (e) {}

    const skip = () => {
      splash.classList.add('intro-skip-now');
      setTimeout(() => splash.remove(), 450);
    };
    const skipBtn = document.getElementById('intro-skip');
    if (skipBtn) skipBtn.addEventListener('click', skip);

    // 在刀擊瞬間（1.0s）噴出花瓣
    setTimeout(spawnIntroBurst, 1000);

    // 動畫總長 ~2.0s + fade 0.4s → 2.4s 後移除
    setTimeout(() => {
      splash.classList.add('intro-done');
      setTimeout(() => splash.remove(), 450);
    }, 2000);
  }

  // 刀擊瞬間從畫面中心噴出花瓣（沿著刀光方向偏多）
  function spawnIntroBurst() {
    const burst = document.getElementById('intro-burst');
    if (!burst) return;
    const COUNT = 28;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'intro-petal';
      // 角度偏向刀光方向（-22deg ≈ 沿著對角）
      // 一半往右上、一半往左下、加些散射
      const baseAngle = (i % 2 === 0 ? -22 : 158) + (Math.random() * 80 - 40);
      const dist = 200 + Math.random() * 500;
      const rad = baseAngle * Math.PI / 180;
      const dx = Math.cos(rad) * dist;
      const dy = Math.sin(rad) * dist;
      p.style.setProperty('--dx', dx + 'px');
      p.style.setProperty('--dy', dy + 'px');
      p.style.setProperty('--rot', (Math.random() * 1440 - 720) + 'deg');
      p.style.animationDelay = (Math.random() * 0.15) + 's';
      const sz = 12 + Math.random() * 14;
      p.style.width = sz + 'px';
      p.style.height = sz + 'px';
      p.style.left = (-sz / 2) + 'px';
      p.style.top = (-sz / 2) + 'px';
      burst.appendChild(p);
    }
  }

  // ---- 永久背景櫻花飄落 ----
  function initSakura() {
    const layer = document.getElementById('sakura-layer');
    if (!layer) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // 手機減量
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 720px)').matches;
    const COUNT = isMobile ? 8 : 16;
    for (let i = 0; i < COUNT; i++) spawnSakura(layer, i);
  }
  function spawnSakura(layer, idx) {
    const p = document.createElement('div');
    p.className = 'sakura-petal';
    const sz = 10 + Math.random() * 12;
    p.style.width = sz + 'px';
    p.style.height = sz + 'px';
    p.style.left = (Math.random() * 100) + 'vw';
    // 持續時間 12~22s
    p.style.setProperty('--dur', (12 + Math.random() * 10) + 's');
    // 起始偏移 0 ~ -20s，讓 N 朵花瓣分散在不同時間點
    p.style.setProperty('--delay', (-Math.random() * 20) + 's');
    p.style.opacity = (0.35 + Math.random() * 0.45).toFixed(2);
    layer.appendChild(p);
  }

  // ============================================================
  // ====             五十音速練（Kana Drill）                  ====
  // ============================================================
  const KD_BEST_LEGACY_KEY = 'jp-learn-kana-drill-best'; // 舊版單獨儲存 key（會被遷移）
  const kd = {
    script: 'hira',
    range: 'basic',
    count: 'all',          // 'all' | 數字
    queue: [],
    current: null,
    initialCount: 0,
    firstTryCorrect: 0,
    wrongSet: null,
    startTime: 0,
    timerId: null
  };

  function kdLoadBest() {
    return (progress && progress.kanaDrillBest) ? progress.kanaDrillBest : {};
  }
  function kdSaveBest(all) {
    if (!progress) return;
    progress.kanaDrillBest = all;
    saveProgress();  // 寫本機 + 推雲端（已登入時）
  }
  function kdBestKey(s, r, c) { return s + '-' + r + '-' + (c || 'all'); }
  function kdBestFor(s, r, c) {
    const a = kdLoadBest();
    return a[kdBestKey(s, r, c)] || null;
  }
  function kdTrySaveBest(s, r, c, ms, acc) {
    const all = kdLoadBest();
    const k = kdBestKey(s, r, c);
    if (!all[k] || ms < all[k].time) {
      all[k] = { time: ms, accuracy: acc, date: new Date().toISOString().slice(0, 10) };
      kdSaveBest(all);
      return true;
    }
    return false;
  }
  function kdFormatMs(ms) {
    const totalCs = Math.floor(ms / 10);
    const sec = Math.floor(totalCs / 100);
    const cs = totalCs % 100;
    return sec + ' 秒 ' + String(cs).padStart(2, '0');
  }
  function kdPoolFor(script, range) {
    return script === 'hira' ? getHiraganaByRange(range) : getKatakanaByRange(range);
  }

  // 找平假名 ↔ 片假名對應字（用 romaji 比對）
  function kdFindCounterpart(item, script) {
    const other = (script === 'hira') ? getAllKatakana() : getAllHiragana();
    return other.find(k => k.romaji === item.romaji) || null;
  }

  function kdResolveCount() {
    // 回傳實際要用的題數（數字）；'all' 或無效值就取 pool 全數
    const pool = kdPoolFor(kd.script, kd.range);
    const n = parseInt(kd.count, 10);
    if (!isFinite(n) || n <= 0) return pool.length;
    return Math.min(n, pool.length);
  }
  function kdCountLabel() {
    const n = kdResolveCount();
    const pool = kdPoolFor(kd.script, kd.range);
    return (n === pool.length) ? 'all' : String(n);
  }
  function kdUpdateBestDisplay() {
    const el = $('kd-best-time');
    if (!el) return;
    const best = kdBestFor(kd.script, kd.range, kdCountLabel());
    el.innerHTML = best
      ? `🏆 最佳：<b>${kdFormatMs(best.time)}</b>　·　首答 ${best.accuracy}%　·　${best.date}`
      : '尚無紀錄';
    // 順便更新「最多 N 題」hint
    const hint = $('kd-count-hint');
    const pool = kdPoolFor(kd.script, kd.range);
    if (hint) hint.textContent = '（最多 ' + pool.length + ' 題）';
  }

  function kdSwitchMode(mode) {
    $('kana-view-table').classList.toggle('hidden', mode !== 'table');
    $('kana-view-drill').classList.toggle('hidden', mode !== 'drill');
    $$('.kana-mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
    if (mode === 'drill') kdUpdateBestDisplay();
  }

  function kdStart() {
    const pool = kdPoolFor(kd.script, kd.range);
    if (!pool.length) return;
    const n = kdResolveCount();
    kd.queue = shuffle([...pool]).slice(0, n);
    kd.initialCount = n;
    kd.firstTryCorrect = 0;
    kd.wrongSet = new Set();
    kd.startTime = Date.now();

    $('kd-setup').classList.add('hidden');
    $('kd-result').classList.add('hidden');
    $('kd-active').classList.remove('hidden');
    $('kd-last-wrong').classList.add('hidden');

    // pill 最佳
    const best = kdBestFor(kd.script, kd.range, kdCountLabel());
    $('kd-pill-best').textContent = best ? ('最佳：' + kdFormatMs(best.time)) : '最佳：—';

    if (kd.timerId) clearInterval(kd.timerId);
    kd.timerId = setInterval(kdTick, 50);
    kdNextItem();
  }

  function kdTick() {
    const el = $('kd-pill-time');
    if (el) el.textContent = kdFormatMs(Date.now() - kd.startTime);
  }

  function kdNextItem() {
    if (kd.queue.length === 0) { kdFinish(); return; }
    kd.current = kd.queue.shift();
    $('kd-kana').textContent = kd.current.kana;
    const input = $('kd-input');
    input.value = '';
    input.classList.remove('wrong');
    // pills + progress bar
    const remaining = kd.queue.length + 1; // 含當前
    const done = kd.initialCount - remaining;
    $('kd-pill-rest').textContent = '剩餘 ' + remaining + ' 題';
    const pct = Math.max(0, Math.min(100, done / kd.initialCount * 100));
    $('kd-progress-fill').style.width = pct + '%';
    setTimeout(() => input.focus(), 30);
  }

  function kdSubmit() {
    const input = $('kd-input');
    if (!input) return;
    const ans = input.value.trim().toLowerCase();
    if (!ans) return;
    const correct = String(kd.current.romaji).toLowerCase();
    const isCorrect = ans === correct;
    // 不管對錯，都更新「上一題回饋」卡
    kdShowLastAnswer(kd.current, ans, isCorrect);

    if (isCorrect) {
      // 第一次就答對才算進 firstTryCorrect
      if (!kd.wrongSet.has(kd.current.kana)) kd.firstTryCorrect++;
      kdNextItem();
    } else {
      // 答錯：記下、shake、塞回 queue 最後、自動跳下一題
      kd.wrongSet.add(kd.current.kana);
      input.classList.add('wrong');
      setTimeout(() => input.classList.remove('wrong'), 350);
      kd.queue.push(kd.current);
      kdNextItem();
    }
  }

  // 統一的「上一題回饋」卡更新（對綠 / 錯紅、wrong-only 細節自動隱藏）
  function kdShowLastAnswer(item, userAns, isCorrect) {
    const panel = $('kd-last-wrong');
    panel.classList.remove('hidden');
    panel.classList.toggle('is-correct', isCorrect);
    $('kd-lw-title').textContent = isCorrect ? '✓ 答對了！' : '❌ 答錯了！';
    $('kd-lw-kana').textContent = item.kana;
    $('kd-lw-correct').textContent = item.romaji;
    if (!isCorrect) {
      $('kd-lw-user').textContent = userAns || '(空)';
      const cp = kdFindCounterpart(item, kd.script);
      const cpLabel = kd.script === 'hira' ? '片假名' : '平假名';
      $('kd-lw-counter-row').firstChild.textContent = '對應' + cpLabel + '：';
      $('kd-lw-counter').textContent = cp ? cp.kana : '—';
    }
  }

  function kdFinish() {
    if (kd.timerId) { clearInterval(kd.timerId); kd.timerId = null; }
    const elapsed = Date.now() - kd.startTime;
    const acc = Math.round((kd.firstTryCorrect / kd.initialCount) * 100);
    const cKey = kdCountLabel();
    const isNewRecord = kdTrySaveBest(kd.script, kd.range, cKey, elapsed, acc);

    $('kd-active').classList.add('hidden');
    $('kd-result').classList.remove('hidden');
    $('kd-result-time').textContent = kdFormatMs(elapsed);
    $('kd-result-acc').textContent = acc + '%';
    const best = kdBestFor(kd.script, kd.range, cKey);
    $('kd-result-best').textContent = best ? kdFormatMs(best.time) : '--';
    $('kd-new-record').classList.toggle('hidden', !isNewRecord);
  }

  function kdAbort() {
    if (kd.timerId) { clearInterval(kd.timerId); kd.timerId = null; }
    $('kd-active').classList.add('hidden');
    $('kd-result').classList.add('hidden');
    $('kd-setup').classList.remove('hidden');
    kdUpdateBestDisplay();
  }

  function initKanaDrill() {
    // 遷移：舊版本 localStorage 'jp-learn-kana-drill-best' → progress.kanaDrillBest
    try {
      const raw = localStorage.getItem(KD_BEST_LEGACY_KEY);
      if (raw) {
        const legacy = JSON.parse(raw);
        progress.kanaDrillBest = progress.kanaDrillBest || {};
        let migrated = 0;
        for (const k of Object.keys(legacy)) {
          const cur = progress.kanaDrillBest[k];
          if (!cur || (legacy[k] && legacy[k].time < cur.time)) {
            progress.kanaDrillBest[k] = legacy[k];
            migrated++;
          }
        }
        localStorage.removeItem(KD_BEST_LEGACY_KEY);
        if (migrated) saveProgress();
      }
    } catch (e) {}

    // 模式 tab：查表 / 速練
    $$('.kana-mode-tab').forEach(t => {
      t.addEventListener('click', () => kdSwitchMode(t.dataset.mode));
    });
    // 範圍 / 類別 pill
    $$('[data-kd-script]').forEach(b => {
      b.addEventListener('click', () => {
        kd.script = b.dataset.kdScript;
        $$('[data-kd-script]').forEach(x => x.classList.toggle('active', x === b));
        kdUpdateBestDisplay();
      });
    });
    $$('[data-kd-range]').forEach(b => {
      b.addEventListener('click', () => {
        kd.range = b.dataset.kdRange;
        $$('[data-kd-range]').forEach(x => x.classList.toggle('active', x === b));
        kdUpdateBestDisplay();
      });
    });
    // 題數 pill
    $$('[data-kd-count]').forEach(b => {
      b.addEventListener('click', () => {
        kd.count = b.dataset.kdCount;
        $$('[data-kd-count]').forEach(x => x.classList.toggle('active', x === b));
        const inp = $('kd-count-input');
        if (inp) inp.value = '';
        kdUpdateBestDisplay();
      });
    });
    // 題數自訂 input：取消 pill active、套用數字
    $('kd-count-input')?.addEventListener('input', e => {
      const v = parseInt(e.target.value, 10);
      if (isFinite(v) && v > 0) {
        kd.count = String(v);
        $$('[data-kd-count]').forEach(x => x.classList.remove('active'));
      } else {
        kd.count = 'all';
        $$('[data-kd-count]').forEach(x => x.classList.toggle('active', x.dataset.kdCount === 'all'));
      }
      kdUpdateBestDisplay();
    });
    // start / restart / back / abort
    $('kd-start-btn')?.addEventListener('click', kdStart);
    $('kd-restart-btn')?.addEventListener('click', kdStart);
    $('kd-back-btn')?.addEventListener('click', kdAbort);
    $('kd-abort-btn')?.addEventListener('click', () => {
      if (confirm('放棄這一輪？不會被記成最佳紀錄。')) kdAbort();
    });
    // Enter 送出
    $('kd-input')?.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      kdSubmit();
    });
    // 🔊 播放當前假名
    $('kd-audio-btn')?.addEventListener('click', () => {
      if (kd.current) speak(kd.current.kana, 'ja-JP');
    });
    // 測驗頁的「五十音」連結
    $$('.quiz-kana-link').forEach(b => {
      b.addEventListener('click', () => {
        showPage('kana');
        kdSwitchMode('drill');
      });
    });
  }

  // ---- 初始化 ----
  function init() {
    initIntro();
    initSakura();
    initTheme();
    loadProgress();
    bindEvents();
    initKanaDrill();
    initAuth();
    initToast();
    applyRomajiVisibility();
    renderKana('hira-basic');
    renderVocabCategories();
    renderVocabList();
    renderGrammarTagBar();
    renderGrammar();
    renderHomeStats();
    showPage('home');
    handleAuthCallback();
    registerServiceWorker();
  }

  // ---- PWA Service Worker 註冊 ----
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    // 只在 https 或 localhost 才註冊（避免本機 file:// 直開時報錯）
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;
    navigator.serviceWorker.register('service-worker.js').then(reg => {
      // 若有新版本，提示使用者重整
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            // 有更新可用
            showToast('已更新到新版本，重新整理生效', 'info', 8000);
          }
        });
      });
    }).catch(err => console.warn('[SW] register failed:', err));
  }

  // ---- Toast 通知 ----
  let toastTimer = null;
  function showToast(msg, kind, durationMs) {
    const box = $('toast');
    if (!box) return;
    $('toast-msg').textContent = msg;
    $('toast-icon').textContent = kind === 'error' ? '⚠️' : (kind === 'info' ? 'ℹ️' : '✓');
    box.className = 'toast toast-' + (kind || 'success');
    box.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    if (durationMs !== 0) {
      toastTimer = setTimeout(() => box.classList.add('hidden'), durationMs || 5000);
    }
  }
  function initToast() {
    $('toast-close')?.addEventListener('click', () => $('toast').classList.add('hidden'));
  }

  // ---- 處理 email 驗證／密碼重設等 redirect 回來 ----
  function handleAuthCallback() {
    const t = window.__authCallbackType;
    if (!t) return;
    delete window.__authCallbackType;
    if (t === 'signup' || t === 'magiclink') {
      showToast('Email 驗證成功！歡迎使用，學習進度會自動同步到雲端 ☁️', 'success', 7000);
    } else if (t === 'recovery') {
      showToast('身份已驗證，請至「個人設定」設定新密碼', 'info', 8000);
    } else if (t === 'email_change') {
      showToast('Email 變更已生效', 'success', 6000);
    }
  }

  // ---- 整合 Auth ----
  function initAuth() {
    if (!window.AuthState) return;

    // 監聽登入狀態變化
    window.AuthState.onChange(async (user) => {
      const authArea = $('auth-area');
      const userMenu = $('user-menu');
      if (user) {
        // 已登入
        authArea.classList.add('hidden');
        userMenu.classList.remove('hidden');
        $('user-name').textContent = user.displayName;
        $('user-avatar').textContent = (user.displayName || 'U').charAt(0).toUpperCase();
        $('user-dropdown-email').textContent = user.email;
        updateSyncStatus('syncing');

        // 拉雲端進度合併
        try {
          const cloud = await window.AuthState.fetchProgress();
          if (cloud && cloud.progress && Object.keys(cloud.progress).length > 0) {
            progress = mergeProgress(progress, cloud.progress);
          }
          saveProgress(); // 把合併結果推回雲端
          // 重繪
          renderVocabList();
          renderGrammar();
          renderHomeStats();
          renderUserDropdownEstimate();
          if (state.currentPage === 'review') renderReview();
          if (state.currentPage === 'quiz') renderDailyChallengeCard();
          if (state.currentPage === 'leaderboard') {
            lbCache = null;
            renderLeaderboard();
          }
          updateSyncStatus('synced');
        } catch (e) {
          console.error('同步失敗', e);
          updateSyncStatus('offline');
        }
      } else {
        // 未登入
        authArea.classList.remove('hidden');
        userMenu.classList.add('hidden');
        $('user-dropdown').classList.add('hidden');
        updateSyncStatus('offline');
      }
    });

    // ---- Modal 控制 ----
    const modal = $('auth-modal');
    const tabs = $$('.auth-tab');
    const form = $('auth-form');
    const nameField = document.querySelector('.auth-field-name');
    const errorBox = $('auth-error');
    const submitBtn = $('auth-submit');
    let currentMode = 'signin';

    function openModal() {
      modal.classList.remove('hidden');
      $('auth-email').focus();
    }
    function closeModal() {
      modal.classList.add('hidden');
      form.reset();
      errorBox.classList.add('hidden');
    }
    function switchMode(mode) {
      currentMode = mode;
      tabs.forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
      if (mode === 'signup') {
        nameField.classList.remove('hidden');
        submitBtn.textContent = '註冊';
        $('auth-password').autocomplete = 'new-password';
        // 進註冊頁時關閉「已寄驗證信」橫幅
        $('auth-info-banner').classList.add('hidden');
      } else {
        nameField.classList.add('hidden');
        submitBtn.textContent = '登入';
        $('auth-password').autocomplete = 'current-password';
      }
      errorBox.classList.add('hidden');
    }

    $('auth-signin-btn').addEventListener('click', () => { switchMode('signin'); openModal(); });
    $('auth-modal-close').addEventListener('click', closeModal);
    $('auth-modal-backdrop').addEventListener('click', closeModal);
    tabs.forEach(t => t.addEventListener('click', () => switchMode(t.dataset.mode)));

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = $('auth-email').value.trim();
      const pass = $('auth-password').value;
      const name = $('auth-name').value.trim();
      errorBox.classList.add('hidden');
      submitBtn.disabled = true;
      submitBtn.textContent = '處理中…';
      try {
        if (currentMode === 'signup') {
          await window.AuthState.signUp(email, pass, name);
          // 切回登入分頁、顯示「驗證信已寄出」橫幅
          switchMode('signin');
          showInfoBanner(email);
          // 清空密碼欄位，避免讓使用者誤以為輸入完就能登入
          $('auth-password').value = '';
        } else {
          await window.AuthState.signIn(email, pass);
          closeModal();
        }
      } catch (err) {
        errorBox.textContent = translateAuthError(err.message || String(err));
        errorBox.classList.remove('hidden');
        errorBox.classList.remove('auth-success');
      } finally {
        submitBtn.disabled = false;
        // 永遠以「當前模式」為準設定按鈕文字
        submitBtn.textContent = currentMode === 'signup' ? '註冊' : '登入';
      }
    });

    function showInfoBanner(email) {
      const banner = $('auth-info-banner');
      $('auth-info-email').textContent = email;
      banner.dataset.email = email;
      banner.classList.remove('hidden');
    }

    // 關閉橫幅
    $('auth-info-close').addEventListener('click', () => {
      $('auth-info-banner').classList.add('hidden');
    });

    // 重新寄驗證信
    $('auth-info-resend').addEventListener('click', async () => {
      const banner = $('auth-info-banner');
      const email = banner.dataset.email || $('auth-email').value.trim();
      if (!email) return;
      const btn = $('auth-info-resend');
      const orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = '寄送中…';
      try {
        await window.AuthState.resendVerification(email);
        btn.textContent = '✓ 已重新寄出';
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 4000);
      } catch (err) {
        btn.textContent = orig;
        btn.disabled = false;
        errorBox.textContent = translateAuthError(err.message || '寄送失敗');
        errorBox.classList.remove('hidden');
      }
    });

    // ---- 個人設定 Modal ----
    initProfileModal();

    // 使用者選單下拉
    $('user-menu-btn').addEventListener('click', () => {
      $('user-dropdown').classList.toggle('hidden');
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#user-menu')) {
        $('user-dropdown')?.classList.add('hidden');
      }
    });

    // 登出
    $('btn-signout').addEventListener('click', async () => {
      try {
        await window.AuthState.flush(progress);
      } catch (e) {}
      await window.AuthState.signOut();
    });
  }

  // ---- 個人設定 Modal ----
  function initProfileModal() {
    const modal = $('profile-modal');
    const msgBox = $('profile-msg');

    function showMsg(text, kind) {
      msgBox.textContent = text;
      msgBox.className = 'profile-msg ' + (kind === 'error' ? 'profile-msg-error' : 'profile-msg-success');
      msgBox.classList.remove('hidden');
      if (kind !== 'error') {
        setTimeout(() => msgBox.classList.add('hidden'), 4000);
      }
    }

    function openProfile() {
      if (!window.AuthState || !window.AuthState.user) return;
      $('profile-name').value = window.AuthState.user.displayName || '';
      $('profile-email').value = window.AuthState.user.email || '';
      $('profile-password').value = '';
      msgBox.classList.add('hidden');
      modal.classList.remove('hidden');
    }
    function closeProfile() { modal.classList.add('hidden'); }

    $('btn-profile').addEventListener('click', () => {
      $('user-dropdown').classList.add('hidden');
      openProfile();
    });
    $('profile-modal-close').addEventListener('click', closeProfile);
    $('profile-modal-backdrop').addEventListener('click', closeProfile);

    // 儲存暱稱
    document.querySelector('[data-action="save-name"]').addEventListener('click', async () => {
      const name = $('profile-name').value.trim();
      if (!name) { showMsg('暱稱不能空白', 'error'); return; }
      try {
        await window.AuthState.updateDisplayName(name);
        showMsg('✓ 暱稱已更新');
        $('user-name').textContent = name;
        $('user-avatar').textContent = name.charAt(0).toUpperCase();
      } catch (e) {
        showMsg('更新失敗：' + translateAuthError(e.message), 'error');
      }
    });

    // 變更 Email
    document.querySelector('[data-action="save-email"]').addEventListener('click', async () => {
      const email = $('profile-email').value.trim();
      if (!email || !email.includes('@')) { showMsg('請輸入有效的 Email', 'error'); return; }
      if (email === window.AuthState.user.email) { showMsg('與目前的 Email 相同', 'error'); return; }
      if (!confirm('確定要變更 Email 為 ' + email + ' 嗎？\n變更後會寄驗證信到新 Email，點信中連結才會生效。')) return;
      try {
        await window.AuthState.updateEmail(email);
        showMsg('✓ 驗證信已寄出，請至「新 Email」收信後點連結完成變更');
      } catch (e) {
        showMsg('變更失敗：' + translateAuthError(e.message), 'error');
      }
    });

    // 變更密碼
    document.querySelector('[data-action="save-password"]').addEventListener('click', async () => {
      const pw = $('profile-password').value;
      if (!pw || pw.length < 6) { showMsg('密碼至少要 6 個字元', 'error'); return; }
      try {
        await window.AuthState.updatePassword(pw);
        $('profile-password').value = '';
        showMsg('✓ 密碼已更新');
      } catch (e) {
        showMsg('變更失敗：' + translateAuthError(e.message), 'error');
      }
    });

    // 刪除帳號
    $('profile-delete').addEventListener('click', async () => {
      const email = window.AuthState.user.email;
      const typed = prompt('⚠️ 危險動作！\n\n刪除帳號會清除：\n- 雲端學習進度（SRS、錯題、收藏、每日紀錄）\n- 帳號本身（無法復原）\n\n請輸入你的 Email 確認：\n' + email);
      if (typed === null) return;
      if (typed.trim() !== email) { showMsg('Email 不符，已取消', 'error'); return; }
      try {
        await window.AuthState.deleteAccount();
        alert('帳號已刪除。');
        location.reload();
      } catch (e) {
        showMsg('刪除失敗：' + translateAuthError(e.message), 'error');
      }
    });
  }

  function translateAuthError(msg) {
    if (/Invalid login/i.test(msg)) return 'Email 或密碼錯誤';
    if (/User already registered/i.test(msg)) return '此 Email 已註冊過，請改用登入';
    if (/Password should be at least/i.test(msg)) return '密碼至少要 6 個字元';
    if (/rate limit/i.test(msg)) return '太多次嘗試，請稍後再試';
    if (/Email not confirmed/i.test(msg)) return 'Email 尚未驗證，請至信箱確認';
    return msg;
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
