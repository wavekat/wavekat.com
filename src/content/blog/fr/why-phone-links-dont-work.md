---
title: "Pourquoi les liens téléphoniques ne marchent pas"
description: "Cliquer un numéro de téléphone ne fait rien sur la plupart des ordinateurs : aucune application ne prend l'appel. WaveKat Voice corrige ça sur Mac et Linux."
date: 2026-08-07
author: Eason Guo
tags: [ia-vocale, appels]
lang: "fr"
---

Presque toutes les pages contact du web affichent un numéro de téléphone cliquable. Ça existe depuis des décennies. Sur un téléphone, vous touchez le numéro et ça sonne. Sur un ordinateur, le même clic ne fait rien la plupart du temps — ou déclenche quelque chose d'étrange.

Vous pouvez essayer tout de suite, sur l'appareil qui affiche cet article : <a href="tel:+14155550123">+1 (415) 555-0123</a>. C'est un numéro fictif réservé : cliquer dessus ne risque rien, il ne joint personne. Ce qui se passe ensuite dépend entièrement de votre appareil — et toute l'histoire tient dans cette différence.

## Où va vraiment le clic

Un lien téléphonique, c'est un lien web ordinaire avec `tel:` au début à la place de `https:`. Quand vous cliquez, votre navigateur n'essaie pas de passer l'appel lui-même. Un navigateur affiche des pages ; il n'a ni micro prêt à servir ni tonalité en réserve. Il tend le numéro au système d'exploitation et lui dit : quelqu'un veut appeler ce numéro.

Le système regarde alors à un endroit précis. Imaginez une case étiquetée « application téléphone » : la seule application de l'appareil enregistrée pour gérer les appels. Ce qui occupe la case reçoit le numéro. Si la case est vide, le numéro n'a nulle part où aller.

Cette case unique explique tout ce qui suit.

## Pourquoi ça marche toujours sur votre téléphone

Votre téléphone n'a qu'une seule chose qui passe des appels : l'application Téléphone. Elle est intégrée, impossible à retirer, et toujours dans la case. Quand vous touchez un numéro, le téléphone n'a donc jamais besoin de demander ce que vous vouliez. Le numéro file droit vers l'application, et ça sonne.

Voilà pourquoi les liens téléphoniques semblent si naturels sur un téléphone que vous n'y avez probablement jamais réfléchi. Il n'y a jamais eu de question à poser.

## Ce que fait votre ordinateur du même clic

Votre ordinateur, c'est une autre histoire. Il peut faire tourner cent applications qui produisent du son, mais il n'arrive pas avec un « truc qui téléphone » évident. La case est donc une vraie question — et chaque système d'exploitation y répond à sa façon.

Sur un **Mac**, Apple a pré-rempli la case avec FaceTime. Cliquez un numéro et FaceTime s'ouvre pour proposer de passer l'appel *via votre iPhone* — ce qui ne fonctionne que si vous avez un iPhone, à portée de main, connecté au même compte, avec cette fonction configurée. Si vous êtes à votre bureau en train de joindre un fournisseur, ce n'est presque jamais ce que vous vouliez.

Sur **Windows**, la case démarre vide. Vous obtenez la fenêtre « Comment voulez-vous ouvrir ceci ? », avec une liste d'applications souvent vide elle aussi, ou qui vous renvoie vers la boutique d'applications.

Sur **Linux**, aucune application ne revendique les liens téléphoniques d'origine. Le clic ne fait rien. Pas d'erreur, pas de fenêtre — rien du tout.

Le point important : le lien n'a jamais été cassé. Le site a fait son travail, le navigateur a fait le sien, le système a frappé à la porte de l'application téléphone. Il n'y avait simplement personne pour ouvrir.

<link rel="stylesheet" href="/blog/phone-slot/widget.css" />

<div class="wk-slot wk-nojs" data-wk-slot data-w-yours="← votre appareil">
  <div class="wk-slot-head">Qui répond à un lien téléphonique, appareil par appareil</div>
  <div class="wk-slot-body">
    <div class="chips" data-wk-os-chips>
      <button type="button" data-os="phone" aria-pressed="true">un téléphone</button>
      <button type="button" data-os="mac">un Mac</button>
      <button type="button" data-os="windows">Windows</button>
      <button type="button" data-os="linux">Linux</button>
      <button type="button" data-os="wavekat">Mac ou Linux + WaveKat Voice</button>
    </div>
    <div class="panel" data-os-panel="phone">
      <p class="panel-name">Un téléphone</p>
      <ol class="trace">
        <li><span class="who">Vous touchez</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Dans la case</span><span class="what"><span class="slotbox">L'application Téléphone — la seule de l'appareil qui appelle</span></span></li>
        <li><span class="who">Résultat</span><span class="what ok">Ça sonne.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="mac" hidden>
      <p class="panel-name">Un Mac</p>
      <ol class="trace">
        <li><span class="who">Vous cliquez</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Dans la case</span><span class="what"><span class="slotbox">FaceTime — Apple l'y a mis</span></span></li>
        <li><span class="who">Résultat</span><span class="what meh">FaceTime s'ouvre et propose d'appeler via votre iPhone — si vous en avez un, à portée de main, configuré pour ça.</span></li>
      </ol>
      <p class="note">Rarement ce que voulait la personne assise à son bureau.</p>
    </div>
    <div class="panel" data-os-panel="windows" hidden>
      <p class="panel-name">Windows</p>
      <ol class="trace">
        <li><span class="who">Vous cliquez</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Dans la case</span><span class="what"><span class="slotbox is-empty">vide</span></span></li>
        <li><span class="who">Résultat</span><span class="what no">« Comment voulez-vous ouvrir ceci ? » — avec une liste souvent vide.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="linux" hidden>
      <p class="panel-name">Linux</p>
      <ol class="trace">
        <li><span class="who">Vous cliquez</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Dans la case</span><span class="what"><span class="slotbox is-empty">vide</span></span></li>
        <li><span class="who">Résultat</span><span class="what no">Rien. Rien du tout.</span></li>
      </ol>
    </div>
    <div class="panel" data-os-panel="wavekat" hidden>
      <p class="panel-name">Mac ou Linux avec WaveKat Voice</p>
      <ol class="trace">
        <li><span class="who">Vous cliquez</span><span class="what"><code>+1 (415) 555-0123</code></span></li>
        <li><span class="who">Dans la case</span><span class="what"><span class="slotbox is-wavekat">WaveKat Voice — vous l'y avez mis, d'un seul réglage</span></span></li>
        <li><span class="who">Résultat</span><span class="what ok">L'application s'ouvre, le numéro déjà saisi. Vous appuyez sur Appeler.</span></li>
      </ol>
    </div>
  </div>
