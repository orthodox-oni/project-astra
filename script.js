const preloader = document.getElementById("preloader");
const skipLaunch = document.getElementById("skipLaunch");
const preloaderStars = document.getElementById("preloaderStars");
const progressBar = document.getElementById("progressBar");
const starfield = document.getElementById("starfield");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const phoneDock = document.getElementById("phoneDock");
const phoneToggle = document.getElementById("phoneToggle");
const phoneClose = document.getElementById("phoneClose");
const discordHandle = "tomato_kiwi_36611";

const quotes = [
  "Build honestly.",
  "Quality over speed.",
  "Understand before copying.",
  "Leave evidence of growth.",
  "The goal isn’t to live forever, but to create something that will.",
];

const studies = {
  astra: {
    meta: "Case study · Live",
    title: "Project Astra",
    body: "Astra is this site. A cinematic atlas of a student becoming an engineer—honest, unfinished on purpose, and rebuilt in public.",
  },
  next: {
    meta: "Roadmap",
    title: "Project showcase",
    body: "This bay stays empty until a second real project ships. When it exists, the case study will exist too.",
  },
  signal: {
    meta: "Concept · Future",
    title: "Signal console",
    body: "A planned dashboard for notes, experiments, and a transparent coding journey.",
  },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let launchDone = false;

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => img.setAttribute("data-failed", "true"));
  });
  initLaunch();
  initStarfield();
  initScrollProgress();
  initReveal();
  initNav();
  initTheme();
  initLibrary();
  initSpecialtyTypewriter();
  initCounters();
  initVisitorCount();
  initGitHub();
  initProjects();
  initPhoneDock();
  initTerminal();
  initActiveNav();
});

function initLaunch() {
  if (!preloader || reducedMotion) {
    finishLaunch(true);
    return;
  }

  skipLaunch?.addEventListener("click", () => finishLaunch());
  animatePreloaderStars();

  window.setTimeout(() => preloader.classList.add("is-launching"), 280);
  window.setTimeout(() => finishLaunch(), 1700);
}

function finishLaunch(immediate) {
  if (launchDone) return;
  launchDone = true;
  document.body.classList.add("booted");
  if (!preloader) return;
  if (immediate) {
    preloader.style.display = "none";
    return;
  }
  preloader.classList.add("is-done");
  window.setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
}

