'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MagneticButton from './MagneticButton'

export default function TopNav() {
  const pathname = usePathname()

  const links = [
    { name: 'WORK', href: '/' },
    { name: 'ABOUT', href: '/about' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference text-white pointer-events-none">
      {/* Logo */}
      <Link href="/" className="pointer-events-auto">
        <MagneticButton className="font-bold text-xl tracking-tighter">
          WILD.
        </MagneticButton>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-8 pointer-events-auto">
        {links.map(link => (
          <Link key={link.name} href={link.href}>
            <MagneticButton 
              className={`text-xs font-bold uppercase tracking-widest transition-opacity ${pathname === link.href ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
            >
              {link.name}
            </MagneticButton>
          </Link>
        ))}
        
        <MagneticButton 
          className="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-4 py-2 hover:bg-neutral-200 transition-colors"
          style={{ clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)' }}
        >
          CONTACT
        </MagneticButton>
      </div>
    </nav>
  )
}
