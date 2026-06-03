'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { Menu, X, Home } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'

export function LandingHeader() {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#how-it-works', label: t('howItWorks') },
    { href: `/${locale}/articles`, label: t('articles') },
    { href: `/${locale}/methodology`, label: t('methodology') },
  ]

  return (
    <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur border-b border-border">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Home size={14} className="text-white" />
          </div>
          <span className="font-serif font-bold text-fg text-base">EstiMate</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-muted hover:text-fg transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/estimate`}
            className="hidden md:inline-flex bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
          >
            {t('startEstimate')} →
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-surface"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg px-5 py-4 flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-sm text-fg py-2 border-b border-border last:border-b-0">
              {label}
            </Link>
          ))}
          <Link href={`/${locale}/estimate`} onClick={() => setMenuOpen(false)}
            className="mt-2 block w-full bg-primary text-white text-sm font-semibold px-4 py-3 rounded-xl text-center">
            {t('startEstimate')} →
          </Link>
        </div>
      )}
    </header>
  )
}
