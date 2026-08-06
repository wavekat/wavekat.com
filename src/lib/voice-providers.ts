// Data for the /voice/providers/<slug>/ pages.
//
// A "provider" page is the SIP-provider counterpart to the /voice/alternatives/
// pages: instead of "WaveKat Voice vs <softphone>", it answers "how do I use my
// <provider> number on my computer" and ranks for the "<provider> softphone"
// search intent. Each entry becomes its own page (/voice/providers/<slug>/) and
// is data-driven so the localized routes reuse the same templates.
//
// Keep the framing honest and verifiable. The comparison names what the
// provider's own recommended apps are genuinely good at (mobile + push, official
// support) before saying where WaveKat Voice is different (subscription-free,
// Mac & Linux, records and transcribes every call). Pricing carries an "as of"
// date because it drifts — re-check before quoting it again.

export interface ProviderCompareRow {
  /** What this row compares — in phone-user language. */
  label: string;
  /** One cell per column, aligned to `columns` (first is WaveKat Voice). */
  cells: string[];
}

export interface ProviderFaq {
  q: string;
  a: string;
}

export interface Provider {
  /** URL slug — /voice/providers/<slug>/. */
  slug: string;
  /** Provider name, as people search for it (e.g. "2talk"). Never translated. */
  name: string;
  /** One-line summary, e.g. for a future hub card. */
  tagline: string;
  /** <title> / meta description. */
  seoTitle: string;
  seoDescription: string;
  /** Hero copy. `intro` must be self-contained (GEO: quotable out of context). */
  heading: string;
  intro: string;
  /** How to connect the provider in WaveKat Voice — the "<provider> setup" intent. */
  setup: { heading: string; summary: string; steps: string[]; note: string };
  /** Column headers for the comparison matrix. First column is WaveKat Voice. */
  columns: string[];
  /** Heading above the comparison matrix. */
  comparisonHeading: string;
  /** Matrix rows; each row's `cells` align to `columns`. */
  comparison: ProviderCompareRow[];
  /** Honest "what the provider gives you for calling" — its own apps' strengths. */
  whatItIs: { heading: string; summary: string; strengths: string[] };
  /** Heading for the "which one fits you" block. */
  chooseHeading: string;
  chooseWavekatLabel: string;
  chooseWavekat: string[];
  chooseOtherLabel: string;
  chooseOther: string[];
  /** Q&A for the on-page FAQ + FAQPage structured data. */
  faqsHeading: string;
  faqs: ProviderFaq[];
  /** Localized "← all providers" / back-link is not shown (no hub yet); the
   *  "what WaveKat Voice does" link label lives here so pages stay translatable. */
  whatWavekatDoesLabel: string;
}

