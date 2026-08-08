---
title: "Consigner les appels dans HubSpot"
description: "WaveKat Voice consigne chaque appel dans HubSpot automatiquement : sur le bon contact, avec la transcription, et l’enregistrement s’écoute sur place."
date: 2026-08-08
author: Eason Guo
tags: [ia-vocale, intégrations, HubSpot]
lang: "fr"
---

WaveKat Voice consigne désormais vos appels dans HubSpot automatiquement. Connectez votre compte HubSpot une fois et, ensuite, chaque appel que vous recevez ou passez se range tout seul dans votre CRM — sur le bon contact, avec l’heure, le sens, l’issue, la durée, la transcription, et un enregistrement que vous écoutez sans quitter HubSpot. Pas de clé d’API, pas d’intermédiaire, pas d’extension de navigateur, et rien à retenir une fois que vous avez raccroché. C’est disponible dès aujourd’hui sur [votre compte WaveKat](https://platform.wavekat.com/integrations), en fonction Pro — et pendant l’accès anticipé, Pro est gratuit.

C’est une pièce de plus de ce que nous faisons : [donner à chaque petite entreprise la voix d’une grande](/fr/blog/hello-world/). Le CRM d’un grand groupe connaît chaque appel parce que quelqu’un est payé pour que ce soit le cas. Le vôtre peut connaître chaque appel parce que l’application de téléphone que vous utilisez déjà — celle qui [enregistre et transcrit chaque conversation](/fr/voice/) — l’écrit discrètement là où vivent vos fiches clients.

## Ce qui arrive dans HubSpot après chaque appel

À la fin de l’appel, WaveKat recherche votre interlocuteur dans vos contacts HubSpot par numéro de téléphone et dépose une fiche d’appel sur sa chronologie :

| Dans HubSpot | Ce qu’elle contient |
|---|---|
| Contact | Trouvé par le numéro ; créé au besoin si personne ne correspond |
| Heure et sens | Quand l’appel a eu lieu, entrant ou sortant |
| Issue et durée | Répondu, manqué ou échoué — et combien de temps il a duré |
| Objet | Un résumé d’une ligne, p. ex. « Entrant · répondu · hors horaires » |
| Transcription | Toute la conversation, sauf si vous coupez sa synchronisation |
| Enregistrement | Lisible dans le lecteur de HubSpot lui-même si l’appel a été enregistré |
| Lien | Vers l’appel dans WaveKat, avec la forme d’onde et chaque étape du flux |

La fiche ressemble à un appel consigné à la main par un collègue consciencieux — sauf qu’elle couvre tous les appels, qu’elle est mot pour mot, et qu’elle s’est écrite pendant que vous alliez chercher un café. Si quelqu’un rappelle, ou si une synchronisation est réessayée, le même appel n’est jamais consigné deux fois : WaveKat se souvient de quelle fiche HubSpot correspond à quel appel et la met à jour au lieu de créer une jumelle.

## Écouter l’enregistrement dans HubSpot

L’enregistrement n’est pas copié dans HubSpot — il se passe mieux que cela. La fiche porte ce qu’il faut à HubSpot pour demander l’audio à WaveKat *au moment précis où quelqu’un appuie sur lecture*, et WaveKat répond à cet instant. Concrètement :

- **L’écoute reste sur la chronologie du contact.** Le collègue qui revoit l’affaire dans HubSpot appuie sur lecture et entend l’appel — sans changer d’application, sans fichier transféré.
- **Supprimer un appel le supprime vraiment.** Une fois l’enregistrement retiré dans WaveKat, il ne reste dans HubSpot aucune copie pour lui survivre. La prochaine lecture ne trouve rien, parce qu’il n’y a rien.
- **L’accès reste le vôtre.** Chaque lecture est une requête que WaveKat honore — et peut refuser : intégration déconnectée, appel supprimé. Un fichier audio copié, lui, ne pourrait jamais reprendre une réponse.

Pour la transcription et le déroulé du flux, le lien de la fiche ramène à la page de l’appel dans WaveKat, où se trouvent le [lecteur à deux pistes et la transcription par interlocuteur](/fr/blog/share-a-call-recording/).

## Se connecter une fois — sans clé d’API ni configuration

La connexion tient en un clic sur la page de votre compte WaveKat : vous arrivez sur l’écran de consentement de HubSpot, vous approuvez, et vous revenez connecté. Aucun compte développeur à créer, aucune application privée à configurer, aucune portée à choisir, aucun jeton à coller. Avant le clic, la page dit clairement ce qui sera envoyé, et [la politique de confidentialité](/fr/privacy/#integrations) détaille la même liste en mots simples.

![La page Intégrations de WaveKat sur le web — HubSpot marqué « Connecté » dans le catalogue et, en dessous, le compte connecté affichant « Synchronisé » et sa dernière synchronisation il y a quelques minutes.](/screenshots/integrations-hubspot/fr.webp#shadow)

Se déconnecter est tout aussi net : WaveKat demande à HubSpot de révoquer son accès et efface les identifiants stockés. Les fiches déjà écrites dans votre HubSpot y restent — c’est l’historique de votre CRM, et déconnecter une intégration n’est pas la même chose qu’effacer votre passé.

## C’est vous qui décidez ce qui est synchronisé

Quatre interrupteurs, réglés par connexion :

| Interrupteur | Par défaut | Ce qu’il fait |
|---|---|---|
| Inclure la transcription | Activé | Met ce qui a été dit dans la fiche d’appel |
| Créer les contacts manquants | Activé | Crée le contact quand aucun numéro ne correspond |
| Répercuter les suppressions | Activé | Retire l’appel de HubSpot quand vous le supprimez dans WaveKat |
| Nommer les appelants inconnus par leur numéro | Désactivé | Utilise le numéro comme nom quand l’opérateur n’en transmet aucun |

![Le panneau de réglages de la connexion sur le web — quels événements d’appel atteignent HubSpot, et les interrupteurs « Créer les contacts manquants », « Nommer les appelants inconnus par leur numéro », « Inclure la transcription » et « Répercuter les suppressions ».](/screenshots/integrations-hubspot-options/fr.webp#shadow)

Le dernier est désactivé exprès : un nom vide est exact, et le premier collègue à reconnaître le numéro le renseignera durablement. Quand vous l’activez, le numéro va dans le champ « nom de famille » — jamais dans le prénom, car HubSpot se sert des prénoms pour personnaliser les e-mails, et « Bonjour 021 123 4567 » n’est un message que personne n’a voulu envoyer.

Une remarque honnête, la même que celle de [la politique de confidentialité](/fr/privacy/#integrations) : la personne à qui vous avez parlé n’a rien accepté avec nous. Consigner son numéro, sa voix et ses mots dans votre CRM engage la même responsabilité que l’enregistrement de l’appel lui-même — les interrupteurs existent pour que vous synchronisiez ce que vous êtes prêt à assumer.

## Chaque appel dit où il est allé

Ouvrez n’importe quel appel dans WaveKat : il vous dit s’il a atteint votre CRM. Un badge **« Dans HubSpot »** quand il est déposé, un état d’attente tant qu’il est en route, et — si quelque chose a échoué — la raison, avec les mots de HubSpot. Une synchronisation en échec est réessayée pendant une journée avec des délais croissants, et une connexion qui perd l’accès affiche « reconnecter » plutôt que d’échouer en silence. Pas besoin de deviner si la mécanique tourne.

![Un appel terminé dans WaveKat sur le web — le badge « Dans HubSpot » à côté du nom de l’appelant, l’enregistrement à deux pistes en dessous, puis une ligne de synchronisation nommant le compte HubSpot où il a été consigné.](/screenshots/call-in-hubspot/fr.webp#shadow)

## Les façons de consigner des appels dans HubSpot

Plusieurs chemins mènent les appels dans HubSpot, et ils conviennent à des situations différentes :

| Chemin | Ce qu’il demande | Gardez-vous votre opérateur ? |
|---|---|---|
| Consigner à la main | Quelqu’un qui saisit après chaque appel | Oui |
| Téléphonie intégrée de HubSpot | Appeler depuis HubSpot avec un numéro fourni par HubSpot | Non |
| Plateformes d’appel dans le cloud | Déplacer votre téléphonie chez elles, au prix par poste | Non |
| Webhooks et un outil d’automatisation | Un abonnement d’automatisation en plus et une chaîne à entretenir | Oui |
| Intégration native de WaveKat Voice | Un clic pour connecter ; les appels restent sur votre ligne SIP | Oui |

Ces plateformes sont vraiment bonnes dans ce qu’elles font — appels en série, SMS, coaching des équipes commerciales. Ce qu’elles demandent, c’est que votre téléphonie déménage chez elles. WaveKat Voice parie l’inverse : vous gardez [l’opérateur que vous avez déjà](/fr/voice/), vos appels se passent sur votre ordinateur, et HubSpot est la destination à laquelle ils font leur rapport — pas le système dans lequel ils vivent.

## Gratuit et Pro

L’intégration native à HubSpot est une fonction **Pro** — le même palier que [répartir les appels avec des menus et des transferts](/fr/blog/answer-calls-with-a-call-flow/). Pendant l’accès anticipé, passer à Pro est gratuit : un clic sur [la page de votre compte WaveKat](https://platform.wavekat.com/profile), sans étape de paiement, et c’est valable un an.

Les comptes gratuits gardent une voie vers le CRM : les **webhooks**, qui envoient une fiche de chaque appel à l’URL de votre choix — gratuits pendant la bêta. L’intégration native est ce vers quoi vous montez quand vous voulez les parties qui ont de la mémoire : la correspondance des contacts, des fiches sans doublons, la lecture des enregistrements et des suppressions qui se répercutent.

## Questions fréquentes

### Comment consigner mes appels dans HubSpot automatiquement avec WaveKat Voice ?

Connectez-vous à votre compte WaveKat avec la synchronisation cloud active, cliquez sur « Connecter HubSpot » sur la page Intégrations et approuvez sur l’écran de consentement de HubSpot. Ensuite, chaque appel que vous recevez ou passez dans WaveKat Voice est consigné dans HubSpot automatiquement — il n’y a rien à faire appel par appel.

### WaveKat Voice crée-t-il des contacts HubSpot automatiquement ?

Oui, tant que « Créer les contacts manquants » reste activé. WaveKat rapproche chaque appel d’un contact HubSpot par le numéro ; si personne ne correspond, il crée le contact pour que l’appel soit tout de même rattaché à une personne. Désactivé, les appels sans correspondance sont consignés sans contact.

### Puis-je écouter les enregistrements dans HubSpot ?

Oui. La fiche HubSpot d’un appel enregistré se lit dans le lecteur de HubSpot, sur la chronologie du contact. L’audio est demandé à WaveKat au moment de la lecture plutôt que copié : supprimer l’appel dans WaveKat le supprime pour de bon, sans copie oubliée dans le CRM.

### Que se passe-t-il dans HubSpot si je supprime un appel dans WaveKat ?

Avec « Répercuter les suppressions » activé (par défaut), la fiche HubSpot est archivée quand vous supprimez l’appel dans WaveKat, et son enregistrement ne se lit plus. Désactivez-le et votre historique HubSpot garde la fiche même une fois l’appel disparu de WaveKat.

### Faut-il une clé d’API pour connecter HubSpot ?

Non. La connexion est un clic via l’écran de consentement de HubSpot lui-même — aucune application privée à configurer, aucune clé d’API à créer ou à coller. Si vous préférez construire votre propre chaîne, les webhooks restent disponibles et envoient chaque appel à l’URL de votre choix.

### L’intégration HubSpot est-elle gratuite ?

C’est une fonction Pro. Pendant l’accès anticipé, Pro est gratuit : un clic sur la page de votre compte WaveKat vous donne un an, sans étape de paiement. Les webhooks restent disponibles sur les comptes gratuits comme voie à faire soi-même vers un CRM.

### Sur quelles plateformes cela fonctionne-t-il ?

WaveKat Voice tourne aujourd’hui sur Mac et Linux. L’intégration HubSpot vit dans votre compte WaveKat : elle se comporte pareil depuis l’une ou l’autre, et les appels qu’elle consigne se lisent dans HubSpot depuis n’importe quel navigateur.

## À essayer

[Téléchargez WaveKat Voice](/fr/voice/download/), connectez-vous avec la synchronisation cloud active, puis cliquez sur **Connecter HubSpot** sur [votre page Intégrations](https://platform.wavekat.com/integrations). Votre prochain appel sera dans votre CRM avant que vous ayez fini vos notes — que, à bien y regarder, vous n’avez plus besoin de prendre.

L’enregistrement, la transcription, [le partage](/fr/blog/share-a-call-recording/), et maintenant le CRM — un appel devient de plus en plus utile après que vous avez raccroché.
