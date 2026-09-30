/**
 * Flat service catalogue used by the booking wizard and payment screens.
 * Injected into those pages as a JSON island so the client-side JS never
 * duplicates content that already lives in data.js.
 *
 * FUTURE: replace the island with GET /api/services.
 */
import { CLASSES, CHOREOGRAPHY, WORKSHOP_TYPES } from './data.js';
import { BOOKING } from './config.js';

const toEntry = (item, category, baseUrl) => {
  const pricing = BOOKING.pricing[item.slug] || { price: null, demoPrice: 0, unit: '' };
  return {
    slug: item.slug,
    title: item.title,
    category,
    url: `${baseUrl}/${item.slug}/`,
    image: `/assets/images/${item.image}-800.webp`,
    alt: item.alt,
    price: pricing.price, // null => "Price on request", never invented on public pages
    demoPrice: pricing.demoPrice,
    unit: pricing.unit,
  };
};

export const SERVICE_CATALOG = [
  ...CLASSES.map((c) => toEntry(c, 'Dance Classes', '/dance-classes')),
  ...CHOREOGRAPHY.map((c) => toEntry(c, 'Choreography', '/choreography')),
  ...WORKSHOP_TYPES.filter((w) => ['dance-workshops', 'special-workshops'].includes(w.slug)).map((w) =>
    toEntry(w, 'Workshops & Events', '/workshops-events')
  ),
];

export const serviceJsonIsland = (id = 'dw-services') =>
  `<script type="application/json" id="${id}">${JSON.stringify(SERVICE_CATALOG)}</script>`;

export const BOOKING_STYLE = ['/assets/css/booking.css'];
