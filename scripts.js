// scripts.js
document.addEventListener('DOMContentLoaded', function () {
  // Menu toggle
  const nav = document.querySelector('nav');
  const menuToggle = document.getElementById('menu-toggle');
  const primaryMenu = document.getElementById('primary-menu');

  function setMenuState(open) {
    if (open) {
      nav.classList.remove('nav-collapsed');
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      nav.classList.add('nav-collapsed');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  menuToggle.addEventListener('click', function (e) {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!expanded);
  });

  // Close nav when clicking outside (mobile)
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && window.innerWidth <= 768) {
      setMenuState(false);
    }
  });

  // Close menu when a link inside nav is clicked (improves UX)
  primaryMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && window.innerWidth <= 768) {
      setMenuState(false);
    }
  });

  // Back to top button
  const backBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backBtn.style.display = 'block';
    } else {
      backBtn.style.display = 'none';
    }
  });
  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        }
      }
    });
  });

  // Set copyright year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Accessibility: close dropdowns on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Collapse mobile nav
      setMenuState(false);
      // Close any open dropdowns by blurring focused element
      if (document.activeElement && document.activeElement !== document.body) {
        try { document.activeElement.blur(); } catch (err) {}
      }
    }
  });
});
