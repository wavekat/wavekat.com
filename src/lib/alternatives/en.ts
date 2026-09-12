import type { Alternative } from '../voice-alternatives';

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
