---
title: "Registrare le chiamate su HubSpot"
description: "WaveKat Voice registra ogni chiamata su HubSpot in automatico: sul contatto giusto, con la trascrizione, e l’audio si ascolta dentro HubSpot stesso."
date: 2026-08-08
author: Eason Guo
tags: [voice-ai, integrazioni, HubSpot]
lang: "it"
---

Con WaveKat Voice ora puoi registrare le chiamate su HubSpot in automatico. Colleghi il tuo account HubSpot una volta e, da lì in poi, ogni chiamata che ricevi o effettui si archivia da sola nel tuo CRM: sul contatto giusto, con ora, direzione, esito, durata, la trascrizione e una registrazione che ascolti senza uscire da HubSpot. Nessuna chiave API, nessun middleware, nessuna estensione del browser e niente da ricordare dopo aver riagganciato. È disponibile da oggi nel [tuo account WaveKat](https://platform.wavekat.com/integrations) come funzione Pro — e durante l’accesso anticipato Pro è gratuito.

È un altro pezzo del [dare a ogni piccola impresa la voce di una grande](/it/blog/hello-world/). Il CRM di una grande azienda sa di ogni telefonata perché c’è qualcuno pagato perché sia così. Anche il tuo può saperlo, perché l’app di telefono che già usi — quella che [registra e trascrive ogni conversazione](/it/voice/) — lo annota in silenzio dove stanno le schede dei tuoi clienti.

## Che cosa arriva su HubSpot dopo ogni chiamata

Quando la chiamata finisce, WaveKat cerca l’altra persona nei tuoi contatti HubSpot per numero di telefono e registra una scheda chiamata sulla sua cronologia:

| Su HubSpot | Che cosa dice |
|---|---|
| Contatto | Trovato dal numero; creato all’occorrenza se non corrisponde nessuno |
| Ora e direzione | Quando è avvenuta la chiamata, in entrata o in uscita |
| Esito e durata | Risposta, persa o fallita — e quanto è durata |
| Oggetto | Un riepilogo di una riga, es. «In entrata · risposta · fuori orario» |
| Trascrizione | L’intera conversazione, salvo tu disattivi la sincronizzazione |
| Registrazione | Riproducibile nel lettore di HubSpot se la chiamata è stata registrata |
| Link | Alla chiamata in WaveKat, con la forma d’onda e ogni passo del flusso |

La scheda sembra una chiamata annotata a mano da un collega scrupoloso — solo che riguarda ogni chiamata, è parola per parola, ed è nata mentre andavi a prendere un caffè. Se qualcuno richiama, o se una sincronizzazione viene ritentata, la stessa chiamata non finisce mai archiviata due volte: WaveKat ricorda quale scheda HubSpot appartiene a quale chiamata e la aggiorna invece di crearne una gemella.

## Ascoltare la registrazione dentro HubSpot

La registrazione non viene copiata su HubSpot: succede qualcosa di meglio. La scheda porta con sé ciò che serve a HubSpot per chiedere l’audio a WaveKat *nel momento esatto in cui qualcuno preme play*, e WaveKat risponde lì per lì. In pratica significa che:

- **L’ascolto resta sulla cronologia del contatto.** Il collega che rivede la trattativa su HubSpot preme play e sente la chiamata: nessun cambio di app, nessun file inoltrato.
- **Cancellare una chiamata la cancella davvero.** Una volta rimossa la registrazione in WaveKat, su HubSpot non resta alcuna copia a sopravviverle. Il play successivo non trova nulla, perché non c’è nulla.
- **L’accesso resta tuo.** Ogni riproduzione è una richiesta che WaveKat soddisfa — e può rifiutare: integrazione scollegata, chiamata eliminata. Un file audio già copiato non potrebbe mai riprendersi una risposta.

Per la trascrizione e il percorso passo passo del flusso, il link nella scheda riporta alla pagina della chiamata in WaveKat, dove ci sono il [lettore a due tracce e la trascrizione per interlocutore](/it/blog/share-a-call-recording/).

## Colleghi una volta: niente chiavi API, niente configurazione

Collegare è un clic nella pagina del tuo account WaveKat: arrivi sulla schermata di consenso di HubSpot, approvi e torni indietro collegato. Non c’è un account sviluppatore da creare, né un’app privata da configurare, né ambiti da scegliere, né token da incollare. Prima del clic la pagina dice chiaramente che cosa verrà inviato, e [l’informativa sulla privacy](/it/privacy/#integrations) riporta lo stesso elenco in parole semplici.

![La pagina Integrazioni di WaveKat sul web: HubSpot indicato come «Collegato» nel catalogo e, sotto, l’account collegato che mostra «Sincronizzata» e l’ultima sincronizzazione di pochi minuti fa.](/screenshots/integrations-hubspot/it.webp#shadow)

Scollegare è altrettanto pulito: WaveKat chiede a HubSpot di revocare l’accesso e cancella le credenziali salvate. Le schede già scritte nel tuo HubSpot restano dove sono: è la storia del tuo CRM, e scollegare un’integrazione non equivale a cancellare il tuo passato.

## Decidi tu che cosa si sincronizza

Quattro interruttori, impostati per ciascun collegamento:

| Interruttore | Predefinito | Che cosa fa |
|---|---|---|
| Includi la trascrizione | Attivo | Mette nella scheda ciò che è stato detto |
| Crea i contatti mancanti | Attivo | Crea il contatto quando nessun numero corrisponde |
| Propaga le eliminazioni | Attivo | Toglie la chiamata da HubSpot quando la elimini in WaveKat |
| Chiama gli sconosciuti con il loro numero | Disattivo | Usa il numero come nome quando l’operatore non ne invia nessuno |

![Il pannello delle impostazioni del collegamento sul web: quali eventi di chiamata raggiungono HubSpot e gli interruttori «Crea i contatti mancanti», «Chiama gli sconosciuti con il loro numero», «Includi la trascrizione» e «Propaga le eliminazioni».](/screenshots/integrations-hubspot-options/it.webp#shadow)

L’ultimo è disattivo di proposito: un nome vuoto è esatto, e il primo collega che riconosce il numero lo compila una volta per tutte. Quando lo attivi, il numero finisce nel campo del cognome — mai nel nome, perché HubSpot usa i nomi per personalizzare le email, e «Ciao 021 123 4567» non è un messaggio che qualcuno intendesse spedire.

Una nota onesta, la stessa che fa [l’informativa sulla privacy](/it/privacy/#integrations): la persona con cui hai parlato non ha concordato nulla con noi. Mettere il suo numero, la sua voce e le sue parole nel tuo CRM comporta la stessa responsabilità di registrare la chiamata; gli interruttori esistono perché tu sincronizzi soltanto ciò che sei disposto a custodire.

## Ogni chiamata dice dov’è finita

Apri una qualsiasi chiamata in WaveKat e ti dice se ha raggiunto il tuo CRM: un badge **«In HubSpot»** quando è archiviata, uno stato di attesa mentre è in viaggio e, se qualcosa è andato storto, il motivo con le parole di HubSpot stesso. Una sincronizzazione fallita viene ritentata per un giorno con attese crescenti, e un collegamento che perde l’accesso dice «ricollega» invece di fallire in silenzio. Niente congetture su se il meccanismo stia funzionando.

![Una chiamata conclusa in WaveKat sul web: il badge «In HubSpot» accanto al nome di chi ha chiamato, sotto la registrazione a due tracce e più giù una riga di sincronizzazione con l’account HubSpot in cui è stata registrata.](/screenshots/call-in-hubspot/it.webp#shadow)

## Modi per registrare le chiamate su HubSpot

Le strade per portare le telefonate dentro HubSpot sono diverse, e si adattano a situazioni diverse:

| Strada | Che cosa richiede | Tieni il tuo operatore? |
|---|---|---|
| Registrare a mano | Qualcuno che scrive dopo ogni chiamata | Sì |
| Telefonia integrata di HubSpot | Chiamare da HubSpot con un numero fornito da HubSpot | No |
| Piattaforme di dialer in cloud | Spostare lì la telefonia, con prezzo per postazione | No |
| Webhook più uno strumento di automazione | Un abbonamento di automazione a parte e una catena da mantenere | Sì |
| Integrazione nativa di WaveKat Voice | Un clic per collegare; le chiamate restano sulla tua linea SIP | Sì |

Le piattaforme di dialer sono davvero brave in ciò che fanno: chiamate in serie, SMS, coaching sulle chiamate per i team commerciali. Quello che chiedono è che la tua telefonia trasli da loro. WaveKat Voice scommette all’opposto: tieni [l’operatore che hai già](/it/voice/), le chiamate avvengono sul tuo computer e HubSpot è la destinazione a cui rendono conto, non il sistema in cui abitano.

## Gratis e Pro

L’integrazione nativa con HubSpot è una funzione **Pro** — lo stesso livello che [smista le chiamate con menu e trasferimenti](/it/blog/answer-calls-with-a-call-flow/). Durante l’accesso anticipato passare a Pro è gratis: un clic nella [pagina del tuo account WaveKat](https://platform.wavekat.com/profile), senza passaggio di pagamento, e vale un anno.

Gli account gratuiti mantengono una via verso il CRM: i **webhook**, che inviano una scheda di ogni chiamata all’URL che indichi — gratuiti durante la beta. All’integrazione nativa si passa quando servono le parti con memoria: l’abbinamento dei contatti, schede senza doppioni, la riproduzione dell’audio ed eliminazioni che si propagano.

## Domande frequenti

### Come registro le chiamate su HubSpot in automatico con WaveKat Voice?

Accedi al tuo account WaveKat con la sincronizzazione cloud attiva, poi premi «Collega HubSpot» nella pagina Integrazioni e approva sulla schermata di consenso di HubSpot. Da quel momento ogni chiamata che ricevi o effettui in WaveKat Voice finisce su HubSpot in automatico: non c’è nulla da fare chiamata per chiamata.

### WaveKat Voice crea i contatti HubSpot in automatico?

Sì, finché lasci attivo «Crea i contatti mancanti». WaveKat abbina ogni chiamata a un contatto HubSpot tramite il numero di telefono; se non corrisponde nessuno, crea il contatto perché la chiamata resti comunque legata a una persona. Se lo disattivi, le chiamate senza corrispondenza vengono registrate senza contatto.

### Posso ascoltare le registrazioni dentro HubSpot?

Sì. La scheda HubSpot di una chiamata registrata si riproduce nel lettore di HubSpot, sulla cronologia del contatto. L’audio viene chiesto a WaveKat al momento della riproduzione invece di essere copiato, quindi eliminare la chiamata in WaveKat la rimuove davvero e non lascia copie sparse nel CRM.

### Che cosa succede su HubSpot se elimino una chiamata in WaveKat?

Con «Propaga le eliminazioni» attivo (l’impostazione predefinita), la scheda HubSpot viene archiviata quando elimini la chiamata in WaveKat, e la sua registrazione smette di riprodursi. Se lo disattivi, la tua cronologia HubSpot conserva la scheda anche quando la chiamata è sparita da WaveKat.

### Serve una chiave API per collegare HubSpot?

No. Il collegamento è un clic attraverso la schermata di consenso di HubSpot stesso: nessuna app privata da configurare, nessuna chiave API da creare o incollare. Se preferisci costruirti la tua catena, i webhook restano a disposizione e inviano ogni chiamata all’URL che scegli.

### L’integrazione con HubSpot è gratuita?

È una funzione Pro. Durante l’accesso anticipato Pro è gratis: un clic nella pagina del tuo account WaveKat ti dà un anno, senza passaggio di pagamento. I webhook restano disponibili sugli account gratuiti come via fai-da-te verso un CRM.

### Su quali piattaforme funziona?

WaveKat Voice funziona oggi su Mac e Linux. L’integrazione con HubSpot vive nel tuo account WaveKat, quindi si comporta allo stesso modo da entrambi — e le chiamate che registra si leggono su HubSpot da qualsiasi browser.

## Provalo

[Scarica WaveKat Voice](/it/voice/download/), accedi con la sincronizzazione cloud attiva e premi **Collega HubSpot** nella [tua pagina Integrazioni](https://platform.wavekat.com/integrations). La prossima chiamata sarà nel tuo CRM prima che tu abbia finito gli appunti — che, a pensarci, non ti serve più prendere.

Registrazione, trascrizione, [condivisione](/it/blog/share-a-call-recording/) e ora il CRM: una telefonata continua a diventare più utile dopo che hai riagganciato.
