---
title: "Laissez votre assistant IA passer de vrais appels téléphoniques"
description: "WaveKat Voice propose désormais un outil en ligne de commande et un serveur MCP, pour qu'un assistant IA comme Claude puisse passer et gérer de vrais appels téléphoniques sur votre ordinateur — avec une configuration en un clic."
date: 2026-06-16
author: Eason Guo
tags: [ia-vocale, automatisation, agents-ia]
lang: "fr"
---

WaveKat Voice est désormais livré avec un outil en ligne de commande, pour qu'un programme en qui vous avez confiance — y compris un assistant IA comme Claude — puisse passer et gérer de vrais appels téléphoniques à votre place. Demandez à votre assistant d'« appeler le dentiste et d'attendre que quelqu'un décroche », et il compose le numéro via l'application que vous avez déjà ouverte, suit l'appel et vous dit comment il s'est déroulé. C'est intégré à l'application dès aujourd'hui sur Mac et Linux, et c'est désactivé jusqu'à ce que vous l'activiez.

C'est la prochaine étape vers ce à quoi nous revenons sans cesse : [donner à chaque petite entreprise la voix d'une grande](/blog/hello-world). Une grande entreprise dispose d'un standard téléphonique et d'un logiciel qui le pilote. Désormais, votre ordinateur — et l'assistant qui s'y exécute — peut être ce standard.

## Ce qu'il fait réellement

WaveKat Voice a toujours eu un téléphone qui tourne discrètement en arrière-plan : il s'enregistre auprès de votre opérateur SIP et gère les appels. La nouveauté, c'est une seconde façon de le piloter — une commande nommée `wavekat-voice` qui dialogue avec l'application en cours d'exécution.

Pour être précis sur la limite, car elle compte :

- **Il passe et gère les appels.** Composer un numéro, attendre le résultat, lister ce qui sonne en ce moment, répondre à un appel entrant ou le refuser, envoyer des tonalités pour naviguer dans un menu téléphonique, raccrocher, récupérer la transcription.
- **C'est toujours vous qui parlez.** L'audio passe par le microphone et les haut-parleurs de votre ordinateur, exactement comme lorsque vous cliquez sur « appeler » dans l'application. L'assistant établit et dirige l'appel ; la personne qui parle dans l'appel, c'est vous. (Un assistant qui parle lui-même pendant l'appel est un projet distinct, pour plus tard.)

Ainsi, l'assistant est la main sur le clavier, pas la voix sur la ligne. C'est une limite délibérée et honnête — et pour les corvées quotidiennes du type « passe-moi un humain », c'est l'essentiel de ce que vous voulez vraiment.

