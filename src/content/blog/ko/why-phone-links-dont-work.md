---
title: "컴퓨터에서 전화번호 클릭이 안 되는 이유"
description: "전화번호 링크를 컴퓨터에서 클릭하면 아무 일도 없는 이유와, WaveKat Voice가 Mac·Linux에서 그 빈자리를 채우는 방법을 설명합니다."
date: 2026-08-07
author: Eason Guo
tags: [음성AI, 통화]
lang: "ko"
---

인터넷의 연락처 페이지에는 거의 어디에나 클릭할 수 있는 전화번호가 있습니다. 수십 년 전부터 있었습니다. 휴대폰에서 탭하면 바로 걸립니다. 그런데 같은 링크를 컴퓨터에서 클릭하면, 대부분 아무 일도 일어나지 않습니다. 아니면 뭔가 이상한 것이 뜨거나요.

지금 바로 눌러 볼 수 있는 번호가 하나 있습니다: <a href="tel:+14155550123">+1 (415) 555-0123</a>. 예약된 가상 번호라 아무에게도 걸리지 않으니 안심하고 눌러 보세요. 무슨 일이 일어나는지는 전적으로 지금 쓰고 있는 기기에 달려 있습니다 — 그리고 그 차이가 이 글의 전부입니다.

## 클릭한 번호는 어디로 가나

전화번호 링크는 앞부분이 `https:` 대신 `tel:`로 시작하는 평범한 웹 링크입니다. 클릭해도 브라우저가 직접 전화를 걸지는 않습니다. 브라우저는 페이지를 보여 주는 물건이지, 마이크와 발신음을 준비해 둔 물건이 아니니까요. 대신 번호를 운영체제에 넘기며 이렇게 말합니다. 누가 이 번호로 전화를 걸고 싶어 한다고요.

그러면 운영체제는 정해진 한 곳을 봅니다. **"전화 앱"**이라는 이름표가 붙은 자리라고 생각하면 됩니다. 이 기기에서 전화를 담당하겠다고 등록된 단 하나의 앱이 거기 앉아 있습니다. 그 자리에 있는 앱이 번호를 받습니다. 자리가 비어 있으면, 번호는 갈 곳이 없습니다.

이 자리 하나가 뒤에 나오는 모든 것을 설명합니다.

## 휴대폰에서는 왜 항상 걸리나

휴대폰에는 전화를 거는 것이 딱 하나 있습니다. 다이얼러입니다. 기본으로 들어 있고, 지울 수 없고, 언제나 그 자리에 있습니다. 그래서 번호를 탭할 때 휴대폰은 무엇을 원하는지 물어볼 필요가 없습니다. 번호는 곧장 다이얼러로 가고, 전화가 걸립니다.

전화 링크가 휴대폰에서 너무 자연스러워서 한 번도 생각해 본 적이 없는 이유가 이것입니다. 애초에 물어볼 것이 없었으니까요.

## 컴퓨터는 같은 클릭을 어떻게 다루나

컴퓨터는 사정이 다릅니다. 소리를 내는 앱은 백 개도 돌릴 수 있지만, "전화를 거는 그것"이라 할 만한 앱은 기본으로 들어 있지 않습니다. 그래서 그 자리는 진짜 질문이 되고, 운영체제마다 답이 다릅니다.

**Mac**에서는 애플이 그 자리에 FaceTime을 미리 넣어 두었습니다. 번호를 클릭하면 FaceTime이 열리며 *당신의 iPhone을 통해* 걸겠다고 제안합니다. iPhone이 있고, 근처에 있고, 같은 계정으로 로그인되어 있고, 연동 기능까지 켜져 있어야 되는 이야기입니다. 책상 앞에 앉아 거래처에 전화하려던 사람이 원한 결과는 대개 아닙니다.

