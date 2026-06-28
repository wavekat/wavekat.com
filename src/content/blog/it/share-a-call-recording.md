---
title: "Condividi la registrazione di una chiamata con un link"
description: "WaveKat Voice ora trasforma qualsiasi chiamata registrata in un link da condividere — privato, su invito o pubblico — con il controllo esatto su ciò che il destinatario può ascoltare e leggere."
date: 2026-06-28
author: Eason Guo
tags: [voice-ai, registrazioni, privacy]
lang: "it"
---

WaveKat Voice ora trasforma qualsiasi chiamata registrata in un link che puoi inviare. Apri una chiamata, scegli chi può ascoltarla — solo tu, alcune persone che inviti, o chiunque abbia il link — e copia un URL. Chi lo apre trova una pagina pulita con il lettore audio sopra una trascrizione etichettata per interlocutore. Le registrazioni partono come **Privata**, la condivisione è facoltativa per ogni chiamata, e puoi interromperla in qualsiasi momento. Introdotta in WaveKat Voice [0.0.41](/it/voice/changelog/#0.0.41), è disponibile oggi su Mac e Linux.

Questo prosegue il filo che continuiamo a tirare: [dare a ogni piccola impresa la voce di una grande](/it/blog/hello-world/). Una grande azienda può recuperare una chiamata e inoltrarla a un collega, a un cliente o a un fornitore in pochi secondi. Ora puoi farlo anche tu — dalla stessa app che [registra e trascrive ogni chiamata](/it/voice/) e [lascia che il tuo assistente AI le effettui](/it/blog/place-calls-from-the-command-line/).

## Cosa fa

Ogni chiamata in WaveKat Voice è già registrata e trascritta sul tuo computer. La condivisione è lo strato che permette a *qualcun altro* di ascoltarne una. Scegli una registrazione, scegli un livello di accesso, e WaveKat Voice ti dà un link. La persona a cui lo invii apre una pagina web — nessuna app da installare, niente da scaricare — e ascolta.

Ci sono tre livelli di accesso, e **Privata è sempre l'impostazione predefinita**:

| Livello di accesso | Chi può aprirla | Serve l'accesso |
|---|---|---|
| **Privata** | Solo tu | — (è solo la tua visualizzazione) |
| **Persone specifiche** | Solo le persone che inviti, via e-mail | Sì — accedono per confermare di essere loro |
| **Chiunque abbia il link** | Chiunque abbia il link | No |

"Persone specifiche" è per i casi in cui la registrazione è sensibile — la chiamata di un cliente, qualsiasi cosa con dettagli personali — e vuoi bloccarla a persone nominate. "Chiunque abbia il link" è per i casi in cui vuoi semplicemente che sia aperta: una testimonianza, una demo, una chiamata che non ti dispiace rendere pubblica. Riportare una registrazione a Privata in qualsiasi momento annulla ogni link che la riguarda.

![WaveKat Voice su Mac — il pannello di condivisione su una chiamata registrata: i tre livelli di accesso, un campo per gli inviti e i controlli su ciò che i destinatari possono vedere.](/screenshots/share-sheet/it.webp)

## Decidi esattamente cosa vedono

Condividere una registrazione non è tutto-o-niente. Prima di inviare il link, scegli cosa appare nella pagina che il destinatario apre (**Cosa possono vedere i destinatari**):

- **Identità dell'interlocutore** — mostra il numero dell'altra parte (Visibile), nascondilo in parte (Mascherata) o nascondilo del tutto (Nascosta).
- **Trascrizione** — includi la trascrizione scritta oppure lasciala fuori.
- **Audio** — lascia che la riproducano nel browser (Solo riproduzione), che la riproducano *e* la scarichino (Riproduci e scarica), oppure nascondi l'audio (Nascosto) e condividi solo la trascrizione.
- **Riproduzione iniziale** — parti da entrambi i lati della chiamata (Entrambi i lati), solo dal tuo lato (Solo il tuo lato) o solo da quello dell'interlocutore (Solo l'altro lato). (La registrazione stessa non cambia mai — chi ascolta può comunque riattivare entrambi i lati.)

Questi controlli esistono perché la registrazione di una chiamata è densa di informazioni di altre persone. Il punto è condividere la parte che fa la tua tesi — una citazione, un impegno, un lato di una conversazione — senza consegnare più di quanto intendi.

## Rendere pubblica una registrazione è un passo deliberato

Rendere pubblica una registrazione è l'unico percorso con una protezione davanti. Prima che un link diventi aperto-a-chiunque, WaveKat Voice si ferma e dice, con parole chiare, cosa significa:

> Chiunque abbia il link potrà ascoltare questa chiamata e leggerne la trascrizione, senza accedere. Le chiamate contengono spesso dati personali come numeri di telefono, indirizzi o informazioni di pagamento. Una volta che un link è pubblico, non puoi controllare con chi viene condiviso. Puoi renderla di nuovo privata in qualsiasi momento.

Alcune cose rendono tutto questo onesto, e non una casella da spuntare:

- **Privata è l'impostazione predefinita persistente.** Il pannello di condivisione si apre su Privata ogni volta. Pubblica non è mai preselezionata, né mai a un clic in meno rispetto alle scelte più sicure.
- **Ogni link è revocabile.** Riporta una registrazione a Privata e i link in circolazione smettono di funzionare immediatamente.

