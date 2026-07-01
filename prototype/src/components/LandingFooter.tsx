'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export function LandingFooter() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="font-bold text-fg text-base mb-2">Remontowo</div>
            <p className="text-xs text-muted leading-relaxed max-w-xs">{t('tagline')}</p>
          </div>

          <div>
            <div className="text-xs font-semibold text-fg uppercase tracking-wider mb-3">{t('infoSection')}</div>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/o-nas`} className="text-sm text-muted hover:text-fg transition-colors">{t('aboutUs')}</Link>
              <Link href={`/${locale}/regulamin`} className="text-sm text-muted hover:text-fg transition-colors">{t('terms')}</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-fg uppercase tracking-wider mb-3">{t('toolsSection')}</div>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/kalkulator`} className="text-sm text-muted hover:text-fg transition-colors">{t('calculator')}</Link>
              <Link href={`/${locale}/articles`} className="text-sm text-muted hover:text-fg transition-colors">{t('guides')}</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted">© {year} Remontowo. {t('rights')}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/regulamin`} className="text-xs text-muted hover:text-fg transition-colors">{t('terms')}</Link>
            <Link href={`/${locale}/o-nas`} className="text-xs text-muted hover:text-fg transition-colors">{t('aboutUs')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
