/**
 * Dancewala Studio — HOMEPAGE
 */
import { BUSINESS, SITE_URL } from '../config.js';
import { CLASSES, CHOREOGRAPHY, EVENTS, GALLERY, HOME_FAQ, TEAM, WORKSHOP_TYPES } from '../data.js';
import { img, btn, waBtn, sectionHead, classCard, choreoCard, eventCard, eventEmptyState, ctaBand, locationSection, localBusinessSchema, webPageSchema, faqSchema } from '../layout.js';
import { galleryGrid, videoSection, socialSection, reviewsSection, faqSection, reelsSection, shortsSection, onlineBookingCta, contactSection } from '../components.js';

const heroSlides = [
  {
    eyebrow: 'Move. Learn. Perform.',
    title: 'Dance Classes in Gurugram',
    text: 'Weekly batches for kids, teens and adults in Sector 46 — Bollywood, hip hop, contemporary and freestyle, taught step by step so nobody gets left behind.',
    image: 'hero/dance-classes-gurugram',
    alt: 'Dancers mid-movement during a class at Dancewala Studio in Gurugram',
    primary: { label: 'Book Now', href: '/booking/' },
    secondary: { label: 'Explore Dance Classes', href: '/dance-classes/' },
    heading: 'h1',
  },
  {
    eyebrow: 'Discover Your Rhythm',
    title: 'Kids & Adult Dance Classes',
    text: 'One studio, every age. Children build rhythm, coordination and stage confidence; adults find a way to move that fits around work and family.',
    image: 'hero/kids-adult-dance-classes',
    alt: 'A child and adults dancing together in a studio class at Dancewala Studio',
    primary: { label: 'Book Now', href: '/booking/' },
    secondary: { label: 'Kids Classes', href: '/dance-classes/kids-dance-classes/' },
  },
  {
    eyebrow: 'Make Your Celebration Move',
    title: 'Wedding & Sangeet Choreography',
    text: 'From the couple’s first dance to a full sangeet with both families — choreography shaped around your songs, your people and the time you actually have to rehearse.',
    image: 'hero/wedding-sangeet-choreography',
    alt: 'Couple dancing at a sangeet ceremony choreographed by Dancewala Studio',
    primary: { label: 'Book Now', href: '/booking/' },
    secondary: { label: 'WhatsApp Us', href: BUSINESS.whatsappHref + '?text=' + encodeURIComponent('Hello Dancewala Studio,\n\nI would like to enquire about wedding choreography. Please share the details.') },
  },
  {
    eyebrow: 'Learn. Practice. Perform.',
    title: 'Dance Workshops & Performances',
    text: 'Focused workshops and stage performances that give dancers something real to work towards — and an audience to share it with.',
    image: 'hero/workshops-performances',
    alt: 'Dance troupe performing on stage under dramatic lighting',
    primary: { label: 'Book Now', href: '/booking/' },
    secondary: { label: 'Explore Services', href: '/dance-classes/' },
  },
];

