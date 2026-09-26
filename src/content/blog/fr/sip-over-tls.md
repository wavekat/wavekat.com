---
title: "SIP over TLS : chiffrer la signalisation SIP"
description: "WaveKat Voice se connecte aux opérateurs SIP en TLS, port 5061, et chiffre la signalisation SIP (enregistrement, appels, transferts) sur Mac, Windows et Linux."
date: 2026-09-26
author: Eason Guo
tags: [ia-vocale, sip, confidentialite]
lang: "fr"
---

WaveKat Voice prend en charge SIP over TLS depuis la version [0.0.56](/fr/voice/changelog/#0.0.56). Réglez la **Connexion** d'une ligne sur `TLS` et le port sur `5061` : toute la signalisation SIP entre le softphone et votre opérateur (REGISTER, INVITE, REFER, BYE) passe alors par une connexion chiffrée. Cela fonctionne sur Mac, Windows et Linux.

## Pourquoi TLS compte

Chaque appel commence par de la signalisation. Votre téléphone s'enregistre auprès de l'opérateur, indique qui il appelle, puis établit l'appel. Ce trafic contient votre compte SIP, les numéros que vous composez et l'échange d'authentification. En UDP en clair, n'importe qui sur le même chemin réseau peut le lire.

TLS est la façon standard de le protéger. La connexion entre WaveKat Voice et votre opérateur est chiffrée, et l'identité de l'opérateur est vérifiée avant tout envoi. Un téléphone qui porte les appels de votre entreprise doit en être capable, et protéger vos communications fait partie de ce qui nous vaut votre confiance. Chaque ligne de WaveKat Voice peut donc utiliser TLS.

## Ce qui est chiffré

| | UDP / TCP | TLS |
|---|---|---|
| Échange d'authentification REGISTER | En clair | Chiffré |
| Appelant, appelé, heure (INVITE, etc.) | En clair | Chiffré |
| Mise en attente, transfert, raccrochage | En clair | Chiffré |
| Audio (RTP) | En clair | En clair |
| Identité du serveur vérifiée | Non | Oui, par certificat |
| Port habituel | 5060 | 5061 |

La ligne sur l'authentification est celle qu'on sous-estime. SIP utilise l'authentification Digest ([RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)) : le mot de passe lui-même ne circule jamais sur le réseau. Mais le `response` de l'en-tête `Authorization` est un hachage calculé à partir de lui. Sur UDP, quiconque capture ce paquet sur le même réseau peut lancer une attaque par dictionnaire hors ligne, et un mot de passe faible ne tiendra pas longtemps. Avec TLS, il n'y a plus de paquet à capturer.

## Comment fonctionne SIP over TLS

Le SIP classique passe en général par UDP sur le port 5060 : chaque message est un paquet distinct, en texte lisible. SIP over TLS change le transport en dessous, pas SIP lui-même.

1. **Une seule connexion.** Le softphone ouvre une connexion TCP vers l'opérateur, en général sur le port 5061.
2. **La poignée de main.** Avant tout message SIP, les deux côtés effectuent une poignée de main TLS. L'opérateur présente son certificat. Le softphone vérifie que sa chaîne remonte à une autorité de certification de confiance et qu'il est émis pour le domaine SIP. Puis ils conviennent des clés de session.
3. **SIP dans le tunnel.** Ensuite, chaque message SIP, dans les deux sens, circule chiffré sur cette même connexion. Les messages l'indiquent eux-mêmes : `Via: SIP/2.0/TLS`, et un `Contact` avec `;transport=tls`.
4. **La connexion reste ouverte.** L'enregistrement la maintient active, et l'opérateur y renvoie les appels entrants. C'est aussi ce qui permet à un INVITE entrant d'atteindre un téléphone derrière un NAT sans redirection de port.

![Diagramme de séquence de SIP over TLS : WaveKat Voice ouvre une connexion TCP vers l'opérateur sur le port 5061, termine la poignée de main TLS et vérifie le certificat par rapport au domaine SIP. Ensuite, le REGISTER, le défi 401, le REGISTER authentifié, le 200 OK et un INVITE entrant passent tous par la connexion chiffrée.](/blog/sip-over-tls/fr.svg)

TLS protège un seul tronçon : le lien entre WaveKat Voice et votre opérateur. La façon dont l'opérateur achemine ensuite l'appel, vers un autre opérateur ou le réseau téléphonique, dépend de lui.

## Comment les certificats sont vérifiés

TLS n'arrête une attaque de l'homme du milieu que si la vérification des certificats est stricte. La nôtre :

- **Uniquement les racines du système.** Les certificats sont vérifiés par rapport à la liste d'autorités de confiance de votre système d'exploitation. Rien n'est embarqué, et il n'y a aucune exception.
- **Vérifiés par rapport au domaine SIP, pas à l'adresse du serveur.** Même si vous avez défini un serveur sortant distinct, le certificat doit être émis pour le domaine SIP du compte, comme l'exige la [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922).
- **Un échec arrête la ligne.** Pas de repli vers le texte en clair, pas de tentatives sans fin sur « Connexion… ». La ligne échoue, et son erreur indique la raison et l'empreinte SHA-256 du certificat :

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

L'implémentation TLS est `rustls`, écrite en Rust : aucune dépendance à OpenSSL, sur aucune plateforme.

Les certificats auto-signés et les autorités de certification privées ne sont pas pris en charge, et il n'y a pas d'option « faire confiance à ce certificat ». Si votre opérateur utilise un certificat privé, cette ligne doit rester en UDP ou en TCP.

## Vérifier le TLS de votre opérateur avant de basculer

Deux commandes standard vous disent si le TLS de votre opérateur fonctionnera, avant de toucher quoi que ce soit dans l'application. Les sorties ci-dessous viennent de tests réels du 26 septembre 2026 sur deux opérateurs SIP : 2talk, en Nouvelle-Zélande, et Telnyx.

### Étape 1 : trouver l'hôte et le port TLS

Certains opérateurs publient un enregistrement SRV pour SIP over TLS ([RFC 3263](https://www.rfc-editor.org/rfc/rfc3263)) qui indique l'hôte et le port à utiliser. C'est le cas de Telnyx :

```sh
$ dig +short SRV _sips._tcp.sip.telnyx.com
1 45 5061 sip-anycast1.telnyx.com.
1 95 5061 sip-anycast2.telnyx.com.
```

Chaque ligne donne la priorité, le poids, le port et l'hôte. La priorité la plus basse l'emporte. Les enregistrements de même priorité se partagent la charge selon leur poids. Ici, les deux hôtes ont la priorité 1 et le port 5061 : un client répartit donc ses connexions entre eux, et en envoie environ deux sur trois à `sip-anycast2`.

2talk ne publie pas d'enregistrement SRV, et la même requête ne renvoie rien. C'est courant. Fiez-vous alors à la documentation de l'opérateur. Celle de 2talk indique `lyra.2talk.co.nz`, en TLS sur le port 5061.

### Étape 2 : vérifier le certificat comme le fait un client strict

Connectez-vous à cet hôte et demandez à OpenSSL de vérifier le certificat par rapport au domaine SIP. Pour 2talk (sortie abrégée) :

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

On y lit trois choses. Le certificat est un wildcard pour `*.2talk.co.nz`, qui couvre `lyra.2talk.co.nz`. La chaîne remonte jusqu'à la racine publique de DigiCert. Et la connexion est en TLS 1.3. `0 (ok)` signifie que la vérification du certificat devrait réussir.

Voici ce que donne un mauvais domaine. Même serveur, vérifié par rapport à un nom qu'il ne couvre pas :

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 \
    -servername lyra.2talk.co.nz -verify_hostname sip.example.com </dev/null
Verification error: hostname mismatch
Verify return code: 62 (hostname mismatch)
```

WaveKat Voice refuse cette connexion avec une erreur de certificat. Les codes les plus fréquents :

| Résultat | Signification |
|---|---|
| `0 (ok)` | Certificat de confiance et valide pour votre domaine SIP |
| `62 (hostname mismatch)` | Le certificat n'est pas émis pour ce domaine SIP. Vérifiez le domaine auprès de votre opérateur |
| `18`, `19` ou `20` | Auto-signé ou émis par une autorité privée. Votre système ne lui fait pas confiance |
| Connexion refusée ou délai dépassé | Cet hôte et ce port ne servent pas de TLS, ou un pare-feu bloque la connexion |

OpenSSL vérifie avec son propre magasin d'autorités. Sur la plupart des systèmes Linux, c'est celui du système. Sur Mac, souvent non : un `20` y est donc un indice, pas un verdict.

### Étape 3 (facultative) : noter l'empreinte du certificat

Pour comparer avec l'empreinte affichée dans l'erreur de certificat de WaveKat Voice, affichez l'empreinte SHA-256 du certificat et sa date d'expiration :

```sh
$ openssl s_client -connect lyra.2talk.co.nz:5061 -servername lyra.2talk.co.nz </dev/null 2>/dev/null \
    | openssl x509 -noout -fingerprint -sha256 -enddate
sha256 Fingerprint=1D:64:FB:48:21:19:A1:CB:18:43:3B:20:9A:BB:03:96:A1:D2:43:9A:E6:F3:A4:B4:35:3A:33:86:E4:E0:E4:8F
notAfter=Feb 18 23:59:59 2027 GMT
```

OpenSSL l'affiche en majuscules avec des deux-points. WaveKat Voice l'affiche en minuscules, sans séparateurs. Les chiffres hexadécimaux sont les mêmes. Quand l'opérateur renouvelle son certificat, l'empreinte change, et c'est normal.

## La configuration

1. Trouvez le nom d'hôte et le port TLS de votre opérateur dans sa documentation. La plupart utilisent `5061`. Certains ont un nom d'hôte distinct pour TLS. L'opérateur néo-zélandais 2talk, par exemple, documente `5061`.
2. Ouvrez la ligne et réglez **Connexion** sur `TLS`. Le champ du port propose `5061`.
3. Vérifiez que le domaine SIP du compte correspond exactement à celui fourni par votre opérateur. C'est le nom par rapport auquel le certificat est vérifié.
4. Enregistrez. La ligne se réenregistre en TLS.

Un piège fréquent : **Connexion** sur `TCP` avec le port `5061`, ce n'est pas du TLS. Le softphone envoie du SIP en clair à un port qui attend une poignée de main TLS, et l'enregistrement échoue.

Les réglages des lignes sont synchronisés avec votre compte WaveKat : la ligne reste en TLS quand vous vous connectez sur un autre ordinateur.

## Vérifier que c'est vraiment du TLS

Sous les informations de connexion d'une ligne se trouve un lien **Détails techniques**. Cette page affiche les valeurs en vigueur sur la connexion active, pas celles que vous avez saisies :

- **Connexion** vaut `TLS` ;
- **Joignable à** se termine par `;transport=tls` ;
- dans **Messages SIP**, chaque `Via` est `SIP/2.0/TLS`.

![WaveKat Voice sur Ubuntu : la page Détails techniques d'une ligne, qui montre que la connexion en vigueur est en TLS et que l'appareil est joignable en transport=tls.](/screenshots/line-technical-details-tls/fr.webp)

Un REGISTER envoyé par cette ligne ressemble à peu près à ceci (un exemple, sur la même ligne de démonstration que la capture) :

```
Via: SIP/2.0/TLS 192.0.2.24:5066;branch=z9hG4bK…
Contact: <sip:1001@192.0.2.24:5066;transport=tls>
```

Un chiffrement qu'on ne peut pas vérifier, il faut le croire sur parole. TLS arrive donc avec un moyen de voir le transport réellement utilisé.

Le journal des messages SIP reste uniquement en mémoire. Il n'est jamais écrit sur le disque et disparaît quand l'application se ferme. Le `response` des en-têtes `Authorization` et `Proxy-Authorization` est effacé dès la capture : un journal copié ne transmet pas le hachage du mot de passe à la personne qui le reçoit.

## Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| « Your provider's server didn't prove it is who it says it is » (le serveur de votre opérateur n'a pas prouvé son identité) | Le domaine SIP ne correspond pas au certificat, ou l'opérateur utilise un certificat privé | Vérifiez le domaine SIP. Pour un certificat privé, demandez à l'opérateur un point d'accès doté d'un certificat publiquement reconnu |
| « The secure connection to your provider couldn't be set up » (la connexion sécurisée à votre opérateur n'a pas pu être établie) | Mauvais port (souvent 5060), ou TLS non proposé sur ce nom d'hôte | Utilisez le port et le nom d'hôte de la documentation de l'opérateur |
| Aucun enregistrement après la bascule | `TCP` + `5061`, ou un pare-feu qui bloque le 5061 sortant | Réglez Connexion sur `TLS`. Autorisez le TCP 5061 sortant |
| Fonctionnait, puis reste non enregistrée | La connexion TLS est tombée (redémarrage de l'opérateur, routeur qui ferme les connexions inactives) et n'a pas été rétablie | Appuyez sur **Se reconnecter** sur la ligne |

(Ces deux messages d'erreur s'affichent en anglais, même quand l'application est en français.)

## Limite connue : pas de reconnexion automatique après une coupure TLS

UDP n'a pas de connexion à perdre, donc un incident réseau passe inaperçu. TLS repose sur une seule connexion de longue durée. Si l'opérateur redémarre ou si un routeur la ferme, la ligne reste non enregistrée jusqu'à ce que vous appuyiez sur **Se reconnecter**. Si une ligne doit prendre des appels sans surveillance, par exemple celle à laquelle un [flux d'appel](/fr/blog/answer-calls-with-a-call-flow/) répond la nuit, tenez-en compte avant de basculer.

## FAQ

### Puis-je activer TLS sur une seule ligne ?

Oui. La connexion se règle ligne par ligne : chaque ligne peut utiliser UDP, TCP ou TLS indépendamment.

### Dois-je utiliser le port 5061 ?

Non. 5061 est le port par défaut de SIP over TLS, mais suivez la documentation de votre opérateur. Certains utilisent un autre port ou un nom d'hôte distinct.

### TCP sur le port 5061, est-ce la même chose que TLS ?

Non. Cela envoie du SIP en clair vers un port TLS, et l'enregistrement échoue. Réglez Connexion sur `TLS`.

### Quelles versions de TLS sont prises en charge ?

TLS 1.2 et TLS 1.3, les deux versions considérées comme sûres aujourd'hui. TLS 1.0 et 1.1 datent de 1999 et 2006, reposent sur des algorithmes cassés comme MD5 et SHA-1, et ont été officiellement dépréciées par l'IETF en 2021 ([RFC 8996](https://www.rfc-editor.org/rfc/rfc8996)). Les grands navigateurs les ont abandonnées depuis des années. Les exclure empêche qu'une connexion soit rétrogradée vers un protocole non sûr. En pratique, cela ne coûte rien : les opérateurs SIP actuels prennent en charge TLS 1.2 ou plus, et 2talk, dans notre test ci-dessus, a négocié TLS 1.3.

### Faut-il une redirection de port sur mon routeur avec TLS ?

Non. Les appels entrants arrivent par la connexion TLS que le softphone a lui-même ouverte. Votre pare-feu doit seulement autoriser le TCP sortant sur le port 5061, ou sur celui qu'utilise votre opérateur.

### TLS ralentit-il les appels ?

Pas de façon perceptible. La poignée de main TLS a lieu une seule fois, à l'ouverture de la connexion. L'enregistrement et chaque appel suivant réutilisent la même connexion au lieu de refaire une poignée de main.

### Comment vérifier qu'une ligne est réellement chiffrée ?

Ouvrez les Détails techniques de la ligne : Connexion vaut `TLS`, Joignable à se termine par `;transport=tls`, et les Messages SIP affichent `Via: SIP/2.0/TLS`.

### Que se passe-t-il si le certificat de mon opérateur expire ou change ?

Un certificat expiré échoue à la vérification : la ligne s'arrête avec une erreur de certificat et ne repasse jamais en clair. Si l'opérateur passe à un autre certificat valide émis par une autorité de confiance, vous n'avez rien à faire. WaveKat Voice vérifie la chaîne et le domaine SIP, sans épingler un certificat précis.

### Les certificats auto-signés sont-ils pris en charge ?

Non. WaveKat Voice ne fait confiance qu'aux autorités racines du système. Un serveur dont le certificat vient d'une autorité privée ne peut donc pas se connecter en TLS.

### Quelle est la différence entre SIP over TLS et une adresse `sips:` ?

Une adresse `sips:` exige TLS sur chaque tronçon emprunté par l'appel. Une adresse `sip:` avec `;transport=tls` protège le tronçon en cours. Les lignes de WaveKat Voice utilisent la seconde, et protègent la connexion entre vous et votre opérateur.

## Essayez

[Téléchargez WaveKat Voice](/fr/voice/download/) ou passez à la version [0.0.56](/fr/voice/changelog/#0.0.56), basculez une ligne en `TLS`, puis ouvrez Détails techniques pour vérifier. Les autres réglages de connexion sont dans le [guide de configuration SIP](/docs/voice/sip-trunks/).
