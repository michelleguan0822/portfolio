'use client'

import { useCallback } from 'react'
import { usePixelCanvas } from '../hooks/usePixelCanvas'
import { useReducedMotion } from 'framer-motion'
import PixelEraser from './PixelEraser'

// Draws a simple smiley/frowny face in 8x8 grid
function drawFace(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, isGood: boolean) {
  const size = 8
  const cellSize = Math.min(width, height) / size
  
  // Wobble effect
  const offset = Math.sin(time * 2) * 2

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = isGood ? '#F3D0C7' : '#4D7298' // Pale Peach for good, Steel Blue for not interested

  // Draw an 8x8 pixel face
  // Array of 8 strings, each 8 chars
  const goodFace = [
    "00111100",
    "01111110",
    "11011011",
    "11111111",
    "11100111",
    "11011011",
    "01111110",
    "00111100"
  ]

  const badFace = [
    "00111100",
    "01111110",
    "11011011",
    "11111111",
    "11011011",
    "11100111",
    "01111110",
    "00111100"
  ]
  
  const face = isGood ? goodFace : badFace

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (face[y][x] === "1") {
        ctx.fillRect(
          x * cellSize, 
          y * cellSize + (x % 2 === 0 ? offset : -offset), 
          cellSize - 1, 
          cellSize - 1
        )
      }
    }
  }
}

function PixelFace({ isGood }: { isGood: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  
  const onDraw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    drawFace(ctx, w, h, prefersReducedMotion ? 0 : t, isGood)
  }, [isGood, prefersReducedMotion])

  const canvasRef = usePixelCanvas({ onDraw })

  return (
    <div className="w-16 h-16 shrink-0 relative">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

export default function ManifestoSection() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAFA] border-b border-black/10">
      <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Headline */}
        <div className="w-full lg:w-1/2">
          <PixelEraser>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1] uppercase py-8 px-4 bg-white/50">
              Design is not
              <br />
              finished until
              <br />
              it works.
            </h2>
          </PixelEraser>
        </div>

        {/* Right Side: Copy & Faces */}
        <div className="w-full lg:w-1/2 flex flex-col gap-12">
          <div className="space-y-6 text-lg md:text-xl text-neutral-700 font-medium leading-relaxed">
            <p>
              I believe the gap between a Figma mockup and a production build is where the true product is defined. It's not enough to draw a picture of a system; you have to build the machine itself.
            </p>
            <p>
              By combining product thinking, interaction design, and frontend engineering, I ensure that design intent survives the development process and reaches the user exactly as intended.
            </p>
            <p>
              An interface should be playful yet predictable. It should feel engineered.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 pt-8 border-t border-black/10">
            {/* Face 1 */}
            <div className="flex flex-col gap-4">
              <PixelFace isGood={true} />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Good At</h3>
                <p className="text-sm text-neutral-600 font-medium">Turning ambiguity into usable systems.</p>
              </div>
            </div>

            {/* Face 2 */}
            <div className="flex flex-col gap-4">
              <PixelFace isGood={false} />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Not Interested In</h3>
                <p className="text-sm text-neutral-600 font-medium">Making polished screens that never ship.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
