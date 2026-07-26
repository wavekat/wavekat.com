---
title: "KI-Assistenten echte Anrufe tätigen lassen"
description: "WaveKat Voice bringt Kommandozeile und MCP-Server mit, damit ein KI-Assistent wie Claude echte Telefonanrufe auf Ihrem Computer tätigen und verwalten kann."
date: 2026-06-16
author: Eason Guo
tags: [Sprach-KI, Automatisierung, KI-Agenten]
lang: "de"
---

WaveKat Voice liefert jetzt ein Kommandozeilenwerkzeug, sodass ein Programm, dem Sie vertrauen — darunter ein KI-Assistent wie Claude — echte Telefonanrufe für Sie tätigen und verwalten kann. Bitten Sie Ihren Assistenten, „die Zahnarztpraxis anzurufen und zu warten, bis jemand abnimmt", und er wählt über die App, die Sie bereits geöffnet haben, verfolgt den Anruf und teilt Ihnen mit, wie er verlaufen ist. Es ist heute auf Mac und Linux in die App eingebaut und bleibt ausgeschaltet, bis Sie es aktivieren.

Das ist der nächste Schritt hin zu dem, worauf wir immer wieder zurückkommen: [jedem kleinen Unternehmen die Stimme eines großen zu geben](/de/blog/hello-world/). Ein großes Unternehmen hat eine Telefonzentrale und Software, die sie steuert. Jetzt können Ihr Computer — und der darauf laufende Assistent — diese Telefonzentrale sein.

## Was es tatsächlich tut

WaveKat Voice hatte schon immer ein Telefon, das leise im Hintergrund läuft: Es meldet sich bei Ihrem SIP-Anbieter an und wickelt Anrufe ab. Neu ist eine zweite Möglichkeit, es zu steuern — ein Befehl namens `wavekat-voice`, der mit der laufenden App kommuniziert.

Um die Grenze genau zu benennen, denn das ist wichtig:

- **Es tätigt und verwaltet Anrufe.** Eine Nummer wählen, auf das Ergebnis warten, auflisten, was gerade klingelt, einen eingehenden Anruf annehmen oder ablehnen, Wähltöne senden, um durch ein Telefonmenü zu navigieren, auflegen, das Transkript abrufen.
- **Sprechen tun weiterhin Sie.** Das Audio fließt über das Mikrofon und die Lautsprecher Ihres Computers, genau wie wenn Sie in der App auf „Anrufen" klicken. Der Assistent baut den Anruf auf und steuert ihn; die Person, die im Anruf spricht, sind Sie. (Ein Assistent, der im Anruf selbst spricht, ist ein eigenes, späteres Projekt.)

Der Assistent ist also die Hand am Wählfeld, nicht die Stimme in der Leitung. Das ist eine bewusste, ehrliche Grenze — und für die alltäglichen „verbinde mich mit einem Menschen"-Aufgaben ist es das meiste von dem, was Sie tatsächlich wollen.

![WaveKat Voice unter Ubuntu — ein vom Assistenten initiierter Anruf, laufend, mit Live-Transkript daneben.](/screenshots/in-call/de.webp)

## Es gibt nichts zu installieren

Der Befehl `wavekat-voice` ist dasselbe Programm, das die App ausführt — es liegt bereits auf Ihrer Festplatte, sobald Sie WaveKat Voice installieren. Kein zweiter Download, kein separates Paket, keine Version, die mit der App aus dem Takt geraten kann.

Es ist **standardmäßig ausgeschaltet**. Solange die Automatisierung aktiviert ist, kann jedes Programm, das Sie auf Ihrem Computer ausführen, über Ihr Konto Anrufe tätigen — und Anrufe können Kosten verursachen —, deshalb überlassen wir diese Entscheidung Ihnen. Schalten Sie es unter **Einstellungen → Automatisierung** (Settings → Automation) ein; dort gibt es auch eine Schaltfläche, die `wavekat-voice` mit einem Klick zu Ihrem PATH hinzufügt, damit jedes Terminal es findet.

![WaveKat Voice unter Ubuntu — die Automatisierungseinstellungen mit aktiviertem Befehlszeilenzugriff und der Schaltfläche zum Installieren des Kommandozeilen-Tools.](/screenshots/settings-automation/de.webp)

## Verbinden Sie einen KI-Assistenten mit einem Klick

Der schnellste Weg ist die Seite **Einstellungen → Automatisierung** selbst. Sie sucht nach KI-Assistenten, die Sie bereits installiert haben, und bietet für jeden eine **Verbinden** (Connect)-Schaltfläche an. Heute deckt das ab:

| Assistent | Wie er verbunden wird |
|---|---|
| Claude Desktop, Cursor, Windsurf | Über einen in der App gebündelten MCP-Server |
| Claude Code, Codex, Gemini | Über einen verwalteten Hinweis in ihrer Anweisungsdatei |

Ein Klick richtet alles ein — nichts zu kopieren oder einzufügen. Danach bitten Sie den Assistenten einfach, einen Anruf zu tätigen. Zwei Dinge sind wissenswert: Manche Assistenten müssen vollständig neu gestartet werden (beenden und erneut öffnen), um die neuen Werkzeuge zu erkennen; und die Verbindung hält sich selbst aktuell — wenn WaveKat Voice im Hintergrund aktualisiert wird, wird jeder verbundene Assistent stillschweigend synchron gehalten, sodass Sie nie neu verbinden müssen.

