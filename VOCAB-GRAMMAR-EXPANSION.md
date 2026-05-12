# 📚 接手任務：N5–N1 單字／文法擴充至 JLPT 標準

> 把這份完整貼進新 Claude 對話，新 session 就能直接開工。也請順便讀 `HANDOFF.md` 取得整體專案脈絡。

---

## 🎯 任務目標

把網站的 N5–N1 單字與文法資料**從目前缺口擴充到接近 JLPT 標準量**，並**驗證難度標註**沒有錯置（避免基本字被標成 N3、難字被標成 N5 等）。

## 📍 專案座標

- **路徑**：`C:\Users\D000020403\japanese-learning-site\`
- **環境**：Windows 11、PowerShell、VS Code
- **線上**：https://jp-learn-001.azurewebsites.net/
- **資料檔**：`js/vocab.js`、`js/grammar.js`
- **部署**：`az webapp up --html`（**用戶確認後再跑，別自動部署**）

## 📊 目前數量 vs 標準缺口

依 JLPT 歷史官方規格（1984–2009 版，新版未公開但業界估算接近）：

| 等級 | 標準總量 | 標準新增 | 目前單字 | 目前文法 | **單字缺口** | **文法缺口** |
|---|---|---|---|---|---|---|
| N5 | 800 | 800 | **938 ✓** | 53 | 達標 | +20 |
| N4 | 1,500 | 700 | 775 | 74 | +0~200 (微缺) | +30 |
| N3 | 3,750 | 1,800 | **644** | 81 | **+1,150** | +60 |
| N2 | 6,000 | 2,250 | **469** | 92 | **+1,800** | +50 |
| N1 | 10,000 | 4,000 | **300** | 76 | **+3,700** | +60 |
| **合計** | | | 3,126 | 376 | **約 +6,700** | **+220** |

⚠️ **這量極大，建議分多次 session 完成**：

- **Session 1（此次任務）**：N3 +500、N2 +400、N1 +400 = +1,300
- **Session 2**：N3 補 +500、N2 補 +500、N1 補 +500 = +1,500
- **Session 3**：N3 補完、N2 補 +500、N1 補 +800 = +1,800
- **Session 4**：N2 補完、N1 補 +1,000 = +1,000
- **Session 5**：N1 補完 = +1,000
- **Session 6**：文法各等級補齊 +220
- **Session 7**：難度審核／調整

每個 session 控制在 +1,500 字以內，避免 context 爆掉 + 維持品質。

## 📁 資料格式（必須嚴格遵守）

### vocab.js — 陣列每筆是物件

```js
{ jp:'学校', kana:'がっこう', romaji:'gakkou', cn:'學校', cat:'學校', level:'N5' }
```

- `jp`：顯示形（**漢字 + 假名混合，沒漢字就純假名**）
- `kana`：純假名讀音
- `romaji`：羅馬拼音（Hepburn 式，長音用雙母音如 `kou`、`ou`、不要用 macron）
- `cn`：繁體中文意思
- `cat`：分類（**不要加 Nx 前綴**！舊版錯誤已修，分類純粹是主題：動詞、名詞、社會、商業…）
- `level`：`'N5'` / `'N4'` / `'N3'` / `'N2'` / `'N1'`

### 已有的分類（按等級看現存哪些）

- **N5**: 數字, 時間, 星期月份, 家族, 人物, 身體, 食物, 動物, 顏色, 衣著, 居家, 學校, 語言學科, 工作職業, 場所, 國家, 交通, 自然天氣, い形容詞, な形容詞, 動詞, 副詞, 疑問詞, 位置方向, 連接詞, 指示詞, 招呼語, 其他
- **N4**: 抽象名詞, 心情感受, 動詞, 形容詞, 副詞, 接續詞, 工作, 學校, 旅行交通, 健康, 社會, 自然, 物品, 食物, 服飾, 通訊, 娛樂, 量詞, 時間, 人物, 經濟, 動植物, 其他
- **N3**: 抽象, 動詞, 形容詞, 副詞, 工作, 社會, 環境, 醫療, 科技, 媒體, 教育, 文化, 運動, 食物, 旅遊, 其他
- **N2**: 抽象, 動詞, 形容詞, 副詞, 商業, 社會, 學術, 慣用句, 其他
- **N1**: 抽象, 動詞, 形容詞, 副詞, 政治法律, 經濟, 慣用句

新增時：**沿用既有分類**，必要時可加新類（如 N3「歷史」、「藝術」等），但不要每筆造新類，會讓下拉變垃圾桶。

### grammar.js — 陣列每筆是物件

```js
{
  pattern: '〜に対して',
  level: 'N3',
  short: '對於〜（一句話的對象）',
  explain: '名詞＋に対して。表示動作或態度的對象，書面感較強。',
  examples: [
    { jp:'お客様に対して丁寧に話します。', kana:'おきゃくさまにたいしててぃねいにはなします。', romaji:'Okyakusama ni taishite teinei ni hanashimasu.', cn:'對客人要說話有禮貌。' }
  ]
}
```

- `pattern`：文法句型（用 `〜` 表示填空、不要用 `~` 半形）
- `short`：8–20 字的簡短中文意思／用法
- `explain`：完整解釋（接續、語感、限制）
- `examples`：1–3 個例句陣列，每句要全四欄

## 🔧 插入位置

兩個檔案都是大 array：

```js
const VOCAB_DATA = [
  // 既有 N5–N1 entries...
  { ..., level:'N1' }
];  // ← 在這個 `];` 前面插
```

最方便：在最後一筆 entry 後加逗號，然後加新 entries，再保留 `];` 結尾。

或在每個等級的區塊內加 entries（檔案目前用 `// ==== N3 補充 ====` 之類的註解分塊）。

