/**
 * Booking wizard + payment screens.
 * Frontend prototype only — nothing is charged, nothing is stored server-side.
 */
import { BUSINESS, BOOKING, PAYMENT_GATEWAYS, SITE_URL } from '../config.js';
import { SERVICE_CATALOG, serviceJsonIsland, BOOKING_STYLE } from '../catalog.js';
import { esc, btn, waBtn, breadcrumbSchema, webPageSchema } from '../layout.js';

const money = (n) => BOOKING.currencySymbol + Number(n || 0).toLocaleString(BOOKING.locale);

const STEPPER = (active = 1) => `<ol class="stepper" data-booking-stepper>
  ${BOOKING.steps
    .map(
      (s) => `<li class="stepper__item${s.n === active ? ' is-current' : ''}${s.n < active ? ' is-done' : ''}" data-step="${s.n}">
    <span class="stepper__dot">${s.n}</span>
    <span class="stepper__label">${s.label}</span>
  </li>`
    )
    .join('\n  ')}
</ol>`;

const SERVICE_TILES = SERVICE_CATALOG.map(
  (s) => `<label class="service-tile" data-category="${esc(s.category)}">
    <input type="radio" name="service" value="${esc(s.slug)}">
    <span class="service-tile__media"><img src="${s.image}" alt="${esc(s.alt)}" width="92" height="72" loading="lazy" decoding="async"></span>
    <span class="service-tile__body">
      <strong>${esc(s.title)}</strong>
      <span>${esc(s.category)} · ${esc(s.unit)}</span>
    </span>
    <span class="service-tile__price">${s.price ? money(s.price) : 'Price on request'}</span>
  </label>`
).join('\n      ');

const SLOT_TILES = BOOKING.slots
  .map(
    (t) => `<label class="slot">
      <input type="radio" name="time" value="${esc(t)}">
      <span>${esc(t)}</span>
    </label>`
  )
  .join('\n        ');

const SUMMARY_ASIDE = `<aside class="booking-aside">
  <div class="summary-card" data-summary>
    <h2 class="summary-card__title">Booking Summary</h2>

    <div data-summary-empty>
      <p class="summary-empty">Pick a service and your booking summary will build itself here.</p>
    </div>

    <div data-summary-filled hidden>
      <div class="summary-card__hero">
        <img data-summary-img src="" alt="" width="68" height="56" loading="lazy">
        <span><strong data-summary-title></strong><span data-summary-category></span></span>
      </div>
      <dl class="summary-rows">
        <div class="summary-row"><dt>Service</dt><dd data-row="service"></dd></div>
        <div class="summary-row"><dt>Participants</dt><dd data-row="participants"></dd></div>
        <div class="summary-row"><dt>Date</dt><dd data-row="date"></dd></div>
        <div class="summary-row"><dt>Time</dt><dd data-row="time"></dd></div>
        <div class="summary-row"><dt>Base price</dt><dd data-row="base"></dd></div>
        <div class="summary-row"><dt>Discount</dt><dd data-row="discount"></dd></div>
        <div class="summary-row"><dt>Taxes</dt><dd data-row="tax"></dd></div>
        <div class="summary-row summary-row--total"><dt>Final amount</dt><dd data-row="total"></dd></div>
      </dl>
      <p class="form__note">Amounts are demonstration values for this frontend prototype. Final pricing is confirmed by the studio before payment.</p>
    </div>
  </div>

  <div class="summary-card">
    <h2 class="summary-card__title" style="font-size:1.05rem">Need help booking?</h2>
    <p style="color:var(--muted);font-size:0.94rem">Call ${esc(BUSINESS.phone)} or message us on WhatsApp and we will book it for you.</p>
    <div class="btn-row" style="margin-top:1rem">
      ${btn(BUSINESS.phoneHref, 'Call Now', 'outline')}
      ${waBtn('WhatsApp')}
    </div>
  </div>
</aside>`;

/* ==================================================================== *
 * /booking/
 * ==================================================================== */
