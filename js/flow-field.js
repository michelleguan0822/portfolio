/* =========================================
   THREE.JS FLOW FIELD
   - Subtle noise-based flow
   - Low opacity (<6%)
   - Muted purple/blue tones
   - Convergence on Reader activation
   ========================================= */

const CONTAINER = document.getElementById("pixel-canvas"); // Reuse existing canvas container if possible, or we might need to create a new one.
// Actually, pixel-canvas is a <canvas> element. Three.js Renderer can target it.
// Let's check index.html again. Yes, <canvas id="pixel-canvas"></canvas> exists.

class FlowField {
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

        // Orthographic camera for 2D feel
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
        const count = 3000; // Number of particles
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * this.width;
            positions[i * 3 + 1] = (Math.random() - 0.5) * this.height;
            positions[i * 3 + 2] = 0;

            randoms[i * 3] = Math.random();
            randoms[i * 3 + 1] = Math.random();
            randoms[i * 3 + 2] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

        // Shader Material
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uResolution: { value: new THREE.Vector2(this.width, this.height) },
                uConverge: { value: 0.0 } // 0 = normal flow, 1 = converge to center
            },
            vertexShader: `
                uniform float uTime;
                uniform vec2 uMouse;
                uniform vec2 uResolution;
                uniform float uConverge;
                
                attribute vec3 aRandom;
                
                varying float vAlpha;
                varying vec3 vColor;

                // Simplex Noise (simplified)
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                float snoise(vec3 v) {
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                    // First corner
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 = v - i + dot(i, C.xxx) ;

                    // Other corners
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

                    // Permutations
                    i = mod289(i);
                    vec4 p = permute( permute( permute(
                                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                    // Gradients: 7x7 points over a square, mapped onto an octahedron.
                    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                    float n_ = 0.142857142857; // 1.0/7.0
                    vec3  ns = n_ * D.wyz - D.xzx;

                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);

                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );

                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));

                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);

                    //Normalise gradients
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;

                    // Mix final noise value
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                                dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    vec3 pos = position;
                    
                    // SLOW FLOW
                    float noise = snoise(vec3(pos.x * 0.0015, pos.y * 0.0015, uTime * 0.1));
                    
                    // Mouse interaction (subtle distortion)
                    float dist = distance(uMouse, pos.xy);
                    float influence = smoothstep(300.0, 0.0, dist);
                    pos.x += noise * 20.0 + (uMouse.x - pos.x) * influence * 0.05;
                    pos.y += noise * 20.0 + (uMouse.y - pos.y) * influence * 0.05;

                    // CONVERGENCE (implode to center)
                    // Interpolate between current pos and (0,0) based on uConverge
                    // Use uConverge^2 for ease-in effect
                    float cv = uConverge * uConverge; 
                    pos = mix(pos, vec3(0.0), cv * 0.8); // Pull 80% to center

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = (2.0 + aRandom.x * 2.0) * (1.0 + influence);

                    // Opacity & Color
                    vAlpha = 0.04 + aRandom.y * 0.02; // Max 0.06 (6%)
                    
                    // Muted Purple/Blue
                    // R: 0.5-0.6, G: 0.5-0.6, B: 0.7-0.9
                    vColor = vec3(0.5 + aRandom.z * 0.1, 0.5 + aRandom.z * 0.1, 0.8);
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
                    
                    // Soft edge
                    float alpha = vAlpha * (1.0 - smoothstep(0.4, 0.5, d));
                    
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

        // Expose control for app.js
        window.setFlowFieldState = (active) => {
            // Smoothly transition uConverge
            const target = active ? 1.0 : 0.0;
            const duration = active ? 800 : 1200; // 800ms converge, slower release

            const start = this.material.uniforms.uConverge.value;
            const startTime = performance.now();

            const animateConverge = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1.0);

                // Ease Out Cubic
                const ease = 1 - Math.pow(1 - progress, 3);

                this.material.uniforms.uConverge.value = start + (target - start) * ease;

                if (progress < 1.0) {
                    requestAnimationFrame(animateConverge);
                }
            };
            requestAnimationFrame(animateConverge);
        };
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
    }

    onMouseMove(e) {
        // Center (0,0) is equivalent to screen center in Three.js coord system
        // Mouse needs to be mapped from TL (0,0) to Center-based coords
        this.material.uniforms.uMouse.value.x = e.clientX - this.width / 2;
        this.material.uniforms.uMouse.value.y = -(e.clientY - this.height / 2);
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
    // Small delay to ensure container exists/layout stable
    setTimeout(() => {
        new FlowField();
    }, 100);
});
