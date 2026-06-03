'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem { q: string; a: string }

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-surface hover:bg-bg transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-medium text-fg text-sm leading-snug">{item.q}</span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-muted transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <div className="px-5 py-4 bg-bg text-sm text-muted leading-relaxed border-t border-border">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