function animatePreloaderStars() {
  if (!preloaderStars) return;
  const ctx = preloaderStars.getContext("2d");
  let width = 0;
  let height = 0;
  const stars = Array.from({ length: 90 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.2 + 0.2,
    a: Math.random() * 0.6 + 0.15,
  }));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    preloaderStars.width = width * dpr;
    preloaderStars.height = height * dpr;
    preloaderStars.style.width = `${width}px`;
    preloaderStars.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function frame() {
    if (launchDone) return;
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(240,236,228,${star.a})`;
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(frame);
}

function initStarfield() {
  if (!starfield || reducedMotion) return;
  const ctx = starfield.getContext("2d");
  const stars = [];
  let width = 0;
  let height = 0;

  function createStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.25 + 0.25,
      a: Math.random() * 0.42 + 0.22,
      tw: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.05,
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
    const count = Math.min(320, Math.max(160, Math.round(width / 5)));
    stars.length = 0;
    while (stars.length < count) stars.push(createStar());
  }

  function frame(time) {
    if (document.hidden) return;
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      star.y += star.drift;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;
      const pulse = 0.65 + Math.sin(time * 0.0012 + star.tw) * 0.35;
      ctx.globalAlpha = star.a * pulse;
      ctx.fillStyle = "#f2eee6";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  resize();
  requestAnimationFrame(frame);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) requestAnimationFrame(frame);
  });
}

function initScrollProgress() {
  window.addEventListener(
    "scroll",
    () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) progressBar.style.width = `${height > 0 ? (top / height) * 100 : 0}%`;
    },
    { passive: true }
  );
}

function initReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (reducedMotion) {
    nodes.forEach((node) => node.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    },
    { threshold: 0.12 }
  );
  nodes.forEach((node) => observer.observe(node));
}

function initNav() {
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initActiveNav() {
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === id));
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}

function initTheme() {
  const calm = readPreference("astra-calm") === "1";
  document.body.classList.toggle("calm", calm);
  themeToggle?.addEventListener("click", () => {
    const next = !document.body.classList.contains("calm");
    document.body.classList.toggle("calm", next);
    savePreference("astra-calm", next ? "1" : "0");
  });
}

function initLibrary() {
  const bookshelf = document.getElementById("bookshelf");
  if (!bookshelf) return;

  const catalogs = [
    { category: "psychology", spineLabel: "PSY", books: window.astraPsychologyBooks },
    { category: "law", spineLabel: "LAW", books: window.astraLawBooks },
  ];

  catalogs.forEach(({ category, spineLabel, books: catalog }) => {
    if (!Array.isArray(catalog)) {
      throw new Error(`The ${category} book catalog could not be loaded.`);
    }

    const existingTitles = new Set(
      [...bookshelf.querySelectorAll(`[data-category="${category}"] h3`)].map((title) =>
        title.textContent.trim().toLocaleLowerCase()
      )
    );
    catalog.forEach((book) => {
      if (existingTitles.has(book.title.toLocaleLowerCase())) return;

      const card = document.createElement("article");
      card.className = "book-card glass";
      card.dataset.category = category;

      const spine = document.createElement("span");
      spine.className = "book-spine";
      spine.textContent = spineLabel;

      const content = document.createElement("div");
      content.className = "book-content";

      const field = document.createElement("p");
      field.className = "book-type";
      field.textContent = book.field;

      const title = document.createElement("h3");
      title.textContent = book.title;

      const author = document.createElement("small");
      author.className = "book-author";
      author.textContent = `By ${book.author}`;

      const progress = document.createElement("div");
      progress.className = "reading-progress";
      progress.setAttribute("role", "progressbar");
      progress.setAttribute("aria-label", `Reading progress for ${book.title}`);
      progress.setAttribute("aria-valuemin", "0");
      progress.setAttribute("aria-valuemax", "100");
      progress.setAttribute("aria-valuenow", "100");

      const progressFill = document.createElement("span");
      progressFill.style.width = "100%";
      progress.append(progressFill);

      const status = document.createElement("small");
      status.textContent = "Completed · 100%";

      content.append(field, title, author, progress, status);
      card.append(spine, content);
      bookshelf.append(card);
      existingTitles.add(book.title.toLocaleLowerCase());
    });
  });

  const buttons = document.querySelectorAll(".chip");
  const books = bookshelf.querySelectorAll(".book-card");
  const moreButton = document.getElementById("bookshelfMore");
  const countStatus = document.getElementById("bookshelfCount");
  const pageSize = 4;
  let activeFilter = "all";
  let visibleCount = pageSize;

  function updateBookshelf() {
    const filteredBooks = [...books].filter(
      (book) => activeFilter === "all" || book.dataset.category === activeFilter
    );
    filteredBooks.forEach((book, index) => {
      book.hidden = index >= visibleCount;
    });
    books.forEach((book) => {
      if (activeFilter !== "all" && book.dataset.category !== activeFilter) book.hidden = true;
    });

    const remaining = Math.max(0, filteredBooks.length - visibleCount);
    if (moreButton) {
      moreButton.hidden = remaining === 0;
      moreButton.innerHTML = `Show ${Math.min(pageSize, remaining)} more book${remaining === 1 ? "" : "s"} <span aria-hidden="true">↓</span>`;
      moreButton.setAttribute(
        "aria-label",
        `Show ${Math.min(pageSize, remaining)} more books`
      );
    }
    if (countStatus) {
      const shown = Math.min(visibleCount, filteredBooks.length);
      countStatus.textContent = `Showing ${shown} of ${filteredBooks.length} books`;
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter || "all";
      visibleCount = pageSize;
      updateBookshelf();
    });
  });

  moreButton?.addEventListener("click", () => {
    const previousCount = visibleCount;
    visibleCount += pageSize;
    updateBookshelf();
    const newlyShown = [...books].filter((book) => !book.hidden).slice(previousCount, visibleCount);
    newlyShown.forEach((book) => {
      book.classList.remove("book-card-revealing");
      void book.offsetWidth;
      book.classList.add("book-card-revealing");
      book.addEventListener(
        "animationend",
        () => book.classList.remove("book-card-revealing"),
        { once: true }
      );
    });
  });

  updateBookshelf();
}

function initSpecialtyTypewriter() {
  const word = document.getElementById("specialtyWord");
  if (!word || reducedMotion) return;

  const specialties = ["psychology", "law", "cybersecurity", "aeronautics"];
  let specialtyIndex = 0;
  let deleting = false;

  function type() {
    const current = specialties[specialtyIndex];
    const visibleText = word.textContent;
    word.textContent = deleting
      ? current.slice(0, visibleText.length - 1)
      : current.slice(0, visibleText.length + 1);

    let delay = deleting ? 45 : 90;
    if (!deleting && word.textContent === current) {
      deleting = true;
      delay = 1250;
    } else if (deleting && word.textContent === "") {
      deleting = false;
      specialtyIndex = (specialtyIndex + 1) % specialties.length;
      delay = 250;
    }

    window.setTimeout(type, delay);
  }

  window.setTimeout(type, 900);
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries) => {
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
    },
    { threshold: 0.6 }
  );
  counters.forEach((counter) => observer.observe(counter));
}

function initVisitorCount() {
  const el = document.getElementById("visitorCount");
  if (!el) return;
  const visits = Number(readPreference("astra-visits") || 0) + 1;
  savePreference("astra-visits", String(visits));
  el.textContent = String(visits);
}

async function initGitHub() {
  const stars = document.getElementById("ghStars");
  const forks = document.getElementById("ghForks");
  const updated = document.getElementById("ghUpdated");
  if (!stars) return;
  try {
    const response = await fetch("https://api.github.com/repos/orthodox-oni/project-astra");
    if (!response.ok) throw new Error("GitHub unavailable");
    const data = await response.json();
    stars.textContent = data.stargazers_count ?? 0;
    forks.textContent = data.forks_count ?? 0;
    updated.textContent = data.pushed_at ? new Date(data.pushed_at).toLocaleDateString() : "n/a";
  } catch {
    stars.textContent = "live";
    forks.textContent = "—";
    updated.textContent = "open repo";
  }
}

function initProjects() {
  const modal = document.getElementById("studyModal");
  const closeStudy = document.getElementById("closeStudy");
  document.querySelectorAll(".project-open").forEach((button) => {
    button.addEventListener("click", () => {
      const study = studies[button.dataset.project];
      if (!study || !modal) return;
      document.getElementById("studyMeta").textContent = study.meta;
      document.getElementById("studyTitle").textContent = study.title;
      document.getElementById("studyBody").textContent = study.body;
      modal.showModal();
    });
  });
  closeStudy?.addEventListener("click", () => modal.close());
}

function initPhoneDock() {
  const phoneApps = document.getElementById("phoneApps");
  const setOpen = (open) => {
    phoneDock?.classList.toggle("open", open);
    phoneToggle?.setAttribute("aria-expanded", String(open));
    phoneApps?.toggleAttribute("inert", !open);
    phoneApps?.setAttribute("aria-hidden", String(!open));
    if (open) {
      phoneApps?.querySelector(".app")?.focus();
    } else if (document.activeElement instanceof HTMLElement && phoneApps?.contains(document.activeElement)) {
      phoneToggle?.focus();
    }
  };
  phoneToggle?.addEventListener("click", () => setOpen(true));
  phoneClose?.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  document.getElementById("discordLink")?.addEventListener("click", async (event) => {
    const label = event.currentTarget.querySelector("span");
    const status = document.getElementById("discordStatus");
    const original = label?.textContent;

    if (!navigator.clipboard?.writeText) {
      if (label) label.textContent = "Clipboard unavailable";
      if (status) status.textContent = `Clipboard unavailable. Discord handle: ${discordHandle}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(discordHandle);
      if (label) {
        label.textContent = "Copied handle";
        window.setTimeout(() => {
          label.textContent = original || `@${discordHandle}`;
        }, 1400);
      }
      if (status) status.textContent = `Discord handle copied: ${discordHandle}`;
    } catch (error) {
      if (label) label.textContent = "Copy failed";
      if (status) status.textContent = `Could not copy the Discord handle. Use ${discordHandle}.`;
      console.error("Could not copy the Discord handle.", error);
    }
  });
}

