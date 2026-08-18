'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.5,
      smoothWheel: !shouldReduceMotion,
    }}>
      {children}
    </ReactLenis>
  )
}
