import type { TermsDoc } from '../terms';

// English is the source of truth. When a clause changes here, change it in all
// eight translations in the same PR and bump TERMS_UPDATED in ../terms.ts.
//
// Every factual claim below is checkable against the product, and several of
// them are easy to get wrong from memory — keep these straight:
//   - Pro costs nothing during early access. There is no checkout, no price
//     and no refund policy because there is nothing to refund. Don't write a
//     billing clause here until billing exists.
//   - Recording is ON by default; live transcription is OFF by default.
//   - Cloud sync is ON by default once you sign in, not opt-in.
//   - Sign-in is GitHub, Google or Apple; a password can be added afterwards
//     to an account you already hold, never used to create one.
//   - The privacy policy is a notice you acknowledge, not a contract you agree
//     to (that is why the sign-in page says "agree to the terms and
//     acknowledge the policy"). Don't fold it into this agreement.
//
// ⚠️ The governing-law section names New Zealand and caps liability in NZ$
// because that is where WaveKat operates. Confirm the registered company name
// and jurisdiction before relying on it — it is the one clause on this page
// that a court reads literally.
export const terms: TermsDoc = {
  seoTitle: 'Terms of Service — WaveKat',
  seoDescription:
    'The agreement between you and WaveKat: what you may use WaveKat Voice for, why it cannot reach emergency services, and who is responsible for recording calls.',
  h1: 'Terms of Service',
  updatedPrefix: 'Last updated',
  lead: [
    'These terms are the agreement between you and WaveKat. They cover the WaveKat Voice app, your WaveKat account, the wk command-line tool, and this website and the tools on it. Using any of them means you accept what follows.',
    'This page is written in plain language by the people who build WaveKat. It is not legal advice. It is published in nine languages; if a translation and the English version ever differ, the English version is the one that applies.',
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
          text: 'You accept these terms when you first do any of the following, whichever comes first: install or use WaveKat Voice, create a WaveKat account, or use a Pro feature. The app asks you to agree the first time you open it, and the sign-in page says so above the button — but using WaveKat without ever reading this page does not put you outside the agreement.',
        },
        {
          kind: 'p',
          text: 'If you are agreeing on behalf of a business, you are telling us you are allowed to commit that business, and "you" below means the business.',
        },
        {
          kind: 'p',
          text: "The [privacy policy](/privacy/) is not part of this contract — it is our description of what WaveKat collects and what stays on your own computer, and we are bound by it whether or not you have read it. If this page and that one ever seem to disagree about your data, the privacy policy wins.",
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
          text: 'If you do create one, it is yours to look after. You sign in with GitHub, Google or Apple, and can add a password to the account afterwards. Keep whichever of those you use — and the second factor on it — in good order, and tell us at [hello@wavekat.com](mailto:hello@wavekat.com) if you think someone else has got in. What is done from your account is yours to answer for until you tell us.',
        },
        {
          kind: 'p',
          text: 'One person, one account. Do not share an account with your colleagues, and do not use someone else\'s. If your team needs several people, make several accounts.',
        },
        {
          kind: 'p',
          text: 'New accounts may need to be approved before they can do anything.',
        },
      ],
    },
    {
      id: 'plans',
      heading: 'What it costs',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice is free to download and free to use. Some features belong to a Pro plan; where one does, the app says so before you reach it rather than after.',
        },
        {
          kind: 'p',
          text: 'During early access, Pro costs nothing. If you ask for it on the website, we grant it for a stated period at no charge, and we will not start charging for a period we have already granted. There is no checkout anywhere in WaveKat today, so nothing here can take money from you.',
        },
        {
          kind: 'p',
          text: 'When Pro does get a price, we will tell you the price, the currency and the term before you pay anything, and we will update this page. Nothing will be charged to you that you did not agree to first. Where your local consumer law gives you more than what we then write, your local law wins.',
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
          text: 'The copy of WaveKat Voice you download from us checks for updates and installs them itself, so that fixes actually reach people. Where it is installed from a store, the store handles that instead.',
        },
      ],
    },
    {
      id: 'stores',
      heading: 'If you installed it from a store',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice is also on the Mac App Store, the Microsoft Store and the Snap Store. If you got it from one of them, that store\'s own terms apply to the download and to any update it delivers, on top of this agreement.',
        },
        {
          kind: 'p',
          text: 'This agreement is between you and WaveKat, not the store. Apple, Microsoft and Canonical did not make WaveKat Voice, owe you no maintenance or support for it, and are not responsible for it, for any claim about it, or for anything it does with your data. They may, however, rely on this agreement and enforce it against you as if they were a party to it — Apple\'s rules require us to say so.',
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
            '**Pretending to be someone else.** Do not send caller ID that is not yours to send, and do not use a call flow or a generated voice prompt to impersonate a person or a company.',
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
          text: 'A call flow answers callers in your name — a greeting, a menu, voicemail, a transfer — while the app is running on a computer that is awake. What it says to them, and what it does with what they leave, is your responsibility, the same as if you had picked up yourself. It is not a substitute for a phone that is answered.',
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
          text: 'WaveKat Voice records calls, and recording is on when you install it. Live transcription is off until you turn it on. Both happen on your own computer — no audio is sent anywhere to be recorded or transcribed.',
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
          text: 'Your recordings, transcripts, contacts, call flows and notes are yours. We do not claim ownership of any of it, and we do not use it to train models unless you have explicitly chosen to let us.',
        },
        {
          kind: 'p',
          text: 'If you sign in and leave cloud sync on — it is on by default once you sign in — you are giving us permission to store and move that content for one purpose: running the service for you. That means syncing it between your devices, showing it to you on the website, and serving a recording to someone you shared a link with. The permission ends when you delete the content or your account.',
        },
        {
          kind: 'p',
          text: 'Voice prompts you make with the generator on this website are yours to use on your own phone system. Do not use one to imitate a real person\'s voice or to pass yourself off as someone you are not.',
        },
        {
          kind: 'p',
          text: 'We may remove content or suspend an account if we have to — a legal demand, or content that breaches the section above. We will tell you when that happens unless we are not allowed to.',
        },
        {
          kind: 'p',
          text: 'If you send us a suggestion or a bug report, we may use it to make WaveKat better without owing you anything for it.',
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
          text: 'The cloud part of WaveKat has no uptime guarantee. There is no service level agreement, no credits, and no promise that sync will be reachable at a given moment. The app is built to work without our servers, so if the cloud part is down, changes, or ever goes away, what is on your own computer stays there and keeps working.',
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
          text: 'Some countries give consumers guarantees that cannot be excluded — New Zealand\'s Consumer Guarantees Act, the EU\'s and UK\'s consumer rules, and their equivalents. Nothing here takes those away from you. Where you have them, they apply on top of this section and win over it. If you are using WaveKat for a business, you agree that those consumer guarantees do not apply, to the extent the law lets you agree to that.',
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
          text: 'If the law does make us liable to you, the most you can recover from us for everything arising out of this agreement is what you paid us in the twelve months before the event — and if you have never paid us, NZ$100.',
        },
        {
          kind: 'p',
          text: 'None of this limits anything the law does not let us limit — our own fraud, injury caused by our own negligence, or a consumer guarantee you have that cannot be excluded.',
        },
        {
          kind: 'p',
          text: 'If your use of WaveKat in breach of these terms or the law causes someone else to bring a claim against us — a call you made, a person you recorded, content you shared — you will cover what that claim costs us, to the extent your local law allows you to agree to that. We will tell you about the claim promptly and not settle it in your name without asking you.',
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
          text: 'When these terms change, the date at the top changes with them, and the new version applies from then on. If a change materially affects your rights, we will say so in the app or on this page. By continuing to use WaveKat after a change, you accept it; if you do not, stop using WaveKat and delete your account.',
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
          text: 'If you have a dispute with us, email [hello@wavekat.com](mailto:hello@wavekat.com) first and give us a chance to resolve it before taking any other step.',
        },
        {
          kind: 'p',
          text: 'These terms are the whole agreement between us about WaveKat. If a court decides one part of it does not hold, the rest still does. If we do not enforce something straight away, that is not us giving it up. You may not hand this agreement to someone else; we may hand it to a company that takes over WaveKat, and we will tell you if we do.',
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
      a: 'No to both. Your recordings, transcripts, contacts and call flows are yours, and we do not use them to train models unless you have explicitly chosen to let us. If you sign in and leave cloud sync on you are giving us permission to store and move them so the service works for you, and that permission ends when you delete the content or your account.',
    },
    {
      q: 'Does WaveKat Voice cost anything?',
      a: 'Not today. The app is free, and Pro costs nothing during early access — if you ask for it on the website we grant it for a stated period at no charge, and we will not start charging for a period already granted. There is no checkout in WaveKat. When Pro gets a price, you will see it before you pay anything, and this page will change to say so.',
    },
    {
      q: 'What happens to my data if I stop using WaveKat?',
      a: 'Delete your account in Settings and we delete what was synced to it; the app shows you what the account holds before you confirm. Anything on your own computer stays there until you remove it, which you can do from the same screen.',
    },
  ],
  contactHeading: 'Contact us',
  contactIntro:
    'If anything on this page is unclear, or you think a clause is wrong, email us.',
};
