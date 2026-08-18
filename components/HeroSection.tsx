'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import MagneticButton from './MagneticButton'
import { Silkscreen } from 'next/font/google'

const pixelFont = Silkscreen({ weight: '400', subsets: ['latin'] })

const COLORS = [
  '#1F3A5F', // Dark Navy
  '#4D7298', // Steel Blue
  '#9FB4D1', // Periwinkle
  '#B1CDE0', // Sky Blue
  '#F3D0C7', // Pale Peach
]

function getClosestBrandColor(r: number, g: number, b: number) {
  // Convert COLORS hex to rgb
  const brandRGBs = [
    {r: 31, g: 58, b: 95},   // #1F3A5F
    {r: 77, g: 114, b: 152}, // #4D7298
    {r: 159, g: 180, b: 209},// #9FB4D1
    {r: 177, g: 205, b: 224},// #B1CDE0
    {r: 243, g: 208, b: 199},// #F3D0C7
  ]
  let minDist = Infinity;
  let closest = COLORS[0];
  for (let i = 0; i < brandRGBs.length; i++) {
    const br = brandRGBs[i];
    const dist = (r - br.r)**2 + (g - br.g)**2 + (b - br.b)**2;
    if (dist < minDist) {
      minDist = dist;
      closest = COLORS[i];
    }
  }
  return closest;
}

// Simple noise function for generating landscape
function pseudoNoise(x: number, y: number) {
  return Math.sin(x * 0.1) * Math.cos(y * 0.1) + Math.sin(x * 0.05 + y * 0.05)
}

class Pixel {
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

  update(mouseX: number, mouseY: number, brushRadius: number, shockwaveRadius: number, shockwaveX: number, shockwaveY: number) {
    // Repulsion from mouse
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    if (dist < brushRadius) {
      const force = (brushRadius - dist) / brushRadius
      this.vx -= (dx / dist) * force * 5
      this.vy -= (dy / dist) * force * 5
    }

    // Repulsion from shockwave
    if (shockwaveRadius > 0) {
      const sdx = shockwaveX - this.x
      const sdy = shockwaveY - this.y
      const sdist = Math.sqrt(sdx * sdx + sdy * sdy)
      // If near the shockwave ring
      const ringWidth = 30
      if (Math.abs(sdist - shockwaveRadius) < ringWidth) {
        const force = (ringWidth - Math.abs(sdist - shockwaveRadius)) / ringWidth
        this.vx -= (sdx / sdist) * force * 15
        this.vy -= (sdy / sdist) * force * 15
      }
    }

    // Spring return to original position
    const spring = 0.1
    const friction = 0.8
    this.vx += (this.ox - this.x) * spring
    this.vy += (this.oy - this.y) * spring
    this.vx *= friction
    this.vy *= friction

    this.x += this.vx
    this.y += this.vy
  }
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [cellSize, setCellSize] = useState<'S' | 'M' | 'L'>('M')
  const [brushSize, setBrushSize] = useState<'S' | 'M' | 'L'>('M')
  
  const pixelsRef = useRef<Pixel[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const shockwaveRef = useRef({ x: -1000, y: -1000, radius: 0, active: false })
  
  const [mirrorMode, setMirrorMode] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Initialize video and offscreen canvas
  useEffect(() => {
    if (!videoRef.current) {
      const vid = document.createElement('video')
      vid.autoplay = true
      vid.playsInline = true
      vid.muted = true
      videoRef.current = vid
    }
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas')
    }
  }, [])

  // Mapping sizes
  const sizeMap = { S: 10, M: 20, L: 40 }
  const brushMap = { S: 80, M: 150, L: 250 }

  const currentCellSize = sizeMap[cellSize]
  const currentBrushRadius = brushMap[brushSize]

