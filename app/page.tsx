import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ManifestoSection from '@/components/ManifestoSection'
import ProcessSection from '@/components/ProcessSection'
import MinimalMarquee from '@/components/MinimalMarquee'
import ExperimentsSection from '@/components/ExperimentsSection'
import FooterSection from '@/components/FooterSection'
import CustomCursor from '@/components/CustomCursor'
import AmbientBackground from '@/components/AmbientBackground'
import PhysicsCursor from '@/components/PhysicsCursor'

export default function Home() {
  return (
    <main className="min-h-screen text-neutral-900 overflow-x-hidden selection:bg-black/10 selection:text-black">
      <AmbientBackground />
      <PhysicsCursor />
      <CustomCursor />
      <HeroSection />
      <MinimalMarquee />
      <ExperimentsSection />
      <ProjectsSection />
      <ManifestoSection />
      <ProcessSection />
      <FooterSection />
    </main>
  )
}
