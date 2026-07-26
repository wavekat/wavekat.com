---
title: "Flux d'appel : un standard automatique pour TPE"
description: "WaveKat Voice répond aux appels entrants avec un flux d'appel : un standard automatique avec accueil, menu téléphonique et messagerie, suivi en direct."
date: 2026-07-25
author: Eason Guo
tags: [ia-vocale, appels]
lang: "fr"
---

[WaveKat Voice](/fr/voice/) — le softphone SIP pour Mac et Linux qui enregistre et transcrit chaque appel — peut désormais répondre à vos appels entrants à votre place. Ce qui décroche, c'est un **flux d'appel** : il accueille l'appelant, vérifie si vous êtes ouvert, propose un menu, vous fait sonner, prend un message ou transfère l'appel. Vous construisez le flux sur le web, vous l'affectez à l'une de vos lignes, et à partir de là, les appels que vous ne pouvez pas prendre trouvent quand même une réponse. C'est arrivé avec la version [0.0.43](/fr/voice/changelog/#0.0.43).

C'est le plus grand pas à ce jour vers ce à quoi nous revenons toujours : [donner à chaque petite entreprise la voix d'une grande](/fr/blog/hello-world/). Une grande entreprise répond à chaque appel : il y a un accueil, un menu téléphonique qu'un consultant a construit, un service en dehors des heures d'ouverture. Un commerce de trois personnes, lui, a un téléphone qui sonne jusqu'à ce que quelqu'un puisse s'essuyer les mains — et un appelant qui renonce, c'est une réservation qui n'a jamais eu lieu. Les flux d'appel comblent cet écart, et ils tournent sur l'ordinateur déjà posé sur votre bureau.

## Ce qu'est un flux d'appel

Un flux d'appel dans WaveKat Voice, c'est une courte liste d'étapes qu'un appel entrant parcourt une à une. C'est exactement ce que les autres systèmes téléphoniques vendent sous le nom de **standard automatique** : l'accueil et le menu « tapez 1 pour réserver » qui répond quand vous ne pouvez pas. Sauf qu'ici, c'est intégré au softphone que vous utilisez déjà, au lieu d'une plateforme séparée facturée par poste. Chaque étape est une brique avec une seule fonction :

| Étape | Ce que vit l'appelant |
|---|---|
| **Accueil** | Entend votre message d'accueil enregistré : « Merci de votre appel. » |
| **Horaires** | Rien de visible : le flux consulte votre planning hebdomadaire et vos jours fériés, et prend un autre chemin quand vous êtes fermé. |
| **Menu** | « Tapez 1 pour une réservation, 2 pour les horaires. » La touche choisie détermine l'étape suivante. |
| **Vous fait sonner** | Votre téléphone sonne comme d'habitude. Si vous décrochez, le flux s'efface. |
| **Prend un message** | Une annonce, un bip, puis son message — enregistré et transcrit comme n'importe quel appel. |
| **Transfère l'appel** | L'appelant est mis en relation avec un autre numéro. |
| **Raccroche** | Entend une formule de fin, et l'appel se termine. |

Aucun arbre de menus à dessiner de zéro, rien à programmer. On part d'un modèle — une galerie de flux prêts à l'emploi, ceux de votre langue d'abord, que vous copiez dans votre compte — et on change les textes. Un flux vierge existe aussi, si vous préférez tout construire vous-même.

![WaveKat Voice sous Ubuntu — la page d'un flux d'appel et son plan : un accueil, une vérification des horaires qui se sépare en « ouvert » et « fermé », une sonnerie chez vous, puis la messagerie.](/screenshots/flow-detail/fr.webp)

L'application dessine le flux sous forme de plan : « ce qui se passe quand quelqu'un appelle » devient une image que vous pouvez montrer du doigt, et non une liste de règles à garder en tête.

## On le construit sur le web, il tourne sur votre ordinateur

Les flux se modifient sur [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows), avec le même compte WaveKat que l'application. Choisissez un modèle, copiez-le dans votre bibliothèque et modifiez-le : tapez ce que les appelants doivent entendre à chaque étape, réglez vos horaires, décidez combien de temps le téléphone sonne avant que le flux prenne un message.

