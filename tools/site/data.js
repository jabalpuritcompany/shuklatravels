/**
 * Dancewala Studio — content data layer.
 * ------------------------------------------------------------------
 * Plain data arrays. When the backend/CMS arrives, replace these arrays with
 * a fetch() to the API and nothing in the templates has to change.
 *
 * FAIR-USE RULE: no invented instructors, awards, fees, timings or reviews.
 * Anything unavailable is an editable placeholder flagged with `placeholder: true`.
 */

/* ------------------------------------------------------------------ *
 * MAIN NAVIGATION — rendered into static HTML (crawlable, not JS-only)
 * ------------------------------------------------------------------ */
export const NAV = [
  { label: 'Home', url: '/' },
  {
    label: 'About Us',
    url: '/about-us/',
    children: [
      { label: 'Our Story', url: '/our-story/' },
      { label: 'Why Dancewala', url: '/why-dancewala/' },
      { label: 'Instructor / Team', url: '/instructors/' },
    ],
  },
  {
    label: 'Dance Classes',
    url: '/dance-classes/',
    children: [
      { label: 'Kids Dance Classes', url: '/dance-classes/kids-dance-classes/' },
      { label: 'Adult Dance Classes', url: '/dance-classes/adult-dance-classes/' },
      { label: 'Beginner Dance Classes', url: '/dance-classes/beginner-dance-classes/' },
      { label: 'Bollywood Dance', url: '/dance-classes/bollywood-dance/' },
      { label: 'Hip Hop Dance', url: '/dance-classes/hip-hop-dance/' },
      { label: 'Contemporary Dance', url: '/dance-classes/contemporary-dance/' },
      { label: 'Freestyle Dance', url: '/dance-classes/freestyle-dance/' },
    ],
  },
  {
    label: 'Choreography',
    url: '/choreography/',
    children: [
      { label: 'Wedding Choreography', url: '/choreography/wedding-choreography/' },
      { label: 'Sangeet Choreography', url: '/choreography/sangeet-choreography/' },
      { label: 'Couple Choreography', url: '/choreography/couple-choreography/' },
      { label: 'Family & Group Choreography', url: '/choreography/family-group-choreography/' },
      { label: 'Event Choreography', url: '/choreography/event-choreography/' },
      { label: 'Corporate Choreography', url: '/choreography/corporate-choreography/' },
    ],
  },
  {
    label: 'Workshops & Events',
    url: '/workshops-events/',
    children: [
      { label: 'Dance Workshops', url: '/workshops-events/dance-workshops/' },
      { label: 'Special Workshops', url: '/workshops-events/special-workshops/' },
      { label: 'Events', url: '/workshops-events/events/' },
      { label: 'Performances', url: '/workshops-events/performances/' },
      { label: 'Upcoming Workshops', url: '/workshops-events/upcoming-workshops/' },
    ],
  },
  {
    label: 'Gallery',
    url: '/gallery/',
    children: [
      { label: 'Photos', url: '/gallery/photos/' },
      { label: 'Videos', url: '/gallery/videos/' },
    ],
  },
  { label: 'Contact Us', url: '/contact-us/' },
];

/* ------------------------------------------------------------------ *
 * DANCE CLASSES
 * ------------------------------------------------------------------ */
