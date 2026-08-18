'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from './MagneticButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const experiments = [
  { id: 1, title: 'Web-Shooter Kinematics', videoSrc: '/video/spider.mov', tags: [{ name: 'MEDIAPIPE', color: 'bg-[#B1CDE0] text-black' }, { name: 'CANVAS', color: 'bg-[#F3D0C7] text-black' }] },
  { id: 2, title: 'Particle Rain Engine', videoSrc: '/video/rain.mov', tags: [{ name: 'MATTER.JS', color: 'bg-[#4D7298] text-white' }, { name: 'PHYSICS', color: 'bg-[#B1CDE0] text-black' }] },
  { id: 3, title: 'Repulsor Target UI', videoSrc: '/video/ironman.mov', tags: [{ name: 'COMPUTER VISION', color: 'bg-[#1F3A5F] text-white' }, { name: 'AI', color: 'bg-[#9FB4D1] text-black' }] },
  { id: 4, title: 'AR Emoji Emitters', videoSrc: '/video/emoji.mov', tags: [{ name: 'FACIAL TRACKING', color: 'bg-[#9FB4D1] text-black' }, { name: 'REACT', color: 'bg-[#4D7298] text-white' }] },
  { id: 5, title: 'Elastic String Physics', videoSrc: '/video/string.mov', tags: [{ name: 'GSAP', color: 'bg-[#1F3A5F] text-white' }, { name: 'CANVAS', color: 'bg-[#B1CDE0] text-black' }] },
]

export default function ExperimentsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!railRef.current || !containerRef.current) return

    const scrollWidth = railRef.current.scrollWidth - window.innerWidth + 100

    gsap.to(railRef.current, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative py-32 bg-[#FAFAFA] border-b border-black/10 overflow-hidden">
      
      <div className="px-6 md:px-12 lg:px-24 mb-24">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1] uppercase max-w-4xl">
          Built to Be Played With.
        </h2>
      </div>

      {/* Horizontal Rail */}
      <div className="pl-6 md:pl-12 lg:pl-24 w-full">
        <div ref={railRef} className="flex gap-8 w-max pb-12">
          {experiments.map((exp) => (
            <div 
              key={exp.id} 
              className="group relative flex flex-col justify-between w-[80vw] md:w-[45vw] lg:w-[25vw] aspect-square flex-shrink-0 cursor-pointer bg-white border border-black/10 transition-all duration-500 overflow-hidden"
            >
              {/* Video Background */}
              <video 
                src={exp.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/20 to-black/80 z-0 opacity-100 group-hover:opacity-60 transition-opacity duration-700" />

              <div className="relative z-10 flex flex-col justify-between h-full p-8">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 uppercase pr-8 group-hover:text-white transition-colors duration-700 drop-shadow-md">
                    {exp.title}
                  </h3>
                  
                  {/* Arrow Button */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    <MagneticButton 
                      className="w-10 h-10 bg-white flex items-center justify-center text-black"
                      style={{ clipPath: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)' }}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </MagneticButton>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span 
                      key={tag.name} 
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 shadow-sm ${tag.color}`}
                      style={{ clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)' }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
