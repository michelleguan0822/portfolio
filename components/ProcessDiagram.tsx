import React from 'react'

const Arrow = ({ color = "#D4D4D8", opacity = "1" }) => (
  <>
    <div className="hidden md:flex flex-col items-center justify-center w-8" style={{ opacity }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="flex md:hidden items-center justify-center h-8" style={{ opacity }}>
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </>
)

export default function ProcessDiagram({ flow = 'both' }: { flow?: 'initial' | 'final' | 'both' }) {
  const renderInitial = () => (
    <div className="w-full bg-[#FAFAFA] border border-black/5 rounded-3xl p-8 md:p-16 my-8 overflow-x-auto shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 min-w-max mx-auto">
         
         <div className="w-full md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600">Chatting</p>
         </div>
         
         <Arrow />
         
         <div className="w-full md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600">Roll Dice</p>
         </div>
         
         <Arrow />
         
         <div className="w-full md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600">Card Lottery</p>
         </div>
         
         <Arrow />

         <div className="w-full md:w-36 h-16 bg-white border border-black/10 rounded-xl shadow-sm flex items-center justify-center px-4">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-600">Emotion Card</p>
         </div>
      </div>
    </div>
  )

  const renderFinal = () => (
    <div className="w-full bg-white border border-[#7983D9]/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(121,131,217,0.05)] relative overflow-hidden mt-8 mb-4">
      {/* Subtle accent glow */}
      <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[80%] aspect-square rounded-full bg-[#7983D9] blur-3xl opacity-5 pointer-events-none" />
      
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7983D9] mb-8 md:mb-12 text-center relative z-10">Final Flow: Guided Selection</h4>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
         {/* Step 1 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-24 md:w-32 lg:w-40 rounded-2xl lg:rounded-3xl bg-white border border-[#7983D9]/20 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/new_flow/chat.jpg" alt="Conversation UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Conversation</p>
         </div>
         <Arrow color="#7983D9" opacity="0.4" />
         
         {/* Step 2 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-24 md:w-32 lg:w-40 rounded-2xl lg:rounded-3xl bg-white border border-[#7983D9]/20 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/new_flow/forge%20card.png" alt="10 Sentences UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">10 Sentences</p>
         </div>
         <Arrow color="#7983D9" opacity="0.4" />
         
         {/* Step 3 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-24 md:w-32 lg:w-40 rounded-2xl lg:rounded-3xl bg-white border border-[#7983D9]/20 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/new_flow/card%20gen.jpg" alt="5 Moments UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">5 Moments</p>
         </div>
         <Arrow color="#7983D9" opacity="0.4" />

         {/* Step 4 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-24 md:w-32 lg:w-40 rounded-2xl lg:rounded-3xl bg-white border border-[#7983D9]/20 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/new_flow/front_card.jpg" alt="Emotion Card UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7983D9] text-center">1 Emotion Card</p>
         </div>
      </div>
    </div>
  )

  if (flow === 'initial') return renderInitial();
  if (flow === 'final') return renderFinal();
  
  return (
    <div className="w-full flex flex-col gap-8 my-16">
      {renderInitial()}
      {renderFinal()}
    </div>
  )
}
