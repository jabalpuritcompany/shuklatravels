/**
 * Dancewala Studio — shared layout / component factory.
 * ------------------------------------------------------------------
 * Pure string templates. Output is fully static HTML (no client-side
 * rendering of navigation, footer or primary content) so every internal
 * link and every word of copy is crawlable and works without JavaScript.
 */

import { BUSINESS, SITE_URL, ANALYTICS, CREDIT } from './config.js';
import { NAV, CLASSES, CHOREOGRAPHY } from './data.js';

/* ================================================================== *
 * Utilities
 * ================================================================== */

export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Width buckets produced by tools/build-images.mjs */
const WIDTH_BUCKETS = {
  hero: [640, 1024, 1600, 1920],
  'hero/': [640, 1024, 1600, 1920],
  seo: [1200],
};
const defaultWidths = (key) => {
  for (const [prefix, widths] of Object.entries(WIDTH_BUCKETS)) {
    if (key.startsWith(prefix)) return widths;
  }
  return [400, 800, 1200];
};

/**
 * Responsive <img>. Width/height are always emitted so the browser can
 * reserve space (protects CLS).
 */
export function img(key, alt, opts = {}) {
  const {
    sizes = '(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw',
    w = 800,
    h = Math.round((w * 3) / 4),
    cls = '',
    loading = 'lazy',
    fetchpriority,
    widths,
  } = opts;
  const list = widths || defaultWidths(key);
  const srcset = list.map((x) => `/assets/images/${key}-${x}.webp ${x}w`).join(', ');
  const src = `/assets/images/${key}-${list.includes(w) ? w : list[list.length - 1]}.webp`;
  const fp = fetchpriority ? ` fetchpriority="${fetchpriority}"` : '';
  return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" class="${cls}" loading="${loading}" decoding="async"${fp}>`;
}

/* ================================================================== *
 * Buttons
 * ================================================================== */

export const btn = (href, label, variant = 'primary', extra = '') =>
  `<a class="btn btn--${variant}" href="${href}"${extra}>${esc(label)}</a>`;

export const waLink = (text) =>
  `${BUSINESS.whatsappHref}?text=${encodeURIComponent(text)}`;

export const WA_DEFAULT_MSG =
  `Hello Dancewala Studio,\n\nI would like to enquire about your dance classes.\n\nPlease share available class timings and further details.`;

export const waBtn = (label, msg = WA_DEFAULT_MSG, variant = 'whatsapp') =>
  `<a class="btn btn--${variant}" href="${waLink(msg)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;

export const callBtn = (label = 'Call Now', variant = 'ghost') =>
  btn(BUSINESS.phoneHref, label, variant);

/* ================================================================== *
 * Head / document shell
 * ================================================================== */

export function head(page) {
  const {
    title,
    description,
    url,
    canonical = SITE_URL + url,
    ogImage = '/assets/images/seo/dancewala-social-share-1200.webp',
    ogType = 'website',
    robots = page.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1',
    preload = null,
    jsonld = [],
    schema = true,
    styles = [],
  } = page;

  const graph = schema
    ? [localBusinessSchema(), ...jsonld]
    : jsonld;

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0B0713">
<meta name="format-detection" content="telephone=no">

<!-- Progressive enhancement flag: lets CSS hold back reveal animations only
     when JavaScript is actually available (no flash of hidden content). -->
<script>document.documentElement.classList.add("js");</script>

<!-- Open Graph -->
<meta property="og:site_name" content="${esc(BUSINESS.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE_URL}${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(BUSINESS.logo.alt)}">
<meta property="og:locale" content="en_IN">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE_URL}${ogImage}">

<!-- Favicons & web app -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="/assets/images/logo/favicon.png" sizes="64x64">
<link rel="apple-touch-icon" href="/assets/images/logo/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Analytics placeholders — IDs intentionally blank, see tools/site/config.js -->
<meta name="google-site-verification" content="${ANALYTICS.GSC_VERIFICATION}">

<!-- Stylesheets are small, same-origin and immutable-cached, so they are
     served as normal blocking <link>s: no FOUC, no CLS, one round-trip.
     (Deliberately no icon fonts, no CSS framework, no web-font request.) -->
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/responsive.css">
${styles.map((href) => '<link rel="stylesheet" href="' + href + '">').join('\n')}

${preload ? `<link rel="preload" as="image" href="${preload}" fetchpriority="high">` : ''}

<script type="application/ld+json">
${JSON.stringify(graph.length === 1 ? graph[0] : { '@context': 'https://schema.org', '@graph': graph }, null, 1)}
</script>
</head>`;
}

