import type { TermsDoc } from '../terms';

// Français (vouvoiement, comme le reste du site). Traduction de ./en.ts — même
// structure, mêmes ids de section, même ordre, pour que /fr/terms/#recording
// fonctionne et que les paires hreflang restent réciproques.
export const terms: TermsDoc = {
  seoTitle: "Conditions d'utilisation — WaveKat",
  seoDescription:
    "L'accord entre vous et WaveKat : à quoi sert WaveKat Voice, pourquoi il ne peut pas joindre les secours, et qui répond de l'enregistrement des appels.",
  h1: "Conditions d'utilisation",
  updatedPrefix: 'Dernière mise à jour le',
  lead: [
    "Ces conditions constituent l'accord entre vous et WaveKat. Elles couvrent l'application WaveKat Voice, votre compte WaveKat, l'outil en ligne de commande wk, ainsi que ce site et les outils qu'il propose. Utiliser l'un d'eux, c'est accepter ce qui suit.",
    "Cette page est écrite en langage clair par celles et ceux qui fabriquent WaveKat. Ce n'est pas un conseil juridique. Elle est publiée en neuf langues ; si une traduction diffère un jour de la version anglaise, c'est la version anglaise qui s'applique.",
  ],
  highlightsLabel: "Trois choses à savoir d'abord",
  highlights: [
    "**WaveKat Voice ne permet pas d'appeler les secours.** C'est un logiciel d'appel, pas une ligne téléphonique : un appel au 112, au 15, au 911 ou au numéro d'urgence local peut ne pas aboutir ou ne pas arriver au bon endroit. Gardez toujours un mobile ou une ligne fixe capable de le faire.",
    "**L'enregistrement relève de votre responsabilité, et il est activé par défaut.** Le droit d'enregistrer, et l'obligation de le dire d'abord, dépendent de l'endroit où vous et votre interlocuteur vous trouvez. Dans certains pays, se tromper relève du pénal.",
    "**C'est un logiciel en bêta, fait par une toute petite équipe.** Il est fourni tel quel, sans garantie, et il va changer. Gardez vos propres copies de tout ce que vous ne pouvez pas vous permettre de perdre.",
  ],
  onThisPage: 'Sur cette page',
  sections: [
    {
      id: 'acceptance',
      heading: 'Accepter ces conditions',
      body: [
        {
          kind: 'p',
          text: "Vous acceptez ces conditions dès la première de ces actions, selon celle qui vient en premier : installer ou utiliser WaveKat Voice, créer un compte WaveKat, ou utiliser une fonctionnalité Pro. L'application vous demande votre accord au premier lancement, et la page de connexion le dit au-dessus du bouton — mais utiliser WaveKat sans jamais avoir lu cette page ne vous place pas hors de l'accord.",
        },
        {
          kind: 'p',
          text: "Si vous acceptez au nom d'une entreprise, vous nous affirmez que vous avez le pouvoir de l'engager, et « vous » désigne alors cette entreprise dans la suite.",
        },
        {
          kind: 'p',
          text: "La [politique de confidentialité](/privacy/) ne fait pas partie de ce contrat — elle décrit ce que WaveKat collecte et ce qui reste sur votre propre ordinateur, et nous y sommes tenus que vous l'ayez lue ou non. Si cette page et celle-là semblent un jour se contredire au sujet de vos données, c'est la politique de confidentialité qui l'emporte.",
        },
      ],
    },
    {
      id: 'who',
      heading: 'Qui peut utiliser WaveKat',
      body: [
        {
          kind: 'p',
          text: "Vous devez avoir au moins 16 ans. WaveKat Voice est un outil professionnel et ne s'adresse pas aux enfants.",
        },
        {
          kind: 'p',
          text: "Vous devez aussi vous trouver là où nous avons le droit de le proposer. Si vous êtes dans un pays visé par des sanctions commerciales portant sur ce type de logiciel, ou si vous figurez sur une liste de sanctions, vous ne pouvez pas utiliser WaveKat.",
        },
      ],
    },
    {
      id: 'account',
      heading: 'Votre compte WaveKat',
      body: [
        {
          kind: 'p',
          text: "Vous n'avez pas besoin de compte pour utiliser WaveKat Voice. Sans compte, l'application est entièrement locale et tout ce qu'elle contient reste sur votre ordinateur.",
        },
        {
          kind: 'p',
          text: "Si vous en créez un, il est à vous et c'est à vous d'y veiller. Vous vous connectez avec GitHub, Google ou Apple, et pouvez ensuite ajouter un mot de passe au compte. Gardez celui que vous utilisez — ainsi que la double authentification qui le protège — en bon état, et écrivez-nous à [hello@wavekat.com](mailto:hello@wavekat.com) si vous pensez que quelqu'un d'autre y est entré. Ce qui est fait depuis votre compte est de votre ressort tant que vous ne nous avez pas prévenus.",
        },
        {
          kind: 'p',
          text: "Une personne, un compte. Ne partagez pas le vôtre avec vos collègues et n'utilisez pas celui de quelqu'un d'autre. Si votre équipe est à plusieurs, créez plusieurs comptes.",
        },
        {
          kind: 'p',
          text: "Un nouveau compte peut devoir être approuvé avant de pouvoir faire quoi que ce soit.",
        },
      ],
    },
    {
      id: 'plans',
      heading: 'Ce que ça coûte',
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice est gratuit à télécharger et gratuit à utiliser. Certaines fonctionnalités font partie de l'offre Pro ; là où c'est le cas, l'application le dit avant que vous y arriviez, et non après.",
        },
        {
          kind: 'p',
          text: "Pendant la phase d'accès anticipé, Pro ne coûte rien. Si vous en faites la demande sur le site, nous vous l'accordons pour une durée annoncée et sans frais, et nous ne commencerons pas à facturer une période déjà accordée. Il n'y a aujourd'hui aucun paiement nulle part dans WaveKat, donc rien ici ne peut vous prendre d'argent.",
        },
        {
          kind: 'p',
          text: "Quand Pro aura un prix, nous vous indiquerons le prix, la devise et la durée avant tout paiement, et nous mettrons cette page à jour. Rien ne vous sera facturé sans que vous l'ayez d'abord accepté. Là où le droit de la consommation de votre pays vous donne alors plus que ce que nous écrivons, c'est votre droit local qui l'emporte.",
        },
      ],
    },
    {
      id: 'licence',
      heading: "Votre licence d'utilisation de l'application",
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice vous est concédé sous licence, il ne vous est pas vendu. Vous pouvez l'installer et l'utiliser sur les ordinateurs que vous contrôlez, tant que cet accord dure, pour votre travail ou celui de votre entreprise.",
        },
        {
          kind: 'p',
          text: 'Ce que cette licence ne comprend pas :',
        },
        {
          kind: 'list',
          items: [
            "Vendre, louer, sous-licencier ou redistribuer l'application, ou l'intégrer à quelque chose que vous vendez.",
            "La démonter — décompiler, désassembler ou faire de l'ingénierie inverse — sauf dans la mesure où le droit de votre pays vous y autorise malgré ce qui est écrit ici.",
            "En retirer le nom ou les marques WaveKat, ou la faire passer pour votre propre produit.",
            "Contourner les vérifications qui séparent les fonctionnalités gratuites et Pro.",
          ],
        },
        {
          kind: 'p',
          text: "L'application, le site et tout ce qu'ils contiennent restent les nôtres. Les bibliothèques WaveKat open source sur lesquelles l'application est bâtie sont une autre affaire : elles sont publiées sur [GitHub](https://github.com/wavekat) sous leurs propres licences, et rien ici ne restreint ce que vous pouvez en faire.",
        },
        {
          kind: 'p',
          text: "L'exemplaire de WaveKat Voice que vous téléchargez chez nous vérifie les mises à jour et les installe lui-même, pour que les correctifs atteignent réellement les gens. Là où il est installé depuis une boutique, c'est la boutique qui s'en charge.",
        },
      ],
    },
    {
      id: 'stores',
      heading: "Si vous l'avez installé depuis une boutique",
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice est aussi disponible sur le Mac App Store, le Microsoft Store et le Snap Store. Si vous l'avez obtenu par l'un d'eux, les conditions propres à cette boutique s'appliquent au téléchargement et à toute mise à jour qu'elle livre, en plus de cet accord.",
        },
        {
          kind: 'p',
          text: "Cet accord est conclu entre vous et WaveKat, pas avec la boutique. Apple, Microsoft et Canonical n'ont pas fabriqué WaveKat Voice, ne vous doivent ni maintenance ni assistance à son sujet, et ne sont responsables ni de l'application, ni d'aucune réclamation la concernant, ni de ce qu'elle fait de vos données. Ils peuvent en revanche se prévaloir de cet accord et le faire valoir contre vous comme s'ils y étaient parties — les règles d'Apple nous obligent à le préciser.",
        },
      ],
    },
    {
      id: 'acceptable',
      heading: "Ce pour quoi vous ne pouvez pas utiliser WaveKat",
      body: [
        {
          kind: 'p',
          text: "En résumé : n'utilisez pas WaveKat pour faire à quelqu'un ce que vous ne voudriez pas qu'on vous fasse.",
        },
        {
          kind: 'list',
          items: [
            "**Appels non sollicités.** Pas de campagnes d'appels automatisées, pas de démarchage à froid, pas de messages enregistrés à des gens qui n'ont rien demandé, et rien qui contrevienne à une liste d'opposition au démarchage.",
            "**Vous faire passer pour un autre.** N'envoyez pas un numéro d'appelant qui n'est pas le vôtre et n'utilisez pas un parcours d'appel pour usurper l'identité d'une personne ou d'une entreprise.",
            "**Enregistrer des gens illégalement.** Voyez la section ci-dessous — c'est assez sérieux pour avoir la sienne.",
            "**Tout ce qui est illégal, ou vise à nuire à quelqu'un** — fraude, harcèlement, menaces, ou aider quelqu'un d'autre à le faire.",
            "**Casser le service exprès** — l'attaquer, en chercher les failles sans nous prévenir, ou l'automatiser d'une façon qui le dégrade pour les autres.",
            "**Revendre WaveKat comme votre propre service d'appels** sans accord écrit avec nous.",
          ],
        },
        {
          kind: 'p',
          text: "Si vous trouvez une faille de sécurité, dites-le-nous à [hello@wavekat.com](mailto:hello@wavekat.com) avant d'en parler à d'autres. Chercher de façon responsable ne vous vaudra aucune poursuite de notre part.",
        },
      ],
    },
    {
      id: 'phone',
      heading: "Votre service téléphonique, et les appels d'urgence",
      body: [
        {
          kind: 'p',
          text: "**On ne peut pas compter sur WaveKat Voice pour appeler les secours.** C'est un logiciel qui parle à une ligne téléphonique que vous avez déjà. Il ne sait pas où vous êtes, il ne peut pas indiquer à un opérateur d'urgence où envoyer de l'aide, et un appel peut ne pas aboutir du tout si votre connexion, votre ordinateur ou votre opérateur ont un mauvais jour. Gardez un mobile ou une ligne fixe qui atteint les secours, et assurez-vous que toute personne utilisant cet ordinateur le sache.",
        },
        {
          kind: 'p',
          text: "Le service téléphonique lui-même n'est pas le nôtre. Vous apportez votre propre fournisseur SIP, vous avez votre propre contrat avec lui, et c'est lui — pas nous — qui achemine vos appels, vous les facture et vous fournit vos numéros. Si les appels n'aboutissent pas, c'est en général par là qu'il faut commencer.",
        },
        {
          kind: 'p',
          text: "Un parcours d'appel répond à vos interlocuteurs en votre nom — un message d'accueil, un menu, une messagerie vocale, un transfert — tant que l'application tourne sur un ordinateur allumé. Ce qu'il leur dit, et ce qu'il fait de ce qu'ils laissent, est de votre responsabilité, comme si vous aviez décroché vous-même. Ce n'est pas un remplacement pour un téléphone auquel on répond.",
        },
        {
          kind: 'p',
          text: "Vous êtes responsable de ce que votre fournisseur vous facture, y compris les appels qu'un parcours d'appel décroche ou passe pendant que vous ne regardez pas.",
        },
      ],
    },
    {
      id: 'recording',
      heading: 'Enregistrer, transcrire et partager des appels',
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice enregistre les appels, et l'enregistrement est actif dès l'installation. La transcription en direct est désactivée tant que vous ne l'activez pas. Les deux se font sur votre propre ordinateur — aucun audio n'est envoyé nulle part pour être enregistré ou transcrit.",
        },
        {
          kind: 'p',
          text: "**Le droit de le faire dépend de la loi là où vous et votre interlocuteur vous trouvez, et il relève de votre responsabilité, pas de la nôtre.** À certains endroits, votre seul consentement suffit. À d'autres, tous les participants doivent être d'accord, et dans quelques pays s'y tromper relève du pénal et non du civil. L'application joue un bip d'avertissement au début d'un appel enregistré, par courtoisie ; un bip n'est pas un consentement.",
        },
        {
          kind: 'p',
          text: "En cas de doute : dites que vous enregistrez, ou désactivez l'enregistrement dans les Réglages. L'un et l'autre prennent un instant, et ni l'un ni l'autre ne se rattrape après coup.",
        },
        {
          kind: 'p',
          text: "Il en va de même pour ce que vous faites ensuite d'un enregistrement — le partager par lien, l'envoyer à un service que vous avez connecté, ou le conserver. Si un enregistrement contient les données personnelles de quelqu'un d'autre, c'est vous qui en répondez au regard du droit de la vie privée, et nous le traitons pour votre compte.",
        },
      ],
    },
    {
      id: 'content',
      heading: 'Vos appels restent les vôtres',
      body: [
        {
          kind: 'p',
          text: "Vos enregistrements, transcriptions, contacts, parcours d'appel et notes sont à vous. Nous n'en revendiquons pas la propriété, et nous ne nous en servons pas pour entraîner des modèles, sauf si vous avez explicitement choisi de nous y autoriser.",
        },
        {
          kind: 'p',
          text: "Si vous vous connectez et laissez la synchronisation dans le cloud activée — elle l'est par défaut dès que vous vous connectez —, vous nous autorisez à stocker et à déplacer ce contenu dans un seul but : faire fonctionner le service pour vous. Cela veut dire le synchroniser entre vos appareils, vous le montrer sur le site, et servir un enregistrement à quelqu'un à qui vous avez partagé un lien. Cette autorisation prend fin quand vous supprimez le contenu ou votre compte.",
        },
        {
          kind: 'p',
          text: "Les annonces vocales que vous créez avec le générateur de ce site sont à vous, pour votre propre système téléphonique. N'en utilisez pas une pour imiter la voix d'une personne réelle ou pour vous faire passer pour quelqu'un que vous n'êtes pas.",
        },
        {
          kind: 'p',
          text: "Nous pouvons retirer un contenu ou suspendre un compte si nous y sommes obligés — une injonction légale, ou un contenu qui enfreint la section ci-dessus. Nous vous le dirons le cas échéant, sauf si nous n'en avons pas le droit.",
        },
        {
          kind: 'p',
          text: "Si vous nous envoyez une suggestion ou un rapport de bug, nous pouvons nous en servir pour améliorer WaveKat sans rien vous devoir en retour.",
        },
      ],
    },
    {
      id: 'connected',
      heading: 'Les services que vous connectez',
      body: [
        {
          kind: 'p',
          text: "Vous pouvez connecter WaveKat à d'autres services — un CRM, un webhook à vous, un assistant IA sur votre ordinateur. Rien n'est connecté tant que vous ne le connectez pas.",
        },
        {
          kind: 'p',
          text: "Dès que c'est fait, ce que ce service fait de ce qu'il reçoit relève de votre accord avec lui, pas de celui-ci. Si une connexion envoie une transcription quelque part, cette transcription nous échappe, et déconnecter arrête le flux mais ne récupère pas ce qui est déjà parti.",
        },
      ],
    },
    {
      id: 'availability',
      heading: "Changements, et ce que nous ne promettons pas sur la disponibilité",
      body: [
        {
          kind: 'p',
          text: "WaveKat Voice est en bêta publique. Des fonctionnalités arrivent, changent de forme et disparaissent parfois. Nous faisons de notre mieux pour ne pas casser ce sur quoi vous comptez, et nous le disons sur la [page des nouveautés](/voice/changelog/) quand quelque chose de visible change.",
        },
        {
          kind: 'p',
          text: "La partie cloud de WaveKat n'offre aucune garantie de disponibilité. Pas d'engagement de niveau de service, pas de compensation, pas de promesse que la synchronisation soit joignable à un instant donné. L'application est conçue pour fonctionner sans nos serveurs, donc si la partie cloud tombe en panne, change, ou disparaît un jour, ce qui se trouve sur votre propre ordinateur y reste et continue de fonctionner.",
        },
      ],
    },
    {
      id: 'warranty',
      heading: 'Aucune garantie',
      body: [
        {
          kind: 'p',
          text: "WaveKat est fourni « en l'état » et « selon disponibilité ». Nous ne promettons ni un fonctionnement ininterrompu, ni l'absence d'erreurs, ni l'adéquation à un usage particulier, et nous ne promettons pas qu'un appel aboutira, qu'un enregistrement se fera ou qu'une transcription sera exacte.",
        },
        {
          kind: 'p',
          text: "La reconnaissance vocale se trompe, surtout avec les accents, les gens qui parlent en même temps et les lignes médiocres. Ne prenez pas une transcription pour un compte rendu de ce qui a été dit si quelque chose d'important en dépend.",
        },
        {
          kind: 'p',
          text: "Certains pays accordent aux consommateurs des garanties qu'on ne peut pas écarter — la Consumer Guarantees Act néo-zélandaise, les règles de consommation de l'UE et du Royaume-Uni, et leurs équivalents. Rien ici ne vous les retire. Là où vous en bénéficiez, elles s'ajoutent à cette section et l'emportent sur elle. Si vous utilisez WaveKat pour une entreprise, vous acceptez que ces garanties de consommation ne s'appliquent pas, dans la mesure où la loi vous permet d'en convenir ainsi.",
        },
      ],
    },
    {
      id: 'liability',
      heading: 'Limites de notre responsabilité',
      body: [
        {
          kind: 'p',
          text: "Dans la mesure où la loi le permet, WaveKat n'est pas responsable des dommages indirects ou consécutifs — perte d'activité, perte de bénéfices, perte de données, un appel qui n'a pas abouti, ou un enregistrement dont vous aviez besoin et que vous n'avez pas eu.",
        },
        {
          kind: 'p',
          text: "Si la loi nous rend malgré tout responsables envers vous, le maximum que vous pouvez récupérer auprès de nous pour tout ce qui découle de cet accord est ce que vous nous avez payé au cours des douze mois précédant l'événement — et si vous ne nous avez jamais rien payé, 100 dollars néo-zélandais.",
        },
        {
          kind: 'p',
          text: "Rien de tout cela ne limite ce que la loi ne nous permet pas de limiter — notre propre fraude, un dommage corporel causé par notre propre négligence, ou une garantie de consommation dont vous bénéficiez et qui ne peut être écartée.",
        },
        {
          kind: 'p',
          text: "Si votre usage de WaveKat en violation de ces conditions ou de la loi conduit un tiers à nous réclamer quelque chose — un appel que vous avez passé, une personne que vous avez enregistrée, un contenu que vous avez partagé —, vous en assumerez le coût pour nous, dans la mesure où le droit de votre pays vous permet d'en convenir ainsi. Nous vous informerons rapidement de la réclamation et ne la réglerons pas en votre nom sans vous consulter.",
        },
      ],
    },
    {
      id: 'ending',
      heading: "Mettre fin à l'accord",
      body: [
        {
          kind: 'p',
          text: "Vous pouvez arrêter quand vous voulez : désinstallez l'application, ou supprimez votre compte dans les Réglages, qui vous montrent ce qu'il contient avant de confirmer. Vous pouvez aussi nous écrire et nous le ferons pour vous.",
        },
        {
          kind: 'p',
          text: "Nous pouvons suspendre ou fermer un compte qui enfreint ces conditions, ou lorsque la loi nous y oblige. Sauf urgence ou injonction légale, nous vous dirons d'abord quel est le problème et vous laisserons l'occasion d'y remédier.",
        },
        {
          kind: 'p',
          text: "Quand l'accord prend fin, votre licence d'utilisation de l'application prend fin avec lui et nous supprimons ce qui était synchronisé avec votre compte. Tout ce qui se trouve sur votre propre ordinateur y reste jusqu'à ce que vous l'effaciez. Les sections sur la propriété de votre contenu, l'absence de garantie, notre responsabilité, et le droit applicable continuent de s'appliquer ensuite.",
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Modifications de ces conditions',
      body: [
        {
          kind: 'p',
          text: "Quand ces conditions changent, la date en haut change avec elles, et la nouvelle version s'applique à partir de ce moment-là. Si un changement affecte substantiellement vos droits, nous le dirons dans l'application ou sur cette page. Continuer à utiliser WaveKat après un changement vaut acceptation ; si vous n'acceptez pas, cessez d'utiliser WaveKat et supprimez votre compte.",
        },
      ],
    },
    {
      id: 'law',
      heading: 'Droit applicable et litiges',
      body: [
        {
          kind: 'p',
          text: "Cet accord est régi par le droit néo-zélandais, et les tribunaux néo-zélandais sont compétents pour tout litige le concernant. Si vous êtes consommateur ailleurs, cela ne vous prive ni de la protection du droit de votre pays, ni de votre droit d'agir là où vous vivez.",
        },
        {
          kind: 'p',
          text: "Si vous avez un litige avec nous, écrivez d'abord à [hello@wavekat.com](mailto:hello@wavekat.com) et laissez-nous une chance de le résoudre avant toute autre démarche.",
        },
        {
          kind: 'p',
          text: "Ces conditions forment l'intégralité de l'accord entre nous au sujet de WaveKat. Si un tribunal juge qu'une partie ne tient pas, le reste tient toujours. Ne pas faire appliquer quelque chose tout de suite n'est pas y renoncer. Vous ne pouvez pas céder cet accord à quelqu'un d'autre ; nous pouvons le céder à une entreprise qui reprendrait WaveKat, et nous vous le dirons si nous le faisons.",
        },
      ],
    },
  ],
  faqHeading: 'Questions et réponses',
  faqs: [
    {
      q: "Dois-je accepter quelque chose pour utiliser WaveKat Voice ?",
      a: "Oui. WaveKat Voice vous demande d'accepter ces conditions et de prendre connaissance de la politique de confidentialité au premier lancement, avant toute configuration. Un compte WaveKat n'est pas nécessaire — sans compte, l'application fonctionne entièrement sur votre ordinateur — mais accepter l'accord, si.",
    },
    {
      q: "WaveKat Voice peut-il appeler le 112, le 15 ou le 911 ?",
      a: "Non. Considérez qu'il ne peut pas joindre les secours. C'est un logiciel sur votre ordinateur, il ne connaît pas votre adresse, et un appel d'urgence peut échouer ou arriver au mauvais endroit. Gardez toujours un mobile ou une ligne fixe capable de le faire, et assurez-vous que les autres utilisateurs de l'ordinateur le savent.",
    },
    {
      q: "Ai-je le droit d'enregistrer mes appels avec WaveKat Voice ?",
      a: "Cela dépend de l'endroit où vous êtes et de celui où se trouve votre interlocuteur, et cela relève de votre responsabilité, pas de la nôtre. À certains endroits votre seul consentement suffit ; à d'autres tous les participants doivent être d'accord, et s'y tromper peut relever du pénal. En cas de doute, dites que vous enregistrez, ou désactivez l'enregistrement dans les Réglages.",
    },
    {
      q: "WaveKat possède-t-il mes enregistrements, ou s'en sert-il pour entraîner des modèles ?",
      a: "Non aux deux. Vos enregistrements, transcriptions, contacts et parcours d'appel sont à vous, et nous ne les utilisons pas pour entraîner des modèles sauf si vous avez explicitement choisi de nous y autoriser. Si vous vous connectez et laissez la synchronisation dans le cloud activée, vous nous autorisez à les stocker et à les déplacer pour que le service fonctionne pour vous, et cette autorisation prend fin quand vous supprimez le contenu ou votre compte.",
    },
    {
      q: "WaveKat Voice coûte-t-il quelque chose ?",
      a: "Pas aujourd'hui. L'application est gratuite, et Pro ne coûte rien pendant la phase d'accès anticipé — si vous en faites la demande sur le site, nous vous l'accordons pour une durée annoncée et sans frais, et nous ne commencerons pas à facturer une période déjà accordée. Il n'y a pas de paiement dans WaveKat. Quand Pro aura un prix, vous le verrez avant de payer quoi que ce soit, et cette page sera mise à jour pour le dire.",
    },
    {
      q: "Qu'advient-il de mes données si j'arrête d'utiliser WaveKat ?",
      a: "Supprimez votre compte dans les Réglages et nous supprimons ce qui y était synchronisé ; l'application vous montre ce que le compte contient avant que vous confirmiez. Ce qui est sur votre propre ordinateur y reste jusqu'à ce que vous l'effaciez, depuis le même écran.",
    },
  ],
  contactHeading: 'Nous contacter',
  contactIntro:
    "Si quelque chose sur cette page n'est pas clair, ou si une clause vous semble fausse, écrivez-nous.",
};
