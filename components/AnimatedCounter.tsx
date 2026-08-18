'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useSpring, useTransform, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
}

export default function AnimatedCounter({ from = 0, to, duration = 1.5 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const shouldReduceMotion = useReducedMotion()

  const springValue = useSpring(from, {
    damping: 50,
    stiffness: 100,
    mass: 1,
    duration: duration * 1000,
  })

  // Format to standard whole number
  const display = useTransform(springValue, (current) => Math.round(current))

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      springValue.set(to)
    }
  }, [isInView, to, springValue, shouldReduceMotion])

  if (shouldReduceMotion) {
    return <span>{to}</span>
  }

  return <motion.span ref={ref}>{display}</motion.span>
}