/* ================================================================== *
 * Structured data
 * ================================================================== */

export function localBusinessSchema() {
  const b = BUSINESS;
  const s = {
    '@context': 'https://schema.org',
    '@type': b.type,
    '@id': `${SITE_URL}/#studio`,
    name: b.name,
    legalName: b.legalName,
    url: SITE_URL + '/',
    description: b.description,
    telephone: b.phone,
    email: b.email,
    image: `${SITE_URL}/assets/images/seo/dancewala-social-share-1200.webp`,
    logo: `${SITE_URL}${b.logo.desktop}`,
    priceRange: 'Contact for details',
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.street,
      addressLocality: b.city,
      addressRegion: b.region,
      postalCode: b.postcode,
      addressCountry: b.country,
    },
    sameAs: [b.social.instagram, b.social.youtube, b.social.googleBusiness].filter(Boolean),
    areaServed: { '@type': 'City', name: 'Gurugram' },
    makesOffer: [...CLASSES, ...CHOREOGRAPHY].map((c) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: c.title, description: c.short },
    })),
  };
  if (b.geo && b.geo.lat && b.geo.lng) {
    s.geo = { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng };
  }
  if (b.openingHours) s.openingHoursSpecification = b.openingHours;
  return s;
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      item: SITE_URL + t.url,
    })),
  };
}

/** Only used where the FAQ is genuinely visible on the page. */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function webPageSchema(page, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': SITE_URL + page.url + '#webpage',
    url: SITE_URL + page.url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': SITE_URL + '/#website' },
    about: { '@id': SITE_URL + '/#studio' },
    ...(trail ? { breadcrumb: { '@id': SITE_URL + page.url + '#breadcrumb' } } : {}),
  };
}

/* ================================================================== *
 * Header
 * ================================================================== */

function navItem(item, isMobile) {
  const hasKids = item.children && item.children.length;
  if (!hasKids) {
    return `<li class="nav__item"><a class="nav__link" href="${item.url}">${esc(item.label)}</a></li>`;
  }
  if (isMobile) {
    return `<li class="nav__item nav__item--group">
      <button class="nav__link nav__link--toggle" type="button" aria-expanded="false" aria-controls="m-sub-${slug(item.label)}">
        <span>${esc(item.label)}</span>
        <svg class="nav__chev" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <ul class="nav__sub" id="m-sub-${slug(item.label)}" hidden>
        <li><a class="nav__sublink" href="${item.url}">All ${esc(item.label)}</a></li>
        ${item.children.map((c) => `<li><a class="nav__sublink" href="${c.url}">${esc(c.label)}</a></li>`).join('\n        ')}
      </ul>
    </li>`;
  }
  return `<li class="nav__item nav__item--has-menu">
    <a class="nav__link" href="${item.url}" aria-haspopup="true" aria-expanded="false">${esc(item.label)}
      <svg class="nav__chev" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <div class="nav__menu"><ul>
      ${item.children.map((c) => `<li><a href="${c.url}">${esc(c.label)}</a></li>`).join('\n      ')}
    </ul></div>
  </li>`;
}

