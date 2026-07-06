/* Premium portfolio interactions and animations */
const preloader = document.getElementById('preloader');
const progressBar = document.getElementById('progressBar');
const typeText = document.getElementById('typeText');
const cursor = document.getElementById('customCursor');
const glow = document.getElementById('cursorGlow');
const starfield = document.getElementById('starfield');
const particlesContainer = document.getElementById('particles');
const revealElements = document.querySelectorAll('[data-reveal]');

const roles = [
  "Student",
  "Future Software Engineer",
  "Cybersecurity Enthusiast",
  "AI Explorer",
  "Always Learning",
  "Building Project Astra"
];
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

window.addEventListener('load', () => {
  hidePreloader();
  createFloatingParticles(28);
  animateStarfield();
  revealOnScroll();
});

window.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initCursor();
  initScrollProgress();
  initSmoothLinks();
  initRevealObserver();

  const hero = document.querySelector('.hero');

  if (hero) {
    setTimeout(() => {
      hero.classList.add('animate');
    }, 200);
  }
});

function hidePreloader() {
  if (!preloader) return;
  preloader.classList.add('finished');
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 600);
}

function initTypingEffect() {
  if (!typeText) return;
  const currentText = roles[typeIndex];

  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typeText.textContent = currentText.slice(0, charIndex);
  let delay = isDeleting ? 50 : 120;

  if (!isDeleting && charIndex === currentText.length) {
    delay = 1700;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % roles.length;
    delay = 350;
  }

  setTimeout(initTypingEffect, delay);
}

function initCursor() {
  window.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;
    glow.style.left = `${clientX}px`;
    glow.style.top = `${clientY}px`;
  });

  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      glow.style.transform = 'translate(-50%, -50%) scale(1.3)';
    });
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      glow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const offsetTop = element.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    if (offsetTop < viewportHeight * 0.85) {
      element.classList.add('revealed');
    }
  });
}

function createFloatingParticles(amount) {
  for (let i = 0; i < amount; i += 1) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    const size = Math.random() * 5 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 14 + 8}s`;
    particle.style.opacity = String(Math.random() * 0.55 + 0.15);
    particlesContainer.appendChild(particle);
  }
}

function animateStarfield() {
  const ctx = starfield.getContext('2d');
  const stars = [];
  const starCount = 140;
  const width = window.innerWidth;
  const height = window.innerHeight;

  starfield.width = width;
  starfield.height = height;

  for (let i = 0; i < starCount; i += 1) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3,
      speed: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.7 + 0.1,
    });
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      star.x -= star.speed;
      if (star.x < 0) {
        star.x = width;
        star.y = Math.random() * height;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }

  frame();
  window.addEventListener('resize', () => {
    starfield.width = window.innerWidth;
    starfield.height = window.innerHeight;
  });
}
