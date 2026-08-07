---
title: "パソコンで電話番号をクリックしても何も起きない理由"
description: "スマホなら鳴るのに、パソコンでは電話番号リンクが無反応。原因は空のままの「電話アプリ」枠。WaveKat Voice が Mac と Linux でそこを埋めます。"
date: 2026-08-07
author: Eason Guo
tags: [音声AI, 通話]
lang: "ja"
---

ウェブの問い合わせページには、たいていクリックできる電話番号があります。何十年も前からあるものです。スマホでタップすれば、そのまま電話が鳴ります。ところが同じリンクをパソコンでクリックすると、多くの場合は何も起きません。あるいは、妙なものが出てきます。

まずは、いま読んでいるその端末で試してみてください：<a href="tel:+14155550123">+1 (415) 555-0123</a>。予約済みの架空の番号なので、クリックしても誰にもつながらず、安全です。何が起きるかは端末しだい——そしてその違いこそが、この記事の話のすべてです。

## クリックした番号はどこへ行くのか

電話番号のリンクは、頭が `https:` ではなく `tel:` になっただけの、ただのリンクです。クリックしても、ブラウザが自分で電話をかけるわけではありません。ブラウザの仕事はページを表示すること。マイクもダイヤル音も持っていません。代わりに番号をオペレーティングシステムに渡して、こう伝えます——「この番号にかけたい人がいます」。

OS は決まった場所を見に行きます。**「電話アプリ」と書かれた枠**を想像してください。この端末で電話を担当する、と登録されたアプリがひとつだけ入る枠です。そこにいるアプリが番号を受け取ります。枠が空なら、番号は行き場を失います。

この枠ひとつで、あとの話はすべて説明がつきます。

## スマホでは必ずつながる理由

スマホには、電話をかけるものがひとつだけあります。ダイヤラーです。最初から入っていて、消せなくて、いつも枠の中にいます。だから番号をタップしても、スマホは迷いません。番号はまっすぐダイヤラーへ行き、電話が鳴ります。

電話リンクがスマホであまりに自然で、意識したことすらないのは、そもそも選択の余地がないからです。

## 同じクリックを、パソコンはどう扱うか

パソコンは事情が違います。音の出るアプリは山ほど動かせるのに、「電話をかけるためのもの」がこれだと決まっていません。だから枠に誰を入れるかは本物の問題で、OS ごとに答えが分かれます。

**Mac** では、Apple があらかじめ FaceTime を枠に入れています。番号をクリックすると FaceTime が開き、*iPhone 経由で*かけましょうと提案してきます。iPhone を持っていて、手元にあって、同じアカウントで、連係の設定が済んでいれば動きます。机で取引先に電話したいだけの人が求めていたものとは、たいてい違います。

**Windows** では、枠は最初から空です。「どのアプリで開きますか？」という選択画面が出ますが、候補のリストもたいてい空か、ストアに誘導されるだけです。

**Linux** では、電話リンクを引き受けるアプリが最初から存在しません。クリックしても何も起きません。エラーも、ダイアログも、何も。

ここが大事なところです。リンクは壊れていません。ウェブサイトも、ブラウザも、仕事をしました。OS は電話アプリの扉をノックしました。ただ、誰もいなかっただけです。

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← あなたの端末">
  <div class="wk-slot-head">電話リンクをクリックすると、端末ごとに誰が受け取るか</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">スマホ</button>
      <button type="button" data-os="mac">Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac / Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">スマホ</p>
      <ol class="trace">
        <li><span class="who">タップすると</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">枠の中は</span><span class="what"><span class="slotbox">ダイヤラー——スマホでただひとつの通話アプリ</span></span></li>
        <li><span class="who">結果は</span><span class="what ok">電話が鳴ります。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Mac</p>
      <ol class="trace">
        <li><span class="who">クリックすると</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">枠の中は</span><span class="what"><span class="slotbox">FaceTime——Apple が入れておいたもの</span></span></li>
        <li><span class="who">結果は</span><span class="what meh">FaceTime が開き、iPhone 経由での発信を提案。iPhone が手元にあって、設定が済んでいれば、ですが。</span></li>
      </ol>
      <p class="note">机でパソコンに向かっている人が求めていたものとは、たいてい違います。</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">クリックすると</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">枠の中は</span><span class="what"><span class="slotbox is-empty">空っぽ</span></span></li>
        <li><span class="who">結果は</span><span class="what no">「どのアプリで開きますか？」——リストもたいてい空です。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">クリックすると</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">枠の中は</span><span class="what"><span class="slotbox is-empty">空っぽ</span></span></li>
        <li><span class="who">結果は</span><span class="what no">何も起きません。本当に何も。</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac / Linux + WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">クリックすると</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">枠の中は</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice——スイッチひとつで、自分で入れたもの</span></span></li>
        <li><span class="who">結果は</span><span class="what ok">番号が入力済みの状態でアプリが前面に。あとは発信を押すだけ。</span></li>
      </ol>
    </div>
  </div>
