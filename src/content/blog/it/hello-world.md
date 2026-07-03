---
title: "Ciao, mondo — WaveKat è qui"
description: "Presentiamo WaveKat: strumenti vocali open source e basati su AI, pensati per le piccole imprese. Ecco cosa stiamo costruendo e perché."
date: 2026-04-01
updated: 2026-07-04
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

Sopra queste librerie abbiamo costruito **WaveKat Voice** — un softphone desktop per Mac e Linux che trasforma il tuo computer nel telefono della tua attività. Risponde e fa chiamate tramite il provider SIP che già hai, registra ogni chiamata e trascrive in diretta ciò che viene detto. Un [assistente IA può usare il tastierino al posto tuo](/it/blog/place-calls-from-the-command-line/) — a parlare sei tu; un assistente che sostiene la conversazione da sé è la direzione in cui stiamo andando.

## Perché iniziare dall’open source?

Crediamo che la tecnologia di base — VAD, rilevamento del turno, elaborazione audio — debba essere aperta, verificabile e libera su cui costruire. Questi mattoni fondamentali non dovrebbero essere chiusi dietro contratti enterprise.

## Cosa viene dopo

Siamo a testa bassa a costruire. Seguici su [GitHub](https://github.com/wavekat) o torna a trovarci qui — scriveremo dell’ingegneria dietro la voce in tempo reale, dei compromessi che stiamo facendo e di ciò che impariamo lungo il cammino.

**WaveKat Voice** è oggi in beta pubblica gratuita — [scaricalo](/it/voice/download/) per Mac o Linux.
