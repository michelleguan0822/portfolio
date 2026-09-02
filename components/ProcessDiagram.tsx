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
    <div className="w-full bg-white border border-black/5 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] mt-8 mb-4">
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8 md:mb-12 text-center">Initial Flow: Random Reward</h4>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         {/* Step 1 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-16 sm:w-20 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/old_flow/Chat.png" alt="Conversation UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Conversation</p>
         </div>
         <Arrow />
         
         {/* Step 2 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-16 sm:w-20 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/old_flow/random%20dice.png" alt="Random Dice UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Random Dice</p>
         </div>
         <Arrow />
         
         {/* Step 3 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-16 sm:w-20 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/old_flow/Card%20Lottery.png" alt="Card Lottery UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Card Lottery</p>
         </div>
         <Arrow />

         {/* Step 4 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-16 sm:w-20 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform shadow-sm overflow-hidden">
              <img src="/images/unimo/old_flow/Card%20Gen..png" alt="Card Generation UI" className="w-full h-auto object-cover" />
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Card Gen.</p>
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
           <div className="w-24 h-24 rounded-2xl bg-white border border-[#7983D9]/20 shadow-sm flex flex-col items-center justify-center p-3 gap-2 mb-4 group-hover:-translate-y-1 transition-transform">
              <div className="w-full h-2 bg-neutral-100 rounded-full"></div>
              <div className="w-3/4 h-2 bg-neutral-100 rounded-full self-start"></div>
              <div className="w-1/2 h-2 bg-neutral-100 rounded-full self-end mt-2"></div>
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">Conversation</p>
         </div>
         <Arrow color="#7983D9" opacity="0.4" />
         
         {/* Step 2 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-24 h-24 rounded-2xl bg-white border border-[#7983D9]/20 shadow-sm flex flex-col gap-2 items-center justify-center p-4 mb-4 group-hover:-translate-y-1 transition-transform">
              {[...Array(4)].map((_, i) => <div key={i} className="w-full h-1.5 bg-[#7983D9]/20 rounded-full"></div>)}
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">10 Sentences</p>
         </div>
         <Arrow color="#7983D9" opacity="0.4" />
         
         {/* Step 3 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-24 h-24 rounded-2xl bg-[#7983D9]/5 border border-[#7983D9]/30 shadow-sm flex flex-col gap-2.5 items-center justify-center p-4 mb-4 group-hover:-translate-y-1 transition-transform">
              <div className="w-full h-2 bg-[#7983D9]/60 rounded-full"></div>
              <div className="w-3/4 h-2 bg-[#7983D9]/60 rounded-full"></div>
           </div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900 text-center">5 Moments</p>
         </div>
         <Arrow color="#7983D9" opacity="0.4" />

         {/* Step 4 */}
         <div className="flex flex-col items-center w-full md:w-1/4 group">
           <div className="w-24 h-24 rounded-2xl bg-[#7983D9]/10 border border-[#7983D9]/40 shadow-sm flex items-center justify-center mb-4 relative overflow-hidden group-hover:-translate-y-1 transition-transform">
              <div className="w-12 h-16 bg-white border border-[#7983D9]/20 shadow-md rounded-lg flex items-center justify-center overflow-hidden relative">
                 <div className="w-6 h-6 rounded-full bg-[#7983D9]/20 mix-blend-multiply absolute -top-1 -right-1"></div>
                 <div className="w-4 h-4 rounded-full bg-[#7983D9]/40 mix-blend-multiply absolute top-4 left-2"></div>
              </div>
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
