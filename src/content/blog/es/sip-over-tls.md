---
title: "SIP over TLS: señalización cifrada del softphone"
description: "WaveKat Voice se conecta a proveedores SIP por TLS en el puerto 5061 y cifra la señalización SIP (registro, llamadas, transferencias) en Mac, Windows y Linux."
date: 2026-09-26
author: Eason Guo
tags: [voz-ia, sip, privacidad]
lang: "es"
---

WaveKat Voice admite SIP over TLS desde la versión [0.0.56](/es/voice/changelog/#0.0.56). Ponga la **Conexión** de una línea en `TLS` y el puerto en `5061`, y toda la señalización SIP entre el softphone y su proveedor (REGISTER, INVITE, REFER, BYE) viaja por una conexión cifrada. Funciona en Mac, Windows y Linux.

## Por qué importa TLS

Cada llamada empieza con señalización: su teléfono se registra en el proveedor, indica a quién llama y establece la llamada. Ese tráfico lleva su cuenta SIP, los números que marca y el intercambio de autenticación. Sobre UDP en texto plano, cualquiera en la misma ruta de red puede leerlo.

TLS es la forma estándar de protegerlo. La conexión entre WaveKat Voice y su proveedor va cifrada, y la identidad del proveedor se verifica antes de enviar nada. Un teléfono que lleva las llamadas de su negocio debería poder hacerlo, y proteger sus comunicaciones es parte de ganarnos su confianza. Por eso cada línea de WaveKat Voice puede usar TLS.

## Qué se cifra

| | UDP / TCP | TLS |
|---|---|---|
| Intercambio de autenticación de REGISTER | Texto plano | Cifrado |
| Quién llama, a quién, cuándo (INVITE, etc.) | Texto plano | Cifrado |
| Retener, transferir, colgar | Texto plano | Cifrado |
| Audio (RTP) | Texto plano | Texto plano |
| Identidad del servidor verificada | No | Sí, por certificado |
| Puerto habitual | 5060 | 5061 |

La fila de autenticación es la que más se subestima. SIP usa autenticación Digest ([RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)), así que la contraseña nunca viaja por la red. Pero el `response` de la cabecera `Authorization` es un hash derivado de ella. Quien capture ese paquete sobre UDP en la misma red puede lanzarle un diccionario sin conexión, y una contraseña débil no aguanta mucho. Con TLS no hay paquete que capturar.

## Cómo funciona SIP over TLS

SIP sin cifrar suele ir sobre UDP en el puerto 5060: cada mensaje es un paquete independiente de texto legible. SIP over TLS cambia el transporte de debajo, no el propio SIP.

1. **Una conexión.** El softphone abre una conexión TCP con el proveedor, normalmente en el puerto 5061.
2. **Negociación.** Antes de enviar SIP, las dos partes hacen el handshake TLS. El proveedor presenta su certificado; el softphone comprueba que la cadena llega a una autoridad de certificación de confianza y que está emitido para el dominio SIP. Después acuerdan las claves de sesión.
3. **SIP dentro del túnel.** A partir de ahí, cada mensaje SIP, en ambos sentidos, viaja cifrado por esa misma conexión. Los propios mensajes lo indican: `Via: SIP/2.0/TLS` y un `Contact` con `;transport=tls`.
4. **La conexión sigue abierta.** El registro la mantiene viva, y el proveedor envía por ella las llamadas entrantes. Así es también como un INVITE entrante llega a un teléfono detrás de NAT sin redirigir puertos.

![Diagrama de secuencia de SIP over TLS: WaveKat Voice abre una conexión TCP con el proveedor en el puerto 5061, completa el handshake TLS y verifica el certificado contra el dominio SIP; después el REGISTER, el desafío 401, el REGISTER autenticado, el 200 OK y un INVITE entrante viajan por la conexión cifrada.](/blog/sip-over-tls/es.svg)

TLS protege un salto: el enlace entre WaveKat Voice y su proveedor. Cómo lleva el proveedor la llamada después, hacia otro operador o la red telefónica, depende de él.

## Cómo se comprueban los certificados

TLS solo frena un ataque de intermediario si la comprobación del certificado es estricta. La nuestra:

- **Solo raíces del sistema.** Los certificados se comprueban contra la lista de CA de confianza de su sistema operativo. No incluimos ninguna propia y no hay excepciones.
- **Se comprueba contra el dominio SIP, no contra la dirección del servidor.** Aunque haya configurado un servidor de salida aparte, el certificado debe estar emitido para el dominio SIP de la cuenta, como exige [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922).
- **Un fallo detiene la línea.** No hay vuelta al texto plano ni reintentos sin fin en «Conectando…». La línea falla y el error indica el motivo y la huella SHA-256 del certificado:

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

La implementación de TLS es `rustls`, de Rust, así que no depende de OpenSSL en ninguna plataforma.

No se admiten certificados autofirmados ni CA privadas, y no existe un interruptor de «confiar en este certificado». Si su proveedor usa un certificado privado, esa línea tiene que seguir en UDP o TCP.

## Compruebe el TLS de su proveedor antes de cambiar

Dos comandos estándar le dicen si el TLS de su proveedor va a funcionar, antes de tocar nada en la aplicación. La salida de abajo es de pruebas reales del 26 de septiembre de 2026 contra dos proveedores SIP: 2talk, en Nueva Zelanda, y Telnyx.

### Paso 1: encuentre el host y el puerto de TLS

Algunos proveedores publican un registro SRV para SIP over TLS ([RFC 3263](https://www.rfc-editor.org/rfc/rfc3263)) con el host y el puerto que hay que usar. Telnyx lo hace:

```sh
$ dig +short SRV _sips._tcp.sip.telnyx.com
1 45 5061 sip-anycast1.telnyx.com.
1 95 5061 sip-anycast2.telnyx.com.
```

Cada línea es prioridad, peso, puerto y host. Gana la prioridad más baja; los registros con la misma prioridad se reparten la carga según el peso. Aquí los dos hosts tienen prioridad 1 y puerto 5061, así que un cliente reparte las conexiones entre ambos y envía unas dos de cada tres a `sip-anycast2`.

2talk no publica registro SRV, y la misma consulta no devuelve nada. Es habitual; en ese caso, use la documentación del proveedor. La de 2talk indica `lyra.2talk.co.nz`, con TLS en el puerto 5061.

### Paso 2: compruebe el certificado como lo hace un cliente estricto

Conéctese a ese host y pida a OpenSSL que verifique el certificado contra el dominio SIP. Para 2talk (salida recortada):

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname lyra.2talk.co.nz </dev/null
depth=2 C=US, O=DigiCert Inc, OU=www.digicert.com, CN=DigiCert Global Root G2
depth=1 C=US, O=DigiCert Inc, OU=www.digicert.com, CN=RapidSSL TLS RSA CA G1
depth=0 CN=*.2talk.co.nz
Verification: OK
Protocol: TLSv1.3
Verify return code: 0 (ok)
```

Eso le dice tres cosas: el certificado es un comodín para `*.2talk.co.nz`, que cubre `lyra.2talk.co.nz`; la cadena llega hasta la raíz pública de DigiCert; y la conexión usa TLS 1.3. `0 (ok)` significa que la comprobación del certificado debería pasar.

Así se ve un dominio equivocado: el mismo servidor, verificado contra un nombre que no cubre.

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname sip.example.com </dev/null
Verification error: hostname mismatch
Verify return code: 62 (hostname mismatch)
```

WaveKat Voice rechaza esa conexión con un error de certificado. Los códigos que verá con más frecuencia:

| Resultado | Significado |
|---|---|
| `0 (ok)` | De confianza y válido para su dominio SIP |
| `62 (hostname mismatch)` | El certificado no está emitido para este dominio SIP. Confirme el dominio con su proveedor |
| `18`, `19` o `20` | Autofirmado o de una CA privada. Su sistema no confía en él |
| Conexión rechazada o agotada | Ese host y puerto no ofrecen TLS, o un cortafuegos lo bloquea |

OpenSSL comprueba contra su propio paquete de CA. En la mayoría de sistemas Linux es el almacén del sistema; en un Mac muchas veces no, así que ahí tome un `20` como una pista, no como un veredicto.

### Paso 3 (opcional): anote la huella del certificado

Para compararla con la huella del error de certificado de WaveKat Voice, muestre la huella SHA-256 y la fecha de caducidad del certificado:

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 -servername lyra.2talk.co.nz </dev/null 2>/dev/null \
    | openssl x509 -noout -fingerprint -sha256 -enddate
sha256 Fingerprint=1D:64:FB:48:21:19:A1:CB:18:43:3B:20:9A:BB:03:96:A1:D2:43:9A:E6:F3:A4:B4:35:3A:33:86:E4:E0:E4:8F
notAfter=Feb 18 23:59:59 2027 GMT
```

OpenSSL la muestra en mayúsculas y con dos puntos; WaveKat Voice, en minúsculas y sin ellos. Los dígitos hexadecimales son los mismos. Cuando el proveedor renueva su certificado, la huella cambia; es lo esperado.

## Cómo configurarlo

1. Busque en la documentación de su proveedor el nombre de host y el puerto de TLS. La mayoría usa `5061`; algunos usan un nombre de host aparte para TLS. El proveedor neozelandés 2talk, por ejemplo, documenta `5061`.
2. Abra la línea y ponga **Conexión** en `TLS`. El campo del puerto sugiere `5061`.
3. Compruebe que el dominio SIP de la cuenta coincide exactamente con el que le dio su proveedor: es el nombre contra el que se comprueba el certificado.
4. Guarde. La línea se vuelve a registrar por TLS.

Una trampa habitual: **Conexión** en `TCP` con el puerto `5061` no es TLS. Envía SIP en texto plano a un puerto que espera un handshake TLS, y el registro falla.

La configuración de las líneas se sincroniza con su cuenta de WaveKat, así que la línea sigue en TLS cuando inicia sesión en otro ordenador.

## Cómo comprobar que de verdad va por TLS

En los detalles de conexión de una línea hay un enlace **Detalles técnicos**. Esa página muestra los valores en uso en la conexión activa, no los que usted escribió:

- **Conexión** es `TLS`;
- **Accesible en** termina en `;transport=tls`;
- en **Mensajes SIP**, cada `Via` es `SIP/2.0/TLS`.

![WaveKat Voice en Ubuntu: la página Detalles técnicos de una línea, con la conexión en uso en TLS y el dispositivo accesible en transport=tls.](/screenshots/line-technical-details-tls/es.webp)

Un REGISTER de esa línea se ve más o menos así (un ejemplo, de la misma línea de demostración que la captura):

```
Via: SIP/2.0/TLS 192.0.2.24:5066;branch=z9hG4bK…
Contact: <sip:1001@192.0.2.24:5066;transport=tls>
```

Un cifrado que no se puede comprobar hay que creérselo sin más, así que TLS llega con una forma de ver el transporte que realmente está en uso.

El registro de mensajes SIP vive solo en memoria: nunca se escribe en disco y desaparece al cerrar la aplicación. El `response` de las cabeceras `Authorization` y `Proxy-Authorization` se borra al capturarlo, así que un registro copiado no filtra el hash de la contraseña a quien se lo envíe.

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| "Your provider's server didn't prove it is who it says it is" (el servidor de su proveedor no demostró ser quien dice ser) | El dominio SIP no coincide con el certificado, o el proveedor usa un certificado privado | Revise el dominio SIP; si el certificado es privado, pida al proveedor un punto de acceso con uno de confianza pública |
| "The secure connection to your provider couldn't be set up" (no se pudo establecer la conexión segura con su proveedor) | Puerto equivocado (a menudo 5060), o ese nombre de host no ofrece TLS | Use el puerto y el nombre de host de la documentación del proveedor |
| No se registra en absoluto tras el cambio | `TCP` + `5061`, o un cortafuegos bloquea el 5061 saliente | Ponga Conexión en `TLS`; permita TCP 5061 saliente |
| Funcionaba y luego quedó sin registrar | La conexión TLS se cortó (reinicio del proveedor, router que cierra conexiones inactivas) y no se restableció | Pulse **Iniciar sesión** en la línea |

(Estos dos mensajes de error solo existen en inglés: la aplicación los muestra en inglés aunque esté en español.)

## Limitación conocida: sin reconexión automática tras un corte de TLS

UDP no tiene conexión que perder, así que un corte breve de red pasa desapercibido. TLS es una única conexión de larga duración: si el proveedor reinicia o un router la cierra, la línea queda sin registrar hasta que pulse **Iniciar sesión**. Si una línea tiene que atender llamadas sin nadie delante, por ejemplo una que contesta un [flujo de llamada](/es/blog/answer-calls-with-a-call-flow/) durante la noche, téngalo en cuenta antes de cambiar.

## Preguntas frecuentes

### ¿Puedo activar TLS solo en una línea?

Sí. La conexión se configura por línea, así que cada línea puede usar UDP, TCP o TLS de forma independiente.

### ¿Tengo que usar el puerto 5061?

No. 5061 es el puerto predeterminado de SIP over TLS, pero siga la documentación de su proveedor; algunos usan otro puerto o un nombre de host aparte.

### ¿TCP en el puerto 5061 es lo mismo que TLS?

No. Eso envía SIP en texto plano a un puerto TLS, y el registro falla. Ponga Conexión en `TLS`.

### ¿Qué versiones de TLS se admiten?

TLS 1.2 y TLS 1.3, las dos versiones que hoy se consideran seguras. TLS 1.0 y 1.1 son de 1999 y 2006, dependen de algoritmos rotos como MD5 y SHA-1, y el IETF las declaró obsoletas formalmente en 2021 ([RFC 8996](https://www.rfc-editor.org/rfc/rfc8996)); los principales navegadores las abandonaron hace años. Dejarlas fuera impide que una conexión se degrade a un protocolo inseguro. En la práctica no cuesta nada: los proveedores SIP actuales admiten TLS 1.2 o superior, y 2talk, en nuestra prueba de arriba, negoció TLS 1.3.

### ¿Necesito redirigir puertos en el router con TLS?

No. Las llamadas entrantes llegan por la conexión TLS que abrió el propio softphone. Su cortafuegos solo tiene que permitir TCP saliente en el 5061, o en el puerto que use su proveedor.

### ¿TLS hace más lentas las llamadas?

No de forma apreciable. El handshake TLS ocurre una sola vez, al establecer la conexión; el registro y cada llamada posterior reutilizan esa misma conexión en lugar de negociar de nuevo.

### ¿Cómo confirmo que una línea está realmente cifrada?

Abra los Detalles técnicos de la línea: Conexión es `TLS`, Accesible en termina en `;transport=tls` y Mensajes SIP muestra `Via: SIP/2.0/TLS`.

### ¿Qué pasa si el certificado de mi proveedor caduca o cambia?

Un certificado caducado no pasa la verificación: la línea se detiene con un error de certificado y nunca vuelve al texto plano. Si el proveedor cambia a otro certificado válido de una CA de confianza, no hay nada que hacer, porque WaveKat Voice comprueba la cadena y el dominio SIP en lugar de fijar un certificado concreto.

### ¿Se admiten certificados autofirmados?

No. WaveKat Voice solo confía en las CA raíz del sistema, así que un servidor con un certificado de una CA privada no puede conectarse por TLS.

### ¿Qué diferencia hay entre SIP over TLS y una dirección `sips:`?

Una dirección `sips:` pide TLS en cada salto que recorre la llamada; una dirección `sip:` con `;transport=tls` protege el salto actual. Las líneas de WaveKat Voice usan la segunda, que protege la conexión entre usted y su proveedor.

## Pruébelo

[Descargue WaveKat Voice](/es/voice/download/) o actualice a [0.0.56](/es/voice/changelog/#0.0.56), cambie una línea a `TLS` y abra Detalles técnicos para comprobarlo. El resto de ajustes de conexión está en la [guía de configuración SIP](/docs/voice/sip-trunks/).
