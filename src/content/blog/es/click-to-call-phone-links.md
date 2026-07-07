---
title: "Haz clic en un número de una web para llamar"
description: "WaveKat Voice ahora maneja los enlaces tel: y sip: en Mac y Linux — haz clic en un número en cualquier web y la app se abre lista para marcar. Marcado automático opcional, desactivado por defecto."
date: 2026-07-07
author: Eason Guo
tags: [voz-ia, llamadas]
lang: "es"
draft: true
---

WaveKat Voice — el softphone SIP para Mac y Linux que graba y transcribe cada llamada — ahora puede ser la app que tu computadora abre cuando haces clic en un número de teléfono en una web. Haz clic en un enlace `tel:` o `sip:` en cualquier parte — la página de contacto de una empresa, un resultado de búsqueda, la factura de un proveedor — y WaveKat Voice pasa al frente con el número ya escrito, listo para que pulses Llamar. Llega con [0.0.43](/es/voice/changelog/#0.0.43).

Hacer clic para llamar significa que un número de teléfono en una página web es un enlace en el que haces clic para marcar, en vez de algo que copias y vuelves a teclear a mano. Es lo mínimo en el teléfono de escritorio de una empresa, y una de esas funciones que solo notas cuando falta: ves un número en una página, haces clic, el teléfono marca. WaveKat Voice — el [softphone SIP](/es/voice/) que graba y transcribe cada llamada y [funciona con su propio motor SIP](/es/blog/our-own-sip-engine/) — ahora también marca los números que le haces clic.

## Qué hace

Activa **Enlaces de teléfono** y cualquier número de teléfono que sea un enlace en el que se pueda hacer clic se convierte en una vía de entrada a WaveKat Voice. Haz clic en `tel:+14155550123` en tu navegador y la app toma el foco y abre la hoja de Llamada nueva con `+14155550123` ya en el campo Para. Lo miras y pulsas Llamar. Funcionan tanto los enlaces `tel:` (números de teléfono corrientes) como los enlaces `sip:` (direcciones SIP como `sip:alice@example.com`) — la dirección SIP pasa directa a tu cuenta.

![WaveKat Voice en Ubuntu — la hoja de Llamada nueva abierta con un número de teléfono ya escrito, lista para marcar.](/screenshots/dial-prefilled/es.webp)

El valor por defecto es a propósito el seguro: el número queda escrito, pero **tú** haces la llamada. Una web puede *pedir* iniciar una llamada; no puede marcar de verdad sin que una persona pulse Llamar. Eso importa, porque un enlace en una página es algo que cualquiera puede poner ahí.

## Cómo activarlo

Los enlaces de teléfono están **desactivados hasta que los activas**, porque quedarse con los enlaces de número de teléfono de toda tu computadora es la clase de cosa que debería ser tu decisión, no una sorpresa de una app que acabas de instalar. Activa **Enlaces de teléfono** en **Ajustes → General** — en el mismo lugar que «Abrir al iniciar sesión» — y WaveKat Voice se registra ante tu sistema operativo como gestor de los enlaces de teléfono. Cómo se ve eso depende del sistema operativo, y el ajuste es honesto al respecto:

| Plataforma | Qué ocurre al activarlo |
|---|---|
| **macOS** | WaveKat Voice se vuelve el gestor de inmediato, y le quita los enlaces `tel:` a FaceTime. |
| **Linux** | Funciona en cuanto lo activas. |

![WaveKat Voice en Ubuntu — Ajustes → General con el interruptor de Enlaces de teléfono activado.](/screenshots/settings-general-phone-links/es.webp)

¿Nuevo en WaveKat Voice? Te ofreceremos los enlaces de teléfono en el momento más amable posible — justo después de tu primera llamada de prueba exitosa, en la tarjeta de «todo listo». Es una oferta única, nunca una insistencia: acéptala o descártala y no volverá a preguntar. Los usuarios de siempre que abren el teclado para teclear un número a mano — justo la gente para quien es el clic para llamar — reciben la misma oferta discreta al pie de la hoja de marcación. Como sea que digas que sí, por debajo es el mismo único interruptor.

## Opcional: marca en cuanto haces clic

Si escribir primero y confirmar es un paso más de lo que quieres, hay una opción para eso. Activa **«Llamar de inmediato al hacer clic»** (también en Ajustes → General, y solo disponible una vez que Enlaces de teléfono está activado) y un clic hace la llamada de inmediato en vez de esperar a que pulses Llamar. Está **desactivado por defecto**, y aun estando activado, WaveKat Voice se contiene en los casos en que una llamada instantánea sería la llamada equivocada:

- **Solo cuando hay exactamente una línea desde la que llamar.** Si tienes varias cuentas que podrían hacer la llamada, WaveKat Voice escribe el número y te deja elegir la línea en vez de adivinar.
- **Nunca encima de una llamada en la que ya estás.** Si estás a mitad de una conversación, el clic escribe el número en vez de irrumpir.
- **La ventana siempre pasa al frente.** Incluso en una marcación instantánea, ves la llamada ocurrir y puedes colgar — una página no puede hacer una llamada en silencio en segundo plano.

## Preguntas frecuentes

### ¿Cómo hago que un número de teléfono en una web se abra en WaveKat Voice?

Activa **Enlaces de teléfono** en Ajustes → General. Después de eso, hacer clic en cualquier enlace `tel:` o `sip:` — la clase de número de teléfono en el que se puede hacer clic que encuentras en las páginas de contacto — abre WaveKat Voice con el número escrito, listo para marcar.

### ¿Hacer clic en un enlace de teléfono hace la llamada automáticamente?

No, salvo que se lo pidas. Por defecto WaveKat Voice escribe el número y espera a que pulses Llamar, así que una web nunca puede hacer una llamada por su cuenta. Hay un ajuste opcional, «Llamar de inmediato al hacer clic», desactivado por defecto, por si prefieres saltarte el paso de confirmación.

### ¿Qué plataformas admiten el clic para llamar?

Mac y Linux, las dos plataformas en las que WaveKat Voice funciona hoy (Windows llegará cuando haya demanda). Activa Enlaces de teléfono en Ajustes → General y funciona en ambas.

### ¿Funciona también con enlaces sip:, o solo con números tel:?

Con ambos. Un enlace `tel:` se normaliza a un número marcable; un enlace `sip:` (como `sip:alice@example.com`) pasa directo a tu cuenta SIP. WaveKat Voice se registra como gestor tanto de `tel:` como de `sip:`.

### ¿Es seguro dejar que las webs abran mi softphone?

Sí, porque un enlace solo puede *solicitar* una llamada, no hacerla. El valor por defecto seguro escribe el número y espera a que pulses Llamar. WaveKat Voice solo acepta enlaces `tel:`/`sip:`, limpia el número antes de hacer nada con él y — incluso con el marcado instantáneo activado — nunca llama desde una cuenta sorpresa, nunca interrumpe una llamada en curso y siempre te muestra la ventana para que puedas colgar.

### ¿Puedo volver a desactivarlo?

Sí. Desactiva **Enlaces de teléfono** en Ajustes → General y WaveKat Voice deja de abrirse para los enlaces de teléfono. El ajuste controla el comportamiento en sí, así que aunque tu sistema aún recuerde la asociación, los enlaces en los que hagas clic se ignoran mientras el interruptor esté apagado.

## Pruébalo

[Descarga WaveKat Voice](/es/voice/download/) — o actualiza a [0.0.43](/es/voice/changelog/#0.0.43) — y luego activa **Enlaces de teléfono** en Ajustes → General. Haz clic en un número de cualquier página web y ya estará en el campo de marcación, esperándote.

El número está en la pantalla; le hiciste clic; ahora simplemente llama. De eso se trata todo.
</content>
</invoke>
