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
  const [email, setEmail] = useState('')
  const params = useParams()
  const locale = (params?.locale as string) ?? 'pl'

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const handleClick = async () => {
    setLoading(true)
    try {
      if (email) localStorage.setItem('remontowo_email', email)
      localStorage.setItem('remontowo_pdf_data', JSON.stringify(data))
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, email: email || undefined }),
      })
      if (!res.ok) throw new Error('checkout failed')
      const { url } = await res.json()
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  const btnClass =
    className ??
    'inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors disabled:opacity-50'

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pdf-email" className="text-xs font-medium text-muted text-left">
          Wyślij PDF na email <span className="text-muted/60 font-normal">(opcjonalnie, ale polecamy)</span>
        </label>
        <input
          id="pdf-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="twoj@email.pl"
          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-bg text-fg text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
        />
        {email && !isValidEmail(email) && (
          <p className="text-xs text-red-500 text-left">Nieprawidłowy adres email</p>
        )}
        {email && isValidEmail(email) && (
          <p className="text-xs text-primary text-left">PDF zostanie wysłany automatycznie po płatności</p>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={loading || (!!email && !isValidEmail(email))}
        className={btnClass}
      >
        {loading ? 'Przekierowanie…' : (label ?? 'Pobierz Kosztorys PDF · 29 PLN')}
      </button>
    </div>
  )
}
