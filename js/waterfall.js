/* =========================================
   THREE.JS PARTICLE WATERFALL
   - Vertical fall top-to-bottom
   - Subtle horizontal drift
   - Low opacity (<6%)
   - Muted purple/blue tones
   - Mouse repulsion (120px radius)
   ========================================= */

const CONTAINER = document.getElementById("pixel-canvas");

class ParticleWaterfall {
    constructor() {
        this.canvas = document.getElementById("pixel-canvas");
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.initThree();
        this.initParticles();
        this.addEvents();
        this.animate();
    }

    initThree() {
        this.scene = new THREE.Scene();

        // Orthographic camera covering full screen
        this.camera = new THREE.OrthographicCamera(
            this.width / -2, this.width / 2,
            this.height / 2, this.height / -2,
            1, 1000
        );
        this.camera.position.z = 10;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    initParticles() {
        const count = 4000; // Particle count
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Initial positions spread across screen + buffer
            positions[i * 3] = (Math.random() - 0.5) * this.width;
            positions[i * 3 + 1] = (Math.random() - 0.5) * this.height;
            positions[i * 3 + 2] = 0;

            // Random attributes for variation
            randoms[i * 3] = Math.random();     // Speed variance
            randoms[i * 3 + 1] = Math.random(); // Opacity variance
            randoms[i * 3 + 2] = Math.random(); // Drift offset
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

        // Shader Material
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(-9999, -9999) }, // Init off-screen
                uResolution: { value: new THREE.Vector2(this.width, this.height) },
                uHeight: { value: this.height }
            },
            vertexShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                uniform vec2 uResolution;
                uniform float uHeight;
                
                attribute vec3 aRandom;
                
                varying float vAlpha;
                varying vec3 vColor;

                void main() {
                    vec3 pos = position;
                    
                    // FALLING MOTION
                    float speed = 15.0 + aRandom.x * 25.0; // Random speed 15-40px/sec
                    float fallOffset = uTime * speed;
                    
                    // Wrap around height
                    // Initial pos.y is -H/2 to H/2. 
                    // We want it to fall (y decreases).
                    float totalH = uHeight + 100.0; // Buffer
                    
                    // Calculate falling position with wrap
                    pos.y = mod(pos.y - fallOffset + totalH * 0.5, totalH) - totalH * 0.5;

                    // HORIZONTAL DRIFT
                    // Sine wave based on time and random offset
                    float drift = sin(uTime * 0.5 + aRandom.z * 10.0) * (20.0 + aRandom.x * 10.0);
                    pos.x += drift;
                    
                    // MOUSE REPULSION
                    // Calculate distance to mouse in world space (z=0 plain)
                    float dist = distance(uMouse, pos.xy);
                    float radius = 120.0;
                    
                    if (dist < radius) {
                        float force = (radius - dist) / radius; // 1.0 at center, 0.0 at edge
                        // Smooth falloff
                        force = force * force; 
                        
                        vec2 dir = normalize(pos.xy - uMouse);
                        pos.xy += dir * force * 50.0; // Push away up to 50px
                    }

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = (2.0 + aRandom.x * 2.5); // Size 2.0 - 4.5

                    // Opacity & Color
                    vAlpha = 0.35 + aRandom.y * 0.15; // Increased to 35-50% for high visibility
                    
                    // Very Dark Navy/Black for Light Mode
                    // R: 0.1, G: 0.1, B: 0.2
                    vColor = vec3(0.05 + aRandom.z * 0.05, 0.05 + aRandom.z * 0.05, 0.15 + aRandom.x * 0.1);
                }
            `,
            fragmentShader: `
                varying float vAlpha;
                varying vec3 vColor;

                void main() {
                    // Soft circle
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    float d = length(coord);
                    if(d > 0.5) discard;
                    
                    // Soft edge to make it look like a droplet/light
                    float alpha = vAlpha * (1.0 - smoothstep(0.3, 0.5, d));
                    
                    gl_FragColor = vec4(vColor, alpha);
                }
            `
        });

        this.points = new THREE.Points(geometry, this.material);
        this.scene.add(this.points);
    }

    addEvents() {
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.left = this.width / -2;
        this.camera.right = this.width / 2;
        this.camera.top = this.height / 2;
        this.camera.bottom = this.height / -2;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);
        this.material.uniforms.uResolution.value.set(this.width, this.height);
        this.material.uniforms.uHeight.value = this.height;
    }

    onMouseMove(e) {
        // Center (0,0) is screen center
        this.material.uniforms.uMouse.value.x = e.clientX - this.width / 2;
        this.material.uniforms.uMouse.value.y = -(e.clientY - this.height / 2); // Invert Y
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = performance.now() * 0.001;
        this.material.uniforms.uTime.value = time;

        this.renderer.render(this.scene, this.camera);
    }
}

// Init when DOM ready
document.addEventListener("DOMContentLoaded", () => {
    // Check if flow field was running/loaded and clean up if needed
    // (Simple way: just overwrite the canvas ownership)
    setTimeout(() => {
        new ParticleWaterfall();
    }, 100);
});
