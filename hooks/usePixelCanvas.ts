'use client'

import { useEffect, useRef } from 'react'

export interface PixelCanvasConfig {
  onDraw: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void
  onResize?: (width: number, height: number) => void
  onInit?: (width: number, height: number) => void
  pauseOffscreen?: boolean
}

export function usePixelCanvas({ onDraw, onResize, onInit, pauseOffscreen = true }: PixelCanvasConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let startTime = performance.now()

    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      // Set physical pixel size
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      // Set display size
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      // Normalize coordinate system to use CSS pixels
      ctx.scale(dpr, dpr)

      if (onResize) onResize(rect.width, rect.height)
      if (onInit && !canvas.dataset.initialized) {
        onInit(rect.width, rect.height)
        canvas.dataset.initialized = 'true'
      }
    }

    // Intersection Observer for pausing offscreen canvases
    let observer: IntersectionObserver | null = null
    if (pauseOffscreen) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting
          })
        },
        { threshold: 0 }
      )
      observer.observe(canvas)
    }

    const render = (now: number) => {
      if (isVisibleRef.current) {
        const rect = canvas.getBoundingClientRect()
        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        // Call draw function
        const time = (now - startTime) / 1000
        onDraw(ctx, rect.width, rect.height, time)
      }
      
      animationFrameId = requestAnimationFrame(render)
    }

    // Initial setup
    handleResize()
    window.addEventListener('resize', handleResize)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (observer) observer.disconnect()
    }
  }, [onDraw, onResize, onInit, pauseOffscreen])

  return canvasRef
}
