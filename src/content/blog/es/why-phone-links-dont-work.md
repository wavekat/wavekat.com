---
title: "Por qué los enlaces de teléfono no funcionan"
description: "En tu teléfono pulsas un número y llama; en la computadora no pasa nada: el hueco de la app de teléfono está vacío. WaveKat Voice lo llena en Mac y Linux."
date: 2026-08-07
author: Eason Guo
tags: [voz-ia, llamadas]
lang: "es"
---

Casi todas las páginas de contacto de internet tienen un número de teléfono en el que se puede hacer clic. Llevan ahí décadas. En tu teléfono tocas uno y suena. En la computadora, el mismo clic casi nunca hace nada — o hace algo raro.

Aquí tienes uno para probar ahora mismo, con lo que sea que estés leyendo esto: <a href="tel:+14155550123">+1 (415) 555-0123</a>. Es un número ficticio reservado, así que hacer clic es seguro: no llama a nadie. Lo que pase después depende por completo de tu dispositivo — y en esa diferencia está toda la historia.

## A dónde va el clic en realidad

Un enlace de teléfono es un enlace web normal que empieza por `tel:` en vez de `https:`. Al hacer clic, tu navegador no intenta hacer la llamada él mismo. Los navegadores muestran páginas; no tienen un micrófono preparado ni tono de marcado. Lo que hace es entregarle el número a tu sistema operativo: alguien quiere llamar aquí.

El sistema operativo mira entonces en un lugar concreto. Imagínalo como un hueco con la etiqueta **«app de teléfono»**: la única app del dispositivo registrada para atender las llamadas. Lo que esté en ese hueco recibe el número. Si el hueco está vacío, el número no tiene a dónde ir.

Ese único hueco explica todo lo que viene después.

## Por qué en tu teléfono siempre funciona

Tu teléfono tiene exactamente una cosa que hace llamadas: el marcador. Viene de fábrica, no se puede quitar y siempre ocupa el hueco. Cuando tocas un número, el teléfono no tiene que preguntarte qué quisiste decir. El número va derecho al marcador, y suena.

Por eso los enlaces de teléfono se sienten tan naturales en el teléfono que seguramente nunca habías pensado en ellos. Nunca hubo una pregunta que responder.

## Qué hace tu computadora con el mismo clic

Tu computadora es otro animal. Puede ejecutar cien apps que hacen sonido, pero no trae de fábrica una «cosa que hace llamadas». Así que el hueco es una pregunta de verdad — y cada sistema operativo la responde a su manera.

En un **Mac**, Apple deja FaceTime puesto en el hueco. Haces clic en un número y FaceTime se abre y ofrece hacer la llamada *a través de tu iPhone* — lo que solo funciona si tienes un iPhone, cerca, con la misma cuenta y esa función configurada. Si estás en un escritorio intentando llamar a un proveedor, rara vez es lo que querías.

En **Windows**, el hueco empieza vacío. Te aparece el cuadro de «¿Cómo quieres abrir esto?», con una lista de apps que suele estar igual de vacía, o que te manda a la tienda de aplicaciones.

En **Linux**, ninguna app reclama los enlaces de teléfono de serie. El clic no hace nada. Ni un error, ni una ventana: nada en absoluto.

Fíjate en lo importante: el enlace nunca estuvo roto. La web hizo su parte, el navegador hizo la suya, el sistema operativo tocó la puerta de la app de teléfono. Solo que no había nadie en casa.

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← el tuyo">
  <div class="wk-slot-head">Quién responde a un enlace de teléfono, dispositivo por dispositivo</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">un teléfono</button>
      <button type="button" data-os="mac">un Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac o Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">Un teléfono</p>
      <ol class="trace">
        <li><span class="who">Tocas</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">En el hueco</span><span class="what"><span class="slotbox">El marcador — la única app de llamadas del teléfono</span></span></li>
        <li><span class="who">Entonces</span><span class="what ok">Suena.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Un Mac</p>
      <ol class="trace">
        <li><span class="who">Haces clic</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">En el hueco</span><span class="what"><span class="slotbox">FaceTime — Apple lo puso ahí</span></span></li>
        <li><span class="who">Entonces</span><span class="what meh">FaceTime se abre y ofrece llamar a través de tu iPhone — si tienes uno, cerca y configurado.</span></li>
      </ol>
      <p class="note">Rara vez lo que alguien sentado a un escritorio quería.</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">Haces clic</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">En el hueco</span><span class="what"><span class="slotbox is-empty">vacío</span></span></li>
        <li><span class="who">Entonces</span><span class="what no">«¿Cómo quieres abrir esto?» — con una lista que suele estar vacía.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">Haces clic</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">En el hueco</span><span class="what"><span class="slotbox is-empty">vacío</span></span></li>
        <li><span class="who">Entonces</span><span class="what no">Nada. Nada en absoluto.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac o Linux con WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">Haces clic</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">En el hueco</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice — lo pusiste tú, con un interruptor</span></span></li>
        <li><span class="who">Entonces</span><span class="what ok">La app aparece con el número ya escrito. Pulsas Llamar.</span></li>
      </ol>
    </div>
  </div>
