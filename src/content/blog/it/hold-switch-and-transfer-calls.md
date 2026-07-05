---
title: "Metti in attesa, passa tra le chiamate e trasferisci come una reception"
description: "WaveKat Voice ora mette le chiamate in attesa, risponde a una seconda chiamata mentre sei sulla prima e trasferisce chi chiama — trasferimento cieco o assistito — su Mac e Linux, e la registrazione si mette in pausa automaticamente durante l'attesa."
date: 2026-07-05
author: Eason Guo
tags: [voice-ai, chiamate]
lang: "it"
---

WaveKat Voice — il softphone SIP per Mac e Linux che registra e trascrive ogni chiamata — ora sa fare le tre cose che una reception fa tutto il giorno: mettere in attesa chi chiama, rispondere a una seconda chiamata mentre la prima aspetta e trasferire chi chiama a qualcun altro — subito, oppure dopo averlo prima consultato. Arriva con WaveKat Voice [0.0.42](/it/voice/changelog/#0.0.42).

È il passo più letterale finora verso il nostro obiettivo: [dare a ogni piccola attività la voce di una grande](/it/blog/hello-world/). Quando chiami una grande azienda, qualcuno dice «un attimo, la metto in linea» — e funziona, perché c'è una centralinista con un centralino. Ora [WaveKat Voice](/it/voice/), che già registra e trascrive ogni chiamata, dà a un negozio con una sola persona le stesse mosse. Attesa, avviso di chiamata e trasferimento sono i comandi che chi sta a una scrivania usa di continuo, e qualsiasi [softphone](/it/voice/alternatives/) serio deve averli — WaveKat Voice ora li ha, con un tocco tutto suo: quello che succede durante l'attesa resta fuori dalla registrazione.

## Mettere in attesa chi chiama

Mettere in attesa chi chiama in WaveKat Voice mette in pausa la registrazione e la trascrizione dal vivo per tutto il tempo in cui la chiamata resta parcheggiata — nulla di ciò che viene detto vicino alla tua scrivania durante l'attesa finisce nella registrazione o nella trascrizione. Sulla schermata di chiamata c'è un pulsante **Attesa**, tra Muto e il tastierino; premilo e la chiamata si mette in pausa in entrambe le direzioni, così tu non senti chi chiama e loro non sentono te.

WaveKat Voice segnala l'attesa al sistema telefonico dall'altra parte nel modo standard di SIP, così la maggior parte dei sistemi fa sentire a chi chiama la propria musica di attesa — sente «sei in attesa», non un silenzio di tomba. È più di un semplice muto locale: il sistema remoto sa che la chiamata è parcheggiata, non solo silenziosa. Premi **Riprendi** e la conversazione, la registrazione e la trascrizione ripartono.

![WaveKat Voice su Ubuntu — una chiamata in attesa: il banner di attesa con Riprendi e la trascrizione in pausa.](/screenshots/in-call-hold/it.webp)

## Avviso di chiamata: rispondi a una seconda chiamata mentre sei sulla prima

Quando una seconda chiamata squilla mentre stai già parlando, non devi più scegliere tra le due. Rispondi, e la prima chiamata va in attesa da sola — esattamente come l'avviso di chiamata sul cellulare. Una barra di scambio sulla schermata di chiamata elenca ogni chiamata in corso, e passi dall'una all'altra con un clic.

Solo una chiamata alla volta ha l'audio dal vivo. La chiamata che stai guardando è quella su cui stai parlando; ogni altra chiamata è in attesa, con la sua registrazione e la sua trascrizione dal vivo in pausa finché non ci torni sopra. Per impostazione predefinita, passare a una chiamata in attesa la riprende subito; se preferisci riprendere ogni chiamata di proposito, c'è un'opzione in **Impostazioni → Generali** («Riprendi una chiamata quando ci passi»), e ogni chiamata in attesa mostra un avviso ben visibile, così una linea silenziosa non sembra mai una linea caduta.

![WaveKat Voice su Ubuntu — una chiamata in corso con altri due chiamanti in attesa nella barra di scambio.](/screenshots/in-call-waiting/it.webp)

## Trasferire chi chiama — subito, o dopo aver verificato

Il pulsante **Trasferisci** manda chi è in linea da qualcun altro — un altro numero, un altro interno, un altro indirizzo SIP. Ci sono due modi per farlo, e WaveKat Voice li ha entrambi:

| | Trasferimento cieco | Trasferimento assistito |
|---|---|---|
| **Cosa succede** | Chi chiama viene inviato subito al nuovo numero | Prima chiami tu la nuova persona, le parli, poi colleghi i due |
| **Parli prima con il destinatario?** | No | Sì — chi chiama aspetta in attesa mentre verifichi |
| **Se il destinatario non risponde** | Chi chiama resta con te; non si perde nulla | Riagganci la chiamata di consultazione e torni da chi chiamava |
| **Quando usarlo** | Sai che deve prenderla lui: «la passo alla fatturazione» | Vuoi annunciare chi chiama, o non sei sicuro che sia disponibile |

Per un trasferimento cieco, premi Trasferisci, inserisci la destinazione e hai finito — appena la nuova persona risponde, il tuo lato della chiamata termina. Per un trasferimento assistito, scegli **Parla prima**: chi chiama va in attesa, WaveKat Voice compone la destinazione come seconda chiamata e tu le parli in privato («ho un cliente che chiede della fattura — puoi prenderlo tu?»). Quando è tutto pronto, premi **Completa trasferimento** e i due vengono collegati mentre tu esci. Se la persona è occupata, rifiuta o si rivela quella sbagliata, ti basta riagganciare la chiamata di consultazione e riprendere chi chiamava — non saprà mai che il primo tentativo non è andato a buon fine.

![WaveKat Voice su Ubuntu — un trasferimento assistito: chi chiama è in attesa e il pulsante Completa trasferimento li collega.](/screenshots/in-call-transfer/it.webp)

Anche nella cronologia i trasferimenti restano onesti. Una chiamata trasferita si chiude come **Trasferita**, e la pagina di dettaglio mostra esattamente dov'è andata — «Trasferita a …» — invece di fingere che tu abbia riagganciato.

## Domande frequenti

### Come trasferisco una chiamata in WaveKat Voice?

Premi Trasferisci sulla schermata di chiamata e inserisci un numero, un interno o un indirizzo SIP. Inviarla subito è un trasferimento cieco; scegliendo **Parla prima** chi chiama viene messo in attesa e viene composta la destinazione, così puoi annunciarlo, poi **Completa trasferimento** collega i due.

### Qual è la differenza tra trasferimento cieco e assistito?

Il trasferimento cieco manda chi chiama alla nuova destinazione subito, senza parlare prima con il destinatario. Quello assistito tiene chi chiama in attesa mentre chiami tu stesso il destinatario, e collega i due solo quando confermi — così puoi tirarti indietro se il destinatario è occupato o rifiuta. WaveKat Voice li supporta entrambi.

### La persona a cui trasferisco la chiamata deve avere WaveKat Voice?

No. WaveKat Voice usa il meccanismo di trasferimento standard di SIP (un REFER, RFC 3515), quindi la destinazione riceve solo una normale telefonata — qualsiasi telefono, qualsiasi softphone, qualsiasi interno che il tuo operatore possa raggiungere.

### Attesa e trasferimento funzionano con qualsiasi operatore SIP?

Sì. L'attesa usa il re-INVITE standard di SIP (RFC 3264) e il trasferimento usa SIP REFER (RFC 3515), quindi entrambi funzionano con qualsiasi operatore o centralino conforme a SIP, usando l'account che già hai — senza configurazione specifica dell'operatore.

### Posso unire due chiamate in una conferenza?

Non ancora. WaveKat Voice può tenere due o più chiamate in attesa contemporaneamente e passare dall'una all'altra, ma solo una alla volta è dal vivo. La chiamata a tre è una funzione a parte che non abbiamo ancora costruito.

### Cosa sente chi chiama mentre è in attesa?

Chi viene messo in attesa in WaveKat Voice sente quello che il suo sistema telefonico riproduce per l'attesa — di solito la sua musica di attesa, non silenzio o un tono da WaveKat Voice. WaveKat Voice segnala l'attesa nel modo standard di SIP (un re-INVITE, RFC 3264), che affida l'esperienza di attesa al sistema di chi chiama, così sente ciò che si aspetta.

### Una chiamata viene registrata mentre è in attesa?

No. La registrazione e la trascrizione dal vivo si fermano per tutta la durata dell'attesa, in entrambe le direzioni, e riprendono con la chiamata. La linea temporale della registrazione salvata resta accurata — il tempo in attesa appare come silenzio, non come un taglio.

### Su quali piattaforme funzionano attesa, avviso di chiamata e trasferimento?

WaveKat Voice oggi funziona su Mac e Linux, e arriverà su Windows quando ci sarà richiesta. Attesa, avviso di chiamata ed entrambi i tipi di trasferimento funzionano su entrambe le piattaforme supportate, con l'account SIP che già usi — senza costi extra e senza configurazione.

## Provalo

[Scarica WaveKat Voice](/it/voice/download/) — o aggiorna alla [0.0.42](/it/voice/changelog/#0.0.42) — e i comandi sono su ogni schermata di chiamata: Attesa accanto a Muto, Trasferisci lì di fianco, e un avviso di chiamata che scatta da solo quando squilla la seconda chiamata. Niente da configurare, niente di più da pagare.

Metti in attesa chi chiama, prendi la seconda linea e passa qualcuno come se ci fosse una reception — perché adesso c'è.
