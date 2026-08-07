---
title: "点击拨号如何实现：tel: 链接全流程"
description: "浏览器把 tel: 链接交给系统之后发生了什么：桌面应用如何声明与抢占协议、三条送达路径、解析器为何是安全边界，以及一个空格如何让整个平台失效。"
date: 2026-08-07
author: Eason Guo
tags: [语音AI, 工程, 通话]
lang: "zh-Hans"
---

点击拨号看上去什么都不是：你点一下网页上的电话号码，软电话就带着号码打开了。而在底下，这一次点击跨过四道信任边界，经由三种截然不同的操作系统机制之一送达，还要和一个尚未挂载的 React 应用赛跑。这是我们在 [WaveKat Voice](/zh/voice/)——一款可在 Mac 和 Linux 上运行、会记录并转写每一通通话的 SIP 软电话——里的实现方式，以及一路上踩过的坑。

想看面向用户的那一版，请读[点击拨号：点网页上的电话号码就能打](/zh/blog/click-to-call-phone-links/)。这一篇讲管道。

<link rel="stylesheet" href="/blog/click-to-call/widget.css" />

## tel: 链接到底是什么

电话链接是一个 URI，不是一个动作。`tel:+14155550123` 由 [RFC 3966](https://www.rfc-editor.org/rfc/rfc3966) 定义，`sip:alice@example.com` 由 [RFC 3261](https://www.rfc-editor.org/rfc/rfc3261) 定义，它们本身都不做任何事。浏览器并不知道怎么打电话。它知道的是：`tel:` 不是它负责的协议，于是它把这个字符串交给操作系统，请*别人*来处理。

这就是全部机制，也是全部安全模型。**一个被点击的电话链接，是不受信任的一方发来的请求，以字符串的形式送到你的应用手里。** 下面的一切，都是把这句话当真的结果。

`tel:` URI 也比看上去更脏。RFC 3966 允许视觉分隔符，所以 `tel:+1-415-555-0123` 和 `tel:+1 (415) 555-01.23` 都合法、都指同一个号码。它允许分号之后带参数——`tel:+14155550123;phone-context=example.com`。而且因为它要穿过 URL 机制，`+` 可能以百分号编码的 `%2B` 形式抵达。任何要拨打 `tel:` 链接的东西，都得先把这些全部规范化，它才开始有意义。

## 告诉系统你能处理电话链接

关于一个 URL 协议，应用能说两件不同的事，把它们混为一谈是第一个错误：

- **「我能处理这个」**——构建时烘进安装包的静态声明。
- **「我是这个协议的默认程序」**——运行时的抢占，它改变系统状态，并把关联从原先的持有者手里夺过来。

第一件事属于打包。在 Electron 里，三个平台都来自 `electron-builder.yml` 中的同一段：

```yaml
protocols:
  - name: Phone call
    schemes:
      - tel
      - sip
```

它会展开成 macOS `Info.plist` 里的 `CFBundleURLTypes`、Windows 安装程序里的注册表关联，以及生成的 Linux `.desktop` 文件里的 `MimeType=x-scheme-handler/tel;x-scheme-handler/sip;`——而该文件默认的 `Exec` 行本就带着 `%U` 占位符，会把被点击的 URL 作为参数传进来。声明不花任何代价，也不改变用户能看见的任何东西。

第二件事是 `app.setAsDefaultProtocolClient("tel")`，它可绝不是免费的。它被**电话链接**开关把关，且默认关闭，理由和「登录时打开」一样：抢占一个系统级关联是用户的决定，而不是应用刚装好就送的乔迁礼。这个调用究竟*做了什么*，各平台差别大到界面必须如实交代：

| 平台 | `setAsDefaultProtocolClient` 实际做了什么 |
|---|---|
| **macOS** | 立即设为默认处理程序（底层是 `LSSetDefaultHandlerForURLScheme`）——包括把 `tel:` 从 FaceTime 手里夺过来。 |
| **Windows 10+** | 有意忽略以编程方式设置默认值。它只把应用注册为*有能力处理*；由用户在系统的「你想如何打开？」选择器里确认。 |
| **Linux** | 转而调用 `xdg-settings`，它需要一个*已安装*的 `.desktop` 文件作为指向目标。在 `.deb` 上可行；在未做桌面集成的 AppImage 上会失败。 |

所以它返回的那个布尔值，其实是能力探测。当它返回 false，设置项里会显示一行简短的「无法设置电话链接」提示，而不是一边撒谎说已开启。记住这一点——Linux 那一行正是本文的终点。

## 被点击的 URL 抵达应用的三条路

这是没人提前警告你的部分。并不存在单一的「你收到了一个 URL」回调。有三条送达路径，它们互斥，既因平台而异，也因应用是否已在运行而异；如果你只实现了自己碰巧测到的那一条，功能在你机器上完美无缺，而对一半用户是坏的。

<div class="wk-w wk-nojs" data-wk-pipeline>
  <div class="wk-w-head">
    <span class="wk-w-title">同一次点击，三条送达路径</span>
    <span class="wk-w-hint">先选一条路径，再按下链接。</span>
  </div>
  <div class="wk-w-body">
    <div class="wk-chips" data-wk-tracks>
      <button type="button" data-track="macos" aria-pressed="true">macOS，应用已在运行</button>
      <button type="button" data-track="running">Linux / Windows，应用已在运行</button>
      <button type="button" data-track="cold">冷启动——应用未运行</button>
    </div>
    <button type="button" class="wk-run" data-wk-run>点击 <code>tel:+1-415-555-0123</code></button>
    <ol class="wk-steps" data-wk-steps>
      <li data-step="click" data-tracks="macos running cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">1</span>
        <span><span class="wk-step-name">浏览器放弃处理，把 URL 交给系统</span><span class="wk-step-detail">它根本不知道怎么打电话</span></span>
      </li>
      <li data-step="ls" data-tracks="macos" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">2</span>
        <span><span class="wk-step-name">Launch Services 解析出处理程序</span><span class="wk-step-detail">CFBundleURLTypes → WaveKat Voice 应用包</span></span>
      </li>
      <li data-step="openurl" data-tracks="macos" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">3</span>
        <span><span class="wk-step-name">app.on(&quot;open-url&quot;) 触发</span><span class="wk-step-detail">永远不走 argv。监听器挂在模块顶部——它可能早于 whenReady() 触发</span></span>
      </li>
      <li data-step="second" data-tracks="running" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">2</span>
        <span><span class="wk-step-name">系统又启动了一份应用副本</span><span class="wk-step-detail">Exec=… %U——URL 作为命令行参数抵达</span></span>
      </li>
      <li data-step="lock" data-tracks="running" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">3</span>
        <span><span class="wk-step-name">requestSingleInstanceLock() 拒绝了后来者</span><span class="wk-step-detail">它把自己的 argv 转交给原进程，然后退出</span></span>
      </li>
      <li data-step="secondevt" data-tracks="running" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">4</span>
        <span><span class="wk-step-name">原进程里触发 &quot;second-instance&quot;</span><span class="wk-step-detail">findDialUrlInArgv(argv)——一堆 Chromium 参数里的那一个 tel: 串</span></span>
      </li>
      <li data-step="launch" data-tracks="cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">2</span>
        <span><span class="wk-step-name">系统启动应用，URL 就在 argv 里</span><span class="wk-step-detail">此刻没有任何东西在监听——根本还没有应用可通知</span></span>
      </li>
      <li data-step="argv" data-tracks="cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">3</span>
        <span><span class="wk-step-name">冷启动时扫描 process.argv</span><span class="wk-step-detail">findDialUrlInArgv(process.argv)</span></span>
      </li>
      <li data-step="gate" data-tracks="macos running cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">4</span>
        <span><span class="wk-step-name">dispatchDialUrl()——偏好设置这道闸</span><span class="wk-step-detail">电话链接已关 → 在这里丢弃，不管系统还以为什么</span></span>
      </li>
      <li data-step="parse" data-tracks="macos running cold" data-payload="&quot;+14155550123&quot;">
        <span class="wk-dot">5</span>
        <span><span class="wk-step-name">parseDialUrl()——安全边界</span><span class="wk-step-detail">白名单、剥离、限长、规范化，否则返回 null</span></span>
      </li>
      <li data-step="debounce" data-tracks="macos running cold" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">6</span>
        <span><span class="wk-step-name">1 秒防抖，然后由主进程决定策略</span><span class="wk-step-detail">主进程读取自动拨号偏好，渲染进程无需做任何判断</span></span>
      </li>
      <li data-step="push" data-tracks="macos running" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">7</span>
        <span><span class="wk-step-name">已确知渲染进程在监听 → 推送</span><span class="wk-step-detail">webContents.send(&quot;wavekat:dial-url&quot;, payload)</span></span>
      </li>
      <li data-step="buffer" data-tracks="cold" data-payload="pending = { to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">7</span>
        <span><span class="wk-step-name">React 尚未挂载 → 暂存为待处理载荷</span><span class="wk-step-detail">主进程不去猜渲染进程什么时候就绪</span></span>
      </li>
      <li data-step="pull" data-tracks="cold" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">8</span>
        <span><span class="wk-step-name">界面挂载后拉取一次</span><span class="wk-step-detail">getPendingDialUrl() 取走并清空——恰好一次</span></span>
      </li>
      <li data-step="fire" data-tracks="macos running cold" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">9</span>
        <span><span class="wk-step-name">fireNewCall({ to, autoDial })</span><span class="wk-step-detail">和试拨回声测试用的是同一个触发器</span></span>
      </li>
      <li data-step="sheet" data-tracks="macos running cold" data-payload="等你按下「拨打」">
        <span class="wk-dot">10</span>
        <span><span class="wk-step-name">「新通话」面板打开，号码已填好</span><span class="wk-step-detail">仍然由人来按下「拨打」</span></span>
      </li>
    </ol>
    <p class="wk-payload"><span class="wk-payload-label">载荷</span><span data-wk-payload data-idle="—">—</span></p>
  </div>
</div>

把三条路径说白：

- **macOS，任何时候。** 永远是 `open-url` 事件，永远不是 argv。监听器必须在模块顶部同步挂上——*早于* `whenReady()`——因为冷启动时该事件可能在启动过程中就触发，而没有任何东西会替你重放它。
- **Linux 和 Windows，应用已在运行。** 系统会用带 URL 的 argv 启动*第二份副本*。`requestSingleInstanceLock()` 拒绝它，后来者通过 `second-instance` 事件把 argv 转交给原进程，然后退出。「应用在托盘里，用户点了链接」这种情况也由它覆盖。
- **冷启动，所有平台。** URL 要么躺在 `process.argv` 里（Linux/Windows），要么以一个极早的 `open-url` 抵达（macOS）。

`findDialUrlInArgv` 之所以存在，是因为 argv 并不是个整洁的地方。Linux 上真实的 Electron argv 是可执行文件路径、一堆 Chromium 参数，外加藏在其中的某一个 `tel:` 字符串。它扫描出第一个匹配协议模式的参数，并且刻意*不*匹配嵌在参数中间的协议，这样 `--url=tel:+123` 这样的标志永远不会被误当成一次点击。

## 解析器是一道安全边界

这三条路径最终都落到同一个函数上，而它是网页与你的拨号器之间唯一的屏障。它不是一个图方便的规范化工具——它是一道闸。互联网上任何页面都能放 `<a href="tel:…">`，所以抵达这里的字符串，按定义就受攻击者影响。

`parseDialUrl` 按「最便宜的拒绝优先」的顺序执行，返回一个可拨字符串或 `null`：

```ts
export const DIAL_URL_MAX_LENGTH = 512;
const SCHEME_RE = /^(tel|sip|sips):(.*)$/i;

export function parseDialUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  if (raw.length === 0 || raw.length > DIAL_URL_MAX_LENGTH) return null;

  const cleaned = raw.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  const m = SCHEME_RE.exec(cleaned);
  if (!m) return null;
  // … 规范化，然后校验形态，否则返回 null
}
```

试试看能不能把什么东西送过去：

<div class="wk-w wk-nojs" data-wk-parser
     data-w-none="无"
     data-w-removed="移除 {n} 个"
     data-w-rejected="拒绝"
     data-msg-pass="POST /calls/dial 收到"
     data-msg-fail="丢弃——什么都不会抵达拨号器。">
  <div class="wk-w-head">
    <span class="wk-w-title">parseDialUrl，逐阶段拆解</span>
    <span class="wk-w-hint">随便输入，或从这些开始：</span>
  </div>
  <div class="wk-w-body">
    <div class="wk-chips" data-wk-presets>
      <button type="button" data-v="tel:+1 (415) 555-0123">电话簿格式号码</button>
      <button type="button" data-v="tel:%2B14155550123">编码过的 +</button>
      <button type="button" data-v="tel:+14155550123;phone-context=example.com">RFC 3966 参数</button>
      <button type="button" data-v="tel:*21*0211234567#">服务码</button>
      <button type="button" data-v="sip:alice@example.com">SIP 地址</button>
      <button type="button" data-v="tel:+1415CALLNOW">助记号码</button>
      <button type="button" data-v="javascript:alert(1)">恶意协议</button>
      <button type="button" data-v="tel:1;rm -rf /">注入尝试</button>
      <button type="button" data-v="sip:;evil=1">畸形 SIP URI</button>
    </div>
    <label class="wk-io">
      <span class="wk-sr">要解析的电话链接</span>
      <input class="wk-input" type="text" data-wk-input value="tel:+1 (415) 555-0123" spellcheck="false" autocomplete="off" autocapitalize="off" />
    </label>
    <ol class="wk-stages" data-wk-stages>
      <li data-stage="length"><span class="wk-st-mark"></span><span class="wk-st-name">长度 ≤ 512</span><span class="wk-st-val"></span></li>
      <li data-stage="control"><span class="wk-st-mark"></span><span class="wk-st-name">剥离控制字符</span><span class="wk-st-val"></span></li>
      <li data-stage="scheme"><span class="wk-st-mark"></span><span class="wk-st-name">协议白名单</span><span class="wk-st-val"></span></li>
      <li data-stage="sipshape"><span class="wk-st-mark"></span><span class="wk-st-name">SIP user@host 形态</span><span class="wk-st-val"></span></li>
      <li data-stage="params"><span class="wk-st-mark"></span><span class="wk-st-name">截去 RFC 3966 参数</span><span class="wk-st-val"></span></li>
      <li data-stage="decode"><span class="wk-st-mark"></span><span class="wk-st-name">百分号解码</span><span class="wk-st-val"></span></li>
      <li data-stage="separators"><span class="wk-st-mark"></span><span class="wk-st-name">去掉视觉分隔符</span><span class="wk-st-val"></span></li>
      <li data-stage="shape"><span class="wk-st-mark"></span><span class="wk-st-name">可拨形态</span><span class="wk-st-val"></span></li>
    </ol>
    <p class="wk-verdict" data-wk-verdict>
      <span data-wk-verdict-text></span>
      <span class="wk-verdict-value" data-wk-verdict-value></span>
    </p>
  </div>
</div>

其中有四个决定值得单独拎出来：

**剥离控制字符，而不是因它拒绝。** 一个从 shell 中转过来的多余 `\r` 不该弄死一个本来有效的链接，但控制字符也没有任何理由活着进入下游。所以 `tel:+1415\r\n5550123` 会拨出 `+14155550123`。

**截去 RFC 3966 参数，同时也截掉了注入。** 按规范，第一个 `;` 之后的一切都是参数，所以在那里截断既正确*又*意味着 `tel:1;rm -rf /` 在任何别的东西看它之前就已缩减成号码 `1`。正确性与安全性指向同一个方向，是好的那种设计。

**校验形态，而不是把输入「修」到合法。** 最后一步是 `/^\+?[0-9*#]+$/` 外加「至少含一个数字」。不是「删掉坏字符」——是*拒绝*。`tel:+1415CALLNOW` 是个挺好的助记号码，而它返回 `null`，因为一个试图抢救畸形输入的解析器，迟早会抢救到它不该抢救的东西。

**`sips:` 被接受，但不被注册。** 这是有意的不对称：我们只向系统抢占 `tel` 和 `sip`，但如果某个安全 SIP 链接经由 `sip` 关联或手动打开抵达我们，把它当作普通 SIP URI 处理，好过直接丢掉。

解析器之后还有 1 秒防抖，因为某些桌面环境会为一次点击触发两次处理程序，也因为网页不该能靠连发一串 `tel:` 打开来刷屏拨号面板。而守护进程自己的拨号校验仍然拥有最终发言权——任何不可路由的东西它都会返回 `400`。解析器是第一道闸，不是唯一一道。

### 真正的关闭开关是偏好设置，不是系统关联

`dispatchDialUrl` 在解析任何东西*之前*先检查**电话链接**偏好，这个顺序是承重的。释放关联只能尽力而为——Linux 没有可靠的 `xdg`「取消设置」——所以在用户关闭功能很久之后，一个残留的系统关联仍可能带着 `tel:` URL 启动应用。如果反注册才是关闭开关，那「关」就只意味着「大致关了」。真正让它关掉的，是那次偏好检查。

## 为什么点击本身永远不会拨出电话

默认是「先填号、再确认」：号码落进输入框，由人按下「拨打」。有一个可选项**「点击电话链接时立即拨号」**，默认关闭，而且即便开启，在那些「立即拨出反而是错拨」的情形下它也会拒绝触发：

- **仅当恰好只有一个可拨账户时。** 零个或有歧义 → 填好号码让用户自己挑线路，而不是替他猜陌生人的链接该从你的哪个号码拨出去。
- **绝不在通话进行中拨出。** 通话中点击只会填号，不会闯进来。
- **窗口永远置前。** 即便是立即拨号，窗口也会弹出，所以网页永远无法拨出一通你看不见、也挂不掉的电话。

有两个实现细节让这些守卫是真的，而不只是愿望。这个决定用一个 ref 上锁，只有面板关闭时才重置——所以一次守卫失败对这次打开是*终局*的，稍后才注册上线的账户，不会去偷袭拨打一个用户正在看的号码。另外，`autoDial` 由主进程从持久化的偏好里决定，再作为一个普通布尔值传给渲染进程。策略只住在一个地方；渲染进程只管照做。

## 那场没人看见的赛跑

冷启动才是有意思的地方。URL 先于应用存在。主进程在几毫秒内就拿到了它；React 要几百毫秒之后才挂载。推早了，它就落在空处。

直觉是等一个「就绪」信号，而直觉是错的，因为 **`did-finish-load` 不等于「React 跑过了」**。页面可以在你的组件树挂载并订阅之前就完成加载。主进程从根本上无法观测到渲染进程的 effect 究竟何时真正挂上了监听器，所以任何「就绪时推送」的方案都是一场赛跑——你会在慢机器上输，在自己机器上赢。

解法是别再试图知道。两条都做，让晚到的那一方来驱动：

- **推送。** 当一个 URL 抵达、且已确知渲染进程在监听时，通过 `wavekat:dial-url` 发过去。
- **拉取。** 渲染进程在挂载时恰好调用一次 `getPendingDialUrl()`。主进程返回暂存的载荷并清空——而这次调用同时会翻转「渲染进程在监听」标志，于是之后的每个 URL 都走推送。

恰好送达一次，任何地方都不含时序假设。顺带一提，这个缓冲是覆盖而非排队：如果两个链接真的在挂载前先后抵达，最近的那个才是用户的本意。

同一个 bug 还有一个更尖锐的版本藏在上一层，害我们调试了一轮。最初的实现把 dial-URL 的订阅挂在应用外壳里。但设置外壳是应用外壳的*兄弟路由*，所以当用户导航到 `/settings/*` 时，归应用外壳所有的一切都会卸载。用户正待在设置页时点一个电话链接，载荷就无处可去——而且它连暂存都没有，因为主进程的「渲染进程在监听」标志从第一次挂载起就还是 true。一个生命周期本应等于整个会话的订阅，必须挂在会话所在的地方：路由之上，而不是某个路由之内。

## 那个明明能用、却报告失败的 deb

这是耗时最久的一个，因为所有直觉都指错了方向。

在 Debian 包上，点击拨号是彻底死的。不是时好时坏——是死的。而设置里的开关也这么说：它拒绝打开，并显示「无法设置电话链接」提示。`setAsDefaultProtocolClient("tel")` 一直返回 `false`。

只不过，系统这整段时间都在正确地把 `tel:` 链接路由到这个应用。从安装那一刻起就是。生成的 `.desktop` 文件带着 `MimeType=x-scheme-handler/tel;x-scheme-handler/sip;`，`update-desktop-database` 在安装时跑过，关联就在那儿。点击链接*确实*会启动 WaveKat Voice。只是它启动之后什么都不做。

找到之后，整条链是这样的：

Linux 上的 `setAsDefaultProtocolClient` 会转去调用 `xdg-settings set default-url-scheme-handler`。为了核验结果，`xdg-settings` 要把 desktop *名字*反解回一个可执行文件——而它的 GNOME 后端是用对 `Exec` 行做一次朴素的 `first_word()` 来干这件事的。我们的 `Exec` 行是：

```
Exec="/opt/WaveKat Voice/@wavekatvoice-desktop" %U
```

一个含空格的、被引号包起来的路径。`first_word()` 不理会引号、直接按空白切分，切出 `"/opt/WaveKat`，把它交给 `which`，`which` 失败，`xdg-settings` 以 2 退出，Electron 报告 `false`。

路径为什么被加了引号？当 `Exec` 无法通过 `[/0-9A-Za-z._-]` 字符测试时，electron-builder 就会给它加引号——而 `/opt/WaveKat Voice/@wavekatvoice-desktop` 在两处未通过：空格，以及 `@`。`/opt/<productName>` 这个目录名跟着产品名走，而产品名里有个空格，因为「WaveKat Voice」里就有个空格。

**产品名里的一个空格，让点击拨号在整个平台上失效。**

而它之所以是*彻底*死掉、而不只是标签写错，源于两层之外一个单独看完全正确的决定。`setPhoneLinks` 只在系统接受抢占时才持久化偏好——否则开关会显示「已开启」，而链接却哪儿也去不了，这恰恰是我们想避免的那种谎言。于是：`false` → 偏好从未保存 → 派发闸看到「关」→ 每一个被点击的链接都被静默丢弃。一个诚实的失败模式，忠实地传播了一个错误的答案。

`isDefaultProtocolClient` 也帮不上忙，因为它调用 `xdg-settings check`，有同样的缺陷。真正免疫的是 xdg 的*查询*侧——它报告当前处理程序的名字，而不是把名字反解成可执行文件：

```ts
execFileSync("xdg-mime", ["query", "default", `x-scheme-handler/${scheme}`])
  .trim() === `${basename(process.execPath)}.desktop`
```

所以在 Linux 上，`setAsDefaultProtocolClient` 返回的 `false` 不会被照单全收——它会拿 `xdg-mime query` 去核实，匹配上就视为成功。与其说是绕过，不如说是换了个这个工具真答得上来的问题去问。

打包层面的修法——一个不含空格的 `Exec`——并不可用：`/opt/<productName>` 目录跟着产品名走，而 electron-builder 不允许覆盖 `Exec`。运行时查询才是解法。

![Ubuntu 上的 WaveKat Voice —— 「新通话」面板已打开，电话号码已自动填好，待拨。](/screenshots/dial-prefilled/zh-Hans.webp)

## 可以推广的部分

把具体细节剥掉，对任何要处理 URL 协议的桌面应用，有四件事都成立：

1. **声明和抢占是两种不同的操作**，需要的用户同意也不同。构建时声明，只在用户要求时抢占。
2. **送达路径有三条，不是一条。** 三条都要测。你最容易忘的是「应用已在运行」，而它在真实使用中最常见。
3. **处理程序的入口是一条不可信输入边界。** 协议白名单、限制长度、校验形态、拒绝而不是修补。
4. **永远别让系统关联充当你的关闭开关。** 把行为挂在你自己的偏好上，因为在你要发布的平台里，至少有一个的反注册只能尽力而为。

点击拨号随 [0.0.43](/zh/voice/changelog/#0.0.43) 推出。和通话路径上的其他一切一样，它跑在[我们自研的 SIP 引擎](/zh/blog/our-own-sip-engine/)之上——这也正是我们能把一次点击一路推理到数据包的原因。

## 常见问题

### tel: 链接是怎么打开桌面应用的？

浏览器并不自己处理 `tel:`——它把 URL 交给操作系统，系统查出该协议已注册的处理程序，然后启动或通知它。应用在自己的包元数据里声明能处理 `tel:`（macOS 上是 `CFBundleURLTypes`，Linux 的 `.desktop` 里是 `x-scheme-handler/tel`，Windows 上是注册表项），并在用户主动开启时，另行在运行时抢占默认关联。

### 为什么 setAsDefaultProtocolClient 在 Linux 上返回 false？

最常见的原因是它转而调用 `xdg-settings`，而后者需要一个已安装的 `.desktop` 文件——所以未做桌面集成的 AppImage 是真的会失败。但它也可能是假阴性：`xdg-settings` 用对 `Exec` 行的朴素首词切分把 desktop 名字反解回可执行文件，遇到含空格的带引号路径就会出错。改用 `xdg-mime query default x-scheme-handler/tel` 去确认真实关联，它没有这个缺陷。

### Electron 应用怎么收到被点击的 tel: URL？

三种方式，而且三种你都需要。macOS 上是 `open-url` 事件——不是 argv——且监听器要挂在模块顶部，以便它能早于 `whenReady()` 触发。Linux 和 Windows 上应用已在运行时，系统会启动第二个进程，URL 在它的 argv 里；单实例锁通过 `second-instance` 事件把那份 argv 转交过来。冷启动时，URL 就在 `process.argv` 里。

### 怎么避免冷启动 URL 和界面挂载之间的竞态？

缓冲加一次性拉取。主进程暂存载荷，而不是去猜界面何时就绪；渲染进程在挂载时请求一次，这次请求同时把渲染进程标记为正在监听，于是之后的 URL 都走推送。`did-finish-load` 不是「React 已挂载并订阅」的安全替代信号。

### 让网页打开你的软电话安全吗？

安全，前提是链接只能*请求*一通电话，而不能拨出它。WaveKat Voice 默认填好号码、等人按下「拨打」。解析器只接受 `tel:`/`sip:`/`sips:`，把长度限制在 512 个字符，剥离控制字符，并校验结果的形态而不是试图修补它。即便开启了可选的立即拨号，它也不会从有歧义的账户拨出、不会打断进行中的通话，并且总会把窗口显示出来。

### 电话链接能往拨号命令里注入东西吗？

从这条路径不能。第一个 `;` 之后的一切都是 RFC 3966 参数，会在校验之前被截掉，所以 `tel:1;rm -rf /` 会缩减成 `1`。活下来的内容必须匹配 `/^\+?[0-9*#]+$/` 且至少含一个数字；其余一律直接拒绝，而不是清洗后放行。之后守护进程的拨号校验还会独立地拒绝任何不可路由的目标。

## 试试看

[下载 WaveKat Voice](/zh/voice/download/)，在 设置 → 通用 里打开**电话链接**，然后点击任意网页上的号码。如果你更想看这功能的简短版，请读[点击拨号的发布说明](/zh/blog/click-to-call-phone-links/)。

<script src="/blog/click-to-call/widget.js" defer></script>
