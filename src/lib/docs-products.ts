// Display labels for each product slug. Keep in sync with sync-docs.js `sources`.
// `short` is used in tight UI (sidebar section header).
// `long` is used where the full product name reads better (back link, etc.).
type ProductLabels = { short: string; long: string };

const LABELS: Record<string, ProductLabels> = {
  voice: { short: 'Voice', long: 'WaveKat Voice' },
  cli:   { short: 'CLI',   long: 'WaveKat CLI' },
  lab:   { short: 'Lab',   long: 'WaveKat Lab' },
  vad:   { short: 'VAD',   long: 'WaveKat VAD' },
  turn:  { short: 'Turn',  long: 'WaveKat Turn' },
  asr:   { short: 'ASR',   long: 'WaveKat ASR' },
  tts:   { short: 'TTS',   long: 'WaveKat TTS' },
  core:  { short: 'Core',  long: 'WaveKat Core' },
};

export function productLabel(slug: string, form: 'short' | 'long' = 'long'): string {
  return LABELS[slug]?.[form] ?? slug;
}
