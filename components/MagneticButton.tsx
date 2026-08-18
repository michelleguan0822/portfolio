'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
  style?: React.CSSProperties
}

export default function MagneticButton({ children, className = '', onClick, style }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const boundingRef = useRef<DOMRect | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    const onEnter = () => {
      boundingRef.current = el.getBoundingClientRect()
    }

    const onMove = (e: MouseEvent) => {
      if (!boundingRef.current) return
      const { left, top, width, height } = boundingRef.current
      // Calculate relative distance from center
      const x = e.clientX - (left + width / 2)
      const y = e.clientY - (top + height / 2)
      
      gsap.to(el, {
        x: x * 0.3, // Move 30% towards the mouse
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      })
      boundingRef.current = null
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReducedMotion])

  return (
    <button ref={ref} className={className} onClick={onClick} style={style} data-cursor="button">
      {children}
    </button>
  )
}
