// Chart renderer: builds an SVG from a cumulative star timeline, optionally
// rasterises to PNG via resvg-wasm.

export type TimelinePoint = { t: number; total: number };

export type ChartOptions = {
  title: string;
  theme: 'light' | 'dark';
  width?: number;
  height?: number;
};

const PALETTE = {
  light: { bg: '#ffffff', fg: '#0f172a', muted: '#64748b', grid: '#e2e8f0', line: '#2196f3', fill: 'rgba(33,150,243,0.12)' },
  dark:  { bg: '#0b0f17', fg: '#e2e8f0', muted: '#64748b', grid: '#1e293b', line: '#22d3ee', fill: 'rgba(34,211,238,0.14)' },
};

function fmtInt(n: number): string {
  return n.toLocaleString('en-US');
}

function fmtDate(ms: number): string {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function niceTicks(min: number, max: number, count = 5): number[] {
  if (max <= min) return [min];
  const range = max - min;
  const step = Math.pow(10, Math.floor(Math.log10(range / count)));
  const err = (range / count) / step;
  const mult = err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
  const tick = mult * step;
  const out: number[] = [];
  const start = Math.ceil(min / tick) * tick;
  for (let v = start; v <= max + 1e-9; v += tick) out.push(Math.round(v));
  return out;
}

export function renderSVG(points: TimelinePoint[], opts: ChartOptions): string {
  const W = opts.width ?? 900;
  const H = opts.height ?? 420;
  const M = { top: 56, right: 32, bottom: 48, left: 64 };
  const PW = W - M.left - M.right;
  const PH = H - M.top - M.bottom;
  const p = PALETTE[opts.theme];

  const hasData = points.length >= 1;
  const tMin = hasData ? points[0].t : Date.now() - 30 * 86400_000;
  const tMax = hasData ? points[points.length - 1].t : Date.now();
  const yMax = hasData ? Math.max(1, points[points.length - 1].total) : 1;

  const tx = (t: number) => M.left + ((t - tMin) / Math.max(1, tMax - tMin)) * PW;
  const ty = (v: number) => M.top + PH - (v / yMax) * PH;

  // Step-after path: stars are discrete; total stays flat between events.
  let line = '';
  let area = '';
  if (hasData) {
    const cmds: string[] = [];
    cmds.push(`M${tx(points[0].t).toFixed(1)},${ty(points[0].total).toFixed(1)}`);
    for (let i = 1; i < points.length; i++) {
      const x = tx(points[i].t).toFixed(1);
      const yPrev = ty(points[i - 1].total).toFixed(1);
      const yCur = ty(points[i].total).toFixed(1);
      cmds.push(`L${x},${yPrev}`, `L${x},${yCur}`);
    }
    // Extend the last value out to the right edge so the line reaches "now".
    const xEnd = tx(tMax).toFixed(1);
    const yEnd = ty(points[points.length - 1].total).toFixed(1);
    cmds.push(`L${xEnd},${yEnd}`);
    line = cmds.join(' ');
    area = `${line} L${xEnd},${(M.top + PH).toFixed(1)} L${tx(points[0].t).toFixed(1)},${(M.top + PH).toFixed(1)} Z`;
  }

  const yTicks = niceTicks(0, yMax, 5);
  const xTickCount = 5;
  const xTicks: number[] = [];
  for (let i = 0; i <= xTickCount; i++) xTicks.push(tMin + ((tMax - tMin) * i) / xTickCount);

  const gridLines = yTicks.map((v) => {
    const y = ty(v).toFixed(1);
    return `<line x1="${M.left}" y1="${y}" x2="${M.left + PW}" y2="${y}" stroke="${p.grid}" stroke-width="1"/>`;
  }).join('');

  const yLabels = yTicks.map((v) => {
    const y = ty(v).toFixed(1);
    return `<text x="${M.left - 10}" y="${y}" fill="${p.muted}" font-size="11" text-anchor="end" dominant-baseline="middle">${fmtInt(v)}</text>`;
  }).join('');

  const xLabels = xTicks.map((t, i) => {
    const x = tx(t).toFixed(1);
    const anchor = i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle';
    return `<text x="${x}" y="${H - M.bottom + 20}" fill="${p.muted}" font-size="11" text-anchor="${anchor}">${fmtDate(t)}</text>`;
  }).join('');

  const currentTotal = hasData ? points[points.length - 1].total : 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <rect width="${W}" height="${H}" fill="${p.bg}"/>
  <text x="${M.left}" y="28" fill="${p.fg}" font-size="16" font-weight="700">${escapeXml(opts.title)}</text>
  <text x="${M.left + PW}" y="28" fill="${p.muted}" font-size="12" text-anchor="end">${fmtInt(currentTotal)} total stars</text>
  ${gridLines}
  ${hasData ? `<path d="${area}" fill="${p.fill}"/><path d="${line}" stroke="${p.line}" stroke-width="2" fill="none" stroke-linejoin="round"/>` : `<text x="${W / 2}" y="${H / 2}" fill="${p.muted}" font-size="13" text-anchor="middle">no data yet</text>`}
  ${yLabels}
  ${xLabels}
  <text x="${M.left + PW}" y="${H - 8}" fill="${p.muted}" font-size="10" text-anchor="end">stars.wavekat.com</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// PNG rendering via resvg-wasm. The wasm module is statically imported so
// wrangler bundles it; we still init lazily so the cost (~1MB) is only paid
// on the first PNG request.
import { initWasm, Resvg } from '@resvg/resvg-wasm';
// @ts-expect-error — wrangler resolves the .wasm import to a WebAssembly.Module.
import resvgWasm from '@resvg/resvg-wasm/index_bg.wasm';

let resvgReady: Promise<void> | null = null;

function ensureResvg(): Promise<void> {
  if (!resvgReady) resvgReady = initWasm(resvgWasm);
  return resvgReady;
}

export async function renderPNG(svg: string): Promise<Uint8Array> {
  await ensureResvg();
  const resvg = new Resvg(svg, { fitTo: { mode: 'original' } });
  return resvg.render().asPng();
}