export const bookingPage = {
  url: '/booking/',
  title: 'Book Dance Classes & Choreography Online | Dancewala Studio Gurugram',
  description:
    'Book dance classes, wedding choreography or a workshop with Dancewala Studio in Sector 46, Gurugram. Choose a service, pick a date and time, review your booking and pay online.',
  styles: BOOKING_STYLE,
  scripts: ['gallery', 'booking', 'authentication', 'seo'],
  beforeScripts: serviceJsonIsland(),
  trail: [{ label: 'Home', url: '/' }, { label: 'Book Now', url: '/booking/' }],
  jsonld: () => [webPageSchema(bookingPage, bookingPage.trail)],

  body: `<section class="section section--tight section--white">
  <div class="container">
    <div class="page-head">
      <p class="eyebrow">Online Booking</p>
      <h1>Book Your Slot at Dancewala Studio</h1>
      <p class="lede">Six short steps. Choose what you want to learn, tell us who it is for, pick a date and time, then review and pay.</p>
    </div>

    <div class="demo-notice" style="margin-bottom:2rem">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <span><strong>Frontend demonstration</strong>Booking, login and payment are not connected to a server yet. Nothing you enter here is submitted anywhere, and no payment can be made. The buttons below let you preview the confirmation screens.</span>
    </div>

    ${STEPPER(1)}

    <div class="booking-layout" data-booking-wizard>
      <div class="booking-main">

        <!-- STEP 1 ------------------------------------------------------ -->
        <section class="step-panel is-active" data-step="1" aria-labelledby="step1-title">
          <h2 class="step-title" id="step1-title">Select a Service</h2>
          <p class="step-sub">Choose what you would like to book. You can change this later.</p>
          <div class="service-picker">
      ${SERVICE_TILES}
          </div>
          <p class="field__error" data-service-msg aria-live="polite"></p>
          <div class="step-actions">
            <span></span>
            <button class="btn btn--primary" type="button" data-step-next>Continue Booking</button>
          </div>
        </section>

        <!-- STEP 2 ------------------------------------------------------ -->
        <section class="step-panel" data-step="2" aria-labelledby="step2-title">
          <h2 class="step-title" id="step2-title">Your Details</h2>
          <p class="step-sub">Just the basics for now. Add anything else you would like us to know.</p>
          <div class="form" style="box-shadow:none;border:0;padding:0">
            <div class="form__row form__row--2">
              <div class="field">
                <label for="b-name">Full Name <span class="req" aria-hidden="true">*</span></label>
                <input id="b-name" name="fullName" type="text" autocomplete="name" required data-label="Full name" aria-describedby="b-name-error">
                <p class="field__error" id="b-name-error" aria-live="polite"></p>
              </div>
              <div class="field">
                <label for="b-phone">Mobile Number <span class="req" aria-hidden="true">*</span></label>
                <input id="b-phone" name="mobile" type="tel" inputmode="numeric" autocomplete="tel" required data-role="phone" data-label="Mobile number" aria-describedby="b-phone-error" placeholder="10-digit mobile number">
                <p class="field__error" id="b-phone-error" aria-live="polite"></p>
              </div>
            </div>
            <div class="field">
              <label for="b-email">Email <span class="req" aria-hidden="true">*</span></label>
              <input id="b-email" name="email" type="email" autocomplete="email" required data-label="Email" aria-describedby="b-email-error">
              <p class="field__error" id="b-email-error" aria-live="polite"></p>
            </div>
            <div class="form__row form__row--2">
              <div class="field">
                <label for="b-age">Date of Birth / Age Group</label>
                <select id="b-age" name="ageGroup" aria-describedby="b-age-hint">
                  <option value="">Select one</option>
                  ${['Under 6', '6–10', '11–15', '16–20', '21–35', '36–50', '50+']
                    .map((a) => `<option>${a}</option>`)
                    .join('\n                  ')}
                </select>
                <p class="field__hint" id="b-age-hint">Helps us place you in the right batch.</p>
              </div>
              <div class="field">
                <label for="b-gender">Gender <span style="font-weight:400;color:var(--muted)">(optional)</span></label>
                <select id="b-gender" name="gender">
                  <option value="">Prefer not to say</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label for="b-participants">Number of Participants</label>
              <input id="b-participants" name="participants" type="number" min="1" max="50" value="1">
            </div>
            <div class="field">
              <label for="b-req">Special Requirements</label>
              <input id="b-req" name="requirements" type="text" placeholder="For example: complete beginner, knee injury, wheelchair access">
            </div>
            <div class="field">
              <label for="b-msg">Message</label>
              <textarea id="b-msg" name="message" rows="3" placeholder="Tell us about the event, the songs, or what you want to learn."></textarea>
            </div>
          </div>
          <div class="step-actions">
            <button class="btn btn--outline" type="button" data-step-back>Back</button>
            <button class="btn btn--primary" type="button" data-step-next>Continue Booking</button>
          </div>
        </section>

        <!-- STEP 3 ------------------------------------------------------ -->
        <section class="step-panel" data-step="3" aria-labelledby="step3-title">
          <h2 class="step-title" id="step3-title">Login / Register</h2>
          <p class="step-sub">Sign in to keep your bookings in one place — or continue without an account.</p>

          <div data-auth>
            <p class="form__status" data-auth-status role="status" hidden></p>
            <div class="oauth-list">
              <button class="oauth-btn oauth-btn--google" type="button" data-oauth="Google">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6Z"/><path fill="#34A853" d="M12 24c3 0 5.6-1 7.5-2.7l-3.7-2.9c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2.1v3A11.9 11.9 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.7 14.9a7.2 7.2 0 0 1 0-4.6V7.3H2.1a12 12 0 0 0 0 10.8l3.6-3.2Z"/><path fill="#EA4335" d="M12 4.8c1.6 0 3 .6 4.2 1.7l3.1-3.1A11.5 11.5 0 0 0 2.1 7.3l3.6 3c.9-2.7 3.4-4.5 6.3-4.5Z"/></svg>
                Continue with Google
              </button>
              <button class="oauth-btn oauth-btn--facebook" type="button" data-oauth="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1877F2" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5H15c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>
                Continue with Facebook
              </button>
              <button class="oauth-btn oauth-btn--instagram" type="button" data-oauth="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ig-g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".35" stop-color="#FA7E1E"/><stop offset=".6" stop-color="#D62976"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient></defs><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="url(#ig-g)"/><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="17" cy="7" r="1.2" fill="#fff"/></svg>
                Continue with Instagram
              </button>
            </div>
            <div class="divider">or</div>
            <div class="btn-row">
              <a class="btn btn--primary" href="/register/">Register Now</a>
              <a class="btn btn--outline" href="/login/">Sign In</a>
            </div>
          </div>

          <div class="step-actions">
            <button class="btn btn--outline" type="button" data-step-back>Back</button>
            <button class="btn btn--dark" type="button" data-demo-continue>Continue as Guest</button>
          </div>
        </section>

        <!-- STEP 4 ------------------------------------------------------ -->
        <section class="step-panel" data-step="4" aria-labelledby="step4-title">
          <h2 class="step-title" id="step4-title">Choose Date &amp; Time</h2>
          <p class="step-sub">Pick what suits you. The studio confirms the final slot with you directly.</p>

          <div class="form" style="box-shadow:none;border:0;padding:0">
            <div class="form__row form__row--2">
              <div class="field">
                <label for="b-date">Preferred Date <span class="req" aria-hidden="true">*</span></label>
                <input id="b-date" name="date" type="date" required data-label="Preferred date" aria-describedby="b-date-error">
                <p class="field__error" id="b-date-error" data-date-msg aria-live="polite"></p>
              </div>
              <div class="field" data-event-only>
                <label for="b-event-type">Event Type</label>
                <select id="b-event-type" name="eventType">
                  <option value="">Select one</option>
                  ${['Wedding', 'Sangeet', 'Cocktail / Reception', 'Birthday', 'Corporate', 'Other']
                    .map((o) => `<option>${o}</option>`)
                    .join('\n                  ')}
                </select>
              </div>
            </div>
            <div class="field">
              <span class="field__label" style="font-weight:700;font-size:.92rem">Preferred Time <span class="req" aria-hidden="true">*</span></span>
              <div class="slot-grid">
        ${SLOT_TILES}
              </div>
              <p class="field__error" data-time-msg aria-live="polite"></p>
            </div>
            <div class="field" data-event-only>
              <label for="b-venue">Event Venue</label>
              <input id="b-venue" name="venue" type="text" placeholder="Venue name and area, if known">
            </div>
          </div>

          <div class="step-actions">
            <button class="btn btn--outline" type="button" data-step-back>Back</button>
            <button class="btn btn--primary" type="button" data-step-next>Review Booking</button>
          </div>
        </section>

        <!-- STEP 5 ------------------------------------------------------ -->
        <section class="step-panel" data-step="5" aria-labelledby="step5-title">
          <h2 class="step-title" id="step5-title">Booking Summary</h2>
          <p class="step-sub">Check everything before you pay. You can still go back and change any detail.</p>

          <div class="demo-notice" style="margin-bottom:1.5rem">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3l9 16H3l9-16Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 9v5M12 17v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <span><strong>Prices shown are demonstration values</strong>Dancewala Studio confirms the actual fee with you before any payment is taken.</span>
          </div>

          <div class="form" style="box-shadow:none;border:0;padding:0">
            <div class="field">
              <label for="b-coupon">Coupon Code</label>
              <div style="display:flex;gap:.6rem;flex-wrap:wrap">
                <input id="b-coupon" name="coupon" type="text" placeholder="Enter a code" style="flex:1 1 180px">
                <button class="btn btn--outline" type="button" data-coupon-apply>Apply</button>
              </div>
              <p class="field__hint" data-coupon-msg></p>
            </div>
          </div>

          <div class="step-actions">
            <button class="btn btn--outline" type="button" data-step-back>Back</button>
            <button class="btn btn--primary btn--lg" type="button" data-goto-payment>Proceed to Payment</button>
          </div>
        </section>

      </div>

      ${SUMMARY_ASIDE}
    </div>
  </div>
</section>`,
};

