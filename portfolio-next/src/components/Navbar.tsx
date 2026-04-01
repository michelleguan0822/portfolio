'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, FileText } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Visual Playground', href: '/visual-playground' },
  { name: 'About Me', href: '/about-me' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[2000] w-[calc(100%-2rem)] sm:w-auto">
      <nav className={`
        flex flex-col items-center transition-all duration-300 ease-in-out
        backdrop-blur-md rounded-[2rem] border border-white/10 bg-black/20
        ${scrolled ? 'py-2 px-4 shadow-2xl' : 'py-3 px-6'}
      `}>
        <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
             <img src="/image/logo.png" alt="Logo" className="h-4 opacity-80 hover:opacity-100 transition-opacity" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="group relative overflow-hidden h-5">
                <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                   <span className="text-gray-400 h-5 flex items-center text-sm">{link.name}</span>
                   <span className="text-white h-5 flex items-center text-sm font-medium">{link.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
             <a href="mailto:michelleguan321@gmail.com" 
                className="px-4 py-2 text-xs border border-white/10 bg-white/5 text-gray-300 rounded-full hover:border-white/30 hover:text-white transition-all">
               Contact Me
             </a>
             <a href="/resume.pdf" 
                className="px-4 py-2 text-xs font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-all shadow-lg shadow-white/10">
               Resume
             </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="sm:hidden p-1 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden w-full overflow-hidden border-t border-white/5 mt-4"
            >
              <div className="flex flex-col items-center space-y-4 py-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors text-lg"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col items-center gap-4 w-full pt-4 border-t border-white/5">
                   <a href="mailto:michelleguan321@gmail.com" className="w-full text-center py-3 rounded-full border border-white/10 text-gray-400">
                     Contact Me
                   </a>
                   <a href="/resume.pdf" className="w-full text-center py-3 rounded-full bg-white text-black font-bold">
                     Resume
                   </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
