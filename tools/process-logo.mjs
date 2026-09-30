#!/usr/bin/env node
/**
 * Dancewala Studio — logo processing pipeline
 * ------------------------------------------------------------------
 *   node tools/process-logo.mjs <logo-file> [mark-file]
 *   node tools/process-logo.mjs --official <logo-file> [mark-file]
 *
 * Reads the official logo, keeps its exact proportions and colours, writes
 * every derivative the site needs, and prints the dominant colours so the
 * CSS palette can be matched to the brand.
 *
 * Run with no arguments to regenerate the derivatives from the current
 * placeholder artwork (useful for testing the pipeline).
 *
 * --official
 *   Writes the artwork to a NEW, unique filename and repoints every
 *   reference in the codebase to it. This guarantees no browser, CDN or
 *   service-worker cache can keep serving the old placeholder:
 *
 *     dancewala-studio-logo.png       -> dancewala-studio-official-logo.png
 *     dancewala-studio-logo-mark.png  -> dancewala-studio-official-logo-mark.png
 *     favicon.png                     -> favicon-official.png
 *     apple-touch-icon.png            -> apple-touch-icon-official.png
 *     favicon.ico                       (root; standard name kept, overwritten)
 *
 *   Files rewritten automatically:
 *     tools/site/config.js            desktop + mobile logo paths
 *     tools/site/layout.js            favicon + apple-touch-icon <link> tags
 *     tools/build.mjs                 webmanifest icons
 *     email-templates/*.html          email header logo (absolute URL)
 *
 *   Then: node tools/build.mjs
 *
 * Outputs (without --official, filenames stay stable):
 *   assets/images/logo/dancewala-studio-logo.png        desktop wordmark
 *   assets/images/logo/dancewala-studio-logo-mark.png   compact mark (mobile)
 *   assets/images/logo/favicon.png                      64px
 *   assets/images/logo/apple-touch-icon.png             180px
 *   favicon.ico                                          multi-size container
 *
 * Requires: npm i sharp   (dev-only, never shipped)
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOGO_DIR = join(ROOT, 'assets/images/logo');
mkdirSync(LOGO_DIR, { recursive: true });

const argv = process.argv.slice(2);
const OFFICIAL = argv.includes('--official');
const positional = argv.filter((a) => !a.startsWith('--'));
const argLogo = positional[0] || null;
const argMark = positional[1] || null;

if (OFFICIAL && !argLogo) {
  console.error('--official requires the official logo file as the first argument.');
  console.error('  e.g. node tools/process-logo.mjs --official ~/uploads/logo.png');
  process.exit(1);
}

/** Fall back to the placeholder artwork when no file is supplied. */
const PLACEHOLDER_WORDMARK = join(LOGO_DIR, '_placeholder-wordmark.svg');
const PLACEHOLDER_MARK = join(LOGO_DIR, '_placeholder-mark.svg');

const logoPath = argLogo ? resolve(process.cwd(), argLogo) : PLACEHOLDER_WORDMARK;
const markPath = argMark ? resolve(process.cwd(), argMark) : null;

/* ------------------------------------------------------------------ *
 * Output filenames — --official switches to unique, cache-busting names
 * ------------------------------------------------------------------ */
const SUFFIX = OFFICIAL ? '-official' : '';

const NAME_WORDMARK = `dancewala-studio${SUFFIX}-logo.png`;
const NAME_MARK = `dancewala-studio${SUFFIX}-logo-mark.png`;
const NAME_FAVICON = `favicon${SUFFIX}.png`;
const NAME_APPLE = `apple-touch-icon${SUFFIX}.png`;

const REL_WORDMARK = `/assets/images/logo/${NAME_WORDMARK}`;
const REL_MARK = `/assets/images/logo/${NAME_MARK}`;
const REL_FAVICON = `/assets/images/logo/${NAME_FAVICON}`;
const REL_APPLE = `/assets/images/logo/${NAME_APPLE}`;

