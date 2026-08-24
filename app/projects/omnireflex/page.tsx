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
 <p className="text-lg font-medium text-neutral-500 mb-8">
 Product Design
 </p>
 <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
 UNIMO
 </h1>
 <h2 className="text-lg font-medium text-neutral-500 mt-4 max-w-4xl leading-tight">
 A lighter way to express emotions.
 </h2>
    <p className="mt-6 text-lg text-neutral-500 font-normal max-w-2xl leading-relaxed">
 Unimo moves emotional expression out of text-lgd conversations and into something people can see, feel, and interact with.
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

  {/* Greeting */}
  <section className="px-6 md:px-12 lg:px-24 mb-16 flex justify-center">
    <div className="max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="flex-shrink-0">
        <img src="/images/about/vibe_coding.png" alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border border-black/5" />
      </div>
      <p className="text-lg font-normal text-neutral-500 leading-relaxed md:pt-4 text-center md:text-left">
        Hey there! I know reviewing case studies can be exhausting. But stick with me — this isn't just another design story. It's about how we reimagined emotional expression as something visual and interactive, turning meaningful moments into collectible emotional artifacts that users can actually feel.
      </p>
    </div>
  </section>

 {/* Metadata Grid */}
 <section className="px-6 md:px-12 lg:px-24 mb-32">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-black/5 py-12">
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Role</h3>
 <p className="text-lg font-normal text-neutral-900">End-to-end Product Engineer</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Timeline</h3>
 <p className="text-lg font-normal text-neutral-900">Jun 2025 – Present</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Team</h3>
 <p className="text-lg font-normal text-neutral-900">2 PMs, 4 Engineers<br/>1 Visual Designer</p>
 </div>
 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Client</h3>
 <p className="text-lg font-normal text-neutral-900">Startup / Independent</p>
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
 <a href="#overview" className="hover:text-neutral-900 transition-colors">Overview</a>
 </li>
 <li>
 <a href="#engineering" className="hover:text-neutral-900 transition-colors">Engineering</a>
 </li>
 <li>
 <a href="#brand" className="hover:text-neutral-900 transition-colors">Brand Guidelines</a>
 </li>
 <li>
 <a href="#mascots" className="hover:text-neutral-900 transition-colors">Mascot States</a>
 </li>
 <li>
 <a href="#experience" className="hover:text-neutral-900 transition-colors">Experience</a>
 </li>
 <li>
 <a href="#validation" className="hover:text-neutral-900 transition-colors">Validation</a>
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
 <p>
 UNIMO is an emotional companion app designed for Gen Z.
 <br/>
 We noticed that most AI emotional support products still treat feelings as conversation data, asking users to type, explain, and revisit long threads.
 </p>
 <p>
 UNIMO reimagines emotional expression as something visual and interactive, turning meaningful moments into collectible emotional artifacts users can keep, feel, and return to.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
 <div className="bg-[#FAFAFA] border border-black/10 p-8">
 <h3 className="text-lg font-medium text-neutral-900 mb-2">Lighter</h3>
 <p className="text-lg text-neutral-500">No more forced paragraphs. Just signals.</p>
 </div>
 <div className="bg-[#FAFAFA] border border-black/10 p-8">
 <h3 className="text-lg font-medium text-neutral-900 mb-2">Visual</h3>
 <p className="text-lg text-neutral-500">See your mood, don't just describe it.</p>
 </div>
 </div>
 </div>
 </div>

 <div id="overview" className="mb-20">
    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-6">
      <h2 className="text-2xl font-medium text-neutral-900 md:w-1/3">
        Overview
      </h2>
      <p className="text-lg font-normal text-neutral-500 leading-relaxed md:w-2/3">
        Experience an emotional world where feelings aren't just data—they're the foundation of a growing interactive universe.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-normal text-neutral-500 leading-relaxed">
      {/* Box 1 (Full Width text-focused) */}
      <div className="md:col-span-2 bg-white border border-black/5 rounded-[2rem] p-10 md:p-12 flex flex-col justify-center">
        <h3 className="text-2xl font-medium text-neutral-900 tracking-tight mb-4">An Emotional AI Universe for Gen-Z</h3>
        <p className="max-w-2xl">UNIMO turns daily emotions into interactive moments through AI companionship, collectible cards, and a world users want to return to.</p>
      </div>
      
      {/* Box 2 (Half Width with Image) */}
      <div className="md:col-span-1 bg-white border border-black/5 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden relative">
        <div className="mb-12 relative z-10">
          <h3 className="text-2xl font-medium text-neutral-900 tracking-tight mb-4">Emotions Become Collectible Assets</h3>
          <p>Each meaningful interaction can be transformed into an Emotion Card, making feelings visible, memorable, and worth keeping.</p>
        </div>
        <div className="relative w-full h-48 mt-auto rounded-xl overflow-hidden shadow-sm border border-black/5">
          <img src="/images/unimo/card_interaction.png" alt="Cards" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Box 3 (Half Width with Image) */}
      <div className="md:col-span-1 bg-white border border-black/5 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden relative">
        <div className="mb-12 relative z-10">
          <h3 className="text-2xl font-medium text-neutral-900 tracking-tight mb-4">Playful Systems That Keep Users Engaged</h3>
          <p>From card pulls to battles, voting, upgrades, and revival, UNIMO uses game-like loops to make emotional support feel lighter and more engaging.</p>
        </div>
        <div className="relative w-full h-48 mt-auto rounded-xl overflow-hidden shadow-sm border border-black/5">
          <img src="/images/unimo/battle.JPG" alt="Engagement loops" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Box 4 (Full Width) */}
      <div className="md:col-span-2 bg-white border border-black/5 rounded-[2rem] p-10 md:p-12 flex flex-col justify-center">
        <h3 className="text-2xl font-medium text-neutral-900 tracking-tight mb-4">More Than an App, A Scalable IP World</h3>
        <p className="max-w-2xl">With distinctive characters, emotional storytelling, and a growing universe, UNIMO is designed to expand into content, community, and branded experiences.</p>
      </div>
    </div>
  </div>

 <div id="engineering" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">Engineering the Magic
 </h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p className="text-lg font-medium text-neutral-900">
 Bridging the gap between Figma and Code.
 </p>
 <p>
 As a Product Engineer, my responsibility didn't end at designing the UI—it extended to ensuring the emotional interactions felt just as fluid on a device as they did in the prototype. We built the frontend using <strong>React Native</strong> and managed the complex animations using <strong>Reanimated / Lottie</strong>.
 </p>
 <div className="bg-[#FAFAFA] border border-black/10 p-8 mt-8">
 <h3 className="text-lg font-medium text-neutral-900 mb-2">Technical Challenge: Frame Drops</h3>
 <p className="mb-4">
 The Gen-Z target audience demands highly fluid, game-like interactions. Initially, rendering the dynamic mascot states and card-pulling animations simultaneously caused significant frame drops on older devices.
 </p>
 <p>
 <strong>The Compromise:</strong> Instead of insisting on heavy runtime vector calculations, I worked closely with the team to bake the most complex mascot transitions into pre-rendered Lottie files, while keeping the UI shell lightweight. This engineering compromise saved our 60fps target without sacrificing the "feel" of the design.
 </p>
 </div>
 </div>
 </div>

 <div id="brand" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">Brand Guidelines
 </h2>
 
 <div className="mb-16">
 <h3 className="text-lg font-medium text-neutral-500 mb-2">The DNA of the Unimo Universe</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="aspect-square bg-[#7983D9] p-4 flex flex-col justify-between">
 <p className="text-white font-bold tracking-widest text-lg ">Primary</p>
 <p className="text-white font-medium">#7983D9</p>
 </div>
 <div className="aspect-square bg-[#70C05B] p-4 flex flex-col justify-between">
 <p className="text-white font-bold tracking-widest text-lg ">Nature</p>
 <p className="text-white font-medium">#70C05B</p>
 </div>
 <div className="aspect-square bg-[#FAE69E] p-4 flex flex-col justify-between">
 <p className="text-neutral-900 font-bold tracking-widest text-lg ">Joy</p>
 <p className="text-neutral-900 font-medium">#FAE69E</p>
 </div>
 <div className="aspect-square bg-[#1D1C5C] p-4 flex flex-col justify-between">
 <p className="text-white font-bold tracking-widest text-lg ">Deep</p>
 <p className="text-white font-medium">#1D1C5C</p>
 </div>
 </div>
 </div>

 <div className="mb-16">
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Typography</h3>
 <div className="bg-[#FAFAFA] border border-black/10 p-8 space-y-8">
 <div>
 <p className="text-lg font-medium text-neutral-500 mb-2">Primary / Heading</p>
 <p className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">ABCDEFGHI</p>
 </div>
 <div>
 <p className="text-lg font-medium text-neutral-500 mb-2">Secondary / Plus Jakarta Sans</p>
 <p className="text-2xl font-medium text-neutral-500">0123456789</p>
 </div>
 </div>
 </div>

 <div>
 <h3 className="text-lg font-medium text-neutral-500 mb-2">Target Audience</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="border-l-2 border-black/10 pl-6 py-2">
 <p className="text-2xl font-medium text-neutral-900 mb-2">54%</p>
 <p className="text-lg font-normal text-neutral-500">Age 16 - 24</p>
 </div>
 <div className="border-l-2 border-black/10 pl-6 py-2">
 <p className="text-2xl font-medium text-neutral-900 mb-2">61%</p>
 <p className="text-lg font-normal text-neutral-500">Visual First</p>
 </div>
 </div>
 </div>
 </div>

 <div id="mascots" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">Mascot States & Assets
 </h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
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

 <div id="experience" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">Experience the App
 </h2>
 <p className="text-lg font-medium text-neutral-500 mb-12">
 A visual journey through the Unimo interface.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="relative mx-auto w-full max-w-[320px] border-[12px] border-neutral-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden bg-neutral-900 flex justify-center">
 {/* iPhone Notch */}
 <div className="absolute top-0 z-20 h-5 md:h-6 w-1/2 bg-neutral-900 rounded-b-2xl md:rounded-b-3xl"></div>
 <img src="/images/unimo/home.PNG" alt="Home Screen" className="w-full h-auto object-cover" />
 </div>
 
 <div className="relative mx-auto w-full max-w-[320px] border-[12px] border-neutral-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden bg-neutral-900 flex justify-center">
 {/* iPhone Notch */}
 <div className="absolute top-0 z-20 h-5 md:h-6 w-1/2 bg-neutral-900 rounded-b-2xl md:rounded-b-3xl"></div>
 <img src="/images/unimo/chat.PNG" alt="Chat Screen" className="w-full h-auto object-cover" />
 </div>

 <div className="relative mx-auto w-full max-w-[320px] border-[12px] border-neutral-900 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden bg-neutral-900 flex justify-center">
 {/* iPhone Notch */}
 <div className="absolute top-0 z-20 h-5 md:h-6 w-1/2 bg-neutral-900 rounded-b-2xl md:rounded-b-3xl"></div>
 <img src="/images/unimo/card.png" alt="Feelings Become Cards" className="w-full h-auto object-cover" />
 </div>
 </div>
 </div>
 
 <div id="validation" className="mb-20">
 <h2 className="text-2xl font-medium text-neutral-900 mb-6">Reality Check & Validation
 </h2>
 <div className="space-y-6 text-lg text-neutral-500 leading-relaxed font-normal">
 <p className="text-lg font-medium text-neutral-900">
 What happens when real people use it?
 </p>
 <p>
 A beautiful UI means nothing if it doesn't solve the core problem. We deployed a beta build via TestFlight to ~25 college students to test if our "Visual-First" emotional expression hypothesis actually held up.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
 <div className="border-l-4 border-red-500/20 pl-6 py-2">
 <h4 className="font-bold text-neutral-900 text-lg mb-2">Failure 01</h4>
 <p>Users found the initial chat interface too rigid and "robotic", despite the cute avatars.</p>
 </div>
 <div className="border-l-4 border-emerald-500/20 pl-6 py-2">
 <h4 className="font-bold text-neutral-900 text-lg mb-2">The Pivot</h4>
 <p>This directly led to the introduction of the gamified <strong>Card Pulling</strong> system, which reduced the friction of typing by 40%.</p>
 </div>
 </div>
 
 <div className="border-l-4 border-neutral-900 pl-6 py-4 my-12 bg-neutral-50">
 <p className="text-2xl italic text-neutral-900 mb-2">"I didn't want to type a journal entry, but swiping the emotion cards actually made me stop and think about how I felt."</p>
 <p className="text-lg font-medium text-neutral-500">— Beta Tester, 19</p>
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
