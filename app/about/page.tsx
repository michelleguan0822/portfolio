'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MagneticButton from '@/components/MagneticButton'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#FAFAFA] overflow-hidden flex flex-col items-center justify-start text-neutral-900">
      
      {/* Navigation (Floating) */}
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

      {/* --- The Room Structure --- */}
      
      {/* Bottom Floor (Pixel Art Image) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[45vh] lg:h-[45vh] z-0 opacity-100" 
        style={{ 
          backgroundImage: "url('/images/about/pixel_room.jpg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center 80%" // Adjusted to show the desk and bed better
        }} 
      />

      {/* Left Wall Perspective */}
      <div 
        className="absolute top-0 left-0 w-[10vw] lg:w-[15vw] h-[75vh] bg-[#F0F0F0] border-r border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 100%)' }} 
      />

      {/* Right Wall Perspective */}
      <div 
        className="absolute top-0 right-0 w-[10vw] lg:w-[15vw] h-[75vh] bg-[#F5F5F5] border-l border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)' }} 
      />

      {/* --- The White Screen (Canvas) --- */}
      <div className="relative z-20 w-[80vw] lg:w-[70vw] h-[75vh] mt-0 bg-white border-x border-b border-black/10 shadow-xl flex">
        
        {/* Left Column: Avatar & Vibe */}
        <div className="hidden md:flex w-1/3 border-r border-black/10 p-12 flex-col justify-between bg-neutral-50/50">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Status
            </p>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mb-8" />
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter uppercase leading-[0.9] text-neutral-300 break-all">
              DESIGN<br/>ENGINEER<br/>MAKER
            </h2>
          </div>
          <div className="w-full">
            <img src="/images/about/vibe_coding.png" alt="Avatar" className="w-full max-w-[180px] grayscale opacity-80 mix-blend-multiply" />
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="w-full md:w-2/3 p-12 md:p-16 lg:p-20 flex flex-col justify-between">
          
          {/* Top: Manifesto */}
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tighter uppercase leading-[1.0] mb-8">
              Building things that make people feel something.
            </h1>
            <p className="text-base md:text-lg text-neutral-500 font-medium leading-relaxed max-w-xl">
              I grew up wanting to be an illustrator and an engineer. When I found UX, it was the perfect blend of creativity and systems thinking. Now, I spend my days designing more intuitive (and less rage-inducing) digital spaces for people to live and work.
            </p>
          </div>

          {/* Bottom: Experience Grid */}
          <div className="mt-12 pt-12 border-t border-black/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="flex flex-col gap-1">
                <span className="text-xl font-black tracking-tighter uppercase">Omnireflex</span>
                <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Design Engineer</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-xl font-black tracking-tighter uppercase">Bestmylife</span>
                <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Product Designer</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-xl font-black tracking-tighter uppercase">Avanade</span>
                <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">AI Design Intern</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xl font-serif font-black tracking-tight text-neutral-900">UW</span>
                <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Informatics</span>
              </div>

            </div>
          </div>
          
        </div>

      </div>

    </main>
  )
}
