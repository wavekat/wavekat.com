// Data for the /voice/alternatives/ comparison pages.
//
// Each entry becomes its own page (/voice/alternatives/<slug>/) targeting the
// "<name> alternative for Mac" search intent, plus a card on the hub. Adding a
// competitor is just appending an entry here — the hub and the [slug] route
// pick it up automatically. Keep the framing honest: name what the competitor
// is genuinely good at, then say plainly where WaveKat Voice is different. A
// comparison page that reads as a fair guide ranks and converts better than one
// that reads as a takedown.

export interface ComparisonRow {
  /** What capability this row is about — kept in phone-user language. */
  label: string;
  /** How WaveKat Voice handles it. */
  wavekat: string;
  /** How the competitor handles it — fair, not disparaging. */
  them: string;
}

export interface AltFaq {
  q: string;
  a: string;
}

export interface Alternative {
  /** URL slug — /voice/alternatives/<slug>/. */
  slug: string;
  /** Competitor's product name, as people search for it. */
  name: string;
  /** One-line card summary on the hub. */
  tagline: string;
  /** <title> / meta description for the page. */
  seoTitle: string;
  seoDescription: string;
  /** Hero copy. */
  heading: string;
  intro: string;
  /** Honest "what it is" — what the competitor is genuinely good at. */
  whatItIs: { summary: string; strengths: string[] };
  /** Side-by-side capability table. */
  comparison: ComparisonRow[];
  /** "Choose <them> if…" — kept fair so the page reads as a guide. */
  chooseThem: string[];
  /** "Choose WaveKat Voice if…" */
  chooseWavekat: string[];
  /** 2–3 Q&A for the on-page FAQ + FAQPage structured data. */
  faqs: AltFaq[];
}

