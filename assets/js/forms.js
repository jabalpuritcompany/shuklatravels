/* ==========================================================================
   DANCEWALA STUDIO — forms.js
   Enquiry form: accessible client-side validation + WhatsApp hand-off.
   Validation rules here are for usability only — the future backend MUST
   re-validate every field (see assets/js/form-handler.js).
   ========================================================================== */
(function () {
  'use strict';

  var DW = window.DW;
  if (!DW) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  // Indian mobiles: optional +91 / 0 prefix, then a 6-9 leading digit, 10 total.
  var PHONE_RE = /^(?:\+?91[-\s]?)?[6789]\d{9}$/;

  function normalisePhone(v) {
    return String(v || '').replace(/[\s\-()]/g, '').replace(/^\+?91/, '');
  }

  DW.register('forms', function () {
    var form = DW.$('[data-enquiry-form]');
    if (!form) return;
    var handler = DW.formHandler;
    if (!handler) return;

    var status = DW.$('[data-form-status]', form);
    var waBtn = DW.$('[data-whatsapp-submit]', form);

    /* --------------------------- validation ------------------------------ */
    function setError(field, message) {
      var control = DW.$('#' + field.getAttribute('aria-describedby'));
      var errorEl = field.closest('.field')
        ? DW.$('.field__error', field.closest('.field'))
        : null;
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (errorEl) {
        errorEl.textContent = message || '';
        errorEl.id = errorEl.id || field.id + '-error';
        field.setAttribute('aria-describedby', message ? errorEl.id : field.getAttribute('data-describedby-base') || '');
      }
      void control;
      return !message;
    }

    function validateField(field) {
      var value = (field.value || '').trim();
      var label = field.getAttribute('data-label') || field.name || 'This field';

      if (field.hasAttribute('required') && !value) {
        return setError(field, label + ' is required.');
      }
      if (field.type === 'email' && value && !EMAIL_RE.test(value)) {
        return setError(field, 'Enter a valid email address, for example name@example.com.');
      }
      if (field.dataset.role === 'phone' && value) {
        var digits = normalisePhone(value);
        if (!PHONE_RE.test(digits)) {
          return setError(field, 'Enter a 10-digit Indian mobile number.');
        }
      }
      if (field.type === 'date' && value) {
        var picked = new Date(value + 'T00:00:00');
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(picked.getTime())) return setError(field, 'Enter a valid date.');
        if (picked < today) return setError(field, 'Choose today or a later date.');
      }
      return setError(field, '');
    }

    function collectFields() {
      return DW.$$('input, select, textarea', form).filter(function (el) {
        return el.name && el.type !== 'submit' && el.type !== 'button';
      });
    }

    function validateAll(silent) {
      var fields = collectFields();
      var ok = true;
      var firstBad = null;
      fields.forEach(function (field) {
        var valid = validateField(field);
        if (!valid) {
          ok = false;
          if (!firstBad) firstBad = field;
        }
      });
      if (!silent && firstBad) firstBad.focus();
      return ok;
    }

    function readData() {
      var data = {};
      collectFields().forEach(function (f) { data[f.name] = (f.value || '').trim(); });
      return data;
    }

    function showStatus(message, kind) {
      if (!status) return;
      status.hidden = false;
      status.className = 'form__status' + (kind ? ' form__status--' + kind : '');
      status.textContent = message; // textContent — never innerHTML
      status.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    }

    /* ---------------------------- behaviour ------------------------------ */
    collectFields().forEach(function (field) {
      field.setAttribute('data-describedby-base', field.getAttribute('aria-describedby') || '');
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateAll(false)) {
        showStatus('Please correct the highlighted fields and try again.', 'error');
        return;
      }
      var submitBtn = DW.$('[type="submit"]', form);
      if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.textContent; submitBtn.textContent = 'Sending…'; }

      handler.submitEnquiry(readData()).then(function (result) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.label || 'Submit Enquiry'; }
        showStatus(result.message, result.status === 'sent' ? '' : result.status === 'error' ? 'error' : 'warn');
        if (result.status === 'sent') form.reset();
      });
    });

    if (waBtn) {
      waBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!validateAll(false)) {
          showStatus('Please complete the required fields before sending on WhatsApp.', 'error');
          return;
        }
        var data = readData();
        var url = handler.whatsAppUrl(handler.buildWhatsAppMessage(data));
        showStatus('Opening WhatsApp with your enquiry ready to send.', '');
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  });
})();
