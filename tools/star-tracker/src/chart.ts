// Chart renderer: builds an SVG from one or more cumulative star timelines.
// One series → filled area + line (the merged tenant view).
// Many series → stacked areas + legend (per-repo "split" view); the top of
// the stack equals the tenant total when the caller includes an "others" bucket.

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

// The "others" bucket gets a muted slate so it visually recedes behind the
// named repos. Detected by label prefix — see index.ts.
const OTHERS_COLOR = { light: '#94a3b8', dark: '#475569' };
function seriesColor(idx: number, label: string, theme: 'light' | 'dark'): string {
  if (label.startsWith('others ')) return OTHERS_COLOR[theme];
  return SPLIT_COLORS[idx % SPLIT_COLORS.length];
}

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

// Bucket points by x-pixel and keep first + last of each bucket. For step-after
// cumulative curves this is visually indistinguishable from the raw data once
// rendered, at a fraction of the SVG size.
function downsample(points: TimelinePoint[], maxBuckets: number, tMin: number, tMax: number): TimelinePoint[] {
  if (points.length <= maxBuckets * 2) return points;
  const span = Math.max(1, tMax - tMin);
  const out: TimelinePoint[] = [];
  let curBucket = -1;
  let bFirst: TimelinePoint | null = null;
  let bLast: TimelinePoint | null = null;
  const flush = () => {
    if (!bFirst) return;
    out.push(bFirst);
    if (bLast && bLast !== bFirst) out.push(bLast);
  };
  for (const pt of points) {
    const b = Math.min(maxBuckets - 1, Math.max(0, Math.floor(((pt.t - tMin) / span) * maxBuckets)));
    if (b !== curBucket) {
      flush();
      curBucket = b;
      bFirst = pt;
      bLast = pt;
    } else {
      bLast = pt;
    }
  }
  flush();
  return out;
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
  const allPointsRaw = series.flatMap((s) => s.points);
  const hasData = allPointsRaw.length >= 1;
  let tMin = Date.now() - 30 * 86400_000;
  let tMax = Date.now();
  let yMax = 1;
  if (hasData) {
    tMin = Infinity;
    tMax = -Infinity;
    for (const pt of allPointsRaw) {
      if (pt.t < tMin) tMin = pt.t;
      if (pt.t > tMax) tMax = pt.t;
    }
  }

  // Downsample each series to ~one bucket per x-pixel. Above this resolution
  // extra points just bloat the SVG without changing any visible pixel.
  const maxBuckets = isSplit ? Math.max(64, Math.floor(PW / 2)) : Math.max(128, PW);
  if (hasData) {
    series = series.map((s) => ({ label: s.label, points: downsample(s.points, maxBuckets, tMin, tMax) }));
  }

  // In stacked mode, the y domain is the top of the stack — sum of each series'
  // cumulative at the latest timestamp.
  let stackTs: number[] = [];
  let stackTop: number[][] = [];
  let stackBot: number[][] = [];
  if (isSplit && hasData) {
    const tsSet = new Set<number>();
    for (const s of series) for (const pt of s.points) tsSet.add(pt.t);
    stackTs = [...tsSet].sort((a, b) => a - b);

    // For each series, compute its cumulative at-or-before every ts.
    const valueAt: number[][] = series.map((s) => {
      const col: number[] = new Array(stackTs.length);
      let idx = 0;
      let cur = 0;
      for (let j = 0; j < stackTs.length; j++) {
        while (idx < s.points.length && s.points[idx].t <= stackTs[j]) {
          cur = s.points[idx].total;
          idx += 1;
        }
        col[j] = cur;
      }
      return col;
    });

    stackBot = new Array(series.length);
    stackTop = new Array(series.length);
    for (let i = 0; i < series.length; i++) {
      const bot = i === 0 ? new Array(stackTs.length).fill(0) : stackTop[i - 1];
      const top: number[] = new Array(stackTs.length);
      for (let j = 0; j < stackTs.length; j++) top[j] = bot[j] + valueAt[i][j];
      stackBot[i] = bot;
      stackTop[i] = top;
    }
    const finalTop = stackTop[stackTop.length - 1];
    for (const v of finalTop) if (v > yMax) yMax = v;
  } else if (hasData) {
    for (const s of series) for (const pt of s.points) if (pt.total > yMax) yMax = pt.total;
  }

  const tx = (t: number) => M.left + ((t - tMin) / Math.max(1, tMax - tMin)) * PW;
  const ty = (v: number) => M.top + PH - (v / yMax) * PH;

  // -- Per-series paths ----------------------------------------------------
  // Step-after: stars are discrete; the cumulative stays flat between events.
  const seriesSvg: string[] = [];
  let summaryTotal = 0;

  if (isSplit && hasData) {
    // Stacked areas: for each series, build a polygon between its bottom and
    // top step curves. Step-after between adjacent timestamps means the value
    // stays flat until the next event.
    const N = stackTs.length;
    for (let i = 0; i < series.length; i++) {
      const top = stackTop[i];
      const bot = stackBot[i];
      const color = seriesColor(i, series[i].label, opts.theme);
      const cmds: string[] = [];
      cmds.push(`M${tx(stackTs[0]).toFixed(0)},${ty(top[0]).toFixed(0)}`);
      for (let j = 1; j < N; j++) {
        const x = tx(stackTs[j]).toFixed(0);
        cmds.push(`L${x},${ty(top[j - 1]).toFixed(0)}`);
        cmds.push(`L${x},${ty(top[j]).toFixed(0)}`);
      }
      // Extend the last flat segment out to tMax (= last timestamp by construction).
      cmds.push(`L${tx(tMax).toFixed(0)},${ty(top[N - 1]).toFixed(0)}`);
      // Drop to bottom curve and walk back to the start.
      cmds.push(`L${tx(tMax).toFixed(0)},${ty(bot[N - 1]).toFixed(0)}`);
      for (let j = N - 1; j > 0; j--) {
        const x = tx(stackTs[j]).toFixed(0);
        cmds.push(`L${x},${ty(bot[j]).toFixed(0)}`);
        cmds.push(`L${x},${ty(bot[j - 1]).toFixed(0)}`);
      }
      cmds.push(`L${tx(stackTs[0]).toFixed(0)},${ty(bot[0]).toFixed(0)}`);
      cmds.push('Z');
      seriesSvg.push(
        `<path class="st-stack" d="${cmds.join(' ')}" fill="${color}" fill-opacity="0.85" stroke="${color}" stroke-width="0.5"/>`,
      );
      summaryTotal += series[i].points.length ? series[i].points[series[i].points.length - 1].total : 0;
    }
  } else {
    series.forEach((s) => {
      if (s.points.length < 1) return;
      const color = p.line;
      const cmds: string[] = [];
      cmds.push(`M${tx(s.points[0].t).toFixed(0)},${ty(s.points[0].total).toFixed(0)}`);
      for (let i = 1; i < s.points.length; i++) {
        const x = tx(s.points[i].t).toFixed(0);
        const yPrev = ty(s.points[i - 1].total).toFixed(0);
        const yCur = ty(s.points[i].total).toFixed(0);
        cmds.push(`L${x},${yPrev}`, `L${x},${yCur}`);
      }
      const xEnd = tx(tMax).toFixed(0);
      const yEnd = ty(s.points[s.points.length - 1].total).toFixed(0);
      cmds.push(`L${xEnd},${yEnd}`);
      const line = cmds.join(' ');
      const area = `${line} L${xEnd},${(M.top + PH).toFixed(0)} L${tx(s.points[0].t).toFixed(0)},${(M.top + PH).toFixed(0)} Z`;
      seriesSvg.push(`<path class="st-area" d="${area}" fill="${p.fill}"/>`);
      seriesSvg.push(
        `<path class="st-line" d="${line}" pathLength="1" stroke="${color}" stroke-width="2" fill="none" stroke-linejoin="round"/>`,
      );
      summaryTotal += s.points[s.points.length - 1].total;
    });
  }

  const yTicks = niceTicks(0, yMax, 5);
  const xTickCount = 5;
  const xTicks: number[] = [];
  for (let i = 0; i <= xTickCount; i++) xTicks.push(tMin + ((tMax - tMin) * i) / xTickCount);

  const gridLines = yTicks.map((v) => {
    const y = ty(v).toFixed(0);
    return `<line x1="${M.left}" y1="${y}" x2="${M.left + PW}" y2="${y}" stroke="${p.grid}" stroke-width="1"/>`;
  }).join('');

  const yLabels = yTicks.map((v) => {
    const y = ty(v).toFixed(0);
    return `<text x="${M.left - 10}" y="${y}" fill="${p.muted}" font-size="11" text-anchor="end" dominant-baseline="middle">${fmtInt(v)}</text>`;
  }).join('');

  const fmtDate = pickDateFmt(tMax - tMin);
  const xLabels = xTicks.map((t, i) => {
    const x = tx(t).toFixed(0);
    const anchor = i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle';
    return `<text x="${x}" y="${H - M.bottom + 20}" fill="${p.muted}" font-size="11" text-anchor="${anchor}">${fmtDate(t)}</text>`;
  }).join('');

  const hasOthers = isSplit && series[series.length - 1]?.label.startsWith('others ');
  const summary = isSplit
    ? `${hasOthers ? `top ${series.length - 1} + others` : `${series.length} repos`} · ${fmtInt(summaryTotal)} stars`
    : `${fmtInt(hasData ? series[0]?.points[series[0].points.length - 1]?.total ?? 0 : 0)} GitHub stars`;

  const legendSvg = isSplit
    ? legendPositions.map((pos, idx) => {
        const color = seriesColor(idx, series[idx].label, opts.theme);
        const x = 64 + pos.x;
        const y = legendY0 + pos.y;
        return `<rect x="${x}" y="${y}" width="10" height="10" fill="${color}" rx="2"/>` +
          `<text x="${x + 16}" y="${y + 8}" fill="${p.fg}" font-size="11">${escapeXml(legendLabels[idx])}</text>`;
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
    .st-stack { opacity: 0; animation: st-fade 1.0s ease-out forwards; }
    @keyframes st-draw { to { stroke-dashoffset: 0; } }
    @keyframes st-fade { to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .st-line { animation: none; stroke-dashoffset: 0; }
      .st-area, .st-stack { animation: none; opacity: 1; }
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
