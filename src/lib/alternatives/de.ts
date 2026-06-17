import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'Der kostenlose, quelloffene SIP-Client. Leistungsfähig und plattformübergreifend — WaveKat Voice tauscht Breite gegen Fokus: ein Desktop-Geschäftstelefon, das jedes Gespräch automatisch aufzeichnet und mitschreibt.',
    seoTitle: 'WaveKat Voice — eine Linphone-Alternative für Mac und Linux',
    seoDescription:
      'Wie sich WaveKat Voice unter Mac und Linux mit Linphone vergleicht: ein fokussiertes Geschäftstelefon, das jedes Gespräch automatisch aufzeichnet und transkribiert, mit geführter Anbieter-Einrichtung. Kostenlose öffentliche Beta.',
    heading: 'Eine Linphone-Alternative für Mac und Linux',
    intro:
      'Linphone ist ein leistungsfähiger, kostenloser SIP-Client, der nahezu überall läuft. Wenn Sie eigentlich ein Desktop-Geschäftstelefon möchten, das jedes Gespräch aufzeichnet und mitschreibt — und sich ohne manuelles Ausfüllen von SIP-Feldern einrichten lässt —, finden Sie hier den Vergleich der beiden unter Mac und Linux.',
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
        label: 'Ihre Nummer einrichten',
        wavekat: 'Wählen Sie Ihren Anbieter aus einer Liste, und die Einstellungen werden für Sie ausgefüllt.',
        them: 'Allgemeine SIP-Felder, die Sie selbst konfigurieren.',
      },
      {
        label: 'Wo Ihre Daten liegen',
        wavekat: 'Standardmäßig auf Ihrem Computer; optionale Anmeldung zur Synchronisierung mit dem Web.',
        them: 'Auf Ihrem Gerät — es ist ein Client; für Sie wird nichts gehostet.',
      },
      {
        label: 'Plattformen',
        wavekat: 'Mac und Linux heute (Windows bei entsprechender Nachfrage).',
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
      'Sie brauchen dieselbe App unter Mac, Windows, Linux und mobil',
      'Sie möchten Videoanrufe und Chat am selben Ort wie Sprache',
      'Es macht Ihnen nichts aus, SIP-Einstellungen selbst zu konfigurieren',
    ],
    chooseWavekat: [
      'Sie möchten, dass jedes Gespräch automatisch aufgezeichnet und mitgeschrieben wird, ganz ohne etwas einzuschalten',
      'Sie möchten einen durchsuchbaren Verlauf aus Gesprächen, Aufnahmen und Transkripten',
      'Sie wählen Ihren Anbieter lieber aus einer Liste, als SIP-Felder auszufüllen',
      'Sie möchten ein fokussiertes Desktop-Geschäftstelefon, kein universelles VoIP-Werkzeug',
    ],
    faqs: [
      {
        q: 'Kann sich WaveKat Voice mit demselben SIP-Anbieter wie Linphone verbinden?',
        a: 'Ja. Beide sind SIP-Softphones, daher funktioniert jeder Anbieter, der mit Linphone funktioniert, auch mit WaveKat Voice. Der Unterschied liegt in der Einrichtung: WaveKat Voice füllt die Einstellungen für gängige Anbieter wie Twilio, Telnyx und 2talk aus und lässt Sie die Details für alles andere selbst eingeben.',
      },
      {
        q: 'Zeichnet und transkribiert Linphone Gespräche wie WaveKat Voice?',
        a: 'Linphone kann ein einzelnes Gespräch aufzeichnen, wenn Sie es manuell starten, aber es transkribiert Gespräche nicht und führt keinen durchsuchbaren Verlauf von Aufnahmen und Transkripten. WaveKat Voice zeichnet jedes Gespräch automatisch auf, schreibt parallel ein Live-Transkript und speichert beides ohne jede Einrichtung in Ihrem Anrufverlauf.',
      },
      {
        q: 'Ist WaveKat Voice quelloffen wie Linphone?',
        a: 'Nein — WaveKat Voice ist ein kommerzielles Produkt, während der öffentlichen Beta kostenlos. Mehrere der zugrunde liegenden Bausteine sind auf unserem GitHub quelloffen, die Voice-App selbst jedoch nicht.',
      },
    ],
  },
];
