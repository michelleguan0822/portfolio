'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import MagneticButton from './MagneticButton'
import MouseParallaxImage from './MouseParallaxImage'
import ShatterImage from './ShatterImage'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    id: 1,
    title: 'UNIMO',
    subtitle: 'Emotional Companion App',
    tags: 'UI/UX and branding',
    screenshots: ['/images/unimo1.png', '/images/unimo2.png', '/images/unimo3.png'],
    href: '/projects/omnireflex'
  },
  {
    id: 2,
    title: 'Bestmylife',
    subtitle: 'B2B Brain Bank Platform',
    tags: 'Product design and information architecture',
    screenshots: ['/images/bestmylife-cover.png'],
    href: '/projects/bestmylife'
  },
  {
    id: 3,
    title: 'Oltiva AI',
    subtitle: 'Document Insights',
    tags: 'B2B Enterprise, Workflow alignment',
    image: '/images/oltiva-cover.jpg',
    href: '/projects/avanade'
  }
]

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!railRef.current || !containerRef.current) return

    // Calculate how far to scroll the rail horizontally
    const scrollWidth = railRef.current.scrollWidth - window.innerWidth + 100 // +100 to let the last card peek

    gsap.to(railRef.current, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative py-16 lg:py-24 bg-[#FAFAFA] border-b border-black/10 overflow-hidden">
      
      {/* Editorial Introduction */}
      <div className="px-6 md:px-12 lg:px-24 mb-12 lg:mb-16">
        <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
          Featured Projects
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1] max-w-4xl uppercase">
          Combining product thinking, interaction design and frontend engineering.
        </h2>
      </div>

      {/* Horizontal Scroll Rail */}
      <div className="pl-6 md:pl-12 lg:pl-24 w-full">
        <div ref={railRef} className="flex gap-12 w-max pb-24 lg:pb-32">
          {projects.map((project, index) => (
            <Link key={project.id} href={project.href} className="block">
              <motion.div 
                className="group relative flex flex-col w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 cursor-pointer"
                initial="initial"
                whileHover="hover"
              >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] bg-neutral-200 overflow-hidden mb-6 border border-black/5 group-hover:bg-[#EAE5F3] transition-colors duration-700">
                {project.screenshots ? (
                  // Custom Flat Design Composition
                  project.screenshots.length > 1 ? (
                    // Multi-phone layout for UNIMO
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F3F0F8] overflow-hidden">
                      {/* Geometric decorations */}
                      <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square rounded-full bg-[#E3D9F0] blur-3xl opacity-60 pointer-events-none" />
                      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] aspect-square rounded-full bg-[#FFE5E5] blur-3xl opacity-60 pointer-events-none" />
                      
                      {/* Screenshots */}
                      <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                        <div className="absolute w-[25%] -ml-[40%] mt-[10%] transform rotate-[-8deg] group-hover:rotate-[-12deg] group-hover:-ml-[45%] transition-all duration-700 ease-out z-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border-4 border-white">
                          <ShatterImage src={project.screenshots[1]} alt="Phone Left" className="w-full h-auto" />
                        </div>
                        <div className="absolute w-[28%] z-30 shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden border-4 border-white group-hover:-translate-y-4 transition-transform duration-700 ease-out">
                          <ShatterImage src={project.screenshots[0]} alt="Phone Center" className="w-full h-auto" />
                        </div>
                        <div className="absolute w-[25%] ml-[40%] mt-[5%] transform rotate-[6deg] group-hover:rotate-[10deg] group-hover:ml-[45%] transition-all duration-700 ease-out z-20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border-4 border-white">
                          <ShatterImage src={project.screenshots[2]} alt="Phone Right" className="w-full h-auto" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Single Desktop layout for Bestmylife
                    <div className="absolute inset-0 flex items-center justify-center bg-[#070B14] overflow-hidden">
                      {/* Deep blue/cyan abstract background glow */}
                      <div className="absolute w-[80%] aspect-square rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
                      <div className="absolute right-[-10%] bottom-[-10%] w-[50%] aspect-square rounded-full bg-cyan-500/20 blur-[80px] pointer-events-none" />
                      
                      {/* Desktop Window Frame */}
                      <div className="relative w-[85%] rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700 ease-out bg-[#1A1A1A]">
                        {/* macOS Window Bar */}
                        <div className="w-full h-6 bg-[#2D2D2D] border-b border-black/20 flex items-center px-3 gap-1.5 pointer-events-none">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="pointer-events-auto">
                          <ShatterImage src={project.screenshots[0]} alt="Desktop Interface" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <MouseParallaxImage
                    src={project.image!}
                    alt={project.title}
                    containerClassName="w-full h-full"
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                    priority={index === 0}
                  />
                )}

                {/* Arrow Button */}
                <motion.div
                  className="absolute top-4 right-4 z-10"
                  variants={{
                    initial: { opacity: 0, scale: 0.8 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.4, ease: 'backOut' }}
                >
                  <MagneticButton 
                    className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-white"
                    style={{
                      clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
                    }}
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </MagneticButton>
                </motion.div>
              </div>

              {/* Minimal Captions */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight uppercase">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-lg text-neutral-600 font-medium">
                    {project.subtitle}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm font-medium text-neutral-500 max-w-[200px] uppercase tracking-wide">
                    {project.tags}
                  </p>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
