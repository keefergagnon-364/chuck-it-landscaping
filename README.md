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
- `request-a-quote.html` — estimate request form, delivered through Chuck's Formspree account
- `robots.txt` — search-engine crawling rules
- `sitemap.xml` — index of public website pages
- `favicon.png` — crawlable browser and search-result icon
- `favicon.svg` — scalable browser icon source
- `site.webmanifest` — website name, colors, and installable-site metadata
- `assets/site.css` — shared website styles
- `assets/site.js` — navigation, footer, mobile menu, active-page state, and quote-form behavior
- `assets/form-config.js` — Chuck's public Formspree endpoint (not a password or API secret)
- `assets/images/` — approved site imagery and grass texture

The site has no build step or package dependencies. Its primary public URL is **https://chuckitlandscaping.com/**, hosted through GitHub Pages with Porkbun DNS.

## Formspree setup and handoff

Chuck is using his own separate free Formspree account, not KWGDesign's account. All quote buttons open `request-a-quote.html`.

1. Chuck's email is verified and the form **Chuck-it website estimates** sends notifications to `charlesperkins928@gmail.com`.
2. The form endpoint is stored in `window.CHUCK_IT_FORM_ENDPOINT` in `assets/form-config.js`. This public endpoint is not an account password or API secret.
3. A clearly labeled setup test was accepted by the form and confirmed in Formspree's submissions on September 19, 2026. After publishing, confirm delivery in Chuck's inbox, check spam if needed, and test an email reply.
4. Review spam protection in Formspree. Keep the `_gotcha` honeypot and monitor the account's submission allowance. If domain restrictions are enabled, allow `chuckitlandscaping.com` and `www.chuckitlandscaping.com`.

The form fails safely when its endpoint is blank/invalid: inputs stay disabled and visitors are offered call/text links. It only clears entered details after a successful server response. Errors keep the details visible and offer a phone/text alternative; network failures are described as unconfirmed delivery to avoid accidental duplicates. Email becomes required when the visitor selects email as the preferred reply method. No submission data is saved to local browser storage by the site.

The free tier currently allows 50 submissions per month and stores 30 days of submission history. Native file uploads require a paid plan, so visitors are offered a text-message link for photos. Check current limits in [Formspree's account documentation](https://help.formspree.io/articles/account-management/account-limits) and [upload documentation](https://help.formspree.io/articles/building-your-form/file-uploads). Do not upgrade without Chuck's approval.

## GitHub Pages

The public site is hosted with GitHub Pages. `CNAME` sets `chuckitlandscaping.com` as the custom domain, and `www.chuckitlandscaping.com` redirects to the root domain. Preserve the current publishing source and custom-domain setting in repository Settings → Pages. Publish the repository root, not a generated build folder.

## SEO and Google launch checklist

The site includes unique page titles and descriptions, canonical URLs, crawl directives, social-sharing metadata, structured organization data, visible descriptions and descriptive alt text for all 13 gallery images, `robots.txt`, and an image-aware XML sitemap. The quote form is intentionally marked `noindex` and is not included in the sitemap.

The custom-domain metadata, crawl files, and structured data were updated on September 20, 2026. Remaining launch tasks:

1. Add the site to Google Search Console, verify ownership, and submit `https://chuckitlandscaping.com/sitemap.xml`.
2. Finish Google Business Profile verification. Keep the residential address hidden, and match the website's business name, phone, hours, service areas, and services.
3. Add `https://chuckitlandscaping.com/` to the Business Profile. If Google offers an appropriate request/appointment link field, use `https://chuckitlandscaping.com/request-a-quote.html`, never the Formspree POST endpoint.
4. Upload approved project photos and request genuine Google reviews without incentives.
5. Add Search Console's verification tag or file to this repository if Google provides one.
