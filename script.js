/* ===========================
   INTCAR – Scripts
   =========================== */

// ── NAV SCROLL ──────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ── HAMBURGER MENU ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── SCROLL REVEAL ───────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Trigger hero reveals on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
});

// ── FAQ ACCORDION ───────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
  });

  // Toggle current
  if (!isOpen) {
    item.classList.add('open');
  }
}

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── COBERTURA CARD HOVER SOUND EFFECT (VISUAL) ──────────
document.querySelectorAll('.cobertura-card, .veiculo-card, .depo-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.willChange = 'transform';
  });
  card.addEventListener('mouseleave', () => {
    card.style.willChange = '';
  });
});

// ── WHATSAPP FLOAT VISIBILITY ───────────────────────────
const waFloat = document.querySelector('.whatsapp-float');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 300) {
    waFloat.style.opacity = '1';
    waFloat.style.transform = current > lastScroll ? 'translateY(0)' : 'translateY(-3px)';
  } else {
    waFloat.style.opacity = '1';
  }
  lastScroll = current;
}, { passive: true });

// ── COUNTER ANIMATION ────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  const isPlus = suffix.startsWith('+') || el.textContent.startsWith('+');
  const num = parseInt(target);
  const duration = 1800;
  const step = 16;
  const increments = duration / step;
  const increment = num / increments;
  let current = 0;

  const prefix = isPlus ? '+' : '';
  const timer = setInterval(() => {
    current += increment;
    if (current >= num) {
      current = num;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.round(current).toLocaleString('pt-BR') + suffix;
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat-num');
      stats.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('8.000')) animateCounter(stat, 8000, '');
        else if (text.includes('98')) animateCounter(stat, 98, '%');
        else if (text.includes('24')) { /* static */ }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
