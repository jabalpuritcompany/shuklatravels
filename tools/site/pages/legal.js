/**
 * Legal / payment-approval pages.
 * Placeholders are marked with [TO CONFIRM] so nothing reads as a final policy.
 */
import { BUSINESS, EMAIL } from '../config.js';
import { esc, btn, webPageSchema } from '../layout.js';

const HERO = (title, text) => `<section class="page-hero">
  <div class="container page-hero__inner">
    <h1>${esc(title)}</h1>
    <p class="page-hero__text">${esc(text)}</p>
  </div>
</section>`;

const PROSE = (title, blocks) => `<section class="section section--white">
  <div class="container">
    <div class="prose measure" data-reveal style="margin-inline:auto">
      ${blocks}
    </div>
  </div>
</section>`;

const UPDATED = '<p class="form__note">Last updated: <span data-year>2026</span>. This document is reviewed whenever the studio changes how it handles bookings, payments or personal information.</p>';

const CONTACT_BLOCK = `<h2>Contact</h2>
<p>Questions about anything on this page:</p>
<ul class="bullets">
  <li>${esc(BUSINESS.name)}, Building 19, Second Floor, Huda Market, Sector 46, ${esc(BUSINESS.city)}, ${esc(BUSINESS.region)} ${esc(BUSINESS.postcode)}, ${esc(BUSINESS.countryName)}</li>
  <li>Phone: <a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></li>
  <li>WhatsApp: ${esc(BUSINESS.whatsapp)}</li>
  <li>Email: <a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></li>
</ul>`;

