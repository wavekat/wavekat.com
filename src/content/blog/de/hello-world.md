---
title: "Hallo, Welt — WaveKat ist da"
description: "Wir stellen WaveKat vor: quelloffene, KI-gestützte Sprachwerkzeuge für kleine Unternehmen. Hier erfahren Sie, was wir bauen und warum."
date: 2026-04-01
author: Eason Guo
tags: [Ankündigung, Open-Source, Sprach-KI]
lang: "de"
---

Wir haben WaveKat aus einer einfachen Überzeugung heraus gegründet:

> Jedes kleine Unternehmen verdient die Stimme eines großen.

Kleine Unternehmen verpassen Anrufe. Sie können sich weder einen Empfang noch einen rund um die Uhr besetzten Telefondienst leisten. Große Konzerne hingegen setzen ausgefeilte Sprach-KI ein, die Tausende von Anrufen am Tag bewältigt. Diese Kluft sollte es nicht geben.

## Was wir bauen

WaveKat entwickelt Werkzeuge für Echtzeit-Sprach-KI. Wir beginnen mit einer Reihe quelloffener Bibliotheken:

- **wavekat-core** — gemeinsame Audio-Bausteine wie `AudioFrame` und die Umwandlung von Sampleformaten
- **wavekat-vad** — Sprachaktivitätserkennung mit mehreren Backends (WebRTC, Silero und weitere)
- **wavekat-turn** — Sprecherwechselerkennung, die weiß, wann eine sprechende Person fertig ist
- **wavekat-lab** — ein interaktives Dashboard zum Testen und Vergleichen von Audio-Backends

Auf diesen Bibliotheken aufbauend entwickeln wir **wavekat-voice** — ein KI-gestütztes Telefonannahmesystem, das sich an gängige SIP/RTP-Infrastruktur anschließt. Es nimmt das Telefon ab, führt ein echtes Gespräch und wickelt den Anruf ab — damit die Inhaberin oder der Inhaber es nicht selbst tun muss.

## Warum mit Open Source beginnen?

Wir sind überzeugt, dass die grundlegende Technologie — VAD, Sprecherwechselerkennung, Audioverarbeitung — offen, überprüfbar und frei nutzbar sein sollte. Diese Bausteine sollten nicht hinter Unternehmensverträgen weggesperrt sein.

## Wie es weitergeht

Wir sind voll im Entwicklungsmodus. Folgen Sie uns auf [GitHub](https://github.com/wavekat) oder schauen Sie hier wieder vorbei — wir werden über die Technik hinter Echtzeit-Sprache schreiben, über die Abwägungen, die wir treffen, und über das, was wir unterwegs lernen.
