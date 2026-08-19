import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'Der kostenlose, quelloffene SIP-Client. Leistungsfähig und plattformübergreifend — WaveKat Voice tauscht Breite gegen Fokus: ein Desktop-Geschäftstelefon, das jedes Gespräch aufzeichnet, verpasste Anrufe für Sie annimmt und jedes Gespräch in Ihrem CRM ablegt.',
    seoTitle: 'Linphone-Alternative für Mac, Windows & Linux',
    seoDescription:
      'WaveKat Voice vs. Linphone auf Mac, Windows und Linux: ein SIP-Softphone, das jedes Gespräch aufzeichnet, transkribiert, Anrufe annimmt und in HubSpot ablegt.',
    heading: 'Eine Linphone-Alternative für Mac, Windows & Linux',
    intro:
      'WaveKat Voice ist ein Desktop-Geschäftstelefon für Mac, Windows und Linux, das Linphone ersetzen kann: Es verbindet sich genauso über SIP mit Ihrer eigenen Nummer, zeichnet aber jedes Gespräch automatisch auf, schreibt es live mit und sammelt beides in einem durchsuchbaren Verlauf. Anrufe, die Sie nicht annehmen können, beantwortet ein Anrufablauf mit Begrüßung und Mailbox, und jedes Gespräch kann automatisch in Ihrem HubSpot-CRM landen. Linphone ist dagegen ein kostenloser, quelloffener Allzweck-SIP-Client, der nahezu überall läuft. Wenn Sie ein Geschäftstelefon möchten, das sofort einsatzbereit ist, und kein VoIP-Werkzeugkasten, finden Sie hier den Vergleich der beiden.',
    whatItIs: {
      summary:
        'Linphone ist ein langjähriges, quelloffenes SIP-Softphone von Belledonne Communications. Es läuft unter Mac, Windows, Linux, iOS und Android und deckt viel ab — Sprach- und Videoanrufe, Sofortnachrichten sowie Ende-zu-Ende-Verschlüsselung — und das kostenlos.',
      strengths: [
        'Kostenlos und quelloffen, ohne Konto nutzbar',
        'Läuft auf praktisch jeder Plattform, auch mobil',
        'Sprache, Video und Chat in einem Client',
        'Ende-zu-Ende-Verschlüsselung (ZRTP/SRTP) für technisch Versierte',
      ],
    },
    comparison: [
      {
        label: 'Jedes Gespräch aufzeichnen',
        wavekat: 'Automatisch — jedes Gespräch wird aufgezeichnet und in dem Moment gespeichert, in dem Sie auflegen.',
        them: 'Manuelle Aufzeichnung pro Anruf; standardmäßig kein gespeicherter, durchsuchbarer Verlauf.',
      },
      {
        label: 'Schriftliches Transkript',
        wavekat: 'Live-Transkript neben dem Gespräch, gemeinsam mit der Aufnahme gespeichert.',
        them: 'Keine Transkription.',
      },
      {
        label: 'Durchsuchbarer Anrufverlauf',
        wavekat: 'Jedes Gespräch landet samt Aufnahme und Transkript in einem Verlauf.',
        them: 'Nur ein Anrufprotokoll — ohne angehängte Aufnahmen oder Transkripte.',
      },
      {
        label: 'Anrufe annehmen & Mailbox',
        wavekat:
          'Ein Anrufablauf nimmt für Sie ab — Begrüßung, Öffnungszeiten, Telefonmenü, Mailbox oder Weiterleitung — und Sie können während der Nachricht übernehmen.',
        them: 'Kein eigener Anrufbeantworter; die Mailbox ist die Ihres Anbieters, die Linphone anrufen kann.',
      },
      {
        label: 'Anrufe im CRM protokollieren',
        wavekat:
          'HubSpot einmal verbinden, und jedes Gespräch legt sich beim passenden Kontakt ab — mit Transkript und abspielbarer Aufnahme. Teil von Pro, im Early Access kostenlos.',
        them: 'Keine CRM-Anbindung; Gespräche bleiben im Protokoll der App.',
      },
      {
        label: 'Ihre Nummer einrichten',
        wavekat: 'Wählen Sie Ihren Anbieter aus einer Liste (Twilio, Telnyx, 2talk und weitere), und die Einstellungen werden für Sie ausgefüllt.',
        them: 'Allgemeine SIP-Felder, die Sie selbst konfigurieren.',
      },
      {
        label: 'Wo Ihre Daten liegen',
        wavekat: 'Standardmäßig auf Ihrem Computer; optionale Anmeldung zur Synchronisierung mit dem Web.',
        them: 'Auf Ihrem Gerät — es ist ein Client; für Sie wird nichts gehostet.',
      },
      {
        label: 'Plattformen',
        wavekat: 'Mac, Windows und Linux (die Windows-Version ist neuer und noch nicht signiert).',
        them: 'Mac, Windows, Linux, iOS, Android.',
      },
      {
        label: 'Video & Chat',
        wavekat: 'Fokussiert auf Anrufe — kein Video, keine Nachrichten.',
        them: 'Sprache, Video und Sofortnachrichten.',
      },
      {
        label: 'Preis',
        wavekat: 'Während der öffentlichen Beta kostenlos; später kostenpflichtig.',
        them: 'Kostenlos und quelloffen.',
      },
    ],
    chooseThem: [
      'Sie möchten einen kostenlosen, quelloffenen Client mit verfügbarem Quellcode',
      'Sie brauchen auf dem Handy oder Tablet dieselbe App wie am Rechner',
      'Sie möchten Videoanrufe und Chat am selben Ort wie Sprache',
      'Es macht Ihnen nichts aus, SIP-Einstellungen selbst zu konfigurieren',
    ],
    chooseWavekat: [
      'Sie möchten, dass jedes Gespräch automatisch aufgezeichnet und mitgeschrieben wird, ganz ohne etwas einzuschalten',
      'Sie möchten einen durchsuchbaren Verlauf aus Gesprächen, Aufnahmen und Transkripten',
      'Sie wählen Ihren Anbieter lieber aus einer Liste, als SIP-Felder auszufüllen',
      'Sie möchten, dass Anrufe, die Sie nicht annehmen können, beantwortet werden — mit Begrüßung, Öffnungszeiten und einer Mailbox, die die Nachricht mitschreibt',
      'Sie möchten, dass jedes Gespräch in Ihrem HubSpot-CRM landet, ohne dass jemand daran denken muss',
      'Sie möchten ein fokussiertes Desktop-Geschäftstelefon, kein universelles VoIP-Werkzeug',
    ],
    faqs: [
      {
        q: 'Kann sich WaveKat Voice mit demselben SIP-Anbieter wie Linphone verbinden?',
        a: 'Ja. Beide sind SIP-Softphones, daher funktioniert jeder Anbieter, der mit Linphone funktioniert, auch mit WaveKat Voice. Der Unterschied liegt in der Einrichtung: WaveKat Voice füllt die Einstellungen für gängige Anbieter wie Twilio, Telnyx und 2talk aus und lässt Sie die Details für alles andere selbst eingeben.',
      },
      {
        q: 'Läuft WaveKat Voice unter Windows?',
        a: 'Ja. WaveKat Voice unterstützt Windows 10 und 11 mit getrennten Installationsprogrammen für Intel/AMD (x64) und ARM64, neben den Versionen für Mac und Linux. Die Windows-Version ist jünger als die beiden anderen und noch nicht signiert, daher warnt Windows beim ersten Start vor einem unbekannten Herausgeber. Linphone hat ebenfalls eine Windows-Version.',
      },
      {
        q: 'Zeichnet und transkribiert Linphone Gespräche wie WaveKat Voice?',
        a: 'Linphone kann ein einzelnes Gespräch aufzeichnen, wenn Sie es manuell starten, aber es transkribiert Gespräche nicht und führt keinen durchsuchbaren Verlauf von Aufnahmen und Transkripten. WaveKat Voice zeichnet jedes Gespräch automatisch auf, schreibt parallel ein Live-Transkript und speichert beides ohne jede Einrichtung in Ihrem Anrufverlauf.',
      },
      {
        q: 'Hat WaveKat Voice eine Mailbox, oder nimmt es Anrufe an, wenn ich nicht kann?',
        a: 'Ja — genau das macht ein Anrufablauf. Richten Sie einen Ablauf auf eine Ihrer Leitungen, und WaveKat Voice nimmt mit einer Begrüßung ab, prüft Ihre Öffnungszeiten, spielt ein Telefonmenü, nimmt eine Nachricht auf oder leitet weiter. Nachrichten werden wie jedes andere Gespräch aufgezeichnet und transkribiert, und Sie können übernehmen, während jemand noch spricht. Begrüßung, Nachricht aufnehmen und Sie anklingeln sind kostenlos; Telefonmenüs, Öffnungszeiten und Weiterleitungen gehören zu Pro — im Early Access ein Jahr gratis. Der Ablauf läuft auf Ihrem eigenen Computer, die App muss also laufen, um abzunehmen. Linphone hat keinen eigenen Anrufbeantworter; die Mailbox ist dort die Ihres Anbieters.',
      },
      {
        q: 'Kann WaveKat Voice Anrufe in HubSpot protokollieren?',
        a: 'Ja. Verbinden Sie Ihr HubSpot-Konto einmal, und jedes Gespräch, das Sie annehmen oder führen, legt sich beim passenden Kontakt ab — mit Zeit, Richtung, Ergebnis, Dauer, Transkript und einer Aufnahme, die Sie direkt in HubSpot abspielen. Es ist eine Pro-Funktion, im Early Access kostenlos; für jedes andere CRM gibt es Webhooks. Linphone hat keine CRM-Anbindung.',
      },
      {
        q: 'Gibt es WaveKat Voice auf Deutsch?',
        a: 'Ja. Die App gibt es in neun Sprachen — Deutsch, Englisch, Chinesisch (vereinfacht und traditionell), Japanisch, Koreanisch, Spanisch, Französisch und Italienisch — und Sie wechseln sie in den Einstellungen.',
      },
      {
        q: 'Ist WaveKat Voice quelloffen wie Linphone?',
        a: 'Nein — WaveKat Voice ist ein kommerzielles Produkt, während der öffentlichen Beta kostenlos. Mehrere der zugrunde liegenden Bausteine sind auf unserem GitHub quelloffen, die Voice-App selbst jedoch nicht.',
      },
    ],
  },
];
