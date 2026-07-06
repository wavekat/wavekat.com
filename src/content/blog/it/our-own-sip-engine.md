---
title: "Perché WaveKat Voice gira su un motore SIP tutto suo"
description: "WaveKat Voice ora gira su wavekat-sip, il nostro motore SIP/RTP open source scritto da zero — nessuno stack SIP di terze parti, e nessuna scatola nera tra te e le tue chiamate."
date: 2026-07-06
author: Eason Guo
tags: [voice-ai, ingegneria, open-source, SIP]
lang: "it"
---

WaveKat Voice — il softphone per Mac e Linux che [registra e trascrive ogni chiamata](/it/voice/) — ora gira su un motore SIP che abbiamo scritto da zero. [`wavekat-sip`](https://github.com/wavekat/wavekat-sip) è un crate Rust open source che gestisce da solo il segnalamento telefonico e il trasporto audio, senza alcuno stack SIP di terze parti al di sotto. Ogni chiamata che fai o ricevi, ogni attesa e ogni trasferimento, ora passa attraverso codice che controlliamo da un capo all'altro.

È un altro passo verso ciò a cui torniamo sempre: [dare a ogni piccola attività la voce di una grande](/it/blog/hello-world/). Un grande sistema telefonico è affidabile perché chi lo gestisce controlla ogni suo strato. Possedere il motore SIP significa che siamo noi a controllare lo strato su cui la tua chiamata viaggia davvero — così quando qualcosa deve essere più affidabile, o una funzione deve uscire, non c'è nessuna scatola nera di mezzo.

## Cos'è SIP, e perché è la parte difficile

SIP (Session Initiation Protocol) è la lingua che i telefoni parlano per impostare una chiamata — per registrare la tua linea presso l'operatore, far squillare l'altra parte, negoziare quale codec audio usare e chiudere la chiamata in modo pulito alla fine. RTP è ciò che trasporta l'audio vero e proprio una volta che la chiamata è attiva. Basta sbagliare SIP di poco e le chiamate cadono, si sente l'audio in una sola direzione, oppure una linea smette in silenzio di ricevere chiamate. È il nocciolo poco appariscente ma esigente su cui poggia tutto il resto di un softphone.

Fino a poco tempo fa, WaveKat Voice gestiva le sue chiamate attraverso una libreria SIP di terze parti. Ci ha permesso di telefonare in fretta, il che era la scelta giusta all'inizio. Ma uno stack preso in prestito decide al posto tuo come una chiamata viene modellata, come emergono gli errori e quali funzioni sono addirittura raggiungibili — e nel momento in cui abbiamo iniziato a costruire cose come il trasferimento di chiamata e l'audio HD, stavamo lavorando aggirando la sua forma invece che assecondandola.

## Perché ne abbiamo costruito uno nostro

Abbiamo riscritto il motore SIP di WaveKat Voice da zero, sotto il nome di `wavekat-sip`, per tre ragioni molto semplici:

- **Controllo.** Funzioni come mettere in attesa chi chiama, [trasferire una chiamata](/it/blog/hold-switch-and-transfer-calls/) e mantenere viva una chiamata lunga con i session timer vivono tutte allo strato SIP. Possedere quello strato significa che le aggiungiamo direttamente, invece di piegare il modello di qualcun altro per farcele stare.
- **Ingombro.** WaveKat Voice è un'app desktop leggera, pensata per starsene tranquilla senza intralciarti. Un motore mirato e costruito su misura la mantiene piccola — porta con sé solo il SIP e l'RTP che usa davvero, non tutto il resto di uno stack generico.
- **Nessuna scatola nera.** Quando una chiamata si comporta male, possiamo leggere e correggere ogni riga tra il pulsante che hai premuto e il pacchetto sul filo. Nulla di come funzionano le tue chiamate ci è precluso.

## Di cosa si occupa il motore

`wavekat-sip` si occupa delle questioni a livello di filo e resta fuori dallo strato dei dispositivi audio e da quello dell'orchestrazione delle chiamate, così rimane piccolo e integrabile:

| Ambito | Cosa fa |
|------|-------------|
| **Registrazione** | Registra la tua linea presso l'operatore (autenticazione digest) e la mantiene attiva, così le chiamate in arrivo ti raggiungono sempre. |
| **Chiamate** | Effettua chiamate in uscita e risponde a quelle in arrivo, e avvisa chi chiama con un vero segnale di squillo prima che tu risponda. |
| **Controllo durante la chiamata** | Attesa e ripresa (SIP re-INVITE, RFC 3264), trasferimento cieco e assistito (SIP REFER, RFC 3515) e DTMF (toni del tastierino) per i menu telefonici. |
| **Qualità audio** | Negozia il [codec Opus](/it/voice/) per la voce «HD» a banda larga, con ripiego automatico allo standard G.711 quando l'altra parte non lo supporta. |
| **Affidabilità** | I session timer RFC 4028 impediscono che le chiamate lunghe vengano fatte cadere in silenzio dalla rete a metà. |

## È open source — come il resto di WaveKat

`wavekat-sip` non è un componente interno privato. È pubblicato su [crates.io](https://crates.io/crates/wavekat-sip) sotto licenza Apache-2.0, con la documentazione su [docs.rs](https://docs.rs/wavekat-sip), esattamente come i nostri crate di [rilevamento dell'attività vocale](https://github.com/wavekat/wavekat-vad) e [rilevamento del turno](https://github.com/wavekat/wavekat-turn). Chiunque costruisca un softphone, un voice bot o un ponte di registrazione delle chiamate in Rust può usare lo stesso identico motore su cui gira WaveKat Voice. Costruire allo scoperto è il nostro modo di lavorare — gli strumenti sotto il nostro prodotto sono lì perché tu li ispezioni e li riusi, non un fossato difensivo.

È onesto dire che è agli inizi: il crate è in sviluppo attivo e la sua API cambia ancora tra una versione e l'altra. Ma è il motore vero dietro un prodotto vero, non una demo.

## Domande frequenti

### Cos'è wavekat-sip?

`wavekat-sip` è il crate Rust open source di WaveKat per il segnalamento SIP e il trasporto audio RTP. È il motore dietro ogni chiamata che WaveKat Voice fa o riceve, senza alcuno stack SIP di terze parti al di sotto.

### wavekat-sip è open source, e posso usarlo nel mio progetto?

Sì. `wavekat-sip` è pubblicato su [crates.io](https://crates.io/crates/wavekat-sip) sotto licenza Apache-2.0, con la documentazione su [docs.rs](https://docs.rs/wavekat-sip). Chiunque costruisca un softphone, un voice bot o un ponte di registrazione delle chiamate in Rust può usare lo stesso motore su cui gira WaveKat Voice.

### WaveKat Voice supporta l'audio HD?

Sì. WaveKat Voice negozia il codec Opus per la voce «HD» a banda larga, e ripiega automaticamente sullo standard G.711 quando l'altra parte della chiamata non supporta Opus.

### WaveKat Voice funziona con qualsiasi operatore SIP?

Sì. `wavekat-sip` gestisce la registrazione SIP standard con autenticazione digest, quindi funziona con qualsiasi operatore o centralino conforme a SIP — l'account che hai già, senza configurazione specifica dell'operatore.

### wavekat-sip è pronto per la produzione?

È il motore vero dietro un prodotto vero, quindi è già in uso quotidiano — ma è agli inizi. Il crate è in sviluppo attivo e la sua API cambia ancora tra una versione e l'altra, perciò se ci costruisci sopra oggi conviene fissare una versione.

## Cosa significa questo per le tue chiamate

Nella maggior parte dei casi, le chiamate di WaveKat Voice non ti sembreranno diverse — ed è proprio questo il punto. Si connettono e suonano come devono. Ciò che cambia è dietro le quinte: le funzioni che fanno sembrare WaveKat Voice una vera reception — attesa, avviso di chiamata, trasferimento, audio HD — ora escono secondo i nostri tempi invece che secondo quelli di una dipendenza, e quando qualcosa deve essere più solido, possiamo andare dritti al codice che lo fa girare.

WaveKat Voice è [gratuito durante la beta pubblica](/it/voice/download/) su Mac e Linux. Collega l'operatore telefonico che hai già, e la tua prossima chiamata girerà su un motore che abbiamo costruito noi stessi — e regalato.
