'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

class ShatterBlock {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  isShattered: boolean

  constructor(x: number, y: number, color: string) {
    this.ox = x
    this.oy = y
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.color = color
    this.isShattered = false
  }

  shatter(forceMultiplier: number = 1) {
    this.isShattered = true
    const angle = Math.random() * Math.PI * 2
    const force = (Math.random() * 15 + 5) * forceMultiplier
    this.vx = Math.cos(angle) * force
    this.vy = Math.sin(angle) * force - (5 * forceMultiplier)
  }

  restore() {
    this.isShattered = false
  }

  update() {
    if (this.isShattered) {
      this.vy += 0.8 // Gravity
      this.x += this.vx
      this.y += this.vy
    } else {
      // Spring back
      const dx = this.ox - this.x
      const dy = this.oy - this.y
      this.vx += dx * 0.12
      this.vy += dy * 0.12
      this.vx *= 0.75
      this.vy *= 0.75
      this.x += this.vx
      this.y += this.vy
    }
  }
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  gridRes?: number
}

export default function ShatterImage({ src, alt, className, gridRes = 12, ...props }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [isReady, setIsReady] = useState(false)
  const blocksRef = useRef<ShatterBlock[]>([])
  const reqRef = useRef<number>()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const prefersReducedMotion = useReducedMotion()

  // Initialize pixels from image
  const initBlocks = useCallback(() => {
    const img = imageRef.current
    if (!img || !img.complete) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Standardize processing size to keep block count reasonable
    const w = img.width
    const h = img.height
    if (w === 0 || h === 0) return

    canvas.width = w
    canvas.height = h
    ctx.drawImage(img, 0, 0, w, h)
    
    try {
      const imgData = ctx.getImageData(0, 0, w, h).data
      const blocks: ShatterBlock[] = []
      
      for (let y = 0; y < h; y += gridRes) {
        for (let x = 0; x < w; x += gridRes) {
          const i = (y * w + x) * 4
          const r = imgData[i]
          const g = imgData[i+1]
          const b = imgData[i+2]
          const a = imgData[i+3]
          
          if (a > 10) {
            blocks.push(new ShatterBlock(x, y, `rgba(${r},${g},${b},${a/255})`))
          }
        }
      }
      blocksRef.current = blocks
      setIsReady(true)
    } catch (e) {
      console.error("CORS error: Image must be local or have crossOrigin set", e)
    }
  }, [gridRes])

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const blocks = blocksRef.current
      
      // Check if we need to redraw
      // Optimization: Only clear and redraw if blocks are moving (shattered or springing back)
      let needsRedraw = false
      for (const b of blocks) {
        if (b.isShattered || Math.abs(b.vx) > 0.1 || Math.abs(b.vy) > 0.1 || Math.abs(b.x - b.ox) > 0.1 || Math.abs(b.y - b.oy) > 0.1) {
          needsRedraw = true
          break
        }
      }

      if (needsRedraw) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const b of blocks) {
          b.update()
          ctx.fillStyle = b.color
          // Draw slightly larger than gridRes to avoid subpixel gaps
          ctx.fillRect(Math.floor(b.x), Math.floor(b.y), gridRes + 1, gridRes + 1)
        }
      }

      reqRef.current = requestAnimationFrame(render)
    }
    
    if (isReady && !prefersReducedMotion) {
      // Set actual canvas resolution to match image
      const canvas = canvasRef.current
      const img = imageRef.current
      if (canvas && img) {
        canvas.width = img.width
        canvas.height = img.height
      }
      reqRef.current = requestAnimationFrame(render)
    }
    
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current)
    }
  }, [isReady, prefersReducedMotion, gridRes])

  const handlePointerDown = () => {
    if (!isReady || prefersReducedMotion) return
    // Long press to shatter
    timeoutRef.current = setTimeout(() => {
      // Hide the real image, show canvas
      if (imageRef.current) imageRef.current.style.opacity = '0'
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
      
      // Shatter all blocks
      blocksRef.current.forEach(b => b.shatter(Math.random() * 0.5 + 0.8))
    }, 400) // 400ms long press
  }

  const handlePointerUp = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (!isReady || prefersReducedMotion) return
    
    // Restore all blocks
    blocksRef.current.forEach(b => b.restore())
    
    // Show real image again after they spring back
    setTimeout(() => {
      if (imageRef.current) imageRef.current.style.opacity = '1'
      if (canvasRef.current) canvasRef.current.style.opacity = '0'
    }, 1500)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative select-none ${className || ''}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()} // Prevent context menu on long press
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        onLoad={initBlocks}
        className="w-full h-full object-cover transition-opacity duration-300"
        {...props}
      />
      {/* Tooltip hint */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity cursor-help pointer-events-auto">
        HOLD TO SHATTER
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-0"
      />
    </div>
  )
}
