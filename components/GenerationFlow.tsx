import React from 'react'
import {
  AlertCircle,
  ArrowRight,
  BookmarkCheck,
  Brain,
  Check,
  CheckCircle2,
  Circle,
  FileText,
  Hourglass,
  Palette,
  RotateCcw,
  Shuffle,
  Sparkles,
} from 'lucide-react'

type FlowStep = {
  number: string
  title: string
  description: string
  image: string
  alt: string
}

const initialSteps: FlowStep[] = [
  {
    number: '01',
    title: 'Chat',
    description: 'Users shared meaningful moments in conversation.',
    image: '/images/unimo/old_flow/Chat.png',
    alt: 'Original UNIMO conversation screen',
  },
  {
    number: '02',
    title: 'Random chance',
    description: 'Card creation depended on an unexpected dice event.',
    image: '/images/unimo/old_flow/random%20dice.png',
    alt: 'Original random dice screen',
  },
  {
    number: '03',
    title: 'Unlock',
    description: 'The system randomly decided what the card would become.',
    image: '/images/unimo/old_flow/got%20a%20card.png',
    alt: 'Original card unlock screen',
  },
  {
    number: '04',
    title: 'Wait',
    description: 'A long loading state gave users no sense of progress.',
    image: '/images/unimo/loading.png',
    alt: 'Original card loading state',
  },
]

const finalSteps: FlowStep[] = [
  {
    number: '01',
    title: 'Choose',
    description: 'AI surfaces meaningful moments for the user to review.',
    image: '/images/unimo/new_flow/chat.jpg',
    alt: 'Redesigned UNIMO conversation screen',
  },
  {
    number: '02',
    title: 'Confirm',
    description: 'The user decides which moment becomes a card.',
    image: '/images/unimo/new_flow/forge%20card.png',
    alt: 'Redesigned card creation entry point',
  },
  {
    number: '03',
    title: 'Generate',
    description: 'Visible states explain what the system is doing.',
    image: '/images/unimo/new_flow/card%20gen.jpg',
    alt: 'Redesigned card generation screen',
  },
  {
    number: '04',
    title: 'Ready',
    description: 'The completed card returns with a clear ready state.',
    image: '/images/unimo/new_flow/front_card.jpg',
    alt: 'Completed UNIMO Emotion Card',
  },
]

