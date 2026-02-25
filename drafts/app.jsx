import React, { useEffect, useRef, useState } from 'react';

/**
 * 3D 粒子甜甜圈配置
 */
const DONUT_CONFIG = {
  particleCount: 2500,
  radius: 150,
  thickness: 60,
  rotationSpeed: 0.005,
  interactionRadius: 100,
  ease: 0.05,
};

const PortfolioApp = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.ref;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 初始化 3D 粒子坐标
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < DONUT_CONFIG.particleCount; i++) {
        // 使用两个角度参数构建环面坐标
        const theta = Math.random() * Math.PI * 2; // 环绕大圆的角度
        const phi = Math.random() * Math.PI * 2;   // 环绕小圆的角度
        
        // 初始 3D 位置
        const x = (DONUT_CONFIG.radius + DONUT_CONFIG.thickness * Math.cos(phi)) * Math.cos(theta);
        const y = (DONUT_CONFIG.radius + DONUT_CONFIG.thickness * Math.cos(phi)) * Math.sin(theta);
        const z = DONUT_CONFIG.thickness * Math.sin(phi);

        particles.push({
          x, y, z,
          ox: x, oy: y, oz: z, // 原始坐标
          vx: 0, vy: 0, vz: 0, // 加速度
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const rotate = (p, angleX, angleY) => {
      // Y轴旋转
      let radY = angleY;
      let cosY = Math.cos(radY);
      let sinY = Math.sin(radY);
      let z1 = p.z * cosY - p.x * sinY;
      let x1 = p.z * sinY + p.x * cosY;

      // X轴旋转
      let radX = angleX;
      let cosX = Math.cos(radX);
      let sinX = Math.sin(radX);
      let y2 = p.y * cosX - z1 * sinX;
      let z2 = p.y * sinX + z1 * cosX;

      p.x = x1;
      p.y = y2;
      p.z = z2;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 这里的 1000 是投影焦距 (Perspective)
      const fov = 1000; 
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 排序以处理遮挡关系 (简单深度测试)
      particles.sort((a, b) => b.z - a.z);

      particles.forEach(p => {
        // 自转
        rotate(p, DONUT_CONFIG.rotationSpeed, DONUT_CONFIG.rotationSpeed * 0.5);

        // 交互逻辑：物理吸附与复原
        const dx = (p.x + centerX) - mouse.current.x;
        const dy = (p.y + centerY) - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < DONUT_CONFIG.interactionRadius) {
          const force = (DONUT_CONFIG.interactionRadius - dist) / DONUT_CONFIG.interactionRadius;
          p.vx += dx * force * 0.1;
          p.vy += dy * force * 0.1;
        }

        // 弹性恢复到原始轨道
        p.vx *= 0.9; 
        p.vy *= 0.9;
        
        // 投影 3D 到 2D
        const scale = fov / (fov + p.z);
        const x2d = p.x * scale + centerX + p.vx;
        const y2d = p.y * scale + centerY + p.vy;

        // 根据 Z 轴深度计算透明度和颜色
        const alpha = Math.max(0.1, (p.z + DONUT_CONFIG.thickness) / (DONUT_CONFIG.thickness * 2));
        ctx.fillStyle = `rgba(218, 32, 90, ${alpha})`; // 洋红色 #DA205A
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', () => setScrollY(window.scrollY));
    
    resize();
    initParticles();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div 
      className="min-h-[200vh] bg-[#050505] text-white selection:bg-[#DA205A] overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 顶部/底部光晕 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-20 pointer-events-none"
           style={{ background: 'conic-gradient(from 180deg at 50% 0%, #DA205A, transparent)', filter: 'blur(80px)' }} />
      
      {/* 核心 Hero 区域 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas 3D 甜甜圈 */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{ 
            opacity: Math.max(0.2, 1 - scrollY / 500),
            touchAction: 'none'
          }}
        />

        {/* 文案内容 */}
        <div className="z-10 text-center px-4 pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 mix-blend-difference font-sans">
            PORTFOLIO FOR <span className="text-[#DA205A]">ZIRONG</span>
          </h1>
          
          <div className="inline-block bg-[#DA205A]/10 backdrop-blur-md border border-[#DA205A]/20 px-6 py-2 rounded-full overflow-hidden">
            <p className="font-mono text-sm md:text-base tracking-widest text-[#DA205A] animate-pulse">
              &gt; EXECUTING_SYSTEM_DESIGN_2026_
            </p>
          </div>
        </div>

        {/* 鼠标位置光感 (微弱内发光效果) */}
        <div 
          className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 400px at ${mouse.current.x}px ${mouse.current.y}px, rgba(218, 32, 90, 0.05), transparent)`
          }}
        />
      </section>

      {/* 演示用内容块 */}
      <section className="relative z-10 p-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all hover:border-[#DA205A]/50">
            <div className="absolute inset-0 bg-[#DA205A]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <h3 className="font-mono text-[#DA205A] mb-2 text-sm">// PROJECT_0{i}</h3>
            <h2 className="text-2xl font-bold mb-4">ALGORITHMIC VISUALIZATION</h2>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Exploration of 3D projection algorithms and physics-based particle interaction without external libraries.
            </p>
          </div>
        ))}
      </section>

      {/* 底部装饰 */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DA205A] to-transparent opacity-50" />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&family=JetBrains+Mono:wght@400&display=swap');
        
        body {
          margin: 0;
          background: #050505;
          cursor: crosshair;
        }

        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #DA205A; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PortfolioApp;