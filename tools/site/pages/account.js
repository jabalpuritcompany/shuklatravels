/**
 * Authentication + user dashboard screens. Frontend prototype only.
 */
import { BUSINESS, SITE_URL } from '../config.js';
import { esc, btn, waBtn, webPageSchema } from '../layout.js';
import { BOOKING_STYLE } from '../catalog.js';

const AUTH_STYLE = BOOKING_STYLE;
const AUTH_SCRIPTS = ['authentication', 'seo'];

const oauthButtons = (verb) => `
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
      <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ig-g2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".35" stop-color="#FA7E1E"/><stop offset=".6" stop-color="#D62976"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient></defs><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="url(#ig-g2)"/><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="17" cy="7" r="1.2" fill="#fff"/></svg>
      Continue with Instagram
    </button>
  </div>
  <div class="divider">or ${verb} with email</div>`;

const authShell = ({ title, lead, inner, asideHtml }) => `<section class="section section--soft">
  <div class="container">
    <div class="auth-shell">
      <div class="auth-card" data-auth>
        <div class="auth-card__head">
          <h1>${esc(title)}</h1>
          <p>${esc(lead)}</p>
        </div>
        <p class="form__status" data-auth-status role="status" hidden></p>
        ${inner}
      </div>
      <aside class="auth-aside">
        ${asideHtml}
      </aside>
    </div>
  </div>
</section>`;

const ASIDE = `<div class="demo-notice">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  <span><strong>Accounts are not live yet</strong>Sign-in, registration and social login are frontend previews. Nothing you type here is sent anywhere, and no password is stored in your browser.</span>
</div>
<div class="summary-card" style="margin-top:1rem">
  <h2 class="summary-card__title">Why create an account?</h2>
  <ul class="check-list" style="margin-top:1rem">
    <li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>All your bookings in one place</span></li>
    <li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Faster repeat bookings</span></li>
    <li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Payment history and receipts</span></li>
  </ul>
  <div class="btn-row" style="margin-top:1.5rem">
    ${btn('/booking/', 'Book Now', 'primary')}
    ${btn('/contact-us/', 'Contact Us', 'outline')}
  </div>
</div>`;

/* ------------------------------------------------------------------ */
export const loginPage = {
  url: '/login/',
  title: 'Sign In | Dancewala Studio Gurugram',
  description: 'Sign in to your Dancewala Studio account to manage bookings, payments and receipts.',
  styles: AUTH_STYLE,
  scripts: AUTH_SCRIPTS,
  trail: [{ label: 'Home', url: '/' }, { label: 'Sign In', url: '/login/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: authShell({
    title: 'Sign In',
    lead: 'Welcome back. Access your bookings and payment history.',
    asideHtml: ASIDE,
    inner: `${oauthButtons('sign in')}
    <form class="form" style="box-shadow:none;border:0;padding:0" data-auth-form novalidate>
      <div class="field">
        <label for="l-email">Email <span class="req" aria-hidden="true">*</span></label>
        <input id="l-email" name="email" type="email" autocomplete="email" required data-label="Email" aria-describedby="l-email-error">
        <p class="field__error" id="l-email-error" aria-live="polite"></p>
      </div>
      <div class="field">
        <label for="l-pass">Password <span class="req" aria-hidden="true">*</span></label>
        <input id="l-pass" name="password" type="password" autocomplete="current-password" required data-label="Password" aria-describedby="l-pass-error l-pass-hint">
        <p class="field__hint" id="l-pass-hint">This prototype never stores your password — not in the browser, not anywhere.</p>
        <p class="field__error" id="l-pass-error" aria-live="polite"></p>
      </div>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">Sign In</button>
        <button class="btn btn--outline" type="button" data-demo-signin data-redirect="/my-account/">Continue as Demo User</button>
      </div>
    </form>
    <p class="auth-switch">New here? <a href="/register/">Register Now</a> · <a href="/forgot-password/">Forgot password?</a></p>`,
  }),
};

