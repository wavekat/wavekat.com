import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'Il client SIP gratuito e open source. Completo e multipiattaforma: WaveKat Voice rinuncia all’ampiezza in favore di un telefono aziendale da scrivania mirato, che registra ogni chiamata, risponde a quelle che perdi e le annota nel tuo CRM.',
    seoTitle: 'Alternativa a Linphone per Mac, Windows e Linux',
    seoDescription:
      'WaveKat Voice contro Linphone su Mac, Windows e Linux: un softphone SIP che registra e trascrive ogni chiamata, risponde a quelle perse e le salva in HubSpot.',
    heading: 'Un’alternativa a Linphone per Mac, Windows e Linux',
    intro:
      'WaveKat Voice è un telefono aziendale da scrivania per Mac, Windows e Linux che può sostituire Linphone: si collega al tuo numero via SIP nello stesso modo, ma registra ogni chiamata automaticamente, la trascrive in diretta e raccoglie tutto in un’unica cronologia ricercabile. Alle chiamate che non riesci a prendere risponde un flusso di chiamata, con messaggio di benvenuto e segreteria, e ogni chiamata può finire nel tuo CRM HubSpot. Linphone, invece, è un client SIP gratuito, open source e generico che gira quasi ovunque. Se quello che vuoi è un telefono aziendale pronto all’uso e non un kit VoIP, ecco come si confrontano i due.',
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
        label: 'Rispondere alle chiamate e segreteria',
        wavekat:
          'Un flusso di chiamata risponde per te — benvenuto, orari, menu telefonico, segreteria o trasferimento — e puoi prendere la chiamata mentre lasciano il messaggio.',
        them: 'Nessuna segreteria propria; la segreteria è quella del tuo operatore, che Linphone può chiamare.',
      },
      {
        label: 'Registrare le chiamate nel CRM',
        wavekat:
          'Colleghi HubSpot una volta e ogni chiamata si archivia da sola sul contatto corrispondente, con trascrizione e registrazione riproducibile. Fa parte di Pro, gratis nell’accesso anticipato.',
        them: 'Nessuna integrazione CRM; le chiamate restano nel registro dell’app.',
      },
      {
        label: 'Configurare il tuo numero',
        wavekat: 'Scegli il tuo operatore da un elenco (Twilio, Telnyx, 2talk e altri) e le impostazioni vengono compilate per te.',
        them: 'Campi SIP generici che configuri da solo.',
      },
      {
        label: 'Dove vivono i tuoi dati',
        wavekat: 'Sul tuo computer per impostazione predefinita; accesso facoltativo per sincronizzare sul web.',
        them: 'Sul tuo dispositivo — è un client; nulla viene ospitato per te.',
      },
      {
        label: 'Piattaforme',
        wavekat: 'Mac, Windows e Linux (la versione Windows è distribuita tramite Microsoft Store).',
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
      'Ti serve su telefono o tablet la stessa app che hai sul computer',
      'Vuoi videochiamate e chat nello stesso posto della voce',
      'Ti senti a tuo agio nel configurare da solo le impostazioni SIP',
    ],
    chooseWavekat: [
      'Vuoi che ogni chiamata venga registrata e trascritta automaticamente, senza nulla da attivare',
      'Vuoi un’unica cronologia ricercabile di chiamate, registrazioni e trascrizioni',
      'Preferisci scegliere il tuo operatore da un elenco piuttosto che compilare i campi SIP',
      'Vuoi che alle chiamate che non riesci a prendere risponda qualcuno — benvenuto, orari e una segreteria che trascrive il messaggio',
      'Vuoi che ogni chiamata finisca nel tuo CRM HubSpot senza che nessuno debba annotarla',
      'Vuoi un telefono aziendale da scrivania mirato, non un kit VoIP generico',
    ],
    faqs: [
      {
        q: 'WaveKat Voice può connettersi allo stesso operatore SIP di Linphone?',
        a: 'Sì. Entrambi sono softphone SIP, quindi qualsiasi operatore che funziona con Linphone funziona con WaveKat Voice. La differenza sta nella configurazione: WaveKat Voice compila le impostazioni per operatori comuni come Twilio, Telnyx e 2talk, e ti permette di inserire i dettagli a mano per qualunque altro.',
      },
      {
        q: 'WaveKat Voice funziona su Windows?',
        a: 'Sì. WaveKat Voice è su Microsoft Store per Windows 10 e 11 — una sola scheda che contiene sia il pacchetto Intel/AMD (x64) sia quello ARM64 — oltre alle versioni per Mac e Linux. Ci sono anche installer .exe diretti; quelli non sono ancora firmati, quindi al primo avvio Windows segnala un editore sconosciuto, mentre il pacchetto dello Store è firmato da Microsoft. Anche Linphone ha una versione per Windows.',
      },
      {
        q: 'Linphone registra e trascrive le chiamate come WaveKat Voice?',
        a: 'Linphone può registrare una singola chiamata quando la avvii manualmente, ma non trascrive le chiamate né conserva una cronologia consultabile di registrazioni e trascrizioni. WaveKat Voice registra ogni chiamata automaticamente, ne genera una trascrizione in tempo reale accanto e salva entrambe nella tua cronologia chiamate senza alcuna configurazione.',
      },
      {
        q: 'WaveKat Voice ha la segreteria, o risponde alle chiamate quando non posso?',
        a: 'Sì: è proprio quello che fa un flusso di chiamata. Punta un flusso su una delle tue linee e WaveKat Voice risponde con un messaggio di benvenuto, controlla i tuoi orari, propone un menu telefonico, registra un messaggio o trasferisce la chiamata. I messaggi vengono registrati e trascritti come qualsiasi altra chiamata, e puoi prendere la chiamata mentre qualcuno lo sta lasciando. Benvenuto, registrazione del messaggio e squillo verso di te sono gratis; menu telefonici, orari e trasferimenti fanno parte di Pro — gratis per un anno nell’accesso anticipato. Il flusso gira sul tuo computer, quindi l’app deve essere in esecuzione per rispondere. Linphone non ha una segreteria propria: lì dipende dalla casella vocale del tuo operatore.',
      },
      {
        q: 'WaveKat Voice può registrare le chiamate in HubSpot?',
        a: 'Sì. Colleghi il tuo account HubSpot una volta e ogni chiamata che ricevi o effettui si archivia da sola sul contatto con il numero corrispondente, con ora, direzione, esito, durata, trascrizione e una registrazione che ascolti dentro HubSpot. È una funzione Pro, gratuita nell’accesso anticipato, e i webhook coprono qualsiasi altro CRM. Linphone non ha integrazioni CRM.',
      },
      {
        q: 'WaveKat Voice è disponibile in italiano?',
        a: 'Sì. L’app è disponibile in nove lingue — italiano, inglese, cinese semplificato e tradizionale, giapponese, coreano, tedesco, spagnolo e francese — e la cambi dalle impostazioni.',
      },
      {
        q: 'WaveKat Voice è open source come Linphone?',
        a: 'No — WaveKat Voice è un prodotto commerciale, gratuito durante la beta pubblica. Diversi dei componenti su cui si basa sono open source sul nostro GitHub, ma l’app Voice in sé non lo è.',
      },
    ],
  },
];
