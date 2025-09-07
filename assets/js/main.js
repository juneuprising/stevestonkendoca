
// FAQ functionality
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('open');
  });
});

// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const body = document.body;

  if (navToggle && navOverlay) {
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navOverlay.classList.toggle('active');
      body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on overlay
    navOverlay.addEventListener('click', function(e) {
      if (e.target === navOverlay) {
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('nav-open');
      }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.nav__mobile-links a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('nav-open');
      });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('nav-open');
      }
    });
  }
});
