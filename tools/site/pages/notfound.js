/**
 * Custom 404 page.
 */
import { btn, waBtn, webPageSchema } from '../layout.js';
import { CLASSES, CHOREOGRAPHY } from '../data.js';

export const notFound = {
  url: '/404/',
  title: 'Page Not Found | Dancewala Studio',
  description: 'The page you were looking for is not here. Head back to Dancewala Studio or explore dance classes and choreography.',
  noindex: true,
  scripts: ['seo'],
  jsonld: function () { return [webPageSchema(this)]; },
  body: `
<section class="section section--white">
  <div class="container">
    <div class="result-card">
      <span class="result-card__icon result-card__icon--neutral" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false"><path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.5 10.5 12 12l2.5-1.5M12 12v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </span>
      <h1>404</h1>
      <p class="result-card__lead">Looks like this step took you somewhere else.</p>
      <div class="result-card__actions">
        ${btn('/', 'Back to Home', 'primary')}
        ${btn('/dance-classes/', 'Explore Dance Classes', 'outline')}
        ${btn('/contact-us/', 'Contact Us', 'outline')}
      </div>
      <div style="margin-top:2.5rem;text-align:left">
        <h2 class="section-title section-title--sm" style="text-align:center">Popular Pages</h2>
        <div class="pill-list" style="justify-content:center;margin-top:1rem">
          ${CLASSES.slice(0, 4).map((c) => `<a class="pill" href="/dance-classes/${c.slug}/">${c.title}</a>`).join('\n          ')}
          ${CHOREOGRAPHY.slice(0, 3).map((c) => `<a class="pill" href="/choreography/${c.slug}/">${c.title}</a>`).join('\n          ')}
          <a class="pill" href="/booking/">Book Now</a>
        </div>
      </div>
    </div>
  </div>
</section>`,
};
