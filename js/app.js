/* ============================
   ALEX.DESIGN – Deck + Reader
   + Cursor Signature Canvas
   ============================ */

const PROJECTS = [
  {
    id: "CASE #001",
    title: "UNIMO — Make Emotions Visible",
    tag: "AI COMPANION · GAMIFICATION",
    desc: "Transforming emotional reflection into a structured, playable system that supports...",
    thumb: "image/Unimo/hero.jpg",
    url: "unimo.html",
    gradient: "#FFFFFF" // Minimal solid white
  },
  {
    id: "CASE #002",
    title: "Visual Authority for Clinical Decisions",
    tag: "CLINICAL SYSTEM · DATA VISUALIZATION",
    desc: "Designing a TMS dashboard that builds trust, clarity, and faster decisions in high-stakes...",
    thumb: "image/TMS/hero.png",
    url: "TMS.html",
    gradient: "#FAFAFA" // Minimal light gray
  },
  {
    id: "CASE #003",
    title: "Oltiva - AI Document Insights",
    tag: "AI WORKFLOW · B2B SYSTEM",
    desc: "Reducing sales search friction through an AI-powered document assistant that transforms...",
    thumb: "image/avanade/hero_mockup.png",
    url: "oltiva.html",
    gradient: "#F4F4F5" // Minimal cool gray
  }
];

/* ===== Elements ===== */
const loadingScreen = document.getElementById("loading-screen");
const mainInterface = document.getElementById("main-interface");
const bootPercent = document.getElementById("boot-percent");
const loaderBar = document.getElementById("loader-bar");
const loaderGlitch = document.getElementById("loader-glitch");
const bootText = document.getElementById("boot-text");

const workDeck = document.getElementById("work-deck");
const readerUnit = document.getElementById("reader-unit");
const readerText = document.getElementById("reader-text");

const btnProfile = document.getElementById("btn-profile");
const drawer = document.getElementById("about-drawer");
const btnCloseDrawer = document.getElementById("btn-close-drawer");

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const rand = (a, b) => a + Math.random() * (b - a);
const isMobile = () => window.innerWidth <= 768;

/* ============================
   Cursor Signature Canvas
   - subtle particles / arcs
   - fades out over time
   ============================ */
class SignatureCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });

    this.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    this.w = 0;
    this.h = 0;

    this.mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999, moving: false };
    this.points = []; // small particles
    this.streaks = []; // arc segments (very subtle)

    // tuning (subtle!)
    this.maxPoints = 520;
    this.spawnRate = 2; // per move
    this.fade = 0.08; // background fade each frame
    this.pointLife = 110; // frames
    this.arcLife = 70;

    this.running = true;

    this.resize();
    this.bind();
    this.loop();
  }

  resize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    this.canvas.style.width = this.w + "px";
    this.canvas.style.height = this.h + "px";
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  bind() {
    window.addEventListener("resize", () => this.resize());

    window.addEventListener("mousemove", (e) => {
      const nx = e.clientX;
      const ny = e.clientY;

      // velocity (for arc direction)
      this.mouse.vx = nx - this.mouse.px;
      this.mouse.vy = ny - this.mouse.py;
      this.mouse.px = nx;
      this.mouse.py = ny;

      this.mouse.x = nx;
      this.mouse.y = ny;
      this.mouse.moving = true;

      this.spawn(nx, ny, this.mouse.vx, this.mouse.vy);
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      this.mouse.moving = false;
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });
  }

  spawn(x, y, vx, vy) {
    // spawn subtle dots
    for (let i = 0; i < this.spawnRate; i++) {
      const angle = Math.atan2(vy, vx) + rand(-0.8, 0.8);
      const speed = rand(0.25, 0.9);

      this.points.push({
        x: x + rand(-3, 3),
        y: y + rand(-3, 3),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rand(0.7, 1.6),
        a: rand(0.025, 0.06),   // <= your “5%” vibe
        life: this.pointLife
      });
    }

    // spawn one tiny arc segment occasionally
    if (Math.hypot(vx, vy) > 2.2 && Math.random() < 0.55) {
      this.streaks.push({
        x1: x,
        y1: y,
        x2: x - vx * rand(3.0, 6.0),
        y2: y - vy * rand(3.0, 6.0),
        a: rand(0.02, 0.045),
        life: this.arcLife
      });
    }

    // cap arrays
    if (this.points.length > this.maxPoints) this.points.splice(0, this.points.length - this.maxPoints);
    if (this.streaks.length > 220) this.streaks.splice(0, this.streaks.length - 220);
  }

  step() {
    const ctx = this.ctx;

    // fade old frames (gentle, keeps trails)
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = this.fade;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();

    // subtle "gravity" toward mouse (signature vibe)
    const mx = this.mouse.x;
    const my = this.mouse.y;

    // draw arcs
    if (this.streaks.length) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (let i = this.streaks.length - 1; i >= 0; i--) {
        const s = this.streaks[i];
        s.life -= 1;

        const t = s.life / this.arcLife;
        const alpha = s.a * t;

        ctx.globalAlpha = alpha;

        // alternate between purple & indigo very subtly by using strokeStyle with alpha baked in
        ctx.strokeStyle = "rgba(168,85,247,1)";
        ctx.lineWidth = 1.1;

        // slight curve via quadratic control point (pull toward mouse)
        const cx = (s.x1 + s.x2) / 2 + (mx - s.x1) * 0.06;
        const cy = (s.y1 + s.y2) / 2 + (my - s.y1) * 0.06;

        ctx.beginPath();
        ctx.moveTo(s.x2, s.y2);
        ctx.quadraticCurveTo(cx, cy, s.x1, s.y1);
        ctx.stroke();

        if (s.life <= 0) this.streaks.splice(i, 1);
      }

      ctx.restore();
    }

    // draw particles
    if (this.points.length) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = this.points.length - 1; i >= 0; i--) {
        const p = this.points[i];
        p.life -= 1;

        // gravity (tiny)
        const dx = mx - p.x;
        const dy = my - p.y;
        const d = Math.max(60, Math.hypot(dx, dy));
        const g = 0.35 / d; // super subtle
        p.vx += dx * g * 0.06;
        p.vy += dy * g * 0.06;

        // drift + damping
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / this.pointLife;
        const alpha = p.a * t;

        ctx.globalAlpha = alpha;

        // tiny dots with soft glow
        ctx.fillStyle = "rgba(99,102,241,1)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // occasional extra faint purple dot for depth
        if (Math.random() < 0.12) {
          ctx.globalAlpha = alpha * 0.75;
          ctx.fillStyle = "rgba(168,85,247,1)";
          ctx.beginPath();
          ctx.arc(p.x + rand(-1.2, 1.2), p.y + rand(-1.2, 1.2), p.r * 0.85, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.life <= 0) this.points.splice(i, 1);
      }

      ctx.restore();
    }
  }

  loop() {
    if (!this.running) return;
    this.step();
    requestAnimationFrame(() => this.loop());
  }
}

/* ===== Reader helpers ===== */
function setReaderActive(active) {
  readerUnit.classList.toggle("active", active);
  readerText.textContent = active ? "DECODING..." : "INSERT CARD";

  // Trigger Flow Field Convergence
  if (typeof window.setFlowFieldState === "function") {
    window.setFlowFieldState(active);
  }
}

/* ============================
   Boot / Loading
   ============================ */
(function boot() {
  const logs = [
    "INITIALIZING KERNEL...",
    "SYNCING INTERFACE...",
    "LOADING PROJECT DECK...",
    "CALIBRATING READER...",
    "SYSTEM ONLINE."
  ];
  let i = 0;
  let pct = 0;

  const timer = setInterval(() => {
    pct = Math.min(100, pct + Math.floor(rand(6, 14)));
    loaderBar.style.width = pct + "%";
    bootPercent.textContent = pct + "%";
    loaderGlitch.style.left = pct + "%";

    if (pct > (i + 1) * 22 && i < logs.length - 1) {
      i++;
      bootText.textContent = logs[i];
    }

    if (pct >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        mainInterface.classList.remove("hidden");
        if (window.lucide) lucide.createIcons();
        init();
      }, 250);
    }
  }, 120);
})();

/* ============================
   State
   ============================ */
const dragState = {
  el: null,
  pointerId: null,
  offsetX: 0,
  offsetY: 0,
  z: 50,
  scanning: false
};

let signatureFX = null;

/* ============================
   Init
   ============================ */
function init() {
  // Safe-guard signature canvas
  const canvas = document.getElementById("signature-canvas");
  if (canvas) {
    signatureFX = new SignatureCanvas(canvas);
  }

  renderCards();
  scatterCards();

  // Custom Cursor Logic
  const spotlight = document.getElementById("cursor-spotlight");
  if (spotlight) {
    document.body.classList.add("has-cursor");
    window.addEventListener("mousemove", (e) => {
      spotlight.style.left = e.clientX + "px";
      spotlight.style.top = e.clientY + "px";
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      spotlight.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      spotlight.style.opacity = "1";
    });
  }

  btnProfile?.addEventListener("click", () => {
    drawer.classList.remove("hidden");
    drawer.classList.add("active");
    if (window.lucide) lucide.createIcons();
  });

  btnCloseDrawer?.addEventListener("click", () => {
    drawer.classList.remove("active");
    setTimeout(() => drawer.classList.add("hidden"), 150);
  });

  window.addEventListener("resize", () => keepCardsInBounds());
}

