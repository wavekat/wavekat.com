import type { TermsDoc } from '../terms';

// Italiano (forma di cortesia, come il resto del sito). Traduzione di ./en.ts —
// stessa struttura, stessi id di sezione, stesso ordine, così /it/terms/#recording
// funziona e le coppie hreflang restano reciproche.
export const terms: TermsDoc = {
  seoTitle: 'Termini di servizio — WaveKat',
  seoDescription:
    "L'accordo fra lei e WaveKat: per cosa può usare WaveKat Voice, perché non chiama i numeri di emergenza e chi risponde delle registrazioni.",
  h1: 'Termini di servizio',
  updatedPrefix: 'Ultimo aggiornamento:',
  lead: [
    "Questi termini sono l'accordo fra lei e WaveKat. Riguardano l'app WaveKat Voice, il suo account WaveKat e questo sito. Usare uno qualsiasi dei tre significa accettare quanto segue.",
    "Li abbiamo scritti come l'[informativa sulla privacy](/privacy/): in parole semplici, da chi costruisce il prodotto, comprese le parti scomode da dire. Se una frase non è chiara, ce lo scriva e correggeremo la frase.",
  ],
  highlightsLabel: 'Tre cose da sapere subito',
  highlights: [
    '**Con WaveKat Voice non si chiamano i numeri di emergenza.** È un software per telefonare, non una linea telefonica: una chiamata al 112, al 118 o al numero di emergenza locale può non partire o non arrivare nel posto giusto. Tenga sempre a portata un cellulare o una linea fissa che ci riesca.',
    '**La registrazione è una sua responsabilità, ed è attiva per impostazione predefinita.** Se può registrare, e se deve dirlo prima, dipende da dove siete lei e l\'altra persona. In alcuni Paesi sbagliare è un reato.',
    '**Questo è software in beta, fatto da un gruppo piccolissimo.** È fornito così com\'è, senza garanzia, e cambierà. Tenga copie sue di tutto ciò che non può permettersi di perdere.',
  ],
  onThisPage: 'In questa pagina',
  sections: [
    {
      id: 'acceptance',
      heading: 'Accettare questi termini',
      body: [
        {
          kind: 'p',
          text: "Lei accetta questi termini la prima volta che fa una di queste cose, quale che avvenga per prima: installare o usare WaveKat Voice, creare un account WaveKat, oppure usare una funzione a pagamento. L'app le chiede di accettare al primo avvio, e la pagina di accesso lo dice sopra il pulsante — ma usare WaveKat senza aver mai letto questa pagina non la mette comunque fuori dall'accordo.",
        },
        {
          kind: 'p',
          text: "Se accetta per conto di un'azienda, ci sta dicendo di avere il potere di impegnarla, e da qui in avanti «lei» significa quell'azienda.",
        },
        {
          kind: 'p',
          text: "L'[informativa sulla privacy](/privacy/) fa parte di questo accordo. Descrive che cosa raccoglie WaveKat e che cosa resta sul suo computer, e niente di quanto scritto qui la supera.",
        },
      ],
    },
    {
      id: 'who',
      heading: 'Chi può usare WaveKat',
      body: [
        {
          kind: 'p',
          text: 'Deve avere almeno 16 anni. WaveKat Voice è uno strumento di lavoro e non si rivolge ai minori.',
        },
        {
          kind: 'p',
          text: 'Deve inoltre trovarsi dove ci è consentito offrirlo. Se si trova in un Paese soggetto a sanzioni commerciali che riguardano software di questo tipo, o se compare in un elenco di soggetti sanzionati, non può usare WaveKat.',
        },
      ],
    },
    {
      id: 'account',
      heading: 'Il suo account WaveKat',
      body: [
        {
          kind: 'p',
          text: "Per usare WaveKat Voice non serve un account. Senza account l'app è del tutto locale e tutto quello che contiene resta sul suo computer.",
        },
        {
          kind: 'p',
          text: "Se invece ne crea uno, è suo e sta a lei custodirlo. L'accesso passa da GitHub, Google o Apple, quindi la password che protegge il suo account WaveKat è in realtà la loro: la tenga in ordine, insieme al secondo fattore. Ci scriva a [hello@wavekat.com](mailto:hello@wavekat.com) se pensa che ci sia entrato qualcun altro.",
        },
        {
          kind: 'p',
          text: "Una persona, un account. Non lo condivida con i colleghi e non usi quello di un altro. Se il suo team è composto da più persone, create più account.",
        },
        {
          kind: 'p',
          text: "Un account nuovo può dover essere approvato prima di poter fare qualsiasi cosa. Non è un giudizio su di lei: è un gruppo piccolo che guarda chi sta arrivando.",
        },
      ],
    },
    {
      id: 'plans',
      heading: 'Gratis e Pro',
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice si scarica gratis e si usa gratis. Alcune funzioni fanno parte del piano Pro; dove è così, l'app lo dice prima che ci arrivi, non dopo.",
        },
        {
          kind: 'p',
          text: "Un piano Pro dura un anno dal giorno in cui inizia. I prezzi sono mostrati prima del pagamento, nella valuta indicata, e le imposte si aggiungono dove la legge lo richiede. In futuro possiamo cambiare il prezzo, ma mai per un anno che lei ha già pagato.",
        },
        {
          kind: 'p',
          text: "Se Pro non è quello che si aspettava, ci scriva entro 14 giorni dal pagamento e le rimborsiamo. Dopo continueremo comunque ad ascoltarla: un rimborso fuori da quel termine dipende da noi, e «ha smesso di funzionare e non siamo riusciti a sistemarlo» è il caso in cui diciamo di sì. Dove il diritto dei consumatori del suo Paese le dà di più, vale la sua legge.",
        },
      ],
    },
    {
      id: 'licence',
      heading: "La sua licenza d'uso dell'app",
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice le viene concesso in licenza, non venduto. Può installarlo e usarlo sui computer che controlla, finché dura questo accordo, per il suo lavoro o per quello della sua azienda.",
        },
        {
          kind: 'p',
          text: 'Che cosa non comprende quella licenza:',
        },
        {
          kind: 'list',
          items: [
            "Vendere, noleggiare, concedere in sublicenza o ridistribuire l'app, né includerla in qualcosa che lei vende.",
            "Smontarla — decompilarla, disassemblarla o sottoporla a reverse engineering — se non nella misura in cui la legge del suo Paese glielo consente a prescindere da quanto scritto qui.",
            "Togliere il nome o i marchi WaveKat, o spacciarla per un suo prodotto.",
            "Aggirare i controlli che separano le funzioni gratuite da quelle Pro.",
          ],
        },
        {
          kind: 'p',
          text: "L'app, il sito e tutto ciò che contengono restano nostri. Le librerie open source WaveKat su cui l'app è costruita sono un'altra cosa: sono pubblicate su [GitHub](https://github.com/wavekat) con le loro licenze, e niente di quanto scritto qui limita ciò che lei può farne.",
        },
        {
          kind: 'p',
          text: "WaveKat Voice si aggiorna da solo, così le correzioni arrivano davvero alle persone. Dove è stato installato da uno store, se ne occupa lo store.",
        },
      ],
    },
    {
      id: 'acceptable',
      heading: 'Per cosa non può usare WaveKat',
      body: [
        {
          kind: 'p',
          text: "In breve: non usi WaveKat per fare a un'altra persona qualcosa che non vorrebbe fosse fatto a lei.",
        },
        {
          kind: 'list',
          items: [
            "**Chiamate non richieste.** Niente campagne di chiamate automatiche, niente teleselling a freddo, niente messaggi registrati a chi non ha chiesto di sentirla, e niente che violi un registro delle opposizioni.",
            "**Farsi passare per un altro.** Non invii un identificativo chiamante che non le spetta e non usi un flusso di chiamata per impersonare una persona o un'azienda.",
            "**Registrare qualcuno illegalmente.** Vedi la sezione qui sotto — è abbastanza seria da averne una tutta sua.",
            "**Qualsiasi cosa illegale, o volta a danneggiare qualcuno** — truffe, molestie, minacce, o aiutare altri a farlo.",
            "**Rompere il servizio di proposito** — attaccarlo, cercarne le falle senza avvisarci prima, o automatizzarlo in modo da peggiorarlo per gli altri.",
            "**Rivendere WaveKat come se fosse un suo servizio telefonico** senza un accordo scritto con noi.",
          ],
        },
        {
          kind: 'p',
          text: "Se trova una falla di sicurezza, la segnali a [hello@wavekat.com](mailto:hello@wavekat.com) prima che ad altri. Chi cerca in modo responsabile non ha nulla da temere da noi.",
        },
      ],
    },
    {
      id: 'phone',
      heading: 'Il suo servizio telefonico e le chiamate di emergenza',
      body: [
        {
          kind: 'p',
          text: "**Su WaveKat Voice non si può contare per chiamare i numeri di emergenza.** È software che parla con una linea telefonica che lei ha già. Non sa dove si trova, non può dire a un operatore di emergenza dove mandare i soccorsi, e una chiamata può non partire affatto se la sua connessione, il suo computer o il suo operatore hanno una giornata storta. Tenga un cellulare o una linea fissa che raggiunga i numeri di emergenza, e si assicuri che chiunque usi questo computer lo sappia.",
        },
        {
          kind: 'p',
          text: "Il servizio telefonico non è nostro. Lei porta il suo operatore SIP, ha un contratto suo con lui, ed è lui — non noi — a instradare le chiamate, fatturargliele e darle i numeri. Se le chiamate non partono, l'operatore è di solito il punto da cui cominciare.",
        },
        {
          kind: 'p',
          text: "Lei risponde di quanto le addebita il suo operatore, comprese le chiamate che un flusso di chiamata riceve o effettua mentre lei non sta guardando.",
        },
      ],
    },
    {
      id: 'recording',
      heading: 'Registrare, trascrivere e condividere le chiamate',
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice registra le chiamate, e la registrazione è attiva fin dall'installazione. Tutto viene registrato e trascritto sul suo computer.",
        },
        {
          kind: 'p',
          text: "**Se lei possa farlo lo decide la legge del posto in cui siete lei e l'altra persona, ed è una sua responsabilità, non nostra.** In alcuni luoghi basta il suo consenso. In altri devono essere d'accordo tutti i partecipanti, e in qualche Paese sbagliare è un reato penale e non una questione civile. L'app riproduce un segnale acustico all'inizio di una chiamata registrata, per correttezza; un segnale acustico non è un consenso.",
        },
        {
          kind: 'p',
          text: "Se non è sicuro: dica che sta registrando, oppure disattivi la registrazione nelle Impostazioni. Entrambe le cose richiedono un attimo e nessuna delle due si recupera dopo.",
        },
        {
          kind: 'p',
          text: "Lo stesso vale per ciò che fa dopo con una registrazione — condividerla con un link, mandarla a un servizio che ha collegato, o conservarla. Se una registrazione contiene dati personali di un'altra persona, è lei a risponderne secondo la normativa sulla privacy, e noi li trattiamo per suo conto.",
        },
      ],
    },
    {
      id: 'content',
      heading: 'Le sue chiamate restano sue',
      body: [
        {
          kind: 'p',
          text: 'Le sue registrazioni, trascrizioni, rubriche, flussi di chiamata e note sono suoi. Non ne rivendichiamo la proprietà e non li usiamo per addestrare modelli.',
        },
        {
          kind: 'p',
          text: "Se attiva la sincronizzazione nel cloud, ci autorizza a conservare e spostare quel contenuto per un solo scopo: far funzionare il servizio per lei — sincronizzarlo fra i suoi dispositivi, mostrarglielo sul sito e servire una registrazione a chi ha ricevuto da lei un link. Quell'autorizzazione finisce quando cancella il contenuto o l'account.",
        },
        {
          kind: 'p',
          text: "Possiamo rimuovere contenuti o sospendere un account se siamo costretti — un ordine dell'autorità, oppure contenuti che violano la sezione qui sopra. Glielo diremo quando accade, a meno che non ci sia vietato.",
        },
      ],
    },
    {
      id: 'connected',
      heading: 'I servizi che collega',
      body: [
        {
          kind: 'p',
          text: 'Può collegare WaveKat ad altri servizi: un CRM, un suo webhook, un assistente IA sul suo computer. Niente è collegato se non lo collega lei.',
        },
        {
          kind: 'p',
          text: "Una volta fatto, ciò che quel servizio fa con quanto riceve è regolato dal suo accordo con loro, non da questo. Se un collegamento manda una trascrizione da qualche parte, quella trascrizione esce dalle nostre mani, e scollegare ferma il flusso ma non recupera ciò che è già partito.",
        },
      ],
    },
    {
      id: 'availability',
      heading: 'Cambiamenti, e che cosa non promettiamo sulla disponibilità',
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice è in beta pubblica. Le funzioni arrivano, cambiano forma e ogni tanto se ne vanno. Facciamo del nostro meglio per non rompere ciò su cui lei conta, e lo diciamo nella [pagina delle novità](/voice/changelog/) quando cambia qualcosa che si vede.",
        },
        {
          kind: 'p',
          text: "La parte cloud di WaveKat non ha garanzia di disponibilità. Nessun accordo sui livelli di servizio, nessun indennizzo, nessuna promessa che la sincronizzazione sia raggiungibile in un dato momento. È una scelta di progetto: conta meno di quanto sembri, perché l'app continua a funzionare sul suo computer anche quando i nostri server non funzionano.",
        },
        {
          kind: 'p',
          text: "Se un giorno chiudessimo il servizio, glielo diremmo con un preavviso ragionevole e le daremmo un modo per portarsi via i suoi dati.",
        },
      ],
    },
    {
      id: 'warranty',
      heading: 'Nessuna garanzia',
      body: [
        {
          kind: 'p',
          text: "WaveKat è fornito «così com'è» e «come disponibile». Non promettiamo che funzioni senza interruzioni o senza errori, né che sia adatto a uno scopo particolare, e non promettiamo che una chiamata parta, che una registrazione venga fatta o che una trascrizione sia esatta.",
        },
        {
          kind: 'p',
          text: "Il riconoscimento vocale sbaglia, soprattutto con accenti, persone che parlano insieme e linee scadenti. Non tratti una trascrizione come il verbale di ciò che è stato detto se da questo dipende qualcosa di importante.",
        },
        {
          kind: 'p',
          text: "Alcuni Paesi danno ai consumatori garanzie che non si possono escludere — il Codice del consumo italiano, le regole europee e britanniche, il Consumer Guarantees Act neozelandese e i loro equivalenti. Niente di quanto scritto qui glieli toglie. Dove li ha, valgono sopra questa sezione e prevalgono.",
        },
      ],
    },
    {
      id: 'liability',
      heading: 'Limiti della nostra responsabilità',
      body: [
        {
          kind: 'p',
          text: "Nei limiti consentiti dalla legge, WaveKat non risponde dei danni indiretti o consequenziali — affari persi, mancato guadagno, dati persi, una chiamata che non è partita o una registrazione che le serviva e non ha ottenuto.",
        },
        {
          kind: 'p',
          text: "Dove invece rispondiamo, la nostra responsabilità complessiva verso di lei per tutto quanto derivi da questo accordo è limitata a quanto ci ha pagato nei dodici mesi precedenti il fatto di cui si lamenta — e, se non ci ha mai pagato nulla, a 100 NZD.",
        },
        {
          kind: 'p',
          text: "Niente di tutto questo limita una responsabilità che per legge non si può limitare: il nostro dolo, la morte o le lesioni personali che avessimo causato, o una garanzia al consumatore che non può essere esclusa.",
        },
        {
          kind: 'p',
          text: "Se il suo uso di WaveKat porta qualcun altro a chiederci conto di qualcosa — una chiamata che ha fatto, una persona che ha registrato, un contenuto che ha condiviso — sarà lei a coprire quello che ci costa.",
        },
      ],
    },
    {
      id: 'ending',
      heading: "Chiudere l'accordo",
      body: [
        {
          kind: 'p',
          text: "Può smettere quando vuole: disinstalli l'app, oppure cancelli l'account dalle Impostazioni, dove prima di confermare le viene mostrato che cosa contiene. Può anche scriverci e lo facciamo noi.",
        },
        {
          kind: 'p',
          text: "Possiamo sospendere o chiudere un account che viola questi termini, o quando la legge ce lo impone. Salvo urgenza o ordine dell'autorità, prima le diremo qual è il problema e le daremo modo di sistemarlo.",
        },
        {
          kind: 'p',
          text: "Quando l'accordo finisce, finisce con esso la sua licenza d'uso dell'app e cancelliamo ciò che era sincronizzato con l'account. Tutto quello che si trova sul suo computer resta lì finché non lo toglie lei. Le sezioni su chi possiede i suoi contenuti, sull'assenza di garanzia, sulla nostra responsabilità e sulla legge applicabile continuano a valere anche dopo.",
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Modifiche a questi termini',
      body: [
        {
          kind: 'p',
          text: "Quando questi termini cambiano, cambia con loro la data in alto. Per una modifica che tocca davvero i suoi diritti o ciò che sta accettando, glielo diremo prima che abbia effetto — nell'app, o via e-mail se ha un account — invece di riscrivere una frase in silenzio.",
        },
        {
          kind: 'p',
          text: "Se non accetta una modifica, smetta di usare WaveKat e cancelli l'account prima che abbia effetto. Continuare a usarlo dopo è il modo di accettarla.",
        },
      ],
    },
    {
      id: 'law',
      heading: 'Legge applicabile e controversie',
      body: [
        {
          kind: 'p',
          text: "Questo accordo è regolato dalla legge della Nuova Zelanda, e sulle controversie che lo riguardano decidono i tribunali neozelandesi. Se lei è un consumatore altrove, questo non le toglie la protezione della legge del suo Paese né il diritto di agire dove vive.",
        },
        {
          kind: 'p',
          text: "Prima che qualcuno si avvicini a un tribunale, scriva a [hello@wavekat.com](mailto:hello@wavekat.com). Lo legge una persona vera, e quasi tutto costa meno risolverlo così.",
        },
        {
          kind: 'p',
          text: "Questi termini e l'informativa sulla privacy sono l'intero accordo fra noi su WaveKat. Se un giudice decide che una parte non regge, il resto regge lo stesso. Se non facciamo valere subito qualcosa, non significa che vi rinunciamo.",
        },
      ],
    },
  ],
  faqHeading: 'Domande e risposte',
  faqs: [
    {
      q: 'Devo accettare qualcosa per usare WaveKat Voice?',
      a: "Sì. WaveKat Voice le chiede di accettare questi termini e di prendere atto dell'informativa sulla privacy al primo avvio, prima di configurare qualsiasi cosa. Un account WaveKat non serve — senza account l'app funziona interamente sul suo computer — ma accettare l'accordo sì.",
    },
    {
      q: 'WaveKat Voice può chiamare il 112 o altri numeri di emergenza?',
      a: "No. Dia per scontato che non raggiunga i numeri di emergenza. È software sul suo computer, non conosce il suo indirizzo, e una chiamata di emergenza può fallire o arrivare nel posto sbagliato. Tenga sempre a portata un cellulare o una linea fissa che ci riesca, e si assicuri che lo sappia chiunque altro usi il computer.",
    },
    {
      q: 'È legale che io registri le mie chiamate con WaveKat Voice?',
      a: "Dipende da dove si trova lei e da dove si trova la persona che chiama, ed è una sua responsabilità, non nostra. In alcuni luoghi basta il suo consenso; in altri devono essere d'accordo tutti, e sbagliare può essere un reato. Se non è sicuro, dica che sta registrando, oppure disattivi la registrazione nelle Impostazioni.",
    },
    {
      q: 'WaveKat è proprietaria delle mie registrazioni o le usa per addestrare modelli?',
      a: "No a entrambe. Le sue registrazioni, trascrizioni, rubriche e flussi di chiamata sono suoi. Se attiva la sincronizzazione nel cloud ci autorizza a conservarli e spostarli perché il servizio funzioni, e quell'autorizzazione finisce quando cancella il contenuto o l'account.",
    },
    {
      q: 'Posso avere il rimborso di un piano Pro?',
      a: "Sì — scriva a hello@wavekat.com entro 14 giorni dal pagamento e le rimborsiamo. Dopo dipende da noi, e «ha smesso di funzionare e non siamo riusciti a sistemarlo» è il caso in cui diciamo di sì. Dove il diritto dei consumatori del suo Paese le dà di più, vale la sua legge.",
    },
    {
      q: 'Che fine fanno i miei dati se smetto di usare WaveKat?',
      a: "Cancelli l'account dalle Impostazioni e cancelliamo ciò che vi era sincronizzato; prima di confermare l'app le mostra che cosa contiene l'account. Quello che è sul suo computer resta lì finché non lo toglie, e lo può fare dalla stessa schermata.",
    },
  ],
  contactHeading: 'Contatti',
  contactIntro:
    'Se qualcosa in questa pagina non è chiaro, o pensa che una clausola sia sbagliata, ci scriva: le risponderà una persona.',
};
