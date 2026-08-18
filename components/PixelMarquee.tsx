'use client'

import { useRef, useCallback } from 'react'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import { useReducedMotion } from 'framer-motion'

class MarqueePixel {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  totalWidth: number

  constructor(x: number, y: number, color: string, totalWidth: number) {
    this.ox = x
    this.oy = y
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.color = color
    this.totalWidth = totalWidth
  }

  update(mouseX: number, mouseY: number, speed: number) {
    // 1. Move the origin to the left to create the marquee effect
    this.ox -= speed
    // 2. Wrap around if it goes off screen
    if (this.ox < -50) {
      this.ox += this.totalWidth
      this.x += this.totalWidth // Immediately move physical position too
    }

    // Pointer repulsion
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist < 80) {
      const force = (80 - dist) / 80
      this.vx -= (dx / dist) * force * 12
      this.vy -= (dy / dist) * force * 12
    }

    // Spring physics tracking the moving origin (ox)
    const spring = 0.08
    const friction = 0.85
    this.vx += (this.ox - this.x) * spring
    this.vy += (this.oy - this.y) * spring
    this.vx *= friction
    this.vy *= friction

    this.x += this.vx
    this.y += this.vy
  }
}

const COLORS = ['#1F3A5F', '#4D7298', '#9FB4D1', '#B1CDE0', '#000000']

export default function PixelMarquee() {
  const prefersReducedMotion = useReducedMotion()
  const pixelsRef = useRef<MarqueePixel[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })

  const onInit = useCallback((width: number, height: number) => {
    const pixels: MarqueePixel[] = []
    
    const off = document.createElement('canvas')
    const ctx = off.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    
    const gridRes = 5 // pixel block size
    const th = Math.floor(height / gridRes)
    
    // We want the text to be a single long line.
    const textString = "GOOGLE CREATIVE LAB • MIT MEDIA LAB • AVANADE • ACCENTURE • MICROSOFT • TEAMLAB • "
    
    ctx.font = 'bold 20px "Inter", sans-serif'
    const textWidth = ctx.measureText(textString).width
    
    // Create an offscreen canvas wide enough to hold the entire string
    const tw = Math.ceil(textWidth)
    off.width = tw
    off.height = th
    
    // Reset font after resizing canvas
    ctx.font = 'bold 20px "Inter", sans-serif'
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'middle'
    ctx.fillText(textString, 0, th / 2)
    
    const data = ctx.getImageData(0, 0, tw, th).data
    
    // The total width in the actual rendered canvas coordinates
    const totalPhysicalWidth = tw * gridRes

    for (let y = 0; y < th; y++) {
      for (let x = 0; x < tw; x++) {
        const alpha = data[(y * tw + x) * 4 + 3]
        if (alpha > 128) {
          // If we don't have enough pixels to fill the screen width, duplicate it once
          const color = COLORS[Math.floor(Math.random() * COLORS.length)]
          
          // First copy
          pixels.push(new MarqueePixel(x * gridRes, y * gridRes, color, totalPhysicalWidth))
          
          // If the text string is shorter than screen width, we'd need to tile it.
          // But our textString is long enough to span most screens. Just to be safe, tile it once.
          pixels.push(new MarqueePixel(x * gridRes + totalPhysicalWidth, y * gridRes, color, totalPhysicalWidth * 2))
        }
      }
    }
    
    pixelsRef.current = pixels
  }, [])

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    
    const { x: mx, y: my } = mouseRef.current
    const size = 4 
    
    // Calculate speed based on hover. Slow down slightly when mouse is near.
    let speed = 1.5
    if (mx > 0 && mx < width && my > 0 && my < height) {
      speed = 0.5 // Slows down when interacting
    }
    
    pixelsRef.current.forEach(p => {
      if (!prefersReducedMotion) {
        p.update(mx, my, speed)
      } else {
        p.ox -= speed
        if (p.ox < -50) p.ox += p.totalWidth
        p.x = p.ox
        p.y = p.oy
      }
      
      // Only draw if on screen (performance optimization)
      if (p.x > -20 && p.x < width + 20) {
        ctx.fillStyle = p.color
        ctx.fillRect(Math.round(p.x), Math.round(p.y), size, size)
      }
    })
  }, [prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw, onInit })

  return (
    <section 
      className="relative w-full h-32 bg-[#FAFAFA] border-y border-black/5 overflow-hidden cursor-crosshair group"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: -1000, y: -1000 }
      }}
    >
      <div className="absolute top-2 left-0 w-full text-center pointer-events-none opacity-50 group-hover:opacity-10 transition-opacity duration-700">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Collaborators // Hover to interact
        </p>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </section>
  )
}