![WaveKat Voice unter Ubuntu — KI-Assistenten wie Claude und Cursor verbinden, jeweils mit einer Ein-Klick-Schaltfläche „Verbinden“.](/screenshots/settings-automation-agents/de.webp)

## Wie es im Terminal aussieht

Jeder Befehl akzeptiert `--json` für maschinenlesbare Ausgabe, und genau das macht es für einen Assistenten angenehm, ihn zu steuern. Ein paar Beispiele:

```bash
# Is the app running, and which accounts are connected?
wavekat-voice status

# Place a call and wait — the exit code says how it went.
wavekat-voice call +14155550123 --wait
echo "result: $?"

# Find a call that's happening right now, then hang it up.
wavekat-voice call list --json | jq -r '.[0].id' | xargs wavekat-voice call hangup
```

Der Exit-Code von `--wait` ist der Vertrag, auf den ein Skript (oder ein Assistent) verzweigt: `0` angenommen und dann normal beendet, `2` besetzt oder abgelehnt, `3` fehlgeschlagen oder abgebrochen, `4` keine Antwort. Es ist keine Ausgabenanalyse nötig, um zu wissen, was passiert ist.

Die Befehle sind danach gruppiert, worauf sie wirken — `call` zum Tätigen und Handhaben von Anrufen, `recording` für gespeichertes Audio, `log` für das Aktivitätsprotokoll —, mit `status`, `accounts` und einem Live-`events`-Stream auf oberster Ebene. Führen Sie `wavekat-voice call --help` aus, um den vollständigen Satz zu sehen.

## Warum wir es so gebaut haben

Ein paar Entscheidungen, mit denen wir zufrieden sind:

- **Eine Binärdatei, keine neue Angriffsfläche.** Das Kommandozeilenwerkzeug ist der eigene Daemon der App mit einem anderen Hut auf — es erbt also die Signierung der App, ihre automatischen Updates und ihre Sicherheitsprüfung kostenlos und kann nie eine veraltete Version sein.
- **Die Binärdatei ist die Quelle der Wahrheit.** Der Hilfetext trägt die Exit-Codes und Beispiele; die Assistenten-Integrationen verweisen auf `wavekat-voice --help`, statt eine Befehlsliste einzufrieren, die veralten würde. Aktualisieren Sie die App, und die Werkzeuge aktualisieren sich mit.
- **Standardmäßig aus, opt-in, widerrufbar.** Einen kostenpflichtigen Telefonanruf zu tätigen ist folgenreich, deshalb bleibt die Automatisierung aus, bis Sie darum bitten, und **Entfernen** (Remove) hängt jeden Assistenten wieder aus, ohne den Rest seiner Einstellungen anzutasten.

## Häufig gestellte Fragen

### Kann ein KI-Assistent mit WaveKat Voice Telefonanrufe tätigen?

Ja. Mit aktivierter Automatisierung in WaveKat Voice (Einstellungen → Automatisierung) kann ein KI-Assistent wie Claude über das Kommandozeilenwerkzeug der App oder ihren MCP-Server echte Telefonanrufe tätigen, verfolgen und beenden. Der Assistent steuert den Anruf; Sie sprechen darin.

### Spricht die KI im Anruf statt mir?

Nein. WaveKat Voice leitet das Anrufaudio über das Mikrofon und die Lautsprecher Ihres Computers — Sie sprechen. Der Assistent übernimmt das Wählen, das Warten auf eine Antwort, das Senden von Menütönen und das Auflegen.

### Muss ich etwas zusätzlich installieren, um die Kommandozeile zu nutzen?

Nein. Der Befehl `wavekat-voice` wird mit der WaveKat-Voice-App geliefert, ist also bereits auf Ihrem Computer. Sie müssen nur die Automatisierung unter Einstellungen → Automatisierung einschalten und optional auf „Befehlszeilenwerkzeug installieren (Install command-line tool)" klicken, um sie zu Ihrem PATH hinzuzufügen.

### Ist es sicher, die Automatisierung eingeschaltet zu lassen?

Lassen Sie sie ausgeschaltet, sofern Sie sie nicht gerade nutzen. Solange die Automatisierung eingeschaltet ist, kann jedes Programm, das Sie auf Ihrem Computer ausführen, über Ihr Konto Anrufe tätigen, was Kosten verursachen kann. Aus diesem Grund ist sie standardmäßig ausgeschaltet, und Sie können sie jederzeit wieder ausschalten.

### Welche Assistenten lassen sich mit einem Klick verbinden?

Heute Claude Desktop, Claude Code, Cursor, Codex, Gemini und Windsurf — über einen gebündelten MCP-Server für die Desktop-Assistenten und einen verwalteten Anweisungshinweis für die Kommandozeilen-Assistenten.

### Welche Plattformen unterstützen das?

WaveKat Voice läuft heute auf Mac und Linux, Windows folgt, sobald die Nachfrage besteht. Das Kommandozeilenwerkzeug und die Assistenten-Integrationen sind auf beiden unterstützten Plattformen verfügbar.

## Probieren Sie es aus

[Laden Sie WaveKat Voice herunter](/de/voice/download/), öffnen Sie **Einstellungen → Automatisierung** und verbinden Sie Ihren Assistenten. Die vollständige Befehlsreferenz — jeder Befehl, seine JSON-Ausgabe und die Exit-Codes — finden Sie in der [Automatisierungsdokumentation](/docs/voice/automation/).

Wir stehen hier erst am Anfang. Anrufe zu steuern ist die Grundlage; ein Assistent, der auch das Gespräch selbst führen kann, ist der nächste Schritt.
