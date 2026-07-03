---
title: "Bonjour le monde — WaveKat est là"
description: "Présentation de WaveKat : des outils vocaux open source et alimentés par l'IA, conçus pour les petites entreprises. Voici ce que nous construisons, et pourquoi."
date: 2026-04-01
updated: 2026-07-04
author: Eason Guo
tags: [annonce, open-source, ia-vocale]
lang: "fr"
---

Nous avons fondé WaveKat avec une conviction simple :

> Chaque petite entreprise mérite la voix d'une grande.

Les petites entreprises manquent des appels. Elles ne peuvent pas se permettre un accueil ni un service de réponse disponible 24/7. Pendant ce temps, les grands groupes déploient des IA vocales sophistiquées qui gèrent des milliers d'appels par jour. Ce fossé ne devrait pas exister.

## Ce que nous construisons

WaveKat développe des outils pour l'IA vocale en temps réel. Nous commençons par un ensemble de bibliothèques open source :

- **wavekat-core** — des primitives audio partagées comme `AudioFrame` et la conversion de format d'échantillon
- **wavekat-vad** — la détection d'activité vocale avec plusieurs backends (WebRTC, Silero, et d'autres)
- **wavekat-turn** — la détection de tour de parole, qui sait quand un locuteur a fini de parler
- **wavekat-lab** — un tableau de bord interactif pour tester et comparer les backends audio

Au-dessus de ces bibliothèques, nous avons construit **WaveKat Voice** — un softphone de bureau pour Mac et Linux qui transforme votre ordinateur en téléphone professionnel. Il répond et passe des appels via le fournisseur SIP que vous avez déjà, enregistre chaque appel et transcrit ce qui se dit en direct. Un [assistant IA peut manier le clavier de numérotation pour vous](/fr/blog/place-calls-from-the-command-line/) — c'est vous qui parlez ; un assistant qui tient la conversation lui-même, c'est la direction que nous prenons.

## Pourquoi commencer par l'open source ?

Nous pensons que la technologie fondamentale — VAD, détection de tour de parole, traitement audio — devrait être ouverte, vérifiable et libre d'utilisation pour bâtir dessus. Ces briques de base ne devraient pas être enfermées derrière des contrats d'entreprise.

## Et ensuite ?

Nous sommes plongés dans le développement. Suivez-nous sur [GitHub](https://github.com/wavekat) ou repassez ici — nous écrirons sur l'ingénierie derrière la voix en temps réel, les compromis que nous faisons et ce que nous apprenons en chemin.

**WaveKat Voice** est aujourd’hui en bêta publique gratuite — [téléchargez-le](/fr/voice/download/) pour Mac ou Linux.
