/**
 * Listing / hub pages: dance classes, choreography, workshops & events, gallery.
 */
import { BUSINESS } from '../config.js';
import { CLASSES, CHOREOGRAPHY, WORKSHOP_TYPES, EVENTS, GALLERY, TEAM } from '../data.js';
import {
  esc, img, btn, waBtn, sectionHead, classCard, choreoCard, eventCard, eventEmptyState,
  ctaBand, faqAccordion, faqSchema, webPageSchema, locationSection,
} from '../layout.js';
import { galleryGrid, reelsSection, shortsSection } from '../components.js';

const HUB_HERO = ({ eyebrow, title, text, image, alt }) => `<section class="page-hero page-hero--split">
  <div class="container page-hero__grid">
    <div class="page-hero__copy">
      <h1>${esc(title)}</h1>
      <p class="page-hero__text">${esc(text)}</p>
      <div class="btn-row" style="margin-top:1.75rem">
        ${btn('/booking/', 'Book Now', 'primary')}
        ${waBtn('WhatsApp Us')}
      </div>
    </div>
    <div class="page-hero__media">
      ${img(image, alt, { sizes: '(min-width: 900px) 42vw, 92vw', w: 800, h: 600, cls: 'rounded-media' })}
    </div>
  </div>
</section>`;

/* ================================================================== *
 * /dance-classes/
 * ================================================================== */
export const danceClassesHub = {
  url: '/dance-classes/',
  title: 'Dance Classes in Gurugram | Kids, Adults & Beginners | Dancewala Studio',
  description:
    'Dance classes at Dancewala Studio, Sector 46, Gurugram: kids, adult and beginner batches plus Bollywood, hip hop, contemporary and freestyle. Book online.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Dance Classes', url: '/dance-classes/' }],
  jsonld: function () { return [webPageSchema(this, this.trail), faqSchema([
    { q: 'What dance classes does Dancewala Studio offer?', a: 'Kids dance classes, adult dance classes, beginner dance classes, Bollywood dance, hip hop dance, contemporary dance and freestyle dance.' },
    { q: 'Where are the dance classes held?', a: 'At Dancewala Studio, Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003.' },
    { q: 'Can a complete beginner join?', a: 'Yes. There are dedicated beginner batches and no previous experience is required.' },
    { q: 'How do I book a dance class?', a: 'Use the Book Now button, call +91 9818501007, or message the studio on WhatsApp at 8796911005.' },
  ])]; },

  body: `
${HUB_HERO({
  eyebrow: 'Dance Classes',
  title: 'Dance Classes in Gurugram',
  text: 'Seven ways in at Dancewala Studio — pick by age, by style, or by how much experience you are starting with. Every batch is taught from the ground up.',
  image: 'hero/dance-classes-gurugram',
  alt: 'Dancers mid-movement during a class at Dancewala Studio in Gurugram',
})}

<section class="section section--white">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Choose Your Class</p>
      <h2 class="section-title">Classes at the Studio</h2>
      <p class="section-text">Each class has its own page with details on who it suits, what you learn and what a session looks like.</p>
    </div>
    <div class="card-grid">
      ${CLASSES.map(classCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="split">
      <div class="prose" data-reveal>
        <h2>How Batches Work</h2>
        <p>Classes run in age and level groupings rather than one mixed room. Kids, adults and beginners are taught separately, because a nine-year-old and a working professional do not learn the same way — even when the song is the same.</p>
        <p>Every session follows a similar shape: warm up, work on technique or a specific concept, build choreography in sections, then run it with music. That structure is what makes progress visible week to week.</p>
        <p>You do not need to commit to a style before you start. Plenty of students arrive wanting Bollywood and end up spending a year on hip hop.</p>
      </div>
      <div data-reveal>
        <ul class="check-list">
          ${['Separate batches for kids, adults and beginners', 'Choreography taught in counts, not copied', 'Regular studio events with stage time', 'No audition and no experience needed', 'Fees and timings shared on enquiry']
            .map((w) => `<li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(w)}</span></li>`)
            .join('\n          ')}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    ${faqAccordion([
      { q: 'What dance classes does Dancewala Studio offer?', a: 'Kids dance classes, adult dance classes, beginner dance classes, Bollywood dance, hip hop dance, contemporary dance and freestyle dance.' },
      { q: 'Can a complete beginner join?', a: 'Yes. There are dedicated beginner batches and no previous experience is required.' },
      { q: 'Where are the classes held?', a: 'At Dancewala Studio, Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003.' },
      { q: 'How do I book a dance class?', a: 'Use the Book Now button, call +91 9818501007, or message the studio on WhatsApp at 8796911005.' },
    ], 'Dance Classes — Questions')}
  </div>
</section>

${ctaBand({ title: 'Book a Dance Class', text: 'Pick your class, choose a slot and confirm your booking online.' })}`,
};

