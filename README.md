# 日本語スタート — 日文學習網站

> 從零開始學日文：五十音 → N5 → N4 → N3 → N2 → N1。
> 純靜態前端（HTML + CSS + Vanilla JS）+ Supabase 雲端帳號／進度同步。

---

## 🎯 用途

針對華語使用者打造的個人化日文學習網站，特色：

### 學習資料
- **單字** 7,150 筆（N5 925 / N4 820 / N3 1,596 / N2 1,728 / N1 2,081），含漢字、假名、羅馬拼音、繁體中文意思、分類。
- **文法** 536 條（N5 72 / N4 94 / N3 132 / N2 118 / N1 120），每條附句型、簡短說明、完整解釋、1～3 個例句。
- **五十音** 平假名 / 片假名各 46+25+33 = 208 字（清音、濁音／半濁音、拗音）。
- **文法功能分類索引** + **文法搜尋**：按語意功能（條件、轉折、推測、敬語…共 36 類）篩選 / 直接搜尋句型。

### 測驗 / 練習
- **9 種測驗題型**：漢字読み、單字日中互譯、語彙置き換え、聽音→漢字／中文（TTS）、文法選擇、**動詞變化練習**（7 種變化形 ます/ない/た/て/可能/意向/ば，含 1,288 個動詞）、JLPT 模擬卷。
- **答題方式可切換**：選擇題（四選一）/ 輸入題（自己打答案，含多種可接受答案的模糊比對）。
- **五十音速練模式**（獨立頁面）：純羅馬拼音輸入、計時（含百分秒）、進度條、答錯自動排到最後再考、即時對錯回饋、最佳紀錄分組存（按 平/片 × 清/濁/拗/全部 × 題數）。
- **JLPT 模擬卷**：按 JLPT 真實比例自動配比單字、文法題。
- **再測一次 / 返回**：結果頁兩個按鈕分開，再測一次=用同設定重啟、返回=回 setup。

### 學習追蹤
- **SRS 簡化版**間隔重複系統：答對後 1 / 3 / 7 / 14 / 30 天到期複習。
- **錯題本**自動收最近 100 題答錯的題目。
- **收藏夾**：在單字／文法頁面點 ☆ 加入收藏，可以單獨練習。
- **個人筆記**：每個單字／文法可以寫自己的記憶法／聯想，跟著 SRS 一起雲端同步。
- **連續學習天數**（每日做題自動計）+ 每日目標 20 題。
- **能力估算 + 升級提示**：根據 SRS 各等級精熟率推估目前實力、提示是否該升級。
- **每日推薦練習**：自動算今日新詞 / 到期複習 / 錯題的比例，一鍵開始。

### 每日挑戰 + 排行榜（社群競賽）
- **每日挑戰**：全網用戶每天**同一份題**（date-seeded PRNG，10 題混合題型，跨 N5–N1）。
- **分數折扣機制**：第 1 次 ×100% / 2 次 ×70% / 3 次 ×50% / 4 次 ×35% / 5 次+ ×25%，取最佳折扣後分數（伺服器 RPC 算）。
- **排行榜**：總分 / 本週分 / 今日分三個 tab，今日 tab 還顯示挑戰次數。

### 帳號 / 同步
- **登入 / 雲端同步**：Email + 密碼註冊登入，本機 ↔ 雲端 progress JSON 雙向合併、防抖 1.5s。
- **個人設定**：改暱稱 / Email / 密碼、刪除帳號（含 RLS、RPC）。
- 所有 progress 都同步：SRS、錯題、收藏、筆記、連續天數、**五十音速練最佳紀錄**。

