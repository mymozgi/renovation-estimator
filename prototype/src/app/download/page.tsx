'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WizardLayout } from '@/components/WizardLayout'
import { useEstimatorStore } from '@/lib/store'
import { calcRoomEstimate, calcTotalEstimate, formatRange, formatPLN } from '@/lib/calculations'
import {
  ROOM_TYPE_LABELS, ROOM_TYPE_ICONS, QUALITY_LABELS,
  WALL_FINISH_LABELS, FLOOR_FINISH_LABELS, CEILING_FINISH_LABELS,
  CITY_LABELS, SCOPE_LABELS, PROPERTY_TYPE_LABELS,
} from '@/lib/labels'

export default function DownloadPage() {
  const router = useRouter()
  const { rooms, property } = useEstimatorStore()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const city = property.city ?? 'other'
  const estimates = rooms.map((r) => calcRoomEstimate(r, city))
  const total = calcTotalEstimate(rooms, city)

  function handlePrint() {
    window.print()
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    // In production: POST to /api/send-report with email + report data
    // For prototype: simulate success
    setSent(true)
  }

  if (rooms.length === 0) {
    return (
      <WizardLayout backHref="/rooms">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted mb-4">No estimate to download.</p>
          <button onClick={() => router.push('/rooms')} className="text-primary font-medium">← Add rooms</button>
        </div>
      </WizardLayout>
    )
  }

  if (sent) {
    return (
      <WizardLayout backHref="/report">
        <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
          <div className="text-4xl">✅</div>
          <h2 className="text-xl font-serif font-bold text-fg">Report sent!</h2>
          <p className="text-muted text-sm">Check your inbox. The PDF report has been sent to {email}.</p>
          <button
            onClick={() => { setSent(false); router.push('/') }}
            className="mt-4 text-primary font-medium text-sm"
          >
            Start a new estimate
          </button>
        </div>
      </WizardLayout>
    )
  }

  return (
    <>
      {/* Printable report (hidden on screen, visible on print) */}
      <div className="hidden print:block p-8 font-sans text-sm text-black">
        <h1 className="text-2xl font-bold mb-1">Renovation Estimate Report</h1>
        <p className="text-gray-500 mb-6">
          {property.type ? PROPERTY_TYPE_LABELS[property.type] : ''} ·{' '}
          {property.city ? CITY_LABELS[property.city] : ''} ·{' '}
          {property.scope ? SCOPE_LABELS[property.scope].label : ''}
        </p>

        <div className="border rounded p-4 mb-6">
          <div className="text-gray-500 text-xs mb-1">TOTAL ESTIMATE</div>
          <div className="text-3xl font-bold">{formatRange(total)}</div>
        </div>

        {rooms.map((room, i) => {
          const est = estimates[i]
          return (
            <div key={room.id} className="mb-4 border rounded p-4">
              <div className="flex justify-between mb-2">
                <span className="font-bold">{ROOM_TYPE_ICONS[room.type]} {ROOM_TYPE_LABELS[room.type]}</span>
                <span className="font-bold">{formatRange(est.total)}</span>
              </div>
              <div className="text-gray-500 text-xs space-y-1">
                <div>Floor {est.areas.floor.toFixed(1)} m² · Wall {est.areas.wall.toFixed(1)} m² · {QUALITY_LABELS[room.qualityTier]}</div>
                <div>Wall: {WALL_FINISH_LABELS[room.wallFinish]} · Floor: {FLOOR_FINISH_LABELS[room.floorFinish]} · Ceiling: {CEILING_FINISH_LABELS[room.ceilingFinish]}</div>
                <div>Materials: {formatPLN(est.materials.min)}–{formatPLN(est.materials.max)} PLN</div>
                <div>Labor: {formatPLN(est.labor.min)}–{formatPLN(est.labor.max)} PLN</div>
              </div>
            </div>
          )
        })}
        <p className="text-gray-400 text-xs mt-8">Estimate precision ±10–15%. Not a final quote. Prices in PLN.</p>
      </div>

      {/* Screen UI */}
      <div className="print:hidden">
        <WizardLayout
          step={4}
          totalSteps={4}
          backHref="/report"
          footer={
            <button
              onClick={handlePrint}
              className="w-full border border-primary text-primary font-semibold rounded-xl py-3.5 text-base hover:bg-primary/5 transition-colors"
            >
              Save as PDF (print)
            </button>
          }
        >
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Download result</h2>
          <p className="text-muted text-sm mb-6">
            Auto-calculated for {property.city ? CITY_LABELS[property.city] : 'your city'} based on your finishes.
          </p>

          <div className="bg-surface border border-border rounded-xl p-4 mb-6">
            <div className="text-muted text-xs mb-1">Total estimate</div>
            <div className="font-bold text-fg text-xl">{formatRange(total)}</div>
            <div className="text-muted text-xs mt-1">{rooms.length} rooms · ±10–15% precision</div>
          </div>

          <form onSubmit={handleSend}>
            <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-fg placeholder:text-muted focus:outline-none focus:border-primary mb-4"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold rounded-xl py-4 text-base hover:bg-primary/90 transition-colors"
            >
              Send to email
            </button>
          </form>
        </WizardLayout>
      </div>
    </>
  )
}
