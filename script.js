/* ===============================
   Smooth Scrolling (Safe & Robust)
================================ */
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      event.preventDefault();
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ===============================
   Active Navigation Highlight
================================ */
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));

function updateActiveNav() {
  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentSectionId}`
    );
  });
}

/* ===============================
   Scroll Listener (Optimized)
================================ */
window.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateActiveNav);
});

/* ===============================
   Initial State Fix (On Load)
================================ */
document.addEventListener('DOMContentLoaded', updateActiveNav);
