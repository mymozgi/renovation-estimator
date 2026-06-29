'use client'

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
  nextLabel = 'Dalej',
  showBack = true,
  children,
  hideFooterNav,
}: CalcWizardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <span className="font-bold text-fg text-base">Remontowo</span>
          <div className="w-px h-5 bg-border" />
          <span className="bg-primary-fixed text-primary text-xs font-semibold px-3 py-1 rounded-full">
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
        <div className="max-w-3xl mx-auto px-6 py-12">
          {children}
        </div>
      </div>

      {/* Footer nav */}
      {!hideFooterNav && (
        <div className="sticky bottom-0 z-10 border-t border-border bg-surface shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            {showBack ? (
              <button
                onClick={onBack}
                className="px-5 py-2 rounded-full border border-border text-fg text-sm font-medium hover:bg-bg transition-colors"
              >
                Poprzedni krok
              </button>
            ) : <div />}
            {onNext && (
              <button
                onClick={onNext}
                disabled={nextDisabled}
                className="px-7 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