### UI / UX
- **開場刀斬動畫**：紅底浮現 → 3 條速度線 → 主刀光 + 螢幕震動 + 白色閃光 + 28 朵櫻花瓣噴爆 → 兩半旋轉甩飛（sessionStorage 一次性、可略過、尊重 prefers-reduced-motion）。
- **永久背景櫻花飄落**：16 朵（手機 8 朵）SVG 櫻花瓣慢飄 + 自旋。
- **深淺色主題**（pill 滑動式 toggle）、**羅馬拼音 toggle**、響應式（720 / 380 px breakpoint）。
- **回頂端按鈕**：右下角懸浮，捲動超過 300px 自動出現，平滑回頂。
- **PWA 離線支援**：可加入手機主畫面、沒網路時也能練習；上線自動同步進度、新版本自動 toast 提示。
- **聽力題型** 用瀏覽器內建 TTS（不需 API key）。

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
├── README.md                          ← 本文件
├── index.html                         ← 單頁應用骨架（8 page sections + intro splash + sakura layer + 2 modal）
├── styles.css                         ← 全部樣式（~2300+ 行）
├── web.config                         ← Azure IIS：補 .json/.svg 的 MIME types
├── icons/
│   ├── favicon.svg
│   ├── icon-192.png                   ← PWA 192×192（紅底白「日」）
│   └── icon-512.png                   ← PWA 512×512
├── manifest.json                      ← PWA Web App Manifest
├── service-worker.js                  ← PWA SW（離線快取、CACHE_VERSION 控制更新）
├── tests/
│   └── data-sanity.js                 ← 資料完整性測試（部署前必跑）
├── js/
│   ├── supabase-config.js             ← Supabase client + auth callback type 攔截
│   ├── auth.js                        ← AuthState：登入/同步、submitDailyScore RPC、fetchLeaderboard
│   ├── kana.js                        ← 五十音資料 + getHiragana/KatakanaByRange(range)
│   ├── vocab.js                       ← VOCAB_DATA（7,150 筆）+ VOCAB_DATA_END_MARKER
│   ├── grammar.js                     ← GRAMMAR_DATA（536 條）
│   ├── grammar-tags.js                ← 文法功能分類（36 類）
│   ├── verb-conjugation.js            ← VerbConj：detectGroup + conjugate 7 變化形
│   ├── daily-challenge.js             ← DailyChallenge：date-seeded PRNG 抽 10 題
│   └── app.js                         ← 主應用（state、渲染、測驗、SRS、Daily、Leaderboard、五十音速練、刀斬動畫、櫻花…）
└── supabase/
    ├── schema.sql                     ← user_data 表 + RLS + 註冊 trigger
    ├── add-delete-user.sql            ← delete_user RPC
    ├── leaderboard-and-daily.sql      ← daily_challenges 表 + RLS + leaderboard view
    └── add-daily-discount.sql         ← attempts 欄位 + submit_daily_score RPC + 更新 view
```

### `index.html`

單頁應用骨架。重點區塊：

- **`<head>`**：在 CSS 套用前用內聯 `<script>` 從 `localStorage` 讀主題，避免閃白
- **`<body>` 開頭兩個 overlay**：`#intro-splash`（開場刀斬動畫）、`#sakura-layer`（永久背景櫻花）
- **`<header>`**：logo / 主選單 / 羅馬拼音 toggle / 登入按鈕 or 使用者下拉 / 深淺色 pill toggle
- **`<main>`**：7 個 `<section class="page">`
  - `page-home` — 首頁卡片導覽
  - `page-kana` — 雙模式：📖 查表（6 tab 平/片 × 清/濁/拗 + 點字 TTS）/ ⚡ 速練（純輸入計時模式）
  - `page-vocab` — 等級下拉、搜尋、分類、列表
  - `page-grammar` — 等級下拉、tag 篩選、展開／收起、收藏、搜尋
  - `page-review` — 能力估算 / 每日推薦 / 連續天數 / 到期 / 錯題 / 收藏
  - `page-quiz` — 每日挑戰卡片 / JLPT 模擬卷 / 9 種分題型練習 / 進行中 / 結果（再測一次 + 返回）
  - `page-leaderboard` — 排行榜（總分 / 本週 / 今日 tab，今日含挑戰次數）