/* ================================================================== *
 * /choreography/
 * ================================================================== */
export const choreographyHub = {
  url: '/choreography/',
  title: 'Choreography Services in Gurugram | Wedding & Sangeet | Dancewala Studio',
  description:
    'Choreography by Dancewala Studio, Sector 46, Gurugram — wedding, sangeet, couple, family & group, event and corporate choreography. Enquire or book online.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Choreography', url: '/choreography/' }],
  jsonld: function () { return [webPageSchema(this, this.trail), faqSchema([
    { q: 'Does Dancewala Studio provide wedding choreography?', a: 'Yes, along with sangeet, couple, family and group, event and corporate choreography.' },
    { q: 'Can you choreograph for people who have never danced?', a: 'Yes. Routines are built around the least experienced person in the group.' },
    { q: 'How much rehearsal time is needed?', a: 'It depends on the routine and the number of performers. Share your event date and the studio will advise.' },
    { q: 'How do I book choreography?', a: 'Use the Book Now button, call +91 9818501007, or message the studio on WhatsApp at 8796911005.' },
  ])]; },

  body: `
${HUB_HERO({
  eyebrow: 'Choreography',
  title: 'Choreography Services in Gurugram',
  text: 'Weddings, sangeets, family functions, stage shows and corporate events — choreographed and rehearsed with you, not handed over as a video file.',
  image: 'hero/wedding-sangeet-choreography',
  alt: 'Couple dancing at a sangeet ceremony choreographed by Dancewala Studio',
})}

<section class="section section--white">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Our Services</p>
      <h2 class="section-title">What We Choreograph</h2>
      <p class="section-text">Six services, each with its own process. All of them start the same way: a conversation about who is dancing and what the occasion needs.</p>
    </div>
    <div class="card-grid">
      ${CHOREOGRAPHY.map(choreoCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-head section-head--light section-head--left">
      <p class="eyebrow">The Process</p>
      <h2 class="section-title">How a Choreography Project Runs</h2>
    </div>
    <ol class="process">
      ${[
        'A brief: the occasion, the date, the songs and exactly who is performing.',
        'Structure and song selection, signed off before anything is taught.',
        'Choreography built around the real ability of the group.',
        'Rehearsals scheduled around the people involved — not the other way round.',
        'Combined runs once each part is secure.',
        'Final rehearsal close to the event, with notes for the day itself.',
      ]
        .map((s, i) => `<li class="process__step" data-reveal><h3 class="process__title">Step ${i + 1}</h3><p class="process__text">${esc(s)}</p></li>`)
        .join('\n      ')}
    </ol>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    ${faqAccordion([
      { q: 'Does Dancewala Studio provide wedding choreography in Gurugram?', a: 'Yes. Wedding and sangeet choreography are core services, alongside couple, family and group, event and corporate choreography.' },
      { q: 'Can you work with people who have never danced?', a: 'Yes. Routines are built around the least experienced performer so nobody is exposed on stage.' },
      { q: 'How much rehearsal time is needed?', a: 'It depends on the routine length and the number of performers. Share your event date when you enquire.' },
      { q: 'Do you choreograph for corporate events?', a: 'Yes. Corporate choreography covers offsites, annual days, launches and team events.' },
    ], 'Choreography — Questions')}
  </div>
</section>

${ctaBand({ title: 'Book Choreography', text: 'Tell us the date and the occasion. We will tell you what is possible.' })}`,
};

/* ================================================================== *
 * /workshops-events/ + subpages
 * ================================================================== */
