---
title: "Mettre en attente, basculer et transférer des appels comme un standard"
description: "WaveKat Voice sait désormais mettre un appel en attente, répondre à un second appel pendant le premier et transférer un appelant — en aveugle ou avec supervision — sur Mac et Linux, et l'enregistrement se met en pause automatiquement pendant la mise en attente."
date: 2026-07-05
author: Eason Guo
tags: [ia-vocale, appels]
lang: "fr"
---

WaveKat Voice — le softphone SIP pour Mac et Linux qui enregistre et transcrit chaque appel — sait désormais faire les trois choses qu'un accueil fait toute la journée : mettre un appelant en attente, répondre à un second appel pendant que le premier patiente, et transférer un appelant vers quelqu'un d'autre — soit directement, soit après l'avoir consulté. Elles arrivent avec WaveKat Voice [0.0.42](/fr/voice/changelog/#0.0.42).

C'est le pas le plus littéral à ce jour vers notre objectif : [donner à chaque petite entreprise la voix d'une grande](/fr/blog/hello-world/). Quand vous appelez une grande entreprise, quelqu'un dit « un instant, je vous mets en relation » — et ça marche, parce qu'il y a une standardiste devant un standard. Désormais, [WaveKat Voice](/fr/voice/), qui enregistre et transcrit déjà chaque appel, donne les mêmes gestes à un commerce tenu par une seule personne. La mise en attente, le double appel et le transfert sont les commandes qu'une personne à l'accueil utilise sans cesse, et tout [softphone](/fr/voice/alternatives/) sérieux est censé les avoir — WaveKat Voice les a maintenant, avec sa touche à lui : ce qui se passe pendant l'attente reste hors de l'enregistrement.

## Mettre un appelant en attente

Mettre un appelant en attente dans WaveKat Voice met en pause l'enregistrement et la transcription en direct pendant toute la durée où l'appel patiente — rien de ce qui se dit près de votre bureau pendant une mise en attente ne finit dans l'enregistrement ni dans la transcription. Un bouton **Attente** figure sur l'écran d'appel, entre Muet et le clavier ; appuyez dessus et l'appel se met en pause dans les deux sens : vous n'entendez plus l'appelant et il ne vous entend plus.

WaveKat Voice signale la mise en attente au système téléphonique d'en face à la manière standard de SIP, si bien que la plupart des systèmes diffusent leur propre musique d'attente — l'appelant entend « vous êtes en attente », pas un silence de mort. C'est plus qu'une simple coupure du son en local : le système distant sait que l'appel est en attente, et pas seulement silencieux. Appuyez sur **Reprendre** et la conversation, l'enregistrement et la transcription repartent.

![WaveKat Voice sur Ubuntu — un appel en attente : la bannière de mise en attente avec Reprendre, la transcription en pause.](/screenshots/in-call-hold/fr.webp)

## Double appel : répondre à un second appel pendant le premier

Quand un second appel sonne alors que vous êtes déjà en ligne, vous n'avez plus à choisir entre les deux. Répondez-y, et le premier appel se met en attente tout seul — exactement comme le double appel sur un téléphone mobile. Une barre de bascule sur l'écran d'appel liste chaque appel en cours, et vous passez de l'un à l'autre d'un clic.

Un seul appel a de l'audio en direct à la fois. L'appel que vous regardez est celui sur lequel vous parlez ; tous les autres sont en attente, avec leur enregistrement et leur transcription en direct en pause jusqu'à ce que vous y reveniez. Par défaut, basculer vers un appel en attente le reprend immédiatement ; si vous préférez reprendre chaque appel délibérément, un réglage existe dans **Réglages → Général** (« Reprendre un appel quand vous basculez dessus »), et tout appel en attente porte une bannière bien visible, pour qu'une ligne silencieuse ne passe jamais pour une ligne coupée.

![WaveKat Voice sur Ubuntu — un appel en cours, avec deux autres appelants en attente dans la barre de bascule.](/screenshots/in-call-waiting/fr.webp)

## Transférer un appelant — directement, ou après vérification

Le bouton **Transférer** envoie un appelant en ligne vers quelqu'un d'autre — un autre numéro, un autre poste, une autre adresse SIP. Il y a deux façons de faire, et WaveKat Voice propose les deux :

| | Transfert aveugle | Transfert supervisé |
|---|---|---|
| **Ce qui se passe** | L'appelant est envoyé immédiatement vers le nouveau numéro | Vous appelez d'abord la nouvelle personne, lui parlez, puis connectez les deux |
| **Parlez-vous d'abord au destinataire ?** | Non | Oui — l'appelant patiente en attente pendant que vous vérifiez |
| **Si le destinataire ne décroche pas** | L'appelant reste avec vous ; rien n'est perdu | Vous raccrochez l'appel de consultation et revenez à l'appelant |
| **Quand l'utiliser** | Vous savez que c'est pour lui : « je vous passe la facturation » | Vous voulez annoncer l'appelant, ou n'êtes pas sûr qu'il soit disponible |