- **2 個 Modal**：登入註冊、個人設定（含刪除帳號）
- **`<script>` 載入順序**：supabase-js → supabase-config → auth → kana → vocab → grammar → grammar-tags → verb-conjugation → daily-challenge → app

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
- `AuthState.submitDailyScore(date, rawScore, maxScore)` — 透過 `submit_daily_score` RPC 上傳每日挑戰分（伺服器自動算折扣 + 取 max）
- `AuthState.fetchMyDailyScore(date)` — 抓自己當天 score / max_score / attempts
- `AuthState.fetchLeaderboard()` — 抓 leaderboard view 全部 row

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

### `js/verb-conjugation.js`

對外 `window.VerbConj`：
- `FORMS` — 7 種變化形清單 `{ key, label, explain }`（ます/ない/た/て/可能/意向/ば）
- `detectGroup(verb)` → `'godan'` / `'ichidan'` / `'irregular-suru'` / `'irregular-suru-compound'` / `'irregular-kuru'`
- `conjugate(verb, form)` → `{ jp, kana }` 變化形
- `getVerbPool(level)` — 從 VOCAB_DATA 抽 cat='動詞' 的可變化動詞 pool（共 1,288 個）
- 內含 godan -iru/-eru 例外清單（看起來像 ichidan 但其實是 godan 的常用動詞）

### `js/daily-challenge.js`

對外 `window.DailyChallenge`：
- `TOTAL_QUESTIONS` — 每日 10 題
- `todayDate()` → `'YYYY-MM-DD'`
- `getTodayChallenge()` → `{ date, items: [{ type, target }, ...] }`
- `getChallenge(dateStr)` — 任意日期重現（題目用 date 當 mulberry32 seed，全網用戶當天看到同題）
- 題目組成：3 漢字読み + 2 日中 + 2 聽力 + 2 文法 + 1 平→羅

### `js/app.js`

最大支檔（約 2,000+ 行）。模組／重要函式：

| 區塊 | 函式 |
|---|---|
| 狀態 | `state`、`defaultProgress`、`loadProgress`、`saveProgress`、`mergeProgress`（含 `kanaDrillBest` 取較快） |
| 主題 | `applyTheme`、`toggleTheme`、`initTheme` |
| 每日狀態 | `todayStr`、`ensureDailyState` |
| itemKey 編碼 | `getItemKey`、`lookupByKey` |
| 答題紀錄 / SRS | `recordAnswer`、`getDueKeys`、`getMistakeKeys`、`getFavoriteKeys`、`clearMistakes` |
| 能力估算（D 方案）| `computeLevelStats`、`estimateLevel`、`checkLevelUpgrade`、`buildDailyRecommendation` |
| 升級切換 | `applyLevelUpgrade`、`dismissUpgrade` |
| 渲染 | `renderKana`、`renderVocabList`、`renderGrammar`、`renderReview`、`renderLevelEstimate`、`renderDailyRecommendation`、`renderUpgradeBanner` |
| 測驗引擎 | `startQuiz`、`launchQuiz`（含 mode/restart）、`buildQuestion`（含 `acceptable[]`）、`renderQuizQuestion`（choice/input 分流）、`submitInputAnswer`、`handleAnswer`、`nextQuestion`、`finishQuiz`、`quitQuiz`、`restartQuiz`、`startMockExam`、`startReviewSession`、`checkAnswerInput`、`normalizeAnswer` |
| 每日挑戰 | `startDailyChallenge`、`renderDailyChallengeCard`、`saveDailyChallengeLocal`、`getTodayLocalScore`、`multiplierForAttempt` |
| 排行榜 | `renderLeaderboard`（含 today_attempts 顯示）|
| 五十音速練 | `kdStart`、`kdNextItem`、`kdSubmit`、`kdShowLastAnswer`、`kdFinish`、`kdAbort`、`kdSwitchMode`、`kdFormatMs`（秒+百分秒）、`kdFindCounterpart`、`kdBestKey/For/TrySave`（讀寫 `progress.kanaDrillBest` 自動雲端同步）|
| 開場動畫 / 櫻花 | `initIntro`、`spawnIntroBurst`（噴 28 朵花瓣）、`initSakura`、`spawnSakura` |
| 通用 | `$`、`$$`、`shuffle`、`randomPick`、`speak`、`showPage`、`applyRomajiVisibility`、`escapeHtml` |
| Toast / Auth UI | `showToast`、`initToast`、`handleAuthCallback`、`initAuth` |
| Modal | 登入註冊 modal、個人設定 modal 控制 |
| 入口 | `init` — DOMContentLoaded 後執行所有初始化（包含 initIntro、initSakura、initKanaDrill 等）|

