import React from 'react'

const Arrow = () => (
  <>
    <div className="hidden md:flex items-center justify-center w-8 text-neutral-300">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="flex md:hidden items-center justify-center h-8 text-neutral-300">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </>
)

export default function TextFlowDiagram() {
  return (
    <div className="w-full bg-[#FAFAFA] border border-black/5 rounded-3xl p-8 md:p-12 shadow-sm my-8 overflow-x-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 min-w-max mx-auto">
         
         <div className="w-32 md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600 text-center">Chatting</p>
         </div>
         
         <Arrow />
         
         <div className="w-32 md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600 text-center">Roll Dice</p>
         </div>
         
         <Arrow />
         
         <div className="w-32 md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600 text-center">Card Lottery</p>
         </div>
         
         <Arrow />

         <div className="w-32 md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600 text-center">Emotion Card</p>
         </div>
         
      </div>
    </div>
  )
}
