/* ==========================================================================
   DANCEWALA STUDIO — slider.js
   Lightweight hero slider (~4 KB). Features:
   autoplay · pause on hover/focus/tab-hidden · touch swipe · keyboard arrows
   · dots · arrows · progress bar · respects prefers-reduced-motion
   · zero layout shift (transform-based, fixed slide height).
   ========================================================================== */
(function () {
  'use strict';

  var DW = window.DW;
  if (!DW) return;

  DW.register('slider', function () {
    var hero = DW.$('[data-slider]');
    if (!hero) return;

    var track = DW.$('.hero__track', hero);
    var slides = DW.$$('.hero__slide', hero);
    var dotWrap = DW.$('.hero__dots', hero);
    var progress = DW.$('.hero__progress span', hero);
    var total = slides.length;
    if (!track || total < 2) return;

    var DELAY = parseInt(hero.getAttribute('data-slider-delay') || '6200', 10);
    var reduce = DW.reducedMotion();
    var index = 0;
    var timer = null;
    var paused = false;
    var start = 0;
    var elapsed = 0;
    var rafId = null;

    /* ------------------------------ dots --------------------------------- */
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hero__dot';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ' of ' + total);
      b.setAttribute('data-index', String(i));
      dotWrap.appendChild(b);
    });
    var dots = DW.$$('.hero__dot', hero);
    dotWrap.setAttribute('role', 'tablist');
    dotWrap.setAttribute('aria-label', 'Homepage slides');

    /* ----------------------------- render -------------------------------- */
    function render() {
      track.style.transition = reduce ? 'none' : 'transform 0.85s cubic-bezier(0.22,0.61,0.36,1)';
      track.style.transform = 'translate3d(-' + index * 100 + '%,0,0)';

      slides.forEach(function (s, i) {
        var active = i === index;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
        // Keep off-screen slides out of the tab order.
        DW.$$('a, button', s).forEach(function (el) {
          if (active) el.removeAttribute('tabindex');
          else el.setAttribute('tabindex', '-1');
        });
      });
      dots.forEach(function (d, i) {
        d.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function goTo(i, fromUser) {
      index = (i + total) % total;
      render();
      if (fromUser) restart();
    }

    /* --------------------------- autoplay -------------------------------- */
    function tick(now) {
      if (!paused) {
        elapsed = now - start;
        var pct = Math.min(elapsed / DELAY, 1) * 100;
        if (progress) progress.style.width = pct + '%';
        if (elapsed >= DELAY) {
          goTo(index + 1);
          return;
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    function play() {
      if (reduce) return;
      cancel();
      start = performance.now() - elapsed;
      rafId = requestAnimationFrame(tick);
    }

    function cancel() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    function restart() {
      elapsed = 0;
      if (progress) progress.style.width = '0%';
      play();
    }

    function pause() {
      paused = true;
      cancel();
    }

    function resume() {
      paused = false;
      start = performance.now() - elapsed;
      play();
    }

    /* --------------------------- interaction ----------------------------- */
    dotWrap.addEventListener('click', function (e) {
      var dot = e.target.closest('.hero__dot');
      if (!dot) return;
      goTo(parseInt(dot.getAttribute('data-index'), 10), true);
    });

    DW.$$('.hero__arrow', hero).forEach(function (btn) {
      btn.addEventListener('click', function () {
        goTo(index + (btn.classList.contains('hero__arrow--next') ? 1 : -1), true);
      });
    });

    hero.addEventListener('mouseenter', pause);
    hero.addEventListener('mouseleave', resume);
    hero.addEventListener('focusin', pause);
    hero.addEventListener('focusout', function (e) {
      if (!hero.contains(e.relatedTarget)) resume();
    });

    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1, true); }
      if (e.key === 'Home') { e.preventDefault(); goTo(0, true); }
      if (e.key === 'End') { e.preventDefault(); goTo(total - 1, true); }
    });

    document.addEventListener('visibilitychange', function () {
      document.hidden ? pause() : resume();
    });

    /* ------------------------- touch / swipe ----------------------------- */
    var x0 = null, y0 = null, dragging = false, moved = false;

    hero.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length !== 1) return;
        x0 = e.touches[0].clientX;
        y0 = e.touches[0].clientY;
        dragging = true;
        moved = false;
        pause();
      },
      { passive: true }
    );

    hero.addEventListener(
      'touchmove',
      function (e) {
        if (!dragging || e.touches.length !== 1) return;
        var dx = e.touches[0].clientX - x0;
        var dy = e.touches[0].clientY - y0;
        // Ignore vertical intent so the page can still scroll.
        if (Math.abs(dy) > Math.abs(dx) && !moved) { dragging = false; resume(); return; }
        if (Math.abs(dx) > 8) moved = true;
      },
      { passive: true }
    );

    hero.addEventListener('touchend', function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = (e.changedTouches[0].clientX || 0) - (x0 || 0);
      if (moved && Math.abs(dx) > 48) goTo(index + (dx < 0 ? 1 : -1), true);
      else resume();
    });

    /* ----------------------------- init ---------------------------------- */
    render();
    if (reduce) {
      // No autoplay, no progress animation — the first slide simply stands.
      if (progress) progress.style.width = '100%';
    } else {
      play();
    }

    // Recalculate on resize: the track uses percentages, so nothing to do but
    // guarantee the active slide is aligned (avoids a drift after rotation).
    window.addEventListener('resize', function () { render(); }, { passive: true });
  });
})();
