'use client'

import { useRef, useEffect, useState } from 'react'

export default function PixelEraser({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      if (isRevealed) return
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      
      ctx.globalCompositeOperation = 'source-over'
      
      const blockSize = 24
      const cols = Math.ceil(rect.width / blockSize)
      const rows = Math.ceil(rect.height / blockSize)
      
      // Cyber/Tech colors for the mosaic
      const colors = ['#070B14', '#1F3A5F', '#111111', '#222222', '#0A0A0A']
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
          // Leave tiny gap for a grid effect
          ctx.fillRect(x * blockSize, y * blockSize, blockSize - 1, blockSize - 1)
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    let isDrawing = false
    let erasedCount = 0

    const erase = (x: number, y: number) => {
      if (isRevealed) return
      
      ctx.globalCompositeOperation = 'destination-out'
      
      const eraseSize = 72
      // Snap to grid for blocky erasure
      const snapX = Math.floor(x / 24) * 24
      const snapY = Math.floor(y / 24) * 24
      
      ctx.fillStyle = 'rgba(0,0,0,1)'
      ctx.fillRect(snapX - eraseSize/2, snapY - eraseSize/2, eraseSize, eraseSize)
      erasedCount++
      
      // Random scattered erasure around the cursor to feel like chunks falling off
      for(let i=0; i<3; i++) {
        const sx = snapX + (Math.random() - 0.5) * eraseSize * 1.8
        const sy = snapY + (Math.random() - 0.5) * eraseSize * 1.8
        ctx.fillRect(Math.floor(sx/24)*24, Math.floor(sy/24)*24, 24, 24)
      }
      
      // Auto reveal if erased enough
      if (erasedCount > 150) {
        setIsRevealed(true)
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      isDrawing = true
      const rect = canvas.getBoundingClientRect()
      erase(e.clientX - rect.left, e.clientY - rect.top)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      // Always erase on mouse hover, but require drag for touch
      if (e.pointerType === 'mouse' || isDrawing) {
        erase(e.clientX - rect.left, e.clientY - rect.top)
      }
    }

    const onPointerUp = () => {
      isDrawing = false
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
    }
  }, [isRevealed])

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      {children}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 w-full h-full touch-none cursor-crosshair transition-opacity duration-700 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onDoubleClick={() => setIsRevealed(true)}
      />
      {!isRevealed && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-blue-600 text-white text-[12px] tracking-widest font-bold px-4 py-2 rounded-full animate-pulse shadow-xl">
          SCRATCH TO REVEAL
        </div>
      )}
    </div>
  )
}