</div>

## Comment WaveKat Voice remplit la case

[WaveKat Voice](/fr/voice/) est une application de téléphonie pour Mac et Linux : elle passe et reçoit de vrais appels via votre opérateur, et enregistre et transcrit chacun d'eux. Et elle peut être ce qui occupe la case.

Vous basculez un seul réglage : **Liens téléphoniques**, dans Réglages → Général. Il est désactivé tant que vous ne l'activez pas, et c'est voulu — prendre en charge les liens téléphoniques de tout votre ordinateur devrait être votre choix, pas quelque chose qu'une application s'accapare à l'installation. Une fois le réglage activé, cliquer un numéro sur n'importe quelle page web fait apparaître WaveKat Voice avec le numéro déjà inscrit dans la fiche d'appel. Vous le regardez, et vous appuyez sur Appeler.

![WaveKat Voice sur Ubuntu — la fiche Nouvel appel ouverte avec un numéro de téléphone déjà rempli, prêt à composer.](/screenshots/dial-prefilled/fr.webp)

C'est toute la fonction. Plus de numéro à copier depuis la page, plus d'indicatif retapé au mauvais endroit. Elle est arrivée avec la version [0.0.43](/fr/voice/changelog/#0.0.43), et une annonce plus courte l'accompagne dans [Click-to-call : cliquez un numéro sur le web](/fr/blog/click-to-call-phone-links/).

## Une page web peut-elle faire téléphoner mon ordinateur ?

C'est la question que tout le monde pose ensuite — et c'est la bonne. Non, elle ne peut pas.

Un lien peut seulement *demander* un appel. Par défaut, WaveKat Voice remplit le numéro puis attend qu'un humain appuie sur Appeler. Rien ne compose tant que vous ne le faites pas.

Il existe un réglage optionnel « Appeler dès le clic » pour ceux qui font confiance à leurs clics et veulent une étape de moins. Il est désactivé par défaut. Et même activé, il refuse d'agir si vous êtes déjà en communication, ou s'il n'est pas évident de savoir quelle ligne devrait porter l'appel — il remplit le numéro et attend, exactement comme le réglage par défaut. La fenêtre passe toujours au premier plan, elle aussi : rien ne peut jamais composer là où vous ne voyez pas.

La case a du pouvoir ; c'est justement pour ça que l'application qui l'occupe doit être prudente.

## Questions fréquentes

### Pourquoi cliquer un numéro de téléphone ne fait rien sur mon ordinateur ?

Parce qu'aucune application de votre ordinateur n'a revendiqué les liens téléphoniques. Le navigateur passe le numéro au système d'exploitation, qui cherche une application téléphone enregistrée — et sur Windows et Linux il n'y en a généralement pas, donc le clic ne mène nulle part.

### Un site web peut-il faire passer un appel à mon ordinateur ?

Non. Un lien téléphonique peut seulement demander un appel, et par défaut WaveKat Voice se contente de remplir le numéro et d'attendre que vous appuyiez sur Appeler. Même le réglage optionnel « Appeler dès le clic » refuse d'agir si vous êtes déjà en communication ou si la ligne sortante est ambiguë.

### Pourquoi un numéro de téléphone ouvre-t-il FaceTime sur mon Mac ?

Apple enregistre d'office FaceTime comme gestionnaire des liens téléphoniques du Mac. FaceTime propose alors de relayer l'appel via un iPhone à proximité, ce qui ne fonctionne que si vous en possédez un et avez configuré cette fonction. Installer une autre application d'appel, comme WaveKat Voice, permet de lui confier les liens téléphoniques à la place.

### Comment ouvrir les liens téléphoniques dans WaveKat Voice ?

Activez les **Liens téléphoniques** dans Réglages → Général — le réglage est désactivé par défaut. Ensuite, cliquer un numéro sur n'importe quelle page web ouvre WaveKat Voice avec le numéro déjà inscrit, prêt à composer. Ça fonctionne sur Mac et Linux, depuis la version 0.0.43.

## Réessayez ce numéro

Les liens téléphoniques attendent en silence sur toutes les pages contact depuis des décennies ; il n'a jamais manqué à votre ordinateur que quelqu'un pour leur répondre. Si vous voulez que vos clics fassent sonner, [téléchargez WaveKat Voice](/fr/voice/download/) pour Mac ou Linux, basculez le seul réglage, et réessayez le numéro en haut de cette page.

<script src="/blog/phone-slot/widget.js" defer></script>
