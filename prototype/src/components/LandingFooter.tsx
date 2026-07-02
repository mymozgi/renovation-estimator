'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

export function LandingFooter() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-[1280px] mx-auto px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-3">
              <Image src="/logo-header-remonta.png" alt="Remontowo" width={140} height={28} />
            </Link>
            <p className="text-base text-[#969998] leading-relaxed max-w-xs">{t('tagline')}</p>
          </div>

          <div>
            <div className="font-mono text-base text-fg mb-3">{t('infoSection')}</div>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/o-nas`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('aboutUs')}</Link>
              <Link href={`/${locale}/regulamin`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('terms')}</Link>
            </div>
          </div>

          <div>
            <div className="font-mono text-base text-fg mb-3">{t('toolsSection')}</div>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/kalkulator`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('calculator')}</Link>
              <Link href={`/${locale}/articles`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('guides')}</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-base text-[#969998]">© {year} Remontowo. {t('rights')}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/regulamin`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('terms')}</Link>
            <Link href={`/${locale}/o-nas`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('aboutUs')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
