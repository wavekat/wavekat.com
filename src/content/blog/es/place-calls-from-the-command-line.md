---
title: "Deje que su asistente de IA realice llamadas telefónicas reales"
description: "WaveKat Voice ahora incluye una herramienta de línea de comandos y un servidor MCP, para que un asistente de IA como Claude pueda realizar y gestionar llamadas telefónicas reales en su computadora, con configuración en un solo clic."
date: 2026-06-16
author: Eason Guo
tags: [voz-ia, automatización, agentes-ia]
lang: "es"
---

WaveKat Voice ahora incluye una herramienta de línea de comandos, para que un programa de su confianza —incluido un asistente de IA como Claude— pueda realizar y gestionar llamadas telefónicas reales por usted. Pídale a su asistente que "llame al dentista y espere hasta que alguien conteste", y marcará a través de la aplicación que ya tiene abierta, seguirá la llamada y le dirá cómo fue. Hoy está integrado en la aplicación en Mac y Linux, y permanece desactivado hasta que usted lo active.

Este es el siguiente paso hacia aquello a lo que siempre volvemos: [darle a cada pequeña empresa la voz de una grande](/blog/hello-world). Una gran empresa tiene una centralita y el software que la maneja. Ahora su computadora —y el asistente que se ejecuta en ella— puede ser esa centralita.

## Qué hace realmente

WaveKat Voice siempre ha tenido un teléfono funcionando discretamente en segundo plano: se registra con su proveedor SIP y gestiona las llamadas. Lo nuevo es una segunda forma de manejarlo: un comando llamado `wavekat-voice` que se comunica con la aplicación en ejecución.

Para ser precisos sobre el límite, porque importa:

- **Realiza y gestiona llamadas.** Marcar un número, esperar el resultado, listar lo que está sonando en este momento, contestar o rechazar una llamada entrante, enviar tonos de marcación para navegar por un menú telefónico, colgar y obtener la transcripción.
- **Usted sigue siendo quien habla.** El audio fluye a través del micrófono y los altavoces de su computadora, exactamente igual que cuando hace clic en "llamar" en la aplicación. El asistente establece y dirige la llamada; la persona que habla en ella es usted. (Un asistente que hable él mismo en la llamada es un proyecto aparte y posterior.)

Así que el asistente es la mano sobre el teclado de marcación, no una voz en la línea. Es una línea deliberada y honesta, y para las tareas cotidianas de "comunícame con una persona", cubre la mayor parte de lo que en realidad usted quiere.

![WaveKat Voice en Ubuntu: una llamada iniciada por el asistente, en curso, con la transcripción en directo al lado.](/screenshots/in-call/es.webp)

## No hay nada que instalar

El comando `wavekat-voice` es el mismo programa que ejecuta la aplicación: ya está en su disco en el momento en que instala WaveKat Voice. No hay una segunda descarga, ni un paquete por separado, ni una versión que pueda desincronizarse de la aplicación.

Está **desactivado de forma predeterminada**. Mientras la automatización está activada, cualquier programa que ejecute en su computadora puede realizar llamadas a través de su cuenta —y las llamadas pueden costar dinero—, así que dejamos esa decisión en sus manos. Actívela en **Ajustes → Automatización** (Settings → Automation), donde también hay un botón de un solo clic para añadir `wavekat-voice` a su PATH, de modo que cualquier terminal pueda encontrarlo.

![WaveKat Voice en Ubuntu: los ajustes de Automatización con el acceso por línea de comandos activado y el botón para instalar la herramienta de línea de comandos.](/screenshots/settings-automation/es.webp)

## Conecte un asistente de IA en un solo clic

La vía más rápida es la propia página **Ajustes → Automatización**. Busca los asistentes de IA que ya tiene instalados y ofrece un botón **Conectar** (Connect) para cada uno. Hoy esto abarca:

| Asistente | Cómo se conecta |
|---|---|
| Claude Desktop, Cursor, Windsurf | Mediante un servidor MCP incluido en la aplicación |
| Claude Code, Codex, Gemini | Mediante una nota gestionada en su archivo de instrucciones |

Un clic lo deja todo conectado, sin nada que copiar ni pegar. Después de eso, solo tiene que pedirle al asistente que haga una llamada. Dos cosas que conviene saber: algunos asistentes necesitan un reinicio completo (cerrar y volver a abrir) para detectar las nuevas herramientas, y la conexión se mantiene al día por sí sola: cuando WaveKat Voice se actualiza en segundo plano, cualquier asistente que haya conectado se mantiene sincronizado de forma silenciosa, así que nunca tiene que volver a conectarlo.

