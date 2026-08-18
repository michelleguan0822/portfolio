'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Playfair_Display } from 'next/font/google'
import MagneticButton from '@/components/MagneticButton'
import FooterSection from '@/components/FooterSection'
import { motion } from 'framer-motion'

const serif = Playfair_Display({ 
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600']
})

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#FDFBF7] text-[#2c2b29] overflow-hidden" style={{
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' // subtle paper texture overlay
    }}>
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

      {/* Editorial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[100vw]">
        
        {/* Left Column: Text (Sticky) */}
        <div className="lg:col-span-5 px-8 md:px-16 pt-32 pb-16 lg:py-0 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center border-r border-[#e8e6e1] z-10 bg-[#FDFBF7]/90 backdrop-blur-sm">
          
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9a958b] mb-2">
              Folding interaction into logic
            </p>
            <h1 className={`${serif.className} text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-[#2c2b29]`}>
              I think of design as a place <br/>
              where <span className="text-[#a03d36] italic">thought can be held</span>.
            </h1>
          </div>

          <div className="space-y-6 text-[15px] md:text-[17px] leading-[1.8] text-[#5c5a55] font-medium max-w-md">
            <p>
              A screen gives feeling a surface. A component gives memory a rhythm. 
              Binding logic turns scattered fragments into something that can be touched, opened, paused, and returned to.
            </p>
            <p>
              I am drawn to the way digital matter carries time. Each interaction waits for the next, 
              each screen meets another through sequence, distance, and silence.
            </p>
            <p>
              What begins as a wireframe, a line of code, a trace—becomes a small body of its own: 
              fragile, portable, and alive between touch and thought. 
            </p>
          </div>
          
          <div className="mt-16">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9a958b]">
              — Michelle Guan
            </p>
          </div>
        </div>

        {/* Right Column: Collage (Scrollable) */}
        <div className="lg:col-span-7 relative min-h-screen py-32 px-8 md:px-12 bg-[#FDFBF7]">
          
          {/* Top Right Chapter Marker */}
          <div className="absolute top-12 right-12 text-right hidden lg:block">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9a958b]">
              CHAPTER 01 / THE MAKER
            </p>
          </div>

          {/* Collage Container */}
          <div className="relative w-full max-w-4xl mx-auto h-[1800px]">
            
            {/* Collage Item 1: Vibe Coding */}
            <motion.div 
              className="absolute top-0 right-0 md:right-[10%] w-[60%] md:w-[45%] z-20"
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="bg-white p-3 pb-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-[#e8e6e1]">
                <img src="/images/about/vibe_coding.png" alt="Avatar sketch" className="w-full h-auto grayscale opacity-80" />
                <p className={`${serif.className} text-center text-sm text-[#8c8880] mt-4 italic`}>Self portrait, developing</p>
              </div>
            </motion.div>

            {/* Collage Item 2: Design Inspiration */}
            <motion.div 
              className="absolute top-[250px] left-0 md:left-[5%] w-[70%] md:w-[55%] z-10"
              initial={{ opacity: 0, x: -50, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: -4 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative group">
                <img src="/images/about/design.jpg" alt="Design inspiration" className="w-full h-auto shadow-[0_30px_50px_-20px_rgba(0,0,0,0.15)] border-4 border-white grayscale hover:grayscale-0 transition-all duration-700" />
                <p className={`${serif.className} absolute -bottom-8 left-4 text-sm text-[#8c8880] italic`}>Visual fragments & palettes</p>
              </div>
            </motion.div>

            {/* Collage Item 3: Lego (Tape effect) */}
            <motion.div 
              className="absolute top-[700px] right-[5%] md:right-[15%] w-[50%] md:w-[40%] z-30"
              initial={{ opacity: 0, y: 100, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative bg-[#f4f2eb] p-2 shadow-lg">
                {/* Masking tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm rotate-[-4deg] shadow-sm z-40" />
                <img src="/images/about/lego.jpg" alt="Lego building" className="w-full h-auto grayscale mix-blend-multiply opacity-80" />
                <p className={`${serif.className} text-center text-xs text-[#8c8880] mt-3 italic`}>Builder at heart.</p>
              </div>
            </motion.div>

            {/* Collage Item 4: Hamster */}
            <motion.div 
              className="absolute top-[950px] left-[10%] md:left-[20%] w-[35%] md:w-[25%] z-20"
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                <img src="/images/about/hamster.jpg" alt="Hamster" className="w-full h-auto rounded-full shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] border-[6px] border-white grayscale" />
                <p className={`${serif.className} absolute -bottom-6 -right-12 w-48 text-xs text-[#a03d36] italic`}>* Chief Morale Officer</p>
              </div>
            </motion.div>

            {/* Collage Item 5: Golf */}
            <motion.div 
              className="absolute top-[1200px] right-0 md:right-[5%] w-[80%] md:w-[60%] z-10"
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="bg-white p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]">
                <img src="/images/about/golf.jpg" alt="Golfing" className="w-full h-auto grayscale opacity-90" />
                <div className="flex justify-between items-center mt-4 px-2">
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#9a958b]">Weekend Routine</p>
                  <p className={`${serif.className} text-sm text-[#8c8880] italic`}>Nature, unfolding</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Editorial Timeline (Bottom Full Width) */}
      <div className="max-w-[100vw] bg-[#FDFBF7] border-t border-[#e8e6e1] px-8 md:px-16 lg:px-32 py-32 relative z-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9a958b] mb-16 text-center">
            CHAPTER 02 / THE JOURNEY
          </p>
          
          <div className="space-y-16">
            {[
              { date: "2025—Present", role: "Design Engineer", company: "Omnireflex", desc: "Architected conversational AI experiences and owned the SwiftUI design system from concept to production." },
              { date: "2026—Present", role: "Independent Creator", company: "Body Interaction", desc: "Engineered gesture-driven browser interactions using MediaPipe and WebGL, growing a community." },
              { date: "2025", role: "Product Designer", company: "Bestmylife", desc: "Translated ambiguous clinical requirements into coded React prototypes, aligning stakeholders." },
              { date: "2024—2025", role: "Product Designer", company: "Impulse", desc: "Redesigned core daily habit loops to significantly reduce completion time and boost engagement." },
              { date: "2023", role: "AI Product Design Intern", company: "Avanade", desc: "Streamlined AI-driven document workflows and delivered cross-platform design specifications." }
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 group">
                <div className="md:col-span-3">
                  <p className={`${serif.className} text-xl text-[#a03d36] italic`}>{item.date}</p>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#2c2b29] mb-1">{item.role}</h3>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9a958b]">{item.company}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-[14px] leading-[1.8] text-[#5c5a55] font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
