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
- `assets/site.css` — shared website styles
- `assets/site.js` — navigation, footer, mobile menu, active-page state, and quote-form behavior
- `assets/images/` — approved site imagery and grass texture

The site has no build step or package dependencies. Open `index.html` directly or publish the repository root with any static web host.

## Jobber handoff

Quote buttons currently open the local mock form. When Chuck's live Jobber form is ready, replace the `JOBBER_URL` value near the top of `assets/site.js` with the approved URL.

## GitHub Pages

The included workflow can publish the repository root to GitHub Pages. It is manual-only until the site is ready to go live.
