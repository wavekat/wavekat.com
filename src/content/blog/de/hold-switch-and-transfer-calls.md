---
title: "Anrufe halten, wechseln und weiterleiten wie eine Telefonzentrale"
description: "WaveKat Voice kann Anrufe jetzt halten, einen zweiten Anruf während des ersten annehmen und Anrufer weiterleiten — ohne oder mit Rückfrage — auf Mac und Linux, und die Aufnahme pausiert beim Halten automatisch."
date: 2026-07-05
author: Eason Guo
tags: [Sprach-KI, Anrufe]
lang: "de"
---

WaveKat Voice — das SIP-Softphone für Mac und Linux, das jeden Anruf aufzeichnet und transkribiert — kann jetzt die drei Dinge, die ein Empfang den ganzen Tag tut: einen Anrufer in die Warteschleife legen, einen zweiten Anruf annehmen, während der erste wartet, und einen Anrufer an jemand anderen weiterleiten — entweder sofort oder erst nach Rücksprache. Sie erscheinen mit WaveKat Voice [0.0.42](/de/voice/changelog/#0.0.42).

Das ist der bislang wörtlichste Schritt hin zu unserem Ziel, [jedem kleinen Unternehmen die Stimme eines großen zu geben](/de/blog/hello-world/). Wer bei einem großen Unternehmen anruft, hört „Einen Moment, ich stelle Sie durch" — und es funktioniert, weil dort eine Empfangskraft mit einer Telefonzentrale sitzt. Jetzt gibt [WaveKat Voice](/de/voice/) — das bereits jeden Anruf aufzeichnet und transkribiert — einem Ein-Personen-Betrieb dieselben Handgriffe. Halten, Anklopfen und Weiterleiten sind die Bedienelemente, nach denen am Empfang ständig gegriffen wird, und jedes ernstzunehmende [Softphone](/de/voice/alternatives/) muss sie haben — WaveKat Voice hat sie jetzt, mit einer eigenen Besonderheit: Was während des Haltens passiert, bleibt aus der Aufnahme heraus.

## Einen Anrufer halten

Wer in WaveKat Voice einen Anrufer hält, pausiert die Aufnahme und das Live-Transkript für die gesamte Zeit, in der der Anruf geparkt ist — nichts, was während eines Haltens neben Ihrem Schreibtisch gesagt wird, landet in der Aufnahme oder im Transkript. Auf dem Anrufbildschirm gibt es einen **Halten**-Knopf, zwischen Stummschalten und Wähltastatur; ein Druck darauf pausiert den Anruf in beide Richtungen, sodass Sie die Gegenseite nicht hören und sie Sie nicht hört.

WaveKat Voice teilt dem Telefonsystem der Gegenseite auf dem SIP-Standardweg mit, dass der Anruf gehalten wird, sodass die meisten Systeme ihre eigene Wartemusik vorspielen — der Anrufer hört „Sie werden gehalten", keine Totenstille. Das ist mehr als beidseitiges lokales Stummschalten: Das entfernte System weiß, dass der Anruf geparkt ist, nicht nur still. Mit **Fortsetzen** laufen Gespräch, Aufnahme und Transkript weiter.

![WaveKat Voice auf Ubuntu — ein gehaltener Anruf: das Warteschleifen-Banner mit Fortsetzen, die Transkription pausiert.](/screenshots/in-call-hold/de.webp)

## Anklopfen: einen zweiten Anruf annehmen, während Sie telefonieren

Wenn ein zweiter Anruf klingelt, während Sie schon sprechen, müssen Sie sich nicht mehr entscheiden. Nehmen Sie ihn an, und der erste Anruf legt sich von selbst in die Warteschleife — genau wie das Anklopfen auf dem Mobiltelefon. Eine Umschaltleiste auf dem Anrufbildschirm listet jeden laufenden Anruf, und Sie wechseln per Klick zwischen ihnen.

Nur ein Anruf ist jeweils live. Der Anruf, den Sie gerade ansehen, ist der, auf dem Sie sprechen; jeder andere Anruf wird gehalten, und seine Aufnahme und sein Live-Transkript pausieren, bis Sie zu ihm zurückwechseln. Standardmäßig wird ein gehaltener Anruf beim Umschalten sofort fortgesetzt; wer jeden Anruf lieber bewusst fortsetzt, findet in **Einstellungen → Allgemein** einen Schalter („Anruf beim Umschalten fortsetzen"), und jeder gehaltene Anruf trägt ein deutliches Banner, damit eine stille Leitung nie wie eine abgebrochene wirkt.

![WaveKat Voice auf Ubuntu — ein laufender Anruf, während zwei weitere Anrufer in der Umschaltleiste in der Warteschleife warten.](/screenshots/in-call-waiting/de.webp)

## Einen Anrufer weiterleiten — sofort oder nach Rückfrage

Der **Weiterleiten**-Knopf schickt einen laufenden Anrufer zu jemand anderem — eine andere Nummer, eine andere Durchwahl, eine andere SIP-Adresse. Es gibt zwei Wege, und WaveKat Voice beherrscht beide:

| | Ohne Rückfrage (Blind Transfer) | Mit Rückfrage (Attended Transfer) |
|---|---|---|
| **Was passiert** | Der Anrufer wird sofort zur neuen Nummer geschickt | Sie rufen die neue Person zuerst an, sprechen mit ihr und verbinden dann beide |
| **Sprechen Sie zuerst mit dem Empfänger?** | Nein | Ja — der Anrufer wartet in der Warteschleife, während Sie nachfragen |
| **Wenn der Empfänger nicht abnimmt** | Der Anrufer bleibt bei Ihnen; nichts geht verloren | Sie legen das Rückfrage-Gespräch auf und kehren zum Anrufer zurück |
| **Wann sinnvoll** | Sie wissen, dass die Person übernehmen soll: „Ich stelle Sie zur Buchhaltung durch" | Sie wollen den Anrufer ankündigen oder sind unsicher, ob jemand erreichbar ist |

Für eine Weiterleitung ohne Rückfrage drücken Sie Weiterleiten, geben das Ziel ein — fertig; sobald die neue Person abnimmt, endet Ihre Seite des Anrufs. Für eine Weiterleitung mit Rückfrage wählen Sie **Erst sprechen**: Der Anrufer wird gehalten, WaveKat Voice ruft das Ziel als zweiten Anruf an, und Sie sprechen ungestört („Ich habe einen Kunden mit einer Frage zur Rechnung — können Sie übernehmen?"). Wenn alles passt, drücken Sie **Weiterleitung abschließen**, die beiden werden verbunden, und Sie steigen aus. Ist die Person beschäftigt, lehnt ab oder ist doch die falsche, legen Sie einfach das Rückfrage-Gespräch auf und setzen Ihren Anrufer fort — er erfährt nie, dass der erste Versuch nicht geklappt hat.

![WaveKat Voice auf Ubuntu — eine Weiterleitung mit Rückfrage: der Anrufer gehalten, daneben der Knopf Weiterleitung abschließen.](/screenshots/in-call-transfer/de.webp)

Auch in Ihrer Anrufliste bleiben Weiterleitungen ehrlich. Ein weitergeleiteter Anruf endet als **Weitergeleitet**, und die Detailseite zeigt genau, wohin er ging — „Weitergeleitet an …" — statt so zu tun, als hätten Sie aufgelegt.

## Häufige Fragen

### Wie leite ich in WaveKat Voice einen Anruf weiter?

Drücken Sie auf dem Anrufbildschirm Weiterleiten und geben Sie eine Nummer, Durchwahl oder SIP-Adresse ein. Sofortiges Senden ist eine Weiterleitung ohne Rückfrage; **Erst sprechen** hält den Anrufer und ruft das Ziel an, damit Sie ihn ankündigen können — **Weiterleitung abschließen** verbindet dann beide.

### Was ist der Unterschied zwischen einer Weiterleitung mit und ohne Rückfrage?

Ohne Rückfrage (Blind Transfer) wird der Anrufer sofort zum neuen Ziel geschickt, ohne dass Sie mit dem Empfänger sprechen. Mit Rückfrage (Attended Transfer) bleibt der Anrufer in der Warteschleife, während Sie den Empfänger selbst anrufen, und erst nach Ihrer Bestätigung werden beide verbunden — Sie können also zurück, wenn der Empfänger beschäftigt ist oder ablehnt. WaveKat Voice unterstützt beides.

### Braucht die Person, an die ich weiterleite, WaveKat Voice?

Nein. WaveKat Voice nutzt den SIP-Standardmechanismus für Weiterleitungen (ein REFER, RFC 3515), das Ziel erhält also einen ganz gewöhnlichen Anruf — jedes Telefon, jedes Softphone, jede Durchwahl, die Ihr Anbieter erreicht.

### Funktionieren Halten und Weiterleiten mit jedem SIP-Anbieter?

Ja. Halten nutzt das SIP-Standard-re-INVITE (RFC 3264) und Weiterleiten das SIP-REFER (RFC 3515), sodass beide mit jedem SIP-konformen Anbieter oder jeder SIP-konformen Telefonanlage funktionieren — mit dem Konto, das Sie bereits haben, ohne anbieterspezifische Einrichtung.

### Kann ich zwei Anrufe zu einer Telefonkonferenz zusammenführen?

Noch nicht. WaveKat Voice kann zwei oder mehr Anrufe gleichzeitig halten und zwischen ihnen wechseln, aber nur einer ist jeweils live. Dreierkonferenzen sind eine eigene Funktion, die wir noch nicht gebaut haben.

### Was hört ein Anrufer in der Warteschleife?

Ein in WaveKat Voice gehaltener Anrufer hört das, was sein eigenes Telefonsystem für die Warteschleife abspielt — meist dessen Wartemusik, nicht Stille oder einen Ton von WaveKat Voice. WaveKat Voice signalisiert das Halten auf dem SIP-Standardweg (ein re-INVITE, RFC 3264) und überlässt so das Warteschleifen-Erlebnis dem eigenen System des Anrufers, sodass er hört, was er erwartet.

### Wird ein Anruf aufgezeichnet, während er gehalten wird?

Nein. Aufnahme und Live-Transkript pausieren für die Dauer des Haltens auf beiden Seiten und laufen mit dem Anruf weiter. Die Zeitleiste der gespeicherten Aufnahme bleibt korrekt — gehaltene Zeit erscheint als Stille, nicht als Schnitt.

### Auf welchen Plattformen gibt es Halten, Anklopfen und Weiterleiten?

WaveKat Voice läuft heute auf Mac und Linux; Windows folgt, wenn die Nachfrage da ist. Halten, Anklopfen und beide Arten der Weiterleitung funktionieren auf beiden unterstützten Plattformen, mit dem SIP-Konto, das Sie schon nutzen — ohne Aufpreis, ohne Einrichtung.

## Probieren Sie es aus

[Laden Sie WaveKat Voice herunter](/de/voice/download/) — oder aktualisieren Sie auf [0.0.42](/de/voice/changelog/#0.0.42) — und die Bedienelemente sind auf jedem Anrufbildschirm: Halten neben Stummschalten, Weiterleiten daneben, und Anklopfen, das einfach passiert, wenn der zweite Anruf klingelt. Nichts zu konfigurieren, nichts extra zu bezahlen.

Legen Sie einen Anrufer in die Warteschleife, nehmen Sie die zweite Leitung an und stellen Sie jemanden durch, als gäbe es einen Empfang — denn jetzt gibt es einen.
