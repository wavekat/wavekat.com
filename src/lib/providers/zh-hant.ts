import type { Provider } from '../voice-providers';

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline: '在 Mac 或 Linux 上使用你的 2talk 號碼——無需訂閱，自動錄音並轉寫每一通通話。',
    seoTitle: '2talk 軟體電話（適用於 Mac 和 Linux）',
    seoDescription:
      '在 Mac 或 Linux 上用 WaveKat Voice 使用你的 2talk 號碼——一款無需訂閱的 SIP 軟體電話，自動錄音並轉寫每一通通話。2talk 上 Bria 的免費替代方案。',
    heading: '適用於 Mac 和 Linux 的 2talk 免訂閱軟體電話',
    intro:
      'WaveKat Voice 是一款桌面軟體電話，透過 SIP 連接到你的 2talk 帳戶，並自動錄音、轉寫每一通通話。它可在 Mac 和 Linux 上執行，公測期間免費，且無需按月訂閱——因此你無需為 Bria 付費，就能把 2talk 號碼放到電腦上使用。',
    setup: {
      heading: '如何設定 2talk 軟體電話',
      summary:
        '2talk 已內建於 WaveKat Voice 的精靈式電信業者清單中，因此你無需手動填寫 SIP 欄位——只需選擇 2talk，輸入號碼和密碼即可。',
      steps: [
        '在你的 Mac 或 Linux 電腦上下載並開啟 WaveKat Voice。',
        '新增一個帳戶，並從電信業者清單中選擇 2talk。',
        '輸入你的 2talk 電話號碼及其 SIP 密碼。',
        'WaveKat Voice 會向 2talk 註冊，你就可以撥打電話了——而且每一通通話都會自動錄音和轉寫。',
      ],
      note: '偏好手動填寫？對大多數紐西蘭帳戶而言，2talk 的網域、代理伺服器和外送代理伺服器都使用同一台 SIP 伺服器——sip.2talk.co.nz。（2talk 較新的 Lyra 平台則使用自己的設定。）在 WaveKat Voice 中選擇 2talk，它就會為你自動填好這些欄位。',
    },
    comparisonHeading: '2talk 軟體電話比較',
    columns: ['WaveKat Voice', 'Bria（透過 2talk）', 'MicroSIP'],
    comparison: [
      {
        label: '價格',
        cells: [
          '公測期間免費；之後轉為付費。',
          '透過 2talk 每月 NZ$5.95 + GST（截至 2026 年 7 月），最多 4 台裝置。',
          '免費且開源。',
        ],
      },
      {
        label: '支援平台',
        cells: ['Mac 和 Linux（有需求時支援 Windows）。', 'Windows、Mac、iOS 和 Android。', '僅 Windows。'],
      },
      {
        label: '每通電話錄音',
        cells: ['自動——每通電話在你掛斷的那一刻錄音。', '需逐通手動錄音；通話錄音屬於付費方案。', '需逐通手動錄音。'],
      },
      {
        label: '文字轉寫',
        cells: ['即時文字稿，與錄音一同儲存。', '不提供轉寫。', '不提供轉寫。'],
      },
      {
        label: '可搜尋的通話歷史',
        cells: ['通話、錄音和文字稿匯入同一份可搜尋的歷史記錄。', '通話記錄；訂閱後可保留錄音。', '僅通話記錄。'],
      },
      {
        label: '2talk 設定',
        cells: ['從清單中選擇 2talk；輸入號碼和密碼。', '從 2talk 購買時由其代為設定。', '自行填寫通用 SIP 欄位。'],
      },
      {
        label: '行動裝置與推送通知',
        cells: ['僅桌面端——無手機應用程式或行動推送。', '提供帶推送通知的 iOS 和 Android 應用程式。', '無行動應用程式（僅 Windows 桌面）。'],
      },
    ],
    whatItIs: {
      heading: '2talk 為通話提供了什麼',
      summary:
        '2talk 是一家紐西蘭 VoIP 電信業者，為你提供電話號碼和 SIP 憑證。在應用程式方面，它推薦自家的 2talk Connect 軟體電話，並以每月 NZ$5.95 + GST 轉售付費軟體電話 Bria——而由於你的帳戶是標準 SIP，任何 SIP 軟體電話也都能註冊使用。',
      strengths: [
        '一組帶本地支援和計費的紐西蘭電話號碼',
        'Bria 在一款付費應用程式中涵蓋 iPhone、Android、Mac 和 Windows',
        '透過 Bria 或 Acrobits Groundwire 提供可靠的行動推送通知',
        '可搭配任何 SIP 軟體電話，而不僅限於 2talk 推薦的應用程式',
      ],
    },
    chooseHeading: '哪一個更適合你',
    chooseWavekatLabel: '適合選擇 WaveKat Voice，如果',
    chooseWavekat: [
      '你使用 Mac 或 Linux 電腦，想要一款真正的 2talk 桌面軟體電話',
      '你希望每通 2talk 通話都自動錄音並寫成文字，無需手動開啟任何開關',
      '你不想為了用 2talk 號碼打電話而支付按月訂閱費',
      '你想要一份可搜尋的通話、錄音和文字稿歷史記錄',
    ],
    chooseOtherLabel: '適合選擇 Bria 或 MicroSIP，如果',
    chooseOther: [
      '你需要在 iPhone 或 Android 上使用 2talk 並取得可靠的推送通知——那就選 Bria 或 Groundwire',
      '你想要一款同時涵蓋行動端的應用程式，且不介意向 2talk 付費購買 Bria',
      '你使用 Windows，想要一款當下免費、輕量的用戶端——那就選 MicroSIP',
      '你想要一款由 2talk 官方支援並代為設定的應用程式',
    ],
    faqsHeading: '問與答',
    faqs: [
      {
        q: 'WaveKat Voice 能搭配 2talk 使用嗎？',
        a: '可以。WaveKat Voice 是一款 SIP 軟體電話，而 2talk 已內建於其精靈式電信業者清單，因此你只需選擇 2talk、輸入 2talk 號碼和 SIP 密碼，它就會註冊——無需手動設定 SIP。它可在 Mac 和 Linux 上執行，並且每通電話都會自動錄音和轉寫。',
      },
      {
        q: 'Mac 或 Linux 上最好的 2talk 軟體電話是哪一款？',
        a: '如果你想要一款無需訂閱、還能自動錄音和轉寫每一通通話的 2talk 桌面軟體電話，WaveKat Voice 正是為此打造，支援 Mac 和 Linux。2talk 自家的付費之選 Bria 涵蓋 Windows 和行動端；MicroSIP 免費但僅限 Windows。',
      },
      {
        q: '除了 Bria，還有免費的 2talk 軟體電話嗎？',
        a: '透過 2talk 購買的 Bria 每月費用為 NZ$5.95 + GST（截至 2026 年 7 月）。免費選項是 Windows 上的 MicroSIP，以及 Mac 和 Linux 上公測期間免費的 WaveKat Voice。兩者都透過 SIP 註冊你的 2talk 號碼。',
      },
      {
        q: '我能在 Mac 上使用我的 2talk 號碼嗎？',
        a: '可以。任何 SIP 軟體電話都能在 Mac 上註冊 2talk 號碼——包括 2talk 轉售的 Bria 應用程式以及 WaveKat Voice。WaveKat Voice 額外提供自動通話錄音和轉寫，並且在公測期間不收取月費。',
      },
      {
        q: 'WaveKat Voice 能處理我手機上的 2talk 推送通知嗎？',
        a: '不能——WaveKat Voice 是一款面向 Mac 和 Linux 的桌面應用程式，不在手機上執行，因此無法提供行動推送通知。若要在 iPhone 或 Android 上可靠地接聽 2talk 來電，請使用 Bria 或 Acrobits Groundwire。在桌面端，只要應用程式處於開啟狀態，WaveKat Voice 就會保持註冊並響鈴。',
      },
      {
        q: '要如何設定 2talk 軟體電話？',
        a: '在 WaveKat Voice 中新增一個帳戶，從電信業者清單中選擇 2talk，然後輸入你的 2talk 號碼和 SIP 密碼——SIP 設定會為你自動填好。對大多數紐西蘭帳戶而言，2talk 的網域、代理伺服器和外送代理伺服器都使用同一台 SIP 伺服器——sip.2talk.co.nz；2talk 較新的 Lyra 平台則使用自己的設定，因此若你的帳戶在 Lyra 上，請使用 2talk 提供給你的資料。',
      },
    ],
    whatWavekatDoesLabel: 'WaveKat Voice 能做什麼',
  },
];