export const alternatives: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      'The free, open-source SIP client. Capable and cross-platform — WaveKat Voice trades breadth for a focused desktop business phone that records every call, answers the ones you miss, and logs them in your CRM.',
    seoTitle: 'Linphone alternative for Mac, Windows & Linux',
    seoDescription:
      'WaveKat Voice vs Linphone on Mac, Windows and Linux: a SIP softphone that records and transcribes every call, answers the ones you miss, logs them in HubSpot.',
    heading: 'A Linphone alternative for Mac, Windows & Linux',
    intro:
      'WaveKat Voice is a desktop business phone for Mac, Windows and Linux that can replace Linphone: it connects to your own number over SIP the same way, but it records and transcribes every call into one searchable history, answers the calls you cannot take with a greeting and voicemail, and can log each call in your HubSpot CRM. Linphone is a free, open-source, general-purpose SIP client that runs almost everywhere. If what you want is a business phone that works out of the box rather than a VoIP toolkit, here is how the two compare.',
    whatItIs: {
      summary:
        'Linphone is a long-running, open-source SIP softphone from Belledonne Communications. It runs on Mac, Windows, Linux, iOS, and Android, and covers a lot of ground — voice and video calls, instant messaging, and end-to-end encryption — for free.',
      strengths: [
        'Free and open source, with no account required to use it',
        'Runs on virtually every platform, including mobile',
        'Voice, video, and chat in one client',
        'End-to-end encryption (ZRTP/SRTP) for the technically inclined',
      ],
    },
    comparison: [
      {
        label: 'Records every call',
        wavekat: 'Automatic — every call recorded and saved the moment you hang up.',
        them: 'Manual recording per call; not a saved, browsable history by default.',
      },
      {
        label: 'Written transcript',
        wavekat: 'Live transcript alongside the call, kept with the recording.',
        them: 'No transcription.',
      },
      {
        label: 'Searchable call history',
        wavekat: 'Every call lands in one history with its recording and transcript.',
        them: 'Call log only — no recordings or transcripts attached.',
      },
      {
        label: 'Answering calls & voicemail',
        wavekat:
          'A call flow answers for you — greeting, opening hours, phone menu, voicemail or transfer — and you can pick up mid-message.',
        them: 'No answering machine of its own; voicemail is your provider\'s mailbox, which Linphone can dial.',
      },
      {
        label: 'Logging calls in your CRM',
        wavekat:
          'Connect HubSpot once and every call files itself on the matching contact, with transcript and playable recording. Part of Pro, free during early access.',
        them: 'No CRM integration; calls stay in the app\'s own log.',
      },
      {
        label: 'Setting up your number',
        wavekat: 'Pick your provider from a list (Twilio, Telnyx, 2talk and more) and the settings are filled in for you.',
        them: 'General-purpose SIP fields you configure yourself.',
      },
      {
        label: 'Where your data lives',
        wavekat: 'On your computer by default; optional sign-in to sync to the web.',
        them: 'On your device — it is a client; nothing is hosted for you.',
      },
      {
        label: 'Platforms',
        wavekat: 'Mac, Windows and Linux (the Windows build ships via the Microsoft Store).',
        them: 'Mac, Windows, Linux, iOS, Android.',
      },
      {
        label: 'Video & chat',
        wavekat: 'Focused on calls — no video or messaging.',
        them: 'Voice, video, and instant messaging.',
      },
      {
        label: 'Price',
        wavekat: 'Free during the public beta; paid later.',
        them: 'Free and open source.',
      },
    ],
    chooseThem: [
      'You want a free, open-source client with the source available',
      'You need the same app on your phone and tablet as on your desktop',
      'You want video calls and chat in the same place as voice',
      'You are comfortable configuring SIP settings yourself',
    ],
    chooseWavekat: [
      'You want every call recorded and written down automatically, with nothing to switch on',
      'You want one searchable history of calls, recordings, and transcripts',
      'You would rather pick your provider from a list than fill in SIP fields',
      'You want the calls you cannot take answered — a greeting, your opening hours, and voicemail that writes the message down',
      'You want every call to land in your HubSpot CRM without anyone remembering to type it in',
      'You want a focused desktop business phone, not a general-purpose VoIP toolkit',
    ],
    faqs: [
      {
        q: 'Can WaveKat Voice connect to the same SIP provider as Linphone?',
        a: 'Yes. Both are SIP softphones, so any provider that works with Linphone works with WaveKat Voice. The difference is setup: WaveKat Voice fills in the settings for common providers like Twilio, Telnyx, and 2talk, and lets you enter the details yourself for anything else.',
      },
      {
        q: 'Can WaveKat Voice run on Windows?',
        a: 'Yes. WaveKat Voice is on the Microsoft Store for Windows 10 and 11 — one listing that carries both the Intel/AMD (x64) and the ARM64 package — alongside the Mac and Linux builds. Direct .exe installers are available too; those are not code-signed yet, so Windows warns about an unknown publisher on first launch, while the Store package is signed by Microsoft. Linphone also has a Windows version.',
      },
      {
        q: 'Does Linphone record and transcribe calls like WaveKat Voice?',
        a: 'Linphone can record an individual call when you start it manually, but it does not transcribe calls or keep a browsable history of recordings and transcripts. WaveKat Voice records every call automatically, writes a live transcript alongside it, and saves both to your call history without any setup.',
      },
      {
        q: 'Does WaveKat Voice have voicemail, or answer calls when I cannot?',
        a: 'Yes — that is what a call flow does. Point a flow at one of your lines and WaveKat Voice answers with a greeting, your opening hours, a phone menu, voicemail or a transfer; messages are recorded and transcribed like any other call, and you can pick up while someone is still leaving one. The greeting, taking a message and ringing you are free, while phone menus, opening hours and transfers are part of Pro — free for a year during early access — and the flow runs on your own computer, so the app has to be running to answer. Linphone has no answering machine of its own; voicemail there is whatever your provider\'s mailbox offers.',
      },
      {
        q: 'Can WaveKat Voice log calls in HubSpot?',
        a: 'Yes. Connect your HubSpot account once and every call you take or place files itself on the matching contact, with the time, direction, outcome, duration, transcript, and a recording you can play inside HubSpot. It is a Pro feature, free during early access, and webhooks cover any other CRM. Linphone has no CRM integration.',
      },
      {
        q: 'Is WaveKat Voice available in languages other than English?',
        a: 'Yes. The app ships in nine languages — English, Simplified and Traditional Chinese, Japanese, Korean, German, Spanish, French and Italian — and you switch between them in Settings.',
      },
      {
        q: 'Is WaveKat Voice open source like Linphone?',
        a: 'No — WaveKat Voice is a commercial product, free during the public beta. Several of the building blocks underneath it are open source on our GitHub, but the Voice app itself is not.',
      },
    ],
  },
];

