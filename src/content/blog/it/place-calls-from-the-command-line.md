---
title: "Lascia che l'assistente AI telefoni davvero"
description: "WaveKat Voice include uno strumento da riga di comando e un server MCP, così un assistente AI come Claude può fare e gestire vere telefonate sul tuo computer."
date: 2026-06-16
author: Eason Guo
tags: [voice-ai, automazione, ai-agents]
lang: "it"
---

WaveKat Voice ora include uno strumento da riga di comando, così un programma di cui ti fidi — incluso un assistente AI come Claude — può effettuare e gestire vere telefonate per te. Chiedi al tuo assistente di "chiamare il dentista e aspettare finché qualcuno non risponde", e comporrà il numero attraverso l’app che hai già aperta, seguirà la chiamata e ti dirà com’è andata. Oggi è integrato nell’app su Mac e Linux, ed è disattivato finché non lo attivi.

Questo è il passo successivo verso ciò a cui torniamo sempre: [dare a ogni piccola impresa la voce di una grande](/it/blog/hello-world/). Una grande azienda ha un centralino e il software che lo guida. Ora il tuo computer — e l’assistente che ci gira sopra — può essere quel centralino.

## Cosa fa davvero

WaveKat Voice ha sempre avuto un telefono che gira silenziosamente in background: si registra presso il tuo provider SIP e gestisce le chiamate. La novità è un secondo modo per guidarlo — un comando chiamato `wavekat-voice` che dialoga con l’app in esecuzione.

Per essere precisi sul confine, perché è importante:

- **Effettua e gestisce le chiamate.** Compone un numero, attende l’esito, elenca ciò che sta squillando in questo momento, risponde o rifiuta una chiamata in arrivo, invia toni per navigare un menu telefonico, riaggancia, recupera la trascrizione.
- **A parlare sei sempre tu.** L’audio passa attraverso il microfono e gli altoparlanti del tuo computer, esattamente come quando clicchi "chiama" nell’app. L’assistente imposta e guida la chiamata; la persona al telefono sei tu. (Un assistente che parla lui stesso durante la chiamata è un progetto separato e successivo.)

Quindi l’assistente è la mano sul tastierino, non una voce sulla linea. È una distinzione deliberata e onesta — e per le incombenze quotidiane del tipo "mettimi in contatto con una persona", è gran parte di ciò che vuoi davvero.

