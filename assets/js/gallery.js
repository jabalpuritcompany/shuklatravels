/* ==========================================================================
   DANCEWALA STUDIO — gallery.js
   Accessible lightbox built from real <a> elements in the markup, so images
   remain crawlable and openable even with JavaScript disabled.
   ESC closes · arrows navigate · swipe on touch · focus is trapped & restored.
   ========================================================================== */
(function () {
  'use strict';

  var DW = window.DW;
  if (!DW) return;

  DW.register('gallery', function () {
    var links = DW.$$('[data-lightbox]');
    if (!links.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML =
      '<div class="lightbox__bar">' +
      '<span class="lightbox__count" aria-live="polite"></span>' +
      '<button class="lightbox__close" type="button" aria-label="Close image viewer">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button></div>' +
      '<div class="lightbox__stage">' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '</div>' +
      '<p class="lightbox__caption"></p>';
    document.body.appendChild(box);

    var img = DW.$('.lightbox__img', box);
    var caption = DW.$('.lightbox__caption', box);
    var counter = DW.$('.lightbox__count', box);
    var prevBtn = DW.$('.lightbox__nav--prev', box);
    var nextBtn = DW.$('.lightbox__nav--next', box);
    var closeBtn = DW.$('.lightbox__close', box);

    var items = links.map(function (a) {
      // Prefer the largest available derivative from srcset.
      var biggest = a.getAttribute('data-full') || a.getAttribute('href');
      var srcset = (a.querySelector('img') || {}).srcset || '';
      if (srcset) {
        var last = srcset.split(',').pop().trim().split(' ')[0];
        if (last) biggest = last;
      }
      return { src: biggest, alt: (a.querySelector('img') || {}).alt || a.getAttribute('data-caption') || '' };
    });

    var current = 0;
    var opener = null;

    function show(i) {
      current = (i + items.length) % items.length;
      var item = items[current];
      img.src = item.src;
      img.alt = item.alt;
      caption.textContent = item.alt;
      counter.textContent = current + 1 + ' / ' + items.length;
    }

    function open(i, trigger) {
      opener = trigger || document.activeElement;
      show(i);
      box.hidden = false;
      requestAnimationFrame(function () { box.classList.add('is-open'); });
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () { box.hidden = true; img.removeAttribute('src'); }, 300);
      if (opener && opener.focus) opener.focus();
    }

    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        open(i, a);
      });
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });

    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox__stage')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'Tab') {
        var f = [closeBtn, prevBtn, nextBtn];
        var idx = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    // Swipe on touch devices.
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  });
})();
