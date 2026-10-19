# 台大化工男排整合系統

隊伍管理、賽中紀錄、賽後覆盤與數據分析，整合成一個手機也能用的網頁程式。資料存在裝置上，可以匯出成紀錄檔，在其他裝置匯入後接著用。

- 規格：[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- 進度：[docs/PROGRESS.md](docs/PROGRESS.md)
- 成品（建置中）：`app/index.html`，用瀏覽器直接打開即可使用

## 參考資料

- `reference/v5-record-system.html`：目前使用中的賽中紀錄系統 v5（正字紀錄表、比分軌跡）
- `reference/volleytracker-pro.html`：舊的賽後評分系統
- `reference/friend-app/`：參考 App 的介面截圖

## 測試

```bash
node tests/selftest.mjs
```
