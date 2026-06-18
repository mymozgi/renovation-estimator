'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const LOCALES = [
  { code: 'pl', flag: '🇵🇱', label: 'Polski'  },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
]

export function LanguageSwitcher() {
  const locale   = useLocale()
  const router   = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  function switchLocale(next: string) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 bg-surface border border-border rounded-xl px-3 py-2 text-sm font-medium text-fg hover:border-primary/40 transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-semibold text-muted">{current.code.toUpperCase()}</span>
        <ChevronDown
          size={13}
          className={`text-muted transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-1.5 z-50 bg-surface border border-border rounded-xl shadow-lg overflow-hidden min-w-[160px] py-1"
        >
          {LOCALES.map(({ code, flag, label }) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                onClick={() => switchLocale(code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                  ${locale === code
                    ? 'bg-primary/5 text-primary font-semibold'
                    : 'text-fg hover:bg-bg'
                  }`}
              >
                <span className="text-xl leading-none">{flag}</span>
                <span>{label}</span>
                {locale === code && (
                  <span className="ml-auto text-primary text-xs">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
