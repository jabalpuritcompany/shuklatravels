/**
 * Location pages. Genuinely useful local content — not doorway pages.
 * Only factual, general geography of Gurugram is used. No invented claims
 * about "serving all of Gurgaon" or travel times we cannot verify.
 */
import { BUSINESS } from '../config.js';
import {
  esc, img, btn, waBtn, sectionHead, classCard, choreoCard, ctaBand, locationSection,
  faqAccordion, webPageSchema,
} from '../layout.js';
import { CLASSES, CHOREOGRAPHY } from '../data.js';

const HERO = (title, text, image, alt) => `<section class="page-hero page-hero--split">
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

/* Context reused across the location pages, written once. */
const REACHING = `<section class="section section--soft">
  <div class="container">
    <div class="split">
      <div class="prose" data-reveal>
        <h2>Reaching the Studio</h2>
        <p>The studio is on the second floor of Building 19 in Huda Market, Sector 46. It is a market building rather than a standalone studio, so look for the staircase up to the first-floor level and continue to the second.</p>
        <p>If you cannot find the entrance, call ${esc(BUSINESS.phone)} — somebody will come down and meet you. That happens more often than you would expect.</p>
        <p>Sector 46 sits in the older, planned part of Gurugram, with residential blocks, a market and schools around it. It is reachable by road from the sectors along the Golf Course Road and Sohna Road corridors.</p>
      </div>
      <div data-reveal>
        <ul class="check-list">
          ${[
            'Building 19, Second Floor — above Huda Market',
            'Sector 46, Gurugram, Haryana 122003',
            'Street parking around the market is generally available',
            'Call if you cannot find the staircase — we will guide you up',
            'Push a message on WhatsApp if you are running late for a trial',
          ]
            .map((w) => `<li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(w)}</span></li>`)
            .join('\n          ')}
        </ul>
      </div>
    </div>
  </div>
