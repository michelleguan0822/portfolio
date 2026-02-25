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
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-out, opacity 0.2s ease, width 0.2s ease, height 0.2s ease;
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

    // 3. Mouse Move Listener
    window.addEventListener("mousemove", (e) => {
        spotlight.style.left = e.clientX + "px";
        spotlight.style.top = e.clientY + "px";
    });

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
