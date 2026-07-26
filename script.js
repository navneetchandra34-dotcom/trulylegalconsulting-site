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

// WhatsApp Form Submission Handler
const whatsappForm = document.getElementById('whatsappForm');

if (whatsappForm) {
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent standard page reload
    
    // Grab all values
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const service = document.getElementById('userService').value;
    const message = document.getElementById('userMessage').value.trim();

    // Construct the WhatsApp Message
    const whatsappMessage = `*New Inquiry via TrulyLegal Website* 🚀\n\n*Name:* ${name}\n*Email:* ${email}\n*Service Required:* ${service}\n\n*Message/Requirements:*\n${message}`;

    // Target Phone Number (Navneet Chandra)
    const targetPhone = "919473182479";
    
    // URL Encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp wa.me link
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  });
}

