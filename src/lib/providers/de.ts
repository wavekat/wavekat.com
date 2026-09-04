import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Nutzen Sie Ihre 2talk-Nummer unter Mac, Windows oder Linux mit einem abofreien Softphone, das jedes Gespräch aufzeichnet und transkribiert.',
    seoTitle: '2talk-Softphone für Mac, Windows & Linux',
    seoDescription:
      'Ihre 2talk-Nummer auf Mac, Windows oder Linux: WaveKat Voice ist ein abofreies SIP-Softphone, das jedes Gespräch aufzeichnet und transkribiert. Bria-Ersatz.',
    heading: 'Das abofreie Softphone für 2talk unter Mac, Windows & Linux',
    intro:
      'WaveKat Voice ist ein Desktop-Softphone, das sich über SIP mit Ihrem 2talk-Konto verbindet und jedes Gespräch automatisch aufzeichnet und transkribiert. Es läuft unter Mac, Windows und Linux, ist während der öffentlichen Beta kostenlos und kommt ohne monatliches Abonnement — so bringen Sie Ihre 2talk-Nummer auf Ihren Computer, ohne für Bria zu zahlen. 2talk-Anrufe, die Sie nicht annehmen können, beantwortet ein Anrufablauf mit Begrüßung und Mailbox, und jedes Gespräch kann automatisch in Ihrem HubSpot-CRM landen.',
    setup: {
      heading: 'So richten Sie ein 2talk-Softphone ein',
      summary:
        '2talk ist in der geführten Anbieterliste von WaveKat Voice enthalten, sodass Sie keine SIP-Felder von Hand ausfüllen — Sie wählen 2talk und geben Ihre Nummer und Ihr Passwort ein.',
      steps: [
        'Laden Sie WaveKat Voice herunter und öffnen Sie es auf Ihrem Mac-, Windows- oder Linux-Computer.',
        'Fügen Sie ein Konto hinzu und wählen Sie 2talk aus der Anbieterliste.',
        'Geben Sie Ihre 2talk-Telefonnummer und das zugehörige SIP-Passwort ein.',
        'WaveKat Voice registriert sich bei 2talk, und Sie können telefonieren — und jedes Gespräch wird automatisch aufgezeichnet und transkribiert.',
      ],
      note: 'Lieber alles von Hand eingeben? Bei den meisten neuseeländischen Konten verwendet 2talk einen einzigen SIP-Server — sip.2talk.co.nz — für Domain, Proxy und Outbound-Proxy. (Die neuere Lyra-Plattform von 2talk nutzt eigene Einstellungen.) Wählen Sie 2talk in WaveKat Voice, und diese Angaben werden für Sie ausgefüllt.',
    },
    comparisonHeading: '2talk-Softphones im Vergleich',
    columns: ['WaveKat Voice', 'Bria (über 2talk)', 'MicroSIP'],
    comparison: [
      {
        label: 'Preis',
        cells: [
          'Während der öffentlichen Beta kostenlos; später kostenpflichtig.',
          'NZ$5.95 + GST / Monat über 2talk (Stand Juli 2026), bis zu 4 Geräte.',
          'Kostenlos und quelloffen.',
        ],
      },
      {
        label: 'Plattformen',
        cells: [
          'Mac, Windows und Linux (Windows über den Microsoft Store).',
          'Windows, Mac, iOS und Android.',
          'Nur Windows.',
        ],
      },
      {
        label: 'Zeichnet jedes Gespräch auf',
        cells: [
          'Automatisch — jedes Gespräch wird in dem Moment aufgezeichnet, in dem Sie auflegen.',
          'Manuell pro Anruf; die Anrufaufzeichnung ist eine kostenpflichtige Stufe.',
          'Manuelle Aufzeichnung pro Anruf.',
        ],
      },
      {
        label: 'Schriftliches Transkript',
        cells: ['Live-Transkript, gemeinsam mit der Aufnahme gespeichert.', 'Keine Transkription.', 'Keine Transkription.'],
      },
      {
        label: 'Durchsuchbarer Anrufverlauf',
        cells: [
          'Gespräche, Aufnahmen und Transkripte in einem durchsuchbaren Verlauf.',
          'Anrufprotokoll; Aufnahmen bei einem Abo.',
          'Nur Anrufprotokoll.',
        ],
      },
      {
        label: '2talk-Einrichtung',
        cells: [
          '2talk aus einer Liste wählen; Nummer und Passwort eingeben.',
          'Von 2talk bereitgestellt, wenn Sie es dort kaufen.',
          'Allgemeine SIP-Felder selbst eingeben.',
        ],
      },
      {
        label: 'Anrufe annehmen & Mailbox',
        cells: [
          'Ein Anrufablauf nimmt für Sie ab — Begrüßung, Öffnungszeiten, Menü, Mailbox oder Weiterleitung — und die Nachricht wird transkribiert.',
          'Nimmt selbst nicht ab — 2talks eigene Mailbox nimmt die Nachricht auf.',
          'Nimmt selbst nicht ab — 2talks eigene Mailbox nimmt die Nachricht auf.',
        ],
      },
      {
        label: 'Anrufe im CRM protokollieren',
        cells: [
          'HubSpot einmal verbinden, und jedes Gespräch legt sich mit Transkript beim passenden Kontakt ab. Teil von Pro, im Early Access kostenlos.',
          'Nicht Teil der App, die 2talk weiterverkauft.',
          'Nein — ein reiner SIP-Dialer.',
        ],
      },
      {
        label: 'Mobil & Push-Benachrichtigungen',
        cells: [
          'Nur Desktop — keine Handy-App und kein mobiles Push.',
          'iOS- und Android-Apps mit Push-Benachrichtigungen.',
          'Keine mobile App (nur Windows-Desktop).',
        ],
      },
    ],
    whatItIs: {
      heading: 'Was 2talk Ihnen zum Telefonieren bietet',
      summary:
        '2talk ist ein neuseeländischer VoIP-Anbieter, der Ihnen eine Telefonnummer und SIP-Zugangsdaten bereitstellt. Für Apps verweist es auf sein eigenes 2talk Connect-Softphone und verkauft Bria, ein kostenpflichtiges Softphone, für NZ$5.95 + GST pro Monat weiter — und da Ihr Konto Standard-SIP ist, kann sich auch jedes andere SIP-Softphone damit registrieren.',
      strengths: [
        'Eine neuseeländische Telefonnummer mit lokalem Support und lokaler Abrechnung',
        'Bria deckt iPhone, Android, Mac und Windows in einer kostenpflichtigen App ab',
        'Zuverlässige mobile Push-Benachrichtigungen über Bria oder Acrobits Groundwire',
        'Funktioniert mit jedem SIP-Softphone, nicht nur mit den von 2talk empfohlenen Apps',
      ],
    },
    chooseHeading: 'Welches passt zu Ihnen',
    chooseWavekatLabel: 'Wählen Sie WaveKat Voice, wenn',
    chooseWavekat: [
      'Sie an einem Mac-, Windows- oder Linux-Computer arbeiten und ein echtes Desktop-Softphone für 2talk möchten',
      'Sie möchten, dass jedes 2talk-Gespräch automatisch aufgezeichnet und mitgeschrieben wird, ganz ohne etwas einzuschalten',
      'Sie lieber kein monatliches Abo zahlen möchten, um über Ihre 2talk-Nummer zu telefonieren',
      'Sie einen durchsuchbaren Verlauf aus Gesprächen, Aufnahmen und Transkripten möchten',
      'Sie möchten, dass 2talk-Anrufe, die Sie nicht annehmen können, beantwortet werden — mit Begrüßung, Öffnungszeiten und einer Mailbox, die die Nachricht mitschreibt',
      'Sie möchten, dass jedes 2talk-Gespräch in Ihrem HubSpot-CRM landet, ohne dass es jemand einträgt',
    ],
    chooseOtherLabel: 'Wählen Sie Bria oder MicroSIP, wenn',
    chooseOther: [
      'Sie 2talk auf Ihrem iPhone oder Android mit zuverlässigen Push-Benachrichtigungen brauchen — das ist Bria oder Groundwire',
      'Sie eine einzige App möchten, die auch mobil abdeckt, und es Ihnen nichts ausmacht, 2talk für Bria zu zahlen',
      'Sie unter Windows den kleinstmöglichen Client möchten und nichts weiter — das ist MicroSIP',
      'Sie eine App möchten, die 2talk offiziell unterstützt und für Sie einrichtet',
    ],
    faqsHeading: 'Häufige Fragen',
    faqs: [
      {
        q: 'Funktioniert WaveKat Voice mit 2talk?',
        a: 'Ja. WaveKat Voice ist ein SIP-Softphone, und 2talk ist in seiner geführten Anbieterliste enthalten — Sie wählen also 2talk, geben Ihre 2talk-Nummer und Ihr SIP-Passwort ein, und es registriert sich, ganz ohne manuelle SIP-Konfiguration. Es läuft unter Mac, Windows und Linux, und jedes Gespräch wird automatisch aufgezeichnet und transkribiert.',
      },
      {
        q: 'Was ist das beste Softphone für 2talk unter Mac, Windows oder Linux?',
        a: 'Wenn Sie ein abofreies Desktop-Softphone für 2talk möchten, das außerdem jedes Gespräch aufzeichnet und transkribiert, ist WaveKat Voice genau dafür gemacht — auf allen drei Desktops: Mac, Windows und Linux. 2talks eigene kostenpflichtige Empfehlung Bria deckt zusätzlich iPhone und Android ab; MicroSIP ist kostenlos, aber nur für Windows und zeichnet weder auf noch transkribiert es.',
      },
      {
        q: 'Gibt es ein kostenloses 2talk-Softphone statt Bria?',
        a: 'Über 2talk gekauftes Bria kostet NZ$5.95 + GST pro Monat (Stand Juli 2026). Die kostenlosen Optionen sind WaveKat Voice unter Mac, Windows und Linux — während der öffentlichen Beta kostenlos — und MicroSIP unter Windows. Beide registrieren sich über SIP mit Ihrer 2talk-Nummer.',
      },
      {
        q: 'Kann ich meine 2talk-Nummer auf einem Mac nutzen?',
        a: 'Ja. Jedes SIP-Softphone kann eine 2talk-Nummer auf einem Mac registrieren — einschließlich der von 2talk weiterverkauften Bria-App und WaveKat Voice. WaveKat Voice ergänzt automatische Anrufaufzeichnung und Transkription und erhebt während der Beta keine monatliche Gebühr. Unter Windows und Linux funktioniert es genauso.',
      },
      {
        q: 'Verarbeitet WaveKat Voice 2talk-Push-Benachrichtigungen auf meinem Handy?',
        a: 'Nein — WaveKat Voice ist eine Desktop-App für Mac, Windows und Linux und läuft nicht auf Handys, sodass es keine mobilen Push-Benachrichtigungen liefern kann. Für zuverlässig eingehende Anrufe auf einem iPhone oder Android mit 2talk nutzen Sie Bria oder Acrobits Groundwire. Auf dem Desktop bleibt WaveKat Voice registriert und klingelt, solange die App geöffnet ist.',
      },
      {
        q: 'Gibt es ein 2talk-Softphone für Windows?',
        a: 'Ja. WaveKat Voice läuft unter Windows 10 und 11 aus dem Microsoft Store — ein Eintrag, der sowohl das Intel/AMD-Paket (x64) als auch das ARM64-Paket enthält — und 2talk steht in seiner geführten Anbieterliste. Direkte .exe-Installationsprogramme gibt es ebenfalls; sie sind noch nicht signiert, deshalb warnt Windows beim ersten Start vor einem unbekannten Herausgeber, während das Store-Paket von Microsoft signiert ist. Die anderen Windows-Optionen sind MicroSIP und das von 2talk weiterverkaufte Bria.',
      },
      {
        q: 'Nimmt WaveKat Voice meine 2talk-Anrufe an, wenn ich nicht da bin?',
        a: 'Ja. Ein Anrufablauf nimmt die Leitung für Sie ab — mit einer Begrüßung, einer Prüfung Ihrer Öffnungszeiten, einem Telefonmenü, einer Nachricht oder einer Weiterleitung. Die Nachricht wird wie jedes andere Gespräch aufgezeichnet und transkribiert, Sie können sie also lesen statt abhören, und Sie können den Anruf übernehmen, während jemand noch spricht. Begrüßung, Nachricht aufnehmen und Sie anklingeln sind kostenlos; Telefonmenüs, Öffnungszeiten und Weiterleitungen gehören zu Pro, im Early Access ein Jahr gratis. Der Ablauf läuft auf Ihrem eigenen Computer, die App muss also laufen — sonst übernimmt 2talks eigene Mailbox.',
      },
      {
        q: 'Kann WaveKat Voice meine 2talk-Anrufe in HubSpot protokollieren?',
        a: 'Ja. Verbinden Sie Ihr HubSpot-Konto einmal, und jedes 2talk-Gespräch, das Sie annehmen oder führen, legt sich beim passenden Kontakt ab — mit Zeit, Richtung, Ergebnis, Dauer, Transkript und einer Aufnahme, die Sie direkt in HubSpot abspielen. Es ist eine Pro-Funktion, im Early Access kostenlos; für jedes andere CRM gibt es Webhooks.',
      },
      {
        q: 'Wie richte ich ein Softphone für 2talk ein?',
        a: 'Fügen Sie in WaveKat Voice ein Konto hinzu, wählen Sie 2talk aus der Anbieterliste und geben Sie Ihre 2talk-Nummer und Ihr SIP-Passwort ein — die SIP-Einstellungen werden für Sie ausgefüllt. Bei den meisten neuseeländischen Konten verwendet 2talk einen einzigen SIP-Server, sip.2talk.co.nz, für Domain, Proxy und Outbound-Proxy; die neuere Lyra-Plattform von 2talk nutzt eigene Einstellungen — verwenden Sie also die von 2talk bereitgestellten Angaben, falls Ihr Konto auf Lyra läuft.',
      },
    ],
    whatWavekatDoesLabel: 'Was WaveKat Voice macht',
  },
];
