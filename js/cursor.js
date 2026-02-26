/**
 * Global Cursor Effect (Spotlight)
 * Matches the index.html cursor and expands on hover.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject CSS for the cursor
  const style = document.createElement('style');
  style.innerHTML = `
      body {
        cursor: none !important;
      }
      a, button, input, textarea, select, .studio-card, .project-item, .other-card, .sfx-hover, .sfx-click {
        cursor: none !important;
      }
      #cursor-spotlight {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 999999;
        /* Removed hardware acceleration to fix Safari mix-blend-mode bug over DOM text */
        transform: translate(-50%, -50%) scale(0);
        transition: opacity 0.2s ease, width 0.2s ease, height 0.2s ease;
        opacity: 0;
      }
      body.has-cursor #cursor-spotlight {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      #cursor-spotlight.active {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.8);
      }
    `;
  document.head.appendChild(style);

  // 2. Create cursor element
  let spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight) {
    spotlight = document.createElement('div');
    spotlight.id = 'cursor-spotlight';
    document.body.appendChild(spotlight);
  }
  document.body.classList.add("has-cursor");

  // 3. Mouse Move Listener via requestAnimationFrame
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
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
    // Interpolation for slight smooth lag.
    // 0.8 is extremely snappy and responsive, almost 1:1 with the mouse.
    mouseX += (targetX - mouseX) * 0.8;
    mouseY += (targetY - mouseY) * 0.8;

    spotlight.style.left = mouseX + 'px';
    spotlight.style.top = mouseY + 'px';

    if (Math.abs(targetX - mouseX) > 0.1 || Math.abs(targetY - mouseY) > 0.1) {
      requestAnimationFrame(updateCursor);
    } else {
      isMoving = false;
    }
  }

  // 4. Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    spotlight.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    spotlight.style.opacity = "1";
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
    '.page'
  ];

  const interactives = document.querySelectorAll(interactiveSelectors.join(','));
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      spotlight.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      spotlight.classList.remove('active');
    });
  });
});
