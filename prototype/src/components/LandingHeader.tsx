'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function LandingHeader() {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: `/${locale}#jak-to-dziala`, label: t('howItWorks') },
    { href: `/${locale}/kalkulator`,    label: t('calculator') },
    { href: `/${locale}/articles`,      label: t('articles')   },
  ]

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="max-w-[1280px] mx-auto px-10 h-20 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="font-semibold text-fg text-2xl tracking-tight">
          Remontowo
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-base text-primary hover:text-primary/80 transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/kalkulator`}
            className="hidden md:inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-green-100 text-fg hover:bg-green-100/80 tracking-[0.07em] transition-colors"
          >
            {t('freePricing')}
          </Link>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-base text-primary py-1">
              {label}
            </Link>
          ))}
          <div className="pt-1 border-t border-border flex items-center justify-between">
            <LanguageSwitcher />
            <Link href={`/${locale}/kalkulator`} onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center px-6 py-3 rounded-full text-sm font-medium bg-green-100 text-fg tracking-[0.07em]">
              {t('freePricing')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
