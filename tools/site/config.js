/**
 * Dancewala Studio — single source of truth for business identity.
 * ------------------------------------------------------------------
 * Every page, schema, header, footer, CTA and booking screen reads from this
 * file so the business NAP (Name / Address / Phone) can never drift out of sync.
 */

export const SITE_URL = 'https://dancewalas.com';

export const BUSINESS = {
  name: 'Dancewala Studio',
  legalName: 'Dancewala Studio',
  type: 'DanceSchool', // schema.org LocalBusiness sub-type
  tagline: 'Move. Learn. Perform.',
  description:
    'Dancewala Studio is a dance studio in Sector 46, Gurugram. Book dance classes for kids and adults, wedding and sangeet choreography, workshops and performances online.',

  // ---- NAP — never reformat this address anywhere else -------------------
  street: 'Building 19, Second Floor, Huda Market, Sector 46',
  city: 'Gurugram',
  region: 'Haryana',
  postcode: '122003',
  country: 'IN',
  countryName: 'India',

  phone: '+91 9818501007',
  phoneHref: 'tel:+919818501007',
  whatsapp: '8796911005',
  whatsappHref: 'https://wa.me/918796911005',
  email: 'dancewalas@gmail.com',
  emailHref: 'mailto:dancewalas@gmail.com',

  social: {
    instagram: 'https://www.instagram.com/dancewalastudios/',
    youtube: 'https://www.youtube.com/@DancewalaStudio/',
    facebook: '', // TODO(CLIENT): add the official Facebook page URL, or leave blank to hide the icon
    googleBusiness:
      'https://www.google.com/maps/search/?api=1&query=Dancewala+Studio+Sector+46+Gurugram',
  },
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(
      'Dancewala Studio, Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003'
    ),

  geo: { lat: null, lng: null }, // TODO(CLIENT): add precise coordinates to enable geo schema

  logo: {
    desktop: '/assets/images/logo/dancewala-studio-logo.png',
    mobile: '/assets/images/logo/dancewala-studio-logo-mark.png',
    alt: 'Dancewala Studio - Dance Classes in Gurugram',
  },

  openingHours: null, // TODO(CLIENT): supply verified opening hours before publishing schema
};

export const CONTACT = BUSINESS;

/** Footer credit — do not remove without written permission. */
export const CREDIT = {
  label: 'JP Techno Park',
  url: 'https://www.jptechnopark.com/',
  prefix: 'Designed & Developed by',
};

/* ==================================================================== *
 * ANALYTICS — intentionally blank. Never ship fake IDs.
 * ==================================================================== */
export const ANALYTICS = {
  GA_MEASUREMENT_ID: '',
  GSC_VERIFICATION: '',
  META_PIXEL_ID: '',
};

/* ==================================================================== *
 * BOOKING / PAYMENT — FRONTEND PROTOTYPE CONFIGURATION
 * --------------------------------------------------------------------
 * Nothing here talks to a live server. Every value is a placeholder that
 * the future backend replaces. See assets/js/booking.js, payment.js and
 * authentication.js for the exact integration points.
 * ==================================================================== */

export const BOOKING = {
  /** Booking ID prefix used by the frontend demo only. */
  idPrefix: 'DW',
  /** Money formatting for the Indian market. */
  currency: 'INR',
  currencySymbol: '₹',
  locale: 'en-IN',

  /**
   * Service pricing.
   * `price: null` means the studio has not published a fee, so service pages
   * show "Price on request" — no fee is ever invented on a public page.
   * `demoPrice` is used ONLY inside the booking/payment prototype, which is
   * labelled as a frontend demonstration on every one of those screens.
   */
  pricing: {
    'kids-dance-classes': { price: null, demoPrice: 2500, unit: 'per month' },
    'adult-dance-classes': { price: null, demoPrice: 3000, unit: 'per month' },
    'beginner-dance-classes': { price: null, demoPrice: 2500, unit: 'per month' },
    'bollywood-dance': { price: null, demoPrice: 3000, unit: 'per month' },
    'hip-hop-dance': { price: null, demoPrice: 3000, unit: 'per month' },
    'contemporary-dance': { price: null, demoPrice: 3000, unit: 'per month' },
    'freestyle-dance': { price: null, demoPrice: 2500, unit: 'per month' },
    'wedding-choreography': { price: null, demoPrice: 25000, unit: 'per event' },
    'sangeet-choreography': { price: null, demoPrice: 25000, unit: 'per event' },
    'couple-choreography': { price: null, demoPrice: 15000, unit: 'per routine' },
    'family-group-choreography': { price: null, demoPrice: 20000, unit: 'per routine' },
    'event-choreography': { price: null, demoPrice: 20000, unit: 'per event' },
    'corporate-choreography': { price: null, demoPrice: 35000, unit: 'per event' },
    'dance-workshops': { price: null, demoPrice: 1500, unit: 'per workshop' },
    'special-workshops': { price: null, demoPrice: 1500, unit: 'per workshop' },
  },

  /** Demo tax rate used by the booking summary. Backend will replace this. */
  taxRatePercent: 18,

  /** Demo slot timings offered by the date/time step (frontend only). */
  slots: ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'],

  /** Booking steps used by the progress indicator. */
  steps: [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Details' },
    { n: 3, label: 'Login' },
    { n: 4, label: 'Schedule' },
    { n: 5, label: 'Payment' },
    { n: 6, label: 'Confirmation' },
  ],
};

/* ==================================================================== *
 * PAYMENT GATEWAYS — disabled, blank keys, frontend config only.
 * The backend must perform every charge and every verification.
 * ==================================================================== */
export const PAYMENT_GATEWAYS = {
  razorpay: { enabled: false, key: '', label: 'Razorpay' },
  cashfree: { enabled: false, clientId: '', label: 'Cashfree' },
  payu: { enabled: false, key: '', label: 'PayU' },
  phonepe: { enabled: false, clientId: '', label: 'PhonePe Payment Gateway' },
  stripe: { enabled: false, publishableKey: '', label: 'Stripe' },
};

/* ==================================================================== *
 * OAUTH — placeholders. No client secrets belong in frontend code, ever.
 * Only the public client IDs live here, and they stay blank until issued.
 * ==================================================================== */
export const OAUTH = {
  google: { enabled: false, clientId: '' },
  facebook: { enabled: false, appId: '' },
  instagram: { enabled: false, appId: '' },
};

/* ==================================================================== *
 * EMAIL — placeholders for the future transactional mailer.
 * ==================================================================== */
export const EMAIL = {
  ADMIN_EMAIL: 'dancewalas@gmail.com',
  FROM_EMAIL: 'dancewalas@gmail.com',
  /** Future server endpoint that triggers booking confirmation mail. */
  CUSTOMER_CONFIRMATION_ENDPOINT: '',
  ADMIN_NOTIFICATION_ENDPOINT: '',
};
