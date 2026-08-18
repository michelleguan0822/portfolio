'use client'

import { useState, useRef, useCallback } from 'react'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import { useReducedMotion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { audioEngine } from '../utils/audioEngine'

class LetterPixel {
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
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.color = color
  }

  update(mouseX: number, mouseY: number, forceX: number, forceY: number) {
    // Pointer repulsion
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist < 100) {
      const force = (100 - dist) / 100
      this.vx -= (dx / dist) * force * 10
      this.vy -= (dy / dist) * force * 10
    }

    // Play button automated force
    this.vx += forceX
    this.vy += forceY

    // Spring physics
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

class MusicNoteParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  scale: number
  rotation: number
  vRot: number

  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    // Float upwards and slightly random sideways
    this.vx = (Math.random() - 0.5) * 2
    this.vy = -Math.random() * 2 - 2
    this.life = 1.0
    this.maxLife = Math.random() * 0.5 + 0.8 // 0.8s to 1.3s approx
    this.color = color
    this.scale = Math.random() * 0.5 + 0.5 // 0.5x to 1.0x size
    this.rotation = Math.random() * Math.PI * 2
    this.vRot = (Math.random() - 0.5) * 0.1
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy -= 0.05 // float up faster
    this.vx += (Math.random() - 0.5) * 0.5 // wind sway
    this.rotation += this.vRot
    this.life -= 0.015
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.scale(this.scale, this.scale)
    ctx.globalAlpha = Math.max(0, this.life)
    ctx.fillStyle = this.color

    // Draw a simple 8-bit music note (eighth note)
    // Stem
    ctx.fillRect(2, -8, 2, 10)
    // Note head
    ctx.fillRect(-2, 0, 6, 4)
    // Flag
    ctx.fillRect(4, -8, 4, 2)
    ctx.fillRect(6, -6, 2, 2)

    ctx.restore()
  }
}

class SynthKey {
  ox: number
  oy: number
  x: number
  y: number
  targetY: number
  vy: number
  color: string
  index: number
  width: number
  isHovered: boolean

  constructor(x: number, y: number, width: number, color: string, index: number) {
    this.ox = x
    this.oy = y
    this.x = x
    this.y = y
    this.targetY = y
    this.vy = 0
    this.color = color
    this.index = index
    this.width = width
    this.isHovered = false
  }

  update(mouseX: number, mouseY: number, isMouseActive: boolean, spawnParticle: (x: number, y: number, color: string) => void) {
    const wasHovered = this.isHovered
    
    // Check if mouse is hovering over this key's horizontal space
    if (isMouseActive && mouseX >= this.x && mouseX <= this.x + this.width) {
      this.isHovered = true
      this.targetY = this.oy + 40 // Depress key by 40px
    } else {
      this.isHovered = false
      this.targetY = this.oy // Rest position
    }

    // Play note if newly hovered
    if (this.isHovered && !wasHovered) {
      audioEngine.init()
      audioEngine.playNote(this.index)
      // Spawn 1-2 music notes
      const count = Math.floor(Math.random() * 2) + 1
      for (let i = 0; i < count; i++) {
        spawnParticle(this.x + this.width / 2, this.y, this.color)
      }
    }

    // Spring physics for smooth movement
    const spring = 0.2
    const friction = 0.65
    this.vy += (this.targetY - this.y) * spring
    this.vy *= friction
    this.y += this.vy
  }
}

const COLORS = ['#1F3A5F', '#4D7298', '#9FB4D1', '#B1CDE0', '#F3D0C7']