export const slug = (s) =>
  String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function header(activeUrl = '/') {
  const markActive = (html) =>
    html.replace(/href="([^"]+)"/g, (m, href) =>
      href === activeUrl ? `${m} aria-current="page"` : m);

  return `<a class="skip-link" href="#main">Skip to content</a>

<!-- ============================ HEADER ============================ -->
<header class="site-header" data-header>
  <div class="topbar">
    <div class="container topbar__inner">
      <p class="topbar__meta">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>
        <span>${esc(BUSINESS.street)}, ${esc(BUSINESS.city)}, ${esc(BUSINESS.region)} ${esc(BUSINESS.postcode)}</span>
      </p>
      <ul class="topbar__links">
        <li><a href="${BUSINESS.phoneHref}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 3h3l1.6 4-2 1.4a11 11 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
          ${esc(BUSINESS.phone)}</a></li>
        <li><a href="${BUSINESS.whatsappHref}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 11.6A8.4 8.4 0 0 1 7.9 18L4 19.5l1.6-3.7A8.4 8.4 0 1 1 20.5 11.6Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.2 8.6c.3-.6.6-.6.9-.6h.7c.2 0 .5 0 .7.5l.9 2c.1.3 0 .5-.1.7l-.5.7c-.2.2-.3.4-.1.7a6.6 6.6 0 0 0 2.8 2.5c.3.1.5 0 .7-.2l.7-.8c.2-.2.4-.3.7-.1l2 .9c.3.2.4.3.4.5v1c-.1.3-.6.8-1 .9-.5.1-1 .2-3.1-.6a10.6 10.6 0 0 1-4.7-4c-.3-.5-.7-1.3-.7-2.2 0-1 .5-1.5.7-1.7Z" fill="currentColor"/></svg>
          WhatsApp ${esc(BUSINESS.whatsapp)}</a></li>
      </ul>
    </div>
  </div>

  <div class="header-main">
    <div class="container header-main__inner">
      <a class="brand" href="/" aria-label="${esc(BUSINESS.logo.alt)}">
        <img class="brand__logo brand__logo--desktop" src="${BUSINESS.logo.desktop}" alt="${esc(BUSINESS.logo.alt)}" width="190" height="52">
        <img class="brand__logo brand__logo--mobile" src="${BUSINESS.logo.mobile}" alt="${esc(BUSINESS.logo.alt)}" width="44" height="44">
      </a>

      <nav class="nav nav--desktop" aria-label="Primary">
        <ul class="nav__list">
          ${markActive(NAV.map((i) => navItem(i, false)).join('\n          '))}
        </ul>
      </nav>

      <div class="header-actions">
        <a class="header-actions__icon" href="${BUSINESS.phoneHref}" aria-label="Call Dancewala Studio on ${esc(BUSINESS.phone)}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 3h3l1.6 4-2 1.4a11 11 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </a>
        <a class="header-actions__icon header-actions__icon--wa" href="${BUSINESS.whatsappHref}" target="_blank" rel="noopener noreferrer" aria-label="Message Dancewala Studio on WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 11.6A8.4 8.4 0 0 1 7.9 18L4 19.5l1.6-3.7A8.4 8.4 0 1 1 20.5 11.6Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.2 8.6c.3-.6.6-.6.9-.6h.7c.2 0 .5 0 .7.5l.9 2c.1.3 0 .5-.1.7l-.5.7c-.2.2-.3.4-.1.7a6.6 6.6 0 0 0 2.8 2.5c.3.1.5 0 .7-.2l.7-.8c.2-.2.4-.3.7-.1l2 .9c.3.2.4.3.4.5v1c-.1.3-.6.8-1 .9-.5.1-1 .2-3.1-.6a10.6 10.6 0 0 1-4.7-4c-.3-.5-.7-1.3-.7-2.2 0-1 .5-1.5.7-1.7Z" fill="currentColor"/></svg>
        </a>
        <a class="btn btn--primary btn--sm header-cta" href="/booking/">Book Now</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu" data-nav-toggle>
          <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- ======================== MOBILE NAV PANEL ====================== -->
<div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
  <div class="mobile-nav__scrim" data-nav-close></div>
  <div class="mobile-nav__panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="mobile-nav__head">
      <img class="mobile-nav__logo" src="${BUSINESS.logo.mobile}" alt="" width="40" height="40">
      <button class="mobile-nav__close" type="button" aria-label="Close menu" data-nav-close>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
    <nav class="nav nav--mobile" aria-label="Mobile">
      <ul class="nav__list">
        ${markActive(NAV.map((i) => navItem(i, true)).join('\n        '))}
      </ul>
    </nav>
    <div class="mobile-nav__actions">
      <a class="btn btn--primary btn--block" href="/booking/">Book Now</a>
      <div class="mobile-nav__pair">
        <a class="btn btn--outline btn--block" href="${BUSINESS.phoneHref}">Call Now</a>
        <a class="btn btn--whatsapp btn--block" href="${BUSINESS.whatsappHref}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </div>
  </div>
</div>`;
}

