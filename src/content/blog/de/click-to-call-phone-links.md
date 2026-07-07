---
title: "Telefonnummern auf Websites anklicken und anrufen"
description: "WaveKat Voice verarbeitet jetzt tel:- und sip:-Links auf Mac und Linux — eine Telefonnummer auf einer Website anklicken, und die App öffnet sich bereit zum Wählen. Optionale Sofortwahl, standardmäßig aus."
date: 2026-07-07
author: Eason Guo
tags: [Sprach-KI, Anrufe]
lang: "de"
draft: true
---

WaveKat Voice — das SIP-Softphone für Mac und Linux, das jeden Anruf aufzeichnet und transkribiert — kann jetzt die App sein, die Ihr Computer öffnet, wenn Sie auf einer Website auf eine Telefonnummer klicken. Klicken Sie irgendwo auf einen `tel:`- oder `sip:`-Link — die Kontaktseite eines Unternehmens, ein Suchergebnis, die Rechnung eines Lieferanten — und WaveKat Voice rückt in den Vordergrund, mit der bereits eingetragenen Nummer und bereit für Ihren Druck auf „Anrufen". Das kommt mit [0.0.43](/de/voice/changelog/#0.0.43).

Click-to-call bedeutet, dass eine Telefonnummer auf einer Webseite ein anklickbarer Link ist, den Sie zum Wählen anklicken, statt sie herauszukopieren und von Hand neu einzutippen. Auf einem Bürotelefon ist das eine Selbstverständlichkeit und eine jener Funktionen, die man erst bemerkt, wenn sie fehlt: Man sieht eine Nummer auf einer Seite, klickt sie an, das Telefon wählt. WaveKat Voice — das [SIP-Softphone](/de/voice/), das jeden Anruf aufzeichnet und transkribiert und auf einer [eigenen SIP-Engine läuft](/de/blog/our-own-sip-engine/) — wählt jetzt auch die Nummern, die Sie anklicken.

## Was es kann

Schalten Sie **Telefon-Links** ein, und jede Telefonnummer, die ein anklickbarer Link ist, wird zu einem Weg in WaveKat Voice. Klicken Sie in Ihrem Browser auf `tel:+14155550123`, und die App rückt in den Vordergrund und öffnet das Fenster „Neuer Anruf" mit `+14155550123` bereits im Feld „An". Sie schauen es sich an und drücken auf „Anrufen". Es funktionieren sowohl `tel:`-Links (gewöhnliche Telefonnummern) als auch `sip:`-Links (SIP-Adressen wie `sip:alice@example.com`) — die SIP-Adresse geht direkt an Ihr Konto.

