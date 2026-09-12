import type { TermsDoc } from '../terms';

// Deutsch. Übersetzung von ./en.ts — Struktur, Abschnitts-ids und Reihenfolge
// sind identisch, damit /de/terms/#recording auflöst und die hreflang-Paare
// gegenseitig stimmen. Siezen, wie auf dem Rest der Website.
export const terms: TermsDoc = {
  seoTitle: 'Nutzungsbedingungen — WaveKat',
  seoDescription:
    'Die Vereinbarung zwischen Ihnen und WaveKat: wofür Sie WaveKat Voice nutzen dürfen, warum keine Notrufe möglich sind und wer für Aufzeichnungen haftet.',
  h1: 'Nutzungsbedingungen',
  updatedPrefix: 'Zuletzt aktualisiert am',
  lead: [
    'Diese Bedingungen sind die Vereinbarung zwischen Ihnen und WaveKat. Sie gelten für die App WaveKat Voice, Ihr WaveKat-Konto und diese Website. Wer eines davon nutzt, akzeptiert, was hier steht.',
    'Wir haben das so geschrieben wie die [Datenschutzerklärung](/privacy/) — in klarer Sprache, von den Leuten, die das Produkt bauen, einschließlich der unbequemen Stellen. Wenn ein Satz hier unklar ist, schreiben Sie uns, und wir bessern den Satz nach.',
  ],
  highlightsLabel: 'Drei Dinge vorab',
  highlights: [
    '**Mit WaveKat Voice erreichen Sie keine Notrufnummern.** Es ist Software zum Telefonieren, kein Telefonanschluss: Ein Anruf bei 112, 110 oder der örtlichen Notrufnummer kommt möglicherweise nicht zustande oder landet an der falschen Stelle. Halten Sie immer ein Mobiltelefon oder einen Festnetzanschluss bereit, der das kann.',
    '**Für Aufzeichnungen sind Sie verantwortlich, und die Aufzeichnung ist standardmäßig eingeschaltet.** Ob Sie aufzeichnen dürfen und ob Sie das vorher sagen müssen, hängt davon ab, wo Sie und die andere Person sich befinden. In manchen Ländern ist ein Fehler dabei strafbar.',
    '**Das ist Beta-Software von einem sehr kleinen Team.** Sie wird so bereitgestellt, wie sie ist, ohne Gewährleistung, und sie wird sich ändern. Bewahren Sie von allem, dessen Verlust Sie sich nicht leisten können, eigene Kopien auf.',
  ],
  onThisPage: 'Auf dieser Seite',
  sections: [
    {
      id: 'acceptance',
      heading: 'Annahme dieser Bedingungen',
      body: [
        {
          kind: 'p',
          text: 'Sie akzeptieren diese Bedingungen, sobald Sie zum ersten Mal eines der folgenden tun — je nachdem, was zuerst eintritt: WaveKat Voice installieren oder nutzen, ein WaveKat-Konto anlegen oder eine kostenpflichtige Funktion nutzen. Die App fragt beim ersten Start nach Ihrer Zustimmung, und auf der Anmeldeseite steht es über der Schaltfläche — wer WaveKat nutzt, ohne diese Seite je gelesen zu haben, steht aber trotzdem in der Vereinbarung.',
        },
        {
          kind: 'p',
          text: 'Wenn Sie im Namen eines Unternehmens zustimmen, versichern Sie uns damit, dass Sie dieses Unternehmen binden dürfen; „Sie" bedeutet im Folgenden dann das Unternehmen.',
        },
        {
          kind: 'p',
          text: 'Die [Datenschutzerklärung](/privacy/) ist Teil dieser Vereinbarung. Sie beschreibt, was WaveKat erhebt und was auf Ihrem eigenen Rechner bleibt; nichts hier setzt sie außer Kraft.',
        },
      ],
    },
    {
      id: 'who',
      heading: 'Wer WaveKat nutzen darf',
      body: [
        {
          kind: 'p',
          text: 'Sie müssen mindestens 16 Jahre alt sein. WaveKat Voice ist ein Werkzeug für die Arbeit und richtet sich nicht an Kinder.',
        },
        {
          kind: 'p',
          text: 'Sie müssen sich außerdem dort befinden, wo wir das Produkt anbieten dürfen. Wenn Sie in einem Land sind, das von Handelssanktionen für Software dieser Art betroffen ist, oder wenn Sie selbst auf einer Sanktionsliste stehen, dürfen Sie WaveKat nicht nutzen.',
        },
      ],
    },
    {
      id: 'account',
      heading: 'Ihr WaveKat-Konto',
      body: [
        {
          kind: 'p',
          text: 'Für WaveKat Voice brauchen Sie kein Konto. Ohne Konto arbeitet die App vollständig lokal, und alles darin bleibt auf Ihrem Rechner.',
        },
        {
          kind: 'p',
          text: 'Wenn Sie doch eines anlegen, gehört es Ihnen — und Sie passen darauf auf. Die Anmeldung läuft über GitHub, Google oder Apple; das Passwort, das Ihr WaveKat-Konto schützt, ist also eigentlich deren Passwort. Halten Sie es und die zweite Sicherheitsstufe darauf in Ordnung. Schreiben Sie uns an [hello@wavekat.com](mailto:hello@wavekat.com), wenn Sie vermuten, dass jemand anderes hineingekommen ist.',
        },
        {
          kind: 'p',
          text: 'Eine Person, ein Konto. Teilen Sie Ihr Konto nicht mit Kolleginnen und Kollegen und nutzen Sie kein fremdes. Wenn mehrere Menschen im Team es brauchen, legen Sie mehrere Konten an.',
        },
        {
          kind: 'p',
          text: 'Neue Konten müssen gegebenenfalls erst freigeschaltet werden, bevor sie etwas tun können. Das ist kein Urteil über Sie — ein kleines Team schaut nur, wer da ankommt.',
        },
      ],
    },
    {
      id: 'plans',
      heading: 'Free und Pro',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice ist kostenlos herunterzuladen und kostenlos zu nutzen. Einzelne Funktionen gehören zum Pro-Tarif; wo das so ist, sagt die App es vorher und nicht hinterher.',
        },
        {
          kind: 'p',
          text: 'Ein Pro-Tarif läuft ein Jahr ab dem Tag, an dem er beginnt. Preise werden vor der Zahlung in der angegebenen Währung angezeigt, Steuern kommen hinzu, wo das Gesetz es verlangt. Wir können Preise künftig ändern, aber nie für ein Jahr, das Sie bereits bezahlt haben.',
        },
        {
          kind: 'p',
          text: 'Wenn Pro nicht das ist, was Sie erwartet haben, schreiben Sie uns innerhalb von 14 Tagen nach der Zahlung, und wir erstatten sie. Danach hören wir Ihnen weiter zu — eine Erstattung außerhalb dieser Frist liegt in unserem Ermessen, und „es hat aufgehört zu funktionieren und wir konnten es nicht reparieren" ist der Fall, bei dem wir Ja sagen. Wo Ihr örtliches Verbraucherrecht Ihnen mehr gibt, gilt Ihr örtliches Recht.',
        },
      ],
    },
    {
      id: 'licence',
      heading: 'Ihre Lizenz für die App',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice wird Ihnen lizenziert, nicht verkauft. Sie dürfen die App auf den Rechnern installieren und nutzen, die Sie kontrollieren, solange diese Vereinbarung läuft, für Ihre eigene Arbeit oder die Ihres Unternehmens.',
        },
        {
          kind: 'p',
          text: 'Was diese Lizenz nicht umfasst:',
        },
        {
          kind: 'list',
          items: [
            'Die App verkaufen, vermieten, unterlizenzieren oder weiterverbreiten oder sie in etwas bündeln, das Sie verkaufen.',
            'Sie auseinandernehmen — dekompilieren, disassemblieren oder zurückentwickeln — außer soweit Ihr örtliches Recht das unabhängig davon erlaubt, was hier steht.',
            'Den Namen WaveKat oder unsere Marken entfernen oder die App als Ihr eigenes Produkt ausgeben.',
            'Die Prüfungen umgehen, die kostenlose und Pro-Funktionen trennen.',
          ],
        },
        {
          kind: 'p',
          text: 'Die App, die Website und alles darin bleiben unser. Die quelloffenen WaveKat-Bibliotheken, auf denen die App aufbaut, sind eine andere Sache: Sie liegen auf [GitHub](https://github.com/wavekat) unter ihren eigenen Lizenzen, und nichts hier schränkt ein, was Sie damit tun dürfen.',
        },
        {
          kind: 'p',
          text: 'WaveKat Voice aktualisiert sich selbst, damit Fehlerbehebungen die Leute auch erreichen. Wo die App aus einem Store installiert wurde, übernimmt das der Store.',
        },
      ],
    },
    {
      id: 'acceptable',
      heading: 'Wofür Sie WaveKat nicht nutzen dürfen',
      body: [
        {
          kind: 'p',
          text: 'Kurzfassung: Nutzen Sie WaveKat nicht, um jemand anderem etwas anzutun, das Sie sich selbst nicht wünschen würden.',
        },
        {
          kind: 'list',
          items: [
            '**Unerwünschte Anrufe.** Keine automatisierten Anrufkampagnen, keine Kaltakquise per Wählautomat, keine Bandansagen an Menschen, die nichts von Ihnen hören wollten, und nichts, was gegen eine Robinsonliste verstößt.',
            '**Sich als jemand anderes ausgeben.** Senden Sie keine Rufnummernanzeige, die Ihnen nicht zusteht, und nutzen Sie keinen Anrufablauf, um eine Person oder ein Unternehmen vorzutäuschen.',
            '**Menschen unrechtmäßig aufzeichnen.** Siehe den Abschnitt weiter unten — das ist ernst genug für einen eigenen.',
            '**Alles Rechtswidrige oder darauf Gerichtete, jemandem zu schaden** — Betrug, Belästigung, Drohungen oder Beihilfe dazu.',
            '**Den Dienst absichtlich stören** — ihn angreifen, ihn ohne vorherige Absprache mit uns auf Lücken abklopfen oder ihn so automatisieren, dass er für andere schlechter läuft.',
            '**WaveKat als eigenen Telefondienst weiterverkaufen**, ohne eine schriftliche Vereinbarung mit uns.',
          ],
        },
        {
          kind: 'p',
          text: 'Wenn Sie eine Sicherheitslücke finden, sagen Sie es bitte zuerst uns unter [hello@wavekat.com](mailto:hello@wavekat.com) und dann anderen. Wer verantwortungsvoll sucht, hat von uns nichts zu befürchten.',
        },
      ],
    },
    {
      id: 'phone',
      heading: 'Ihr Telefondienst, und Notrufe',
      body: [
        {
          kind: 'p',
          text: '**Auf WaveKat Voice ist für Notrufe kein Verlass.** Es ist Software, die mit einem Telefonanschluss spricht, den Sie ohnehin schon haben. Sie weiß nicht, wo Sie sind, sie kann einer Notrufzentrale nicht sagen, wohin Hilfe geschickt werden soll, und ein Anruf kommt womöglich gar nicht zustande, wenn Ihr Internet, Ihr Rechner oder Ihr Anbieter einen schlechten Tag hat. Halten Sie ein Mobiltelefon oder einen Festnetzanschluss bereit, der Notrufnummern erreicht, und sorgen Sie dafür, dass alle, die diesen Rechner benutzen, das wissen.',
        },
        {
          kind: 'p',
          text: 'Der Telefondienst selbst ist nicht unserer. Sie bringen Ihren eigenen SIP-Anbieter mit, Sie haben Ihren eigenen Vertrag mit ihm, und er — nicht wir — leitet Ihre Gespräche, rechnet sie ab und gibt Ihnen Ihre Rufnummern. Wenn Gespräche nicht zustande kommen, ist der Anbieter meist der richtige Anfang.',
        },
        {
          kind: 'p',
          text: 'Sie sind verantwortlich für das, was Ihr Anbieter Ihnen berechnet, auch für Gespräche, die ein Anrufablauf annimmt oder führt, während Sie nicht zusehen.',
        },
      ],
    },
    {
      id: 'recording',
      heading: 'Aufzeichnen, Transkribieren und Teilen von Gesprächen',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice zeichnet Gespräche auf, und die Aufzeichnung ist nach der Installation eingeschaltet. Aufgezeichnet und transkribiert wird alles auf Ihrem eigenen Rechner.',
        },
        {
          kind: 'p',
          text: '**Ob Sie das dürfen, entscheidet das Recht dort, wo Sie und die andere Person sich befinden, und dafür sind Sie verantwortlich, nicht wir.** An manchen Orten genügt Ihr eigenes Einverständnis. Anderswo müssen alle Beteiligten zustimmen, und in einigen Ländern ist ein Fehler dabei strafbar und nicht bloß ein zivilrechtliches Problem. Die App spielt zu Beginn eines aufgezeichneten Gesprächs aus Höflichkeit einen Hinweiston ab — ein Ton ist keine Einwilligung.',
        },
        {
          kind: 'p',
          text: 'Wenn Sie unsicher sind: Sagen Sie, dass Sie aufzeichnen, oder schalten Sie die Aufzeichnung in den Einstellungen aus. Beides dauert einen Moment, und keines von beidem lässt sich nachträglich nachholen.',
        },
        {
          kind: 'p',
          text: 'Dasselbe gilt für das, was Sie danach mit einer Aufnahme tun — sie per Link teilen, sie an einen verbundenen Dienst schicken oder sie aufbewahren. Wenn eine Aufnahme personenbezogene Daten einer anderen Person enthält, sind Sie dafür datenschutzrechtlich verantwortlich, und wir verarbeiten sie in Ihrem Auftrag.',
        },
      ],
    },
    {
      id: 'content',
      heading: 'Ihre Gespräche bleiben Ihre',
      body: [
        {
          kind: 'p',
          text: 'Ihre Aufnahmen, Transkripte, Kontakte, Anrufabläufe und Notizen gehören Ihnen. Wir erheben darauf keinen Eigentumsanspruch und nutzen davon nichts, um Modelle zu trainieren.',
        },
        {
          kind: 'p',
          text: 'Wenn Sie die Cloud-Synchronisierung einschalten, erlauben Sie uns, diese Inhalte zu speichern und zu bewegen — zu genau einem Zweck: den Dienst für Sie zu betreiben, also zwischen Ihren Geräten zu synchronisieren, sie Ihnen auf der Website zu zeigen und eine Aufnahme an jemanden auszuliefern, dem Sie einen Link gegeben haben. Diese Erlaubnis endet, wenn Sie den Inhalt oder Ihr Konto löschen.',
        },
        {
          kind: 'p',
          text: 'Wir können Inhalte entfernen oder ein Konto sperren, wenn wir müssen — bei einer behördlichen oder gerichtlichen Anordnung oder bei Inhalten, die gegen den Abschnitt oben verstoßen. Wir sagen Ihnen Bescheid, wenn das passiert, sofern uns das nicht untersagt ist.',
        },
      ],
    },
    {
      id: 'connected',
      heading: 'Dienste, die Sie verbinden',
      body: [
        {
          kind: 'p',
          text: 'Sie können WaveKat mit anderen Diensten verbinden — einem CRM, einem eigenen Webhook, einem KI-Assistenten auf Ihrem Rechner. Nichts ist verbunden, solange Sie es nicht verbinden.',
        },
        {
          kind: 'p',
          text: 'Sobald Sie es tun, richtet sich das, was dieser Dienst mit dem Empfangenen macht, nach Ihrem Vertrag mit ihm und nicht nach diesem hier. Wenn eine Verbindung ein Transkript irgendwohin schickt, ist dieses Transkript unserer Hand entzogen; das Trennen der Verbindung stoppt den Fluss, holt aber nicht zurück, was schon gegangen ist.',
        },
      ],
    },
    {
      id: 'availability',
      heading: 'Änderungen, und was wir zur Verfügbarkeit nicht versprechen',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice ist in der öffentlichen Beta. Funktionen kommen hinzu, verändern ihre Form und verschwinden gelegentlich. Wir geben uns Mühe, nichts kaputtzumachen, worauf Sie sich verlassen, und sagen auf der [Neuigkeiten-Seite](/voice/changelog/) Bescheid, wenn sich etwas Sichtbares ändert.',
        },
        {
          kind: 'p',
          text: 'Für den Cloud-Teil von WaveKat gibt es keine Verfügbarkeitsgarantie. Es gibt kein Service-Level-Agreement, keine Gutschriften und kein Versprechen, dass die Synchronisierung zu einem bestimmten Zeitpunkt erreichbar ist. Der Entwurfsgedanke dahinter: Das wiegt weniger schwer, als es klingt — die App arbeitet auf Ihrem Rechner weiter, auch wenn unsere Server es nicht tun.',
        },
        {
          kind: 'p',
          text: 'Sollten wir den Dienst je einstellen, kündigen wir das mit angemessener Frist an und geben Ihnen einen Weg, Ihre Daten mitzunehmen.',
        },
      ],
    },
    {
      id: 'warranty',
      heading: 'Keine Gewährleistung',
      body: [
        {
          kind: 'p',
          text: 'WaveKat wird „wie besehen" und „wie verfügbar" bereitgestellt. Wir versprechen nicht, dass es unterbrechungsfrei oder fehlerfrei läuft oder für einen bestimmten Zweck taugt, und wir versprechen nicht, dass ein Anruf zustande kommt, eine Aufnahme entsteht oder ein Transkript stimmt.',
        },
        {
          kind: 'p',
          text: 'Spracherkennung irrt sich, besonders bei Dialekten, Durcheinanderreden und schlechten Leitungen. Behandeln Sie ein Transkript nicht als Protokoll des Gesagten, wenn etwas Wichtiges davon abhängt.',
        },
        {
          kind: 'p',
          text: 'Manche Länder geben Verbraucherinnen und Verbrauchern Rechte, die sich nicht ausschließen lassen — das deutsche und österreichische Gewährleistungsrecht, die Verbraucherregeln der EU, der neuseeländische Consumer Guarantees Act und ihre Entsprechungen. Nichts hier nimmt Ihnen die weg. Wo Sie sie haben, gelten sie zusätzlich zu diesem Abschnitt und gehen ihm vor.',
        },
      ],
    },
    {
      id: 'liability',
      heading: 'Grenzen unserer Verantwortung',
      body: [
        {
          kind: 'p',
          text: 'Soweit das Gesetz es zulässt, haftet WaveKat nicht für mittelbare Schäden oder Folgeschäden — entgangene Geschäfte, entgangenen Gewinn, verlorene Daten, einen Anruf, der nicht zustande kam, oder eine Aufnahme, die Sie gebraucht und nicht bekommen haben.',
        },
        {
          kind: 'p',
          text: 'Soweit wir haften, ist unsere Gesamthaftung Ihnen gegenüber für alles aus dieser Vereinbarung auf den Betrag begrenzt, den Sie uns in den zwölf Monaten vor dem beanstandeten Ereignis gezahlt haben — und wenn Sie uns nie etwas gezahlt haben, auf 100 NZD.',
        },
        {
          kind: 'p',
          text: 'Nichts davon begrenzt eine Haftung, die sich nicht begrenzen lässt: eigener Vorsatz oder Arglist, Schäden an Leben, Körper und Gesundheit, die wir verursacht haben, oder eine Verbrauchergarantie, die nicht ausgeschlossen werden kann.',
        },
        {
          kind: 'p',
          text: 'Wenn Ihre Nutzung von WaveKat dazu führt, dass jemand anderes Ansprüche gegen uns erhebt — wegen eines Anrufs, den Sie geführt, einer Person, die Sie aufgezeichnet, oder eines Inhalts, den Sie geteilt haben —, tragen Sie, was uns das kostet.',
        },
      ],
    },
    {
      id: 'ending',
      heading: 'Beendigung der Vereinbarung',
      body: [
        {
          kind: 'p',
          text: 'Sie können jederzeit aufhören: die App deinstallieren oder Ihr Konto in den Einstellungen löschen — dort steht vor dem Bestätigen, was das Konto enthält. Sie können uns auch schreiben, dann erledigen wir es für Sie.',
        },
        {
          kind: 'p',
          text: 'Wir können ein Konto sperren oder beenden, das gegen diese Bedingungen verstößt, oder wenn wir rechtlich dazu verpflichtet sind. Außer bei Eilbedürftigkeit oder einer behördlichen Anordnung sagen wir Ihnen vorher, worin das Problem besteht, und geben Ihnen Gelegenheit, es abzustellen.',
        },
        {
          kind: 'p',
          text: 'Mit dem Ende der Vereinbarung endet Ihre Lizenz für die App, und wir löschen, was mit Ihrem Konto synchronisiert war. Alles auf Ihrem eigenen Rechner bleibt dort, bis Sie es entfernen. Die Abschnitte über Ihre Inhalte, die Gewährleistung, unsere Haftung sowie Recht und Streitigkeiten gelten danach weiter.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Änderungen dieser Bedingungen',
      body: [
        {
          kind: 'p',
          text: 'Wenn sich diese Bedingungen ändern, ändert sich das Datum oben mit ihnen. Bei einer Änderung, die Ihre Rechte oder den Inhalt Ihrer Zustimmung wesentlich berührt, sagen wir Ihnen vorher Bescheid — in der App oder per E-Mail, wenn Sie ein Konto haben — statt still einen Satz umzuschreiben.',
        },
        {
          kind: 'p',
          text: 'Wenn Sie eine Änderung nicht annehmen, beenden Sie die Nutzung von WaveKat und löschen Sie Ihr Konto, bevor sie wirksam wird. Weiternutzen ist die Art, sie anzunehmen.',
        },
      ],
    },
    {
      id: 'law',
      heading: 'Recht und Streitigkeiten',
      body: [
        {
          kind: 'p',
          text: 'Für diese Vereinbarung gilt neuseeländisches Recht, und für Streitigkeiten darüber sind die neuseeländischen Gerichte zuständig. Wenn Sie anderswo Verbraucherin oder Verbraucher sind, nimmt Ihnen das weder den Schutz des Rechts Ihres eigenen Landes noch Ihr Recht, an Ihrem Wohnort zu klagen.',
        },
        {
          kind: 'p',
          text: 'Bevor irgendjemand in die Nähe eines Gerichts kommt: Schreiben Sie an [hello@wavekat.com](mailto:hello@wavekat.com). Ein Mensch liest das, und fast alles lässt sich auf diesem Weg billiger lösen.',
        },
        {
          kind: 'p',
          text: 'Diese Bedingungen und die Datenschutzerklärung sind die vollständige Vereinbarung zwischen uns über WaveKat. Hält ein Gericht einen Teil davon für unwirksam, bleibt der Rest bestehen. Wenn wir etwas nicht sofort durchsetzen, geben wir es damit nicht auf.',
        },
      ],
    },
  ],
  faqHeading: 'Fragen & Antworten',
  faqs: [
    {
      q: 'Muss ich etwas zustimmen, um WaveKat Voice zu nutzen?',
      a: 'Ja. WaveKat Voice bittet Sie beim ersten Start um Ihre Zustimmung zu diesen Bedingungen und um die Kenntnisnahme der Datenschutzerklärung, bevor Sie irgendetwas einrichten. Ein WaveKat-Konto brauchen Sie nicht — ohne Konto arbeitet die App vollständig auf Ihrem eigenen Rechner —, die Vereinbarung müssen Sie aber annehmen.',
    },
    {
      q: 'Kann ich mit WaveKat Voice den Notruf 112 wählen?',
      a: 'Nein. Gehen Sie davon aus, dass Notrufnummern nicht erreichbar sind. Es ist Software auf Ihrem Rechner, sie kennt Ihre Adresse nicht, und ein Notruf kann scheitern oder an der falschen Stelle landen. Halten Sie immer ein Mobiltelefon oder einen Festnetzanschluss bereit, der das kann, und sorgen Sie dafür, dass alle anderen am Rechner das wissen.',
    },
    {
      q: 'Darf ich meine Gespräche mit WaveKat Voice aufzeichnen?',
      a: 'Das hängt davon ab, wo Sie und die angerufene Person sich befinden, und dafür sind Sie verantwortlich, nicht wir. An manchen Orten genügt Ihr Einverständnis; anderswo müssen alle Beteiligten zustimmen, und ein Fehler kann strafbar sein. Wenn Sie unsicher sind, sagen Sie, dass Sie aufzeichnen, oder schalten Sie die Aufzeichnung in den Einstellungen aus.',
    },
    {
      q: 'Gehören meine Aufnahmen WaveKat, oder werden sie zum Training genutzt?',
      a: 'Beides nein. Ihre Aufnahmen, Transkripte, Kontakte und Anrufabläufe gehören Ihnen. Wenn Sie die Cloud-Synchronisierung einschalten, erlauben Sie uns, sie zu speichern und zu bewegen, damit der Dienst für Sie funktioniert; diese Erlaubnis endet, wenn Sie den Inhalt oder Ihr Konto löschen.',
    },
    {
      q: 'Bekomme ich Geld für einen Pro-Tarif zurück?',
      a: 'Ja — schreiben Sie innerhalb von 14 Tagen nach der Zahlung an hello@wavekat.com, und wir erstatten sie. Danach liegt es in unserem Ermessen, und „es hat aufgehört zu funktionieren und wir konnten es nicht reparieren" ist der Fall, bei dem wir Ja sagen. Wo Ihr örtliches Verbraucherrecht Ihnen mehr gibt, gilt Ihr örtliches Recht.',
    },
    {
      q: 'Was passiert mit meinen Daten, wenn ich aufhöre?',
      a: 'Löschen Sie Ihr Konto in den Einstellungen, dann löschen wir, was damit synchronisiert war; die App zeigt Ihnen vor dem Bestätigen, was das Konto enthält. Alles auf Ihrem eigenen Rechner bleibt dort, bis Sie es entfernen — das geht auf demselben Bildschirm.',
    },
  ],
  contactHeading: 'Kontakt',
  contactIntro:
    'Wenn etwas auf dieser Seite unklar ist oder Sie eine Klausel für falsch halten — schreiben Sie uns, ein Mensch antwortet.',
};