</div>

## Cómo llena WaveKat Voice ese hueco

[WaveKat Voice](/es/voice/) es una app de teléfono para Mac y Linux: hace y recibe llamadas reales a través de tu operador, y graba y transcribe cada una. Y puede ser lo que ocupe el hueco.

Activas un solo interruptor: **Enlaces de teléfono**, en Ajustes → General. Está desactivado hasta que tú lo enciendas, a propósito — quedarse con los enlaces de teléfono de toda tu computadora debería ser decisión tuya, no algo que una app agarra al instalarse. Una vez activado, hacer clic en un número en cualquier página web trae al frente WaveKat Voice con el número ya escrito en el cuadro de llamada. Lo miras, y pulsas Llamar.

![WaveKat Voice en Ubuntu — la hoja de Llamada nueva abierta con un número de teléfono ya escrito, lista para marcar.](/screenshots/dial-prefilled/es.webp)

Esa es toda la función. Nada de copiar el número de la página, nada de volver a teclearlo con el prefijo del país en el lugar equivocado. Llegó en la versión [0.0.43](/es/voice/changelog/#0.0.43), y hay un anuncio más corto en [Click-to-call: pulsa un número web y llama](/es/blog/click-to-call-phone-links/).

## ¿Puede una web hacer que mi computadora llame a alguien?

Es la pregunta que todo el mundo hace después — y la pregunta correcta. No, no puede.

Un enlace solo puede *pedir* una llamada. Por defecto, WaveKat Voice escribe el número y luego espera a que una persona pulse Llamar. Nada marca hasta que tú lo hagas.

Hay un ajuste opcional, «Llamar de inmediato al hacer clic», para quien confía en sus clics y quiere un paso menos. Viene desactivado. E incluso encendido, se niega a actuar si ya estás en una llamada, o si no está claro desde qué línea debe salir la llamada: escribe el número y espera, exactamente como el valor por defecto. Y la ventana siempre pasa al frente, para que nada pueda marcar donde no lo veas.

El hueco es poderoso; justo por eso la app que lo ocupa debe ser prudente.

## Preguntas frecuentes

### ¿Por qué no pasa nada al hacer clic en un número de teléfono en mi computadora?

Porque ninguna app de tu computadora ha reclamado los enlaces de teléfono. El navegador le pasa el número al sistema operativo, que busca una app de teléfono registrada — y en Windows y Linux normalmente no hay ninguna, así que el clic no llega a ningún sitio.

### ¿Puede una página web hacer una llamada desde mi computadora?

No. Un enlace de teléfono solo puede solicitar una llamada, y por defecto WaveKat Voice se limita a escribir el número y esperar a que pulses Llamar. Incluso el ajuste opcional de marcado inmediato se niega a actuar si ya estás en una llamada o si la línea de salida es ambigua.

### ¿Por qué se abre FaceTime al hacer clic en un número en mi Mac?

Apple registra FaceTime de fábrica como gestor de los enlaces de teléfono del Mac. FaceTime ofrece entonces pasar la llamada por un iPhone cercano, lo que solo funciona si tienes uno y con la función configurada. Instalar otra app de llamadas, como WaveKat Voice, te deja entregarle a ella los enlaces de teléfono.

### ¿Cómo hago que los enlaces de teléfono se abran en WaveKat Voice?

Activa el interruptor Enlaces de teléfono en Ajustes → General — viene desactivado. Después, hacer clic en un número en cualquier página web abre WaveKat Voice con el número ya escrito, listo para marcar. Funciona en Mac y Linux y llegó en la versión 0.0.43.

## Vuelve a probar ese número

Los enlaces de teléfono llevan décadas esperando en silencio en cada página de contacto; a tu computadora solo le faltaba alguien en casa que respondiera. Si quieres que tus clics suenen, [descarga WaveKat Voice](/es/voice/download/) para Mac o Linux, enciende el interruptor y vuelve a probar el número del principio de esta página.

<script src="/blog/phone-slot/widget.js" defer></script>
