import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'Il client SIP gratuito e open source. Completo e multipiattaforma: WaveKat Voice rinuncia all’ampiezza in favore di un telefono aziendale da scrivania mirato, che registra e trascrive ogni chiamata.',
    seoTitle: 'WaveKat Voice — un’alternativa a Linphone per Mac e Linux',
    seoDescription:
      'Come WaveKat Voice si confronta con Linphone su Mac e Linux: un telefono aziendale mirato che registra e trascrive automaticamente ogni chiamata, con configurazione guidata dell’operatore. Beta pubblica gratuita.',
    heading: 'Un’alternativa a Linphone per Mac e Linux',
    intro:
      'Linphone è un client SIP capace e gratuito che gira quasi ovunque. Se quello che vuoi davvero è un telefono aziendale da scrivania che registra e trascrive ogni chiamata — e che si configura senza dover compilare a mano i campi SIP — ecco come si confrontano i due su Mac e Linux.',
    whatItIs: {
      summary:
        'Linphone è un softphone SIP open source di lunga data, sviluppato da Belledonne Communications. Gira su Mac, Windows, Linux, iOS e Android e copre molto terreno — chiamate vocali e video, messaggistica istantanea e crittografia end-to-end — gratuitamente.',
      strengths: [
        'Gratuito e open source, senza bisogno di un account per usarlo',
        'Gira praticamente su ogni piattaforma, mobile incluso',
        'Voce, video e chat in un unico client',
        'Crittografia end-to-end (ZRTP/SRTP) per i più tecnici',
      ],
    },
    comparison: [
      {
        label: 'Registra ogni chiamata',
        wavekat: 'Automatica — ogni chiamata viene registrata e salvata nel momento in cui riagganci.',
        them: 'Registrazione manuale per ogni chiamata; per impostazione predefinita non c’è una cronologia salvata e consultabile.',
      },
      {
        label: 'Trascrizione scritta',
        wavekat: 'Trascrizione in tempo reale accanto alla chiamata, conservata insieme alla registrazione.',
        them: 'Nessuna trascrizione.',
      },
      {
        label: 'Cronologia chiamate ricercabile',
        wavekat: 'Ogni chiamata confluisce in un’unica cronologia con la sua registrazione e trascrizione.',
        them: 'Solo registro chiamate — senza registrazioni né trascrizioni allegate.',
      },
      {
        label: 'Configurare il tuo numero',
        wavekat: 'Scegli il tuo operatore da un elenco e le impostazioni vengono compilate per te.',
        them: 'Campi SIP generici che configuri da solo.',
      },
      {
        label: 'Dove vivono i tuoi dati',
        wavekat: 'Sul tuo computer per impostazione predefinita; accesso facoltativo per sincronizzare sul web.',
        them: 'Sul tuo dispositivo — è un client; nulla viene ospitato per te.',
      },
      {
        label: 'Piattaforme',
        wavekat: 'Mac e Linux oggi (Windows quando ci sarà richiesta).',
        them: 'Mac, Windows, Linux, iOS, Android.',
      },
      {
        label: 'Video e chat',
        wavekat: 'Focalizzato sulle chiamate — niente video né messaggistica.',
        them: 'Voce, video e messaggistica istantanea.',
      },
      {
        label: 'Prezzo',
        wavekat: 'Gratuito durante la beta pubblica; a pagamento in seguito.',
        them: 'Gratuito e open source.',
      },
    ],
    chooseThem: [
      'Vuoi un client gratuito e open source con il codice sorgente disponibile',
      'Ti serve la stessa app su Mac, Windows, Linux e mobile',
      'Vuoi videochiamate e chat nello stesso posto della voce',
      'Ti senti a tuo agio nel configurare da solo le impostazioni SIP',
    ],
    chooseWavekat: [
      'Vuoi che ogni chiamata venga registrata e trascritta automaticamente, senza nulla da attivare',
      'Vuoi un’unica cronologia ricercabile di chiamate, registrazioni e trascrizioni',
      'Preferisci scegliere il tuo operatore da un elenco piuttosto che compilare i campi SIP',
      'Vuoi un telefono aziendale da scrivania mirato, non un kit VoIP generico',
    ],
    faqs: [
      {
        q: 'WaveKat Voice può connettersi allo stesso operatore SIP di Linphone?',
        a: 'Sì. Entrambi sono softphone SIP, quindi qualsiasi operatore che funziona con Linphone funziona con WaveKat Voice. La differenza sta nella configurazione: WaveKat Voice compila le impostazioni per operatori comuni come Twilio, Telnyx e 2talk, e ti permette di inserire i dettagli a mano per qualunque altro.',
      },
      {
        q: 'Linphone registra e trascrive le chiamate come WaveKat Voice?',
        a: 'Linphone può registrare una singola chiamata quando la avvii manualmente, ma non trascrive le chiamate né conserva una cronologia consultabile di registrazioni e trascrizioni. WaveKat Voice registra ogni chiamata automaticamente, ne genera una trascrizione in tempo reale accanto e salva entrambe nella tua cronologia chiamate senza alcuna configurazione.',
      },
      {
        q: 'WaveKat Voice è open source come Linphone?',
        a: 'No — WaveKat Voice è un prodotto commerciale, gratuito durante la beta pubblica. Diversi dei componenti su cui si basa sono open source sul nostro GitHub, ma l’app Voice in sé non lo è.',
      },
    ],
  },
];
