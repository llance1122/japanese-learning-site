# 日本語スタート — 日文學習網站

> 從零開始學日文：五十音 → N5 → N4 → N3 → N2 → N1。
> 純靜態前端（HTML + CSS + Vanilla JS）+ Supabase 雲端帳號／進度同步。

---

## 🎯 用途

針對華語使用者打造的個人化日文學習網站，特色：

- **單字** 7,150 筆（N5 925 / N4 820 / N3 1,596 / N2 1,728 / N1 2,081），含漢字、假名、羅馬拼音、繁體中文意思、分類。
- **文法** 536 條（N5 72 / N4 94 / N3 132 / N2 118 / N1 120），每條附句型、簡短說明、完整解釋、1～3 個例句。
- **文法功能分類索引**：除了 N5–N1 等級，還能按語意功能篩選（條件、轉折、推測、敬語、書面文語…共 36 類）。
- **文法搜尋**：可在文法頁直接搜尋句型、含意或解釋關鍵字。
- **回頂端按鈕**：右下角懸浮，捲動超過 300px 自動出現，平滑回頂。
- **PWA 離線支援**：可加入手機主畫面、沒網路時也能練習；上線自動同步進度。
- **聽力題型**：聽音 → 選漢字 / 中文（瀏覽器內建 TTS）。
- **個人筆記**：每個單字／文法可以寫自己的記憶法／聯想，跟著 SRS 一起雲端同步。
- **五十音** 平假名 / 片假名各 46+25+33 = 208 字（清音、濁音／半濁音、拗音）。
- **8 種測驗題型**：四種五十音題型（平 / 片 ⇆ 羅馬）、漢字読み、單字日中互譯、文法選擇。
- **JLPT 模擬卷**：按 JLPT 真實比例自動配比五十音、單字、文法題。
- **SRS 簡化版**間隔重複系統：答對後 1 / 3 / 7 / 14 / 30 天到期複習。
- **錯題本**自動收最近 100 題答錯的題目。
- **收藏夾**：在單字／文法頁面點 ☆ 加入收藏，可以單獨練習。
- **連續學習天數**（每日做題自動計）+ 每日目標 20 題。
- **能力估算 + 升級提示**（D 方案功能）：根據 SRS 各等級精熟率推估目前實力、提示是否該升級。
- **每日推薦練習**：自動算今日新詞 / 到期複習 / 錯題的比例，一鍵開始。
- **登入 / 雲端同步**：Email + 密碼註冊登入，本機 ↔ 雲端進度雙向合併、防抖同步。
- **個人設定**：改暱稱 / Email / 密碼、刪除帳號（含 RLS、RPC）。
- **深淺色主題**（pill 滑動式 toggle）、**羅馬拼音 toggle**、響應式（720 / 380 px breakpoint）。

---

## 🔗 線上資源

- **網站**：https://jp-learn-001.azurewebsites.net/
- **GitHub**：https://github.com/llance1122/japanese-learning-site
- **部署平台**：Azure App Service（windows F1 免費方案 / japaneast）
- **後端**：Supabase（Postgres + Auth + RLS）
  - Project URL：`https://kbifeqmxjofifdgwonus.supabase.co`
  - Publishable Key（前端用，受 RLS 保護）：`sb_publishable_XLI46b47-XY84e3Mj1W1Ow_NZImZdU3`

---

## 🏗 技術棧

- **前端**：純靜態 `HTML5 + CSS3 + Vanilla JS`（無 build 流程、無框架）
- **後端 / DB**：Supabase Postgres + Supabase Auth
- **CDN**：jsdelivr 載 `@supabase/supabase-js v2`
- **語音**：瀏覽器內建 `window.speechSynthesis`（不需任何 key）
- **本機儲存**：`localStorage`（key：`jp-learn-theme`、`jp-learn-progress`）
- **雲端同步**：登入後 progress JSON 寫入 Supabase `user_data.progress`，防抖 1.5 s

---

## 🧭 整體架構

