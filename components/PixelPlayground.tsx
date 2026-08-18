'use client'

import { useRef, useCallback } from 'react'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import { useReducedMotion } from 'framer-motion'

class TextPixel {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  color: string

  constructor(x: number, y: number, color: string) {
    this.ox = x
    this.oy = y
    // Start pixels scattered around for a cool assembly animation
    this.x = x + (Math.random() - 0.5) * 1000
    this.y = y + (Math.random() - 0.5) * 1000
    this.vx = 0
    this.vy = 0
    this.color = color
  }

  update(mouseX: number, mouseY: number) {
    // Pointer repulsion
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist < 120) {
      const force = (120 - dist) / 120
      this.vx -= (dx / dist) * force * 15
      this.vy -= (dy / dist) * force * 15
    }

    // Spring physics - slightly tighter spring than footer for crisp text reading
    const spring = 0.06
    const friction = 0.82
    this.vx += (this.ox - this.x) * spring
    this.vy += (this.oy - this.y) * spring
    this.vx *= friction
    this.vy *= friction

    this.x += this.vx
    this.y += this.vy
  }
}

const COLORS = ['#1F3A5F', '#4D7298', '#9FB4D1', '#B1CDE0', '#F3D0C7', '#000000']

export default function PixelPlayground() {
  const prefersReducedMotion = useReducedMotion()
  const pixelsRef = useRef<TextPixel[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })

  const onInit = useCallback((width: number, height: number) => {
    const pixels: TextPixel[] = []
    
    const off = document.createElement('canvas')
    const ctx = off.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    
    // Grid resolution - smaller means more detailed text but heavier performance
    const gridRes = 5 
    const tw = Math.floor(width / gridRes)
    const th = Math.floor(height / gridRes)
    off.width = tw
    off.height = th
    
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Dynamic font size based on screen width
    let fontSize = Math.max(8, Math.min(tw / 22, 16))
    ctx.font = `bold ${fontSize}px "Inter", sans-serif`
    
    // Text to render
    const lines = [
      "REACT • TYPESCRIPT • THREE.JS",
      "SWIFTUI • FRAMER MOTION • MEDIAPIPE",
      "",
      "GOOGLE CREATIVE LAB • MIT MEDIA LAB",
      "AVANADE • ACCENTURE • MICROSOFT"
    ]
    
    const lineSpacing = fontSize * 1.8
    const startY = (th - (lines.length * lineSpacing)) / 2 + (fontSize / 2)
    
    lines.forEach((line, i) => {
      if (line) {
         ctx.fillText(line, tw / 2, startY + i * lineSpacing)
      }
    })
    
    const data = ctx.getImageData(0, 0, tw, th).data
    
    for (let y = 0; y < th; y++) {
      for (let x = 0; x < tw; x++) {
        const alpha = data[(y * tw + x) * 4 + 3]
        if (alpha > 128) {
          const color = COLORS[Math.floor(Math.random() * COLORS.length)]
          pixels.push(new TextPixel(x * gridRes, y * gridRes, color))
        }
      }
    }
    
    pixelsRef.current = pixels
  }, [])

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    
    const { x: mx, y: my } = mouseRef.current
    const size = 4 // actual drawn square size (slightly smaller than gridRes for gaps)
    
    pixelsRef.current.forEach(p => {
      if (!prefersReducedMotion) {
        p.update(mx, my)
      } else {
        p.x = p.ox
        p.y = p.oy
      }
      ctx.fillStyle = p.color
      ctx.fillRect(Math.round(p.x), Math.round(p.y), size, size)
    })
  }, [prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw, onInit })

  return (
    <section 
      className="relative w-full h-[60vh] min-h-[400px] bg-[#FAFAFA] border-y border-black/10 overflow-hidden cursor-crosshair group"
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
      <div className="absolute top-12 left-0 w-full text-center pointer-events-none opacity-50 group-hover:opacity-10 transition-opacity duration-700">
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
          Tech Stack & Collaborators // Hover to shatter
        </p>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </section>
  )
}
