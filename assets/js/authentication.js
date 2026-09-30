/* ==========================================================================
   DANCEWALA STUDIO — authentication.js
   --------------------------------------------------------------------------
   FRONTEND UI ONLY. There is no authentication server yet.

   HARD RULES ENFORCED HERE
   ------------------------
   * No password is ever read into, written to, or kept in any web storage.
     The register form clears the password field on submit and the value is
     never stored — not in localStorage, not in sessionStorage, not in a
     cookie, not in a global variable.
   * No OAuth client secret or token is present in this file. Only the public
     client ID placeholder lives in tools/site/config.js, and it is blank.
   * Clicking a social button cannot succeed silently: it shows an explicit
     "not configured yet" message. There is no fake login and no fake session.

   ── FUTURE BACKEND INTEGRATION ────────────────────────────────────────────
   * Google   : load https://accounts.google.com/gsi/client, call
                google.accounts.oauth2.initCodeClient({ client_id: OAUTH.google.clientId, ... })
                and POST the returned code to your server. The server exchanges
                it for tokens — never in the browser.
   * Facebook : FB.init({ appId: OAUTH.facebook.appId }) then FB.login(), POST
                the short-lived token to the server.
   * Instagram: use Facebook Login with Instagram permissions, or Instagram
                Basic Display, with the same server-side exchange.
   * Email    : POST /api/auth/register and /api/auth/login over HTTPS. Store
                only an httpOnly, Secure, SameSite session cookie set by the
                server. Never a token in localStorage.
   ──────────────────────────────────────────────────────────────────────────
   ========================================================================== */
(function () {
  'use strict';

  var DW = (window.DW = window.DW || {});
  var SESSION_KEY = 'dw:demo-session'; // name + provider only. No credentials.

  function notice(el, message, kind) {
    if (!el) return;
    el.hidden = false;
    el.className = 'form__status' + (kind ? ' form__status--' + kind : '');
    el.textContent = message; // textContent — never innerHTML
    el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  }

  function demoSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { return null; }
  }

  function setDemoSession(session) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) {}
  }

  function clearDemoSession() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  DW.auth = {
    demoSession: demoSession,
    setDemoSession: setDemoSession,
    clearDemoSession: clearDemoSession,
  };

  DW.register('authentication', function () {
    var root = document.querySelector('[data-auth]');
    if (!root) return;
    var status = root.querySelector('[data-auth-status]');

    /* ---------- social / OAuth buttons: explicitly not connected ---------- */
    DW.$$('[data-oauth]', root).forEach(function (btn) {
      btn.setAttribute('aria-disabled', 'true');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var provider = btn.getAttribute('data-oauth');
        notice(
          status,
          provider +
            ' sign-in is not connected yet. It will be enabled once the backend OAuth integration is complete (client ID placeholder in tools/site/config.js).',
          'warn'
        );
      });
    });

    /* ---------- email / password forms: validate, never store ------------- */
    var form = root.querySelector('form[data-auth-form]');
    if (!form) return;

    var pwd = form.querySelector('input[type="password"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;

      DW.$$('input[required]', form).forEach(function (input) {
        var value = (input.value || '').trim();
        var msg = '';
        if (!value) msg = (input.getAttribute('data-label') || input.name) + ' is required.';
        else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) msg = 'Enter a valid email address.';
        else if (input.getAttribute('data-role') === 'phone' && !/^(?:\+?91[-\s]?)?[6789]\d{9}$/.test(value.replace(/[\s\-()]/g, ''))) msg = 'Enter a 10-digit Indian mobile number.';
        else if (input.type === 'password' && value.length < 8) msg = 'Use at least 8 characters.';

        var wrap = input.closest('.field');
        var err = wrap ? wrap.querySelector('.field__error') : null;
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (err) err.textContent = msg || '';
        if (msg) { ok = false; if (!firstBad) firstBad = input; }
      });

      // Terms checkbox on the register form.
      var terms = form.querySelector('input[name="terms"]');
      if (terms && !terms.checked) {
        var tw = terms.closest('.field');
        var te = tw ? tw.querySelector('.field__error') : null;
        if (te) te.textContent = 'Please accept the Terms & Conditions and Privacy Policy.';
        ok = false;
        if (!firstBad) firstBad = terms;
      }

      if (!ok) {
        if (firstBad) firstBad.focus();
        notice(status, 'Please correct the highlighted fields.', 'error');
        return;
      }

      // The password is deliberately discarded here and never persisted.
      if (pwd) pwd.value = '';

      notice(
        status,
        'Account creation and sign-in are not connected yet. This is a frontend prototype — nothing was submitted and no password was stored.',
        'warn'
      );
    });

    /* ---------- demo mode: continue without a real account ---------------- */
    var demoBtn = root.querySelector('[data-demo-signin]');
    if (demoBtn) {
      demoBtn.addEventListener('click', function () {
        var nameField = form.querySelector('input[name="fullName"]');
        setDemoSession({
          name: (nameField && nameField.value.trim()) || 'Demo User',
          provider: 'frontend-demo',
          signedInAt: new Date().toISOString(),
        });
        notice(status, 'Demo session started. No account was created and no password was stored.', '');
        var target = demoBtn.getAttribute('data-redirect') || '/booking/';
        setTimeout(function () { window.location.href = target; }, 900);
      });
    }

    /* ---------- sign out -------------------------------------------------- */
    DW.$$('[data-signout]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        clearDemoSession();
        window.location.href = '/';
      });
    });

    /* ---------- forgot password ------------------------------------------- */
    var forgot = root.querySelector('form[data-forgot-form]');
    if (forgot) {
      forgot.addEventListener('submit', function (e) {
        e.preventDefault();
        notice(
          status,
          'Password reset is not connected yet. Once the backend is live, this will email a single-use reset link.',
          'warn'
        );
      });
    }
  });
})();