**Windows**에서는 자리가 비어 있습니다. "어떤 앱으로 여시겠어요?" 창이 뜨는데, 목록도 대개 텅 비어 있거나 앱 스토어로 안내할 뿐입니다.

**Linux**에서는 전화 링크를 맡겠다는 앱이 아예 없습니다. 클릭해도 아무 일도 일어나지 않습니다. 오류도, 대화 상자도, 아무것도요.

여기서 눈여겨볼 점이 있습니다. 링크는 한 번도 고장 난 적이 없습니다. 웹사이트도 제 몫을 했고, 브라우저도 제 몫을 했고, 운영체제는 전화 앱의 문을 두드렸습니다. 다만 집에 아무도 없었을 뿐입니다.

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← 내 기기">
  <div class="wk-slot-head">전화 링크를 클릭하면 기기마다 누가 받는지</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">휴대폰</button>
      <button type="button" data-os="mac">Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac·Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">휴대폰</p>
      <ol class="trace">
        <li><span class="who">탭하면</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">자리에는</span><span class="what"><span class="slotbox">다이얼러 — 휴대폰에 하나뿐인 전화 앱</span></span></li>
        <li><span class="who">그래서</span><span class="what ok">전화가 걸립니다.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Mac</p>
      <ol class="trace">
        <li><span class="who">클릭하면</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">자리에는</span><span class="what"><span class="slotbox">FaceTime — 애플이 넣어 둔 앱</span></span></li>
        <li><span class="who">그래서</span><span class="what meh">FaceTime이 열리며 iPhone으로 걸겠다고 제안합니다 — iPhone이 근처에 있고 연동까지 되어 있다면요.</span></li>
      </ol>
      <p class="note">책상 앞에 앉은 사람이 원하던 결과는 대개 아닙니다.</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">클릭하면</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">자리에는</span><span class="what"><span class="slotbox is-empty">비어 있음</span></span></li>
        <li><span class="who">그래서</span><span class="what no">"어떤 앱으로 여시겠어요?" — 목록도 대개 텅 비어 있습니다.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">클릭하면</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">자리에는</span><span class="what"><span class="slotbox is-empty">비어 있음</span></span></li>
        <li><span class="who">그래서</span><span class="what no">아무 일도 일어나지 않습니다.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac·Linux + WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">클릭하면</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">자리에는</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice — 스위치 하나로 직접 넣은 앱</span></span></li>
        <li><span class="who">그래서</span><span class="what ok">번호가 이미 입력된 채 앱이 열립니다. 전화 걸기만 누르면 됩니다.</span></li>
      </ol>
    </div>
  </div>
</div>

## WaveKat Voice가 그 자리를 채웁니다

[WaveKat Voice](/ko/voice/)는 Mac과 Linux용 전화 앱입니다. 전화 회선을 통해 실제로 전화를 걸고 받으며, 모든 통화를 녹음하고 받아 적습니다. 그리고 그 자리에 들어갈 수 있는 앱이기도 합니다.

스위치 하나만 켜면 됩니다. **설정 → 일반**의 **전화 링크**입니다. 켜기 전까지는 꺼져 있습니다 — 일부러 그렇게 만들었습니다. 컴퓨터 전체의 전화 링크를 가져오는 일은 앱이 설치되자마자 슬쩍 저지를 일이 아니라 당신이 선택할 일이기 때문입니다. 켜고 나면, 어떤 웹 페이지에서든 번호를 클릭할 때 WaveKat Voice가 발신란에 번호가 이미 채워진 채로 나타납니다. 확인하고, 전화 걸기를 누르면 됩니다.

![Ubuntu의 WaveKat Voice — 전화번호가 이미 채워진 채 걸 준비가 된 새 통화 시트가 열린 모습.](/screenshots/dial-prefilled/ko.webp)