```
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  index.html — 6 個 page section（home/kana/vocab/...） │ │
│  │     └─ 共用 header / footer / modals                   │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐    │
│  │ kana.js  │ │ vocab.js │ │grammar.js│ │  styles.css  │    │
│  │  資料層   │ │ 6897 筆  │ │ 507 條   │ │  全部樣式    │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  app.js — 主應用邏輯（最大檔案）                        │ │
│  │   • state（含 progress / SRS / 收藏 / 錯題 / 每日）     │ │
│  │   • 路由（showPage）                                    │ │
│  │   • 各頁渲染 / 互動                                     │ │
│  │   • 測驗引擎（出題、計分、複習）                        │ │
│  │   • SRS、能力估算、每日推薦                             │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  auth.js — AuthState 全域、登入 / 註冊 / 同步           │ │
│  │  supabase-config.js — Supabase client 初始化            │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS
              ┌──────▼──────┐
              │  Supabase   │  Auth (Email+密碼)
              │             │  Postgres + RLS
              │ user_data   │  progress jsonb
              └─────────────┘
```

### 資料流（學習進度）

1. 使用者答題 → `app.js` 更新 `state.progress`
2. `saveProgress()` 寫 `localStorage`，**同時**呼叫 `AuthState.pushProgress()` 把整包 progress 推到雲端（1.5s 防抖）
3. 登入時：`fetchProgress()` 拉雲端 → 與本機 `mergeProgress()` 合併 → 取較新的；合併結果寫回兩邊

### 路由（單頁應用）

- 頂部 `nav-btn` 點擊 → `showPage(name)`
- 各頁是 `<section class="page hidden">` 結構，靠 `hidden` class 切換
- 不用 URL hash，純前端切換

---

## 📁 檔案結構詳解

```
japanese-learning-site/
├── README.md                  ← 本文件
├── index.html                 ← 單頁應用骨架（6 個 section + 2 個 modal + 回頂端按鈕）
├── styles.css                 ← 全部樣式（深淺色 CSS 變數、響應式）
├── favicon.svg                ← 紅圓底 + あ
├── manifest.json              ← PWA Web App Manifest（加入主畫面用）
├── service-worker.js          ← PWA Service Worker（離線快取 + 自動更新）
├── tests/
│   └── data-sanity.js         ← 資料完整性測試（部署前必跑）
├── js/
│   ├── supabase-config.js     ← Supabase client 初始化 + auth callback type 攔截
│   ├── auth.js                ← AuthState 全域物件、登入登出、雲端同步
│   ├── kana.js                ← 五十音資料（KANA_DATA + flatten 函式）
│   ├── vocab.js               ← N5–N1 單字陣列 VOCAB_DATA + getCategories()
│   ├── grammar.js             ← N5–N1 文法陣列 GRAMMAR_DATA
│   ├── grammar-tags.js        ← 文法功能分類（GRAMMAR_TAGS + 反查 helper）
│   └── app.js                 ← 主應用（state、渲染、測驗、SRS、估算、筆記、PWA 註冊…）
└── supabase/
    ├── schema.sql             ← user_data 表 + RLS + 註冊 trigger
    └── add-delete-user.sql    ← delete_user RPC 函式（讓使用者自刪帳號）
```

### `index.html`

單頁應用骨架。重點區塊：

- **`<head>`**：在 CSS 套用前用內聯 `<script>` 從 `localStorage` 讀主題，避免閃白
- **`<header>`**：logo / 主選單 / 羅馬拼音 toggle / 登入按鈕 or 使用者下拉 / 深淺色 pill toggle
- **`<main>`**：6 個 `<section class="page">`
  - `page-home` — 首頁卡片導覽
  - `page-kana` — 6 個 tab（平/片 × 清/濁/拗）+ 點字發音
  - `page-vocab` — 等級下拉、搜尋、分類、列表
  - `page-grammar` — 等級下拉、展開／收起、收藏
  - `page-review` — 能力估算 / 每日推薦 / 連續天數 / 到期 / 錯題 / 收藏
  - `page-quiz` — 8 種題型 + JLPT 模擬卷 + 進行中 + 結果
- **2 個 Modal**：登入註冊、個人設定（含刪除帳號）
- **`<script>`** 載入順序：supabase-js → supabase-config → auth → kana → vocab → grammar → app

### `styles.css`

- 全部樣式都在這支（不分檔），約 1,500+ 行
- 用 CSS 變數定義深淺色雙主題（`[data-theme="dark"]`）
- 兩個 breakpoint：**720px**（平板→手機）、**380px**（小手機）
- 主視覺色：紅色 `#d64545`（日本國旗紅）

### `js/supabase-config.js`

