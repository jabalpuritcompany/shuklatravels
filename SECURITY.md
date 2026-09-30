# Security Notes — Dancewala Studio

This document covers **server deployment headers** and the security rules the
frontend already follows. It is written for whoever deploys the site and, later,
builds the backend.

> **Important:** frontend HTML and JavaScript cannot make a website secure.
> Validation, sanitisation, rate limiting, authentication and payment
> verification must happen on the server. Nothing below should be read as a
> claim that the current frontend is "secure" on its own.

---

## 1. What the frontend already does

| Rule | Where |
|---|---|
| No API keys, tokens or passwords in any JavaScript file | `assets/js/**`, `tools/site/config.js` |
| No SMTP credentials anywhere in the repo | whole repo |
| No payment secret keys — only blank public-key placeholders | `tools/site/config.js` → `PAYMENT_GATEWAYS` |
| No OAuth client secrets — only blank public client-ID placeholders | `tools/site/config.js` → `OAUTH` |
| Passwords are never written to `localStorage`, `sessionStorage` or a cookie | `assets/js/authentication.js` |
| Booking draft data uses `sessionStorage` only and contains no credential | `assets/js/booking.js` |
| User input is written to the DOM with `textContent`, never `innerHTML` | `assets/js/forms.js`, `booking.js`, `payment.js` |
| No `eval()`, no `Function()` constructor, no inline event handlers | whole repo |
| All external links use `rel="noopener noreferrer"` | `tools/site/layout.js` |
| Payment is never marked successful in the browser | `assets/js/payment.js` |

---

## 2. Recommended server headers

Apache (add to `.htaccess`, a rename of `htaccess.example`):

```apache
<IfModule mod_headers.c>
  # Only allow this site's own origins plus what you actually embed.
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self'; frame-src https://www.youtube-nocookie.com https://www.youtube.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"

  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(self), camera=(), microphone=(), payment=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Cross-Origin-Opener-Policy "same-origin"
</IfModule>
```

Nginx equivalent:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.ytimg.com; frame-src https://www.youtube-nocookie.com https://www.youtube.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(self), camera=(), microphone=(), payment=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
```

### Notes on each header

- **Content-Security-Policy** — start with `default-src 'self'`. The current build
  needs `img-src` to allow `https://i.ytimg.com` (YouTube Shorts thumbnails) and
  `frame-src` for `youtube-nocookie.com`. Add Google Analytics / Meta Pixel hosts
  only if you actually enable them. Deploy with `Content-Security-Policy-Report-Only`
  first to catch anything missed.
- **X-Frame-Options / frame-ancestors** — both are listed; modern browsers honour
  `frame-ancestors` from CSP, `X-Frame-Options` covers older ones.
- **Strict-Transport-Security** — only enable `preload` once HTTPS is confirmed
  working on every subdomain; it is hard to reverse.
- **Permissions-Policy** — the site uses no camera, microphone or Payment Request
  API, so those are disabled. `geolocation=(self)` is kept for the "Get Directions"
  flow if you add it later.

---

## 3. HTTPS

- Force HTTPS with a 301 redirect (already in `htaccess.example`).
- Redirect `www` to the bare domain, or the reverse — pick one and use it in the
  canonical tag. Canonical URLs in this build use `https://dancewalas.com` (no `www`).

---

## 4. Backend requirements (when it is built)

These are not optional:

1. **Validate and sanitise every field server-side.** The client-side checks in
   `assets/js/forms.js` and `booking.js` are a usability aid, not a control.
2. **Re-price everything server-side.** Never trust a total computed in the browser.
3. **Verify payments server-side.** Create the gateway order with the secret key on
   the server, then verify the callback signature against the gateway API before
   marking a booking paid. See the header comment in `assets/js/payment.js`.
4. **Hash passwords** with bcrypt/argon2. Never store or log a plaintext password.
   Never return a password in an API response.
5. **Use httpOnly, Secure, SameSite session cookies.** Do not put JWTs or session
   tokens in `localStorage`.
6. **Rate-limit** login, registration, password reset, enquiry and booking endpoints.
7. **Add CSRF protection** on every state-changing POST, plus a honeypot or captcha
   on public forms.
8. **Escape output** in every email template — the `{{ placeholders }}` in
   `email-templates/` must be escaped before rendering, not interpolated raw.
9. **Log security events** (failed logins, payment verification failures) and keep
   logs away from the public web root.
10. **Keep secrets in environment variables**, never in the repository, and never in
    anything under `/assets`.

---

## 5. Reporting

If you find a security issue in this site, email **dancewalas@gmail.com** with the
subject line `SECURITY — dancewalas.com`. Please do not open a public issue until
it has been addressed.
