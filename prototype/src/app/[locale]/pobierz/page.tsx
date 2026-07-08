'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { PDFData } from '@/lib/kosztorys-types'
import Confetti from '@/components/Confetti'

const PDFDownloadButton = dynamic(() => import('@/components/PDFDownloadButton'), { ssr: false })
const AutoPDFDownload   = dynamic(() => import('@/components/AutoPDFDownload'),   { ssr: false })
const SendPDFByEmail    = dynamic(() => import('@/components/SendPDFByEmail'),    { ssr: false })

export default function PobierzPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const locale = (params?.locale as string) ?? 'pl'
  const sessionId = searchParams.get('session_id')

  const [pdfData, setPdfData] = useState<PDFData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!sessionId) { setError(true); return }
    const raw = localStorage.getItem('remontowo_pdf_data')
    if (!raw) { setError(true); return }
    try {
      setPdfData(JSON.parse(raw))
    } catch {
      setError(true)
    }
  }, [sessionId])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-fg font-medium">Nie znaleziono danych kosztorysu.</p>
        <p className="text-muted text-sm">Wróć do kalkulatora i spróbuj ponownie.</p>
        <button
          onClick={() => router.push(`/${locale}/kalkulator`)}
          className="mt-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
        >
          Wróć do kalkulatora
        </button>
      </div>
    )
  }

  if (!pdfData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 text-center gap-6">
      <Confetti />
      <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-2xl">
        ✓
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-fg">Płatność zakończona!</h1>
        <p className="text-muted text-sm max-w-xs">
          Twój kosztorys jest pobierany automatycznie. Jeśli pobieranie nie wystartowało, użyj przycisku poniżej.
        </p>
      </div>

      <AutoPDFDownload data={pdfData} />
      <SendPDFByEmail data={pdfData} />

      <PDFDownloadButton
        data={pdfData}
        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
      />

      <button
        onClick={() => router.push(`/${locale}`)}
        className="text-sm text-muted hover:text-fg transition-colors"
      >
        Wróć do strony głównej
      </button>
    </div>
  )
}
