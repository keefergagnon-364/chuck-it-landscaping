# Chuck-it Landscaping

Static website for Chuck-it Landscaping & Yard Care in Arizona's White Mountains.

## Website files

- `index.html` — home page
- `about.html` — company and owner information
- `services.html` — landscaping and property-care services
- `gallery.html` — approved project photos
- `reviews.html` — approved customer testimonials
- `faqs.html` — frequently asked questions
- `contact.html` — contact details and service area
- `request-a-quote.html` — temporary quote-form preview
- `robots.txt` — search-engine crawling rules
- `sitemap.xml` — index of public website pages
- `favicon.png` — crawlable browser and search-result icon
- `favicon.svg` — scalable browser icon source
- `site.webmanifest` — website name, colors, and installable-site metadata
- `assets/site.css` — shared website styles
- `assets/site.js` — navigation, footer, mobile menu, active-page state, and quote-form behavior
- `assets/images/` — approved site imagery and grass texture

The site has no build step or package dependencies. Open `index.html` directly or publish the repository root with any static web host.

## Jobber handoff

Quote buttons currently open the local mock form. When Chuck's live Jobber form is ready, replace the `JOBBER_URL` value near the top of `assets/site.js` with the approved URL.

## GitHub Pages

The included workflow can publish the repository root to GitHub Pages. It is manual-only until the site is ready to go live.

## SEO and Google launch checklist

The site includes unique page titles and descriptions, canonical URLs, crawl directives, social-sharing metadata, structured organization data, descriptive image text, `robots.txt`, and an image-aware XML sitemap. The temporary mock quote form is intentionally marked `noindex` and is not included in the sitemap.

After the final domain is connected:

1. Replace the provisional GitHub Pages URL in HTML metadata, `robots.txt`, and `sitemap.xml` with the final domain.
2. Add the site to Google Search Console, verify ownership, and submit `sitemap.xml`.
3. Claim or update Chuck-it's Google Business Profile as a service-area business. Keep the residential address hidden, and match the website's business name, phone, hours, service areas, and services.
4. Add the final website URL and live Jobber booking link to the Business Profile, then upload approved project photos and request Google reviews.
5. Add Search Console's verification tag or file to this repository if Google provides one.
