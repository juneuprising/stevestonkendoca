
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

// Contact form: validate email on blur
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact__form');
  if (!contactForm) return;

  const emailInput = contactForm.querySelector('input[type="email"]');
  if (!emailInput) return;

  const validateEmailOnBlur = () => {
    // Reset any previous custom message
    emailInput.setCustomValidity('');

    // If email is invalid, set a friendly message
    if (!emailInput.validity.valid) {
      const message = emailInput.validity.valueMissing
        ? 'Email is required.'
        : 'Please enter a valid email address.';
      emailInput.setCustomValidity(message);
    }

    // Trigger the browser's built-in validation UI
    emailInput.reportValidity();
  };

  // Validate on blur
  emailInput.addEventListener('blur', validateEmailOnBlur);

  // Clear custom validity while typing
  emailInput.addEventListener('input', () => {
    emailInput.setCustomValidity('');
  });

  // Require Cloudflare Turnstile token before allowing submit (client-side gate)
  contactForm.addEventListener('submit', function(e) {
    const token = document.querySelector('input[name="cf-turnstile-response"]');
    if (!token || !token.value) {
      e.preventDefault();
      // Show Turnstile widget and ask user to complete challenge
      // If Turnstile API is present, we can explicitly render or reset if needed
      if (typeof turnstile !== 'undefined') {
        try { turnstile.render('.cf-turnstile'); } catch (_) {}
      }
      alert('Please complete the verification to send your message.');
    }
  });
});

// Expose a callback for Turnstile to call on success (optional)
function onTurnstileSuccess() {
  // Intentionally empty: presence of cf-turnstile-response input is enough for submit handler
}
