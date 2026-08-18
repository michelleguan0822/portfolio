'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MouseParallaxImage from '@/components/MouseParallaxImage'
import MagneticButton from '@/components/MagneticButton'
import PixelCanvasFeature from '@/components/PixelCanvasFeature'
import FallingBlocksFeature from '@/components/FallingBlocksFeature'
import FooterSection from '@/components/FooterSection'
import { Caveat } from 'next/font/google'

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

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

      {/* 01 // BEGINNINGS */}
      <section 
        className="relative pt-48 pb-24 px-6 md:px-12 lg:px-24 border-b border-black/10 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        <FallingBlocksFeature id="about-blocks" className="opacity-90" />
        
        {/* HUD Tech Spec */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-10 pointer-events-none mix-blend-difference text-white text-right">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-white/50">Physics Engine</p>
          <p className="text-xs font-mono font-bold tracking-wider">MATTER.JS // RIGID BODY DYNAMICS</p>
        </div>
        <div className="max-w-[90vw] relative z-10 pointer-events-none">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-12">
            01 // Beginnings
          </p>
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] text-neutral-900 uppercase max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            "I pressed a key and the screen changed. I was hooked."
          </motion.h1>
        </div>


      </section>

      {/* 02 // ORIGIN (Added Section) */}
      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32 border-b border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-3 lg:col-span-4">
             <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 sticky top-32">
               02 // Origin
             </p>
          </div>

          <div className="md:col-span-9 lg:col-span-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-neutral-900 font-medium leading-relaxed max-w-4xl mb-12">
              I grew up wanting to be an illustrator and an engineer. When I found UX, it was the perfect blend of creativity, logic, and systems thinking.
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 font-medium leading-relaxed max-w-3xl">
              Now, as a Product Designer and Creative Engineer, I spend my days building intuitive, emotionally resonant interfaces. I believe that software shouldn't just be functional—it should be a joy to use. Whether it's complex clinical tools or conversational AI, my goal is to design spaces that are less rage-inducing and more deeply personal.
            </p>
          </div>

        </div>

        <div className="mt-24 w-full">
          <div 
            className="w-full h-[35vh] md:h-[45vh] lg:h-[55vh] border border-black/10 bg-neutral-100"
            style={{ 
              backgroundImage: "url('/images/about/pixel_room.jpg')", 
              backgroundSize: "cover", 
              backgroundPosition: "center 70%" 
            }}
          />
        </div>
      </section>

      {/* 03 // WHERE I LEARNED TO BUILD */}
      <section className="px-6 md:px-12 lg:px-24 py-32">
        <div className="mb-24">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
            03 // Where I learned to build
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900 uppercase leading-[1.1] max-w-4xl">
            Not every role changed my title.<br/>
            Some changed the way I see systems, people, and possibilities.
          </h2>
        </div>

        <div className="flex flex-col border-t border-black/10">
          
          {/* Experience 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-black/10 hover:bg-neutral-50 transition-colors group">
            <div className="md:col-span-3">
              <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase group-hover:text-neutral-900 transition-colors">
                Jun 2025 — Present
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 uppercase mb-2">
                Design Engineer
              </h3>
              <p className="text-lg font-bold text-neutral-400 uppercase tracking-wide">
                Omnireflex
              </p>
            </div>
            <div className="md:col-span-4 space-y-4">
              <p className="text-lg font-medium text-neutral-600 leading-relaxed">
                Architected conversational AI experiences and owned the SwiftUI design system from concept to production.
              </p>
            </div>
          </div>

          {/* Experience 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-black/10 hover:bg-neutral-50 transition-colors group">
            <div className="md:col-span-3">
              <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase group-hover:text-neutral-900 transition-colors">
                May 2026 — Present
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 uppercase mb-2">
                Independent Creator
              </h3>
              <p className="text-lg font-bold text-neutral-400 uppercase tracking-wide">
                Body Interaction Web Experiments
              </p>
            </div>
            <div className="md:col-span-4 space-y-4">
              <p className="text-lg font-medium text-neutral-600 leading-relaxed">
                Engineered gesture-driven browser interactions using MediaPipe and WebGL, growing a community around camera-based UI.
              </p>
            </div>
          </div>

          {/* Experience 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-black/10 hover:bg-neutral-50 transition-colors group">
            <div className="md:col-span-3">
              <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase group-hover:text-neutral-900 transition-colors">
                Feb 2025 — Jun 2025
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 uppercase mb-2">
                Product Designer
              </h3>
              <p className="text-lg font-bold text-neutral-400 uppercase tracking-wide">
                Bestmylife
              </p>
            </div>
            <div className="md:col-span-4 space-y-4">
              <p className="text-lg font-medium text-neutral-600 leading-relaxed">
                Translated ambiguous clinical requirements into a coded React prototype, aligning stakeholders to secure Phase 2 funding.
              </p>
            </div>
          </div>

          {/* Experience 4 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-black/10 hover:bg-neutral-50 transition-colors group">
            <div className="md:col-span-3">
              <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase group-hover:text-neutral-900 transition-colors">
                Sep 2024 — Feb 2025
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 uppercase mb-2">
                Product Designer
              </h3>
              <p className="text-lg font-bold text-neutral-400 uppercase tracking-wide">
                Impulse
              </p>
            </div>
            <div className="md:col-span-4">
              <p className="text-lg font-medium text-neutral-600 leading-relaxed">
                Redesigned core daily habit loops and interaction patterns to significantly reduce completion time and boost engagement.
              </p>
            </div>
          </div>

          {/* Experience 5 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-black/10 hover:bg-neutral-50 transition-colors group">
            <div className="md:col-span-3">
              <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase group-hover:text-neutral-900 transition-colors">
                Jun 2023 — Aug 2023
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 uppercase mb-2">
                AI Product Design Intern
              </h3>
              <p className="text-lg font-bold text-neutral-400 uppercase tracking-wide">
                Avanade Inc
              </p>
            </div>
            <div className="md:col-span-4 space-y-4">
              <p className="text-lg font-medium text-neutral-600 leading-relaxed">
                Streamlined AI-driven document workflows and delivered comprehensive cross-platform design specifications.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 04 // LETTER */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[#F3F3F3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
                04 // Letter
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 uppercase leading-[1.1] mb-8">
                A note on<br/>purpose
              </h2>
              <p className="text-2xl font-medium text-neutral-600 leading-relaxed">
                Some of the clearest moments in my life started as questions. This is one of them.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center pb-12">
            <div className="relative w-full max-w-2xl bg-[#FDFBF7] shadow-xl p-8 md:p-12 lg:p-16 transform -rotate-1 transition-transform hover:rotate-0">
              
              {/* Tape */}
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 backdrop-blur-sm shadow-sm rotate-2 z-20" />
              <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-24 h-8 bg-neutral-200/20 backdrop-blur-sm shadow-sm -rotate-1 z-20" />
              
              {/* Red Margin Line */}
              <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-red-400/40 z-0" />
              <div className="absolute top-0 bottom-0 left-[12.5%] w-[1px] bg-red-400/20 z-0" />

              {/* Ruled Lines Background */}
              <div className="absolute inset-0 z-0 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)',
                backgroundPosition: '0 40px'
              }} />

              {/* Letter Content */}
              <div className={`relative z-10 text-[1.4rem] md:text-[1.75rem] text-[#2a2a2a] ${caveat.className} leading-[40px] pl-[15%] pt-2`}>
                <p className="mb-[40px] font-bold">
                  A Letter from Michelle,
                </p>
                <p className="mb-[40px]">
                  Like most kids, I grew up wondering what I wanted to be when I got older.
                </p>
                <p className="mb-[40px]">
                  At one point or another, I dreamed of being a 3D animator, an engineer, an illustrator, even starting my own fashion brand. Looking back, all these dreams had one thing in common: I wanted to create things that made people feel something.
                </p>
                <p className="mb-[40px]">
                  But when it came time to choose a major in college, I found myself... stuck. I didn't know exactly what I wanted to do, I just knew I wanted to build things that mattered.
                </p>
                <p className="mb-[40px]">
                  That clarity didn't come until my first year at the University of Washington, when I managed to land one of the last two spots in an Informatics class. That class changed everything.
                </p>
                <p className="mb-[40px]">
                  For the first time, I learned that design isn't just about aesthetics, it's everywhere. It's in the shape of a door handle; the way subtitles appear on a screen. Suddenly, I started seeing design all around me, not just as art, but as systems created for people.
                </p>
                <p className="mb-[40px]">
                  That's when I found UX. It was the perfect blend of creativity and logic, research, systems thinking, and problem-solving all in one. I was hooked.
                </p>
                <p className="mb-[40px]">
                  Since then, I've thrown myself into every design project I could find. This portfolio is a reflection of my journey. Thanks for being here.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer / Toy */}
      <FooterSection />

    </main>
  )
}