- 攔截 OAuth 回跳 URL 的 `type` 參數（signup / recovery / …），存到 `window.__authCallbackType`
- 建立全域 `sb = supabase.createClient(...)`，啟用 PKCE flow 與 detectSessionInUrl

### `js/auth.js`

對外 API：
- `AuthState.user` — 當前登入使用者（`null` 表未登入）
- `AuthState.onChange(fn)` — 註冊狀態變更 listener（會補觸發一次避免漏掉初始狀態）
- `AuthState.signUp / signIn / signOut`
- `AuthState.resendVerification(email)`
- `AuthState.updateDisplayName / updateEmail / updatePassword`
- `AuthState.deleteAccount()` — 透過 `sb.rpc('delete_user')`
- `AuthState.fetchProgress()` — 拉雲端 progress
- `AuthState.pushProgress(progress)` — 推到雲端（防抖 1.5s）
- `AuthState.flush(progress)` — 強制立刻 flush（登出前用）

### `js/kana.js`

- `KANA_DATA`：6 個群組（hira-basic / dakuten / yoon、kata-basic / dakuten / yoon）
- 每組是 2D 陣列，每格 `['字','romaji']` 或 `null`（如 や行 的 い、え 缺）
- `flattenKana(group)` / `getAllHiragana()` / `getAllKatakana()` 給測驗抽題用

### `js/vocab.js`

- `VOCAB_DATA`：陣列，每筆是物件
  ```js
  { jp:'学校', kana:'がっこう', romaji:'gakkou', cn:'學校', cat:'學校', level:'N5' }
  ```
- 欄位規格：
  - `jp` — 顯示形（漢字 + 假名混合，沒漢字就純假名）
  - `kana` — 純假名讀音
  - `romaji` — Hepburn 式羅馬拼音（長音用雙母音 `gakkou`、不用 macron）
  - `cn` — 繁體中文意思
  - `cat` — 分類（純主題，**不要加 Nx 前綴**）
  - `level` — `'N5'` ~ `'N1'`
- 片假名外來語的 `kana` 要存平假名讀音（例：`{ jp:'パソコン', kana:'ぱそこん', romaji:'pasokon' }`）
- `getCategories()` — 回傳所有分類的去重陣列（給單字頁分類下拉用）

### `js/grammar.js`

- `GRAMMAR_DATA`：陣列，每筆物件
  ```js
  {
    pattern: '〜に対して',
    level: 'N3',
    short: '對於〜（一句話的對象）',
    explain: '名詞＋に対して。表示動作或態度的對象，書面感較強。',
    examples: [
      { jp:'お客様に対して丁寧に話します。', kana:'おきゃくさまに...', romaji:'...', cn:'對客人要說話有禮貌。' }
    ]
  }
  ```
- `pattern` 用全形 `〜` 不要用半形 `~`

### `js/app.js`

最大支檔（約 1,500 行）。模組／重要函式：

| 區塊 | 函式 |
|---|---|
| 狀態 | `state`、`defaultProgress`、`loadProgress`、`saveProgress`、`mergeProgress` |
| 主題 | `applyTheme`、`toggleTheme`、`initTheme` |
| 每日狀態 | `todayStr`、`ensureDailyState` |
| itemKey 編碼 | `getItemKey`、`lookupByKey` |
| 答題紀錄 / SRS | `recordAnswer`、`getDueKeys`、`getMistakeKeys`、`getFavoriteKeys`、`clearMistakes` |
| 能力估算（D 方案）| `computeLevelStats`、`estimateLevel`、`checkLevelUpgrade`、`buildDailyRecommendation` |
| 升級切換 | `applyLevelUpgrade`、`dismissUpgrade` |
| 渲染 | `renderKana`、`renderVocabList`、`renderGrammar`、`renderReview`、`renderLevelEstimate`、`renderDailyRecommendation`、`renderUpgradeBanner` |
| 測驗引擎 | `startQuiz`、`launchQuiz`、`buildQuestion`、`renderQuizQuestion`、`handleAnswer`、`nextQuestion`、`finishQuiz`、`startMockExam`、`startReviewSession` |
| 通用 | `$`、`$$`、`shuffle`、`randomPick`、`speak`、`showPage`、`applyRomajiVisibility` |
| Toast / Auth UI | `showToast`、`initToast`、`handleAuthCallback`、`initAuth` |
| Modal | 登入註冊 modal、個人設定 modal 控制 |
| 入口 | `init` — DOMContentLoaded 後執行所有初始化 |