### `itemKey` 編碼（SRS / 收藏 / 錯題本通用）

- `k:<kana>` — 五十音（如 `k:あ`）
- `v:<jp>|<cn>` — 單字（如 `v:学校|學校`）
- `g:<pattern>` — 文法（如 `g:〜は〜です`）

### `progress` JSON 結構（整包雲端同步）

```js
{
  srs: { itemKey: { level, due, lastSeen, correct, wrong } },
  mistakes: [{ key, at }, ...],            // 最近 100
  favorites: [key, ...],
  notes: { itemKey: { text, updatedAt } },
  daily: { streak, lastStudyDate, today: { date, correct, total } },
  upgradeDismissed: { 'N5->N4': true },
  kanaDrillBest: {                          // 五十音速練最佳紀錄（雲端同步）
    'hira-basic-all': { time, accuracy, date },
    'kata-yoon-10': { ... },
    // key: `${script}-${range}-${count}`
  }
}
```

合併規則 `mergeProgress(local, cloud)`：
- `srs`：每個 itemKey 取 `lastSeen` 較大者
- `favorites`：聯集
- `mistakes`：合併後依 `at` 倒序、保留最近 100
- `notes`：每 key 取 `updatedAt` 較新者
- `daily`：streak 取較大、lastStudyDate 取較新、today 同日合併取最大
- `kanaDrillBest`：每 key 取 `time` 較**小**者（best wins）

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

### `supabase/leaderboard-and-daily.sql`

- `public.daily_challenges` 表：`(user_id, date)` PK + `score / max_score / attempts / completed_at`
- RLS：每人寫自己、所有已登入者可讀全部（排行榜需要）
- `public.leaderboard` view（`security_invoker=false`）：彙總每位玩家的 days_played / total_score / best_score / today_score / today_attempts / week_score / last_played；join `user_data.display_name`

### `supabase/add-daily-discount.sql`

- 給 `daily_challenges` 加 `attempts int` 欄位
- `public.submit_daily_score(date, raw_score, max_score)` RPC：取現有 `attempts`、依 (attempts+1) 算折扣（×100/70/50/35/25%）、跟 existing score 取 max、upsert 入庫；回傳 `(final_score, total_attempts, multiplier_pct)`
- 更新 leaderboard view 加 `today_attempts` 欄位（注意：CREATE OR REPLACE VIEW 不能改既有欄位順序，所以用 `DROP VIEW + CREATE`）

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

### 跟 JLPT 歷史標準比（單級）

| 等級 | JLPT 標準 | 現有 | 缺口 |
|---|---|---|---|
| N5 | ~800 | 925 | ✅ |
| N4 | ~1,500 | 820 | +680 |
| N3 | ~1,950 | 1,596 | +354 |
| N2 | — | 1,728 | ✅ |
| N1 | ~4,000 | 2,081 | +1,919 |
| **合計** | — | **7,150** | **+2,953** |

---

## 🛠 部署流程

```powershell
cd C:\Users\D000020403\japanese-learning-site
az webapp up --html
```

部署完成後，到瀏覽器按 **Ctrl + Shift + R** 強制重新整理（Azure 預設沒設 Cache-Control，瀏覽器會無限期保留舊檔）。