![WaveKat Voice en Ubuntu: conectar asistentes de IA como Claude y Cursor, cada uno con un botón de Conectar de un clic.](/screenshots/settings-automation-agents/es.webp)

## Cómo se ve desde una terminal

Cada comando admite `--json` para obtener una salida legible por máquina, que es lo que hace cómodo que un asistente lo maneje. Algunos ejemplos:

```bash
# Is the app running, and which accounts are connected?
wavekat-voice status

# Place a call and wait — the exit code says how it went.
wavekat-voice call +14155550123 --wait
echo "result: $?"

# Find a call that's happening right now, then hang it up.
wavekat-voice call list --json | jq -r '.[0].id' | xargs wavekat-voice call hangup
```

El código de salida de `--wait` es el contrato sobre el que un script (o un asistente) toma decisiones: `0` contestada y luego finalizada normalmente, `2` ocupado o rechazada, `3` fallida o cortada, `4` sin respuesta. No hace falta analizar ninguna salida para saber qué ocurrió.

Los comandos se agrupan según aquello sobre lo que actúan: `call` para realizar y gestionar llamadas, `recording` para el audio guardado, `log` para el registro de actividad, con `status`, `accounts` y un flujo `events` en vivo en el nivel superior. Ejecute `wavekat-voice call --help` para ver el conjunto completo.

## Por qué lo construimos así

Algunas decisiones con las que estamos satisfechos:

- **Un solo binario, sin nueva superficie.** La herramienta de línea de comandos es el propio daemon de la aplicación con otro sombrero, así que hereda gratis la firma de la aplicación, sus actualizaciones automáticas y su revisión de seguridad, y nunca puede ser una versión obsoleta.
- **El binario es la fuente de la verdad.** El texto de ayuda lleva los códigos de salida y los ejemplos; las integraciones del asistente apuntan a `wavekat-voice --help` en lugar de congelar una lista de comandos que se quedaría desactualizada. Actualice la aplicación y las herramientas se actualizan con ella.
- **Desactivado de forma predeterminada, opcional y revocable.** Realizar una llamada telefónica de pago es algo de peso, así que la automatización permanece desactivada hasta que usted la solicite, y **Quitar** (Remove) vuelve a desvincular cualquier asistente sin tocar el resto de sus ajustes.

## Preguntas frecuentes

### ¿Puede un asistente de IA realizar llamadas telefónicas con WaveKat Voice?

Sí. Con la automatización habilitada en WaveKat Voice (Ajustes → Automatización), un asistente de IA como Claude puede realizar, seguir y finalizar llamadas telefónicas reales a través de la herramienta de línea de comandos de la aplicación o de su servidor MCP. El asistente maneja la llamada; usted habla en ella.

### ¿La IA habla en la llamada en lugar de mí?

No. WaveKat Voice enruta el audio de la llamada a través del micrófono y los altavoces de su computadora: usted es quien habla. El asistente se encarga de marcar, esperar a que contesten, enviar tonos de menú y colgar.

### ¿Necesito instalar algo más para usar la línea de comandos?

No. El comando `wavekat-voice` viene dentro de la aplicación WaveKat Voice, así que ya está en su computadora. Solo necesita activar la automatización en Ajustes → Automatización y, opcionalmente, hacer clic en "Instalar herramienta de línea de comandos (Install command-line tool)" para añadirlo a su PATH.

### ¿Es seguro dejar la automatización activada?

Déjela desactivada salvo que la esté usando. Mientras la automatización está activada, cualquier programa que ejecute en su computadora puede realizar llamadas a través de su cuenta, lo que puede costar dinero. Por esa razón está desactivada de forma predeterminada, y puede volver a apagarla en cualquier momento.

### ¿Qué asistentes se pueden conectar en un solo clic?

Hoy, Claude Desktop, Claude Code, Cursor, Codex, Gemini y Windsurf: mediante un servidor MCP incluido para los asistentes de escritorio y una nota de instrucciones gestionada para los de línea de comandos.

### ¿Qué plataformas admiten esto?

WaveKat Voice funciona hoy en Mac y Linux, y Windows llegará cuando haya demanda. La herramienta de línea de comandos y las integraciones de asistentes están disponibles en ambas plataformas admitidas.

## Pruébelo

[Descargue WaveKat Voice](/voice/download/), abra **Ajustes → Automatización** y conecte su asistente. La referencia completa de comandos —cada comando, su salida JSON y los códigos de salida— se encuentra en la [documentación de automatización](/voice/automation/).

Esto no ha hecho más que empezar. Manejar las llamadas es la base; un asistente que también pueda sostener la conversación es hacia donde esto se dirige a continuación.
