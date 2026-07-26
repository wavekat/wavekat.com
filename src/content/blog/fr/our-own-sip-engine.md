---
title: "Pourquoi WaveKat Voice a son propre moteur SIP"
description: "WaveKat Voice tourne sur wavekat-sip, notre moteur SIP/RTP open source écrit de zéro : aucune pile tierce, aucune boîte noire entre vous et vos appels."
date: 2026-07-06
author: Eason Guo
tags: [ia-vocale, ingénierie, open-source, SIP]
lang: "fr"
---

WaveKat Voice — le softphone pour Mac et Linux qui [enregistre et transcrit chaque appel](/fr/voice/) — tourne désormais sur un moteur SIP que nous avons écrit de zéro. [`wavekat-sip`](https://github.com/wavekat/wavekat-sip) est un crate Rust open source qui prend en charge lui-même la signalisation téléphonique et le transport audio, sans aucune pile SIP tierce en dessous. Chaque appel que vous passez ou décrochez, chaque mise en attente et chaque transfert passe maintenant par du code que nous maîtrisons de bout en bout.

C'est un pas de plus vers ce à quoi nous revenons sans cesse : [donner à chaque petite entreprise la voix d'une grande](/fr/blog/hello-world/). Un grand système téléphonique est fiable parce que ceux qui l'exploitent en contrôlent chaque couche. Maîtriser le moteur SIP, c'est maîtriser la couche sur laquelle votre appel voyage réellement — ainsi, quand quelque chose doit gagner en fiabilité, ou qu'une fonction doit sortir, aucune boîte noire ne se met en travers.

## Ce qu'est SIP, et pourquoi c'est la partie difficile

SIP (Session Initiation Protocol) est la langue que parlent les téléphones pour établir un appel — enregistrer votre ligne auprès de votre opérateur, faire sonner l'autre côté, négocier le codec audio à utiliser, puis raccrocher proprement à la fin. RTP est ce qui transporte l'audio proprement dit une fois l'appel établi. Un SIP subtilement mal fait, et les appels tombent, l'audio ne passe que dans un sens, ou une ligne cesse silencieusement de recevoir des appels. C'est le cœur ingrat et exigeant sur lequel repose tout le reste d'un softphone.

Jusqu'à récemment, WaveKat Voice pilotait ses appels via une bibliothèque SIP tierce. Cela nous a mis au téléphone rapidement, ce qui était le bon choix au début. Mais une pile empruntée décide à votre place comment un appel est modélisé, comment les erreurs remontent, et quelles fonctions sont même atteignables — et dès que nous avons commencé à construire des choses comme le transfert d'appel et l'audio HD, nous travaillions en contournant sa forme au lieu d'aller avec elle.

## Pourquoi nous avons construit le nôtre

Nous avons réécrit le moteur SIP de WaveKat Voice de zéro, sous le nom de `wavekat-sip`, pour trois raisons toutes simples :

- **Maîtrise.** Des fonctions comme mettre un appelant en attente, [transférer un appel](/fr/blog/hold-switch-and-transfer-calls/) et garder un long appel en vie avec des minuteurs de session vivent toutes à la couche SIP. Maîtriser cette couche signifie que nous les ajoutons directement, au lieu de plier le modèle de quelqu'un d'autre pour qu'il colle.
- **Empreinte.** WaveKat Voice est une application de bureau légère, faite pour rester discrètement à l'écart. Un moteur ciblé, conçu pour l'usage, la garde petite — il n'embarque que le SIP et le RTP qu'il utilise réellement, pas tout le fatras d'une pile généraliste.
- **Aucune boîte noire.** Quand un appel se comporte mal, nous pouvons lire et corriger chaque ligne entre le bouton que vous avez pressé et le paquet sur le fil. Rien dans le fonctionnement de vos appels ne nous est interdit.

## Ce dont le moteur s'occupe

`wavekat-sip` prend en charge les préoccupations de bas niveau, au ras du fil, et reste en dehors des couches périphérique audio et orchestration d'appel, de sorte qu'il reste petit et embarquable :

