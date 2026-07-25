---
title: "Anrufabläufe — Ihr Telefon nimmt ab, Sie sehen zu und übernehmen jederzeit"
description: "WaveKat Voice beantwortet eingehende Anrufe jetzt mit einem Anrufablauf: Begrüßung, Telefonmenü, Nachricht oder ein Anruf an Sie. Sie sehen jeden Schritt live und übernehmen mitten in der Nachricht."
date: 2026-07-25
author: Eason Guo
tags: [Sprach-KI, Anrufe]
lang: "de"
---

WaveKat Voice — das SIP-Softphone für Mac und Linux, das jeden Anruf aufzeichnet und transkribiert — nimmt eingehende Anrufe jetzt für Sie an. Das, was abnimmt, ist ein **Anrufablauf**: Er begrüßt die Anruferin, prüft, ob Sie geöffnet haben, spielt ein Menü ab, ruft Sie, nimmt eine Nachricht auf oder leitet den Anruf weiter. Sie bauen den Ablauf im Web, weisen ihn einer Ihrer Leitungen zu — und ab dann bekommen auch die Anrufe eine Antwort, zu denen Sie es nicht schaffen. Enthalten ab [0.0.43](/de/voice/changelog/#0.0.43).

Das ist der bisher größte Schritt zu dem, worauf wir immer wieder zurückkommen: [jedem kleinen Unternehmen die Stimme eines großen zu geben](/de/blog/hello-world/). Ein großes Unternehmen beantwortet jeden Anruf — es gibt einen Empfang, ein Telefonmenü, das jemand von einem Berater bauen ließ, einen Dienst für die Zeit nach Feierabend. Ein Drei-Personen-Laden hat ein Telefon, das klingelt, bis sich jemand die Hände abtrocknen kann — und wer auflegt, ist eine Buchung, die nie zustande kam. Anrufabläufe schließen diese Lücke, und sie laufen auf dem Computer, der ohnehin auf Ihrem Schreibtisch steht.

## Was ein Anrufablauf ist

Ein Ablauf ist eine kurze Liste von Schritten, die der Anruf der Reihe nach durchläuft. Jeder Schritt ist ein Baustein mit genau einer Aufgabe:

| Schritt | Was die anrufende Person erlebt |
|---|---|
| **Begrüßung** | Hört Ihre aufgenommene Begrüßung — „Danke für Ihren Anruf." |
| **Öffnungszeiten** | Direkt nichts: Der Ablauf prüft Ihren Wochenplan und Ihre Feiertage und nimmt außerhalb der Öffnungszeiten einen anderen Weg. |
| **Menü** | „Für Reservierungen die 1, für Öffnungszeiten die 2." Der Tastendruck bestimmt den nächsten Schritt. |
| **Ruft Sie** | Ihr Telefon klingelt wie gewohnt. Nehmen Sie ab, tritt der Ablauf zur Seite. |
| **Nimmt eine Nachricht auf** | Eine Ansage, ein Signalton, dann die Nachricht — aufgezeichnet und transkribiert wie jeder andere Anruf. |
| **Leitet weiter** | Wird zu einer anderen Nummer durchgestellt. |
| **Legt auf** | Hört eine Verabschiedung, dann endet der Anruf. |

Sie müssen keinen Menübaum von Grund auf zeichnen und nichts programmieren. Sie starten mit einer Vorlage — einer Galerie fertiger Abläufe, bevorzugt in Ihrer Sprache, die Sie in Ihr Konto kopieren — und ändern die Formulierungen. Ein leerer Ablauf steht ebenfalls bereit, wenn Sie lieber selbst bauen.

![WaveKat Voice unter Ubuntu — die Seite eines Anrufablaufs mit seinem Schaubild: Begrüßung, eine Öffnungszeiten-Prüfung, die sich in geöffnet und geschlossen teilt, ein Anruf an Sie und der Anrufbeantworter.](/screenshots/flow-detail/de.webp)

Die App zeichnet den Ablauf als Schaubild. „Was passiert, wenn jemand anruft" ist damit ein Bild, auf das Sie zeigen können — und keine Liste von Regeln, die Sie im Kopf behalten müssen.

## Im Web bauen, auf Ihrem Computer ausführen

Abläufe werden auf [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows) bearbeitet, angemeldet mit demselben WaveKat-Konto wie in der App. Vorlage wählen, in die eigene Bibliothek kopieren, bearbeiten: eintippen, was Anrufende bei jedem Schritt hören sollen, die Öffnungszeiten setzen und festlegen, wie lange das Telefon klingelt, bevor der Ablauf eine Nachricht aufnimmt.

![Der WaveKat-Anrufablauf-Editor im Web — das Schaubild neben den Schritt-Details, mit dem Text der Begrüßung, der Stimme, mit der sie erzeugt wurde, und einer Schaltfläche zum Neu-Generieren.](/screenshots/flow-editor/de.webp#shadow)

Aufnehmen müssen Sie nichts. Text eintippen, Stimme wählen — den Rest erzeugt die Plattform mit [demselben Sprachansagen-Generator](/de/blog/phone-menu-ivr-voice-generator/), der [auch für sich allein kostenlos nutzbar](/de/voice/prompts/) ist: Studioqualität, im Format, das Telefonanlagen erwarten. Ein Klick vertont alle Schritte des Ablaufs auf einmal, sodass aus einer Vorlage in etwa einer Minute **Ihre** Begrüßung wird. Mit **Veröffentlichen** wird diese Version eingefroren: Formulierungen, Einstellungen und Audioclips gehören fest zusammen und können sich nicht unbemerkt verändern.

Der veröffentlichte Ablauf erscheint anschließend im neuen Bereich **Anrufabläufe** der App — auf jedem Computer, an dem Sie angemeldet sind. Öffnen, die Leitung wählen, die er annehmen soll, einschalten. Auf der Karte der Leitung steht dann **Antwortet**, und damit ist die Einrichtung fertig: keine Weiterleitung beim Anbieter, keine Nummer, die irgendwohin portiert werden muss.

Abläufe laufen **auf Ihrem Computer**, in der App, über das SIP-Konto, das Sie bereits haben. Nichts am Anruf wird auf unseren Servern beantwortet: Die Begrüßung kommt von Ihrem Rechner, die Nachricht wird auf Ihrem Rechner aufgezeichnet, und pro Anruf entstehen keine Kosten, weil niemand dazwischensteht. Der ehrliche Preis dafür: Die App muss laufen und der Computer wach sein, damit der Ablauf abnimmt — und pro Leitung nimmt genau ein Computer ab.

## Live zusehen, wie er abnimmt

Am meisten freut uns nicht, *dass* abgenommen wird — sondern dass Sie dabei zusehen können.

Wenn ein Ablauf abnimmt, tut die App nicht so, als würden Sie telefonieren. Auf dem Bildschirm steht **„Empfang nimmt an"**, darunter eine Zeile, die sagt, was gerade passiert: *Spricht mit dem Anrufer… Menü wird abgespielt… Ruft Sie an… Nimmt eine Nachricht auf…*

![WaveKat Voice unter Ubuntu — ein Anruf, den ein Ablauf annimmt: „Empfang nimmt an" mit „Nimmt eine Nachricht auf…" und dem Namen des Anrufers.](/screenshots/flow-answering/de.webp)

Darunter leuchtet dasselbe Schaubild auf, das Sie gebaut haben, während der Anruf hindurchwandert: Der Schritt, auf dem die anrufende Person gerade ist, hebt sich hervor, bereits durchlaufene Schritte bleiben hell, der Rest bleibt gedämpft. Wo jemand ist und wie er dorthin kam, sehen Sie auf einen Blick.

Das ist Anrufvorschau statt Mailbox, wie Sie sie kennen. Eine Mailbox beim Anbieter nimmt ab, ohne dass jemand zusieht; Sie erfahren es Stunden später. Hier nimmt der Ablauf für Sie ab, während Sie direkt daneben sitzen — Sie bekommen also das alte Anrufbeantworter-Gefühl zurück: erst hören, wer dran ist, dann entscheiden.

## Mitten in der Nachricht übernehmen

Weil Sie zusehen, können Sie den Anruf an sich ziehen. Während jemand eine Nachricht hinterlässt, zeigt die App eine Schaltfläche **Annehmen**: ein Druck, und der Anruf wechselt auf Ihr Mikrofon und Ihre Lautsprecher — genau wie ein Anruf, den Sie selbst angenommen hätten. Der bis dahin aufgezeichnete Teil der Nachricht bleibt erhalten.

![WaveKat Voice unter Ubuntu — das Live-Schaubild mit hervorgehobenem Anrufbeantworter-Schritt, darunter die Schaltfläche „Annehmen" und die Nachricht des Anrufers als Live-Transkript.](/screenshots/flow-takeover/de.webp)

Und Sie müssen nicht raten, ob sich das Abnehmen lohnt: Die Nachricht erscheint als Text, während sie gesprochen wird. Sie lesen, wer dran ist und worum es geht, und entscheiden dann.

**Annehmen** erscheint nur in den Momenten, in denen ein Mensch für die anrufende Person nachvollziehbar dazukommt — während sie eine Nachricht spricht, nicht mitten in Ihrer Begrüßung oder in einer Menüansage. Niemand möchte, dass sich eine Stimme über die Ansage legt, die gerade noch mit ihm spricht.

## Nach dem Anruf

Ein vom Ablauf angenommener Anruf landet wie jeder andere in Ihrem Verlauf, mit dem Namen des Ablaufs daneben — *Angenommen von „Empfang"*. So sehen Sie sofort, welche Anrufe Sie selbst erledigt haben und welche der Ablauf. Öffnen Sie einen, sagt Ihnen die Zusammenfassung in klaren Worten, wie er endete: **Der Anrufer hat eine Nachricht hinterlassen** — samt Link zu dem Ablauf, der ihn entgegengenommen hat.

![WaveKat Voice unter Ubuntu — ein beendeter Anruf, den ein Ablauf angenommen hat: das Kennzeichen „Angenommen von Empfang", das Ergebnis „Der Anrufer hat eine Nachricht hinterlassen" und darunter die Aufnahme.](/screenshots/call-details-flow/de.webp)

Die Nachricht selbst ist eine Aufnahme mit Transkript, am selben Ort wie alles andere — und die Schritte des Ablaufs sind auf der Aufnahme markiert, sodass Sie direkt zu dem Moment springen, in dem die anrufende Person zu sprechen beginnt, statt danach zu suchen. Sie ist durchsuchbar und lässt sich [per Link teilen](/de/blog/share-a-call-recording/), wenn jemand anderes sie hören soll.

## Was kostenlos ist und was Pro hinzufügt

Die Linie, die wir gezogen haben, ist einfach: **Kostenlos nimmt ab. Pro leitet weiter.**

| | Kostenlos | Pro |
|---|---|---|
| Verfügbare Schritte | Begrüßung, ruft Sie, nimmt eine Nachricht auf, legt auf | Alles davon, plus Öffnungszeiten, Menü und Weiterleitung |
| Veröffentlichte Abläufe | 1 | 10 |

Ein kostenloses Konto bekommt damit einen vollwertigen Anrufbeantworter mit eigener Begrüßung, eigenen Formulierungen, Live-Vorschau und Übernahme — keine Kostprobe. Pro brauchen Sie, wenn der Ablauf entscheiden soll: außerhalb der Öffnungszeiten anders reagieren, Anrufende per Menü an die richtige Stelle schicken, Anrufe an eine andere Nummer durchstellen. Im Early Access ist das Upgrade auf Pro kostenlos — ein Klick auf [Ihrer WaveKat-Kontoseite](https://platform.wavekat.com/profile), ohne Bezahlschritt — und gilt ein Jahr. Ihr Tarif und dessen Ablaufdatum stehen in der App unter „Einstellungen".

## Häufige Fragen

### Was ist ein Anrufablauf in WaveKat Voice?

Ein Anrufablauf ist eine Folge von Schritten, die eingehende Anrufe automatisch beantwortet — Begrüßung, Prüfung Ihrer Öffnungszeiten, Telefonmenü, ein Anruf an Sie, Aufnahme einer Nachricht oder Weiterleitung. Sie bauen ihn im Web auf platform.wavekat.com, weisen ihn einer Ihrer Leitungen zu, und die WaveKat-Voice-App auf Ihrem Computer führt ihn aus, sobald ein Anruf eingeht.

### Muss mein Computer an sein, damit ein Ablauf abnimmt?

Ja. Abläufe laufen in der App auf Ihrem eigenen Computer, nicht auf einem Server — der Rechner muss also wach und WaveKat Voice gestartet sein. Genau deshalb fallen keine Kosten pro Anruf an und bleibt das Audio auf Ihrer Maschine; im Gegenzug nimmt ein schlafender Laptop nicht ab. Pro Leitung nimmt genau ein Computer ab, eine Anmeldung auf einem zweiten Gerät führt also nicht zu doppelten Antworten.

### Kann ich einen Anruf, den der Ablauf angenommen hat, noch selbst übernehmen?

Ja, solange die anrufende Person eine Nachricht hinterlässt. Die App zeigt live, was der Ablauf tut, und während der Nachricht erscheint **Annehmen**; ein Druck, und der Anruf kommt auf Ihr Mikrofon und Ihre Lautsprecher, der bereits aufgezeichnete Teil bleibt erhalten. Während Begrüßung oder Menü wird **Annehmen** bewusst nicht angeboten, damit sich nie ein Mensch über eine noch laufende Ansage legt.

### Muss ich die Begrüßung selbst aufnehmen?

Nein. Sie tippen, was Anrufende hören sollen, und wählen eine Stimme; die Plattform erzeugt daraus telefontaugliches Audio mit dem WaveKat-Sprachansagen-Generator — ein Klick vertont jeden Schritt des Ablaufs. Ändern Sie den Text später, generieren Sie diesen Schritt neu; bis Sie erneut veröffentlichen, spielt die veröffentlichte Version weiter das alte Audio.

### Was passiert mit einer hinterlassenen Nachricht?

Sie wird wie jeder andere Anruf auf Ihrem Computer aufgezeichnet und transkribiert und erscheint in Ihrem Verlauf, gekennzeichnet mit dem Namen des Ablaufs und dem Ausgang des Anrufs. Von dort können Sie sie abspielen, das Transkript lesen, zu einem Schritt des Ablaufs springen oder sie per privatem Link teilen.

### Ist das eine KI-Empfangskraft, die mit Anrufenden spricht?

Noch nicht — und das sagen wir lieber deutlich. Die heutigen Schritte sind die vorhersehbaren: Begrüßung, Öffnungszeiten, Menü, Klingeln, Nachricht, Weiterleitung. Sie tun jedes Mal genau das, was Sie geschrieben haben. Ein Assistenz-Schritt, der ein echtes Gespräch mit der anrufenden Person führt, ist der nächste Meilenstein — und wird ein weiterer Baustein sein, den Sie in denselben Ablauf setzen.

### Funktioniert das mit meinem SIP-Anbieter?

Ja, mit dem Konto, das Sie in WaveKat Voice bereits eingerichtet haben. Abläufe beantworten Anrufe, welche die App ohnehin erhält: Wenn Ihre Leitung heute die App klingeln lässt, kann ein Ablauf sie annehmen — keine Weiterleitung beim Anbieter, keine zusätzliche Nummer, keine Minutenpreise für einen Telefonservice.

### Auf welchen Plattformen gibt es Anrufabläufe?

Mac und Linux, die beiden Plattformen, auf denen WaveKat Voice heute läuft (Windows kommt, sobald die Nachfrage da ist). Das Bearbeiten funktioniert in jedem Browser, denn Abläufe entstehen im Web und werden mit der App synchronisiert.

## Ausprobieren

[WaveKat Voice herunterladen](/de/voice/download/) — oder auf [0.0.43](/de/voice/changelog/#0.0.43) aktualisieren —, anmelden und den ersten Ablauf auf [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows) bauen. Mit einer Vorlage anfangen, die Formulierungen ändern, veröffentlichen und einer Leitung zuweisen.

Und dann warten Sie den nächsten Anruf ab und sehen zu, wie er beantwortet wird. Sie sehen weiterhin, wer dran ist, und können weiterhin übernehmen — genau darum geht es. Sie sind nur nicht mehr das Einzige, was zwischen einem Anruf und einer Antwort steht.
