import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'Le client SIP gratuit et open source. Performant et multiplateforme — WaveKat Voice troque l’étendue contre un téléphone professionnel de bureau ciblé, qui enregistre et retranscrit chaque appel.',
    seoTitle: 'WaveKat Voice — alternative à Linphone (Mac/Linux)',
    seoDescription:
      'Comment WaveKat Voice se compare à Linphone sur Mac et Linux : un téléphone pro qui enregistre et transcrit chaque appel, avec configuration guidée.',
    heading: 'Une alternative à Linphone pour Mac et Linux',
    intro:
      'Linphone est un client SIP gratuit et performant qui fonctionne presque partout. Si ce que vous voulez vraiment, c’est un téléphone professionnel de bureau qui enregistre et retranscrit chaque appel — et se configure sans remplir à la main des champs SIP —, voici comment les deux se comparent sur Mac et Linux.',
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
        label: 'Configurer votre numéro',
        wavekat: 'Choisissez votre opérateur dans une liste et les réglages sont remplis pour vous.',
        them: 'Des champs SIP génériques que vous configurez vous-même.',
      },
      {
        label: 'Où vivent vos données',
        wavekat: 'Sur votre ordinateur par défaut ; connexion optionnelle pour synchroniser sur le web.',
        them: 'Sur votre appareil — c’est un client ; rien n’est hébergé pour vous.',
      },
      {
        label: 'Plateformes',
        wavekat: 'Mac et Linux aujourd’hui (Windows lorsqu’il y aura la demande).',
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
      'Vous avez besoin de la même application sur Mac, Windows, Linux et mobile',
      'Vous voulez les appels vidéo et le chat au même endroit que la voix',
      'Vous êtes à l’aise pour configurer vous-même les réglages SIP',
    ],
    chooseWavekat: [
      'Vous voulez que chaque appel soit enregistré et retranscrit automatiquement, sans rien activer',
      'Vous voulez un historique unique et consultable des appels, enregistrements et transcriptions',
      'Vous préférez choisir votre opérateur dans une liste plutôt que remplir des champs SIP',
      'Vous voulez un téléphone professionnel de bureau ciblé, pas une boîte à outils VoIP polyvalente',
    ],
    faqs: [
      {
        q: 'WaveKat Voice peut-il se connecter au même opérateur SIP que Linphone ?',
        a: 'Oui. Les deux sont des softphones SIP, donc tout opérateur qui fonctionne avec Linphone fonctionne avec WaveKat Voice. La différence tient à la configuration : WaveKat Voice remplit les réglages pour les opérateurs courants comme Twilio, Telnyx et 2talk, et vous laisse saisir les détails vous-même pour tout le reste.',
      },
      {
        q: 'Linphone enregistre-t-il et transcrit-il les appels comme WaveKat Voice ?',
        a: 'Linphone peut enregistrer un appel individuel lorsque vous le lancez manuellement, mais il ne transcrit pas les appels et ne conserve pas d’historique consultable d’enregistrements et de transcriptions. WaveKat Voice enregistre chaque appel automatiquement, en rédige une transcription en direct à côté, et sauvegarde les deux dans votre historique d’appels sans aucune configuration.',
      },
      {
        q: 'WaveKat Voice est-il open source comme Linphone ?',
        a: 'Non — WaveKat Voice est un produit commercial, gratuit pendant la bêta publique. Plusieurs des briques sous-jacentes sont open source sur notre GitHub, mais l’application Voice elle-même ne l’est pas.',
      },
    ],
  },
];
