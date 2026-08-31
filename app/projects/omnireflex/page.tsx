'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import MouseParallaxImage from '@/components/MouseParallaxImage'
import MagneticButton from '@/components/MagneticButton'

export default function OmnireflexPage() {
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
 <p className="text-lg font-medium text-neutral-500 mb-8 uppercase tracking-widest text-xs">
 PRODUCT DESIGN AND ENGINEERING
 </p>
 <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
 UNIMO
 </h1>
 <h2 className="text-lg font-medium text-neutral-500 mt-4 max-w-4xl leading-tight">
 A lighter way to express emotions.
 </h2>
    <p className="mt-6 text-lg text-neutral-500 font-normal max-w-2xl leading-relaxed">
 UNIMO is an AI emotional companion that turns meaningful conversations into collectible Emotion Cards. It helps people see, keep, and revisit moments that matter.
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

 {/* Metadata Grid */}
 <section className="px-6 md:px-12 lg:px-24 mb-32">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-black/5 py-12">
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Role</h3>
 <p className="text-lg font-normal text-neutral-900">Design Engineer</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Timeline</h3>
 <p className="text-lg font-normal text-neutral-900">Jun 2025 to Present</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Team</h3>
 <p className="text-lg font-normal text-neutral-900">2 Product Managers<br/>4 Engineers<br/>1 Visual Designer</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Focus</h3>
 <p className="text-lg font-normal text-neutral-900">Product Strategy<br/>Interaction Design<br/>SwiftUI Design System<br/>API Integration</p>
 </div>
 </div>
 </section>

 {/* Long-form Content with TOC */}
 <section className="px-6 md:px-12 lg:px-24 mb-32 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
 {/* Table of Contents (Sticky) */}
 <aside className="lg:w-1/4 hidden lg:block">
 <div className="sticky top-32">
 <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Contents</h4>
 <ul className="space-y-3 text-lg font-normal text-neutral-500">
 <li><a href="#snapshot" className="hover:text-neutral-900 transition-colors">Snapshot</a></li>
 <li><a href="#context" className="hover:text-neutral-900 transition-colors">Context</a></li>
 <li><a href="#product-idea" className="hover:text-neutral-900 transition-colors">Product Idea</a></li>
 <li><a href="#challenge" className="hover:text-neutral-900 transition-colors">Challenge</a></li>
 <li><a href="#design-decision" className="hover:text-neutral-900 transition-colors">Design Decision</a></li>
 <li><a href="#the-new-flow" className="hover:text-neutral-900 transition-colors">The New Flow</a></li>
 <li><a href="#card-design" className="hover:text-neutral-900 transition-colors">Card Design</a></li>
 <li><a href="#engineering" className="hover:text-neutral-900 transition-colors">Engineering</a></li>
 <li><a href="#design-system" className="hover:text-neutral-900 transition-colors">Design System</a></li>
 <li><a href="#api-states" className="hover:text-neutral-900 transition-colors">API & States</a></li>
 <li><a href="#error-recovery" className="hover:text-neutral-900 transition-colors">Error Recovery</a></li>
 <li><a href="#visual-system" className="hover:text-neutral-900 transition-colors">Visual System</a></li>
 <li><a href="#validation" className="hover:text-neutral-900 transition-colors">Validation</a></li>
 <li><a href="#impact" className="hover:text-neutral-900 transition-colors">Impact</a></li>
 <li><a href="#reflection" className="hover:text-neutral-900 transition-colors">Reflection</a></li>
 </ul>
 </div>
 </aside>

 {/* Main Content */}
 <div className="lg:w-3/4 max-w-4xl space-y-32">
 
 {/* SNAPSHOT */}
 <div id="snapshot">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Snapshot</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Turning conversations into something people can keep.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>Most AI companions leave users with long conversations that are difficult to revisit.</p>
 <p>I redesigned UNIMO's card creation experience from a random five step process into a guided three step flow. I also built a 26 component SwiftUI design system and worked with engineers on API behavior, loading feedback, streaming responses, and error recovery.</p>
 <p>The redesign increased completion by 18%. Across 442 beta users, more than 267 people created over 800 Emotion Cards.</p>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/10 my-8">
 <div>
 <p className="text-3xl font-bold text-neutral-900 mb-1">442</p>
 <p className="text-sm font-medium text-neutral-500">Beta Users</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-neutral-900 mb-1">18%</p>
 <p className="text-sm font-medium text-neutral-500">Increase in Completion</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-neutral-900 mb-1">800+</p>
 <p className="text-sm font-medium text-neutral-500">Cards Created</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-neutral-900 mb-1">26</p>
 <p className="text-sm font-medium text-neutral-500">SwiftUI Components</p>
 </div>
 </div>
 </div>
 </div>

 {/* CONTEXT */}
 <div id="context">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Context</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Meaningful moments were getting lost inside chat history.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>Users often shared something important and received a helpful response, but the moment disappeared inside a long conversation.</p>
 <p>Finding it again required scrolling through old messages and reading paragraphs of text.</p>
 <p>We wanted emotional reflection to feel lighter, more visual, and easier to revisit.</p>
 </div>
 </div>

 {/* PRODUCT IDEA */}
 <div id="product-idea">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Product Idea</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Give meaningful conversations a lasting form.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>UNIMO identifies important moments within a conversation and helps users turn them into Emotion Cards.</p>
 <p>The front gives each moment a visual identity. The back includes a short summary and an emotional wheel that helps users understand what they felt.</p>
 <p>The goal was not to replace conversation. It was to help users keep what mattered.</p>
 </div>
 </div>

 {/* CHALLENGE */}
 <div id="challenge">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Challenge</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">The original experience felt random.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The first version used five steps with limited guidance. Users had little control over which part of the conversation became a card.</p>
 <p>They could not understand how the content was selected, and the result did not always feel personal.</p>
 <p>We needed to give users more control without making emotional reflection feel like work.</p>
 </div>
 </div>

 {/* DESIGN DECISION */}
 <div id="design-decision">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Design Decision</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Replace random generation with guided selection.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>I redesigned the flow around one simple idea.</p>
 <p>Start broad, narrow the meaning, and let the user choose what to keep.</p>
 <p>This made the AI easier to understand and gave users ownership over the final card.</p>
 </div>
 </div>

 {/* THE NEW FLOW */}
 <div id="the-new-flow">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">The New Flow</div>
 
 <div className="space-y-12 my-8">
 <div>
 <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">Step 1: Review</h2>
 <p className="text-lg text-neutral-500 leading-relaxed font-normal">The AI identifies 10 meaningful sentences from the conversation.</p>
 <p className="text-lg text-neutral-500 leading-relaxed font-normal">Users begin with moments they recognize from something they already shared.</p>
 </div>
 <div>
 <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">Step 2: Refine</h2>
 <p className="text-lg text-neutral-500 leading-relaxed font-normal">The system narrows those moments to five stronger emotional signals.</p>
 <p className="text-lg text-neutral-500 leading-relaxed font-normal">This reduces the number of decisions while keeping the user involved.</p>
 </div>
 <div>
 <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">Step 3: Create</h2>
 <p className="text-lg text-neutral-500 leading-relaxed font-normal">The user selects one final moment.</p>
 <p className="text-lg text-neutral-500 leading-relaxed font-normal">UNIMO creates a short summary and generates the visual token used for the Emotion Card.</p>
 </div>
 </div>
 </div>

 {/* CARD DESIGN */}
 <div id="card-design">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Card Design</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Making the result feel tangible and worth keeping.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The card needed to feel more meaningful than a chat summary.</p>
 <p>I used spacing, contrast, hierarchy, and restrained visual details to make every card feel personal and collectible.</p>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
 <div className="relative mx-auto w-full max-w-[320px] border-[12px] border-neutral-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden bg-neutral-900 flex justify-center">
 <div className="absolute top-0 z-20 h-5 md:h-6 w-1/2 bg-neutral-900 rounded-b-2xl md:rounded-b-3xl"></div>
 <img src="/images/unimo/home.PNG" alt="Home Screen" className="w-full h-auto object-cover" />
 </div>
 <div className="relative mx-auto w-full max-w-[320px] border-[12px] border-neutral-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden bg-neutral-900 flex justify-center">
 <div className="absolute top-0 z-20 h-5 md:h-6 w-1/2 bg-neutral-900 rounded-b-2xl md:rounded-b-3xl"></div>
 <img src="/images/unimo/chat.PNG" alt="Chat Screen" className="w-full h-auto object-cover" />
 </div>
 <div className="relative mx-auto w-full max-w-[320px] border-[12px] border-neutral-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden bg-neutral-900 flex justify-center">
 <div className="absolute top-0 z-20 h-5 md:h-6 w-1/2 bg-neutral-900 rounded-b-2xl md:rounded-b-3xl"></div>
 <img src="/images/unimo/card.png" alt="Card Generation" className="w-full h-auto object-cover" />
 </div>
 </div>
 
 <p>The front creates a visual identity for the moment. The back provides emotional context through a short summary and emotional wheel.</p>
 <p>Together, the cards create a visual record that users can return to over time.</p>
 </div>
 </div>

 {/* ENGINEERING */}
 <div id="engineering">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Engineering the Experience</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Making a 30 second AI process feel responsive.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>Creating an Emotion Card could take about 30 seconds.</p>
 <p>During that time, the system analyzed the conversation, selected important moments, created a summary, and generated the final visual.</p>
 <p>A single loading spinner made the experience feel uncertain. Users could not tell whether the product was thinking, frozen, or had failed.</p>
 <p>I divided the process into clear system states and added progressive feedback so users could understand what was happening.</p>
 </div>
 </div>

 {/* DESIGN SYSTEM */}
 <div id="design-system">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">SwiftUI Design System</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Building reusable production components.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>I translated the visual language from Figma into a SwiftUI design system with 26 reusable components.</p>
 <p>The system included conversation patterns, card components, selection controls, loading states, error messages, and recovery actions.</p>
 <p>These components helped the team maintain consistency and ship approximately one new feature each week.</p>
 </div>
 </div>

 {/* API & AI STATES */}
 <div id="api-states">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">API and System States</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Designing what happens before the final response.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>I worked with engineers to define the API behavior for the card creation flow.</p>
 <p>I designed the experience around every important state, including loading, streaming, success, empty responses, timeouts, and failures.</p>
 <p>The interface communicates progress instead of leaving users behind an indefinite spinner.</p>
 </div>
 </div>

 {/* ERROR RECOVERY */}
 <div id="error-recovery">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Error Recovery</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Protecting the user's progress.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>A failed request should not force someone to repeat a personal conversation.</p>
 <p>I designed recovery patterns that preserve the conversation and selected content. The interface explains what happened and gives users a clear way to try again.</p>
 <p>These patterns became reusable parts of the SwiftUI design system.</p>
 </div>
 </div>

 {/* VISUAL SYSTEM */}
 <div id="visual-system">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Visual System</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Playful, clear, and emotionally approachable.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>UNIMO uses soft colors, expressive character states, and collectible visuals to make emotional reflection feel less clinical.</p>
 <p>Consistent spacing, hierarchy, and interaction feedback keep the experience predictable.</p>
 <p>Motion supports the experience without replacing functional feedback.</p>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
 <div className="border border-black/10 bg-[#FAFAFA] aspect-square flex flex-col items-center justify-center text-center overflow-hidden">
 <img src="/images/unimo/mascots/Dodo.png" alt="Dodo" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
 </div>
 <div className="border border-black/10 bg-[#FAFAFA] aspect-square flex flex-col items-center justify-center text-center overflow-hidden">
 <img src="/images/unimo/mascots/Milo.png" alt="Milo" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
 </div>
 <div className="border border-black/10 bg-[#FAFAFA] aspect-square flex flex-col items-center justify-center text-center overflow-hidden">
 <img src="/images/unimo/mascots/Ollie.png" alt="Ollie" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
 </div>
 <div className="border border-black/10 bg-[#FAFAFA] aspect-square flex flex-col items-center justify-center text-center overflow-hidden">
 <img src="/images/unimo/mascots/Pip.png" alt="Pip" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
 </div>
 </div>
 </div>
 </div>

 {/* VALIDATION */}
 <div id="validation">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Validation</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Users created and kept the cards.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The redesigned flow was tested through beta usage and completion behavior.</p>
 <p>442 beta users experienced the product.</p>
 <p>More than 267 users created at least one Emotion Card.</p>
 <p>Together, they created over 800 cards.</p>
 <p>Completion increased by 18% after the flow was redesigned.</p>
 <p>The results showed that users were more likely to finish when they understood how the card was created and could choose what it represented.</p>
 </div>
 </div>

 {/* IMPACT */}
 <div id="impact">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Impact</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">A clearer experience and a stronger product foundation.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The redesign turned a random generation feature into a guided and repeatable experience.</p>
 <p>Users gained more control over what became a card. The product gained a reusable SwiftUI system for future AI features.</p>
 <p>The new structure also helped the team ship more consistently while preserving the emotional quality of the experience.</p>
 </div>
 </div>

 {/* REFLECTION */}
 <div id="reflection">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Reflection</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Good AI design helps people find meaning.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The most important decision was not the visual style of the final card.</p>
 <p>It was giving users control over how one emotional moment became that card.</p>
 <p>UNIMO taught me to treat loading behavior, API limitations, system states, and error recovery as part of the product experience from the beginning.</p>
 <p>This is the kind of work I want to continue doing: turning complex AI capabilities into clear, thoughtful, and production ready interfaces.</p>
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
