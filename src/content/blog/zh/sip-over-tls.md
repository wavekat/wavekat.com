---
title: "SIP over TLS：给软电话信令加密"
description: "WaveKat Voice 现可通过 TLS（端口 5061）连接 SIP 服务商，在 Mac、Windows 和 Linux 上加密注册、呼叫和转接等 SIP 信令。"
date: 2026-09-26
author: Eason Guo
tags: [语音AI, SIP, 隐私]
lang: "zh-Hans"
---

WaveKat Voice 从 [0.0.56](/zh/voice/changelog/#0.0.56) 开始支持 SIP over TLS。线路的**连接方式**选 `TLS`，端口填 `5061`，软电话和服务商之间的注册、呼叫、转接、挂断等 SIP 信令就全部走加密连接。Mac、Windows、Linux 都支持。

## 为什么现在做

我们一直对用户说，WaveKat 会保护你的数据。[隐私政策](/zh/privacy/)里写着：网站、云同步、下载，凡是经过 WaveKat 的流量都走加密连接；SIP 密码从不离开你的电脑。

这些都是真的，但漏了最关键的一段。每一通电话，WaveKat Voice 都要和你的 SIP 服务商交换信令：谁打给谁、什么时间、你的 SIP 账号、注册时的认证过程。这一段过去一直是明文 UDP。隐私政策里把它归为「你和服务商之间的事」，这话只对了一半。服务商要支持 TLS 没错，但客户端能不能用 TLS，是我们的事，而之前 WaveKat Voice 根本没有这个选项。

说保护数据却没做到，这个缺口应该由我们来补。

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

## 证书怎么校验

TLS 能不能防住中间人，全看证书校验做得严不严。我们的做法：

- **只信系统的根证书。** 用操作系统自带的受信任 CA 列表，不内置、不另开例外。
- **按 SIP 域名校验，而不是按服务器地址。** 即使你另填了出站代理或服务器地址，证书也必须是签给账户 SIP 域名的，这是 [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922) 的要求。
- **校验失败就停。** 不降级回明文，也不在「正在连接」里无限重试。线路直接报错，技术详情里给出原因和证书的 SHA-256 指纹，比如：

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

TLS 实现用的是 Rust 的 `rustls`，三个平台都不依赖 OpenSSL。

不支持自签名证书和私有 CA，应用里也没有「信任此证书」的开关。服务商如果用的是私有证书，这条线只能用 UDP 或 TCP。

## 配置

1. 在服务商的文档里找到 TLS 用的主机名和端口。多数是 `5061`，也有服务商为 TLS 单独给一个主机名。比如新西兰的 2talk，文档里写的就是 `5061`。
2. 打开线路，**连接方式**选 `TLS`，端口会自动提示 `5061`。
3. 确认账户的 SIP 域名和服务商给的完全一致，证书是按这个域名校验的。
4. 保存，线路会用 TLS 重新注册。

一个常见的坑：**连接方式**选 `TCP`、端口填 `5061`，不等于 TLS。这是把明文 SIP 发到一个等着 TLS 握手的端口，注册不会成功。我们自己的 2talk 配置指南以前就这样写错过，后来改了。

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

这个页面是被一个 bug 逼出来的。之前线路设成 `TCP`，底层其实一直在走 UDP，而应用里每个界面都显示 TCP，因为它们读的都是配置，没有一个去看实际连接。我们为这个问题猜了整整一天。所以这次 TLS 一定要配一个能看到实际传输方式的地方，否则「已加密」也只能靠相信。

SIP 消息日志只存在内存里，不写磁盘，退出应用就没了。`Authorization` 和 `Proxy-Authorization` 里的 `response` 在记录时就被抹掉，复制出来贴给客服也不会带出密码哈希。

## 排错

| 现象 | 可能原因 | 处理 |
|---|---|---|
| 提示 "Your provider's server didn't prove it is who it says it is" | SIP 域名和证书不匹配，或服务商用的是私有证书 | 核对 SIP 域名；私有证书的话，问服务商有没有公共 CA 签发的接入点 |
| 提示 "The secure connection to your provider couldn't be set up" | 端口错了（常见是填成 5060），或这个主机名不提供 TLS | 按服务商文档改端口和主机名 |
| 切换后完全注册不上 | 选的是 `TCP` + `5061`，或防火墙拦了出站 5061 | 连接方式改成 `TLS`；放行出站 TCP 5061 |
| 原本正常，某次之后一直掉线 | TLS 连接断了（服务商重启、路由器回收空闲连接），没有自动重建 | 在线路上点**重新登录** |

（这两条错误提示只有英文，中文界面下也显示英文原文。）

## 我们怎么测的

上线前我们用 Docker 起了一台 Asterisk 22，pjsip 开 5061，证书由一个临时 CA 签发：

| 场景 | 结果 |
|---|---|
| CA 受信任，域名正确 | 注册成功（200），Asterisk 侧 contact 为 `transport=TLS` |
| 外呼 | 接通，3.07 秒后对端挂断，所有 `Via` 均为 `SIP/2.0/TLS` |
| 来电 | 在同一条 TLS 连接上振铃并接通 |
| CA 不受信任 | 立即失败：not signed by a trusted issuer，带指纹，无重试 |
| CA 受信任，域名错误 | 立即失败：not valid for this SIP domain |

## 已知限制：TLS 断线后不会自动重连

UDP 没有连接可断，网络抖一下也无所谓。TLS 是一条长连接，服务商重启或者路由器把空闲连接回收了，线路会一直处于未注册状态，直到你在线路上点**重新登录**。如果某条线要无人值守地接电话，比如交给[来电流程](/zh/blog/answer-calls-with-a-call-flow/)通宵接听，切换前要考虑这一点。

## 常见问题

### TCP 加 5061 端口算 TLS 吗？

不算。那是把明文 SIP 发到 TLS 端口，注册不会成功。要在连接方式里选 `TLS`。

### 怎么确认线路真的加密了？

打开线路的技术详情：连接方式为 `TLS`，可在此接听的地址以 `;transport=tls` 结尾，SIP 消息的 `Via` 为 `SIP/2.0/TLS`。

### 支持自签名证书吗？

不支持。WaveKat Voice 只信任系统根证书，私有 CA 签发的服务器无法通过 TLS 连接。

## 试试

[下载 WaveKat Voice](/zh/voice/download/) 或更新到 [0.0.56](/zh/voice/changelog/#0.0.56)，把一条线路切到 `TLS`，再打开技术详情看一眼。其他连接设置见 [SIP 配置指南](/docs/voice/sip-trunks/)。
