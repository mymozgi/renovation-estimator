'use client'

import { useEffect, useRef } from 'react'
import { usePDF } from '@react-pdf/renderer'
import { KosztorysPDF } from './KosztorysPDF'
import type { PDFData } from '@/lib/kosztorys-types'

export default function AutoPDFDownload({ data }: { data: PDFData }) {
  const [instance] = usePDF({ document: <KosztorysPDF data={data} /> })
  const triggered = useRef(false)

  useEffect(() => {
    if (!instance.loading && instance.url && !triggered.current) {
      triggered.current = true
      const a = document.createElement('a')
      a.href = instance.url
      a.download = `kosztorys-remontowo-${data.city}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }, [instance.loading, instance.url, data.city])

  return null
}
