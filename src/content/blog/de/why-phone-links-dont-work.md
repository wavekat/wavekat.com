---
title: "Warum Telefon-Links am PC nicht funktionieren"
description: "Am Handy klingelt eine angeklickte Nummer sofort, am Computer passiert nichts — die Telefon-App fehlt. WaveKat Voice füllt die Lücke auf Mac und Linux."
date: 2026-08-07
author: Eason Guo
tags: [Sprach-KI, Anrufe]
lang: "de"
---

Auf fast jeder Kontaktseite im Netz steht eine anklickbare Telefonnummer. Das gibt es seit Jahrzehnten. Am Handy tippen Sie darauf, und es klingelt. Am Computer klicken Sie denselben Link an, und meistens passiert — nichts. Oder etwas Seltsames.

Probieren Sie es ruhig gleich aus, mit dem Gerät, auf dem Sie das hier lesen: <a href="tel:+14155550123">+1 (415) 555-0123</a>. Das ist eine reservierte, fiktive Nummer — der Klick ist völlig ungefährlich, erreichen kann sie niemanden. Was dann passiert, hängt allein von Ihrem Gerät ab. Und genau dieser Unterschied ist die ganze Geschichte.

## Wohin der Klick eigentlich geht

Ein Telefonnummern-Link ist ein ganz normaler Link, nur mit `tel:` statt `https:` davor. Wenn Sie ihn anklicken, versucht Ihr Browser gar nicht erst, selbst zu telefonieren. Browser zeigen Seiten an; ein Mikrofon und ein Freizeichen halten sie nicht bereit. Stattdessen reicht der Browser die Nummer an Ihr Betriebssystem weiter: Hier will jemand anrufen.

Das Betriebssystem schaut dann an einer ganz bestimmten Stelle nach. Stellen Sie sich ein Fach mit der Aufschrift **„Telefon-App"** vor — die eine App auf diesem Gerät, die für Anrufe zuständig ist. Was in dem Fach liegt, bekommt die Nummer. Ist das Fach leer, hat die Nummer kein Ziel.

Dieses eine Fach erklärt alles, was jetzt kommt.

## Warum es am Handy immer klappt

Ihr Handy hat genau ein Ding, das Anrufe tätigt: die Telefon-App. Sie ist eingebaut, sie lässt sich nicht entfernen, und sie liegt immer im Fach. Wenn Sie eine Nummer antippen, muss das Handy also nie nachfragen, was Sie meinen. Die Nummer geht direkt an die Telefon-App, und es klingelt.

Deshalb fühlen sich Telefon-Links am Handy so selbstverständlich an, dass Sie vermutlich nie über sie nachgedacht haben. Es gab schlicht nie eine offene Frage.

## Was Ihr Computer mit demselben Klick macht

Ihr Computer ist ein anderes Kaliber. Er kann hundert Apps ausführen, die Töne von sich geben — aber ein offensichtliches „Ding zum Telefonieren" bringt er nicht mit. Das Fach ist hier also eine echte Frage, und jedes Betriebssystem beantwortet sie anders.

Auf einem **Mac** hat Apple das Fach mit FaceTime vorbelegt. Klicken Sie eine Nummer an, öffnet sich FaceTime und bietet an, *über Ihr iPhone* anzurufen — was nur funktioniert, wenn Sie eines haben, es in der Nähe liegt, mit demselben Konto angemeldet und die Funktion eingerichtet ist. Wer am Schreibtisch sitzt und einen Lieferanten erreichen will, wollte das selten.

Auf **Windows** ist das Fach von Anfang an leer. Es erscheint die Frage „Wie soll dieser Link geöffnet werden?" — mit einer Liste, die meistens ebenfalls leer ist oder Sie in den App-Store schickt.

Auf **Linux** beansprucht von Haus aus gar keine App die Telefon-Links. Der Klick bewirkt nichts. Keine Fehlermeldung, kein Dialog — einfach gar nichts.

Das Entscheidende dabei: Der Link war nie kaputt. Die Website hat ihren Teil erledigt, der Browser auch, das Betriebssystem hat bei der Telefon-App angeklopft. Es war nur niemand zu Hause.

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← Ihr Gerät">
  <div class="wk-slot-head">Wer einen Telefon-Link beantwortet — Gerät für Gerät</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">ein Handy</button>
      <button type="button" data-os="mac">ein Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac oder Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">Ein Handy</p>
      <ol class="trace">
        <li><span class="who">Sie tippen</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Im Fach</span><span class="what"><span class="slotbox">Die Telefon-App — die eine Anruf-App des Handys</span></span></li>
        <li><span class="who">Also</span><span class="what ok">Es klingelt.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Ein Mac</p>
      <ol class="trace">
        <li><span class="who">Sie klicken</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Im Fach</span><span class="what"><span class="slotbox">FaceTime — von Apple dort hingelegt</span></span></li>
        <li><span class="who">Also</span><span class="what meh">FaceTime öffnet sich und bietet an, über Ihr iPhone anzurufen — falls Sie eines haben, in der Nähe, fertig eingerichtet.</span></li>
      </ol>
      <p class="note">Selten das, was jemand am Schreibtisch wirklich wollte.</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">Sie klicken</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Im Fach</span><span class="what"><span class="slotbox is-empty">leer</span></span></li>
        <li><span class="who">Also</span><span class="what no">„Wie soll dieser Link geöffnet werden?" — mit einer Liste, die meistens leer ist.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">Sie klicken</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Im Fach</span><span class="what"><span class="slotbox is-empty">leer</span></span></li>
        <li><span class="who">Also</span><span class="what no">Nichts. Rein gar nichts.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac oder Linux mit WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">Sie klicken</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Im Fach</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice — von Ihnen dort hingelegt, mit einem Schalter</span></span></li>
        <li><span class="who">Also</span><span class="what ok">Die App erscheint, die Nummer ist schon eingetragen. Sie drücken auf „Anrufen".</span></li>
      </ol>
    </div>
  </div>
