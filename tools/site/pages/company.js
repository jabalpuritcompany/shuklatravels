/**
 * About us, our story, why dancewala, instructors, contact us.
 */
import { BUSINESS } from '../config.js';
import { CLASSES, TEAM } from '../data.js';
import {
  esc, img, btn, waBtn, sectionHead, ctaBand, locationSection, faqAccordion,
  faqSchema, webPageSchema,
} from '../layout.js';
import { enquiryForm, galleryGrid } from '../components.js';
import { GALLERY } from '../data.js';

const HERO = (title, text, image, alt) => `<section class="page-hero page-hero--split">
  <div class="container page-hero__grid">
    <div class="page-hero__copy">
      <h1>${esc(title)}</h1>
      <p class="page-hero__text">${esc(text)}</p>
      <div class="btn-row" style="margin-top:1.75rem">
        ${btn('/booking/', 'Book Now', 'primary')}
        ${btn('/contact-us/', 'Contact Us', 'ghost')}
      </div>
    </div>
    <div class="page-hero__media">
      ${img(image, alt, { sizes: '(min-width: 900px) 42vw, 92vw', w: 800, h: 600, cls: 'rounded-media' })}
    </div>
  </div>
</section>`;

/* ================================================================== *
 * /about-us/
 * ================================================================== */
export const aboutUsPage = {
  url: '/about-us/',
  title: 'About Us | Dancewala Studio, Sector 46 Gurugram',
  description:
    'Dancewala Studio is a dance studio in Sector 46, Gurugram offering dance classes, choreography and workshops for kids, teens and adults. Meet the studio and its approach.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'About Us', url: '/about-us/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },

  body: `
${HERO(
  'About Dancewala Studio',
  'A dance studio in Sector 46, Gurugram for children, teenagers and adults — weekly classes, choreography for weddings and events, and workshops that end on a stage.',
  'hero/studio-interior',
  'Dancers rehearsing inside the Dancewala Studio space in Sector 46, Gurugram'
)}

<section class="section section--white">
  <div class="container">
    <div class="split split--wide-left">
      <div class="prose" data-reveal>
        <h2>What the Studio Is</h2>
        <p>People arrive at Dancewala Studio for very different reasons. Some want their child to stand on a stage without freezing. Some have a wedding in three months and a family that expects a performance. Some just want one hour a week that belongs entirely to them.</p>
        <p>What they get is the same thing: a room with a mirror, a teacher who breaks the routine down until it makes sense, and a group of people working on the same problem. Progress here is not mysterious. It is counts, repetition and honest feedback.</p>
        <p>The studio teaches Bollywood, hip hop, contemporary and freestyle, and runs separate batches for kids, adults and complete beginners. Outside class hours it choreographs weddings, sangeets, family performances, stage shows and corporate events across Gurugram.</p>
      </div>
      <aside class="summary-card" data-reveal>
        <h2 class="summary-card__title">Studio Details</h2>
        <dl class="summary-rows">
          <div class="summary-row"><dt>Name</dt><dd>${esc(BUSINESS.name)}</dd></div>
          <div class="summary-row"><dt>Address</dt><dd>Building 19, Second Floor, Huda Market, Sector 46, ${esc(BUSINESS.city)}, ${esc(BUSINESS.region)} ${esc(BUSINESS.postcode)}</dd></div>
          <div class="summary-row"><dt>Phone</dt><dd><a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></dd></div>
          <div class="summary-row"><dt>WhatsApp</dt><dd>${esc(BUSINESS.whatsapp)}</dd></div>
          <div class="summary-row"><dt>Email</dt><dd><a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></dd></div>
        </dl>
        <div class="btn-row" style="margin-top:1.25rem">
          ${btn(BUSINESS.directionsUrl, 'Get Directions', 'primary', ' target="_blank" rel="noopener noreferrer"')}
          ${waBtn('WhatsApp Us')}
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">What We Believe</p>
      <h2 class="section-title">How We Think About Teaching</h2>
    </div>
    <div class="grid grid--3">
      ${[
        ['Nobody Is Born Knowing This', 'Every dancer you admire once could not do this. Classes are built assuming nothing about what you already know.'],
        ['Counts Before Style', 'Style is what you add once the structure is automatic. We teach the structure first, then let personality in.'],
        ['Practice Needs an Audience', 'Studio events and showcases exist because working towards a date changes how seriously people rehearse.'],
        ['Getting It Wrong Is the Job', 'A room where mistakes are normal is a room where people actually improve. We protect that.'],
        ['Different Ages, Different Methods', 'A seven-year-old and a working professional are taught differently, even to the same song.'],
        ['The Occasion Comes First', 'For choreography, the event, the family and the date decide the routine — not the other way round.'],
      ]
        .map(([t, d]) => `<article class="feature" data-reveal>
        <h3 class="feature__title">${esc(t)}</h3>
        <p class="feature__text">${esc(d)}</p>
      </article>`)
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Who We Welcome</p>
      <h2 class="section-title">Who Comes to the Studio</h2>
    </div>
    <div class="pill-list" style="justify-content:center">
      ${['Children', 'Teenagers', 'Working adults', 'Complete beginners', 'Parents and toddlers', 'Wedding couples', 'Families preparing a sangeet', 'Corporate teams', 'Event organisers']
        .map((p) => `<span class="pill">${esc(p)}</span>`)
        .join('\n      ')}
    </div>
    <p class="text-center" style="margin-top:2rem;max-width:60ch;margin-inline:auto;color:var(--muted)">If you are not sure which of those you are yet, that is fine. Send a message describing what you have in mind and the studio will tell you which batch fits.</p>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section-head"><h2 class="section-title">Inside the Studio</h2></div>
    ${galleryGrid(GALLERY.slice(0, 4))}
  </div>
</section>

${ctaBand({ title: 'Come and See the Studio', text: 'Book a slot online, or message us and we will help you choose the right batch.' })}`,
};

