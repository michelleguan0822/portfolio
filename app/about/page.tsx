'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MagneticButton from '@/components/MagneticButton'
import { Silkscreen } from 'next/font/google'

const pixelFont = Silkscreen({ weight: '400', subsets: ['latin'] })

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

      {/* --- The Room Structure (Minimalist Homepage Style) --- */}
      
      {/* Bottom Floor (Pixel Art Image) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[45vh] lg:h-[50vh] z-0 opacity-90" 
        style={{ 
          backgroundImage: "url('/images/about/pixel_room.jpg')", 
          backgroundSize: "cover", 
          backgroundPosition: "bottom center" 
        }} 
      />

      {/* Left Wall Perspective (Subtle neutral shadow) */}
      <div 
        className="absolute top-0 left-0 w-[10vw] lg:w-[15vw] h-[70vh] bg-[#F0F0F0] border-r border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 0, 100% 12%, 100% 100%, 0 100%)' }} 
      />

      {/* Right Wall Perspective (Subtle neutral highlight) */}
      <div 
        className="absolute top-0 right-0 w-[10vw] lg:w-[15vw] h-[70vh] bg-[#F5F5F5] border-l border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 12%, 100% 0, 100% 100%, 0 100%)' }} 
      />

      {/* Top Ceiling Shadow (Optional depth, very subtle) */}
      <div 
        className="absolute top-0 left-[10vw] lg:left-[15vw] right-[10vw] lg:right-[15vw] h-[8vh] bg-black/[0.02] z-20 pointer-events-none" 
      />

      {/* --- The White Screen (Canvas) --- */}
      <div className="relative z-20 w-[80vw] lg:w-[70vw] h-[70vh] mt-0 bg-white border-x border-b border-black/10 shadow-xl flex flex-col justify-center px-12 md:px-24">
        
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
          01 // The Maker
        </p>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-900 tracking-tighter uppercase leading-[0.9] mb-8">
          HI, I'M MICHELLE GUAN.
        </h1>
        
        <h2 className="text-xl md:text-2xl text-neutral-900 font-medium mb-8 max-w-3xl leading-snug uppercase">
          I DESIGN SOFTWARE, CLINICAL TOOLS, AND <span className={`${pixelFont.className} tracking-widest text-neutral-400`}>AI SPACES</span> THAT FEEL MORE HUMAN.
        </h2>
        
        <p className="text-base md:text-lg text-neutral-500 font-medium max-w-3xl leading-relaxed mb-16">
          As a product designer interested in making the world feel more empathetic and personal, I spend my days designing more intuitive (and less rage-inducing) digital experiences for people to live, work, and interact with others.
        </p>

        {/* Logos / Stats Grid */}
        <div className="flex flex-wrap gap-12 lg:gap-16 items-center text-neutral-900">
          <div className="flex flex-col border-r border-black/10 pr-12">
             <span className="text-5xl lg:text-6xl font-bold tracking-tighter">3+</span>
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400 mt-2">Years of UX Design</span>
          </div>
          
          {/* Company Text Logos matching homepage clean aesthetic */}
          <div className="flex flex-col justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">Omnireflex</span>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Design Engineer</span>
          </div>
          
          <div className="flex flex-col justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">Bestmylife</span>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Product Designer</span>
          </div>
          
          <div className="flex flex-col justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">Avanade</span>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">AI Design Intern</span>
          </div>

          <div className="flex flex-col justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-2xl md:text-3xl font-serif font-black tracking-tight leading-none text-neutral-900">UW</span>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Informatics</span>
          </div>
        </div>

      </div>

    </main>
  )
}
