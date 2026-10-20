# 雲端分享：設定與使用

## 原理
- 雲端 = 一個**公開**的 GitHub repo（`KaMikoRMT/ntuche-volley-data`）裡的一個檔案 `published.json`。
- 檔案內容是用「**觀看密碼**」加密過的資料（AES-GCM，金鑰由密碼經 PBKDF2 產生）。沒有密碼只是亂碼；球員姓名、對手、紀錄都不會明文出現在 repo。
- 寫入要有 GitHub **fine-grained token**，只存在上傳者的手機，而且用「**上傳密碼**」加密後才存（網頁關掉就要重新輸入上傳密碼）。
- 看的人打開 `https://kamikormt.github.io/ntuche-volley/#view`，輸入觀看密碼，只能看（沒有紀錄、編輯、匯入），資料只放在記憶體，不會動到他自己手機上的本機資料。

## 一次性設定（上傳者）
1. 在 GitHub 建一個**空的公開 repo**，名稱剛好是 `ntuche-volley-data`（勾選 Add a README）。
   - 為什麼不直接用程式的 repo：token 只給「資料 repo」權限，萬一外洩，最壞只會影響雲端資料，不會被拿去改程式碼。
2. 建 token（手機瀏覽器就可以）：GitHub → 右上頭像 → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token。
   - Token name：`ntuche-volley-upload`
   - Expiration：90 天（或自己選，最長 1 年；過期後重建一把、到「雲端設定」換上去）
   - Repository access：**Only select repositories** → 只選 `ntuche-volley-data`
   - Permissions → Repository permissions → **Contents：Read and write**（Metadata 會自動是 Read）
   - Generate token → 複製 `github_pat_…`（只會顯示一次）
3. 在程式「首頁 → 雲端分享 → 雲端設定」貼上 token，設定「觀看密碼」（給隊友）與「上傳密碼」（只有你）。

## 每次上傳
首頁 → 雲端分享 → 上傳到雲端 → 輸入上傳密碼 → 勾選要給隊友看的比賽 → 上傳。每次都是用勾選的場次**整份取代**雲端資料。完成後可以複製觀看連結（密碼不在連結裡，請另外傳）。

## 注意
- 觀看密碼忘了就解不開；重新上傳並設新密碼即可（手機上的原始資料不受影響）。
- 換觀看密碼：到「雲端設定」重設後重新上傳，舊密碼即失效。
- 觀看模式會記在該瀏覽器（`ntuche.mode`）：之後直接開網址也是觀看模式；想用自己的紀錄請按畫面上的「離開唯讀模式」。**不要把觀看連結加到主畫面**（主畫面版會變成完整版、本機是空的）；用瀏覽器開或存書籤。
- 不帶出去的東西：球員備註、設定、隊伍成員名單、沒勾選的比賽、備份時間、衝突暫存。
