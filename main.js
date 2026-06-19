// ================================
//  SOLARCORE — main.js
// ================================

// --- Live kWh ticker in hero ---
(function () {
  const ticker = document.getElementById('ticker');
  if (!ticker) return;

  // Simulate ~3.2 GW average generating ~3,200,000 kWh/hr = ~889 kWh/sec
  // For demo, we start at a plausible mid-day value and tick at visible speed
  let value = 842_391_004;
  const rate = 127; // kWh added every ~100ms for dramatic effect

  function fmt(n) {
    return n.toLocaleString('en-US');
  }

  ticker.textContent = fmt(value);

  setInterval(() => {
    value += rate;
    ticker.textContent = fmt(value);
  }, 100);
})();


// --- Scroll-reveal for sections ---
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  const targets = document.querySelectorAll(
    '.feature-card, .stat-item, .solution-card, .step, .about-text, .contact-text, .contact-form'
  );

  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Stagger children inside grids
  document.querySelectorAll('.stats-grid, .solutions-grid, .about-features').forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // Add .visible class via CSS
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
})();


// --- Smooth active nav highlight on scroll ---
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = '#F5A623';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();


// --- Form submit feedback ---
(function () {
  const btn = document.querySelector('.btn-primary.full-width');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    let allFilled = true;
    inputs.forEach((el) => {
      if (!el.value.trim()) {
        el.style.borderColor = '#e74c3c';
        allFilled = false;
      } else {
        el.style.borderColor = '';
      }
    });

    if (allFilled) {
      btn.textContent = '✓ Request Sent!';
      btn.style.background = '#27ae60';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send My Request';
        btn.style.background = '';
        btn.disabled = false;
        inputs.forEach((el) => (el.value = ''));
      }, 3000);
    }
  });
})();
