import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Use su número 2talk en Mac o Linux con un softphone sin suscripción que graba y transcribe cada llamada.',
    seoTitle: 'Softphone de 2talk para Mac y Linux',
    seoDescription:
      'Use su número 2talk en Mac o Linux con WaveKat Voice: un softphone SIP sin suscripción que graba y transcribe cada llamada. Alternativa gratuita a Bria.',
    heading: 'El softphone sin suscripción para 2talk en Mac y Linux',
    intro:
      'WaveKat Voice es un softphone de escritorio que se conecta a su cuenta de 2talk por SIP y graba y transcribe cada llamada automáticamente. Funciona en Mac y Linux, es gratis durante la beta pública y no tiene suscripción mensual, así que es una forma de usar su número 2talk en su computadora sin pagar por Bria.',
    setup: {
      heading: 'Cómo configurar un softphone para 2talk',
      summary:
        '2talk está en la lista guiada de proveedores de WaveKat Voice, así que no edita a mano los campos SIP: elige 2talk e introduce su número y contraseña.',
      steps: [
        'Descargue y abra WaveKat Voice en su computadora Mac o Linux.',
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
          'Mac y Linux hoy (Windows cuando haya demanda).',
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
      'Usa una computadora Mac o Linux y quiere un softphone de escritorio en condiciones para 2talk',
      'Quiere que cada llamada de 2talk se grabe y se escriba automáticamente, sin nada que activar',
      'Prefiere no pagar una suscripción mensual para llamar desde su número 2talk',
      'Quiere un único historial con búsqueda de llamadas, grabaciones y transcripciones',
    ],
    chooseOtherLabel: 'Elija Bria o MicroSIP si',
    chooseOther: [
      'Necesita 2talk en su iPhone o Android con notificaciones push fiables: eso es Bria o Groundwire',
      'Quiere una única aplicación que cubra también el móvil y no le importa pagar a 2talk por Bria',
      'Usa Windows y quiere un cliente gratuito y ligero hoy: eso es MicroSIP',
      'Quiere una aplicación que 2talk admita oficialmente y configure por usted',
    ],
    faqsHeading: 'Preguntas y respuestas',
    faqs: [
      {
        q: '¿Funciona WaveKat Voice con 2talk?',
        a: 'Sí. WaveKat Voice es un softphone SIP y 2talk está en su lista guiada de proveedores, así que elige 2talk, introduce su número 2talk y su contraseña SIP, y se registra, sin configuración SIP manual. Funciona en Mac y Linux, y cada llamada se graba y se transcribe automáticamente.',
      },
      {
        q: '¿Cuál es el mejor softphone para 2talk en Mac o Linux?',
        a: 'Si quiere un softphone de escritorio sin suscripción para 2talk que además grabe y transcriba cada llamada, WaveKat Voice está hecho para eso en Mac y Linux. La opción de pago propia de 2talk, Bria, cubre Windows y el móvil; MicroSIP es gratuito pero solo para Windows.',
      },
      {
        q: '¿Hay un softphone gratuito para 2talk en lugar de Bria?',
        a: 'Bria comprado a través de 2talk cuesta NZ$5.95 + GST al mes (a julio de 2026). Las opciones gratuitas son MicroSIP en Windows y WaveKat Voice en Mac y Linux, que es gratis durante su beta pública. Ambos se registran con su número 2talk por SIP.',
      },
      {
        q: '¿Puedo usar mi número 2talk en un Mac?',
        a: 'Sí. Cualquier softphone SIP puede registrar un número 2talk en un Mac, incluidas la aplicación Bria que revende 2talk y WaveKat Voice. WaveKat Voice añade grabación y transcripción automáticas de las llamadas y no cobra una cuota mensual durante la beta.',
      },
      {
        q: '¿Gestiona WaveKat Voice las notificaciones push de 2talk en mi teléfono?',
        a: 'No: WaveKat Voice es una aplicación de escritorio para Mac y Linux y no funciona en teléfonos, así que no puede entregar notificaciones push móviles. Para recibir llamadas de forma fiable en un iPhone o Android con 2talk, use Bria o Acrobits Groundwire. En el escritorio, WaveKat Voice permanece registrado y suena mientras la aplicación está abierta.',
      },
      {
        q: '¿Cómo configuro un softphone para 2talk?',
        a: 'En WaveKat Voice, añada una cuenta, elija 2talk en la lista de proveedores e introduzca su número 2talk y su contraseña SIP; los ajustes SIP se rellenan por usted. Para la mayoría de las cuentas de Nueva Zelanda, 2talk usa un único servidor SIP, sip.2talk.co.nz, para el dominio, el proxy y el proxy de salida; la nueva plataforma Lyra de 2talk usa sus propios ajustes, así que use los datos que le dé 2talk si su cuenta está en Lyra.',
      },
    ],
    whatWavekatDoesLabel: 'Qué hace WaveKat Voice',
  },
];
