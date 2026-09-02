import React from 'react'

const ArrowRight = () => (
  <div className="hidden lg:flex items-center justify-center w-6 text-neutral-300">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  </div>
)

const ArrowDown = () => (
  <div className="flex items-center justify-center h-8 text-neutral-300">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
  </div>
)

const Step = ({ title, active = false }: { title: string, active?: boolean }) => (
  <div className={`w-full lg:w-32 h-16 rounded-2xl border flex items-center justify-center p-2 text-center transition-all ${active ? 'bg-[#7983D9]/5 border-[#7983D9]/30 text-[#7983D9]' : 'bg-white border-black/10 text-neutral-600 shadow-sm'}`}>
    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">{title}</span>
  </div>
)

const ErrorStep = ({ error, resolution }: { error: string, resolution: string }) => (
  <div className="flex flex-col items-center">
    <ArrowDown />
    <div className="w-full lg:w-32 rounded-2xl bg-orange-50 border border-orange-200/50 p-3 text-center flex flex-col gap-2">
      <span className="text-[9px] font-bold uppercase tracking-wider text-orange-600/70">{error}</span>
      <div className="w-full h-[1px] bg-orange-200/50"></div>
      <span className="text-[10px] font-semibold tracking-wide text-orange-900">{resolution}</span>
    </div>
  </div>
)

export default function SystemStateFlow() {
  return (
    <div className="w-full bg-[#FAFAFA] border border-black/5 rounded-[2rem] p-6 lg:p-12 my-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-x-auto">
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-12 text-center">Card Generation State Flow</h4>
      
      <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-2 min-w-max mx-auto px-4">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <Step title="User Request" />
        </div>
        
        <ArrowRight />
        
        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <Step title="Analyzing" active />
        </div>
        
        <ArrowRight />
        
        {/* Step 3 & Error */}
        <div className="flex flex-col items-center">
          <Step title="Selecting" active />
          <ErrorStep error="Empty Response" resolution="Return to Chat" />
        </div>

        <ArrowRight />
        
        {/* Step 4 & Error */}
        <div className="flex flex-col items-center">
          <Step title="Summarizing" active />
          <ErrorStep error="Timeout" resolution="Try Again" />
        </div>

        <ArrowRight />
        
        {/* Step 5 & Error */}
        <div className="flex flex-col items-center">
          <Step title="Generating" active />
          <ErrorStep error="Failure" resolution="Preserve Progress" />
        </div>

        <ArrowRight />
        
        {/* Step 6 */}
        <div className="flex flex-col items-center">
          <Step title="Success" />
        </div>

      </div>
    </div>
  )
}
