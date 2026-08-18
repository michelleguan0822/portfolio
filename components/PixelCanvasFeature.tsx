'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import MagneticButton from './MagneticButton'

const COLORS = [
  '#1F3A5F', // Dark Navy
  '#4D7298', // Steel Blue
  '#9FB4D1', // Periwinkle
  '#B1CDE0', // Sky Blue
  '#F3D0C7', // Pale Peach
]

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

interface PixelCanvasFeatureProps {
  id?: string;
  className?: string;
  showControls?: boolean;
  initialCellSize?: 'S' | 'M' | 'L';
  initialBrushSize?: 'S' | 'M' | 'L';
}

export default function PixelCanvasFeature({ 
  id = 'pixel-canvas', 
  className = '', 
  showControls = false,
  initialCellSize = 'M',
  initialBrushSize = 'M'
}: PixelCanvasFeatureProps) {
  const prefersReducedMotion = useReducedMotion()
  const [cellSize, setCellSize] = useState<'S' | 'M' | 'L'>(initialCellSize)
  const [brushSize, setBrushSize] = useState<'S' | 'M' | 'L'>(initialBrushSize)
  
  const pixelsRef = useRef<Pixel[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const shockwaveRef = useRef({ x: -1000, y: -1000, radius: 0, active: false })

  // Mapping sizes
  const sizeMap = { S: 10, M: 20, L: 40 }
  const brushMap = { S: 80, M: 150, L: 250 }

  const currentCellSize = sizeMap[cellSize]
  const currentBrushRadius = brushMap[brushSize]

  const initPixels = useCallback((width: number, height: number) => {
    const pixels: Pixel[] = []
    const cols = Math.floor(width / currentCellSize)
    const rows = Math.floor(height / currentCellSize)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Landscape logic: only fill some areas based on noise
        const n = pseudoNoise(i, j)
        if (n > -0.5) {
          // Determine color based on noise value
          let color = COLORS[0]
          if (n > 1.2) color = COLORS[4] // Lime
          else if (n > 0.8) color = COLORS[3] // Yellow
          else if (n > 0.4) color = COLORS[2] // Orange
          else if (n > 0.0) color = COLORS[1] // Blue
          
          pixels.push(new Pixel(i * currentCellSize, j * currentCellSize, color))
        }
      }
    }
    pixelsRef.current = pixels
  }, [currentCellSize])

  const onInit = useCallback((width: number, height: number) => {
    initPixels(width, height)
  }, [initPixels])

  // Re-init when cell size changes
  useEffect(() => {
    const canvas = document.getElementById(id)
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      initPixels(rect.width, rect.height)
    }
  }, [cellSize, initPixels, id])

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
  }, [currentBrushRadius, currentCellSize, prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw, onInit })

  if (!showControls) {
    return (
      <div 
        className={`absolute inset-0 overflow-hidden bg-transparent cursor-crosshair touch-none -z-10 ${className}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        {!prefersReducedMotion ? (
          <canvas 
            id={id}
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full block"
          />
        ) : null}
      </div>
    )
  }

  return (
    <div className={`relative flex flex-col w-full min-h-[500px] border border-black/10 bg-white ${className}`}>
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
      </div>

      {/* Interactive Canvas */}
      <div 
        className="relative w-full flex-grow overflow-hidden bg-transparent cursor-crosshair touch-none min-h-[450px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        {!prefersReducedMotion ? (
          <canvas 
            id={id}
            ref={canvasRef} 
            className="absolute inset-0 block w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">
            Interactive pixel landscape disabled (Reduced Motion)
          </div>
        )}
      </div>
    </div>
  )
}
