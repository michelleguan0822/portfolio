'use client'

import React from 'react'
import { Press_Start_2P } from 'next/font/google'

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const clients = [
  "Google Creative Lab", "MIT Media Lab", "Avanade", 
  "Accenture", "Microsoft", "teamLab"
]

export default function RetroMarquee() {
  return (
    <section className={`py-6 overflow-hidden border-y-4 border-black bg-white text-black ${pixelFont.className} group`}>
      <div className="relative w-full flex overflow-hidden">
        {/* CSS Marquee Animation */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {clients.map((client, idx) => (
                <div key={`${i}-${idx}`} className="flex items-center mx-6 group/item cursor-crosshair">
                  <span className="text-xl md:text-2xl uppercase opacity-80 group-hover/item:opacity-100 group-hover/item:text-blue-600 transition-all duration-150 group-hover/item:-translate-y-1">
                    {client}
                  </span>
                  {/* Pixel Invader/Separator */}
                  <div className="mx-8 w-6 h-6 opacity-30 group-hover/item:opacity-100 transition-opacity">
                    <svg viewBox="0 0 11 8" className="w-full h-full fill-current group-hover/item:fill-blue-600 group-hover/item:animate-pulse">
                      <path d="M2,0 L3,0 L3,1 L2,1 L2,0 Z M8,0 L9,0 L9,1 L8,1 L8,0 Z M3,1 L4,1 L4,2 L3,2 L3,1 Z M7,1 L8,1 L8,2 L7,2 L7,1 Z M2,2 L9,2 L9,3 L2,3 L2,2 Z M0,3 L2,3 L2,4 L0,4 L0,3 Z M3,3 L5,3 L5,4 L3,4 L3,3 Z M6,3 L8,3 L8,4 L6,4 L6,3 Z M9,3 L11,3 L11,4 L9,4 L9,3 Z M0,4 L11,4 L11,5 L0,5 L0,4 Z M0,5 L1,5 L1,6 L0,6 L0,5 Z M2,5 L3,5 L3,6 L2,6 L2,5 Z M8,5 L9,5 L9,6 L8,6 L8,5 Z M10,5 L11,5 L11,6 L10,6 L10,5 Z M3,6 L5,6 L5,7 L3,7 L3,6 Z M6,6 L8,6 L8,7 L6,7 L6,6 Z" />
                    </svg>
                  </div>
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
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  )
}
