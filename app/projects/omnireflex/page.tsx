'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import MouseParallaxImage from '@/components/MouseParallaxImage'
import MagneticButton from '@/components/MagneticButton'

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

    const sections = ['overview', 'problem', 'solution', 'build', 'results']
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
 <p className="text-lg font-medium text-neutral-500 mb-8 uppercase tracking-widest text-xs">
 Product Design + Engineering
 </p>
 <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
 UNIMO
 </h1>
 <h2 className="text-lg font-medium text-neutral-500 mt-4 max-w-4xl leading-tight">
 A lighter way to express emotions.
 </h2>
    <p className="mt-6 text-lg text-neutral-500 font-normal max-w-2xl leading-relaxed">
 UNIMO is an AI emotional companion that transforms meaningful conversations into collectible Emotion Cards—helping people see, keep, and return to moments that matter.
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
 <p className="text-lg font-normal text-neutral-900">Jun 2025 – Present</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Team</h3>
 <p className="text-lg font-normal text-neutral-900">2 Product Managers<br/>4 Engineers<br/>1 Visual Designer</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Responsibilities</h3>
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
 <ul className="space-y-4 text-lg font-medium">
 {['overview', 'problem', 'solution', 'build', 'results'].map((section) => (
 <li key={section}>
 <a 
 href={`#${section}`}
 className={`transition-colors capitalize ${activeSection === section ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
 >
 {section}
 </a>
 </li>
 ))}
 </ul>
 </div>
 </aside>


 {/* Main Content */}
 <div className="lg:w-3/4 max-w-4xl space-y-32">
 
 <div id="overview" className="space-y-32 scroll-mt-32">
 {/* SNAPSHOT */}
 <div id="snapshot">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">30-Second Snapshot</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Turning meaningful conversations into something people can keep.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>Most AI emotional-support products leave users with long conversations that are difficult to revisit. At UNIMO, we explored a more visual approach: identifying meaningful moments from a conversation and transforming them into collectible emotional artifacts.</p>
 <p>I redesigned the core card-generation experience from a randomized five-step process into a guided three-step flow. I also translated the experience into production SwiftUI, built a 26-component design system, and worked directly with engineers to define API behavior, loading states, streaming feedback, and error recovery.</p>
 <p>The redesigned experience increased completion by 18%. Across 442 beta users, more than 267 people created over 800 Emotion Cards.</p>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/10 my-8">
 <div>
 <p className="text-3xl font-bold text-neutral-900 mb-1">442</p>
 <p className="text-sm font-medium text-neutral-500">Beta Users</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-neutral-900 mb-1">+18%</p>
 <p className="text-sm font-medium text-neutral-500">Completion Rate</p>
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
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Conversations help in the moment—but meaningful moments are easily lost.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>AI companions are good at listening, but the experience usually ends when the conversation ends. Users may share something important, receive a helpful response, and then lose that moment inside a long chat history.</p>
 <p>Returning to it requires scrolling through old conversations and rereading paragraphs of text. For users who already find emotional reflection difficult, that creates even more friction.</p>
 <p>We saw an opportunity to make emotional reflection feel lighter and more tangible.</p>
 <p>Instead of treating every conversation as another thread, UNIMO helps users turn meaningful moments into visual objects they can collect, revisit, and understand over time.</p>
 </div>
 </div>

 {/* THE PRODUCT IDEA */}
 <div id="product-idea">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">The Product Idea</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">What if an AI companion could remember what mattered—not just what was said?</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>UNIMO listens for meaningful moments within a conversation and helps users transform them into Emotion Cards.</p>
 <p>Each card captures one important emotional insight. The front gives the moment a visual identity, while the back provides a concise summary and an emotional wheel that helps users understand the feelings connected to it.</p>
 <p>The goal was not to replace conversation. It was to give meaningful conversations a lasting form.</p>
 </div>
 </div>

 </div>

 <div id="problem" className="space-y-32 scroll-mt-32">
 {/* THE CHALLENGE */}
 <div id="challenge">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">The Challenge</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">The original experience made card creation feel random and difficult to trust.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The first version used a five-step flow with limited guidance. Content appeared randomly, and users had little control over which part of the conversation became a card.</p>
 <p>This created three problems:</p>
 <div className="bg-[#FAFAFA] border border-black/10 p-8 space-y-6 my-8">
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-2">Too much uncertainty</h3>
 <p>Users could not understand how the system selected content or what the final card would represent.</p>
 </div>
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-2">Too many decisions</h3>
 <p>The experience asked users to make several choices without first helping them identify what was meaningful.</p>
 </div>
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-2">Too little emotional ownership</h3>
 <p>Because the result felt randomly generated, the finished card did not always feel personal or worth keeping.</p>
 </div>
 </div>
 <p>The interface worked, but the experience did not yet create the sense of intention and emotional ownership we wanted.</p>
 </div>
 </div>

 {/* PRODUCT GOAL */}
 <div id="product-goal">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Product Goal</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Give users enough guidance to make the card meaningful—without turning reflection into work.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>We wanted the AI to do most of the processing while keeping the user in control of the final meaning.</p>
 <p>The redesigned experience needed to:</p>
 <ul className="list-disc pl-6 space-y-2">
 <li>Reduce the number of steps</li>
 <li>Make the AI's decision-making easier to understand</li>
 <li>Give users control without overwhelming them</li>
 <li>Preserve the emotional context of the conversation</li>
 <li>Make the final card feel personal and collectible</li>
 </ul>
 </div>
 </div>

 </div>

 <div id="solution" className="space-y-32 scroll-mt-32">
 {/* CORE PRODUCT DECISION */}
 <div id="core-decision">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">The Core Product Decision</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">From five random steps to one guided narrowing process.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>I redesigned the experience around a simple progressive-selection model.</p>
 <p>Instead of immediately generating a card, the system helps users move from a broad conversation toward one meaningful takeaway.</p>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
 <div className="border border-black/10 p-6 rounded-xl">
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Step 1: Review</h3>
 <p className="text-base">The AI identifies 10 meaningful sentences from the conversation. Users begin with recognizable moments from something they already said, making the process feel grounded in their own experience.</p>
 </div>
 <div className="border border-black/10 p-6 rounded-xl">
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Step 2: Refine</h3>
 <p className="text-base">The system narrows those moments to five stronger emotional signals. This reduces cognitive load while allowing users to compare the moments that matter most.</p>
 </div>
 <div className="border border-black/10 p-6 rounded-xl">
 <h3 className="text-xl font-bold text-neutral-900 mb-2">Step 3: Keep</h3>
 <p className="text-base">The user selects one final moment. UNIMO turns it into a concise summary and generates the visual token used to create the Emotion Card.</p>
 </div>
 </div>
 <p>This approach made the AI feel less random. Users could understand how the final result was created and still feel ownership over what they chose to preserve.</p>
 </div>
 </div>

 {/* FINAL EXPERIENCE */}
 <div id="final-experience">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">The Final Experience</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">A conversation becomes a card in three guided steps.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The completed experience moves through a clear emotional arc:</p>
 
 <div className="bg-[#FAFAFA] border border-black/10 p-8 space-y-6 my-8">
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-2">Listen</h3>
 <p>The user talks naturally with UNIMO without having to structure the conversation like a journal entry.</p>
 </div>
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-2">Distill</h3>
 <p>The AI identifies meaningful moments and guides the user from 10 sentences to five, then to one final takeaway.</p>
 </div>
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-2">Create</h3>
 <p>The selected moment becomes an Emotion Card with a visual identity, emotional summary, and interactive reflection.</p>
 </div>
 </div>
 <p>The experience remains lightweight, but the final artifact feels considered and personal.</p>
 </div>
 </div>

 {/* EMOTION CARD */}
 <div id="emotion-card">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Designing the Emotion Card</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Making an AI-generated result feel tangible and worth keeping.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The card needed to feel different from a chat summary or generated report. It had to feel like an object users could form an emotional connection with.</p>
 <p>I focused on spacing, contrast, hierarchy, and restrained visual detail to make each card feel collectible without becoming visually overwhelming.</p>
 
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
 
 <ul className="list-disc pl-6 space-y-4">
 <li><strong>The Front:</strong> Gives each emotional moment a distinct visual identity. Color, composition, and generated graphics make the result feel personal and recognizable within a growing collection.</li>
 <li><strong>The Back:</strong> Provides context through a concise summary and an emotional wheel. Users can understand what the card represents without rereading the original conversation.</li>
 <li><strong>The Collection:</strong> Together, the cards create a visual record of the user's emotional experiences. Over time, the collection becomes more than saved content—it becomes a personal emotional archive.</li>
 </ul>
 </div>
 </div>

 </div>

 <div id="build" className="space-y-32 scroll-mt-32">
 {/* ENGINEERING */}
 <div id="engineering">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Engineering the Experience</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Making a 30-second AI workflow feel responsive and trustworthy.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>My responsibility extended beyond designing the interface. I translated the experience into production SwiftUI, built the shared component system, and worked directly with engineers to define how the frontend should respond throughout the generation process.</p>
 <p>The core engineering challenge was latency.</p>
 <p>Generating an Emotion Card could take approximately 30 seconds as the system analyzed the conversation, selected meaningful moments, created a summary, and generated the final visual.</p>
 <p>Without clear feedback, users could not tell whether the product was thinking, frozen, or had failed.</p>
 <p>I designed the experience as a sequence of visible system states rather than a single loading screen. Users receive progressive feedback while the card is being generated, clear messaging when a step takes longer than expected, and a recovery path when the request fails.</p>
 </div>
 </div>

 {/* DESIGN SYSTEM */}
 <div id="design-system">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Production Design System</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">A SwiftUI system designed to scale.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>I translated the visual language from Figma into a production SwiftUI design system containing 26 reusable components.</p>
 <p>The system covered:</p>
 <ul className="list-disc pl-6 space-y-2">
 <li>Foundational interface elements</li>
 <li>Conversational patterns</li>
 <li>Emotion Card components</li>
 <li>Selection and confirmation controls</li>
 <li>Loading and generation states</li>
 <li>Empty, timeout, and error states</li>
 <li>Feedback and recovery patterns</li>
 </ul>
 <p>Creating these patterns as reusable production components helped the team maintain consistency while shipping approximately one new feature each week.</p>
 <p>It also reduced the gap between design and implementation. Instead of handing off static screens, I could define how each component behaved across real product states.</p>
 </div>
 </div>

 {/* API & AI STATES */}
 <div id="api-states">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">API and AI States</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Designing the moments between request and response.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>AI experiences are defined not only by the final output, but by what happens while the user is waiting.</p>
 <p>I worked with engineers to define the API behavior behind the card-generation flow and designed the interface around the full response lifecycle:</p>
 <ul className="list-disc pl-6 space-y-2">
 <li>Request initiated</li>
 <li>Content analysis</li>
 <li>Streaming response</li>
 <li>Summary generation</li>
 <li>Visual generation</li>
 <li>Success</li>
 <li>Empty response</li>
 <li>Timeout</li>
 <li>Failure and retry</li>
 </ul>
 <p>Instead of hiding the system behind an indefinite spinner, the interface communicates what is happening and gives users confidence that their request is still progressing.</p>
 </div>
 </div>

 {/* ERROR RECOVERY */}
 <div id="error-recovery">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Error Recovery</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">A failed request should not erase an emotional moment.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>Failure is especially sensitive in an emotional product. If a user has just shared something personal, asking them to start over can make the experience feel careless.</p>
 <p>I designed recovery patterns that preserve the user's existing conversation and selected content. Error messages explain the problem in plain language and provide a clear retry path without forcing the user to repeat the entire flow.</p>
 <p>These states became part of the shared design system so the same behavior could be reused across future AI-powered features.</p>
 </div>
 </div>

 {/* VISUAL SYSTEM */}
 <div id="visual-system">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Visual System</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Playful enough to feel approachable. Structured enough to feel safe.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>UNIMO's visual system balances emotional warmth with predictable interaction patterns.</p>
 <p>Soft colors and expressive character states make the experience feel approachable, while consistent spacing, hierarchy, and interaction feedback keep the product understandable.</p>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-12">
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

 <p>The visual system was designed around three principles:</p>
 <ul className="list-disc pl-6 space-y-4">
 <li><strong>Emotion should be visible:</strong> Color, character states, and card graphics help users recognize emotional shifts without relying only on text.</li>
 <li><strong>Interaction should be predictable:</strong> Playful motion never replaces functional feedback. Every state still communicates what happened and what the user can do next.</li>
 <li><strong>Generated content should feel intentional:</strong> The system gives each card its own personality while preserving enough consistency for the collection to feel cohesive.</li>
 </ul>
 </div>
 </div>

 </div>

 <div id="results" className="space-y-32 scroll-mt-32">
 {/* VALIDATION */}
 <div id="validation">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Validation</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">Did users actually want to keep the cards?</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>We evaluated the experience through beta usage and completion behavior.</p>
 <p>The main question was not simply whether users could finish the flow. We wanted to know whether the final artifact felt meaningful enough to create and keep.</p>
 <p>The results showed that users were willing to return to the experience and build personal collections:</p>
 
 <div className="grid grid-cols-2 gap-8 my-8 border-y border-black/10 py-8">
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-2">442</p>
 <p className="text-base text-neutral-500">Beta users experienced the product.</p>
 </div>
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-2">267+</p>
 <p className="text-base text-neutral-500">Users created at least one Emotion Card.</p>
 </div>
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-2">800+</p>
 <p className="text-base text-neutral-500">Emotion Cards were generated and saved.</p>
 </div>
 <div>
 <p className="text-4xl font-bold text-neutral-900 mb-2">+18%</p>
 <p className="text-base text-neutral-500">Increase in card-generation completion after redesigning the flow.</p>
 </div>
 </div>
 
 <p>The results validated the core product direction: users were more likely to complete the experience when the AI guided them toward one meaningful moment instead of generating an unexplained result.</p>
 </div>
 </div>

 {/* IMPACT */}
 <div id="impact">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Impact</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">From a randomized feature to a repeatable product experience.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The redesign gave the card-generation feature a clear structure and made the relationship between conversation, emotional meaning, and the final artifact easier to understand.</p>
 <p>It also created a technical and visual foundation for future features.</p>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
 <div className="bg-[#FAFAFA] border border-black/10 p-8">
 <h3 className="text-xl font-bold text-neutral-900 mb-4">For Users</h3>
 <ul className="list-disc pl-5 space-y-2">
 <li>Less effort required to identify a meaningful moment</li>
 <li>More control over what becomes a card</li>
 <li>Clearer feedback during AI generation</li>
 <li>A personal artifact that can be revisited later</li>
 </ul>
 </div>
 <div className="bg-[#FAFAFA] border border-black/10 p-8">
 <h3 className="text-xl font-bold text-neutral-900 mb-4">For The Product</h3>
 <ul className="list-disc pl-5 space-y-2">
 <li>Completion increased by 18%</li>
 <li>More than 800 cards were created</li>
 <li>The experience gained a reusable SwiftUI foundation</li>
 <li>New features could be shipped more consistently</li>
 <li>AI loading and recovery patterns could be reused across the app</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* REFLECTION */}
 <div id="reflection">
 <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Reflection</div>
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-8 leading-[1.15]">The best AI experience does not always feel like more AI.</h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p>The biggest lesson from UNIMO was that users did not need more generated content. They needed help finding meaning within what they had already shared.</p>
 <p>The most important design decision was not the final visual style of the card. It was giving users visibility and control over how one emotional moment became that card.</p>
 <p>Building the experience in SwiftUI also changed how I approached the design. Loading behavior, API limitations, reusable components, and failure states were not implementation details to solve after handoff. They were part of the product experience from the beginning.</p>
 <p>UNIMO reinforced the kind of work I want to continue doing: turning ambiguous AI capabilities into clear, emotionally thoughtful, production-ready interfaces.</p>
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
