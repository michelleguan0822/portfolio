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

export default function SystemSection() {
  const containerRef = useRef<HTMLElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef(0)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (!diagramRef.current) return

    gsap.to(stepRef, {
      current: 4, // 0 to 4 steps
      ease: 'steps(4)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
      }
    })
  }, { scope: containerRef })

  const onDraw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const step = prefersReducedMotion ? 4 : Math.floor(stepRef.current)
    const cellSize = 12
    ctx.clearRect(0, 0, width, height)

    const drawBlock = (x: number, y: number, color: string, w: number, h: number, wobble: boolean = false) => {
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          const offsetX = wobble ? Math.sin(time * 3 + i + j) * 2 : 0
          const offsetY = wobble ? Math.cos(time * 3 + i + j) * 2 : 0
          
          const px = Math.round((x + i * cellSize + offsetX) / cellSize) * cellSize
          const py = Math.round((y + j * cellSize + offsetY) / cellSize) * cellSize
          
          ctx.fillStyle = color
          ctx.fillRect(px, py, cellSize - 1, cellSize - 1)
        }
      }
    }

    const centerY = height / 2 - (cellSize * 2)

    // Base layout coordinates
    const tokensX = width * 0.1
    const compX = width * 0.35
    const uiX = width * 0.6
    const feedbackX = width * 0.85

    // Draw connection lines if step allows
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    if (step >= 1) ctx.fillRect(tokensX + 40, centerY + cellSize * 1.5, compX - tokensX - 40, 2)
    if (step >= 2) ctx.fillRect(compX + 40, centerY + cellSize * 1.5, uiX - compX - 40, 2)
    if (step >= 3) {
      // Loop back line
      ctx.fillRect(feedbackX + 40, centerY + cellSize * 1.5, width * 0.05, 2)
      ctx.fillRect(feedbackX + 40 + width * 0.05, centerY + cellSize * 1.5, 2, height * 0.3)
      ctx.fillRect(tokensX + 20, centerY + cellSize * 1.5 + height * 0.3, feedbackX - tokensX + 20 + width * 0.05, 2)
      ctx.fillRect(tokensX + 20, centerY + cellSize * 1.5 + height * 0.3, 2, -height * 0.3)
    }

    // Design Tokens (Small foundation blocks)
    if (step >= 0) {
      drawBlock(tokensX, centerY, '#1F3A5F', 4, 4)
      drawBlock(tokensX + 10, centerY - 6, '#1F3A5F', 3, 3, true)
      drawBlock(tokensX + 6, centerY + 12, '#1F3A5F', 2, 2)
      ctx.fillStyle = '#000'
      ctx.font = 'bold 12px Inter'
      ctx.fillText('TOKENS', tokensX, centerY + 70)
    }

    // Components (Medium blocks built from tokens)
    if (step >= 1) {
      drawBlock(compX, centerY - 10, '#4D7298', 5, 5, true)
      drawBlock(compX + 12, centerY + 4, '#4D7298', 6, 4)
      drawBlock(compX - 8, centerY + 16, '#4D7298', 4, 4)
      ctx.fillStyle = '#000'
      ctx.font = 'bold 12px Inter'
      ctx.fillText('COMPONENTS', compX, centerY + 70)
    }

    // Product UI (Large complex structure)
    if (step >= 2) {
      drawBlock(uiX, centerY - 20, '#B1CDE0', 8, 6)
      drawBlock(uiX + 24, centerY - 8, '#F3D0C7', 4, 4, true) // Validated patterns
      drawBlock(uiX - 12, centerY + 10, '#B1CDE0', 12, 4)
      drawBlock(uiX + 8, centerY + 22, '#B1CDE0', 6, 3)
      ctx.fillStyle = '#000'
      ctx.font = 'bold 12px Inter'
      ctx.fillText('PRODUCT UI', uiX, centerY + 70)
    }

    // Feedback Loop (Single spark returning)
    if (step >= 3) {
      drawBlock(feedbackX, centerY + 10, '#9FB4D1', 3, 3, true)
      ctx.fillStyle = '#000'
      ctx.font = 'bold 12px Inter'
      ctx.fillText('FEEDBACK', feedbackX, centerY + 70)
    }

  }, [prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw })

  return (
    <section ref={containerRef} className="py-32 bg-[#FAFAFA] border-b border-black/10">
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 uppercase">
          The Product
          <br />
          Interface System.
        </h2>
      </div>

      {/* Scroll-driven Canvas Diagram */}
      <div ref={diagramRef} className="w-full h-[50vh] relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
    </section>
  )
}
