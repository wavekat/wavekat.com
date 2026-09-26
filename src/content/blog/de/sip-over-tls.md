---
title: "SIP over TLS: verschlüsselte SIP-Signalisierung"
description: "WaveKat Voice verbindet sich jetzt per TLS auf Port 5061 mit SIP-Anbietern und verschlüsselt die SIP-Signalisierung vollständig, auf Mac, Windows und Linux."
date: 2026-09-26
author: Eason Guo
tags: [Sprach-KI, SIP, Datenschutz]
lang: "de"
---

WaveKat Voice unterstützt SIP over TLS seit [0.0.56](/de/voice/changelog/#0.0.56). Stellen Sie die **Verbindung** einer Leitung auf `TLS` und den Port auf `5061`. Dann läuft die gesamte SIP-Signalisierung zwischen Softphone und Anbieter über eine verschlüsselte Verbindung: REGISTER, INVITE, REFER, BYE. Das funktioniert auf Mac, Windows und Linux.

## Warum TLS wichtig ist

Jeder Anruf beginnt mit Signalisierung: Ihr Telefon meldet sich beim Anbieter an, sagt, wen es anruft, und baut den Anruf auf. Dieser Verkehr enthält Ihr SIP-Konto, die gewählten Nummern und den Authentifizierungsaustausch. Über unverschlüsseltes UDP kann ihn jeder auf demselben Netzwerkpfad mitlesen.

TLS ist der Standardweg, das zu verhindern. Die Verbindung zwischen WaveKat Voice und Ihrem Anbieter ist verschlüsselt, und die Identität des Anbieters wird geprüft, bevor irgendetwas gesendet wird. Ein Telefon, über das Ihre Geschäftsanrufe laufen, sollte das können. Ihre Kommunikation zu schützen gehört dazu, Ihr Vertrauen zu verdienen. Deshalb kann jede Leitung in WaveKat Voice TLS nutzen.

## Was verschlüsselt wird

| | UDP / TCP | TLS |
|---|---|---|
| REGISTER-Authentifizierung | Klartext | Verschlüsselt |
| Anrufer, Angerufener, Zeitpunkt (INVITE usw.) | Klartext | Verschlüsselt |
| Halten, Weiterleiten, Auflegen | Klartext | Verschlüsselt |
| Audio (RTP) | Klartext | Klartext |
| Serveridentität geprüft | Nein | Ja, per Zertifikat |
| Üblicher Port | 5060 | 5061 |

Die Zeile zur Authentifizierung wird am häufigsten unterschätzt. SIP nutzt Digest-Authentifizierung ([RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)). Das Passwort selbst geht also nie über die Leitung. Aber die `response` im `Authorization`-Header ist ein daraus abgeleiteter Hash. Wer im selben Netzwerk dieses Paket über UDP mitschneidet, kann offline ein Wörterbuch dagegen laufen lassen, und ein schwaches Passwort hält nicht lange. Über TLS gibt es kein Paket zum Mitschneiden.

## Wie SIP over TLS funktioniert

Normales SIP läuft meist über UDP auf Port 5060: Jede Nachricht ist ein eigenes Paket mit lesbarem Text. SIP over TLS tauscht den Transport darunter aus, nicht SIP selbst.

1. **Eine Verbindung.** Das Softphone öffnet eine TCP-Verbindung zum Anbieter, meist auf Port 5061.
2. **Handshake.** Bevor SIP gesendet wird, führen beide Seiten einen TLS-Handshake durch. Der Anbieter legt sein Zertifikat vor. Das Softphone prüft, ob es auf eine vertrauenswürdige Zertifizierungsstelle zurückgeht und für die SIP-Domain ausgestellt ist. Dann einigen sich beide auf Sitzungsschlüssel.
3. **SIP im Tunnel.** Danach läuft jede SIP-Nachricht in beide Richtungen verschlüsselt über dieselbe Verbindung. Die Nachrichten zeigen das selbst an: `Via: SIP/2.0/TLS` und ein `Contact` mit `;transport=tls`.
4. **Die Verbindung bleibt offen.** Die Registrierung hält sie am Leben, und der Anbieter schickt eingehende Anrufe über sie zurück. So erreicht ein eingehendes INVITE auch ein Telefon hinter NAT, ganz ohne Portweiterleitung.

![Sequenzdiagramm von SIP over TLS: WaveKat Voice öffnet eine TCP-Verbindung zum Anbieter auf Port 5061, schließt den TLS-Handshake ab und prüft das Zertifikat gegen die SIP-Domain. Danach laufen REGISTER, die 401-Challenge, das authentifizierte REGISTER, 200 OK und ein eingehendes INVITE über die verschlüsselte Verbindung.](/blog/sip-over-tls/de.svg)

TLS schützt einen Abschnitt: die Strecke zwischen WaveKat Voice und Ihrem Anbieter. Wie Ihr Anbieter den Anruf weiterträgt, zu einem anderen Carrier oder ins Telefonnetz, liegt bei ihm.

## Wie Zertifikate geprüft werden

TLS hält einen Man-in-the-Middle nur auf, wenn die Zertifikatsprüfung streng ist. Unsere:

- **Nur System-Root-Zertifikate.** Zertifikate werden gegen die Liste vertrauenswürdiger CAs Ihres Betriebssystems geprüft. Nichts ist mitgeliefert, es gibt keine Ausnahmen.
- **Geprüft gegen die SIP-Domain, nicht die Serveradresse.** Auch wenn Sie einen separaten Outbound-Server eingetragen haben, muss das Zertifikat für die SIP-Domain des Kontos ausgestellt sein, wie es [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922) verlangt.
- **Ein Fehler stoppt die Leitung.** Kein Rückfall auf Klartext, kein endloses Neuversuchen bei „Verbinden…". Die Leitung schlägt fehl, und die Fehlermeldung nennt den Grund und den SHA-256-Fingerabdruck des Zertifikats:

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

Die TLS-Implementierung ist `rustls` aus Rust. Es gibt also auf keiner Plattform eine Abhängigkeit von OpenSSL.

Selbstsignierte Zertifikate und private CAs werden nicht unterstützt, und es gibt keinen Schalter „diesem Zertifikat vertrauen". Nutzt Ihr Anbieter ein privates Zertifikat, muss diese Leitung bei UDP oder TCP bleiben.

## Das TLS Ihres Anbieters vor dem Umstellen prüfen

Zwei Standardbefehle zeigen, ob das TLS Ihres Anbieters funktionieren wird, bevor Sie in der App etwas ändern. Die Ausgaben unten stammen aus echten Durchläufen am 26. September 2026 gegen zwei SIP-Anbieter: 2talk aus Neuseeland und Telnyx.

### Schritt 1: TLS-Host und Port finden

Manche Anbieter veröffentlichen einen SRV-Eintrag für SIP over TLS ([RFC 3263](https://www.rfc-editor.org/rfc/rfc3263)), der Host und Port nennt. Telnyx tut das:

```sh
$ dig +short SRV _sips._tcp.sip.telnyx.com
1 45 5061 sip-anycast1.telnyx.com.
1 95 5061 sip-anycast2.telnyx.com.
```

Jede Zeile enthält Priorität, Gewichtung, Port und Host. Die niedrigere Priorität gewinnt. Einträge mit gleicher Priorität teilen sich die Last nach Gewichtung. Hier haben beide Hosts Priorität 1 und Port 5061, also verteilt ein Client die Verbindungen auf beide und schickt etwa zwei von drei an `sip-anycast2`.

2talk veröffentlicht keinen SRV-Eintrag, dieselbe Abfrage liefert nichts. Das ist häufig. Nehmen Sie dann die Dokumentation des Anbieters. Die von 2talk nennt `lyra.2talk.co.nz`, TLS auf Port 5061.

### Schritt 2: das Zertifikat so prüfen wie ein strenger Client

Verbinden Sie sich mit diesem Host und lassen Sie OpenSSL das Zertifikat gegen die SIP-Domain prüfen. Für 2talk (Ausgabe gekürzt):

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

Daraus lesen Sie drei Dinge: Das Zertifikat ist ein Wildcard-Zertifikat für `*.2talk.co.nz` und deckt damit `lyra.2talk.co.nz` ab. Die Kette reicht bis zur öffentlichen Root von DigiCert. Und die Verbindung nutzt TLS 1.3. `0 (ok)` heißt, dass die Zertifikatsprüfung bestehen sollte.

So sieht eine falsche Domain aus. Derselbe Server, geprüft gegen einen Namen, den er nicht abdeckt:

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname sip.example.com </dev/null
Verification error: hostname mismatch
Verify return code: 62 (hostname mismatch)
```

WaveKat Voice lehnt diese Verbindung mit einem Zertifikatsfehler ab. Die häufigsten Codes:

| Ergebnis | Bedeutung |
|---|---|
| `0 (ok)` | Vertrauenswürdig und gültig für Ihre SIP-Domain |
| `62 (hostname mismatch)` | Das Zertifikat ist nicht für diese SIP-Domain ausgestellt. Klären Sie die Domain mit Ihrem Anbieter |
| `18`, `19` oder `20` | Selbstsigniert oder von einer privaten CA. Ihr System vertraut ihm nicht |
| Verbindung abgelehnt oder Zeitüberschreitung | Auf diesem Host und Port gibt es kein TLS, oder eine Firewall blockiert es |

OpenSSL prüft gegen sein eigenes CA-Bundle. Auf den meisten Linux-Systemen ist das der Systemspeicher, auf dem Mac oft nicht. Werten Sie eine `20` dort also als Hinweis, nicht als Urteil.

### Schritt 3 (optional): den Zertifikat-Fingerabdruck notieren

Zum Vergleich mit dem Fingerabdruck im Zertifikatsfehler von WaveKat Voice geben Sie den SHA-256-Fingerabdruck und das Ablaufdatum des Zertifikats aus:

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 -servername lyra.2talk.co.nz </dev/null 2>/dev/null \
    | openssl x509 -noout -fingerprint -sha256 -enddate
sha256 Fingerprint=1D:64:FB:48:21:19:A1:CB:18:43:3B:20:9A:BB:03:96:A1:D2:43:9A:E6:F3:A4:B4:35:3A:33:86:E4:E0:E4:8F
notAfter=Feb 18 23:59:59 2027 GMT
```

OpenSSL gibt ihn in Großbuchstaben mit Doppelpunkten aus, WaveKat Voice zeigt ihn kleingeschrieben ohne. Die Hex-Ziffern sind dieselben. Erneuert der Anbieter sein Zertifikat, ändert sich der Fingerabdruck. Das ist normal.

## Einrichtung

1. Suchen Sie in der Dokumentation Ihres Anbieters den TLS-Hostnamen und Port. Meist ist es `5061`, manche nutzen für TLS einen eigenen Hostnamen. Der neuseeländische Anbieter 2talk dokumentiert zum Beispiel `5061`.
2. Öffnen Sie die Leitung und stellen Sie **Verbindung** auf `TLS`. Das Portfeld schlägt `5061` vor.
3. Prüfen Sie, dass die SIP-Domain des Kontos genau der Angabe Ihres Anbieters entspricht. Gegen diesen Namen wird das Zertifikat geprüft.
4. Speichern. Die Leitung registriert sich neu über TLS.

Eine häufige Falle: **Verbindung** `TCP` mit Port `5061` ist kein TLS. Damit geht Klartext-SIP an einen Port, der auf einen TLS-Handshake wartet, und die Registrierung schlägt fehl.

Leitungseinstellungen werden mit Ihrem WaveKat-Konto synchronisiert. Melden Sie sich an einem anderen Computer an, ist die Leitung weiterhin TLS.

## Prüfen, ob wirklich TLS läuft

Unter den Verbindungsdetails einer Leitung gibt es den Link **Technische Details**. Diese Seite zeigt die Werte, die auf der laufenden Verbindung tatsächlich gelten, nicht die, die Sie eingetippt haben:

- **Verbindung** ist `TLS`;
- **Erreichbar unter** endet auf `;transport=tls`;
- unter **SIP-Nachrichten** ist jedes `Via` `SIP/2.0/TLS`.

![WaveKat Voice auf Ubuntu: die Seite Technische Details einer Leitung. Die aktive Verbindung ist TLS, das Gerät ist mit transport=tls erreichbar.](/screenshots/line-technical-details-tls/de.webp)

Ein REGISTER von dieser Leitung sieht ungefähr so aus (ein Beispiel von derselben Demo-Leitung wie im Screenshot):

```
Via: SIP/2.0/TLS 192.0.2.24:5066;branch=z9hG4bK…
Contact: <sip:1001@192.0.2.24:5066;transport=tls>
```

Verschlüsselung, die man nicht prüfen kann, muss man einfach glauben. Deshalb kommt TLS zusammen mit einer Möglichkeit, den tatsächlich genutzten Transport zu sehen.

Das SIP-Nachrichtenprotokoll liegt nur im Arbeitsspeicher: Es wird nie auf die Festplatte geschrieben und ist weg, wenn die App beendet wird. Die `response` in den Headern `Authorization` und `Proxy-Authorization` wird schon beim Mitschnitt geleert. Ein kopiertes Protokoll verrät also niemandem, dem Sie es schicken, den Passwort-Hash.

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Lösung |
|---|---|---|
| „Your provider's server didn't prove it is who it says it is" (Der Server Ihres Anbieters konnte nicht nachweisen, dass er der ist, für den er sich ausgibt) | SIP-Domain passt nicht zum Zertifikat, oder der Anbieter nutzt ein privates Zertifikat | SIP-Domain prüfen. Bei einem privaten Zertifikat den Anbieter nach einem Endpunkt mit öffentlich vertrauenswürdigem Zertifikat fragen |
| „The secure connection to your provider couldn't be set up" (Die sichere Verbindung zu Ihrem Anbieter konnte nicht hergestellt werden) | Falscher Port (oft 5060), oder dieser Hostname bietet kein TLS | Port und Hostname aus der Anbieterdokumentation verwenden |
| Registriert sich nach dem Umstellen gar nicht | `TCP` + `5061`, oder eine Firewall blockiert ausgehend 5061 | Verbindung auf `TLS` stellen. Ausgehendes TCP 5061 erlauben |
| Lief, dann dauerhaft nicht registriert | Die TLS-Verbindung brach ab (Neustart beim Anbieter, Router räumt inaktive Verbindungen ab) und wurde nicht neu aufgebaut | Auf der Leitung **Neu anmelden** drücken |

Die beiden Fehlermeldungen gibt es nur auf Englisch. Sie erscheinen auch in der deutschen Oberfläche im englischen Original.

## Bekannte Einschränkung: kein automatischer Neuaufbau nach einem TLS-Abbruch

UDP hat keine Verbindung, die abreißen kann, ein kurzer Netzaussetzer fällt also nicht auf. TLS ist eine einzige langlebige Verbindung. Startet der Anbieter neu oder räumt ein Router sie ab, bleibt die Leitung unregistriert, bis Sie **Neu anmelden** drücken. Soll eine Leitung unbeaufsichtigt Anrufe annehmen, etwa eine, die nachts ein [Anrufablauf](/de/blog/answer-calls-with-a-call-flow/) beantwortet, berücksichtigen Sie das vor dem Umstellen.

## Häufige Fragen

### Kann ich TLS nur für eine Leitung einschalten?

Ja. Die Verbindung wird pro Leitung eingestellt, jede Leitung kann also unabhängig UDP, TCP oder TLS nutzen.

### Muss ich Port 5061 verwenden?

Nein. 5061 ist der Standardport für SIP over TLS, aber richten Sie sich nach der Dokumentation Ihres Anbieters. Manche nutzen einen anderen Port oder einen eigenen Hostnamen.

### Ist TCP auf Port 5061 dasselbe wie TLS?

Nein. Damit geht Klartext-SIP an einen TLS-Port, und die Registrierung schlägt fehl. Stellen Sie die Verbindung auf `TLS`.

### Welche TLS-Versionen werden unterstützt?

TLS 1.2 und TLS 1.3, die beiden Versionen, die heute als sicher gelten. TLS 1.0 und 1.1 stammen von 1999 und 2006, beruhen auf gebrochenen Algorithmen wie MD5 und SHA-1 und wurden 2021 von der IETF offiziell abgekündigt ([RFC 8996](https://www.rfc-editor.org/rfc/rfc8996)). Die großen Browser haben sie schon vor Jahren entfernt. Ohne sie lässt sich eine Verbindung nicht auf ein unsicheres Protokoll herabstufen. In der Praxis kostet das nichts: Aktuelle SIP-Anbieter unterstützen TLS 1.2 oder neuer, und 2talk hat in unserem Test oben TLS 1.3 ausgehandelt.

### Brauche ich mit TLS eine Portweiterleitung auf meinem Router?

Nein. Eingehende Anrufe kommen über die TLS-Verbindung, die das Softphone selbst geöffnet hat. Ihre Firewall muss nur ausgehendes TCP auf 5061 erlauben, oder auf dem Port, den Ihr Anbieter nutzt.

### Macht TLS Anrufe langsamer?

Nicht spürbar. Der TLS-Handshake findet einmal statt, beim Aufbau der Verbindung. Die Registrierung und jeder Anruf danach nutzen dieselbe Verbindung, statt erneut einen Handshake durchzuführen.

### Wie stelle ich fest, dass eine Leitung wirklich verschlüsselt ist?

Öffnen Sie die Technischen Details der Leitung: Verbindung ist `TLS`, Erreichbar unter endet auf `;transport=tls`, und die SIP-Nachrichten zeigen `Via: SIP/2.0/TLS`.

### Was passiert, wenn das Zertifikat meines Anbieters abläuft oder wechselt?

Ein abgelaufenes Zertifikat besteht die Prüfung nicht: Die Leitung stoppt mit einem Zertifikatsfehler und fällt nie auf Klartext zurück. Wechselt der Anbieter auf ein anderes gültiges Zertifikat einer vertrauenswürdigen CA, ist nichts zu tun. WaveKat Voice prüft die Kette und die SIP-Domain, statt ein bestimmtes Zertifikat festzupinnen.

### Werden selbstsignierte Zertifikate unterstützt?

Nein. WaveKat Voice vertraut nur den Root-CAs des Systems. Ein Server mit einem Zertifikat einer privaten CA kann sich also nicht per TLS verbinden.

### Was ist der Unterschied zwischen SIP over TLS und einer `sips:`-Adresse?

Eine `sips:`-Adresse verlangt TLS auf jedem Abschnitt, den der Anruf nimmt. Eine `sip:`-Adresse mit `;transport=tls` schützt den aktuellen Abschnitt. Leitungen in WaveKat Voice nutzen Letzteres und schützen die Verbindung zwischen Ihnen und Ihrem Anbieter.

## Probieren Sie es aus

[Laden Sie WaveKat Voice herunter](/de/voice/download/) oder aktualisieren Sie auf [0.0.56](/de/voice/changelog/#0.0.56), stellen Sie eine Leitung auf `TLS` um und prüfen Sie es unter Technische Details. Weitere Verbindungseinstellungen finden Sie in der [SIP-Einrichtungsanleitung](/docs/voice/sip-trunks/).
