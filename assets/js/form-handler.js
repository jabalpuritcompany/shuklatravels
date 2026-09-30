/* ==========================================================================
   DANCEWALA STUDIO — form-handler.js
   --------------------------------------------------------------------------
   FRONTEND ONLY. There is no backend in this phase, so nothing is stored
   server-side yet. Everything below is written so that connecting a real
   backend later requires changing ONE value in the configuration block and
   nothing else.

   SECURITY
   --------
   * No SMTP credentials, API keys, tokens or passwords live in this file or
     anywhere else in the frontend — ever. Anything secret belongs on the
     server (see SECURITY.md).
   * All values are escaped / encoded before being placed into a URL or the
     DOM. Node text is written with textContent, never innerHTML.
   * Server-side validation and sanitisation remain mandatory once the
     endpoint exists; client-side checks here are a UX aid only.
   ========================================================================== */
(function () {
  'use strict';

  var DW = (window.DW = window.DW || {});

  /* ======================================================================
     CONFIGURATION — the only block that changes when the backend arrives
     ====================================================================== */

  // 1) Enquiry email / API endpoint.
  //    "" (empty)  -> the form falls back to a pre-filled mailto draft and
  //                   tells the visitor that email submission is not live yet.
  //    "/api/enquiry" or "https://api.dancewalas.com/enquiry"
  //                 -> the form POSTs JSON here. Expected response: 2xx JSON.
  var EMAIL_ENDPOINT = '';

  // 2) WhatsApp destination in international format, no "+" and no spaces.
  var WHATSAPP_NUMBER = '918796911005';

  // 3) Studio email used for the temporary mailto fallback.
  var STUDIO_EMAIL = 'dancewalas@gmail.com';

  // 4) Optional: switch to false to disable the mailto fallback entirely.
  var ALLOW_MAILTO_FALLBACK = true;

  /* ====================================================================== */

  /** Strip control characters and collapse whitespace — defensive only. */
  function clean(value) {
    return String(value == null ? '' : value)
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2000);
  }

  /** Very small HTML escaper for any value we echo back into the page. */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Builds the WhatsApp enquiry message.
   * @param {Object} data  { name, phone, email, interest, ageGroup, danceForm, date, message }
   * @returns {string}     Plain text, one field per line, no markup.
   */
  function buildWhatsAppMessage(data) {
    var lines = [];
    lines.push('Hello Dancewala Studio,');
    lines.push('');
    lines.push('I would like to enquire about your dance classes.');
    lines.push('');
    lines.push('Name: ' + clean(data.name));
    lines.push('Mobile: ' + clean(data.phone));
    if (clean(data.email)) lines.push('Email: ' + clean(data.email));
    lines.push('Interested In: ' + clean(data.interest));
    if (clean(data.ageGroup)) lines.push('Age Group: ' + clean(data.ageGroup));
    if (clean(data.danceForm)) lines.push('Preferred Class / Dance Form: ' + clean(data.danceForm));
    if (clean(data.date)) lines.push('Preferred Date: ' + clean(data.date));
    lines.push('Message: ' + (clean(data.message) || '-'));
    lines.push('');
    lines.push('Please share available class timings and further details.');
    return lines.join('\n');
  }

  function whatsAppUrl(message) {
    return 'https://wa.me/' + encodeURIComponent(WHATSAPP_NUMBER).replace(/%2B/gi, '') +
      '?text=' + encodeURIComponent(message);
  }

  function mailtoUrl(data, message) {
    var subject = 'Enquiry from website — ' + clean(data.interest || 'Dance Classes');
    return 'mailto:' + STUDIO_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(message);
  }

  /**
   * Sends the enquiry.
   *
   * ▼▼▼ FUTURE BACKEND INTEGRATION POINT ▼▼▼
   * When EMAIL_ENDPOINT is populated the fetch() below is the ONLY place that
   * talks to the server. The endpoint should:
   *    POST  { name, phone, email, interest, ageGroup, danceForm, date, message, page, submittedAt }
   *    → 200 { ok: true }
   * and must perform its own validation, rate limiting, spam filtering and
   * sanitisation before persisting anything. Add a CSRF token / honeypot /
   * captcha here at that time.
   * ▲▲▲ FUTURE BACKEND INTEGRATION POINT ▲▲▲
   *
   * @returns {Promise<{status:'sent'|'mailto'|'error', message:string}>}
   */
  function submitEnquiry(data) {
    var payload = {
      name: clean(data.name),
      phone: clean(data.phone),
      email: clean(data.email),
      interest: clean(data.interest),
      ageGroup: clean(data.ageGroup),
      danceForm: clean(data.danceForm),
      date: clean(data.date),
      message: clean(data.message),
      page: window.location.pathname,
      submittedAt: new Date().toISOString(),
    };

    if (!EMAIL_ENDPOINT) {
      if (!ALLOW_MAILTO_FALLBACK) {
        return Promise.resolve({
          status: 'error',
          message: 'Online submission is not configured yet. Please call or message the studio.',
        });
      }
      // Temporary fallback: hand off to the visitor's own mail client.
      window.location.href = mailtoUrl(payload, buildWhatsAppMessage(payload));
      return Promise.resolve({
        status: 'mailto',
        message:
          'Opening your email app with a ready-to-send draft. Nothing is stored on this website yet — for the fastest reply, use WhatsApp or call the studio.',
      });
    }

    return fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json().catch(function () { return { ok: true }; });
      })
      .then(function () {
        return { status: 'sent', message: 'Thank you. Your enquiry has been received — the studio will get back to you shortly.' };
      })
      .catch(function () {
        return {
          status: 'error',
          message: 'We could not send that just now. Please try again, or message the studio on WhatsApp.',
        };
      });
  }

  DW.formHandler = {
    config: {
      EMAIL_ENDPOINT: EMAIL_ENDPOINT,
      WHATSAPP_NUMBER: WHATSAPP_NUMBER,
      STUDIO_EMAIL: STUDIO_EMAIL,
    },
    clean: clean,
    escapeHtml: escapeHtml,
    buildWhatsAppMessage: buildWhatsAppMessage,
    whatsAppUrl: whatsAppUrl,
    mailtoUrl: mailtoUrl,
    submitEnquiry: submitEnquiry,
  };
})();
