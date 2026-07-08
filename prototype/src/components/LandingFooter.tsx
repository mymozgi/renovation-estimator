'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

const CITY_LINKS = [
  { slug: 'warszawa', label: 'Warszawa' },
  { slug: 'krakow',   label: 'Kraków'   },
  { slug: 'wroclaw',  label: 'Wrocław'  },
  { slug: 'gdansk',   label: 'Gdańsk'   },
  { slug: 'poznan',   label: 'Poznań'   },
  { slug: 'lodz',     label: 'Łódź'     },
]

const CITIES_HEADING: Record<string, string> = {
  pl: 'Ceny w miastach',
  en: 'Prices by city',
  ru: 'Цены по городам',
  uk: 'Ціни по містах',
}

export function LandingFooter() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-3">
              <Image src="/logo-header-remonta.png" alt="Remonta" width={140} height={28} />
            </Link>
            <p className="text-base text-[#969998] leading-relaxed max-w-xs">{t('tagline')}</p>
            <a href="mailto:remontapoland@gmail.com" className="text-base text-[#969998] hover:text-fg transition-colors mt-2 inline-block">
              remontapoland@gmail.com
            </a>
          </div>

          <div>
            <div className="font-mono text-base text-fg mb-3">{CITIES_HEADING[locale] ?? CITIES_HEADING['pl']}</div>
            <div className="flex flex-col gap-2">
              {CITY_LINKS.map(({ slug, label }) => (
                <Link key={slug} href={`/${locale}/remont/${slug}`} className="text-base text-[#969998] hover:text-fg transition-colors">
                  {label}
                </Link>
              ))}
            </div>
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
          <p className="text-base text-[#969998]">© {year} Remonta. {t('rights')}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/regulamin`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('terms')}</Link>
            <Link href={`/${locale}/o-nas`} className="text-base text-[#969998] hover:text-fg transition-colors">{t('aboutUs')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
