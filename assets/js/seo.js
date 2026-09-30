/* ==========================================================================
   DANCEWALA STUDIO — seo.js
   --------------------------------------------------------------------------
   Analytics / tag-manager loader. Nothing is injected until real IDs are
   supplied in tools/site/config.js, which keeps third-party requests at zero
   (good for Core Web Vitals, and no consent banner is needed while the site
   sets no cookies and runs no tracking).

   Once a GA4 or Meta Pixel ID is added, ALSO add a consent mechanism if the
   applicable privacy law for your visitors requires one — see README.
   ========================================================================== */
(function () {
  'use strict';

  var DW = window.DW;
  if (!DW) return;

  /* ─────────── CONFIG — populated at build time from tools/site/config.js ──
     GA_MEASUREMENT_ID = ""      → Google Analytics 4
     GSC_VERIFICATION  = ""      → Google Search Console (HTML tag, in <head>)
     META_PIXEL_ID     = ""      → Meta / Facebook Pixel
     ---------------------------------------------------------------------- */
  var GA_MEASUREMENT_ID = '';
  var META_PIXEL_ID = '';

  DW.register('seo', function () {
    if (!GA_MEASUREMENT_ID && !META_PIXEL_ID) return; // nothing loaded by default

    // Loaded lazily, after first interaction or 3s, so it never competes with LCP.
    var loaded = false;
    var load = function () {
      if (loaded) return;
      loaded = true;

      if (GA_MEASUREMENT_ID) {
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
      }

      if (META_PIXEL_ID) {
        // Standard Meta Pixel base code — ID injected from config, never hard-coded secrets.
        if (!window.fbq) {
          var n = (window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
          if (!window._fbq) window._fbq = n;
          n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
          var f = document.createElement('script');
          f.async = true;
          f.src = 'https://connect.facebook.net/en_US/fbevents.js';
          document.head.appendChild(f);
        }
        window.fbq('init', META_PIXEL_ID);
        window.fbq('track', 'PageView');
      }
    };

    var timer = setTimeout(load, 3000);
    ['scroll', 'click', 'keydown', 'touchstart'].forEach(function (evt) {
      window.addEventListener(evt, function () {
        clearTimeout(timer);
        load();
      }, { once: true, passive: true });
    });
  });
})();
