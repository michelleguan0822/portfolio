'use client'

import { useRef, useCallback, useEffect } from 'react'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import { useReducedMotion } from 'framer-motion'

class PhysicsParticle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
  size: number
  bounces: number

  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    // Scatter horizontally
    this.vx = (Math.random() - 0.5) * 8
    // Random upward velocity so they pop out before falling
    this.vy = -(Math.random() * 6 + 2)
    this.color = color
    this.life = 1.0
    this.size = Math.random() > 0.85 ? 8 : 4 // 8-bit size variation
    this.bounces = 0
  }

  update(height: number) {
    this.vy += 0.5 // Gravity
    this.x += this.vx
    this.y += this.vy

    // Floor collision (bounce off bottom of screen)
    if (this.y > height - this.size) {
      this.y = height - this.size
      this.vy *= -0.5 // Bounce with energy loss
      this.vx *= 0.8 // Friction on the ground
      this.bounces++
    }

    // Shrink/fade slowly over time, or faster if it has bounced multiple times
    this.life -= this.bounces > 2 ? 0.03 : 0.005
  }
}

// Brand colors
const COLORS = ['#1F3A5F', '#4D7298', '#9FB4D1', '#B1CDE0', '#F3D0C7', '#000000']

export default function PhysicsCursor() {
  const prefersReducedMotion = useReducedMotion()
  const particlesRef = useRef<PhysicsParticle[]>([])
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion) return

    const onMouseMove = (e: MouseEvent) => {
      // Throttle spawn rate to maintain performance
      const now = performance.now()
      if (now - lastSpawnRef.current > 35) { // spawn roughly every 35ms when moving
        // Spawn 1-3 particles per tick
        const count = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < count; i++) {
          const color = COLORS[Math.floor(Math.random() * COLORS.length)]
          particlesRef.current.push(new PhysicsParticle(e.clientX, e.clientY, color))
        }
        lastSpawnRef.current = now
      }
    }
    
    // Use pointermove to also capture touch dragging on tablets if needed
    window.addEventListener('pointermove', onMouseMove)
    return () => window.removeEventListener('pointermove', onMouseMove)
  }, [prefersReducedMotion])

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    
    const particles = particlesRef.current
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.update(height)
      
      if (p.life <= 0) {
        // Remove dead particles
        particles.splice(i, 1)
        continue
      }
      
      ctx.globalAlpha = Math.max(0, p.life)
      ctx.fillStyle = p.color
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size)
    }
    ctx.globalAlpha = 1.0
  }, [])

  const canvasRef = usePixelCanvas({ onDraw })

  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
