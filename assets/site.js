const siteScript = document.currentScript || document.querySelector('script[src$="assets/site.js"]');
const SITE_ROOT = siteScript ? new URL('../', siteScript.src) : new URL('./', window.location.href);
const siteUrl = (path = '') => new URL(path.replace(/^\/+/, ''), SITE_ROOT).href;

const QUOTE_URL = siteUrl('request-a-quote.html');

const headerMount = document.querySelector('#site-header');
const footerMount = document.querySelector('#site-footer');

if (headerMount) {
  headerMount.innerHTML = `
    <header class="site-header">
      <div class="topline">
        <div class="wrap topline-inner">
          <span>Serving Arizona's White Mountains</span>
          <span>Mon–Fri · 8 AM–5 PM</span>
        </div>
      </div>
      <div class="wrap nav-row">
        <a class="brand" href="${siteUrl()}" aria-label="Chuck-it home">
          <img class="brand-logo" src="${siteUrl('assets/images/chuck-it-logo-final.svg')}" alt="" width="1000" height="890">
          <span><strong>CHUCK-IT</strong><small>Landscaping &amp; Yard Care</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav id="site-nav" class="site-nav" aria-label="Main navigation">
          <a href="${siteUrl()}">Home</a>
          <a href="${siteUrl('services.html')}">Services</a>
          <a href="${siteUrl('about.html')}">About</a>
          <a href="${siteUrl('gallery.html')}">Gallery</a>
          <a href="${siteUrl('reviews.html')}">Reviews</a>
          <a href="${siteUrl('faqs.html')}">FAQs</a>
          <a href="${siteUrl('contact.html')}">Contact</a>
          <a class="button button-small" data-quote-link href="${QUOTE_URL}">Request a quote</a>
        </nav>
      </div>
    </header>`;
}

if (footerMount) {
  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <img class="footer-logo" src="${siteUrl('assets/images/chuck-it-logo-final.svg')}" alt="Chuck-it logo with pitchfork, shovel, and rake" width="1000" height="890" loading="lazy">
          <span>Cleaning America one yard at a time.</span>
          <p>Dependable landscaping and property care across Arizona's White Mountains.</p>
        </div>
        <div><h2>Explore</h2><a href="${siteUrl('services.html')}">Services</a><a href="${siteUrl('gallery.html')}">Gallery</a><a href="${siteUrl('reviews.html')}">Reviews</a><a href="${siteUrl('faqs.html')}">FAQs</a><a href="${siteUrl('contact.html')}">Contact</a></div>
        <div><h2>Contact</h2><a href="tel:+19282421788">(928) 242-1788</a><a href="sms:+19282421788">Send a text</a><a href="mailto:charlesperkins928@gmail.com">Email us</a><span>Mon–Fri · 8 AM–5 PM</span></div>
      </div>
      <div class="wrap footer-bottom"><span>© <span data-year></span> Chuck-it.</span><span>Pinetop · Show Low · Lakeside · White Mountains</span></div>
    </footer>`;
}

document.querySelectorAll('[data-quote-link]').forEach((link) => {
  link.setAttribute('href', QUOTE_URL);
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const path = window.location.pathname.replace(/\/+$/, '') || '/';
document.querySelectorAll('.site-nav a:not(.button)').forEach((link) => {
  const target = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, '') || '/';
  if (target === path) link.setAttribute('aria-current', 'page');
});

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  const endpoint = String(window.CHUCK_IT_FORM_ENDPOINT || '').trim();
  const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
  const fields = quoteForm.querySelector('fieldset');
  const submit = quoteForm.querySelector('button[type="submit"]');
  const availability = document.querySelector('#form-availability');
  const result = document.querySelector('#form-result');
  const email = quoteForm.elements.email;
  const contactMethod = quoteForm.elements['contact-method'];
  let sending = false;

  const updateEmailRequirement = () => {
    email.required = contactMethod.value === 'Email';
    document.querySelector('#email-required').hidden = !email.required;
  };
  contactMethod.addEventListener('change', updateEmailRequirement);
  updateEmailRequirement();

  if (configured) {
    quoteForm.action = endpoint;
    fields.disabled = false;
    submit.disabled = false;
    availability.hidden = true;
  }

  const showResult = (message, state) => {
    result.textContent = message;
    result.dataset.state = state;
    result.hidden = false;
    result.focus();
  };

  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    if (!configured) {
      showResult('Online requests are not available yet. Please call or text (928) 242-1788.', 'error');
      return;
    }
    if (!quoteForm.reportValidity() || quoteForm.elements._gotcha.value) return;

    // Read values before disabling controls. Never clear an unconfirmed request.
    const data = new FormData(quoteForm);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    sending = true;
    fields.disabled = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    quoteForm.setAttribute('aria-busy', 'true');
    result.hidden = true;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      if (response.ok) {
        quoteForm.reset();
        updateEmailRequirement();
        showResult('Thank you! Your estimate request has been sent. We will follow up within 24 hours. You can text property photos to (928) 242-1788.', 'success');
      } else {
        showResult(response.status === 429
          ? 'Online requests are temporarily at capacity. Your details are still here. Please call or text (928) 242-1788 for an estimate.'
          : 'Your request was not accepted. Please check your details and try again, or call or text (928) 242-1788. Your details have been kept here.', 'error');
      }
    } catch {
      showResult('We could not confirm delivery. Your details are still here. Please call or text (928) 242-1788 before submitting again so we can avoid a duplicate request.', 'error');
    } finally {
      clearTimeout(timeout);
      sending = false;
      fields.disabled = false;
      submit.disabled = false;
      submit.textContent = 'Send estimate request';
      quoteForm.removeAttribute('aria-busy');
    }
  });
}
