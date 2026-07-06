'use client'
import dynamic from 'next/dynamic'

const PdfPreviewClient = dynamic(() => import('./PdfPreviewClient'), { ssr: false })

export default function PdfPreviewPage() {
  return <PdfPreviewClient />
}
