'use client'

import React, { useState, useEffect } from 'react'

const clients = [
  "Google Creative Lab", "MIT Media Lab", "Avanade", 
  "Accenture", "Microsoft", "teamLab", "Shenzhen People's Hospital"
]

const chars = '!<>-_\\\\/[]{}—=+*^?#________'

// Interactive component for each word
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text)
      return
    }
    
    let frame = 0
    const maxFrames = 20
    let animationFrame: number
    
    const animate = () => {
      let result = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' '
          continue
        }
        // Random scramble based on frame progress
        if (frame < maxFrames && Math.random() > frame / maxFrames) {
          result += chars[Math.floor(Math.random() * chars.length)]
        } else {
          result += text[i]
        }
      }
      
      setDisplayText(result)
      
      if (frame < maxFrames) {
        frame++
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animate()
    
    return () => cancelAnimationFrame(animationFrame)
  }, [isHovered, text])

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-2xl md:text-4xl font-bold tracking-tighter uppercase cursor-crosshair px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200"
      style={{ fontFamily: isHovered ? 'monospace' : 'inherit' }}
    >
      {displayText}
    </span>
  )
}

export default function ClientMarquee() {
  return (
    <section className="py-12 overflow-hidden border-y border-black/5 bg-[#FAFAFA] text-neutral-900 group">
      <div className="relative w-full flex overflow-hidden">
        {/* CSS Marquee Animation */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {clients.map((client, idx) => (
                <div key={`${i}-${idx}`} className="flex items-center mx-12">
                  <ScrambleText text={client} />
                  <div className="w-2 h-2 rounded-none bg-neutral-300 mx-12 rotate-45 group-hover:bg-blue-500 transition-colors duration-700" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Required CSS for the marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}