export default function FooterSection() {
  const prefersReducedMotion = useReducedMotion()
  const pixelsRef = useRef<LetterPixel[]>([])
  const keysRef = useRef<SynthKey[]>([])
  const particlesRef = useRef<MusicNoteParticle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const playActiveRef = useRef(false)
  const playTimeRef = useRef(0)

  const onInit = useCallback((width: number, height: number) => {
    const pixels: LetterPixel[] = []
    
    // 1. Offscreen Canvas for text reading
    const off = document.createElement('canvas')
    const ctx = off.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    
    // Define a resolution for the pixel text grid
    // For performance, we draw small text and scale it up
    const gridRes = 8 // pixel size
    const tw = Math.floor(width / gridRes)
    const th = Math.floor((height * 0.5) / gridRes) // Use top half for text
    off.width = tw
    off.height = th
    
    ctx.fillStyle = 'black'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    
    // Dynamically size font so the longest line fits within the canvas
    const leftPad = Math.floor(Math.max(24, width * 0.04) / gridRes)
    const maxTextWidth = tw - leftPad * 2 // leave padding on both sides
    let fontSize = Math.floor(tw / 8)
    
    // Shrink until the longest line fits horizontally AND both lines fit vertically
    const longestLine = 'SOMETHING MOVE.'
    ctx.font = `bold ${fontSize}px sans-serif`
    while ((ctx.measureText(longestLine).width > maxTextWidth || fontSize * 2.5 > th) && fontSize > 4) {
      fontSize--
      ctx.font = `bold ${fontSize}px sans-serif`
    }
    
    // Calculate Y positions based on actual font size so they never overlap
    const lineSpacing = fontSize * 1.1
    const totalTextHeight = lineSpacing * 2
    // Center the text block vertically in the top half
    const startY = (th - totalTextHeight) / 2 + fontSize * 0.5
    
    ctx.fillText("LET'S MAKE", leftPad, startY)
    ctx.fillText("SOMETHING MOVE.", leftPad, startY + lineSpacing)
    
    const data = ctx.getImageData(0, 0, tw, th).data
    
    // Create physical pixels where text is opaque
    for (let y = 0; y < th; y++) {
      for (let x = 0; x < tw; x++) {
        const alpha = data[(y * tw + x) * 4 + 3]
        if (alpha > 128) {
          const color = COLORS[Math.floor(Math.random() * COLORS.length)]
          // Start them slightly scattered for a cool intro
          pixels.push(new LetterPixel(
            x * gridRes, 
            y * gridRes + height * 0.1, 
            color
          ))
        }
      }
    }
    
    pixelsRef.current = pixels

    // Init Synth Keys
    const keyWidthTotal = 40
    const keyGap = 4
    const keyWidth = keyWidthTotal - keyGap
    const keyCount = Math.floor(width / keyWidthTotal)
    const startX = (width - (keyCount * keyWidthTotal)) / 2 + (keyGap / 2)

    const synthKeys: SynthKey[] = []
    for (let i = 0; i < keyCount; i++) {
      const color = COLORS[i % COLORS.length]
      synthKeys.push(new SynthKey(startX + i * keyWidthTotal, height - 120, keyWidth, color, i))
    }
    keysRef.current = synthKeys
  }, [])

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height)
    
    const { x: mx, y: my } = mouseRef.current
    let autoForceX = 0
    let autoForceY = 0

    // Automated Play Sequence
    if (playActiveRef.current && !prefersReducedMotion) {
      const pTime = time - playTimeRef.current
      // A sweeping force from left to right
      const waveX = (pTime * width) % (width * 1.5)
      
      pixelsRef.current.forEach(p => {
        if (Math.abs(p.x - waveX) < 50) {
          p.vx += 5
          p.vy -= 5
        }
      })

      if (pTime > 2.5) {
        playActiveRef.current = false
      }
    }

    // Draw Letter Pixels
    const size = 8
    pixelsRef.current.forEach(p => {
      if (!prefersReducedMotion) {
        p.update(mx, my, autoForceX, autoForceY)
      }
      
      // Snap to grid
      const snappedX = Math.round(p.x / size) * size
      const snappedY = Math.round(p.y / size) * size
      
      ctx.fillStyle = p.color
      ctx.fillRect(snappedX, snappedY, size - 1, size - 1)
    })

    // Draw Synth Keys (playable keyboard)
    const isMouseActive = mx > 0 && my > height - 180 // Activate keys only when mouse is in the lower region
    
    const spawnParticle = (x: number, y: number, color: string) => {
      particlesRef.current.push(new MusicNoteParticle(x, y, color))
    }

    keysRef.current.forEach(k => {
      if (!prefersReducedMotion) {
        k.update(mx, my, isMouseActive, spawnParticle)
        // Ambient spawning: small chance to spawn a note randomly
        if (Math.random() < 0.005) {
          spawnParticle(k.x + k.width / 2, k.y, k.color)
        }
      }
      ctx.fillStyle = k.color
      ctx.fillRect(k.x, k.y, k.width, height - k.y)
    })

    // Update and draw Particles
    if (!prefersReducedMotion) {
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.update()
        p.draw(ctx)
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1)
        }
      }
    }

  }, [prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw, onInit })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handlePointerLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 }
  }

  const handlePlay = () => {
    playActiveRef.current = true
    playTimeRef.current = performance.now() / 1000
  }

  return (
    <footer className="relative w-full h-screen bg-[#FAFAFA] flex flex-col justify-center overflow-hidden">
      
      {/* Canvas Layer */}
      <div 
        className="absolute inset-0 z-0 touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* UI Controls overlaying the canvas */}
      <div className="relative z-10 flex flex-col items-start gap-8 mt-48 px-6 md:px-12 lg:px-24">
        <a href="mailto:michelleguan321@gmail.com">
          <MagneticButton 
            className="px-8 py-4 bg-neutral-900 text-white font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
            style={{ clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)' }}
          >
            Get In Touch
          </MagneticButton>
        </a>

        <div className="flex items-center gap-8">
          <button 
            onClick={handlePlay}
            data-cursor="text"
            className="link-underline text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            [ Play Animation ]
          </button>
          
          <a 
            href="https://www.linkedin.com/in/michelleguanux/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-cursor="text"
            className="link-underline text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            [ LinkedIn ]
          </a>
        </div>
      </div>
      
    </footer>
  )
}
