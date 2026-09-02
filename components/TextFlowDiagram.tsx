import React from 'react'

const Arrow = () => (
  <>
    <div className="hidden md:flex items-center justify-center w-6 text-neutral-300">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="flex md:hidden items-center justify-center h-6 text-neutral-300">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </>
)

export default function TextFlowDiagram() {
  const steps = [
    "Chat",
    "Random Dice",
    "Card Lottery",
    "AI Selected Content",
    "Wait",
    "Card"
  ];

  return (
    <div className="w-full bg-[#FAFAFA] border border-black/5 rounded-3xl p-6 md:p-10 shadow-sm my-8 overflow-x-auto">
      <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-2 md:gap-3 min-w-max mx-auto">
         {steps.map((step, index) => (
           <React.Fragment key={index}>
             <div className="w-28 md:w-32 h-14 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-3 text-center">
               <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-600 leading-tight">{step}</p>
             </div>
             {index < steps.length - 1 && <Arrow />}
           </React.Fragment>
         ))}
      </div>
    </div>
  )
}
