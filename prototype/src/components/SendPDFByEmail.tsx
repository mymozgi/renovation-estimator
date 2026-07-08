'use client'

import { useEffect, useRef, useState } from 'react'
import { usePDF } from '@react-pdf/renderer'
import { KosztorysPDF } from './KosztorysPDF'
import type { PDFData } from '@/lib/kosztorys-types'

export default function SendPDFByEmail({ data }: { data: PDFData }) {
  const email = typeof window !== 'undefined' ? localStorage.getItem('remontowo_email') : null
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const sent = useRef(false)

  const [instance] = usePDF({ document: <KosztorysPDF data={data} /> })

  useEffect(() => {
    if (!email || sent.current || instance.loading || !instance.url) return
    sent.current = true
    setStatus('sending')

    fetch(instance.url)
      .then(r => r.arrayBuffer())
      .then(buf => {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
        return fetch('/api/email-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, pdfBase64: base64, city: data.city }),
        })
      })
      .then(r => r.json())
      .then(res => setStatus(res.success ? 'sent' : 'error'))
      .catch(() => setStatus('error'))
  }, [instance.loading, instance.url, email, data.city])

  if (!email) return null

  return (
    <div className="text-sm text-center">
      {status === 'idle' || status === 'sending' ? (
        <span className="text-muted flex items-center justify-center gap-2">
          <span className="w-3 h-3 border-2 border-muted border-t-transparent rounded-full animate-spin" />
          Wysyłamy PDF na {email}…
        </span>
      ) : status === 'sent' ? (
        <span className="text-primary font-medium">PDF wysłany na {email}</span>
      ) : (
        <span className="text-muted">Nie udało się wysłać emaila — skorzystaj z przycisku pobierania</span>
      )}
    </div>
  )
}
