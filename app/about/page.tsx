'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '@/components/MagneticButton'
import MouseParallaxImage from '@/components/MouseParallaxImage'
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

      {/* HERO SECTION: Minimalist & Clean */}
      <section className="relative pt-48 pb-24 px-6 md:px-12 lg:px-24 border-b border-black/10">
        <div className="max-w-[90vw] relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-12">
            01 // Manifesto
          </p>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-neutral-900 uppercase max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            I build things that make people feel something.
          </motion.h1>
          <motion.p 
            className="mt-8 text-lg font-medium text-neutral-500 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            A Product Designer blending empathy, systems thinking, and elegant interaction to solve complex human problems.
          </motion.p>
        </div>
      </section>

      {/* BENTO GRID: Elegant Structure */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[#FAFAFA]">
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
            02 // The Maker
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 uppercase">
            Beyond the screen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          
          {/* Origin Story */}
          <div className="col-span-1 md:col-span-8 bg-white border border-black/5 rounded-[2rem] p-12 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 uppercase mb-6">Origin Story</h3>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl">
                I grew up wanting to be an illustrator, an engineer, and even a fashion designer. 
                When I found UX, it was the perfect blend of creativity, logic, and systems thinking. 
                Today, I seize my destiny by pushing the boundaries of interaction design and emotional AI.
              </p>
            </div>
            <div className="flex justify-end">
               <img src="/images/about/vibe_coding.png" alt="Michelle Avatar" className="w-40 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            </div>
          </div>

          {/* Inspiration: Design */}
          <div className="col-span-1 md:col-span-4 bg-white border border-black/5 rounded-[2rem] overflow-hidden relative shadow-sm group">
            <div className="absolute inset-0 w-full h-full">
              <MouseParallaxImage
                src="/images/about/design.jpg"
                alt="Design Inspiration"
                containerClassName="w-full h-full"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-6 left-6 mix-blend-difference text-white">
              <p className="text-[10px] font-bold tracking-widest uppercase">Visual Crafts</p>
            </div>
          </div>

          {/* Hobbies: Lego */}
          <div className="col-span-1 md:col-span-4 bg-white border border-black/5 rounded-[2rem] overflow-hidden relative shadow-sm group">
             <div className="absolute inset-0 w-full h-full">
              <MouseParallaxImage
                src="/images/about/lego.jpg"
                alt="Lego"
                containerClassName="w-full h-full"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <p className="text-[10px] font-bold text-neutral-900 tracking-widest uppercase">Builder at heart</p>
            </div>
          </div>

          {/* Hobbies: Golf */}
          <div className="col-span-1 md:col-span-4 bg-white border border-black/5 rounded-[2rem] overflow-hidden relative shadow-sm group">
             <div className="absolute inset-0 w-full h-full">
              <MouseParallaxImage
                src="/images/about/golf.jpg"
                alt="Golf"
                containerClassName="w-full h-full"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-6 left-6 mix-blend-difference text-white">
              <p className="text-[10px] font-bold tracking-widest uppercase">Weekend Routine</p>
            </div>
          </div>
          
          {/* Pet */}
          <div className="col-span-1 md:col-span-4 bg-white border border-black/5 rounded-[2rem] p-8 flex flex-col items-center justify-center relative shadow-sm">
             <img src="/images/about/hamster.jpg" alt="Hamster" className="w-32 h-32 object-cover rounded-full shadow-lg mb-6 hover:scale-110 transition-transform duration-500" />
             <p className="text-sm font-bold text-neutral-900 uppercase tracking-widest text-center">Chief Morale Officer</p>
             <p className="text-xs text-neutral-400 mt-2">Always inspecting the code</p>
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
