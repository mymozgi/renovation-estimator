'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function LandingHeader() {
  const locale = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: `/${locale}#jak-to-dziala`, label: 'Jak to działa' },
    { href: `/${locale}/kalkulator`, label: 'Kalkulator' },
    { href: `/${locale}/articles`, label: 'Poradniki' },
  ]

  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="font-bold text-fg text-lg tracking-tight">
          Remontowo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-fg/70 hover:text-fg transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/kalkulator`}
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-fixed text-primary hover:bg-primary-fixed/80 transition-colors"
          >
            Darmowa wycena
          </Link>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-sm text-fg py-1">
              {label}
            </Link>
          ))}
          <div className="pt-1 border-t border-border flex items-center justify-between">
            <LanguageSwitcher />
            <Link href={`/${locale}/kalkulator`} onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center px-4 py-2 rounded-full text-sm font-medium bg-primary text-white">
              Darmowa wycena
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