export const registerPage = {
  url: '/register/',
  title: 'Create an Account | Dancewala Studio Gurugram',
  description: 'Register for a Dancewala Studio account to book dance classes and choreography online and track your bookings.',
  styles: AUTH_STYLE,
  scripts: AUTH_SCRIPTS,
  trail: [{ label: 'Home', url: '/' }, { label: 'Register', url: '/register/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: authShell({
    title: 'Create Your Account',
    lead: 'One account for classes, choreography bookings, payments and receipts.',
    asideHtml: ASIDE,
    inner: `${oauthButtons('register')}
    <form class="form" style="box-shadow:none;border:0;padding:0" data-auth-form novalidate>
      <div class="field">
        <label for="r-name">Full Name <span class="req" aria-hidden="true">*</span></label>
        <input id="r-name" name="fullName" type="text" autocomplete="name" required data-label="Full name" aria-describedby="r-name-error">
        <p class="field__error" id="r-name-error" aria-live="polite"></p>
      </div>
      <div class="form__row form__row--2">
        <div class="field">
          <label for="r-phone">Mobile Number <span class="req" aria-hidden="true">*</span></label>
          <input id="r-phone" name="mobile" type="tel" inputmode="numeric" autocomplete="tel" required data-role="phone" data-label="Mobile number" aria-describedby="r-phone-error">
          <p class="field__error" id="r-phone-error" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="r-email">Email <span class="req" aria-hidden="true">*</span></label>
          <input id="r-email" name="email" type="email" autocomplete="email" required data-label="Email" aria-describedby="r-email-error">
          <p class="field__error" id="r-email-error" aria-live="polite"></p>
        </div>
      </div>
      <div class="field">
        <label for="r-pass">Password <span class="req" aria-hidden="true">*</span></label>
        <input id="r-pass" name="password" type="password" autocomplete="new-password" required data-label="Password" aria-describedby="r-pass-hint r-pass-error">
        <p class="field__hint" id="r-pass-hint">At least 8 characters. In the live system it is hashed server-side and never stored in your browser.</p>
        <p class="field__error" id="r-pass-error" aria-live="polite"></p>
      </div>
      <div class="field">
        <label style="display:flex;gap:.65rem;align-items:flex-start;font-weight:400">
          <input id="r-terms" name="terms" type="checkbox" style="width:20px;height:20px;min-height:0;margin-top:.15rem;flex:none">
          <span>I agree to the <a href="/terms-and-conditions/" style="color:var(--primary);text-decoration:underline">Terms &amp; Conditions</a> and <a href="/privacy-policy/" style="color:var(--primary);text-decoration:underline">Privacy Policy</a>.</span>
        </label>
        <p class="field__error" id="r-terms-error" aria-live="polite"></p>
      </div>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">Register Now</button>
        <button class="btn btn--outline" type="button" data-demo-signin data-redirect="/booking/">Continue as Demo User</button>
      </div>
    </form>
    <p class="auth-switch">Already registered? <a href="/login/">Sign in</a></p>`,
  }),
};

export const forgotPasswordPage = {
  url: '/forgot-password/',
  title: 'Reset Your Password | Dancewala Studio',
  description: 'Request a password reset link for your Dancewala Studio account.',
  styles: AUTH_STYLE,
  scripts: AUTH_SCRIPTS,
  trail: [{ label: 'Home', url: '/' }, { label: 'Forgot Password', url: '/forgot-password/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: authShell({
    title: 'Forgot Your Password?',
    lead: 'Enter your registered email and we will send a reset link.',
    asideHtml: ASIDE,
    inner: `<form class="form" style="box-shadow:none;border:0;padding:0" data-forgot-form novalidate>
      <div class="field">
        <label for="f-email">Email <span class="req" aria-hidden="true">*</span></label>
        <input id="f-email" name="email" type="email" autocomplete="email" required data-label="Email" aria-describedby="f-email-error">
        <p class="field__error" id="f-email-error" aria-live="polite"></p>
      </div>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">Send Reset Link</button>
      </div>
    </form>
    <p class="auth-switch">Remembered it? <a href="/login/">Back to sign in</a></p>`,
  }),
};

/* ================================================================== *
 * Dashboard
 * ================================================================== */
