'use client'

import { useRef, useCallback } from 'react'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from 'framer-motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Particle {
  x1: number
  y1: number
  x2: number
  y2: number
  x3: number
  y3: number
  color1: string
  color2: string
  color3: string
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (!canvasContainerRef.current) return

    gsap.to(progressRef, {
      current: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: canvasContainerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      }
    })
  }, { scope: containerRef })

  const onInit = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    const count = 300
    const cellSize = 10

    for (let i = 0; i < count; i++) {
      // State 1: Scattered Blue Particles (Chaotic)
      const x1 = Math.random() * width
      const y1 = Math.random() * height
      
      // State 2: Structured Yellow Path (Flowing to center)
      const x2 = (width * 0.2) + (Math.random() * width * 0.6)
      const y2 = (height / 2) + (Math.sin(x2 * 0.01) * 50) + (Math.random() * 40 - 20)
      
      // State 3: Clear product-like system (Grid on the right)
      const gridX = Math.floor(i / 15)
      const gridY = i % 15
      const x3 = (width * 0.7) + (gridX * cellSize * 2)
      const y3 = (height * 0.2) + (gridY * cellSize * 2)

      particles.push({
        x1, y1, 
        x2, y2, 
        x3, y3,
        color1: '#B1CDE0', // Sky Blue
        color2: '#9FB4D1', // Periwinkle
        color3: '#F3D0C7'  // Pale Peach
      })
    }
    particlesRef.current = particles
  }, [])

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const progress = prefersReducedMotion ? 1 : progressRef.current
    const cellSize = 10

    particlesRef.current.forEach((p, i) => {
      let x, y, color

      // Calculate wobble
      const wobbleX = Math.sin(time * 2 + i) * 5 * (1 - progress) // Less wobble as it gets structured
      const wobbleY = Math.cos(time * 2 + i) * 5 * (1 - progress)

      if (progress < 0.5) {
        // Interpolate between State 1 and State 2
        const p1 = progress * 2 // 0 to 1
        // Easing function
        const ease = 1 - Math.pow(1 - p1, 3)
        x = p.x1 + (p.x2 - p.x1) * ease
        y = p.y1 + (p.y2 - p.y1) * ease
        color = p1 < 0.5 ? p.color1 : p.color2
      } else {
        // Interpolate between State 2 and State 3
        const p2 = (progress - 0.5) * 2 // 0 to 1
        const ease = 1 - Math.pow(1 - p2, 3)
        x = p.x2 + (p.x3 - p.x2) * ease
        y = p.y2 + (p.y3 - p.y2) * ease
        color = p2 < 0.5 ? p.color2 : p.color3
      }

      // Snap to grid
      const snappedX = Math.round((x + wobbleX) / cellSize) * cellSize
      const snappedY = Math.round((y + wobbleY) / cellSize) * cellSize

      ctx.fillStyle = color
      ctx.fillRect(snappedX, snappedY, cellSize - 1, cellSize - 1)
    })
  }, [prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw, onInit })

  return (
    <section ref={containerRef} className="py-32 bg-white border-b border-black/10">
      
      {/* Headline */}
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-neutral-900 uppercase">
          Research.
          <br />
          Prototype.
          <br />
          Build.
          <br />
          Iterate.
        </h2>
      </div>

      {/* Canvas Visualization */}
      <div ref={canvasContainerRef} className="w-full h-[40vh] border-y border-black/10 relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>

      {/* 4 Columns */}
      <div className="px-6 md:px-12 lg:px-24 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">01 Research</span>
            <p className="text-base text-neutral-700 font-medium leading-relaxed">
              Find the actual user and product problem.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">02 Prototype</span>
            <p className="text-base text-neutral-700 font-medium leading-relaxed">
              Test behavior before polishing screens.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">03 Build</span>
            <p className="text-base text-neutral-700 font-medium leading-relaxed">
              Turn design decisions into reusable code.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">04 Iterate</span>
            <p className="text-base text-neutral-700 font-medium leading-relaxed">
              Measure, refine and ship continuously.
            </p>
          </div>

        </div>
      </div>

    </section>
  )
}
