---
title: "Partager un enregistrement d'appel par un lien"
description: "WaveKat Voice transforme un appel enregistré en lien à partager — privé, sur invitation ou public — et vous choisissez ce que le destinataire écoute et lit."
date: 2026-06-28
author: Eason Guo
tags: [ia-vocale, enregistrements, confidentialité]
lang: "fr"
---

WaveKat Voice transforme désormais n'importe quel appel enregistré en un lien que vous pouvez envoyer. Ouvrez un appel, choisissez qui est autorisé à écouter — vous seul, quelques personnes que vous invitez, ou toute personne disposant du lien — et copiez une URL. Celui qui l'ouvre obtient une page épurée : le lecteur audio au-dessus d'une transcription étiquetée par interlocuteur. Les enregistrements sont **Privé** au départ, le partage se décide appel par appel, et vous pouvez l'arrêter à tout moment. Arrivée dans WaveKat Voice [0.0.41](/fr/voice/changelog/#0.0.41), elle est disponible dès aujourd'hui sur Mac et Linux.

Cela prolonge le fil que nous tirons sans cesse : [donner à chaque petite entreprise la voix d'une grande](/fr/blog/hello-world/). Une grande entreprise peut retrouver un appel et le transférer à un collègue, un client ou un fournisseur en quelques secondes. Désormais, vous le pouvez aussi — depuis la même application qui [enregistre et transcrit chaque appel](/fr/voice/) et [laisse votre assistant IA les passer](/fr/blog/place-calls-from-the-command-line/).

## Ce qu'il fait

Chaque appel dans WaveKat Voice est déjà enregistré et transcrit sur votre ordinateur. Le partage est la couche qui permet à *quelqu'un d'autre* d'en écouter un. Vous choisissez un enregistrement, vous choisissez un niveau d'accès, et WaveKat Voice vous donne un lien. La personne à qui vous l'envoyez ouvre une page web — aucune application à installer, rien à télécharger — et écoute.

Il existe trois niveaux d'accès, et **Privé est toujours l'option par défaut** :

| Niveau d'accès | Qui peut l'ouvrir | Connexion requise |
|---|---|---|
| **Privé** | Vous seul | — (c'est simplement votre propre vue) |
| **Personnes spécifiques** | Seules les personnes que vous invitez, par e-mail | Oui — elles se connectent pour confirmer leur identité |
| **Toute personne disposant du lien** | Quiconque possède le lien | Non |

« Personnes spécifiques » convient aux cas où l'enregistrement est sensible — l'appel d'un client, tout ce qui contient des informations personnelles — et où vous voulez le verrouiller pour des personnes nommées. « Toute personne disposant du lien » convient aux cas où vous voulez simplement qu'il soit ouvert : un témoignage, une démonstration, un appel que vous acceptez de rendre public. Repasser un enregistrement en Privé à tout moment annule chaque lien qui pointe vers lui.

![WaveKat Voice sur Mac — le panneau de partage sur un appel enregistré : les trois niveaux d'accès, un champ d'invitation et les contrôles de ce que les destinataires peuvent voir.](/screenshots/share-sheet/fr.webp)

## Vous décidez exactement ce qu'ils voient

Partager un enregistrement n'est pas tout ou rien. Avant d'envoyer le lien, vous choisissez ce qui figure sur la page que le destinataire ouvre :

- **Identité de l'interlocuteur** — affichez le numéro de l'autre partie, masquez-le, ou cachez-le entièrement.
- **Transcription** — incluez la transcription écrite ou laissez-la de côté.
- **Audio** — laissez-les le lire dans le navigateur (Lecture seule), ou le lire *et* le télécharger (Lecture et téléchargement), ou masquez l'audio et ne partagez que la transcription.
- **Lecture initiale** — commencez sur les deux côtés de l'appel, sur votre côté uniquement, ou sur celui de l'interlocuteur uniquement. (L'enregistrement lui-même ne change jamais — un auditeur peut toujours réactiver l'un ou l'autre côté.)

Ces contrôles existent parce qu'un enregistrement d'appel est dense en informations appartenant à d'autres personnes. L'idée est de partager la partie qui sert votre propos — une citation, un engagement, un seul côté d'une conversation — sans en livrer plus que vous ne le souhaitez.

## Passer au public est une décision délibérée

Rendre un enregistrement public est le seul chemin doté d'un garde-fou devant lui. Avant qu'un lien ne devienne ouvert à tous, WaveKat Voice s'arrête et dit, en termes clairs, ce que cela signifie :

> Toute personne disposant du lien pourra écouter cet appel et lire sa transcription, sans connexion. Les appels contiennent souvent des données personnelles comme des numéros de téléphone, des adresses ou des informations de paiement. Une fois qu'un lien est public, vous ne pouvez plus contrôler avec qui il est partagé. Vous pouvez le rendre privé à nouveau à tout moment.

Plusieurs choses rendent cela honnête plutôt qu'une simple case à cocher :

- **Privé est l'option par défaut persistante.** Le panneau de partage s'ouvre sur Privé à chaque fois. Public n'est jamais présélectionné et n'est jamais à un clic de moins que les choix plus sûrs.
- **Chaque lien est révocable.** Repassez un enregistrement en Privé et les liens en circulation cessent de fonctionner immédiatement.

## Ce que voit votre destinataire

Le lien ouvre une page construite autour de l'appel, pas autour de WaveKat. Un lecteur audio à deux pistes se trouve en haut — votre côté et celui de l'interlocuteur en formes d'onde distinctes — avec la transcription complète en dessous, étiquetée par interlocuteur (**Vous** et **Interlocuteur**) et consultable. Comme la transcription est juste là, la page fait aussi office d'alternative textuelle à l'audio, si bien qu'un destinataire qui ne peut pas écouter le son peut tout de même lire l'appel.

Si vous avez partagé avec « Personnes spécifiques », la page leur demande d'abord de se connecter et ne s'ouvre que pour les comptes que vous avez invités. Si vous l'avez rendu public, elle s'ouvre directement sur le lecteur.

![Un enregistrement WaveKat Voice partagé ouvert dans le navigateur — le lecteur audio et la transcription étiquetée par interlocuteur que voit un destinataire.](/screenshots/share-viewer/fr.webp)

**Voyez par vous-même :** [ouvrir un vrai enregistrement partagé →](https://platform.wavekat.com/voice/s/5EWJHKQ1zXamKB3ydxxPQA) — un appel partagé publiquement, en audio seul, exactement tel qu'un destinataire le voit.

## Le partage vit dans le cloud — à dessein

Un lien de partage est quelque chose qu'une autre personne ouvre, peut-être pendant que votre ordinateur portable est fermé. WaveKat Voice s'exécute sur votre propre machine et n'est pas joignable depuis Internet, donc un enregistrement partagé doit vivre quelque part où un destinataire peut réellement l'atteindre. Cela signifie que le partage requiert trois choses, et le panneau de partage vous indique laquelle manque :

1. Vous êtes **connecté** à votre compte WaveKat.
2. La **synchronisation cloud est activée**, donc l'enregistrement a été sauvegardé dans votre compte.
3. Cet enregistrement **a fini d'être envoyé**.

Tant que ces trois conditions ne sont pas réunies, le contrôle de partage explique exactement quoi faire au lieu de rester grisé. Si vous ne vous connectez jamais, rien ne quitte votre ordinateur — et rien n'est partageable, ce qui est la même règle énoncée de l'autre côté. Le partage est la seule fonctionnalité qui, par conception, ne peut pas être uniquement locale.

Vous pouvez lancer un partage depuis l'application de bureau ou depuis vos enregistrements sur le web — dans les deux cas, c'est le même enregistrement et le même lien.

## En ligne de commande aussi

Comme le reste de WaveKat Voice, le partage est scriptable. Une fois [l'automatisation activée](/fr/blog/place-calls-from-the-command-line/), l'outil en ligne de commande peut partager et arrêter de partager des enregistrements :

```bash
# Share a recording with specific people
wavekat-voice recording share <call-id> --visibility restricted --invite name@example.com

# Stop sharing — reverts the recording to Private
wavekat-voice recording unshare <call-id>
```

Rendre un enregistrement **public** depuis un script (ou un assistant IA) exige une confirmation explicite — `--yes` en ligne de commande, un indicateur `confirm_public` via les outils de l'assistant — pour que rien ne devienne public sur une instruction vague.

## Foire aux questions

### Comment partager un enregistrement d'appel depuis WaveKat Voice ?

Ouvrez l'appel dans WaveKat Voice, choisissez un niveau d'accès dans le panneau de partage — Privé, Personnes spécifiques, ou Toute personne disposant du lien — et copiez le lien. Le destinataire l'ouvre dans un navigateur pour écouter et lire la transcription ; aucune application à installer. Les enregistrements restent Privé jusqu'à ce que vous les partagiez.

### Puis-je contrôler ce que le destinataire peut écouter ou lire ?

Oui. Avant de partager, vous choisissez d'afficher, masquer ou cacher le numéro de l'interlocuteur, d'inclure ou non la transcription, de rendre l'audio en lecture seule ou aussi téléchargeable (ou entièrement masqué), et quel côté de l'appel est lu en premier. L'enregistrement lui-même n'est jamais modifié.

### Un enregistrement partagé est-il public pour tout Internet ?

Uniquement si vous choisissez « Toute personne disposant du lien », et WaveKat Voice vous avertit avant que cela n'arrive. Vous pouvez repasser un enregistrement en Privé à tout moment, ce qui désactive les liens existants. La valeur par défaut de chaque enregistrement est Privé.

### Ai-je besoin d'un compte pour partager des enregistrements ?

Oui. Le partage exige d'être connecté à votre compte WaveKat avec la synchronisation cloud activée, car le lien doit être joignable lorsque votre ordinateur est en veille. Si vous ne vous connectez pas, vos enregistrements restent entièrement sur votre ordinateur et ne sont pas partageables.

### Quelqu'un peut-il ouvrir un lien partagé sans se connecter ?

Cela dépend du niveau d'accès. « Toute personne disposant du lien » s'ouvre sans connexion. « Personnes spécifiques » exige que le destinataire se connecte avec l'un des comptes que vous avez invités. « Privé » signifie que vous seul pouvez l'ouvrir.

### Quelles plateformes prennent en charge le partage d'enregistrements ?

WaveKat Voice fonctionne aujourd'hui sur Mac et Linux, avec Windows à venir quand la demande sera là. Le partage fonctionne sur les deux plateformes prises en charge, et les destinataires ouvrent les liens partagés dans n'importe quel navigateur web.

## Essayez-le

[Téléchargez WaveKat Voice](/fr/voice/download/), connectez-vous et activez la synchronisation cloud, puis ouvrez n'importe quel appel enregistré et cliquez sur Partager. Commencez en Privé, partagez avec quelques personnes, et ne passez au public que lorsque vous le voulez vraiment.

Enregistrement, transcription, et maintenant partage — l'appel est l'unité de travail, et WaveKat Voice le rend aussi facile à faire circuler qu'un document.