</section>`;

const LOCATION_DEFS = [
  {
    slug: 'dance-classes-gurugram',
    h1: 'Dance Classes in Gurugram',
    title: 'Dance Classes in Gurugram | Dancewala Studio',
    description:
      'Dance classes in Gurugram at Dancewala Studio — kids, adult and beginner batches, Bollywood, hip hop, contemporary and freestyle, from a studio in Sector 46. Book online.',
    lede: 'Weekly dance classes in Gurugram for children, teenagers and adults, taught from the ground up at a studio in Sector 46.',
    image: 'hero/dance-classes-gurugram',
    alt: 'Dancers mid-movement during a class at Dancewala Studio in Gurugram',
    intro: [
      'Gurugram has no shortage of places to exercise and no shortage of things to watch. Dance sits somewhere between the two — it is physical, but you are also learning something you can actually do at the end of it.',
      'Dancewala Studio runs its classes from Sector 46, in the older planned part of the city. Batches are grouped by age and level: kids, adults and complete beginners are taught separately, and styles cover Bollywood, hip hop, contemporary and freestyle.',
    ],
    faqs: [
      { q: 'Where in Gurugram is Dancewala Studio?', a: 'Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003.' },
      { q: 'What dance classes are available in Gurugram?', a: 'Kids dance classes, adult dance classes, beginner dance classes, Bollywood dance, hip hop dance, contemporary dance and freestyle dance.' },
      { q: 'Can a beginner join dance classes in Gurugram?', a: 'Yes. Beginner batches are designed for people with no previous dance experience.' },
      { q: 'How do I book a dance class in Gurugram?', a: 'Use the Book Now button, call +91 9818501007, or message 8796911005 on WhatsApp.' },
    ],
    grid: 'classes',
  },
  {
    slug: 'dance-classes-sector-46',
    h1: 'Dance Classes in Sector 46, Gurugram',
    title: 'Dance Classes in Sector 46, Gurugram | Dancewala Studio',
    description:
      'Dance classes in Sector 46, Gurugram at Dancewala Studio — Building 19, Second Floor, Huda Market. Kids, adult and beginner batches plus Bollywood, hip hop and contemporary.',
    lede: 'A dance studio on the second floor of Huda Market, Sector 46 — close enough to walk to if you live in the sector.',
    image: 'hero/studio-interior',
    alt: 'Dancers rehearsing inside the Dancewala Studio space in Sector 46, Gurugram',
    intro: [
      'Sector 46 is one of Gurugram’s established residential sectors: blocks of houses, a market, schools and the usual spread of small shops. The studio sits inside that market, on the second floor of Building 19.',
      'For families in and around Sector 46, that makes after-school classes practical — a child can walk or be dropped without a cross-city trip. Adults in the neighbouring sectors find it works the same way for an evening class.',
      'The studio offers kids, adult and beginner batches across Bollywood, hip hop, contemporary and freestyle, and runs choreography work for weddings and events alongside them.',
    ],
    faqs: [
      { q: 'Where exactly is the studio in Sector 46?', a: 'Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003. Call +91 9818501007 if you cannot find the entrance and someone will meet you.' },
      { q: 'Is there parking near the studio?', a: 'Street parking around Huda Market is generally available. Arrive a few minutes early for a trial class.' },
      { q: 'Do you take complete beginners in Sector 46?', a: 'Yes. Beginner batches are a regular part of the schedule.' },
      { q: 'Which sectors are near the studio?', a: 'The studio is in Sector 46, Gurugram. Nearby sectors are reachable by road; contact the studio and we will tell you the easiest route from yours.' },
    ],
    grid: 'classes',
  },
  {
    slug: 'kids-dance-classes-gurugram',
    h1: 'Kids Dance Classes in Gurugram',
    title: 'Kids Dance Classes in Gurugram | Dancewala Studio Sector 46',
    description:
      'Kids dance classes in Gurugram at Dancewala Studio, Sector 46. Age-grouped batches that build rhythm, coordination and stage confidence. Book a trial online.',
    lede: 'Structured, age-grouped dance classes for children in Gurugram — taught at a child’s pace, with stage time built in.',
    image: 'classes/kids-dance-classes',
    alt: 'Children dancing together during a kids dance class at Dancewala Studio in Gurugram',
    intro: [
      'A good kids dance class is not a miniature adult class. Children need shorter blocks of focus, more movement, and a reason to find it fun — otherwise they stop asking to go.',
      'At Dancewala Studio, kids batches open with a warm-up that feels like play, move into steps and counts, and build towards a routine the group can perform. Children are grouped by age so nobody is struggling to keep up with someone three years older.',
      'Studio events and showcases give children a stage. For a lot of parents, that is the part that matters most — a child who can stand in front of people and not freeze is learning something that reaches well past dance.',
    ],
    faqs: [
      { q: 'What age can start kids dance classes?', a: 'Batches are grouped by age rather than one cut-off. Share your child’s age when booking and the studio will place them appropriately.' },
      { q: 'Does my child need dance experience?', a: 'No. Most children in the younger batches are starting from zero.' },
      { q: 'Do kids perform?', a: 'Yes. Studio events and showcases are scheduled through the year.' },
      { q: 'Where are the kids classes held?', a: 'Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003.' },
    ],
    grid: 'classes',
  },
  {
    slug: 'bollywood-dance-classes-gurugram',
    h1: 'Bollywood Dance Classes in Gurugram',
    title: 'Bollywood Dance Classes in Gurugram | Dancewala Studio Sector 46',
    description:
      'Bollywood dance classes in Gurugram at Dancewala Studio, Sector 46. Learn expressive Hindi film choreography step by step, from first count to final run.',
    lede: 'Bollywood choreography taught properly — counts, expression and storytelling, not a routine copied off a screen.',
    image: 'classes/bollywood-dance-classes',
    alt: 'Dancer performing a Bollywood move with a flowing dupatta at Dancewala Studio',
    intro: [
      'Bollywood is the style people in Gurugram ask for first, and it deserves better teaching than it usually gets. The music is familiar, which helps, but the style itself is genuinely broad — it borrows from classical, folk, contemporary and street, often inside a single song.',
      'Classes cover both halves of it. The first is technical: steps, transitions, formations, where a movement sits in the count. The second is expression, and it is the half most people skip. Learning to mean a gesture is what separates a Bollywood dancer from someone doing the steps correctly.',
      'Batches work with recent and older Hindi film music, and the choice is shaped by what the group wants to learn and what suits the routine being built.',
    ],
    faqs: [
      { q: 'Is Bollywood dance suitable for beginners?', a: 'Yes. Routines are taught section by section and no previous experience is assumed.' },
      { q: 'Is Bollywood the same as sangeet choreography?', a: 'Sangeet choreography often uses Bollywood as a base, but it is planned around a specific family, song list and stage.' },
      { q: 'Do you teach expression, or only steps?', a: 'Both. Expression is treated as a skill that is taught and drilled, not as something you either have or do not.' },
      { q: 'Where are Bollywood classes held?', a: 'Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003.' },
    ],
    grid: 'classes',
  },
  {
    slug: 'wedding-choreography-gurugram',
    h1: 'Wedding Choreography in Gurugram',
    title: 'Wedding Choreography in Gurugram | Dancewala Studio Sector 46',
    description:
      'Wedding choreography in Gurugram by Dancewala Studio, Sector 46. Routines planned around your songs, your family and the rehearsal time you actually have.',
    lede: 'Wedding choreography built around the people dancing it — mixed ages, mixed confidence, one fixed date.',
    image: 'hero/wedding-sangeet-choreography',
    alt: 'Couple dancing at a wedding ceremony choreographed by Dancewala Studio in Gurugram',
    intro: [
      'Wedding choreography is a planning problem as much as a dance one. There is a fixed date, a song list, and a group of relatives whose confidence ranges from "dances every weekend" to "has never danced in front of anyone".',
      'The studio starts with who is performing and what they can realistically do, then builds the routine around the least confident person in the group. That is what makes a mixed group look rehearsed without anyone being asked to do something they will hate.',
      'Work covers the couple’s performance, family acts, friend groups and the sangeet running order, rehearsed at the Sector 46 studio or at a venue you arrange.',
    ],
    faqs: [
      { q: 'Does Dancewala Studio provide wedding choreography in Gurugram?', a: 'Yes, along with sangeet, couple, family and group, event and corporate choreography.' },
      { q: 'How much rehearsal time do we need?', a: 'It depends on the routine and the number of performers. Share your event date when you enquire and the studio will tell you what is realistic.' },
      { q: 'Can you choreograph for people who have never danced?', a: 'Yes. Routines are built around the least experienced performer rather than the strongest.' },
      { q: 'How do I book wedding choreography?', a: 'Use the Book Now button, call +91 9818501007, or WhatsApp 8796911005 with your event date.' },
    ],
    grid: 'choreo',
  },
  {
    slug: 'sangeet-choreography-gurugram',
    h1: 'Sangeet Choreography in Gurugram',
    title: 'Sangeet Choreography in Gurugram | Dancewala Studio Sector 46',
    description:
      'Sangeet choreography in Gurugram by Dancewala Studio, Sector 46. Routines for couples, families and friends, plus a running order that works on the night.',
    lede: 'A sangeet is several performances, not one. The choreography is planned that way.',
    image: 'choreography/sangeet-choreography',
    alt: 'Family members rehearsing a sangeet performance with Dancewala Studio',
    intro: [
      'Most sangeets have more than one act: the couple, the siblings, one side of the family, then the other, occasionally a friend group that has been secretly rehearsing for a month. Getting that running order right is most of the work.',
      'Dancewala Studio plans the whole set. Which group dances to what, in which order, with how many people on the floor at once, and where the transitions are. Individual routines are rehearsed separately and then combined once each group is secure.',
      'The result is a sangeet that runs without the awkward pauses between acts — which is, from the audience, the difference between a good sangeet and a great one.',
    ],
    faqs: [
      { q: 'Does Dancewala Studio offer sangeet choreography in Gurugram?', a: 'Yes. Sangeet choreography is offered for couples, families and groups, from a single act to a full running order.' },
      { q: 'How many performances can you choreograph for one sangeet?', a: 'As many as the event needs. Tell the studio how many groups are performing and the plan is built around that.' },
      { q: 'Can you work with reluctant family members?', a: 'Often yes. Routines are designed so reluctance is not visible from the audience, and the simple parts are genuinely simple.' },
      { q: 'Where do rehearsals happen?', a: 'Usually at the studio, Building 19, Second Floor, Huda Market, Sector 46, Gurugram. Venue rehearsals can be arranged closer to the date.' },
    ],
    grid: 'choreo',
  },
];

export const locationPages = LOCATION_DEFS.map((d) => {
  const url = `/${d.slug}/`;
  const cards = d.grid === 'classes'
    ? CLASSES.slice(0, 4).map(classCard).join('\n      ')
    : CHOREOGRAPHY.slice(0, 4).map(choreoCard).join('\n      ');
  const moreLink = d.grid === 'classes' ? '/dance-classes/' : '/choreography/';
  const moreLabel = d.grid === 'classes' ? 'All Dance Classes' : 'All Choreography Services';

  return {
    url,
    title: d.title,
    description: d.description,
    scripts: ['gallery', 'social', 'seo'],
    trail: [{ label: 'Home', url: '/' }, { label: d.h1, url }],
    jsonld: function () {
      return [webPageSchema(this, this.trail)];
    },
    body: `
