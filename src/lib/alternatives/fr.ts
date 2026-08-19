import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'Le client SIP gratuit et open source. Performant et multiplateforme — WaveKat Voice troque l’étendue contre un téléphone professionnel de bureau ciblé, qui enregistre chaque appel, répond à ceux que vous manquez et les consigne dans votre CRM.',
    seoTitle: 'Alternative à Linphone pour Mac, Windows, Linux',
    seoDescription:
      'WaveKat Voice vs Linphone sur Mac, Windows et Linux : un softphone SIP qui enregistre et transcrit chaque appel, prend les messages et les envoie dans HubSpot.',
    heading: 'Une alternative à Linphone pour Mac, Windows et Linux',
    intro:
      'WaveKat Voice est un téléphone professionnel de bureau pour Mac, Windows et Linux qui peut remplacer Linphone : il se connecte à votre propre numéro en SIP de la même façon, mais il enregistre chaque appel automatiquement, le retranscrit en direct et rassemble le tout dans un historique unique et consultable. Les appels que vous ne pouvez pas prendre sont décrochés par un flux d’appel, avec message d’accueil et messagerie vocale, et chaque appel peut être consigné dans votre CRM HubSpot. Linphone, de son côté, est un client SIP gratuit, open source et polyvalent qui fonctionne presque partout. Si ce que vous voulez, c’est un téléphone professionnel prêt à l’emploi plutôt qu’une boîte à outils VoIP, voici comment les deux se comparent.',
    whatItIs: {
      summary:
        'Linphone est un softphone SIP open source de longue date, signé Belledonne Communications. Il fonctionne sous Mac, Windows, Linux, iOS et Android, et couvre un large périmètre — appels voix et vidéo, messagerie instantanée et chiffrement de bout en bout — gratuitement.',
      strengths: [
        'Gratuit et open source, utilisable sans compte',
        'Fonctionne sur pratiquement toutes les plateformes, mobile compris',
        'Voix, vidéo et chat dans un seul client',
        'Chiffrement de bout en bout (ZRTP/SRTP) pour les profils techniques',
      ],
    },
    comparison: [
      {
        label: 'Enregistrer chaque appel',
        wavekat: 'Automatique — chaque appel est enregistré et sauvegardé dès que vous raccrochez.',
        them: 'Enregistrement manuel appel par appel ; pas d’historique sauvegardé et consultable par défaut.',
      },
      {
        label: 'Transcription écrite',
        wavekat: 'Transcription en direct à côté de l’appel, conservée avec l’enregistrement.',
        them: 'Pas de transcription.',
      },
      {
        label: 'Historique d’appels consultable',
        wavekat: 'Chaque appel arrive dans un historique unique, avec son enregistrement et sa transcription.',
        them: 'Simple journal d’appels — sans enregistrements ni transcriptions associés.',
      },
      {
        label: 'Décrocher les appels et messagerie vocale',
        wavekat:
          'Un flux d’appel décroche pour vous — accueil, horaires, menu téléphonique, messagerie vocale ou transfert — et vous pouvez reprendre l’appel pendant le message.',
        them: 'Pas de répondeur propre ; la messagerie vocale est celle de votre opérateur, que Linphone peut appeler.',
      },
      {
        label: 'Consigner les appels dans votre CRM',
        wavekat:
          'Connectez HubSpot une fois et chaque appel se classe seul sur le contact correspondant, avec transcription et enregistrement écoutable. Inclus dans Pro, gratuit en accès anticipé.',
        them: 'Aucune intégration CRM ; les appels restent dans le journal de l’application.',
      },
      {
        label: 'Configurer votre numéro',
        wavekat: 'Choisissez votre opérateur dans une liste (Twilio, Telnyx, 2talk et d’autres) et les réglages sont remplis pour vous.',
        them: 'Des champs SIP génériques que vous configurez vous-même.',
      },
      {
        label: 'Où vivent vos données',
        wavekat: 'Sur votre ordinateur par défaut ; connexion optionnelle pour synchroniser sur le web.',
        them: 'Sur votre appareil — c’est un client ; rien n’est hébergé pour vous.',
      },
      {
        label: 'Plateformes',
        wavekat: 'Mac, Windows et Linux (la version Windows est plus récente et pas encore signée).',
        them: 'Mac, Windows, Linux, iOS, Android.',
      },
      {
        label: 'Vidéo et chat',
        wavekat: 'Centré sur les appels — pas de vidéo ni de messagerie.',
        them: 'Voix, vidéo et messagerie instantanée.',
      },
      {
        label: 'Prix',
        wavekat: 'Gratuit pendant la bêta publique ; payant ensuite.',
        them: 'Gratuit et open source.',
      },
    ],
    chooseThem: [
      'Vous voulez un client gratuit et open source dont le code source est disponible',
      'Vous avez besoin de la même application sur mobile ou tablette que sur ordinateur',
      'Vous voulez les appels vidéo et le chat au même endroit que la voix',
      'Vous êtes à l’aise pour configurer vous-même les réglages SIP',
    ],
    chooseWavekat: [
      'Vous voulez que chaque appel soit enregistré et retranscrit automatiquement, sans rien activer',
      'Vous voulez un historique unique et consultable des appels, enregistrements et transcriptions',
      'Vous préférez choisir votre opérateur dans une liste plutôt que remplir des champs SIP',
      'Vous voulez que les appels que vous ne pouvez pas prendre soient décrochés — accueil, horaires et messagerie vocale qui retranscrit le message',
      'Vous voulez que chaque appel arrive dans votre CRM HubSpot sans que personne ait à y penser',
      'Vous voulez un téléphone professionnel de bureau ciblé, pas une boîte à outils VoIP polyvalente',
    ],
    faqs: [
      {
        q: 'WaveKat Voice peut-il se connecter au même opérateur SIP que Linphone ?',
        a: 'Oui. Les deux sont des softphones SIP, donc tout opérateur qui fonctionne avec Linphone fonctionne avec WaveKat Voice. La différence tient à la configuration : WaveKat Voice remplit les réglages pour les opérateurs courants comme Twilio, Telnyx et 2talk, et vous laisse saisir les détails vous-même pour tout le reste.',
      },
      {
        q: 'WaveKat Voice fonctionne-t-il sous Windows ?',
        a: 'Oui. WaveKat Voice prend en charge Windows 10 et 11, avec des programmes d’installation distincts pour Intel/AMD (x64) et ARM64, aux côtés des versions Mac et Linux. La version Windows est plus récente que les deux autres et n’est pas encore signée : Windows signale donc un éditeur inconnu au premier lancement. Linphone propose également une version Windows.',
      },
      {
        q: 'Linphone enregistre-t-il et transcrit-il les appels comme WaveKat Voice ?',
        a: 'Linphone peut enregistrer un appel individuel lorsque vous le lancez manuellement, mais il ne transcrit pas les appels et ne conserve pas d’historique consultable d’enregistrements et de transcriptions. WaveKat Voice enregistre chaque appel automatiquement, en rédige une transcription en direct à côté, et sauvegarde les deux dans votre historique d’appels sans aucune configuration.',
      },
      {
        q: 'WaveKat Voice a-t-il une messagerie vocale, ou décroche-t-il quand je ne peux pas ?',
        a: 'Oui — c’est le rôle d’un flux d’appel. Pointez un flux vers l’une de vos lignes et WaveKat Voice décroche avec un message d’accueil, vérifie vos horaires, propose un menu téléphonique, enregistre un message ou transfère l’appel. Les messages sont enregistrés et retranscrits comme n’importe quel appel, et vous pouvez reprendre l’appel pendant que quelqu’un en laisse un. L’accueil, la prise de message et la sonnerie chez vous sont gratuits ; les menus téléphoniques, les horaires et les transferts font partie de Pro — gratuit un an en accès anticipé. Le flux s’exécute sur votre ordinateur, l’application doit donc être lancée pour décrocher. Linphone n’a pas de répondeur propre : la messagerie vocale y dépend de votre opérateur.',
      },
      {
        q: 'WaveKat Voice peut-il consigner les appels dans HubSpot ?',
        a: 'Oui. Connectez votre compte HubSpot une fois et chaque appel que vous recevez ou passez se classe seul sur le contact dont le numéro correspond, avec l’heure, le sens, le résultat, la durée, la transcription et un enregistrement que vous écoutez dans HubSpot. C’est une fonction Pro, gratuite en accès anticipé, et les webhooks couvrent tout autre CRM. Linphone n’a aucune intégration CRM.',
      },
      {
        q: 'WaveKat Voice existe-t-il en français ?',
        a: 'Oui. L’application est proposée en neuf langues — français, anglais, chinois simplifié et traditionnel, japonais, coréen, allemand, espagnol et italien — et vous changez de langue dans les réglages.',
      },
      {
        q: 'WaveKat Voice est-il open source comme Linphone ?',
        a: 'Non — WaveKat Voice est un produit commercial, gratuit pendant la bêta publique. Plusieurs des briques sous-jacentes sont open source sur notre GitHub, mais l’application Voice elle-même ne l’est pas.',
      },
    ],
  },
];
