import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'El cliente SIP gratuito y de código abierto. Capaz y multiplataforma: WaveKat Voice cambia amplitud por un teléfono de empresa de escritorio enfocado, que graba cada llamada, atiende las que usted no puede coger y las registra en su CRM.',
    seoTitle: 'Alternativa a Linphone para Mac, Windows y Linux',
    seoDescription:
      'WaveKat Voice frente a Linphone en Mac, Windows y Linux: un softphone SIP que graba y transcribe cada llamada, atiende las perdidas y las registra en HubSpot.',
    heading: 'Una alternativa a Linphone para Mac, Windows y Linux',
    intro:
      'WaveKat Voice es un teléfono de empresa de escritorio para Mac, Windows y Linux que puede sustituir a Linphone: se conecta a su propio número por SIP igual que él, pero graba cada llamada automáticamente, la transcribe en directo y reúne todo en un único historial con búsqueda. Las llamadas que usted no puede atender las contesta un flujo de llamada, con saludo y buzón de voz, y cada llamada puede quedar registrada en su CRM de HubSpot. Linphone, por su parte, es un cliente SIP gratuito, de código abierto y de uso general que funciona en casi cualquier plataforma. Si lo que busca es un teléfono de empresa listo para usar y no un kit de herramientas VoIP, así es como se comparan ambos.',
    whatItIs: {
      summary:
        'Linphone es un softphone SIP de código abierto y larga trayectoria de Belledonne Communications. Funciona en Mac, Windows, Linux, iOS y Android, y abarca mucho terreno — llamadas de voz y vídeo, mensajería instantánea y cifrado de extremo a extremo —, todo de forma gratuita.',
      strengths: [
        'Gratuito y de código abierto, sin necesidad de cuenta para usarlo',
        'Funciona en prácticamente todas las plataformas, incluido el móvil',
        'Voz, vídeo y chat en un solo cliente',
        'Cifrado de extremo a extremo (ZRTP/SRTP) para los más técnicos',
      ],
    },
    comparison: [
      {
        label: 'Graba cada llamada',
        wavekat: 'Automático: cada llamada se graba y se guarda en el momento en que cuelga.',
        them: 'Grabación manual por llamada; de forma predeterminada no hay un historial guardado y navegable.',
      },
      {
        label: 'Transcripción escrita',
        wavekat: 'Transcripción en vivo junto a la llamada, conservada con la grabación.',
        them: 'Sin transcripción.',
      },
      {
        label: 'Historial de llamadas con búsqueda',
        wavekat: 'Cada llamada va a parar a un único historial, con su grabación y su transcripción.',
        them: 'Solo registro de llamadas: sin grabaciones ni transcripciones adjuntas.',
      },
      {
        label: 'Atender llamadas y buzón de voz',
        wavekat:
          'Un flujo de llamada contesta por usted: saludo, horario, menú telefónico, buzón de voz o transferencia. Puede coger la llamada mientras dejan el mensaje.',
        them: 'No tiene contestador propio; el buzón de voz es el de su proveedor, al que Linphone puede llamar.',
      },
      {
        label: 'Registrar llamadas en su CRM',
        wavekat:
          'Conecte HubSpot una vez y cada llamada se archiva sola en el contacto que coincide, con transcripción y grabación reproducible. Parte de Pro, gratis en el acceso anticipado.',
        them: 'Sin integración con CRM; las llamadas se quedan en el registro de la propia app.',
      },
      {
        label: 'Configurar su número',
        wavekat: 'Elija su proveedor de una lista (Twilio, Telnyx, 2talk y más) y los ajustes se rellenan por usted.',
        them: 'Campos SIP de uso general que configura usted mismo.',
      },
      {
        label: 'Dónde residen sus datos',
        wavekat: 'En su computadora de forma predeterminada; inicio de sesión opcional para sincronizar con la web.',
        them: 'En su dispositivo: es un cliente; no se aloja nada por usted.',
      },
      {
        label: 'Plataformas',
        wavekat: 'Mac, Windows y Linux (la versión de Windows es más reciente y aún no está firmada).',
        them: 'Mac, Windows, Linux, iOS, Android.',
      },
      {
        label: 'Vídeo y chat',
        wavekat: 'Enfocado en las llamadas: sin vídeo ni mensajería.',
        them: 'Voz, vídeo y mensajería instantánea.',
      },
      {
        label: 'Precio',
        wavekat: 'Gratis durante la beta pública; de pago más adelante.',
        them: 'Gratuito y de código abierto.',
      },
    ],
    chooseThem: [
      'Quiere un cliente gratuito y de código abierto, con el código fuente disponible',
      'Necesita en el móvil o la tableta la misma aplicación que en el ordenador',
      'Quiere videollamadas y chat en el mismo lugar que la voz',
      'No le importa configurar los ajustes SIP usted mismo',
    ],
    chooseWavekat: [
      'Quiere que cada llamada se grabe y se transcriba automáticamente, sin nada que activar',
      'Quiere un único historial con búsqueda de llamadas, grabaciones y transcripciones',
      'Prefiere elegir su proveedor de una lista antes que rellenar campos SIP',
      'Quiere que se atiendan las llamadas que usted no puede coger: un saludo, su horario y un buzón de voz que transcribe el mensaje',
      'Quiere que cada llamada quede en su CRM de HubSpot sin que nadie tenga que anotarla',
      'Quiere un teléfono de empresa de escritorio enfocado, no un kit de herramientas VoIP de uso general',
    ],
    faqs: [
      {
        q: '¿Puede WaveKat Voice conectarse al mismo proveedor SIP que Linphone?',
        a: 'Sí. Ambos son softphones SIP, así que cualquier proveedor que funcione con Linphone funciona con WaveKat Voice. La diferencia está en la configuración: WaveKat Voice rellena los ajustes para proveedores habituales como Twilio, Telnyx y 2talk, y le permite introducir los datos usted mismo para cualquier otro.',
      },
      {
        q: '¿WaveKat Voice funciona en Windows?',
        a: 'Sí. WaveKat Voice admite Windows 10 y 11, con instaladores separados para Intel/AMD (x64) y ARM64, además de las versiones para Mac y Linux. La versión de Windows es más reciente que las otras dos y aún no está firmada, así que Windows avisa de un editor desconocido en el primer arranque. Linphone también tiene versión para Windows.',
      },
      {
        q: '¿Linphone graba y transcribe las llamadas como WaveKat Voice?',
        a: 'Linphone puede grabar una llamada concreta cuando la inicia manualmente, pero no transcribe las llamadas ni conserva un historial navegable de grabaciones y transcripciones. WaveKat Voice graba cada llamada automáticamente, escribe una transcripción en vivo junto a ella y guarda ambas en su historial de llamadas sin ninguna configuración.',
      },
      {
        q: '¿WaveKat Voice tiene buzón de voz o atiende las llamadas cuando yo no puedo?',
        a: 'Sí: eso es lo que hace un flujo de llamada. Apunte un flujo a una de sus líneas y WaveKat Voice contesta con un saludo, comprueba su horario, ofrece un menú telefónico, graba un mensaje o transfiere la llamada. Los mensajes se graban y se transcriben como cualquier otra llamada, y puede coger la llamada mientras alguien la está dejando. El saludo, la toma de mensajes y hacer que suene su teléfono son gratis; los menús telefónicos, el horario y las transferencias forman parte de Pro (gratis un año durante el acceso anticipado). El flujo se ejecuta en su propio ordenador, así que la app tiene que estar abierta para contestar. Linphone no tiene contestador propio: allí el buzón de voz es el que ofrezca su proveedor.',
      },
      {
        q: '¿WaveKat Voice puede registrar las llamadas en HubSpot?',
        a: 'Sí. Conecte su cuenta de HubSpot una vez y cada llamada que reciba o realice se archiva sola en el contacto cuyo número coincide, con la hora, el sentido, el resultado, la duración, la transcripción y una grabación que puede reproducir dentro de HubSpot. Es una función Pro, gratuita durante el acceso anticipado, y los webhooks cubren cualquier otro CRM. Linphone no tiene integración con CRM.',
      },
      {
        q: '¿WaveKat Voice está en español?',
        a: 'Sí. La app está disponible en nueve idiomas — español, inglés, chino simplificado y tradicional, japonés, coreano, alemán, francés e italiano — y se cambia desde los ajustes.',
      },
      {
        q: '¿Es WaveKat Voice de código abierto como Linphone?',
        a: 'No: WaveKat Voice es un producto comercial, gratuito durante la beta pública. Varios de los componentes que tiene por debajo son de código abierto en nuestro GitHub, pero la propia aplicación Voice no lo es.',
      },
    ],
  },
];
