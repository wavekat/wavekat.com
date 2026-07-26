---
title: "Flujos de llamada: operadora automática para pymes"
description: "WaveKat Voice contesta las llamadas entrantes con un flujo de llamada: una operadora automática con saludo, menú telefónico y buzón de voz. Míralo en vivo."
date: 2026-07-25
author: Eason Guo
tags: [voz-ia, llamadas]
lang: "es"
---

[WaveKat Voice](/es/voice/) —el softphone SIP para Mac y Linux que graba y transcribe cada llamada— ya puede contestar por ti. Lo que contesta es un **flujo de llamada**: saluda a quien llama, comprueba si estás abierto, ofrece un menú, te llama a ti, toma un mensaje o transfiere la llamada. El flujo se arma en la web, se asigna a una de tus líneas y, desde ese momento, las llamadas que no alcanzas a atender igual reciben respuesta. Llega en la versión [0.0.43](/es/voice/changelog/#0.0.43).

Es el paso más grande hasta ahora hacia aquello a lo que siempre volvemos: [darle a cada negocio pequeño la voz de uno grande](/es/blog/hello-world/). Una empresa grande contesta todas las llamadas: tiene recepción, un menú telefónico que le armó un consultor y un servicio para fuera de horario. Un local de tres personas tiene un teléfono que suena hasta que alguien puede secarse las manos, y quien se cansa y cuelga es una reserva que nunca ocurrió. Los flujos de llamada cierran esa brecha, y funcionan en la computadora que ya está sobre tu escritorio.

## Qué es un flujo de llamada

Un flujo de llamada en WaveKat Voice es una lista corta de pasos que una llamada entrante recorre uno a uno. Es lo mismo que otros sistemas telefónicos venden como **operadora automática**: el saludo y el menú de «pulse 1 para reservas» que contesta cuando tú no puedes. Solo que aquí viene dentro del softphone que ya usas, en lugar de una plataforma aparte que se paga por puesto. Cada paso es una pieza con una sola función:

| Paso | Qué vive quien llama |
|---|---|
| **Saludo** | Escucha tu saludo grabado: «Gracias por llamar». |
| **Horario** | Nada directo: el flujo consulta tu horario semanal y tus feriados, y toma otro camino cuando está cerrado. |
| **Menú** | «Para reservas marque 1; para el horario, 2». La tecla que marca elige el siguiente paso. |
| **Te llama** | Tu teléfono suena como siempre. Si contestas, el flujo se hace a un lado. |
| **Toma un mensaje** | Un aviso, un tono y su mensaje: grabado y transcrito como cualquier otra llamada. |
| **Transfiere la llamada** | Queda comunicado con otro número. |
| **Cuelga** | Escucha una despedida y la llamada termina. |

No hay que dibujar un árbol de menús desde cero ni programar nada. Se empieza desde una plantilla —una galería de flujos ya hechos, con los de tu idioma primero, que copias a tu cuenta— y se cambian las palabras. También hay un flujo en blanco, si prefieres armarlo tú.

![WaveKat Voice en Ubuntu: la página de un flujo de llamada con su mapa: un saludo, una comprobación de horario que se abre en «abierto» y «cerrado», un aviso a ti y el buzón de mensajes.](/screenshots/flow-detail/es.webp)

La aplicación dibuja el flujo como un mapa, así que «qué pasa cuando alguien llama» es una imagen que puedes señalar y no una lista de reglas que debas recordar.

## Se arma en la web y funciona en tu computadora

Los flujos se editan en [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows), con la misma cuenta de WaveKat que usa la aplicación. Elige una plantilla, cópiala a tu biblioteca y edítala: escribe lo que debe oírse en cada paso, define tu horario y decide cuántos segundos suena el teléfono antes de que el flujo tome un mensaje.

![El editor de flujos de llamada de WaveKat en la web: el mapa del flujo junto al detalle del paso, con el texto del saludo, la voz con la que se generó y un botón para volver a generarlo.](/screenshots/flow-editor/es.webp#shadow)

No hace falta grabar nada. Escribe el texto, elige una voz y la plataforma genera el audio con [el mismo generador de mensajes de voz](/es/blog/phone-menu-ivr-voice-generator/) que [también se puede usar gratis por separado](/es/voice/prompts/): calidad de estudio, en el formato que piden las centrales telefónicas. Un clic pone voz a todos los pasos del flujo a la vez, así que una plantilla se convierte en **tu** saludo en un minuto. Al pulsar **Publicar**, esa versión queda congelada: textos, ajustes y clips de audio quedan atados entre sí y no cambian a tus espaldas.

El flujo publicado aparece en la nueva sección **Flujos de llamada** de la aplicación, en todas las computadoras donde tengas la sesión iniciada. Ábrelo, elige qué línea debe contestar y actívalo. La tarjeta de la línea dirá **Contestando**, y con eso termina la configuración: nada de desvíos con tu proveedor ni de portar números a ningún lado.

Los flujos funcionan **en tu computadora**, dentro de la aplicación, con la cuenta SIP que ya tienes. Nada de la llamada se contesta en nuestros servidores: el saludo se reproduce desde tu equipo, el mensaje se graba en tu equipo, y no hay costo por llamada porque nadie está en el medio. El costo real es otro, y lo decimos claro: la aplicación tiene que estar abierta y la computadora despierta para que el flujo conteste, y una línea la contesta una sola computadora.

## Mira al flujo contestar, en vivo

Mientras un flujo contesta, WaveKat Voice te muestra paso a paso lo que está haciendo, en el momento en que ocurre. Porque lo que más nos gusta no es que conteste, sino que puedas verlo hacerlo.

Cuando un flujo contesta, la aplicación no finge que estás en una llamada. La pantalla dice **«Recepción está contestando»** y, debajo, una línea cuenta qué ocurre en ese momento: *Hablando con la persona que llama… Reproduciendo el menú… Llamándote… Tomando un mensaje…*

![WaveKat Voice en Ubuntu: una llamada contestada por un flujo, con «Recepción está contestando», «Tomando un mensaje…» y el nombre de quien llama.](/screenshots/flow-answering/es.webp)

Más abajo se enciende el mismo mapa que armaste, a medida que la llamada avanza: el paso en el que está la persona se resalta, los que ya pasó siguen destacados y el resto queda atenuado. De un vistazo ves dónde está y por dónde vino.

Eso es filtrar llamadas, y no es el buzón de voz al que estás acostumbrado. El buzón del operador contesta sin que nadie mire y te enteras horas después. Aquí el flujo contesta por ti mientras estás sentado ahí mismo, así que vuelve la vieja experiencia del contestador de casa: oyes quién es antes de decidir.

## Toma la llamada mientras dejan el mensaje

Puedes tomar una llamada que contestó el flujo sin que quien llama tenga que empezar de nuevo. Mientras alguien deja un mensaje, la aplicación muestra un botón **Contestar**: al pulsarlo, la llamada pasa a tu micrófono y tus altavoces, igual que si la hubieras atendido tú. Lo que ya se grabó del mensaje se conserva.

![WaveKat Voice en Ubuntu: el mapa en vivo con el paso del buzón resaltado, el botón «Contestar» y el mensaje de quien llama apareciendo como transcripción en vivo.](/screenshots/flow-takeover/es.webp)

Y no tienes que adivinar si vale la pena atender: el mensaje aparece en texto mientras lo están dejando, así que lees quién es y qué necesita antes de decidir.

**Contestar** solo aparece en los momentos en que la entrada de una persona tiene sentido para quien llama: mientras deja un mensaje, no a mitad de tu saludo ni durante un aviso del menú. A nadie le gusta que una voz se superponga a la grabación que todavía le está hablando.

## Qué deja una llamada contestada por un flujo

Una llamada contestada por un flujo queda en tu historial como cualquier otra, con el nombre del flujo al lado —*Contestada por «Recepción»*—, así que de un vistazo distingues cuáles atendiste tú y cuáles el flujo. Al abrir una, el resumen te dice en palabras simples cómo terminó: **La persona que llamó dejó un mensaje**, con un enlace al flujo que la atendió.

![WaveKat Voice en Ubuntu: una llamada terminada que contestó un flujo, con la etiqueta «Contestada por Recepción», el resultado «La persona que llamó dejó un mensaje» y la grabación debajo.](/screenshots/call-details-flow/es.webp)

El mensaje en sí es una grabación con transcripción, en el mismo lugar que todo lo demás, y los pasos del flujo quedan marcados a lo largo de la grabación, así que saltas directo al momento en que la persona empezó a hablar en vez de buscarlo. Se puede buscar y, si alguien más necesita oírlo, [compartir con un enlace](/es/blog/share-a-call-recording/).

## Qué es gratis y qué agrega Pro

La línea que trazamos es simple: **el plan gratuito contesta el teléfono; Pro dirige la llamada.**

| | Gratis | Pro |
|---|---|---|
| Pasos disponibles | Saludo, te llama, toma un mensaje, cuelga | Todo lo anterior, más horario, menú y transferencia |
| Flujos publicados | 1 | 10 |

Así que una cuenta gratuita tiene un contestador completo, con tu saludo, tus palabras, filtrado en vivo y la posibilidad de tomar la llamada: no es una muestra. Pro es para cuando quieres que el flujo decida: tratar distinto lo que entra fuera de horario, mandar a cada persona a donde corresponde con un menú, pasar llamadas a otro número. Durante el acceso anticipado, subir a Pro es gratis —un clic en [la página de tu cuenta de WaveKat](https://platform.wavekat.com/profile), sin pasos de pago— y te da un año. Tu plan y su vencimiento se ven en la aplicación, en Ajustes.

## Preguntas frecuentes

### ¿Qué es un flujo de llamada en WaveKat Voice?

Un flujo de llamada es un conjunto de pasos que contesta automáticamente las llamadas entrantes: un saludo, una comprobación de tu horario, un menú telefónico, un aviso a ti, la toma de un mensaje o una transferencia. Se arma en la web, en platform.wavekat.com, se asigna a una de tus líneas y la aplicación WaveKat Voice de tu computadora lo ejecuta cuando entra una llamada.

### ¿Un flujo de llamada es lo mismo que una operadora automática o un IVR?

Un flujo de llamada es como WaveKat Voice llama a la operadora automática: saluda a quien llama, ofrece un menú de teclas, comprueba tu horario, te llama a ti y toma un mensaje. No es un IVR completo en el sentido empresarial —no consulta a nadie en una base de datos ni resuelve trámites por quien llama— y todavía no mantiene una conversación. Si estabas buscando una «operadora automática para pymes», un flujo de llamada hace ese mismo trabajo, pero en tu propia computadora y no en una plataforma que se paga por puesto al mes.

### ¿Mi computadora tiene que estar encendida para que un flujo conteste?

Sí. Los flujos funcionan dentro de la aplicación, en tu propia computadora, no en un servidor: el equipo tiene que estar despierto y WaveKat Voice abierto. Eso es lo que hace que no haya costo por llamada y que el audio se quede en tu equipo, pero también significa que un portátil dormido no contesta. Una línea la contesta una sola computadora, así que iniciar sesión en un segundo equipo no provoca respuestas duplicadas.

### ¿Puedo tomar una llamada que contestó el flujo?

Sí, mientras la persona esté dejando un mensaje. La aplicación muestra en vivo lo que hace el flujo y, durante el mensaje, aparece el botón **Contestar**; al pulsarlo, la llamada pasa a tu micrófono y tus altavoces, y se conserva lo ya grabado. Durante el saludo o el menú no se ofrece a propósito, para que nadie se superponga a un aviso que todavía se está reproduciendo.

### ¿Tengo que grabar yo el saludo?

No. Escribes lo que debe oírse y eliges una voz, y la plataforma genera audio listo para telefonía con el generador de mensajes de voz de WaveKat: un clic pone voz a todos los pasos del flujo. Si luego cambias el texto, vuelves a generar ese paso; hasta que publiques de nuevo, la versión publicada sigue reproduciendo el audio anterior.

### ¿Qué pasa con el mensaje que deja quien llama?

Se graba y se transcribe en tu computadora como cualquier otra llamada, y aparece en tu historial marcado con el nombre del flujo y con el resultado de la llamada. Desde ahí puedes reproducirlo, leer la transcripción, saltar a un paso del flujo o compartirlo con un enlace privado.

### ¿Es una recepcionista con IA que habla con quien llama?

Todavía no, y preferimos decirlo claro. Los pasos de hoy son los predecibles: saludo, horario, menú, llamada a ti, mensaje, transferencia. Hacen exactamente lo que escribiste, siempre. Un paso de asistente que mantenga una conversación real con quien llama es el próximo hito, y será una pieza más para poner en el mismo flujo.

### ¿Funciona con mi proveedor SIP?

Sí, con la cuenta que ya tienes en WaveKat Voice. Los flujos contestan las llamadas que la aplicación ya recibe, así que si hoy tu línea hace sonar la aplicación, un flujo puede atenderla: sin desvíos del lado del proveedor, sin números extra y sin tarifas por minuto de un servicio de contestación.

### ¿En qué plataformas hay flujos de llamada?

En Mac y Linux, las dos plataformas en las que WaveKat Voice funciona hoy (Windows llegará cuando haya demanda). La edición funciona en cualquier navegador, porque los flujos se arman en la web y se sincronizan con la aplicación.

## Pruébalo

[Descarga WaveKat Voice](/es/voice/download/) —o actualiza a [0.0.43](/es/voice/changelog/#0.0.43)—, inicia sesión y arma tu primer flujo en [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows). Empieza desde una plantilla, cambia las palabras, publica y asígnalo a tu línea.

Después espera la próxima llamada y mira cómo la contestan. Seguirás viendo quién es y seguirás pudiendo tomarla: de eso se trata. Solo que ya no eres lo único que hay entre quien llama y una respuesta.
