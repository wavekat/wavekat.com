---
title: "Eine Anrufaufnahme per Link teilen"
description: "WaveKat Voice verwandelt jetzt jede aufgezeichnete Anrufaufnahme in einen teilbaren Link — privat, nur auf Einladung oder öffentlich — mit genauer Kontrolle darüber, was der Empfänger hören und lesen kann."
date: 2026-06-28
author: Eason Guo
tags: [Sprach-KI, Anrufaufnahmen, Datenschutz]
lang: "de"
---

WaveKat Voice verwandelt jetzt jede aufgezeichnete Anrufaufnahme in einen Link, den Sie verschicken können. Öffnen Sie einen Anruf, wählen Sie, wer zuhören darf — nur Sie, ein paar von Ihnen eingeladene Personen oder jeder mit dem Link — und kopieren Sie eine URL. Wer sie öffnet, sieht eine aufgeräumte Seite mit dem Audioplayer oben und einem nach Sprechern beschrifteten Transkript darunter. Aufnahmen beginnen als **Privat**, das Teilen ist pro Anruf bewusst zu aktivieren, und Sie können das Teilen jederzeit beenden. Eingeführt mit WaveKat Voice [0.0.41](/de/voice/changelog/#0.0.41) und heute auf Mac und Linux verfügbar.

Das setzt den roten Faden fort, an dem wir immer wieder ziehen: [jedem kleinen Unternehmen die Stimme eines großen zu geben](/de/blog/hello-world/). Ein großes Unternehmen kann einen Anruf in Sekunden aufrufen und an einen Kollegen, einen Kunden oder einen Lieferanten weiterleiten. Jetzt können Sie das auch — aus derselben App, die [jeden Anruf aufzeichnet und transkribiert](/de/voice/) und [Ihren KI-Assistenten Anrufe tätigen lässt](/de/blog/place-calls-from-the-command-line/).

## Was es tut

Jeder Anruf in WaveKat Voice wird bereits auf Ihrem Computer aufgezeichnet und transkribiert. Das Teilen ist die Schicht, die es *jemand anderem* erlaubt, einen davon anzuhören. Sie wählen eine Aufnahme aus, wählen eine Zugriffsstufe, und WaveKat Voice gibt Ihnen einen Link. Die Person, der Sie ihn schicken, öffnet eine Webseite — keine App zu installieren, nichts herunterzuladen — und hört zu.

Es gibt drei Zugriffsstufen, und **Privat ist immer die Standardeinstellung**:

| Zugriffsstufe | Wer sie öffnen kann | Anmeldung nötig |
|---|---|---|
| **Privat** | Nur Sie | — (es ist nur Ihre eigene Ansicht) |
| **Bestimmte Personen** | Nur die von Ihnen eingeladenen Personen, per E-Mail | Ja — sie melden sich an, um ihre Identität zu bestätigen |
| **Jeder mit dem Link** | Jeder, der den Link hat | Nein |

„Bestimmte Personen" ist für die Fälle gedacht, in denen die Aufnahme heikel ist — der Anruf eines Kunden, alles mit persönlichen Angaben — und Sie sie auf namentlich genannte Personen beschränken möchten. „Jeder mit dem Link" ist für die Fälle, in denen Sie sie einfach offen halten wollen: eine Kundenstimme, eine Demo, ein Anruf, bei dem es Ihnen nichts ausmacht, dass er öffentlich ist. Eine Aufnahme jederzeit wieder auf Privat zu setzen, macht jeden Link darauf sofort unbrauchbar.

![WaveKat Voice auf dem Mac — das Teilen-Panel bei einer aufgezeichneten Aufnahme: die drei Zugriffsstufen, ein Einladungsfeld und die Steuerelemente dafür, was Empfänger sehen können.](/screenshots/share-sheet/de.webp)

## Sie entscheiden genau, was sie sehen

Eine Aufnahme zu teilen ist kein Alles-oder-nichts. Bevor Sie den Link verschicken, wählen Sie, was auf der Seite steht, die der Empfänger öffnet:

- **Identität des Gesprächspartners** — die Nummer der anderen Seite anzeigen, maskieren oder ganz verbergen.
- **Transkript** — das geschriebene Transkript beilegen oder weglassen.
- **Audio** — sie im Browser abspielen lassen, oder abspielen *und* herunterladen, oder das Audio verbergen und nur das Transkript teilen.
- **Welche Seite zuerst spielt** — mit beiden Seiten des Anrufs starten, nur mit Ihrer Seite oder nur mit der des Gesprächspartners. (Die Aufnahme selbst ändert sich nie — ein Zuhörer kann jede Seite wieder einschalten.)

Diese Steuerelemente gibt es, weil eine Anrufaufnahme dicht mit den Informationen anderer Leute gefüllt ist. Es geht darum, den Teil zu teilen, der Ihr Anliegen belegt — ein Zitat, eine Zusage, eine Seite eines Gesprächs — ohne mehr preiszugeben, als Sie meinen.

## Etwas öffentlich zu machen ist ein bewusster Schritt

Eine Aufnahme öffentlich zu machen ist der einzige Weg mit einer Schutzschranke davor. Bevor ein Link für jeden offen wird, hält WaveKat Voice inne und sagt in klaren Worten, was das bedeutet:

> Jeder mit dem Link kann diesen Anruf ohne Anmeldung anhören und das Transkript lesen. Anrufe enthalten oft persönliche Daten wie Telefonnummern, Adressen oder Zahlungsinformationen. Sobald ein Link öffentlich ist, können Sie nicht mehr steuern, mit wem er geteilt wird. Sie können sie jederzeit wieder privat machen.

Ein paar Dinge machen dies ehrlich statt zu einem bloßen Häkchen:

- **Privat ist die hartnäckige Standardeinstellung.** Das Teilen-Panel öffnet jedes Mal auf Privat. Öffentlich ist nie vorausgewählt und nie einen Klick näher als die sichereren Optionen.
- **Jeder Link ist widerrufbar.** Setzen Sie eine Aufnahme wieder auf Privat, und ausstehende Links funktionieren sofort nicht mehr.

## Was Ihr Empfänger sieht

Der Link öffnet eine Seite, die um den Anruf herum gebaut ist, nicht um WaveKat. Oben sitzt ein zweispuriger Audioplayer — Ihre Seite und die des Gesprächspartners als getrennte Wellenformen — darunter das vollständige Transkript, nach Sprecher beschriftet (**Sie** und **Anrufer**) und durchsuchbar. Weil das Transkript direkt da ist, funktioniert die Seite zugleich als Textalternative zum Audio, sodass ein Empfänger, der keinen Ton abspielen kann, den Anruf trotzdem lesen kann.

Wenn Sie mit „Bestimmte Personen" geteilt haben, bittet die Seite sie zuerst um die Anmeldung und öffnet sich nur für die von Ihnen eingeladenen Konten. Wenn Sie sie öffentlich gemacht haben, öffnet sie sich direkt zum Player.

![Eine geteilte WaveKat-Voice-Aufnahme, im Browser geöffnet — der Audioplayer und das nach Sprechern beschriftete Transkript, das ein Empfänger sieht.](/screenshots/share-viewer/de.webp)

## Das Teilen lebt in der Cloud — mit Absicht

Ein Teilen-Link ist etwas, das eine andere Person öffnet, womöglich während Ihr Laptop zugeklappt ist. WaveKat Voice läuft auf Ihrer eigenen Maschine und ist nicht aus dem Internet erreichbar, also muss eine geteilte Aufnahme irgendwo liegen, wo ein Empfänger sie tatsächlich erreichen kann. Das bedeutet, dass das Teilen drei Dinge voraussetzt, und das Teilen-Panel sagt Ihnen, welches fehlt:

1. Sie sind bei Ihrem WaveKat-Konto **angemeldet**.
2. Die **Cloud-Synchronisierung ist aktiviert**, sodass die Aufnahme in Ihrem Konto gespeichert wurde.
3. Diese Aufnahme **ist fertig hochgeladen**.

Bis alle drei zutreffen, erklärt das Teilen-Steuerelement genau, was zu tun ist, statt einfach ausgegraut dazusitzen. Wenn Sie sich nie anmelden, verlässt nichts Ihren Computer — und nichts ist teilbar, was dieselbe Regel von der anderen Seite ausspricht. Das Teilen ist die eine Funktion, die per Design nicht rein lokal sein kann.

Sie können eine Freigabe aus der Desktop-App starten oder aus Ihren Aufnahmen im Web — so oder so ist es dieselbe Aufnahme und derselbe Link.

## Auch über die Kommandozeile

Wie der Rest von WaveKat Voice ist auch das Teilen skriptfähig. Mit [aktivierter Automatisierung](/de/blog/place-calls-from-the-command-line/) kann das Kommandozeilenwerkzeug Aufnahmen teilen und die Freigabe wieder aufheben:

```bash
# Eine Aufnahme mit bestimmten Personen teilen
wavekat-voice recording share <call-id> --visibility restricted --invite name@example.com

# Freigabe beenden — setzt die Aufnahme wieder auf Privat
wavekat-voice recording unshare <call-id>
```

Eine Aufnahme aus einem Skript (oder von einem KI-Assistenten) **öffentlich** zu machen, erfordert eine ausdrückliche Bestätigung — `--yes` auf der Kommandozeile, ein `confirm_public`-Flag über die Assistenten-Tools — sodass nichts auf eine vage Anweisung hin öffentlich wird.

## Häufig gestellte Fragen

### Wie teile ich eine Anrufaufnahme aus WaveKat Voice?

Öffnen Sie den Anruf in WaveKat Voice, wählen Sie im Teilen-Panel eine Zugriffsstufe — Privat, Bestimmte Personen oder Jeder mit dem Link — und kopieren Sie den Link. Der Empfänger öffnet ihn in einem Browser, um zuzuhören und das Transkript zu lesen; es ist keine App zu installieren. Aufnahmen sind privat, bis Sie sie teilen.

### Kann ich steuern, was der Empfänger hören oder lesen kann?

Ja. Bevor Sie teilen, wählen Sie, ob die Nummer des Gesprächspartners angezeigt, maskiert oder verborgen wird, ob das Transkript beigelegt wird, ob das Audio abspielbar oder auch herunterladbar ist (oder ganz ausgeblendet), und welche Seite des Anrufs zuerst spielt. Die Aufnahme selbst wird nie verändert.

### Ist eine geteilte Aufnahme für das ganze Internet öffentlich?

Nur wenn Sie „Jeder mit dem Link" wählen, und WaveKat Voice warnt Sie, bevor das passiert. Sie können eine Aufnahme jederzeit wieder auf Privat setzen, was bestehende Links deaktiviert. Die Standardeinstellung für jede Aufnahme ist Privat.

### Brauche ich ein Konto, um Aufnahmen zu teilen?

Ja. Das Teilen setzt voraus, dass Sie bei Ihrem WaveKat-Konto mit aktivierter Cloud-Synchronisierung angemeldet sind, denn der Link muss erreichbar sein, wenn Ihr Computer schläft. Wenn Sie sich nicht anmelden, bleiben Ihre Aufnahmen vollständig auf Ihrem Computer und sind nicht teilbar.

### Kann jemand einen geteilten Link ohne Anmeldung öffnen?

Das hängt von der Zugriffsstufe ab. „Jeder mit dem Link" öffnet sich ohne Anmeldung. „Bestimmte Personen" verlangt vom Empfänger, sich als eines der von Ihnen eingeladenen Konten anzumelden. „Privat" bedeutet, dass nur Sie ihn öffnen können.

### Welche Plattformen unterstützen das Teilen von Aufnahmen?

WaveKat Voice läuft heute auf Mac und Linux, Windows folgt, sobald die Nachfrage da ist. Das Teilen funktioniert auf beiden unterstützten Plattformen, und Empfänger öffnen geteilte Links in jedem Webbrowser.

## Probieren Sie es aus

[Laden Sie WaveKat Voice herunter](/de/voice/download/), melden Sie sich an und aktivieren Sie die Cloud-Synchronisierung, öffnen Sie dann eine beliebige aufgezeichnete Aufnahme und klicken Sie auf Teilen. Beginnen Sie mit Privat, teilen Sie mit ein paar Personen, und werden Sie nur öffentlich, wenn Sie es wirklich wollen.

Aufzeichnen, Transkribieren und jetzt Teilen — der Anruf ist die Arbeitseinheit, und WaveKat Voice macht ihn so leicht weiterzugeben wie ein Dokument.
