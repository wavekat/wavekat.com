---
title: "Comparte la grabación de una llamada con un enlace"
description: "WaveKat Voice ahora convierte cualquier llamada grabada en un enlace para compartir —privado, solo por invitación o público— con control sobre exactamente qué puede escuchar y leer el destinatario."
date: 2026-06-28
author: Eason Guo
tags: [voz-ia, grabaciones, privacidad]
lang: "es"
---

WaveKat Voice ahora convierte cualquier llamada grabada en un enlace que puedes enviar. Abre una llamada, elige quién puede escucharla —solo tú, unas pocas personas que invites, o cualquiera que tenga el enlace— y copia una URL. Quien la abra verá una página limpia con el reproductor de audio sobre una transcripción etiquetada por interlocutor. Las grabaciones empiezan como **Privada**, compartir se activa llamada por llamada, y puedes dejar de compartir en cualquier momento. Llegó en WaveKat Voice [0.0.41](/es/voice/changelog/#0041) y ya está disponible hoy en Mac y Linux.

Esto continúa el hilo del que no dejamos de tirar: [darle a cada pequeña empresa la voz de una grande](/es/blog/hello-world/). Una gran empresa puede recuperar una llamada y reenviarla a un colega, un cliente o un proveedor en segundos. Ahora tú también puedes hacerlo —desde la misma aplicación que [graba y transcribe cada llamada](/es/voice/) y [permite que tu asistente de IA las realice](/es/blog/place-calls-from-the-command-line/).

## Qué hace

Cada llamada en WaveKat Voice ya se graba y se transcribe en tu computadora. Compartir es la capa que permite que *otra persona* escuche una de ellas. Eliges una grabación, eliges un nivel de acceso y WaveKat Voice te da un enlace. La persona a quien se lo envías abre una página web —sin ninguna aplicación que instalar, nada que descargar— y escucha.

Hay tres niveles de acceso, y **Privada es siempre la opción predeterminada**:

| Nivel de acceso | Quién puede abrirla | ¿Hay que iniciar sesión? |
|---|---|---|
| **Privada** | Solo tú | — (es tu propia vista) |
| **Personas específicas** | Solo las personas que invites, por correo electrónico | Sí — inician sesión para confirmar su identidad |
| **Cualquiera con el enlace** | Cualquiera que tenga el enlace | No |

"Personas específicas" es para los casos en que la grabación es sensible —la llamada de un cliente, cualquier cosa con datos personales— y quieres dejarla restringida a personas concretas. "Cualquiera con el enlace" es para los casos en que simplemente quieres que esté abierta: un testimonio, una demostración, una llamada que no te importa que sea pública. Volver a poner una grabación como Privada en cualquier momento desactiva todos los enlaces que apuntan a ella.

![WaveKat Voice en Mac — el panel para compartir de una llamada grabada: los tres niveles de acceso, un campo de invitación y los controles de lo que pueden ver los destinatarios.](/screenshots/share-sheet/es.webp)

## Tú decides exactamente qué ven

Compartir una grabación no es todo o nada. Antes de enviar el enlace, eliges qué hay en la página que abre el destinatario:

- **Identidad de la persona** — muestra el número del otro interlocutor, enmascáralo u ocúltalo por completo.
- **Transcripción** — incluye la transcripción escrita o déjala fuera.
- **Audio** — deja que lo reproduzcan en el navegador, o que lo reproduzcan *y* descarguen, u oculta el audio y comparte solo la transcripción.
- **Qué lado suena primero** — empieza por ambos lados de la llamada, solo por tu lado o solo por el del otro interlocutor. (La grabación en sí nunca cambia — quien la escuche puede reactivar cualquiera de los dos lados.)

Estos controles existen porque la grabación de una llamada está cargada de información de otras personas. La idea es compartir la parte que respalda tu punto —una cita, un compromiso, un lado de la conversación— sin entregar más de lo que pretendes.

## Hacerla pública es un paso deliberado

Hacer pública una grabación es el único camino con una barrera de protección delante. Antes de que un enlace pase a estar abierto a cualquiera, WaveKat Voice se detiene y dice, en palabras claras, lo que eso significa:

> Cualquier persona con el enlace podrá escuchar esta llamada y leer su transcripción, sin iniciar sesión. Las llamadas suelen contener datos personales como números de teléfono, direcciones o información de pago. Una vez que un enlace es público, no puedes controlar con quién se comparte. Puedes volver a hacerla privada en cualquier momento.

Algunas cosas hacen que esto sea honesto y no una simple casilla:

- **Privada es la opción predeterminada que se mantiene.** El panel para compartir se abre siempre en Privada. Pública nunca está preseleccionada y nunca está a un clic menos de distancia que las opciones más seguras.
- **Todo enlace es revocable.** Vuelve a poner una grabación como Privada y los enlaces pendientes dejan de funcionar de inmediato.

## Qué ve tu destinatario

El enlace abre una página construida en torno a la llamada, no en torno a WaveKat. Arriba hay un reproductor de audio de dos canales —tu lado y el del otro interlocutor como formas de onda separadas— con la transcripción completa debajo, etiquetada por interlocutor (**Tú** y **El otro lado**) y con búsqueda. Como la transcripción está justo ahí, la página funciona también como alternativa en texto al audio, de modo que un destinatario que no pueda reproducir sonido igualmente puede leer la llamada.

Si compartiste con "Personas específicas", la página les pide iniciar sesión primero y solo se abre para las cuentas que invitaste. Si la hiciste pública, se abre directamente en el reproductor.

![Una grabación compartida de WaveKat Voice abierta en el navegador — el reproductor de audio y la transcripción etiquetada por interlocutor que ve un destinatario.](/screenshots/share-viewer/es.webp)

## Compartir vive en la nube — a propósito

Un enlace para compartir es algo que abre otra persona, posiblemente con tu portátil cerrado. WaveKat Voice se ejecuta en tu propia máquina y no es accesible desde internet, así que una grabación compartida tiene que vivir en algún lugar al que el destinatario realmente pueda llegar. Eso significa que compartir requiere tres cosas, y el panel para compartir te dice cuál falta:

1. Has **iniciado sesión** en tu cuenta de WaveKat.
2. La **sincronización en la nube está activada**, de modo que la grabación se ha guardado en tu cuenta.
3. Esa grabación **ha terminado de subirse**.

Hasta que las tres se cumplan, el control para compartir explica exactamente qué hacer en lugar de quedarse atenuado. Si nunca inicias sesión, nada sale de tu computadora —y nada se puede compartir, que es la misma regla enunciada desde el otro lado. Compartir es la única función que, por diseño, no puede ser solo local.

Puedes iniciar el uso compartido desde la aplicación de escritorio o desde tus grabaciones en la web —de cualquiera de las dos formas es la misma grabación y el mismo enlace.

## También desde la línea de comandos

Como el resto de WaveKat Voice, compartir se puede automatizar con scripts. Con la [automatización activada](/es/blog/place-calls-from-the-command-line/), la herramienta de línea de comandos puede compartir y dejar de compartir grabaciones:

```bash
# Compartir una grabación con personas específicas
wavekat-voice recording share <call-id> --visibility restricted --invite name@example.com

# Dejar de compartir — vuelve a poner la grabación como Privada
wavekat-voice recording unshare <call-id>
```

Hacer **pública** una grabación desde un script (o un asistente de IA) requiere una confirmación explícita —`--yes` en la línea de comandos, una marca `confirm_public` a través de las herramientas del asistente— para que nada se haga público por una instrucción vaga.

## Preguntas frecuentes

### ¿Cómo comparto la grabación de una llamada desde WaveKat Voice?

Abre la llamada en WaveKat Voice, elige un nivel de acceso en el panel para compartir —Privada, Personas específicas o Cualquiera con el enlace— y copia el enlace. El destinatario lo abre en un navegador para escuchar y leer la transcripción; no hay ninguna aplicación que instalar. Las grabaciones son Privadas hasta que las compartes.

### ¿Puedo controlar qué puede escuchar o leer el destinatario?

Sí. Antes de compartir, eliges si mostrar, enmascarar u ocultar el número del otro interlocutor, si incluir la transcripción, si el audio se puede reproducir o también descargar (o se oculta por completo), y qué lado de la llamada suena primero. La grabación en sí nunca se altera.

### ¿Una grabación compartida es pública para todo internet?

Solo si eliges "Cualquiera con el enlace", y WaveKat Voice te avisa antes de que eso ocurra. Puedes volver a poner una grabación como Privada en cualquier momento, lo que desactiva los enlaces existentes. El valor predeterminado de toda grabación es Privada.

### ¿Necesito una cuenta para compartir grabaciones?

Sí. Compartir requiere haber iniciado sesión en tu cuenta de WaveKat con la sincronización en la nube activada, porque el enlace tiene que ser accesible cuando tu computadora está en reposo. Si no inicias sesión, tus grabaciones permanecen por completo en tu computadora y no se pueden compartir.

### ¿Puede alguien abrir un enlace compartido sin iniciar sesión?

Depende del nivel de acceso. "Cualquiera con el enlace" se abre sin iniciar sesión. "Personas específicas" requiere que el destinatario inicie sesión con una de las cuentas que invitaste. "Privada" significa que solo tú puedes abrirla.

### ¿Qué plataformas admiten compartir grabaciones?

WaveKat Voice se ejecuta hoy en Mac y Linux, con Windows en camino cuando haya demanda. Compartir funciona en ambas plataformas admitidas, y los destinatarios abren los enlaces compartidos en cualquier navegador web.

## Pruébalo

[Descarga WaveKat Voice](/es/voice/download/), inicia sesión y activa la sincronización en la nube, luego abre cualquier llamada grabada y pulsa Compartir. Empieza en Privada, comparte con un par de personas y hazla pública solo cuando de verdad lo quieras.

Grabación, transcripción y ahora compartir —la llamada es la unidad de trabajo, y WaveKat Voice la está haciendo tan fácil de pasar de mano en mano como un documento.
