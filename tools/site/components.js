/**
 * Dancewala Studio — reusable page components.
 */

import { BUSINESS, SITE_URL } from './config.js';
import { GALLERY, VIDEOS, HOME_FAQ, CLASSES, SHORTS, REELS } from './data.js';
import { esc, img, btn, waBtn, eventCard, eventEmptyState, faqAccordion, faqSchema } from './layout.js';

/* ------------------------------------------------------------------ *
 * Enquiry form
 * ------------------------------------------------------------------ */
export const INTEREST_OPTIONS = [
  'Kids Dance Classes',
  'Adult Dance Classes',
  'Beginner Dance Classes',
  'Bollywood Dance',
  'Hip Hop Dance',
  'Contemporary Dance',
  'Freestyle Dance',
  'Wedding Choreography',
  'Sangeet Choreography',
  'Couple Choreography',
  'Family & Group Choreography',
  'Event Choreography',
  'Corporate Choreography',
  'Workshop',
  'Other',
];

const AGE_GROUPS = ['Under 6', '6–10', '11–15', '16–20', '21–35', '36–50', '50+'];

export function enquiryForm({ title = 'Send an Enquiry', text = '', id = 'enquiry' } = {}) {
  return `<section class="section section--soft" id="${id}">
  <div class="container">
    <div class="split split--wide-right">
      <div data-reveal>
        <p class="eyebrow">Enquire</p>
        <h2 class="section-title">${esc(title)}</h2>
        ${text ? `<p class="section-text" style="margin-inline:0">${text}</p>` : ''}
        <ul class="check-list" style="margin-top:1.75rem">
          <li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Tell us who the classes are for and we will suggest a suitable batch.</span></li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Prefer to talk? Call ${esc(BUSINESS.phone)} or message ${esc(BUSINESS.whatsapp)} on WhatsApp.</span></li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Send the same enquiry straight to WhatsApp with one tap.</span></li>
        </ul>
      </div>

      <div data-reveal>
        <form class="form" data-enquiry-form novalidate>
          <p class="form__status" data-form-status role="status" hidden></p>

          <div class="form__row form__row--2">
            <div class="field">
              <label for="f-name">Name <span class="req" aria-hidden="true">*</span></label>
              <input id="f-name" name="name" type="text" autocomplete="name" required data-label="Name" aria-describedby="f-name-error">
              <p class="field__error" id="f-name-error" aria-live="polite"></p>
            </div>
            <div class="field">
              <label for="f-phone">Mobile Number <span class="req" aria-hidden="true">*</span></label>
              <input id="f-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" required data-role="phone" data-label="Mobile number" aria-describedby="f-phone-error" placeholder="10-digit mobile number">
              <p class="field__error" id="f-phone-error" aria-live="polite"></p>
            </div>
          </div>

          <div class="field">
            <label for="f-email">Email</label>
            <input id="f-email" name="email" type="email" autocomplete="email" data-label="Email" aria-describedby="f-email-error">
            <p class="field__error" id="f-email-error" aria-live="polite"></p>
          </div>

          <div class="form__row form__row--2">
            <div class="field">
              <label for="f-interest">Interested In <span class="req" aria-hidden="true">*</span></label>
              <select id="f-interest" name="interest" required data-label="Interested in" aria-describedby="f-interest-error">
                <option value="">Select an option</option>
                ${INTEREST_OPTIONS.map((o) => `<option>${esc(o)}</option>`).join('\n                ')}
              </select>
              <p class="field__error" id="f-interest-error" aria-live="polite"></p>
            </div>
            <div class="field">
              <label for="f-age">Age Group</label>
              <select id="f-age" name="ageGroup" aria-describedby="f-age-hint">
                <option value="">Select an age group</option>
                ${AGE_GROUPS.map((o) => `<option>${esc(o)}</option>`).join('\n                ')}
              </select>
              <p class="field__hint" id="f-age-hint">Optional — helps us place you in the right batch.</p>
            </div>
          </div>

          <div class="form__row form__row--2">
            <div class="field">
              <label for="f-dance">Preferred Class / Dance Form</label>
              <input id="f-dance" name="danceForm" type="text" list="dance-forms" placeholder="For example: Bollywood, Hip Hop" aria-describedby="f-dance-hint">
              <datalist id="dance-forms">
                ${CLASSES.map((c) => `<option value="${esc(c.title)}"></option>`).join('\n                ')}
              </datalist>
              <p class="field__hint" id="f-dance-hint">Optional.</p>
            </div>
            <div class="field">
              <label for="f-date">Preferred Date</label>
              <input id="f-date" name="date" type="date" aria-describedby="f-date-hint">
              <p class="field__hint" id="f-date-hint">Optional — the date you would like to start or attend.</p>
            </div>
          </div>

          <div class="field">
            <label for="f-message">Message</label>
            <textarea id="f-message" name="message" rows="4" placeholder="Tell us a little about what you are looking for." aria-describedby="f-message-hint"></textarea>
            <p class="field__hint" id="f-message-hint">Optional.</p>
          </div>

          <div class="form__actions">
            <button class="btn btn--primary" type="submit">Submit Enquiry</button>
            <button class="btn btn--whatsapp" type="button" data-whatsapp-submit>Send via WhatsApp</button>
          </div>

          <p class="form__note">This website does not store your details yet. Submitting opens a ready-to-send email or WhatsApp message to the studio. See our <a href="/privacy-policy/">Privacy Policy</a>.</p>
        </form>
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Gallery grid
 * ------------------------------------------------------------------ */
export function galleryGrid(items, { start = 0, limit } = {}) {
  const slice = limit ? items.slice(start, start + limit) : items;
  return `<div class="gallery-grid">
    ${slice
      .map(
        (g, i) => `<a class="gallery-item" href="/assets/images/${g.src}-1200.webp" data-lightbox="gallery" data-caption="${esc(g.alt)}" aria-label="View image: ${esc(g.alt)}">
      ${img(g.src, g.alt, {
        sizes: '(min-width: 900px) 30vw, (min-width: 600px) 45vw, 92vw',
        w: 800,
        h: 600,
        cls: '',
      })}
      <span class="gallery-item__zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5L21 21M11 8v6M8 11h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
    </a>`
      )
      .join('\n    ')}
  </div>`;
}

/* ------------------------------------------------------------------ *
 * Video section (official YouTube, lazy + nocookie)
 * ------------------------------------------------------------------ */
export function videoSection() {
  const usable = VIDEOS.filter((v) => v.id);
  const frames = usable.length
    ? usable
        .map(
          (v) => `<div class="video-frame" data-reveal>
      <iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}?rel=0"
              title="${esc(v.title)}" loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>`
        )
        .join('\n    ')
    : `<div class="video-frame" data-reveal>
      <div class="video-placeholder">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor"/></svg>
        <h3>Studio videos are on their way here</h3>
        <p>Official Dancewala Studio videos will be embedded from the studio's YouTube channel as soon as the video IDs are confirmed.</p>
        <p style="margin-top:1.25rem">
          <a class="btn btn--outline" style="--btn-fg:#fff;--btn-bg:transparent;border-color:rgba(255,255,255,.28)" href="${BUSINESS.social.youtube}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </p>
      </div>
    </div>`;

  return `<section class="section section--dark" aria-labelledby="video-heading">
  <div class="container">
    <div class="section-head section-head--light">
      <p class="eyebrow">On YouTube</p>
      <h2 class="section-title" id="video-heading">Watch the Studio Move</h2>
      <p class="section-text">Rehearsals, class moments and performances from Dancewala Studio, published on the official YouTube channel.</p>
    </div>
    <div class="grid grid--2">
    ${frames}
    </div>
    <p class="text-center" style="margin-top:1.75rem">
      ${btn(BUSINESS.social.youtube, 'Visit the YouTube Channel', 'ghost', ' target="_blank" rel="noopener noreferrer"')}
    </p>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Social section
 * ------------------------------------------------------------------ */
