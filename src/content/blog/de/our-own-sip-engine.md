---
title: "Warum WaveKat Voice eine eigene SIP-Engine hat"
description: "WaveKat Voice läuft auf wavekat-sip — unserer selbst gebauten, quelloffenen SIP/RTP-Engine. Kein fremder Stack, keine Blackbox zwischen Ihnen und Ihren Anrufen."
date: 2026-07-06
author: Eason Guo
tags: [Sprach-KI, Technik, Open-Source, SIP]
lang: "de"
---

WaveKat Voice — das Softphone für Mac und Linux, das [jeden Anruf aufzeichnet und transkribiert](/de/voice/) — läuft jetzt auf einer SIP-Engine, die wir von Grund auf selbst geschrieben haben. [`wavekat-sip`](https://github.com/wavekat/wavekat-sip) ist ein quelloffenes Rust-Crate, das die Telefonsignalisierung und den Audiotransport selbst übernimmt, ganz ohne fremden SIP-Stack darunter. Jeder Anruf, den Sie führen oder annehmen, jedes Halten und jede Weiterleitung läuft nun über Code, der uns von A bis Z gehört.

Das ist ein weiterer Schritt hin zu dem, worauf wir immer wieder zurückkommen: [jedem kleinen Unternehmen die Stimme eines großen zu geben](/de/blog/hello-world/). Eine große Telefonanlage ist verlässlich, weil die Menschen, die sie betreiben, jede ihrer Schichten kontrollieren. Die SIP-Engine selbst zu besitzen bedeutet, dass wir die Schicht kontrollieren, auf der Ihr Anruf tatsächlich reist — wenn also etwas zuverlässiger werden muss oder eine Funktion ausgeliefert werden soll, steht keine Blackbox im Weg.

## Was SIP ist und warum es der schwierige Teil ist

SIP (Session Initiation Protocol) ist die Sprache, die Telefone sprechen, um einen Anruf aufzubauen — Ihre Leitung beim Anbieter zu registrieren, die Gegenseite klingeln zu lassen, auszuhandeln, welcher Audio-Codec verwendet wird, und den Anruf am Ende sauber wieder abzubauen. RTP ist das, was das eigentliche Audio trägt, sobald der Anruf steht. Macht man SIP an einer feinen Stelle falsch, brechen Anrufe ab, es entsteht einseitiges Audio, oder eine Leitung nimmt still und leise keine Anrufe mehr an. Es ist der unglamouröse, präzise Kern, auf dem alles andere in einem Softphone aufsitzt.

Bis vor Kurzem wickelte WaveKat Voice seine Anrufe über eine SIP-Bibliothek eines Drittanbieters ab. Damit waren wir schnell am Telefon, und das war früh die richtige Entscheidung. Aber ein geliehener Stack entscheidet für Sie, wie ein Anruf modelliert wird, wie Fehler zutage treten und welche Funktionen überhaupt erreichbar sind — und in dem Moment, in dem wir anfingen, Dinge wie Anrufweiterleitung und HD-Audio zu bauen, arbeiteten wir gegen seine Form statt mit ihr.

## Warum wir eine eigene gebaut haben

Wir haben die SIP-Engine von WaveKat Voice von Grund auf neu geschrieben, als `wavekat-sip`, aus drei schlichten Gründen:

- **Kontrolle.** Funktionen wie einen Anrufer in die Warteschleife zu legen, [einen Anruf weiterzuleiten](/de/blog/hold-switch-and-transfer-calls/) und ein langes Gespräch mit Session-Timern am Leben zu halten, liegen allesamt auf der SIP-Schicht. Diese Schicht selbst zu besitzen heißt, dass wir sie direkt hinzufügen, statt das Modell eines anderen passend zu biegen.
- **Fußabdruck.** WaveKat Voice ist eine schlanke Desktop-App, die still und unauffällig aus dem Weg bleiben soll. Eine fokussierte, für den Zweck gebaute Engine hält sie klein — sie trägt nur das SIP und RTP, das sie tatsächlich nutzt, nicht den ganzen Ballast eines Allzweck-Stacks.
- **Keine Blackbox.** Wenn ein Anruf sich danebenbenimmt, können wir jede Zeile zwischen dem Knopf, den Sie gedrückt haben, und dem Paket auf der Leitung lesen und reparieren. Nichts daran, wie Ihre Anrufe funktionieren, ist für uns tabu.

## Was die Engine übernimmt

`wavekat-sip` kümmert sich um die Belange auf Leitungsebene und hält sich aus den Schichten für Audiogeräte und Anruforchestrierung heraus, damit es klein und einbettbar bleibt:

| Bereich | Was es tut |
|------|-------------|
| **Registrierung** | Registriert Ihre Leitung beim Anbieter (Digest-Authentifizierung) und hält sie am Leben, damit eingehende Anrufe Sie immer erreichen. |
| **Anrufe** | Baut ausgehende Anrufe auf und nimmt eingehende an, und signalisiert Anrufern mit einem ordentlichen Klingelton, bevor Sie abheben. |
| **Steuerung im Anruf** | Halten und Fortsetzen (SIP re-INVITE, RFC 3264), Weiterleitung ohne und mit Rückfrage (SIP REFER, RFC 3515) und DTMF (Tastentöne) für Telefonmenüs. |
| **Audioqualität** | Handelt den [Opus-Codec](/de/voice/) für breitbandige „HD"-Sprache aus, mit automatischem Rückfall auf das Standard-G.711, wenn die Gegenseite ihn nicht unterstützt. |
| **Zuverlässigkeit** | RFC 4028 Session-Timer verhindern, dass lange Anrufe vom Netz mittendrin still gekappt werden. |

## Es ist quelloffen — wie der Rest von WaveKat

`wavekat-sip` ist keine private interne Komponente. Es ist unter der Apache-2.0-Lizenz auf [crates.io](https://crates.io/crates/wavekat-sip) veröffentlicht, mit Dokumentation auf [docs.rs](https://docs.rs/wavekat-sip), genau wie unsere Crates für [Voice-Activity-Detection](https://github.com/wavekat/wavekat-vad) und [Turn-Detection](https://github.com/wavekat/wavekat-turn). Wer in Rust ein Softphone, einen Voice-Bot oder eine Brücke zur Anrufaufzeichnung baut, kann genau die Engine nutzen, auf der WaveKat Voice läuft. Offen zu bauen ist unsere Arbeitsweise — die Werkzeuge unter unserem Produkt gehören Ihnen zum Prüfen und Weiterverwenden, sie sind kein Burggraben.

Ehrlich gesagt ist es früh: Das Crate ist in aktiver Entwicklung, und seine API ändert sich zwischen den Versionen noch. Aber es ist die echte Engine hinter einem echten Produkt, kein Demo.

## Häufige Fragen

### Was ist wavekat-sip?

`wavekat-sip` ist WaveKats eigenes quelloffenes Rust-Crate für SIP-Signalisierung und RTP-Audiotransport. Es ist die Engine hinter jedem Anruf, den WaveKat Voice führt oder annimmt, ganz ohne fremden SIP-Stack darunter.

### Ist wavekat-sip Open Source, und kann ich es in meinem eigenen Projekt verwenden?

Ja. `wavekat-sip` ist unter der Apache-2.0-Lizenz auf [crates.io](https://crates.io/crates/wavekat-sip) veröffentlicht, mit Dokumentation auf [docs.rs](https://docs.rs/wavekat-sip). Wer in Rust ein Softphone, einen Voice-Bot oder eine Brücke zur Anrufaufzeichnung baut, kann dieselbe Engine nutzen, auf der WaveKat Voice läuft.

### Unterstützt WaveKat Voice HD-Audio?

Ja. WaveKat Voice handelt den Opus-Codec für breitbandige „HD"-Sprache aus und fällt automatisch auf das Standard-G.711 zurück, wenn die Gegenseite des Anrufs Opus nicht unterstützt.

### Funktioniert WaveKat Voice mit jedem SIP-Anbieter?

Ja. `wavekat-sip` übernimmt die standardmäßige SIP-Registrierung mit Digest-Authentifizierung, es funktioniert also mit jedem SIP-konformen Anbieter oder jeder SIP-konformen Telefonanlage — mit dem Konto, das Sie bereits haben, ohne anbieterspezifische Einrichtung.

### Ist wavekat-sip produktionsreif?

Es ist die echte Engine hinter einem echten Produkt, also bereits täglich im Einsatz — aber es ist früh. Das Crate ist in aktiver Entwicklung, und seine API ändert sich zwischen den Versionen noch, also fixieren Sie eine Version, wenn Sie heute darauf aufbauen.

## Was das für Ihre Anrufe bedeutet

Meistens werden sich die Anrufe von WaveKat Voice überhaupt nicht anders anfühlen — und genau das ist der Sinn. Sie kommen zustande und klingen so, wie sie sollen. Was sich ändert, spielt sich hinter den Kulissen ab: Die Funktionen, die WaveKat Voice wie einen echten Empfang wirken lassen — Halten, Anklopfen, Weiterleiten, HD-Audio — werden nun nach unserem Zeitplan ausgeliefert statt nach dem einer Abhängigkeit, und wenn etwas stabiler werden muss, gehen wir direkt zu dem Code, der es betreibt.

WaveKat Voice ist während der öffentlichen Beta [kostenlos](/de/voice/download/) auf Mac und Linux. Verbinden Sie den Telefonanbieter, den Sie bereits haben, und Ihr nächster Anruf läuft auf einer Engine, die wir selbst gebaut — und verschenkt — haben.