/* ================================================================== *
 * /our-story/
 * ================================================================== */
export const ourStoryPage = {
  url: '/our-story/',
  title: 'Our Story | Dancewala Studio Gurugram',
  description:
    'The story of Dancewala Studio in Sector 46, Gurugram — how a dance studio built around patience, performance and community came together.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'About Us', url: '/about-us/' }, { label: 'Our Story', url: '/our-story/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },

  body: `
${HERO(
  'Our Story',
  'Dancewala Studio was built around a fairly ordinary observation: most people who want to dance never start, because the first class feels like the hard part.',
  'hero/practice-session',
  'Dancers practising a routine during a session at Dancewala Studio'
)}

<section class="section section--white">
  <div class="container">
    <div class="prose measure" data-reveal style="margin-inline:auto">
      <p class="lede">Note from the studio: this page describes how the studio works rather than a detailed company history. Founding dates, milestones and instructor biographies are added here once the studio confirms them.</p>

      <h2>Starting With the First Class</h2>
      <p>Almost everyone who walks into a dance studio for the first time is quietly worried about the same thing — that they will be the worst person in the room. It is a reasonable fear. It is also the single biggest reason people never go.</p>
      <p>So the studio is arranged around removing it. Beginner batches exist so that nobody is the only beginner. Steps are taught in counts before anyone is asked to look graceful. Mistakes are treated as the normal cost of learning rather than something to be embarrassed about.</p>

      <h2>Then Adding a Reason to Practise</h2>
      <p>Technique alone does not keep people coming back. What does is a date. Once students know they will be performing at a studio event, rehearsal changes character — people turn up, they practise between sessions, and they start caring about the details.</p>
      <p>That is why performances are built into how the studio operates rather than treated as an optional extra at the end of the year.</p>

      <blockquote class="pull-quote">
        The studio is not producing professional dancers, though some students go on to that. It is producing people who can dance at a wedding, on a stage, or in their own living room without hesitating.
      </blockquote>

      <h2>And Then the Weddings</h2>
      <p>Choreography work followed naturally. Once you have taught enough people to dance, families start asking whether you can sort out the sangeet. That work is different — fixed dates, mixed abilities, one rehearsal window — and the studio built a process for it: talk to the family first, build around the least confident performer, rehearse on their schedule.</p>

      <h2>Where It Is Now</h2>
      <p>Today Dancewala Studio runs weekly batches for kids, teens and adults, choreographs weddings and events across Gurugram, and holds workshops and showcases through the year. It operates from Building 19, Second Floor, Huda Market, Sector 46.</p>
      <p>The thing that has not changed is the first class. Somebody walks in unsure, and leaves knowing a few counts. That is the whole business.</p>
    </div>
  </div>
</section>

${ctaBand({ title: 'Be Part of What Happens Next', text: 'Book your first class online, or talk to us about choreography.' })}`,
};

/* ================================================================== *
 * /why-dancewala/
 * ================================================================== */