/* ==================================================================== *
 * /payment/
 * ==================================================================== */
const GATEWAY_ROWS = Object.keys(PAYMENT_GATEWAYS)
  .map((k) => {
    const g = PAYMENT_GATEWAYS[k];
    return `<div class="gateway-row"><strong>${esc(g.label)}</strong><span>${g.enabled ? 'Enabled' : 'Awaiting backend integration'}</span></div>`;
  })
  .join('\n        ');

export const paymentPage = {
  url: '/payment/',
  title: 'Payment | Dancewala Studio Gurugram',
  description:
    'Review your Dancewala Studio booking and choose a payment method. Online payment is enabled once the payment gateway integration is complete.',
  styles: BOOKING_STYLE,
  scripts: ['payment', 'seo'],
  beforeScripts: serviceJsonIsland(),
  trail: [
    { label: 'Home', url: '/' },
    { label: 'Book Now', url: '/booking/' },
    { label: 'Payment', url: '/payment/' },
  ],
  jsonld: () => [webPageSchema(paymentPage, paymentPage.trail)],

  body: `<section class="section section--tight section--white">
  <div class="container">
    <div class="page-head">
      <p class="eyebrow">Secure Payment</p>
      <h1>Payment</h1>
    </div>

    <div data-payment>
      <div class="demo-notice" style="margin-bottom:2rem">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="10" width="18" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
        <span><strong>Payment is not live yet</strong>No payment gateway is connected, so no money can move. When the backend goes live, the charge is created and verified on the server — never in the browser.</span>
      </div>

      <div data-payment-empty hidden>
        <div class="empty-state" style="border-color:var(--border);background:var(--surface)">
          <h3 class="empty-state__title" style="color:var(--text)">No booking selected</h3>
          <p class="empty-state__text">Choose a service first, then come back here to pay.</p>
          <div class="empty-state__actions">${btn('/booking/', 'Book Now', 'primary')}</div>
        </div>
      </div>

      <div class="pay-grid" data-payment-form>
        <div class="booking-main">
          <p class="form__status" data-payment-status role="status" hidden></p>

          <h2 class="step-title">Select a Payment Method</h2>
          <p class="step-sub">Methods offered by the selected gateway. All are inactive until integration is complete.</p>

          <div class="pay-methods">
            ${[
              ['upi', 'UPI', 'PhonePe, Google Pay, Paytm, BHIM', '<path d="M5 19V9m4 10V5m4 14v-8m4 8V8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'],
              ['card', 'Credit / Debit Card', 'Visa, Mastercard, RuPay, Amex', '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 10h19" fill="none" stroke="currentColor" stroke-width="1.8"/>'],
              ['netbanking', 'Net Banking', '58+ banks supported', '<path d="M3.5 20h17M5 20V10l7-5 7 5v10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'],
              ['wallet', 'Wallets', 'Paytm, PhonePe, Amazon Pay, Mobikwik', '<path d="M3.5 8.5A2 2 0 0 1 5.5 6.5h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="16" cy="13" r="1.4" fill="currentColor"/>'],
            ]
              .map(
                ([id, label, sub, icon]) => `<label class="pay-method">
              <input type="radio" name="method" value="${id}" data-method disabled>
              <span class="pay-method__icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${icon}</svg></span>
              <span class="pay-method__body"><strong>${label}</strong><span>${sub}</span></span>
              <span class="pay-method__tag">Inactive</span>
            </label>`
              )
              .join('\n            ')}
          </div>

          <h3 class="section-title section-title--sm" style="margin-top:2.25rem">Payment Gateway</h3>
          <p style="color:var(--muted);font-size:0.94rem">Configuration lives in <code>tools/site/config.js</code>. Keys stay blank until the backend issues them.</p>
          <div class="gateway-list">
            ${GATEWAY_ROWS}
          </div>

          <div class="step-actions">
            <a class="btn btn--outline" href="/booking/">Back to Booking</a>
            <button class="btn btn--primary btn--lg" type="button" data-pay-now>Proceed to Payment</button>
          </div>

          <div class="demo-notice" style="margin-top:2rem">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <span><strong>Preview the result screens</strong>These buttons only navigate — they do not create or verify any payment.</span>
          </div>
          <div class="btn-row" style="margin-top:1rem">
            <button class="btn btn--whatsapp" type="button" data-simulate="success">Demo: Success</button>
            <button class="btn btn--outline" type="button" data-simulate="failed">Demo: Failed</button>
            <button class="btn btn--outline" type="button" data-simulate="pending">Demo: Pending</button>
          </div>
        </div>

        <aside class="booking-aside">
          <div class="summary-card">
            <h2 class="summary-card__title">Booking Summary</h2>
            <div class="summary-card__hero">
              <img data-pay-img src="" alt="" width="68" height="56" loading="lazy">
              <span><strong data-pay-title></strong></span>
            </div>
            <dl class="summary-rows">
              <div class="summary-row"><dt>Service</dt><dd data-row="service"></dd></div>
              <div class="summary-row"><dt>Participants</dt><dd data-row="participants"></dd></div>
              <div class="summary-row"><dt>Date</dt><dd data-row="date"></dd></div>
              <div class="summary-row"><dt>Time</dt><dd data-row="time"></dd></div>
              <div class="summary-row"><dt>Base price</dt><dd data-row="base"></dd></div>
              <div class="summary-row"><dt>Discount</dt><dd data-row="discount"></dd></div>
              <div class="summary-row"><dt>Taxes</dt><dd data-row="tax"></dd></div>
              <div class="summary-row summary-row--total"><dt>Final amount</dt><dd data-row="total"></dd></div>
            </dl>
            <p class="form__note">Demonstration amounts only. Final pricing is confirmed by the studio.</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</section>`,
};

