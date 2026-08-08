---
title: "Registrar llamadas en HubSpot solo"
description: "WaveKat Voice registra cada llamada en HubSpot automáticamente: en el contacto que coincide, con la transcripción y la grabación lista para oírse allí."
date: 2026-08-08
author: Eason Guo
tags: [voz-ia, integraciones, HubSpot]
lang: "es"
---

Ya puedes registrar llamadas en HubSpot automáticamente con WaveKat Voice. Conecta tu cuenta de HubSpot una vez y, a partir de ahí, cada llamada que recibas o hagas se archiva sola en tu CRM: en el contacto correcto, con la hora, la dirección, el resultado, la duración, la transcripción y una grabación que puedes escuchar sin salir de HubSpot. Sin claves de API, sin intermediarios, sin extensiones del navegador y sin nada que recordar al colgar. Está disponible hoy en [tu cuenta de WaveKat](https://platform.wavekat.com/integrations) como función Pro, y durante el acceso anticipado Pro es gratis.

Es otra pieza de [darle a cada pequeño negocio la voz de uno grande](/es/blog/hello-world/). El CRM de una empresa grande sabe de cada llamada porque alguien cobra por que así sea. El tuyo también puede saberlo, porque la aplicación de teléfono que ya usas —la que [graba y transcribe cada conversación](/es/voice/)— lo anota en silencio allí donde viven las fichas de tus clientes.

## Qué llega a HubSpot después de cada llamada

Cuando termina la llamada, WaveKat busca a la otra persona en tus contactos de HubSpot por número de teléfono y registra una ficha de llamada en su cronología:

| En HubSpot | Qué dice |
|---|---|
| Contacto | Encontrado por el número; se crea si no coincide nadie |
| Hora y dirección | Cuándo fue la llamada, entrante o saliente |
| Resultado y duración | Contestada, perdida o fallida, y cuánto duró |
| Título | Un resumen de una línea, p. ej. «Entrante · contestada · fuera de horario» |
| Transcripción | La conversación completa, salvo que desactives su sincronización |
| Grabación | Reproducible en el propio reproductor de HubSpot si hubo grabación |
| Enlace | De vuelta a la llamada en WaveKat, con la onda y cada paso del flujo |

La ficha parece una llamada anotada a mano por un compañero meticuloso, salvo que abarca todas las llamadas, es literal y ocurrió mientras te hacías un café. Si alguien llama dos veces, o una sincronización se reintenta, la misma llamada nunca se archiva dos veces: WaveKat recuerda qué ficha de HubSpot pertenece a qué llamada y la actualiza en lugar de crear una gemela.

## Escuchar la grabación dentro de HubSpot

La grabación no se copia a HubSpot; pasa algo mejor. La ficha lleva lo que HubSpot necesita para pedirle el audio a WaveKat *en el momento en que alguien pulsa reproducir*, y WaveKat responde justo entonces. En la práctica eso significa:

- **La reproducción se queda en la cronología del contacto.** Quien esté repasando la oportunidad en HubSpot pulsa reproducir y oye la llamada: sin cambiar de aplicación, sin ficheros reenviados.
- **Borrar una llamada la borra de verdad.** Si la grabación se elimina en WaveKat, no queda en HubSpot ninguna copia que le sobreviva. El siguiente clic en reproducir no encuentra nada, porque no hay nada.
- **El acceso sigue siendo tuyo.** Cada reproducción es una petición que WaveKat atiende y puede rechazar: una integración desconectada, una llamada borrada. Un fichero de audio copiado nunca podría retirar una respuesta ya dada.

Para la transcripción y el paso a paso del flujo, el enlace de la ficha te devuelve a la página de la llamada en WaveKat, donde están el [reproductor de dos pistas y la transcripción por interlocutor](/es/blog/share-a-call-recording/).

## Conecta una vez: sin claves de API ni configuración

Conectar es un clic en la página de tu cuenta de WaveKat: llegas a la pantalla de consentimiento de HubSpot, apruebas y vuelves conectado. No hay cuenta de desarrollador que crear, ni aplicación privada que configurar, ni permisos que elegir, ni token que pegar. Antes de hacer clic, la página dice con claridad qué se enviará, y [la política de privacidad](/es/privacy/#integrations) detalla esa misma lista en lenguaje llano.

![La página de integraciones de WaveKat en la web: HubSpot marcado como «Conectado» en el catálogo y, debajo, la cuenta conectada mostrando «Sincronizando» y su última sincronización hace unos minutos.](/screenshots/integrations-hubspot/es.webp#shadow)

Desconectar es igual de limpio: WaveKat le pide a HubSpot que revoque su acceso y borra las credenciales guardadas. Las fichas ya escritas en tu HubSpot se quedan donde están: son el historial de tu CRM, y desconectar una integración no es lo mismo que borrar tu pasado.

## Tú decides qué se sincroniza

Cuatro interruptores, cada uno por conexión:

| Interruptor | Por defecto | Qué hace |
|---|---|---|
| Incluir la transcripción | Activado | Pone lo que se dijo en la ficha de la llamada |
| Crear contactos que falten | Activado | Crea el contacto cuando ningún número coincide |
| Propagar las eliminaciones | Activado | Quita la llamada de HubSpot cuando la borras en WaveKat |
| Nombrar a las personas desconocidas por su número | Desactivado | Usa el número como nombre cuando el operador no envía ninguno |

![El panel de ajustes de la conexión en la web: qué eventos de llamada llegan a HubSpot y los interruptores «Crear contactos que falten», «Nombrar a las personas desconocidas por su número», «Incluir la transcripción» y «Propagar las eliminaciones».](/screenshots/integrations-hubspot-options/es.webp#shadow)

El último está desactivado a propósito: un nombre en blanco es exacto, y el primer compañero que reconozca el número lo rellenará para siempre. Cuando lo activas, el número va al campo de apellido, nunca al de nombre, porque HubSpot usa los nombres en la personalización del correo y «Hola 021 123 4567» no es un mensaje que nadie quiera enviar.

Una nota honesta, la misma que hace [la política de privacidad](/es/privacy/#integrations): la persona con la que hablaste no acordó nada con nosotros. Guardar su número, su voz y sus palabras en tu CRM es la misma responsabilidad que grabar la llamada; los interruptores existen para que sincronices solo lo que estés dispuesto a custodiar.

## Cada llamada dice adónde fue

Abre cualquier llamada en WaveKat y te dirá si llegó a tu CRM: una etiqueta **«En HubSpot»** cuando está archivada, un estado en espera mientras va de camino y, si algo salió mal, el motivo con las palabras del propio HubSpot. Una sincronización fallida se reintenta durante un día con esperas crecientes, y una conexión que pierde el acceso pide «volver a conectar» en vez de fallar en silencio. Nada de adivinar si la tubería funciona.

![Una llamada terminada en WaveKat en la web: la etiqueta «En HubSpot» junto al nombre de quien llamó, debajo la grabación de dos pistas y, más abajo, una fila de sincronización con la cuenta de HubSpot en la que quedó registrada.](/screenshots/call-in-hubspot/es.webp#shadow)

## Formas de registrar llamadas en HubSpot

Hay varias rutas para llevar las llamadas a HubSpot, y encajan con situaciones distintas:

| Ruta | Qué exige | ¿Conservas tu operador? |
|---|---|---|
| Registrar a mano | Alguien escribiendo después de cada llamada | Sí |
| Telefonía integrada de HubSpot | Llamar desde HubSpot con un número suyo | No |
| Plataformas de marcación en la nube | Mudar tu telefonía allí, con precio por puesto | No |
| Webhooks más una herramienta de automatización | Un plan de automatización aparte y una tubería que mantener | Sí |
| Integración nativa de WaveKat Voice | Un clic para conectar; las llamadas siguen en tu línea SIP | Sí |

Las plataformas de marcación son buenas de verdad en lo suyo: marcación masiva, SMS, formación de equipos comerciales sobre las llamadas. Lo que piden es que tu telefonía se mude a ellas. WaveKat Voice apuesta al revés: conservas [el operador que ya tienes](/es/voice/), las llamadas ocurren en tu computadora y HubSpot es el destino al que informan, no el sistema donde viven.

## Gratis y Pro

La integración nativa con HubSpot es una función **Pro**, el mismo nivel que [repartir llamadas con menús y transferencias](/es/blog/answer-calls-with-a-call-flow/). Durante el acceso anticipado, pasar a Pro es gratis: un clic en [la página de tu cuenta de WaveKat](https://platform.wavekat.com/profile), sin paso de pago, y te da un año.

Las cuentas gratuitas siguen teniendo camino hacia el CRM: los **webhooks**, que envían un registro de cada llamada a la URL que les des, gratis durante la beta. La integración nativa es a lo que subes cuando quieres las partes con estado: coincidencia de contactos, fichas sin duplicados, reproducción de grabaciones y borrados que se propagan.

## Preguntas frecuentes

### ¿Cómo registro llamadas en HubSpot automáticamente con WaveKat Voice?

Inicia sesión en tu cuenta de WaveKat con la sincronización en la nube activada, pulsa «Conectar HubSpot» en la página de integraciones y aprueba en la pantalla de consentimiento de HubSpot. A partir de ahí, cada llamada que recibas o hagas en WaveKat Voice se archiva en HubSpot automáticamente: no hay nada que hacer llamada a llamada.

### ¿WaveKat Voice crea contactos de HubSpot automáticamente?

Sí, mientras dejes activado «Crear contactos que falten». WaveKat asocia cada llamada a un contacto de HubSpot por número de teléfono; si no coincide nadie, crea el contacto para que la llamada siga quedando bajo una persona. Si lo desactivas, las llamadas sin coincidencia se registran sin contacto.

### ¿Puedo escuchar las grabaciones dentro de HubSpot?

Sí. La ficha en HubSpot de una llamada grabada se reproduce en el propio reproductor de HubSpot, en la cronología del contacto. El audio se pide a WaveKat en el momento de reproducir en lugar de copiarse, así que borrar la llamada en WaveKat la elimina de verdad y no deja copias sueltas en el CRM.

### ¿Qué pasa en HubSpot si borro una llamada en WaveKat?

Con «Propagar las eliminaciones» activado (lo predeterminado), la ficha de HubSpot se archiva cuando borras la llamada en WaveKat y su grabación deja de reproducirse. Si lo desactivas, tu historial de HubSpot conserva la ficha aunque la llamada ya no esté en WaveKat.

### ¿Hace falta una clave de API para conectar HubSpot?

No. La conexión es un clic a través de la pantalla de consentimiento del propio HubSpot: no hay aplicación privada que configurar ni clave de API que crear o pegar. Si prefieres montar tu propia tubería, los webhooks siguen ahí y envían cada llamada a la URL que elijas.

### ¿La integración con HubSpot es gratis?

Es una función Pro. Durante el acceso anticipado Pro es gratis: un clic en la página de tu cuenta de WaveKat te da un año, sin paso de pago. Los webhooks siguen disponibles en las cuentas gratuitas como la vía de andar por casa hacia un CRM.

### ¿En qué plataformas funciona?

WaveKat Voice funciona hoy en Mac y Linux. La integración con HubSpot vive en tu cuenta de WaveKat, así que se comporta igual desde cualquiera de las dos, y las llamadas que registra se leen en HubSpot desde cualquier navegador.

## Pruébalo

[Descarga WaveKat Voice](/es/voice/download/), inicia sesión con la sincronización en la nube activada y pulsa **Conectar HubSpot** en [tu página de integraciones](https://platform.wavekat.com/integrations). Tu próxima llamada estará en tu CRM antes de que termines las notas que, bien mirado, ya no necesitas tomar.

Grabación, transcripción, [compartir](/es/blog/share-a-call-recording/) y ahora el CRM: la llamada sigue volviéndose más útil después de colgar.
