/**
 * Ambient Identity Field
 * A subtle, interactive particle background for Michelle Guan's portfolio.
 * 
 * Design Intent:
 * - Calm, refined, minimal.
 * - Particles drift organically when idle.
 * - Subtle reaction to mouse movement.
 * - Forms a ghosted "MG" shape when still for 1 second.
 */

class AmbientField {
    constructor() {
        this.canvas = document.getElementById('pixel-canvas');
        if (!this.canvas) {
            console.error('Canvas element #pixel-canvas not found');
            return;
        }
        this.ctx = this.canvas.getContext('2d');

        // Configuration
        this.config = {
            particleCount: 600,
            color: { r: 139, g: 92, b: 246 },
            bg: '#f9fafb',
            interactionRadius: 150,
            formationDelay: 1000,
            dissolveDuration: 1500,
            formationOpacity: 0.6,
            baseOpacity: 0.4,
        };

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.particles = [];
        this.mouse = { x: -1000, y: -1000, lastMove: Date.now() };
        this.targets = []; // Points for "MG" formation
        this.isForming = false;

        // Bind methods
        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        this.init();
        this.initEvents();
        this.animate();
    }

    init() {
        this.resize();

        // Create particles
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this.width, this.height, this.config));
        }

        // Generate targets for "MG"
        this.generateTargets();
    }

    initEvents() {
        window.addEventListener('resize', this.resize);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.lastMove = Date.now();

        // If we were forming, dissolve back immediately
        if (this.isForming) {
            this.isForming = false;
            this.dissolve();
        }
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.generateTargets(); // Regenerate targets based on new size

        // Optimize: Cache the gradient instead of creating it every frame
        this.bgGradient = this.ctx.createRadialGradient(
            this.width * 0.8, this.height * 0.7, 0,
            this.width * 0.8, this.height * 0.7, this.width * 0.6
        );
        this.bgGradient.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
        this.bgGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    }

    generateTargets() {
        // Use an offscreen canvas to render text and sample points
        const offCanvas = document.createElement('canvas');
        offCanvas.width = this.width;
        offCanvas.height = this.height;
        const offCtx = offCanvas.getContext('2d');

        // Font settings
        const fontSize = Math.min(this.width, this.height) * 0.8; // Massive, acting as background
        offCtx.font = `900 ${fontSize}px "Inter", sans-serif`;
        offCtx.fillStyle = '#000';
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';

        // Draw "MG" in the center
        offCtx.fillText('MG', this.width / 2, this.height / 2);

        // Sample points from the text
        const imageData = offCtx.getImageData(0, 0, this.width, this.height).data;
        this.targets = [];
        const gap = 8; // Sampling gap for density control - coarser gap for fewer targets

        for (let y = 0; y < this.height; y += gap) {
            for (let x = 0; x < this.width; x += gap) {
                const index = (y * this.width + x) * 4;
                if (imageData[index + 3] > 128) { // If pixel is visible
                    this.targets.push({ x, y });
                }
            }
        }

        // Shuffle targets to avoid linear filling visual artifact
        // Fisher-Yates shuffle
        for (let i = this.targets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.targets[i], this.targets[j]] = [this.targets[j], this.targets[i]];
        }

        // Limit targets to particle count if needed, or just partial fill
        // Actually, we want to use available particles to fill available targets.
    }

    dissolve() {
        this.particles.forEach(p => {
            p.target = null;
            // Give them a random velocity to break formation naturally
            p.vx = (Math.random() - 0.5) * 0.8;
            p.vy = (Math.random() - 0.5) * 0.8;
        });
    }

    update() {
        const now = Date.now();
        const timeSinceMove = now - this.mouse.lastMove;

        // Check if we should start forming
        if (timeSinceMove > this.config.formationDelay && !this.isForming) {
            this.isForming = true;

            // Assign targets to particles
            // We loop through particles and assign the next available target
            // If more particles than targets, extras drift.
            // If more targets than particles, only partial shape forms (which is fine, "ghosted")
            this.particles.forEach((p, i) => {
                if (i < this.targets.length) {
                    p.target = this.targets[i];
                } else {
                    p.target = null;
                }
            });
        }

        this.particles.forEach(p => p.update(this.mouse, this.isForming, this.width, this.height));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Use cached gradient
        if (this.bgGradient) {
            this.ctx.fillStyle = this.bgGradient;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        this.particles.forEach(p => p.draw(this.ctx));
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate);
    }
}

class Particle {
    constructor(w, h, config) {
        this.config = config;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3; // Slow drift
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1.0; // Larger: 1.0px to 3.0px
        this.baseAlpha = Math.random() * config.baseOpacity + 0.1; // 0.1 to 0.6
        this.alpha = this.baseAlpha;
        this.target = null;
    }

    update(mouse, isForming, w, h) {
        // 1. Mouse Interaction (Repel/Disturb) - Subtle
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.interactionRadius) {
            const force = (this.config.interactionRadius - dist) / this.config.interactionRadius;
            const angle = Math.atan2(dy, dx);
            // "Small displacement, max 5px shift." -> force * 5
            const pushX = Math.cos(angle) * force * 0.5;
            const pushY = Math.sin(angle) * force * 0.5;

            this.vx += pushX * 0.1;
            this.vy += pushY * 0.1;
        }

        if (isForming && this.target) {
            // 2. Formation Behavior
            // Ease towards target
            const tx = this.target.x;
            const ty = this.target.y;

            // Spring-like ease to target
            // Distance to target
            const dtx = tx - this.x;
            const dty = ty - this.y;

            // Move 2% of the way there per frame (easing)
            this.x += dtx * 0.02;
            this.y += dty * 0.02;

            // If very close, snap or just stop?
            // "gently breathes" - lets add a tiny sine wave breathing if close
            if (Math.abs(dtx) < 1 && Math.abs(dty) < 1) {
                // Breathing
                const time = Date.now() * 0.001;
                this.x += Math.sin(time + this.y * 0.01) * 0.05;
                this.y += Math.cos(time + this.x * 0.01) * 0.05;
            }

            // Dampen velocity heavily in formation mode
            this.vx *= 0.8;
            this.vy *= 0.8;

            // Opacity Shift: "Opacity of formation should not exceed 40%"
            // Fade towards formation opacity
            this.alpha += (this.config.formationOpacity - this.alpha) * 0.02;

        } else {
            // 3. Ambient Drift
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around screen
            if (this.x < 0) this.x = w;
            if (this.x > w) this.x = 0;
            if (this.y < 0) this.y = h;
            if (this.y > h) this.y = 0;

            // Randomly very subtle velocity changes for organic feel
            if (Math.random() < 0.005) {
                this.vx += (Math.random() - 0.5) * 0.05;
                this.vy += (Math.random() - 0.5) * 0.05;
            }

            // Friction/Speed Limit
            const maxSpeed = 0.4;
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }

            // Restore alpha to random base
            this.alpha += (this.baseAlpha - this.alpha) * 0.01;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        // "Slightly blurred" - ctx.shadowBlur is expensive, maybe just use low alpha arc
        // Or can use a softly graded radial gradient for each particle if count is low (400 is fine)
        // But for 60fps, simple arc with low alpha is safest.

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.config.color.r}, ${this.config.color.g}, ${this.config.color.b}, ${this.alpha})`;
        ctx.fill();
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AmbientField());
} else {
    new AmbientField();
}