/* ================================================================== */
export const privacyPolicyPage = {
  url: '/privacy-policy/',
  title: 'Privacy Policy | Dancewala Studio',
  description:
    'How Dancewala Studio collects, uses and protects personal information submitted through its website enquiry and booking forms.',
  scripts: ['seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Privacy Policy', url: '/privacy-policy/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${HERO('Privacy Policy', 'What happens to the information you share with Dancewala Studio through this website.')}
${PROSE('', `
<p class="lede">This policy explains what information this website collects, why it is collected, and what is done with it. It is written for a website that currently has no backend database.</p>

<h2>Information You Give Us</h2>
<p>When you fill in an enquiry form or the online booking wizard on this website, you may provide:</p>
<ul class="bullets">
  <li>Your name</li>
  <li>Your mobile number</li>
  <li>Your email address</li>
  <li>The service you are interested in</li>
  <li>Age group, gender (optional), number of participants</li>
  <li>A preferred date and time</li>
  <li>Any message or special requirement you choose to write</li>
</ul>

<h2>How That Information Is Used</h2>
<p>Information submitted through this website is used for one purpose: to respond to your enquiry and to manage your booking. Specifically, it may be used to contact you about availability, to confirm a booking, and to answer the question you asked.</p>
<p>We do not sell your information. We do not share it with third parties for marketing.</p>

<h2>Where It Is Stored Right Now</h2>
<div class="demo-notice" style="margin:1.5rem 0">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  <span><strong>There is currently no backend</strong>This version of the website has no server-side database. When you submit the form, your browser either opens a pre-filled email draft in your own mail app or a pre-filled WhatsApp message to the studio. Nothing is transmitted to, or stored on, a Dancewala Studio server at this stage.</span>
</div>
<p>Once the backend is live, submitted information will be stored on secure servers and this policy will be updated to describe retention periods, access controls and your rights in detail.</p>

<h2>Draft Booking Data in Your Browser</h2>
<p>The online booking wizard keeps the details you have typed in your browser's session storage so that the pages remember your progress. This data stays on your device, is never transmitted, and is cleared when you close the tab. No password is ever stored in your browser.</p>

<h2>Cookies and Analytics</h2>
<p>This website currently sets no advertising cookies and runs no tracking or analytics scripts. Configuration placeholders exist for Google Analytics 4 and the Meta Pixel; if either is enabled in future, a consent mechanism appropriate to the applicable law will be added before they load, and this policy will be updated.</p>

<h2>Payment Information</h2>
<p>Online payment is not currently active. When it is, card, UPI and bank details are collected and processed by the payment gateway, not by this website. Dancewala Studio does not store full card numbers, UPI credentials or bank passwords.</p>

<h2>Your Choices</h2>
<ul class="bullets">
  <li>You can ask what information the studio holds about you.</li>
  <li>You can ask for it to be corrected or deleted.</li>
  <li>You can withdraw consent to being contacted.</li>
</ul>
<p>To do any of these, use the contact details at the bottom of this page.</p>

<h2>Children's Information</h2>
<p>Information about children is collected only from a parent or guardian, and only where it is needed to place them in a suitable batch.</p>

${CONTACT_BLOCK}
${UPDATED}
`)}`,
};

/* ================================================================== */
export const termsPage = {
  url: '/terms-and-conditions/',
  title: 'Terms & Conditions | Dancewala Studio',
  description:
    'The terms that apply when you browse this website, make an enquiry, or book dance classes or choreography with Dancewala Studio in Gurugram.',
  scripts: ['seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Terms & Conditions', url: '/terms-and-conditions/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${HERO('Terms & Conditions', 'The terms that apply when you use this website or book a service with Dancewala Studio.')}
${PROSE('', `
<p class="lede">Please read these terms before booking. By using this website or making a booking you agree to them.</p>

<h2>About These Terms</h2>
<p>These terms govern your use of dancewalas.com and any booking, enquiry or purchase made through it. Dancewala Studio may update them; the current version is always the one published on this page.</p>

<h2>Bookings</h2>
<ul class="bullets">
  <li>A booking request is not confirmed until the studio confirms it with you directly.</li>
  <li>You are responsible for providing accurate contact details so the studio can reach you.</li>
  <li>Batch allocation is decided by the studio based on age, level and availability.</li>
  <li>Fees and batch timings are confirmed by the studio before payment. The amounts shown inside the booking wizard on this website are demonstration values only.</li>
</ul>

<h2>Payments</h2>
<p>Online payment is not currently active on this website. When it is enabled:</p>
<ul class="bullets">
  <li>Payment will be processed by a third-party payment gateway, not by this website.</li>
  <li>Payment status will be verified on the server before a booking is marked as paid.</li>
  <li>Dancewala Studio does not store card numbers, CVV, UPI PINs or net banking passwords.</li>
</ul>

<h2>Cancellations, Refunds and Rescheduling</h2>
<p>These are governed by the <a href="/refund-cancellation-policy/">Refund &amp; Cancellation Policy</a>, which forms part of these terms.</p>

<h2>Classes, Workshops and Events</h2>
<ul class="bullets">
  <li>The studio may change an instructor, batch time or venue where necessary, and will notify booked students.</li>
  <li>Workshop and event dates are published only once confirmed. Where an event is postponed or cancelled by the studio, the studio will offer an alternative or a refund as set out in the refund policy.</li>
  <li>Students are expected to follow studio conduct and safety guidance. The studio may ask anyone to leave a session where behaviour puts others at risk.</li>
</ul>

<h2>Choreography Engagements</h2>
<ul class="bullets">
  <li>Scope — number of routines, performers and rehearsal sessions — is agreed in writing before work begins.</li>
  <li>Changes to scope may affect the fee and will be agreed before they are carried out.</li>
  <li>Rehearsal attendance is the client's responsibility; the studio cannot guarantee a result where agreed rehearsals are missed.</li>
</ul>

<h2>Health and Safety</h2>
<p>Dance carries a risk of injury, as does any physical activity. You take part at your own risk and are responsible for telling the studio about any injury, medical condition or limitation that affects what you can safely do. Tell your instructor before a session begins, not during it.</p>

<h2>Intellectual Property</h2>
<p>Choreography created by Dancewala Studio remains the studio's work. You are welcome to perform it; recording and publishing it commercially, or teaching it as your own, requires the studio's permission. Photography and video taken at studio events may be used by the studio for promotional purposes unless you tell us otherwise in writing.</p>

<h2>Website Content</h2>
<p>Content on this website is provided for general information. Class availability, instructor profiles and gallery content are updated as the studio confirms them, and nothing here should be read as a guarantee of availability.</p>

<h2>Liability</h2>
<p>To the extent permitted by law, Dancewala Studio is not liable for indirect or consequential loss arising from use of this website or from a booking. Nothing in these terms limits liability where it cannot lawfully be limited.</p>

<h2>Governing Law</h2>
<p>These terms are governed by the laws of India, and the courts of Gurugram, Haryana have exclusive jurisdiction.</p>

${CONTACT_BLOCK}
${UPDATED}
`)}`,
};

/* ================================================================== */
export const refundPage = {
  url: '/refund-cancellation-policy/',
  title: 'Refund & Cancellation Policy | Dancewala Studio',
  description:
    'How cancellations, refunds, rescheduling and no-shows are handled for Dancewala Studio dance classes, workshops and choreography bookings.',
  scripts: ['seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Refund & Cancellation Policy', url: '/refund-cancellation-policy/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${HERO('Refund & Cancellation Policy', 'How cancellations, rescheduling and refunds are handled.')}
${PROSE('', `
<div class="demo-notice" style="margin-bottom:2rem">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3l9 16H3l9-16Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 9v5M12 17v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  <span><strong>Values pending approval</strong>The sections marked <em>[TO CONFIRM]</em> need the studio to set the actual windows and percentages. They are left as clearly marked placeholders rather than invented numbers.</span>
</div>

<h2>General Principle</h2>
<p>Refunds and cancellations are subject to the service-specific terms displayed at the time of booking. Where a specific term has been agreed for your booking, that term applies over anything general on this page.</p>

<h2>Cancellation Window</h2>
<p><strong>[TO CONFIRM]</strong> — the studio has not yet published a standard cancellation window. The window that applies to your booking will be stated at the time of booking and on your confirmation.</p>

<h2>Refund Eligibility</h2>
<p><strong>[TO CONFIRM]</strong> — refund eligibility depends on the service booked and how close to the start date the cancellation is made. Class batches, workshops and choreography engagements are likely to be treated differently, and each will be stated at the point of booking.</p>

<h2>Rescheduling</h2>
<p><strong>[TO CONFIRM]</strong> — the studio will set out how many times a booking may be rescheduled and how much notice is required. Rescheduling is generally easier to arrange than a refund, so ask about it first.</p>

<h2>No-Show</h2>
<p><strong>[TO CONFIRM]</strong> — the treatment of a missed session without notice will be published here. As a general expectation, tell the studio as early as you can; a message before the session is far easier to work with than an explanation after it.</p>

<h2>Event Cancellation by the Studio</h2>
<p>If the studio cancels a class, workshop or event, or cannot deliver a booked choreography engagement, you will be offered a rescheduled date or a full refund of the amount paid for the cancelled service. This does not apply to events cancelled for reasons outside the studio's control, such as venue closure or government restriction, where the studio will offer an alternative date wherever it reasonably can.</p>

<h2>Payment Gateway Charges</h2>
<p><strong>[TO CONFIRM]</strong> — whether gateway transaction fees are deducted from a refund will be published here once the gateway is selected. In most cases the studio's intention is to refund the full amount paid by the customer.</p>

<h2>Processing Time</h2>
<p><strong>[TO CONFIRM]</strong> — approved refunds are processed within the time stated at the time of booking. Once the studio initiates a refund, the time it takes to appear in your account depends on your bank or payment provider, which is outside the studio's control.</p>

<h2>How to Cancel or Reschedule</h2>
<p>Contact the studio directly with your booking reference:</p>
<ul class="bullets">
  <li>Phone: <a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></li>
  <li>WhatsApp: ${esc(BUSINESS.whatsapp)}</li>
  <li>Email: <a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></li>
</ul>
<p>Please include your name, the service booked and the date, so the request can be found quickly.</p>

${UPDATED}
`)}`,
};

/* ================================================================== */
export const shippingPage = {
  url: '/shipping-delivery-policy/',
  title: 'Shipping & Delivery Policy | Dancewala Studio',
  description:
    'Dancewala Studio provides dance classes, choreography and workshops. No physical goods are shipped; this page explains how bookings and confirmations are delivered.',
  scripts: ['seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Shipping & Delivery Policy', url: '/shipping-delivery-policy/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${HERO('Shipping & Delivery Policy', 'Dancewala Studio sells services, not products. Nothing physical is shipped.')}
${PROSE('', `
<p class="lede">Dancewala Studio provides dance classes, choreography services, workshops and performances. These are services delivered in person at the studio or at a venue agreed with you. No physical product is sold, dispatched or delivered to an address, and no shipping charge is applied.</p>

<h2>What "Delivery" Means Here</h2>
<p>For this business, delivery means the service taking place. Specifically:</p>
<ul class="bullets">
  <li><strong>Dance classes</strong> — delivered in person at Dancewala Studio, Building 19, Second Floor, Huda Market, Sector 46, Gurugram, Haryana 122003, at the batch time confirmed with you.</li>
  <li><strong>Choreography services</strong> — delivered as rehearsal sessions and the performance itself, at the studio or at a venue agreed in advance.</li>
  <li><strong>Workshops</strong> — delivered in person on the published date, at the venue stated on the workshop listing.</li>
  <li><strong>Performances</strong> — delivered at the client's event venue on the agreed date.</li>
</ul>

<h2>How Confirmations Reach You</h2>
<p>Once the booking system is fully live, confirmations and receipts are delivered electronically:</p>
<ul class="bullets">
  <li>By email to the address you provide at booking — sent from ${esc(EMAIL.FROM_EMAIL)}</li>
  <li>By WhatsApp message to the number you provide, where you have asked for it</li>
  <li>By phone call where the studio needs to confirm a detail with you</li>
</ul>
<p>These electronic confirmations are delivered immediately or shortly after a booking and payment are confirmed. There is no physical dispatch and therefore no shipping timeline.</p>

<h2>If You Do Not Receive a Confirmation</h2>
<p>If you have completed a booking and have not received a confirmation, check your spam folder first, then contact the studio:</p>
<ul class="bullets">
  <li>Phone: <a href="${BUSINESS.phoneHref}">${esc(BUSINESS.phone)}</a></li>
  <li>WhatsApp: ${esc(BUSINESS.whatsapp)}</li>
  <li>Email: <a href="${BUSINESS.emailHref}">${esc(BUSINESS.email)}</a></li>
</ul>

<h2>Digital Material</h2>
<p>Where the studio shares practice material such as a routine video or a song list, it is shared electronically by WhatsApp or email. There is no charge for this and nothing is posted to an address.</p>

<h2>Physical Goods</h2>
<p>Dancewala Studio does not currently sell merchandise, costumes or physical products through this website. If that changes, this page will be updated with the applicable shipping terms and delivery timelines.</p>

${UPDATED}
`)}`,
};

/* ================================================================== */
export const disclaimerPage = {
  url: '/disclaimer/',
  title: 'Disclaimer | Dancewala Studio',
  description:
    'Website disclaimer for Dancewala Studio covering general information, health and safety, third-party links, social embeds and the current frontend-only booking system.',
  scripts: ['seo'],
  trail: [{ label: 'Home', url: '/' }, { label: 'Disclaimer', url: '/disclaimer/' }],
  jsonld: function () { return [webPageSchema(this, this.trail)]; },
  body: `
${HERO('Disclaimer', 'What this website is, what it is not, and the limits of the information on it.')}
${PROSE('', `
<h2>General Information</h2>
<p>The content on dancewalas.com is provided for general information about Dancewala Studio and its services. Class availability, instructor profiles, gallery content and event listings are updated as the studio confirms them. Nothing on this website constitutes a guarantee of availability, and the studio may change batches, instructors, timings or fees.</p>

<h2>Booking and Payment System Status</h2>
<div class="demo-notice" style="margin:1.5rem 0">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16.2v.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  <span><strong>Frontend prototype</strong>The booking, login, account and payment screens on this website are a frontend demonstration. No account is created, no payment is processed and no booking is stored on a server. Amounts shown inside the booking flow are demonstration values, not quotes.</span>
</div>
<p>A booking is only real once the studio has confirmed it with you directly by phone, WhatsApp or email.</p>

<h2>Fees and Timings</h2>
<p>Dancewala Studio does not publish class fees or batch timings on this website. Both depend on the batch that suits you, and are shared directly by the studio on enquiry. Any figure appearing inside the booking wizard is illustrative only.</p>

<h2>Health and Safety</h2>
<p>Dance is a physical activity and carries a risk of injury. You participate at your own risk. Tell your instructor about any injury, medical condition, pregnancy or physical limitation before a session begins. If you have any doubt about whether dance is appropriate for you, consult a medical professional first.</p>
<p>Nothing on this website is medical or fitness advice.</p>

<h2>Results</h2>
<p>How quickly someone progresses depends on attendance, practice and the individual. The studio does not promise specific outcomes, weight loss, flexibility targets or performance results.</p>

<h2>Third-Party Links and Embedded Content</h2>
<p>This website links to Instagram, YouTube and Google Maps, and may embed video from the official Dancewala Studio YouTube channel. Those services are operated by third parties. Dancewala Studio does not control their content, availability or privacy practices, and is not responsible for them.</p>
<p>Instagram Reels and YouTube Shorts are shown using official embeds or links. No video file is downloaded, copied or re-hosted by this website.</p>

<h2>Reviews and Ratings</h2>
<p>Dancewala Studio does not publish copied reviews on this website. Any ratings or reviews shown on Google or other third-party platforms are the property of those platforms and their authors. No aggregate rating is claimed by this website.</p>

<h2>Imagery</h2>
<p>Photography on this website is used to represent the studio and its services. It is replaced with original studio photography as it becomes available. Where a person or venue appears in an image, that image is illustrative.</p>

${CONTACT_BLOCK}
${UPDATED}
`)}`,
};

void btn;
