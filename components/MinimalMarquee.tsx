'use client'

import React from 'react'

const clients = [
  "Impulse", "Pupsupport", "UW HCDE Research", "Avanade", 
  "Omnireflex", "Shenzhen People’s Hospital", "Smash", "AfterQuery"
]

// An abstract 3x3 pixel grid that acts as the separator.
// When its parent is hovered, the squares shift to create an exploded pixel effect.
const AbstractPixelSeparator = () => {
  return (
    <div className="mx-12 md:mx-20 w-4 h-4 grid grid-cols-3 grid-rows-3 gap-[1px] opacity-30 group-hover/item:opacity-100 transition-all duration-500">
      <div className="bg-neutral-900 group-hover/item:-translate-x-1 group-hover/item:-translate-y-1 transition-transform duration-300 ease-out" />
      <div className="bg-transparent" />
      <div className="bg-neutral-900 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-transform duration-300 ease-out" />
      
      <div className="bg-neutral-900 group-hover/item:-translate-x-1 transition-transform duration-300 ease-out" />
      <div className="bg-blue-600 group-hover/item:scale-125 transition-transform duration-300 ease-out" />
      <div className="bg-neutral-900 group-hover/item:translate-x-1 transition-transform duration-300 ease-out" />
      
      <div className="bg-neutral-900 group-hover/item:-translate-x-1 group-hover/item:translate-y-1 transition-transform duration-300 ease-out" />
      <div className="bg-transparent" />
      <div className="bg-neutral-900 group-hover/item:translate-x-1 group-hover/item:translate-y-1 transition-transform duration-300 ease-out" />
    </div>
  )
}

export default function MinimalMarquee() {
  return (
    <section className="py-12 overflow-hidden border-y border-black/5 bg-[#FAFAFA] text-neutral-900 flex group cursor-crosshair">
      <div className="relative w-full flex overflow-hidden">
        {/* CSS Marquee Animation */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {clients.map((client, idx) => (
                <div key={`${i}-${idx}`} className="flex items-center group/item">
                  <span className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-400 group-hover/item:text-neutral-900 transition-colors duration-300">
                    {client}
                  </span>
                  <AbstractPixelSeparator />
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
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}