export const workshopsHub = {
  url: '/workshops-events/',
  title: 'Dance Workshops & Events in Gurugram | Dancewala Studio',
  description:
    'Dance workshops, special workshops, events and performances at Dancewala Studio, Sector 46, Gurugram. See upcoming workshops and register online.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Workshops & Events', url: '/workshops-events/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },

  body: `
${HUB_HERO({
  eyebrow: 'Workshops & Events',
  title: 'Dance Workshops & Events',
  text: 'Short, focused sessions and the stage moments that give all that practice somewhere to land.',
  image: 'hero/workshops-performances',
  alt: 'Dance troupe performing on stage under dramatic lighting',
})}

<section class="section section--white">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Explore</p>
      <h2 class="section-title">Workshops, Events & Performances</h2>
    </div>
    <div class="card-grid">
      ${WORKSHOP_TYPES.map(
        (w) => `<article class="card card--class" data-reveal>
        <a class="card__media" href="/workshops-events/${w.slug}/" tabindex="-1" aria-hidden="true">
          ${img(w.image, w.alt, { sizes: '(min-width: 1080px) 23vw, (min-width: 700px) 45vw, 90vw', w: 800, h: 600, cls: 'card__img' })}
        </a>
        <div class="card__body">
          <h3 class="card__title"><a href="/workshops-events/${w.slug}/">${esc(w.title)}</a></h3>
          <p class="card__text">${esc(w.short)}</p>
          <a class="link-arrow" href="/workshops-events/${w.slug}/">Learn More
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </article>`
      ).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-head section-head--light">
      <p class="eyebrow">Upcoming</p>
      <h2 class="section-title">Upcoming Workshops</h2>
    </div>
    ${EVENTS.length ? `<div class="card-grid card-grid--events">${EVENTS.map(eventCard).join('')}</div>` : eventEmptyState()}
  </div>
</section>

${ctaBand({ title: 'Book a Workshop', text: 'Workshop dates are announced as they are confirmed. Book online or ask us on WhatsApp.' })}`,
};

/* ------------------------- workshop subpages --------------------------- */
const WORKSHOP_COPY = {
  'dance-workshops': {
    lede: 'Focused sessions built around one style, one song or one skill — open to new and regular dancers.',
    body: [
      'A workshop is not a class. It has a single focus, a beginning and an end, and you leave with something finished rather than a routine in progress. That makes it a good way to try a style before committing to a batch.',
      'Sessions are open to people who have never danced and to dancers who have been at it for years. The teaching adapts; the focus stays the same.',
    ],
    who: ['Anyone curious about a style but not ready to commit', 'Existing students wanting concentrated work', 'People who can only attend occasionally', 'Groups of friends looking for something to do together'],
  },
  'special-workshops': {
    lede: 'Occasional sessions built around a theme, a guest faculty or a specific performance piece.',
    body: [
      'Special workshops run when there is a reason for them: a particular song, an artist visiting the studio, or a performance the studio is building towards. They are announced as they are confirmed.',
      'Because they are occasional, the best way to hear about the next one is to follow the studio on Instagram or send a message asking to be told.',
    ],
    who: ['Dancers who want something outside the regular syllabus', 'Students preparing for a specific performance', 'Anyone interested in a guest faculty session', 'People who follow the studio and wait for the announcement'],
  },
  events: {
    lede: 'Studio events, showcases and community gatherings where students get to perform for an audience.',
    body: [
      'Events are the reason students practise. Knowing there is a date, an audience and a stage changes how seriously a routine is rehearsed — and it is usually the moment a shy student stops being shy.',
      'Studio events range from informal showcase evenings to larger community gatherings. Families and friends are welcome.',
    ],
    who: ['Students who want stage experience', 'Families and friends of students', 'Anyone curious about the studio', 'Local residents looking for cultural events in Sector 46'],
  },
  performances: {
    lede: 'Choreographed stage performances by Dancewala Studio dancers and students.',
    body: [
      'Performances are where the studio’s work is visible outside its own four walls — at cultural programmes, community events and private occasions across Gurugram.',
      'If you are looking for a performance for your event, the studio choreographs and rehearses the piece, then brings the dancers. Start with the event choreography page or send a WhatsApp message with your date.',
    ],
    who: ['Event organisers looking for a dance act', 'Companies planning a cultural programme', 'Families wanting a performance at a celebration', 'Anyone who has seen the studio perform and wants it at their event'],
  },
  'upcoming-workshops': {
    lede: 'Announcements for the next workshops and batches at the studio.',
    body: [
      'This page is where confirmed workshops are listed — with the date, time, location and a registration button as soon as each one is finalised.',
      'Nothing is listed until it is confirmed. Rather than guess at dates, the studio publishes workshops only once the schedule is real.',
    ],
    who: ['People planning ahead', 'Students who attend every workshop', 'Anyone who wants to be notified first', 'Groups booking together'],
  },
};

