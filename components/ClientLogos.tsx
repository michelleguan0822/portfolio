'use client'

import React from 'react'

const clients = [
  { name: "Google Creative Lab", width: 140 },
  { name: "MIT Media Lab", width: 120 },
  { name: "Avanade", width: 100 },
  { name: "Accenture", width: 120 },
  { name: "Microsoft", width: 110 },
  { name: "teamLab", width: 90 },
]

export default function ClientLogos() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-16 text-center">
          Collaborated With
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 md:gap-8 items-center justify-items-center">
          {clients.map((client, idx) => (
            <div 
              key={idx} 
              className="group relative flex items-center justify-center w-full h-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              {/* Fallback typography logo if no image */}
              <span className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 text-center">
                {client.name}
              </span>
              
              {/* Subtle underline effect on hover */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-neutral-900 group-hover:w-1/2 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
