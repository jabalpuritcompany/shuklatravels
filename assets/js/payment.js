/* ==========================================================================
   DANCEWALA STUDIO — payment.js
   --------------------------------------------------------------------------
   FRONTEND PAYMENT UI ONLY. No gateway SDK is loaded, no charge is created,
   no transaction is simulated as real. The demo buttons exist so the success /
   failure / pending screens can be reviewed; every one of those screens is
   labelled as a demonstration.

   ── FUTURE BACKEND INTEGRATION ────────────────────────────────────────────
   Correct order of operations once the backend exists:

     1. Browser  POST /api/bookings           -> server creates booking (pending)
     2. Browser  POST /api/payments/order     -> server creates the gateway order
                                                 using the SECRET key, server-side
     3. Gateway SDK opens in the browser with the order id + PUBLIC key only
     4. Gateway  -> browser callback with payment id + signature
     5. Browser  POST /api/payments/verify    -> SERVER verifies the signature
                                                 with the secret key and calls the
                                                 gateway's verification API
     6. Server   marks the booking paid, then sends customer + admin email

   Step 5 is mandatory. A booking must never be marked paid because the
   browser said so.

   PAYMENT_GATEWAYS lives in tools/site/config.js with every entry
   `{ enabled: false, key: "" }`. Blank keys stay blank.
   ──────────────────────────────────────────────────────────────────────────
   ========================================================================== */
(function () {
  'use strict';

  var DW = (window.DW = window.DW || {});

  DW.register('payment', function () {
    var root = document.querySelector('[data-payment]');
    if (!root) return;
    var booking = DW.booking;
    if (!booking) return;

    var status = root.querySelector('[data-payment-status]');
    booking.load();
    var state = booking.get();

    /* ---------- guard: a payment page without a booking ------------------- */
    var svc = booking.findService(state.service);
    if (!svc) {
      var guard = root.querySelector('[data-payment-empty]');
      if (guard) guard.hidden = false;
      var form = root.querySelector('[data-payment-form]');
      if (form) form.hidden = true;
      return;
    }

    /* ---------- render the summary ---------------------------------------- */
    var t = booking.totals();
    function setRow(key, value) {
      var el = root.querySelector('[data-row="' + key + '"]');
      if (el) el.textContent = value;
    }
    setRow('service', svc.title);
    setRow('participants', String(t.participants));
    setRow('date', state.date || 'Not selected');
    setRow('time', state.time || 'Not selected');
    setRow('base', booking.money(t.base));
    setRow('discount', t.discount ? '- ' + booking.money(t.discount) : booking.money(0));
    setRow('tax', booking.money(t.tax));
    setRow('total', booking.money(t.total));

    var img = root.querySelector('[data-pay-img]');
    if (img) { img.src = svc.image; img.alt = svc.alt || svc.title; }
    var title = root.querySelector('[data-pay-title]');
    if (title) title.textContent = svc.title;

    /* ---------- gateway & method tiles are disabled until integrated ------ */
    DW.$$('[data-gateway], [data-method]', root).forEach(function (input) {
      input.disabled = true;
    });

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-pay-now]');
      if (!btn) return;
      if (status) {
        status.hidden = false;
        status.className = 'form__status form__status--warn';
        status.textContent =
          'Payments are not live. No gateway is connected, so no payment can be created. The buttons below exist only to preview the result screens.';
      }
    });

    /* ---------- demo result routing --------------------------------------- */
    DW.$$('[data-simulate]', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var outcome = btn.getAttribute('data-simulate'); // success | failed | pending
        var id = state.bookingId || booking.generateId();

        booking.set({
          bookingId: id,
          amount: t.total,
          currency: 'INR',
          transactionId: 'DEMO-' + id.replace(/[^0-9A-Za-z]/g, '').slice(-10).toUpperCase(),
          paymentStatus: outcome,
          serviceTitle: svc.title,
          decidedAt: new Date().toISOString(),
        });

        // Record into the demo booking list shown on /my-bookings/.
        try {
          var list = JSON.parse(sessionStorage.getItem('dw:demo-bookings') || '[]');
          if (list.filter(function (b) { return b.id === id; }).length === 0) {
            list.unshift({
              id: id,
              service: svc.title,
              serviceSlug: svc.slug,
              image: svc.image,
              date: state.date || '',
              time: state.time || '',
              participants: t.participants,
              amount: t.total,
              status: outcome === 'success' ? 'confirmed' : outcome === 'pending' ? 'pending' : 'failed',
              transactionId: 'DEMO-' + id.replace(/[^0-9A-Za-z]/g, '').slice(-10).toUpperCase(),
              createdAt: new Date().toISOString(),
            });
            sessionStorage.setItem('dw:demo-bookings', JSON.stringify(list.slice(0, 20)));
          }
        } catch (err) {}

        window.location.href = '/payment-' + outcome + '/';
      });
    });

    /* ---------- result screens: fill in the details ------------------------ */
    var result = document.querySelector('[data-payment-result]');
    if (result) {
      var s = booking.get();
      function setRes(key, value) {
        var el = result.querySelector('[data-row="' + key + '"]');
        if (el) el.textContent = value;
      }
      setRes('bookingId', s.bookingId || 'DW-2026-000001');
      setRes('service', s.serviceTitle || '—');
      setRes('date', s.date || '—');
      setRes('time', s.time || '—');
      setRes('amount', booking.money(s.amount || 0));
      setRes('transactionId', s.transactionId || '—');
      setRes('email', s.email || '—');
    }
  });
})();