![WaveKat Voice sous Ubuntu — un appel lancé par l'assistant, en cours, avec la transcription en direct à côté.](/screenshots/in-call/fr.webp)

## Il n'y a rien à installer

La commande `wavekat-voice` est le même programme qui fait tourner l'application — il est déjà sur votre disque dès l'instant où vous installez WaveKat Voice. Pas de second téléchargement, pas de paquet séparé, aucune version susceptible de se désynchroniser de l'application.

Elle est **désactivée par défaut**. Tant que l'automatisation est active, n'importe quel programme que vous exécutez sur votre ordinateur peut passer des appels via votre compte — et les appels peuvent coûter de l'argent — alors nous vous laissons cette décision. Activez-la dans **Settings → Automation**, où se trouve aussi un bouton en un clic pour ajouter `wavekat-voice` à votre PATH, afin que n'importe quel terminal puisse le trouver.

![WaveKat Voice sous Ubuntu — les réglages d'Automatisation avec l'accès en ligne de commande activé et le bouton pour installer l'outil en ligne de commande.](/screenshots/settings-automation/fr.webp)

## Connectez un assistant IA en un clic

Le chemin le plus rapide est la page **Settings → Automation** elle-même. Elle recherche les assistants IA que vous avez déjà installés et propose un bouton **Connect** pour chacun. Aujourd'hui, cela couvre :

| Assistant | Comment il se connecte |
|---|---|
| Claude Desktop, Cursor, Windsurf | Via un serveur MCP intégré à l'application |
| Claude Code, Codex, Gemini | Via une note gérée dans leur fichier d'instructions |

Un clic suffit pour tout brancher — rien à copier ni à coller. Ensuite, il vous suffit de demander à l'assistant de passer un appel. Deux choses valent la peine d'être sues : certains assistants nécessitent un redémarrage complet (quitter et rouvrir) pour reconnaître les nouveaux outils, et la connexion se maintient à jour d'elle-même — lorsque WaveKat Voice se met à jour en arrière-plan, tout assistant que vous avez connecté est discrètement gardé synchronisé, si bien que vous n'avez jamais à le reconnecter.

![WaveKat Voice sous Ubuntu — connecter des assistants IA comme Claude et Cursor, chacun avec un bouton Connecter en un clic.](/screenshots/settings-automation-agents/fr.webp)

## À quoi cela ressemble depuis un terminal

Chaque commande accepte `--json` pour une sortie lisible par machine, ce qui la rend confortable à piloter pour un assistant. Quelques exemples :

```bash
# Is the app running, and which accounts are connected?
wavekat-voice status

# Place a call and wait — the exit code says how it went.
wavekat-voice call +14155550123 --wait
echo "result: $?"

# Find a call that's happening right now, then hang it up.
wavekat-voice call list --json | jq -r '.[0].id' | xargs wavekat-voice call hangup
```

Le code de sortie de `--wait` est le contrat sur lequel un script (ou un assistant) se ramifie : `0` décroché puis terminé normalement, `2` occupé ou refusé, `3` échoué ou interrompu, `4` pas de réponse. Aucune analyse de la sortie n'est requise pour savoir ce qui s'est passé.

Les commandes sont regroupées selon ce sur quoi elles agissent — `call` pour passer et gérer les appels, `recording` pour l'audio enregistré, `log` pour le journal d'activité — avec `status`, `accounts` et un flux `events` en direct au niveau supérieur. Exécutez `wavekat-voice call --help` pour voir l'ensemble complet.

## Pourquoi nous l'avons construit ainsi

Quelques choix dont nous sommes contents :

- **Un seul binaire, aucune nouvelle surface.** L'outil en ligne de commande est le propre démon de l'application avec une autre casquette — il hérite donc gratuitement de la signature de l'application, de ses mises à jour automatiques et de sa revue de sécurité, et il ne peut jamais être une version périmée.
- **Le binaire est la source de vérité.** Le texte d'aide contient les codes de sortie et les exemples ; les intégrations des assistants pointent vers `wavekat-voice --help` plutôt que de figer une liste de commandes qui finirait par pourrir. Mettez à jour l'application et les outils se mettent à jour avec elle.
- **Désactivé par défaut, sur acceptation, révocable.** Passer un appel téléphonique payant a des conséquences, alors l'automatisation reste désactivée jusqu'à ce que vous la demandiez, et **Remove** débranche n'importe quel assistant à nouveau sans toucher au reste de ses réglages.

## Foire aux questions

### Un assistant IA peut-il passer des appels téléphoniques avec WaveKat Voice ?

Oui. Avec l'automatisation activée dans WaveKat Voice (Settings → Automation), un assistant IA comme Claude peut passer, suivre et terminer de vrais appels téléphoniques via l'outil en ligne de commande de l'application ou son serveur MCP. L'assistant pilote l'appel ; c'est vous qui y parlez.

### Est-ce l'IA qui parle dans l'appel à ma place ?

Non. WaveKat Voice achemine l'audio de l'appel par le microphone et les haut-parleurs de votre ordinateur — c'est vous qui parlez. L'assistant se charge de composer le numéro, d'attendre une réponse, d'envoyer les tonalités de menu et de raccrocher.

### Dois-je installer quoi que ce soit de plus pour utiliser la ligne de commande ?

Non. La commande `wavekat-voice` est livrée à l'intérieur de l'application WaveKat Voice, elle est donc déjà sur votre ordinateur. Il vous suffit d'activer l'automatisation dans Settings → Automation, et éventuellement de cliquer sur « Install command-line tool » pour l'ajouter à votre PATH.

### Est-il sûr de laisser l'automatisation activée ?

Laissez-la désactivée sauf si vous l'utilisez. Tant que l'automatisation est active, n'importe quel programme que vous exécutez sur votre ordinateur peut passer des appels via votre compte, ce qui peut coûter de l'argent. C'est désactivé par défaut pour cette raison, et vous pouvez la désactiver à nouveau à tout moment.

### Quels assistants peuvent se connecter en un clic ?

Claude Desktop, Claude Code, Cursor, Codex, Gemini et Windsurf aujourd'hui — via un serveur MCP intégré pour les assistants de bureau et une note d'instructions gérée pour ceux en ligne de commande.

### Quelles plateformes prennent en charge cette fonctionnalité ?

WaveKat Voice fonctionne aujourd'hui sur Mac et Linux, avec Windows à venir quand la demande sera là. L'outil en ligne de commande et les intégrations d'assistants sont disponibles sur les deux plateformes prises en charge.

## Essayez-le

[Téléchargez WaveKat Voice](/voice/download/), ouvrez **Settings → Automation** et connectez votre assistant. La référence complète des commandes — chaque commande, sa sortie JSON et les codes de sortie — se trouve dans la [documentation sur l'automatisation](/voice/automation/).

Nous ne faisons que commencer ici. Piloter les appels est la fondation ; un assistant capable aussi de tenir la conversation, c'est là où cela ira ensuite.
