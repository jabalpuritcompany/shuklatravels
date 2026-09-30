/* ==========================================================================
   DANCEWALA STUDIO — main.js
   Bootstrap + shared behaviour. Loaded first (defer); sibling modules
   register themselves on window.DW and are initialised on DOMContentLoaded.
   No framework, no jQuery, no third-party dependency.
   ========================================================================== */
(function () {
  'use strict';

  var DW = (window.DW = window.DW || {});
  var modules = [];

  DW.register = function (name, fn) {
    modules.push({ name: name, fn: fn });
  };

  /* ---------------------------- utilities -------------------------------- */
  DW.$ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  DW.$$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };
  DW.reducedMotion = function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  /** Reads a data-config value from the <html> element, falling back. */
  DW.config = function (key, fallback) {
    var v = document.documentElement.getAttribute('data-' + key);
    return v === null || v === '' ? fallback : v;
  };

  /* ---------------------------- scroll reveal ---------------------------- */
  function initReveal() {
    var items = DW.$$('[data-reveal]');
    if (!items.length) return;

    if (DW.reducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    items.forEach(function (el, i) {
      // Stagger siblings slightly for a more crafted feel (never on the hero).
      if (!el.closest('.hero')) el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* ---------------------------- sticky header ---------------------------- */
  function initHeader() {
    var header = DW.$('[data-header]');
    if (!header) return;
    var stuck = false;
    var onScroll = function () {
      var shouldStick = window.scrollY > 12;
      if (shouldStick !== stuck) {
        stuck = shouldStick;
        header.classList.toggle('is-stuck', stuck);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------- current year ----------------------------- */
  function initYear() {
    DW.$$('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* --------------------------- smooth anchor focus ----------------------- */
  function initAnchorFocus() {
    // Native smooth scrolling handles the motion; this only guarantees the
    // destination receives keyboard focus for screen-reader users.
    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      target.setAttribute('tabindex', '-1');
      setTimeout(function () { target.focus({ preventScroll: true }); }, 420);
    });
  }

  /* ------------------------------- boot ---------------------------------- */
  function boot() {
    initYear();
    initHeader();
    initAnchorFocus();
    initReveal();
    modules.forEach(function (m) {
      try {
        m.fn();
      } catch (err) {
        // A failing enhancement must never break the page.
        if (window.console) console.error('[Dancewala] module "' + m.name + '" failed:', err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
