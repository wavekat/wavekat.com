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
    seoTitle: 'WaveKat Voice — a Linphone alternative for Mac & Linux',
    seoDescription:
      'How WaveKat Voice compares to Linphone on Mac and Linux: a focused business phone that records and transcribes every call automatically, with guided provider setup. Free public beta.',
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
        wavekat: 'Mac and Linux today (Windows when there is demand).',
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
      'You need the same app across Mac, Windows, Linux, and mobile',
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

export function getAlternative(slug: string): Alternative | undefined {
  return alternatives.find((a) => a.slug === slug);
}
