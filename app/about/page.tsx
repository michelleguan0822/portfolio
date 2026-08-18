'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '@/components/MagneticButton'
import PixelCanvasFeature from '@/components/PixelCanvasFeature'
import PixelEraser from '@/components/PixelEraser'
import PixelPlayground from '@/components/PixelPlayground'
import FooterSection from '@/components/FooterSection'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#FAFAFA]">
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

      {/* HERO SECTION: Interactive Pixel Landscape */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-black/10">
        <PixelCanvasFeature 
          id="hero-pixel-bg" 
          className="absolute inset-0 z-0" 
          showControls={false} 
          initialCellSize="M" 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 bg-white/95 backdrop-blur-md p-12 md:p-20 border border-black/10 shadow-2xl rounded-[2rem] text-center max-w-4xl mx-6"
        >
          <div className="absolute -top-12 -right-12 w-24 h-24 hidden md:block">
             <img src="/images/about/vibe_coding.png" alt="Avatar" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
            01 // Manifesto
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter text-neutral-900 uppercase leading-[1.1]">
            I build things that make people feel something.
          </h1>
          <p className="mt-8 text-lg font-medium text-neutral-500 max-w-2xl mx-auto">
            A Product Designer and Creative Engineer blending empathy, systems thinking, and playful interactions.
          </p>
        </motion.div>
      </section>

      {/* BENTO GRID: Life & Inspiration */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[#FAFAFA]">
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
            02 // The Maker
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 uppercase">
            Beyond the screen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          
          {/* Origin Story */}
          <div className="col-span-1 md:col-span-2 bg-white border border-black/5 rounded-[2rem] p-12 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-neutral-900 uppercase mb-6">Origin Story</h3>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed max-w-xl">
                I grew up wanting to be an animator, an engineer, and even a fashion designer. 
                When I found UX, it was the perfect blend of creativity, logic, and systems thinking. 
                Now, I seize my destiny by pushing the boundaries of what a browser can do.
              </p>
            </div>
            <div className="flex justify-end relative z-10">
               <img src="/images/about/michelle.png" alt="Young Michelle" className="w-48 grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            {/* Decorative background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity" style={{
              backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Interactive Lego - Pixel Eraser */}
          <div className="col-span-1 bg-white border border-black/5 rounded-[2rem] overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
            <PixelEraser>
              <div className="absolute inset-0 w-full h-full flex flex-col">
                <img src="/images/about/lego.jpg" alt="Lego" className="w-full h-[80%] object-cover" />
                <div className="h-[20%] bg-white flex items-center justify-center border-t border-black/5">
                  <p className="text-sm font-bold text-neutral-900 uppercase tracking-widest">Builder at heart</p>
                </div>
              </div>
            </PixelEraser>
          </div>

          {/* Hobbies Split */}
          <div className="col-span-1 flex flex-col gap-6 h-full">
            <div className="flex-1 bg-white border border-black/5 rounded-[2rem] overflow-hidden p-8 flex flex-col items-center justify-center relative shadow-sm group">
              <img src="/images/about/hamster.jpg" alt="Hamster" className="w-24 h-24 object-cover rounded-full shadow-lg z-10 group-hover:scale-110 transition-transform duration-500" />
              <p className="mt-4 text-sm font-bold text-neutral-400 uppercase tracking-widest z-10">Chief Morale Officer</p>
            </div>
            <div className="flex-1 bg-white border border-black/5 rounded-[2rem] overflow-hidden relative shadow-sm">
              <PixelEraser>
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <img src="/images/about/golf.jpg" alt="Golf" className="w-full h-full object-cover" />
                </div>
              </PixelEraser>
            </div>
          </div>

          {/* Interactive Tech Stack */}
          <div className="col-span-1 md:col-span-2 border border-black/5 rounded-[2rem] overflow-hidden bg-white shadow-sm flex flex-col">
            <div className="px-8 py-6 border-b border-black/5 flex items-center justify-between">
               <h3 className="text-lg font-bold text-neutral-900 uppercase">Skill Matrix</h3>
               <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Physics Playground</span>
            </div>
            <div className="flex-grow relative h-full">
               <div className="absolute inset-0 -mt-[40px]">
                 <PixelPlayground />
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-6 md:px-12 lg:px-24 py-32 border-t border-black/10 bg-white">
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
            03 // The Journey
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 uppercase">
            Where I learned to build
          </h2>
        </div>

        <div className="flex flex-col border-t border-black/10">
          
          {[
            { date: "Jun 2025 — Present", title: "Design Engineer", company: "Omnireflex", desc: "Architected conversational AI experiences and owned the SwiftUI design system." },
            { date: "May 2026 — Present", title: "Independent Creator", company: "Body Interaction", desc: "Engineered gesture-driven browser interactions using MediaPipe and WebGL." },
            { date: "Feb 2025 — Jun 2025", title: "Product Designer", company: "Bestmylife", desc: "Translated ambiguous clinical requirements into coded React prototypes." },
            { date: "Sep 2024 — Feb 2025", title: "Product Designer", company: "Impulse", desc: "Redesigned core daily habit loops to significantly boost engagement." },
            { date: "Jun 2023 — Aug 2023", title: "AI Product Design Intern", company: "Avanade", desc: "Streamlined AI-driven document workflows with cross-platform specs." }
          ].map((job, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-black/10 hover:bg-neutral-50 transition-colors group">
              <div className="md:col-span-3 flex items-center">
                <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase group-hover:text-neutral-900 transition-colors">
                  {job.date}
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-neutral-900 uppercase">
                  {job.title}
                </h3>
                <p className="text-lg font-bold text-neutral-500 uppercase tracking-wide mt-1">
                  {job.company}
                </p>
              </div>
              <div className="md:col-span-5 flex items-center">
                <p className="text-lg font-medium text-neutral-500 leading-relaxed">
                  {job.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      <FooterSection />
    </main>
  )
}