export function socialSection() {
  return `<section class="section section--soft" aria-labelledby="social-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Follow Along</p>
      <h2 class="section-title" id="social-heading">Keep Up With the Studio</h2>
      <p class="section-text">Class clips, performance reels and workshop announcements are posted first on Instagram and YouTube.</p>
    </div>
    <div class="grid grid--2">
      <a class="social-card social-card--ig" href="${BUSINESS.social.instagram}" target="_blank" rel="noopener noreferrer" data-reveal>
        <span class="social-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/></svg>
        </span>
        <span class="social-card__body">
          <strong>Follow Dancewala Studio on Instagram</strong>
          <span>Daily studio moments, reels and batch updates.</span>
        </span>
        <svg class="social-card__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
      <a class="social-card social-card--yt" href="${BUSINESS.social.youtube}" target="_blank" rel="noopener noreferrer" data-reveal>
        <span class="social-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor"/></svg>
        </span>
        <span class="social-card__body">
          <strong>Watch Dancewala Studio on YouTube</strong>
          <span>Longer routines, performances and workshop films.</span>
        </span>
        <svg class="social-card__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Reviews — honest: no fabricated testimonials, links out instead
 * ------------------------------------------------------------------ */
export function reviewsSection() {
  return `<section class="section section--white" aria-labelledby="reviews-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Reviews</p>
      <h2 class="section-title" id="reviews-heading">What Students Say</h2>
      <p class="section-text">We would rather you read reviews in the student's own words than ours. Dancewala Studio's Google Business Profile is where parents, students and wedding clients leave their feedback.</p>
    </div>
    <div class="empty-state" data-reveal style="border-color:var(--border);background:var(--surface)">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      <h3 class="empty-state__title" style="color:var(--text)">Student reviews are published on Google.</h3>
      <p class="empty-state__text">Verified feedback lives on the studio's Google Business Profile. Once the studio shares review snippets we have permission to publish, they will appear here.</p>
      <div class="empty-state__actions">
        ${btn(BUSINESS.social.googleBusiness, 'Read Reviews on Google', 'primary', ' target="_blank" rel="noopener noreferrer"')}
        ${btn(BUSINESS.social.googleBusiness, 'Write a Review', 'outline', ' target="_blank" rel="noopener noreferrer"')}
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * FAQ block (page section + optional schema)
 * ------------------------------------------------------------------ */
export function faqSection(faqs = HOME_FAQ, { dark = false, heading = 'Questions People Ask Before Joining' } = {}) {
  return `<section class="section ${dark ? 'section--dark' : 'section--white'}" aria-labelledby="faq-heading">
  <div class="container">
    <div class="section-head${dark ? ' section-head--light' : ''}">
      <p class="eyebrow">FAQ</p>
      <h2 class="section-title" id="faq-heading">${esc(heading)}</h2>
    </div>
    ${faqAccordion(faqs)}
  </div>
</section>`;
}

export { faqSchema };

/* ------------------------------------------------------------------ *
 * Instagram Reels
 * ------------------------------------------------------------------ */
export function reelsSection() {
  const items = (REELS || []).filter((r) => r.image);
  const cards = items.length
    ? items
        .slice(0, 8)
        .map(
          (r) => `<a class="reel-card" href="${r.url || BUSINESS.social.instagram}" target="_blank" rel="noopener noreferrer">
      <img src="${esc(r.image)}" alt="${esc(r.alt)}" width="400" height="500" loading="lazy" decoding="async">
      <span class="reel-card__badge" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>Reel</span>
      <span class="reel-card__footer">${esc(r.caption || '')}</span>
    </a>`
        )
        .join('\n      ')
    : Array.from({ length: 4 })
        .map(
          () => `<div class="reel-placeholder">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/></svg>
      <span>Reel</span>
    </div>`
        )
        .join('\n      ');

  return `<section class="section section--dark" aria-labelledby="reels-heading">
  <div class="container">
    <div class="section-head section-head--light">
      <p class="eyebrow">Latest from Instagram</p>
      <h2 class="section-title" id="reels-heading">Reels from the Studio Floor</h2>
      <p class="section-text">Short clips from classes, rehearsals and performances, posted on the official Dancewala Studio Instagram.</p>
    </div>
    <div class="reel-grid" data-instagram-grid>
      ${cards}
    </div>
    <p class="text-center" style="margin-top:1.75rem">
      ${btn(BUSINESS.social.instagram, 'Follow Dancewala Studio on Instagram', 'ghost', ' target="_blank" rel="noopener noreferrer"')}
    </p>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * YouTube Shorts — thumbnail-first, no embed until play is pressed
 * ------------------------------------------------------------------ */
export function shortsSection() {
  const items = (SHORTS || []).filter((v) => v.id);
  const cards = items.length
    ? items
        .slice(0, 8)
        .map(
          (v) => `<div class="video-card" data-yt-video="${esc(v.id)}" data-yt-title="${esc(v.title)}">
      <div data-yt-holder>
        <img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="${esc(v.title)}" width="400" height="500" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        <button class="video-card__play" type="button" data-yt-play aria-label="Play: ${esc(v.title)}">
          <span><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5l11 6.5-11 6.5v-13Z" fill="currentColor"/></svg></span>
        </button>
      </div>
      <span class="video-card__badge" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor"/></svg>Short</span>
      <span class="video-card__footer">${esc(v.title)}</span>
    </div>`
        )
        .join('\n      ')
    : Array.from({ length: 4 })
        .map(
          () => `<div class="reel-placeholder">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor"/></svg>
      <span>Short</span>
    </div>`
        )
        .join('\n      ');

  return `<section class="section section--soft" aria-labelledby="shorts-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Watch Our Latest Shorts</p>
      <h2 class="section-title" id="shorts-heading">YouTube Shorts from Dancewala Studio</h2>
      <p class="section-text">Quick routines and class moments from the official Dancewala Studio YouTube channel. Only a thumbnail loads until you press play, so the page stays fast.</p>
    </div>
    <div class="shorts-grid">
      ${cards}
    </div>
    <p class="text-center" style="margin-top:1.75rem">
      ${btn(BUSINESS.social.youtube, 'Watch More on YouTube', 'dark', ' target="_blank" rel="noopener noreferrer"')}
    </p>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Online booking CTA strip
 * ------------------------------------------------------------------ */
export function onlineBookingCta() {
  return `<section class="section section--dark" aria-labelledby="bookcta-heading">
  <div class="container">
    <div class="section-head section-head--light">
      <p class="eyebrow">Book Online</p>
      <h2 class="section-title" id="bookcta-heading">Book in Six Short Steps</h2>
      <p class="section-text">Pick your service, tell us who it is for, choose a slot, review and pay. The whole thing takes about two minutes.</p>
    </div>
    <ol class="process" style="grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));color:var(--on-dark)">
      ${['Select a service', 'Enter your details', 'Sign in or continue as guest', 'Choose date and time', 'Review the booking', 'Pay and confirm']
        .map(
          (t, i) => `<li class="process__step">
        <h3 class="process__title" style="color:#fff">${esc(t)}</h3>
        <p class="process__text" style="color:var(--on-dark-muted)">Step ${i + 1} of 6</p>
      </li>`
        )
        .join('\n      ')}
    </ol>
    <p class="text-center" style="margin-top:2.25rem">
      ${btn('/booking/', 'Book Now', 'primary')}
      ${btn('/dance-classes/', 'Explore Services', 'ghost')}
    </p>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Contact block
 * ------------------------------------------------------------------ */
export function contactSection() {
  return `<section class="section section--white" aria-labelledby="home-contact-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Contact</p>
      <h2 class="section-title" id="home-contact-heading">Talk to the Studio</h2>
      <p class="section-text">Not sure which batch fits, or planning something with a date attached? Call, message or email — a real person replies.</p>
    </div>
    <div class="grid grid--4">
      <a class="contact-card" href="${BUSINESS.phoneHref}">
        <span class="contact-card__label"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 3h3l1.6 4-2 1.4a11 11 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>Phone</span>
        <span class="contact-card__value">${esc(BUSINESS.phone)}</span>
        <span class="contact-card__hint">Mon–Sat, studio hours</span>
      </a>
      <a class="contact-card" href="${BUSINESS.whatsappHref}" target="_blank" rel="noopener noreferrer">
        <span class="contact-card__label"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 11.6A8.4 8.4 0 0 1 7.9 18L4 19.5l1.6-3.7A8.4 8.4 0 1 1 20.5 11.6Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.2 8.6c.3-.6.6-.6.9-.6h.7c.2 0 .5 0 .7.5l.9 2c.1.3 0 .5-.1.7l-.5.7c-.2.2-.3.4-.1.7a6.6 6.6 0 0 0 2.8 2.5c.3.1.5 0 .7-.2l.7-.8c.2-.2.4-.3.7-.1l2 .9c.3.2.4.3.4.5v1c-.1.3-.6.8-1 .9-.5.1-1 .2-3.1-.6a10.6 10.6 0 0 1-4.7-4c-.3-.5-.7-1.3-.7-2.2 0-1 .5-1.5.7-1.7Z" fill="currentColor"/></svg>WhatsApp</span>
        <span class="contact-card__value">${esc(BUSINESS.whatsapp)}</span>
        <span class="contact-card__hint">Fastest reply</span>
      </a>
      <a class="contact-card" href="${BUSINESS.emailHref}">
        <span class="contact-card__label"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="5" width="19" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>Email</span>
        <span class="contact-card__value">${esc(BUSINESS.email)}</span>
        <span class="contact-card__hint">For detailed enquiries</span>
      </a>
      <a class="contact-card" href="${BUSINESS.directionsUrl}" target="_blank" rel="noopener noreferrer">
        <span class="contact-card__label"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>Find Us</span>
        <span class="contact-card__value">Sector 46, ${esc(BUSINESS.city)}</span>
        <span class="contact-card__hint">Get directions</span>
      </a>
    </div>
    <p class="text-center" style="margin-top:2rem">
      ${btn('/contact-us/', 'Contact Us', 'dark')}
    </p>
  </div>
</section>`;
}
