#!/usr/bin/env node
// === 資料完整性測試 ===
// 用法：node tests/data-sanity.js
// CI / 部署前一定要跑。0=通過、1=失敗
//
// 這個檔案是 Session 1–7 vocab.js 大規模錯置事故後加的護欄。
// 任何修改 vocab.js / grammar.js 後，都應該先跑 `node tests/data-sanity.js`
// 通過了再 `az webapp up --html`。

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const C = {
  reset: '\x1b[0m', red: '\x1b[31m', green: '\x1b[32m',
  yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m'
};

const results = { pass: 0, fail: 0, warn: 0 };
function pass(msg) { console.log(`  ${C.green}✓${C.reset} ${msg}`); results.pass++; }
function fail(msg) { console.log(`  ${C.red}✗${C.reset} ${msg}`); results.fail++; }
function warn(msg) { console.log(`  ${C.yellow}⚠${C.reset} ${msg}`); results.warn++; }
function section(name) { console.log(`\n${C.bold}${C.cyan}▸ ${name}${C.reset}`); }

// ============================================================
// 1. 結構檢查：vocab.js
// ============================================================
section('vocab.js — 結構');

const vocabSrc = fs.readFileSync(path.join(ROOT, 'js/vocab.js'), 'utf8');

// 1a. 必須能 eval、必須匯出 VOCAB_DATA
let VOCAB_DATA;
try {
  const fn = new Function(vocabSrc + '; return VOCAB_DATA;');
  VOCAB_DATA = fn();
  if (!Array.isArray(VOCAB_DATA)) {
    fail('VOCAB_DATA 不是陣列');
  } else {
    pass(`VOCAB_DATA 是陣列、共 ${VOCAB_DATA.length} 筆`);
  }
} catch (e) {
  fail(`vocab.js 語法錯誤：${e.message}`);
  process.exit(1);
}

// 1b. 偵測「多個 ];」事故（避免 Session 1–7 / Phase 4 那種錯誤）
// VOCAB_DATA 是檔內唯一的 top-level 陣列，所以應該只有一個 `];` 結束它
const topLevelCloseBrackets = vocabSrc.match(/^\];/gm) || [];
if (topLevelCloseBrackets.length === 1) {
  pass('檔案只有一個頂層 `];`（沒有錯置 bug）');
} else {
  fail(`檔案有 ${topLevelCloseBrackets.length} 個頂層 \`];\` — VOCAB_DATA 陣列可能被截斷或重複`);
}

// 1d. 必須有 VOCAB_DATA_END_MARKER 錨點（給未來插入腳本用，防止再次錯置）
if (vocabSrc.includes('VOCAB_DATA_END_MARKER')) {
  pass('VOCAB_DATA_END_MARKER 錨點存在');
} else {
  fail('找不到 VOCAB_DATA_END_MARKER 錨點 — 未來插入腳本可能找錯位置');
}

// 1c. regex 計數 vs eval 計數 — 兩者應該相符
const regexCount = (vocabSrc.match(/level:'N[1-5]'/g) || []).length;
if (regexCount === VOCAB_DATA.length) {
  pass(`regex 計數 ${regexCount} = eval 計數 ${VOCAB_DATA.length}（沒有 entry 落在 array 外）`);
} else {
  fail(`regex 計數 ${regexCount} ≠ eval 計數 ${VOCAB_DATA.length} — 有 ${Math.abs(regexCount - VOCAB_DATA.length)} 筆 entry 不在 VOCAB_DATA 內！`);
}

// ============================================================
// 2. 內容檢查：vocab.js
// ============================================================
section('vocab.js — 內容');

const REQUIRED_FIELDS = ['jp', 'kana', 'romaji', 'cn', 'cat', 'level'];
const LEVELS = ['N1', 'N2', 'N3', 'N4', 'N5'];

