'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <img src="/image/logo.png" alt="Logo" className="h-4 opacity-50" />
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Michelle Guan. Built with Next.js.
          </p>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-zinc-400">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
          <a href="mailto:michelleguan321@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
