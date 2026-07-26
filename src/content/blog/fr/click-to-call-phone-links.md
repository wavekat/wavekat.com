---
title: "Click-to-call : cliquez un numéro sur le web"
description: "WaveKat Voice ouvre les liens tel: et sip: sur Mac et Linux : cliquez un numéro de téléphone sur un site web et il s'inscrit, prêt à être appelé."
date: 2026-07-25
author: Eason Guo
tags: [ia-vocale, appels]
lang: "fr"
---

Le click-to-call, c'est quand un numéro de téléphone sur une page web est un lien sur lequel on clique pour composer, au lieu de quelque chose qu'on copie puis retape à la main. [WaveKat Voice](/fr/voice/) — le softphone SIP pour Mac et Linux qui enregistre et transcrit chaque appel — peut désormais être l'application que votre ordinateur ouvre pour ces liens. Cliquez sur un lien `tel:` ou `sip:` n'importe où — la page contact d'une entreprise, un résultat de recherche, la facture d'un fournisseur — et WaveKat Voice passe au premier plan avec le numéro déjà rempli, prêt à ce que vous appuyiez sur Appeler. Ça arrive avec la [0.0.43](/fr/voice/changelog/#0.0.43).

C'est la base sur un téléphone de bureau professionnel, et l'une de ces fonctions qu'on ne remarque que lorsqu'elle manque : vous voyez un numéro sur une page, vous cliquez, le téléphone compose. C'est la moitié sortante de la même version qui a appris à WaveKat Voice à [répondre aux appels entrants avec un flux d'appel](/fr/blog/answer-calls-with-a-call-flow/) — et, comme le reste de la téléphonie, cela tourne sur [notre propre moteur SIP](/fr/blog/our-own-sip-engine/).

## Ce qui se passe quand vous cliquez sur un numéro

Activez les **Liens téléphoniques** et n'importe quel numéro de téléphone qui est un lien cliquable devient une porte d'entrée vers WaveKat Voice. Cliquez sur `tel:+14155550123` dans votre navigateur et l'application prend le focus et ouvre la fiche Nouvel appel avec `+14155550123` déjà dans le champ À. Vous le regardez, et vous appuyez sur Appeler. Les liens `tel:` (numéros de téléphone ordinaires) comme les liens `sip:` (adresses SIP telles que `sip:alice@example.com`) fonctionnent — l'adresse SIP passe directement par votre compte.

![WaveKat Voice sur Ubuntu — la fiche Nouvel appel ouverte avec un numéro de téléphone déjà rempli, prêt à composer.](/screenshots/dial-prefilled/fr.webp)

Le réglage par défaut est délibérément le plus prudent : le numéro est rempli, mais c'est **vous** qui passez l'appel. Une page web peut *demander* de démarrer un appel ; elle ne peut pas réellement composer sans qu'un humain appuie sur Appeler. Ça compte, parce qu'un lien sur une page, n'importe qui peut l'y mettre.

## Comment activer les liens téléphoniques

Les liens téléphoniques sont **désactivés jusqu'à ce que vous les activiez**, parce que revendiquer les liens vers les numéros de téléphone de tout votre ordinateur est le genre de chose qui devrait être votre choix, et non une surprise d'une application que vous venez d'installer. Basculez les **Liens téléphoniques** sur activé dans **Réglages → Général** — au même endroit que « Lancer à la connexion » — et WaveKat Voice s'enregistre auprès de votre système d'exploitation comme gestionnaire des liens téléphoniques. Ce à quoi ça ressemble dépend du système, et le réglage est honnête à ce sujet :

| Plateforme | Ce qui se passe quand vous l'activez |
|---|---|
| **macOS** | WaveKat Voice devient le gestionnaire tout de suite, reprenant les liens `tel:` à FaceTime. |
| **Linux** | WaveKat Voice devient le gestionnaire tout de suite, enregistré auprès de votre bureau comme l'application `tel:`/`sip:`. |

![WaveKat Voice sur Ubuntu — Réglages → Général avec le réglage Liens téléphoniques activé.](/screenshots/settings-general-phone-links/fr.webp)