**Supabase schema 變更**：若該次部署同時加了 `supabase/*.sql` 新檔，要到 [Supabase Dashboard](https://kbifeqmxjofifdgwonus.supabase.co) → SQL Editor 整段貼上執行（檔案都設計成 idempotent 可重跑）。目前依序要跑過的：
1. `schema.sql`（initial）
2. `add-delete-user.sql`
3. `leaderboard-and-daily.sql`
4. `add-daily-discount.sql`

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
7. **手機看不到新功能**：本機改完部署後手機說「載入排行榜失敗」— 原因是手機 SW 還停在舊版、舊 auth.js 沒新 API。修法：手機清網站資料 / 無痕重開（SW 偵測新版會自動更新但要重新進站才生效）。**因此每次改任何快取檔，務必把 `service-worker.js` 的 `CACHE_VERSION` 加一**。
8. **PostgreSQL view 不能改既有欄位順序**：`CREATE OR REPLACE VIEW` 改 column 名（包括插入新欄位到中間）會 fail with `42P16: cannot change name of view column`。修法：用 `DROP VIEW IF EXISTS` + `CREATE VIEW`（grant 也要重設）。
9. **每次 reload 在 preview 看不到新 HTML**：因為本機 SW 也會 cache index.html。debug 時記得 `await Promise.all((await navigator.serviceWorker.getRegistrations()).map(r => r.unregister())); await Promise.all((await caches.keys()).map(k => caches.delete(k))); location.reload();`

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

- **更新版本**：修改任何快取的檔案後，請把 `service-worker.js` 的 `CACHE_VERSION` 加一（例如 `v20` → `v21`）。下次使用者進站，SW 會察覺新版本、自動拉新檔、淘汰舊快取，並 toast「已更新到新版本，重新整理生效」。**目前 cache 版本：`v21`。**
- **加入主畫面**：手機開啟網站 → 瀏覽器選單「加到主畫面」/「加到主螢幕」即可變成 app 圖示。iOS Safari 與 Android Chrome 都支援。
- **離線範圍**：核心檔（HTML/CSS/JS/單字/文法/五十音/動詞變化/每日挑戰）都會快取。**登入 / 雲端同步 / Supabase 相關功能離線時無法使用**（按設計如此 — 認證必須線上），但離線時仍可瀏覽資料、做測驗、寫筆記、跑五十音速練，上線後進度自動同步。
- **手機常見問題**：剛部署新版時手機可能還拿舊版（SW stale-while-revalidate）。第一次進站若功能怪、UI 不對，**請關掉分頁重開**（SW 已抓新版、第二次進站才會用新版）。

## 📌 未來路線（idea backlog）

### 內容擴充（按優先序）

- **N4 單字**：標準 ~1,500 → 現 820 → 缺 **+680**
- **N3 單字**：標準 ~1,950 → 現 1,596 → 缺 **+354**
- **N1 單字**：標準 ~4,000 → 現 2,081 → 缺 **+1,919**
- N3 / N1 進階文法（特別是商業／法律／古典）

### 工程

- **PWA screenshots**（不緊急）：DevTools 截兩張（1280×720 wide + 375×812 narrow），放專案根、寫進 `manifest.json`，可清掉「Richer Install UI」警告
- **同 jp+level 不同 cn 的清理**：143 筆可合併或刪重複（不影響使用）
- **同 jp 跨多等級**：6 個跨多等級（測試會 warn 但不 fail）— 多半是有意保留的不同義

### 功能加分項

1. **JLPT 風格讀解題**（短文 + 4 選 1 理解題）— 補上你網站最缺的讀解大題
2. **聽解模擬**（短對話 + 4 選 1，多人 TTS 模擬）
3. 重組句 / 並べ替え（JLPT 真實題型）
4. 成就 / 徽章系統
5. 計時 JLPT 模擬卷
6. 手寫筆順練習（Canvas + KanjiVG 資料）
7. 進度匯出／匯入 JSON
8. Quiz 答對時的音效 / 動畫
9. い形容詞 / な形容詞變化練習題型
10. 慣用語・諺語・四字熟語 專門頁（資料已存在 cat='慣用句' 261 筆，只缺 UI）
11. 文章查字工具（曾實作過 [historical commit] 但因使用率太低拆掉；若再做要升級到 kuromoji.js 真正分詞）
