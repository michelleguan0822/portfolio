'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BottomNav() {
  return (
    <motion.nav 
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]"
      initial={{ y: 50, opacity: 0, x: '-50%', rotate: -10 }}
      animate={{ y: 0, opacity: 1, x: '-50%', rotate: -3 }}
      transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
    >
      <Link href="/" className="px-6 py-3 text-sm font-bold tracking-widest uppercase text-neutral-900 hover:bg-black/5 transition-colors cursor-pointer" data-cursor="button">
        Home
      </Link>
      <Link href="/about" className="px-6 py-3 text-sm font-bold tracking-widest uppercase text-neutral-600 hover:text-neutral-900 hover:bg-black/5 transition-colors cursor-pointer" data-cursor="button">
        About Me
      </Link>
      <a href="https://docs.google.com/document/d/1nnMY9dE6ibXnX-E6lUsYYsB8xaOYNl7ozbecW_k6wP8/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-sm font-bold tracking-widest uppercase text-neutral-600 hover:text-neutral-900 hover:bg-black/5 transition-colors cursor-pointer" data-cursor="button">
        Resume
      </a>
    </motion.nav>
  )
}
