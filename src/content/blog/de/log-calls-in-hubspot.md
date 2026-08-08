---
title: "Anrufe automatisch in HubSpot erfassen"
description: "WaveKat Voice erfasst jeden Anruf automatisch in HubSpot — am passenden Kontakt, samt Transkript, und die Aufnahme läuft in HubSpots eigenem Player."
date: 2026-08-08
author: Eason Guo
tags: [Sprach-KI, Integrationen, HubSpot]
lang: "de"
---

Mit WaveKat Voice können Sie Anrufe jetzt automatisch in HubSpot erfassen. Verbinden Sie Ihr HubSpot-Konto einmal, und jeder Anruf, den Sie danach annehmen oder tätigen, legt sich selbst in Ihrem CRM ab — am richtigen Kontakt, mit Zeitpunkt, Richtung, Ausgang, Dauer, dem Transkript und einer Aufnahme, die Sie abspielen können, ohne HubSpot zu verlassen. Keine API-Schlüssel, keine Middleware, keine Browser-Erweiterung, und nichts, woran Sie nach dem Auflegen denken müssten. Ab heute in [Ihrem WaveKat-Konto](https://platform.wavekat.com/integrations) verfügbar, als Pro-Funktion — und während des Early Access ist Pro kostenlos.

Das ist ein weiteres Stück davon, [jedem kleinen Unternehmen die Stimme eines großen zu geben](/de/blog/hello-world/). Das CRM eines Konzerns weiß von jedem Anruf, weil jemand dafür bezahlt wird, dass es das tut. Ihres kann von jedem Anruf wissen, weil die Telefon-App, die Sie ohnehin nutzen — die, die [jedes Gespräch aufzeichnet und transkribiert](/de/voice/) —, es still dort notiert, wo Ihre Kundendaten liegen.

## Was nach jedem Anruf in HubSpot landet

Wenn ein Anruf endet, sucht WaveKat die Gegenseite anhand der Telefonnummer in Ihren HubSpot-Kontakten und legt einen Anrufeintrag auf deren Zeitleiste an:

| In HubSpot | Was darin steht |
|---|---|
| Kontakt | Über die Telefonnummer gefunden; wahlweise angelegt, wenn niemand passt |
| Zeitpunkt und Richtung | Wann der Anruf war, eingehend oder ausgehend |
| Ausgang und Dauer | Angenommen, verpasst oder fehlgeschlagen — und wie lange er dauerte |
| Betreff | Eine Zusammenfassungszeile, z. B. „Eingehend · angenommen · außerhalb der Zeiten“ |
| Transkript | Das ganze Gespräch, sofern Sie die Transkript-Synchronisierung nicht abschalten |
| Aufnahme | In HubSpots eigenem Player abspielbar, wenn der Anruf aufgezeichnet wurde |
| Link | Zurück zum Anruf in WaveKat, mit Wellenform und jedem Schritt des Ablaufs |

Der Eintrag sieht aus wie ein Anruf, den eine gewissenhafte Kollegin von Hand protokolliert hat — nur betrifft er jeden Anruf, ist wortgetreu, und er entstand, während Sie Kaffee geholt haben. Ruft jemand zweimal an oder wird eine Synchronisierung wiederholt, wird derselbe Anruf trotzdem nie doppelt abgelegt: WaveKat merkt sich, welcher HubSpot-Eintrag zu welchem Anruf gehört, und aktualisiert ihn, statt einen Zwilling anzulegen.

## Die Aufnahme in HubSpot abspielen

Die Aufnahme wird nicht nach HubSpot kopiert — es passiert etwas Besseres. Der Anrufeintrag enthält, was HubSpot braucht, um WaveKat *in dem Moment, in dem jemand auf Play drückt*, nach dem Audio zu fragen, und WaveKat antwortet genau dann. In der Praxis heißt das:

- **Das Abspielen bleibt auf der Kontakt-Zeitleiste.** Wer den Deal in HubSpot durchgeht, drückt auf Play und hört den Anruf — kein Wechsel der App, keine weitergeleiteten Dateien.
- **Einen Anruf zu löschen, löscht ihn wirklich.** Ist eine Aufnahme in WaveKat entfernt, bleibt in HubSpot keine Kopie zurück, die sie überlebt. Der nächste Klick auf Play findet nichts, weil nichts da ist.
- **Der Zugriff bleibt bei Ihnen.** Jedes Abspielen ist eine Anfrage, die WaveKat beantwortet — und ablehnen kann, etwa bei getrennter Integration oder gelöschtem Anruf. Eine kopierte Audiodatei könnte eine Antwort nie zurücknehmen.

Für das Transkript und den Ablauf Schritt für Schritt führt der Link im Eintrag zurück auf die Anrufseite in WaveKat, wo der [zweispurige Player mit sprechergenauem Transkript](/de/blog/share-a-call-recording/) sitzt.

## Einmal verbinden — keine API-Schlüssel, keine Einrichtung

Das Verbinden ist ein Klick auf Ihrer WaveKat-Kontoseite: Sie landen auf HubSpots eigener Zustimmungsseite, bestätigen und sind zurück — verbunden. Es gibt kein Entwicklerkonto anzulegen, keine private App zu konfigurieren, keine Scopes auszuwählen und kein Token einzufügen. Vor dem Klick sagt die Seite klar, was gesendet wird, und [die Datenschutzerklärung](/de/privacy/#integrations) führt dieselbe Liste in einfachen Worten auf.

![Die WaveKat-Integrationsseite im Web — HubSpot im Katalog als „Verbunden“ markiert, darunter das verbundene Portal mit „Synchronisiert“ und der letzten Synchronisierung vor wenigen Minuten.](/screenshots/integrations-hubspot/de.webp#shadow)

Das Trennen ist genauso sauber: WaveKat bittet HubSpot, den Zugriff zu widerrufen, und löscht die gespeicherten Zugangsdaten. Bereits in Ihr HubSpot geschriebene Anrufeinträge bleiben, wo sie sind — das ist die Historie Ihres CRM, und eine Integration zu trennen ist nicht dasselbe, wie Ihre Vergangenheit zu löschen.

## Sie entscheiden, was synchronisiert wird

Vier Schalter, jeweils pro Verbindung:

| Schalter | Standard | Was er tut |
|---|---|---|
| Transkript einschließen | An | Legt das Gesagte in den Anrufeintrag |
| Fehlende Kontakte anlegen | An | Legt einen Kontakt an, wenn keine Nummer passt |
| Löschungen übernehmen | An | Entfernt den Anruf aus HubSpot, wenn Sie ihn in WaveKat löschen |
| Unbekannte Anrufer nach ihrer Nummer benennen | Aus | Nutzt die Nummer als Kontaktnamen, wenn der Anbieter keinen sendet |

![Das Einstellungsfeld der Verbindung im Web — welche Anrufereignisse HubSpot erreichen, dazu Schalter für „Fehlende Kontakte anlegen“, „Unbekannte Anrufer nach ihrer Nummer benennen“, „Transkript einschließen“ und „Löschungen übernehmen“.](/screenshots/integrations-hubspot-options/de.webp#shadow)

Der letzte ist mit Absicht aus: Ein leerer Name ist korrekt, und die erste Kollegin, die die Nummer erkennt, trägt ihn dauerhaft ein. Wenn Sie ihn einschalten, landet die Nummer im Nachnamensfeld — nie im Vornamensfeld, denn HubSpot setzt Vornamen in personalisierte E-Mails ein, und „Hallo 021 123 4567“ ist keine Nachricht, die irgendjemand verschicken wollte.

Eine ehrliche Anmerkung, dieselbe wie in [der Datenschutzerklärung](/de/privacy/#integrations): Die Person am anderen Ende hat mit uns nichts vereinbart. Ihre Nummer, ihre Stimme und ihre Worte in Ihrem CRM abzulegen, ist dieselbe Verantwortung wie die Aufzeichnung des Gesprächs selbst — die Schalter gibt es, damit Sie synchronisieren können, was Sie auch verantworten wollen.

## Jeder Anruf zeigt, wohin er gegangen ist

Öffnen Sie in WaveKat einen beliebigen Anruf, und er sagt Ihnen, ob er Ihr CRM erreicht hat: ein **„In HubSpot“**-Kennzeichen, wenn er abgelegt ist, ein Wartezustand, solange er unterwegs ist, und — falls etwas schiefging — der Grund, in HubSpots eigenen Worten. Eine fehlgeschlagene Synchronisierung wird einen Tag lang mit wachsenden Abständen wiederholt, und eine Verbindung, die den Zugriff verliert, sagt „neu verbinden“, statt stillschweigend zu scheitern. Kein Rätselraten, ob die Leitung funktioniert.

![Ein abgeschlossener Anruf in WaveKat im Web — das Kennzeichen „In HubSpot“ neben dem Namen der Anruferin, darunter die zweispurige Aufnahme und eine Synchronisierungszeile mit dem HubSpot-Portal, in das er geschrieben wurde.](/screenshots/call-in-hubspot/de.webp#shadow)

## Wege, Anrufe in HubSpot zu erfassen

Es führen mehrere Wege dahin, Telefonate in HubSpot zu bekommen, und sie passen zu verschiedenen Setups:

| Weg | Was er verlangt | Behalten Sie Ihren Anbieter? |
|---|---|---|
| Anrufe von Hand erfassen | Jemand tippt nach jedem Gespräch | Ja |
| HubSpots eingebaute Telefonie | Telefonieren über HubSpot mit einer HubSpot-Nummer | Nein |
| Cloud-Dialer-Plattformen | Ihre Telefonie dorthin verlagern, Preis pro Platz | Nein |
| Webhooks plus Automatisierungswerkzeug | Ein zusätzliches Automatisierungsabo und eine Strecke, die gepflegt sein will | Ja |
| Native Integration von WaveKat Voice | Ein Klick zum Verbinden; Anrufe bleiben auf Ihrer SIP-Leitung | Ja |

Die Dialer-Plattformen sind wirklich gut in dem, was sie tun — Power-Dialing, SMS, Gesprächscoaching für Vertriebsteams. Was sie verlangen, ist, dass Ihre Telefonie zu ihnen umzieht. WaveKat Voice wettet auf das Gegenteil: Sie behalten [den Anbieter, den Sie schon haben](/de/voice/), Ihre Anrufe finden auf Ihrem Computer statt, und HubSpot ist ein Ziel, an das Ihre Anrufe melden — nicht das System, in dem sie wohnen.

## Kostenlos und Pro

Die native HubSpot-Integration ist eine **Pro**-Funktion — dieselbe Stufe, die auch [Anrufe mit Menüs und Weiterleitungen lenkt](/de/blog/answer-calls-with-a-call-flow/). Während des Early Access ist das Upgrade auf Pro kostenlos: ein Klick auf [Ihrer WaveKat-Kontoseite](https://platform.wavekat.com/profile), kein Bezahlschritt, und es gilt ein Jahr.

Kostenlose Konten haben weiterhin einen Weg ins CRM: **Webhooks**, die einen Eintrag zu jedem Anruf an eine URL Ihrer Wahl senden — während der Beta gratis. Die native Integration ist das, worauf Sie upgraden, wenn Sie die zustandsbehafteten Teile wollen: Kontaktzuordnung, doppelfreie Einträge, Aufnahme-Wiedergabe und Löschungen, die übernommen werden.

## Häufige Fragen

### Wie erfasse ich Anrufe mit WaveKat Voice automatisch in HubSpot?

Melden Sie sich mit eingeschalteter Cloud-Synchronisierung in Ihrem WaveKat-Konto an, klicken Sie auf der Integrationsseite auf „HubSpot verbinden“ und bestätigen Sie auf HubSpots Zustimmungsseite. Von da an wird jeder Anruf, den Sie in WaveKat Voice annehmen oder tätigen, automatisch in HubSpot abgelegt — pro Anruf ist nichts zu tun.

### Legt WaveKat Voice HubSpot-Kontakte automatisch an?

Ja, solange „Fehlende Kontakte anlegen“ eingeschaltet bleibt. WaveKat ordnet jeden Anruf über die Telefonnummer einem HubSpot-Kontakt zu; passt niemand, wird der Kontakt angelegt, damit der Anruf trotzdem zu einer Person gehört. Abgeschaltet werden nicht zugeordnete Anrufe ohne Kontakt erfasst.

### Kann ich Gesprächsaufnahmen in HubSpot abspielen?

Ja. Der HubSpot-Eintrag eines aufgezeichneten Anrufs läuft im eigenen Player von HubSpot auf der Kontakt-Zeitleiste. Das Audio wird beim Abspielen von WaveKat geholt statt kopiert — löschen Sie den Anruf in WaveKat, ist er wirklich weg, und im CRM bleibt keine verirrte Kopie.

### Was passiert in HubSpot, wenn ich einen Anruf in WaveKat lösche?

Ist „Löschungen übernehmen“ an (der Standard), wird der HubSpot-Anrufeintrag archiviert, sobald Sie den Anruf in WaveKat löschen, und seine Aufnahme spielt nicht mehr. Schalten Sie es aus, behält Ihre HubSpot-Historie den Eintrag, auch wenn der Anruf in WaveKat verschwunden ist.

### Brauche ich einen API-Schlüssel, um HubSpot zu verbinden?

Nein. Die Verbindung ist ein Klick über HubSpots eigene Zustimmungsseite — keine private App zu konfigurieren, kein API-Schlüssel zu erzeugen oder einzufügen. Wenn Sie lieber selbst bauen, gibt es weiterhin Webhooks, die jeden Anruf an eine URL Ihrer Wahl senden.

### Ist die HubSpot-Integration kostenlos?

Sie ist eine Pro-Funktion. Während des Early Access ist Pro kostenlos — ein Klick auf Ihrer WaveKat-Kontoseite gibt Ihnen ein Jahr, ohne Bezahlschritt. Webhooks bleiben in kostenlosen Konten als Selbstbau-Weg ins CRM verfügbar.

### Auf welchen Plattformen funktioniert das?

WaveKat Voice läuft heute auf Mac und Linux. Die HubSpot-Integration liegt in Ihrem WaveKat-Konto und arbeitet daher auf beiden gleich — und die Anrufe, die sie erfasst, sind in HubSpot aus jedem Browser lesbar.

## Ausprobieren

[Laden Sie WaveKat Voice](/de/voice/download/), melden Sie sich mit eingeschalteter Cloud-Synchronisierung an und klicken Sie auf [Ihrer Integrationsseite](https://platform.wavekat.com/integrations) auf **HubSpot verbinden**. Ihr nächster Anruf ist in Ihrem CRM, bevor Sie Ihre Notizen fertig haben — die Sie, genau genommen, gar nicht mehr machen müssen.

Aufzeichnen, Transkribieren, [Teilen](/de/blog/share-a-call-recording/) und jetzt das CRM — ein Anruf wird immer nützlicher, nachdem Sie aufgelegt haben.