export const CLASSES = [
  {
    slug: 'kids-dance-classes',
    title: 'Kids Dance Classes',
    short: 'Structured, age-appropriate classes where children build rhythm, coordination and stage confidence.',
    image: 'classes/kids-dance-classes',
    alt: 'Children dancing together during a kids dance class at Dancewala Studio in Gurugram',
    audience: 'Children across early and middle school years',
  },
  {
    slug: 'adult-dance-classes',
    title: 'Adult Dance Classes',
    short: 'Classes for adults who want to dance for fitness, expression, skill or simply the joy of it.',
    image: 'classes/adult-dance-classes',
    alt: 'Adults dancing in a studio session at Dancewala Studio, Gurugram',
    audience: 'Working professionals, college students, parents and hobbyists',
  },
  {
    slug: 'beginner-dance-classes',
    title: 'Beginner Dance Classes',
    short: 'A gentle starting point for anyone who has never danced before and wants to learn the basics properly.',
    image: 'classes/beginner-dance-classes',
    alt: 'Instructor guiding a beginner dancer through a basic step at Dancewala Studio',
    audience: 'First-time dancers of any age',
  },
  {
    slug: 'bollywood-dance',
    title: 'Bollywood Dance',
    short: 'Expressive, high-energy choreography set to Hindi film music, built around expression and storytelling.',
    image: 'classes/bollywood-dance-classes',
    alt: 'Dancer performing a Bollywood move with a flowing dupatta at Dancewala Studio',
    audience: 'Anyone who loves Hindi film music and expressive movement',
  },
  {
    slug: 'hip-hop-dance',
    title: 'Hip Hop Dance',
    short: 'Groove, bounce, isolations and freestyle fundamentals taught with attention to musicality.',
    image: 'classes/hip-hop-dance-classes',
    alt: 'Hip hop dancer mid-move in an urban studio setting at Dancewala Studio',
    audience: 'Teens and adults drawn to street styles and strong musicality',
  },
  {
    slug: 'contemporary-dance',
    title: 'Contemporary Dance',
    short: 'Floor work, breath, release technique and fluid transitions that build control and body awareness.',
    image: 'classes/contemporary-dance-classes',
    alt: 'Contemporary dancer in an expressive floor extension at Dancewala Studio',
    audience: 'Dancers who want technique, flexibility and expressive range',
  },
  {
    slug: 'freestyle-dance',
    title: 'Freestyle Dance',
    short: 'Open-format sessions that develop personal style, improvisation and confidence on any song.',
    image: 'classes/freestyle-dance-classes',
    alt: 'Dancer improvising a freestyle spin in a studio at Dancewala Studio',
    audience: 'Dancers who want to move without a fixed syllabus',
  },
];

/* ------------------------------------------------------------------ *
 * CHOREOGRAPHY SERVICES
 * ------------------------------------------------------------------ */
export const CHOREOGRAPHY = [
  {
    slug: 'wedding-choreography',
    title: 'Wedding Choreography',
    short: 'Choreography planned around your songs, your family and the time you realistically have to rehearse.',
    image: 'choreography/wedding-choreography',
    alt: 'Wedding dance performance being choreographed by Dancewala Studio in Gurugram',
  },
  {
    slug: 'sangeet-choreography',
    title: 'Sangeet Choreography',
    short: 'Full sangeet choreography for couples, families and friends, from first step to final run.',
    image: 'choreography/sangeet-choreography',
    alt: 'Family members rehearsing a sangeet performance with Dancewala Studio',
  },
  {
    slug: 'couple-choreography',
    title: 'Couple Choreography',
    short: 'A first dance or couple performance shaped around your comfort level and song choices.',
    image: 'choreography/couple-choreography',
    alt: 'Couple rehearsing a romantic dance routine at Dancewala Studio',
  },
  {
    slug: 'family-group-choreography',
    title: 'Family & Group Choreography',
    short: 'Group routines that work with mixed ages and mixed experience, including complete beginners.',
    image: 'choreography/family-group-choreography',
    alt: 'Family group practising a group dance routine at Dancewala Studio',
  },
  {
    slug: 'event-choreography',
    title: 'Event Choreography',
    short: 'Choreography and rehearsal support for stage shows, community events and special occasions.',
    image: 'choreography/event-choreography',
    alt: 'Dance troupe performing a choreographed routine at an event',
  },
  {
    slug: 'corporate-choreography',
    title: 'Corporate Choreography',
    short: 'Team performances for offsites, annual days and launches, designed around busy schedules.',
    image: 'choreography/corporate-choreography',
    alt: 'Corporate team rehearsing a stage performance with Dancewala Studio',
  },
];

