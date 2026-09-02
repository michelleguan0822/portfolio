import React from 'react'

export default function GoalDiagram() {
  return (
    <div className="w-full bg-[#FAFAFA] border border-black/5 rounded-[2rem] p-8 md:p-12 my-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 overflow-hidden">
      
      {/* Left: Chat / User */}
      <div className="flex flex-col items-center flex-1">
        <div className="w-20 h-20 rounded-full bg-white border border-black/5 shadow-sm flex flex-col items-center justify-center p-4 gap-2 mb-4">
           <div className="w-full h-2 bg-neutral-100 rounded-full"></div>
           <div className="w-2/3 h-2 bg-neutral-100 rounded-full self-start"></div>
        </div>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Chat History</p>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center px-2">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12H38M38 12L30 4M38 12L30 20" stroke="#D4D4D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex md:hidden items-center justify-center py-2 text-neutral-300">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
          <path d="M0 12H38M38 12L30 4M38 12L30 20" stroke="#D4D4D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Middle Box: The Solution */}
      <div className="flex flex-col items-center flex-[2] w-full">
        <div className="w-full bg-white border border-[#7983D9]/20 rounded-3xl p-6 md:p-8 flex items-center justify-center gap-6 md:gap-12 shadow-sm relative">
           
           <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-[#7983D9]/5 flex items-center justify-center mb-4 text-[#7983D9]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                </svg>
             </div>
             <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">AI Extraction</p>
           </div>
           
           <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-[#7983D9]/5 flex items-center justify-center mb-4 text-[#7983D9]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
             </div>
             <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Visual Format</p>
           </div>

        </div>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7983D9] mt-6 text-center">Meaningful Moment</p>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center px-2">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12H38M38 12L30 4M38 12L30 20" stroke="#D4D4D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex md:hidden items-center justify-center py-2 text-neutral-300">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
          <path d="M0 12H38M38 12L30 4M38 12L30 20" stroke="#D4D4D8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Right: Emotion Card */}
      <div className="flex flex-col items-center flex-1">
        <div className="w-20 h-24 rounded-xl bg-white border border-black/10 shadow-sm flex items-center justify-center mb-4 relative overflow-hidden group">
            <div className="w-10 h-10 rounded-full bg-[#7983D9]/20 blur-md absolute top-[-10px] right-[-10px] transition-all group-hover:scale-150"></div>
            <div className="w-12 h-16 bg-[#FAFAFA] border border-black/5 rounded-md flex flex-col p-2 gap-1 z-10 shadow-sm transform group-hover:-translate-y-1 transition-transform">
               <div className="w-full h-1/2 bg-neutral-200 rounded-sm"></div>
               <div className="w-full h-1 bg-neutral-200 rounded-full mt-1"></div>
               <div className="w-2/3 h-1 bg-neutral-200 rounded-full"></div>
            </div>
        </div>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Emotion Card</p>
      </div>

    </div>
  )
}
