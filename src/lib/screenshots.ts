// Localized captions / alt text for the marketing screenshots, keyed by scene
// id and locale `code`. These feed the <AppScreenshot> component — used as the
// image `alt` (a11y + SEO/GEO: an extractable, factual description) and as the
// optional visible <figcaption>.
//
// "WaveKat Voice" is the product name and is never translated (CLAUDE.md).
// One entry per scene committed by scripts/sync-screenshots.js; English is the
// fallback when a locale is missing a string.

export type SceneId =
  | "home"
  | "incoming-call"
  | "in-call"
  | "history"
  | "call-details"
  | "add-account";

type CaptionSet = Record<string, string>; // locale code → caption

const CAPTIONS: Record<SceneId, CaptionSet> = {
  home: {
    en: "The WaveKat Voice home screen, with your connected lines and recent calls.",
    "zh-Hans": "WaveKat Voice 的主界面，显示已连接的线路和最近的通话。",
    "zh-Hant": "WaveKat Voice 的主畫面，顯示已連線的線路與近期通話。",
    ja: "WaveKat Voice のホーム画面。接続中の回線と最近の通話を表示。",
    ko: "WaveKat Voice 홈 화면 — 연결된 회선과 최근 통화를 보여줍니다.",
    de: "Der Startbildschirm von WaveKat Voice mit verbundenen Leitungen und letzten Anrufen.",
    es: "La pantalla de inicio de WaveKat Voice, con tus líneas conectadas y las llamadas recientes.",
    fr: "L'écran d'accueil de WaveKat Voice, avec vos lignes connectées et les appels récents.",
    it: "La schermata iniziale di WaveKat Voice, con le linee collegate e le chiamate recenti.",
  },
  "incoming-call": {
    en: "An incoming call ringing in WaveKat Voice.",
    "zh-Hans": "WaveKat Voice 中正在响铃的来电。",
    "zh-Hant": "WaveKat Voice 中正在響鈴的來電。",
    ja: "WaveKat Voice に着信中の電話。",
    ko: "WaveKat Voice에서 걸려오는 전화.",
    de: "Ein eingehender Anruf klingelt in WaveKat Voice.",
    es: "Una llamada entrante sonando en WaveKat Voice.",
    fr: "Un appel entrant qui sonne dans WaveKat Voice.",
    it: "Una chiamata in arrivo che squilla in WaveKat Voice.",
  },
  "in-call": {
    en: "A call in progress in WaveKat Voice, with a live transcript alongside.",
    "zh-Hans": "WaveKat Voice 中正在进行的通话，旁边是实时字幕。",
    "zh-Hant": "WaveKat Voice 中正在進行的通話，旁邊顯示即時逐字稿。",
    ja: "WaveKat Voice で通話中の画面。リアルタイムの文字起こしを横に表示。",
    ko: "WaveKat Voice에서 진행 중인 통화 — 옆에 실시간 자막이 표시됩니다.",
    de: "Ein laufender Anruf in WaveKat Voice mit Live-Transkript daneben.",
    es: "Una llamada en curso en WaveKat Voice, con la transcripción en directo al lado.",
    fr: "Un appel en cours dans WaveKat Voice, avec la transcription en direct à côté.",
    it: "Una chiamata in corso in WaveKat Voice, con la trascrizione dal vivo a fianco.",
  },
  history: {
    en: "Call history in WaveKat Voice — every call with its recording and transcript.",
    "zh-Hans": "WaveKat Voice 的通话记录——每通电话都附有录音和文字记录。",
    "zh-Hant": "WaveKat Voice 的通話紀錄——每通電話都附有錄音與逐字稿。",
    ja: "WaveKat Voice の通話履歴。すべての通話に録音と文字起こしが残ります。",
    ko: "WaveKat Voice의 통화 기록 — 모든 통화에 녹음과 전사가 함께 저장됩니다.",
    de: "Die Anrufliste in WaveKat Voice – jeder Anruf mit Aufzeichnung und Transkript.",
    es: "El historial de llamadas en WaveKat Voice: cada llamada con su grabación y transcripción.",
    fr: "L'historique des appels dans WaveKat Voice — chaque appel avec son enregistrement et sa transcription.",
    it: "La cronologia delle chiamate in WaveKat Voice: ogni chiamata con la sua registrazione e trascrizione.",
  },
  "call-details": {
    en: "A recorded call in WaveKat Voice, with playback and the saved transcript.",
    "zh-Hans": "WaveKat Voice 中的一通已录音通话，可回放并查看保存的文字记录。",
    "zh-Hant": "WaveKat Voice 中的一通已錄音通話，可回放並檢視已儲存的逐字稿。",
    ja: "WaveKat Voice に録音された通話。再生と保存された文字起こしを表示。",
    ko: "WaveKat Voice에 녹음된 통화 — 재생과 저장된 전사를 함께 제공합니다.",
    de: "Ein aufgezeichneter Anruf in WaveKat Voice mit Wiedergabe und gespeichertem Transkript.",
    es: "Una llamada grabada en WaveKat Voice, con reproducción y la transcripción guardada.",
    fr: "Un appel enregistré dans WaveKat Voice, avec lecture et transcription enregistrée.",
    it: "Una chiamata registrata in WaveKat Voice, con riproduzione e trascrizione salvata.",
  },
  "add-account": {
    en: "Connecting a phone provider in WaveKat Voice.",
    "zh-Hans": "在 WaveKat Voice 中连接电话服务商。",
    "zh-Hant": "在 WaveKat Voice 中連接電話服務供應商。",
    ja: "WaveKat Voice で電話プロバイダーを接続する画面。",
    ko: "WaveKat Voice에서 전화 사업자를 연결하는 화면.",
    de: "Einen Telefonanbieter in WaveKat Voice verbinden.",
    es: "Conectando un proveedor de telefonía en WaveKat Voice.",
    fr: "Connexion d'un opérateur téléphonique dans WaveKat Voice.",
    it: "Collegamento di un operatore telefonico in WaveKat Voice.",
  },
};

/** Localized caption/alt for a scene, falling back to English. */
export function screenshotCaption(scene: string, code: string): string {
  const set = CAPTIONS[scene as SceneId];
  if (!set) return "WaveKat Voice";
  return set[code] ?? set.en;
}
