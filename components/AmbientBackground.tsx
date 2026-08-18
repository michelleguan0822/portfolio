'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from 'framer-motion'

export default function AmbientBackground() {
  const blobRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const blob = blobRef.current
    if (!blob) return

    gsap.set(blob, { xPercent: -50, yPercent: -50, top: '50%', left: '50%' })

    const onMouseMove = (e: MouseEvent) => {
      // Extremely smooth, viscous tracking
      gsap.to(blob, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 3,
        ease: 'power3.out',
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [prefersReducedMotion])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-transparent">
      {/* Mouse tracking ambient light */}
      <div 
        ref={blobRef}
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#9FB4D1]/40 to-[#B1CDE0]/30 blur-[120px] opacity-80 mix-blend-multiply"
      />
      
      {/* SVG Noise filter for a highly premium, frosted physical texture */}
      <svg className="hidden">
        <filter id="premiumNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.04 0" />
        </filter>
      </svg>
      <div className="absolute inset-0 pointer-events-none mix-blend-color-burn" style={{ filter: 'url(#premiumNoise)' }}></div>
    </div>
  )
}