Pour un transfert aveugle, appuyez sur Transférer, saisissez la destination, et c'est terminé — dès que la nouvelle personne décroche, votre côté de l'appel prend fin. Pour un transfert supervisé, choisissez **Parler d'abord** : l'appelant passe en attente, WaveKat Voice compose la destination comme un second appel, et vous lui parlez en privé (« j'ai un client qui a une question sur la facture — vous pouvez le prendre ? »). Quand tout est prêt, appuyez sur **Finaliser le transfert** : les deux sont connectés et vous vous retirez. Si la personne est occupée, refuse, ou n'est finalement pas la bonne, raccrochez simplement l'appel de consultation et reprenez votre appelant — il ne saura jamais que la première tentative n'a pas abouti.

![WaveKat Voice sur Ubuntu — un transfert supervisé : l'appelant en attente et le bouton Finaliser le transfert pour les connecter.](/screenshots/in-call-transfer/fr.webp)

Les transferts sont aussi consignés honnêtement dans votre historique. Un appel transféré se termine en **Transféré**, et sa page de détail montre exactement où il est parti — « Transféré vers … » — au lieu de faire comme si vous aviez raccroché.

## Questions fréquentes

### Comment transférer un appel dans WaveKat Voice ?

Appuyez sur Transférer sur l'écran d'appel et saisissez un numéro, un poste ou une adresse SIP. L'envoyer directement est un transfert aveugle ; choisir **Parler d'abord** met l'appelant en attente et compose la destination pour que vous puissiez l'annoncer, puis **Finaliser le transfert** connecte les deux.

### Quelle est la différence entre un transfert aveugle et un transfert supervisé ?

Un transfert aveugle envoie l'appelant vers la nouvelle destination immédiatement, sans parler d'abord au destinataire. Un transfert supervisé met l'appelant en attente pendant que vous appelez vous-même le destinataire, et ne connecte les deux qu'une fois que vous confirmez — vous pouvez donc faire marche arrière si le destinataire est occupé ou refuse. WaveKat Voice prend en charge les deux.

### La personne à qui je transfère l'appel a-t-elle besoin de WaveKat Voice ?

Non. WaveKat Voice utilise le mécanisme de transfert standard de SIP (un REFER, RFC 3515) : la destination reçoit simplement un appel téléphonique ordinaire — n'importe quel téléphone, n'importe quel softphone, n'importe quel poste que votre opérateur peut joindre.

### L'attente et le transfert fonctionnent-ils avec n'importe quel opérateur SIP ?

Oui. La mise en attente utilise le re-INVITE standard de SIP (RFC 3264) et le transfert utilise le REFER de SIP (RFC 3515), si bien que les deux fonctionnent avec n'importe quel opérateur ou PBX conforme à SIP, avec le compte que vous avez déjà — sans configuration propre à l'opérateur.

### Puis-je fusionner deux appels en conférence téléphonique ?

Pas encore. WaveKat Voice peut garder deux appels ou plus en attente et basculer entre eux, mais un seul est en direct à la fois. La conférence à trois est une fonction à part que nous n'avons pas encore construite.

### Qu'entend un appelant pendant qu'il est en attente ?

Un appelant mis en attente dans WaveKat Voice entend ce que son propre système téléphonique diffuse pour l'attente — le plus souvent sa musique d'attente, pas un silence ni une tonalité venant de WaveKat Voice. WaveKat Voice signale la mise en attente à la manière standard de SIP (un re-INVITE, RFC 3264), ce qui confie l'expérience d'attente au système de l'appelant lui-même, si bien qu'il entend ce à quoi il s'attend.

### Un appel est-il enregistré pendant qu'il est en attente ?

Non. L'enregistrement et la transcription en direct se mettent en pause pendant toute la durée de l'attente, dans les deux sens, et reprennent avec l'appel. La chronologie de l'enregistrement sauvegardé reste exacte — le temps d'attente apparaît comme du silence, pas comme une coupure.

### Quelles plateformes prennent en charge l'attente, le double appel et le transfert ?

WaveKat Voice fonctionne aujourd'hui sur Mac et Linux ; Windows viendra quand la demande sera là. L'attente, le double appel et les deux types de transfert fonctionnent sur les deux plateformes prises en charge, avec le compte SIP que vous utilisez déjà — sans surcoût, sans configuration.

## Essayez

[Téléchargez WaveKat Voice](/fr/voice/download/) — ou mettez à jour vers la [0.0.42](/fr/voice/changelog/#0.0.42) — et les commandes sont sur chaque écran d'appel : Attente à côté de Muet, Transférer juste à côté, et un double appel qui se déclenche tout seul quand le second appel sonne. Rien à configurer, rien de plus à payer.

Mettez un appelant en attente, prenez la seconde ligne et passez quelqu'un comme s'il y avait un accueil — parce que maintenant, il y en a un.
