'use client'

interface WizardFooterNavProps {
  onBack?: () => void
  onNext?: () => void
  backLabel?: string
  nextLabel?: string
  nextDisabled?: boolean
  showBack?: boolean
}

export function WizardFooterNav({
  onBack,
  onNext,
  backLabel = 'Poprzedni krok',
  nextLabel = 'Dalej',
  nextDisabled = false,
  showBack = true,
}: WizardFooterNavProps) {
  return (
    <div className="sticky bottom-0 z-10 border-t border-border bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.06)] w-full">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
        {showBack ? (
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-[12px] border border-border text-fg text-base font-medium hover:bg-bg transition-colors"
          >
            {backLabel}
          </button>
        ) : <div />}
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="px-8 py-3 rounded-[12px] bg-primary text-white text-base font-semibold tracking-[0.08em] hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  )
}