async function pickSource(explicit, fallback) {
  if (explicit) {
    if (!existsSync(explicit)) {
      console.error(`File not found: ${explicit}`);
      process.exit(1);
    }
    return explicit;
  }
  if (existsSync(fallback)) return fallback;
  console.error(`Neither a source file nor ${fallback} exists.`);
  process.exit(1);
}

/* ------------------------------------------------------------------ *
 * Colour analysis
 * ------------------------------------------------------------------ */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
}

async function analysePalette(file) {
  // Trim uniform borders, then bucket the remaining pixels by hue.
  const base = sharp(file).trim({ threshold: 10 });
  const meta = await base.metadata();
  const hasAlpha = !!meta.hasAlpha;

  const { data, info } = await base
    .flatten({ background: '#ffffff' })
    .resize(160, 160, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  const buckets = new Map();

  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2];

    // Skip near-white and near-black — those are background/ink, not brand.
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max > 244 && max - min < 16) continue;
    if (max < 34) continue;

    const sat = max === 0 ? 0 : (max - min) / max;
    let h = 0;
    if (max !== min) {
      if (max === r) h = ((g - b) / (max - min)) % 6;
      else if (max === g) h = (b - r) / (max - min) + 2;
      else h = (r - g) / (max - min) + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    // 24 hue buckets (15° each), plus saturation weighting.
    const key = Math.floor(h / 15) * 15;
    const entry = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0, satSum: 0 };
    entry.n++;
    entry.r += r; entry.g += g; entry.b += b;
    entry.satSum += sat;
    buckets.set(key, entry);
  }

  const ranked = [...buckets.entries()]
    .map(([hue, v]) => ({
      hue,
      count: v.n,
      hex: rgbToHex(v.r / v.n, v.g / v.n, v.b / v.n),
      sat: v.satSum / v.n,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return { ranked, hasAlpha, width: meta.width, height: meta.height };
}

/* ------------------------------------------------------------------ *
 * Derivatives
 * ------------------------------------------------------------------ */
async function icoFromPng(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = size; entry[1] = size;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuffer]);
}

/* ------------------------------------------------------------------ *
 * Reference rewrite (only for --official)
 * ------------------------------------------------------------------ */
const REFERENCE_TARGETS = [
  'tools/site/config.js',
  'tools/site/layout.js',
  'tools/build.mjs',
  'email-templates/customer-booking-confirmation.html',
  'email-templates/admin-new-booking.html',
];

function patchReferences() {
  // Longest / most specific first so "-logo-mark" is never eaten by "-logo".
  const swaps = [
    ['/assets/images/logo/dancewala-studio-logo-mark.png', REL_MARK],
    ['/assets/images/logo/dancewala-studio-logo.png', REL_WORDMARK],
    ['/assets/images/logo/apple-touch-icon.png', REL_APPLE],
    ['/assets/images/logo/favicon.png', REL_FAVICON],
  ];
  // Absolute (production) URLs used by email templates + JSON-LD.
  const SITE_ORIGIN = 'https://dancewalas.com';
  const absSwaps = swaps.map(([from, to]) => [`${SITE_ORIGIN}${from}`, `${SITE_ORIGIN}${to}`]);
  const all = [...swaps, ...absSwaps].filter(([from, to]) => from !== to);

  const changed = [];
  for (const rel of REFERENCE_TARGETS) {
    const file = join(ROOT, rel);
    if (!existsSync(file)) continue;
    const before = readFileSync(file, 'utf8');
    let after = before;
    for (const [from, to] of all) after = after.split(from).join(to);
    if (after !== before) {
      writeFileSync(file, after, 'utf8');
      changed.push(rel);
    }
  }
  return changed;
}