## Cosa vede il tuo destinatario

Il link apre una pagina costruita attorno alla chiamata, non attorno a WaveKat. In alto c'è un lettore audio a due tracce — il tuo lato e quello dell'interlocutore come forme d'onda separate — con la trascrizione completa sotto, etichettata per interlocutore (**Tu** e **Interlocutore**) e ricercabile. Poiché la trascrizione è lì a portata di mano, la pagina funziona anche come alternativa testuale all'audio, così un destinatario che non può riprodurre l'audio può comunque leggere la chiamata.

Se hai condiviso con "Persone specifiche", la pagina chiede prima di accedere e si apre solo per gli account che hai invitato. Se l'hai resa pubblica, va dritta al lettore.

![Una registrazione condivisa di WaveKat Voice aperta nel browser — il lettore audio e la trascrizione etichettata per interlocutore che vede un destinatario.](/screenshots/share-viewer/it.webp)

## La condivisione vive nel cloud — di proposito

Un link di condivisione è qualcosa che apre un'altra persona, magari mentre il tuo portatile è chiuso. WaveKat Voice gira sulla tua macchina e non è raggiungibile da internet, quindi una registrazione condivisa deve trovarsi in un posto a cui un destinatario possa davvero arrivare. Questo significa che la condivisione richiede tre cose, e il pannello di condivisione ti dice qual è quella che manca:

1. Hai **eseguito l'accesso** al tuo account WaveKat.
2. La **sincronizzazione cloud è attiva**, così la registrazione è stata salvata nel tuo account.
3. Quella registrazione **ha completato il caricamento**.

Finché tutte e tre non sono vere, il controllo di condivisione spiega esattamente cosa fare invece di restare lì disattivato. Se non accedi mai, nulla lascia il tuo computer — e nulla è condivisibile, che è la stessa regola enunciata dall'altro lato. La condivisione è l'unica funzione che, per scelta progettuale, non può essere solo locale.

Puoi avviare una condivisione dall'app desktop o dalle tue registrazioni sul web — in entrambi i casi è la stessa registrazione e lo stesso link.

## Anche dalla riga di comando

Come il resto di WaveKat Voice, la condivisione è programmabile. Con [l'automazione attivata](/it/blog/place-calls-from-the-command-line/), lo strumento da riga di comando può condividere e annullare la condivisione delle registrazioni:

```bash
# Share a recording with specific people
wavekat-voice recording share <call-id> --visibility restricted --invite name@example.com

# Stop sharing — reverts the recording to Private
wavekat-voice recording unshare <call-id>
```

Rendere **pubblica** una registrazione da uno script (o da un assistente AI) richiede una conferma esplicita — `--yes` sulla riga di comando, un flag `confirm_public` attraverso gli strumenti dell'assistente — così nulla diventa pubblico a fronte di un'istruzione vaga.

## Domande frequenti

### Come condivido la registrazione di una chiamata da WaveKat Voice?

Apri la chiamata in WaveKat Voice, scegli un livello di accesso nel pannello di condivisione — Privata, Persone specifiche, o Chiunque abbia il link — e copia il link. Il destinatario lo apre in un browser per ascoltare e leggere la trascrizione; non c'è alcuna app da installare. Le registrazioni sono Privata finché non le condividi.

### Posso controllare cosa il destinatario può ascoltare o leggere?

Sì. Prima di condividere, scegli se mostrare, mascherare o nascondere il numero dell'interlocutore, se includere la trascrizione, se l'audio è riproducibile o anche scaricabile (oppure del tutto nascosto), e quale lato della chiamata si riproduce per primo. La registrazione stessa non viene mai alterata.

### Una registrazione condivisa è pubblica su tutto internet?

Solo se scegli "Chiunque abbia il link", e WaveKat Voice ti avverte prima che accada. Puoi riportare una registrazione a Privata in qualsiasi momento, il che disattiva i link esistenti. L'impostazione predefinita di ogni registrazione è Privata.

### Mi serve un account per condividere le registrazioni?

Sì. La condivisione richiede di aver eseguito l'accesso al tuo account WaveKat con la sincronizzazione cloud attiva, perché il link deve essere raggiungibile quando il tuo computer è in sospensione. Se non accedi, le tue registrazioni restano interamente sul tuo computer e non sono condivisibili.

### Qualcuno può aprire un link condiviso senza accedere?

Dipende dal livello di accesso. "Chiunque abbia il link" si apre senza accesso. "Persone specifiche" richiede che il destinatario acceda come uno degli account che hai invitato. "Privata" significa che solo tu puoi aprirla.

### Quali piattaforme supportano la condivisione delle registrazioni?

WaveKat Voice oggi gira su Mac e Linux, con Windows in arrivo quando ci sarà richiesta. La condivisione funziona su entrambe le piattaforme supportate, e i destinatari aprono i link condivisi in qualsiasi browser web.

## Provalo

[Scarica WaveKat Voice](/it/voice/download/), accedi e attiva la sincronizzazione cloud, poi apri una qualsiasi chiamata registrata e premi Condividi. Parti da Privata, condividi con un paio di persone, e rendi pubblico solo quando lo vuoi davvero.

Registrazione, trascrizione e ora condivisione — la chiamata è l'unità di lavoro, e WaveKat Voice la rende facile da far girare quanto un documento.
