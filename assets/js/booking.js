/* ==========================================================================
   DANCEWALA STUDIO — booking.js
   --------------------------------------------------------------------------
   FRONTEND PROTOTYPE of the booking flow. No network calls, no fake success.
   State lives in sessionStorage for the length of the visit only and NEVER
   contains a password or any credential.

   ── FUTURE BACKEND INTEGRATION ────────────────────────────────────────────
   1. Replace SERVICES (injected JSON island) with GET /api/services
   2. Replace `save()` with POST /api/bookings  -> returns the real booking id
   3. Replace SLOT_TIMES with GET /api/services/:slug/slots?date=YYYY-MM-DD
   4. Replace COUPONS lookup with POST /api/coupons/validate (server-side)
   5. Totals must always be recalculated by the server. The numbers computed
      here are for display only and are never trusted.
   ──────────────────────────────────────────────────────────────────────────
   ========================================================================== */
(function () {
  'use strict';

  var DW = (window.DW = window.DW || {});
  var STORAGE_KEY = 'dw:booking:draft';

  /* ---------- config (mirrors tools/site/config.js — see notes above) ------ */
  var CONFIG = {
    idPrefix: 'DW',
    currencySymbol: '₹',
    taxRatePercent: 18,
    slots: ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'],
  };

  /* ---------- demo coupons (server-validated in future) ------------------- */
  var COUPONS = { FIRSTDANCE: 10, DANCEWALA10: 10, WORKSHOP15: 15 };

  /* ---------- helpers ----------------------------------------------------- */
  function readServices() {
    var el = document.getElementById('dw-services');
    if (!el) return [];
    try { return JSON.parse(el.textContent); } catch (e) { return []; }
  }

  function money(n) {
    return CONFIG.currencySymbol + Number(n || 0).toLocaleString('en-IN');
  }

  /* ---------- state ------------------------------------------------------- */
  var state = {};

  function load() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      state = raw ? JSON.parse(raw) : {};
    } catch (e) { state = {}; }
    if (!state || typeof state !== 'object') state = {};
    state.participants = state.participants || 1;
    return state;
  }

  function save() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /** Public API — used by payment.js and the account pages. */
  var api = {
    load: load,
    save: save,
    get: function () { return state; },
    set: function (patch) { Object.keys(patch).forEach(function (k) { state[k] = patch[k]; }); save(); },
    clear: function () { state = {}; try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {} },
    money: money,
    services: readServices,

    findService: function (slug) {
      return readServices().filter(function (s) { return s.slug === slug; })[0] || null;
    },

    /**
     * Demo pricing. The SERVER recalculates this once the backend exists.
     * Returns { base, discountPercent, discount, tax, total, unit }
     */
    totals: function () {
      var svc = api.findService(state.service);
      var unitPrice = svc ? Number(svc.demoPrice || 0) : 0;
      var qty = Math.max(1, parseInt(state.participants, 10) || 1);
      var base = unitPrice * qty;

      var pct = 0;
      if (state.coupon && COUPONS[String(state.coupon).toUpperCase()]) {
        pct = COUPONS[String(state.coupon).toUpperCase()];
      }
      var discount = Math.round((base * pct) / 100);
      var taxable = base - discount;
      var tax = Math.round((taxable * CONFIG.taxRatePercent) / 100);
      return {
        base: base,
        unitPrice: unitPrice,
        unit: svc ? svc.unit : '',
        discountPercent: pct,
        discount: discount,
        tax: tax,
        taxRatePercent: CONFIG.taxRatePercent,
        total: taxable + tax,
        participants: qty,
      };
    },

    /** Demo booking ID — format DW-YYYY-NNNNNN. Backend issues the real one. */
    generateId: function () {
      var year = new Date().getFullYear();
      var n = String(Math.floor(Math.random() * 900000) + 100000);
      return CONFIG.idPrefix + '-' + year + '-' + n;
    },

    applyCoupon: function (code) {
      var key = String(code || '').trim().toUpperCase();
      if (!key) { api.set({ coupon: '' }); return { ok: false, message: 'Enter a coupon code.' }; }
      if (!COUPONS[key]) { api.set({ coupon: '' }); return { ok: false, message: 'That code is not valid.' }; }
      api.set({ coupon: key });
      return { ok: true, message: COUPONS[key] + '% discount applied.' };
    },
  };

  DW.booking = api;

  /* ====================================================================== *
   * Wizard controller — only runs on the /booking/ page
   * ====================================================================== */
  function initWizard() {
    var root = document.querySelector('[data-booking-wizard]');
    if (!root) return;

    load();

    var panels = Array.prototype.slice.call(root.querySelectorAll('.step-panel'));
    var stepperItems = Array.prototype.slice.call(root.querySelectorAll('.stepper__item'));
    var totalSteps = panels.length;
    var current = 1;

    var summarySlots = DW.$$('[data-summary]');
    var couponInput = root.querySelector('[name="coupon"]');
    var couponMsg = root.querySelector('[data-coupon-msg]');

    /* ---------------- pre-select a service from ?service= ---------------- */
    var params = new URLSearchParams(window.location.search);
    var preselect = params.get('service');
    if (preselect && api.findService(preselect)) state.service = preselect;
    if (params.get('category')) {
      var cat = params.get('category');
      DW.$$('.service-tile').forEach(function (t) {
        t.hidden = t.getAttribute('data-category') !== cat;
      });
    }
    save();

    function showStep(n) {
      current = Math.min(Math.max(n, 1), totalSteps);
      panels.forEach(function (p) {
        p.classList.toggle('is-active', parseInt(p.getAttribute('data-step'), 10) === current);
      });
      stepperItems.forEach(function (i) {
        var step = parseInt(i.getAttribute('data-step'), 10);
        i.classList.toggle('is-current', step === current);
        i.classList.toggle('is-done', step < current);
      });
      renderSummary();
      var heading = panels[current - 1].querySelector('.step-title');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
      window.scrollTo({ top: root.offsetTop - 110, behavior: DW.reducedMotion() ? 'auto' : 'smooth' });
    }

    /* ------------------------- validation -------------------------------- */
    function fieldError(input, msg) {
      var wrap = input.closest('.field');
      var err = wrap ? wrap.querySelector('.field__error') : null;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) { err.textContent = msg || ''; err.id = err.id || input.id + '-error'; }
      return !msg;
    }

    function validateStep(n) {
      var panel = panels[n - 1];
      var ok = true;
      var firstBad = null;

      if (n === 1) {
        if (!state.service) {
          var msg = root.querySelector('[data-service-msg]');
          if (msg) msg.textContent = 'Choose a service to continue.';
          ok = false;
        }
        return ok;
      }

      DW.$$('input[required], select[required], textarea[required]', panel).forEach(function (input) {
        var value = (input.value || '').trim();
        var label = input.getAttribute('data-label') || input.name || 'This field';
        var msg = '';
        if (!value) msg = label + ' is required.';
        else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) msg = 'Enter a valid email address.';
        else if (input.getAttribute('data-role') === 'phone' && !/^(?:\+?91[-\s]?)?[6789]\d{9}$/.test(value.replace(/[\s\-()]/g, ''))) msg = 'Enter a 10-digit Indian mobile number.';
        if (!fieldError(input, msg)) { ok = false; if (!firstBad) firstBad = input; }
      });

      if (n === 4 && !state.date) {
        var dmsg = root.querySelector('[data-date-msg]');
        if (dmsg) dmsg.textContent = 'Choose a preferred date.';
        ok = false;
      }
      if (n === 4 && !state.time) {
        var tmsg = root.querySelector('[data-time-msg]');
        if (tmsg) tmsg.textContent = 'Choose a preferred time slot.';
        ok = false;
      }
      if (firstBad) firstBad.focus();
      return ok;
    }

    /* ------------------------- data binding ------------------------------ */
    root.addEventListener('input', function (e) {
      var el = e.target;
      if (el.name === 'service') {
        state.service = el.value;
        var m = root.querySelector('[data-service-msg]');
        if (m) m.textContent = '';
        save();
        renderSummary();
      }
      if (el.name === 'participants') {
        state.participants = Math.max(1, parseInt(el.value, 10) || 1);
        save();
        renderSummary();
      }
      if (el.name === 'date') { state.date = el.value; save(); renderSummary(); }
      if (el.name === 'time') { state.time = el.value; save(); renderSummary(); }
      if (el.name && el.name !== 'service' && el.name !== 'participants' && el.name !== 'date' && el.name !== 'time') {
        var patch = {}; patch[el.name] = el.value; api.set(patch);
      }
    });

    /* ------------------------- coupon ------------------------------------ */
    if (couponInput) {
      root.addEventListener('click', function (e) {
        if (!e.target.closest('[data-coupon-apply]')) return;
        var res = api.applyCoupon(couponInput.value);
        if (couponMsg) {
          couponMsg.textContent = res.message;
          couponMsg.style.color = res.ok ? '#027a48' : '#b42318';
        }
        renderSummary();
      });
    }

    /* ------------------------- navigation -------------------------------- */
    DW.$$('[data-step-next]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        if (!validateStep(current)) return;
        showStep(current + 1);
      });
    });
    DW.$$('[data-step-back]', root).forEach(function (b) {
      b.addEventListener('click', function () { showStep(current - 1); });
    });

    /* ------------------- step 3: demo sign-in ---------------------------- */
    var signedInEl = root.querySelector('[data-signed-in]');
    if (signedInEl) {
      var session = null;
      try { session = JSON.parse(sessionStorage.getItem('dw:demo-session') || 'null'); } catch (e) {}
      if (session && session.name) {
        signedInEl.hidden = false;
        signedInEl.querySelector('[data-signed-in-name]').textContent = session.name;
      }
    }
    DW.$$('[data-demo-continue]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        api.set({ authProvider: 'guest', authName: 'Guest' });
        showStep(4);
      });
    });

    /* ------------------- step 5: proceed to payment ---------------------- */
    DW.$$('[data-goto-payment]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        if (!validateStep(current)) return;
        api.set({ step: 5, createdAt: new Date().toISOString() });
        window.location.href = '/payment/';
      });
    });

    /* ------------------------- summary rendering ------------------------- */
    function renderSummary() {
      var svc = api.findService(state.service);
      var t = api.totals();

      summarySlots.forEach(function (box) {
        var empty = box.querySelector('[data-summary-empty]');
        var filled = box.querySelector('[data-summary-filled]');
        if (!svc) {
          if (empty) empty.hidden = false;
          if (filled) filled.hidden = true;
          return;
        }
        if (empty) empty.hidden = true;
        if (filled) filled.hidden = false;

        var img = box.querySelector('[data-summary-img]');
        if (img && img.getAttribute('src') !== svc.image) { img.src = svc.image; img.alt = svc.alt || svc.title; }
        var titleEl = box.querySelector('[data-summary-title]');
        if (titleEl) titleEl.textContent = svc.title;
        var catEl = box.querySelector('[data-summary-category]');
        if (catEl) catEl.textContent = svc.category;

        setRow(box, 'service', svc.title);
        setRow(box, 'participants', String(t.participants));
        setRow(box, 'date', state.date ? formatDate(state.date) : 'Not selected');
        setRow(box, 'time', state.time || 'Not selected');
        setRow(box, 'base', money(t.base));
        setRow(box, 'discount', t.discount ? '- ' + money(t.discount) + ' (' + t.discountPercent + '%)' : money(0));
        setRow(box, 'tax', money(t.tax) + ' (GST ' + t.taxRatePercent + '%)');
        setRow(box, 'total', money(t.total));
      });
    }

    function setRow(scope, key, value) {
      var el = scope.querySelector('[data-row="' + key + '"]');
      if (el) el.textContent = value;
    }

    function formatDate(iso) {
      var parts = String(iso).split('-');
      if (parts.length !== 3) return iso;
      var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (isNaN(d.getTime())) return iso;
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    /* ------------------------------ init --------------------------------- */
    // Restore any values already typed during this visit.
    DW.$$('input[name], select[name], textarea[name]', root).forEach(function (el) {
      if (el.type === 'radio' || el.type === 'checkbox') {
        el.checked = state[el.name] === el.value;
        return;
      }
      if (state[el.name] !== undefined && el.name !== 'coupon') el.value = state[el.name];
    });

    showStep(1);
  }

  DW.register('booking', initWizard);
})();
