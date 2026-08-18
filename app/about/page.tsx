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
        className="absolute top-0 left-0 w-full h-[10vh] bg-[#F9F9F9] border-b border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 90vw 100%, 10vw 100%)' }} 
      />

      {/* Left Wall Perspective */}
      <div 
        className="absolute top-0 left-0 w-[10vw] h-full bg-[#F0F0F0] border-r border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 0, 100% 10vh, 100% 85vh, 0 100%)' }} 
      />

      {/* Right Wall Perspective */}
      <div 
        className="absolute top-0 right-0 w-[10vw] h-full bg-[#F5F5F5] border-l border-black/5 z-10" 
        style={{ clipPath: 'polygon(0 10vh, 100% 0, 100% 100%, 0 85vh)' }} 
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

      {/* --- The Mood Board (Canvas) --- */}
      <div className="absolute top-[10vh] left-[10vw] w-[80vw] h-[75vh] bg-white shadow-2xl z-20 p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-auto md:h-[65%] min-h-[400px]">
          
          {/* Manifesto Block (Wide) */}
          <div className="flex-grow md:w-[60%] bg-[#FAFAFA] border border-black/5 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div className="relative z-10">
               <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                 01 // Origin Story
               </p>
               <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter uppercase leading-[0.9] text-neutral-900 mb-6">
                 MICHELLE GUAN.
               </h1>
               <p className="text-sm lg:text-base font-medium text-neutral-500 max-w-sm leading-relaxed">
                 Product Designer & Creative Engineer.<br/><br/>
                 I grew up wanting to be an illustrator and an engineer. When I found UX, it was the perfect blend of creativity and systems thinking. Now, I spend my days designing more intuitive (and less rage-inducing) digital spaces.
               </p>
            </div>
            {/* The illustration/photo inside */}
            <div className="absolute bottom-0 right-0 w-48 md:w-64 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
               <img src="/images/about/michelle.png" alt="Avatar" className="w-full h-full object-contain grayscale mix-blend-multiply" />
            </div>
          </div>

          {/* Photos Column (Narrow) */}
          <div className="md:w-[40%] flex flex-row md:flex-col gap-4 md:gap-6">
             
             {/* Polaroid 1 */}
             <div className="flex-1 bg-white border border-black/5 shadow-md hover:shadow-lg rounded-[1.5rem] p-3 md:p-4 flex flex-col transform md:rotate-2 hover:rotate-0 transition-all duration-300">
               <div className="flex-grow bg-neutral-100 rounded-xl overflow-hidden relative min-h-[120px]">
                  <img src="/images/about/hamster.jpg" alt="Hamster" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-center mt-3 mb-1 text-neutral-400">Chief Morale Officer</p>
             </div>

             {/* Polaroid 2 */}
             <div className="flex-1 bg-white border border-black/5 shadow-md hover:shadow-lg rounded-[1.5rem] p-3 md:p-4 flex flex-col transform md:-rotate-2 hover:rotate-0 transition-all duration-300">
               <div className="flex-grow bg-neutral-100 rounded-xl overflow-hidden relative min-h-[120px]">
                  <img src="/images/about/golf.jpg" alt="Golf" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-center mt-3 mb-1 text-neutral-400">Weekend Routine</p>
             </div>

          </div>
        </div>

        {/* Bottom Row: Experience Matrix */}
        <div className="flex-shrink-0 min-h-[150px] md:h-[35%] bg-white border border-black/5 shadow-sm rounded-[2rem] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
            
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-8 text-neutral-900">
                <div className="flex flex-col text-left">
                   <span className="text-4xl lg:text-5xl font-bold tracking-tighter leading-none">3+</span>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mt-2">Years UX</span>
                </div>
                
                <div className="flex flex-col gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-xl lg:text-2xl font-black tracking-tighter uppercase leading-none">Omnireflex</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Design Engineer</span>
                </div>
                
                <div className="flex flex-col gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-xl lg:text-2xl font-black tracking-tighter uppercase leading-none text-blue-600/80">Bestmylife</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Product Designer</span>
                </div>
                
                <div className="flex flex-col gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-xl lg:text-2xl font-black tracking-tighter uppercase leading-none text-[#FF5A00]/80">Avanade</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Design Intern</span>
                </div>
                
                <div className="flex flex-col gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-xl lg:text-2xl font-serif font-black tracking-tight leading-none text-[#4b2e83]/80">UW</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Informatics</span>
                </div>
            </div>
        </div>

      </div>

    </main>
  )
}
