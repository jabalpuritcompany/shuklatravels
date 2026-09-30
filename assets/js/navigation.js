/* ==========================================================================
   DANCEWALA STUDIO — navigation.js
   Desktop dropdowns (hover + click + keyboard) and the mobile off-canvas
   menu with accessible accordion submenus. No hover-only behaviour on touch.
   ========================================================================== */
(function () {
  'use strict';

  var DW = window.DW;
  if (!DW) return;

  DW.register('navigation', function () {
    var toggle = DW.$('[data-nav-toggle]');
    var panel = DW.$('[data-mobile-nav]');
    var header = DW.$('[data-header]');
    if (!toggle || !panel) return;

    var closers = DW.$$('[data-nav-close]', panel);
    var lastFocus = null;
    var isOpen = false;

    /* --------------------------- mobile panel ---------------------------- */
    function openPanel() {
      lastFocus = document.activeElement;
      isOpen = true;
      panel.hidden = false;
      // Force a frame so the CSS transition runs.
      requestAnimationFrame(function () { panel.classList.add('is-open'); });
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      var first = DW.$('.nav--mobile a, .nav--mobile button, [data-nav-close]', panel);
      if (first) first.focus();
    }

    function closePanel() {
      if (!isOpen) return;
      isOpen = false;
      panel.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      var done = function () { if (!isOpen) panel.hidden = true; };
      if (DW.reducedMotion()) done();
      else setTimeout(done, 380);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    toggle.addEventListener('click', function () {
      isOpen ? closePanel() : openPanel();
    });
    closers.forEach(function (btn) { btn.addEventListener('click', closePanel); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closePanel();
      }
    });

    // Keep tab focus inside the panel while it is open.
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !isOpen) return;
      var focusables = DW.$$(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        panel
      ).filter(function (el) { return el.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    // Closing on navigation keeps the state clean on fast taps.
    DW.$$('.nav--mobile a', panel).forEach(function (a) {
      a.addEventListener('click', function () { closePanel(); });
    });

    /* ------------------------- mobile accordion -------------------------- */
    var accordions = DW.$$('.nav--mobile .nav__link--toggle');
    accordions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = document.getElementById(btn.getAttribute('aria-controls'));
        if (!sub) return;
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        sub.hidden = expanded;
      });
    });

    /* -------------------------- desktop menus ---------------------------- */
    var parents = DW.$$('.nav--desktop .nav__item--has-menu');
    parents.forEach(function (item) {
      var link = DW.$(':scope > .nav__link', item);
      if (!link) return;

      // Pointer devices get hover (pure CSS). Clicking the parent still
      // navigates; the chevron area toggles the menu for keyboard/touch.
      var open = function () {
        parents.forEach(function (other) {
          if (other === item) return;
          other.classList.remove('is-open');
          var l = DW.$(':scope > .nav__link', other);
          if (l) l.setAttribute('aria-expanded', 'false');
        });
        item.classList.add('is-open');
        link.setAttribute('aria-expanded', 'true');
      };
      var close = function () {
        item.classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
      };

      link.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', function () {
        setTimeout(function () {
          if (!item.matches(':hover') && !item.contains(document.activeElement)) close();
        }, 60);
      });
      link.addEventListener('focus', open);
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) close();
      });
      link.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(); link.focus(); }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          open();
          var firstLink = DW.$('.nav__menu a', item);
          if (firstLink) firstLink.focus();
        }
      });
      // On touch, the first tap opens the menu instead of navigating.
      link.addEventListener('click', function (e) {
        var isTouch = window.matchMedia('(hover: none)').matches;
        if (!isTouch) return;
        if (item.classList.contains('is-open')) {
          close();
          return;
        }
        e.preventDefault();
        open();
      });
    });

    /* ----------------- close dropdowns when tapping outside --------------- */
    document.addEventListener('click', function (e) {
      if (header && header.contains(e.target)) return;
      parents.forEach(function (item) {
        item.classList.remove('is-open');
        var l = DW.$(':scope > .nav__link', item);
        if (l) l.setAttribute('aria-expanded', 'false');
      });
    });
  });
})();
