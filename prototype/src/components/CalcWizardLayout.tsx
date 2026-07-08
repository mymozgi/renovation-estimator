'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { WizardFooterNav } from './WizardFooterNav'

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
  const locale = useLocale()
  const resolvedNextLabel = nextLabel ?? t('btnNext')

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-white border-b border-border w-full">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10 h-20 flex items-center gap-4">
          <Link href={`/${locale}`} className="shrink-0">
            <Image src="/logo-header-remonta.png" alt="Remonta" width={160} height={32} priority />
          </Link>
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
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10 py-8 sm:py-12">
          {children}
        </div>
      </div>

      {/* Footer nav */}
      {!hideFooterNav && (
        <WizardFooterNav
          onBack={onBack}
          onNext={onNext}
          backLabel={t('prevStep')}
          nextLabel={resolvedNextLabel}
          nextDisabled={nextDisabled}
          showBack={showBack}
        />
      )}
    </div>
  )
}
