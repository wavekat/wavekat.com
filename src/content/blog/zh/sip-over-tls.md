---
title: "SIP over TLS：给软电话信令加密"
description: "WaveKat Voice 现可通过 TLS（端口 5061）连接 SIP 服务商，在 Mac、Windows 和 Linux 上加密注册、呼叫和转接等 SIP 信令。"
date: 2026-09-26
author: Eason Guo
tags: [语音AI, SIP, 隐私]
lang: "zh-Hans"
---

WaveKat Voice 从 [0.0.56](/zh/voice/changelog/#0.0.56) 开始支持 SIP over TLS。线路的**连接方式**选 `TLS`，端口填 `5061`，软电话和服务商之间的注册、呼叫、转接、挂断等 SIP 信令就全部走加密连接。Mac、Windows、Linux 都支持。

## 为什么要用 TLS

每一通电话都从信令开始：软电话向服务商注册，告诉对方要呼叫谁，再把这通电话建立起来。这些流量里有你的 SIP 账号、拨打的号码和认证过程。走明文 UDP 时，同一网络路径上的任何人都能读到。

TLS 是保护这段流量的标准做法：WaveKat Voice 和服务商之间的连接全程加密，发送任何内容之前先验证对面确实是你的服务商。一个承载业务电话的软电话理应做到这一点，保护好你的通信，也是我们赢得信任的基础。所以 WaveKat Voice 的每条线路都可以使用 TLS。

## 加密范围

| | UDP / TCP | TLS |
|---|---|---|
| REGISTER 认证交换 | 明文 | 加密 |
| 主叫、被叫、时间（INVITE 等） | 明文 | 加密 |
| 保持、转接、挂断 | 明文 | 加密 |
| 语音（RTP） | 明文 | 明文 |
| 验证服务器身份 | 否 | 是，校验证书 |
| 常用端口 | 5060 | 5061 |

认证交换这一行最容易被低估。SIP 用 Digest 认证（[RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)），密码本身不上网，但 `Authorization` 头里的 `response` 是用密码算出来的哈希。在 UDP 上，同一个网络里的人抓到这个包，就可以离线跑字典，弱密码撑不了多久。换成 TLS，这个包就抓不到了。

## SIP over TLS 的基本原理

普通 SIP 一般跑在 UDP 5060 上：每条消息是一个独立的数据包，内容是可读的文本。SIP over TLS 换的是底下的传输层，SIP 协议本身不变。

1. **一条连接。** 软电话和服务商建立一条 TCP 连接，端口通常是 5061。
2. **握手。** 发送任何 SIP 消息之前，双方先完成 TLS 握手。服务商出示证书，软电话检查证书链是否能追溯到受信任的 CA、证书是否签给这个 SIP 域名，然后双方协商出会话密钥。
3. **SIP 走在隧道里。** 之后双向的每一条 SIP 消息都通过这条连接加密传输。消息本身也会标明：`Via: SIP/2.0/TLS`，`Contact` 里带 `;transport=tls`。
4. **连接一直保持。** 注册会让这条连接保持活跃，服务商也通过它把来电送回来。这也是为什么在 NAT 后面的电话不用做端口转发，也能收到来电的 INVITE。

![SIP over TLS 时序图：WaveKat Voice 通过 5061 端口与服务商建立 TCP 连接，完成 TLS 握手并按 SIP 域名校验证书，之后 REGISTER、401 质询、带认证的 REGISTER、200 OK 以及来电的 INVITE 都在加密连接中传输。](/blog/sip-over-tls/zh-Hans.svg)

TLS 保护的是一跳：WaveKat Voice 和服务商之间的这段链路。服务商再把电话转给其他运营商或公共电话网时怎么传输，由服务商决定。

## 证书怎么校验

TLS 能不能防住中间人，全看证书校验做得严不严。我们的做法：

- **只信系统的根证书。** 用操作系统自带的受信任 CA 列表，不内置、不另开例外。
- **按 SIP 域名校验，而不是按服务器地址。** 即使你另填了出站代理或服务器地址，证书也必须是签给账户 SIP 域名的，这是 [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922) 的要求。
- **校验失败就停。** 不降级回明文，也不在「正在连接」里无限重试。线路直接报错，错误信息里带着原因和证书的 SHA-256 指纹，比如：

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

TLS 实现用的是 Rust 的 `rustls`，三个平台都不依赖 OpenSSL。

不支持自签名证书和私有 CA，应用里也没有「信任此证书」的开关。服务商如果用的是私有证书，这条线只能用 UDP 或 TCP。

## 切换之前，先检查服务商的 TLS

在应用里改任何设置之前，用两条标准命令就能判断服务商的 TLS 能不能用。下面的输出是我们在 2026 年 9 月 26 日对两家 SIP 服务商的实测结果：新西兰的 2talk，以及 Telnyx。

### 第一步：找出 TLS 的主机和端口

有的服务商会发布 SIP over TLS 的 SRV 记录（[RFC 3263](https://www.rfc-editor.org/rfc/rfc3263)），直接告诉你连哪台主机、哪个端口。Telnyx 就发布了：

```sh
$ dig +short SRV _sips._tcp.sip.telnyx.com
1 45 5061 sip-anycast1.telnyx.com.
1 95 5061 sip-anycast2.telnyx.com.
```

每行依次是优先级、权重、端口、主机。优先级数字越小越优先；优先级相同的记录按权重分担流量。这里两台主机优先级都是 1、端口都是 5061，客户端会把连接分散到两台上，大约三分之二落到 `sip-anycast2`。

2talk 没有发布 SRV 记录，同样的查询什么也不返回。这种情况很常见，按服务商文档来就行：2talk 的文档给的是 `lyra.2talk.co.nz`，TLS 端口 5061。

### 第二步：像严格的客户端一样检查证书

连上这台主机，让 OpenSSL 按 SIP 域名校验证书。以 2talk 为例（输出有删减）：

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

从这段输出能读出三件事：证书是签给 `*.2talk.co.nz` 的通配符证书，覆盖 `lyra.2talk.co.nz`；证书链一路追溯到 DigiCert 的公共根证书；连接用的是 TLS 1.3。`0 (ok)` 说明证书这一关应该能过。

如果域名填错了，结果会是这样。同一台服务器，按一个它不覆盖的名字校验：

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname sip.example.com </dev/null
Verification error: hostname mismatch
Verify return code: 62 (hostname mismatch)
```

WaveKat Voice 遇到这种情况会拒绝连接，并提示证书错误。常见的返回码：

| 结果 | 含义 |
|---|---|
| `0 (ok)` | 证书受信任，且对你的 SIP 域名有效 |
| `62 (hostname mismatch)` | 证书不是签给这个 SIP 域名的，找服务商核对域名 |
| `18`、`19` 或 `20` | 自签名或私有 CA 签发，系统不信任 |
| 连接被拒绝或超时 | 这个主机和端口没有提供 TLS，或者被防火墙拦了 |

OpenSSL 用的是它自己的 CA 证书包。大多数 Linux 上就是系统证书库；在 Mac 上往往不是，所以在 Mac 上看到 `20`，只能当作参考，不能当结论。

### 第三步（可选）：记下证书指纹

想和 WaveKat Voice 证书错误里的指纹对一下，可以打印证书的 SHA-256 指纹和到期时间：

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 -servername lyra.2talk.co.nz </dev/null 2>/dev/null \
    | openssl x509 -noout -fingerprint -sha256 -enddate
sha256 Fingerprint=1D:64:FB:48:21:19:A1:CB:18:43:3B:20:9A:BB:03:96:A1:D2:43:9A:E6:F3:A4:B4:35:3A:33:86:E4:E0:E4:8F
notAfter=Feb 18 23:59:59 2027 GMT
```

OpenSSL 输出的是带冒号的大写形式，WaveKat Voice 显示的是不带冒号的小写形式，十六进制数字是一样的。服务商到期换证书后，指纹会变，这是正常的。

## 配置

1. 在服务商的文档里找到 TLS 用的主机名和端口。多数是 `5061`，也有服务商为 TLS 单独给一个主机名。比如新西兰的 2talk，文档里写的就是 `5061`。
2. 打开线路，**连接方式**选 `TLS`，端口会自动提示 `5061`。
3. 确认账户的 SIP 域名和服务商给的完全一致，证书是按这个域名校验的。
4. 保存，线路会用 TLS 重新注册。

一个常见的坑：**连接方式**选 `TCP`、端口填 `5061`，不等于 TLS。这是把明文 SIP 发到一个等着 TLS 握手的端口，注册不会成功。

线路配置会同步到 WaveKat 账户，换一台电脑登录，这条线还是 TLS。

## 怎么确认真的在走 TLS

线路页面的连接信息下面有个**技术详情**入口。这个页面显示的是运行中的实际值，不是你填的配置：

- **连接方式**是 `TLS`；
- **可在此接听**以 `;transport=tls` 结尾；
- **SIP 消息**里，每条消息的 `Via` 都是 `SIP/2.0/TLS`。

![Ubuntu 上的 WaveKat Voice —— 一条线路的技术详情页面：实际生效的连接方式为 TLS，本设备的可达地址为 transport=tls。](/screenshots/line-technical-details-tls/zh-Hans.webp)

注册时发出去的消息大致是这样（示例，与截图中是同一条演示线路）：

```
Via: SIP/2.0/TLS 192.0.2.24:5066;branch=z9hG4bK…
Contact: <sip:1001@192.0.2.24:5066;transport=tls>
```

看不到的加密只能靠相信，所以 TLS 和这个能看到实际传输方式的页面一起上线。

SIP 消息日志只存在内存里，不写磁盘，退出应用就没了。`Authorization` 和 `Proxy-Authorization` 里的 `response` 在记录时就被抹掉，复制出来贴给客服也不会带出密码哈希。

## 排错

| 现象 | 可能原因 | 处理 |
|---|---|---|
| 提示 "Your provider's server didn't prove it is who it says it is" | SIP 域名和证书不匹配，或服务商用的是私有证书 | 核对 SIP 域名；私有证书的话，问服务商有没有公共 CA 签发的接入点 |
| 提示 "The secure connection to your provider couldn't be set up" | 端口错了（常见是填成 5060），或这个主机名不提供 TLS | 按服务商文档改端口和主机名 |
| 切换后完全注册不上 | 选的是 `TCP` + `5061`，或防火墙拦了出站 5061 | 连接方式改成 `TLS`；放行出站 TCP 5061 |
| 原本正常，某次之后一直掉线 | TLS 连接断了（服务商重启、路由器回收空闲连接），没有自动重建 | 在线路上点**重新登录** |

（这两条错误提示只有英文，中文界面下也显示英文原文。）

## 已知限制：TLS 断线后不会自动重连

UDP 没有连接可断，网络抖一下也无所谓。TLS 是一条长连接，服务商重启或者路由器把空闲连接回收了，线路会一直处于未注册状态，直到你在线路上点**重新登录**。如果某条线要无人值守地接电话，比如交给[来电流程](/zh/blog/answer-calls-with-a-call-flow/)通宵接听，切换前要考虑这一点。

## 常见问题

### 可以只给一条线路开 TLS 吗？

可以。连接方式是按线路设置的，每条线路可以单独选 UDP、TCP 或 TLS，互不影响。

### 必须用 5061 端口吗？

不必。5061 是 SIP over TLS 的默认端口，但以服务商文档为准，有的服务商会用别的端口或单独的主机名。

### TCP 加 5061 端口算 TLS 吗？

不算。那是把明文 SIP 发到 TLS 端口，注册不会成功。要在连接方式里选 `TLS`。

### 支持哪些 TLS 版本？

TLS 1.2 和 TLS 1.3，这也是目前公认安全的两个版本。TLS 1.0 和 1.1 分别发布于 1999 年和 2006 年，依赖已经被攻破的 MD5、SHA-1 等算法，IETF 在 2021 年正式将它们废弃（[RFC 8996](https://www.rfc-editor.org/rfc/rfc8996)），主流浏览器也早已不再支持。不支持这两个旧版本，是为了不让连接被降级到不安全的协议上。实际使用中几乎没有影响：现在的 SIP 服务商普遍支持 TLS 1.2 或更高版本，我们实测的 2talk 用的就是 TLS 1.3。

### 开了 TLS，还需要在路由器上做端口转发吗？

不需要。来电是通过软电话主动建立的那条 TLS 连接送回来的，只要防火墙放行出站 TCP 5061（或服务商指定的端口）即可。

### TLS 会让通话变慢吗？

基本不会。TLS 握手只在建立连接时进行一次，之后的注册和每一通电话都复用这条连接，不会每次呼叫都重新握手。

### 怎么确认线路真的加密了？

打开线路的技术详情：连接方式为 `TLS`，可在此接听的地址以 `;transport=tls` 结尾，SIP 消息的 `Via` 为 `SIP/2.0/TLS`。

### 服务商的证书过期或更换了会怎样？

过期的证书会校验失败，线路报证书错误并停止连接，不会降级成明文。服务商换成另一张受信任 CA 签发的有效证书，则无需任何操作：WaveKat Voice 不固定某一张证书，只校验证书链和 SIP 域名。

### 支持自签名证书吗？

不支持。WaveKat Voice 只信任系统根证书，私有 CA 签发的服务器无法通过 TLS 连接。

### SIP over TLS 和 `sips:` 地址有什么区别？

`sips:` 地址要求这通电话经过的每一跳都使用 TLS；`sip:` 地址加 `;transport=tls` 只保护当前这一跳。WaveKat Voice 的线路使用后者，保护的是你和服务商之间的连接。

## 试试

[下载 WaveKat Voice](/zh/voice/download/) 或更新到 [0.0.56](/zh/voice/changelog/#0.0.56)，把一条线路切到 `TLS`，再打开技术详情看一眼。其他连接设置见 [SIP 配置指南](/docs/voice/sip-trunks/)。