</div>

## Wie WaveKat Voice das Fach füllt

[WaveKat Voice](/de/voice/) ist eine Telefon-App für Mac und Linux — sie tätigt und empfängt echte Anrufe über Ihren Telefonanbieter und zeichnet jeden davon auf und transkribiert ihn. Und sie kann das Ding im Fach sein.

Sie legen einen einzigen Schalter um: **Telefon-Links**, unter Einstellungen → Allgemein. Er ist aus, bis Sie ihn einschalten — mit Absicht: Die Telefon-Links Ihres ganzen Computers zu übernehmen, sollte Ihre Entscheidung sein und nichts, was sich eine App bei der Installation einfach greift. Ist er an, öffnet ein Klick auf eine Nummer auf jeder beliebigen Webseite WaveKat Voice, mit der Nummer bereits im Anruffeld. Sie schauen sie an und drücken auf „Anrufen".

![WaveKat Voice auf Ubuntu — das Fenster „Neuer Anruf" ist geöffnet, eine Telefonnummer ist bereits eingetragen und bereit zum Wählen.](/screenshots/dial-prefilled/de.webp)

Das ist schon die ganze Funktion. Kein Herauskopieren der Nummer aus der Seite, kein Neutippen mit der Ländervorwahl an der falschen Stelle. Sie kam mit Version [0.0.43](/de/voice/changelog/#0.0.43), und eine kürzere Ankündigung gibt es in [Click-to-Call: Telefonnummern im Web anklicken](/de/blog/click-to-call-phone-links/).

## Kann eine Webseite meinen Computer telefonieren lassen?

Die Frage, die als Nächstes jeder stellt — und genau die richtige. Nein, kann sie nicht.

Ein Link kann einen Anruf nur *anfordern*. Standardmäßig trägt WaveKat Voice die Nummer ein und wartet dann, bis ein Mensch auf „Anrufen" drückt. Nichts wählt, bevor Sie es tun.

Es gibt eine optionale Einstellung „Telefon-Links sofort wählen" für alle, die ihren Klicks vertrauen und einen Schritt sparen wollen. Sie ist standardmäßig aus. Und selbst eingeschaltet verweigert sie den Dienst, wenn Sie gerade mitten in einem Anruf sind oder nicht eindeutig ist, über welche Leitung der Anruf hinausgehen soll — dann wird die Nummer eingetragen und gewartet, genau wie in der Voreinstellung. Das Fenster kommt außerdem immer nach vorn, sodass nie etwas wählen kann, wo Sie es nicht sehen.

Das Fach ist mächtig — gerade deshalb sollte die App darin vorsichtig sein.

## Häufige Fragen

### Warum passiert nichts, wenn ich am Computer eine Telefonnummer anklicke?

Weil keine App auf Ihrem Computer die Telefon-Links beansprucht hat. Der Browser reicht die Nummer an das Betriebssystem weiter, das nach einer registrierten Telefon-App sucht — und auf Windows und Linux gibt es meist keine, also läuft der Klick ins Leere.

### Kann eine Website meinen Computer einen Anruf tätigen lassen?

Nein. Ein Telefon-Link kann einen Anruf nur anfordern, und standardmäßig trägt WaveKat Voice die Nummer nur ein und wartet auf Ihren Druck auf „Anrufen". Selbst die optionale Sofortwahl verweigert den Dienst, wenn Sie schon telefonieren oder die ausgehende Leitung nicht eindeutig ist.

### Warum öffnet sich FaceTime, wenn ich am Mac eine Telefonnummer anklicke?

Apple registriert FaceTime ab Werk als Handler für Telefon-Links auf dem Mac. FaceTime bietet dann an, den Anruf über ein iPhone in der Nähe zu leiten — was nur funktioniert, wenn Sie eines besitzen und die Übergabe eingerichtet haben. Mit einer anderen Anruf-App wie WaveKat Voice können Sie die Telefon-Links stattdessen ihr überlassen.

### Wie öffne ich Telefon-Links in WaveKat Voice?

Schalten Sie den Schalter Telefon-Links unter Einstellungen → Allgemein ein — er ist standardmäßig aus. Danach öffnet ein Klick auf eine Nummer auf jeder Webseite WaveKat Voice mit bereits eingetragener Nummer, bereit zum Wählen. Das funktioniert auf Mac und Linux und kam mit Version 0.0.43.

## Probieren Sie die Nummer noch einmal

Telefon-Links warten seit Jahrzehnten still auf jeder Kontaktseite; Ihrem Computer fehlte immer nur jemand, der zu Hause ist und rangeht. Wenn Ihre Klicks klingeln sollen: [Laden Sie WaveKat Voice herunter](/de/voice/download/) für Mac oder Linux, legen Sie den einen Schalter um — und klicken Sie die Nummer oben auf dieser Seite noch einmal an.

<script src="/blog/phone-slot/widget.js" defer></script>