/* ================================================================== *
 * Footer
 * ================================================================== */

export function footer() {
  const classesLinks = CLASSES.map((c) => `<li><a href="/dance-classes/${c.slug}/">${esc(c.title)}</a></li>`).join('\n            ');
  const choreoLinks = CHOREOGRAPHY.map(
    (c) => `<li><a href="/choreography/${c.slug}/">${esc(c.title)}</a></li>`
  ).join('\n            ');

  const socials = [
    { key: 'instagram', label: 'Instagram', icon: '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/>' },
    { key: 'youtube', label: 'YouTube', icon: '<rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor"/>' },
    { key: 'facebook', label: 'Facebook', icon: '<path d="M14.5 8.5h2.2V5.6h-2.4c-2 0-3.2 1.2-3.2 3.3v1.6H9.4v3h1.7V21h3.4v-7.5h2.2l.4-3h-2.6V9.4c0-.6.3-.9 1-.9Z" fill="currentColor"/>' },
    { key: 'whatsapp', label: 'WhatsApp', icon: '<path d="M20.5 11.6A8.4 8.4 0 0 1 7.9 18L4 19.5l1.6-3.7A8.4 8.4 0 1 1 20.5 11.6Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.2 8.6c.3-.6.6-.6.9-.6h.7c.2 0 .5 0 .7.5l.9 2c.1.3 0 .5-.1.7l-.5.7c-.2.2-.3.4-.1.7a6.6 6.6 0 0 0 2.8 2.5c.3.1.5 0 .7-.2l.7-.8c.2-.2.4-.3.7-.1l2 .9c.3.2.4.3.4.5v1c-.1.3-.6.8-1 .9-.5.1-1 .2-3.1-.6a10.6 10.6 0 0 1-4.7-4c-.3-.5-.7-1.3-.7-2.2 0-1 .5-1.5.7-1.7Z" fill="currentColor"/>' },
    { key: 'googleBusiness', label: 'Google Maps', icon: '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/>' },
  ];
  const socialHref = {
    instagram: BUSINESS.social.instagram,
    youtube: BUSINESS.social.youtube,
    facebook: BUSINESS.social.facebook,
    whatsapp: BUSINESS.whatsappHref,
    googleBusiness: BUSINESS.social.googleBusiness,
  };
  const socialIcons = socials
    .filter((s) => socialHref[s.key])
    .map(
      (s) => `<a class="social-icon" href="${socialHref[s.key]}" target="_blank" rel="noopener noreferrer" aria-label="${esc(BUSINESS.name)} on ${esc(s.label)}" title="${esc(s.label)}">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${s.icon}</svg>
      </a>`
    )
    .join('\n      ');

  const socialLinks = socials
    .filter((s) => socialHref[s.key] && ['instagram', 'youtube', 'googleBusiness'].includes(s.key))
    .map(
      (s) => `<a class="footer-social__link" href="${socialHref[s.key]}" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${s.icon}</svg>
        <span>${esc(s.key === 'googleBusiness' ? 'Google Business Profile' : s.label)}</span>
      </a>`
    )
    .join('\n      ');

  return `<!-- ============================ FOOTER ============================ -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col footer-col--brand">
        <img class="footer__logo" src="${BUSINESS.logo.desktop}" alt="${esc(BUSINESS.logo.alt)}" width="180" height="49" loading="lazy">
        <p class="footer__about">A dance studio in Sector 46, Gurugram. Weekly classes for kids, teens and adults, choreography for weddings and events, and workshops that end on a stage. Book online in a few taps.</p>
        <address class="footer__address">
          <span>${esc(BUSINESS.name)}</span>
          Building 19, Second Floor, Huda Market,<br>
          Sector 46, ${esc(BUSINESS.city)}, ${esc(BUSINESS.region)} ${esc(BUSINESS.postcode)}<br>
          ${esc(BUSINESS.countryName)}
        </address>
        <ul class="footer__contact">
          <li><a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></li>
          <li><a href="${BUSINESS.whatsappHref}" target="_blank" rel="noopener noreferrer">WhatsApp ${esc(BUSINESS.whatsapp)}</a></li>
          <li><a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h2 class="footer__title">Quick Links</h2>
        <ul class="footer__links">
          <li><a href="/">Home</a></li>
          <li><a href="/about-us/">About Us</a></li>
          <li><a href="/our-story/">Our Story</a></li>
          <li><a href="/why-dancewala/">Why Dancewala</a></li>
          <li><a href="/instructors/">Instructor / Team</a></li>
          <li><a href="/contact-us/">Contact Us</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h2 class="footer__title">Dance Classes</h2>
        <ul class="footer__links">
            ${classesLinks}
        </ul>
      </div>

      <div class="footer-col">
        <h2 class="footer__title">Services &amp; Support</h2>
        <ul class="footer__links">
            ${choreoLinks}
          <li><a href="/workshops-events/">Workshops</a></li>
          <li><a href="/gallery/">Gallery</a></li>
          <li><a href="/my-account/">My Account</a></li>
          <li><a href="/my-bookings/">My Bookings</a></li>
          <li><a href="/booking/"><strong>Book Now</strong></a></li>
        </ul>
      </div>
    </div>

    <div class="footer-social">
      ${socialLinks}
    </div>

    <div class="footer-pay">
      <div class="footer-pay__icons" aria-label="Payment methods supported after gateway integration">
        ${['UPI', 'Card', 'NetBanking', 'Wallet']
          .map(
            (m) => `<span class="pay-chip" aria-hidden="true">${m}</span>`
          )
          .join('\n        ')}
      </div>
      <p class="footer-pay__note">Payment gateways are not live yet. Once the backend integration is complete, UPI, cards, net banking and wallet options will be offered by the selected gateway.</p>
    </div>

    <div class="footer-legal">
      <h2 class="footer__title footer__title--sm">Payment &amp; Legal</h2>
      <ul class="footer__links footer__links--inline">
        <li><a href="/privacy-policy/">Privacy Policy</a></li>
        <li><a href="/terms-and-conditions/">Terms &amp; Conditions</a></li>
        <li><a href="/refund-cancellation-policy/">Refund &amp; Cancellation Policy</a></li>
        <li><a href="/shipping-delivery-policy/">Shipping &amp; Delivery Policy</a></li>
        <li><a href="/disclaimer/">Disclaimer</a></li>
        <li><a href="/contact-us/">Contact Us</a></li>
      </ul>
    </div>

    <div class="footer-bottom">
      <p class="footer__copy">&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(BUSINESS.name)}. All Rights Reserved.</p>
      <div class="social-icons">
      ${socialIcons}
      </div>
      <p class="footer__credit">${esc(CREDIT.prefix)} <a href="${CREDIT.url}" target="_blank" rel="noopener noreferrer">${esc(CREDIT.label)}</a></p>
    </div>
  </div>
</footer>

<!-- Floating mobile action bar -->
<div class="actionbar" data-actionbar>
  <a class="actionbar__btn actionbar__btn--call" href="${BUSINESS.phoneHref}">Call Now</a>
  <a class="actionbar__btn actionbar__btn--wa" href="${BUSINESS.whatsappHref}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
  <a class="actionbar__btn actionbar__btn--trial" href="/booking/">Book Now</a>
</div>`;
}