export const providers: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline:
      'Use your 2talk number on Mac or Linux with a subscription-free softphone that records and transcribes every call.',
    seoTitle: '2talk softphone for Mac & Linux',
    seoDescription:
      'Use your 2talk number on Mac or Linux with WaveKat Voice — a subscription-free SIP softphone that records and transcribes every call. A free Bria alternative.',
    heading: 'The subscription-free softphone for 2talk on Mac & Linux',
    intro:
      'WaveKat Voice is a desktop softphone that connects to your 2talk account over SIP and records and transcribes every call automatically. It runs on Mac and Linux, it is free during the public beta, and there is no monthly subscription — so it is a way to put your 2talk number on your computer without paying for Bria.',
    setup: {
      heading: 'How to set up a 2talk softphone',
      summary:
        '2talk is in WaveKat Voice’s guided provider list, so you don’t hand-edit SIP fields — you pick 2talk and enter your number and password.',
      steps: [
        'Download and open WaveKat Voice on your Mac or Linux computer.',
        'Add an account and choose 2talk from the provider list.',
        'Enter your 2talk phone number and its SIP password.',
        'WaveKat Voice registers with 2talk and you’re ready to call — and every call is recorded and transcribed automatically.',
      ],
      note: 'Prefer to enter it by hand? For most New Zealand accounts, 2talk uses a single SIP server — sip.2talk.co.nz — for the domain, proxy, and outbound proxy. (2talk’s newer Lyra platform uses its own settings.) Pick 2talk in WaveKat Voice and it fills these in for you.',
    },
    comparisonHeading: '2talk softphones compared',
    columns: ['WaveKat Voice', 'Bria (via 2talk)', 'MicroSIP'],
    comparison: [
      {
        label: 'Price',
        cells: [
          'Free during the public beta; paid later.',
          'NZ$5.95 + GST / month via 2talk (as of July 2026), up to 4 devices.',
          'Free and open source.',
        ],
      },
      {
        label: 'Platforms',
        cells: [
          'Mac and Linux today (Windows when there is demand).',
          'Windows, Mac, iOS, and Android.',
          'Windows only.',
        ],
      },
      {
        label: 'Records every call',
        cells: [
          'Automatic — every call recorded the moment you hang up.',
          'Manual per call; call recording is a paid tier.',
          'Manual recording per call.',
        ],
      },
      {
        label: 'Written transcript',
        cells: ['Live transcript, kept with the recording.', 'No transcription.', 'No transcription.'],
      },
      {
        label: 'Searchable call history',
        cells: [
          'Calls, recordings, and transcripts in one searchable history.',
          'Call log; recordings if you subscribe.',
          'Call log only.',
        ],
      },
      {
        label: '2talk setup',
        cells: [
          'Pick 2talk from a list; enter your number and password.',
          'Provisioned by 2talk when you buy it from them.',
          'Enter the generic SIP fields yourself.',
        ],
      },
      {
        label: 'Mobile & push notifications',
        cells: [
          'Desktop only — no phone app or mobile push.',
          'iOS and Android apps with push notifications.',
          'No mobile app (Windows desktop only).',
        ],
      },
    ],
    whatItIs: {
      heading: 'What 2talk gives you for calling',
      summary:
        '2talk is a New Zealand VoIP provider that gives you a phone number and SIP credentials. For apps, it points you at its own 2talk Connect softphone and resells Bria, a paid softphone, at NZ$5.95 + GST per month — and because your account is standard SIP, any SIP softphone can register with it too.',
      strengths: [
        'A New Zealand phone number with local support and billing',
        'Bria covers iPhone, Android, Mac, and Windows in one paid app',
        'Reliable mobile push notifications through Bria or Acrobits Groundwire',
        'Works with any SIP softphone, not just the apps 2talk recommends',
      ],
    },
    chooseHeading: 'Which one fits you',
    chooseWavekatLabel: 'Choose WaveKat Voice if',
    chooseWavekat: [
      'You’re on a Mac or Linux computer and want a proper desktop softphone for 2talk',
      'You want every 2talk call recorded and written down automatically, with nothing to switch on',
      'You’d rather not pay a monthly subscription to make calls from your 2talk number',
      'You want one searchable history of calls, recordings, and transcripts',
    ],
    chooseOtherLabel: 'Choose Bria or MicroSIP if',
    chooseOther: [
      'You need 2talk on your iPhone or Android with reliable push notifications — that’s Bria or Groundwire',
      'You want a single app that also covers mobile, and don’t mind paying 2talk for Bria',
      'You’re on Windows and want a free, lightweight client today — that’s MicroSIP',
      'You want an app 2talk officially supports and provisions for you',
    ],
    faqsHeading: 'Questions & answers',
    faqs: [
      {
        q: 'Does WaveKat Voice work with 2talk?',
        a: 'Yes. WaveKat Voice is a SIP softphone and 2talk is in its guided provider list, so you pick 2talk, enter your 2talk number and SIP password, and it registers — no manual SIP configuration. It works on Mac and Linux, and every call is recorded and transcribed automatically.',
      },
      {
        q: 'What is the best softphone for 2talk on Mac or Linux?',
        a: 'If you want a subscription-free desktop softphone for 2talk that also records and transcribes every call, WaveKat Voice is built for that on Mac and Linux. 2talk’s own paid pick, Bria, covers Windows and mobile; MicroSIP is free but Windows-only.',
      },
      {
        q: 'Is there a free 2talk softphone instead of Bria?',
        a: 'Bria bought through 2talk costs NZ$5.95 + GST per month (as of July 2026). The free options are MicroSIP on Windows and WaveKat Voice on Mac and Linux, which is free during its public beta. Both register with your 2talk number over SIP.',
      },
      {
        q: 'Can I use my 2talk number on a Mac?',
        a: 'Yes. Any SIP softphone can register a 2talk number on a Mac — including 2talk’s resold Bria app and WaveKat Voice. WaveKat Voice adds automatic call recording and transcription and doesn’t charge a monthly fee during the beta.',
      },
      {
        q: 'Does WaveKat Voice handle 2talk push notifications on my phone?',
        a: 'No — WaveKat Voice is a desktop app for Mac and Linux and doesn’t run on phones, so it can’t deliver mobile push notifications. For reliable incoming calls on an iPhone or Android with 2talk, use Bria or Acrobits Groundwire. On the desktop, WaveKat Voice stays registered and rings while the app is open.',
      },
      {
        q: 'How do I set up a softphone for 2talk?',
        a: 'In WaveKat Voice, add an account, pick 2talk from the provider list, and enter your 2talk number and SIP password — the SIP settings are filled in for you. For most New Zealand accounts, 2talk uses one SIP server, sip.2talk.co.nz, for the domain, proxy, and outbound proxy; 2talk’s newer Lyra platform uses its own settings, so use the details 2talk gives you if your account is on Lyra.',
      },
    ],
    whatWavekatDoesLabel: 'What WaveKat Voice does',
  },
];