// 2a. 每筆都要有 6 個欄位、level 合法
const fieldErrors = [];
const levelErrors = [];
VOCAB_DATA.forEach((e, i) => {
  for (const f of REQUIRED_FIELDS) {
    if (e[f] == null) {
      fieldErrors.push(`第 ${i} 筆缺欄位 "${f}"：${JSON.stringify(e)}`);
      break;
    }
  }
  if (e.level && !LEVELS.includes(e.level)) {
    levelErrors.push(`第 ${i} 筆 level "${e.level}" 不合法：${JSON.stringify(e)}`);
  }
});
if (fieldErrors.length === 0) pass('所有 entry 都有完整的 6 個欄位');
else { fail(`${fieldErrors.length} 筆 entry 缺欄位`); fieldErrors.slice(0, 5).forEach(e => console.log('    ' + e)); }

if (levelErrors.length === 0) pass('所有 entry 的 level 都合法（N1~N5）');
else { fail(`${levelErrors.length} 筆 entry level 不合法`); levelErrors.slice(0, 5).forEach(e => console.log('    ' + e)); }

// 2b. 各等級數量（資訊）
section('vocab.js — 數量分布');
const byLevel = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
for (const e of VOCAB_DATA) if (byLevel[e.level] !== undefined) byLevel[e.level]++;
console.log('  N5:', byLevel.N5, '/ N4:', byLevel.N4, '/ N3:', byLevel.N3, '/ N2:', byLevel.N2, '/ N1:', byLevel.N1);
console.log('  合計：' + VOCAB_DATA.length);

// 2c. (jp, cn, level) 完全重複
const seen = new Map();
const exactDups = [];
VOCAB_DATA.forEach((e, i) => {
  const k = `${e.jp}|${e.cn}|${e.level}`;
  if (seen.has(k)) exactDups.push({ key: k, first: seen.get(k), second: i });
  else seen.set(k, i);
});
if (exactDups.length === 0) pass('沒有 (jp, cn, level) 完全重複的 entry');
else { fail(`${exactDups.length} 筆完全重複`); exactDups.slice(0, 5).forEach(d => console.log(`    ${d.key} — entries #${d.first}, #${d.second}`)); }

// 2d. 同 jp 跨多等級（資訊提示，非錯誤）
const byJp = new Map();
for (const e of VOCAB_DATA) {
  if (!byJp.has(e.jp)) byJp.set(e.jp, new Set());
  byJp.get(e.jp).add(e.level);
}
const multiLevelJp = [...byJp].filter(([_, ls]) => ls.size > 1);
if (multiLevelJp.length === 0) pass('沒有同 jp 跨多等級');
else warn(`${multiLevelJp.length} 個 jp 跨多等級（可能是不同義；若不是有意可清理）`);

// ============================================================
// 3. 結構檢查：grammar.js
// ============================================================
section('grammar.js — 結構');

const grSrc = fs.readFileSync(path.join(ROOT, 'js/grammar.js'), 'utf8');

let GRAMMAR_DATA;
try {
  const fn = new Function(grSrc + '; return GRAMMAR_DATA;');
  GRAMMAR_DATA = fn();
  if (!Array.isArray(GRAMMAR_DATA)) fail('GRAMMAR_DATA 不是陣列');
  else pass(`GRAMMAR_DATA 是陣列、共 ${GRAMMAR_DATA.length} 條`);
} catch (e) {
  fail(`grammar.js 語法錯誤：${e.message}`);
  process.exit(1);
}

// grammar.js 內 `];` 比較多（每個 examples 陣列都有），不能用「只有一個 ];」的規則。
// 但「頂層 ];」（行首頂格）只能有一個（GRAMMAR_DATA 結尾）
const grTopLevelClose = grSrc.match(/^\];/gm) || [];
if (grTopLevelClose.length === 1) {
  pass('grammar.js 只有一個頂層 `];`');
} else {
  fail(`grammar.js 有 ${grTopLevelClose.length} 個頂層 \`];\` — GRAMMAR_DATA 可能被截斷或重複`);
}