![WaveKat Voice auf Ubuntu — das Fenster „Neuer Anruf" ist geöffnet, eine Telefonnummer ist bereits eingetragen und bereit zum Wählen.](/screenshots/dial-prefilled/de.webp)

Die Voreinstellung ist bewusst die sichere: Die Nummer wird eingetragen, aber **Sie** tätigen den Anruf. Eine Webseite kann darum *bitten*, einen Anruf zu starten; wählen kann sie nicht, ohne dass ein Mensch auf „Anrufen" drückt. Das ist wichtig, denn einen Link auf einer Seite kann jeder dort platzieren.

## So schalten Sie es ein

Telefon-Links sind **aus, bis Sie sie einschalten**, denn die Telefonnummern-Links auf Ihrem ganzen Computer für sich zu beanspruchen, sollte Ihre Entscheidung sein und keine Überraschung einer gerade installierten App. Schalten Sie **Telefon-Links** unter **Einstellungen → Allgemein** ein — an derselben Stelle wie „Beim Anmelden starten" — und WaveKat Voice registriert sich bei Ihrem Betriebssystem als Handler für Telefon-Links. Wie das aussieht, hängt vom Betriebssystem ab, und die Einstellung ist dabei ehrlich:

| Plattform | Was passiert, wenn Sie es einschalten |
|---|---|
| **macOS** | WaveKat Voice wird sofort zum Handler und übernimmt `tel:`-Links von FaceTime. |
| **Linux** | Funktioniert, sobald Sie es einschalten. |

![WaveKat Voice auf Ubuntu — Einstellungen → Allgemein mit dem eingeschalteten Schalter „Telefon-Links".](/screenshots/settings-general-phone-links/de.webp)

Neu bei WaveKat Voice? Telefon-Links werden Ihnen im freundlichsten Moment angeboten — direkt nach Ihrem ersten erfolgreichen Testanruf, auf der Karte „Alles bereit". Es ist ein einmaliges Angebot, kein Nörgeln: Nehmen Sie es an oder winken Sie ab, und es fragt nicht wieder. Langjährige Nutzer, die das Wählfeld öffnen, um eine Nummer von Hand einzutippen — genau die Leute, für die Click-to-call gemacht ist — erhalten dasselbe stille Angebot am unteren Rand des Wählfensters. Wie auch immer Sie zustimmen, darunter steckt derselbe einzelne Schalter.

## Optional: wählen, sobald Sie klicken

Wenn Ihnen Eintragen-und-Bestätigen ein Schritt zu viel ist, gibt es dafür eine Option zum Aktivieren. Schalten Sie **„Telefon-Links sofort wählen"** ein (ebenfalls unter Einstellungen → Allgemein und erst verfügbar, sobald Telefon-Links an ist), und ein Klick tätigt den Anruf sofort, statt auf Ihren Druck auf „Anrufen" zu warten. Standardmäßig ist das **aus**, und selbst wenn es an ist, hält sich WaveKat Voice in den Fällen zurück, in denen ein sofortiger Anruf der falsche wäre:

- **Nur, wenn es genau eine Leitung zum Anrufen gibt.** Wenn Sie mehrere Konten haben, die den Anruf tätigen könnten, trägt WaveKat Voice die Nummer ein und lässt Sie die Leitung wählen, statt zu raten.
- **Nie über einen Anruf, in dem Sie schon sind.** Wenn Sie mitten im Gespräch sind, trägt der Klick die Nummer ein, statt hereinzuplatzen.
- **Das Fenster kommt immer nach vorn.** Selbst bei einer Sofortwahl sehen Sie den Anruf zustande kommen und können auflegen — eine Seite kann nicht heimlich im Hintergrund einen Anruf tätigen.

## Häufige Fragen

### Wie sorge ich dafür, dass eine Telefonnummer auf einer Website in WaveKat Voice geöffnet wird?

Schalten Sie **Telefon-Links** unter Einstellungen → Allgemein ein. Danach öffnet ein Klick auf jeden `tel:`- oder `sip:`-Link — die Art anklickbarer Telefonnummer, die Sie auf Kontaktseiten finden — WaveKat Voice mit eingetragener Nummer, bereit zum Wählen.

### Tätigt ein Klick auf einen Telefon-Link den Anruf automatisch?

Nein, nur wenn Sie es so einstellen. Standardmäßig trägt WaveKat Voice die Nummer ein und wartet auf Ihren Druck auf „Anrufen", sodass eine Webseite niemals von selbst einen Anruf tätigen kann. Es gibt die optionale Einstellung „Telefon-Links sofort wählen", standardmäßig aus, falls Sie den Bestätigungsschritt lieber überspringen.

### Welche Plattformen unterstützen Click-to-call?

Mac und Linux, die beiden Plattformen, auf denen WaveKat Voice heute läuft (Windows folgt, wenn die Nachfrage da ist). Schalten Sie Telefon-Links unter Einstellungen → Allgemein ein, und es funktioniert auf beiden.

### Funktioniert es auch mit `sip:`-Links oder nur mit `tel:`-Nummern?

Beides. Ein `tel:`-Link wird zu einer wählbaren Nummer normalisiert; ein `sip:`-Link (wie `sip:alice@example.com`) geht direkt an Ihr SIP-Konto. WaveKat Voice registriert sich als Handler sowohl für `tel:` als auch für `sip:`.

### Ist es sicher, Websites mein Softphone öffnen zu lassen?

Ja, denn ein Link kann einen Anruf nur *anfordern*, nicht tätigen. Die sichere Voreinstellung trägt die Nummer ein und wartet auf Ihren Druck auf „Anrufen". WaveKat Voice akzeptiert nur `tel:`-/`sip:`-Links, bereinigt die Nummer, bevor irgendetwas damit geschieht, und ruft — selbst bei aktivierter Sofortwahl — nie aus einem überraschenden Konto an, unterbricht nie einen laufenden Anruf und zeigt Ihnen immer das Fenster, damit Sie auflegen können.

### Kann ich es wieder ausschalten?

Ja. Schalten Sie **Telefon-Links** unter Einstellungen → Allgemein aus, und WaveKat Voice öffnet sich nicht mehr für Telefon-Links. Die Einstellung steuert das Verhalten selbst, sodass angeklickte Links ignoriert werden, solange der Schalter aus ist — selbst wenn Ihr System die Zuordnung noch kennt.

## Probieren Sie es aus

[Laden Sie WaveKat Voice herunter](/de/voice/download/) — oder aktualisieren Sie auf [0.0.43](/de/voice/changelog/#0.0.43) — und schalten Sie dann **Telefon-Links** unter Einstellungen → Allgemein ein. Klicken Sie auf einer beliebigen Webseite auf eine Nummer, und sie steht bereits im Wählfeld und wartet auf Sie.

Die Nummer ist auf dem Bildschirm; Sie haben sie angeklickt; jetzt ruft sie einfach an. Genau darum geht es.
