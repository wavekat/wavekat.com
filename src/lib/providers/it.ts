import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Usa il tuo numero 2talk su Mac o Linux con un softphone senza abbonamento che registra e trascrive ogni chiamata.',
    seoTitle: 'Softphone 2talk per Mac e Linux',
    seoDescription:
      'Usa il tuo numero 2talk su Mac o Linux con WaveKat Voice, un softphone SIP senza abbonamento che registra e trascrive ogni chiamata. Alternativa gratuita a Bria.',
    heading: 'Il softphone senza abbonamento per 2talk su Mac e Linux',
    intro:
      'WaveKat Voice è un softphone da scrivania che si connette al tuo account 2talk tramite SIP e registra e trascrive automaticamente ogni chiamata. Gira su Mac e Linux, è gratuito durante la beta pubblica e non prevede alcun abbonamento mensile: è un modo per usare il tuo numero 2talk sul tuo computer senza pagare Bria.',
    setup: {
      heading: 'Come configurare un softphone per 2talk',
      summary:
        '2talk è presente nell’elenco guidato degli operatori di WaveKat Voice, quindi non devi modificare a mano i campi SIP: scegli 2talk e inserisci il tuo numero e la tua password.',
      steps: [
        'Scarica e apri WaveKat Voice sul tuo computer Mac o Linux.',
        'Aggiungi un account e scegli 2talk dall’elenco degli operatori.',
        'Inserisci il tuo numero di telefono 2talk e la relativa password SIP.',
        'WaveKat Voice si registra con 2talk e sei pronto a chiamare: ogni chiamata viene registrata e trascritta automaticamente.',
      ],
      note: 'Preferisci inserirli a mano? Per la maggior parte degli account neozelandesi, 2talk usa un unico server SIP — sip.2talk.co.nz — per il dominio, il proxy e il proxy in uscita. (La nuova piattaforma Lyra di 2talk usa impostazioni proprie.) Scegli 2talk in WaveKat Voice e li compila per te.',
    },
    comparisonHeading: 'Softphone per 2talk a confronto',
    columns: ['WaveKat Voice', 'Bria (tramite 2talk)', 'MicroSIP'],
    comparison: [
      {
        label: 'Prezzo',
        cells: [
          'Gratuito durante la beta pubblica; a pagamento in seguito.',
          'NZ$5.95 + GST al mese tramite 2talk (a luglio 2026), fino a 4 dispositivi.',
          'Gratuito e open source.',
        ],
      },
      {
        label: 'Piattaforme',
        cells: [
          'Mac e Linux oggi (Windows quando ci sarà richiesta).',
          'Windows, Mac, iOS e Android.',
          'Solo Windows.',
        ],
      },
      {
        label: 'Registra ogni chiamata',
        cells: [
          'Automatica: ogni chiamata viene registrata nel momento in cui riagganci.',
          'Manuale per ogni chiamata; la registrazione delle chiamate è un livello a pagamento.',
          'Registrazione manuale per ogni chiamata.',
        ],
      },
      {
        label: 'Trascrizione scritta',
        cells: [
          'Trascrizione in tempo reale, conservata insieme alla registrazione.',
          'Nessuna trascrizione.',
          'Nessuna trascrizione.',
        ],
      },
      {
        label: 'Cronologia chiamate ricercabile',
        cells: [
          'Chiamate, registrazioni e trascrizioni in un’unica cronologia ricercabile.',
          'Registro chiamate; registrazioni se sottoscrivi un abbonamento.',
          'Solo registro chiamate.',
        ],
      },
      {
        label: 'Configurazione di 2talk',
        cells: [
          'Scegli 2talk da un elenco; inserisci numero e password.',
          'Configurato da 2talk quando lo acquisti da loro.',
          'Inserisci da solo i campi SIP generici.',
        ],
      },
      {
        label: 'Mobile e notifiche push',
        cells: [
          'Solo desktop: nessuna app per telefono né push mobile.',
          'App iOS e Android con notifiche push.',
          'Nessuna app mobile (solo desktop Windows).',
        ],
      },
    ],
    whatItIs: {
      heading: 'Cosa ti offre 2talk per chiamare',
      summary:
        '2talk è un operatore VoIP neozelandese che ti fornisce un numero di telefono e credenziali SIP. Per le app, ti indirizza verso il suo softphone 2talk Connect e rivende Bria, un softphone a pagamento, a NZ$5.95 + GST al mese: e poiché il tuo account è SIP standard, anche qualsiasi softphone SIP può registrarsi.',
      strengths: [
        'Un numero di telefono neozelandese con supporto e fatturazione locali',
        'Bria copre iPhone, Android, Mac e Windows in un’unica app a pagamento',
        'Notifiche push mobili affidabili tramite Bria o Acrobits Groundwire',
        'Funziona con qualsiasi softphone SIP, non solo con le app consigliate da 2talk',
      ],
    },
    chooseHeading: 'Quale fa per te',
    chooseWavekatLabel: 'Scegli WaveKat Voice se',
    chooseWavekat: [
      'Usi un computer Mac o Linux e vuoi un vero softphone da scrivania per 2talk',
      'Vuoi che ogni chiamata 2talk venga registrata e trascritta automaticamente, senza nulla da attivare',
      'Preferisci non pagare un abbonamento mensile per chiamare dal tuo numero 2talk',
      'Vuoi un’unica cronologia ricercabile di chiamate, registrazioni e trascrizioni',
    ],
    chooseOtherLabel: 'Scegli Bria o MicroSIP se',
    chooseOther: [
      'Ti serve 2talk su iPhone o Android con notifiche push affidabili: sono Bria o Groundwire',
      'Vuoi un’unica app che copra anche il mobile e non ti dispiace pagare 2talk per Bria',
      'Usi Windows e vuoi un client gratuito e leggero già oggi: è MicroSIP',
      'Vuoi un’app che 2talk supporta ufficialmente e configura per te',
    ],
    faqsHeading: 'Domande e risposte',
    faqs: [
      {
        q: 'WaveKat Voice funziona con 2talk?',
        a: 'Sì. WaveKat Voice è un softphone SIP e 2talk è presente nel suo elenco guidato degli operatori, quindi scegli 2talk, inserisci il tuo numero 2talk e la password SIP, e si registra: nessuna configurazione SIP manuale. Funziona su Mac e Linux, e ogni chiamata viene registrata e trascritta automaticamente.',
      },
      {
        q: 'Qual è il miglior softphone per 2talk su Mac o Linux?',
        a: 'Se vuoi un softphone da scrivania senza abbonamento per 2talk che registra e trascrive anche ogni chiamata, WaveKat Voice è pensato proprio per questo su Mac e Linux. La scelta a pagamento di 2talk, Bria, copre Windows e il mobile; MicroSIP è gratuito ma solo per Windows.',
      },
      {
        q: 'Esiste un softphone gratuito per 2talk al posto di Bria?',
        a: 'Bria acquistato tramite 2talk costa NZ$5.95 + GST al mese (a luglio 2026). Le opzioni gratuite sono MicroSIP su Windows e WaveKat Voice su Mac e Linux, gratuito durante la sua beta pubblica. Entrambi si registrano con il tuo numero 2talk tramite SIP.',
      },
      {
        q: 'Posso usare il mio numero 2talk su un Mac?',
        a: 'Sì. Qualsiasi softphone SIP può registrare un numero 2talk su un Mac, inclusa l’app Bria rivenduta da 2talk e WaveKat Voice. WaveKat Voice aggiunge registrazione e trascrizione automatiche delle chiamate e non applica un canone mensile durante la beta.',
      },
      {
        q: 'WaveKat Voice gestisce le notifiche push di 2talk sul mio telefono?',
        a: 'No: WaveKat Voice è un’app desktop per Mac e Linux e non gira sui telefoni, quindi non può inviare notifiche push mobili. Per ricevere chiamate in modo affidabile su iPhone o Android con 2talk, usa Bria o Acrobits Groundwire. Sul desktop, WaveKat Voice resta registrato e squilla finché l’app è aperta.',
      },
      {
        q: 'Come configuro un softphone per 2talk?',
        a: 'In WaveKat Voice, aggiungi un account, scegli 2talk dall’elenco degli operatori e inserisci il tuo numero 2talk e la password SIP: le impostazioni SIP vengono compilate per te. Per la maggior parte degli account neozelandesi, 2talk usa un unico server SIP, sip.2talk.co.nz, per il dominio, il proxy e il proxy in uscita; la nuova piattaforma Lyra di 2talk usa impostazioni proprie, quindi se il tuo account è su Lyra usa i dati che ti fornisce 2talk.',
      },
    ],
    whatWavekatDoesLabel: 'Cosa fa WaveKat Voice',
  },
];
