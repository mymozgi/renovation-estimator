'use client'

import { useState, useEffect } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { KosztorysPDF } from './KosztorysPDF'
import type { PDFData } from '@/lib/kosztorys-types'

interface Props {
  data: PDFData
  className?: string
}

export default function PDFDownloadButton({ data, className }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const baseClass = className ?? 'inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors disabled:opacity-50'

  if (!mounted) {
    return (
      <button disabled className={baseClass}>
        Pobierz Kosztorys PDF
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={<KosztorysPDF data={data} />}
      fileName={`kosztorys-remontowo-${data.city}.pdf`}
    >
      {({ loading }) => (
        <span className={baseClass} style={{ cursor: loading ? 'wait' : 'pointer' }}>
          {loading ? 'Generowanie PDF…' : 'Pobierz Kosztorys PDF'}
        </span>
      )}
    </PDFDownloadLink>
  )
}
