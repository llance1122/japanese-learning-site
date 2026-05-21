// === 文章查字工具 ===
// 把日文文章 token 化，標已學 / 未學
// 對外 API：
//   TextAnalyzer.analyze(text) → [{ surface, type, vocab? }, ...]
//   type：'vocab'（詞庫命中）/ 'particle'（助詞 / 助動詞）/ 'punct'（標點）
//         / 'unknown'（日文字但詞庫沒有）/ 'other'（英文、數字等）
//   TextAnalyzer.stats(tokens)  → 統計

(function () {
  'use strict';

  // 助詞 / 助動詞清單（長→短排序，longest-match）
  const PARTICLE_MULTI = [
    'ませんでした', 'ますでしょうか', 'ましょうか',
    'でしょうか', 'ましたか', 'でしたか',
    'ましょう', 'ません', 'ました', 'でした',
    'ばかり', 'までに', 'までは', 'までも',
    'くらい', 'ぐらい', 'けれども',
    'ながら', 'つつ', 'てから',
    'よりも', 'までも', 'までに',
    'です', 'ます', 'だった',
    'まで', 'から', 'より', 'こそ', 'しか', 'だけ', 'でも',
    'ほど', 'など', 'なら', 'けど', 'のに', 'ので', 'ても', 'たり',
    'では', 'には', 'にも', 'とは', 'とも',
    'ちゃう', 'じゃう'
  ].sort((a, b) => b.length - a.length);

  // 單字助詞
  const PARTICLE_SINGLE = new Set('はがをにでとのもやかへよねわさぞぜしね');

  let jpIndex = null;   // Map<首字, [vocab entries sorted by jp.length desc]>
  let kanaIndex = null;

  function buildIndex() {
    if (jpIndex) return;
    jpIndex = new Map();
    kanaIndex = new Map();
    for (const v of VOCAB_DATA) {
      // 跳過會跟助詞撞的單音節純假名詞（如「は」=歯、「が」=蛾）
      if (v.jp.length === 1 && PARTICLE_SINGLE.has(v.jp)) continue;
      const jk = v.jp[0];
      if (!jpIndex.has(jk)) jpIndex.set(jk, []);
      jpIndex.get(jk).push(v);

      if (v.kana && v.kana !== v.jp && !(v.kana.length === 1 && PARTICLE_SINGLE.has(v.kana))) {
        const kk = v.kana[0];
        if (!kanaIndex.has(kk)) kanaIndex.set(kk, []);
        kanaIndex.get(kk).push(v);
      }
    }
    for (const arr of jpIndex.values())   arr.sort((a, b) => b.jp.length - a.jp.length);
    for (const arr of kanaIndex.values()) arr.sort((a, b) => b.kana.length - a.kana.length);
  }

  function isJapaneseChar(ch) {
    return /[぀-ゟ゠-ヿ一-鿿㐀-䶿々ヶ]/.test(ch);
  }
  function isPunct(ch) {
    return /[\s\n\r\t、。，．！？!?；;：:「」『』（）()【】\[\]…—~〜・]/.test(ch);
  }

  // 動詞所有變化形（含詞典形 + ます 衍生）
  function verbForms(verb) {
    if (!window.VerbConj || verb.cat !== '動詞') return [verb.jp];
    const forms = ['masu', 'nai', 'ta', 'te', 'potential', 'volitional', 'ba'];
    const out = [verb.jp];
    if (verb.kana !== verb.jp) out.push(verb.kana);
    const masu = window.VerbConj.conjugate(verb, 'masu');
    if (masu) {
      const stem = masu.jp.slice(0, -2);
      // 連用形 / masu 衍生
      out.push(stem,
               stem + 'ます', stem + 'ました', stem + 'ません',
               stem + 'ませんでした', stem + 'ましょう',
               // たい / ながら / なさい / たがる
               stem + 'たい', stem + 'たく', stem + 'たくない', stem + 'たかった',
               stem + 'ながら', stem + 'なさい', stem + 'たがる', stem + 'たがって');
    }
    for (const f of forms) {
      const c = window.VerbConj.conjugate(verb, f);
      if (c) {
        out.push(c.jp);
        if (c.kana !== c.jp) out.push(c.kana);
      }
    }
    // 排序最長 first
    return out.sort((a, b) => b.length - a.length);
  }

  // い形容詞變化（去「い」+ 詞尾）
  function adjIForms(v) {
    if (!v.jp.endsWith('い')) return [v.jp];
    const stem = v.jp.slice(0, -1);
    return [
      v.jp, stem + 'い', stem + 'かった', stem + 'くて',
      stem + 'くない', stem + 'くなかった', stem + 'く',
      stem + 'ければ', stem + 'すぎる'
    ].sort((a, b) => b.length - a.length);
  }

  function isIAdj(v) {
    // cat='い形容詞' 或 cat='形容詞' 且 jp 結尾「い」
    return (v.cat === 'い形容詞') || (v.cat === '形容詞' && v.jp.endsWith('い'));
  }

  function inflectionForms(v) {
    if (v.cat === '動詞' && window.VerbConj) return verbForms(v);
    if (isIAdj(v)) return adjIForms(v);
    return [v.jp];
  }

  // 對單一 vocab entry 嘗試在 text[i:] 找最長匹配（含變化形）
  function matchSurface(v, text, i, useKana) {
    const dictForm = useKana ? v.kana : v.jp;
    let best = null;
    if (text.startsWith(dictForm, i)) best = dictForm;
    // 試所有變化形，取最長
    const forms = inflectionForms(v);
    for (const f of forms) {
      if (text.startsWith(f, i) && (!best || f.length > best.length)) best = f;
    }
    return best;
  }

  function analyze(text) {
    buildIndex();
    const tokens = [];
    let i = 0;
    const N = text.length;

    while (i < N) {
      const ch = text[i];

      if (isPunct(ch)) {
        tokens.push({ surface: ch, type: 'punct' });
        i++;
        continue;
      }

      // 1) 試多字助詞 / 助動詞
      let matchedParticle = null;
      for (const p of PARTICLE_MULTI) {
        if (text.startsWith(p, i)) { matchedParticle = p; break; }
      }
      if (matchedParticle) {
        tokens.push({ surface: matchedParticle, type: 'particle' });
        i += matchedParticle.length;
        continue;
      }

      // 2) 試 jp + kana 字典，挑「最長 surface」獲勝
      let bestVocab = null, bestSurface = null;
      const cands = jpIndex.get(ch);
      if (cands) {
        for (const v of cands) {
          const s = matchSurface(v, text, i, false);
          if (s && (!bestSurface || s.length > bestSurface.length)) {
            bestVocab = v; bestSurface = s;
          }
        }
      }
      const kcands = kanaIndex.get(ch);
      if (kcands) {
        for (const v of kcands) {
          const s = matchSurface(v, text, i, true);
          if (s && (!bestSurface || s.length > bestSurface.length)) {
            bestVocab = v; bestSurface = s;
          }
        }
      }
      if (bestSurface) {
        tokens.push({ surface: bestSurface, type: 'vocab', vocab: bestVocab });
        i += bestSurface.length;
        continue;
      }

      // 3) 單字助詞
      if (PARTICLE_SINGLE.has(ch)) {
        tokens.push({ surface: ch, type: 'particle' });
        i++;
        continue;
      }

      // 4) 日文字但詞庫沒中
      if (isJapaneseChar(ch)) {
        tokens.push({ surface: ch, type: 'unknown' });
        i++;
        continue;
      }

      // 5) 其他（英文、數字等）— 合併連續
      let j = i;
      while (j < N && !isJapaneseChar(text[j]) && !isPunct(text[j])) j++;
      tokens.push({ surface: text.slice(i, j), type: 'other' });
      i = j;
    }
    return tokens;
  }

  function stats(tokens) {
    const s = {
      total: 0, vocab: 0, unknown: 0, particle: 0,
      byLevel: { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 }
    };
    for (const t of tokens) {
      if (t.type === 'vocab') {
        s.total++; s.vocab++;
        if (s.byLevel[t.vocab.level] != null) s.byLevel[t.vocab.level]++;
      } else if (t.type === 'unknown') {
        s.total++; s.unknown++;
      } else if (t.type === 'particle') {
        s.particle++;
      }
    }
    return s;
  }

  window.TextAnalyzer = { analyze, stats };
})();
