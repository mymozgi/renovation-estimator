import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Home } from 'lucide-react'

const LANGUAGES = [
  { code: 'pl', label: '🇵🇱 Polski' },
  { code: 'en', label: '🇬🇧 English' },
  { code: 'ru', label: '🇷🇺 Русский' },
]

export function LandingFooter() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <Home size={14} className="text-white" />
              </div>
              <span className="font-serif font-bold text-fg text-base">EstiMate</span>
            </Link>
            <p className="text-xs text-muted leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Product */}
          <div>
            <div className="text-xs font-semibold text-fg uppercase tracking-wide mb-3">{t('product')}</div>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/estimate`} className="text-sm text-muted hover:text-fg transition-colors">{nav('startEstimate')}</Link>
              <Link href={`/${locale}/methodology`} className="text-sm text-muted hover:text-fg transition-colors">{nav('methodology')}</Link>
              <Link href={`/${locale}/articles`} className="text-sm text-muted hover:text-fg transition-colors">{nav('articles')}</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="text-xs font-semibold text-fg uppercase tracking-wide mb-3">{t('resources')}</div>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/methodology`} className="text-sm text-muted hover:text-fg transition-colors">{nav('methodology')}</Link>
              <Link href={`/${locale}/articles`} className="text-sm text-muted hover:text-fg transition-colors">{nav('articles')}</Link>
            </div>
          </div>

          {/* Languages */}
          <div>
            <div className="text-xs font-semibold text-fg uppercase tracking-wide mb-3">{t('languages')}</div>
            <div className="flex flex-col gap-2">
              {LANGUAGES.map(({ code, label }) => (
                <Link key={code} href={`/${code}`}
                  className={`text-sm transition-colors ${locale === code ? 'text-primary font-medium' : 'text-muted hover:text-fg'}`}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-border">
          <p className="text-xs text-muted">© {year} EstiMate. {t('rights')}</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted hover:text-fg transition-colors">{t('privacy')}</Link>
            <Link href="#" className="text-xs text-muted hover:text-fg transition-colors">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