![WaveKat Voice su Ubuntu — una chiamata avviata dall'assistente, in corso, con la trascrizione dal vivo a fianco.](/screenshots/in-call/it.webp)

## Non c’è nulla da installare

Il comando `wavekat-voice` è lo stesso programma che fa girare l’app — è già sul tuo disco nel momento in cui installi WaveKat Voice. Nessun secondo download, nessun pacchetto separato, nessuna versione che possa disallinearsi dall’app.

È **disattivato per impostazione predefinita**. Mentre l’automazione è attiva, qualsiasi programma tu esegua sul computer può effettuare chiamate tramite il tuo account — e le chiamate possono costare denaro — quindi lasciamo a te questa decisione. Attivala in **Impostazioni → Automazione** (Settings → Automation), dove c’è anche un pulsante in un clic per aggiungere `wavekat-voice` al tuo PATH, così qualsiasi terminale possa trovarlo.

![WaveKat Voice su Ubuntu — le impostazioni di Automazione con l'accesso da riga di comando attivato e il pulsante per installare lo strumento da riga di comando.](/screenshots/settings-automation/it.webp)

## Collega un assistente AI in un clic

Il percorso più veloce è la pagina **Impostazioni → Automazione** stessa. Cerca gli assistenti AI che hai già installato e offre un pulsante **Connetti** (Connect) per ciascuno. Oggi questo copre:

| Assistente | Come si collega |
|---|---|
| Claude Desktop, Cursor, Windsurf | Tramite un server MCP incluso nell’app |
| Claude Code, Codex, Gemini | Tramite una nota gestita nel loro file di istruzioni |

Un clic completa il collegamento — nulla da copiare o incollare. Dopodiché, basta chiedere all’assistente di effettuare una chiamata. Due cose da sapere: alcuni assistenti richiedono un riavvio completo (chiudere e riaprire) per riconoscere i nuovi strumenti, e la connessione si mantiene aggiornata da sola — quando WaveKat Voice si aggiorna in background, qualsiasi assistente che hai collegato viene tenuto silenziosamente in sincronia, così non devi mai ricollegarlo.

![WaveKat Voice su Ubuntu — collegare assistenti AI come Claude e Cursor, ciascuno con un pulsante Connetti con un clic.](/screenshots/settings-automation-agents/it.webp)

## Come appare da un terminale

Ogni comando accetta `--json` per un output leggibile dalle macchine, ed è proprio questo a renderlo comodo da guidare per un assistente. Qualche esempio:

```bash
# Is the app running, and which accounts are connected?
wavekat-voice status

# Place a call and wait — the exit code says how it went.
wavekat-voice call +14155550123 --wait
echo "result: $?"

# Find a call that's happening right now, then hang it up.
wavekat-voice call list --json | jq -r '.[0].id' | xargs wavekat-voice call hangup
```

Il codice di uscita di `--wait` è il contratto su cui uno script (o un assistente) si dirama: `0` ha risposto e si è poi concluso normalmente, `2` occupato o rifiutato, `3` fallito o caduto, `4` nessuna risposta. Non serve analizzare alcun output per sapere cos’è successo.

I comandi sono raggruppati per ciò su cui agiscono — `call` per effettuare e gestire le chiamate, `recording` per l’audio salvato, `log` per il registro delle attività — con `status`, `accounts` e un flusso `events` in tempo reale al livello superiore. Esegui `wavekat-voice call --help` per vedere l’insieme completo.

## Perché l’abbiamo costruito così

Alcune scelte di cui siamo soddisfatti:

- **Un solo binario, nessuna nuova superficie.** Lo strumento da riga di comando è il demone stesso dell’app con un altro cappello — quindi eredita gratuitamente la firma dell’app, i suoi aggiornamenti automatici e la sua revisione di sicurezza, e non potrà mai essere una versione obsoleta.
- **Il binario è la fonte di verità.** Il testo di aiuto contiene i codici di uscita e gli esempi; le integrazioni degli assistenti puntano a `wavekat-voice --help` invece di congelare un elenco di comandi destinato a invecchiare. Aggiorna l’app e gli strumenti si aggiornano con essa.
- **Disattivata per impostazione predefinita, attivabile su richiesta, revocabile.** Effettuare una telefonata a pagamento è una cosa importante, quindi l’automazione resta disattivata finché non la richiedi, e **Rimuovi** (Remove) sgancia di nuovo qualsiasi assistente senza toccare il resto delle sue impostazioni.

## Domande frequenti

### Un assistente AI può effettuare telefonate con WaveKat Voice?

Sì. Con l’automazione abilitata in WaveKat Voice (Impostazioni → Automazione), un assistente AI come Claude può effettuare, seguire e terminare vere telefonate tramite lo strumento da riga di comando dell’app o il suo server MCP. L’assistente guida la chiamata; a parlare sei tu.

### È l’AI a parlare durante la chiamata al posto mio?

No. WaveKat Voice instrada l’audio della chiamata attraverso il microfono e gli altoparlanti del tuo computer — a parlare sei tu. L’assistente si occupa di comporre il numero, attendere una risposta, inviare i toni dei menu e riagganciare.

### Devo installare qualcosa in più per usare la riga di comando?

No. Il comando `wavekat-voice` è incluso nell’app WaveKat Voice, quindi è già sul tuo computer. Devi solo attivare l’automazione in Impostazioni → Automazione e, facoltativamente, cliccare su "Installa lo strumento da riga di comando (Install command-line tool)" per aggiungerlo al tuo PATH.

### È sicuro lasciare l’automazione attiva?

Lasciala disattivata se non la stai usando. Mentre l’automazione è attiva, qualsiasi programma tu esegua sul computer può effettuare chiamate tramite il tuo account, il che può costare denaro. È disattivata per impostazione predefinita proprio per questo, e puoi disattivarla di nuovo in qualsiasi momento.

### Quali assistenti possono collegarsi in un clic?

Oggi Claude Desktop, Claude Code, Cursor, Codex, Gemini e Windsurf — tramite un server MCP incluso per gli assistenti desktop e una nota di istruzioni gestita per quelli da riga di comando.

### Quali piattaforme supportano questa funzione?

WaveKat Voice gira su Mac, Windows e Linux. Lo strumento da riga di comando e le integrazioni con gli assistenti sono disponibili su tutte e tre le piattaforme supportate.

## Provalo

[Scarica WaveKat Voice](/it/voice/download/), apri **Impostazioni → Automazione** e collega il tuo assistente. Il riferimento completo dei comandi — ogni comando, il suo output JSON e i codici di uscita — si trova nella [documentazione sull’automazione](/docs/voice/automation/).

Qui stiamo solo iniziando. Guidare le chiamate è la base; un assistente capace anche di sostenere la conversazione è dove tutto questo andrà a finire.