const DASH_NAV = (active) => {
  const items = [
    { href: '/my-account/', label: 'My Profile', icon: '<circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' },
    { href: '/my-bookings/', label: 'My Bookings', icon: '<rect x="3.5" y="5" width="17" height="15.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 9.5h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' },
    { href: '/booking-details/', label: 'Booking Details', icon: '<path d="M6 3.5h9l4.5 4.5v12.5H6z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 12h8M9 16h8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' },
    { href: '/booking/', label: 'Book Now', icon: '<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
  ];
  return `<nav class="dash-nav" aria-label="Account">
    ${items
      .map(
        (i) => `<a href="${i.href}"${i.href === active ? ' aria-current="page"' : ''}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${i.icon}</svg>${i.label}
    </a>`
      )
      .join('\n    ')}
    <a href="#" data-signout><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1M11 12h11M18 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>Logout</a>
  </nav>`;
};

const DEMO_BANNER = `<div class="demo-notice" style="margin-bottom:1.75rem">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  <span><strong>Frontend demo data</strong>These bookings, receipts and amounts are sample records shown to preview the dashboard. They are not real bookings.</span>
</div>`;

const DEMO_BOOKINGS = [
  { id: 'DW-2026-000412', service: 'Bollywood Dance', date: '2026-10-05', time: '07:00 PM', amount: 3540, status: 'confirmed' },
  { id: 'DW-2026-000389', service: 'Sangeet Choreography', date: '2026-11-18', time: '06:00 PM', amount: 29500, status: 'pending' },
  { id: 'DW-2026-000301', service: 'Kids Dance Classes', date: '2026-09-01', time: '05:00 PM', amount: 2950, status: 'completed' },
];

const money = (n) => '₹' + Number(n).toLocaleString('en-IN');

function bookingRow(b) {
  return `<article class="booking-row">
    <div class="booking-row__top">
      <span class="booking-row__id">${esc(b.id)}</span>
      <span class="badge badge--${esc(b.status)}">${esc(b.status)}</span>
    </div>
    <h3 class="booking-row__title">${esc(b.service)}</h3>
    <div class="booking-row__meta">
      <span>📅 ${esc(b.date)}</span><span>🕖 ${esc(b.time)}</span><span>💳 ${money(b.amount)}</span>
    </div>
    <div class="booking-row__actions">
      ${btn('/booking-details/', 'View Booking', 'outline')}
      ${btn('/my-bookings/', 'Download Receipt', 'ghost')}
    </div>
  </article>`;
}

export const myAccountPage = {
  url: '/my-account/',
  title: 'My Account | Dancewala Studio',
  description: 'Manage your Dancewala Studio profile, bookings, payment history and receipts.',
  noindex: true,
  styles: BOOKING_STYLE,
  scripts: ['authentication', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'My Account', url: '/my-account/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `<section class="section section--soft">
  <div class="container">
    <div class="page-head"><h1>My Account</h1></div>
    <div class="dash-layout">
      ${DASH_NAV('/my-account/')}
      <div>
        ${DEMO_BANNER}
        <div class="stat-grid" style="margin-bottom:1.75rem">
          <div class="stat"><span class="stat__label">Upcoming</span><span class="stat__value">2</span></div>
          <div class="stat"><span class="stat__label">Completed</span><span class="stat__value">1</span></div>
          <div class="stat"><span class="stat__label">Total Spent</span><span class="stat__value">${money(35990)}</span></div>
        </div>

        <div class="summary-card" style="margin-bottom:1.75rem">
          <h2 class="summary-card__title">My Profile</h2>
          <div class="form" style="box-shadow:none;border:0;padding:0;margin-top:1rem">
            <div class="form__row form__row--2">
              <div class="field"><label for="p-name">Full Name</label><input id="p-name" type="text" value="Demo User" data-demo></div>
              <div class="field"><label for="p-phone">Mobile</label><input id="p-phone" type="tel" value="98185 01007" data-demo></div>
            </div>
            <div class="field"><label for="p-email">Email</label><input id="p-email" type="email" value="yourname@example.com" data-demo></div>
            <div class="form__actions"><button class="btn btn--primary" type="button" disabled>Save Changes</button>
            <span class="form__note">Profile saving is enabled once the backend is connected.</span></div>
          </div>
        </div>

        <h2 class="section-title section-title--sm">Upcoming Bookings</h2>
        <div class="grid" style="gap:1rem">${DEMO_BOOKINGS.slice(0, 2).map(bookingRow).join('\n')}</div>
      </div>
    </div>
  </div>
</section>`,
};

export const myBookingsPage = {
  url: '/my-bookings/',
  title: 'My Bookings | Dancewala Studio',
  description: 'View upcoming, completed and cancelled bookings with Dancewala Studio, plus payment history and receipts.',
  noindex: true,
  styles: BOOKING_STYLE,
  scripts: ['authentication', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'My Bookings', url: '/my-bookings/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `<section class="section section--soft">
  <div class="container">
    <div class="page-head"><h1>My Bookings</h1></div>
    <div class="dash-layout">
      ${DASH_NAV('/my-bookings/')}
      <div>
        ${DEMO_BANNER}

        <h2 class="section-title section-title--sm">Upcoming</h2>
        <div class="grid" style="gap:1rem;margin-bottom:2rem">${DEMO_BOOKINGS.filter((b) => b.status !== 'completed').map(bookingRow).join('\n')}</div>

        <h2 class="section-title section-title--sm">Past Bookings</h2>
        <div class="grid" style="gap:1rem;margin-bottom:2rem">${DEMO_BOOKINGS.filter((b) => b.status === 'completed').map(bookingRow).join('\n')}</div>

        <h2 class="section-title section-title--sm">Payment History</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Booking ID</th><th>Date</th><th>Service</th><th>Amount</th><th>Status</th><th>Receipt</th></tr></thead>
            <tbody>
              ${DEMO_BOOKINGS.map(
                (b) => `<tr>
                <td>${esc(b.id)}</td><td>${esc(b.date)}</td><td>${esc(b.service)}</td><td>${money(b.amount)}</td>
                <td><span class="badge badge--${esc(b.status)}">${esc(b.status)}</span></td>
                <td><a href="/my-bookings/" style="color:var(--primary);font-weight:700">Download</a></td>
              </tr>`
              ).join('\n              ')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>`,
};

export const bookingDetailsPage = {
  url: '/booking-details/',
  title: 'Booking Details | Dancewala Studio',
  description: 'Full details of your Dancewala Studio booking: service, schedule, participants, payment status and receipt.',
  noindex: true,
  styles: BOOKING_STYLE,
  scripts: ['authentication', 'payment', 'seo'],
  beforeScripts: `<script type="application/json" id="dw-services">[]</script>`,
  trail: [{ label: 'Home', url: '/' }, { label: 'Booking Details', url: '/booking-details/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `<section class="section section--soft">
  <div class="container">
    <div class="page-head"><h1>Booking Details</h1></div>
    <div class="dash-layout">
      ${DASH_NAV('/booking-details/')}
      <div>
        ${DEMO_BANNER}
        <div class="summary-card">
          <div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:center;margin-bottom:1.25rem">
            <div><h2 class="summary-card__title" style="margin:0">DW-2026-000412</h2><span class="badge badge--confirmed">Confirmed</span></div>
            ${btn('/my-bookings/', 'Download Receipt', 'primary')}
          </div>
          <dl class="summary-rows">
            <div class="summary-row"><dt>Service</dt><dd>Bollywood Dance</dd></div>
            <div class="summary-row"><dt>Customer</dt><dd>Demo User</dd></div>
            <div class="summary-row"><dt>Date</dt><dd>5 Oct 2026</dd></div>
            <div class="summary-row"><dt>Time</dt><dd>07:00 PM</dd></div>
            <div class="summary-row"><dt>Participants</dt><dd>1</dd></div>
            <div class="summary-row"><dt>Venue</dt><dd>Dancewala Studio, Building 19, Second Floor, Huda Market, Sector 46, Gurugram</dd></div>
            <div class="summary-row"><dt>Amount Paid</dt><dd>${money(3540)}</dd></div>
            <div class="summary-row summary-row--total"><dt>Payment Status</dt><dd>Paid</dd></div>
          </dl>
          <div class="btn-row" style="margin-top:1.5rem">
            ${btn('/booking/', 'Book Another Service', 'outline')}
            ${waBtn('Questions About This Booking', 'Hello Dancewala Studio,\n\nI have a question about my booking DW-2026-000412. Please help.')}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
};
