'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MagneticButton from '@/components/MagneticButton'
import FooterSection from '@/components/FooterSection'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#FAFAFA] text-neutral-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 mix-blend-difference text-white pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
          <Link href="/">
            <MagneticButton className="w-12 h-12 bg-white flex items-center justify-center text-black hover:bg-neutral-200 transition-colors"
              style={{
                clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
              }}>
              <ArrowLeft className="w-6 h-6" />
            </MagneticButton>
          </Link>
        </div>
      </nav>

      {/* --- Section 1: Hero Typography --- */}
      <section className="pt-48 pb-24 md:pt-56 md:pb-32 px-6 md:px-12 lg:px-24">
        <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter uppercase leading-[0.9] text-neutral-900 max-w-7xl">
          I DESIGN DIGITAL SPACES THAT FEEL MORE HUMAN.
        </h1>
      </section>

      {/* --- Section 2: Editorial Story --- */}
      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-t border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: Index */}
          <div className="md:col-span-3 lg:col-span-4">
             <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 sticky top-32">
               01. Origin
             </p>
          </div>

          {/* Right Column: Narrative */}
          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-neutral-900 font-medium leading-relaxed max-w-4xl mb-12">
              I grew up wanting to be an illustrator and an engineer. When I found UX, it was the perfect blend of creativity, logic, and systems thinking.
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 font-medium leading-relaxed max-w-3xl">
              Now, as a Product Designer and Creative Engineer, I spend my days building intuitive, emotionally resonant interfaces. I believe that software shouldn't just be functional—it should be a joy to use. Whether it's complex clinical tools or conversational AI, my goal is to design spaces that are less rage-inducing and more deeply personal.
            </p>
          </div>

        </div>

        {/* The Pixel Panoramic Banner */}
        <div className="mt-24 w-full">
          <div 
            className="w-full h-[35vh] md:h-[45vh] lg:h-[55vh] border border-black/10 bg-neutral-100"
            style={{ 
              backgroundImage: "url('/images/about/pixel_room.jpg')", 
              backgroundSize: "cover", 
              backgroundPosition: "center 70%" 
            }}
          />
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-4">
            Fig 1. My creative sanctuary (16-bit rendering).
          </p>
        </div>
      </section>

      {/* --- Section 3: The Matrix (Experience) --- */}
      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-t border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: Index */}
          <div className="md:col-span-3 lg:col-span-4">
             <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 sticky top-32">
               02. Experience
             </p>
          </div>

          {/* Right Column: Brutalist Table */}
          <div className="md:col-span-9 lg:col-span-8 border-t border-black/10">
            
            {[
              { year: "2025 — Present", company: "Omnireflex", role: "Design Engineer" },
              { year: "2026 — Present", company: "Independent", role: "Creative Developer" },
              { year: "2025", company: "Bestmylife", role: "Product Designer" },
              { year: "2024 — 2025", company: "Impulse", role: "Product Designer" },
              { year: "2023", company: "Avanade", role: "AI Design Intern" },
              { year: "2020 — 2024", company: "Univ. of Washington", role: "Informatics, B.S." },
            ].map((item, i) => (
              <div key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-black/10 hover:bg-black/5 transition-colors items-baseline px-4 -mx-4 cursor-default">
                <div className="md:col-span-3">
                  <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
                    {item.year}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-xl md:text-2xl font-bold text-neutral-900 uppercase tracking-tight">
                    {item.company}
                  </p>
                </div>
                <div className="md:col-span-5 md:text-right">
                  <p className="text-sm md:text-base font-bold text-neutral-500 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  )
}