## ✅ 品質檢查項目

每寫一批就檢查：

```powershell
node -e "const fs=require('fs'); const c=fs.readFileSync('japanese-learning-site/js/vocab.js','utf8'); ['N5','N4','N3','N2','N1'].forEach(l=>console.log(l, (c.match(new RegExp(\"level:'\"+l+\"'\",'g'))||[]).length)); try{new Function(c); console.log('OK')}catch(e){console.log('ERR:',e.message)}"
```

同理 grammar.js：

```powershell
node -e "const fs=require('fs'); const c=fs.readFileSync('japanese-learning-site/js/grammar.js','utf8'); ['N5','N4','N3','N2','N1'].forEach(l=>console.log(l, (c.match(new RegExp(\"level: '\"+l+\"'\",'g'))||[]).length)); try{new Function(c); console.log('OK')}catch(e){console.log('ERR:',e.message)}"
```

## ⚠️ 常見錯誤、避坑

1. **漢字／假名不對應**
   - ❌ `{ jp:'学校', kana:'がこう' }`（少了一個 っ）
   - ✓ `{ jp:'学校', kana:'がっこう' }`

2. **羅馬拼音長音**
   - ❌ `romaji:'gakō'`（用 macron）、`romaji:'gakkō'`
   - ✓ `romaji:'gakkou'`（雙母音）、`romaji:'arigatou'`、`romaji:'shinkansen'`

3. **片假名外來語標假名讀音**
   - ❌ `{ jp:'パソコン', kana:'パソコン' }`
   - ✓ `{ jp:'パソコン', kana:'ぱそこん', romaji:'pasokon' }`

4. **分類加 Nx 前綴**（之前的錯誤）
   - ❌ `cat:'N3工作'`
   - ✓ `cat:'工作'`

5. **重複加同一個字**
   - 寫之前用 grep 確認沒收過：
     ```powershell
     grep "jp:'学校'" japanese-learning-site/js/vocab.js
     ```

6. **難度錯置**（最容易出包）
   - 寫 N3 字時，每筆心裡問：「這個字 N4 學了沒？」若 N4 就會用 → 該歸 N4 不是 N3
   - 寫 N1 字時，每筆心裡問：「這個是用在學術文獻／報紙社論的嗎？」是 → N1；日常會話 → 多半 N2

## 📖 難度判準參考

每個等級的「氣質」：

- **N5**：基礎名詞（人事物時地）、基本動詞 ます形、招呼語、數字、生活基本
- **N4**：自他動詞對、敬語入門、抽象動作（探す、慣れる）、心情形容詞
- **N3**：抽象名詞（影響、原因）、書面語動詞、新聞日常用語、文化／社會中階詞
- **N2**：商業用語、新聞報導常見、慣用句、學術入門詞、傳統文化深層
- **N1**：文學感、古典感、政治法律、學術論文、極抽象（憂慮、矜持）、罕見漢字熟語

例：
- `気持ち`（心情）→ N4（高頻、生活）
- `情緒`（情緒）→ N3（書面、抽象）
- `心境`（心境）→ N2（文學感）
- `心象`（心象、表象）→ N1（哲學文學）

## 🎯 本次 Session 1 目標

**單字 +1,300**：
- N3 +500（從目前 644 → 約 1,150）
- N2 +400（從 469 → 約 870）
- N1 +400（從 300 → 約 700）

**順便檢查**：用 Read 抽 10–20 個既存 N3 entries 看有沒有明顯應該屬於 N4 或 N2 的（不用做大規模搬移，只標出來讓用戶決定）

**完成後**：
1. 跑 syntax + 數量檢查
2. 報告新數量與下次 session 還要加多少
3. **不要自動部署** — 用戶會自己跑 `az webapp up --html`

## 💬 對話風格

- 繁體中文
- 簡潔、不過度解釋
- 大批寫資料時，**寫完就跑語法檢查**
- 不確定的詞**寧可不寫**，不要硬湊（會留下假資料更糟）
- 寫到一半 context 超過 60% 就停下來報告進度，建議下次接手

## 🔗 相關檔案速查

- 大 spec 文件：`HANDOFF.md`（整個專案）
- 本任務文件：`VOCAB-GRAMMAR-EXPANSION.md`（this file）
- Schema：`supabase/schema.sql`、`supabase/add-delete-user.sql`
- 主程式：`js/app.js`、`js/auth.js`
- 資料：`js/vocab.js`、`js/grammar.js`

---

**新對話第一句話可以說**：

> 讀 `C:\Users\D000020403\japanese-learning-site\VOCAB-GRAMMAR-EXPANSION.md` 與 `HANDOFF.md`，按 Session 1 計畫擴充單字。寫完語法檢查、回報數量、**不要自動部署**。
