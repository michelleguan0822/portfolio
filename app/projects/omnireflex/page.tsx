'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import MouseParallaxImage from '@/components/MouseParallaxImage'
import MagneticButton from '@/components/MagneticButton'
import ProcessDiagram from '@/components/ProcessDiagram'

export default function OmnireflexPage() {
 const containerRef = useRef<HTMLDivElement>(null)
 const [activeSection, setActiveSection] = useState('overview')

 useEffect(() => {
   const observer = new IntersectionObserver(
     (entries) => {
       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           setActiveSection(entry.target.id)
         }
       })
     },
     { rootMargin: '-20% 0px -80% 0px' }
   )

   const sections = ['overview', 'product-goal', 'core-problems', 'impact', 'design-challenge-01', 'design-challenge-02', 'design-system', 'next-steps']
   sections.forEach((id) => {
     const element = document.getElementById(id)
     if (element) observer.observe(element)
   })

   return () => observer.disconnect()
 }, [])

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
 <p className="text-lg font-bold text-neutral-400 mb-8 uppercase tracking-widest text-xs flex gap-4">
 <span>AI Companion</span>
 <span>•</span>
 <span>Emotional Reflection</span>
 <span>•</span>
 <span>iOS Product</span>
 </p>
 <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">
 UNIMO
 </h1>
 <p className="text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
 An AI emotional companion that helps users turn meaningful conversations into collectible Emotion Cards.
 </p>
 </motion.div>
 </header>

 {/* Hero Image */}
 <section className="px-6 md:px-12 lg:px-24 mb-24">
 <motion.div 
 className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#F3F0F8] overflow-hidden border border-black/5 group"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
 >
 {/* Geometric decorations */}
 <div className="absolute top-[-30%] left-[-10%] w-[60%] aspect-square rounded-full bg-[#E3D9F0] blur-3xl opacity-60 pointer-events-none" />
 <div className="absolute bottom-[-30%] right-[-10%] w-[60%] aspect-square rounded-full bg-[#FFE5E5] blur-3xl opacity-60 pointer-events-none" />
 
 {/* Screenshots */}
 <div className="relative w-full h-full flex items-center justify-center">
 {/* Left Phone */}
 <div className="absolute w-[20%] md:w-[15%] -ml-[30%] md:-ml-[25%] mt-[8%] transform rotate-[-8deg] group-hover:rotate-[-12deg] group-hover:-ml-[35%] md:group-hover:-ml-[28%] transition-all duration-700 ease-out z-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border-[6px] border-white">
 <img src="/images/unimo2.png" alt="UNIMO 2" className="w-full h-auto" />
 </div>
 
 {/* Center Phone */}
 <div className="absolute w-[22%] md:w-[18%] z-30 shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden border-[8px] border-white group-hover:-translate-y-6 transition-transform duration-700 ease-out">
 <img src="/images/unimo1.png" alt="UNIMO 1" className="w-full h-auto" />
 </div>
 
 {/* Right Phone */}
 <div className="absolute w-[20%] md:w-[15%] ml-[30%] md:ml-[25%] mt-[4%] transform rotate-[6deg] group-hover:rotate-[10deg] group-hover:ml-[35%] md:group-hover:ml-[28%] transition-all duration-700 ease-out z-20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border-[6px] border-white">
 <img src="/images/unimo3.png" alt="UNIMO 3" className="w-full h-auto" />
 </div>
 </div>
 </motion.div>
 </section>

 {/* Long-form Content with TOC */}
 <section className="px-6 md:px-12 lg:px-24 mb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
 
 {/* Table of Contents (Sticky) */}
 <aside className="lg:w-1/4 hidden lg:block">
 <div className="sticky top-32">
 <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Contents</h4>
 <ul className="space-y-4 text-sm font-medium tracking-wider">
 {
  [
    {id: 'overview', label: 'OVERVIEW'},
    {id: 'product-goal', label: 'PRODUCT GOAL'},
    {id: 'core-problems', label: 'CORE PROBLEMS'},
    {id: 'impact', label: 'IMPACT'},
    {id: 'design-challenge-01', label: 'DESIGN CHALLENGE 01'},
    {id: 'design-challenge-02', label: 'DESIGN CHALLENGE 02'},
    {id: 'design-system', label: 'DESIGN SYSTEM'},
    {id: 'next-steps', label: 'NEXT STEPS'}
  ].map((section) => (
 <li key={section.id}>
 <a 
 href={`#${section.id}`}
 className={`transition-colors ${activeSection === section.id ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
 >
 {section.label}
 </a>
 </li>
 ))}
 </ul>
 </div>
 </aside>

 {/* Main Content */}
 <div className="lg:w-3/4 max-w-4xl space-y-32">
 
 {/* OVERVIEW */}
 <div id="overview" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Overview</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">An AI emotional companion that helps users keep the moments that matter.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>UNIMO identifies meaningful moments from a conversation and transforms them into visual cards that users can save and revisit.</p>
 <p>I contributed to the product from experience design to production implementation, including the card creation flow, SwiftUI design system, API integration, and system states.</p>
 
 {/* Meta Grid */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 mt-8 border-y border-black/5">
 <div>
 <h3 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">Role</h3>
 <p className="text-base text-neutral-500">Design Engineer</p>
 </div>
 <div>
 <h3 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">Skills</h3>
 <p className="text-base text-neutral-500">Product Strategy<br/>Interaction Design<br/>Design System<br/>SwiftUI Development<br/>API Integration</p>
 </div>
 <div>
 <h3 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">Duration</h3>
 <p className="text-base text-neutral-500">Jun 2025 to Present</p>
 </div>
 <div>
 <h3 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">Tools</h3>
 <p className="text-base text-neutral-500">Figma<br/>SwiftUI</p>
 </div>
 </div>
 </div>
 </div>

 {/* PRODUCT GOAL */}
 <div id="product-goal" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Product Goal</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Make emotional reflection easier to revisit.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>Most AI companions keep important moments inside long chat histories.</p>
 <p>We wanted to create a more visual experience that helps users identify one meaningful moment, understand why it mattered, and turn it into something they can keep.</p>
 <p>The product also needed to make emotional reflection feel simple and approachable for users who did not want to write a long journal entry.</p>
 </div>
 </div>

 {/* CORE PROBLEMS */}
 <div id="core-problems" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Core Problems</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">Users did not understand how conversations became Emotion Cards.</h2>
 <div className="space-y-12 text-lg text-neutral-500 leading-relaxed font-normal">
 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">The card entry point was unclear</h3>
 <p>Many users did not know when or how they could create a card after a conversation.</p>
 </div>
 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Card access depended on chance</h3>
 <p>Users first had to receive a random opportunity to roll the dice. The result then determined whether they could enter the card lottery.</p>
 </div>
 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Users had no control</h3>
 <p>Even after unlocking a card, users could not choose which part of the conversation the card would represent.</p>
 </div>
 </div>
 </div>

 {/* IMPACT */}
 <div id="impact" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Impact</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Results in four metrics.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/10 my-8">
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-1">442</p>
 <p className="text-sm font-medium text-neutral-500">Beta Users</p>
 </div>
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-1">18%</p>
 <p className="text-sm font-medium text-neutral-500">Higher Completion</p>
 </div>
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-1">800+</p>
 <p className="text-sm font-medium text-neutral-500">Cards Created</p>
 </div>
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-1">26</p>
 <p className="text-sm font-medium text-neutral-500">SwiftUI Components</p>
 </div>
 </div>
 <p className="text-xl font-medium text-neutral-900">More than 267 users created at least one Emotion Card.</p>
 </div>
 </div>

 {/* DESIGN CHALLENGE 01 */}
 <div id="design-challenge-01" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Design Challenge 01</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">HMW replace a random reward flow with a clear and controllable card creation experience?</h2>
 <div className="space-y-12 text-lg text-neutral-500 leading-relaxed font-normal">
 <div>
 <p>The original experience treated Emotion Cards as random rewards.</p>
 <p className="mt-4">After chatting with UNIMO, users occasionally received an opportunity to roll the dice. The result gave them a chance to enter a lottery and unlock a card. Only then could the card be generated.</p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Initial Flow</h3>
 <p>A conversation did not clearly lead to a card.</p>
 <p className="mt-4">User testing showed that many users did not understand how this flow worked. They could not tell when the dice would appear, what affected the result, or how the final card related to their conversation.</p>
 <p className="mt-4">The experience was playful, but it made the core value of the card difficult to discover.</p>
 <img src="/images/unimo/Old.png" alt="Initial Flow UI" className="w-full h-auto rounded-3xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] my-12" />
 <ProcessDiagram flow="initial" />
 </div>

 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Simplify the Experience</h3>
 <p>Give users a clear path from conversation to card.</p>
 <p className="mt-4">I removed the random dice and lottery flow and replaced it with a guided selection process.</p>
 <ul className="list-disc pl-5 space-y-2 mt-4">
 <li>The AI first identifies 10 meaningful sentences from the conversation.</li>
 <li>It then helps the user narrow them to five stronger moments.</li>
 <li>The user selects one final moment for the Emotion Card.</li>
 </ul>
 <p className="mt-4">This made the relationship between the conversation and the final card easier to understand.</p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Final Design</h3>
 <p>Give the AI responsibility while keeping the final choice with the user.</p>
 <p className="mt-4">The redesigned experience guides users through three clear steps:</p>
 <ul className="list-disc pl-5 space-y-2 mt-4">
 <li>Review 10 meaningful sentences.</li>
 <li>Refine them to five emotional moments.</li>
 <li>Select one final moment and generate the card.</li>
 </ul>
 <p className="mt-4">Users now understand how a conversation becomes a card and can control what the final card represents.</p>
 <p className="mt-6 font-bold text-neutral-900">The redesigned flow increased completion by 18%.</p>
 <img src="/images/unimo/New.png" alt="Final Flow UI" className="w-full h-auto rounded-3xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] my-12" />
 <ProcessDiagram flow="final" />
 
 

 </div>
 </div>
 </div>

 {/* DESIGN CHALLENGE 02 */}
 <div id="design-challenge-02" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Design Challenge 02</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">HMW keep users informed and protect their progress during AI generation?</h2>
 <div className="space-y-12 text-lg text-neutral-500 leading-relaxed font-normal">
 <div>
 <p>Creating an Emotion Card could take about 30 seconds.</p>
 <p className="mt-4">During this time, the system analyzed the conversation, selected important content, created a summary, and generated the final visual.</p>
 <p className="mt-4">The original experience used one loading state for the entire process. Users could not tell whether the request was progressing, frozen, or had failed.</p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Define the Full Response Flow</h3>
 <p>I worked with engineers to define the API behavior for each part of the experience.</p>
 <p className="mt-4">The interface needed to support loading, streaming, success, empty responses, timeouts, and failures.</p>
 <p className="mt-4">This helped us treat the waiting experience as part of the product instead of a technical state added after the design was complete.</p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Communicate Progress</h3>
 <p>I divided the generation process into visible stages.</p>
 <p className="mt-4">The interface explains what the system is doing and gives users feedback as the request progresses.</p>
 <p className="mt-4">This makes the experience feel more responsive even when the total generation time remains the same.</p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Protect User Progress</h3>
 <p>A failed request should not force users to repeat a personal conversation.</p>
 <p className="mt-4">I designed recovery patterns that preserve the conversation and selected content.</p>
 <p className="mt-4">The interface explains what happened and provides a clear way to try again.</p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Final Design</h3>
 <p>The final experience communicates progress throughout generation and provides a recovery path when something goes wrong.</p>
 <p className="mt-4">Users can understand the current state without losing the emotional moment they selected.</p>
 </div>
 </div>
 </div>

 {/* DESIGN SYSTEM */}
 <div id="design-system" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Design System</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Build a scalable SwiftUI design system.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>As UNIMO added more conversational and card based features, we needed a reusable system that could support both design and development.</p>
 <p>I translated the visual language from Figma into 26 production SwiftUI components.</p>
 <p>The system includes conversation patterns, card components, selection controls, loading states, error messages, and recovery actions.</p>
 <p>It also defines how the interface communicates during different AI states.</p>
 <p>The component system helped the team maintain consistency and ship approximately one new feature each week.</p>
 </div>
 </div>

 {/* NEXT STEPS */}
 <div id="next-steps" className="scroll-mt-32">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Next Steps</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-12 leading-[1.15]">Opportunities I see.</h2>
 <div className="space-y-12 text-lg text-neutral-500 leading-relaxed font-normal">
 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">A Richer Card Collection</h3>
 <p>Help users organize, compare, and revisit cards as their emotional history grows.</p>
 <p className="mt-4">The collection could make emotional patterns easier to recognize over time.</p>
 </div>
 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">More Personalization</h3>
 <p>Use saved cards and emotional patterns to make future reflections more relevant to each user.</p>
 </div>
 <div>
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Faster Generation Feedback</h3>
 <p>Continue improving the connection between backend progress and frontend states so the waiting experience feels more accurate and responsive.</p>
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
