// Chart renderer: builds an SVG from one or more cumulative star timelines.
// One series → filled area + line (the merged tenant view).
// Many series → N lines + legend, no fill (per-repo "split" view).

export type TimelinePoint = { t: number; total: number };

export type Series = { label: string; points: TimelinePoint[] };

export type ChartOptions = {
  title: string;
  theme: 'light' | 'dark';
  width?: number;
  height?: number;
  // When true, the chart includes data from at least one curve-sampled
  // repo. Renders a small disclosure next to the watermark so embedders
  // know the curve isn't strictly per-star accurate.
  sampled?: boolean;
};

const PALETTE = {
  light: { bg: '#ffffff', fg: '#0f172a', muted: '#64748b', grid: '#e2e8f0', line: '#2196f3', fill: 'rgba(33,150,243,0.12)' },
  dark:  { bg: '#0b0f17', fg: '#e2e8f0', muted: '#64748b', grid: '#1e293b', line: '#22d3ee', fill: 'rgba(34,211,238,0.14)' },
};

// Categorical palette for split mode. Pulled from the WaveKat brand colors —
// they're picked to read on both light and dark backgrounds.
const SPLIT_COLORS = [
  '#2196f3', '#ff4081', '#00e676', '#ffd740',
  '#7c4dff', '#00bcd4', '#f44336', '#3f51b5',
];

