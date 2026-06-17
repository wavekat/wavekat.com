---
title: "Ciao, mondo — WaveKat è qui"
description: "Presentiamo WaveKat: strumenti vocali open source e basati su AI, pensati per le piccole imprese. Ecco cosa stiamo costruendo e perché."
date: 2026-04-01
author: Eason Guo
tags: [annuncio, open-source, voice-ai]
lang: "it"
---

Abbiamo fondato WaveKat partendo da una convinzione semplice:

> Ogni piccola impresa merita la voce di una grande.

Le piccole imprese perdono chiamate. Non possono permettersi una reception o un servizio di risposta attivo 24 ore su 24. Nel frattempo, le grandi aziende mettono in campo sofisticate AI vocali che gestiscono migliaia di chiamate al giorno. Questo divario non dovrebbe esistere.

## Cosa stiamo costruendo

WaveKat costruisce strumenti per l’AI vocale in tempo reale. Iniziamo con un insieme di librerie open source:

- **wavekat-core** — primitive audio condivise come `AudioFrame` e la conversione del formato dei campioni
- **wavekat-vad** — rilevamento dell’attività vocale con più backend (WebRTC, Silero e altri)
- **wavekat-turn** — rilevamento del turno che capisce quando chi parla ha finito
- **wavekat-lab** — una dashboard interattiva per testare e confrontare i backend audio

Sopra queste librerie stiamo costruendo **wavekat-voice** — un sistema di risposta telefonica basato su AI che si collega all’infrastruttura SIP/RTP standard. Risponde al telefono, sostiene una conversazione reale e gestisce la chiamata — così l’imprenditore non deve farlo.

## Perché iniziare dall’open source?

Crediamo che la tecnologia di base — VAD, rilevamento del turno, elaborazione audio — debba essere aperta, verificabile e libera su cui costruire. Questi mattoni fondamentali non dovrebbero essere chiusi dietro contratti enterprise.

## Cosa viene dopo

Siamo a testa bassa a costruire. Seguici su [GitHub](https://github.com/wavekat) o torna a trovarci qui — scriveremo dell’ingegneria dietro la voce in tempo reale, dei compromessi che stiamo facendo e di ciò che impariamo lungo il cammino.
