---
title: "SIP over TLS：為軟體電話信令加密"
description: "WaveKat Voice 現可透過 TLS（連接埠 5061）連線 SIP 供應商，在 Mac、Windows 和 Linux 上加密註冊、撥號與轉接等 SIP 信令。"
date: 2026-09-26
author: Eason Guo
tags: [語音AI, SIP, 隱私]
lang: "zh-Hant"
---

WaveKat Voice 從 [0.0.56](/zh-hant/voice/changelog/#0.0.56) 開始支援 SIP over TLS。把線路的**連線方式**設為 `TLS`，連接埠填 `5061`，軟體電話和供應商之間的註冊、撥號、轉接、掛斷等 SIP 信令就全部走加密連線。Mac、Windows、Linux 都支援。

## 為什麼要用 TLS

每一通電話都從信令開始：軟體電話向供應商註冊，告訴對方要撥給誰，再把這通電話建立起來。這些流量裡有你的 SIP 帳號、撥打的號碼和驗證過程。走明文 UDP 時，同一條網路路徑上的任何人都讀得到。

TLS 是保護這段流量的標準做法：WaveKat Voice 和供應商之間的連線全程加密，送出任何內容之前，先確認對面真的是你的供應商。一支承載業務電話的軟體電話理應做到這一點，保護好你的通訊，也是我們贏得信任的基礎。所以 WaveKat Voice 的每條線路都可以使用 TLS。

## 加密範圍

| | UDP / TCP | TLS |
|---|---|---|
| REGISTER 驗證交換 | 明文 | 加密 |
| 撥出方、接聽方、時間（INVITE 等） | 明文 | 加密 |
| 保留、轉接、掛斷 | 明文 | 加密 |
| 語音（RTP） | 明文 | 明文 |
| 驗證伺服器身分 | 否 | 是，透過憑證 |
| 常用連接埠 | 5060 | 5061 |

驗證交換這一列最容易被低估。SIP 使用 Digest 驗證（[RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)），密碼本身不會在網路上傳送，但 `Authorization` 標頭裡的 `response` 是由密碼算出來的雜湊值。在 UDP 上，同一個網路裡的人只要擷取到這個封包，就能離線跑字典攻擊，弱密碼撐不了多久。改用 TLS，就沒有封包可以擷取了。

## SIP over TLS 的運作原理

一般的 SIP 通常跑在 UDP 5060 上：每則訊息是一個獨立的封包，內容是可讀的文字。SIP over TLS 換掉的是底層的傳輸方式，SIP 本身不變。

1. **一條連線。** 軟體電話和供應商建立一條 TCP 連線，連接埠通常是 5061。
2. **交握。** 送出任何 SIP 訊息之前，雙方先完成 TLS 交握。供應商出示憑證，軟體電話檢查憑證鏈能否追溯到受信任的憑證機構（CA），以及憑證是否簽發給這個 SIP 網域，接著雙方協商出工作階段金鑰。
3. **SIP 走在通道裡。** 之後雙向的每一則 SIP 訊息都透過這條連線加密傳送。訊息本身也會標明：`Via: SIP/2.0/TLS`，`Contact` 裡帶有 `;transport=tls`。
4. **連線持續保持。** 註冊會讓這條連線保持活躍，供應商也透過它把來電送回來。這也是為什麼位在 NAT 後面的電話不必設定連接埠轉送，也能收到來電的 INVITE。

![SIP over TLS 時序圖：WaveKat Voice 透過 5061 連接埠與供應商建立 TCP 連線，完成 TLS 交握並依 SIP 網域驗證憑證，之後 REGISTER、401 質詢、帶驗證資訊的 REGISTER、200 OK 以及來電的 INVITE 都在加密連線中傳送。](/blog/sip-over-tls/zh-Hant.svg)

TLS 保護的是一段路：WaveKat Voice 和供應商之間的這條連線。供應商再把電話轉給其他電信業者或公共電話網路時如何傳送，由供應商決定。

## 憑證如何驗證

TLS 能不能擋住中間人攻擊，取決於憑證驗證夠不夠嚴格。我們的做法：

- **只信任系統的根憑證。** 使用作業系統內建的受信任 CA 清單，不另外內附，也沒有例外。
- **依 SIP 網域驗證，而不是依伺服器位址。** 即使另外設定了外撥伺服器，憑證也必須簽發給帳號的 SIP 網域，這是 [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922) 的要求。
- **驗證失敗就停止。** 不會退回明文，也不會卡在「連線中」無限重試。線路直接顯示錯誤，錯誤訊息裡附上原因和憑證的 SHA-256 指紋，例如：

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

TLS 實作採用 Rust 的 `rustls`，所以在任何平台上都不依賴 OpenSSL。

不支援自簽憑證和私有 CA，應用程式裡也沒有「信任此憑證」的開關。如果供應商使用私有憑證，這條線路只能繼續用 UDP 或 TCP。

## 切換之前，先檢查供應商的 TLS

在應用程式裡改任何設定之前，用兩個標準指令就能判斷供應商的 TLS 能不能用。以下輸出是我們在 2026 年 9 月 26 日對兩家 SIP 供應商實際執行的結果：紐西蘭的 2talk，以及 Telnyx。

### 第一步：找出 TLS 的主機和連接埠

有些供應商會發布 SIP over TLS 的 SRV 記錄（[RFC 3263](https://www.rfc-editor.org/rfc/rfc3263)），直接指出要連哪台主機、哪個連接埠。Telnyx 就有發布：

```sh
$ dig +short SRV _sips._tcp.sip.telnyx.com
1 45 5061 sip-anycast1.telnyx.com.
1 95 5061 sip-anycast2.telnyx.com.
```

每一行依序是優先順序、權重、連接埠、主機。優先順序數字越小越優先；優先順序相同的記錄依權重分擔流量。這裡兩台主機的優先順序都是 1、連接埠都是 5061，所以用戶端會把連線分散到兩台上，大約三分之二落在 `sip-anycast2`。

2talk 沒有發布 SRV 記錄，同樣的查詢不會傳回任何結果。這種情況很常見，照供應商的文件設定即可：2talk 的文件給的是 `lyra.2talk.co.nz`，TLS 連接埠 5061。

### 第二步：像嚴格的用戶端一樣檢查憑證

連上這台主機，讓 OpenSSL 依 SIP 網域驗證憑證。以 2talk 為例（輸出已刪節）：

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname lyra.2talk.co.nz </dev/null
depth=2 C=US, O=DigiCert Inc, OU=www.digicert.com, CN=DigiCert Global Root G2
depth=1 C=US, O=DigiCert Inc, OU=www.digicert.com, CN=RapidSSL TLS RSA CA G1
depth=0 CN=*.2talk.co.nz
Verification: OK
Protocol: TLSv1.3
Verify return code: 0 (ok)
```

從這段輸出可以看出三件事：憑證是簽發給 `*.2talk.co.nz` 的萬用字元憑證，涵蓋 `lyra.2talk.co.nz`；憑證鏈一路追溯到 DigiCert 的公開根憑證；連線使用 TLS 1.3。`0 (ok)` 代表憑證驗證這一關應該能通過。

網域填錯時會是這樣。同一台伺服器，改用一個它不涵蓋的名稱來驗證：

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname sip.example.com </dev/null
Verification error: hostname mismatch
Verify return code: 62 (hostname mismatch)
```

WaveKat Voice 遇到這種情況會拒絕連線，並顯示憑證錯誤。最常見的傳回碼：

| 結果 | 意義 |
|---|---|
| `0 (ok)` | 憑證受信任，且對你的 SIP 網域有效 |
| `62 (hostname mismatch)` | 憑證不是簽發給這個 SIP 網域的，請向供應商確認網域 |
| `18`、`19` 或 `20` | 自簽憑證或由私有 CA 簽發，系統不信任 |
| 連線被拒或逾時 | 這個主機和連接埠沒有提供 TLS，或被防火牆擋住 |

OpenSSL 用的是它自己的 CA 憑證套件。在大多數 Linux 上就是系統憑證庫；在 Mac 上往往不是，所以在 Mac 上看到 `20` 只能當作參考，不能當成結論。

### 第三步（選用）：記下憑證指紋

如果想和 WaveKat Voice 憑證錯誤裡的指紋比對，可以印出憑證的 SHA-256 指紋和到期時間：

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 -servername lyra.2talk.co.nz </dev/null 2>/dev/null \
    | openssl x509 -noout -fingerprint -sha256 -enddate
sha256 Fingerprint=1D:64:FB:48:21:19:A1:CB:18:43:3B:20:9A:BB:03:96:A1:D2:43:9A:E6:F3:A4:B4:35:3A:33:86:E4:E0:E4:8F
notAfter=Feb 18 23:59:59 2027 GMT
```

OpenSSL 輸出的是帶冒號的大寫格式，WaveKat Voice 顯示的是不帶冒號的小寫格式，十六進位數字相同。供應商更新憑證後指紋會改變，這是正常的。

## 設定方式

1. 在供應商的文件裡找到 TLS 使用的主機名稱和連接埠。多數是 `5061`，也有供應商為 TLS 另外提供一個主機名稱。例如紐西蘭的 2talk，文件寫的就是 `5061`。
2. 開啟線路，把**連線方式**設為 `TLS`，連接埠欄位會自動建議 `5061`。
3. 確認帳號的 SIP 網域和供應商提供的完全一致，憑證就是依這個名稱驗證的。
4. 儲存，線路會透過 TLS 重新註冊。

一個常見的陷阱：**連線方式**選 `TCP`、連接埠填 `5061`，並不等於 TLS。這等於把明文 SIP 送到一個等待 TLS 交握的連接埠，註冊會失敗。

線路設定會同步到你的 WaveKat 帳號，換一台電腦登入，這條線路仍然是 TLS。

## 如何確認真的在走 TLS

線路連線資訊的下方有一個**技術詳細資料**連結。這個頁面顯示的是執行中連線實際生效的值，而不是你輸入的設定：

- **連線方式**是 `TLS`；
- **可在此接聽**以 `;transport=tls` 結尾；
- 在 **SIP 訊息**裡，每一個 `Via` 都是 `SIP/2.0/TLS`。

![Ubuntu 上的 WaveKat Voice：一條線路的技術詳細資料頁面，顯示實際生效的連線方式為 TLS，本機的接聽位址為 transport=tls。](/screenshots/line-technical-details-tls/zh-Hant.webp)

這條線路送出的 REGISTER 大致如下（範例，與截圖是同一條示範線路）：

```
Via: SIP/2.0/TLS 192.0.2.24:5066;branch=z9hG4bK…
Contact: <sip:1001@192.0.2.24:5066;transport=tls>
```

無法查證的加密只能憑信任，所以 TLS 上線時，也一併提供了查看實際傳輸方式的途徑。

SIP 訊息記錄只存在記憶體中，不寫入磁碟，關閉應用程式就消失。`Authorization` 和 `Proxy-Authorization` 標頭裡的 `response` 在擷取時就已清除，所以複製出去的記錄不會把密碼雜湊值洩漏給收到的人。

## 疑難排解

| 症狀 | 可能原因 | 解決方式 |
|---|---|---|
| 顯示 "Your provider's server didn't prove it is who it says it is"（供應商的伺服器無法證明自己的身分） | SIP 網域與憑證不符，或供應商使用私有憑證 | 檢查 SIP 網域；若是私有憑證，請向供應商索取使用公開信任憑證的連線端點 |
| 顯示 "The secure connection to your provider couldn't be set up"（無法與供應商建立安全連線） | 連接埠錯誤（常見是填成 5060），或這個主機名稱不提供 TLS | 依供應商文件設定連接埠和主機名稱 |
| 切換後完全無法註冊 | 設成 `TCP` + `5061`，或防火牆擋住了對外的 5061 | 把連線方式設為 `TLS`；允許對外 TCP 5061 |
| 原本正常，之後一直處於未註冊 | TLS 連線中斷（供應商重新啟動、路由器回收閒置連線），且沒有重新建立 | 在線路上按**重新登入** |

（這兩則錯誤訊息只有英文版，在中文介面下也會顯示英文原文。）

## 已知限制：TLS 斷線後不會自動重新連線

UDP 沒有連線可斷，網路短暫中斷也不會察覺。TLS 是一條長時間保持的連線：供應商重新啟動或路由器回收了這條連線，線路就會一直處於未註冊狀態，直到你按下**重新登入**。如果某條線路需要在無人看管時接聽電話，例如交給[通話流程](/zh-hant/blog/answer-calls-with-a-call-flow/)整夜接聽，切換前請把這一點列入考量。

## 常見問題

### 可以只為一條線路開啟 TLS 嗎？

可以。連線方式是個別線路的設定，每條線路都可以各自選擇 UDP、TCP 或 TLS。

### 一定要用 5061 連接埠嗎？

不一定。5061 是 SIP over TLS 的預設連接埠，但請以供應商的文件為準，有些供應商使用其他連接埠或另外的主機名稱。

### TCP 搭配 5061 連接埠等於 TLS 嗎？

不等於。那是把明文 SIP 送到 TLS 連接埠，註冊會失敗。請把連線方式設為 `TLS`。

### 支援哪些 TLS 版本？

TLS 1.2 和 TLS 1.3，也就是目前公認安全的兩個版本。TLS 1.0 和 1.1 分別發布於 1999 年和 2006 年，依賴 MD5、SHA-1 等已被攻破的演算法，IETF 已在 2021 年正式將它們廢棄（[RFC 8996](https://www.rfc-editor.org/rfc/rfc8996)），主流瀏覽器也早在多年前停止支援。不支援這兩個舊版本，連線就不會被降級到不安全的協定。實際上沒有任何損失：現今的 SIP 供應商都支援 TLS 1.2 以上，我們上面實測的 2talk 協商出的就是 TLS 1.3。

### 使用 TLS 還需要在路由器上設定連接埠轉送嗎？

不需要。來電是透過軟體電話主動建立的那條 TLS 連線送回來的。防火牆只需要允許對外的 TCP 5061，或供應商指定的連接埠。

### TLS 會讓通話變慢嗎？

感覺不出來。TLS 交握只在建立連線時進行一次，之後的註冊和每一通電話都沿用同一條連線，不會再重新交握。

### 如何確認線路真的有加密？

開啟線路的技術詳細資料：連線方式為 `TLS`，可在此接聽以 `;transport=tls` 結尾，SIP 訊息顯示 `Via: SIP/2.0/TLS`。

### 供應商的憑證過期或更換了會怎樣？

過期的憑證會驗證失敗：線路顯示憑證錯誤並停止，絕不會退回明文。如果供應商換成另一張由受信任 CA 簽發的有效憑證，則不需要任何操作，因為 WaveKat Voice 驗證的是憑證鏈和 SIP 網域，而不是鎖定某一張特定憑證。

### 支援自簽憑證嗎？

不支援。WaveKat Voice 只信任系統的根 CA，使用私有 CA 所簽發憑證的伺服器無法透過 TLS 連線。

### SIP over TLS 和 `sips:` 位址有什麼不同？

`sips:` 位址要求這通電話經過的每一段路都使用 TLS；`sip:` 位址加上 `;transport=tls` 則保護目前這一段。WaveKat Voice 的線路採用後者，保護你和供應商之間的連線。

## 試試看

[下載 WaveKat Voice](/zh-hant/voice/download/) 或更新到 [0.0.56](/zh-hant/voice/changelog/#0.0.56)，把一條線路切換成 `TLS`，再開啟技術詳細資料確認。其他連線設定請參考 [SIP 設定指南](/docs/voice/sip-trunks/)。
