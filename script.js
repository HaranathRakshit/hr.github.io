/* ==========================================
   script.js — Desktop Safe, Mobile Premium
   ========================================== */

(() => {

  /* -------------------------------
     Smooth Scrolling
  -------------------------------- */
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* -------------------------------
     Active Navigation Highlight
  -------------------------------- */
  const sections = Array.from(document.querySelectorAll('main section'));
  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));

  function updateActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.25;

    sections.forEach(section => {
      const top = section.offsetTop;
      if (scrollPos >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`
      );
    });
  }

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateActiveNav);
  }, { passive: true });

  /* -------------------------------
     MOBILE-ONLY ACCORDIONS
     Desktop = ALWAYS EXPANDED
  -------------------------------- */
  function initMobileAccordions() {

    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    /* ===== DESKTOP MODE ===== */
    if (!isMobile) {

      document.querySelectorAll('.section-toggle').forEach(toggle => toggle.remove());

      document.querySelectorAll('.section-body').forEach(body => {
        body.classList.remove('collapsed');
        body.classList.add('expanded');
        body.style.maxHeight = 'none';
        body.style.opacity = '1';
      });

      document.querySelectorAll('section h2').forEach(h2 => {
        h2.style.display = '';
      });

      return;
    }

    /* ===== MOBILE MODE ONLY BELOW ===== */
    sections.forEach(section => {

      let body = section.querySelector('.section-body');

      if (!body) {
        body = document.createElement('div');
        body.className = 'section-body collapsed';

        const nodes = [];
        section.childNodes.forEach(node => {
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'h2') return;
          nodes.push(node);
        });

        nodes.forEach(n => body.appendChild(n));
        section.appendChild(body);
      }

      const h2 = section.querySelector('h2');
      if (!h2) return;

      if (!section.querySelector('.section-toggle')) {
        const toggle = document.createElement('div');
        toggle.className = 'section-toggle';

        toggle.innerHTML = `
          <div class="toggle-title">${h2.innerHTML}</div>
          <div class="toggle-action">Show</div>
        `;

        h2.style.display = 'none';
        section.insertBefore(toggle, section.firstChild);

        toggle.addEventListener('click', () => {
          const action = toggle.querySelector('.toggle-action');
          const isCollapsed = body.classList.contains('collapsed');

          if (isCollapsed) {
            body.classList.remove('collapsed');
            body.classList.add('expanded');
            action.textContent = 'Hide';
          } else {
            body.classList.add('collapsed');
            body.classList.remove('expanded');
            action.textContent = 'Show';
          }
        });
      }
    });
  }

  /* -------------------------------
     Init on Load
  -------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    initMobileAccordions();
  });

  /* -------------------------------
     Re-evaluate on Resize
  -------------------------------- */
  window.addEventListener('resize', () => {
    initMobileAccordions();
  });

})();
