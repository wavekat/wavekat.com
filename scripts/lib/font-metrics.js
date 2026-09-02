// Minimal TrueType metrics reader — just enough to measure a string's advance
// width so the OG card can wrap its title on real numbers instead of a guess.
//
// Reads `head` (unitsPerEm), `hhea`/`hmtx` (advance widths) and `cmap`
// (character → glyph id, formats 4 and 12). Everything else in the file is
// ignored: we never rasterise here, resvg does that.

import { readFileSync } from 'node:fs';

function tableDirectory(buf) {
  const tables = new Map();
  // A .ttc holds several fonts; take the first one's directory offset.
  let base = 0;
  if (buf.toString('ascii', 0, 4) === 'ttcf') base = buf.readUInt32BE(12);
  const numTables = buf.readUInt16BE(base + 4);
  for (let i = 0; i < numTables; i++) {
    const rec = base + 12 + i * 16;
    tables.set(buf.toString('ascii', rec, rec + 4), {
      offset: buf.readUInt32BE(rec + 8),
      length: buf.readUInt32BE(rec + 12),
    });
  }
  return tables;
}

/** cmap format 4: BMP ranges. Returns Map<codepoint, glyphId>. */
function parseCmap4(buf, off, out) {
  const segCountX2 = buf.readUInt16BE(off + 6);
  const segCount = segCountX2 / 2;
  const endsAt = off + 14;
  const startsAt = endsAt + segCountX2 + 2;
  const deltasAt = startsAt + segCountX2;
  const rangesAt = deltasAt + segCountX2;

  for (let s = 0; s < segCount; s++) {
    const end = buf.readUInt16BE(endsAt + s * 2);
    const start = buf.readUInt16BE(startsAt + s * 2);
    if (start > end) continue;
    const delta = buf.readInt16BE(deltasAt + s * 2);
    const rangeOffset = buf.readUInt16BE(rangesAt + s * 2);

    for (let cp = start; cp <= end && cp !== 0xffff; cp++) {
      let gid;
      if (rangeOffset === 0) {
        gid = (cp + delta) & 0xffff;
      } else {
        const gi = rangesAt + s * 2 + rangeOffset + (cp - start) * 2;
        if (gi + 1 >= buf.length) continue;
        gid = buf.readUInt16BE(gi);
        if (gid !== 0) gid = (gid + delta) & 0xffff;
      }
      if (gid) out.set(cp, gid);
    }
  }
}

/** cmap format 12: full Unicode, grouped ranges. */
function parseCmap12(buf, off, out) {
  const nGroups = buf.readUInt32BE(off + 12);
  for (let g = 0; g < nGroups; g++) {
    const rec = off + 16 + g * 12;
    const start = buf.readUInt32BE(rec);
    const end = buf.readUInt32BE(rec + 4);
    const startGid = buf.readUInt32BE(rec + 8);
    // Guard against pathological fonts claiming enormous ranges.
    if (end - start > 0x30000) continue;
    for (let cp = start; cp <= end; cp++) out.set(cp, startGid + (cp - start));
  }
}

function parseCmap(buf, off) {
  const out = new Map();
  const numTables = buf.readUInt16BE(off + 2);
  // Prefer a format 12 subtable (full Unicode) over format 4 (BMP only).
  let best = null;
  for (let i = 0; i < numTables; i++) {
    const rec = off + 4 + i * 8;
    const platform = buf.readUInt16BE(rec);
    const encoding = buf.readUInt16BE(rec + 2);
    const subOff = off + buf.readUInt32BE(rec + 4);
    const format = buf.readUInt16BE(subOff);
    const unicode =
      platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10));
    if (!unicode) continue;
    const rank = format === 12 ? 2 : format === 4 ? 1 : 0;
    if (rank && (!best || rank > best.rank)) best = { rank, subOff, format };
  }
  if (!best) return out;
  if (best.format === 12) parseCmap12(buf, best.subOff, out);
  else parseCmap4(buf, best.subOff, out);
  return out;
}

/**
 * Load a font's measuring tables.
 * @returns {{unitsPerEm:number, advance:(cp:number)=>number|undefined}}
 */
export function loadFontMetrics(path) {
  const buf = readFileSync(path);
  const tables = tableDirectory(buf);
  const head = tables.get('head');
  const hhea = tables.get('hhea');
  const hmtx = tables.get('hmtx');
  const cmap = tables.get('cmap');
  if (!head || !hhea || !hmtx || !cmap) {
    throw new Error(`${path}: missing a required table (head/hhea/hmtx/cmap)`);
  }

  const unitsPerEm = buf.readUInt16BE(head.offset + 18);
  const numHMetrics = buf.readUInt16BE(hhea.offset + 34);
  const charToGid = parseCmap(buf, cmap.offset);

  // hmtx stores numHMetrics (advance, lsb) pairs; every glyph past that reuses
  // the last advance — the monospaced tail typical of CJK fonts.
  const lastAdvance = buf.readUInt16BE(hmtx.offset + (numHMetrics - 1) * 4);

  const advance = (cp) => {
    const gid = charToGid.get(cp);
    if (gid === undefined) return undefined; // not in this font
    if (gid >= numHMetrics) return lastAdvance;
    return buf.readUInt16BE(hmtx.offset + gid * 4);
  };

  return { unitsPerEm, advance, has: (cp) => charToGid.has(cp) };
}

/**
 * Width of `text` in px at `fontSize`, measured across a font stack: each
 * character is measured by the first font that actually has a glyph for it,
 * which is how resvg will pick a font too.
 */
export function measure(text, fonts, fontSize) {
  let total = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    let w;
    for (const f of fonts) {
      const a = f.advance(cp);
      if (a !== undefined) {
        w = (a / f.unitsPerEm) * fontSize;
        break;
      }
    }
    // Unknown everywhere: assume a full em, the worst case for CJK fallback.
    total += w ?? fontSize;
  }
  return total;
}