Nouveau sur WaveKat Voice ? Les liens téléphoniques vous seront proposés au moment le plus sympathique possible — juste après votre premier appel de test réussi, sur la carte « tout est prêt ». C'est une offre unique, jamais un harcèlement : acceptez-la ou écartez-la et elle ne redemandera pas. Les utilisateurs de longue date qui ouvrent le clavier pour taper un numéro à la main — exactement les gens à qui le clic-pour-appeler s'adresse — reçoivent la même offre discrète au bas de la fiche d'appel. Peu importe comment vous dites oui, c'est le même unique réglage en dessous.

## En option : composer dès le clic

Si pré-remplir-puis-confirmer est une étape de trop à votre goût, il y a une option pour ça. Activez **« Appeler dès le clic »** (aussi dans Réglages → Général, et disponible seulement une fois les Liens téléphoniques activés) et un clic passe l'appel immédiatement au lieu d'attendre que vous appuyiez sur Appeler. C'est **désactivé par défaut**, et même quand c'est activé, WaveKat Voice se retient dans les cas où un appel instantané serait le mauvais appel :

- **Uniquement quand il n'y a qu'une seule ligne d'où appeler.** Si vous avez plusieurs comptes qui pourraient passer l'appel, WaveKat Voice remplit le numéro et vous laisse choisir la ligne au lieu de deviner.
- **Jamais par-dessus un appel en cours.** Si vous êtes en pleine conversation, le clic pré-remplit plutôt que de s'imposer.
- **La fenêtre passe toujours au premier plan.** Même sur un appel instantané, vous voyez l'appel se produire et pouvez raccrocher — une page ne peut pas passer un appel discrètement en arrière-plan.

## Questions fréquentes

### Comment faire pour qu'un numéro de téléphone sur un site web s'ouvre dans WaveKat Voice ?

Activez les **Liens téléphoniques** dans Réglages → Général. Ensuite, cliquer sur n'importe quel lien `tel:` ou `sip:` — le genre de numéro de téléphone cliquable qu'on trouve sur les pages contact — ouvre WaveKat Voice avec le numéro rempli, prêt à composer.

### Cliquer sur un lien téléphonique passe-t-il l'appel automatiquement ?

Non, pas à moins que vous le demandiez. Par défaut, WaveKat Voice remplit le numéro et attend que vous appuyiez sur Appeler, si bien qu'une page web ne peut jamais passer un appel toute seule. Il existe un réglage optionnel « Appeler dès le clic », désactivé par défaut, si vous préférez sauter l'étape de confirmation.

### Quelles plateformes prennent en charge le clic-pour-appeler ?

Mac et Linux, les deux plateformes sur lesquelles WaveKat Voice fonctionne aujourd'hui (Windows viendra quand la demande sera là). Activez les Liens téléphoniques dans Réglages → Général et ça fonctionne sur les deux.

### Est-ce que ça marche aussi avec les liens sip:, ou seulement les numéros tel: ?

Les deux. Un lien `tel:` est normalisé en un numéro composable ; un lien `sip:` (comme `sip:alice@example.com`) passe directement par votre compte SIP. WaveKat Voice s'enregistre comme gestionnaire pour `tel:` et `sip:` à la fois.

### Est-il prudent de laisser des sites web ouvrir mon softphone ?

Oui, parce qu'un lien peut seulement *demander* un appel, pas le passer. Le réglage par défaut prudent remplit le numéro et attend que vous appuyiez sur Appeler. WaveKat Voice n'accepte que les liens `tel:`/`sip:`, nettoie le numéro avant d'en faire quoi que ce soit, et — même avec l'appel instantané activé — n'appelle jamais depuis un compte-surprise, n'interrompt jamais un appel en cours, et vous montre toujours la fenêtre pour que vous puissiez raccrocher.

### Puis-je le désactiver à nouveau ?

Oui. Basculez les **Liens téléphoniques** sur désactivé dans Réglages → Général et WaveKat Voice cesse de s'ouvrir pour les liens téléphoniques. Le réglage verrouille le comportement lui-même, si bien que même si votre système se souvient encore de l'association, les liens cliqués sont ignorés tant que le réglage est désactivé.

## Essayez

[Téléchargez WaveKat Voice](/fr/voice/download/) — ou mettez à jour vers la [0.0.43](/fr/voice/changelog/#0.0.43) — puis activez les **Liens téléphoniques** dans Réglages → Général. Cliquez sur un numéro sur n'importe quelle page web et il est déjà dans le champ d'appel, en attente.

Le numéro est à l'écran ; vous avez cliqué dessus ; maintenant, ça appelle, tout simplement. C'est tout l'intérêt.
</content>
</invoke>
