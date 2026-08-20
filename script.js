const launchSequence = document.getElementById('launchSequence');
const launchTitle = document.getElementById('launchTitle');
const launchDetail = document.getElementById('launchDetail');
const launchProgress = document.getElementById('launchProgress');
const missionReady = document.getElementById('missionReady');
const rocketBay = document.getElementById('rocketBay');
const welcomeLine = document.getElementById('welcomeLine');
const skipLaunch = document.getElementById('skipLaunch');
const launchStars = document.getElementById('launchStars');
const progressBar = document.getElementById('progressBar');
const typeText = document.getElementById('typeText');
const cursor = document.getElementById('customCursor');
const glow = document.getElementById('cursorGlow');
const starfield = document.getElementById('starfield');
const revealElements = document.querySelectorAll('[data-reveal]');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const colorPicker = document.getElementById('colorPicker');
const paletteTrigger = document.getElementById('paletteTrigger');
const colorOptions = document.querySelectorAll('.color-option');
const modeToggle = document.getElementById('modeToggle');

const roles = [
  'Future Software Engineer',
  'Creative Problem Solver',
  'Student of Technology',
  'Builder of thoughtful experiences'
];

const quotes = [
  'Build honestly.',
  'Quality over speed.',
  'Understand before copying.',
  'Leave evidence of growth.',
  'Every version should be better than the previous one.'
];

const studies = {
  astra: {
    meta: 'Case study · Live',
    title: 'Project Astra',
    body: 'Astra is this site. It started as a foundation (v0.1), grew an identity (v0.2), and now carries a bookshelf, timeline, GitHub signal, launch sequence, and a hidden terminal. The redesign is the product: cinematic, honest, and still unfinished on purpose.'
  },
  next: {
    meta: 'Roadmap · v0.4',
    title: 'Project showcase',
    body: 'This bay stays empty until a second real project ships. The roadmap calls for GitHub integration, live demos, and case studies—this card is the reminder, not a fake portfolio piece.'
  },
  signal: {
    meta: 'Concept · Future',
    title: 'Signal console',
    body: 'A planned dashboard for notes, experiments, and a transparent coding journey. It exists here as a promise: when the lab is real, the case study will be real too.'
  }
};

const orbitCopy = {
  Build: 'Make small, honest things. Each finished project becomes evidence of what is possible next.',
  Read: 'Psychology, law, literature, and philosophy sit on the same shelf as code. Reading is part of the engineering practice.',
  Explore: 'Cybersecurity, design, and AI are tracks on the same mission—not trophies, just directions of curiosity.',
  Reflect: 'The roadmap, changelog, and this site itself are the journal. Growth is visible because it is written down.'
};

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let launchSkipped = false;
let hyperspace = false;
let starSpeed = 0.08;

window.addEventListener('DOMContentLoaded', () => {
  initLaunchSequence();
  initTypingEffect();
  initCursor();
  initScrollProgress();
  animateStarfield();
  initRevealObserver();
  initMobileNav();
  initThemeControls();
  initLibraryFilters();
  initOrbitMap();
  initCounters();
  initVisitorCount();
  initGitHub();
  initProjects();
  initAssistant();
  initContact();
  initTerminal();
  revealOnScroll();
});

function initLaunchSequence() {
  if (!launchSequence) return;

  skipLaunch?.addEventListener('click', finishLaunch);
  playLaunch();
}

async function playLaunch() {
  const steps = [
    { title: 'PROJECT ASTRA', detail: '', progress: 8, wait: 700, ready: false },
    { title: 'Initializing systems…', detail: 'Loading core modules', progress: 28, wait: 800, ready: false },
    { title: 'Preparing launch…', detail: 'Fueling the sequence', progress: 58, wait: 800, ready: false },
    { title: 'Loading mission data…', detail: 'Bookshelf · Timeline · Projects', progress: 86, wait: 700, ready: false },
    { title: 'Mission status', detail: 'All systems green', progress: 100, wait: 500, ready: true }
  ];

  animateLaunchStars();

  for (const step of steps) {
    if (launchSkipped) return;
    launchTitle.textContent = step.title;
    launchDetail.textContent = step.detail;
    launchProgress.style.width = `${step.progress}%`;
    missionReady.classList.toggle('show', step.ready);
    await wait(step.wait);
  }

  if (launchSkipped) return;
  rocketBay.classList.add('ignite');
  await wait(500);
  if (launchSkipped) return;
  rocketBay.classList.add('launch');
  hyperspace = true;
  starSpeed = 7;
  await wait(1100);
  if (launchSkipped) return;
  welcomeLine.classList.add('show');
  await wait(900);
  finishLaunch();
}

