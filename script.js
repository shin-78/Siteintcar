// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // account for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Simple animate counter for stats
function animateValue(obj, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out quart
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    
    let current = Math.floor(easeProgress * (end - start) + start);
    if(end > 1000) {
      obj.innerHTML = current.toLocaleString('pt-BR') + suffix;
    } else {
      obj.innerHTML = current + suffix;
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Trigger animation on load for Hero Stats
document.addEventListener("DOMContentLoaded", () => {
  const statVehicles = document.getElementById('stat-vehicles');
  const statRating = document.getElementById('stat-rating');
  
  if(statVehicles) animateValue(statVehicles, 0, 67000, 2500, '+');
  if(statRating) animateValue(statRating, 0, 98, 2000, '%');
});

// WhatsApp Facebook Pixel Tracking
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll('a[href*="wa.me"]');
  links.forEach(function(link) {
    link.addEventListener("click", function() {
      if (typeof fbq !== "undefined") {
        fbq('track', 'Lead', {
          content_name: 'WhatsApp Click'
        });
      }
    });
  });
});