![L'éditeur de flux d'appel WaveKat sur le web — le plan du flux à côté du détail de l'étape, avec le texte de l'accueil, la voix qui l'a généré et un bouton pour le régénérer.](/screenshots/flow-editor/fr.webp#shadow)

Vous n'avez rien à enregistrer. Tapez le texte, choisissez une voix, et la plateforme génère l'audio avec [le même générateur de messages vocaux](/fr/blog/phone-menu-ivr-voice-generator/), [gratuit et utilisable seul](/fr/voice/prompts/) : une qualité studio, dans le format qu'attendent les systèmes téléphoniques. Un clic donne une voix à toutes les étapes du flux d'un coup — un modèle devient **votre** message d'accueil en une minute environ. Quand vous appuyez sur **Publier**, cette version est figée : les textes, les réglages et les extraits audio sont liés ensemble et ne peuvent plus changer à votre insu.

Le flux publié apparaît alors dans la nouvelle section **Flux d'appel** de l'application, sur chaque ordinateur où vous êtes connecté. Ouvrez-le, choisissez la ligne à laquelle il doit répondre, et activez-le. La fiche de la ligne affiche **Répond**, et la configuration s'arrête là : aucun renvoi à régler chez votre opérateur, aucun numéro à porter ailleurs.

Les flux tournent **sur votre ordinateur**, dans l'application, avec le compte SIP que vous avez déjà. Rien de l'appel n'est traité sur nos serveurs : l'accueil est joué depuis votre machine, le message y est enregistré, et il n'y a aucun coût à l'appel puisque personne ne s'interpose. La contrepartie est honnête : l'application doit tourner et l'ordinateur être allumé pour que le flux décroche, et une ligne n'est prise en charge que par un seul ordinateur.

## Voir le flux répondre, en direct

Pendant qu'un flux répond, WaveKat Voice vous montre étape par étape ce qu'il est en train de faire. Car ce dont nous sommes le plus contents, ce n'est pas qu'il décroche — c'est que vous puissiez le voir faire.

Quand un flux répond, l'application ne fait pas semblant que vous êtes en communication. L'écran affiche **« Accueil répond »**, et une ligne en dessous vous dit ce qui se passe à l'instant : *Parle à l'appelant… Lecture du menu… Vous appelle… Prise d'un message…*

![WaveKat Voice sous Ubuntu — un appel pris par un flux : « Accueil répond », avec « Prise d'un message… » et le nom de l'appelant.](/screenshots/flow-answering/fr.webp)

En dessous, le plan que vous avez construit s'allume au fil de l'appel : l'étape où se trouve l'appelant ressort, celles qu'il a déjà franchies restent claires, les autres restent estompées. Où il en est et par où il est passé se lisent d'un coup d'œil.

C'est du filtrage d'appel, et cela n'a rien à voir avec la messagerie vocale que vous connaissez. Une messagerie d'opérateur répond sans personne pour regarder ; vous l'apprenez des heures plus tard. Ici, le flux répond pour vous pendant que vous êtes assis juste à côté — vous retrouvez donc l'ancienne expérience du répondeur de maison : vous entendez qui c'est avant de décider.

## Reprendre la main en plein message

Vous pouvez reprendre un appel auquel le flux a répondu, sans que l'appelant ait à tout recommencer. Pendant qu'un appelant laisse un message, l'application affiche un bouton **Décrocher** : appuyez, et l'appel bascule sur votre micro et vos haut-parleurs, exactement comme un appel que vous auriez pris vous-même. La partie du message déjà enregistrée est conservée.

![WaveKat Voice sous Ubuntu — le plan en direct avec l'étape de messagerie allumée, un bouton « Décrocher », et le message de l'appelant qui s'affiche en transcription en direct.](/screenshots/flow-takeover/fr.webp)

Et vous n'avez pas à deviner si l'appel vaut la peine : le message s'affiche en texte pendant qu'il est laissé, vous lisez donc qui appelle et pourquoi avant de trancher.

**Décrocher** n'apparaît qu'aux moments où l'arrivée d'un humain a du sens pour l'appelant — pendant qu'il laisse un message, pas au milieu de votre accueil ni pendant une annonce de menu. Personne n'a envie qu'une voix se superpose à l'enregistrement qui est encore en train de lui parler.

## Ce que laisse un appel pris par un flux

Un appel pris par un flux arrive dans votre historique comme les autres, avec le nom du flux à côté — *Répondu par « Accueil »* — pour distinguer d'un coup d'œil les appels que vous avez traités de ceux qu'il a pris. Ouvrez-en un et le résumé vous dit en clair comment il s'est terminé : **L'appelant a laissé un message**, avec un lien vers le flux qui l'a reçu.

![WaveKat Voice sous Ubuntu — un appel terminé pris par un flux : la mention « Répondu par Accueil », le résultat « L'appelant a laissé un message », et l'enregistrement en dessous.](/screenshots/call-details-flow/fr.webp)

Le message lui-même est un enregistrement accompagné d'une transcription, au même endroit que tout le reste — et les étapes du flux sont repérées le long de l'enregistrement, ce qui permet de sauter directement au moment où l'appelant commence à parler au lieu de le chercher. Il est consultable par recherche et [partageable par lien](/fr/blog/share-a-call-recording/) si quelqu'un d'autre doit l'écouter.

## Ce qui est gratuit, et ce que Pro ajoute

La ligne que nous avons tracée est simple : **la version gratuite décroche, Pro oriente l'appel.**

| | Gratuit | Pro |
|---|---|---|
| Étapes disponibles | Accueil, vous fait sonner, prend un message, raccroche | Tout cela, plus horaires, menu et transfert |
| Flux publiés | 1 | 10 |

Un compte gratuit obtient donc un répondeur complet, avec votre accueil, vos mots, le filtrage en direct et la reprise en cours d'appel : pas un aperçu. Pro sert quand vous voulez que le flux décide : un traitement différent en dehors des heures d'ouverture, un menu qui envoie les appelants au bon endroit, des appels transférés vers un autre numéro. Pendant l'accès anticipé, le passage à Pro est gratuit — un clic sur [la page de votre compte WaveKat](https://platform.wavekat.com/profile), sans étape de paiement — et il vous donne un an. Votre offre et sa date d'expiration s'affichent dans l'application, sous Réglages.

## Questions fréquentes

### Qu'est-ce qu'un flux d'appel dans WaveKat Voice ?

Un flux d'appel est une suite d'étapes qui répond automatiquement à vos appels entrants : un accueil, une vérification de vos horaires, un menu téléphonique, une sonnerie chez vous, la prise d'un message ou un transfert. Vous le construisez sur le web, sur platform.wavekat.com, vous l'affectez à l'une de vos lignes, et l'application WaveKat Voice de votre ordinateur l'exécute à chaque appel entrant.

### Un flux d'appel, est-ce la même chose qu'un standard automatique ou un SVI ?

Un flux d'appel, c'est le nom que WaveKat Voice donne au standard automatique : il accueille l'appelant, propose un menu au clavier, vérifie vos horaires, vous fait sonner et prend un message. Ce n'est pas un SVI (IVR) complet au sens des grandes entreprises — il ne va pas chercher l'appelant dans une base de données et ne traite pas de démarche à sa place — et il ne tient pas encore de vraie conversation. Si vous cherchiez un « standard téléphonique automatique pour petite entreprise », un flux d'appel fait ce travail-là, sur votre propre ordinateur plutôt que sur une plateforme facturée par poste et par mois.

### Mon ordinateur doit-il être allumé pour qu'un flux réponde ?

Oui. Les flux tournent dans l'application, sur votre propre ordinateur, et non sur un serveur : la machine doit être allumée et WaveKat Voice en fonctionnement. C'est ce qui rend l'ensemble gratuit à l'appel et garde l'audio chez vous — mais cela veut aussi dire qu'un portable en veille ne décroche pas. Une ligne n'est prise en charge que par un seul ordinateur, donc se connecter sur une deuxième machine ne provoque pas de double réponse.

### Puis-je quand même prendre un appel auquel le flux a répondu ?

Oui, pendant que l'appelant laisse un message. L'application montre en direct ce que fait le flux, et un bouton **Décrocher** apparaît pendant le message ; appuyez, et l'appel arrive sur votre micro et vos haut-parleurs, la partie déjà enregistrée étant conservée. Ce bouton n'est volontairement pas proposé pendant l'accueil ou le menu, pour qu'un humain ne se superpose jamais à une annonce en cours de lecture.

### Dois-je enregistrer moi-même le message d'accueil ?

Non. Vous tapez ce que les appelants doivent entendre et vous choisissez une voix ; la plateforme génère un audio prêt pour la téléphonie avec le générateur de messages vocaux WaveKat — un clic donne une voix à chaque étape du flux. Si vous modifiez le texte plus tard, vous régénérez cette étape ; jusqu'à une nouvelle publication, la version publiée continue de jouer l'ancien audio.

### Que devient un message laissé par un appelant ?

Il est enregistré et transcrit sur votre ordinateur comme n'importe quel appel, et il apparaît dans votre historique avec le nom du flux et l'issue de l'appel. De là, vous pouvez l'écouter, lire la transcription, sauter à une étape du flux ou le partager par lien privé.

### Est-ce une standardiste IA qui parle aux appelants ?

Pas encore — et nous préférons le dire clairement. Les étapes d'aujourd'hui sont les étapes prévisibles : accueil, horaires, menu, sonnerie, message, transfert. Elles font exactement ce que vous avez écrit, à chaque fois. Une étape « assistant » qui tient une vraie conversation avec l'appelant est le prochain jalon, et ce sera une brique de plus à poser dans le même flux.

### Est-ce compatible avec mon opérateur SIP ?

Oui, avec le compte que vous avez déjà dans WaveKat Voice. Les flux répondent aux appels que l'application reçoit déjà : si votre ligne fait sonner l'application aujourd'hui, un flux peut y répondre — sans renvoi côté opérateur, sans numéro supplémentaire et sans tarif à la minute d'un service de permanence téléphonique.

### Sur quelles plateformes les flux d'appel fonctionnent-ils ?

Mac et Linux, les deux plateformes sur lesquelles WaveKat Voice tourne aujourd'hui (Windows viendra quand la demande sera là). La création fonctionne dans n'importe quel navigateur, puisque les flux se construisent sur le web et se synchronisent avec l'application.

## À essayer

[Téléchargez WaveKat Voice](/fr/voice/download/) — ou passez à la version [0.0.43](/fr/voice/changelog/#0.0.43) —, connectez-vous et construisez votre premier flux sur [platform.wavekat.com/voice/flows](https://platform.wavekat.com/voice/flows). Partez d'un modèle, changez les textes, publiez, puis affectez-le à votre ligne.

Attendez ensuite le prochain appel et regardez-le trouver une réponse. Vous verrez toujours qui appelle, et vous pourrez toujours prendre la ligne — c'est bien l'idée. Simplement, vous n'êtes plus la seule chose entre un appelant et une réponse.
