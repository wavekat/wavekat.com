---
title: "Retener, alternar y transferir llamadas"
description: "WaveKat Voice pone llamadas en espera, contesta una segunda y transfiere — de forma ciega o atendida — en Mac y Linux. La grabación se pausa en espera."
date: 2026-07-05
author: Eason Guo
tags: [voz-ia, llamadas]
lang: "es"
---

WaveKat Voice — el softphone SIP para Mac y Linux que graba y transcribe cada llamada — ahora puede hacer las tres cosas que una recepción hace todo el día: poner a quien llama en espera, contestar una segunda llamada mientras la primera espera y transferir a quien llama a otra persona — ya sea de inmediato o después de consultarlo primero. Llega con WaveKat Voice [0.0.42](/es/voice/changelog/#0.0.42).

Es el paso más literal hasta ahora hacia [dar a cada pequeño negocio la voz de uno grande](/es/blog/hello-world/). Cuando usted llama a una gran empresa, alguien dice «un momento, le comunico» — y funciona, porque hay una recepcionista con un conmutador. Ahora [WaveKat Voice](/es/voice/), que ya graba y transcribe cada llamada, le da a un negocio de una sola persona los mismos movimientos. Retener, la llamada en espera y la transferencia son los controles que quien atiende un escritorio usa constantemente, y cualquier [softphone](/es/voice/alternatives/) serio debe tenerlos — WaveKat Voice ya los tiene, con un matiz propio: lo que ocurre durante la espera queda fuera de la grabación. Controles como estos viven en lo más profundo de la propia señalización telefónica, lo que es en parte por lo que WaveKat Voice ahora funciona con [su propio motor SIP hecho desde cero](/es/blog/our-own-sip-engine/).

## Poner a quien llama en espera

Poner a quien llama en espera en WaveKat Voice pausa la grabación y la transcripción en vivo durante todo el tiempo que la llamada quede aparcada — nada de lo que se diga cerca de su escritorio durante una espera termina en la grabación ni en la transcripción. Hay un botón de **Retener** en la pantalla de llamada, entre Silenciar y el teclado; al pulsarlo, la llamada se pausa en ambas direcciones, así que usted no oye a quien llama y ellos no lo oyen a usted.

WaveKat Voice le indica al sistema telefónico del otro lado que la llamada está retenida por la vía estándar de SIP, así que la mayoría de los sistemas reproducen su propia música de espera — quien llama oye «está usted en espera», no un silencio muerto. Es más que un silenciado local: el sistema remoto sabe que la llamada está aparcada, no solo en silencio. Pulse **Reanudar** y la conversación, la grabación y la transcripción continúan.

![WaveKat Voice en Ubuntu — una llamada retenida: el aviso de llamada en espera con Reanudar y la transcripción en pausa.](/screenshots/in-call-hold/es.webp)

## Llamada en espera: conteste una segunda llamada durante la primera

Cuando suena una segunda llamada mientras ya está hablando, ya no tiene que elegir entre las dos. Contéstela y la primera pasa a espera por sí sola — exactamente como la llamada en espera de un teléfono móvil. Una barra de cambio en la pantalla de llamada lista cada llamada en curso, y usted se mueve entre ellas con un clic.

Solo una llamada está en vivo en cada momento. La llamada que está mirando es en la que está hablando; todas las demás están retenidas, con su grabación y su transcripción en vivo en pausa hasta que vuelva a ellas. De forma predeterminada, cambiar a una llamada retenida la reanuda de inmediato; si prefiere reanudar cada llamada deliberadamente, hay un interruptor en **Ajustes → General** («Reanudar una llamada al cambiar a ella»), y toda llamada retenida muestra un aviso claro para que una línea en silencio nunca parezca una línea caída.

![WaveKat Voice en Ubuntu — una llamada en curso con dos personas más esperando retenidas en la barra de cambio.](/screenshots/in-call-waiting/es.webp)

## Transferir a quien llama — de inmediato o consultando primero

El botón **Transferir** envía a quien llama a otra persona — otro número, otra extensión, otra dirección SIP. Hay dos maneras de hacerlo, y WaveKat Voice tiene ambas:

| | Transferencia ciega | Transferencia atendida |
|---|---|---|
| **Qué ocurre** | Quien llama es enviado al nuevo número de inmediato | Usted llama primero a la nueva persona, habla con ella y luego conecta a las dos |
| **¿Habla primero con el destinatario?** | No | Sí — quien llama espera retenido mientras usted consulta |
| **Si el destinatario no contesta** | Quien llama sigue con usted; no se pierde nada | Cuelga la llamada de consulta y vuelve con quien llamó |
| **Cuándo usarla** | Sabe que deben atenderla: «le comunico con facturación» | Quiere anunciar a quien llama, o no está seguro de que estén disponibles |

Para una transferencia ciega, pulse Transferir, escriba el destino y listo — en cuanto la nueva persona contesta, su lado de la llamada termina. Para una atendida, elija **Hablar primero**: quien llama pasa a espera, WaveKat Voice marca el destino como una segunda llamada y usted habla en privado («tengo un cliente preguntando por la factura, ¿puede atenderlo?»). Cuando estén listos, pulse **Completar transferencia** y los dos quedan conectados mientras usted se retira. Si la persona está ocupada, rechaza o resulta no ser la indicada, simplemente cuelgue la llamada de consulta y reanude a quien llamó — nunca sabrá que el primer intento no funcionó.

![WaveKat Voice en Ubuntu — una transferencia atendida: quien llama en espera y el botón Completar transferencia para conectarlos.](/screenshots/in-call-transfer/es.webp)

Estos son los movimientos que hace usted a mano, en una llamada que ya contestó. Si prefiere que el teléfono los haga sin usted, un [flujo de llamada](/es/blog/answer-calls-with-a-call-flow/) contesta las llamadas entrantes por su cuenta y puede transferirlas: las mismas piezas, funcionando antes de que usted descuelgue.

Las transferencias también quedan registradas con honestidad en su historial. Una llamada transferida termina como **Transferida**, y la página de detalle muestra exactamente adónde fue — «Transferida a …» — en lugar de fingir que usted colgó.

## Preguntas frecuentes

### ¿Cómo transfiero una llamada en WaveKat Voice?

Pulse Transferir en la pantalla de llamada e introduzca un número, extensión o dirección SIP. Enviarla de inmediato es una transferencia ciega; elegir **Hablar primero** retiene a quien llama y marca el destino para que usted pueda anunciarlo, y **Completar transferencia** conecta a los dos.

### ¿Cuál es la diferencia entre una transferencia ciega y una atendida?

La transferencia ciega envía a quien llama al nuevo destino de inmediato, sin hablar antes con el destinatario. La atendida retiene a quien llama mientras usted llama al destinatario, y solo conecta a los dos cuando usted confirma — así puede echarse atrás si el destinatario está ocupado o declina. WaveKat Voice admite ambas.

### ¿La persona a la que transfiero necesita WaveKat Voice?

No. WaveKat Voice usa el mecanismo estándar de transferencia de SIP (un REFER, RFC 3515), así que el destino solo recibe una llamada telefónica normal — cualquier teléfono, cualquier softphone, cualquier extensión que su proveedor pueda alcanzar.

### ¿Funcionan la retención y la transferencia con cualquier proveedor SIP?

Sí. La retención usa el re-INVITE estándar de SIP (RFC 3264) y la transferencia usa SIP REFER (RFC 3515), así que ambas funcionan con cualquier proveedor o centralita PBX compatible con SIP, usando la cuenta que usted ya tiene — sin configuración específica del proveedor.

### ¿Puedo unir dos llamadas en una llamada de conferencia?

Todavía no. WaveKat Voice puede retener dos o más llamadas a la vez y alternar entre ellas, pero solo una está en vivo en cada momento. La llamada a tres es una función aparte que aún no hemos construido.

### ¿Qué oye quien llama mientras está en espera?

Quien es puesto en espera en WaveKat Voice oye lo que su propio sistema telefónico reproduzca para la espera — normalmente su música de espera, no un silencio ni un tono de WaveKat Voice. WaveKat Voice señaliza la retención por la vía estándar de SIP (un re-INVITE, RFC 3264), lo que deja la experiencia de espera en manos del sistema de quien llama, así que oye lo que esperaría oír.

### ¿Se graba una llamada mientras está en espera?

No. La grabación y la transcripción en vivo se pausan mientras dura la espera, en ambos sentidos, y se reanudan con la llamada. La línea de tiempo de la grabación guardada sigue siendo exacta — el tiempo en espera aparece como silencio, no como un corte.

### ¿Qué plataformas admiten retener, la llamada en espera y la transferencia?

WaveKat Voice funciona hoy en Mac y Linux, y llegará a Windows cuando haya demanda. Retener, la llamada en espera y los dos tipos de transferencia funcionan en ambas plataformas compatibles, con la cuenta SIP que usted ya usa — sin costo adicional y sin configuración.

## Pruébelo

[Descargue WaveKat Voice](/es/voice/download/) — o actualice a [0.0.42](/es/voice/changelog/#0.0.42) — y los controles están en cada pantalla de llamada: Retener junto a Silenciar, Transferir al lado, y una llamada en espera que simplemente ocurre cuando suena la segunda llamada. Nada que configurar, nada extra que pagar.

Ponga a quien llama en espera, atienda la segunda línea y comunique a alguien como si hubiera una recepción — porque ahora la hay.