| Domaine | Ce qu'il fait |
|------|-------------|
| **Enregistrement** | Enregistre votre ligne auprès de votre opérateur (authentification digest), et la maintient en vie pour que les appels entrants vous atteignent toujours. |
| **Appels** | Passe les appels sortants et décroche les entrants, et signale aux appelants une véritable sonnerie avant que vous ne répondiez. |
| **Contrôle en cours d'appel** | Mise en attente et reprise (SIP re-INVITE, RFC 3264), transfert aveugle et supervisé (SIP REFER, RFC 3515), et DTMF (tonalités du clavier) pour les menus téléphoniques. |
| **Qualité audio** | Négocie le [codec Opus](/fr/voice/) pour une voix « HD » à large bande, avec repli automatique vers le G.711 standard quand l'autre côté ne le prend pas en charge. |
| **Fiabilité** | Les minuteurs de session RFC 4028 empêchent les longs appels d'être silencieusement coupés par le réseau en plein milieu. |

## C'est open source — comme le reste de WaveKat

`wavekat-sip` n'est pas un composant interne privé. Il est publié sur [crates.io](https://crates.io/crates/wavekat-sip) sous licence Apache-2.0, avec sa documentation sur [docs.rs](https://docs.rs/wavekat-sip), au même titre que nos crates de [détection d'activité vocale](https://github.com/wavekat/wavekat-vad) et de [détection de tour de parole](https://github.com/wavekat/wavekat-turn). Quiconque construit un softphone, un bot vocal ou une passerelle d'enregistrement d'appels en Rust peut utiliser le moteur exact sur lequel tourne WaveKat Voice. Construire à découvert, c'est notre façon de travailler — les outils sous notre produit sont à vous, à inspecter et à réutiliser, pas des douves.

Soyons honnêtes : c'est encore tôt. Le crate est en développement actif et son API change encore d'une version à l'autre. Mais c'est le vrai moteur derrière un vrai produit, pas une démo.

## Questions fréquentes

### Qu'est-ce que wavekat-sip ?

`wavekat-sip` est le crate Rust open source de WaveKat pour la signalisation SIP et le transport audio RTP. C'est le moteur derrière chaque appel que WaveKat Voice passe ou décroche, sans aucune pile SIP tierce en dessous.

### wavekat-sip est-il open source, et puis-je l'utiliser dans mon propre projet ?

Oui. `wavekat-sip` est publié sur [crates.io](https://crates.io/crates/wavekat-sip) sous licence Apache-2.0, avec sa documentation sur [docs.rs](https://docs.rs/wavekat-sip). Quiconque construit un softphone, un bot vocal ou une passerelle d'enregistrement d'appels en Rust peut utiliser le même moteur sur lequel tourne WaveKat Voice.

### WaveKat Voice prend-il en charge l'audio HD ?

Oui. WaveKat Voice négocie le codec Opus pour une voix « HD » à large bande, et se replie automatiquement vers le G.711 standard quand l'autre côté de l'appel ne prend pas Opus en charge.

### WaveKat Voice fonctionne-t-il avec n'importe quel opérateur SIP ?

Oui. `wavekat-sip` gère l'enregistrement SIP standard avec authentification digest, si bien qu'il fonctionne avec n'importe quel opérateur ou PBX conforme à SIP — le compte que vous avez déjà, sans configuration propre à l'opérateur.

### wavekat-sip est-il prêt pour la production ?

C'est le vrai moteur derrière un vrai produit, il est donc déjà utilisé au quotidien — mais c'est encore tôt. Le crate est en développement actif et son API change encore d'une version à l'autre, alors épinglez une version si vous construisez dessus aujourd'hui.

## Ce que cela change pour vos appels

Le plus souvent, les appels de WaveKat Voice ne vous sembleront pas différents — et c'est bien le but. Ils s'établissent et sonnent comme ils le doivent. Ce qui change est en coulisses : les fonctions qui donnent à WaveKat Voice des airs de véritable accueil — mise en attente, double appel, transfert, audio HD — sortent désormais à notre rythme plutôt qu'à celui d'une dépendance, et quand quelque chose doit gagner en stabilité, nous pouvons aller droit au code qui l'exécute.

WaveKat Voice est [gratuit pendant la bêta publique](/fr/voice/download/) sur Mac et Linux. Connectez l'opérateur téléphonique que vous avez déjà, et votre prochain appel tournera sur un moteur que nous avons construit nous-mêmes — et offert.
