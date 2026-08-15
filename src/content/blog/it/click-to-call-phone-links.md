---
title: "Click-to-call: clicca un numero sul web"
description: "WaveKat Voice apre i link tel: e sip: su Mac e Linux: clicca un numero di telefono su un sito e finisce nel campo di chiamata, pronto da comporre."
date: 2026-07-25
author: Eason Guo
tags: [voice-ai, chiamate]
lang: "it"
---

Click-to-call vuol dire che un numero di telefono su una pagina web è un link su cui puoi cliccare per chiamare, invece di qualcosa da copiare e ridigitare a mano. [WaveKat Voice](/it/voice/) — il softphone SIP per Mac e Linux che registra e trascrive ogni chiamata — ora può essere l'app che il tuo computer apre per quei link. Clicca un link `tel:` o `sip:` ovunque — la pagina contatti di un'azienda, un risultato di ricerca, la fattura di un fornitore — e WaveKat Voice viene in primo piano con il numero già inserito, pronto perché tu prema Chiama. Arriva con la [0.0.43](/it/voice/changelog/#0.0.43).

È lo standard minimo su un telefono da scrivania aziendale, e una di quelle funzioni che noti solo quando manca: vedi un numero su una pagina, ci clicchi, il telefono compone. Questa è la metà in uscita della stessa versione in cui WaveKat Voice ha imparato a [rispondere alle chiamate in arrivo con un flusso di chiamata](/it/blog/answer-calls-with-a-call-flow/) — e, come il resto della telefonia, gira sul [nostro motore SIP](/it/blog/our-own-sip-engine/).

## Cosa succede quando clicchi un numero di telefono

Attiva i **Link telefonici** e qualsiasi numero di telefono che sia un link cliccabile diventa una via d'accesso a WaveKat Voice. Clicca `tel:+14155550123` nel browser e l'app prende il primo piano e apre la scheda Nuova chiamata con `+14155550123` già nel campo A. Lo guardi, e premi Chiama. Funzionano sia i link `tel:` (normali numeri di telefono) sia i link `sip:` (indirizzi SIP come `sip:alice@example.com`) — l'indirizzo SIP passa dritto attraverso il tuo account.

![WaveKat Voice su Ubuntu — la scheda Nuova chiamata aperta con un numero di telefono già inserito, pronto da comporre.](/screenshots/dial-prefilled/it.webp)

L'impostazione predefinita è di proposito quella sicura: il numero viene inserito, ma sei **tu** a effettuare la chiamata. Una pagina web può *chiedere* di avviare una chiamata; non può comporla davvero senza che una persona prema Chiama. Conta, perché un link su una pagina è qualcosa che chiunque può metterci.

## Come attivare i link telefonici

I Link telefonici sono **disattivati finché non li attivi tu**, perché prendersi i link ai numeri di telefono su tutto il computer è il genere di cosa che dovrebbe essere una tua scelta, non una sorpresa di un'app appena installata. Attiva i **Link telefonici** in **Impostazioni → Generali** — nello stesso posto di «Avvia all'accesso» — e WaveKat Voice si registra presso il tuo sistema operativo come gestore dei link telefonici. Cosa comporta dipende dal sistema, e l'impostazione è onesta al riguardo:

| Piattaforma | Cosa succede quando li attivi |
|---|---|
| **macOS** | WaveKat Voice diventa subito il gestore, prendendo i link `tel:` da FaceTime. |
| **Linux** | WaveKat Voice diventa subito il gestore, registrato nel tuo desktop come l'app per `tel:`/`sip:`. |

![WaveKat Voice su Ubuntu — Impostazioni → Generali con l'interruttore Link telefonici attivato.](/screenshots/settings-general-phone-links/it.webp)

Nuovo su WaveKat Voice? I link telefonici ti verranno proposti nel momento più amichevole possibile — subito dopo la prima chiamata di prova riuscita, sulla scheda «è tutto pronto». È una proposta una tantum, mai un assillo: accettala o rifiutala e non te lo chiederà più. Chi usa WaveKat Voice da tempo e apre il tastierino per digitare un numero a mano — esattamente le persone per cui il click-to-call è pensato — riceve la stessa proposta discreta in fondo alla scheda di composizione. Comunque tu dica di sì, sotto c'è lo stesso unico interruttore.

## Opzionale: chiama nell'istante in cui clicchi

Se pre-compilare-e-confermare è un passaggio più di quanto vuoi, c'è un'opzione da attivare per questo. Attiva **«Chiama subito al clic»** (anch'essa in Impostazioni → Generali, e disponibile solo una volta attivati i Link telefonici) e un clic avvia subito la chiamata invece di aspettare che tu prema Chiama. È **disattivata di default**, e anche quando è attiva, WaveKat Voice si trattiene nei casi in cui una chiamata istantanea sarebbe quella sbagliata:

- **Solo quando c'è esattamente una linea da cui chiamare.** Se hai più account che potrebbero effettuare la chiamata, WaveKat Voice inserisce il numero e ti lascia scegliere la linea invece di tirare a indovinare.
- **Mai sopra una chiamata già in corso.** Se sei nel mezzo di una conversazione, il clic pre-compila invece di irrompere.
- **La finestra viene sempre in primo piano.** Anche su una chiamata istantanea, vedi la chiamata partire e puoi riagganciare — una pagina non può effettuare una chiamata in silenzio in background.

## Domande frequenti

### Come faccio ad aprire in WaveKat Voice un numero di telefono su un sito?

Attiva i **Link telefonici** in Impostazioni → Generali. Dopodiché, cliccando qualsiasi link `tel:` o `sip:` — il tipo di numero di telefono cliccabile che trovi sulle pagine contatti — si apre WaveKat Voice con il numero inserito, pronto da comporre.

### Cliccando un link telefonico la chiamata parte in automatico?

No, non a meno che tu non glielo chieda. Di default WaveKat Voice inserisce il numero e aspetta che tu prema Chiama, così una pagina web non può mai effettuare una chiamata da sola. C'è un'impostazione opzionale «Chiama subito al clic», disattivata di default, se preferisci saltare il passaggio di conferma.

### Quali piattaforme supportano il click-to-call?

Mac, Windows e Linux, le tre piattaforme su cui gira WaveKat Voice. Attiva i Link telefonici in Impostazioni → Generali e funziona su entrambe.

### Funziona anche con i link sip:, o solo con i numeri tel:?

Entrambi. Un link `tel:` viene normalizzato in un numero componibile; un link `sip:` (come `sip:alice@example.com`) passa dritto attraverso il tuo account SIP. WaveKat Voice si registra come gestore sia per `tel:` sia per `sip:`.

### È sicuro lasciare che i siti web aprano il mio softphone?

Sì, perché un link può solo *richiedere* una chiamata, non effettuarla. L'impostazione predefinita sicura inserisce il numero e aspetta che tu prema Chiama. WaveKat Voice accetta solo link `tel:`/`sip:`, ripulisce il numero prima di farci qualsiasi cosa e — anche con la chiamata istantanea attiva — non chiama mai da un account a sorpresa, non interrompe mai una chiamata in corso e ti mostra sempre la finestra così puoi riagganciare.

### Posso disattivarli di nuovo?

Sì. Disattiva i **Link telefonici** in Impostazioni → Generali e WaveKat Voice smette di aprirsi per i link telefonici. L'impostazione governa il comportamento stesso, quindi anche se il tuo sistema ricorda ancora l'associazione, i link cliccati vengono ignorati finché l'interruttore è spento.

## Provalo

[Scarica WaveKat Voice](/it/voice/download/) — o aggiorna alla [0.0.43](/it/voice/changelog/#0.0.43) — poi attiva i **Link telefonici** in Impostazioni → Generali. Clicca un numero su una qualsiasi pagina web ed è già nel campo di composizione, in attesa.

Il numero è sullo schermo; ci hai cliccato; ora chiama e basta. È tutto qui il punto.
