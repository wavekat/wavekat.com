---
title: "Perché i link telefonici non funzionano sul PC"
description: "Sul telefono clicchi un numero e parte la chiamata; sul computer niente, perché nessuna app gestisce i link tel:. WaveKat Voice risolve su Mac e Linux."
date: 2026-08-07
author: Eason Guo
tags: [voice-ai, chiamate]
lang: "it"
---

Quasi ogni pagina contatti sul web ha un numero di telefono cliccabile. Esistono da decenni. Sul telefono lo tocchi e parte la chiamata. Sul computer clicchi lo stesso identico link e, quasi sempre, non succede niente — oppure succede qualcosa di strano.

Eccone uno da provare adesso, con qualunque cosa tu stia leggendo: <a href="tel:+14155550123">+1 (415) 555-0123</a>. È un numero fittizio riservato, quindi cliccarlo è sicuro: non chiama nessuno. Quello che succede dopo dipende solo dal tuo dispositivo — ed è tutta lì la storia.

## Dove finisce davvero il clic

Un numero di telefono cliccabile è un normale link web, solo che comincia con `tel:` invece che con `https:`. Quando ci clicchi, il browser non prova a chiamare da solo: i browser mostrano pagine, non hanno microfoni e linee telefoniche pronte. Passa il numero al sistema operativo e gli dice: qualcuno vuole chiamare qui.

Il sistema operativo allora guarda in un posto preciso. Immaginalo come una casella con l'etichetta **«app per telefonare»**: l'unica app del dispositivo registrata per gestire le chiamate. Chi sta nella casella riceve il numero. Se la casella è vuota, il numero non ha dove andare.

Quella casella spiega tutto quello che viene dopo.

## Perché sul telefono funziona sempre

Il tuo telefono ha una sola cosa che fa chiamate: l'app Telefono. È integrata, non si può togliere, e sta sempre nella casella. Quando tocchi un numero, il telefono non deve chiederti cosa intendevi: il numero va dritto all'app Telefono, e squilla.

Ecco perché sul telefono i link telefonici sembrano così naturali che probabilmente non ci hai mai pensato. Non c'è mai stata una domanda a cui rispondere.

## Cosa fa il computer con lo stesso clic

Il computer è un'altra bestia. Può far girare cento app che producono suoni, ma non arriva con un'ovvia «cosa che fa telefonate». Quindi la casella è una domanda vera — e ogni sistema operativo risponde a modo suo.

Su un **Mac**, Apple riempie la casella in anticipo con FaceTime. Clicchi un numero e FaceTime si apre proponendo di chiamare *tramite il tuo iPhone* — cosa che funziona solo se un iPhone ce l'hai, è vicino, è collegato allo stesso account e ha quella funzione configurata. Se sei alla scrivania e vuoi solo chiamare un fornitore, raramente è quello che volevi.

Su **Windows**, la casella parte vuota. Compare la finestra «Come vuoi aprire questo elemento?», con una lista di app di solito vuota anche lei, o che ti spedisce sullo store.

Su **Linux**, nessuna app rivendica i link telefonici di serie. Il clic non fa niente. Niente errore, niente finestra — proprio niente.

La cosa da notare: il link non è mai stato rotto. Il sito ha fatto il suo lavoro, il browser ha fatto il suo, il sistema operativo ha bussato alla porta dell'app per telefonare. Solo che non c'era nessuno in casa.

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← il tuo">
  <div class="wk-slot-head">Chi risponde a un link telefonico, dispositivo per dispositivo</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">un telefono</button>
      <button type="button" data-os="mac">un Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac o Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">Un telefono</p>
      <ol class="trace">
        <li><span class="who">Tocchi</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Nella casella</span><span class="what"><span class="slotbox">L'app Telefono — l'unica del telefono che sa chiamare</span></span></li>
        <li><span class="who">Quindi</span><span class="what ok">Squilla.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Un Mac</p>
      <ol class="trace">
        <li><span class="who">Clicchi</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Nella casella</span><span class="what"><span class="slotbox">FaceTime — ce l'ha messa Apple</span></span></li>
        <li><span class="who">Quindi</span><span class="what meh">FaceTime si apre e propone di chiamare tramite il tuo iPhone — se ce l'hai, vicino, e configurato.</span></li>
      </ol>
      <p class="note">Raramente quello che voleva chi è seduto a una scrivania.</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">Clicchi</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Nella casella</span><span class="what"><span class="slotbox is-empty">vuota</span></span></li>
        <li><span class="who">Quindi</span><span class="what no">«Come vuoi aprire questo elemento?» — con una lista quasi sempre vuota.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">Clicchi</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Nella casella</span><span class="what"><span class="slotbox is-empty">vuota</span></span></li>
        <li><span class="who">Quindi</span><span class="what no">Niente. Proprio niente.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac o Linux con WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">Clicchi</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Nella casella</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice — ce l'hai messa tu, con un interruttore</span></span></li>
        <li><span class="who">Quindi</span><span class="what ok">L'app si apre con il numero già inserito. Premi Chiama.</span></li>
      </ol>
    </div>
  </div>