function renderCards() {
  [...workDeck.querySelectorAll(".card-item")].forEach(n => n.remove());

  PROJECTS.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "card-item floaty";
    card.dataset.url = p.url;

    card.dataset.title = p.title;
    card.dataset.tag = p.tag;
    card.dataset.desc = p.desc;
    card.dataset.id = p.id;

    card.innerHTML = `
      <div class="card-inner" style="background:${p.gradient}">
        <div class="card-overlay"></div>

        <div class="card-thumb">
          ${p.thumb ? `<img src="${p.thumb}" alt="${p.title} mockup" loading="lazy">` : ""}
        </div>

        <div class="card-header">
          <h3>${p.title}</h3>
          <div class="card-icon">
            <i data-lucide="scan"></i>
          </div>
        </div>

        <div class="card-footer">
          <div class="card-tag">${p.tag}</div>

          <button class="btn-view-project" type="button" data-action="view">
            View Project <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    card._x = 0;
    card._y = 0;
    card._r = rand(-10, 10);

    const btn = card.querySelector('[data-action="view"]');
    btn.addEventListener("pointerdown", (e) => e.stopPropagation());
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (dragState.scanning) return;
      openCase(card);
    });

    bindDrag(card);
    workDeck.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

function scatterCards() {
  if (isMobile()) return;
  const deckRect = workDeck.getBoundingClientRect();
  const cx = deckRect.width / 2;
  const cy = deckRect.height / 2;

  const cards = [...workDeck.querySelectorAll(".card-item")];

  // Desired pattern: Horizontal layout (Left, Center, Right)
  const configs = [
    { xOffset: -380, yOffset: -390, rotate: -6 },  // 0: UNIMO (Left)
    { xOffset: 0, yOffset: -390, rotate: 2 },      // 1: TMS (Center)
    { xOffset: 380, yOffset: -390, rotate: 8 }     // 2: Oltiva (Right)
  ];

  cards.forEach((card, i) => {
    const cfg = configs[i] || { xOffset: 0, yOffset: 0, rotate: 0 };
    const cw = card.getBoundingClientRect().width || 320;

    // Calculate top-left position to center the card at the offset
    card._x = cx + cfg.xOffset - (cw / 2);
    card._y = cy + cfg.yOffset;
    card._r = cfg.rotate;

    setTransform(card);
    bringFront(card, 10 + i);
  });
}

function keepCardsInBounds() {
  if (isMobile()) return;
  const cards = [...workDeck.querySelectorAll(".card-item")];
  cards.forEach((card) => {
    const bounded = boundWithinDeck(card, card._x, card._y);
    card._x = bounded.x;
    card._y = bounded.y;
    setTransform(card);
  });
}

function bringFront(el, bump = 1) {
  dragState.z += bump;
  el.style.zIndex = String(dragState.z);
}

function setTransform(card) {
  card.style.setProperty("--tx", `${card._x}px`);
  card.style.setProperty("--ty", `${card._y}px`);
  card.style.setProperty("--tr", `${card._r}deg`);
  card.style.transform = `translate3d(${card._x}px, ${card._y}px, 0) rotate(${card._r}deg)`;
}

function boundWithinDeck(card, x, y) {
  const deckRect = workDeck.getBoundingClientRect();
  const cw = card.getBoundingClientRect().width;
  const ch = card.getBoundingClientRect().height;

  const minX = 10;
  const minY = 10;
  const maxX = deckRect.width - cw - 10;
  const maxY = deckRect.height - ch - 10;

  return { x: clamp(x, minX, maxX), y: clamp(y, minY, maxY) };
}

function isInReader(card) {
  const deckRect = workDeck.getBoundingClientRect();
  const r = readerUnit.getBoundingClientRect();

  const expand = 22;
  const hit = {
    left: (r.left - deckRect.left) - expand,
    top: (r.top - deckRect.top) - expand,
    right: (r.right - deckRect.left) + expand,
    bottom: (r.bottom - deckRect.top) + expand
  };

  const cw = card.getBoundingClientRect().width;
  const ch = card.getBoundingClientRect().height;

  const cx = card._x + cw / 2;
  const cy = card._y + ch / 2;

  return cx >= hit.left && cx <= hit.right && cy >= hit.top && cy <= hit.bottom;
}

function readerProximity(card) {
  const deckRect = workDeck.getBoundingClientRect();
  const r = readerUnit.getBoundingClientRect();

  const cw = card.getBoundingClientRect().width;
  const ch = card.getBoundingClientRect().height;

  const cx = card._x + cw / 2;
  const cy = card._y + ch / 2;

  const rx = (r.left - deckRect.left) + r.width / 2;
  const ry = (r.top - deckRect.top) + r.height / 2;

  const dx = cx - rx;
  const dy = cy - ry;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 160) return "in";
  if (dist < 260) return "near";
  return "far";
}

function bindDrag(card) {
  card.addEventListener("pointerdown", (e) => {
    if (isMobile()) return;
    if (dragState.scanning) return;
    if (e.target.closest && e.target.closest('[data-action="view"]')) return;

    dragState.el = card;
    dragState.pointerId = e.pointerId;

    bringFront(card, 20);
    card.classList.add("dragging");
    card.classList.remove("floaty");
    card.setPointerCapture(e.pointerId);

    const deckRect = workDeck.getBoundingClientRect();
    const px = e.clientX - deckRect.left;
    const py = e.clientY - deckRect.top;

    dragState.offsetX = px - card._x;
    dragState.offsetY = py - card._y;

    card._r = 0;
    setTransform(card);
  });

  card.addEventListener("pointermove", (e) => {
    if (dragState.el !== card) return;
    if (dragState.pointerId !== e.pointerId) return;

    const deckRect = workDeck.getBoundingClientRect();
    const px = e.clientX - deckRect.left;
    const py = e.clientY - deckRect.top;

    const bounded = boundWithinDeck(card, px - dragState.offsetX, py - dragState.offsetY);
    card._x = bounded.x;
    card._y = bounded.y;

    setTransform(card);

    const prox = readerProximity(card);
    if (prox === "in") setReaderActive(true);
    else {
      readerUnit.classList.toggle("active", prox === "near");
      readerText.textContent = prox === "near" ? "READY" : "INSERT CARD";
    }
  });

  card.addEventListener("pointerup", (e) => {
    if (dragState.el !== card) return;

    try { card.releasePointerCapture(e.pointerId); } catch { }
    card.classList.remove("dragging");

    const inR = isInReader(card);
    setReaderActive(false);

    dragState.el = null;
    dragState.pointerId = null;

    if (inR) {
      absorbAndOpen(card);
      return;
    }

    card._r = rand(-12, 12);
    setTransform(card);
    card.classList.add("floaty");
    card.style.transition = "";
  });

  card.addEventListener("pointercancel", () => {
    card.classList.remove("dragging");
    card.classList.add("floaty");
    setReaderActive(false);
    dragState.el = null;
    dragState.pointerId = null;
  });

  // hover tilt
  card.addEventListener("mousemove", (e) => {
    if (dragState.el === card) return;
    const rect = card.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - ry) * 6;
    const tiltY = (rx - 0.5) * 6;

    card.style.transition = "transform 120ms ease";
    card.style.transform =
      `translate3d(${card._x}px, ${card._y}px, 0) rotate(${card._r}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    if (dragState.el === card) return;
    card.style.transition = "transform 180ms ease";
    setTransform(card);
    setTimeout(() => {
      if (dragState.el !== card) card.style.transition = "";
    }, 220);
  });
}

function absorbAndOpen(card) {
  if (dragState.scanning) return;
  dragState.scanning = true;

  setReaderActive(true);

  const deckRect = workDeck.getBoundingClientRect();
  const rr = readerUnit.getBoundingClientRect();

  const rx = (rr.left - deckRect.left) + rr.width / 2;
  const ry = (rr.top - deckRect.top) + rr.height / 2;

  const cw = card.getBoundingClientRect().width;
  const ch = card.getBoundingClientRect().height;

  const targetX = rx - cw / 2;
  const targetY = ry - ch / 2;

  bringFront(card, 50);

  card.style.transition = "transform 220ms ease, filter 220ms ease";
  card._x = targetX;
  card._y = targetY;
  card._r = 0;
  setTransform(card);

  setTimeout(() => { card.style.filter = "blur(1.8px)"; }, 180);

  setTimeout(() => {
    card.style.transition = "";
    card.style.filter = "";
    setReaderActive(false);
    dragState.scanning = false;
    openCase(card);
  }, 520);
}

function openCase(card) {
  const url = card.dataset.url;
  window.location.href = url;
}
