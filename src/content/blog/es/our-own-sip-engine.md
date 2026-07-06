---
title: "Por qué WaveKat Voice funciona con su propio motor SIP"
description: "WaveKat Voice ahora funciona con wavekat-sip, nuestro motor SIP/RTP de código abierto hecho desde cero — sin protocolo SIP de terceros ni cajas negras entre usted y sus llamadas."
date: 2026-07-06
author: Eason Guo
tags: [voz-ia, ingeniería, código-abierto, SIP]
lang: "es"
---

WaveKat Voice — el softphone para Mac y Linux que [graba y transcribe cada llamada](/es/voice/) — ahora funciona con un motor SIP que escribimos desde cero. [`wavekat-sip`](https://github.com/wavekat/wavekat-sip) es una crate de Rust de código abierto que se encarga por sí misma de la señalización telefónica y del transporte de audio, sin ningún protocolo SIP de terceros por debajo. Cada llamada que hace o contesta, cada retención y cada transferencia, ahora pasa por código que controlamos de principio a fin.

Es otro paso hacia aquello a lo que siempre volvemos: [dar a cada pequeño negocio la voz de uno grande](/es/blog/hello-world/). Un gran sistema telefónico es fiable porque quienes lo operan controlan cada una de sus capas. Ser dueños del motor SIP es controlar la capa por la que su llamada realmente viaja — así, cuando algo necesita ser más fiable, o hay que lanzar una función, no hay ninguna caja negra en el medio.

## Qué es SIP, y por qué es la parte difícil

SIP (Protocolo de Inicio de Sesión) es el idioma que hablan los teléfonos para establecer una llamada — para registrar su línea con su proveedor, hacer sonar al otro lado, negociar qué códec de audio usar y colgar la llamada limpiamente al final. RTP es lo que transporta el audio real una vez que la llamada está en curso. Si SIP se hace sutilmente mal, las llamadas se caen, aparece audio unidireccional o una línea deja de recibir llamadas en silencio. Es el núcleo poco glamuroso y exigente sobre el que se apoya todo lo demás de un softphone.

Hasta hace poco, WaveKat Voice conducía sus llamadas a través de una biblioteca SIP de terceros. Eso nos puso al teléfono rápidamente, lo cual fue la decisión correcta al principio. Pero un protocolo prestado decide por usted cómo se modela una llamada, cómo se manifiestan los errores y qué funciones son siquiera alcanzables — y en cuanto empezamos a construir cosas como la transferencia de llamadas y el audio HD, estábamos trabajando en contra de su forma en vez de con ella.

## Por qué construimos el nuestro

Reescribimos el motor SIP de WaveKat Voice desde cero, como `wavekat-sip`, por tres razones sencillas:

- **Control.** Funciones como poner a quien llama en espera, [transferir una llamada](/es/blog/hold-switch-and-transfer-calls/) y mantener viva una llamada larga con temporizadores de sesión viven todas en la capa SIP. Ser dueños de esa capa significa que las añadimos directamente, en vez de doblegar el modelo de otro para que encaje.
- **Huella.** WaveKat Voice es una aplicación de escritorio ligera pensada para quedarse tranquila y fuera de su camino. Un motor enfocado y hecho a propósito lo mantiene pequeño — lleva solo el SIP y el RTP que realmente usa, no todo lo demás que trae un protocolo de propósito general.
- **Sin caja negra.** Cuando una llamada se porta mal, podemos leer y arreglar cada línea entre el botón que pulsó y el paquete que va por el cable. Nada sobre cómo funcionan sus llamadas queda vedado para nosotros.

## De qué se encarga el motor

`wavekat-sip` es dueño de los asuntos a nivel de cable y se mantiene al margen de las capas de dispositivo de audio y de orquestación de llamadas, por lo que sigue siendo pequeño e integrable:

| Área | Qué hace |
|------|---------|
| **Registro** | Registra su línea con su proveedor (autenticación digest) y la mantiene viva para que las llamadas entrantes siempre le lleguen. |
| **Llamadas** | Realiza llamadas salientes y contesta las entrantes, y avisa a quien llama con una señal de timbre adecuada antes de que usted conteste. |
| **Control en llamada** | Retener y reanudar (SIP re-INVITE, RFC 3264), transferencia ciega y atendida (SIP REFER, RFC 3515) y DTMF (tonos del teclado) para menús telefónicos. |
| **Calidad de audio** | Negocia el [códec Opus](/es/voice/) para voz «HD» de banda ancha, con retorno automático al G.711 estándar cuando el otro lado no lo admite. |
| **Fiabilidad** | Los temporizadores de sesión de RFC 4028 evitan que las llamadas largas sean cortadas en silencio por la red a mitad de camino. |

## Es de código abierto — como el resto de WaveKat

`wavekat-sip` no es un componente interno privado. Está publicado en [crates.io](https://crates.io/crates/wavekat-sip) bajo la licencia Apache-2.0, con documentación en [docs.rs](https://docs.rs/wavekat-sip), igual que nuestras crates de [detección de actividad de voz](https://github.com/wavekat/wavekat-vad) y [detección de turno](https://github.com/wavekat/wavekat-turn). Cualquiera que construya un softphone, un bot de voz o un puente de grabación de llamadas en Rust puede usar el mismo motor con el que funciona WaveKat Voice. Construir en abierto es como trabajamos — las herramientas bajo nuestro producto están ahí para que las inspeccione y las reutilice, no como un foso.

Es honesto decir que es temprano: la crate está en desarrollo activo y su API todavía cambia entre versiones. Pero es el motor real detrás de un producto real, no una demo.

## Preguntas frecuentes

### ¿Qué es wavekat-sip?

`wavekat-sip` es la propia crate de Rust de código abierto de WaveKat para la señalización SIP y el transporte de audio RTP. Es el motor detrás de cada llamada que WaveKat Voice realiza o contesta, sin ningún protocolo SIP de terceros por debajo.

### ¿Es wavekat-sip de código abierto, y puedo usarlo en mi propio proyecto?

Sí. `wavekat-sip` está publicado en [crates.io](https://crates.io/crates/wavekat-sip) bajo la licencia Apache-2.0, con documentación en [docs.rs](https://docs.rs/wavekat-sip). Cualquiera que construya un softphone, un bot de voz o un puente de grabación de llamadas en Rust puede usar el mismo motor con el que funciona WaveKat Voice.

### ¿WaveKat Voice admite audio HD?

Sí. WaveKat Voice negocia el códec Opus para voz «HD» de banda ancha, y recurre automáticamente al G.711 estándar cuando el otro lado de la llamada no admite Opus.

### ¿Funciona WaveKat Voice con cualquier proveedor SIP?

Sí. `wavekat-sip` maneja el registro SIP estándar con autenticación digest, así que funciona con cualquier proveedor o centralita PBX compatible con SIP — la cuenta que usted ya tiene, sin configuración específica del proveedor.

### ¿Está wavekat-sip listo para producción?

Es el motor real detrás de un producto real, así que ya está en uso diario — pero es temprano. La crate está en desarrollo activo y su API todavía cambia entre versiones, así que fije una versión si construye sobre ella hoy.

## Qué significa esto para sus llamadas

En su mayoría, las llamadas de WaveKat Voice no se sentirán diferentes — y ese es el objetivo. Se conectan y suenan como deben. Lo que cambia está entre bastidores: las funciones que hacen que WaveKat Voice se sienta como una recepción de verdad — retención, llamada en espera, transferencia, audio HD — ahora se lanzan en nuestros tiempos en vez de los de una dependencia, y cuando algo necesita ser más estable, podemos ir directo al código que lo ejecuta.

WaveKat Voice es [gratis durante la beta pública](/es/voice/download/) en Mac y Linux. Conecte el proveedor telefónico que ya tiene, y su próxima llamada funcionará con un motor que construimos nosotros mismos — y regalamos.
