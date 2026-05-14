// Display labels for each product slug. Keep in sync with sync-docs.js `sources`.
// `short` is used in tight UI (sidebar section header).
// `long` is used where the full product name reads better (back link, etc.).
type ProductLabels = { short: string; long: string };

const LABELS: Record<string, ProductLabels> = {
  voice: { short: 'Voice', long: 'WaveKat Voice' },
  vad:   { short: 'VAD',   long: 'WaveKat VAD' },
  turn:  { short: 'Turn',  long: 'WaveKat Turn' },
  core:  { short: 'Core',  long: 'WaveKat Core' },
  lab:   { short: 'Lab',   long: 'WaveKat Lab' },
  tts:   { short: 'TTS',   long: 'WaveKat TTS' },
  cli:   { short: 'CLI',   long: 'WaveKat CLI' },
  sip:   { short: 'SIP',   long: 'WaveKat SIP' },
  asr:   { short: 'ASR',   long: 'WaveKat ASR' },
};

export function productLabel(slug: string, form: 'short' | 'long' = 'long'): string {
  return LABELS[slug]?.[form] ?? slug;
}
