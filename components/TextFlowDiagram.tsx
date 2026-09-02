import React from 'react'

const Arrow = () => (
  <>
    <div className="hidden lg:flex items-center justify-center w-6 text-neutral-300">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="flex lg:hidden items-center justify-center h-6 text-neutral-300">
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
    "AI Selected",
    "Wait",
    "Card"
  ];

  return (
    <div className="w-full bg-[#FAFAFA] border border-black/5 rounded-3xl p-6 md:p-10 shadow-sm my-8">
      <p className="text-xs font-bold text-neutral-400 mb-6 uppercase tracking-wider text-center lg:text-left">Initial Flow</p>
      <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-2 lg:gap-0 w-full mx-auto">
         {steps.map((step, index) => (
           <React.Fragment key={index}>
             <div className="w-40 lg:w-32 h-14 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-3 text-center shrink-0">
               <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-neutral-600 leading-tight">{step}</p>
             </div>
             {index < steps.length - 1 && <Arrow />}
           </React.Fragment>
         ))}
      </div>
    </div>
  )
}
