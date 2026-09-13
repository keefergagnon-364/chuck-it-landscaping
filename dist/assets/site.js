const JOBBER_URL = '/request-a-quote/';

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
        <a class="brand" href="/" aria-label="Chuck-it home">
          <span class="brand-mark" aria-hidden="true">C</span>
          <span><strong>CHUCK-IT</strong><small>Landscaping &amp; Yard Care</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav id="site-nav" class="site-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/services/">Services</a>
          <a href="/about/">About</a>
          <a href="/gallery/">Gallery</a>
          <a href="/reviews/">Reviews</a>
          <a href="/faqs/">FAQs</a>
          <a href="/contact/">Contact</a>
          <a class="button button-small" data-quote-link href="/request-a-quote/">Request a quote</a>
        </nav>
      </div>
    </header>`;
}

if (footerMount) {
  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <strong>CHUCK-IT</strong>
          <span>Cleaning America one yard at a time.</span>
          <p>Dependable landscaping and property care across Arizona's White Mountains.</p>
        </div>
        <div><h2>Explore</h2><a href="/services/">Services</a><a href="/gallery/">Gallery</a><a href="/reviews/">Reviews</a><a href="/faqs/">FAQs</a><a href="/contact/">Contact</a></div>
        <div><h2>Contact</h2><a href="tel:+19282421788">(928) 242-1788</a><a href="sms:+19282421788">Send a text</a><a href="mailto:charlesperkins928@gmail.com">Email Chuck</a><span>Mon–Fri · 8 AM–5 PM</span></div>
      </div>
      <div class="wrap footer-bottom"><span>© <span data-year></span> Chuck-it.</span><span>Pinetop · Show Low · Lakeside · White Mountains</span></div>
    </footer>`;
}

document.querySelectorAll('[data-quote-link]').forEach((link) => {
  link.setAttribute('href', JOBBER_URL);
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

const quoteForm = document.querySelector('#quote-preview-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = document.querySelector('#form-result');
    result.hidden = false;
    result.focus();
    quoteForm.reset();
  });
}