export const workshopPages = WORKSHOP_TYPES.map((w) => {
  const c = WORKSHOP_COPY[w.slug];
  const url = `/workshops-events/${w.slug}/`;
  return {
    url,
    title: `${w.title} in Gurugram | Dancewala Studio`,
    description: `${w.title} at Dancewala Studio, Sector 46, Gurugram. ${c.lede}`,
    scripts: ['gallery', 'social', 'seo'],
    trail: [
      { label: 'Home', url: '/' },
      { label: 'Workshops & Events', url: '/workshops-events/' },
      { label: w.title, url },
    ],
    jsonld: function () { return [webPageSchema(this, this.trail)]; },
    body: `
${HUB_HERO({ eyebrow: 'Workshops & Events', title: w.title, text: c.lede, image: w.image, alt: w.alt })}

<section class="section section--white">
  <div class="container">
    <div class="split split--wide-left">
      <div class="prose" data-reveal>
        <h2>About ${esc(w.title)}</h2>
        ${c.body.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
      <aside class="summary-card" data-reveal>
        <h2 class="summary-card__title">Who It Is For</h2>
        <ul class="check-list" style="margin-top:1rem">
          ${c.who.map((x) => `<li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(x)}</span></li>`).join('\n          ')}
        </ul>
        <div class="btn-row" style="margin-top:1.25rem">
          ${btn('/booking/', 'Book Now', 'primary')}
          ${waBtn('Ask on WhatsApp', `Hello Dancewala Studio,\\n\\nI would like to know more about ${w.title}. Please share the details.`)}
        </div>
      </aside>
    </div>
  </div>
</section>

${w.slug === 'upcoming-workshops'
  ? `<section class="section section--dark">
  <div class="container">
    <div class="section-head section-head--light">
      <p class="eyebrow">Schedule</p>
      <h2 class="section-title">Confirmed Workshops</h2>
    </div>
    ${eventEmptyState()}
  </div>
</section>`
  : ''}

${w.slug === 'performances' || w.slug === 'events'
  ? `<section class="section section--soft">
  <div class="container">
    <div class="section-head"><h2 class="section-title">From the Studio</h2></div>
    ${galleryGrid(GALLERY.slice(6, 10))}
  </div>
</section>`
  : ''}

${ctaBand({ title: `Book ${w.title}`, text: 'Send an enquiry or book online — the studio confirms every date directly.' })}`,
  };
});

export const danceWorkshops = workshopPages[0];
export const specialWorkshops = workshopPages[1];
export const eventsPage = workshopPages[2];
export const performancesPage = workshopPages[3];
export const upcomingWorkshopsPage = workshopPages[4];

/* ================================================================== *
 * Gallery
 * ================================================================== */
const GALLERY_HERO = (title, text) => `<section class="page-hero">
  <div class="container page-hero__inner">
    <h1>${esc(title)}</h1>
    <p class="page-hero__text">${esc(text)}</p>
  </div>
</section>`;