const features = [
  {
    title: 'Learn with Confidence',
    text: 'Every routine is broken down into counts and phrases you can actually remember, so progress feels steady instead of overwhelming.',
    icon: '<path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.5 6.8 19.2l1-5.9L3.5 9.2l5.9-.8L12 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  },
  {
    title: 'Beginner Friendly',
    text: 'No audition, no previous experience needed. Beginner batches start with posture, timing and basic steps before anything else.',
    icon: '<path d="M4 18c3.5 0 4.5-9 8-9s4.5 9 8 9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="6" r="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  },
  {
    title: 'Creative Choreography',
    text: 'Original choreography built around the song, the occasion and the people performing it — never a routine copied and pasted.',
    icon: '<path d="M5 19V9m4 10V5m4 14v-8m4 8V8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  },
  {
    title: 'Performance Focus',
    text: 'Class work leads somewhere. Students get stage time through studio events and showcases, which changes how seriously they rehearse.',
    icon: '<path d="M4 20h16M6.5 20V9l5.5-5 5.5 5v11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 20v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  },
  {
    title: 'Kids & Adults',
    text: 'Separate batches for children and adults, so a seven-year-old and a working professional are never taught the same way.',
    icon: '<circle cx="9" cy="8.5" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M15.5 19c0-2.2 1.4-3.8 3.4-3.8S22 16.8 22 19" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  },
  {
    title: 'A Supportive Studio',
    text: 'A room where getting a step wrong is part of learning it. People come back because the studio feels like theirs.',
    icon: '<path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.6c0 5-7 9.4-7 9.4Z" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  },
];

const HERO_HTML = `<section class="hero" data-slider data-slider-delay="6200" aria-roledescription="carousel" aria-label="Dancewala Studio highlights">
  <div class="hero__viewport">
    <div class="hero__track">
      ${heroSlides
        .map(
          (s, i) => `<div class="hero__slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="Slide ${i + 1} of ${heroSlides.length}" aria-hidden="${i === 0 ? 'false' : 'true'}">
        <div class="hero__media">
          ${img(s.image, s.alt, {
            sizes: '100vw',
            w: 1600,
            h: 900,
            loading: i === 0 ? 'eager' : 'lazy',
            fetchpriority: i === 0 ? 'high' : undefined,
          })}
        </div>
        <div class="hero__inner">
          <div class="container">
            <div class="hero__content">
              <p class="hero__eyebrow">${s.eyebrow}</p>
              ${s.heading === 'h1'
                ? `<h1 class="hero__title">${s.title}</h1>`
                : `<h2 class="hero__title">${s.title}</h2>`}
              <p class="hero__sub">${s.text}</p>
              <div class="hero__actions">
                ${btn(s.primary.href, s.primary.label, 'primary')}
                ${s.secondary.href.includes('wa.me')
                  ? waBtn(s.secondary.label, 'Hello Dancewala Studio,\n\nI would like to enquire about your dance classes. Please share available class timings and further details.')
                  : btn(s.secondary.href, s.secondary.label, 'ghost')}
              </div>
            </div>
          </div>
        </div>
      </div>`
        )
        .join('\n      ')}
    </div>

    <button class="hero__arrow hero__arrow--prev" type="button" aria-label="Previous slide">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <button class="hero__arrow hero__arrow--next" type="button" aria-label="Next slide">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>

    <div class="hero__dots"></div>
    <div class="hero__progress" aria-hidden="true"><span></span></div>
  </div>
</section>`;

export const home = {
  url: '/',
  title: 'Dancewala Studio | Dance Classes in Gurugram & Sector 46',
  description:
    'Dancewala Studio in Sector 46, Gurugram offers dance classes for kids and adults, wedding and sangeet choreography, workshops and performance training. Book a trial class today.',
  preload: '/assets/images/hero/dance-classes-gurugram-1600.webp',
  jsonld: () => [webPageSchema(home), faqSchema(HOME_FAQ)],

  body: `
${HERO_HTML}

<!-- ==================== WELCOME / INTRO ==================== -->
<section class="section section--light" aria-labelledby="welcome-heading">
  <div class="container">
    <div class="split">
      <div data-reveal>
        <p class="eyebrow">Welcome</p>
        <h2 class="section-title" id="welcome-heading">Welcome to Dancewala Studio</h2>
        <p class="lede">Dancewala Studio is a dance studio in Sector 46, Gurugram where children, teenagers and adults learn to move with confidence.</p>
        <p>Some people walk in for fitness. Some come because a wedding is three months away. Some are parents hoping their child will stand on a stage one day without freezing. The reason matters less than what happens next: a room, a mirror, a song, and a teacher who breaks the routine down until it makes sense.</p>
        <p>Classes run in Bollywood, hip hop, contemporary and freestyle, alongside batches built for kids, adults and complete beginners. Outside of class hours, the studio choreographs weddings, sangeets, family performances and corporate shows.</p>
        <p class="mb-0" style="font-family:var(--font-serif);font-size:var(--step-1);color:var(--text)">You do not need to arrive good at this. You only need to arrive.</p>
        <div class="btn-row" style="margin-top:1.75rem">
          ${btn('/about-us/', 'About the Studio', 'dark')}
          ${btn('/booking/', 'Book Now', 'outline')}
        </div>
      </div>
      <div class="media-stack" data-reveal>
        ${img('hero/studio-interior', 'Dancers rehearsing inside the Dancewala Studio space in Sector 46, Gurugram', {
          sizes: '(min-width: 1024px) 45vw, 92vw',
          w: 1200,
          h: 800,
          cls: 'rounded-media',
        })}
        <div class="media-stack__badge">
          <strong>Sector 46</strong>
          <span>Huda Market, Gurugram</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== WHY DANCEWALA ==================== -->
<section class="section section--dark" aria-labelledby="why-heading">
  <div class="container">
    <div class="section-head section-head--light">
      <p class="eyebrow">Why Dancewala</p>
      <h2 class="section-title" id="why-heading">Why People Stay</h2>
      <p class="section-text">Six things that shape how the studio teaches, rehearses and performs.</p>
    </div>
    <div class="grid grid--3">
      ${features
        .map(
          (f) => `<article class="feature" data-reveal>
        <span class="feature__icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${f.icon}</svg></span>
        <h3 class="feature__title">${f.title}</h3>
        <p class="feature__text">${f.text}</p>
      </article>`
        )
        .join('\n      ')}
    </div>
    <p class="text-center" style="margin-top:2.25rem">
      ${btn('/why-dancewala/', 'Read More About Our Approach', 'ghost')}
    </p>
  </div>
</section>

<!-- ==================== DANCE CLASSES ==================== -->
<section class="section section--white" aria-labelledby="classes-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Dance Classes</p>
      <h2 class="section-title" id="classes-heading">Find Your Class</h2>
      <p class="section-text">Seven ways in. Pick by age, by style, or by how much experience you are starting with.</p>
    </div>
    <div class="card-grid">
      ${CLASSES.map(classCard).join('\n      ')}
    </div>
    <p class="text-center" style="margin-top:2.25rem">
      ${btn('/dance-classes/', 'View All Dance Classes', 'primary')}
    </p>
  </div>
</section>

<!-- ==================== CHOREOGRAPHY ==================== -->
<section class="section section--soft" aria-labelledby="choreo-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Choreography</p>
      <h2 class="section-title" id="choreo-heading">Choreography for the Occasions That Matter</h2>
      <p class="section-text">Weddings, sangeets, family functions, stage shows and corporate events — choreographed and rehearsed with you, not handed over as a video.</p>
    </div>
    <div class="card-grid">
      ${CHOREOGRAPHY.map(choreoCard).join('\n      ')}
    </div>
    <p class="text-center" style="margin-top:2.25rem">
      ${btn('/choreography/', 'Explore Choreography Services', 'dark')}
    </p>
  </div>
</section>

<!-- ==================== WORKSHOPS & EVENTS ==================== -->
<section class="section section--dark" aria-labelledby="workshops-heading">
  <div class="container">
    <div class="section-head section-head--light">
      <p class="eyebrow">Workshops & Events</p>
      <h2 class="section-title" id="workshops-heading">Workshops, Events & Performances</h2>
      <p class="section-text">Short, focused sessions and the stage moments that give all that practice somewhere to land.</p>
    </div>
    <div class="card-grid">
      ${WORKSHOP_TYPES.slice(0, 4)
        .map(
          (w) => `<article class="card card--class" data-reveal>
        <a class="card__media" href="/workshops-events/${w.slug}/" tabindex="-1" aria-hidden="true">
          ${img(w.image, w.alt, { sizes: '(min-width: 1080px) 23vw, (min-width: 700px) 45vw, 90vw', w: 800, h: 600, cls: 'card__img' })}
        </a>
        <div class="card__body">
          <h3 class="card__title"><a href="/workshops-events/${w.slug}/">${w.title}</a></h3>
          <p class="card__text">${w.short}</p>
          <a class="link-arrow" href="/workshops-events/${w.slug}/">Learn More
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
    <div style="margin-top:2.5rem">
      <h3 class="section-title section-title--sm text-center" style="color:#fff">Upcoming Workshops</h3>
      ${EVENTS.length
        ? `<div class="card-grid card-grid--events">${EVENTS.map(eventCard).join('')}</div>`
        : eventEmptyState()}
    </div>
    <p class="text-center" style="margin-top:2.25rem">
      ${btn('/workshops-events/', 'All Workshops & Events', 'ghost')}
    </p>
  </div>
</section>

<!-- ==================== INSTRUCTORS ==================== -->
<section class="section section--white" aria-labelledby="team-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Instructor / Team</p>
      <h2 class="section-title" id="team-heading">The People in the Room</h2>
      <p class="section-text">Instructor profiles are being finalised. The cards below are placeholders ready for the studio team to fill in.</p>
    </div>
    <div class="grid grid--4">
      ${TEAM.map(
        (t) => `<article class="team-card" data-reveal>
        <span class="team-card__avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </span>
        <h3 class="team-card__name">${t.name}</h3>
        <p class="team-card__role">${t.role}</p>
        <p class="team-card__spec">${t.specialization}</p>
        <p class="team-card__bio">${t.bio}</p>
        <span class="team-card__flag">Placeholder</span>
      </article>`
      ).join('\n      ')}
    </div>
    <p class="text-center" style="margin-top:2.25rem">
      ${btn('/instructors/', 'Meet the Team', 'outline')}
    </p>
  </div>
</section>

${videoSection()}

<!-- ==================== GALLERY PREVIEW ==================== -->
<section class="section section--white" aria-labelledby="gallery-heading">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Gallery</p>
      <h2 class="section-title" id="gallery-heading">Inside the Studio</h2>
      <p class="section-text">Rehearsals, class moments and performance nights. Tap any photo to open it full size.</p>
    </div>
    ${galleryGrid(GALLERY, { limit: 8 })}
    <p class="text-center" style="margin-top:2.25rem">
      ${btn('/gallery/photos/', 'See All Photos', 'dark')}
      ${btn('/gallery/videos/', 'Watch Videos', 'outline')}
      ${btn('/gallery/reels-shorts/', 'Reels & Shorts', 'outline')}
    </p>
  </div>
</section>

${reelsSection()}

${shortsSection()}

${reviewsSection()}

${onlineBookingCta()}

${locationSection()}

${contactSection()}

${faqSection(HOME_FAQ)}

${ctaBand({
  title: 'Ready to Dance?',
  text: 'Take your first step with Dancewala Studio. Book your slot online in a couple of minutes.',
})}
`,
};