</div>

## WaveKat Voice が枠を埋める

[WaveKat Voice](/ja/voice/) は Mac と Linux 向けの電話アプリです。契約している電話会社を通じて実際の通話を発着信でき、通話はすべて録音・文字起こしされます。そして、あの枠に入ることができます。

やることはスイッチひとつ。**設定 → 一般**にある**電話リンク**をオンにするだけです。自分でオンにするまではオフ——パソコン全体の電話リンクを引き受けるのは、アプリがインストール時に勝手にやることではなく、あなたが選ぶべきことだからです。オンにすれば、どのウェブページで番号をクリックしても、WaveKat Voice が番号の入った状態で前面に出ます。確認して、発信を押すだけ。

![Ubuntu 上の WaveKat Voice — 電話番号がすでに入力された状態で開いた新規通話シート。すぐに発信できる。](/screenshots/dial-prefilled/ja.webp)

機能はこれだけです。ページから番号をコピーする必要も、国番号の位置に悩みながら打ち直す必要もありません。この機能は [0.0.43](/ja/voice/changelog/#0.0.43) で提供され、短い紹介は既存記事の[クリックトゥコール——電話番号をクリックで発信](/ja/blog/click-to-call-phone-links/)にあります。

## ウェブページが勝手に電話をかけられる？

次に誰もが気にすること——そして、気にするのが正解です。答えはノー。かけられません。

リンクにできるのは、通話の*お願い*までです。既定では WaveKat Voice は番号を入力し、人が発信を押すのを待ちます。誰かが押すまで、電話は一本もかかりません。

一手間すら省きたい人向けに、任意の「電話リンクをすぐに発信」設定もあります（既定はオフ）。オンにしていても、通話中なら発信しませんし、どの回線からかけるべきか明らかでないときも発信せず、番号を入力して待ちます——既定とまったく同じ動きです。ウィンドウは必ず前面に出るので、見えないところで発信が起きることはありません。

枠は強力です。だからこそ、そこに入るアプリは慎重であるべきなのです。

## よくある質問

### パソコンで電話番号をクリックしても反応しないのはなぜですか？

電話リンクを引き受けるアプリが登録されていないからです。ブラウザは番号を OS に渡し、OS は登録済みの電話アプリを探しますが、Windows や Linux ではたいてい見つからず、クリックは行き場を失います。

### ウェブサイトが勝手にパソコンから電話をかけることはありますか？

ありません。電話リンクにできるのは通話のお願いまでです。既定では WaveKat Voice は番号を入力して、あなたが発信を押すのを待ちます。任意の即時発信設定をオンにしていても、通話中や発信回線が曖昧なときは発信しません。

### Mac で電話番号をクリックすると FaceTime が開くのはなぜですか？

Apple が最初から FaceTime を Mac の電話リンク担当として登録しているからです。FaceTime は近くの iPhone 経由での発信を提案しますが、iPhone を持っていて連係の設定が済んでいるときしか使えません。WaveKat Voice のような別の通話アプリを入れれば、電話リンクをそちらに任せられます。

### 電話リンクを WaveKat Voice で開くにはどうすればいいですか？

設定 → 一般で**電話リンク**のスイッチをオンにします（既定はオフです）。以降は、どのウェブページでも番号をクリックすれば、番号が入力済みの WaveKat Voice が開き、すぐに発信できます。Mac と Linux で使え、0.0.43 で提供されました。

## もう一度、あの番号を

電話リンクは何十年ものあいだ、あらゆる問い合わせページで静かに待っていました。パソコンに足りなかったのは、応えてくれる誰かだけです。クリックで電話が鳴るようにしたければ、Mac または Linux 用の [WaveKat Voice をダウンロード](/ja/voice/download/)して、スイッチをひとつオンにして、このページ冒頭の番号をもう一度クリックしてみてください。

<script src="/blog/phone-slot/widget.js" defer></script>