/* ================================================================== *
 * Page-level components
 * ================================================================== */

export function breadcrumbs(trail) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    ${trail
      .map(
        (t, i) =>
          `<li${i === trail.length - 1 ? ' aria-current="page"' : ''}>${
            i === trail.length - 1
              ? `<span>${esc(t.label)}</span>`
              : `<a href="${t.url}">${esc(t.label)}</a>`
          }</li>`
      )
      .join('\n    <li aria-hidden="true" class="breadcrumbs__sep">/</li>\n    ')}
  </ol>
</nav>`;
}

export function sectionHead({ eyebrow, title, text, align = 'center', light = false }) {
  return `<header class="section-head ${align === 'left' ? 'section-head--left' : ''} ${light ? 'section-head--light' : ''}" data-reveal>
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h2 class="section-title">${title}</h2>
    ${text ? `<p class="section-text">${text}</p>` : ''}
  </header>`;
}

export function classCard(c) {
  return `<article class="card card--class" data-reveal>
  <a class="card__media" href="/dance-classes/${c.slug}/" tabindex="-1" aria-hidden="true">
    ${img(c.image, c.alt, { sizes: '(min-width: 1080px) 30vw, (min-width: 700px) 45vw, 90vw', w: 800, h: 600, cls: 'card__img' })}
  </a>
  <div class="card__body">
    <h3 class="card__title"><a href="/dance-classes/${c.slug}/">${esc(c.title)}</a></h3>
    <p class="card__text">${esc(c.short)}</p>
    <a class="link-arrow" href="/dance-classes/${c.slug}/">Learn More
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </div>
</article>`;
}

export function choreoCard(c) {
  return `<article class="card card--class" data-reveal>
  <a class="card__media" href="/choreography/${c.slug}/" tabindex="-1" aria-hidden="true">
    ${img(c.image, c.alt, { sizes: '(min-width: 1080px) 30vw, (min-width: 700px) 45vw, 90vw', w: 800, h: 600, cls: 'card__img' })}
  </a>
  <div class="card__body">
    <h3 class="card__title"><a href="/choreography/${c.slug}/">${esc(c.title)}</a></h3>
    <p class="card__text">${esc(c.short)}</p>
    <a class="link-arrow" href="/choreography/${c.slug}/">Learn More
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </div>
</article>`;
}

/** Reusable event card — renders from data, or an empty state when none exist. */
export function eventCard(e) {
  return `<article class="card card--event" data-reveal>
  <div class="event-card__date">
    <span class="event-card__day">${esc(String(e.day ?? '—'))}</span>
    <span class="event-card__month">${esc(e.month ?? '')}</span>
  </div>
  <div class="card__body">
    <h3 class="card__title">${esc(e.title)}</h3>
    <p class="event-card__meta">${esc(e.location ?? BUSINESS.city)}</p>
    <p class="card__text">${esc(e.short ?? '')}</p>
    ${e.url ? `<a class="link-arrow" href="${e.url}">View Details
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>` : ''}
  </div>
