#!/usr/bin/env node
/**
 * Dancewala Studio — static site build
 * ------------------------------------------------------------------
 *   node tools/build.mjs
 *
 * Reads every module in tools/site/pages/ and writes fully static HTML to
 * clean, directory-style URLs (/about-us/ -> about-us/index.html) plus
 * robots.txt, sitemap.xml, site.webmanifest and an optional .htaccess.
 *
 * Static output matters: navigation, footer and body copy are all real HTML,
 * so the site is crawlable and readable without JavaScript.
 */

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve, posix } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { SITE_URL, BUSINESS } from './site/config.js';
import { page } from './site/layout.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_DIR = join(ROOT, 'tools/site/pages');

/** /about-us/  ->  <root>/about-us/index.html */
const outPath = (url) =>
  url === '/'
    ? join(ROOT, 'index.html')
    : join(ROOT, url.replace(/^\/|\/$/g, ''), 'index.html');

async function loadPages() {
  const files = (await readdir(PAGES_DIR)).filter((f) => f.endsWith('.js')).sort();
  const pages = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(join(PAGES_DIR, f)).href);
    for (const key of Object.keys(mod)) {
      const def = mod[key];
      if (def && typeof def === 'object' && def.url && def.body) pages.push(def);
    }
  }
  return pages;
}

/* ------------------------------------------------------------------ *
 * robots.txt
 * ------------------------------------------------------------------ */
const robots = () => `# Dancewala Studio — robots.txt
# Allow all public pages; no admin, no query-parameter URLs exist yet.

User-agent: *
Allow: /

# Nothing worth crawling is disallowed. Kept explicit for clarity.
Disallow: /tools/
Disallow: /node_modules/
Disallow: /assets/images/_src/

Sitemap: ${SITE_URL}/sitemap.xml
`;

/* ------------------------------------------------------------------ *
 * sitemap.xml
 * ------------------------------------------------------------------ */
const sitemap = (pages) => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => p.noindex !== true)
    .map((p) => {
      const loc = SITE_URL + (p.url === '/' ? '/' : p.url);
      const priority = p.url === '/' ? '1.0' : p.url.split('/').filter(Boolean).length === 1 ? '0.8' : '0.7';
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

/* ------------------------------------------------------------------ *
 * site.webmanifest
 * ------------------------------------------------------------------ */
const manifest = () =>
  JSON.stringify(
    {
      name: `${BUSINESS.name} — Dance Classes in Gurugram`,
      short_name: BUSINESS.name,
      description: BUSINESS.description,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#0B0713',
      theme_color: '#0B0713',
      lang: 'en-IN',
      icons: [
        { src: '/assets/images/logo/favicon.png', sizes: '64x64', type: 'image/png' },
        { src: '/assets/images/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    null,
    2
  ) + '\n';

/* ------------------------------------------------------------------ *
 * .htaccess — optional. Not required for the clean directory URLs used
 * here; provided for the cPanel/Apache deployment (HTTPS, caching, GZIP).
 * ------------------------------------------------------------------ */
const htaccess = () => `# Dancewala Studio — Apache / cPanel deployment notes
# ---------------------------------------------------------------------
# This project uses directory-style URLs (/about-us/index.html), so clean
# URLs already work without rewriting. The rules below add HTTPS, caching
# and compression. Rename this file to ".htaccess" on the server, or copy
# its contents into the existing one.
# It is shipped as "htaccess.example" so local static servers ignore it.

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Force HTTPS
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Canonical host: no "www"
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]

  # Strip a stray index.html if one is ever requested directly
  RewriteCond %{THE_REQUEST} /index\\.html [NC]
  RewriteRule ^(.*/)index\\.html$ /$1 [R=301,L]
</IfModule>

# ---------- Compression ----------
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json image/svg+xml application/manifest+json
</IfModule>

# ---------- Browser caching ----------
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html            "access plus 0 seconds"
  ExpiresByType text/css             "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp           "access plus 1 year"
  ExpiresByType image/png            "access plus 1 year"
  ExpiresByType image/jpeg           "access plus 1 year"
  ExpiresByType image/svg+xml        "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(webp|png|jpg|jpeg|svg|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

# ---------- Error documents ----------
ErrorDocument 404 /404/
`;

/* ------------------------------------------------------------------ *
 * build
 * ------------------------------------------------------------------ */
async function run() {
  const pages = await loadPages();
  if (!pages.length) {
    console.error('No pages found in tools/site/pages/');
    process.exit(1);
  }

  for (const p of pages) {
    const ld = typeof p.jsonld === 'function' ? p.jsonld() : p.jsonld || [];
    const html = page({ ...p, jsonld: ld });
    const file = outPath(p.url);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, 'utf8');
    console.log(`${p.url.padEnd(46)} -> ${file.replace(ROOT + '/', '')}`);
  }

  await writeFile(join(ROOT, 'robots.txt'), robots(), 'utf8');
  await writeFile(join(ROOT, 'sitemap.xml'), sitemap(pages), 'utf8');
  await writeFile(join(ROOT, 'site.webmanifest'), manifest(), 'utf8');
  await writeFile(join(ROOT, 'htaccess.example'), htaccess(), 'utf8');

  console.log(`\nBuilt ${pages.length} pages + robots.txt, sitemap.xml, site.webmanifest`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