/* ------------------------------------------------------------------ *
 * WORKSHOPS & EVENTS
 * ------------------------------------------------------------------ */
export const WORKSHOP_TYPES = [
  {
    slug: 'dance-workshops',
    title: 'Dance Workshops',
    short: 'Focused sessions built around one style, one song or one skill, open to new and regular dancers.',
    image: 'events/dance-workshop-session',
    alt: 'Dancers taking part in a dance workshop session',
  },
  {
    slug: 'special-workshops',
    title: 'Special Workshops',
    short: 'Occasional sessions built around a guest faculty, a theme or a specific performance piece.',
    image: 'events/community-event',
    alt: 'Dancers at a special themed dance workshop',
  },
  {
    slug: 'events',
    title: 'Events',
    short: 'Studio events, showcases and community gatherings where students get to perform for an audience.',
    image: 'events/community-event',
    alt: 'Community dance event organised by a dance studio',
  },
  {
    slug: 'performances',
    title: 'Performances',
    short: 'Choreographed stage performances by Dancewala Studio dancers and students.',
    image: 'events/stage-performance',
    alt: 'Dance troupe performing on a lit stage',
  },
  {
    slug: 'upcoming-workshops',
    title: 'Upcoming Workshops',
    short: 'Announcements for the next workshops and batches at the studio.',
    image: 'events/dance-workshop-session',
    alt: 'Dancers warming up before an upcoming workshop',
  },
];

/**
 * UPCOMING EVENTS
 * Empty on purpose — no dates are invented. Populate as real events are
 * confirmed; the reusable event card renders automatically (see layout.js).
 */
export const EVENTS = [];

/* ------------------------------------------------------------------ *
 * INSTRUCTORS / TEAM  — placeholders, replace with real profiles
 * ------------------------------------------------------------------ */
export const TEAM = [
  {
    name: 'Instructor Name',
    role: 'Dance Instructor & Choreographer',
    specialization: 'Bollywood / Freestyle',
    bio: 'Short instructor bio goes here. Add real names, specialisations and photos once confirmed by the studio.',
    image: 'team/instructor-1',
    placeholder: true,
  },
  {
    name: 'Instructor Name',
    role: 'Dance Instructor',
    specialization: 'Hip Hop',
    bio: 'Short instructor bio goes here. Add real names, specialisations and photos once confirmed by the studio.',
    image: 'team/instructor-2',
    placeholder: true,
  },
  {
    name: 'Instructor Name',
    role: 'Dance Instructor',
    specialization: 'Contemporary',
    bio: 'Short instructor bio goes here. Add real names, specialisations and photos once confirmed by the studio.',
    image: 'team/instructor-3',
    placeholder: true,
  },
  {
    name: 'Instructor Name',
    role: 'Kids Batch Instructor',
    specialization: 'Kids Dance',
    bio: 'Short instructor bio goes here. Add real names, specialisations and photos once confirmed by the studio.',
    image: 'team/instructor-4',
    placeholder: true,
  },
];

/* ------------------------------------------------------------------ *
 * GALLERY
 * ------------------------------------------------------------------ */
export const GALLERY = [
  { src: 'gallery/dancewala-studio-rehearsal', alt: 'Dancers rehearsing a group routine at Dancewala Studio' },
  { src: 'gallery/bollywood-routine-practice', alt: 'Bollywood dance routine being practised in the studio' },
  { src: 'gallery/hip-hop-batch-move', alt: 'Hip hop batch working on a choreographed move' },
  { src: 'gallery/contemporary-floor-work', alt: 'Contemporary dancer during floor work practice' },
  { src: 'gallery/kids-batch-energy', alt: 'Kids dance batch in an energetic class moment' },
  { src: 'gallery/sangeet-performance-night', alt: 'Sangeet performance on stage at night' },
  { src: 'gallery/group-formation', alt: 'Dance group holding a formation during practice' },
  { src: 'gallery/stage-light-performance', alt: 'Dancers performing under stage lighting' },
  { src: 'gallery/studio-warm-up', alt: 'Dancers warming up before a class at the studio' },
  { src: 'gallery/freestyle-jam', alt: 'Freestyle dance jam inside the studio' },
  { src: 'gallery/duet-choreography', alt: 'Two dancers rehearsing a duet choreography' },
  { src: 'gallery/final-showcase', alt: 'Final showcase performance by studio dancers' },
];

