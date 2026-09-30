/* ==========================================================================
   DANCEWALA STUDIO — social.js
   --------------------------------------------------------------------------
   Instagram Reels + YouTube Shorts.

   * Instagram: no feed is fetched. Scraping the profile is against Meta's
     terms, and a live feed needs a server-side token, so the section renders
     a clean placeholder grid that links to the official profile. The config
     block below is the single place the future server endpoint is added.
   * YouTube: if real Shorts IDs are configured in tools/site/data.js, a
     click-to-play lazy embed is used — only a lightweight thumbnail is
     downloaded until the visitor presses play, so the page stays fast.
     No video file is downloaded or mirrored.

   ── FUTURE BACKEND INTEGRATION ────────────────────────────────────────────
   Instagram:  server endpoint GET /api/instagram/reels using the Instagram
               Basic Display / Graph API long-lived token (server-side only),
               returning [{ id, permalink, thumbnail, caption }].
               Replace INSTAGRAM_FEED_ENDPOINT below and re-render.
   YouTube:    server endpoint GET /api/youtube/shorts using the YouTube Data
               API key (server-side only), returning video IDs.
   ──────────────────────────────────────────────────────────────────────────
   ========================================================================== */
(function () {
  'use strict';

  var DW = (window.DW = window.DW || {});

  var INSTAGRAM_FEED_ENDPOINT = ''; // e.g. '/api/instagram/reels'
  var YOUTUBE_SHORTS_ENDPOINT = ''; // e.g. '/api/youtube/shorts'

  DW.register('social', function () {
    /* ---------------- YouTube: click-to-play lazy embeds ----------------- */
    var players = DW.$$('[data-yt-video]');
    players.forEach(function (card) {
      var btn = card.querySelector('[data-yt-play]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var id = card.getAttribute('data-yt-video');
        if (!id) return;
        var frame = document.createElement('iframe');
        frame.src =
          'https://www.youtube-nocookie.com/embed/' +
          encodeURIComponent(id) +
          '?rel=0&autoplay=1&playsinline=1';
        frame.title = card.getAttribute('data-yt-title') || 'Dancewala Studio short';
        frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        frame.setAttribute('allowfullscreen', '');
        frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        frame.className = 'video-card__frame';
        var holder = card.querySelector('[data-yt-holder]');
        if (holder) {
          holder.innerHTML = '';
          holder.appendChild(frame);
          card.classList.add('is-playing');
        }
      });
    });

    /* ---------------- Instagram: optional live feed ---------------------- */
    var igGrid = document.querySelector('[data-instagram-grid]');
    if (igGrid && INSTAGRAM_FEED_ENDPOINT && !igGrid.hasAttribute('data-loaded')) {
      igGrid.setAttribute('data-loaded', '');
      fetch(INSTAGRAM_FEED_ENDPOINT, { headers: { Accept: 'application/json' } })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
        .then(function (data) {
          var items = (data && data.items) || [];
          if (!items.length) return;
          igGrid.innerHTML = '';
          items.slice(0, 8).forEach(function (item) {
            var a = document.createElement('a');
            a.className = 'reel-card';
            a.href = item.permalink || '#';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            var img = document.createElement('img');
            img.src = item.thumbnail;
            img.alt = (item.caption || 'Dancewala Studio Instagram post').slice(0, 120);
            img.loading = 'lazy';
            img.decoding = 'async';
            img.width = 400;
            img.height = 500;
            a.appendChild(img);
            igGrid.appendChild(a);
          });
        })
        .catch(function () {
          // Network or endpoint failure: keep the static placeholder grid.
          if (window.console) console.info('[Dancewala] Instagram feed endpoint unavailable; showing placeholder grid.');
        });
    }

    void YOUTUBE_SHORTS_ENDPOINT;
  });
})();
