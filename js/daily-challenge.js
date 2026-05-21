// === Daily Challenge ===
// 每天用日期當 seed 跑 PRNG → 全網用戶當天看到完全相同的 10 題。
// 對外 API：
//   DailyChallenge.todayDate()        回傳 'YYYY-MM-DD'
//   DailyChallenge.getTodayChallenge() → { date, items: [{ type, target }, ...] }
//   DailyChallenge.getChallenge(date)  → 指定日期的題組（測試／回顧用）

(function () {
  'use strict';

  // mulberry32：小、可重現、品質夠
  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function todayDate() {
    const d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function dateToSeed(dateStr) {
    // 'YYYY-MM-DD' → 純數字 (e.g. 20260521)
    return parseInt(dateStr.replace(/-/g, ''), 10);
  }

  function pickSeeded(arr, n, rand) {
    if (!arr || !arr.length) return [];
    const target = Math.min(n, arr.length);
    const used = new Set();
    const picked = [];
    let guard = 0;
    while (picked.length < target && guard < target * 50) {
      const idx = Math.floor(rand() * arr.length);
      if (!used.has(idx)) {
        used.add(idx);
        picked.push(arr[idx]);
      }
      guard++;
    }
    return picked;
  }

  // 題目組成（合計 10 題、橫跨 N5–N1 全 pool 抽）
  //   3 漢字読み（含漢字單字 → 讀音）
  //   2 單字 日 → 中
  //   2 聽音 → 選漢字
  //   2 文法
  //   1 平假名 → 羅馬拼音
  const COMPOSITION = [
    { type: 'vocab-kanji-to-kana', count: 3 },
    { type: 'vocab-jp-to-cn',      count: 2 },
    { type: 'vocab-listening-jp',  count: 2 },
    { type: 'grammar',             count: 2 },
    { type: 'hira-to-romaji',      count: 1 }
  ];
  const TOTAL_QUESTIONS = COMPOSITION.reduce((s, c) => s + c.count, 0);

  function buildChallenge(dateStr) {
    const seed = dateToSeed(dateStr);
    const rand = mulberry32(seed);

    const items = [];
    for (const sec of COMPOSITION) {
      let pool;
      if (sec.type === 'vocab-kanji-to-kana') {
        pool = VOCAB_DATA.filter(v => v.jp !== v.kana && /[一-鿿]/.test(v.jp));
      } else if (sec.type === 'vocab-jp-to-cn') {
        pool = VOCAB_DATA;
      } else if (sec.type === 'vocab-listening-jp') {
        pool = VOCAB_DATA.filter(v => v.kana && v.kana.length >= 2);
      } else if (sec.type === 'grammar') {
        pool = GRAMMAR_DATA;
      } else if (sec.type === 'hira-to-romaji') {
        pool = getAllHiragana();
      } else {
        continue;
      }
      const picked = pickSeeded(pool, sec.count, rand);
      for (const p of picked) {
        items.push({ type: sec.type, target: p });
      }
    }

    // Fisher-Yates shuffle（一樣用 seeded rand，全網順序也一致）
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  window.DailyChallenge = {
    TOTAL_QUESTIONS,
    todayDate,
    getTodayChallenge() {
      const date = todayDate();
      return { date, items: buildChallenge(date) };
    },
    getChallenge(dateStr) {
      return { date: dateStr, items: buildChallenge(dateStr) };
    }
  };
})();
