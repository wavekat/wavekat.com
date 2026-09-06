import type { Alternative } from '../voice-alternatives';

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      '免費、開源的 SIP 用戶端。功能全面、跨平台——WaveKat Voice 以廣度換取專注：一款桌面辦公電話，自動錄下每一通通話，替你接起接不了的電話，並把通話記進你的 CRM。',
    seoTitle: 'Linphone 替代方案：Mac/Win/Linux',
    seoDescription:
      'WaveKat Voice 對比 Linphone：Mac、Windows、Linux 桌面 SIP 軟體電話，自動錄音轉寫，替你接聽留言，記進 HubSpot。',
    heading: '適用於 Mac、Windows 和 Linux 的 Linphone 替代方案',
    intro:
      'WaveKat Voice 是一款適用於 Mac、Windows 和 Linux 的桌面辦公電話，可以用來取代 Linphone：同樣透過 SIP 連接你自己的號碼，但它會自動錄下每一通通話、即時寫成文字，並全部收進一份可搜尋的歷史記錄；接不了的電話可以由通話流程代為接聽，含問候語與語音留言；每通電話還能自動記進你的 HubSpot CRM。Linphone 則是一款免費、開源、幾乎能在所有平台執行的通用 SIP 用戶端。如果你要的是一部開箱即用、無需手動填寫 SIP 欄位的辦公電話，以下是兩者的逐項對比。',
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
        label: '接聽來電與語音留言',
        wavekat:
          '通話流程替你接聽——問候語、營業時間、電話選單、留言或轉接——你還可以在對方留言途中接手這通電話。',
        them: '本身沒有自動接聽；語音留言取決於你電信業者的信箱，Linphone 可以撥打它。',
      },
      {
        label: '把通話記進 CRM',
        wavekat:
          '連接一次 HubSpot，之後每通電話都會自動歸檔到對應聯絡人名下，附上文字稿和可直接播放的錄音。屬於 Pro 方案，早期存取期間免費。',
        them: '沒有 CRM 整合；通話只留在應用程式自己的記錄裡。',
      },
      {
        label: '設定你的號碼',
        wavekat: '從清單中選擇你的電信業者（如 Twilio、Telnyx、2talk），設定就為你填好了。',
        them: '通用的 SIP 欄位，需要你自己設定。',
      },
      {
        label: '你的資料存放在哪裡',
        wavekat: '預設存放在你的電腦上；可選擇登入以同步到網頁端。',
        them: '存放在你的裝置上——它是一個用戶端，不為你代管任何資料。',
      },
      {
        label: '支援平台',
        wavekat: 'Mac、Windows 和 Linux（Windows 版在 Microsoft Store 上架）。',
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
      '你希望接不了的電話也有人接——問候語、營業時間，以及會寫成文字的語音留言',
      '你希望每通電話都自動記進 HubSpot CRM，不必有人事後補登',
      '你想要一款專注的桌面辦公電話，而不是通用的 VoIP 工具箱',
    ],
    faqs: [
      {
        q: 'WaveKat Voice 能連接和 Linphone 一樣的 SIP 電信業者嗎？',
        a: '可以。兩者都是 SIP 軟體電話，因此任何能用於 Linphone 的電信業者都能用於 WaveKat Voice。差別在於設定：WaveKat Voice 會為 Twilio、Telnyx、2talk 等常見電信業者自動填好設定，其他業者也可以自己輸入詳細資訊。',
      },
      {
        q: 'WaveKat Voice 能在 Windows 上執行嗎？',
        a: '可以。WaveKat Voice 已在 Microsoft Store 上架，支援 Windows 10 和 11——同一個商店頁面同時包含 Intel/AMD（x64）與 ARM64 兩個安裝套件，Mac 和 Linux 版同步發布。也有直接下載的 .exe 安裝程式，但它們尚未進行程式碼簽章，首次啟動時 Windows 會提示「未知發行者」；商店版本由 Microsoft 簽章。Linphone 同樣提供 Windows 版本。',
      },
      {
        q: 'Linphone 會像 WaveKat Voice 一樣錄音和轉寫通話嗎？',
        a: 'Linphone 可以在你手動開始時錄製單通電話，但它不會轉寫通話，也不會保留可瀏覽的錄音和文字稿歷史。WaveKat Voice 會自動錄製每一通電話，在旁邊產生即時文字稿，並將兩者無需任何設定地儲存到你的通話歷史中。',
      },
      {
        q: 'WaveKat Voice 有語音留言嗎？接不了電話時它能替我接聽嗎？',
        a: '可以，這就是通話流程的作用。把一個流程指向你的某條線路，WaveKat Voice 就會用問候語接聽、判斷營業時間、播放電話選單、錄下留言或轉接來電；留言和一般通話一樣會錄音並轉寫成文字，你也可以在對方留言途中接手這通電話。問候語、錄留言和呼叫你本人是免費的；電話選單、營業時間和轉接屬於 Pro 方案（早期存取期間免費贈送一年）。流程執行在你自己的電腦上，因此應用程式需要保持執行才能接聽。Linphone 本身沒有自動接聽功能——那裡的語音留言取決於你電信業者的信箱。',
      },
      {
        q: 'WaveKat Voice 能把通話記進 HubSpot 嗎？',
        a: '可以。連接一次 HubSpot 帳戶，之後你接聽或撥出的每通電話都會自動歸檔到號碼相符的聯絡人名下，帶上時間、來電去電、結果、時長、文字稿，以及可以直接在 HubSpot 裡播放的錄音。這是 Pro 功能，早期存取期間免費；其他 CRM 可以用 webhook 對接。Linphone 沒有 CRM 整合。',
      },
      {
        q: 'WaveKat Voice 有繁體中文介面嗎？',
        a: '有。WaveKat Voice 提供九種介面語言，其中包含繁體中文和簡體中文，安裝後可在設定裡切換。',
      },
      {
        q: 'WaveKat Voice 像 Linphone 一樣開源嗎？',
        a: '不是——WaveKat Voice 是一款商業產品，在公測期間免費。它底層的若干元件在我們的 GitHub 上開源，但 Voice 應用程式本身並不開源。',
      },
    ],
  },
];