export const whyDancewalaPage = {
  url: '/why-dancewala/',
  title: 'Why Dancewala | Dance Studio in Sector 46, Gurugram',
  description:
    'What makes Dancewala Studio different: beginner-friendly teaching, structured progress, performance opportunities, personalised choreography and a supportive studio community.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Why Dancewala', url: '/why-dancewala/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },

  body: `
${HERO(
  'Why Dancewala',
  'Six things that shape how the studio teaches, rehearses and performs — and why people tend to stay.',
  'hero/dance-classes-gurugram',
  'Dancers mid-movement during a class at Dancewala Studio in Gurugram'
)}

<section class="section section--white">
  <div class="container">
    <div class="grid grid--3">
      ${[
        ['Learning That Is Structured', 'Every routine is broken into counts and phrases you can actually hold in your head. Progress feels steady instead of mysterious, and you always know what you are working on.'],
        ['Confidence Built Deliberately', 'Confidence here is a by-product of competence. When you can do the routine, the nerves look after themselves — so the teaching aims at competence first.'],
        ['Creativity, Not Copying', 'Choreography is built for the song, the occasion and the people performing it. Nothing is lifted wholesale from a video and handed over.'],
        ['Practice With a Purpose', 'Studio events and showcases give students a real date and a real audience. It changes how seriously everyone rehearses, including the reluctant ones.'],
        ['Personalised Where It Matters', 'Batches are grouped by age and level, and choreography is shaped around the least confident performer in the group rather than the strongest.'],
        ['A Studio That Feels Like Yours', 'People keep coming back because of the room as much as the teaching. It is a place where getting a step wrong is part of learning it.'],
      ]
        .map(([t, d], i) => `<article class="feature" data-reveal>
        <span class="feature__icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><text x="12" y="16" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor">${i + 1}</text></svg></span>
        <h3 class="feature__title">${esc(t)}</h3>
        <p class="feature__text">${esc(d)}</p>
      </article>`)
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="split">
      <div data-reveal>
        <p class="eyebrow">Community</p>
        <h2 class="section-title" style="color:#fff">It Is Not Only About the Steps</h2>
        <p style="color:var(--on-dark-muted)">Students come for the dancing and stay for the people. Batches turn into groups that turn up to each other’s performances, and parents end up knowing each other. That is not a marketing line — it is just what happens when the same people share a room twice a week.</p>
        <p style="color:var(--on-dark-muted)">It also explains the weddings. A significant share of the choreography work the studio does comes from families who already had someone in a batch.</p>
      </div>
      <div data-reveal>
        ${img('events/community-event', 'Community dance evening with people of all ages dancing together', { sizes: '(min-width: 900px) 45vw, 92vw', w: 800, h: 600, cls: 'rounded-media' })}
      </div>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    ${faqAccordion([
      { q: 'Do I need experience to join Dancewala Studio?', a: 'No. Beginner batches exist specifically for people starting from zero, and every class teaches from the ground up.' },
      { q: 'Are there separate batches for kids and adults?', a: 'Yes. Children, teenagers and adults are taught separately because they learn differently.' },
      { q: 'Will I get to perform?', a: 'Yes. Studio events and showcases are built into the calendar, and students are encouraged to take part.' },
      { q: 'Can the studio handle a wedding or sangeet?', a: 'Yes. Wedding, sangeet, couple, family and group, event and corporate choreography are all offered.' },
      { q: 'How do I book?', a: 'Use the Book Now button anywhere on this site, call +91 9818501007, or message the studio on WhatsApp at 8796911005.' },
    ], 'Why Dancewala — Questions')}
  </div>
</section>

${ctaBand({ title: 'See It for Yourself', text: 'Book a class and judge the studio on your own first session.' })}`,
};

/* ================================================================== *
 * /instructors/
 * ================================================================== */