/* ==================================================================== *
 * Result screens
 * ==================================================================== */
const resultPage = ({ url, title, description, variant, icon, heading, lead, extraContent = '' }) => ({
  url,
  title,
  description,
  noindex: true,
  styles: BOOKING_STYLE,
  scripts: ['payment', 'seo'],
  beforeScripts: serviceJsonIsland(),
  trail: [{ label: 'Home', url: '/' }, { label: heading, url }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `<section class="section section--white">
  <div class="container">
    <div class="result-card result-card--${variant}" data-payment-result>
      <span class="result-card__icon" aria-hidden="true">${icon}</span>
      <h1>${esc(heading)}</h1>
      <p class="result-card__lead">${esc(lead)}</p>

      <div class="demo-notice" style="text-align:left">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <span><strong>Demonstration screen</strong>This page shows what the customer sees after the backend integration is complete. No payment was processed and no booking was saved.</span>
      </div>

      <dl class="result-rows">
        <div class="summary-row"><dt>Booking ID</dt><dd data-row="bookingId">DW-2026-000001</dd></div>
        <div class="summary-row"><dt>Service</dt><dd data-row="service">—</dd></div>
        <div class="summary-row"><dt>Date</dt><dd data-row="date">—</dd></div>
        <div class="summary-row"><dt>Time</dt><dd data-row="time">—</dd></div>
        <div class="summary-row"><dt>Amount Paid</dt><dd data-row="amount">—</dd></div>
        <div class="summary-row"><dt>Transaction ID</dt><dd data-row="transactionId">—</dd></div>
        <div class="summary-row"><dt>Customer Email</dt><dd data-row="email">—</dd></div>
      </dl>

      ${extraContent}
    </div>
  </div>
</section>`,
});

export const paymentSuccess = resultPage({
  url: '/payment-success/',
  title: 'Payment Successful — Booking Confirmed | Dancewala Studio',
  description: 'Your Dancewala Studio booking is confirmed. Payment successful screen (frontend demonstration).',
  variant: 'success',
  icon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 13l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  heading: 'Payment Successful',
  lead: 'Your booking is confirmed. A confirmation email is sent to you once the backend email integration is live.',
  extraContent: `<div class="result-card__actions">
        ${btn('/booking-details/', 'View Booking', 'primary')}
        ${btn('/my-bookings/', 'Download Receipt', 'outline')}
        ${btn('/', 'Back to Home', 'ghost')}
      </div>
      <p style="margin-top:1.75rem;font-size:0.9rem;color:var(--muted)">Questions about your booking? Call ${esc(BUSINESS.phone)} or WhatsApp ${esc(BUSINESS.whatsapp)}.</p>`,
});

export const paymentFailed = resultPage({
  url: '/payment-failed/',
  title: 'Payment Unsuccessful | Dancewala Studio',
  description: 'Your payment could not be completed. Try again or choose another payment method.',
  variant: 'failed',
  icon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  heading: 'Payment Could Not Be Completed',
  lead: 'No amount has been deducted for a failed payment. You can try again or pick a different method.',
  extraContent: `<div class="result-card__actions">
        ${btn('/payment/', 'Try Again', 'primary')}
        ${btn('/payment/', 'Change Payment Method', 'outline')}
        ${btn('/contact-us/', 'Contact Us', 'outline')}
        ${waBtn('WhatsApp Support', 'Hello Dancewala Studio,\n\nMy payment did not go through. Booking ID: (enter your booking ID). Please help.')}
      </div>`,
});

export const paymentPending = resultPage({
  url: '/payment-pending/',
  title: 'Payment Verification In Progress | Dancewala Studio',
  description: 'Your payment is being verified. Check the status of your Dancewala Studio booking.',
  variant: 'pending',
  icon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5.5l3.5 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  heading: 'Payment Verification In Progress',
  lead: 'The payment status is being confirmed with the gateway. This usually resolves within a few minutes.',
  extraContent: `<div class="result-card__actions">
        ${btn('/my-bookings/', 'Check Booking Status', 'primary')}
        ${btn('/contact-us/', 'Contact Us', 'outline')}
        ${waBtn('WhatsApp Support')}
      </div>
      <p style="margin-top:1.75rem;font-size:0.9rem;color:var(--muted)">In the live system, verification happens on the server. A booking is only marked paid after the gateway signature is verified.</p>`,
});