이게 기능의 전부입니다. 페이지에서 번호를 복사할 일도, 국가 번호 위치를 틀려 가며 다시 입력할 일도 없습니다. 이 기능은 [0.0.43](/ko/voice/changelog/#0.0.43)에서 나왔고, 짧은 소개 글로 [클릭투콜 — 웹의 전화번호를 클릭해 걸기](/ko/blog/click-to-call-phone-links/)가 있습니다.

## 웹 페이지가 내 컴퓨터로 전화를 걸 수 있나요?

누구나 다음으로 떠올리는 질문이고, 마땅히 물어야 할 질문입니다. 아니요, 걸 수 없습니다.

링크는 통화를 *요청*할 수 있을 뿐입니다. 기본적으로 WaveKat Voice는 번호를 채워 넣고 사람이 전화 걸기를 누르기를 기다립니다. 누르기 전에는 아무것도 걸리지 않습니다.

확인 단계마저 줄이고 싶은 사람을 위한 "전화 링크 클릭 시 바로 걸기" 옵션도 있습니다. 기본으로 꺼져 있습니다. 그리고 켜져 있더라도, 이미 통화 중이거나 어느 회선으로 걸어야 할지 분명하지 않으면 한 발 물러섭니다 — 기본 동작과 똑같이 번호만 채워 넣고 기다립니다. 창은 언제나 앞으로 나오므로, 보이지 않는 곳에서 전화가 걸리는 일은 결코 없습니다.

그 자리는 힘이 세고, 그래서 그 자리에 앉는 앱은 조심스러워야 합니다.

## 자주 묻는 질문

### 컴퓨터에서 전화번호를 클릭하면 왜 아무 일도 일어나지 않나요?

전화 링크를 맡겠다고 등록한 앱이 컴퓨터에 없기 때문입니다. 브라우저는 번호를 운영체제에 넘기고, 운영체제는 등록된 전화 앱을 찾습니다 — Windows와 Linux에는 보통 그런 앱이 없어서 클릭이 갈 곳을 잃습니다.

### 웹사이트가 내 컴퓨터로 전화를 걸 수 있나요?

아니요. 전화 링크는 통화를 요청할 수 있을 뿐이고, WaveKat Voice는 기본적으로 번호만 채워 넣고 당신이 전화 걸기를 누르기를 기다립니다. 선택 사항인 바로 걸기 설정도 이미 통화 중이거나 발신 회선이 분명하지 않으면 걸지 않습니다.

### Mac에서 전화번호를 클릭하면 왜 FaceTime이 열리나요?

애플이 FaceTime을 Mac의 전화 링크 처리 앱으로 미리 등록해 두었기 때문입니다. FaceTime은 근처의 iPhone을 통해 걸겠다고 제안하는데, iPhone이 있고 연동 기능이 설정되어 있어야 작동합니다. WaveKat Voice 같은 다른 전화 앱을 설치하면 전화 링크를 그쪽에 맡길 수 있습니다.

### 전화 링크가 WaveKat Voice에서 열리게 하려면 어떻게 하나요?

설정 → 일반에서 전화 링크 스위치를 켜세요 — 기본으로 꺼져 있습니다. 그 뒤로는 어떤 웹 페이지에서든 번호를 클릭하면 WaveKat Voice가 번호가 채워진 채, 걸 준비가 된 상태로 열립니다. Mac과 Linux에서 작동하며 [0.0.43](/ko/voice/changelog/#0.0.43)에서 나왔습니다.

## 그 번호를 다시 눌러 보세요

전화 링크는 수십 년째 모든 연락처 페이지에서 조용히 기다리고 있었습니다. 컴퓨터에 없었던 것은 문을 열어 줄 사람뿐입니다. 클릭한 번호가 실제로 걸리기를 바란다면, Mac 또는 Linux용 [WaveKat Voice를 다운로드](/ko/voice/download/)하고, 스위치 하나를 켠 다음, 이 글 맨 위의 번호를 다시 눌러 보세요.

<script src="/blog/phone-slot/widget.js" defer></script>