// ============================================================
// 4. 內容檢查：grammar.js
// ============================================================
section('grammar.js — 內容');

const GR_REQUIRED = ['pattern', 'level', 'short', 'explain', 'examples'];
const grErrors = [];
GRAMMAR_DATA.forEach((e, i) => {
  for (const f of GR_REQUIRED) {
    if (e[f] == null) { grErrors.push(`第 ${i} 條缺欄位 "${f}"：${e.pattern || '(no pattern)'}`); break; }
  }
  if (e.level && !LEVELS.includes(e.level)) grErrors.push(`第 ${i} 條 level "${e.level}" 不合法：${e.pattern}`);
  if (e.examples && !Array.isArray(e.examples)) grErrors.push(`第 ${i} 條 examples 不是陣列：${e.pattern}`);
  if (Array.isArray(e.examples)) {
    e.examples.forEach((ex, j) => {
      for (const f of ['jp', 'kana', 'romaji', 'cn']) {
        if (ex[f] == null) { grErrors.push(`第 ${i} 條 example ${j} 缺欄位 "${f}"：${e.pattern}`); break; }
      }
    });
  }
});
if (grErrors.length === 0) pass('所有文法條目欄位完整');
else { fail(`${grErrors.length} 個錯誤`); grErrors.slice(0, 5).forEach(e => console.log('    ' + e)); }

// 4b. 文法分布（資訊）
section('grammar.js — 數量分布');
const grByLevel = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
for (const e of GRAMMAR_DATA) if (grByLevel[e.level] !== undefined) grByLevel[e.level]++;
console.log('  N5:', grByLevel.N5, '/ N4:', grByLevel.N4, '/ N3:', grByLevel.N3, '/ N2:', grByLevel.N2, '/ N1:', grByLevel.N1);
console.log('  合計：' + GRAMMAR_DATA.length);

// 4c. 重複 pattern
const grSeen = new Map();
const grDups = [];
GRAMMAR_DATA.forEach((e, i) => {
  const k = `${e.pattern}|${e.level}`;
  if (grSeen.has(k)) grDups.push({ key: k, first: grSeen.get(k), second: i });
  else grSeen.set(k, i);
});
if (grDups.length === 0) pass('沒有 (pattern, level) 重複');
else { fail(`${grDups.length} 個 pattern 重複`); grDups.slice(0, 5).forEach(d => console.log(`    ${d.key} — #${d.first}, #${d.second}`)); }

// ============================================================
// 5. 五十音（kana.js）— 基本檢查
// ============================================================
section('kana.js — 結構');

const kanaSrc = fs.readFileSync(path.join(ROOT, 'js/kana.js'), 'utf8');
try {
  const fn = new Function(kanaSrc + '; return KANA_DATA;');
  const KANA_DATA = fn();
  const groups = ['hira-basic', 'hira-dakuten', 'hira-yoon', 'kata-basic', 'kata-dakuten', 'kata-yoon'];
  let kanaOk = true;
  for (const g of groups) {
    if (!KANA_DATA[g] || !Array.isArray(KANA_DATA[g].rows)) { fail(`kana.js 缺少群組 "${g}"`); kanaOk = false; }
  }
  if (kanaOk) pass('KANA_DATA 6 個群組都存在');
} catch (e) {
  fail(`kana.js 語法錯誤：${e.message}`);
}

// ============================================================
// Summary
// ============================================================
console.log('\n' + '═'.repeat(60));
console.log(`${C.bold}結果：${C.green}${results.pass} pass${C.reset}　${results.fail > 0 ? C.red : ''}${results.fail} fail${C.reset}　${C.yellow}${results.warn} warn${C.reset}`);
console.log('═'.repeat(60));

process.exit(results.fail > 0 ? 1 : 0);
