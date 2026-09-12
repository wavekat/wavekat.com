import type { TermsDoc } from '../terms';

// English is the source of truth. When a clause changes here, change it in all
// eight translations in the same PR and bump TERMS_UPDATED in ../terms.ts.
//
// ⚠️ BEFORE THE FIRST PUBLIC RELEASE: the governing-law section names New
// Zealand because that is where WaveKat operates. Confirm the registered
// company name and jurisdiction and put them in `law` below — it is the one
// clause on this page that a court reads literally.
export const terms: TermsDoc = {
  seoTitle: 'Terms of Service — WaveKat',
  seoDescription:
    'The agreement between you and WaveKat: what you may use WaveKat Voice for, why it cannot reach emergency services, and who is responsible for recording calls.',
  h1: 'Terms of Service',
  updatedPrefix: 'Last updated',
  lead: [
    'These terms are the agreement between you and WaveKat. They cover the WaveKat Voice app, your WaveKat account, and this website. Using any of them means you accept what follows.',
    "We have written this the way we wrote the [privacy policy](/privacy/) — in plain language, by the people who build the thing, including the parts that are inconvenient to say. If a sentence here is unclear, ask us and we will fix the sentence.",
  ],
  highlightsLabel: 'Three things to know first',
  highlights: [
    '**WaveKat Voice cannot call emergency services.** It is calling software, not a phone line, and a call to 111, 999, 911, 112 or your local emergency number may not connect or may not reach the right place. Always keep a mobile or landline that can.',
    '**Recording calls is your responsibility, and recording is on by default.** Whether you may record, and whether you must say so first, depends on where you and the other person are. Getting it wrong can be a criminal matter in some countries.',
    '**This is beta software from a very small team.** It is provided as it is, without a warranty, and it will change. Keep your own copies of anything you cannot afford to lose.',
  ],
  onThisPage: 'On this page',
  sections: [
    {
      id: 'acceptance',
      heading: 'Agreeing to these terms',
      body: [
        {
          kind: 'p',
          text: 'You accept these terms when you first do any of the following, whichever comes first: install or use WaveKat Voice, create a WaveKat account, or use a paid feature. The app asks you to agree the first time you open it, and the sign-in page says so above the button — but using WaveKat without ever reading this page does not put you outside the agreement.',
        },
        {
          kind: 'p',
          text: 'If you are agreeing on behalf of a business, you are telling us you are allowed to commit that business, and "you" below means the business.',
        },
        {
          kind: 'p',
          text: "The [privacy policy](/privacy/) is part of this agreement. It describes what WaveKat collects and what stays on your own computer, and nothing here overrides it.",
        },
      ],
    },
    {
      id: 'who',
      heading: 'Who may use WaveKat',
      body: [
        {
          kind: 'p',
          text: 'You need to be at least 16 years old. WaveKat Voice is a business tool and is not directed at children.',
        },
        {
          kind: 'p',
          text: 'You also need to be somewhere we are allowed to offer it. If you are in a country under trade sanctions that cover software like this, or you are on a sanctions list, you may not use WaveKat.',
        },
      ],
    },
    {
      id: 'account',
      heading: 'Your WaveKat account',
      body: [
        {
          kind: 'p',
          text: 'You do not need an account to use WaveKat Voice. Without one the app is entirely local, and everything in it stays on your computer.',
        },
        {
          kind: 'p',
          text: 'If you do create one, it is yours to look after. Sign-in runs through GitHub, Google or Apple, so the password protecting your WaveKat account is really theirs — keep it, and the second factor on it, in good order. Tell us at [hello@wavekat.com](mailto:hello@wavekat.com) if you think someone else has got in.',
        },
        {
          kind: 'p',
          text: 'One person, one account. Do not share an account with your colleagues, and do not use someone else\'s. If your team needs several people, make several accounts.',
        },
        {
          kind: 'p',
          text: 'New accounts may need to be approved before they can do anything. That is not a judgement about you — it is a small team keeping an eye on who is arriving.',
        },
      ],
    },
    {
      id: 'plans',
      heading: 'Free and Pro',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice is free to download and free to use. Some features are part of a Pro plan; where one is, the app says so before you reach it rather than after.',
        },
        {
          kind: 'p',
          text: 'A Pro plan runs for a year from the day it starts. Prices are shown before you pay, in the currency shown, and taxes are added where the law requires it. We can change what a plan costs in future, but never for a year you have already paid for.',
        },
        {
          kind: 'p',
          text: 'If Pro is not what you expected, email us within 14 days of paying and we will refund it. After that we will still listen — a refund outside that window is at our discretion, and "it stopped working and we could not fix it" is the case we say yes to. Where your local consumer law gives you more than this, your local law wins.',
        },
      ],
    },
    {
      id: 'licence',
      heading: 'Your licence to use the app',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice is licensed to you, not sold. You may install and use it on the computers you control, for as long as this agreement lasts, for your own work or your business\'s.',
        },
        {
          kind: 'p',
          text: 'What that licence does not include:',
        },
        {
          kind: 'list',
          items: [
            'Selling, renting, sublicensing or redistributing the app, or bundling it into something you sell.',
            'Taking it apart — decompiling, disassembling or reverse-engineering it — except to the extent your local law says you may do so regardless of what we write here.',
            'Removing the WaveKat name or marks from it, or passing it off as your own product.',
            'Working around the checks that separate the free and Pro features.',
          ],
        },
        {
          kind: 'p',
          text: 'The app, the website, and everything in them stay ours. The open-source WaveKat libraries the app is built on are a separate matter: they are published on [GitHub](https://github.com/wavekat) under their own licences, and nothing here restricts what you may do with those.',
        },
        {
          kind: 'p',
          text: 'WaveKat Voice updates itself so that fixes actually reach people. Where it is installed from a store, the store handles that instead.',
        },
      ],
    },
    {
      id: 'acceptable',
      heading: 'What you may not use WaveKat for',
      body: [
        {
          kind: 'p',
          text: 'The short version: do not use WaveKat to do something to another person that you would not want done to you.',
        },
        {
          kind: 'list',
          items: [
            '**Unsolicited calls.** No automated calling campaigns, cold-call dialling or recorded messages to people who have not asked to hear from you, and nothing that breaches a do-not-call register.',
            '**Pretending to be someone else.** Do not send caller ID that is not yours to send, and do not use a call flow to impersonate a person or a company.',
            '**Recording people unlawfully.** See the section below — this one is serious enough to have its own.',
            '**Anything illegal, or aimed at harming someone** — fraud, harassment, threats, or helping someone else do those things.',
            '**Breaking the service on purpose** — attacking it, probing it for holes without asking us first, or automating it in a way that degrades it for other people.',
            '**Reselling WaveKat as your own calling service** without a written agreement with us.',
          ],
        },
        {
          kind: 'p',
          text: 'If you find a security hole, please tell us at [hello@wavekat.com](mailto:hello@wavekat.com) before telling anyone else. We will not come after you for looking responsibly.',
        },
      ],
    },
    {
      id: 'phone',
      heading: 'Your phone service, and emergency calls',
      body: [
        {
          kind: 'p',
          text: '**WaveKat Voice cannot be relied on to call emergency services.** It is software that talks to a phone line you already have. It does not know where you are, it cannot tell an emergency operator where to send help, and a call may not connect at all if your internet, your computer or your provider is having a bad day. Keep a mobile or a landline that can reach emergency services, and make sure everyone who uses this computer knows to use that instead.',
        },
        {
          kind: 'p',
          text: 'The phone service itself is not ours. You bring your own SIP provider, you have your own agreement with them, and they — not we — carry your calls, bill you for them and give you your numbers. If your calls do not connect, the provider is usually the place to start.',
        },
        {
          kind: 'p',
          text: 'You are responsible for what your provider charges you, including calls a call flow answers or places while you are not watching.',
        },
      ],
    },
    {
      id: 'recording',
      heading: 'Recording, transcribing and sharing calls',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice records calls, and recording is on when you install it. Everything is recorded and transcribed on your own computer.',
        },
        {
          kind: 'p',
          text: '**Whether you are allowed to do that is between you and the law where you and the other person are, and it is your responsibility rather than ours.** Some places need only your own consent. Others require everyone on the call to agree, and a few treat getting it wrong as a crime rather than a civil matter. The app plays a notice beep at the start of a recorded call as a courtesy, and a beep is not consent.',
        },
        {
          kind: 'p',
          text: 'If you are not sure: say you are recording, or turn recording off in Settings. Both take a moment and neither can be undone afterwards.',
        },
        {
          kind: 'p',
          text: 'The same goes for what you do with a recording afterwards — sharing it by link, sending it to a service you have connected, or keeping it. If a recording contains someone else\'s personal information, you are the one responsible for it under privacy law, and we are handling it on your behalf.',
        },
      ],
    },
    {
      id: 'content',
      heading: 'Your calls stay yours',
      body: [
        {
          kind: 'p',
          text: 'Your recordings, transcripts, contacts, call flows and notes are yours. We do not claim ownership of any of it, and we do not use it to train models.',
        },
        {
          kind: 'p',
          text: 'If you turn on cloud sync, you are giving us permission to store and move that content for one purpose: running the service for you — syncing it between your devices, showing it to you on the website, and serving a recording to someone you shared a link with. That permission ends when you delete the content or your account.',
        },
        {
          kind: 'p',
          text: 'We may remove content or suspend an account if we have to — a legal demand, or content that breaches the section above. We will tell you when that happens unless we are not allowed to.',
        },
      ],
    },
    {
      id: 'connected',
      heading: 'Services you connect',
      body: [
        {
          kind: 'p',
          text: 'You can connect WaveKat to other services — a CRM, a webhook of your own, an AI assistant on your computer. Nothing is connected unless you connect it.',
        },
        {
          kind: 'p',
          text: 'Once you do, what that service does with what it receives is governed by your agreement with them, not by this one. If a connection sends a transcript somewhere, that transcript is out of our hands, and disconnecting stops the flow but does not retrieve what already went.',
        },
      ],
    },
    {
      id: 'availability',
      heading: 'Changes, and what we do not promise about uptime',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice is in public beta. Features arrive, change shape, and occasionally leave. We try hard not to break what you rely on, and we will tell you on the [what\'s new page](/voice/changelog/) when something user-facing changes.',
        },
        {
          kind: 'p',
          text: 'The cloud part of WaveKat has no uptime guarantee. There is no service level agreement, no credits, and no promise that sync will be reachable at a given moment. The design point is that this matters less than it sounds: the app keeps working on your computer when our servers do not.',
        },
        {
          kind: 'p',
          text: 'If we ever shut the service down, we will give you reasonable notice and a way to take your data with you.',
        },
      ],
    },
    {
      id: 'warranty',
      heading: 'No warranty',
      body: [
        {
          kind: 'p',
          text: 'WaveKat is provided "as is" and "as available". We do not promise it will be uninterrupted, error-free, or fit for a particular purpose, and we do not promise a call will connect, a recording will be made, or a transcript will be accurate.',
        },
        {
          kind: 'p',
          text: 'Speech-to-text gets things wrong, especially with accents, crosstalk and poor lines. Do not treat a transcript as a record of what was said if something important turns on it.',
        },
        {
          kind: 'p',
          text: 'Some countries give consumers guarantees that cannot be excluded — New Zealand\'s Consumer Guarantees Act, the EU\'s and UK\'s consumer rules, and their equivalents. Nothing here takes those away from you. Where you have them, they apply on top of this section and win over it.',
        },
      ],
    },
    {
      id: 'liability',
      heading: 'Limits on our responsibility',
      body: [
        {
          kind: 'p',
          text: 'To the extent the law allows, WaveKat is not liable for indirect or consequential loss — lost business, lost profits, lost data, a call that did not connect, or a recording you needed and did not get.',
        },
        {
          kind: 'p',
          text: 'Where we are liable, our total liability to you for everything arising out of this agreement is capped at whatever you paid us in the twelve months before the thing you are complaining about — and if you have never paid us anything, at NZ$100.',
        },
        {
          kind: 'p',
          text: 'None of this limits liability that cannot be limited by law: our own fraud, death or personal injury we caused, or a consumer guarantee you have that cannot be excluded.',
        },
        {
          kind: 'p',
          text: 'If your use of WaveKat causes someone else to bring a claim against us — a call you made, a person you recorded, content you shared — you will cover what that costs us.',
        },
      ],
    },
    {
      id: 'ending',
      heading: 'Ending the agreement',
      body: [
        {
          kind: 'p',
          text: 'You can stop at any time: uninstall the app, or delete your account in Settings, which shows you what the account holds before you confirm. You can also email us and we will do it for you.',
        },
        {
          kind: 'p',
          text: 'We can suspend or end an account that breaches these terms, or where we are legally required to. Unless it is urgent or a legal demand, we will tell you what the problem is first and give you a chance to fix it.',
        },
        {
          kind: 'p',
          text: 'When the agreement ends, your licence to use the app ends with it and we delete what was synced to your account. Everything on your own computer stays there until you remove it. The sections about your content being yours, no warranty, our liability, and law and disputes carry on afterwards.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      body: [
        {
          kind: 'p',
          text: 'When these terms change, the date at the top changes with them. For a change that materially affects your rights or what you are agreeing to, we will tell you before it takes effect — in the app, or by email if you have an account — rather than quietly editing a sentence.',
        },
        {
          kind: 'p',
          text: 'If you do not accept a change, stop using WaveKat and delete your account before it takes effect. Continuing to use it afterwards is how you accept it.',
        },
      ],
    },
    {
      id: 'law',
      heading: 'Law and disputes',
      body: [
        {
          kind: 'p',
          text: 'This agreement is governed by the law of New Zealand, and the New Zealand courts have jurisdiction over any dispute about it. If you are a consumer somewhere else, this does not take away the protection of your own country\'s law or your right to bring a claim where you live.',
        },
        {
          kind: 'p',
          text: 'Before anyone goes anywhere near a court, email [hello@wavekat.com](mailto:hello@wavekat.com). A real person reads it, and almost everything is cheaper to fix that way.',
        },
        {
          kind: 'p',
          text: 'These terms and the privacy policy are the whole agreement between us about WaveKat. If a court decides one part of it does not hold, the rest still does. If we do not enforce something straight away, that is not us giving it up.',
        },
      ],
    },
  ],
  faqHeading: 'Questions & answers',
  faqs: [
    {
      q: 'Do I have to agree to anything to use WaveKat Voice?',
      a: 'Yes. WaveKat Voice asks you to agree to these terms and acknowledge the privacy policy the first time you open it, before you set anything up. You do not need a WaveKat account — the app works entirely on your own computer without one — but you do need to accept the agreement.',
    },
    {
      q: 'Can WaveKat Voice call 111, 911 or other emergency numbers?',
      a: 'No. Treat it as unable to reach emergency services. It is software running on your computer, it does not know your address, and an emergency call may fail or reach the wrong place. Always keep a mobile or a landline that can, and make sure anyone else using the computer knows that.',
    },
    {
      q: 'Is it legal for me to record my calls with WaveKat Voice?',
      a: 'That depends on where you are and where the person you are calling is, and it is your responsibility rather than ours. Some places need only your consent; others require everyone on the call to agree, and getting it wrong can be a criminal matter. If you are unsure, say you are recording, or turn recording off in Settings.',
    },
    {
      q: 'Does WaveKat own my recordings, or use them to train models?',
      a: 'No to both. Your recordings, transcripts, contacts and call flows are yours. If you turn on cloud sync you are giving us permission to store and move them so the service works for you, and that permission ends when you delete the content or your account.',
    },
    {
      q: 'Can I get a refund on a Pro plan?',
      a: 'Yes — email hello@wavekat.com within 14 days of paying and we will refund it. After that it is at our discretion, and "it stopped working and we could not fix it" is the case we say yes to. Where your local consumer law gives you more than this, your local law applies.',
    },
    {
      q: 'What happens to my data if I stop using WaveKat?',
      a: 'Delete your account in Settings and we delete what was synced to it; the app shows you what the account holds before you confirm. Anything on your own computer stays there until you remove it, which you can do from the same screen.',
    },
  ],
  contactHeading: 'Contact us',
  contactIntro:
    'Anything on this page that is unclear, or a clause you think is wrong — email us and a person will answer.',
};
