# PR Summary

## 主要項目

- 加入觸控友善操作
  - 新增 `js/mobileControl.js` 與 `js/pathfinder.js`，支援手機「點擊移動 / 點擊 NPC 互動」。
  - 對話流程新增觸控選項判定（hit-test）與觸控確認機制，避免手機上選項無法點擊。

- 可在手機上遊玩
  - `index.html` 改為行動裝置友善配置（`viewport`、全螢幕 canvas、禁用觸控捲動/縮放干擾）。
  - `NovelInterface`、`BattleEngine`、`Title`/`Battle` 場景改為響應式版面與觸控事件，支援不同螢幕尺寸。
  - 手機裝置隱藏 CRT 外框，並處理 resize/orientation change，降低版面跑版問題。

- 拆除無效連結與失效內容
  - 移除已失效 NPC 與腳本：`overworld_racklin.js`、`overworld_mouinfo.js`、`overworld_listening.js`。
  - 地圖建立 NPC 時加入腳本存在檢查，若 script 不存在則自動移除該 NPC，避免 runtime 錯誤。
  - 修正部分過期連結（例如 `g0v.tw/join.html` → `g0v.tw/intl/zh-TW/novice/`），並收斂鐵匠 NPC 為有效資源。

- 修訂萌典查詢字詞為部份指定字詞
  - `npcs/overworld_moe.js` 新增 `FixedWords` 指定詞池。
  - 萌典互動選項由「全隨機」調整為「至少部分來自指定詞池」，並保留 fallback，提升內容品質與一致性。

## 其他調整

- 穩定性修正
  - `js/lib/crafty.js` 的 `undraw` 增加 parent 檢查，避免移除不存在節點時拋錯。
  - `js/npc.js` 在互動回呼加上 null guard，降低互動物件缺失造成的例外。

- 文件與維護
  - README 新增 mobile 重構協作說明與本地啟動方式。

## 後續展望

- 目前重構後僅為MVP
  - 可由社群共同協作，加入新的角色和對應的專案介紹與超連結
  - 程式碼與AI協作生成，可能尚有一些細微的UI/UX bugs待細修