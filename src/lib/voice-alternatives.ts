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
      'The free, open-source SIP client. Capable and cross-platform — WaveKat Voice trades breadth for a focused desktop business phone that records and writes down every call.',
    seoTitle: 'WaveKat Voice — a Linphone alternative',
    seoDescription:
      'How WaveKat Voice compares to Linphone on Mac and Linux: a focused business phone that records and transcribes every call, with guided provider setup.',
    heading: 'A Linphone alternative for Mac & Linux',
    intro:
      'Linphone is a capable, free SIP client that runs almost everywhere. If what you actually want is a desktop business phone that records and writes down every call — and sets up without hand-editing SIP fields — here is how the two compare on Mac and Linux.',
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
        label: 'Setting up your number',
        wavekat: 'Pick your provider from a list and the settings are filled in for you.',
        them: 'General-purpose SIP fields you configure yourself.',
      },
      {
        label: 'Where your data lives',
        wavekat: 'On your computer by default; optional sign-in to sync to the web.',
        them: 'On your device — it is a client; nothing is hosted for you.',
      },
      {
        label: 'Platforms',
        wavekat: 'Mac, Windows and Linux.',
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
      'You want a focused desktop business phone, not a general-purpose VoIP toolkit',
    ],
    faqs: [
      {
        q: 'Can WaveKat Voice connect to the same SIP provider as Linphone?',
        a: 'Yes. Both are SIP softphones, so any provider that works with Linphone works with WaveKat Voice. The difference is setup: WaveKat Voice fills in the settings for common providers like Twilio, Telnyx, and 2talk, and lets you enter the details yourself for anything else.',
      },
      {
        q: 'Does Linphone record and transcribe calls like WaveKat Voice?',
        a: 'Linphone can record an individual call when you start it manually, but it does not transcribe calls or keep a browsable history of recordings and transcripts. WaveKat Voice records every call automatically, writes a live transcript alongside it, and saves both to your call history without any setup.',
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
      '免费、开源的 SIP 客户端。功能全面、跨平台——WaveKat Voice 以广度换取专注：一款桌面办公电话，自动录音并写下每一通通话。',
    seoTitle: 'Linphone 替代方案（Mac / Linux）',
    seoDescription:
      'WaveKat Voice 与 Linphone 在 Mac 和 Linux 上的对比：自动录音并转写每一通通话的专注办公电话。',
    heading: '适用于 Mac 和 Linux 的 Linphone 替代方案',
    intro:
      'Linphone 是一款功能全面、免费的 SIP 客户端，几乎能在所有平台上运行。如果你真正想要的是一款桌面办公电话——自动录音、写下每一通通话，而且无需手动填写 SIP 字段就能完成设置——下面是两者在 Mac 和 Linux 上的对比。',
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
        label: '设置你的号码',
        wavekat: '从列表中选择你的运营商，设置就为你填好了。',
        them: '通用的 SIP 字段，需要你自己配置。',
      },
      {
        label: '你的数据存放在哪里',
        wavekat: '默认存放在你的电脑上；可选择登录以同步到网页端。',
        them: '存放在你的设备上——它是一个客户端，不为你托管任何数据。',
      },
      {
        label: '支持平台',
        wavekat: 'Mac、Windows 和 Linux。',
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
      '你想要一款专注的桌面办公电话，而不是通用的 VoIP 工具箱',
    ],
    faqs: [
      {
        q: 'WaveKat Voice 能连接和 Linphone 一样的 SIP 运营商吗？',
        a: '可以。两者都是 SIP 软电话，因此任何能用于 Linphone 的运营商都能用于 WaveKat Voice。区别在于设置：WaveKat Voice 会为 Twilio、Telnyx、2talk 等常见运营商自动填好设置，其他运营商也可以自己输入详情。',
      },
      {
        q: 'Linphone 会像 WaveKat Voice 一样录音和转写通话吗？',
        a: 'Linphone 可以在你手动开始时录制单通电话，但它不会转写通话，也不会保留可浏览的录音和文字稿历史。WaveKat Voice 会自动录制每一通电话，在旁边生成实时文字稿，并将两者无需任何设置地保存到你的通话历史中。',
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
