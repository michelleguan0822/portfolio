'use client'

import { useRef, useCallback } from 'react'
import { usePixelCanvas } from '../hooks/usePixelCanvas'

export default function DotMatrixMarquee() {
  // Store image data so we can read from it in onDraw without re-extracting
  const textDataRef = useRef<{ data: Uint8ClampedArray, width: number, height: number } | null>(null)
  // Track mouse for interactive glow
  const mouseRef = useRef({ x: -1000, y: -1000 })

  const onInit = useCallback((width: number, height: number) => {
    const off = document.createElement('canvas')
    const ctx = off.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    
    const gridRes = 8 // Size of each dot cell
    const th = Math.floor(height / gridRes)
    
    const textString = "   GOOGLE CREATIVE LAB • MIT MEDIA LAB • AVANADE • ACCENTURE • MICROSOFT • TEAMLAB •"
    
    // Use a crisp, blocky font weight to ensure solid pixels
    ctx.font = '900 18px "Inter", sans-serif'
    const textWidth = ctx.measureText(textString).width
    
    const tw = Math.ceil(textWidth)
    off.width = tw
    off.height = th
    
    // Draw text to offscreen canvas
    ctx.font = '900 18px "Inter", sans-serif'
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'middle'
    ctx.fillText(textString, 0, th / 2)
    
    const imageData = ctx.getImageData(0, 0, tw, th)
    textDataRef.current = {
      data: imageData.data,
      width: tw,
      height: th
    }
  }, [])

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height)
    // Dark industrial background for the LED board
    ctx.fillStyle = '#0A0A0A' 
    ctx.fillRect(0, 0, width, height)
    
    const textInfo = textDataRef.current
    if (!textInfo) return

    const gridRes = 8
    const dotRadius = 2.5 // Leaves a little gap between dots
    const cols = Math.ceil(width / gridRes)
    const rows = textInfo.height

    // Calculate scroll offset based on time
    // 35 dots per second scrolling to the left
    const speed = 35 
    const xOffset = Math.floor(time * speed)

    // Center vertically if canvas is taller than text rows
    const startY = Math.floor((height - (rows * gridRes)) / 2)
    
    const { x: mx, y: my } = mouseRef.current

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Map screen X to text X with wraparound
        const textX = (x + xOffset) % textInfo.width
        const textY = y

        // Read alpha channel
        const pixelIndex = (textY * textInfo.width + textX) * 4 + 3
        const alpha = textInfo.data[pixelIndex]
        const isLitText = alpha > 128

        const px = x * gridRes + gridRes / 2
        const py = startY + y * gridRes + gridRes / 2
        
        // Mouse interaction: light up dots near the cursor
        const dx = mx - px
        const dy = my - py
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isHoverGlow = dist < 40

        ctx.beginPath()
        // Draw squares instead of circles for a harsher, modern LED matrix look
        ctx.rect(px - dotRadius, py - dotRadius, dotRadius * 2, dotRadius * 2)
        
        if (isLitText || isHoverGlow) {
          // Lit dot (Text or Mouse Glow)
          ctx.fillStyle = isHoverGlow ? '#FFFFFF' : '#00E5FF' // White for cursor glow, Cyan for text
          ctx.shadowBlur = 6
          ctx.shadowColor = isHoverGlow ? '#FFFFFF' : '#00E5FF'
        } else {
          // Unlit dot
          ctx.fillStyle = '#1A1A1A'
          ctx.shadowBlur = 0
        }
        
        ctx.fill()
      }
    }
    // reset shadow
    ctx.shadowBlur = 0
  }, [])

  const canvasRef = usePixelCanvas({ onDraw, onInit })

  return (
    <section 
      className="relative w-full h-32 bg-[#0A0A0A] overflow-hidden border-y border-white/10 cursor-crosshair group"
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
      <div className="absolute top-2 left-6 w-full text-left pointer-events-none opacity-40">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
          CLIENT_MATRIX_SYS // ACTIVE
        </p>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </section>
  )
}
