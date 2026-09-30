#!/usr/bin/env node
/**
 * Dancewala Studio — image build pipeline
 * ------------------------------------------------------------------
 * Converts the master images in `assets/images/_src/` into responsive
 * WebP derivatives used by the site.
 *
 *   node tools/build-images.mjs
 *
 * Rules
 *  - `_src/` holds the full-resolution masters (never served directly).
 *  - Every derivative is named  <name>-<width>.webp
 *  - Output folders mirror the site's image architecture.
 *  - If a master is missing, the optional `fallback` field is used so the
 *    site never renders a broken image while photography is in progress.
 *
 * Requires: npm i sharp   (dev-only, never shipped to production)
 */

import { mkdir, readdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'assets/images/_src');
const OUT = join(ROOT, 'assets/images');

/** @type {{src:string,dest:string,widths:number[],ratio?:number,fallback?:string}[]} */
const JOBS = [
  // ---- Hero slider (16:9) -------------------------------------------------
  { src: 'hero-dance-classes-gurugram.jpg', dest: 'hero/dance-classes-gurugram', widths: [640, 1024, 1600, 1920], ratio: 16 / 9 },
  { src: 'hero-kids-adult-classes.jpg', dest: 'hero/kids-adult-dance-classes', widths: [640, 1024, 1600, 1920], ratio: 16 / 9 },
  { src: 'hero-wedding-sangeet.jpg', dest: 'hero/wedding-sangeet-choreography', widths: [640, 1024, 1600, 1920], ratio: 16 / 9 },
  { src: 'hero-workshops-performances.jpg', dest: 'hero/workshops-performances', widths: [640, 1024, 1600, 1920], ratio: 16 / 9 },

  // ---- Dance classes (4:3) ------------------------------------------------
  { src: 'class-kids-dance.jpg', dest: 'classes/kids-dance-classes', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'class-adult-dance.jpg', dest: 'classes/adult-dance-classes', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'class-beginner-dance.jpg', dest: 'classes/beginner-dance-classes', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'class-bollywood-dance.jpg', dest: 'classes/bollywood-dance-classes', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'class-hip-hop-dance.jpg', dest: 'classes/hip-hop-dance-classes', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'class-contemporary-dance.jpg', dest: 'classes/contemporary-dance-classes', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'class-freestyle-dance.jpg', dest: 'classes/freestyle-dance-classes', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'class-contemporary-dance.png' },

  // ---- Choreography (4:3) -------------------------------------------------
  { src: 'cho-wedding.jpg', dest: 'choreography/wedding-choreography', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-wedding-sangeet.png' },
  { src: 'cho-sangeet.jpg', dest: 'choreography/sangeet-choreography', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-wedding-sangeet.png' },
  { src: 'cho-couple.jpg', dest: 'choreography/couple-choreography', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-wedding-sangeet.png' },
  { src: 'cho-family-group.jpg', dest: 'choreography/family-group-choreography', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-wedding-sangeet.png' },
  { src: 'cho-event.jpg', dest: 'choreography/event-choreography', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-workshops-performances.png' },
  { src: 'cho-corporate.jpg', dest: 'choreography/corporate-choreography', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-workshops-performances.png' },

  // ---- Editorial / story --------------------------------------------------
  { src: 'story-studio.jpg', dest: 'hero/studio-interior', widths: [640, 1024, 1600, 1920], ratio: 3 / 2 },
  { src: 'story-practice.jpg', dest: 'hero/practice-session', widths: [640, 1024, 1600, 1920], ratio: 3 / 2 },

  // ---- Workshops & events -------------------------------------------------
  { src: 'ev-workshop.jpg', dest: 'events/dance-workshop-session', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'class-adult-dance.png' },
  { src: 'ev-performance.jpg', dest: 'events/stage-performance', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-workshops-performances.png' },
  { src: 'ev-community.jpg', dest: 'events/community-event', widths: [400, 800, 1200], ratio: 4 / 3, fallback: 'hero-kids-adult-classes.png' },

  // ---- Gallery ------------------------------------------------------------
  { src: 'gal-01.jpg', dest: 'gallery/dancewala-studio-rehearsal', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'gal-02.jpg', dest: 'gallery/bollywood-routine-practice', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'gal-03.jpg', dest: 'gallery/hip-hop-batch-move', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'gal-04.jpg', dest: 'gallery/contemporary-floor-work', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'gal-05.jpg', dest: 'gallery/kids-batch-energy', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'gal-06.jpg', dest: 'gallery/sangeet-performance-night', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'gal-07.jpg', dest: 'gallery/group-formation', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'gal-08.jpg', dest: 'gallery/stage-light-performance', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'class-beginner-dance.jpg', dest: 'gallery/studio-warm-up', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'hero-kids-adult-classes.jpg', dest: 'gallery/freestyle-jam', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'cho-sangeet.jpg', dest: 'gallery/duet-choreography', widths: [400, 800, 1200], ratio: 4 / 3 },
  { src: 'hero-workshops-performances.jpg', dest: 'gallery/final-showcase', widths: [400, 800, 1200], ratio: 4 / 3 },

  // ---- Social share / OG --------------------------------------------------
  { src: 'social-share.jpg', dest: 'seo/dancewala-social-share', widths: [1200], ratio: 1200 / 630, fallback: 'cho-couple.png' },
];

const exists = async (p) => access(p).then(() => true).catch(() => false);

async function run() {
  if (!(await exists(SRC))) {
    console.error(`Missing source folder: ${SRC}`);
    process.exit(1);
  }

  const available = new Set(await readdir(SRC));
  let made = 0;
  const missing = [];

  for (const job of JOBS) {
    let file = job.src;
    if (!available.has(file) && job.fallback && available.has(job.fallback)) file = job.fallback;
    if (!available.has(file)) {
      missing.push(job.src);
      continue;
    }
    if (file !== job.src) missing.push(`${job.src} (using fallback ${file})`);

    const input = join(SRC, file);
    const meta = await sharp(input).metadata();
    const ratio = job.ratio ?? 3 / 2;

    for (const w of job.widths) {
      const h = Math.round(w / ratio);
      const outFile = join(OUT, `${job.dest}-${w}.webp`);
      await mkdir(dirname(outFile), { recursive: true });
      await sharp(input)
        .resize({ width: w, height: h, fit: 'cover', position: 'attention' })
        .webp({ quality: w > 1000 ? 76 : 80, effort: 5 })
        .toFile(outFile);
      made++;
    }
    // Expose intrinsic ratio for width/height attributes in markup.
    console.log(`${job.dest.padEnd(42)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} -> ${job.widths.length} sizes`);
  }

  console.log(`\nDone. ${made} derivatives written.`);
  if (missing.length) console.log(`Pending masters (${missing.length}):\n  - ${missing.join('\n  - ')}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