${HERO(d.h1, d.lede, d.image, d.alt)}

<section class="section section--white">
  <div class="container">
    <div class="split split--wide-left">
      <div class="prose" data-reveal>
        <h2>${esc(d.h1)}</h2>
        ${d.intro.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
      <aside class="summary-card" data-reveal>
        <h2 class="summary-card__title">Studio Details</h2>
        <dl class="summary-rows">
          <div class="summary-row"><dt>Studio</dt><dd>${esc(BUSINESS.name)}</dd></div>
          <div class="summary-row"><dt>Address</dt><dd>Building 19, Second Floor, Huda Market, Sector 46, ${esc(BUSINESS.city)}, ${esc(BUSINESS.region)} ${esc(BUSINESS.postcode)}</dd></div>
          <div class="summary-row"><dt>Phone</dt><dd><a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></dd></div>
          <div class="summary-row"><dt>WhatsApp</dt><dd>${esc(BUSINESS.whatsapp)}</dd></div>
          <div class="summary-row"><dt>Email</dt><dd><a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></dd></div>
        </dl>
        <div class="btn-row" style="margin-top:1.25rem">
          ${btn('/booking/', 'Book Now', 'primary')}
          ${waBtn('WhatsApp Us')}
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section-head section-head--left">
      <p class="eyebrow">Popular Choices</p>
      <h2 class="section-title">Start Here</h2>
    </div>
    <div class="card-grid">
      ${cards}
    </div>
    <p class="text-center" style="margin-top:1.75rem">${btn(moreLink, moreLabel, 'dark')}</p>
  </div>
</section>

${REACHING}

<section class="section section--white">
  <div class="container">
    ${faqAccordion(d.faqs, `${d.h1} — Questions`)}
  </div>
</section>

${locationSection()}

${ctaBand({ title: 'Book Now', text: `Book ${d.h1.toLowerCase()} with Dancewala Studio in Sector 46.` })}`,
  };
});

export const danceClassesGurugram = locationPages[0];
export const danceClassesSector46 = locationPages[1];
export const kidsDanceClassesGurugram = locationPages[2];
export const bollywoodDanceClassesGurugram = locationPages[3];
export const weddingChoreographyGurugram = locationPages[4];
export const sangeetChoreographyGurugram = locationPages[5];

void sectionHead;
