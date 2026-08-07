# Video script — Why phone links don't work on your computer

Companion video for the blog post: https://wavekat.com/blog/why-phone-links-dont-work/
Target length: ~4:00. Narrated screen recording plus simple slides.

## Recording setup

| Item | Setting |
|------|---------|
| Resolution / frame rate | 1920×1080, 60fps |
| Live shots | Two recordings of the real app (see shot list): Ubuntu click-to-call, and the Settings → General "Phone links" switch |
| Slides | Plain dark slides, one idea each, matching the post's "slot" framing |
| Audio | Voiceover recorded separately, laid over the picture |
| Cursor | Slow, deliberate movement; no wiggling to "point" at things |

## Script

### 0:00 — Cold open (no voiceover for ~8 seconds)

[ON SCREEN: A contact page with a clickable phone number, +1 (415) 555-0123. First a phone in hand: a finger taps the number, the dial screen appears, the call connects — audible ring. Hard cut to a laptop showing the same page, same number. The cursor clicks it. Nothing happens. A beat of silence. Click again. Still nothing.]

**VO (from ~0:08):** Same web page. Same phone number. Same click. On the phone, it rings. On the computer... nothing. That link has been on nearly every website for decades — and on most computers it's never done a thing. I want to show you why. The reason fits in one sentence, and it's kind of great.

### 0:30 — Where the click goes

[ON SCREEN: Slide. A browser window hands a phone number to a box labelled "your operating system". The OS holds it over an empty rectangle labelled "phone app".]

**VO:** Here's the thing: your browser doesn't make phone calls. It never has. When you click a phone number, the browser just passes it to your operating system and says — someone wants to call this. And the operating system looks in one specific place. Picture a slot, labelled "phone app". Whatever app sits in that slot gets the number. That slot is the entire story.

### 0:55 — Why your phone always gets it right

[ON SCREEN: Slide. A phone with one app in the slot: "the dialer". A big tick.]

**VO:** Your phone has exactly one thing that makes calls. The dialer. It's built in, you can't remove it, it's always in the slot. So your phone never has to ask what you meant. Tap a number — it rings. Every time. That's why you've never once thought about this.

### 1:15 — What each computer does instead

[ON SCREEN: Slide sequence, one per OS, each showing the slot. Mac: FaceTime logo in the slot. Windows: slot empty, the "How do you want to open this?" dialog. Linux: slot empty, nothing at all.]

**VO:** Your computer is different. It can run a hundred apps that make sound — but there's no obvious "thing that makes phone calls". So the slot is a real question, and every operating system answers it differently. On a Mac, Apple pre-fills it with FaceTime. Click a number and FaceTime offers to place the call through your iPhone — which works if you have an iPhone, nearby, set up for it, and is almost never what you wanted at a desk. On Windows, the slot starts empty. You get "How do you want to open this?" — with a list that's usually empty too. And on Linux? No app claims phone links at all. The click just... evaporates.

[ON SCREEN: Return to the laptop from the cold open. The cursor clicks the number one more time. Nothing.]

**VO:** So the link was never broken. The website did its job. The browser did its job. The operating system knocked on the phone app's door. There was just nobody home.

### 2:10 — Putting somebody home

