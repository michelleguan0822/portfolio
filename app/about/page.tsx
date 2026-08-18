'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MagneticButton from '@/components/MagneticButton'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#FAFAFA] overflow-hidden flex flex-col justify-between text-neutral-900">
      
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
      
      {/* Top Ceiling Perspective */}
      <div 
        className="absolute top-0 left-0 w-full h-[15vh] bg-[#F9F9F9] border-b border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 85vw 100%, 15vw 100%)' }} 
      />

      {/* Left Wall Perspective */}
      <div 
        className="absolute top-0 left-0 w-[15vw] h-full bg-[#F0F0F0] border-r border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 0, 100% 15vh, 100% 70vh, 0 100%)' }} 
      />

      {/* Right Wall Perspective */}
      <div 
        className="absolute top-0 right-0 w-[15vw] h-full bg-[#F5F5F5] border-l border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 15vh, 100% 0, 100% 100%, 0 70vh)' }} 
      />

      {/* Bottom Floor (Pixel Art Image) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[45vh] z-0" 
        style={{ 
          backgroundImage: "url('/images/about/pixel_room.jpg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center 70%" 
        }} 
      />

      {/* --- The White Screen (Canvas) --- */}
      {/* Positioned perfectly in the center "back wall" of the room */}
      <div className="absolute top-[15vh] left-[15vw] w-[70vw] h-[55vh] bg-white border border-black/5 shadow-2xl z-20 flex flex-col justify-center items-center px-12 md:px-24 text-center">
        
        {/* Elegant Centered Typography Layout */}
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
          Product Designer & Creative Engineer
        </p>
        
        <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-neutral-900 tracking-tighter uppercase leading-[0.9] mb-8">
          MICHELLE GUAN.
        </h1>
        
        <p className="text-base md:text-lg text-neutral-500 font-medium max-w-2xl leading-relaxed mb-12">
          I spend my days designing more intuitive (and less rage-inducing) digital experiences for people to live, work, and interact with others.
        </p>

        {/* Minimalist Logo Row */}
        <div className="flex flex-wrap justify-center gap-10 lg:gap-16 items-center text-neutral-900 pt-8 border-t border-black/5">
          <div className="flex flex-col text-left">
             <span className="text-4xl lg:text-5xl font-bold tracking-tighter leading-none">3+</span>
             <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mt-1">Years UX</span>
          </div>
          
          <div className="flex flex-col gap-1 opacity-70 hover:opacity-100 transition-opacity text-center">
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">Omnireflex</span>
          </div>
          
          <div className="flex flex-col gap-1 opacity-70 hover:opacity-100 transition-opacity text-center">
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">Bestmylife</span>
          </div>
          
          <div className="flex flex-col gap-1 opacity-70 hover:opacity-100 transition-opacity text-center">
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">Avanade</span>
          </div>
        </div>

      </div>

    </main>
  )
}
