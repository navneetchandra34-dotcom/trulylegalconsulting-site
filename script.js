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
      // Uncomment the line below if you only want animations to trigger once
      // observer.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: '0px 0px -50px 0px' 
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
