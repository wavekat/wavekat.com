---
title: "Ein kostenloser Sprachgenerator für Telefonmenüs, IVR und Ansagen"
description: "Der WaveKat Voice Prompt Generator macht aus Text telefonfertige Ansagen, IVR-Menüs und Voicemail — KI-Stimmen in Studioqualität. Kostenlos testen, ohne Konto."
date: 2026-07-19
author: Eason Guo
tags: [Werkzeuge, Sprach-KI]
lang: "de"
draft: true
---

Der [WaveKat Voice Prompt Generator](/de/voice/prompts/) ist ein kostenloses Web-Werkzeug, das beliebigen Text in telefonfertiges Audio verwandelt — Telefonansagen, IVR- und Telefonmenüs, Anrufbeantworter-Ansagen, Ansagen außerhalb der Zeiten und Warteschleifen-Ansagen — gesprochen von KI-Stimmen in Studioqualität. Sie geben den Text ein, wählen eine Stimme und laden eine Datei in genau dem Format herunter, das Ihre Telefonanlage braucht. Er läuft im Browser unter [platform.wavekat.com/voice/prompts](https://platform.wavekat.com/voice/prompts), und Ihre ersten Clips erstellen Sie ganz ohne Konto.

![Der WaveKat Voice Prompt Generator — tippen Sie, was Ihre Anrufer hören sollen, wählen Sie eine Stimme und ein Telefonformat, und klicken Sie auf „Generieren“.](/screenshots/voice-prompts/de.webp#shadow)

## Jedes Geschäftstelefon braucht Aufnahmen — und an sie zu kommen ist erstaunlich mühsam

Jede Telefonanlage, die ein Unternehmen betreibt — eine Büro-PBX, eine gehostete VoIP-Leitung, ein Twilio-Flow — braucht aufgenommenes Audio: die Begrüßung, die Anrufer zuerst hören, das Menü „für Vertrieb die 1“, die Anrufbeantworter-Ansage, die Feiertagsdurchsage. Die Aufnahmen sind klein, aber die üblichen Wege, sie zu erstellen, sind alle auf ihre eigene Art umständlich:

- **Selbst aufnehmen** — und Sie bekommen Hintergrundgeräusche, schwankende Lautstärke und eine Neuaufnahme, sobald sich im Text ein Wort ändert.
- **Einen Sprecher buchen** — und aus einem zehnsekündigen „Montag geschlossen“-Update werden ein Termin, eine Lieferzeit und eine Rechnung.
- **Eine generische Text-to-Speech-Seite nutzen** — und Sie erhalten eine für Videos optimierte MP3, die Ihre Telefonanlage womöglich ablehnt oder verzerrt abspielt, denn Telefonaudio hat seine eigenen Formate.

Das Ergebnis kennt jeder, der schon einmal bei einem kleinen Unternehmen angerufen hat: eine Begrüßung, vor Jahren in einer Stimme aufgenommen, ein Menü in einer anderen und eine Anrufbeantworter-Ansage, die einfach die Standardansage des Anbieters ist. Der Voice Prompt Generator ist dafür da, den richtigen Weg zum einfachen zu machen.

## Was Sie damit erstellen können

Jedes davon ist eine konkrete Telefonaudio-Aufgabe, die der Generator erledigt — zusammen decken sie ab, was eine typische Telefonanlage abspielt:

| Ansage | Beispiel |
|---|---|
| Telefonansage | „Danke für Ihren Anruf bei Acme Sanitär — wie können wir helfen?“ |
| IVR- / Telefonmenü | „Für Vertrieb die 1, für Support die 2.“ |
| Anrufbeantworter-Ansage | Eine professionelle Ansage nach dem Signalton, wenn niemand abnehmen kann |
| Ansage außerhalb der Zeiten & an Feiertagen | „Unser Büro ist über die Feiertage geschlossen und öffnet wieder am Montag um 9 Uhr.“ |
| Warteschleifen-Ansage | Ein kurzer gesprochener Hinweis zwischen der Wartemusik — Öffnungszeiten, eine Aktion, die Bitte um einen Rückruf |

Erzeugen Sie sie alle mit derselben Stimme, und Ihre gesamte Telefonanlage klingt wie eine einzige, stimmige Marke — statt wie ein Flickwerk aus Aufnahmen, die Jahre auseinanderliegen.

## Audio, das Ihre Telefonanlage wirklich akzeptiert

Das ist der Teil, den generische Text-to-Speech-Werkzeuge falsch machen. Telefonanlagen wollen keine MP3 mit hoher Bitrate; die meisten erwarten **8 kHz µ-law WAV**, das Schmalband-Format, das Telefonnetze seit Jahrzehnten verwenden. Geben Sie ihnen etwas anderes, und Sie wühlen sich durch Anleitungen zum erneuten Kodieren, bevor Ihre Begrüßung überhaupt läuft.

Der Voice Prompt Generator gibt jeden Clip in den Formaten aus, die Telefonanlagen verlangen — **8 kHz µ-law, WAV oder MP3** — sodass die Datei ohne Umwandlungsschritt direkt in Asterisk, FreePBX, 3CX, Twilio und den Rest einspielbar ist. Dateien werden mit klaren, sprechenden Namen heruntergeladen — bereit zum Hochladen oder zur Übergabe an die Person, die Ihre Telefonanlage betreut.

## So funktioniert es

1. **Text eingeben** — schreiben Sie die Begrüßung, das Menü oder die Ansage, oder starten Sie mit einem der eingebauten Beispiele und passen Sie es an.
2. **Stimme wählen** — wählen Sie aus einer kuratierten Auswahl von KI-Stimmen in Studioqualität in mehreren Sprachen und hören Sie vorab, wie Ihr Text klingt.
3. **Datei herunterladen** — erhalten Sie einen telefonfertigen Clip in dem Format, das Ihre Anlage braucht, und laden Sie ihn hoch. Fertig.

Das ist der ganze Ablauf. Eine Begrüßung, die früher hieß, einen Sprecher zu buchen — oder mit einem Audiokonverter zu kämpfen —, dauert jetzt etwa eine Minute.

## Häufige Fragen

### Was ist der WaveKat Voice Prompt Generator?

Es ist ein kostenloses Web-Werkzeug, das Text in telefonfertiges Audio verwandelt — Telefonansagen, IVR- und Telefonmenüs, Anrufbeantworter-Ansagen und Warteschleifen-Ansagen — gesprochen von KI-Stimmen in Studioqualität. Sie geben den Text ein, wählen eine Stimme und laden eine Datei herunter, die Ihre Telefonanlage abspielen kann.

### Ist es wirklich kostenlos?

Ja. Sie können Ihre ersten Clips im Browser erzeugen — ohne Konto und ohne Karte. Wenn Sie sich mit GitHub oder Google anmelden, entfällt das Limit und Sie können eine Bibliothek Ihrer Ansagen speichern; intensivere Nutzung wird nach denselben kostenlosen und Pro-Stufen abgerechnet wie der Rest der WaveKat-Plattform.

### Funktioniert das Audio mit meiner Telefonanlage?

Ja — die Clips kommen in den Formaten heraus, die Telefonanlagen erwarten: 8 kHz µ-law, WAV und MP3. Sie lassen sich ohne erneutes Kodieren direkt in Systeme wie Asterisk, FreePBX, 3CX und Twilio einspielen. Wählen Sie das Format, das Ihr System verlangt, und laden Sie die Datei hoch.

### Darf ich die Clips kommerziell nutzen, für mein Geschäftstelefon?

Ja — genau dafür ist der Generator da. Die Stimmen sind kommerzielle Text-to-Speech-Stimmen, freigegeben für den Telefoneinsatz. Erzeugen Sie Ihre Begrüßung, Ihr Menü, Ihre Anrufbeantworter- und Warteschleifen-Ansagen, laden Sie sie herunter und spielen Sie sie in Ihre Telefonanlage ein.

### Wie unterscheidet sich das von WaveKat Voice, der App?

[WaveKat Voice](/de/voice/) ist eine Desktop-App, die Ihren Computer zu Ihrem Geschäftstelefon macht — Anrufe entgegennehmen und tätigen, aufgezeichnet und transkribiert. Der Voice Prompt Generator ist ein separates, kostenloses Web-Werkzeug, das die aufgenommenen Begrüßungen und Menüs erstellt, die Ihre Telefonanlage abspielt. Sie ergänzen einander, aber Sie können jedes für sich nutzen.

## Probieren Sie es aus

Öffnen Sie den [Voice Prompt Generator](https://platform.wavekat.com/voice/prompts), tippen Sie eine Zeile, wählen Sie eine Stimme und laden Sie einen telefonfertigen Clip herunter — kein Konto, kein Download, keine Karte. Wenn Sie die längere Geschichte dazu lesen möchten, finden Sie auf der [Seite des Werkzeugs](/de/voice/prompts/) den vollständigen Überblick.

Ihre Anrufer hören Ihre Telefonanlage, bevor sie Sie hören. Jetzt dauert es nur noch eine Minute, sie gut klingen zu lassen.
