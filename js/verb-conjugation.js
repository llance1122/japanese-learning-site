// === 動詞變化引擎 ===
// 對外 API：
//   VerbConj.detectGroup(verb)     → 'godan' | 'ichidan' | 'irregular'
//   VerbConj.conjugate(verb, form) → { jp, kana }
//   VerbConj.FORMS                 → 變化形清單
//   VerbConj.getVerbPool()         → VOCAB_DATA 中可變化的動詞

(function () {
  'use strict';

  // 看起來像 ichidan（結尾 -iru/-eru）但其實是 godan 的常見動詞
  // 列表只放 N5–N3 常見、確認過的；未列入者預設 ichidan。
  const GODAN_LOOKING_LIKE_ICHIDAN = new Set([
    // -る前是 i 段（看起來像 ichidan，實為 godan）
    '帰る', '切る', '知る', '入る', '走る', '要る', '握る', '限る', '滑る',
    '蹴る', '混じる', '齧る', '罵る', '茂る', '湿る', '迸る', '迫る', '散る',
    '参る', '練る', '焦る', '勝る', '滅入る', '蘇る', '抓る', '捻る', '凍る',
    '滲む', '減る', '殴る', '怒る', '黙る',
    // -る前是 e 段（看起來像 ichidan，實為 godan）
    '帰る', '減る', '滑る', '焦る', '練る', '勝る', '蘇る', '茂る', '湿る',
    '滅入る', '迫る', '蹴る'
  ]);

  // 變化形清單（含中文標籤、英文 key）
  const FORMS = [
    { key: 'masu',      label: 'ます形（禮貌）',    explain: '禮貌肯定現在式' },
    { key: 'nai',       label: 'ない形（否定）',    explain: '常體否定' },
    { key: 'ta',        label: 'た形（過去）',     explain: '常體過去式' },
    { key: 'te',        label: 'て形（連接）',     explain: '連接 / 命令 / 請求' },
    { key: 'potential', label: '可能形（能…）',    explain: '能夠做某事' },
    { key: 'volitional',label: '意向形（…吧）',    explain: '邀約 / 提議' },
    { key: 'ba',        label: '條件形 ば（如果）', explain: '條件假設' }
  ];

  // ---- 假名工具 ----
  // 平假名 う段對應的 5 段 (a/i/u/e/o)
  // 例：う → わ(a)/い(i)/う(u)/え(e)/お(o)
  //     く → か/き/く/け/こ
  const GODAN_TABLE = {
    'う': ['わ','い','う','え','お'],
    'く': ['か','き','く','け','こ'],
    'ぐ': ['が','ぎ','ぐ','げ','ご'],
    'す': ['さ','し','す','せ','そ'],
    'つ': ['た','ち','つ','て','と'],
    'ぬ': ['な','に','ぬ','ね','の'],
    'ぶ': ['ば','び','ぶ','べ','ぼ'],
    'む': ['ま','み','む','め','も'],
    'る': ['ら','り','る','れ','ろ']
  };

  // て / た 音便對應（godan）
  const TE_TA = {
    'う': ['って','った'],
    'つ': ['って','った'],
    'る': ['って','った'],
    'く': ['いて','いた'],
    'ぐ': ['いで','いだ'],
    'す': ['して','した'],
    'ぬ': ['んで','んだ'],
    'ぶ': ['んで','んだ'],
    'む': ['んで','んだ']
  };

  // ---- 群組判斷 ----
  function detectGroup(verb) {
    const jp = verb.jp;
    const kana = verb.kana;
    if (!kana || kana.length < 2) return null;

    // 不規則
    if (jp === 'する' || kana === 'する') return 'irregular-suru';
    if (jp === '来る' || kana === 'くる') return 'irregular-kuru';
    // 結尾「する」的複合動詞（勉強する、運動する…）視同 suru
    if (kana.length > 2 && kana.endsWith('する')) return 'irregular-suru-compound';

    const last = kana[kana.length - 1];
    if (!GODAN_TABLE[last]) return null;  // 不以う段假名結尾 → 不是動詞

    // -iru / -eru 結尾預設 ichidan，例外查表
    if (last === 'る') {
      const before = kana[kana.length - 2];
      const isI = 'いきしちにひみりぎじぢびぴ'.includes(before);
      const isE = 'えけせてねへめれげぜでべぺ'.includes(before);
      if (isI || isE) {
        if (GODAN_LOOKING_LIKE_ICHIDAN.has(jp)) return 'godan';
        return 'ichidan';
      }
    }
    return 'godan';
  }

  // ---- 變化引擎 ----
  // 工具：移除最後一個假名
  function dropLast(s) { return s.slice(0, -1); }

  function conjGodan(kana, form) {
    const last = kana[kana.length - 1];
    const stem = dropLast(kana);
    const row = GODAN_TABLE[last]; // [a,i,u,e,o]
    if (!row) return kana;

    if (form === 'masu')       return stem + row[1] + 'ます';
    if (form === 'nai')        return stem + row[0] + 'ない';
    if (form === 'potential')  return stem + row[3] + 'る';
    if (form === 'volitional') return stem + row[4] + 'う';
    if (form === 'ba')         return stem + row[3] + 'ば';
    if (form === 'te' || form === 'ta') {
      // 行く 特例
      if (kana === 'いく') return form === 'te' ? 'いって' : 'いった';
      const pair = TE_TA[last];
      if (!pair) return kana;
      return stem + (form === 'te' ? pair[0] : pair[1]);
    }
    return kana;
  }

  function conjIchidan(kana, form) {
    const stem = dropLast(kana);
    if (form === 'masu')       return stem + 'ます';
    if (form === 'nai')        return stem + 'ない';
    if (form === 'ta')         return stem + 'た';
    if (form === 'te')         return stem + 'て';
    if (form === 'potential')  return stem + 'られる';
    if (form === 'volitional') return stem + 'よう';
    if (form === 'ba')         return stem + 'れば';
    return kana;
  }

  function conjSuru(form) {
    const map = {
      masu: 'します', nai: 'しない', ta: 'した', te: 'して',
      potential: 'できる', volitional: 'しよう', ba: 'すれば'
    };
    return map[form] || 'する';
  }
  function conjSuruCompound(kana, form) {
    // 勉強する → 勉強します
    const stem = kana.slice(0, -2); // 去掉「する」
    return stem + conjSuru(form);
  }
  function conjKuru(form) {
    // 平假名形（漢字寫法另算）
    const map = {
      masu: 'きます', nai: 'こない', ta: 'きた', te: 'きて',
      potential: 'こられる', volitional: 'こよう', ba: 'くれば'
    };
    return map[form] || 'くる';
  }

  // 把漢字 jp 同步替換尾巴（如 食べる → 食べます）
  function applyToJp(jp, oldEnding, newEnding) {
    if (jp.endsWith(oldEnding)) return jp.slice(0, -oldEnding.length) + newEnding;
    return null;
  }

  function conjugate(verb, form) {
    const group = detectGroup(verb);
    if (!group) return null;
    const kana = verb.kana;
    const jp = verb.jp;

    let kanaResult;
    if (group === 'godan')               kanaResult = conjGodan(kana, form);
    else if (group === 'ichidan')        kanaResult = conjIchidan(kana, form);
    else if (group === 'irregular-suru') kanaResult = conjSuru(form);
    else if (group === 'irregular-suru-compound') kanaResult = conjSuruCompound(kana, form);
    else if (group === 'irregular-kuru') kanaResult = conjKuru(form);
    else return null;

    // jp 同步：用尾巴 diff 替換
    // 取 verb.kana 跟 kanaResult 共同的 prefix 長度，但更穩的做法是用「字典形 → 變化形」的固定 suffix 差分
    // 簡單版：找 kana 跟 kanaResult 的公共前綴 → 用 jp 的對應前綴 + 新後綴
    const commonLen = commonPrefixLen(kana, kanaResult);
    const newSuffix = kanaResult.slice(commonLen);
    const droppedKanaTail = kana.slice(commonLen);

    // 假設 jp 的尾巴假名跟 kana 的尾巴一致（這是日文構詞慣例：漢字後接送假名）
    let jpResult;
    if (jp.endsWith(droppedKanaTail) && droppedKanaTail.length > 0) {
      jpResult = jp.slice(0, jp.length - droppedKanaTail.length) + newSuffix;
    } else if (jp === kana) {
      // 純假名動詞（する、来る 寫法已正規化為漢字 / 平假名）
      jpResult = kanaResult;
    } else {
      // fallback：jp 與 kana 不一致時，直接用 kana 結果
      jpResult = kanaResult;
    }
    return { jp: jpResult, kana: kanaResult };
  }

  function commonPrefixLen(a, b) {
    const len = Math.min(a.length, b.length);
    let i = 0;
    while (i < len && a[i] === b[i]) i++;
    return i;
  }

  // ---- 從 VOCAB_DATA 抽動詞 pool ----
  function getVerbPool(level) {
    if (typeof VOCAB_DATA === 'undefined') return [];
    return VOCAB_DATA.filter(v => {
      if (v.cat !== '動詞') return false;
      if (level && level !== 'all' && v.level !== level) return false;
      // 必須要能判斷出 group
      return detectGroup(v) !== null;
    });
  }

  window.VerbConj = {
    FORMS,
    detectGroup,
    conjugate,
    getVerbPool
  };
})();