function fmtInt(n: number): string {
  return n.toLocaleString('en-US');
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Pick a label format granular enough that adjacent ticks won't collide.
// Coarser formats look cleaner but duplicate when the span is short.
function pickDateFmt(spanMs: number): (ms: number) => string {
  const day = 86400_000;
  const days = spanMs / day;
  if (days <= 2) return (ms) => {
    const d = new Date(ms);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
  };
  if (days <= 180) return (ms) => {
    const d = new Date(ms);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
  };
  if (days <= 365 * 4) return (ms) => {
    const d = new Date(ms);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
  };
  return (ms) => `${new Date(ms).getUTCFullYear()}`;
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

export function renderSVG(series: Series[], opts: ChartOptions): string {
  const W = opts.width ?? 900;
  const H = opts.height ?? 420;
  const p = PALETTE[opts.theme];
  const isSplit = series.length > 1;

  // -- Legend layout (split mode) ------------------------------------------
  // Greedy wrap across rows; only used to know how much top margin to
  // reserve before we compute the plot area.
  const legendRowH = 18;
  const legendY0 = 44;
  const legendLabels = series.map((s) => truncate(s.label, 24));
  const legendPositions: { x: number; y: number }[] = [];
  let legendRows = 0;
  if (isSplit) {
    const avail = W - 64 - 32;
    let cx = 0;
    let row = 0;
    for (const label of legendLabels) {
      const chipW = 10 + 6 + Math.ceil(label.length * 6.5) + 16;
      if (cx + chipW > avail && cx > 0) {
        cx = 0;
        row += 1;
      }
      legendPositions.push({ x: cx, y: row * legendRowH });
      cx += chipW;
    }
    legendRows = legendPositions.length ? row + 1 : 0;
  }
  const legendBlock = isSplit ? legendRows * legendRowH + 8 : 0;

  const M = { top: 56 + legendBlock, right: 32, bottom: 48, left: 64 };
  const PW = W - M.left - M.right;
  const PH = H - M.top - M.bottom;

  // -- Domain --------------------------------------------------------------
  const allPoints = series.flatMap((s) => s.points);
  const hasData = allPoints.length >= 1;
  let tMin = Date.now() - 30 * 86400_000;
  let tMax = Date.now();
  let yMax = 1;
  if (hasData) {
    tMin = Infinity;
    tMax = -Infinity;
    yMax = 1;
    for (const pt of allPoints) {
      if (pt.t < tMin) tMin = pt.t;
      if (pt.t > tMax) tMax = pt.t;
      if (pt.total > yMax) yMax = pt.total;
    }
  }

  const tx = (t: number) => M.left + ((t - tMin) / Math.max(1, tMax - tMin)) * PW;
  const ty = (v: number) => M.top + PH - (v / yMax) * PH;

  // -- Per-series paths ----------------------------------------------------
  // Step-after: stars are discrete; the cumulative stays flat between events.
  const seriesSvg: string[] = [];
  let summaryTotal = 0;
  series.forEach((s, idx) => {
    if (s.points.length < 1) return;
    const color = isSplit ? SPLIT_COLORS[idx % SPLIT_COLORS.length] : p.line;
    const cmds: string[] = [];
    cmds.push(`M${tx(s.points[0].t).toFixed(1)},${ty(s.points[0].total).toFixed(1)}`);
    for (let i = 1; i < s.points.length; i++) {
      const x = tx(s.points[i].t).toFixed(1);
      const yPrev = ty(s.points[i - 1].total).toFixed(1);
      const yCur = ty(s.points[i].total).toFixed(1);
      cmds.push(`L${x},${yPrev}`, `L${x},${yCur}`);
    }
    // Extend the last value out to the right edge so the line reaches "now".
    const xEnd = tx(tMax).toFixed(1);
    const yEnd = ty(s.points[s.points.length - 1].total).toFixed(1);
    cmds.push(`L${xEnd},${yEnd}`);
    const line = cmds.join(' ');

    if (!isSplit) {
      const area = `${line} L${xEnd},${(M.top + PH).toFixed(1)} L${tx(s.points[0].t).toFixed(1)},${(M.top + PH).toFixed(1)} Z`;
      seriesSvg.push(`<path class="st-area" d="${area}" fill="${p.fill}"/>`);
    }
    seriesSvg.push(
      `<path class="st-line" d="${line}" pathLength="1" stroke="${color}" stroke-width="2" fill="none" stroke-linejoin="round"/>`,
    );
    summaryTotal += s.points[s.points.length - 1].total;
  });

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

  const fmtDate = pickDateFmt(tMax - tMin);
  const xLabels = xTicks.map((t, i) => {
    const x = tx(t).toFixed(1);
    const anchor = i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle';
    return `<text x="${x}" y="${H - M.bottom + 20}" fill="${p.muted}" font-size="11" text-anchor="${anchor}">${fmtDate(t)}</text>`;
  }).join('');

  const summary = isSplit
    ? `${series.length} repos · ${fmtInt(summaryTotal)} stars`
    : `${fmtInt(hasData ? series[0]?.points[series[0].points.length - 1]?.total ?? 0 : 0)} GitHub stars`;

  const legendSvg = isSplit
    ? legendPositions.map((pos, idx) => {
        const color = SPLIT_COLORS[idx % SPLIT_COLORS.length];
        const x = 64 + pos.x;
        const y = legendY0 + pos.y;
        return `<rect x="${x}" y="${y}" width="10" height="10" fill="${color}" rx="2"/>` +
          `<text x="${x + 16}" y="${y + 9}" fill="${p.fg}" font-size="11" dominant-baseline="middle">${escapeXml(legendLabels[idx])}</text>`;
      }).join('')
    : '';

  const chartBody = hasData
    ? seriesSvg.join('')
    : `<text x="${W / 2}" y="${H / 2}" fill="${p.muted}" font-size="13" text-anchor="middle">no data yet</text>`;

  // Line-draw animation: pathLength="1" normalises the line length so we can
  // animate stroke-dashoffset from 1→0 regardless of how many points there are.
  // CSS inside <style> works for SVG loaded via <img>; <script> would not.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
  <style>
    .st-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: st-draw 1.6s ease-out forwards; }
    .st-area { opacity: 0; animation: st-fade 1.6s ease-out forwards; }
    @keyframes st-draw { to { stroke-dashoffset: 0; } }
    @keyframes st-fade { to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .st-line { animation: none; stroke-dashoffset: 0; }
      .st-area { animation: none; opacity: 1; }
    }
  </style>
  <rect width="${W}" height="${H}" fill="${p.bg}"/>
  <text x="${M.left}" y="28" fill="${p.fg}" font-size="16" font-weight="700">${escapeXml(opts.title)}</text>
  <text x="${M.left + PW}" y="28" fill="${p.muted}" font-size="12" text-anchor="end">${summary}</text>
  ${legendSvg}
  ${gridLines}
  ${chartBody}
  ${yLabels}
  ${xLabels}
  ${opts.sampled ? `<text x="${M.left}" y="${H - 8}" fill="${p.muted}" font-size="10" text-anchor="start">≈ includes sampled data</text>` : ''}
  <text x="${M.left + PW}" y="${H - 8}" fill="${p.muted}" font-size="10" text-anchor="end">stars.wavekat.com</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
