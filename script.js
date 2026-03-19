
const docEl = document.documentElement;
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formHint = document.getElementById('formHint');
const copyInfoBtn = document.getElementById('copyInfoBtn');

const contactText = `TrulyLegal Consulting
Email: trulylegalconsulting@gmail.com
Phone: +91 94731 82479
Website: trulylegalconsulting.in
Address: Road no. 14, Chandra Vihar Colony, Rajeev Nagar, Patna – 800025
TrulyVirtual: trulyvirtualsolution@gmail.com
Phone: +91 80840 89353`;

const savedTheme = localStorage.getItem('trulylegal-theme');
if (savedTheme) {
  docEl.setAttribute('data-theme', savedTheme);
  themeToggle.querySelector('.theme-icon').textContent = savedTheme === 'dark' ? '☾' : '☼';
}

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 840) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

themeToggle?.addEventListener('click', () => {
  const next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  if (next === 'dark') {
    docEl.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('.theme-icon').textContent = '☾';
  } else {
    docEl.removeAttribute('data-theme');
    themeToggle.querySelector('.theme-icon').textContent = '☼';
  }
  localStorage.setItem('trulylegal-theme', next);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count || '0', 10);
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.service-card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const cats = (card.dataset.category || '').split(' ');
      const show = filter === 'all' || cats.includes(filter);
      card.style.display = show ? 'block' : 'none';
    });
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

copyInfoBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(contactText);
    formHint.textContent = 'Contact details copied to clipboard.';
  } catch (err) {
    formHint.textContent = 'Copy failed on this device. You can still select and copy the details manually.';
  }
});

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const service = data.get('service') || '';
  const message = data.get('message') || '';

  const subject = encodeURIComponent(`Website inquiry from ${name}`);
  const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Service needed: ${service}

Message:
${message}

---
Sent from the TrulyLegal website.`
  );

  formHint.innerHTML = `Ready-to-send message prepared. <a href="mailto:trulylegalconsulting@gmail.com?subject=${subject}&body=${body}">Open email draft</a> or use WhatsApp buttons above.`;
});
