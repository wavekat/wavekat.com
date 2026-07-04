---
title: "Mettre en attente, basculer et transférer des appels comme un standard"
description: "WaveKat Voice sait désormais mettre un appel en attente, répondre à un second appel pendant le premier et transférer un appelant — en aveugle ou avec supervision — sur Mac et Linux."
date: 2026-07-04
author: Eason Guo
tags: [ia-vocale, appels]
draft: true
lang: "fr"
---

<!-- TODO before publishing: set the real release version + date (the two
     changelog links below assume 0.0.42), remove `draft: true`, and add
     screenshots if the pipeline gets hold/transfer scenes. -->

WaveKat Voice sait désormais faire les trois choses qu'un accueil fait toute la journée : mettre un appelant en attente, répondre à un second appel pendant que le premier patiente, et transférer un appelant vers quelqu'un d'autre — soit directement, soit après l'avoir consulté. Ces fonctions arrivent avec WaveKat Voice [0.0.42](/fr/voice/changelog/#0.0.42) sur Mac et Linux.

C'est le pas le plus littéral à ce jour vers notre objectif : [donner à chaque petite entreprise la voix d'une grande](/fr/blog/hello-world/). Quand vous appelez une grande entreprise, quelqu'un dit « un instant, je vous mets en relation » — et ça marche, parce qu'il y a une standardiste devant un standard. Désormais, [l'application qui enregistre et transcrit déjà chaque appel](/fr/voice/) donne les mêmes gestes à un commerce tenu par une seule personne. La mise en attente, le double appel et le transfert sont les commandes qu'une personne à l'accueil utilise sans cesse, et tout [softphone](/fr/voice/alternatives/) sérieux est censé les avoir — WaveKat Voice les a maintenant, avec sa touche à lui : ce qui se passe pendant l'attente reste hors de l'enregistrement.

## Mettre un appelant en attente

Un bouton **Attente** figure sur l'écran d'appel, entre Muet et le clavier. Appuyez dessus et l'appel se met en pause dans les deux sens : vous ne les entendez plus, ils ne vous entendent plus, et — parce que tout reste honnête dans WaveKat Voice — l'enregistrement et la transcription en direct se mettent en pause aussi. Rien de ce qui se dit près de votre bureau pendant qu'un appel patiente ne finit dans la transcription.

La mise en attente ne se contente pas de couper le son des deux côtés en local. WaveKat Voice signale au système téléphonique d'en face que l'appel est mis en attente (à la manière standard de SIP), si bien que la plupart des systèmes diffusent leur propre musique d'attente à l'appelant — il entend « vous êtes en attente », pas un silence de mort. Appuyez sur **Reprendre** et la conversation, l'enregistrement et la transcription repartent.

## Double appel : répondre à un second appel pendant le premier

Quand un second appel sonne alors que vous êtes déjà en ligne, vous n'avez plus à choisir entre les deux. Répondez-y, et le premier appel se met en attente tout seul — exactement comme le double appel sur un téléphone mobile. Une barre de bascule sur l'écran d'appel liste chaque appel en cours, et vous passez de l'un à l'autre d'un clic.

Un seul appel a de l'audio en direct à la fois. L'appel que vous regardez est celui sur lequel vous parlez ; tous les autres patientent en attente, et leurs enregistrements et transcriptions patientent avec eux. Par défaut, basculer vers un appel en attente le reprend immédiatement ; si vous préférez reprendre chaque appel délibérément, un réglage existe dans **Réglages → Général** (« Reprendre un appel quand vous basculez dessus »), et tout appel en attente porte une bannière bien visible, pour qu'une ligne silencieuse ne passe jamais pour une ligne coupée.

## Transférer un appelant — directement, ou après vérification

Le bouton **Transférer** envoie un appelant en ligne vers quelqu'un d'autre — un autre numéro, un autre poste, une autre adresse SIP. Il y a deux façons de faire, et WaveKat Voice propose les deux :

| | Transfert aveugle | Transfert supervisé |
|---|---|---|
| **Ce qui se passe** | L'appelant est envoyé immédiatement vers le nouveau numéro | Vous appelez d'abord la nouvelle personne, lui parlez, puis connectez les deux |
| **Parlez-vous d'abord au destinataire ?** | Non | Oui — l'appelant patiente en attente pendant que vous vérifiez |
| **Si le destinataire ne décroche pas** | L'appelant reste avec vous ; rien n'est perdu | Vous raccrochez l'appel de consultation et revenez à l'appelant |
| **Quand l'utiliser** | Vous savez que c'est pour lui : « je vous passe la facturation » | Vous voulez annoncer l'appelant, ou n'êtes pas sûr qu'il soit disponible |

Pour un transfert aveugle, appuyez sur Transférer, saisissez la destination, et c'est terminé — dès que la nouvelle personne décroche, votre côté de l'appel prend fin. Pour un transfert supervisé, choisissez **Parler d'abord** : l'appelant passe en attente, WaveKat Voice compose la destination comme un second appel, et vous lui parlez en privé (« j'ai un client qui a une question sur la facture — vous pouvez le prendre ? »). Quand tout est prêt, appuyez sur **Finaliser le transfert** : les deux sont connectés et vous vous retirez. Si la personne est occupée, refuse, ou n'est finalement pas la bonne, raccrochez simplement l'appel de consultation et reprenez votre appelant — il ne saura jamais que la première tentative n'a pas abouti.

Les transferts sont aussi consignés honnêtement dans votre historique. Un appel transféré se termine en **Transféré**, et sa page de détail montre exactement où il est parti — « Transféré vers … » — au lieu de faire comme si vous aviez raccroché.

## Questions fréquentes

### Comment transférer un appel dans WaveKat Voice ?

Appuyez sur Transférer sur l'écran d'appel et saisissez un numéro, un poste ou une adresse SIP. L'envoyer directement est un transfert aveugle ; choisir **Parler d'abord** met l'appelant en attente et compose la destination pour que vous puissiez l'annoncer, puis **Finaliser le transfert** connecte les deux.

### Quelle est la différence entre un transfert aveugle et un transfert supervisé ?

Un transfert aveugle envoie l'appelant vers la nouvelle destination immédiatement, sans parler d'abord au destinataire. Un transfert supervisé met l'appelant en attente pendant que vous appelez vous-même le destinataire, et ne connecte les deux qu'une fois que vous confirmez — vous pouvez donc faire marche arrière si le destinataire est occupé ou refuse. WaveKat Voice prend en charge les deux.

### La personne à qui je transfère l'appel a-t-elle besoin de WaveKat Voice ?

Non. WaveKat Voice utilise le mécanisme de transfert standard de SIP (un REFER, RFC 3515) : la destination reçoit simplement un appel téléphonique ordinaire — n'importe quel téléphone, n'importe quel softphone, n'importe quel poste que votre opérateur peut joindre.

### Puis-je fusionner deux appels en conférence téléphonique ?

Pas encore. WaveKat Voice peut garder deux appels ou plus en attente et basculer entre eux, mais un seul est en direct à la fois. La conférence à trois est une fonction à part que nous n'avons pas encore construite.

### Qu'entend un appelant pendant qu'il est en attente ?

Ce que son propre système téléphonique diffuse pour l'attente — le plus souvent sa musique d'attente. WaveKat Voice signale la mise en attente à la manière standard de SIP (un re-INVITE, RFC 3264) plutôt que de jouer une tonalité lui-même, et c'est justement ce qui permet à l'autre côté de réagir correctement.

### Un appel est-il enregistré pendant qu'il est en attente ?

Non. L'enregistrement et la transcription en direct se mettent en pause pendant toute la durée de l'attente, dans les deux sens, et reprennent avec l'appel. La chronologie de l'enregistrement sauvegardé reste exacte — le temps d'attente apparaît comme du silence, pas comme une coupure.

### Quelles plateformes prennent en charge l'attente, le double appel et le transfert ?

WaveKat Voice fonctionne aujourd'hui sur Mac et Linux ; Windows viendra quand la demande sera là. L'attente, le double appel et les deux types de transfert fonctionnent sur les deux plateformes prises en charge, avec le compte SIP que vous utilisez déjà — sans surcoût, sans configuration.

## Essayez

[Téléchargez WaveKat Voice](/fr/voice/download/) — ou mettez à jour vers la [0.0.42](/fr/voice/changelog/#0.0.42) — et les commandes sont sur chaque écran d'appel : Attente à côté de Muet, Transférer juste à côté, et un double appel qui se déclenche tout seul quand le second appel sonne. Rien à configurer, rien de plus à payer.

Mettez un appelant en attente, prenez la seconde ligne et passez quelqu'un comme s'il y avait un accueil — parce que maintenant, il y en a un.