[ON SCREEN: LIVE SHOT A. WaveKat Voice on Ubuntu, Settings → General. The "Phone links" switch is visibly off. The cursor flips it on. Nothing else happens — that's the point.]

**VO:** So let's put somebody home. This is WaveKat Voice — a phone app for Mac and Linux that records and transcribes every call. In Settings, under General, there's one switch: Phone links. It ships off. On purpose — taking over phone links for your whole computer should be your decision, not something an app grabs the moment you install it. Flip it, and WaveKat Voice steps into the slot.

### 2:40 — The click, again

[ON SCREEN: LIVE SHOT B. Same contact page as the cold open, on Ubuntu. The cursor clicks +1 (415) 555-0123. WaveKat Voice comes to the front with the number already typed into the call box. A short pause on that frame. The cursor moves to Call and presses it.]

**VO:** Now watch the same click. The app comes up, and the number is already typed in. Nobody copied anything. Nobody retyped a country code. You look at the number... and you press Call. That's the whole feature. It shipped in version 0.0.43.

### 3:05 — The question you should be asking

[ON SCREEN: Slide. Big text: "Can a web page phone someone from my computer?" Then a second line fades in: "No. A link can only ask."]

**VO:** Now — the question you should be asking. If clicking a link opens my phone app... can a web page make my computer call someone? No. A link can only request a call. By default, WaveKat Voice fills in the number and then waits for a human to press the button. There is a "dial immediately" option for people who want one step fewer — it's off by default, and even switched on, it refuses to act if you're already on a call, or if it isn't obvious which line to call from. And the window always comes to the front. Nothing can ever dial where you can't see it.

### 3:35 — Close

[ON SCREEN: The blog post URL on screen: wavekat.com/blog/why-phone-links-dont-work — then the WaveKat Voice download page.]

**VO:** So next time you see a phone number underlined on a web page, you'll know: it was always a working doorbell. Your computer just needed someone to answer the door. There's a written version of this with a little interactive figure — you can click through what each operating system does with the same link — at wavekat.com. Link in the description. WaveKat Voice is free to download for Mac and Linux. Flip the one switch, and your clicks will ring.

## Shot list

| Shot | What to record | Notes |
|------|----------------|-------|
| Cold open, phone | Phone in hand tapping the number on the contact page; dial screen; ring | Real device, filmed or screen-recorded; keep under 5 s |
| Cold open, laptop | Same page on the laptop, click, nothing happens | Record before enabling the switch; reused at 1:55 |
| LIVE SHOT A | WaveKat Voice on Ubuntu: Settings → General, flipping "Phone links" on | The `settings-general-phone-links` scene shows this screen |
| LIVE SHOT B | Ubuntu: click the number, WaveKat Voice opens pre-filled, press Call | Fallback still if the recording fails: `public/screenshots/dial-prefilled/en.webp` |

## YouTube metadata

### Title options (≤70 chars)

1. **Why clicking a phone number does nothing on your computer** — 57 chars. *Recommended: it's the exact question viewers type.*
2. Phone links work on your phone but not your computer. Here's why — 63 chars.
3. The empty slot: why tel: links never worked on your desktop — 59 chars.

### Description

```
Tap a phone number on your phone and it rings. Click the same link on your computer and nothing happens. The reason fits in one sentence: your phone has exactly one thing that makes calls, so it never has to ask — your computer has a slot labelled "phone app", and on most computers that slot is empty.

This video shows where the click actually goes, what each operating system does with it (Mac, Windows, Linux), and how WaveKat Voice — a phone app for Mac and Linux that records and transcribes every call — fills the slot with one switch.

Written version, with an interactive device-by-device figure:
https://wavekat.com/blog/why-phone-links-dont-work/

Download WaveKat Voice (Mac & Linux):
https://wavekat.com/voice/download/

Chapters:
0:00 Same link, two devices
0:30 Where the click goes
0:55 Why your phone always gets it right
1:15 What each computer does instead
2:10 Putting somebody home
2:40 The click, again
3:05 Can a web page phone someone?
3:35 Try it yourself
```

### Tags (~12)

tel links, phone links, click to call, clickable phone number, tel link not working, phone number link mac, facetime opens instead, click to call linux, click to call mac, softphone, WaveKat Voice, sip client

### Thumbnail concept

Split frame, one image, no more than five words of text. Left half: a phone with the number highlighted and a green "rings" tick. Right half: a laptop with the identical number and a grey "nothing" cross. Between them, small and centred, the empty slot graphic from the slides — a hollow rectangle labelled "phone app". Text overlay: "Same link. Why?" The contrast of tick/cross does the selling; the empty slot is the curiosity hook for people who pause on it.

### Pinned comment

> The written version has an interactive figure where you can click through exactly what a phone, a Mac, Windows, and Linux each do with the same link — worth 30 seconds if you like seeing the mechanism: https://wavekat.com/blog/why-phone-links-dont-work/ (And yes, +1 (415) 555-0123 is a reserved fictional number — safe to click.)
