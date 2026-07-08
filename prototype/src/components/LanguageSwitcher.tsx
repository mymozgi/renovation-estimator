'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, Check } from 'lucide-react'
import { articles } from '@/content/articles'

const LOCALES = [
  { code: 'pl', label: 'Polski'      },
  { code: 'uk', label: 'Українська'  },
  { code: 'en', label: 'English'     },
  { code: 'ru', label: 'Русский'     },
]

export function LanguageSwitcher() {
  const locale   = useLocale()
  const router   = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  function switchLocale(next: string) {
    const segments = pathname.split('/')
    if (segments.length >= 4 && segments[2] === 'articles') {
      const currentSlug = segments[3]
      const idx = (articles[locale] ?? []).findIndex(a => a.slug === currentSlug)
      const targetArticles = articles[next] ?? []
      const targetSlug = idx >= 0 ? targetArticles[idx]?.slug : undefined
      router.push(targetSlug ? `/${next}/articles/${targetSlug}` : `/${next}/articles`)
    } else {
      segments[1] = next
      router.push(segments.join('/'))
    }
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 px-2.5 h-8 rounded-lg text-fg/60 hover:text-fg hover:bg-bg transition-colors"
      >
        <span className="text-xs font-bold tracking-widest uppercase">{locale}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-1 z-50 bg-surface border border-border rounded-xl shadow-lg overflow-hidden min-w-[148px] py-1"
        >
          {LOCALES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                onClick={() => switchLocale(code)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                  locale === code
                    ? 'bg-primary/5 text-primary font-semibold'
                    : 'text-fg hover:bg-bg'
                }`}
              >
                <span className="w-7 text-[10px] font-bold tracking-wider uppercase text-muted shrink-0">
                  {code}
                </span>
                <span>{label}</span>
                {locale === code && (
                  <Check size={13} className="ml-auto text-primary shrink-0" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
