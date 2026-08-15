import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      '免費、開源的 SIP 用戶端。功能全面、跨平台——WaveKat Voice 以廣度換取專注：一款桌面辦公電話，自動錄音並寫下每一通通話。',
    seoTitle: 'Linphone 替代方案（Mac / Linux）',
    seoDescription:
      'WaveKat Voice 與 Linphone 在 Mac 和 Linux 上的比較：自動錄音並轉寫每一通通話的專注辦公電話。',
    heading: '適用於 Mac 和 Linux 的 Linphone 替代方案',
    intro:
      'Linphone 是一款功能全面、免費的 SIP 用戶端，幾乎能在所有平台上執行。如果你真正想要的是一款桌面辦公電話——自動錄音、寫下每一通通話，而且無需手動填寫 SIP 欄位就能完成設定——以下是兩者在 Mac 和 Linux 上的比較。',
    whatItIs: {
      summary:
        'Linphone 是來自 Belledonne Communications 的老牌開源 SIP 軟體電話。它可在 Mac、Windows、Linux、iOS 和 Android 上執行，涵蓋面很廣——語音和視訊通話、即時通訊以及端對端加密——而且免費。',
      strengths: [
        '免費且開源，無需帳號即可使用',
        '幾乎支援所有平台，包括行動裝置',
        '語音、視訊和聊天集於一個用戶端',
        '為技術型使用者提供端對端加密（ZRTP/SRTP）',
      ],
    },
    comparison: [
      {
        label: '每通電話錄音',
        wavekat: '自動——每通電話都會錄音，並在你掛斷的那一刻儲存。',
        them: '需要逐通手動錄音；預設不提供可瀏覽的儲存歷史。',
      },
      {
        label: '文字轉寫',
        wavekat: '通話旁邊有即時文字稿，並與錄音一同儲存。',
        them: '不提供轉寫。',
      },
      {
        label: '可搜尋的通話歷史',
        wavekat: '每通電話連同錄音和文字稿都匯入同一份歷史記錄。',
        them: '僅有通話記錄——不附帶錄音或文字稿。',
      },
      {
        label: '設定你的號碼',
        wavekat: '從清單中選擇你的電信業者，設定就為你填好了。',
        them: '通用的 SIP 欄位，需要你自己設定。',
      },
      {
        label: '你的資料存放在哪裡',
        wavekat: '預設存放在你的電腦上；可選擇登入以同步到網頁端。',
        them: '存放在你的裝置上——它是一個用戶端，不為你代管任何資料。',
      },
      {
        label: '支援平台',
        wavekat: 'Mac、Windows 和 Linux。',
        them: 'Mac、Windows、Linux、iOS、Android。',
      },
      {
        label: '視訊與聊天',
        wavekat: '專注於通話——不提供視訊或訊息。',
        them: '語音、視訊和即時通訊。',
      },
      {
        label: '價格',
        wavekat: '公測期間免費；之後轉為付費。',
        them: '免費且開源。',
      },
    ],
    chooseThem: [
      '你想要一個免費、開源、可查看原始碼的用戶端',
      '你需要在手機、平板和電腦上使用同一個應用程式',
      '你希望語音、視訊通話和聊天集中在一處',
      '你願意自己設定 SIP 設定',
    ],
    chooseWavekat: [
      '你希望每通電話都自動錄音並寫成文字，無需手動開啟任何開關',
      '你想要一份可搜尋的通話、錄音和文字稿歷史記錄',
      '比起填寫 SIP 欄位，你更願意從清單中選擇電信業者',
      '你想要一款專注的桌面辦公電話，而不是通用的 VoIP 工具箱',
    ],
    faqs: [
      {
        q: 'WaveKat Voice 能連接和 Linphone 一樣的 SIP 電信業者嗎？',
        a: '可以。兩者都是 SIP 軟體電話，因此任何能用於 Linphone 的電信業者都能用於 WaveKat Voice。差別在於設定：WaveKat Voice 會為 Twilio、Telnyx、2talk 等常見電信業者自動填好設定，其他業者也可以自己輸入詳細資訊。',
      },
      {
        q: 'Linphone 會像 WaveKat Voice 一樣錄音和轉寫通話嗎？',
        a: 'Linphone 可以在你手動開始時錄製單通電話，但它不會轉寫通話，也不會保留可瀏覽的錄音和文字稿歷史。WaveKat Voice 會自動錄製每一通電話，在旁邊產生即時文字稿，並將兩者無需任何設定地儲存到你的通話歷史中。',
      },
      {
        q: 'WaveKat Voice 像 Linphone 一樣開源嗎？',
        a: '不是——WaveKat Voice 是一款商業產品，在公測期間免費。它底層的若干元件在我們的 GitHub 上開源，但 Voice 應用程式本身並不開源。',
      },
    ],
  },
];
