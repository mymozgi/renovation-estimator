'use client'
import { usePDF } from '@react-pdf/renderer'
import { KosztorysPDF } from '@/components/KosztorysPDF'
import type { PDFData } from '@/lib/kosztorys-types'

const TEST_DATA: PDFData = {
  city: 'warszawa',
  propType: 'mieszkanie',
  standard: 'optymalny',
  calcType: 'wykończenie',
  area: 65,
  generatedAt: '06.07.2026',
  est: { min: 145000, max: 162000, mat: 80000, labor: 50000, prep: 15000, m2: 2200 },
  rooms: [
    {
      label: 'Łazienka', width: 3, length: 4, height: 2.6,
      walls: 'plytki', floor: 'plytki-p', ceiling: 'farba-s',
      cost: { mat: 18000, labor: 12000, prep: 4000, total: 34000 },
    },
    {
      label: 'Kuchnia', width: 4, length: 4, height: 2.6,
      walls: 'farba', floor: 'panele', ceiling: 'gladz',
      cost: { mat: 22000, labor: 14000, prep: 5000, total: 41000 },
    },
    {
      label: 'Salon', width: 5, length: 5, height: 2.6,
      walls: 'farba', floor: 'deska', ceiling: 'farba-s',
      cost: { mat: 20000, labor: 12000, prep: 4000, total: 36000 },
    },
  ],
}

export default function PdfPreviewClient() {
  const [instance] = usePDF({ document: <KosztorysPDF data={TEST_DATA} /> })

  if (instance.loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#717975' }}>
      Generowanie PDF…
    </div>
  )

  if (instance.error) return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', color: 'red' }}>
      Błąd: {String(instance.error)}
    </div>
  )

  return (
    <iframe
      src={instance.url!}
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="PDF Preview"
    />
  )
}