/**
 * INSTAGRAM REELS — placeholder cards built from studio photography.
 * A live feed needs a server-side Meta token, so until the backend exists
 * these cards simply link out to the official profile. Replace `image` with
 * real reel thumbnails, or set INSTAGRAM_FEED_ENDPOINT in assets/js/social.js
 * to populate this grid from the API. No video is downloaded or mirrored.
 */
export const REELS = [
  { image: '/assets/images/gallery/freestyle-jam-800.webp', alt: 'Short reel: freestyle dance jam at Dancewala Studio', caption: 'Freestyle jam · studio floor', url: 'https://www.instagram.com/dancewalastudios/' },
  { image: '/assets/images/gallery/duet-choreography-800.webp', alt: 'Short reel: duet choreography practice', caption: 'Duet routine · rehearsal', url: 'https://www.instagram.com/dancewalastudios/' },
  { image: '/assets/images/gallery/final-showcase-800.webp', alt: 'Short reel: final showcase performance', caption: 'Showcase night · full stage', url: 'https://www.instagram.com/dancewalastudios/' },
  { image: '/assets/images/gallery/studio-warm-up-800.webp', alt: 'Short reel: warm up before class', caption: 'Warm-up · before class', url: 'https://www.instagram.com/dancewalastudios/' },
];

/**
 * YOUTUBE SHORTS — official channel content only.
 * TODO(CLIENT): add real Shorts video IDs, e.g.
 *   { id: 'dQw4w9WgXcQ', title: 'Bollywood routine — 60 second cut' }
 * Until then the grid renders a clean placeholder and links to the channel.
 * Thumbnails load first; the iframe is only created when play is pressed.
 */
export const SHORTS = [];

/**
 * YOUTUBE (long form) — official channel content only.
 * TODO(CLIENT): replace `id` with real video IDs from the Dancewala Studio
 * YouTube channel. Videos are embedded with youtube-nocookie + lazy loading.
 * No video files are downloaded or mirrored.
 */
export const VIDEOS = [
  { id: '', title: 'Dancewala Studio performance', note: 'Add official YouTube video ID' },
];

/* ------------------------------------------------------------------ *
 * HOME FAQ — answers only what is genuinely known
 * ------------------------------------------------------------------ */
export const HOME_FAQ = [
  {
    q: 'Where is Dancewala Studio located?',
    a: 'Dancewala Studio is at Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003, India.',
  },
  {
    q: 'What dance classes does Dancewala Studio offer?',
    a: 'The studio offers kids dance classes, adult dance classes, beginner dance classes, Bollywood dance, hip hop dance, contemporary dance and freestyle dance.',
  },
  {
    q: 'Does Dancewala Studio provide wedding and sangeet choreography?',
    a: 'Yes. Dancewala Studio provides wedding choreography, sangeet choreography, couple choreography, family and group choreography, event choreography and corporate choreography.',
  },
  {
    q: 'Can a complete beginner join?',
    a: 'Yes. Beginner dance classes are designed for people with no previous dance experience, and the studio works at a pace that suits first-time dancers.',
  },
  {
    q: 'How do I book a trial class?',
    a: 'Open the online booking page, choose a service and fill in the booking form. You can also call +91 9818501007 or message the studio on WhatsApp at 8796911005.',
  },
  {
    q: 'How can I contact Dancewala Studio?',
    a: 'You can call +91 9818501007, send a WhatsApp message to 8796911005, or email dancewalas@gmail.com.',
  },
];