### `itemKey` 編碼（SRS / 收藏 / 錯題本通用）

- `k:<kana>` — 五十音（如 `k:あ`）
- `v:<jp>|<cn>` — 單字（如 `v:学校|學校`）
- `g:<pattern>` — 文法（如 `g:〜は〜です`）

### `supabase/schema.sql`

- `public.user_data` 表
  - `user_id` (uuid PK, FK to auth.users on delete cascade)
  - `display_name` (text)
  - `progress` (jsonb) — 整包學習進度
  - `updated_at` (timestamptz, auto-update trigger)
- RLS：每人只能讀寫自己（`auth.uid() = user_id`），4 個 policy 各管 CRUD
- Trigger 1：`set_updated_at`（更新時自動填 now）
- Trigger 2：`handle_new_user`（auth.users insert → 自動 insert public.user_data）

### `supabase/add-delete-user.sql`

`public.delete_user()` RPC：security definer，讓登入中使用者刪自己帳號（會 cascade 清掉 session、identity、user_data）。

---

## 📊 內容規模

| 項目 | 數量 |
|---|---|
| 五十音 | 208 |
| N5 單字 | 925 |
| N4 單字 | 820 |
| N3 單字 | 1,596 |
| N2 單字 | 1,728 |
| N1 單字 | 2,081 |
| **單字合計** | **7,150** |
| N5 文法 | 72 |
| N4 文法 | 94 |
| N3 文法 | 132 |
| N2 文法 | 118 |
| N1 文法 | 120 |
| **文法合計** | **536** |

### 跟 JLPT 歷史標準比

| 等級 | JLPT 標準 | 現有 | 進度 |
|---|---|---|---|
| N5 | 800 | 925 | ✅ |
| N4 | 1,500 | 769 (含 N5 共 1,694) | ⚠️ |
| N3 | 3,750 (含累積) | 累積 3,219 | ⚠️ |
| N2 | 6,000 (含累積) | 累積 4,947 | ⚠️ |
| N1 | 10,000 (含累積) | 累積 6,897 | ⚠️ |

未來若要繼續擴充，N4 約還缺 600、N3 約缺 500、N1 約還缺 3,000+。

---

## 🛠 部署流程

```powershell
cd C:\Users\D000020403\japanese-learning-site
az webapp up --html
```

部署完成後，到瀏覽器按 **Ctrl + Shift + R** 強制重新整理（Azure 預設沒設 Cache-Control，瀏覽器會無限期保留舊檔）。

---

## 🐛 已修過的踩雷紀錄

1. **註冊後 submit 按鈕文字錯誤** — `finally` 蓋掉 `switchMode`，已修。
2. **註冊成功訊息被 switchMode 隱藏** — 已修，獨立成 info banner。
3. **重整後登入狀態顯示成「登入」** — `onChange` listener 註冊晚於 emit；現在 `onChange` 若 initialChecked 已 true 會 microtask 補觸發一次。
4. **手機 header 主題切換與登入按鈕重疊** — grid-area 衝突，已修。
5. **分類名稱多帶 N3 / N4 等前綴** — 分類欄位應只是主題（如「動詞」），已用 Node 批次清掉。
6. **🚨 vocab.js 大規模錯置事故（Session 1~7）**
   - 症狀：頁面只看到 2,906 個單字，但磁碟有 6,897 個
   - 原因：擴充腳本用 `c.lastIndexOf('];')` 找 VOCAB_DATA 結尾，但 `getCategories()` 函式末端也有 `];`，且在檔尾。所有 sessions 加的 entries 全被插進 `getCategories` 的 return spread array、不在 VOCAB_DATA 裡。
   - 偵測：語法 / regex 檢查都會「看似正確」，但實際 `new Function(file)` 後 `VOCAB_DATA.length` 才是真相。
   - 已修復：把錯置區所有 entry 行抽出搬回 VOCAB_DATA、`getCategories` 還原成正確的 `return [...set];`。
   - **教訓**：未來補資料時，請用更明確的錨點（如 VOCAB_DATA 內部最後一筆 entry 的字面、或加 `// VOCAB_DATA_END` marker），不要依賴 `lastIndexOf('];')`。寫完一定要跑 `new Function(content); VOCAB_DATA.length` 驗證實際 eval 結果，不能只信 regex 計數。

---

## 🧪 開發 / 測試指引

