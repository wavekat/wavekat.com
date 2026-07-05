import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Utilisez votre numéro 2talk sur Mac ou Linux avec un softphone sans abonnement qui enregistre et retranscrit chaque appel.',
    seoTitle: 'Softphone 2talk pour Mac et Linux',
    seoDescription:
      'Utilisez votre numéro 2talk sur Mac ou Linux avec WaveKat Voice — un softphone SIP sans abonnement qui enregistre et transcrit chaque appel. Une alternative gratuite à Bria pour 2talk.',
    heading: 'Le softphone sans abonnement pour 2talk sur Mac et Linux',
    intro:
      'WaveKat Voice est un softphone de bureau qui se connecte à votre compte 2talk via SIP et enregistre et retranscrit automatiquement chaque appel. Il fonctionne sous Mac et Linux, il est gratuit pendant la bêta publique, et sans abonnement mensuel — c’est donc un moyen de mettre votre numéro 2talk sur votre ordinateur sans payer pour Bria.',
    setup: {
      heading: 'Comment configurer un softphone 2talk',
      summary:
        '2talk figure dans la liste guidée des opérateurs de WaveKat Voice, vous ne remplissez donc pas les champs SIP à la main — vous choisissez 2talk et saisissez votre numéro et votre mot de passe.',
      steps: [
        'Téléchargez et ouvrez WaveKat Voice sur votre ordinateur Mac ou Linux.',
        'Ajoutez un compte et choisissez 2talk dans la liste des opérateurs.',
        'Saisissez votre numéro de téléphone 2talk et son mot de passe SIP.',
        'WaveKat Voice s’enregistre auprès de 2talk et vous êtes prêt à appeler — et chaque appel est enregistré et retranscrit automatiquement.',
      ],
      note: 'Vous préférez saisir les réglages à la main ? Pour la plupart des comptes néo-zélandais, 2talk utilise un seul serveur SIP — sip.2talk.co.nz — pour le domaine, le proxy et le proxy sortant. (La nouvelle plateforme Lyra de 2talk utilise ses propres réglages.) Choisissez 2talk dans WaveKat Voice et il les remplit pour vous.',
    },
    comparisonHeading: 'Les softphones pour 2talk comparés',
    columns: ['WaveKat Voice', 'Bria (via 2talk)', 'MicroSIP'],
    comparison: [
      {
        label: 'Prix',
        cells: [
          'Gratuit pendant la bêta publique ; payant ensuite.',
          'NZ$5.95 + GST / mois via 2talk (en juillet 2026), jusqu’à 4 appareils.',
          'Gratuit et open source.',
        ],
      },
      {
        label: 'Plateformes',
        cells: [
          'Mac et Linux aujourd’hui (Windows lorsqu’il y aura la demande).',
          'Windows, Mac, iOS et Android.',
          'Windows uniquement.',
        ],
      },
      {
        label: 'Enregistre chaque appel',
        cells: [
          'Automatique — chaque appel est enregistré dès que vous raccrochez.',
          'Manuel appel par appel ; l’enregistrement des appels est une offre payante.',
          'Enregistrement manuel appel par appel.',
        ],
      },
      {
        label: 'Transcription écrite',
        cells: ['Transcription en direct, conservée avec l’enregistrement.', 'Pas de transcription.', 'Pas de transcription.'],
      },
      {
        label: 'Historique d’appels consultable',
        cells: [
          'Appels, enregistrements et transcriptions dans un historique unique et consultable.',
          'Journal d’appels ; enregistrements si vous vous abonnez.',
          'Journal d’appels uniquement.',
        ],
      },
      {
        label: 'Configuration 2talk',
        cells: [
          'Choisissez 2talk dans une liste ; saisissez votre numéro et votre mot de passe.',
          'Provisionné par 2talk lorsque vous l’achetez auprès d’eux.',
          'Vous saisissez vous-même les champs SIP génériques.',
        ],
      },
      {
        label: 'Mobile et notifications push',
        cells: [
          'Bureau uniquement — pas d’application mobile ni de push mobile.',
          'Applications iOS et Android avec notifications push.',
          'Pas d’application mobile (bureau Windows uniquement).',
        ],
      },
    ],
    whatItIs: {
      heading: 'Ce que 2talk vous offre pour appeler',
      summary:
        '2talk est un opérateur VoIP néo-zélandais qui vous fournit un numéro de téléphone et des identifiants SIP. Côté applications, il vous oriente vers son propre softphone 2talk Connect et revend Bria, un softphone payant, à NZ$5.95 + GST par mois — et comme votre compte est du SIP standard, n’importe quel softphone SIP peut également s’y enregistrer.',
      strengths: [
        'Un numéro de téléphone néo-zélandais avec support et facturation locaux',
        'Bria couvre iPhone, Android, Mac et Windows dans une seule application payante',
        'Des notifications push mobiles fiables via Bria ou Acrobits Groundwire',
        'Fonctionne avec n’importe quel softphone SIP, pas seulement les applications recommandées par 2talk',
      ],
    },
    chooseHeading: 'Lequel vous convient',
    chooseWavekatLabel: 'Choisissez WaveKat Voice si',
    chooseWavekat: [
      'Vous êtes sur un ordinateur Mac ou Linux et voulez un vrai softphone de bureau pour 2talk',
      'Vous voulez que chaque appel 2talk soit enregistré et retranscrit automatiquement, sans rien activer',
      'Vous préférez ne pas payer d’abonnement mensuel pour appeler depuis votre numéro 2talk',
      'Vous voulez un historique unique et consultable des appels, enregistrements et transcriptions',
    ],
    chooseOtherLabel: 'Choisissez Bria ou MicroSIP si',
    chooseOther: [
      'Vous avez besoin de 2talk sur votre iPhone ou Android avec des notifications push fiables — c’est Bria ou Groundwire',
      'Vous voulez une seule application qui couvre aussi le mobile, et payer 2talk pour Bria ne vous dérange pas',
      'Vous êtes sous Windows et voulez un client gratuit et léger dès aujourd’hui — c’est MicroSIP',
      'Vous voulez une application que 2talk prend en charge et provisionne officiellement pour vous',
    ],
    faqsHeading: 'Questions et réponses',
    faqs: [
      {
        q: 'WaveKat Voice fonctionne-t-il avec 2talk ?',
        a: 'Oui. WaveKat Voice est un softphone SIP et 2talk figure dans sa liste guidée des opérateurs : vous choisissez 2talk, saisissez votre numéro 2talk et votre mot de passe SIP, et il s’enregistre — sans configuration SIP manuelle. Il fonctionne sous Mac et Linux, et chaque appel est enregistré et retranscrit automatiquement.',
      },
      {
        q: 'Quel est le meilleur softphone pour 2talk sur Mac ou Linux ?',
        a: 'Si vous voulez un softphone de bureau sans abonnement pour 2talk qui enregistre et retranscrit aussi chaque appel, WaveKat Voice est conçu pour cela sous Mac et Linux. Bria, le choix payant de 2talk, couvre Windows et le mobile ; MicroSIP est gratuit mais réservé à Windows.',
      },
      {
        q: 'Existe-t-il un softphone 2talk gratuit à la place de Bria ?',
        a: 'Bria acheté via 2talk coûte NZ$5.95 + GST par mois (en juillet 2026). Les options gratuites sont MicroSIP sous Windows et WaveKat Voice sous Mac et Linux, gratuit pendant sa bêta publique. Les deux s’enregistrent avec votre numéro 2talk via SIP.',
      },
      {
        q: 'Puis-je utiliser mon numéro 2talk sur un Mac ?',
        a: 'Oui. N’importe quel softphone SIP peut enregistrer un numéro 2talk sur un Mac — y compris l’application Bria revendue par 2talk et WaveKat Voice. WaveKat Voice ajoute l’enregistrement et la transcription automatiques des appels, et ne facture pas de frais mensuels pendant la bêta.',
      },
      {
        q: 'WaveKat Voice gère-t-il les notifications push 2talk sur mon téléphone ?',
        a: 'Non — WaveKat Voice est une application de bureau pour Mac et Linux qui ne fonctionne pas sur les téléphones, elle ne peut donc pas délivrer de notifications push mobiles. Pour des appels entrants fiables sur un iPhone ou un Android avec 2talk, utilisez Bria ou Acrobits Groundwire. Sur le bureau, WaveKat Voice reste enregistré et sonne tant que l’application est ouverte.',
      },
      {
        q: 'Comment configurer un softphone pour 2talk ?',
        a: 'Dans WaveKat Voice, ajoutez un compte, choisissez 2talk dans la liste des opérateurs et saisissez votre numéro 2talk et votre mot de passe SIP — les réglages SIP sont remplis pour vous. Pour la plupart des comptes néo-zélandais, 2talk utilise un seul serveur SIP, sip.2talk.co.nz, pour le domaine, le proxy et le proxy sortant ; la nouvelle plateforme Lyra de 2talk utilise ses propres réglages, alors utilisez les informations que 2talk vous fournit si votre compte est sur Lyra.',
      },
    ],
    whatWavekatDoesLabel: 'Ce que fait WaveKat Voice',
  },
];