function finishLaunch() {
  if (launchSkipped) return;
  launchSkipped = true;
  hyperspace = false;
  starSpeed = 0.08;
  launchSequence.classList.add('done');
  document.body.classList.add('booted');
  const hero = document.querySelector('.hero');
  if (hero) setTimeout(() => hero.classList.add('animate'), 220);
  setTimeout(() => {
    launchSequence.style.display = 'none';
  }, 900);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function animateLaunchStars() {
  if (!launchStars) return;
  const ctx = launchStars.getContext('2d');
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: Math.random()
  }));

  function frame() {
    if (launchSkipped && launchSequence.style.display === 'none') return;
    const w = (launchStars.width = window.innerWidth);
    const h = (launchStars.height = window.innerHeight);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    stars.forEach((star) => {
      star.z -= hyperspace ? 0.035 : 0.004;
      if (star.z <= 0) star.z = 1;
      const sx = (star.x - 0.5) * (w / star.z) + w / 2;
      const sy = (star.y - 0.5) * (h / star.z) + h / 2;
      const size = (1 - star.z) * (hyperspace ? 3.2 : 1.6);
      ctx.fillStyle = '#e8fff8';
      ctx.globalAlpha = Math.min(1, 1.4 - star.z);
      ctx.fillRect(sx, sy, size, size);
      if (hyperspace) {
        ctx.strokeStyle = 'rgba(0, 237, 175, 0.45)';
        ctx.beginPath();
        ctx.moveTo(w / 2, h / 2);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    });
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initTypingEffect() {
  if (!typeText) return;
  const currentText = roles[typeIndex];

  if (isDeleting) charIndex -= 1;
  else charIndex += 1;

  typeText.textContent = currentText.slice(0, charIndex);
  let delay = isDeleting ? 70 : 110;

  if (!isDeleting && charIndex === currentText.length) {
    delay = 1700;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % roles.length;
    delay = 320;
  }

  setTimeout(initTypingEffect, delay);
}

function initCursor() {
  if (!cursor || !glow) return;
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });

    document.querySelectorAll('a, button, .poster-card, .book-card, .project-tile').forEach((element) => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.45)';
        glow.style.transform = 'translate(-50%, -50%) scale(1.22)';
      });
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        glow.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  } else {
    cursor.style.display = 'none';
    glow.style.display = 'none';
  }
}

