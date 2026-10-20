# 台大化工男排整合系統

隊伍管理、賽中紀錄、賽後覆盤與數據分析，整合成一個手機也能用的網頁程式。資料存在裝置上，可以匯出成紀錄檔，在其他裝置匯入後接著用。

- 規格：[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- 進度：[docs/PROGRESS.md](docs/PROGRESS.md)
- 成品：`app/index.html`（單一檔案、原生 JavaScript），用瀏覽器直接打開即可使用；`app/manifest.webmanifest`、`app/sw.js`、`app/icon-*.png` 是網址版（加到主畫面、離線開啟）用的。

## 功能

- **隊伍**：球員庫、賽季與 A/B 隊、升隊（球員 ID 不變，歷史數據跟著走）、封存、貼上匯入名單、預設陣容。
- **紀錄**：賽前設定、手機一屏的賽中紀錄（場上 7 人／全名單、換人、輪轉、攻擊被守起、復原）、正字紀錄表（PNG／PDF）。
- **數據**：比賽歷史、本場報告、逐球覆盤、跨場分析、球員生涯、CSV。
- **備份**：匯出／匯入紀錄檔（.json），匯入前先預覽合併結果。

## 怎麼用

- 直接開檔：用瀏覽器打開 `app/index.html`（`file://` 也能用；不會註冊 Service Worker）。
- 在電腦上用網址開（才有離線與加到主畫面）：在 `app/` 資料夾執行 `python3 -m http.server 8000`，開 `http://localhost:8000/`。
- 手機：與電腦同一個 Wi‑Fi，開 `http://電腦IP:8000/`（分享選單與螢幕常亮需要 HTTPS，區網版沒有）。
- 網址版：https://kamikormt.github.io/ntuche-volley/（GitHub Pages；合併進 `main` 且動到 `app/` 或 `tests/` 時自動發佈，見 `.github/workflows/pages.yml`）。

## 參考資料

- `reference/v5-record-system.html`：舊的賽中紀錄系統 v5（正字紀錄表的版面來源）
- `reference/volleytracker-pro.html`：舊的賽後評分系統
- `reference/friend-app/`：參考 App 的介面截圖

## 測試

```bash
node tests/selftest.mjs
```

把 `app/index.html` 裡 `/* @core-begin */` 到 `/* @core-end */` 的純邏輯抽出來在 Node 裡執行，涵蓋資料模型、事件流推導、統計公式、匯出入合併、隊伍管理、覆盤、跨場分析。

## 雲端分享（給隊友看）

上傳者把選的比賽加密上傳，隊友用 `…/ntuche-volley/#view` 加觀看密碼就能唯讀查看最新數據。設定步驟見 [docs/CLOUD.md](docs/CLOUD.md)。
