# 🤝 Handoff — 日本語スタート 學習網站

> 把這個檔案完整貼進新對話開頭，新 session 就能接手繼續開發。

---

## 📍 專案基本資訊

- **路徑**：`C:\Users\D000020403\japanese-learning-site\`
- **線上網址**：https://jp-learn-001.azurewebsites.net/
- **GitHub**：https://github.com/llance1122/japanese-learning-site
- **部署**：Azure App Service（Linux F1 免費方案，`japaneast` 機房）
- **部署指令**：`az webapp up --html`（從專案根目錄執行）
- **使用者**：在 Windows 11 + PowerShell，VS Code 開發
- **語言**：對話用繁體中文

## 🏗 技術棧

- **前端**：純靜態 HTML + CSS + Vanilla JS（無 build 流程、無框架）
- **後端／資料庫**：Supabase（Postgres + Auth + RLS）
- **CDN**：jsdelivr 載 supabase-js v2

## 🔑 Supabase 設定

- **Project URL**：`https://kbifeqmxjofifdgwonus.supabase.co`
- **Publishable Key**：`sb_publishable_XLI46b47-XY84e3Mj1W1Ow_NZImZdU3`
- **資料表**：`public.user_data`
  - `user_id` (uuid PK, FK to auth.users)
  - `display_name` (text)
  - `progress` (jsonb) — 完整儲存 SRS / mistakes / favorites / daily
  - `updated_at` (timestamptz)
- **RLS**：每人只能讀寫自己的 row（`auth.uid() = user_id`）
- **RPC 函式**：`public.delete_user()` — 讓使用者自行刪帳號

Schema 檔在 `supabase/schema.sql` 與 `supabase/add-delete-user.sql`。

## 📁 檔案結構

```
japanese-learning-site/
├── index.html          # 主頁面（含登入 modal + 個人設定 modal）
├── styles.css          # 樣式
├── favicon.svg         # 紅圓+あ
├── supabase/
│   ├── schema.sql              # 初始資料表+RLS+trigger
│   └── add-delete-user.sql     # 刪帳號 RPC 函式
└── js/
    ├── supabase-config.js   # Supabase client 初始化
    ├── auth.js              # AuthState 全域物件、登入登出、雲端同步
    ├── kana.js              # 五十音資料
    ├── vocab.js             # N5–N1 單字 3126 筆
    ├── grammar.js           # N5–N1 文法 376 條
    └── app.js               # 主應用邏輯（最大）
```

### 重要的 app.js 模組／函式

- `init()` — 入口，DOMContentLoaded 後執行
- `initAuth()` — 接 AuthState 變化、登入 modal 控制、雲端同步
- `initProfileModal()` — 個人設定 modal
- `loadProgress()`、`saveProgress()` — 本機 + 雲端同步
- `mergeProgress(local, cloud)` — 登入時合併雲端與本機進度
- `recordAnswer(itemKey, isCorrect)` — 每題答完更新 SRS / 錯題 / 每日
- `getDueKeys()`、`getMistakeKeys()`、`getFavoriteKeys()`
- `startQuiz(type)`、`buildQuestion(type, target, pool)` — 出題
- `startMockExam(level, count)` — JLPT 模擬卷
- `renderReview()` — 複習頁
- `lookupByKey(key)` — 從 itemKey 反查資料

### itemKey 編碼

- `k:<kana>` 假名（如 `k:あ`）
- `v:<jp>|<cn>` 單字（如 `v:学校|學校`）
- `g:<pattern>` 文法（如 `g:〜は〜です`）

## 📊 內容規模

| 項目 | 數量 |
|---|---|
| 五十音 | 平/片各 46+25+33 = 共 208 |
| N5 單字 | 938 |
| N4 單字 | 775 |
| N3 單字 | 644 |
| N2 單字 | 469 |
| N1 單字 | 300 |
| **單字總計** | **3126** |
| N5 文法 | 53 |
| N4 文法 | 74 |
| N3 文法 | 81 |
| N2 文法 | 92 |
| N1 文法 | 76 |
| **文法總計** | **376** |

## ✅ 已完成功能

