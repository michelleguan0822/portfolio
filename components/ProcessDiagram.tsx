import React from 'react'

export default function ProcessDiagram() {
  return (
    <div className="w-full bg-white border border-black/5 rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col items-center my-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
      <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-16 text-center">From Conversation to Emotion Card</h3>
      
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Step 1: Conversation */}
        <div className="flex flex-col items-center w-full md:w-1/3 group">
          <div className="w-48 h-64 border border-black/10 rounded-3xl bg-[#FAFAFA] flex flex-col p-4 gap-4 relative mb-8 group-hover:-translate-y-1 transition-transform duration-500">
            {/* Nav bar mock */}
            <div className="w-full flex justify-between items-center px-1 mb-2">
              <div className="w-3 h-3 rounded-full bg-neutral-200"></div>
              <div className="w-8 h-1.5 rounded-full bg-neutral-300"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-200"></div>
            </div>
            {/* Bubbles */}
            <div className="w-3/4 h-10 bg-white border border-black/5 rounded-2xl rounded-tl-sm self-start"></div>
            <div className="w-2/3 h-12 bg-[#7983D9]/10 border border-[#7983D9]/20 rounded-2xl rounded-tr-sm self-end"></div>
            <div className="w-5/6 h-10 bg-white border border-black/5 rounded-2xl rounded-tl-sm self-start"></div>
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900">1. Conversation</h4>
            <p className="text-sm text-neutral-500 max-w-[200px] mx-auto">Users talk naturally with UNIMO.</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex flex-col items-center justify-center w-12">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#D4D4D8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex md:hidden items-center justify-center h-12">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#D4D4D8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Step 2: Meaningful Moment */}
        <div className="flex flex-col items-center w-full md:w-1/3 group">
          <div className="w-48 h-64 border border-black/10 rounded-3xl bg-[#FAFAFA] flex flex-col items-center justify-center p-4 relative mb-8 group-hover:-translate-y-1 transition-transform duration-500">
             {/* Ghost UI */}
             <div className="absolute top-16 left-8 w-2/3 h-3 bg-neutral-200/50 rounded-full"></div>
             <div className="absolute top-24 right-8 w-1/2 h-3 bg-neutral-200/50 rounded-full"></div>
             
             {/* Highlighted extraction */}
             <div className="w-full h-20 bg-white border border-[#7983D9]/30 rounded-2xl flex flex-col justify-center px-4 relative z-10 shadow-sm">
                <div className="w-4/5 h-2 bg-[#7983D9] rounded-full opacity-80 mb-3"></div>
                <div className="w-1/2 h-2 bg-[#7983D9] rounded-full opacity-40"></div>
             </div>

             <div className="absolute bottom-20 left-8 w-3/4 h-3 bg-neutral-200/50 rounded-full"></div>
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7983D9]">2. Meaningful Moment</h4>
            <p className="text-sm text-neutral-500 max-w-[200px] mx-auto">AI identifies what matters.</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex flex-col items-center justify-center w-12">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#D4D4D8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex md:hidden items-center justify-center h-12">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#D4D4D8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Step 3: Emotion Card */}
        <div className="flex flex-col items-center w-full md:w-1/3 group">
          <div className="w-48 h-64 border border-black/10 rounded-2xl bg-white flex flex-col p-3 mb-8 relative shadow-sm group-hover:-translate-y-1 transition-transform duration-500">
             {/* Abstract Visual Area */}
             <div className="w-full aspect-[4/5] bg-[#FAFAFA] border border-black/5 rounded-xl flex items-center justify-center mb-4 overflow-hidden relative">
                {/* Simple geometric shapes for the abstract visual */}
                <div className="w-20 h-20 rounded-full bg-[#7983D9]/20 mix-blend-multiply absolute -top-4 -right-4"></div>
                <div className="w-16 h-16 rounded-full bg-[#7983D9]/40 mix-blend-multiply absolute top-8 left-4"></div>
             </div>
             <div className="w-3/4 h-2 bg-neutral-200 rounded-full mx-1 mb-2.5"></div>
             <div className="w-1/2 h-2 bg-neutral-100 rounded-full mx-1"></div>
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900">3. Emotion Card</h4>
            <p className="text-sm text-neutral-500 max-w-[200px] mx-auto">Users can save and revisit it.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
