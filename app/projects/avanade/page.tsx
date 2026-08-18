'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import MouseParallaxImage from '@/components/MouseParallaxImage'
import MagneticButton from '@/components/MagneticButton'

export default function AvanadePage() {
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
 Case Study
 </p>
 <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
 OLTIVA AI
 </h1>
 <h2 className="text-lg font-medium text-neutral-500 mt-4 max-w-4xl leading-tight">
 Document Insights
 </h2>
    <p className="mt-6 text-lg text-neutral-500 font-normal max-w-2xl leading-relaxed">
 Improving clarity, task completion, and workflow alignment for 2,600+ sales representatives.
 </p>
 </motion.div>
 </header>

 {/* Hero Image */}
 <section className="px-6 md:px-12 lg:px-24 mb-24">
 <motion.div 
 className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-200 overflow-hidden border border-black/5 group"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
 >
 <MouseParallaxImage
 src="/images/oltiva-cover.jpg"
 alt="Oltiva AI Hero Image"
 containerClassName="w-full h-full"
 className="transition-all duration-700"
 priority={true}
 />
 </motion.div>
 </section>

  {/* Greeting */}
  <section className="px-6 md:px-12 lg:px-24 mb-16 flex justify-center">
    <div className="max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="flex-shrink-0">
        <img src="/images/about/bingo.png" alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border border-black/5" />
      </div>
      <p className="text-lg font-normal text-neutral-500 leading-relaxed md:pt-4 text-center md:text-left">
        Hey there! I know reviewing case studies can be exhausting. But stick with me — this isn't just another design story. It's about how we took an MVP that "looked like AI" but confused users, and transformed it into a predictable, guided experience that global sales teams actually trust using.
      </p>
    </div>
  </section>

 {/* Metadata Grid */}
 <section className="px-6 md:px-12 lg:px-24 mb-32">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-black/5 py-12">
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Role</h3>
 <p className="text-lg font-normal text-neutral-900">Lead Product Designer</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Timeline</h3>
 <p className="text-lg font-normal text-neutral-900">Jun – Aug 2023<br/>(3 months)</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Team</h3>
 <p className="text-lg font-normal text-neutral-900">3 PMs, 8 Engineers<br/>2 Product Designers</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Client</h3>
 <p className="text-lg font-normal text-neutral-900">Avanade<br/>(Accenture + Microsoft)</p>
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
 <a href="#snapshot" className="hover:text-neutral-900 transition-colors">Snapshot</a>
 </li>
 <li>
 <a href="#challenge" className="hover:text-neutral-900 transition-colors">The Challenge</a>
 </li>
 <li>
 <a href="#solution" className="hover:text-neutral-900 transition-colors">Solution</a>
 </li>
 <li>
 <a href="#impact" className="hover:text-neutral-900 transition-colors">Impact</a>
 </li>
 </ul>
 </div>
 </aside>

 {/* Main Content */}
 <div className="lg:w-3/4 max-w-4xl">
 
 <div id="snapshot" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">
 30-second Snapshot
 </h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p className="text-lg font-medium text-neutral-900">From confusion to confidence.</p>
 <p>
 Oltiva AI helps Avanade's global sales team extract insights from complex documents—proposals, SOWs, RFPs, and contracts.
 </p>
 <p>
 The initial MVP looked like AI, but didn't solve the underlying workflow problems. Users couldn't figure out where to start, and task completion languished at 70%. I led the redesign to transform a confusing demo into a guided, predictable experience that aligns with how sales reps actually work.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
 <div className="bg-[#FAFAFA] border border-black/10 p-6">
 <p className="text-2xl font-medium text-neutral-900 mb-2">95%</p>
 <p className="text-lg font-medium text-neutral-500">Task Completion</p>
 </div>
 <div className="bg-[#FAFAFA] border border-black/10 p-6">
 <p className="text-2xl font-medium text-neutral-900 mb-2">Approved</p>
 <p className="text-lg font-medium text-neutral-500">Stakeholder approval</p>
 </div>
 <div className="bg-[#1F3A5F] text-white p-6">
 <p className="text-2xl font-medium mb-2">Next Phase</p>
 <p className="text-lg font-medium text-neutral-500">Project advanced</p>
 </div>
 </div>

 <div className="bg-[#FAFAFA] border border-black/10 p-8 mt-12">
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Design Principles</h3>
 <ul className="space-y-6">
 <li><strong className="text-neutral-900">Predictable</strong> – Users should never wonder "what's next?" The path should be obvious.</li>
 <li><strong className="text-neutral-900">Guided</strong> – Lead users through the workflow, don't abandon them on a blank canvas.</li>
 <li><strong className="text-neutral-900">Searchable</strong> – Everything should be findable later. Nothing disappears.</li>
 <li><strong className="text-neutral-900">Sales-oriented</strong> – Speak the user's language, solve their actual problems, not technical possibilities.</li>
 </ul>
 </div>
 </div>
 </div>

 <div id="challenge" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">The Challenge
 </h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p className="text-lg font-medium text-neutral-900">
 An MVP That Looked Like AI, But Didn't Work Like One
 </p>
 <p>
 Avanade's sales team relies on dense, complex documents to close deals. Oltiva AI was built to help them surface insights instantly—but the initial demo created more confusion than clarity.
 </p>
 <p>
 When I tested the original demo with 5 sales reps, four critical issues emerged from <strong>Iteration 1: Everything on One Screen</strong>:
 </p>
 
 <div className="mt-8 mb-12 border border-black/5 bg-neutral-100 overflow-hidden">
 <div className="bg-red-500/10 text-red-700 text-lg font-medium p-4 border-b border-red-500/20">Iteration 1: Confusing MVP</div>
 <img src="/images/avanade/old_demo.png" alt="Original MVP Demo" className="w-full h-auto" />
 </div>

 <ul className="space-y-4 list-none">
 <li className="flex gap-4"><span className="text-neutral-500">⚠️</span> <span><strong>No clear next step</strong> – Users landed on the screen and didn't know where to click first.</span></li>
 <li className="flex gap-4"><span className="text-neutral-500">⚠️</span> <span><strong>Guiding questions didn't match reality</strong> – The AI's prompts reflected how developers thought, not how sales reps work.</span></li>
 <li className="flex gap-4"><span className="text-neutral-500">⚠️</span> <span><strong>Accessibility issues</strong> – Low contrast and small targets made the demo difficult for some users.</span></li>
 <li className="flex gap-4"><span className="text-neutral-500">⚠️</span> <span><strong>No way to use real files</strong> – Users couldn't upload their own documents, so they couldn't validate if the tool actually helped.</span></li>
 </ul>

 <div className="border-l-4 border-[#1F3A5F] pl-6 py-4 my-12 bg-[#B1CDE0]/10">
 <p className="text-2xl italic text-neutral-900 mb-2">"I don't know where to start."</p>
 <p className="text-lg font-medium text-neutral-500">— Sales rep, during usability testing</p>
 </div>

 <div>
 <h3 className="text-2xl font-medium text-neutral-900 mb-4">Root Problem</h3>
 <p>
 The surface problem was confusion. The root problem was deeper: the flow didn't match the user's mental model.
 </p>
 </div>
 </div>
 </div>

 <div id="solution" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">Solution
 </h2>
 <div className="space-y-8 text-lg text-neutral-500 leading-relaxed font-normal">
 <p className="text-lg font-medium text-neutral-900">
 Final Design: A Guided AI Experience
 </p>
 <p>
 The final design feels less like "using a tool" and more like working with a knowledgeable assistant. Every decision ties back to the four issues uncovered in testing.
 </p>

 <div className="space-y-12 mt-12">
 <div className="bg-[#FAFAFA] border border-black/10 p-8">
 <h3 className="text-lg font-medium text-neutral-900 mb-2">Feature 1 — One-Click File Access</h3>
 <p className="text-lg font-medium text-neutral-500 mb-2">Solving: "No upload option meant users couldn't try it with real files"</p>
 <p>
 Users can upload from desktop or choose from the enterprise document hub—no digging required. The entry point is immediate and obvious.
 </p>
 <div className="mt-8 border border-black/10 bg-[#FAFAFA] shadow-lg overflow-hidden">
 <video autoPlay loop muted playsInline className="w-full h-auto">
 <source src="/images/avanade/feature1.mp4" type="video/mp4" />
 </video>
 </div>
 </div>

 <div className="bg-[#FAFAFA] border border-black/10 p-8">
 <h3 className="text-lg font-medium text-neutral-900 mb-2">Feature 2 — Real-World Search Prompts</h3>
 <p className="text-lg font-medium text-neutral-500 mb-2">Solving: "Guiding questions didn't match reality"</p>
 <p>
 Instead of generic AI prompts like "Summarize this," the system suggests role-specific queries derived from actual sales workflows, like "Find objection handling points for competitors."
 </p>
 <div className="mt-8 border border-black/10 bg-[#FAFAFA] shadow-lg overflow-hidden">
 <video autoPlay loop muted playsInline className="w-full h-auto">
 <source src="/images/avanade/feature2.mp4" type="video/mp4" />
 </video>
 </div>
 </div>

 <div className="bg-[#FAFAFA] border border-black/10 p-8">
 <h3 className="text-lg font-medium text-neutral-900 mb-2">Feature 3 — Side-by-Side Reading View</h3>
 <p className="text-lg font-medium text-neutral-500 mb-2">Solving: "No clear next step & Accessibility issues"</p>
 <p>
 AI responses aren't trusted if they can't be verified. I designed a split-view interface where the AI insight highlights the exact source text in the original document, establishing immediate trust.
 </p>
 <div className="mt-8 border border-black/10 bg-[#FAFAFA] shadow-lg overflow-hidden">
 <video autoPlay loop muted playsInline className="w-full h-auto">
 <source src="/images/avanade/feature3.mp4" type="video/mp4" />
 </video>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div id="impact" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">Impact
 </h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p className="text-lg font-medium text-neutral-900">
 From Confusion to Confidence
 </p>
 <p>
 The redesign transformed both user behavior and stakeholder confidence.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
 <div className=" pt-6">
 <h4 className="font-bold text-neutral-900 text-lg mb-2">95% Task Completion</h4>
 <p>Task completion on core flow (up from 70%).</p>
 </div>
 <div className=" pt-6">
 <h4 className="font-bold text-neutral-900 text-lg mb-2">Hesitation Eliminated</h4>
 <p>Reps now click immediately without confusion.</p>
 </div>
 <div className=" pt-6">
 <h4 className="font-bold text-neutral-900 text-lg mb-2">Accessibility</h4>
 <p>Issues resolved through contrast & touch targets.</p>
 </div>
 </div>

 <div className="bg-[#FAFAFA] border border-black/10 p-8 mt-12">
 <h3 className="text-2xl font-medium text-neutral-900 mb-4">Business Impact</h3>
 <ul className="space-y-4 list-disc pl-6">
 <li>The redesigned concept secured unanimous approval from sales leadership (the "Clinicians" review board).</li>
 <li>Project received greenlight to advance to the next phase.</li>
 <li>Foundation established for rollout to 2,600+ sales representatives.</li>
 </ul>
 </div>

 <div className="border-l-4 border-neutral-900 pl-6 py-4 my-12 bg-neutral-50">
 <p className="text-2xl italic text-neutral-900 mb-2">"Finally—I know exactly what to do."</p>
 <p className="text-lg font-medium text-neutral-500">— Sales rep, post-redesign testing</p>
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
 <Link href="/projects/bestmylife" className="group flex flex-col items-center cursor-pointer">
 <h2 className="text-2xl font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors">
 Bestmylife
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

 <Link href="/projects/omnireflex" className="group flex flex-col items-center cursor-pointer">
 <h2 className="text-2xl font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors">
 UNIMO
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