1. 五十音（6 個分頁：平/片假名 × 清/濁/拗音）
2. 單字（等級下拉、搜尋、分類、收藏★）
3. 文法（等級下拉、展開、收藏★）
4. 測驗 8 種題型（含漢字読み、JLPT 模擬卷）
5. SRS 簡化版（0–5 級、間隔 1/3/7/14/30 天）
6. 錯題本（最近 100）+ 收藏夾 + 連續學習天數
7. 複習頁（每日進度、SRS 分佈彩條、3 個複習區塊）
8. 主題切換（深淺色，pill 滑動式）
9. 羅馬拼音 toggle
10. 響應式（720px / 380px 兩個 breakpoint）
11. **Supabase 登入系統**（Email + 密碼）
12. **雲端同步**：登入後本機 ↔ 雲端 progress 雙向同步、防抖 1.5s
13. **個人設定**：改暱稱 / Email / 密碼、刪除帳號

## 🐛 已修過的 bug 紀錄

- 註冊後 submit 按鈕文字錯誤（finally 蓋掉 switchMode）
- 註冊成功訊息被 switchMode 隱藏
- 重整後登入狀態顯示成「登入」（時序問題：onChange listener 註冊晚於 emit）
- 手機 header 主題切換與登入按鈕重疊（grid-area 衝突）
- 分類名稱 N3/N4/N2/N1 多帶前綴的問題（已用 Node 批次清掉）

## 🎯 接下來要做的工作（D 方案 — 能力估算 + 推薦練習）

使用者剛選擇要做「**等級 3：能力估算 + 推薦練習**」（跳過等級 1 智慧出題與等級 2 弱項儀表板）。

### 待實作功能

1. **JLPT 等級估算**
   - 根據各等級的正確率計算一個分數
   - 顯示「你目前實力 ≈ N4 中段（往 N3 邁進中）」
   - 算法建議：用 SRS data 算每個等級的「精熟率」(Lv4+ 比例) × 該等級平均正確率，再依重要性加權
   - 顯示位置：複習頁頂部 + 使用者下拉選單

2. **每日推薦清單**
   - 自動算「今日建議練 X 個新詞、Y 個複習、Z 個錯題」
   - 比例可參考：新詞 30% / 到期複習 50% / 錯題 20%
   - 顯示在複習頁，提供「開始今日學習」一鍵按鈕進入加權的測驗

3. **難度自動升級提示**
   - 偵測使用者某等級已精熟（例如 N5 Lv4+ 達 80%）
   - 顯示「🎉 你的 N5 精熟度達 80%，建議開始挑戰 N4」橫幅
   - 提供「升級到 N4 預設」一鍵切換

### 涉及檔案

- `js/app.js`：加 `estimateLevel()`、`buildDailyRecommendation()`、`checkLevelUpgrade()`
- `index.html`：複習頁加區塊、user dropdown 加能力顯示
- `styles.css`：能力估算徽章、推薦清單卡片樣式

### 切記

- 沒有 SRS 紀錄的等級不要顯示 0%（要標「尚未練習」）
- 等級估算要有最小樣本門檻（例如 < 20 題不顯示，避免雜訊）
- 推薦清單要尊重等級設定（如果使用者只在練 N3，不要硬塞 N5 新詞）

## 🛠 部署流程

```powershell
cd C:\Users\D000020403\japanese-learning-site
az webapp up --html
```

部署完使用者要 Ctrl + F5 強制重整。

## 🧪 測試方式

之前用 Claude in Chrome 擴充功能跑過完整測試（樣式、JS 行為、Supabase 整合都 OK）。下次測試一樣可以用：
- `list_connected_browsers` → `select_browser` → `tabs_context_mcp` → `navigate`
- 用 `javascript_tool` 跑 JS 檢查 DOM/state
- 用 `screenshot` 看版面（特別注意 Claude 擴充功能會把含 "auth" 的 key 標為 sensitive，要繞過用 `'A'+'uthState'`）

## 💬 對話風格

- 繁體中文
- 簡潔直接、不過度說明
- 程式改完先語法檢查（`node -e "new Function(fs.readFileSync(...))"`）
- 大改動分階段、清楚列「使用者要做什麼 vs 我做什麼」

---

**新 session 第一句話可以說**：「請繼續從 HANDOFF.md 開始，幫我做 D 方案的能力估算 + 推薦練習功能。」
