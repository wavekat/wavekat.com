import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Use su número 2talk en Mac, Windows o Linux con un softphone sin suscripción que graba y transcribe cada llamada.',
    seoTitle: 'Softphone 2talk para Mac, Windows y Linux',
    seoDescription:
      'Su número 2talk en Mac, Windows o Linux: WaveKat Voice es un softphone SIP sin suscripción que graba y transcribe cada llamada. Alternativa gratuita a Bria.',
    heading: 'El softphone sin suscripción para 2talk en Mac, Windows y Linux',
    intro:
      'WaveKat Voice es un softphone de escritorio que se conecta a su cuenta de 2talk por SIP y graba y transcribe cada llamada automáticamente. Funciona en Mac, Windows y Linux, es gratis durante la beta pública y no tiene suscripción mensual, así que es una forma de usar su número 2talk en su computadora sin pagar por Bria. Las llamadas de 2talk que usted no puede atender las contesta un flujo de llamada, con saludo y buzón de voz, y cada llamada puede registrarse sola en su CRM de HubSpot.',
    setup: {
      heading: 'Cómo configurar un softphone para 2talk',
      summary:
        '2talk está en la lista guiada de proveedores de WaveKat Voice, así que no edita a mano los campos SIP: elige 2talk e introduce su número y contraseña.',
      steps: [
        'Descargue y abra WaveKat Voice en su computadora Mac, Windows o Linux.',
        'Añada una cuenta y elija 2talk en la lista de proveedores.',
        'Introduzca su número de teléfono 2talk y su contraseña SIP.',
        'WaveKat Voice se registra con 2talk y ya puede llamar, y cada llamada se graba y se transcribe automáticamente.',
      ],
      note: '¿Prefiere introducirlo a mano? Para la mayoría de las cuentas de Nueva Zelanda, 2talk usa un único servidor SIP —sip.2talk.co.nz— para el dominio, el proxy y el proxy de salida. (La nueva plataforma Lyra de 2talk usa sus propios ajustes.) Elija 2talk en WaveKat Voice y él los rellena por usted.',
    },
    comparisonHeading: 'Softphones para 2talk comparados',
    columns: ['WaveKat Voice', 'Bria (con 2talk)', 'MicroSIP'],
    comparison: [
      {
        label: 'Precio',
        cells: [
          'Gratis durante la beta pública; de pago más adelante.',
          'NZ$5.95 + GST al mes a través de 2talk (a julio de 2026), hasta 4 dispositivos.',
          'Gratuito y de código abierto.',
        ],
      },
      {
        label: 'Plataformas',
        cells: [
          'Mac, Windows y Linux (la versión de Windows se distribuye por Microsoft Store).',
          'Windows, Mac, iOS y Android.',
          'Solo Windows.',
        ],
      },
      {
        label: 'Graba cada llamada',
        cells: [
          'Automático: cada llamada se graba en el momento en que cuelga.',
          'Manual por llamada; la grabación de llamadas es una función de pago.',
          'Grabación manual por llamada.',
        ],
      },
      {
        label: 'Transcripción escrita',
        cells: ['Transcripción en vivo, conservada con la grabación.', 'Sin transcripción.', 'Sin transcripción.'],
      },
      {
        label: 'Historial de llamadas con búsqueda',
        cells: [
          'Llamadas, grabaciones y transcripciones en un único historial con búsqueda.',
          'Registro de llamadas; grabaciones si se suscribe.',
          'Solo registro de llamadas.',
        ],
      },
      {
        label: 'Configuración de 2talk',
        cells: [
          'Elija 2talk en una lista; introduzca su número y contraseña.',
          'Configurado por 2talk cuando lo compra a ellos.',
          'Rellene usted mismo los campos SIP genéricos.',
        ],
      },
      {
        label: 'Atender llamadas y buzón de voz',
        cells: [
          'Un flujo de llamada contesta por usted: saludo, horario, menú, buzón de voz o transferencia, y el mensaje se transcribe.',
          'No contesta por sí solo: el buzón de voz de 2talk toma el mensaje.',
          'No contesta por sí solo: el buzón de voz de 2talk toma el mensaje.',
        ],
      },
      {
        label: 'Registrar llamadas en su CRM',
        cells: [
          'Conecte HubSpot una vez y cada llamada se archiva sola en el contacto que coincide, con transcripción. Parte de Pro, gratis en el acceso anticipado.',
          'No forma parte de la aplicación que revende 2talk.',
          'No: es un marcador SIP sin más.',
        ],
      },
      {
        label: 'Móvil y notificaciones push',
        cells: [
          'Solo escritorio: sin aplicación para el teléfono ni push móvil.',
          'Aplicaciones para iOS y Android con notificaciones push.',
          'Sin aplicación móvil (solo escritorio en Windows).',
        ],
      },
    ],
    whatItIs: {
      heading: 'Qué le ofrece 2talk para llamar',
      summary:
        '2talk es un proveedor de VoIP neozelandés que le da un número de teléfono y credenciales SIP. Para las aplicaciones, le recomienda su propio softphone 2talk Connect y revende Bria, un softphone de pago, a NZ$5.95 + GST al mes; y como su cuenta es SIP estándar, cualquier softphone SIP también puede registrarse con ella.',
      strengths: [
        'Un número de teléfono de Nueva Zelanda con soporte y facturación locales',
        'Bria cubre iPhone, Android, Mac y Windows en una única aplicación de pago',
        'Notificaciones push móviles fiables a través de Bria o Acrobits Groundwire',
        'Funciona con cualquier softphone SIP, no solo con las aplicaciones que 2talk recomienda',
      ],
    },
    chooseHeading: 'Cuál le conviene',
    chooseWavekatLabel: 'Elija WaveKat Voice si',
    chooseWavekat: [
      'Usa una computadora Mac, Windows o Linux y quiere un softphone de escritorio en condiciones para 2talk',
      'Quiere que cada llamada de 2talk se grabe y se escriba automáticamente, sin nada que activar',
      'Prefiere no pagar una suscripción mensual para llamar desde su número 2talk',
      'Quiere un único historial con búsqueda de llamadas, grabaciones y transcripciones',
      'Quiere que se atiendan las llamadas de 2talk que usted no puede coger: un saludo, su horario y un buzón de voz que transcribe el mensaje',
      'Quiere que cada llamada de 2talk quede en su CRM de HubSpot sin que nadie la anote',
    ],
    chooseOtherLabel: 'Elija Bria o MicroSIP si',
    chooseOther: [
      'Necesita 2talk en su iPhone o Android con notificaciones push fiables: eso es Bria o Groundwire',
      'Quiere una única aplicación que cubra también el móvil y no le importa pagar a 2talk por Bria',
      'Quiere el cliente de Windows más pequeño posible y nada más: eso es MicroSIP',
      'Quiere una aplicación que 2talk admita oficialmente y configure por usted',
    ],
    faqsHeading: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Funciona WaveKat Voice con 2talk?',
        a: 'Sí. WaveKat Voice es un softphone SIP y 2talk está en su lista guiada de proveedores, así que elige 2talk, introduce su número 2talk y su contraseña SIP, y se registra, sin configuración SIP manual. Funciona en Mac, Windows y Linux, y cada llamada se graba y se transcribe automáticamente.',
      },
      {
        q: '¿Cuál es el mejor softphone para 2talk en Mac, Windows o Linux?',
        a: 'Si quiere un softphone de escritorio sin suscripción para 2talk que además grabe y transcriba cada llamada, WaveKat Voice está hecho para eso en los tres escritorios: Mac, Windows y Linux. La opción de pago propia de 2talk, Bria, añade iPhone y Android; MicroSIP es gratuito pero solo para Windows y no graba ni transcribe.',
      },
      {
        q: '¿Hay un softphone gratuito para 2talk en lugar de Bria?',
        a: 'Bria comprado a través de 2talk cuesta NZ$5.95 + GST al mes (a julio de 2026). Las opciones gratuitas son WaveKat Voice en Mac, Windows y Linux, gratis durante su beta pública, y MicroSIP en Windows. Ambos se registran con su número 2talk por SIP.',
      },
      {
        q: '¿Puedo usar mi número 2talk en un Mac?',
        a: 'Sí. Cualquier softphone SIP puede registrar un número 2talk en un Mac, incluidas la aplicación Bria que revende 2talk y WaveKat Voice. WaveKat Voice añade grabación y transcripción automáticas de las llamadas y no cobra una cuota mensual durante la beta. En Windows y Linux funciona igual.',
      },
      {
        q: '¿Gestiona WaveKat Voice las notificaciones push de 2talk en mi teléfono?',
        a: 'No: WaveKat Voice es una aplicación de escritorio para Mac, Windows y Linux y no funciona en teléfonos, así que no puede entregar notificaciones push móviles. Para recibir llamadas de forma fiable en un iPhone o Android con 2talk, use Bria o Acrobits Groundwire. En el escritorio, WaveKat Voice permanece registrado y suena mientras la aplicación está abierta.',
      },
      {
        q: '¿Hay un softphone de 2talk para Windows?',
        a: 'Sí. WaveKat Voice funciona en Windows 10 y 11 desde Microsoft Store — una sola ficha que incluye tanto el paquete Intel/AMD (x64) como el ARM64 — y 2talk está en su lista guiada de proveedores. También hay instaladores .exe directos; esos aún no están firmados digitalmente, así que Windows avisa de un editor desconocido en el primer arranque, mientras que el paquete de la tienda lo firma Microsoft. Las otras opciones en Windows son MicroSIP y el Bria revendido por 2talk.',
      },
      {
        q: '¿WaveKat Voice puede atender mis llamadas de 2talk cuando no estoy?',
        a: 'Sí. Un flujo de llamada atiende la línea por usted: contesta con un saludo, comprueba su horario, ofrece un menú telefónico, graba un mensaje o transfiere la llamada. El mensaje se graba y se transcribe como cualquier otra llamada, así que puede leerlo en lugar de escucharlo, y puede coger la llamada mientras alguien lo está dejando. El saludo, la toma de mensajes y hacer que suene su teléfono son gratis; los menús, el horario y las transferencias forman parte de Pro, gratis un año durante el acceso anticipado. El flujo se ejecuta en su propio ordenador, así que la app tiene que estar abierta para contestar; si no, responde el buzón de voz de 2talk.',
      },
      {
        q: '¿WaveKat Voice puede registrar mis llamadas de 2talk en HubSpot?',
        a: 'Sí. Conecte su cuenta de HubSpot una vez y cada llamada de 2talk que reciba o realice se archiva sola en el contacto cuyo número coincide, con la hora, el sentido, el resultado, la duración, la transcripción y una grabación que puede reproducir dentro de HubSpot. Es una función Pro, gratuita durante el acceso anticipado, y los webhooks cubren cualquier otro CRM.',
      },
      {
        q: '¿Cómo configuro un softphone para 2talk?',
        a: 'En WaveKat Voice, añada una cuenta, elija 2talk en la lista de proveedores e introduzca su número 2talk y su contraseña SIP; los ajustes SIP se rellenan por usted. Para la mayoría de las cuentas de Nueva Zelanda, 2talk usa un único servidor SIP, sip.2talk.co.nz, para el dominio, el proxy y el proxy de salida; la nueva plataforma Lyra de 2talk usa sus propios ajustes, así que use los datos que le dé 2talk si su cuenta está en Lyra.',
      },
    ],
    whatWavekatDoesLabel: 'Qué hace WaveKat Voice',
  },
];