function FlowArrow({ accent = false }: { accent?: boolean }) {
  return (
    <div className={`hidden md:flex absolute top-[48%] -right-5 translate-x-1/2 items-center justify-center ${accent ? 'text-[#7983D9]/50' : 'text-neutral-300'}`}>
      <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}

function FlowRow({ steps, accent = false }: { steps: FlowStep[]; accent?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-7">
      {steps.map((step, index) => (
        <div key={step.title} className="relative min-w-0">
          <p className={`mb-3 text-[10px] font-bold tracking-[0.18em] ${accent ? 'text-[#7983D9]' : 'text-neutral-400'}`}>
            {step.number}
          </p>
          <div className={`overflow-hidden rounded-[1.4rem] border bg-white shadow-[0_12px_35px_rgba(0,0,0,0.06)] ${accent ? 'border-[#7983D9]/25' : 'border-black/10'}`}>
            <img
              src={step.image}
              alt={step.alt}
              className="block h-auto w-full"
            />
          </div>
          <h5 className="mt-4 text-sm font-bold text-neutral-900">{step.title}</h5>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">{step.description}</p>
          {index < steps.length - 1 && <FlowArrow accent={accent} />}
        </div>
      ))}
    </div>
  )
}

function ProblemSummary() {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Unclear',
      copy: 'Users did not know how to create a card.',
    },
    {
      icon: Shuffle,
      title: 'Random',
      copy: 'The system chose the content without user input.',
    },
    {
      icon: Hourglass,
      title: 'Passive',
      copy: 'Users waited without knowing what was happening.',
    },
  ]

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 border-t border-black/10 pt-7 sm:grid-cols-3">
      {problems.map(({ icon: Icon, title, copy }) => (
        <div key={title} className="flex items-start gap-3">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#B75B5B]" strokeWidth={1.7} aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-neutral-900">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">{copy}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function GenerationFlowComparison() {
  return (
    <div className="my-14 space-y-16">
      <section aria-labelledby="initial-generation-flow">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Initial Flow</p>
            <h3 id="initial-generation-flow" className="text-xl font-bold text-neutral-900">A random reward loop with little user control</h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-500 md:text-right">
            Users had to wait for a random chance before they could create a card.
          </p>
        </div>
        <FlowRow steps={initialSteps} />
        <ProblemSummary />
      </section>

      <section aria-labelledby="final-generation-flow" className="border-t border-black/10 pt-12">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7983D9]">Final Flow</p>
            <h3 id="final-generation-flow" className="text-xl font-bold text-neutral-900">A guided flow built around user intent</h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-500 md:text-right">
            Users choose what matters, while clear system states make generation easy to follow.
          </p>
        </div>
        <FlowRow steps={finalSteps} accent />
      </section>
    </div>
  )
}

const progressStages = [
  {
    label: 'Identifying',
    detail: 'Finding meaningful moments',
    icon: Sparkles,
    completed: 0,
  },
  {
    label: 'Analyzing',
    detail: 'Understanding emotional context',
    icon: Brain,
    completed: 1,
  },
  {
    label: 'Formatting',
    detail: 'Building the card summary',
    icon: FileText,
    completed: 2,
  },
  {
    label: 'Ready',
    detail: 'Your Emotion Card is complete',
    icon: Palette,
    completed: 3,
  },
]

export function GenerationProgressStates() {
  return (
    <div className="my-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {progressStages.map((stage, stageIndex) => {
        const StageIcon = stage.icon
        return (
          <div key={stage.label} className="overflow-hidden rounded-[1.5rem] border border-[#7983D9]/20 bg-[#414982] shadow-[0_14px_40px_rgba(40,44,89,0.12)]">
            <div className="flex aspect-[9/16] flex-col p-5 text-white">
              <div className="mb-8 flex items-center justify-between text-[9px] text-white/60">
                <span>9:41</span>
                <span>{String(stageIndex + 1).padStart(2, '0')} of 04</span>
              </div>

              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                {stageIndex === progressStages.length - 1 ? (
                  <CheckCircle2 className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <StageIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                )}
              </div>

              <p className="text-base font-bold">{stage.label}</p>
              <p className="mt-2 min-h-[2.5rem] text-[11px] leading-relaxed text-white/65">{stage.detail}</p>

              <div className="mt-8 space-y-3">
                {progressStages.slice(0, 3).map((item, itemIndex) => {
                  const isComplete = itemIndex < stage.completed || stageIndex === progressStages.length - 1
                  const isActive = itemIndex === stage.completed && stageIndex < progressStages.length - 1
                  return (
                    <div key={item.label} className={`flex items-center gap-2 text-[10px] ${isComplete || isActive ? 'text-white' : 'text-white/35'}`}>
                      {isComplete ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Circle className={`h-3.5 w-3.5 ${isActive ? 'fill-white/20' : ''}`} strokeWidth={1.5} aria-hidden="true" />
                      )}
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-auto h-1 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${((stageIndex + 1) / progressStages.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-white px-4 py-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-900">{stage.label}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function GenerationRecoveryFlow() {
  const recoverySteps = [
    {
      icon: AlertCircle,
      title: 'Generation paused',
      copy: 'A clear status replaces a dead end.',
    },
    {
      icon: BookmarkCheck,
      title: 'Moment saved',
      copy: 'The selected context stays preserved.',
    },
    {
      icon: RotateCcw,
      title: 'Try again',
      copy: 'Generation resumes from the saved moment.',
    },
  ]

  return (
    <div className="my-10 border-y border-black/10 py-8">
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {recoverySteps.map(({ icon: Icon, title, copy }, index) => (
          <React.Fragment key={title}>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7983D9]/10 text-[#7983D9]">
                <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">{copy}</p>
              </div>
            </div>
            {index < recoverySteps.length - 1 && (
              <ArrowRight className="mx-auto h-4 w-4 rotate-90 text-neutral-300 md:rotate-0" strokeWidth={1.5} aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