### 本機跑

任何靜態檔伺服器都行：

```powershell
# 在專案根目錄
npx serve -p 5173 .
# 或
python -m http.server 5173
```

開瀏覽器：http://localhost:5173/

### 改完資料一定要跑測試

```powershell
node tests/data-sanity.js
```

這支測試會檢查：
- vocab.js / grammar.js 語法 OK 且能 eval
- **只有一個頂層 `];`**（防止 Session 1-7 / Phase 4 那種錯置事故）
- **VOCAB_DATA_END_MARKER 錨點存在**（給未來插入腳本用）
- regex 計數 == eval 計數（沒 entry 漏網）
- 每筆都有完整欄位、level 合法
- 沒有 (jp, cn, level) 完全重複
- 文法 examples 結構完整
- kana 6 個群組都在

回傳 exit code 1 表示失敗，0 表示通過。**部署前一定要先看到 `0 fail`**。

### ⚠️ 補單字 / 文法時的標準流程

1. **永遠用 VOCAB_DATA_END_MARKER 當錨點**（單字）：
   ```js
   // 不要用 c.lastIndexOf('];')，會找到 getCategories 的結尾！
   const idx = vocabSrc.indexOf('// VOCAB_DATA_END_MARKER');
   const newContent = vocabSrc.slice(0, idx) + newEntriesBlob + vocabSrc.slice(idx);
   ```
2. **寫入後立刻跑 `node tests/data-sanity.js`**
3. **eval VOCAB_DATA 確認 length 是 regex 計數**（測試已內建）
4. 通過後再 `az webapp up --html`

### Console 即時看資料

開網站後 F12 → Console：

```js
// 總數 / 各等級
(() => { const c={}; for (const v of VOCAB_DATA) c[v.level]=(c[v.level]||0)+1; return { total: VOCAB_DATA.length, byLevel: c }; })()

// 找特定字
VOCAB_DATA.filter(v => v.jp.includes('愛'))

// 看自己的進度
JSON.parse(localStorage.getItem('jp-learn-progress'))
```

### 部署前自我檢查

1. 跑上面的 Node eval 驗證
2. 本機 serve 一遍，跑一次 SRS / 測驗 / 收藏 看看會不會炸
3. `az webapp up --html`
4. 線上 `Ctrl + Shift + R`、F12 Console 跑數量驗證碼

---

## 💬 對話風格 / 給未來協作者的提醒

- 使用繁體中文交流。
- 程式改完先語法檢查（`new Function(fs.readFileSync(...))`）。
- 大改動分階段、清楚列「使用者要做什麼 vs 我做什麼」。
- 寫資料時不要「為了湊量硬寫」— 不確定的詞寧可不寫，假資料更糟。
- 寫入 vocab.js / grammar.js 後**一定要 eval 驗證 length**，不要只信 regex。
- **不要在使用者沒按下 GO 之前自動部署**。

---

## 🔄 PWA 注意事項

- **更新版本**：修改任何快取的檔案後，請把 `service-worker.js` 的 `CACHE_VERSION` 加一（例如 `v1` → `v2`）。下次使用者進站，SW 會察覺新版本、自動拉新檔、淘汰舊快取，並 toast「已更新到新版本，重新整理生效」。
- **加入主畫面**：手機開啟網站 → 瀏覽器選單「加到主畫面」/「加到主螢幕」即可變成 app 圖示。iOS Safari 與 Android Chrome 都支援。
- **離線範圍**：核心檔（HTML/CSS/JS/單字/文法/五十音）都會快取。**登入 / 雲端同步 / Supabase 相關功能離線時無法使用**（按設計如此 — 認證必須線上），但離線時仍可瀏覽資料、做測驗、寫筆記，上線後進度自動同步。

## 📌 未來路線（idea backlog）

- N4 補到 ~1,500、N3 補到 ~1,950、N1 補到 ~4,000
- 文法繼續補（特別是 N3、N1 進階句型）
- 加 unit test 防止資料檔再次寫壞
- 給 vocab.js / grammar.js 補 marker comment（`// VOCAB_DATA_END`）讓未來腳本錨點明確
- 加 service worker 做離線存取（注意 cache 版本管理）
- 加 import / export 進度的功能（無需登入也能轉換裝置）
- Quiz 答對時的音效 / 動畫
- 文法句型分類索引（不只按 level，也按功能：條件、轉折、推測…）
