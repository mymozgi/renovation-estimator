'use client'

import { useState, useEffect, useRef } from 'react'
import { Accessibility, X, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

type Size     = 'small' | 'normal' | 'large' | 'xl'
type Contrast = 'normal' | 'high' | 'inverted'
type Font     = 'system' | 'readable' | 'dyslexic'

interface Prefs { size: Size; contrast: Contrast; font: Font }

const DEFAULTS: Prefs = { size: 'normal', contrast: 'normal', font: 'system' }

const SIZES:     Size[]     = ['small', 'normal', 'large', 'xl']
const CONTRASTS: Contrast[] = ['normal', 'high', 'inverted']
const FONTS:     Font[]     = ['system', 'readable', 'dyslexic']

function loadPrefs(): Prefs {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('a11y') || '{}') }
  } catch { return { ...DEFAULTS } }
}

function applyPrefs(p: Prefs) {
  const h = document.documentElement
  if (p.size === 'normal') h.removeAttribute('data-a11y-size')
  else h.setAttribute('data-a11y-size', p.size)

  if (p.contrast === 'normal') h.removeAttribute('data-a11y-contrast')
  else h.setAttribute('data-a11y-contrast', p.contrast)

  if (p.font === 'system') {
    h.removeAttribute('data-a11y-font')
  } else {
    h.setAttribute('data-a11y-font', p.font)
    // Inject OpenDyslexic stylesheet lazily — only on first selection
    if (p.font === 'dyslexic' && !document.getElementById('dyslexic-font')) {
      const link = document.createElement('link')
      link.id   = 'dyslexic-font'
      link.rel  = 'stylesheet'
      link.href = 'https://fonts.cdnfonts.com/css/opendyslexic'
      document.head.appendChild(link)
    }
  }

  localStorage.setItem('a11y', JSON.stringify(p))
}

function SegmentedControl<T extends string>({
  label, options, value, onChange, labelFn,
}: {
  label: string; options: T[]; value: T; onChange: (v: T) => void; labelFn: (v: T) => string
}) {
  return (
    <div className="mb-5">
      <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{label}</div>
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 py-2 text-xs rounded-lg border font-medium transition-colors ${
              value === opt
                ? 'bg-primary text-white border-primary'
                : 'bg-surface text-fg border-border hover:border-primary/40'
            }`}
          >
            {labelFn(opt)}
          </button>
        ))}
      </div>
    </div>
  )
}

export function AccessibilityWidget() {
  const t = useTranslations('a11y')
  const [open, setOpen]   = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load saved prefs on mount
  useEffect(() => { setPrefs(loadPrefs()) }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  function update(patch: Partial<Prefs>) {
    const next = { ...prefs, ...patch }
    setPrefs(next)
    applyPrefs(next)
  }

  function reset() {
    setPrefs(DEFAULTS)
    applyPrefs(DEFAULTS)
  }

  const panelContent = (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-fg text-sm flex items-center gap-2">
          <Accessibility size={16} className="text-primary" />
          {t('open')}
        </h2>
        <button onClick={() => setOpen(false)} className="text-muted hover:text-fg transition-colors">
          <X size={16} />
        </button>
      </div>

      <SegmentedControl
        label={t('fontSize')}
        options={SIZES}
        value={prefs.size}
        onChange={(v) => update({ size: v })}
        labelFn={(v) => t(`sizes.${v}`)}
      />

      <SegmentedControl
        label={t('contrast')}
        options={CONTRASTS}
        value={prefs.contrast}
        onChange={(v) => update({ contrast: v })}
        labelFn={(v) => t(`contrasts.${v}`)}
      />

      <SegmentedControl
        label={t('font')}
        options={FONTS}
        value={prefs.font}
        onChange={(v) => update({ font: v })}
        labelFn={(v) => t(`fonts.${v}`)}
      />

      <button
        onClick={reset}
        className="w-full mt-1 border border-border rounded-xl py-2.5 text-xs text-muted hover:border-primary/40 hover:text-fg transition-colors"
      >
        {t('reset')}
      </button>
    </div>
  )

  return (
    <div ref={panelRef} className="fixed z-50" style={{ bottom: '24px', right: '20px' }}>
      {/* Desktop side panel */}
      {open && (
        <div className="hidden md:block absolute bottom-14 right-0 w-72 bg-surface border border-border rounded-2xl shadow-lg overflow-hidden">
          {panelContent}
        </div>
      )}

      {/* Mobile bottom sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative bg-surface rounded-t-2xl shadow-xl z-50 max-h-[75vh] overflow-y-auto">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            {panelContent}
            <div className="h-safe-bottom pb-6" />
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility settings"
        aria-expanded={open}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {open ? <ChevronUp size={22} /> : <Accessibility size={22} />}
      </button>
    </div>
  )
}