export const galleryHub = {
  url: '/gallery/',
  title: 'Gallery | Photos, Videos, Reels & Shorts | Dancewala Studio Gurugram',
  description:
    'Inside Dancewala Studio, Sector 46, Gurugram: photos from classes and rehearsals, YouTube videos, Instagram reels and YouTube Shorts.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Gallery', url: '/gallery/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${GALLERY_HERO('Gallery', 'Rehearsals, class moments, performance nights and short-form video from Dancewala Studio.')}

<section class="section section--white">
  <div class="container">
    <div class="grid grid--4">
      ${[
        ['Photos', 'Still images from classes, rehearsals and performances.', '/gallery/photos/'],
        ['Videos', 'Longer routines and performances on the official YouTube channel.', '/gallery/videos/'],
        ['Instagram Reels', 'Short clips from the studio floor, posted on Instagram.', '/gallery/reels-shorts/'],
        ['YouTube Shorts', 'Quick routines published as Shorts on the studio channel.', '/gallery/reels-shorts/'],
      ]
        .map(([t, d, href]) => `<a class="feature" href="${href}" data-reveal style="text-decoration:none">
        <h3 class="feature__title">${esc(t)}</h3>
        <p class="feature__text">${esc(d)}</p>
        <span class="link-arrow" style="margin-top:.75rem">Open
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </a>`)
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section-head"><h2 class="section-title">Recent Photos</h2></div>
    ${galleryGrid(GALLERY.slice(0, 8))}
    <p class="text-center" style="margin-top:1.75rem">${btn('/gallery/photos/', 'See All Photos', 'dark')}</p>
  </div>
</section>

${reelsSection()}
${shortsSection()}
${ctaBand({ title: 'Book Now', text: 'Liked what you saw? Your first class is a couple of clicks away.' })}`,
};

export const photosPage = {
  url: '/gallery/photos/',
  title: 'Photos | Dancewala Studio Gurugram',
  description:
    'Photos from Dancewala Studio in Sector 46, Gurugram — dance classes, rehearsals, workshops and stage performances.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [
    { label: 'Home', url: '/' },
    { label: 'Gallery', url: '/gallery/' },
    { label: 'Photos', url: '/gallery/photos/' },
  ],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${GALLERY_HERO('Photos', 'Tap any photo to open it full size. Use the arrow keys to move through the set, or Escape to close.')}
<section class="section section--white">
  <div class="container">
    ${galleryGrid(GALLERY)}
    <p class="text-center" style="margin-top:2rem">
      ${btn('/booking/', 'Book Now', 'primary')}
      ${btn(BUSINESS.social.instagram, 'More on Instagram', 'outline', ' target="_blank" rel="noopener noreferrer"')}
    </p>
  </div>
</section>
${ctaBand({ title: 'Ready to Dance?', text: 'Take your first step with Dancewala Studio.' })}`,
};

export const videosPage = {
  url: '/gallery/videos/',
  title: 'Videos | Dancewala Studio Gurugram',
  description:
    'Watch Dancewala Studio videos — routines, rehearsals and performances from the official YouTube channel of the Sector 46, Gurugram studio.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [
    { label: 'Home', url: '/' },
    { label: 'Gallery', url: '/gallery/' },
    { label: 'Videos', url: '/gallery/videos/' },
  ],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${GALLERY_HERO('Videos', 'Longer routines, rehearsal films and performance recordings from the studio.')}
${shortsSection()}
<section class="section section--dark">
  <div class="container">
    <div class="section-head section-head--light">
      <h2 class="section-title">On the YouTube Channel</h2>
      <p class="section-text">Everything the studio publishes lives on the official Dancewala Studio YouTube channel.</p>
    </div>
    <p class="text-center">
      ${btn(BUSINESS.social.youtube, 'Watch Dancewala Studio on YouTube', 'ghost', ' target="_blank" rel="noopener noreferrer"')}
    </p>
  </div>
</section>
${ctaBand({ title: 'Book Now', text: 'Book a class or a choreography session online.' })}`,
};

export const reelsShortsPage = {
  url: '/gallery/reels-shorts/',
  title: 'Instagram Reels & YouTube Shorts | Dancewala Studio Gurugram',
  description:
    'Instagram Reels and YouTube Shorts from Dancewala Studio, Sector 46, Gurugram — short dance clips from classes, rehearsals and performances.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [
    { label: 'Home', url: '/' },
    { label: 'Gallery', url: '/gallery/' },
    { label: 'Reels & Shorts', url: '/gallery/reels-shorts/' },
  ],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${GALLERY_HERO('Reels & Shorts', 'Short-form clips from the studio floor and the stage.')}
${reelsSection()}
${shortsSection()}
${ctaBand({ title: 'Book Now', text: 'Book your slot at Dancewala Studio.' })}`,
};

void sectionHead;
void TEAM;
void locationSection;
