import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Mac や Linux で 2talk の番号を使えます——サブスク不要で、すべての通話を自動で録音・文字起こしするソフトフォン。',
    seoTitle: '2talk ソフトフォン（Mac・Linux 対応）',
    seoDescription:
      'Mac や Linux で 2talk の番号を WaveKat Voice で利用。通話を自動で録音・文字起こしする、サブスク不要の SIP ソフトフォンです。',
    heading: 'Mac と Linux 向けの、サブスク不要な 2talk ソフトフォン',
    intro:
      'WaveKat Voice は、SIP であなたの 2talk アカウントに接続し、すべての通話を自動で録音・文字起こしするデスクトップ用ソフトフォンです。Mac と Linux で動作し、パブリックベータ期間中は無料で、月額のサブスクリプションもありません——だから Bria の料金を払わなくても、2talk の番号をお使いのコンピューターで使えます。',
    setup: {
      heading: '2talk ソフトフォンの設定方法',
      summary:
        '2talk は WaveKat Voice のガイド付きプロバイダー一覧に含まれているので、SIP の項目を手で入力する必要はありません——2talk を選んで、番号とパスワードを入力するだけです。',
      steps: [
        'お使いの Mac または Linux コンピューターで WaveKat Voice をダウンロードして開きます。',
        'アカウントを追加し、プロバイダー一覧から 2talk を選びます。',
        'あなたの 2talk 電話番号とその SIP パスワードを入力します。',
        'WaveKat Voice が 2talk に登録され、すぐに発信できます——そしてすべての通話が自動で録音・文字起こしされます。',
      ],
      note: '手動で入力したいですか？ほとんどのニュージーランドのアカウントでは、2talk はドメイン・プロキシ・送信プロキシのすべてに単一の SIP サーバー——sip.2talk.co.nz——を使用します。（2talk の新しい Lyra プラットフォームは独自の設定を使います。）WaveKat Voice で 2talk を選べば、これらを自動で入力してくれます。',
    },
    comparisonHeading: '2talk ソフトフォンの比較',
    columns: ['WaveKat Voice', 'Bria（2talk 経由）', 'MicroSIP'],
    comparison: [
      {
        label: '価格',
        cells: [
          'パブリックベータ期間中は無料。その後は有料。',
          '2talk 経由で月額 NZ$5.95 + GST（2026年7月時点）、最大 4 台まで。',
          '無料かつオープンソース。',
        ],
      },
      {
        label: '対応プラットフォーム',
        cells: [
          '現在は Mac と Linux（需要があれば Windows にも対応）。',
          'Windows、Mac、iOS、Android。',
          'Windows のみ。',
        ],
      },
      {
        label: 'すべての通話を録音',
        cells: [
          '自動——電話を切った瞬間にすべての通話を録音。',
          '通話ごとに手動。通話録音は有料プラン。',
          '通話ごとに手動で録音。',
        ],
      },
      {
        label: '文字稿',
        cells: ['リアルタイムの文字稿を録音と一緒に保存。', '文字起こしなし。', '文字起こしなし。'],
      },
      {
        label: '検索できる通話履歴',
        cells: [
          '通話・録音・文字稿を 1 つの検索できる履歴にまとめて保存。',
          '通話ログ。録音はサブスク契約時のみ。',
          '通話ログのみ。',
        ],
      },
      {
        label: '2talk の設定',
        cells: [
          '一覧から 2talk を選び、番号とパスワードを入力。',
          '2talk から購入すると、2talk が設定してくれます。',
          '汎用の SIP 項目を自分で入力。',
        ],
      },
      {
        label: 'モバイルとプッシュ通知',
        cells: [
          'デスクトップのみ——スマホアプリやモバイルプッシュはありません。',
          'プッシュ通知付きの iOS・Android アプリ。',
          'モバイルアプリなし（Windows デスクトップのみ）。',
        ],
      },
    ],
    whatItIs: {
      heading: '2talk が通話のために提供するもの',
      summary:
        '2talk は、電話番号と SIP 認証情報を提供するニュージーランドの VoIP プロバイダーです。アプリについては、自社の 2talk Connect ソフトフォンを案内し、有料ソフトフォンの Bria を月額 NZ$5.95 + GST で再販しています——そしてあなたのアカウントは標準的な SIP なので、どの SIP ソフトフォンでも登録して使えます。',
      strengths: [
        '現地サポートと請求のあるニュージーランドの電話番号',
        'Bria は 1 つの有料アプリで iPhone、Android、Mac、Windows をカバー',
        'Bria や Acrobits Groundwire による信頼性の高いモバイルプッシュ通知',
        '2talk が推奨するアプリに限らず、どの SIP ソフトフォンでも使える',
      ],
    },
    chooseHeading: 'あなたに合うのはどちら',
    chooseWavekatLabel: 'WaveKat Voice が向いているのは',
    chooseWavekat: [
      'Mac や Linux のコンピューターで、2talk 向けの本格的なデスクトップソフトフォンが欲しい方',
      'すべての 2talk 通話を、何も切り替えることなく自動で録音・記録したい方',
      '2talk の番号から発信するために月額サブスクを払いたくない方',
      '通話・録音・文字稿を 1 つの検索できる履歴にまとめたい方',
    ],
    chooseOtherLabel: 'Bria や MicroSIP が向いているのは',
    chooseOther: [
      'iPhone や Android で 2talk を、信頼性の高いプッシュ通知とともに使いたい方——それなら Bria か Groundwire',
      'モバイルもカバーする 1 つのアプリが欲しく、Bria の料金を 2talk に払っても構わない方',
      'Windows を使っていて、今すぐ無料で軽量なクライアントが欲しい方——それなら MicroSIP',
      '2talk が公式にサポートし、設定まで行ってくれるアプリが欲しい方',
    ],
    faqsHeading: '質問と回答',
    faqs: [
      {
        q: 'WaveKat Voice は 2talk で使えますか？',
        a: 'はい。WaveKat Voice は SIP ソフトフォンで、2talk はそのガイド付きプロバイダー一覧に含まれています。だから 2talk を選び、2talk の番号と SIP パスワードを入力すれば登録されます——手動の SIP 設定は不要です。Mac と Linux で動作し、すべての通話が自動で録音・文字起こしされます。',
      },
      {
        q: 'Mac や Linux で最良の 2talk ソフトフォンは何ですか？',
        a: 'すべての通話を録音・文字起こしもする、サブスク不要のデスクトップ用 2talk ソフトフォンが欲しいなら、WaveKat Voice はまさにそのために Mac と Linux 向けに作られています。2talk 自身の有料の推奨アプリである Bria は Windows とモバイルをカバーし、MicroSIP は無料ですが Windows 専用です。',
      },
      {
        q: 'Bria の代わりに無料の 2talk ソフトフォンはありますか？',
        a: '2talk 経由で購入する Bria は月額 NZ$5.95 + GST です（2026年7月時点）。無料の選択肢は、Windows の MicroSIP と、Mac・Linux で使えてパブリックベータ期間中は無料の WaveKat Voice です。どちらも SIP であなたの 2talk の番号を登録します。',
      },
      {
        q: 'Mac で自分の 2talk の番号を使えますか？',
        a: 'はい。どの SIP ソフトフォンでも Mac で 2talk の番号を登録できます——2talk が再販する Bria アプリや WaveKat Voice も含みます。WaveKat Voice はさらに自動の通話録音と文字起こしを備え、ベータ期間中は月額料金がかかりません。',
      },
      {
        q: 'WaveKat Voice はスマホでの 2talk のプッシュ通知に対応しますか？',
        a: 'いいえ——WaveKat Voice は Mac と Linux 向けのデスクトップアプリで、スマホでは動作しないため、モバイルプッシュ通知を届けられません。iPhone や Android で 2talk の着信を確実に受けるには、Bria か Acrobits Groundwire を使ってください。デスクトップでは、アプリを開いている間 WaveKat Voice は登録を維持して着信を鳴らします。',
      },
      {
        q: '2talk 向けのソフトフォンはどう設定しますか？',
        a: 'WaveKat Voice でアカウントを追加し、プロバイダー一覧から 2talk を選んで、2talk の番号と SIP パスワードを入力します——SIP の設定は自動で入力されます。ほとんどのニュージーランドのアカウントでは、2talk はドメイン・プロキシ・送信プロキシのすべてに単一の SIP サーバー sip.2talk.co.nz を使用します。2talk の新しい Lyra プラットフォームは独自の設定を使うため、アカウントが Lyra 上にある場合は 2talk から提供された情報を使用してください。',
      },
    ],
    whatWavekatDoesLabel: 'WaveKat Voice にできること',
  },
];