function removeStaleFiles() {
  const stale = [
    'dancewala-studio-logo.png',
    'dancewala-studio-logo-mark.png',
    'favicon.png',
    'apple-touch-icon.png',
  ].filter((f) => ![NAME_WORDMARK, NAME_MARK, NAME_FAVICON, NAME_APPLE].includes(f));

  const removed = [];
  for (const f of stale) {
    const p = join(LOGO_DIR, f);
    if (existsSync(p)) {
      unlinkSync(p);
      removed.push(f);
    }
  }
  return removed;
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */
async function main() {
  const wordmark = await pickSource(argLogo ? logoPath : null, PLACEHOLDER_WORDMARK);
  const mark = markPath ? await pickSource(markPath, null) : null;

  console.log(OFFICIAL ? 'Mode            : OFFICIAL (unique filenames, cache-busted)' : 'Mode            : standard');
  console.log('Wordmark source :', wordmark.replace(ROOT + '/', ''));
  if (mark) console.log('Mark source     :', mark.replace(ROOT + '/', ''));

  const wm = await sharp(wordmark).metadata();
  console.log(`Wordmark size   : ${wm.width} x ${wm.height}  (ratio ${(wm.width / wm.height).toFixed(2)})`);
  console.log('');

  /* Desktop wordmark — height 96 for crisp 2x rendering */
  const wmHeight = 96;
  const wmWidth = Math.round((wm.width / wm.height) * wmHeight);
  await sharp(wordmark)
    .resize({ width: wmWidth, height: wmHeight, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(join(LOGO_DIR, NAME_WORDMARK));
  console.log(`  -> ${NAME_WORDMARK}  ${wmWidth} x ${wmHeight}`);

  /* Compact mark — square, from the mark file or the wordmark */
  const markSrc = mark || wordmark;
  await sharp(markSrc)
    .resize({ width: 128, height: 128, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(join(LOGO_DIR, NAME_MARK));
  console.log(`  -> ${NAME_MARK}  128 x 128`);

  /* Favicon 64 + apple touch 180 */
  const fav = await sharp(markSrc)
    .resize({ width: 64, height: 64, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await sharp(fav).toFile(join(LOGO_DIR, NAME_FAVICON));
  await sharp(markSrc)
    .resize({ width: 180, height: 180, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(join(LOGO_DIR, NAME_APPLE));
  await (await import('node:fs/promises')).writeFile(join(ROOT, 'favicon.ico'), await icoFromPng(fav, 64));
  console.log(`  -> ${NAME_FAVICON} 64 x 64 · ${NAME_APPLE} 180 x 180 · favicon.ico`);

  if (OFFICIAL) {
    console.log('');
    const changed = patchReferences();
    console.log('References repointed:');
    if (changed.length === 0) console.log('  (already up to date)');
    changed.forEach((f) => console.log(`  ~ ${f}`));

    const removed = removeStaleFiles();
    if (removed.length) {
      console.log('Stale files removed:');
      removed.forEach((f) => console.log(`  - assets/images/logo/${f}`));
    }
  }

  /* Palette */
  const { ranked, hasAlpha } = await analysePalette(wordmark);
  console.log('\nDominant colours (background and ink excluded):');
  ranked.forEach((c, i) => {
    console.log(
      `  ${i + 1}. ${c.hex}  hue ${String(c.hue).padStart(3)}°  sat ${(c.sat * 100).toFixed(0)}%  ${c.count} px`
    );
  });
  if (ranked.length) {
    const top = ranked[0];
    const second = ranked[1];
    console.log('\nSuggested CSS tokens (review before applying):');
    console.log(`  --primary  : ${top.hex}`);
    if (second) console.log(`  --accent   : ${second.hex}`);
    console.log(`  --secondary: ${hslToHex((top.hue + 40) % 360, 70, 46)}`);
  }
  console.log(`\nTransparency: ${hasAlpha ? 'yes' : 'no'}`);
  console.log('Done. Run "node tools/build.mjs" to rebuild the site.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
