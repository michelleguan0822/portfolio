'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const COLORS = [
  '#1F3A5F', // Dark Navy
  '#4D7298', // Steel Blue
  '#9FB4D1', // Periwinkle
  '#B1CDE0', // Sky Blue
  '#F3D0C7', // Pale Peach
]

interface FallingBlocksFeatureProps {
  id?: string;
  className?: string;
}

export default function FallingBlocksFeature({ id = 'falling-blocks', className = '' }: FallingBlocksFeatureProps) {
  const prefersReducedMotion = useReducedMotion()
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<any>(null)
  const renderRef = useRef<any>(null)
  const runnerRef = useRef<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const blockCountRef = useRef(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Matter.js dynamically from CDN
    if (typeof window !== 'undefined' && !(window as any).Matter) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js'
      script.async = true
      script.onload = () => setIsLoaded(true)
      document.body.appendChild(script)
      return () => {
        // We don't remove the script to allow caching, but we can clean up if needed
      }
    } else {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !sceneRef.current || !isLoaded) return
    const Matter = (window as any).Matter
    if (!Matter) return

    const { Engine, Render, Runner, World, Bodies } = Matter

    const width = sceneRef.current.clientWidth
    const height = sceneRef.current.clientHeight

    // Create engine
    const engine = Engine.create()
    engineRef.current = engine
    
    // Add some random bouncy behavior
    engine.world.gravity.y = 1.2

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
      }
    })
    renderRef.current = render

    // Create boundaries (floor, left wall, right wall)
    const wallOptions = { isStatic: true, render: { visible: false } }
    const floor = Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions)
    // Left and right walls to keep blocks inside
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions)
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions)
    
    World.add(engine.world, [floor, leftWall, rightWall])

    // Run the renderer
    Render.run(render)

    // Create runner
    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)

    // Function to spawn a block
    const spawnBlock = () => {
      if (blockCountRef.current > 150) { // Max blocks limit
        if (intervalRef.current) clearInterval(intervalRef.current)
        return
      }

      const size = Math.random() > 0.8 ? 40 : 20 // Mostly 20px squares, some 40px
      const x = Math.random() * (width - 100) + 50
      
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      
      const block = Bodies.rectangle(x, -50, size, size, {
        restitution: 0.6, // Bounciness
        friction: 0.8,
        render: {
          fillStyle: color,
          strokeStyle: 'transparent',
        }
      })

      // Give it a little random spin
      Matter.Body.setAngularVelocity(block, (Math.random() - 0.5) * 0.2)
      
      World.add(engine.world, block)
      blockCountRef.current++
    }

    // Initial burst
    for (let i = 0; i < 30; i++) {
      setTimeout(spawnBlock, i * 80)
    }

    // Continuous spawn
    intervalRef.current = setInterval(spawnBlock, 300)

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current || !render.canvas) return
      const newWidth = sceneRef.current.clientWidth
      const newHeight = sceneRef.current.clientHeight
      render.canvas.width = newWidth
      render.options.width = newWidth
      render.canvas.height = newHeight
      render.options.height = newHeight
      
      // Move floor
      Matter.Body.setPosition(floor, { x: newWidth / 2, y: newHeight + 25 })
      Matter.Body.setPosition(rightWall, { x: newWidth + 25, y: newHeight / 2 })
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (intervalRef.current) clearInterval(intervalRef.current)
      
      if (renderRef.current) {
        Render.stop(renderRef.current)
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove()
        }
      }
      
      if (runnerRef.current) {
        Runner.stop(runnerRef.current)
      }
      
      if (engineRef.current) {
        Engine.clear(engineRef.current)
      }
    }
  }, [prefersReducedMotion, isLoaded])

  return (
    <div 
      ref={sceneRef}
      id={id}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    >
      {prefersReducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium z-0">
          Physics animation disabled (Reduced Motion)
        </div>
      )}
    </div>
  )
}
