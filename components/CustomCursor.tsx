'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'button' | 'text'>('default')

  useEffect(() => {
    // Hide cursor on coarse pointers (mobile/touch) or if reduced motion
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })
    gsap.set(dot, { xPercent: -50, yPercent: -50 })

    const onMouseMove = (e: MouseEvent) => {
      // Outer ring with delay/damping
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      })
      
      // Inner dot responds instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null
      
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as 'view' | 'button' | 'text'
        setCursorState(type)
      } else {
        setCursorState('default')
      }
    }

    // Add styles to hide default cursor dynamically
    document.documentElement.style.cursor = 'none'

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      document.documentElement.style.cursor = 'auto'
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const text = textRef.current
    if (!cursor || !dot || !text) return

    // Morph animations
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'power3.out' } })
    
    if (cursorState === 'default') {
      tl.to(cursor, { width: 40, height: 40, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.5)' }, 0)
      tl.to(dot, { opacity: 1, scale: 1 }, 0)
      tl.to(text, { opacity: 0, scale: 0 }, 0)
    } else if (cursorState === 'view') {
      tl.to(cursor, { width: 80, height: 80, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.2)' }, 0)
      tl.to(dot, { opacity: 0, scale: 0 }, 0)
      tl.to(text, { opacity: 1, scale: 1 }, 0)
    } else if (cursorState === 'button') {
      tl.to(cursor, { width: 24, height: 24, backgroundColor: 'white', borderColor: 'white' }, 0)
      tl.to(dot, { opacity: 0, scale: 0 }, 0)
      tl.to(text, { opacity: 0, scale: 0 }, 0)
    } else if (cursorState === 'text') {
      tl.to(cursor, { width: 60, height: 60, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.1)' }, 0)
      tl.to(dot, { opacity: 0, scale: 0 }, 0)
      tl.to(text, { opacity: 0, scale: 0 }, 0)
    }
  }, [cursorState, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full border border-white/50 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
        style={{ width: '40px', height: '40px', willChange: 'transform, width, height' }}
      >
        <span ref={textRef} className="text-[10px] font-bold text-white uppercase tracking-widest opacity-0 scale-0" style={{ willChange: 'opacity, transform' }}>
          View
        </span>
      </div>
      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
