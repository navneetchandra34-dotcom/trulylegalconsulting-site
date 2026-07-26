// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle?.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

// Close mobile nav on link click
siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      siteNav.classList.remove('open');
    }
  });
});

// Scroll Reveal Animation (Cinematic Fade Up)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: '0px 0px -50px 0px' 
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Number Counter Animation for Stats Grid
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count || '0', 10);
    const duration = 2000;
    const start = performance.now();
    
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(target * eased) + (target > 10 ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
    };
    
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// WhatsApp Form Submission Logic (For contact.html)
const whatsappForm = document.getElementById('whatsappForm');

if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const service = document.getElementById('userService').value;
    const message = document.getElementById('userMessage').value.trim();

    const whatsappMessage = `*New Inquiry via TrulyLegal Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Service Required:* ${service}\n\n*Message/Requirements:*\n${message}`;
    const targetPhone = "919473182479";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  });
}