  const initPixels = useCallback((width: number, height: number, isMirror: boolean) => {
    const pixels: Pixel[] = []
    const cols = Math.floor(width / currentCellSize)
    const rows = Math.floor(height / currentCellSize)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (isMirror) {
          pixels.push(new Pixel(i * currentCellSize, j * currentCellSize, COLORS[0]))
        } else {
          // Landscape logic: only fill some areas based on noise
          const n = pseudoNoise(i, j)
          if (n > -0.5) {
            let color = COLORS[0]
            if (n > 1.2) color = COLORS[4] // Lime
            else if (n > 0.8) color = COLORS[3] // Yellow
            else if (n > 0.4) color = COLORS[2] // Orange
            else if (n > 0.0) color = COLORS[1] // Blue
            
            pixels.push(new Pixel(i * currentCellSize, j * currentCellSize, color))
          }
        }
      }
    }
    pixelsRef.current = pixels
  }, [currentCellSize])

  const onInit = useCallback((width: number, height: number) => {
    initPixels(width, height, mirrorMode)
  }, [initPixels, mirrorMode])

  // Re-init when cell size or mirror mode changes
  useEffect(() => {
    const canvas = document.getElementById('hero-canvas')
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      initPixels(rect.width, rect.height, mirrorMode)
    }
  }, [cellSize, mirrorMode, initPixels])

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

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    shockwaveRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 10,
      active: true
    }
  }

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (prefersReducedMotion) return

    // Update shockwave
    if (shockwaveRef.current.active) {
      shockwaveRef.current.radius += 20
      if (shockwaveRef.current.radius > width) {
        shockwaveRef.current.active = false
      }
    }

    // Process Video Frame if Mirror Mode is ON
    if (mirrorMode && videoRef.current && offscreenCanvasRef.current && videoRef.current.readyState >= 2) {
      const cols = Math.floor(width / currentCellSize)
      const rows = Math.floor(height / currentCellSize)
      
      offscreenCanvasRef.current.width = cols
      offscreenCanvasRef.current.height = rows
      
      const ctxOff = offscreenCanvasRef.current.getContext('2d', { willReadFrequently: true })
      if (ctxOff) {
        ctxOff.save()
        // Mirror the video horizontally for natural interaction
        ctxOff.translate(cols, 0)
        ctxOff.scale(-1, 1)
        // Draw standard webcam aspect ratio, filling the area
        // Simple scale to fit, ignoring aspect ratio for abstract pixel effect
        ctxOff.drawImage(videoRef.current, 0, 0, cols, rows)
        ctxOff.restore()
        
        const imageData = ctxOff.getImageData(0, 0, cols, rows).data
        
        pixelsRef.current.forEach(p => {
          const cx = Math.floor(p.ox / currentCellSize)
          const cy = Math.floor(p.oy / currentCellSize)
          
          if (cx >= 0 && cx < cols && cy >= 0 && cy < rows) {
            const i = (cy * cols + cx) * 4
            p.color = getClosestBrandColor(imageData[i], imageData[i+1], imageData[i+2])
          }
        })
      }
    }

    const { x: mx, y: my } = mouseRef.current
    const { x: sx, y: sy, radius: sr, active } = shockwaveRef.current

    pixelsRef.current.forEach(p => {
      p.update(mx, my, currentBrushRadius, active ? sr : 0, sx, sy)
      
      // Snap to grid for rendering
      const snappedX = Math.round(p.x / currentCellSize) * currentCellSize
      const snappedY = Math.round(p.y / currentCellSize) * currentCellSize
      
      ctx.fillStyle = p.color
      ctx.fillRect(snappedX, snappedY, currentCellSize - 1, currentCellSize - 1)
    })
  }, [currentBrushRadius, currentCellSize, mirrorMode, prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw, onInit })

  const toggleMirror = async () => {
    if (mirrorMode) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
      setMirrorMode(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
        setMirrorMode(true)
      } catch (err) {
        console.error("Camera access denied", err)
        alert("Camera access is required for Mirror Mode.")
      }
    }
  }

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 flex flex-col border-b border-black/10">
      
      {/* Editorial Split Header */}
      <div className="px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-start gap-12 z-10 mb-12">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] uppercase text-neutral-900">
            MICHELLE
            <br />
            GUAN
          </h1>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight uppercase text-neutral-900 md:text-right max-w-lg">
            A <span className={`${pixelFont.className} tracking-widest text-[#4D7298]`}>DESIGN ENGINEER</span>
            <br />
            FOR AI PRODUCTS,
            <br />
            INTERACTIVE SYSTEMS
            <br />
            & PRODUCTION UI.
          </h2>
          <p className="mt-8 text-base md:text-lg text-neutral-600 max-w-sm md:text-right font-medium">
            I turn ambiguous product ideas into polished,
            production-ready interfaces through design,
            code and experimentation.
          </p>
        </div>
      </div>

      {/* Canvas Container & Controls */}
      <div className="relative flex-grow w-full border-t border-black/10 flex flex-col">
        {/* Controls Bar */}
        <div className="flex items-center justify-between px-6 md:px-12 py-3 border-b border-black/10 bg-[#FAFAFA]/80 backdrop-blur-sm z-10 text-xs font-bold uppercase tracking-widest text-neutral-500">
          <div className="flex items-center gap-6">
            <span className="text-black">CELL</span>
            {(['S', 'M', 'L'] as const).map(size => (
              <MagneticButton 
                key={size}
                onClick={() => setCellSize(size)}
                className={`transition-colors px-2 py-1 ${cellSize === size ? 'text-black border-b border-black' : 'hover:text-neutral-700'}`}
              >
                {size}
              </MagneticButton>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className="text-black">BRUSH</span>
            {(['S', 'M', 'L'] as const).map(size => (
              <MagneticButton 
                key={size}
                onClick={() => setBrushSize(size)}
                className={`transition-colors px-2 py-1 ${brushSize === size ? 'text-black border-b border-black' : 'hover:text-neutral-700'}`}
              >
                {size}
              </MagneticButton>
            ))}
          </div>
          
          <div className="flex items-center gap-6 ml-auto border-l border-black/10 pl-6">
            <MagneticButton 
              onClick={toggleMirror}
              className={`transition-colors px-4 py-2 font-bold flex items-center gap-2 ${mirrorMode ? 'bg-black text-white hover:bg-neutral-800' : 'bg-neutral-200 text-black hover:bg-neutral-300'}`}
            >
              <div className={`w-2 h-2 rounded-full ${mirrorMode ? 'bg-red-500 animate-pulse' : 'bg-neutral-400'}`} />
              {mirrorMode ? 'MIRROR: ON' : 'MIRROR: OFF'}
            </MagneticButton>
          </div>
        </div>

        {/* Interactive Canvas */}
        <div 
          className="relative w-full flex-grow overflow-hidden bg-transparent cursor-crosshair touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
        >
          {!prefersReducedMotion ? (
            <canvas 
              id="hero-canvas"
              ref={canvasRef} 
              className="absolute inset-0 block"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">
              Interactive pixel landscape disabled (Reduced Motion)
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
