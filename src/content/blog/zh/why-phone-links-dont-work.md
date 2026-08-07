---
title: "为什么电脑上点电话号码没反应"
description: "手机点网页上的电话号码就能拨，电脑上却没反应，因为「电话应用」的位置是空的，WaveKat Voice 把 Mac 和 Linux 上的这个位置填上了。"
date: 2026-08-07
author: Eason Guo
tags: [语音AI, 通话]
lang: "zh-Hans"
---

网页上的电话号码，几乎都是可以点的链接。这东西叫 `tel:` 链接，已经存在二十多年了。不信你现在就试一下：<a href="tel:+14155550123">+1 (415) 555-0123</a>。放心点，这是保留的虚构号码，打不通任何人。点完发生什么，取决于你手里的设备。

用手机点，拨号界面立刻出来，一按就拨。可要是在电脑上点，多半什么都不会发生，或者跳出个奇怪的东西。链接没坏，问题出在别处。

## 浏览器为什么不自己打电话？

浏览器根本不处理电话链接。它看到 `tel:`，就把号码原样交给操作系统：有人要打这个电话，你看着办。操作系统去查一个固定的位置，也就是「打电话该用哪个应用」。谁登记在那儿，号码就交给谁。

道理一句话就能说清：手机上只有一个打电话的东西，所以从来不用问。电脑上有一个「电话应用」的位置，而大多数电脑上，这个位置是空的。

## 各个系统的那个位置里，都是谁？

**手机**：位置里永远是拨号器。所以直接响铃，你从来不用想这件事。

**Mac**：苹果预先把 FaceTime 放了进去。点一个号码，FaceTime 会弹出来，提议通过你的 iPhone 拨打。前提是你有 iPhone、就在手边、还配置好了接力功能。坐在办公桌前的人想要的，多半不是这个。

**Windows**：位置是空的。系统弹出「你要如何打开？」的选择框，列表常常一个应用都没有，或者让你去应用商店碰运气。

**Linux**：根本没有应用认领电话链接。点了，什么都不会发生。

所以链接从来没坏，只是没人应门。下面这个小工具可以点着玩，看看每种设备上到底发生了什么。

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← 你的设备">
  <div class="wk-slot-head">点一个电话链接，各设备分别由谁来接</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">手机</button>
      <button type="button" data-os="mac">Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac / Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">手机</p>
      <ol class="trace">
        <li><span class="who">你点了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置里是</span><span class="what"><span class="slotbox">拨号器，手机上唯一会打电话的东西</span></span></li>
        <li><span class="who">于是</span><span class="what ok">电话响了。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Mac</p>
      <ol class="trace">
        <li><span class="who">你点了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置里是</span><span class="what"><span class="slotbox">FaceTime，苹果放进去的</span></span></li>
        <li><span class="who">于是</span><span class="what meh">FaceTime 弹出来，提议用你的 iPhone 拨。前提是你有，而且在旁边，还配置好了。</span></li>
      </ol>
      <p class="note">坐在电脑前的人想要的，多半不是这个。</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">你点了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置里是</span><span class="what"><span class="slotbox is-empty">空的</span></span></li>
        <li><span class="who">于是</span><span class="what no">「你要如何打开？」列表常常一个应用都没有。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">你点了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置里是</span><span class="what"><span class="slotbox is-empty">空的</span></span></li>
        <li><span class="who">于是</span><span class="what no">什么都没发生。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac / Linux + WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">你点了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置里是</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice，你自己放进去的，一个开关的事</span></span></li>
        <li><span class="who">于是</span><span class="what ok">应用弹出来，号码已经填好。你按「拨打」。</span></li>
      </ol>
    </div>
  </div>
</div>

## WaveKat Voice 把这个位置填上了

[WaveKat Voice](/zh/voice/) 是 Mac 和 Linux 上的电话应用，每通电话都会自动录音、转成文字。从 [0.0.43](/zh/voice/changelog/#0.0.43) 起，它可以登记进那个空位。

在 设置 → 通用 里打开「电话链接」这一个开关就行。开关默认是关的：接管全电脑的电话链接，这种事应该由你自己决定，而不是应用装上就抢。打开之后，在任何网页上点电话号码，WaveKat Voice 会弹到最前面，号码已经填在拨号框里。你看一眼，按「拨打」。

![Ubuntu 上的 WaveKat Voice——「新通话」面板已打开，电话号码已自动填好，待拨。](/screenshots/dial-prefilled/zh-Hans.webp)

想看这个功能的完整介绍，可以读早前那篇[点击拨号：点网页上的电话号码就能打](/zh/blog/click-to-call-phone-links/)。

## 网页能让我的电脑打电话吗？

不能。链接只能「请求」，不能「拨打」。默认的流程是：号码填好，停在那儿，等你按「拨打」。没人按，电话就拨不出去。这一点很重要，因为网页上的链接是任何人都能放的。

嫌确认这一步多余的话，有个可选的「点击后立即拨号」设置，默认关闭。就算打开了，WaveKat Voice 也留着几道保险：正在通话时不会拨；分不清该用哪条线路时不会拨；而且窗口一定会弹到最前面。不存在你看不见的拨号。

## 常见问题

### 为什么在电脑上点电话号码没反应？

浏览器会把号码交给操作系统，操作系统去找登记过的「电话应用」。Windows 和 Linux 上这个位置通常是空的，所以点了没反应；Mac 上登记的是 FaceTime，所以弹出的是 FaceTime。

### 网页能让我的电脑打电话吗？

不能。`tel:` 链接只能请求拨号，不能直接拨出。WaveKat Voice 默认只把号码填进拨号框，必须有人按「拨打」，电话才会拨出去。

### Mac 上点电话号码为什么会打开 FaceTime？

因为苹果预先把 FaceTime 登记成了电话链接的处理应用，它会提议通过你的 iPhone 拨打，前提是 iPhone 在旁边并配置好了接力。装上 WaveKat Voice 并打开「电话链接」后，就换它来接管。

### 怎么让电脑直接拨打网页上的电话号码？

在 Mac 或 Linux 上安装 WaveKat Voice，在 设置 → 通用 里打开「电话链接」。之后点任何网页上的电话号码，它都会弹到前面并填好号码，按「拨打」就拨出去了。

## 再去点一次开头那个号码

就这么简单。链接等了二十多年，缺的只是一个应门的人。[下载 WaveKat Voice](/zh/voice/download/)，把开关打开，网页上的电话号码就都能点了。

<script src="/blog/phone-slot/widget.js" defer></script>
