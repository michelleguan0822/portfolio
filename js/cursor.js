/**
 * Global Cursor Effect (Spotlight)
 * Matches the index.html cursor and expands on hover.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject CSS for the dot and ring cursor
  const style = document.createElement('style');
  style.innerHTML = `
      * {
        cursor: none !important;
      }
      #cursor-dot, #cursor-ring {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 999999;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      #cursor-dot {
        width: 6px;
        height: 6px;
        background: white;
      }
      #cursor-ring {
        width: 32px;
        height: 32px;
        border: 1.5px solid white;
        transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      }
      body.has-cursor #cursor-dot, body.has-cursor #cursor-ring {
        opacity: 1;
      }
      #cursor-ring.active {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
      }
    `;
  document.head.appendChild(style);

  // 2. Create cursor elements
  let dot = document.getElementById('cursor-dot');
  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);
  }
  let ring = document.getElementById('cursor-ring');
  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'cursor-ring';
    document.body.appendChild(ring);
  }
  document.body.classList.add("has-cursor");

  // 3. Mouse Move Listener via requestAnimationFrame
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  // Coordinates for dot (precise)
  let dotX = mouseX, dotY = mouseY;
  // Coordinates for ring (smooth lag)
  let ringX = mouseX, ringY = mouseY;
  
  let targetX = mouseX;
  let targetY = mouseY;
  let isMoving = false;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateCursor);
    }
  }, { passive: true });

  function updateCursor() {
    // Dot: Rapid response (0.55 - was 0.4)
    dotX += (targetX - dotX) * 0.55;
    dotY += (targetY - dotY) * 0.55;

    // Ring: Smooth lag (0.2 - was 0.15)
    ringX += (targetX - ringX) * 0.2;
    ringY += (targetY - ringY) * 0.2;

    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    const distDot = Math.abs(targetX - dotX) + Math.abs(targetY - dotY);
    const distRing = Math.abs(targetX - ringX) + Math.abs(targetY - ringY);

    if (distDot > 0.1 || distRing > 0.1) {
      requestAnimationFrame(updateCursor);
    } else {
      isMoving = false;
    }
  }

  // 4. Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });

  // 5. Hover Effects
  const interactiveSelectors = [
    'a',
    'button',
    '.studio-card',
    '.nav-inner a',
    '.cta-btn',
    '.project-item',
    '.work-card',
    '.other-card',
    '.sfx-click',
    '.sfx-hover',
    '.page',
    '.section-title'
  ];
  // --- Global UI Audio Engine (Subtle High-end Tech Ticks) ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let audioEnabled = false;

  // Enable audio context on first user interaction
  window.addEventListener('click', () => {
    if (!audioEnabled && audioCtx.state !== 'running') {
      audioCtx.resume();
      audioEnabled = true;
    }
  }, { passive: true });

  function playUITick(freq = 1200, type = 'sine', duration = 0.02, vol = 0.015) {
    if (!audioEnabled || audioCtx.state !== 'running') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  const interactives = document.querySelectorAll(interactiveSelectors.join(','));
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('active');
      // Hover tick: very fast, high pitch
      playUITick(1200, 'sine', 0.02, 0.015);
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('active');
    });
    el.addEventListener('click', () => {
      // Click tick: slightly lower, sharper edge
      playUITick(400, 'square', 0.05, 0.02);
    });
  });

  // 6. Text Highlight Observer for Case Studies
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -15% 0px' });

  const highlightTargets = document.querySelectorAll('p b, .stat-label b, .feature-list b, .insight p b');
  highlightTargets.forEach(el => highlightObserver.observe(el));

  // 7. Section Scroll Animation Observer
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  const sectionTargets = document.querySelectorAll('.section');
  sectionTargets.forEach(el => sectionObserver.observe(el));
});
