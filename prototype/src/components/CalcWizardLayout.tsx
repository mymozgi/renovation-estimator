'use client'

import { useTranslations } from 'next-intl'

interface CalcWizardLayoutProps {
  stepLabel: string
  progress: number        // 0–100
  onBack?: () => void
  onNext?: () => void
  nextDisabled?: boolean
  nextLabel?: string
  showBack?: boolean
  children: React.ReactNode
  hideFooterNav?: boolean
}

export function CalcWizardLayout({
  stepLabel,
  progress,
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
  showBack = true,
  children,
  hideFooterNav,
}: CalcWizardLayoutProps) {
  const t = useTranslations('calc')
  const resolvedNextLabel = nextLabel ?? t('btnNext')

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-white border-b border-border w-full">
        <div className="max-w-[1280px] mx-auto px-10 h-20 flex items-center gap-4">
          <span className="font-semibold text-fg text-2xl">Remontowo</span>
          <div className="w-px h-5 bg-border" />
          <span className="font-mono text-xs text-fg">
            {stepLabel}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-border">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1280px] mx-auto px-10 py-12">
          {children}
        </div>
      </div>

      {/* Footer nav */}
      {!hideFooterNav && (
        <div className="sticky bottom-0 z-10 border-t border-border bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.06)] w-full">
          <div className="max-w-[1280px] mx-auto px-10 py-4 flex items-center justify-between">
            {showBack ? (
              <button
                onClick={onBack}
                className="px-5 py-2 rounded-[12px] border border-border text-fg text-base font-medium hover:bg-bg transition-colors"
              >
                {t('prevStep')}
              </button>
            ) : <div />}
            {onNext && (
              <button
                onClick={onNext}
                disabled={nextDisabled}
                className="px-8 py-3 rounded-[12px] bg-primary text-white text-base font-semibold tracking-[0.08em] hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {resolvedNextLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
