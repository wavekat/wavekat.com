---
title: "為什麼電腦上點電話號碼沒反應"
description: "手機點網頁上的電話號碼就能撥，電腦上卻沒反應，因為「電話應用程式」的位置是空的，WaveKat Voice 把 Mac 和 Linux 上的這個位置填上了。"
date: 2026-08-07
author: Eason Guo
tags: [語音AI, 通話]
lang: "zh-Hant"
---

網頁上的電話號碼，幾乎都是可以點的連結。這種東西叫 `tel:` 連結，已經存在二十幾年了。不信現在就試一下：<a href="tel:+14155550123">+1 (415) 555-0123</a>。放心點，這是保留的虛構號碼，打不通任何人。點下去會發生什麼事，完全看你手上是什麼裝置。

用手機點，撥號畫面馬上跳出來，按一下就撥出去。換到電腦上點，多半什麼事都沒有，不然就是跳出一個奇怪的東西。連結沒壞，問題出在別的地方。

## 瀏覽器為什麼不自己打電話？

瀏覽器根本不處理電話連結。它看到 `tel:`，就把號碼原封不動交給作業系統：有人要打這通電話，你看著辦。作業系統會去查一個固定的位置，也就是「打電話該用哪個應用程式」。誰登記在那裡，號碼就交給誰。

道理一句話就講完：手機上只有一個會打電話的東西，所以從來不必問。電腦上有一個「電話應用程式」的位置，而大多數電腦上，這個位置是空的。

## 各個系統的那個位置裡，都是誰？

**手機**：位置裡永遠是撥號器。所以直接響鈴，你從來不用想這件事。

**Mac**：Apple 預先把 FaceTime 放了進去。點一個號碼，FaceTime 會跳出來，提議透過你的 iPhone 撥打。前提是你有 iPhone、就在手邊，還設定好了接力功能。坐在辦公桌前的人想要的，多半不是這個。

**Windows**：位置是空的。系統跳出「你要如何開啟？」的視窗，清單裡常常一個應用程式都沒有，不然就是叫你去應用程式商店碰運氣。

**Linux**：根本沒有應用程式認領電話連結。點了，什麼都不會發生。

所以連結從來沒壞，只是沒人應門。下面這個小工具可以點著玩，看看每種裝置上到底發生了什麼事。

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← 你的裝置">
  <div class="wk-slot-head">點一個電話連結，各裝置分別由誰來接</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">手機</button>
      <button type="button" data-os="mac">Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac / Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">手機</p>
      <ol class="trace">
        <li><span class="who">你點了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置裡是</span><span class="what"><span class="slotbox">撥號器，手機上唯一會打電話的東西</span></span></li>
        <li><span class="who">於是</span><span class="what ok">電話響了。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Mac</p>
      <ol class="trace">
        <li><span class="who">你點了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置裡是</span><span class="what"><span class="slotbox">FaceTime，Apple 放進去的</span></span></li>
        <li><span class="who">於是</span><span class="what meh">FaceTime 跳出來，提議用你的 iPhone 撥。前提是你有，而且在手邊，還設定好了。</span></li>
      </ol>
      <p class="note">坐在電腦前的人想要的，多半不是這個。</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">你點了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置裡是</span><span class="what"><span class="slotbox is-empty">空的</span></span></li>
        <li><span class="who">於是</span><span class="what no">「你要如何開啟？」清單裡常常一個應用程式都沒有。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">你點了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置裡是</span><span class="what"><span class="slotbox is-empty">空的</span></span></li>
        <li><span class="who">於是</span><span class="what no">什麼都沒發生。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac / Linux + WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">你點了</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">位置裡是</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice，你自己放進去的，一個開關的事</span></span></li>
        <li><span class="who">於是</span><span class="what ok">應用程式跳出來，號碼已經填好。你按「撥號」。</span></li>
      </ol>
    </div>
  </div>
</div>

## WaveKat Voice 把這個位置填上了

[WaveKat Voice](/zh-hant/voice/) 是 Mac 和 Linux 上的電話應用程式，每通電話都會自動錄音、轉成文字。從 [0.0.43](/zh-hant/voice/changelog/#0.0.43) 起，它可以登記進那個空位。

在 設定 → 一般 裡打開「電話連結」這一個開關就好。開關預設是關的：接管整台電腦的電話連結，這種事應該由你自己決定，而不是應用程式一裝好就搶。打開之後，在任何網頁上點電話號碼，WaveKat Voice 會跳到最前面，號碼已經填在撥號欄位裡。你看一眼，按「撥號」。

![Ubuntu 上的 WaveKat Voice —— 「新通話」面板已開啟，電話號碼已自動填好，待撥。](/screenshots/dial-prefilled/zh-Hant.webp)

想看這個功能的完整介紹，可以讀先前那篇[點擊撥號：點網頁上的電話號碼就能打](/zh-hant/blog/click-to-call-phone-links/)。

## 網頁能讓我的電腦打電話嗎？

不能。連結只能「請求」，不能「撥打」。預設的流程是：號碼填好，停在那裡，等你按「撥號」。沒人按，電話就撥不出去。這一點很重要，因為網頁上的連結是任何人都能放的。

嫌確認這一步多餘的話，有一個可選的「點按電話連結後立即撥打」設定，預設關閉。就算打開了，WaveKat Voice 也留著幾道保險：正在通話時不會撥；分不清該用哪條線路時不會撥；而且視窗一定會跳到最前面。不存在你看不見的撥號。

## 常見問題

### 為什麼在電腦上點電話號碼沒反應？

瀏覽器會把號碼交給作業系統，作業系統去找登記過的「電話應用程式」。Windows 和 Linux 上這個位置通常是空的，所以點了沒反應；Mac 上登記的是 FaceTime，所以跳出來的是 FaceTime。

### 網頁能讓我的電腦打電話嗎？

不能。`tel:` 連結只能請求撥號，不能直接撥出。WaveKat Voice 預設只把號碼填進撥號欄位，必須有人按「撥號」，電話才會撥出去。

### Mac 上點電話號碼為什麼會打開 FaceTime？

因為 Apple 預先把 FaceTime 登記成電話連結的處理程式，它會提議透過你的 iPhone 撥打，前提是 iPhone 在手邊而且設定好了接力。裝上 WaveKat Voice 並打開「電話連結」後，就換它來接手。

### 怎麼讓電腦直接撥打網頁上的電話號碼？

在 Mac 或 Linux 上安裝 WaveKat Voice，在 設定 → 一般 裡打開「電話連結」。之後點任何網頁上的電話號碼，它都會跳到最前面並填好號碼，按「撥號」就撥出去了。

## 再回去點一次開頭那個號碼

就這麼簡單。連結等了二十幾年，缺的只是一個應門的人。[下載 WaveKat Voice](/zh-hant/voice/download/)，把開關打開，網頁上的電話號碼就都能點了。

<script src="/blog/phone-slot/widget.js" defer></script>
