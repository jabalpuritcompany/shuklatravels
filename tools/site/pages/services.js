/**
 * Dance class + choreography service pages.
 * Every service has its own copy, its own image and its own FAQ set.
 */
import { BUSINESS } from '../config.js';
import { CLASSES, CHOREOGRAPHY, GALLERY } from '../data.js';
import {
  esc, img, btn, waBtn, sectionHead, faqAccordion, faqSchema, ctaBand,
  breadcrumbSchema, webPageSchema, slug,
} from '../layout.js';
import { galleryGrid } from '../components.js';

/* ------------------------------------------------------------------ *
 * Per-service detail copy. Written one service at a time, by hand.
 * ------------------------------------------------------------------ */
const DETAIL = {
  'kids-dance-classes': {
    lede: 'A first proper introduction to dance — structure, rhythm and a lot of moving around, taught at a child’s pace.',
    intro: [
      'Kids batches at Dancewala Studio are built around one simple idea: children learn dance by doing it, not by being told about it. Every class opens with a warm-up that feels like play, moves into steps and counts, and usually ends with a short routine the batch can show someone at home.',
      'Children are grouped by age so a six-year-old is not trying to keep up with a twelve-year-old. Nothing is competitive unless a child wants it to be — the goal is a child who looks forward to Tuesdays.',
    ],
    whoFor: ['Children in early and middle school years', 'Parents looking for a structured after-school activity', 'Shy children who would benefit from performing in a group', 'Children with lots of energy that needs somewhere to go'],
    learn: ['Rhythm and timing — clapping, counting and moving to a beat', 'Basic steps and formations used across Bollywood and freestyle', 'Body awareness, balance and coordination', 'How to perform a routine from start to finish with a group'],
    benefits: ['Confidence that shows up outside the studio too', 'Better posture, coordination and flexibility', 'A regular physical activity that does not feel like exercise', 'Comfort being on a stage in front of people'],
    expect: [
      'Warm-up and free movement to shake off the school day.',
      'Step breakdown — slow, then with counts, then with music.',
      'Repetition in short bursts so nobody loses focus.',
      'A run-through of the routine the batch is currently building.',
    ],
    faqs: [
      { q: 'What age can start kids dance classes at Dancewala Studio?', a: 'Batches are grouped by age rather than a single cut-off. Share your child’s age when you book and the studio will place them in the group that fits.' },
      { q: 'Does my child need any previous dance experience?', a: 'No. Most children joining the younger batches are starting from zero.' },
      { q: 'Do kids get to perform?', a: 'Yes. Studio events and showcases give students stage time, which is a large part of why they practise.' },
      { q: 'How do I book a kids dance class?', a: 'Use the Book Now button on this page, call +91 9818501007, or message the studio on WhatsApp at 8796911005.' },
    ],
  },

  'adult-dance-classes': {
    lede: 'Dance for adults who want to actually learn it — not a workout class with music playing in the background.',
    intro: [
      'Adult batches exist because plenty of people spent years wanting to learn dance and never quite got around to it. These classes assume nothing about your background and move at a pace that fits around a job.',
      'You will learn real choreography, in real counts, to music you actually know. Some people come for fitness, some for a wedding, some because they finally have the time. All of those are good reasons.',
    ],
    whoFor: ['Working professionals who want a fixed weekly class', 'College students and young adults', 'Parents who want something that is theirs', 'Adults returning to dance after a long gap'],
    learn: ['Choreography broken into counts and phrases', 'Musicality — hearing where a step sits in a song', 'Style-appropriate body movement and expression', 'How to hold a routine together without watching everyone else'],
    benefits: ['A genuinely enjoyable form of regular exercise', 'A break from screens that still feels productive', 'Measurable progress — you can do things after a month you could not do on day one', 'A room full of people who are also beginners at something'],
    expect: [
      'A short warm-up and mobility routine.',
      'Technique or isolation work relevant to the style that week.',
      'Choreography taught in sections, then joined together.',
      'A final run with music and feedback.',
    ],
    faqs: [
      { q: 'Is there an upper age limit for adult dance classes?', a: 'No. Adult batches are open to anyone past their school years; what matters is that you are comfortable moving for an hour.' },
      { q: 'I have never danced before. Will I hold the batch back?', a: 'No. Beginners are normal in adult batches, and steps are taught from the ground up rather than assumed.' },
      { q: 'Can I attend only on weekends?', a: 'Share your availability when booking and the studio will tell you which batch fits. Timings are confirmed directly by the studio.' },
      { q: 'How do I book an adult dance class?', a: 'Use Book Now on this page, or contact the studio on +91 9818501007.' },
    ],
  },

  'beginner-dance-classes': {
    lede: 'The starting point. No experience, no audition, no assumption that you already know what a count is.',
    intro: [
      'Beginner batches are for people whose entire dance history is a wedding where they were pushed onto the floor. That is a perfectly good place to start from.',
      'The first few sessions cover the things everything else is built on: where your weight sits, how to find the beat, how to turn without losing your balance. Once that feels ordinary, choreography stops feeling like magic and starts feeling learnable.',
    ],
    whoFor: ['Anyone with no dance background at all', 'People who felt out of place in a regular class', 'Adults and teenagers joining individually', 'Anyone who wants to build basics properly first'],
    learn: ['Posture, stance and weight transfer', 'Finding and holding a beat', 'Basic steps and simple transitions', 'How to pick up choreography without panicking'],
    benefits: ['Foundations that make every later style easier', 'Confidence built in a room of other first-timers', 'No pressure to perform before you are ready', 'A clear sense of what your next step should be'],
    expect: [
      'Slow, explained warm-up — you are told why each bit matters.',
      'One concept per session, drilled until it feels normal.',
      'A short combination using only what has been taught.',
      'Honest, specific feedback on what to work on next.',
    ],
    faqs: [
      { q: 'Can complete beginners really join Dancewala Studio?', a: 'Yes. Beginner dance classes are designed specifically for people with no previous experience.' },
      { q: 'How long before I can dance a full routine?', a: 'It depends on the person and the song, but most beginners put together a complete short routine within their first few weeks.' },
      { q: 'Will I be the only beginner in the room?', a: 'In beginner batches, no — everyone is starting from roughly the same place.' },
      { q: 'What should I wear to a beginner class?', a: 'Comfortable clothes you can move in and shoes with a bit of grip. Nothing specialist is needed to start.' },
    ],
  },

  'bollywood-dance': {
    lede: 'Hindi film music, expressive hands, and choreography that tells you what to feel as much as what to do.',
    intro: [
      'Bollywood is the style most people in Gurugram ask for first, and for good reason — the music is familiar and the movement is generous. It borrows from classical, folk, contemporary and street, which means a single routine can go from soft and storytelling to full energy in sixteen counts.',
      'A lot of the work here is expression. Learning the steps is one half; learning to mean them is the other, and that is where these classes spend their time.',
    ],
    whoFor: ['Anyone who already knows every word to the song', 'People preparing for a sangeet or family function', 'Dancers who want expressive range, not just technique', 'Teens and adults alike'],
    learn: ['Expression and gesture — hands, face and intent', 'Transitions and formations used in film choreography', 'Working with prop movements like dupatta and chunni', 'Musicality across the shifts in a typical Hindi film song'],
    benefits: ['A style you can use at real events immediately', 'Better facial and upper-body expression', 'Cardio that you stop noticing because you are counting', 'Repertoire — you will have routines you can perform'],
    expect: [
      'Warm-up with an emphasis on upper body and neck mobility.',
      'Expression drills before the choreography starts.',
      'Chunk-by-chunk routine building, usually from the chorus out.',
      'Full run to music, then notes.',
    ],
    faqs: [
      { q: 'Is Bollywood dance suitable for absolute beginners?', a: 'Yes. Routines are taught in sections and there is no expectation that you already know the style.' },
      { q: 'Is Bollywood the same as a sangeet routine?', a: 'Sangeet choreography often uses Bollywood as its base, but it is planned around a specific family, song list and stage. See the sangeet choreography page for that.' },
      { q: 'Do you use recent songs or older ones?', a: 'Both. Song choice is shaped by what the batch wants to learn and what suits the routine.' },
      { q: 'How do I book Bollywood dance classes?', a: 'Use the Book Now button, call +91 9818501007, or message the studio on WhatsApp.' },
    ],
  },

  'hip-hop-dance': {
    lede: 'Groove, bounce and isolations — street style taught with real attention to the music rather than just the moves.',
    intro: [
      'Hip hop at the studio starts with the groove. Before any choreography, you learn to sit in the beat and move with it, because everything else in the style hangs off that foundation.',
      'From there it opens up: bounces and rocks, chest and shoulder isolations, footwork, and eventually freestyle. It is the style that most quickly teaches you to stop thinking about how you look.',
    ],
    whoFor: ['Teenagers and young adults drawn to street styles', 'Dancers who want stronger musicality', 'Anyone who wants to freestyle without freezing', 'Bollywood dancers looking for a different texture'],
    learn: ['Bounce, rock and groove fundamentals', 'Isolations — chest, shoulders, hips', 'Basic footwork and level changes', 'Freestyle structure and how to recover when you lose the beat'],
    benefits: ['Musicality that transfers to every other style', 'Physical confidence and body control', 'The ability to dance without a set routine', 'Strong core and leg work disguised as fun'],
    expect: [
      'Bounce and groove drills, usually to a slow track first.',
      'Isolation work with counts.',
      'Short combos that get faster across the session.',
      'A freestyle circle at the end, if the batch is up for it.',
    ],
    faqs: [
      { q: 'Do I need to be flexible for hip hop?', a: 'No. Hip hop rewards rhythm and control far more than flexibility, and the warm-up builds what you need.' },
      { q: 'Is hip hop too intense for a beginner?', a: 'It is energetic, but sessions are built up gradually. Tell the studio you are new when you book.' },
      { q: 'Will we learn to freestyle?', a: 'Yes — freestyle is treated as a skill with structure, not something you are simply expected to do.' },
      { q: 'How do I book hip hop classes?', a: 'Use Book Now on this page, or message the studio on WhatsApp at 8796911005.' },
    ],
  },

  'contemporary-dance': {
    lede: 'Floor work, breath and release — the style that teaches you where your body actually is.',
    intro: [
      'Contemporary is quieter than most people expect. Much of it happens on the floor, and a large part of the technique is about breathing, falling safely, and letting momentum do the work instead of muscle.',
      'It suits dancers who want to understand their own movement rather than reproduce someone else’s. It is also, quietly, one of the most demanding styles on this list.',
    ],
    whoFor: ['Dancers who want technique and body awareness', 'Teens and adults with some movement background', 'Bollywood or hip hop dancers widening their range', 'Anyone drawn to expressive, lyrical movement'],
    learn: ['Floor work and safe falls', 'Breath-led movement and release technique', 'Spinal articulation and contraction-release', 'Transitions between levels and across the floor'],
    benefits: ['Genuine control over how your body moves', 'Strength and flexibility built together', 'A wider expressive range in every other style', 'Injury awareness — you learn to move safely'],
    expect: [
      'Grounded warm-up focusing on breath and spine.',
      'Technique exercises, often on the floor.',
      'Phrases that travel across the room.',
      'Cool-down and mobility work.',
    ],
    faqs: [
      { q: 'Is contemporary dance suitable for beginners?', a: 'It helps to have some movement background, but motivated beginners are welcome. Mention your experience when booking so the right batch is suggested.' },
      { q: 'Do I need to be flexible already?', a: 'No. Flexibility is a result of this style, not a prerequisite for starting it.' },
      { q: 'Is contemporary danced barefoot?', a: 'Usually yes. Bring socks if you prefer, and the studio will advise on what works on their floor.' },
      { q: 'How do I book contemporary dance classes?', a: 'Use the Book Now button on this page or call +91 9818501007.' },
    ],
  },

  'freestyle-dance': {
    lede: 'No fixed syllabus. You bring the song, you build your own way of moving to it.',
    intro: [
      'Freestyle sessions are the least structured classes at the studio and, for a lot of people, the most useful. There is a track, a room and a prompt — after that it is yours.',
      'The point is to develop a personal style rather than a memorised routine. Dancers who come out of these sessions tend to stop needing choreography to feel like they are dancing.',
    ],
    whoFor: ['Dancers who want to develop their own style', 'Anyone who freezes when the choreography stops', 'People who dance at parties and want to enjoy it more', 'Students from other batches wanting open practice time'],
    learn: ['How to enter and exit a freestyle without hesitating', 'Building a small vocabulary of moves you can rely on', 'Reading a song — where the accents and breaks are', 'Using space, levels and dynamics to keep it interesting'],
    benefits: ['Confidence to dance with no routine to hide behind', 'A movement vocabulary that is genuinely yours', 'Better musicality and timing', 'A relaxed, low-pressure practice environment'],
    expect: [
      'Warm-up, then a short guided prompt or constraint.',
      'Individual work with music, in rotation.',
      'Occasional cypher or circle work.',
      'Optional feedback — you can just dance if you prefer.',
    ],
    faqs: [
      { q: 'Do I need to know choreography before freestyle?', a: 'No, though having a few moves already helps. The session is designed to build them with you.' },
      { q: 'Is freestyle the same as just dancing however I want?', a: 'Almost — but with structure, prompts and music chosen to push you somewhere new.' },
      { q: 'Is it embarrassing if I am not good yet?', a: 'Everyone in a freestyle session is working on the same problem. That is the whole point of the room.' },
      { q: 'How do I book a freestyle session?', a: 'Use Book Now, or message the studio on WhatsApp at 8796911005.' },
    ],
  },

  /* ---------------------------- CHOREOGRAPHY ---------------------------- */
  'wedding-choreography': {
    lede: 'Choreography for the wedding performances you keep being asked about — planned around the people actually dancing.',
    intro: [
      'Wedding choreography is a different problem from teaching a class. You have a fixed date, a song list, a group of relatives with wildly different confidence levels, and one rehearsal window. The work is mostly planning.',
      'The studio starts with who is dancing and what they can realistically do, then builds a routine that makes a mixed group look rehearsed without asking anyone to do something they will hate.',
    ],
    whoFor: ['Couples planning their own wedding performance', 'Families organising a sangeet or reception act', 'Bridal parties and friend groups', 'Anyone with a fixed date and a song in mind'],
    learn: ['A complete routine structured to your song', 'Formations that suit the number of people involved', 'Entry, exit and stage positioning', 'How to recover cleanly if something goes wrong on the night'],
    benefits: ['A performance that looks planned rather than improvised', 'Rehearsals scheduled around a real calendar', 'Routines adapted to mixed ages and abilities', 'One person holding the whole thing together'],
    expect: [
      'A conversation about the event, the songs and who is performing.',
      'Song selection and structure, if you have not finalised it.',
      'Choreography built and taught across your rehearsal sessions.',
      'A final run-through before the event, with notes.',
    ],
    faqs: [
      { q: 'Does Dancewala Studio provide wedding choreography in Gurugram?', a: 'Yes. Wedding choreography is one of the studio’s core services, alongside sangeet, couple, family, event and corporate choreography.' },
      { q: 'How much rehearsal time do we need?', a: 'It depends on the number of performers and the length of the routine. Share your event date when you enquire and the studio will tell you what is realistic.' },
      { q: 'Can you choreograph for people who have never danced?', a: 'Yes. Routines are built around the least experienced person in the group rather than the most.' },
      { q: 'How do I book wedding choreography?', a: 'Use the Book Now button, or send a WhatsApp message to 8796911005 with your event date.' },
    ],
  },

  'sangeet-choreography': {
    lede: 'The sangeet is the one night everyone remembers. The choreography should be built for that, not borrowed from a video.',
    intro: [
      'A sangeet is not one performance — it is usually several, performed by different groups, in a running order, in front of both families. Getting it right is mostly logistics wrapped in choreography.',
      'Dancewala Studio handles the whole set: which family members dance to what, in what order, with how many people on the floor at once. The result is a sangeet that runs smoothly instead of stopping between acts.',
    ],
    whoFor: ['Families planning a sangeet ceremony', 'Couples who want both sides involved', 'Groups of friends preparing a surprise act', 'Anyone coordinating multiple performances in one night'],
    learn: ['Individual routines for each group performing', 'Formations and transitions between acts', 'Stage use, entries and exits', 'A running order that works on the night'],
    benefits: ['Both families involved without anyone feeling out of place', 'A running order that avoids dead time', 'Routines matched to each group’s actual ability', 'One point of contact for all the choreography'],
    expect: [
      'A planning session covering songs, groups and order.',
      'Separate rehearsals for each group, scheduled around you.',
      'Combining runs once each group knows its part.',
      'A final dress rehearsal before the sangeet.',
    ],
    faqs: [
      { q: 'Does Dancewala Studio offer sangeet choreography?', a: 'Yes. Sangeet choreography is offered for couples, families and groups, from a single act to a full running order.' },
      { q: 'How many performances can you choreograph for one sangeet?', a: 'As many as the event needs. Tell the studio how many groups are performing and the plan is built around that.' },
      { q: 'Can you work with family members who are reluctant?', a: 'Often yes — the routine is designed so that reluctance is not visible from the audience, and simple parts are genuinely simple.' },
      { q: 'How do I book sangeet choreography?', a: 'Use Book Now on this page, or message the studio on WhatsApp with your sangeet date.' },
    ],
  },

  'couple-choreography': {
    lede: 'A first dance, or a couple performance — shaped around your song and your comfort level, not a template.',
    intro: [
      'Couple choreography is intimate in a way most wedding dance is not. It is two people, often both nervous, in front of everyone they know. The choreography has to make that feel possible.',
      'Most couples arrive with a song and no idea what to do with it. The studio builds something around how you already move together, which is far more effective than imposing a style on you.',
    ],
    whoFor: ['Couples planning a first dance', 'Engaged couples preparing a sangeet performance', 'Couples celebrating an anniversary', 'Anyone performing as a pair at a family event'],
    learn: ['A complete routine to your song', 'Partnering basics — frame, lead and connection', 'Safe lifts or supported moves, if you want them', 'How to keep going if you lose your place'],
    benefits: ['A routine that looks like you rather than a copied video', 'Rehearsals scheduled around two working calendars', 'Support for genuinely nervous dancers', 'Something you will actually enjoy on the night'],
    expect: [
      'Listening to your song together and talking through options.',
      'Building the routine in short sections.',
      'Rehearsals refined until it feels automatic.',
      'A final run in something close to what you will wear.',
    ],
    faqs: [
      { q: 'Do we need any dance experience for couple choreography?', a: 'No. Most couples start with no experience at all, and the routine is built from there.' },
      { q: 'Can you include a lift?', a: 'If you want one, and only where it is safe for both of you. It is always optional.' },
      { q: 'How many rehearsals will we need?', a: 'It depends on the song and how confident you feel. The studio will advise after the first session.' },
      { q: 'How do I book couple choreography?', a: 'Use Book Now, or WhatsApp the studio at 8796911005.' },
    ],
  },

  'family-group-choreography': {
    lede: 'One routine, three generations, mixed abilities — the hardest and most rewarding thing the studio choreographs.',
    intro: [
      'A family performance has an unusual constraint: everyone is in it. That means a routine has to work for a teenager who dances every week and a grandparent who has not since a wedding in 1998.',
      'The trick is structure rather than simplification. Give each person something they can do well, place them where it reads, and the whole group looks rehearsed without anyone being asked to do something beyond them.',
    ],
    whoFor: ['Families performing together at a wedding', 'Large groups with mixed ages and abilities', 'Anniversary and milestone celebrations', 'Community or society groups preparing an act'],
    learn: ['A group routine with differentiated parts', 'Formations that flatter a mixed-ability line-up', 'Timing and spacing across a large group', 'How to recover together if the group drifts'],
    benefits: ['Everyone included, including the reluctant ones', 'Formations designed so the group reads well from the audience', 'Rehearsals that work around family schedules', 'A shared thing the family did together'],
    expect: [
      'A headcount and a conversation about who is performing.',
      'Routine designed around the group’s real range.',
      'Sectional rehearsals, then whole-group runs.',
      'Final rehearsal close to the event date.',
    ],
    faqs: [
      { q: 'Can you choreograph for a group with very mixed abilities?', a: 'Yes — that is the normal case for family and group choreography. Parts are differentiated rather than everyone doing the same thing.' },
      { q: 'How large can the group be?', a: 'There is no fixed limit. Tell the studio how many people are performing and the routine is built for that number.' },
      { q: 'What if some family members cannot attend every rehearsal?', a: 'That is expected. The studio plans around it and keeps key parts simple enough to pick up late.' },
      { q: 'How do I book family & group choreography?', a: 'Use Book Now on this page, or call the studio on +91 9818501007.' },
    ],
  },

  'event-choreography': {
    lede: 'Choreography and rehearsal support for stage shows, cultural programmes and special occasions.',
    intro: [
      'Events are not weddings. The brief is usually a slot in a running order, a stage of uncertain size, and a group that has to look like they have rehearsed more than they have.',
      'Dancewala Studio provides choreography plus the rehearsal leadership to get a group performance-ready within whatever window the event allows.',
    ],
    whoFor: ['Schools and colleges running cultural programmes', 'Resident welfare associations and community groups', 'Event organisers building a performance line-up', 'Private celebrations with a staged performance'],
    learn: ['A routine built for the stage and time slot available', 'Formations adapted to the actual performance space', 'Entries, exits and transitions', 'A rehearsal plan leading up to the event'],
    benefits: ['A performance ready within a fixed window', 'Choreography adapted to the venue, not an ideal one', 'Rehearsals led so the organiser does not have to', 'Backup options for performers who drop out'],
    expect: [
      'Briefing on the event, stage, duration and performers.',
      'Concept and song structure proposed.',
      'Rehearsal schedule built around the event date.',
      'Final run-through, ideally in the actual space.',
    ],
    faqs: [
      { q: 'Does Dancewala Studio choreograph for events other than weddings?', a: 'Yes. Event choreography covers stage shows, cultural programmes, community events and private celebrations.' },
      { q: 'Can you work with a group that has never performed?', a: 'Yes. Most event groups are not made up of trained dancers, and the choreography is built accordingly.' },
      { q: 'Can you accommodate a change in performer numbers?', a: 'Where possible yes — formations are designed with some flexibility built in.' },
      { q: 'How do I book event choreography?', a: 'Use Book Now, or message the studio on WhatsApp at 8796911005.' },
    ],
  },

  'corporate-choreography': {
    lede: 'Team performances for offsites, annual days and launches — designed around people who have day jobs.',
    intro: [
      'Corporate choreography lives and dies on scheduling. The team is busy, rehearsal windows are short, and half the participants are doing this because their manager asked.',
      'The studio works the way corporate projects actually work: a clear plan, short efficient rehearsals, and a routine built so that the least confident person on the floor is never exposed. That is usually what turns a reluctant team into an enthusiastic one.',
    ],
    whoFor: ['Companies planning an annual day or offsite performance', 'Teams preparing for a launch or milestone event', 'HR and admin teams organising employee engagement', 'Corporate groups entering an inter-company competition'],
    learn: ['A team routine suited to the event and timeframe', 'Simple formations that read well from an audience', 'Synchronisation techniques for non-dancers', 'A staging plan for the actual venue'],
    benefits: ['A routine achievable within real working schedules', 'Genuine team-building rather than a forced activity', 'Rehearsals that run on time and to a plan', 'A performance the team is proud of afterwards'],
    expect: [
      'A short brief with your team size, date and venue.',
      'Concept, song and structure proposed for sign-off.',
      'Efficient rehearsals, scheduled around work.',
      'Final run and on-the-day staging support where needed.',
    ],
    faqs: [
      { q: 'Does Dancewala Studio provide corporate choreography in Gurugram?', a: 'Yes. Corporate choreography is offered for offsites, annual days, launches and team events.' },
      { q: 'How many rehearsals does a corporate team need?', a: 'It depends on team size, the routine and the event date. The studio proposes a schedule after the initial brief.' },
      { q: 'What if most of the team has never danced?', a: 'That is the usual starting point. Routines are built so that non-dancers look confident and synchronised.' },
      { q: 'How do I book corporate choreography?', a: 'Use Book Now, call +91 9818501007, or email dancewalas@gmail.com with your event details.' },
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Page builder
 * ------------------------------------------------------------------ */
function servicePage(item, category, baseUrl, galleryOffset) {
  const d = DETAIL[item.slug];
  if (!d) throw new Error('Missing detail copy for ' + item.slug);

  const url = `${baseUrl}/${item.slug}/`;
  const trail = [
    { label: 'Home', url: '/' },
    { label: category, url: baseUrl + '/' },
    { label: item.title, url },
  ];
  const related = (category === 'Dance Classes' ? CLASSES : CHOREOGRAPHY)
    .filter((c) => c.slug !== item.slug)
    .slice(0, 3);
  const gallerySlice = [0, 1, 2, 3].map((i) => GALLERY[(galleryOffset + i) % GALLERY.length]);
  const waMsg = `Hello Dancewala Studio,\n\nI would like to enquire about ${item.title}.\n\nPlease share the details and availability.`;

  return {
    url,
    title: `${item.title} in Gurugram | Dancewala Studio`,
    description: `${item.title} at Dancewala Studio, Sector 46, Gurugram. ${d.lede} Book online or enquire on WhatsApp.`,
    trail,
    scripts: ['gallery', 'social', 'seo'],
    jsonld: () => [
      webPageSchema({ url, title: `${item.title} in Gurugram | Dancewala Studio`, description: d.lede }),
      faqSchema(d.faqs),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: item.title,
        serviceType: item.title,
        description: d.lede,
        provider: { '@id': 'https://dancewalas.com/#studio' },
        areaServed: { '@type': 'City', name: 'Gurugram' },
        url: 'https://dancewalas.com' + url,
      },
    ],

    body: `
<section class="page-hero page-hero--split">
  <div class="container page-hero__grid">
    <div class="page-hero__copy">
      <h1>${esc(item.title)} in Gurugram</h1>
      <p class="page-hero__text">${esc(d.lede)}</p>
      <div class="btn-row" style="margin-top:1.75rem">
        ${btn(`/booking/?service=${item.slug}`, 'Book Now', 'primary')}
        ${waBtn('WhatsApp Us', waMsg)}
      </div>
    </div>
    <div class="page-hero__media">
      ${img(item.image, item.alt, { sizes: '(min-width: 900px) 42vw, 92vw', w: 800, h: 600, cls: 'rounded-media' })}
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    <div class="split split--wide-left">
      <div class="prose" data-reveal>
        <h2>About ${esc(item.title)}</h2>
        ${d.intro.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
      <aside class="summary-card" data-reveal>
        <h2 class="summary-card__title">At a Glance</h2>
        <dl class="summary-rows">
          <div class="summary-row"><dt>Who it is for</dt><dd>${esc(item.audience || 'Open to all age groups')}</dd></div>
          <div class="summary-row"><dt>Category</dt><dd>${esc(category)}</dd></div>
          <div class="summary-row"><dt>Location</dt><dd>Sector 46, ${esc(BUSINESS.city)}</dd></div>
          <div class="summary-row"><dt>Fees</dt><dd>Shared on enquiry</dd></div>
        </dl>
        <div class="btn-row" style="margin-top:1.25rem">
          ${btn(`/booking/?service=${item.slug}`, 'Book Now', 'primary')}
          ${btn('/contact-us/', 'Ask a Question', 'outline')}
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="grid grid--2">
      <div data-reveal>
        <h2 class="section-title section-title--sm">Who Is This For?</h2>
        <ul class="check-list">
          ${d.whoFor.map((w) => `<li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(w)}</span></li>`).join('\n          ')}
        </ul>
      </div>
      <div data-reveal>
        <h2 class="section-title section-title--sm">What You Can Learn</h2>
        <ul class="check-list">
          ${d.learn.map((w) => `<li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(w)}</span></li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    <div class="section-head section-head--left">
      <p class="eyebrow">Benefits</p>
      <h2 class="section-title">What This Gives You</h2>
    </div>
    <div class="grid grid--4">
      ${d.benefits.map((b, i) => `<article class="feature" data-reveal>
        <span class="feature__icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.5 6.8 19.2l1-5.9L3.5 9.2l5.9-.8L12 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></span>
        <h3 class="feature__title">${esc(b)}</h3>
        <p class="feature__text">Benefit ${i + 1} of ${d.benefits.length}</p>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    <div class="section-head section-head--light section-head--left">
      <p class="eyebrow">What to Expect</p>
      <h2 class="section-title">How a Session Runs</h2>
    </div>
    <ol class="process">
      ${d.expect.map((s, i) => `<li class="process__step" data-reveal>
        <h3 class="process__title">Step ${i + 1}</h3>
        <p class="process__text">${esc(s)}</p>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Gallery</p>
      <h2 class="section-title">${esc(item.title)} at the Studio</h2>
    </div>
    ${galleryGrid(gallerySlice)}
    <p class="text-center" style="margin-top:1.75rem">${btn('/gallery/photos/', 'See All Photos', 'outline')}</p>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="grid grid--2">
      ${related.map((r) => `<article class="card card--class" data-reveal>
        <a class="card__media" href="${baseUrl}/${r.slug}/" tabindex="-1" aria-hidden="true">
          ${img(r.image, r.alt, { sizes: '(min-width: 900px) 45vw, 92vw', w: 800, h: 600, cls: 'card__img' })}
        </a>
        <div class="card__body">
          <h3 class="card__title"><a href="${baseUrl}/${r.slug}/">${esc(r.title)}</a></h3>
          <p class="card__text">${esc(r.short)}</p>
          <a class="link-arrow" href="${baseUrl}/${r.slug}/">Learn More
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    ${faqAccordion(d.faqs, `${item.title} — Questions`)}
    <p class="text-center" style="margin-top:1.75rem">
      Still deciding? <a class="link-arrow" href="/contact-us/">Talk to the studio</a>
    </p>
  </div>
</section>

${ctaBand({
  title: `Book ${item.title}`,
  text: 'Choose this service, pick your date and complete your booking online.',
})}`,
  };
}

/* ------------------------------------------------------------------ *
 * Exports — one page object per service
 * ------------------------------------------------------------------ */
export const classPages = CLASSES.map((c, i) => servicePage(c, 'Dance Classes', '/dance-classes', i * 3));
export const choreoPages = CHOREOGRAPHY.map((c, i) => servicePage(c, 'Choreography', '/choreography', i * 4 + 1));

/* Named exports so tools/build.mjs picks up every object with a url. */
export const kidsDanceClasses = classPages[0];
export const adultDanceClasses = classPages[1];
export const beginnerDanceClasses = classPages[2];
export const bollywoodDance = classPages[3];
export const hipHopDance = classPages[4];
export const contemporaryDance = classPages[5];
export const freestyleDance = classPages[6];

export const weddingChoreography = choreoPages[0];
export const sangeetChoreography = choreoPages[1];
export const coupleChoreography = choreoPages[2];
export const familyGroupChoreography = choreoPages[3];
export const eventChoreography = choreoPages[4];
export const corporateChoreography = choreoPages[5];

void slug;
