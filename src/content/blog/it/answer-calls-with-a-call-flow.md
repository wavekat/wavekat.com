---
title: "Flussi di chiamata: un centralino automatico"
description: "WaveKat Voice risponde alle chiamate in arrivo con un flusso: un centralino automatico con saluto, menu telefonico e segreteria. Lo segui in diretta."
date: 2026-07-25
author: Eason Guo
tags: [voice-ai, chiamate]
lang: "it"
---

[WaveKat Voice](/it/voice/) — il softphone SIP per Mac e Linux che registra e trascrive ogni chiamata — ora può rispondere al posto tuo. A rispondere è un **flusso di chiamata**: saluta chi chiama, controlla se sei aperto, propone un menu, ti fa squillare, registra un messaggio oppure trasferisce la chiamata. Il flusso si costruisce sul web, si assegna a una delle tue linee e da quel momento anche le chiamate che non riesci a prendere ricevono una risposta. Arriva con la versione [0.0.43](/it/voice/changelog/#0.0.43).

È il passo più grande finora verso ciò a cui torniamo sempre: [dare a ogni piccola attività la voce di una grande](/it/blog/hello-world/). Un'azienda grande risponde a tutte le chiamate: ha una reception, un menu telefonico costruito da un consulente, un servizio per il fuori orario. Un negozio di tre persone ha un telefono che squilla finché qualcuno riesce ad asciugarsi le mani, e chi si stanca e riattacca è una prenotazione che non è mai esistita. I flussi di chiamata colmano quella distanza, e girano sul computer che è già sulla tua scrivania.

## Che cos'è un flusso di chiamata

Un flusso di chiamata in WaveKat Voice è un breve elenco di passi che una chiamata in arrivo attraversa uno alla volta. È esattamente ciò che gli altri sistemi telefonici vendono come **centralino automatico**: il saluto e il menu «premi 1 per prenotare» che risponde quando tu non puoi. Solo che qui sta dentro il softphone che già usi, invece che in una piattaforma a parte pagata per postazione. Ogni passo è un mattoncino con un solo compito:

| Passo | Che cosa vive chi chiama |
|---|---|
| **Saluto** | Sente il tuo messaggio di benvenuto registrato: «Grazie per aver chiamato». |
| **Orari** | Nulla di visibile: il flusso confronta gli orari settimanali e i giorni di chiusura e, quando sei chiuso, prende un'altra strada. |
| **Menu** | «Per prenotare digita 1, per gli orari digita 2.» Il tasto premuto sceglie il passo successivo. |
| **Ti fa squillare** | Il telefono squilla come sempre. Se rispondi, il flusso si fa da parte. |
| **Registra un messaggio** | Un annuncio, un segnale acustico e poi il messaggio — registrato e trascritto come ogni altra chiamata. |
| **Trasferisce la chiamata** | Chi chiama viene messo in comunicazione con un altro numero. |
| **Chiude la chiamata** | Sente un saluto finale e la chiamata termina. |

Non c'è nessun albero di menu da disegnare da zero e niente da programmare. Si parte da un modello — una galleria di flussi già pronti, con quelli nella tua lingua per primi, che copi nel tuo account — e si cambiano le parole. C'è anche un flusso vuoto, se preferisci costruirlo da solo.

![WaveKat Voice su Ubuntu — la pagina di un flusso di chiamata con la sua mappa: un saluto, un controllo degli orari che si divide in «aperto» e «chiuso», uno squillo a te e la segreteria.](/screenshots/flow-detail/it.webp)

L'app disegna il flusso come una mappa, così «che cosa succede quando qualcuno chiama» diventa un'immagine da indicare con il dito, non un elenco di regole da tenere a mente.

## Si costruisce sul web, gira sul tuo computer

I flussi si modificano su [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows), con lo stesso account WaveKat che usa l'app. Scegli un modello, copialo nella tua libreria e modificalo: scrivi che cosa deve sentire chi chiama a ogni passo, imposta gli orari di apertura e decidi quanto squilla il telefono prima che il flusso registri un messaggio.

![L'editor dei flussi di chiamata WaveKat sul web — la mappa del flusso accanto al dettaglio del passo, con il testo del saluto, la voce con cui è stato generato e un pulsante per rigenerarlo.](/screenshots/flow-editor/it.webp#shadow)

Non devi registrare nulla. Scrivi il testo, scegli una voce e la piattaforma genera l'audio con [lo stesso generatore di messaggi vocali](/it/blog/phone-menu-ivr-voice-generator/) che [si può usare gratis anche da solo](/it/voice/prompts/): qualità da studio, nel formato che i centralini si aspettano. Un clic dà voce a tutti i passi del flusso in una volta, così un modello diventa **il tuo** saluto in circa un minuto. Quando premi **Pubblica**, quella versione viene congelata: testi, impostazioni e clip audio restano legati insieme e non possono cambiare a tua insaputa.

Il flusso pubblicato compare poi nella nuova sezione **Flussi di chiamata** dell'app, su ogni computer in cui hai fatto l'accesso. Aprilo, scegli quale linea deve far rispondere e attivalo. La scheda della linea mostra **Risponde**, e la configurazione finisce qui: nessuna deviazione da impostare presso l'operatore, nessun numero da portare altrove.

I flussi girano **sul tuo computer**, dentro l'app, con l'account SIP che hai già. Nulla della chiamata viene gestito sui nostri server: il saluto parte dalla tua macchina, il messaggio viene registrato sulla tua macchina e non c'è alcun costo a chiamata, perché in mezzo non c'è nessun altro. Il prezzo, detto onestamente, è un altro: perché il flusso risponda, l'app deve essere in funzione e il computer acceso, e a ogni linea risponde un solo computer.

## Guarda il flusso rispondere, in diretta

Mentre un flusso risponde, WaveKat Voice ti mostra passo per passo che cosa sta facendo, nel momento in cui accade. Perché la parte di cui siamo più contenti non è che risponda, ma che tu possa vederlo mentre lo fa.

Quando un flusso risponde, l'app non finge che sia tu al telefono. Sullo schermo compare **«Reception sta rispondendo»** e, sotto, una riga racconta che cosa sta succedendo in quel momento: *Sta parlando con il chiamante… Riproduzione del menu… Ti sta chiamando… Sta registrando un messaggio…*

![WaveKat Voice su Ubuntu — una chiamata a cui risponde un flusso: «Reception sta rispondendo», con «Sta registrando un messaggio…» e il nome di chi chiama.](/screenshots/flow-answering/it.webp)

Più sotto, la stessa mappa che hai costruito si illumina mentre la chiamata la percorre: il passo in cui si trova chi chiama viene evidenziato, quelli già superati restano chiari e gli altri restano in ombra. Dove si trova e da dove è passato si leggono in un colpo d'occhio.

Questo è filtrare le chiamate, ed è diverso dalla segreteria a cui sei abituato. La segreteria dell'operatore risponde senza che nessuno guardi, e tu lo scopri ore dopo. Qui il flusso risponde per te mentre sei seduto lì accanto: torna l'esperienza della vecchia segreteria di casa, in cui senti chi è prima di decidere.

## Prendere la linea a metà del messaggio

Una chiamata a cui ha risposto il flusso puoi prenderla a metà, senza che chi chiama debba ricominciare da capo. Mentre qualcuno lascia un messaggio, l'app mostra il pulsante **Rispondi**: premilo e la chiamata passa al tuo microfono e ai tuoi altoparlanti, esattamente come una chiamata a cui avessi risposto tu. La parte di messaggio già registrata viene conservata.

![WaveKat Voice su Ubuntu — la mappa in diretta con il passo della segreteria illuminato, il pulsante «Rispondi» e il messaggio di chi chiama che appare come trascrizione in diretta.](/screenshots/flow-takeover/it.webp)

E non devi indovinare se valga la pena rispondere: il messaggio compare come testo mentre viene lasciato, così leggi chi è e che cosa vuole prima di decidere.

**Rispondi** compare solo nei momenti in cui l'arrivo di una persona ha senso per chi chiama: mentre sta lasciando un messaggio, non a metà del saluto né durante un annuncio del menu. A nessuno fa piacere che una voce si sovrapponga alla registrazione che gli sta ancora parlando.

## Che cosa lascia una chiamata gestita da un flusso

Una chiamata a cui ha risposto un flusso finisce nella cronologia come tutte le altre, con accanto il nome del flusso — *Risposta da «Reception»* — così distingui a colpo d'occhio quali hai gestito tu e quali il flusso. Aprendone una, il riepilogo ti dice in parole semplici com'è finita: **Il chiamante ha lasciato un messaggio**, con un collegamento al flusso che l'ha presa.

![WaveKat Voice su Ubuntu — una chiamata conclusa a cui ha risposto un flusso: l'etichetta «Risposta da Reception», l'esito «Il chiamante ha lasciato un messaggio» e sotto la registrazione.](/screenshots/call-details-flow/it.webp)

Il messaggio in sé è una registrazione con la sua trascrizione, nello stesso posto di tutto il resto — e i passi del flusso sono segnati lungo la registrazione, così salti direttamente al momento in cui chi chiama inizia a parlare invece di cercarlo avanti e indietro. È ricercabile e, se qualcun altro deve ascoltarlo, [condivisibile con un link](/it/blog/share-a-call-recording/).

## Che cosa è gratuito e che cosa aggiunge Pro

La linea che abbiamo tracciato è semplice: **il piano gratuito risponde al telefono, Pro indirizza la chiamata.**

| | Gratuito | Pro |
|---|---|---|
| Passi disponibili | Saluto, ti fa squillare, registra un messaggio, chiude la chiamata | Tutto quanto sopra, più orari, menu e trasferimento |
| Flussi pubblicati | 1 | 10 |

Un account gratuito ottiene quindi una segreteria completa, con il tuo saluto, le tue parole, il filtro in diretta e la possibilità di prendere la linea: non un assaggio. Pro serve quando vuoi che sia il flusso a decidere: gestire diversamente il fuori orario, mandare chi chiama al posto giusto con un menu, passare le chiamate a un altro numero. Durante l'accesso anticipato il passaggio a Pro è gratuito — un clic sulla [pagina del tuo account WaveKat](https://platform.wavekat.com/profile), senza alcun passaggio di pagamento — e dura un anno. Il tuo piano e la sua scadenza sono indicati nell'app, in Impostazioni.

## Domande frequenti

### Che cos'è un flusso di chiamata in WaveKat Voice?

Un flusso di chiamata è una sequenza di passi che risponde automaticamente alle chiamate in arrivo: un saluto, un controllo degli orari, un menu telefonico, uno squillo a te, la registrazione di un messaggio o un trasferimento. Lo costruisci sul web, su platform.wavekat.com, lo assegni a una delle tue linee e l'app WaveKat Voice sul tuo computer lo esegue quando arriva una chiamata.

### Un flusso di chiamata è la stessa cosa di un centralino automatico o di un IVR?

Un flusso di chiamata è il nome che WaveKat Voice dà al centralino automatico: saluta chi chiama, propone un menu da tastiera, controlla i tuoi orari, ti fa squillare e registra un messaggio. Non è un IVR completo in senso aziendale — non cerca chi chiama in un database e non porta a termine pratiche al posto suo — e per ora non sostiene una vera conversazione. Se stavi cercando un «centralino automatico per piccole imprese», un flusso di chiamata fa esattamente quel lavoro, ma sul tuo computer invece che su una piattaforma pagata a postazione al mese.

### Il computer deve essere acceso perché un flusso risponda?

Sì. I flussi girano dentro l'app, sul tuo computer, non su un server: la macchina deve essere accesa e WaveKat Voice in funzione. È questo che rende tutto gratuito a chiamata e mantiene l'audio sul tuo computer, ma significa anche che un portatile in sospensione non risponde. A ogni linea risponde un solo computer, quindi accedere da una seconda macchina non provoca risposte doppie.

### Posso comunque prendere una chiamata a cui ha risposto il flusso?

Sì, mentre chi chiama sta lasciando un messaggio. L'app mostra in diretta che cosa sta facendo il flusso e durante il messaggio compare il pulsante **Rispondi**; premendolo la chiamata arriva al tuo microfono e ai tuoi altoparlanti, e la parte già registrata resta. Durante il saluto o il menu il pulsante non viene offerto di proposito, così una persona non si sovrappone mai a un annuncio ancora in riproduzione.

### Devo registrare io il messaggio di benvenuto?

No. Scrivi che cosa deve sentire chi chiama e scegli una voce: la piattaforma genera l'audio adatto alla telefonia con il generatore di messaggi vocali WaveKat — un clic dà voce a ogni passo del flusso. Se poi cambi il testo, rigeneri quel passo; finché non pubblichi di nuovo, la versione pubblicata continua a riprodurre l'audio precedente.

### Che fine fa un messaggio lasciato da chi chiama?

Viene registrato e trascritto sul tuo computer come ogni altra chiamata e compare nella cronologia con il nome del flusso e l'esito della chiamata. Da lì puoi riprodurlo, leggere la trascrizione, saltare a un passo del flusso o condividerlo con un link privato.

### È una receptionist con l'IA che parla con chi chiama?

Non ancora — e preferiamo dirlo chiaramente. I passi di oggi sono quelli prevedibili: saluto, orari, menu, squillo, messaggio, trasferimento. Fanno esattamente quello che hai scritto, ogni volta. Un passo «assistente» che sostenga una vera conversazione con chi chiama è la prossima tappa, e sarà un mattoncino in più da inserire nello stesso flusso.

### Funziona con il mio operatore SIP?

Sì, con l'account che hai già in WaveKat Voice. I flussi rispondono alle chiamate che l'app riceve comunque: se oggi la tua linea fa squillare l'app, un flusso può risponderle — senza deviazioni dal lato dell'operatore, senza numeri aggiuntivi e senza tariffe al minuto di un servizio di segreteria.

### Su quali piattaforme funzionano i flussi di chiamata?

Su Mac, Windows e Linux, le tre piattaforme su cui funziona WaveKat Voice. La creazione funziona in qualsiasi browser, perché i flussi si costruiscono sul web e si sincronizzano con l'app.

## Provalo

[Scarica WaveKat Voice](/it/voice/download/) — o aggiorna alla versione [0.0.43](/it/voice/changelog/#0.0.43) —, accedi e costruisci il tuo primo flusso su [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows). Parti da un modello, cambia le parole, pubblica e assegnalo alla tua linea.

Poi aspetta la prossima chiamata e guardala ricevere una risposta. Continuerai a vedere chi è e potrai comunque prenderla: è proprio questo il punto. Solo che non sei più l'unica cosa fra chi chiama e una risposta.
