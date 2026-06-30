'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import type { PDFData } from '@/lib/kosztorys-types'

interface Props {
  data: PDFData
  className?: string
  label?: string
}

export default function BuyPDFButton({ data, className, label }: Props) {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const locale = (params?.locale as string) ?? 'pl'

  const handleClick = async () => {
    setLoading(true)
    try {
      localStorage.setItem('remontowo_pdf_data', JSON.stringify(data))
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale }),
      })
      if (!res.ok) throw new Error('checkout failed')
      const { url } = await res.json()
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  const baseClass =
    className ??
    'inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50'

  return (
    <button onClick={handleClick} disabled={loading} className={baseClass}>
      {loading ? 'Przekierowanie…' : (label ?? 'Pobierz Kosztorys PDF · 29 PLN')}
    </button>
  )
}
