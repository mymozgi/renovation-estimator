'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'

interface WizardLayoutProps {
  step?: number
  totalSteps?: number
  onBack?: () => void
  backHref?: string
  children: React.ReactNode
  footer?: React.ReactNode
  hideBack?: boolean
  containerClass?: string
}

export function WizardLayout({
  step,
  totalSteps,
  onBack,
  backHref,
  children,
  footer,
  hideBack,
  containerClass,
}: WizardLayoutProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) onBack()
    else if (backHref) router.push(backHref)
    else router.back()
  }

  return (
    <div className={`flex flex-col min-h-screen bg-bg mx-auto ${containerClass ?? 'max-w-[1464px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-5 pb-3">
        {/* Left: back button */}
        {!hideBack ? (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-fg" />
          </button>
        ) : (
          <div className="w-9" />
        )}

        {/* Centre: step indicator */}
        {step && totalSteps ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted tracking-wide">
              {step}/{totalSteps}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    i < step ? 'w-5 bg-primary' : 'w-2 bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}

        {/* Right: language switcher */}
        <LanguageSwitcher />
      </div>

      {/* Content */}
      <div className="flex-1 px-8 pb-4 overflow-y-auto">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-8 pb-8 pt-3 border-t border-border bg-bg">
          {footer}
        </div>
      )}
    </div>
  )
}
