'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

interface Props {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string // This is for the image itself
  containerClassName?: string // This is for the container
}

export default function MouseParallaxImage({ src, alt, sizes, priority, className = '', containerClassName = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return

    const container = containerRef.current
    const image = imageContainerRef.current
    if (!container || !image) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      // Calculate relative position (-0.5 to 0.5)
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      gsap.to(image, {
        x: x * 30, // Max offset 15px each way (wait, x is -0.5 to 0.5, so 30 * 0.5 = 15)
        y: y * 30,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const onLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReducedMotion])

  return (
    <div ref={containerRef} data-cursor="view" className={`relative overflow-hidden ${containerClassName}`}>
      <div 
        ref={imageContainerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform', transform: 'scale(1.05)' }} // Pre-scale slightly so it doesn't reveal edges during parallax
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${className}`}
        />
      </div>
    </div>
  )
}
