---
title: "Hola, mundo — WaveKat ya está aquí"
description: "Presentamos WaveKat: herramientas de voz de código abierto, impulsadas por IA y creadas para las pequeñas empresas. Esto es lo que estamos construyendo y por qué."
date: 2026-04-01
updated: 2026-07-04
author: Eason Guo
tags: [anuncio, código-abierto, voz-ia]
lang: "es"
---

Creamos WaveKat partiendo de una convicción sencilla:

> Toda pequeña empresa merece tener la voz de una grande.

Las pequeñas empresas pierden llamadas. No pueden costear una recepción ni un servicio de atención telefónica 24/7. Mientras tanto, las grandes empresas despliegan sofisticadas soluciones de IA de voz que gestionan miles de llamadas al día. Esa brecha no debería existir.

## Qué estamos construyendo

WaveKat construye herramientas para la IA de voz en tiempo real. Empezamos con un conjunto de bibliotecas de código abierto:

- **wavekat-core** — primitivas de audio compartidas, como `AudioFrame` y la conversión de formatos de muestra
- **wavekat-vad** — detección de actividad de voz con múltiples backends (WebRTC, Silero y más)
- **wavekat-turn** — detección de turnos, que sabe cuándo un hablante ha terminado de hablar
- **wavekat-lab** — un panel interactivo para probar y comparar backends de audio

Sobre estas bibliotecas hemos construido **WaveKat Voice**, un softphone de escritorio para Mac y Linux que convierte tu ordenador en el teléfono de tu negocio. Contesta y hace llamadas a través del proveedor SIP que ya tienes, graba cada llamada y escribe lo que se dice en tiempo real. Un [asistente de IA puede manejar el marcador por ti](/es/blog/place-calls-from-the-command-line/) — hablar, hablas tú; un asistente que lleve la conversación por sí mismo es hacia donde vamos.

## ¿Por qué empezar con el código abierto?

Creemos que la tecnología fundamental —VAD, detección de turnos, procesamiento de audio— debería ser abierta, auditable y de libre uso para construir sobre ella. Estos componentes básicos no deberían quedar encerrados tras contratos empresariales.

## Qué viene después

Estamos enfocados de lleno en construir. Síganos en [GitHub](https://github.com/wavekat) o vuelva por aquí: escribiremos sobre la ingeniería detrás de la voz en tiempo real, las decisiones de compromiso que tomamos y lo que aprendemos por el camino.

**WaveKat Voice** está hoy en beta pública gratuita — [descárgalo](/es/voice/download/) para tu Mac o Linux.
