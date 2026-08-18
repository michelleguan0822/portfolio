'use client'

import React from 'react'

const techs = [
  "React", "TypeScript", "Three.js", "WebGL", "MediaPipe",
  "SwiftUI", "Framer Motion", "GSAP", "Tailwind CSS", "Figma",
  "Node.js", "Python"
]

export default function TechStackMarquee() {
  return (
    <section className="py-24 overflow-hidden border-y border-black/5 bg-[#070B14] text-white">
      <div className="mb-12 px-6 md:px-12 lg:px-24">
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
          Selected Tech Stack
        </p>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        {/* CSS Marquee Animation */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              {techs.map((tech, idx) => (
                <div key={`${i}-${idx}`} className="flex items-center mx-8">
                  <span className="text-4xl md:text-6xl font-bold tracking-tighter uppercase opacity-80 hover:opacity-100 hover:text-cyan-400 transition-colors duration-300">
                    {tech}
                  </span>
                  <div className="w-3 h-3 rounded-full bg-blue-500/50 mx-8" />
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
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}