</div>

## Come WaveKat Voice riempie la casella

[WaveKat Voice](/it/voice/) è un'app per telefonare su Mac e Linux: effettua e riceve chiamate vere tramite il tuo operatore, e le registra e trascrive tutte. E può essere lei, la cosa nella casella.

Attivi un interruttore: **Link telefonici**, in Impostazioni → Generali. È spento finché non lo accendi tu, di proposito — prendersi i link telefonici di tutto il computer dev'essere una tua scelta, non qualcosa che un'app si piglia all'installazione. Una volta acceso, cliccare un numero su qualsiasi pagina web fa comparire WaveKat Voice con il numero già inserito nel campo di chiamata. Lo guardi, e premi Chiama.

![WaveKat Voice su Ubuntu — la scheda Nuova chiamata aperta con un numero di telefono già inserito, pronto da comporre.](/screenshots/dial-prefilled/it.webp)

Tutta qui, la funzione. Niente numero da copiare dalla pagina, niente prefisso internazionale da ridigitare nel punto sbagliato. È arrivata con la versione [0.0.43](/it/voice/changelog/#0.0.43), e ne trovi l'annuncio più breve in [Click-to-call: clicca un numero sul web](/it/blog/click-to-call-phone-links/).

## Una pagina web può far telefonare il mio computer?

La domanda che tutti fanno subito dopo — ed è la domanda giusta. No, non può.

Un link può soltanto *richiedere* una chiamata. Di default WaveKat Voice inserisce il numero e poi aspetta che una persona prema Chiama. Non parte niente finché non lo fai tu.

C'è un'impostazione opzionale, «Chiama subito al clic», per chi si fida dei propri clic e vuole un passaggio in meno. È disattivata di default. E anche da accesa si rifiuta di agire se sei già al telefono, o se non è ovvio da quale linea la chiamata debba uscire — in quei casi inserisce il numero e aspetta, esattamente come il comportamento predefinito. E la finestra viene sempre in primo piano, così niente può mai comporre un numero dove non lo vedi.

La casella è potente: proprio per questo l'app che ci sta dentro deve essere prudente.

## Domande frequenti

### Perché cliccando un numero di telefono sul computer non succede niente?

Perché nessuna app sul tuo computer ha rivendicato i link telefonici. Il browser passa il numero al sistema operativo, che cerca un'app per telefonare registrata — e su Windows e Linux di solito non ce n'è una, quindi il clic finisce nel vuoto.

### Un sito web può far partire una chiamata dal mio computer?

No. Un link telefonico può solo richiedere una chiamata, e di default WaveKat Voice si limita a inserire il numero e ad aspettare che tu prema Chiama. Perfino l'impostazione opzionale «Chiama subito al clic» si rifiuta di agire se sei già in chiamata o se la linea in uscita è ambigua.

### Perché sul Mac cliccare un numero di telefono apre FaceTime?

Perché Apple registra FaceTime di serie come gestore dei link telefonici del Mac. FaceTime propone poi di inoltrare la chiamata tramite un iPhone vicino, cosa che funziona solo se ne possiedi uno e hai configurato la funzione. Installando un'altra app di chiamata, come WaveKat Voice, puoi affidare i link telefonici a lei.

### Come faccio ad aprire i link telefonici con WaveKat Voice?

Attiva l'interruttore Link telefonici in Impostazioni → Generali — è disattivato di default. Da quel momento, cliccare un numero su qualsiasi pagina web apre WaveKat Voice con il numero già inserito, pronto da comporre. Funziona su Mac e Linux ed è arrivato con la versione 0.0.43.

## Riprova quel numero

I link telefonici aspettano in silenzio su ogni pagina contatti da decenni; al tuo computer mancava solo qualcuno in casa che rispondesse. Se vuoi che i tuoi clic facciano squillare davvero, [scarica WaveKat Voice](/it/voice/download/) per Mac o Linux, accendi quell'unico interruttore, e riprova il numero in cima a questa pagina.

<script src="/blog/phone-slot/widget.js" defer></script>