function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0}%`;
  }, { passive: true });
}

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    },
    { threshold: 0.14 }
  );
  revealElements.forEach((element) => observer.observe(element));
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
      element.classList.add('revealed');
    }
  });
}

function animateStarfield() {
  if (!starfield) return;
  const ctx = starfield.getContext('2d');
  const stars = [];
  let width = 0;
  let height = 0;

  function createStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.16 + 0.03,
      drift: (Math.random() - 0.5) * 0.05,
      alpha: Math.random() * 0.6 + 0.22,
      twinkle: Math.random() * Math.PI * 2,
      teal: Math.random() > 0.72
    };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    starfield.width = width * dpr;
    starfield.height = height * dpr;
    starfield.style.width = `${width}px`;
    starfield.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(280, Math.max(140, Math.round(width / 5)));
    while (stars.length < count) stars.push(createStar());
  }

  resize();

  function frame(time) {
    ctx.clearRect(0, 0, width, height);
    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#00edaf';
    const boost = hyperspace ? starSpeed : 1;

    stars.forEach((star) => {
      star.x -= star.speed * boost;
      star.y += star.drift * boost;
      if (star.x < -4) {
        star.x = width + 4;
        star.y = Math.random() * height;
      }
      const pulse = 0.65 + Math.sin(time * 0.0015 + star.twinkle) * 0.35;
      ctx.beginPath();
      ctx.fillStyle = star.teal ? accent : '#eafff9';
      ctx.globalAlpha = star.alpha * pulse;
      ctx.arc(star.x, star.y, star.radius * (hyperspace ? 1.4 : 1), 0, Math.PI * 2);
      ctx.fill();
      if (star.radius > 0.85 && pulse > 0.86) {
        ctx.strokeStyle = star.teal ? accent : '#f3fffd';
        ctx.lineWidth = 0.35;
        ctx.beginPath();
        ctx.moveTo(star.x - star.radius * 2.4, star.y);
        ctx.lineTo(star.x + star.radius * 2.4, star.y);
        ctx.moveTo(star.x, star.y - star.radius * 2.4);
        ctx.lineTo(star.x, star.y + star.radius * 2.4);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
  window.addEventListener('resize', resize);
}

function initThemeControls() {
  if (!colorPicker || !paletteTrigger || !modeToggle) return;
  applyTheme(readPreference('astra-theme') || 'emerald');
  applyMode(readPreference('astra-mode') || 'glow');

  paletteTrigger.addEventListener('click', () => {
    const isOpen = colorPicker.classList.toggle('open');
    paletteTrigger.setAttribute('aria-expanded', String(isOpen));
  });

  colorOptions.forEach((option) => {
    option.addEventListener('click', () => {
      applyTheme(option.dataset.theme);
      colorPicker.classList.remove('open');
      paletteTrigger.setAttribute('aria-expanded', 'false');
    });
  });

  modeToggle.addEventListener('click', () => {
    applyMode(document.body.dataset.mode === 'light' ? 'glow' : 'light');
  });

  document.addEventListener('click', (event) => {
    if (!colorPicker.contains(event.target)) {
      colorPicker.classList.remove('open');
      paletteTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  savePreference('astra-theme', theme);
  colorOptions.forEach((option) => option.classList.toggle('active', option.dataset.theme === theme));
}

function applyMode(mode) {
  document.body.dataset.mode = mode;
  savePreference('astra-mode', mode);
  const isLight = mode === 'light';
  modeToggle.textContent = isLight ? '☾' : '☀';
  modeToggle.setAttribute('aria-pressed', String(isLight));
  modeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
}

function readPreference(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // local storage may be blocked
  }
}

function initMobileNav() {
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initLibraryFilters() {
  const buttons = document.querySelectorAll('.filter-button');
  const books = document.querySelectorAll('.book-card');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      books.forEach((book) => {
        const show = filter === 'all' || book.dataset.category === filter;
        book.hidden = !show;
      });
    });
  });
}

function initOrbitMap() {
  const nodes = document.querySelectorAll('.orbit-node');
  const title = document.getElementById('orbitTitle');
  const description = document.getElementById('orbitDescription');
  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach((item) => item.classList.remove('active'));
      node.classList.add('active');
      const key = node.dataset.orbit;
      title.textContent = key;
      description.textContent = orbitCopy[key];
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      let current = 0;
      const tick = () => {
        current += 1;
        el.textContent = String(current);
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((counter) => observer.observe(counter));
}

function initVisitorCount() {
  const el = document.getElementById('visitorCount');
  if (!el) return;
  const key = 'astra-visits';
  let visits = Number(readPreference(key) || 0) + 1;
  savePreference(key, String(visits));
  el.textContent = String(visits);
}

async function initGitHub() {
  const stars = document.getElementById('ghStars');
  const forks = document.getElementById('ghForks');
  const updated = document.getElementById('ghUpdated');
  if (!stars) return;
  try {
    const response = await fetch('https://api.github.com/repos/orthodox-oni/project-astra');
    if (!response.ok) throw new Error('GitHub unavailable');
    const data = await response.json();
    stars.textContent = data.stargazers_count ?? 0;
    forks.textContent = data.forks_count ?? 0;
    updated.textContent = data.pushed_at ? new Date(data.pushed_at).toLocaleDateString() : 'n/a';
  } catch {
    stars.textContent = 'live';
    forks.textContent = '—';
    updated.textContent = 'open repo';
  }
}

function initProjects() {
  const modal = document.getElementById('studyModal');
  const closeStudy = document.getElementById('closeStudy');
  document.querySelectorAll('.project-open').forEach((button) => {
    button.addEventListener('click', () => {
      const study = studies[button.dataset.project];
      if (!study || !modal) return;
      document.getElementById('studyMeta').textContent = study.meta;
      document.getElementById('studyTitle').textContent = study.title;
      document.getElementById('studyBody').textContent = study.body;
      modal.showModal();
    });
  });
  closeStudy?.addEventListener('click', () => modal.close());
}

function initAssistant() {
  const panel = document.getElementById('assistant');
  const log = document.getElementById('assistantLog');
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  document.getElementById('openAssistant')?.addEventListener('click', () => {
    panel.hidden = false;
    input.focus();
  });
  document.getElementById('closeAssistant')?.addEventListener('click', () => {
    panel.hidden = true;
  });
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    addLog(log, 'you', q);
    addLog(log, 'astra', assist(q));
    input.value = '';
  });
}

function assist(query) {
  const q = query.toLowerCase();
  if (q.includes('book')) return 'The bookshelf is in Knowledge library. Filter by psychology, law, literature, or philosophy.';
  if (q.includes('launch') || q.includes('rocket')) return 'The opening sequence is Version 1.0: black screen, ignition, hyperspace, then the site.';
  if (q.includes('github')) return 'Project Astra lives at github.com/orthodox-oni/project-astra. Stats load from the public API.';
  if (q.includes('terminal') || q.includes('secret')) return 'Type the word astra on the keyboard. Do not use a field—just type it.';
  if (q.includes('contact')) return 'Use the contact section, or email hello@samratsingh.dev.';
  return 'I can point you to the bookshelf, timeline, GitHub, launch sequence, or the secret terminal.';
}

function addLog(root, who, text) {
  const p = document.createElement('p');
  p.innerHTML = `<strong>${who}:</strong> ${text}`;
  root.appendChild(p);
  root.scrollTop = root.scrollHeight;
}

function initContact() {
  document.getElementById('copyStatus')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const status = 'PROJECT ASTRA · Mission status: READY · Samrat Singh · student becoming a software engineer.';
    try {
      await navigator.clipboard.writeText(status);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Copy failed';
    }
    setTimeout(() => {
      button.textContent = 'Copy mission status';
    }, 1600);
  });
}

function initTerminal() {
  const overlay = document.getElementById('terminal');
  const log = document.getElementById('terminalLog');
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const badge = document.getElementById('terminalBadge');
  let buffer = '';

  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.matches('input, textarea')) return;
    if (event.key.length !== 1) return;
    buffer = (buffer + event.key.toLowerCase()).slice(-5);
    if (buffer === 'astra') openTerminal();
  });

  function openTerminal() {
    overlay.hidden = false;
    badge?.classList.add('unlocked');
    if (log.childElementCount === 0) {
      print('secret channel opened. type help.');
    }
    input.focus();
  }

  function print(line) {
    const p = document.createElement('p');
    p.textContent = line;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    print(`$ ${cmd}`);
    if (cmd === 'help') print('help | version | github | quote | status | clear | exit');
    else if (cmd === 'version') print('Project Astra v1.0 — launch sequence complete.');
    else if (cmd === 'github') print('https://github.com/orthodox-oni/project-astra');
    else if (cmd === 'quote') print(quotes[Math.floor(Math.random() * quotes.length)]);
    else if (cmd === 'status') print('Mission status: READY. Builder: Samrat Singh. Mode: honest.');
    else if (cmd === 'clear') log.replaceChildren();
    else if (cmd === 'exit') overlay.hidden = true;
    else print('unknown command. try help.');
  });
}

document.querySelectorAll('.magnetic').forEach((button) => {
  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.16}px, ${(event.clientY - rect.top - rect.height / 2) * 0.16}px)`;
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});