// Simplified-Chinese copy for the same competitors. Slugs are shared with the
// English set, so the /zh/voice/alternatives/<slug>/ routes line up 1:1 and the
// hreflang pairs are reciprocal. Keep this in sync structurally with the array
// above when adding a competitor.
export const alternativesZhHans: Alternative[] = [
  {
    slug: 'linphone',
    name: 'Linphone',
    tagline:
      '免费、开源的 SIP 客户端。功能全面、跨平台——WaveKat Voice 以广度换取专注：一款桌面办公电话，自动录下每一通通话，替你接起接不了的电话，并把通话记进你的 CRM。',
    seoTitle: 'Linphone 替代方案：Mac/Win/Linux',
    seoDescription:
      'WaveKat Voice 对比 Linphone：Mac、Windows、Linux 桌面 SIP 软电话，自动录音转写，替你接听留言，记进 HubSpot。',
    heading: '适用于 Mac、Windows 和 Linux 的 Linphone 替代方案',
    intro:
      'WaveKat Voice 是一款适用于 Mac、Windows 和 Linux 的桌面办公电话，可以用来替代 Linphone：同样通过 SIP 连接你自己的号码，但它会自动录下每一通通话、实时写成文字，并全部收进一份可搜索的历史记录；接不了的电话可以由通话流程代为接听，含问候语与语音留言；每通电话还能自动记进你的 HubSpot CRM。Linphone 则是一款免费、开源、几乎能在所有平台运行的通用 SIP 客户端。如果你要的是一部开箱即用、无需手动填写 SIP 字段的办公电话，下面是两者的逐项对比。',
    whatItIs: {
      summary:
        'Linphone 是来自 Belledonne Communications 的老牌开源 SIP 软电话。它可在 Mac、Windows、Linux、iOS 和 Android 上运行，覆盖面很广——语音和视频通话、即时消息以及端到端加密——而且免费。',
      strengths: [
        '免费且开源，无需账户即可使用',
        '几乎支持所有平台，包括移动端',
        '语音、视频和聊天集于一个客户端',
        '为技术型用户提供端到端加密（ZRTP/SRTP）',
      ],
    },
    comparison: [
      {
        label: '每通电话录音',
        wavekat: '自动——每通电话都会录音，并在你挂断的那一刻保存。',
        them: '需要逐通手动录音；默认不提供可浏览的保存历史。',
      },
      {
        label: '文字转写',
        wavekat: '通话旁边有实时文字稿，并与录音一同保存。',
        them: '不提供转写。',
      },
      {
        label: '可搜索的通话历史',
        wavekat: '每通电话连同录音和文字稿都汇入同一份历史记录。',
        them: '仅有通话记录——不附带录音或文字稿。',
      },
      {
        label: '接听来电与语音留言',
        wavekat:
          '通话流程替你接听——问候语、营业时间、电话菜单、留言或转接——你还可以在对方留言途中接手这通电话。',
        them: '本身没有自动接听；语音留言取决于你运营商的信箱，Linphone 可以拨打它。',
      },
      {
        label: '把通话记进 CRM',
        wavekat:
          '连接一次 HubSpot，之后每通电话都会自动归档到对应联系人名下，附带文字稿和可直接播放的录音。属于 Pro 套餐，早期访问期间免费。',
        them: '没有 CRM 集成；通话只留在应用自己的记录里。',
      },
      {
        label: '设置你的号码',
        wavekat: '从列表中选择你的运营商（如 Twilio、Telnyx、2talk），设置就为你填好了。',
        them: '通用的 SIP 字段，需要你自己配置。',
      },
      {
        label: '你的数据存放在哪里',
        wavekat: '默认存放在你的电脑上；可选择登录以同步到网页端。',
        them: '存放在你的设备上——它是一个客户端，不为你托管任何数据。',
      },
      {
        label: '支持平台',
        wavekat: 'Mac、Windows 和 Linux（Windows 版在 Microsoft Store 上架）。',
        them: 'Mac、Windows、Linux、iOS、Android。',
      },
      {
        label: '视频与聊天',
        wavekat: '专注于通话——不提供视频或消息。',
        them: '语音、视频和即时消息。',
      },
      {
        label: '价格',
        wavekat: '公测期间免费；之后转为付费。',
        them: '免费且开源。',
      },
    ],
    chooseThem: [
      '你想要一个免费、开源、可查看源代码的客户端',
      '你需要在手机、平板和电脑上使用同一个应用',
      '你希望语音、视频通话和聊天集中在一处',
      '你愿意自己配置 SIP 设置',
    ],
    chooseWavekat: [
      '你希望每通电话都自动录音并写成文字，无需手动开启任何开关',
      '你想要一份可搜索的通话、录音和文字稿历史记录',
      '比起填写 SIP 字段，你更愿意从列表中选择运营商',
      '你希望接不了的电话也有人接——问候语、营业时间，以及会写成文字的语音留言',
      '你希望每通电话都自动记进 HubSpot CRM，不必有人事后补录',
      '你想要一款专注的桌面办公电话，而不是通用的 VoIP 工具箱',
    ],
    faqs: [
      {
        q: 'WaveKat Voice 能连接和 Linphone 一样的 SIP 运营商吗？',
        a: '可以。两者都是 SIP 软电话，因此任何能用于 Linphone 的运营商都能用于 WaveKat Voice。区别在于设置：WaveKat Voice 会为 Twilio、Telnyx、2talk 等常见运营商自动填好设置，其他运营商也可以自己输入详情。',
      },
      {
        q: 'WaveKat Voice 能在 Windows 上运行吗？',
        a: '可以。WaveKat Voice 已在 Microsoft Store 上架，支持 Windows 10 和 11——同一个商店页面同时包含 Intel/AMD（x64）与 ARM64 两个安装包，Mac 和 Linux 版同步发布。也有直接下载的 .exe 安装包，但它们尚未进行代码签名，首次启动时 Windows 会提示“未知发布者”；商店版本由 Microsoft 签名。Linphone 同样提供 Windows 版本。',
      },
      {
        q: 'Linphone 会像 WaveKat Voice 一样录音和转写通话吗？',
        a: 'Linphone 可以在你手动开始时录制单通电话，但它不会转写通话，也不会保留可浏览的录音和文字稿历史。WaveKat Voice 会自动录制每一通电话，在旁边生成实时文字稿，并将两者无需任何设置地保存到你的通话历史中。',
      },
      {
        q: 'WaveKat Voice 有语音留言吗？接不了电话时它能替我接听吗？',
        a: '可以，这就是通话流程的作用。把一个流程指向你的某条线路，WaveKat Voice 就会用问候语接听、判断营业时间、播放电话菜单、录下留言或转接来电；留言和普通通话一样会录音并转写成文字，你也可以在对方留言途中接手这通电话。问候语、录留言和呼叫你本人是免费的；电话菜单、营业时间和转接属于 Pro 套餐（早期访问期间免费赠送一年）。流程运行在你自己的电脑上，因此应用需要保持运行才能接听。Linphone 本身没有自动接听功能——那里的语音留言取决于你运营商的信箱。',
      },
      {
        q: 'WaveKat Voice 能把通话记进 HubSpot 吗？',
        a: '可以。连接一次 HubSpot 账户，之后你接听或拨出的每通电话都会自动归档到号码匹配的联系人名下，带上时间、呼入呼出、结果、时长、文字稿，以及可以直接在 HubSpot 里播放的录音。这是 Pro 功能，早期访问期间免费；其他 CRM 可以用 webhook 对接。Linphone 没有 CRM 集成。',
      },
      {
        q: 'WaveKat Voice 有简体中文界面吗？',
        a: '有。WaveKat Voice 提供九种界面语言，其中包含简体中文和繁体中文，安装后可在设置里切换。',
      },
      {
        q: 'WaveKat Voice 像 Linphone 一样开源吗？',
        a: '不是——WaveKat Voice 是一款商业产品，在公测期间免费。它底层的若干构件在我们的 GitHub 上开源，但 Voice 应用本身并不开源。',
      },
    ],
  },
];

// The other fully-translated locales keep their comparison copy in their own
// files (src/lib/alternatives/<slug>.ts) so each can be authored independently.
import { alternatives as altZhHant } from './alternatives/zh-hant';
import { alternatives as altJa } from './alternatives/ja';
import { alternatives as altKo } from './alternatives/ko';
import { alternatives as altDe } from './alternatives/de';
import { alternatives as altEs } from './alternatives/es';
import { alternatives as altFr } from './alternatives/fr';
import { alternatives as altIt } from './alternatives/it';

// Locale-keyed datasets so the /zh/ comparison pages reuse the same templates.
const altByLocale: Record<string, Alternative[]> = {
  en: alternatives,
  'zh-Hans': alternativesZhHans,
  'zh-Hant': altZhHant,
  ja: altJa,
  ko: altKo,
  de: altDe,
  es: altEs,
  fr: altFr,
  it: altIt,
};

export function getAlternatives(locale: string): Alternative[] {
  return altByLocale[locale] ?? alternatives;
}

export function getAlternative(slug: string, locale = 'en'): Alternative | undefined {
  return getAlternatives(locale).find((a) => a.slug === slug);
}
