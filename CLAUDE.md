# CLAUDE.md

這個 repo 要做「台大化工男排整合系統」：隊伍管理＋賽中紀錄＋賽後覆盤／數據，做成單一 HTML 網頁程式。

## 開工前必讀

1. `docs/ARCHITECTURE.md`：完整規格。**第 12 節「容易誤解的地方」一定要先讀。**
2. `reference/v5-record-system.html`：程式碼基底。手機一屏紀錄畫面、正字紀錄表（`buildSheet` 等）、匯出流程從這裡搬，不要重新設計。
3. `reference/friend-app/*.png`：參考的介面截圖。
4. `docs/PROGRESS.md`：目前做到哪裡。每次開工先看，收工前更新。

## 工作方式

- 依 `docs/ARCHITECTURE.md` 第 9 節的階段 P1 → P7 依序做；一個階段通過驗收才進下一個。
- 每個階段完成：
  1. `node tests/selftest.mjs` 全部通過。
  2. 有無頭瀏覽器就實測 360×560、390×844；沒有就在 `docs/PROGRESS.md` 列出沒實測的畫面項目。
  3. 更新 `docs/PROGRESS.md`（完成項目、未完成項目、判斷紀錄）。
  4. commit，訊息開頭標階段，例如 `P2: team management`。
- 規格沒寫清楚時：選最簡單、最接近 v5 行為的做法，記進 `docs/PROGRESS.md` 的「判斷紀錄」，繼續做，不要停下來等。
- 不要新增規格沒有的功能。

## 硬性限制

- 成品是 `app/index.html` 單一檔案，用瀏覽器直接打開就能跑（`file://` 也要能用）。另外只有 `app/manifest.webmanifest`、`app/sw.js`、圖示（P7）。
- 原生 JavaScript。不要 React、Babel、Tailwind、npm 套件、打包工具。
- 外部函式庫只有匯出時延遲載入的 html2canvas 1.4.1、jsPDF 2.5.1（cdnjs，鎖版本）。
- 不要用 `alert`／`confirm`／`prompt`；用頁內確認面板。
- 介面文字繁體中文（台灣用語）；程式碼識別字用英文。
- 純邏輯（CONFIG／SCHEMA／DERIVE／STATS／SELFTEST）放在 `/* @core-begin */` 與 `/* @core-end */` 之間，不碰 DOM 和 window，讓 `tests/selftest.mjs` 能在 Node 跑。
- 使用者輸入的文字放進 HTML 前一律跳脫（`esc()`）。