export const instructorsPage = {
  url: '/instructors/',
  title: 'Instructors & Team | Dancewala Studio Gurugram',
  description:
    'Meet the instructors at Dancewala Studio, Sector 46, Gurugram. Profiles are updated as the studio confirms each instructor, specialization and photograph.',
  scripts: ['gallery', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Instructor / Team', url: '/instructors/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },

  body: `
${HERO(
  'Instructor / Team',
  'The people who run the room. Profiles are published as the studio confirms them — no invented names or biographies.',
  'events/dance-workshop-session',
  'Instructor demonstrating a step during a dance workshop session'
)}

<section class="section section--white">
  <div class="container">
    <div class="demo-notice" style="margin-bottom:2rem">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <span><strong>Editable placeholders</strong>These cards are intentionally unfilled. Add each instructor’s name, role, specialisation, photograph and short bio in <code>tools/site/data.js</code> under <code>TEAM</code> — the grid updates across the whole site.</span>
    </div>

    <div class="grid grid--4">
      ${TEAM.map(
        (t) => `<article class="team-card" data-reveal>
        <span class="team-card__avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </span>
        <h2 class="team-card__name">${esc(t.name)}</h2>
        <p class="team-card__role">${esc(t.role)}</p>
        <p class="team-card__spec">${esc(t.specialization)}</p>
        <p class="team-card__bio">${esc(t.bio)}</p>
        <span class="team-card__flag">Placeholder</span>
      </article>`
      ).join('\n      ')}
    </div>

    <div class="split" style="margin-top:3.5rem">
      <div class="prose" data-reveal>
        <h2>How the Studio Staffs Its Classes</h2>
        <p>Instructors are matched to batches rather than assigned at random. Kids batches need patience and a very different pace from an adult contemporary class, and choreography work needs someone who can plan a rehearsal calendar around a family’s availability.</p>
        <p>If you are booking a specific style and would like to know who takes that batch, ask when you enquire — the studio will tell you directly rather than have you guess from a photo grid.</p>
      </div>
      <div data-reveal>
        ${img('events/dance-workshop-session', 'Dancers taking part in a workshop session at Dancewala Studio', { sizes: '(min-width: 900px) 45vw, 92vw', w: 800, h: 600, cls: 'rounded-media' })}
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Book Now', text: 'Choose your class and we will match you with the right instructor and batch.' })}`,
};

/* ================================================================== *
 * /contact-us/
 * ================================================================== */
export const contactUsPage = {
  url: '/contact-us/',
  title: 'Contact Us | Dancewala Studio, Sector 46 Gurugram',
  description:
    'Contact Dancewala Studio in Sector 46, Gurugram. Call +91 9818501007, WhatsApp 8796911005 or email dancewalas@gmail.com. Send an enquiry or book online.',
  scripts: ['gallery', 'form-handler', 'forms', 'social', 'seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Contact Us', url: '/contact-us/' }],
  jsonld: function () { return [webPageSchema(this, this.trail), faqSchema([
    { q: 'Where is Dancewala Studio located?', a: 'Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003, India.' },
    { q: 'What is the phone number for Dancewala Studio?', a: '+91 9818501007.' },
    { q: 'Can I contact the studio on WhatsApp?', a: 'Yes, message 8796911005 on WhatsApp.' },
    { q: 'What is the studio email address?', a: 'dancewalas@gmail.com.' },
  ])]; },

  body: `
<section class="page-hero">
  <div class="container page-hero__inner">
    <h1>Contact Us</h1>
    <p class="page-hero__text">Call, message or email — a real person replies. For bookings, the online form on this page is fastest.</p>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    <div class="grid grid--4">
      <a class="contact-card" href="${BUSINESS.phoneHref}">
        <span class="contact-card__label"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 3h3l1.6 4-2 1.4a11 11 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>Call</span>
        <span class="contact-card__value">${esc(BUSINESS.phone)}</span>
        <span class="contact-card__hint">Tap to call</span>
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
        <span class="contact-card__label"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>Directions</span>
        <span class="contact-card__value">Sector 46, ${esc(BUSINESS.city)}</span>
        <span class="contact-card__hint">Open in Google Maps</span>
      </a>
    </div>

    <div class="btn-row" style="margin-top:2rem;justify-content:center">
      ${btn(BUSINESS.phoneHref, 'Call Now', 'primary')}
      ${waBtn('WhatsApp')}
      ${btn(BUSINESS.emailHref, 'Email', 'outline')}
      ${btn(BUSINESS.directionsUrl, 'Get Directions', 'outline', ' target="_blank" rel="noopener noreferrer"')}
    </div>
  </div>
</section>

${enquiryForm({
  title: 'Send an Enquiry',
  text: 'Tell us what you are looking for and the studio will get back to you with the right batch, timings and next steps.',
})}

${locationSection()}

<section class="section section--white">
  <div class="container">
    ${faqAccordion([
      { q: 'Where is Dancewala Studio located?', a: 'Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003, India.' },
      { q: 'What is the phone number for Dancewala Studio?', a: '+91 9818501007.' },
      { q: 'Can I contact the studio on WhatsApp?', a: 'Yes — send a message to 8796911005.' },
      { q: 'What is the studio email address?', a: 'dancewalas@gmail.com.' },
      { q: 'How do I book a class?', a: 'Use the Book Now button on any page, or the enquiry form above. You can also call or message the studio directly.' },
      { q: 'Are class fees and timings published?', a: 'No. Fees and batch timings are shared directly by the studio so they match the batch that actually suits you.' },
    ], 'Contact — Questions')}
  </div>
</section>`,
};
