'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import MouseParallaxImage from '@/components/MouseParallaxImage'
import MagneticButton from '@/components/MagneticButton'

export default function BestmylifePage() {
 const containerRef = useRef<HTMLDivElement>(null)

 return (
 <main ref={containerRef} className="relative min-h-screen bg-[#FAFAFA] pb-32">
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

 {/* Hero Header */}
 <header className="pt-48 pb-16 px-6 md:px-12 lg:px-24">
 <motion.div
 initial={{ opacity: 0, y: 50 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: 'easeOut' }}
 >
 <p className="text-lg font-medium text-neutral-500 mb-8">
 Product Design
 </p>
 <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
 BESTMYLIFE
 </h1>
 <h2 className="text-lg font-medium text-neutral-500 mt-4 max-w-4xl leading-tight">
 Bridging the Trust Gap for TMS Clinical Research
 </h2>
    <p className="mt-6 text-lg text-neutral-500 font-normal max-w-2xl leading-relaxed">
 Redesigned the dashboard interface to improve clinicians’ research efficiency and unlock funding for the next phase.
 </p>
 </motion.div>
 </header>

 {/* Hero Image */}
 <section className="px-6 md:px-12 lg:px-24 mb-24">
 <motion.div 
 className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#070B14] overflow-hidden border border-black/5 group"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
 >
 {/* Deep blue/cyan abstract background glow */}
 <div className="absolute w-[80%] aspect-square rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
 <div className="absolute right-[-10%] bottom-[-10%] w-[50%] aspect-square rounded-full bg-cyan-500/20 blur-[80px] pointer-events-none" />
 
 <div className="absolute inset-0 flex items-center justify-center">
 {/* Desktop Window Frame */}
 <div className="relative w-[85%] rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-700 ease-out bg-[#1A1A1A]">
 {/* macOS Window Bar */}
 <div className="w-full h-6 bg-[#2D2D2D] border-b border-black/20 flex items-center px-3 gap-1.5">
 <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
 <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
 </div>
 <img src="/images/bestmylife-cover.png" alt="Desktop Interface" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
 </div>
 </div>
 </motion.div>
 </section>

 {/* Greeting */}
  {/* Greeting */}
  <section className="px-6 md:px-12 lg:px-24 mb-16 flex justify-center">
    <div className="max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="flex-shrink-0">
        <img src="/images/about/thumb_up.png" alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border border-black/5" />
      </div>
      <p className="text-lg font-normal text-neutral-500 leading-relaxed md:pt-4 text-center md:text-left">
        Hey there! I know reviewing case studies can be exhausting. But stick with me — this isn't just another design story. It's about how we took a clinical dashboard that was rejected three times for lacking "credibility" and reframed it into a highly-trusted cockpit system that secured Phase 2 funding.
      </p>
    </div>
  </section>

 {/* Metadata Grid */}
 <section className="px-6 md:px-12 lg:px-24 mb-32">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-black/5 py-12">
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Role</h3>
 <p className="text-lg font-normal text-neutral-900">Product Designer</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Timeline</h3>
 <p className="text-lg font-normal text-neutral-900">Feb – Mar 2025<br/>5 Weeks</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Team</h3>
 <p className="text-lg font-normal text-neutral-900">1 PM, 2 Designers<br/>Clinical Experts</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Client</h3>
 <p className="text-lg font-normal text-neutral-900">Shenzhen People’s Hospital<br/>Stanford Mentors</p>
 </div>
 </div>
 </section>

 {/* Long-form Content with TOC */}
 <section className="px-6 md:px-12 lg:px-24 mb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
 {/* Table of Contents (Sticky) */}
 <aside className="lg:w-1/4 hidden lg:block">
 <div className="sticky top-32">
 <h4 className="text-lg font-medium text-neutral-900 mb-4">Contents</h4>
 <ul className="space-y-3 text-lg font-normal text-neutral-500">
 <li>
 <a href="#tldr" className="hover:text-neutral-900 transition-colors">TL;DR</a>
 </li>
 <li>
 <a href="#context" className="hover:text-neutral-900 transition-colors">Context</a>
 </li>
 <li>
 <a href="#challenge" className="hover:text-neutral-900 transition-colors">The Challenge</a>
 </li>
 <li>
 <a href="#solution" className="hover:text-neutral-900 transition-colors">The Solution</a>
 </li>
 <li>
 <a href="#impact" className="hover:text-neutral-900 transition-colors">Impact & Outcome</a>
 </li>
 </ul>
 </div>
 </aside>

 {/* Main Content */}
 <div className="lg:w-3/4 max-w-4xl">
 
 <div id="tldr" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">
 TL;DR: Bridging the Trust Gap
 </h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>
 I redesigned a TMS (Transcranial Magnetic Stimulation) dashboard that had been rejected three times due to a lack of visual credibility. When stakeholders asked for “sci-fi vibes,” I reframed it into a clinical authority system focused on precision, safety cues, and cognitive clarity. The redesign helped the project pass a national clinician vote and secure Phase 2 live-data integration approval.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
 <div className="bg-[#FAFAFA] border border-black/10 p-6">
 <p className="text-2xl font-medium text-neutral-900 mb-2">3×</p>
 <p className="text-lg font-medium text-neutral-500">Rejected in review cycles</p>
 </div>
 <div className="bg-[#FAFAFA] border border-black/10 p-6">
 <p className="text-2xl font-medium text-neutral-900 mb-2">5 wks</p>
 <p className="text-lg font-medium text-neutral-500">End-to-end redesign</p>
 </div>
 <div className="bg-[#1F3A5F] text-white p-6">
 <p className="text-2xl font-medium mb-2">Phase 2</p>
 <p className="text-lg font-medium text-white/70">Approved for live-data</p>
 </div>
 </div>

 <p>
 <strong>Before → After:</strong> The original interface was functional but visually noisy—dense panels, unclear hierarchy, and a generic UI feel. The redesign reframed the product into a disciplined Dark Cockpit system where contrast, spacing, and active-state logic communicate control and readiness.
 </p>
 </div>
 </div>

 <div id="context" className="scroll-mt-32 mt-20">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Context</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">Dashboards represent credibility.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>
 Shenzhen People's Hospital runs national TMS training programs where clinicians rely on real-time data to verify stimulation targets.
 </p>
 <p>
 This interface is part of a critical medical workflow—clarity and credibility directly dictate user adoption and safety.
 </p>
 </div>
 </div>

 <div id="challenge" className="scroll-mt-32 mt-20">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">The Challenge</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">The demo worked, but didn't feel safe.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>
 Over two months, the functional prototype was rejected three times by stakeholders who found it "cluttered" and "unprofessional."
 </p>
 <p>
 They hesitated to approve it for live patient data because the visual design failed to inspire clinical confidence.
 </p>
 <div className="mt-12 border border-black/5 bg-neutral-100 overflow-hidden rounded-2xl">
 <div className="bg-red-500/10 text-red-700 text-sm font-bold uppercase tracking-wider p-4 border-b border-red-500/20">Before: Original Rejected Demo</div>
 <img src="/images/tms/old_demo.png" alt="Original Demo" className="w-full h-auto" />
 </div>
 </div>
 </div>
 </div>

 <div id="solution" className="scroll-mt-32 mt-20">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">The Solution</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">The "Dark Cockpit" Authority System.</h2>
 <div className="space-y-12 text-lg text-neutral-500 leading-relaxed font-normal">
 <div>
 <p>
 I shifted from a generic light theme to a controlled dark palette, directly inspired by medical imaging software and cockpit interfaces.
 </p>
 <div className="my-12 border border-black/10 bg-[#0A1A2F] p-4 rounded-3xl shadow-2xl overflow-hidden">
 <div className="bg-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider p-4 mb-4 border-b border-emerald-500/20 rounded-xl">After: Final Approved Cockpit</div>
 <img src="/images/tms/final_demo.png" alt="Final Demo" className="w-full h-auto rounded-xl" />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   <div>
     <h3 className="text-base font-bold text-neutral-900 mb-3">Deep Navy Core</h3>
     <p className="text-sm text-neutral-500 leading-relaxed font-normal">Creates focus, reduces glare, and signals precise technology. Dark environments communicate serious medical authority.</p>
   </div>
   <div>
     <h3 className="text-base font-bold text-neutral-900 mb-3">Workflow-Driven Layout</h3>
     <p className="text-sm text-neutral-500 leading-relaxed font-normal">Restructured the dashboard to mirror clinical flow: scan 3D brain, verify parameters, and execute controls.</p>
   </div>
   <div>
     <h3 className="text-base font-bold text-neutral-900 mb-3">Rapid Scanning Hierarchy</h3>
     <p className="text-sm text-neutral-500 leading-relaxed font-normal">Electric blue active states and progressive disclosure reduced cognitive load, allowing clinicians to parse data in seconds.</p>
   </div>
 </div>
 </div>
 </div>
 </div>

 <div>
 <h3 className="text-lg font-medium text-neutral-900 mb-4">Visual Hierarchy for Rapid Scanning</h3>
 <ul className="list-disc pl-6 space-y-2">
 <li>Data density increased, but cognitive load decreased — By grouping related information and using consistent spacing, clinicians can now parse the screen in seconds.</li>
 <li>Active states are unmistakable — When a parameter is selected or stimulation is running, the Electric Blue highlight leaves no ambiguity.</li>
 <li>Progressive disclosure — Advanced settings are available but tucked away, reducing noise for the primary workflow.</li>
 </ul>
 </div>
 </div>
 </div>

 <div id="impact" className="scroll-mt-32 mt-20">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Impact</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">Unblocking the future.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>
 The redesign shifted stakeholder perception from skepticism to confidence, doing what code alone couldn't.
 </p>
 <p>
 It successfully cleared the path for real-world adoption in national training workshops.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
   <div className="border-t border-black/10 pt-6">
     <h4 className="font-bold text-neutral-900 text-2xl mb-2">Phase 2</h4>
     <p className="text-sm text-neutral-500">Unblocked and approved for live-data integration funding.</p>
   </div>
   <div className="border-t border-black/10 pt-6">
     <h4 className="font-bold text-neutral-900 text-2xl mb-2">Adopted</h4>
     <p className="text-sm text-neutral-500">Passed vote for use in national training workshops.</p>
   </div>
   <div className="border-t border-black/10 pt-6">
     <h4 className="font-bold text-neutral-900 text-2xl mb-2">Credible</h4>
     <p className="text-sm text-neutral-500">Mentors felt authoritative presenting the system.</p>
   </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 </div>
 </section>

 {/* Next Project CTA */}
 <section className="px-6 md:px-12 lg:px-24  pt-32">
 <p className="text-lg font-medium text-neutral-500 mb-16 text-center">
 More Projects
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-center">
 <Link href="/projects/omnireflex" className="group flex flex-col items-center cursor-pointer">
 <h2 className="text-2xl font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors">
 Omnireflex
 </h2>
 <MagneticButton 
 className="mt-8 w-16 h-16 bg-[#1F3A5F] hover:bg-[#4D7298] transition-colors flex items-center justify-center text-white"
 style={{
 clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)'
 }}
 >
 <ArrowUpRight className="w-8 h-8" />
 </MagneticButton>
 </Link>

 <Link href="/projects/avanade" className="group flex flex-col items-center cursor-pointer">
 <h2 className="text-2xl font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors">
 Oltiva AI
 </h2>
 <MagneticButton 
 className="mt-8 w-16 h-16 bg-[#1F3A5F] hover:bg-[#4D7298] transition-colors flex items-center justify-center text-white"
 style={{
 clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)'
 }}
 >
 <ArrowUpRight className="w-8 h-8" />
 </MagneticButton>
 </Link>
 </div>
 </section>

 </main>
 )
}