// Simplified-Chinese copy for the same providers. Slugs are shared with the
// English set so the /zh/voice/providers/<slug>/ routes line up 1:1 and the
// hreflang pairs are reciprocal. Product names (WaveKat Voice, 2talk, Bria,
// MicroSIP) are never translated. Keep this structurally in sync with the array
// above when adding a provider.
export const providersZhHans: Provider[] = [
  {
    slug: '2talk',
    name: '2talk',
    tagline: '在 Mac 或 Linux 上使用你的 2talk 号码——无需订阅，自动录音并转写每一通通话。',
    seoTitle: '2talk 软电话（适用于 Mac 和 Linux）',
    seoDescription:
      '在 Mac 或 Linux 上用 WaveKat Voice 使用 2talk 号码——无需订阅的 SIP 软电话，自动录音并转写每一通通话。',
    heading: '适用于 Mac 和 Linux 的 2talk 免订阅软电话',
    intro:
      'WaveKat Voice 是一款桌面软电话，通过 SIP 连接到你的 2talk 账户，并自动录音、转写每一通通话。它运行在 Mac 和 Linux 上，公测期间免费，且无需按月订阅——因此你无需为 Bria 付费，就能把 2talk 号码放到电脑上使用。',
    setup: {
      heading: '如何设置 2talk 软电话',
      summary:
        '2talk 已内置于 WaveKat Voice 的向导式运营商列表中，因此你无需手动填写 SIP 字段——只需选择 2talk，输入号码和密码即可。',
      steps: [
        '在你的 Mac 或 Linux 电脑上下载并打开 WaveKat Voice。',
        '添加一个账户，并从运营商列表中选择 2talk。',
        '输入你的 2talk 电话号码及其 SIP 密码。',
        'WaveKat Voice 会向 2talk 注册，你就可以拨打电话了——而且每一通通话都会自动录音和转写。',
      ],
      note: '更喜欢手动填写？对于大多数新西兰账户，2talk 的域名、代理和出站代理都使用同一个 SIP 服务器——sip.2talk.co.nz。（2talk 更新的 Lyra 平台使用各自的设置。）在 WaveKat Voice 中选择 2talk，它就会为你自动填好这些。',
    },
    comparisonHeading: '2talk 软电话对比',
    columns: ['WaveKat Voice', 'Bria（通过 2talk）', 'MicroSIP'],
    comparison: [
      {
        label: '价格',
        cells: [
          '公测期间免费；之后转为付费。',
          '通过 2talk 每月 NZ$5.95 + GST（截至 2026 年 7 月），最多 4 台设备。',
          '免费且开源。',
        ],
      },
      {
        label: '支持平台',
        cells: ['Mac 和 Linux（有需求时支持 Windows）。', 'Windows、Mac、iOS 和 Android。', '仅 Windows。'],
      },
      {
        label: '每通电话录音',
        cells: ['自动——每通电话在你挂断的那一刻录音。', '需逐通手动录音；通话录音属于付费档位。', '需逐通手动录音。'],
      },
      {
        label: '文字转写',
        cells: ['实时文字稿，与录音一同保存。', '不提供转写。', '不提供转写。'],
      },
      {
        label: '可搜索的通话历史',
        cells: ['通话、录音和文字稿汇入同一份可搜索的历史记录。', '通话记录；订阅后可保留录音。', '仅通话记录。'],
      },
      {
        label: '2talk 设置',
        cells: ['从列表中选择 2talk；输入号码和密码。', '从 2talk 购买时由其代为配置。', '自行填写通用 SIP 字段。'],
      },
      {
        label: '移动端与推送通知',
        cells: ['仅桌面端——无手机应用或移动推送。', '提供带推送通知的 iOS 和 Android 应用。', '无移动端应用（仅 Windows 桌面）。'],
      },
    ],
    whatItIs: {
      heading: '2talk 为通话提供了什么',
      summary:
        '2talk 是一家新西兰 VoIP 运营商，为你提供电话号码和 SIP 凭据。在应用方面，它推荐自家的 2talk Connect 软电话，并以每月 NZ$5.95 + GST 转售付费软电话 Bria——而由于你的账户是标准 SIP，任何 SIP 软电话也都能注册使用。',
      strengths: [
        '一个带本地支持和计费的新西兰电话号码',
        'Bria 在一款付费应用中覆盖 iPhone、Android、Mac 和 Windows',
        '通过 Bria 或 Acrobits Groundwire 提供可靠的移动推送通知',
        '可搭配任何 SIP 软电话，而不仅限于 2talk 推荐的应用',
      ],
    },
    chooseHeading: '哪一个更适合你',
    chooseWavekatLabel: '适合选择 WaveKat Voice，如果',
    chooseWavekat: [
      '你使用 Mac 或 Linux 电脑，想要一款真正的 2talk 桌面软电话',
      '你希望每通 2talk 通话都自动录音并写成文字，无需手动开启任何开关',
      '你不想为了用 2talk 号码打电话而支付按月订阅费',
      '你想要一份可搜索的通话、录音和文字稿历史记录',
    ],
    chooseOtherLabel: '适合选择 Bria 或 MicroSIP，如果',
    chooseOther: [
      '你需要在 iPhone 或 Android 上使用 2talk 并获得可靠的推送通知——那就选 Bria 或 Groundwire',
      '你想要一款同时覆盖移动端的应用，且不介意向 2talk 付费购买 Bria',
      '你使用 Windows，想要一款当下免费、轻量的客户端——那就选 MicroSIP',
      '你想要一款由 2talk 官方支持并代为配置的应用',
    ],
    faqsHeading: '问答',
    faqs: [
      {
        q: 'WaveKat Voice 能配合 2talk 使用吗？',
        a: '可以。WaveKat Voice 是一款 SIP 软电话，而 2talk 已内置于其向导式运营商列表，因此你只需选择 2talk、输入 2talk 号码和 SIP 密码，它就会注册——无需手动配置 SIP。它可在 Mac 和 Linux 上运行，并且每通电话都会自动录音和转写。',
      },
      {
        q: 'Mac 或 Linux 上最好的 2talk 软电话是哪款？',
        a: '如果你想要一款无需订阅、还能自动录音和转写每一通通话的 2talk 桌面软电话，WaveKat Voice 正是为此打造，支持 Mac 和 Linux。2talk 自家的付费之选 Bria 覆盖 Windows 和移动端；MicroSIP 免费但仅限 Windows。',
      },
      {
        q: '除了 Bria，还有免费的 2talk 软电话吗？',
        a: '通过 2talk 购买的 Bria 每月费用为 NZ$5.95 + GST（截至 2026 年 7 月）。免费选项是 Windows 上的 MicroSIP，以及 Mac 和 Linux 上公测期间免费的 WaveKat Voice。两者都通过 SIP 注册你的 2talk 号码。',
      },
      {
        q: '我能在 Mac 上使用我的 2talk 号码吗？',
        a: '可以。任何 SIP 软电话都能在 Mac 上注册 2talk 号码——包括 2talk 转售的 Bria 应用以及 WaveKat Voice。WaveKat Voice 额外提供自动通话录音和转写，并且在公测期间不收取月费。',
      },
      {
        q: 'WaveKat Voice 能处理我手机上的 2talk 推送通知吗？',
        a: '不能——WaveKat Voice 是一款面向 Mac 和 Linux 的桌面应用，不在手机上运行，因此无法提供移动推送通知。若要在 iPhone 或 Android 上可靠地接听 2talk 来电，请使用 Bria 或 Acrobits Groundwire。在桌面端，只要应用处于打开状态，WaveKat Voice 就会保持注册并响铃。',
      },
      {
        q: '如何设置 2talk 软电话？',
        a: '在 WaveKat Voice 中添加一个账户，从运营商列表中选择 2talk，然后输入你的 2talk 号码和 SIP 密码——SIP 设置会为你自动填好。对于大多数新西兰账户，2talk 的域名、代理和出站代理都使用同一个 SIP 服务器 sip.2talk.co.nz；2talk 更新的 Lyra 平台使用各自的设置，若你的账户在 Lyra 上，请使用 2talk 提供给你的详情。',
      },
    ],
    whatWavekatDoesLabel: 'WaveKat Voice 能做什么',
  },
];

// The other fully-translated locales keep their provider copy in their own files
// (src/lib/providers/<slug>.ts) so each can be authored independently.
import { providers as provZhHant } from './providers/zh-hant';
import { providers as provJa } from './providers/ja';
import { providers as provKo } from './providers/ko';
import { providers as provDe } from './providers/de';
import { providers as provEs } from './providers/es';
import { providers as provFr } from './providers/fr';
import { providers as provIt } from './providers/it';

const provByLocale: Record<string, Provider[]> = {
  en: providers,
  'zh-Hans': providersZhHans,
  'zh-Hant': provZhHant,
  ja: provJa,
  ko: provKo,
  de: provDe,
  es: provEs,
  fr: provFr,
  it: provIt,
};

export function getProviders(locale: string): Provider[] {
  return provByLocale[locale] ?? providers;
}

export function getProvider(slug: string, locale = 'en'): Provider | undefined {
  return getProviders(locale).find((p) => p.slug === slug);
}
