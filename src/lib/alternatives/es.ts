import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'El cliente SIP gratuito y de código abierto. Capaz y multiplataforma: WaveKat Voice cambia amplitud por un teléfono de empresa de escritorio enfocado, que graba y transcribe cada llamada.',
    seoTitle: 'WaveKat Voice — alternativa a Linphone (Mac/Linux)',
    seoDescription:
      'Cómo se compara WaveKat Voice con Linphone en Mac y Linux: un teléfono de empresa que graba y transcribe cada llamada, con configuración guiada.',
    heading: 'Una alternativa a Linphone para Mac y Linux',
    intro:
      'Linphone es un cliente SIP capaz y gratuito que funciona en casi cualquier plataforma. Si lo que realmente busca es un teléfono de empresa de escritorio que grabe y transcriba cada llamada — y que se configure sin editar a mano los campos SIP —, así es como se comparan ambos en Mac y Linux.',
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
        label: 'Configurar su número',
        wavekat: 'Elija su proveedor de una lista y los ajustes se rellenan por usted.',
        them: 'Campos SIP de uso general que configura usted mismo.',
      },
      {
        label: 'Dónde residen sus datos',
        wavekat: 'En su computadora de forma predeterminada; inicio de sesión opcional para sincronizar con la web.',
        them: 'En su dispositivo: es un cliente; no se aloja nada por usted.',
      },
      {
        label: 'Plataformas',
        wavekat: 'Mac, Windows y Linux.',
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
      'Quiere un teléfono de empresa de escritorio enfocado, no un kit de herramientas VoIP de uso general',
    ],
    faqs: [
      {
        q: '¿Puede WaveKat Voice conectarse al mismo proveedor SIP que Linphone?',
        a: 'Sí. Ambos son softphones SIP, así que cualquier proveedor que funcione con Linphone funciona con WaveKat Voice. La diferencia está en la configuración: WaveKat Voice rellena los ajustes para proveedores habituales como Twilio, Telnyx y 2talk, y le permite introducir los datos usted mismo para cualquier otro.',
      },
      {
        q: '¿Linphone graba y transcribe las llamadas como WaveKat Voice?',
        a: 'Linphone puede grabar una llamada concreta cuando la inicia manualmente, pero no transcribe las llamadas ni conserva un historial navegable de grabaciones y transcripciones. WaveKat Voice graba cada llamada automáticamente, escribe una transcripción en vivo junto a ella y guarda ambas en su historial de llamadas sin ninguna configuración.',
      },
      {
        q: '¿Es WaveKat Voice de código abierto como Linphone?',
        a: 'No: WaveKat Voice es un producto comercial, gratuito durante la beta pública. Varios de los componentes que tiene por debajo son de código abierto en nuestro GitHub, pero la propia aplicación Voice no lo es.',
      },
    ],
  },
];
