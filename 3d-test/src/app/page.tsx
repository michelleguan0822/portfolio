'use client'
import { SplineScene } from '@/components/ui/spline-scene'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const projects = [
    { title: 'Project Alpha', desc: 'Next-gen AI interface', pos: 'top-8 left-8' },
    { title: 'Project Beta', desc: 'Immersive 3D environments', pos: 'top-8 right-8' },
    { title: 'Project Gamma', desc: 'Data visualization engine', pos: 'bottom-8 left-8' },
    { title: 'Project Delta', desc: 'Real-time collaboration tools', pos: 'bottom-8 right-8' },
  ]

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      {/* Background Spline Scene */}
      <div className="absolute inset-0 z-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Center Title - Optional, maybe keep it minimal */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent opacity-80 mix-blend-plus-lighter">
          ROBO.SYS
        </h1>
        <p className="mt-4 text-zinc-500 tracking-widest text-sm uppercase">Interactive Portfolio Node</p>
      </div>

      {/* 4 Corner Projects */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`absolute ${project.pos} pointer-events-auto group`}
          >
            <div className="w-64 p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:-translate-y-1 hover:border-white/30 cursor-pointer overflow-hidden relative">
              {/* Subtle gradient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
                  <ArrowRight className="w-4 h-4 text-white/0 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white/70 transition-all duration-300" />
                </div>
                <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {project.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