</article>`;
}

export const eventEmptyState = () => `<div class="empty-state" data-reveal>
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="5" width="17" height="15.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  <h3 class="empty-state__title">New workshops and events will be announced here.</h3>
  <p class="empty-state__text">Workshop dates are shared once they are confirmed. Until then, the fastest way to hear about the next batch is to message the studio or send an enquiry.</p>
  <div class="empty-state__actions">
    ${waBtn('Ask on WhatsApp', 'Hello Dancewala Studio,\n\nI would like to know about upcoming dance workshops. Please share the schedule when it is announced.')}
    ${btn('/contact-us/#enquiry', 'Send an Enquiry', 'outline')}
  </div>
</div>`;

export function faqAccordion(faqs, heading = 'Frequently Asked Questions') {
  return `<div class="faq" data-reveal>
  <h2 class="section-title section-title--sm">${esc(heading)}</h2>
  <div class="faq__list">
    ${faqs
      .map(
        (f, i) => `<details class="faq__item"${i === 0 ? ' open' : ''}>
      <summary class="faq__q">${esc(f.q)}
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </summary>
      <div class="faq__a"><p>${esc(f.a)}</p></div>
    </details>`
      )
      .join('\n    ')}
  </div>
</div>`;
}

export function ctaBand({
  title = 'Ready to Dance?',
  text = 'Take your first step with Dancewala Studio.',
  light = false,
} = {}) {
  return `<section class="cta-band ${light ? 'cta-band--light' : ''}">
  <div class="container cta-band__inner" data-reveal>
    <div class="cta-band__copy">
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="cta-band__actions">
      ${btn('/booking/', 'Book Now', 'primary')}
      ${waBtn('WhatsApp Us')}
      ${callBtn('Call Now', 'ghost')}
    </div>
  </div>