function initTerminal() {
  const overlay = document.getElementById("terminal");
  const log = document.getElementById("terminalLog");
  const form = document.getElementById("terminalForm");
  const input = document.getElementById("terminalInput");
  let buffer = "";

  window.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.matches("input, textarea")) return;
    if (event.key.length !== 1) return;
    buffer = (buffer + event.key.toLowerCase()).slice(-5);
    if (buffer === "astra") openTerminal();
  });

  function openTerminal() {
    overlay.hidden = false;
    if (log.childElementCount === 0) print("secret channel opened. type help.");
    input.focus();
  }

  function print(line) {
    const p = document.createElement("p");
    p.textContent = line;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const cmd = input.value.trim().toLowerCase();
    input.value = "";
    print(`$ ${cmd}`);
    if (cmd === "help") print("help | version | github | quote | status | clear | exit");
    else if (cmd === "version") print("Project Astra v1.0 — atlas complete.");
    else if (cmd === "github") print("https://github.com/orthodox-oni/project-astra");
    else if (cmd === "quote") print(quotes[Math.floor(Math.random() * quotes.length)]);
    else if (cmd === "status") print("Mission status: READY. Builder: Samrat Singh.");
    else if (cmd === "clear") log.replaceChildren();
    else if (cmd === "exit") overlay.hidden = true;
    else print("unknown command. try help.");
  });
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
    // storage may be blocked
  }
}
