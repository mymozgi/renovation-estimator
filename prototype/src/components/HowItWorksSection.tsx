'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

const STEP_IMAGE_LABELS = [
  'Konfiguracja pokoi i wymiarów',
  'Wybór standardu wykończenia',
  'Gotowy kosztorys z PDF',
]

export function HowItWorksSection() {
  const t = useTranslations('howItWorks')
  const [activeStep, setActiveStep] = useState(1)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    stepRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i + 1)
        },
        { rootMargin: '-35% 0px -35% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">

      {/* ── Left: step cards ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        {([1, 2, 3] as const).map((n, i) => (
          <div
            key={n}
            ref={(el) => { stepRefs.current[i] = el }}
            className={`rounded-2xl border p-6 transition-all duration-400 ${
              activeStep === n
                ? 'bg-surface border-primary/30 shadow-sm'
                : 'bg-surface border-border opacity-40'
            }`}
          >
            <div className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center mb-4 transition-colors duration-400 ${
              activeStep === n
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-primary'
            }`}>
              {n}
            </div>
            <div className="font-semibold text-fg text-base mb-2">
              {t(`step${n}Title`)}
            </div>
            <div className="text-muted text-sm leading-relaxed">
              {t(`step${n}Desc`)}
            </div>

            {/* Mobile: inline image after each card */}
            <div className={`lg:hidden mt-5 transition-all duration-500 overflow-hidden ${
              activeStep === n ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="relative aspect-video rounded-xl bg-border/40 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-border/60 flex items-center justify-center">
                  <span className="text-muted text-base">🖼</span>
                </div>
                <span className="text-xs text-muted">{STEP_IMAGE_LABELS[i]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Right: sticky image panel (desktop only) ───────────────────── */}
      <div className="hidden lg:flex flex-col sticky top-24">
        {/* Image area — all 3 stacked, show/hide with opacity */}
        <div className="relative aspect-video rounded-2xl bg-border/40 overflow-hidden">
          {([1, 2, 3] as const).map((n, i) => (
            <div
              key={n}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-500 ${
                activeStep === n ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-border/60 flex items-center justify-center">
                <span className="text-muted text-xl">🖼</span>
              </div>
              <span className="text-xs text-muted text-center px-6">
                {STEP_IMAGE_LABELS[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Step label */}
        <div className="mt-3 text-center">
          <p className="text-sm font-medium text-fg transition-all duration-300">
            {t(`step${activeStep as 1 | 2 | 3}Title`)}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-3">
          {([1, 2, 3] as const).map((n) => (
            <div
              key={n}
              className={`rounded-full transition-all duration-300 ${
                activeStep === n
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