</section>`;
}

export function locationSection() {
  return `<section class="section location" aria-labelledby="location-heading">
  <div class="container location__grid">
    <div class="location__copy" data-reveal>
      <p class="eyebrow">Find Us</p>
      <h2 class="section-title section-title--sm" id="location-heading">Visit Dancewala Studio</h2>
      <address class="location__address">
        <strong>${esc(BUSINESS.name)}</strong><br>
        Building 19, Second Floor,<br>
        Huda Market, Sector 46,<br>
        ${esc(BUSINESS.city)}, ${esc(BUSINESS.region)} ${esc(BUSINESS.postcode)}
      </address>
      <p class="location__note">The studio sits on the second floor above Huda Market in Sector 46. If you cannot find the entrance, call us and we will guide you up.</p>
      <div class="location__actions">
        <a class="btn btn--primary" href="${BUSINESS.directionsUrl}" target="_blank" rel="noopener noreferrer">Get Directions</a>
        <a class="btn btn--outline" href="${BUSINESS.social.googleBusiness}" target="_blank" rel="noopener noreferrer">View on Google Maps</a>
      </div>
    </div>
    <div class="location__map" data-reveal>
      <!-- No API key is used. Replace with an embedded map once a key is configured
           server-side; see SECURITY.md. -->
      <a class="map-card" href="${BUSINESS.directionsUrl}" target="_blank" rel="noopener noreferrer">
        <span class="map-card__pin" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" fill="currentColor"/></svg>
        </span>
        <span class="map-card__label">Open in Google Maps</span>
        <span class="map-card__addr">Sector 46, ${esc(BUSINESS.city)}, ${esc(BUSINESS.region)} ${esc(BUSINESS.postcode)}</span>
      </a>
    </div>
  </div>
</section>`;
}

/** Document wrapper */
export function page(pageDef) {
  const { body, url, jsonld = [], trail, preload, footerExtra = '' } = pageDef;
  const allLd = [...jsonld];
  if (trail) allLd.push(breadcrumbSchema(trail));
  return `${head({ ...pageDef, jsonld: allLd, preload })}
<body class="${pageDef.bodyClass || ''}">
${header(url)}
<main id="main">
${trail ? `<div class="container">${breadcrumbs(trail)}</div>` : ''}
${body}
${footerExtra}
</main>
${footer()}
${pageDef.beforeScripts || ''}

<!-- Runtime JS: all deferred, no framework, no jQuery.
     main.js boots first and initialises every registered module.
     Only the modules a page actually needs are loaded. -->
<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/navigation.js" defer></script>
${(pageDef.scripts || ['slider', 'gallery', 'form-handler', 'forms', 'seo'])
  .map((m) => '<script src="/assets/js/' + m + '.js" defer></script>')
  .join('\n')}
</body>
</html>`;
}
