---
title: "SIP over TLS: segnalamento cifrato per softphone"
description: "WaveKat Voice si collega agli operatori SIP via TLS sulla porta 5061 e cifra il segnalamento (registrazione, chiamate, trasferimenti) su Mac, Windows e Linux."
date: 2026-09-26
author: Eason Guo
tags: [voice-ai, sip, privacy]
lang: "it"
---

WaveKat Voice supporta SIP over TLS dalla versione [0.0.56](/it/voice/changelog/#0.0.56). Imposta la **Connessione** di una linea su `TLS` e la porta su `5061`: tutto il segnalamento SIP tra il softphone e il tuo operatore (REGISTER, INVITE, REFER, BYE) passa su una connessione cifrata. Funziona su Mac, Windows e Linux.

## Perché TLS conta

Ogni chiamata comincia con il segnalamento: il telefono si registra presso l'operatore, dice chi sta chiamando e imposta la chiamata. Quel traffico contiene il tuo account SIP, i numeri che componi e lo scambio di autenticazione. Su UDP in chiaro, chiunque si trovi sullo stesso percorso di rete può leggerlo.

TLS è il modo standard per proteggerlo. La connessione tra WaveKat Voice e il tuo operatore è cifrata, e l'identità dell'operatore viene verificata prima di inviare qualsiasi cosa. Un telefono che gestisce le chiamate della tua attività dovrebbe saperlo fare, e proteggere le tue comunicazioni fa parte del guadagnarci la tua fiducia. Per questo ogni linea di WaveKat Voice può usare TLS.

## Cosa viene cifrato

| | UDP / TCP | TLS |
|---|---|---|
| Scambio di autenticazione REGISTER | In chiaro | Cifrato |
| Chiamante, chiamato, orario (INVITE ecc.) | In chiaro | Cifrato |
| Attesa, trasferimento, riaggancio | In chiaro | Cifrato |
| Audio (RTP) | In chiaro | In chiaro |
| Identità del server verificata | No | Sì, tramite certificato |
| Porta abituale | 5060 | 5061 |

La riga dell'autenticazione è quella che si tende a sottovalutare. SIP usa l'autenticazione Digest ([RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)), quindi la password in sé non viaggia mai in rete. Però il `response` nell'intestazione `Authorization` è un hash ricavato da essa. Chi sulla stessa rete cattura quel pacchetto via UDP può attaccarlo offline con un dizionario, e una password debole non regge a lungo. Con TLS non c'è nessun pacchetto da catturare.

## Come funziona SIP over TLS

Il SIP normale di solito viaggia su UDP, porta 5060: ogni messaggio è un pacchetto a sé, di testo leggibile. SIP over TLS cambia il trasporto sottostante, non SIP.

1. **Una sola connessione.** Il softphone apre una connessione TCP verso l'operatore, di solito sulla porta 5061.
2. **Handshake.** Prima di inviare qualsiasi messaggio SIP, le due parti eseguono un handshake TLS. L'operatore presenta il suo certificato; il softphone controlla che risalga a un'autorità di certificazione attendibile e che sia emesso per il dominio SIP. Poi concordano le chiavi di sessione.
3. **SIP dentro il tunnel.** Da lì in poi ogni messaggio SIP, in entrambe le direzioni, viaggia cifrato sulla stessa connessione. Lo dicono i messaggi stessi: `Via: SIP/2.0/TLS` e un `Contact` con `;transport=tls`.
4. **La connessione resta aperta.** La registrazione la tiene attiva, e l'operatore la usa per inviare le chiamate in arrivo. È anche così che un INVITE in arrivo raggiunge un telefono dietro NAT senza alcun port forwarding.

![Diagramma di sequenza di SIP over TLS: WaveKat Voice apre una connessione TCP verso l'operatore sulla porta 5061, completa l'handshake TLS e verifica il certificato rispetto al dominio SIP; poi REGISTER, la richiesta di autenticazione 401, il REGISTER autenticato, il 200 OK e un INVITE in arrivo viaggiano tutti sulla connessione cifrata.](/blog/sip-over-tls/it.svg)

TLS protegge un solo tratto: il collegamento tra WaveKat Voice e il tuo operatore. Come l'operatore instrada poi la chiamata, verso un altro operatore o la rete telefonica, dipende da lui.

## Come vengono verificati i certificati

TLS ferma un attacco man-in-the-middle solo se la verifica dei certificati è rigorosa. La nostra:

- **Solo le radici di sistema.** I certificati vengono verificati con l'elenco di CA attendibili del sistema operativo. Nulla è incluso nell'app e non ci sono eccezioni.
- **Verifica sul dominio SIP, non sull'indirizzo del server.** Anche se hai impostato un server in uscita separato, il certificato deve essere emesso per il dominio SIP dell'account, come richiede [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922).
- **Un errore ferma la linea.** Nessun ripiego sul testo in chiaro, nessun tentativo infinito su «Connessione…». La linea si ferma e l'errore riporta il motivo e l'impronta SHA-256 del certificato:

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

L'implementazione TLS è `rustls` di Rust, quindi non c'è alcuna dipendenza da OpenSSL su nessuna piattaforma.

Certificati autofirmati e CA private non sono supportati, e non esiste un interruttore «considera attendibile questo certificato». Se il tuo operatore usa un certificato privato, quella linea deve restare su UDP o TCP.

## Verifica il TLS del tuo operatore prima di passare

Due comandi standard ti dicono se il TLS del tuo operatore funzionerà, prima di cambiare qualcosa nell'app. L'output qui sotto viene da prove reali del 26 settembre 2026 su due operatori SIP: 2talk, in Nuova Zelanda, e Telnyx.

### Passo 1: trova host e porta TLS

Alcuni operatori pubblicano un record SRV per SIP over TLS ([RFC 3263](https://www.rfc-editor.org/rfc/rfc3263)) che indica host e porta da usare. Telnyx lo fa:

```sh
$ dig +short SRV _sips._tcp.sip.telnyx.com
1 45 5061 sip-anycast1.telnyx.com.
1 95 5061 sip-anycast2.telnyx.com.
```

Ogni riga riporta priorità, peso, porta, host. Vince la priorità più bassa; i record con la stessa priorità si dividono il carico in base al peso. Qui entrambi gli host hanno priorità 1 e porta 5061, quindi un client distribuisce le connessioni tra i due e ne manda circa due su tre a `sip-anycast2`.

2talk non pubblica alcun record SRV, e la stessa query non restituisce nulla. È una situazione comune: usa la documentazione dell'operatore. Quella di 2talk indica `lyra.2talk.co.nz`, TLS sulla porta 5061.

### Passo 2: verifica il certificato come fa un client rigoroso

Collegati a quell'host e chiedi a OpenSSL di verificare il certificato rispetto al dominio SIP. Per 2talk (output ridotto):

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname lyra.2talk.co.nz </dev/null
depth=2 C=US, O=DigiCert Inc, OU=www.digicert.com, CN=DigiCert Global Root G2
depth=1 C=US, O=DigiCert Inc, OU=www.digicert.com, CN=RapidSSL TLS RSA CA G1
depth=0 CN=*.2talk.co.nz
Verification: OK
Protocol: TLSv1.3
Verify return code: 0 (ok)
```

Ne ricavi tre cose: il certificato è un wildcard per `*.2talk.co.nz`, che copre `lyra.2talk.co.nz`; la catena risale alla radice pubblica di DigiCert; la connessione usa TLS 1.3. `0 (ok)` significa che la verifica del certificato dovrebbe passare.

Ecco cosa succede con un dominio sbagliato. Stesso server, verificato rispetto a un nome che non copre:

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname sip.example.com </dev/null
Verification error: hostname mismatch
Verify return code: 62 (hostname mismatch)
```

WaveKat Voice rifiuta quella connessione con un errore di certificato. I codici che vedrai più spesso:

| Risultato | Significato |
|---|---|
| `0 (ok)` | Attendibile e valido per il tuo dominio SIP |
| `62 (hostname mismatch)` | Il certificato non è emesso per questo dominio SIP. Verifica il dominio con l'operatore |
| `18`, `19` o `20` | Autofirmato o emesso da una CA privata. Il sistema non lo considera attendibile |
| Connessione rifiutata o scaduta | Su quell'host e porta non c'è TLS, oppure un firewall lo blocca |

OpenSSL usa il proprio pacchetto di CA. Sulla maggior parte dei sistemi Linux coincide con l'archivio di sistema; su Mac spesso no, quindi lì prendi un `20` come un indizio, non come un verdetto.

### Passo 3 (facoltativo): annota l'impronta del certificato

Per confrontarla con l'impronta nell'errore di certificato di WaveKat Voice, stampa l'impronta SHA-256 del certificato e la sua scadenza:

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 -servername lyra.2talk.co.nz </dev/null 2>/dev/null \
    | openssl x509 -noout -fingerprint -sha256 -enddate
sha256 Fingerprint=1D:64:FB:48:21:19:A1:CB:18:43:3B:20:9A:BB:03:96:A1:D2:43:9A:E6:F3:A4:B4:35:3A:33:86:E4:E0:E4:8F
notAfter=Feb 18 23:59:59 2027 GMT
```

OpenSSL la stampa in maiuscolo con i due punti; WaveKat Voice la mostra in minuscolo senza. Le cifre esadecimali sono le stesse. Quando l'operatore rinnova il certificato, l'impronta cambia: è normale.

## Configurazione

1. Trova nella documentazione dell'operatore il nome host e la porta per TLS. La maggior parte usa `5061`; alcuni usano un nome host separato per TLS. L'operatore neozelandese 2talk, per esempio, indica `5061`.
2. Apri la linea e imposta **Connessione** su `TLS`. Il campo della porta suggerisce `5061`.
3. Controlla che il dominio SIP dell'account corrisponda esattamente a quello fornito dall'operatore: è il nome su cui viene verificato il certificato.
4. Salva. La linea si registra di nuovo via TLS.

Una trappola comune: **Connessione** `TCP` con porta `5061` non è TLS. Invia SIP in chiaro a una porta che aspetta un handshake TLS, e la registrazione fallisce.

Le impostazioni delle linee si sincronizzano con il tuo account WaveKat, quindi la linea resta su TLS anche quando accedi da un altro computer.

## Come verificare che sia davvero TLS

Sotto i dettagli di connessione di una linea c'è il link **Dettagli tecnici**. Quella pagina mostra i valori attivi sulla connessione in corso, non quelli che hai inserito:

- **Connessione** è `TLS`;
- **Raggiungibile a** termina con `;transport=tls`;
- in **Messaggi SIP**, ogni `Via` è `SIP/2.0/TLS`.

![WaveKat Voice su Ubuntu: la pagina Dettagli tecnici di una linea, con la connessione attiva su TLS e il dispositivo raggiungibile con transport=tls.](/screenshots/line-technical-details-tls/it.webp)

Un REGISTER da quella linea ha più o meno questo aspetto (un esempio, dalla stessa linea demo dello screenshot):

```
Via: SIP/2.0/TLS 192.0.2.24:5066;branch=z9hG4bK…
Contact: <sip:1001@192.0.2.24:5066;transport=tls>
```

Una cifratura che non puoi controllare è una cifratura a cui devi credere sulla parola. Per questo TLS arriva insieme a un modo per vedere il trasporto effettivamente in uso.

Il registro dei messaggi SIP vive solo in memoria: non viene mai scritto su disco e sparisce quando chiudi l'app. Il `response` nelle intestazioni `Authorization` e `Proxy-Authorization` viene cancellato al momento della cattura, così un registro copiato non consegna l'hash della password a chi lo ricevi.

## Risoluzione dei problemi

| Sintomo | Causa probabile | Soluzione |
|---|---|---|
| "Your provider's server didn't prove it is who it says it is" (il server dell'operatore non ha dimostrato la propria identità) | Il dominio SIP non corrisponde al certificato, oppure l'operatore usa un certificato privato | Controlla il dominio SIP; con un certificato privato, chiedi all'operatore un endpoint con un certificato pubblicamente attendibile |
| "The secure connection to your provider couldn't be set up" (impossibile stabilire la connessione sicura con l'operatore) | Porta sbagliata (spesso 5060), oppure TLS non è offerto su quel nome host | Usa porta e nome host indicati nella documentazione dell'operatore |
| Non si registra affatto dopo il cambio | `TCP` + `5061`, oppure un firewall blocca la 5061 in uscita | Imposta Connessione su `TLS`; consenti TCP 5061 in uscita |
| Funzionava, poi è rimasta non registrata | La connessione TLS è caduta (riavvio dell'operatore, router che chiude le connessioni inattive) e non è stata ristabilita | Premi **Accedi di nuovo** sulla linea |

(Questi due messaggi di errore esistono solo in inglese e compaiono in inglese anche con l'interfaccia in italiano.)

## Limite noto: nessuna riconnessione automatica dopo una caduta TLS

UDP non ha una connessione da perdere, quindi un'interruzione di rete passa inosservata. TLS è un'unica connessione di lunga durata: se l'operatore si riavvia o un router la chiude, la linea resta non registrata finché non premi **Accedi di nuovo**. Se una linea deve rispondere alle chiamate senza nessuno presente, per esempio una a cui risponde di notte un [flusso di chiamata](/it/blog/answer-calls-with-a-call-flow/), tienine conto prima di passare.

## Domande frequenti

### Posso attivare TLS solo per una linea?

Sì. La connessione è un'impostazione per linea, quindi ogni linea può usare UDP, TCP o TLS in modo indipendente.

### Devo usare per forza la porta 5061?

No. 5061 è la porta predefinita per SIP over TLS, ma segui la documentazione del tuo operatore: alcuni usano una porta diversa o un nome host separato.

### TCP sulla porta 5061 equivale a TLS?

No. Così invii SIP in chiaro a una porta TLS, e la registrazione fallisce. Imposta Connessione su `TLS`.

### Quali versioni di TLS sono supportate?

TLS 1.2 e TLS 1.3, le due versioni oggi considerate sicure. TLS 1.0 e 1.1 risalgono al 1999 e al 2006, si basano su algoritmi compromessi come MD5 e SHA-1 e sono stati deprecati formalmente dall'IETF nel 2021 ([RFC 8996](https://www.rfc-editor.org/rfc/rfc8996)); i principali browser li hanno abbandonati da anni. Escluderli significa che una connessione non può essere declassata a un protocollo non sicuro. In pratica non costa nulla: gli operatori SIP attuali supportano TLS 1.2 o superiore, e 2talk, nella nostra prova qui sopra, ha negoziato TLS 1.3.

### Con TLS serve il port forwarding sul router?

No. Le chiamate in arrivo passano sulla connessione TLS che il softphone ha aperto da sé. Il firewall deve solo consentire TCP in uscita sulla 5061, o sulla porta usata dal tuo operatore.

### TLS rallenta le chiamate?

Non in modo percepibile. L'handshake TLS avviene una sola volta, quando si apre la connessione; la registrazione e ogni chiamata successiva riusano la stessa connessione invece di rifare l'handshake.

### Come confermo che una linea è davvero cifrata?

Apri i Dettagli tecnici della linea: Connessione è `TLS`, Raggiungibile a termina con `;transport=tls` e i Messaggi SIP mostrano `Via: SIP/2.0/TLS`.

### Cosa succede se il certificato dell'operatore scade o cambia?

Un certificato scaduto non supera la verifica: la linea si ferma con un errore di certificato e non ripiega mai sul testo in chiaro. Se l'operatore passa a un altro certificato valido di una CA attendibile, non devi fare nulla, perché WaveKat Voice verifica la catena e il dominio SIP invece di fissare un certificato specifico.

### I certificati autofirmati sono supportati?

No. WaveKat Voice considera attendibili solo le CA radice del sistema, quindi un server con un certificato di una CA privata non può connettersi via TLS.

### Che differenza c'è tra SIP over TLS e un indirizzo `sips:`?

Un indirizzo `sips:` richiede TLS su ogni tratto percorso dalla chiamata; un indirizzo `sip:` con `;transport=tls` protegge il tratto corrente. Le linee di WaveKat Voice usano il secondo, che protegge la connessione tra te e il tuo operatore.

## Provalo

[Scarica WaveKat Voice](/it/voice/download/) o aggiorna alla [0.0.56](/it/voice/changelog/#0.0.56), passa una linea a `TLS` e apri Dettagli tecnici per controllare. Le altre impostazioni di connessione sono nella [guida alla configurazione SIP](/docs/voice/sip-trunks/).
