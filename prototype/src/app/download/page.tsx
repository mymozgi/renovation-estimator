'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle, Printer } from 'lucide-react'
import { WizardLayout } from '@/components/WizardLayout'
import { useEstimatorStore } from '@/lib/store'
import { calcTotalEstimate, formatRange } from '@/lib/calculations'
import { CITY_LABELS } from '@/lib/labels'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not_configured'

export default function DownloadPage() {
  const router = useRouter()
  const { rooms, property } = useEstimatorStore()
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const city      = property.city ?? 'other'
  const cityLabel = property.city ? CITY_LABELS[property.city] : 'your city'
  const total     = calcTotalEstimate(rooms, city)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, property, rooms }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.code === 'NOT_CONFIGURED') {
          setStatus('not_configured')
        } else {
          setErrorMsg(data.error ?? 'Something went wrong.')
          setStatus('error')
        }
        return
      }

      setStatus('sent')
    } catch {
      setErrorMsg('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  function handlePrint() {
    window.print()
  }

  function handleRetry() {
    setStatus('idle')
    setErrorMsg('')
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (rooms.length === 0) {
    return (
      <WizardLayout backHref="/rooms">
        <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
          <p className="text-muted">No estimate to download.</p>
          <button onClick={() => router.push('/rooms')} className="text-primary font-medium text-sm">
            ← Add rooms
          </button>
        </div>
      </WizardLayout>
    )
  }

  // ── Sent ──────────────────────────────────────────────────────────────────
  if (status === 'sent') {
    return (
      <WizardLayout backHref="/report">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-4 px-2">
          <CheckCircle2 size={48} className="text-primary" />
          <h2 className="text-xl font-serif font-bold text-fg">Report sent!</h2>
          <p className="text-muted text-sm leading-relaxed">
            Check your inbox at <span className="font-medium text-fg">{email}</span>.<br />
            The PDF contains your full estimate for {cityLabel}.
          </p>
          <div className="mt-2 text-xs text-muted bg-surface border border-border rounded-xl px-4 py-3 text-left leading-relaxed">
            Prices are average estimates for {cityLabel}.<br />
            Actual costs may vary ±10–15%.
          </div>
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={() => setStatus('idle')}
              className="w-full border border-border rounded-xl py-3 text-fg font-medium text-sm hover:border-primary/40 transition-colors"
            >
              Send to a different email
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full text-muted text-sm py-2"
            >
              Start a new estimate
            </button>
          </div>
        </div>
      </WizardLayout>
    )
  }

  // ── Not configured ────────────────────────────────────────────────────────
  if (status === 'not_configured') {
    return (
      <WizardLayout backHref="/report">
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-surface border border-border rounded-xl p-4 flex gap-3">
            <AlertCircle size={18} className="text-muted shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-fg text-sm mb-1">Email delivery not set up</p>
              <p className="text-muted text-xs leading-relaxed">
                Add your <code className="bg-bg px-1 rounded">RESEND_API_KEY</code> to{' '}
                <code className="bg-bg px-1 rounded">.env.local</code> to enable email delivery.
                Use the print option below in the meantime.
              </p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-xl py-4 text-base hover:bg-primary/90 transition-colors"
          >
            <Printer size={16} /> Save as PDF (print)
          </button>
          <button
            onClick={handleRetry}
            className="text-muted text-sm text-center"
          >
            ← Try email again
          </button>
        </div>
      </WizardLayout>
    )
  }

  // ── Main form ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* Print-only report — visible only when window.print() is called */}
      <div className="hidden print:block p-8 font-sans text-sm text-black">
        <h1 className="text-2xl font-bold mb-1">Renovation Estimate Report</h1>
        <p className="text-gray-500 mb-2">{cityLabel}</p>
        <p className="text-xs text-gray-400 mb-6 border-l-2 border-green-800 pl-3">
          Prices are average estimates for {cityLabel}. Actual costs may vary ±10–15%. Not a final quote.
        </p>
        <div className="border rounded p-4 mb-6">
          <div className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Total estimate</div>
          <div className="text-2xl font-bold">{formatRange(total)}</div>
          <div className="text-xs text-gray-400 mt-1">{rooms.length} rooms · Based on {cityLabel} regional pricing</div>
        </div>
        <p className="text-gray-400 text-xs mt-8 border-t pt-4">
          Prices are average estimates for {cityLabel}. Actual costs may vary ±10–15%.
          This is not a final quote. Prices in PLN.
        </p>
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
              className="w-full flex items-center justify-center gap-2 border border-border text-fg font-medium rounded-xl py-3.5 text-sm hover:border-primary/40 transition-colors"
            >
              <Printer size={15} /> Save as PDF (print)
            </button>
          }
        >
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Download result</h2>
          <p className="text-muted text-sm mb-5">
            Auto-calculated for {cityLabel} based on your finishes.
          </p>

          {/* Estimate summary */}
          <div className="bg-surface border border-border rounded-xl p-4 mb-2">
            <div className="text-muted text-xs mb-1">Total estimate</div>
            <div className="font-bold text-fg text-xl">{formatRange(total)}</div>
            <div className="text-muted text-xs mt-1">{rooms.length} rooms · ±10–15% precision</div>
          </div>

          {/* Regional disclaimer */}
          <div className="text-xs text-muted bg-surface border border-border rounded-xl px-4 py-3 mb-6 leading-relaxed border-l-2 border-l-primary/40">
            Prices are average estimates for <span className="font-medium text-fg">{cityLabel}</span>.
            Actual costs may vary ±10–15% depending on contractor and market conditions.
          </div>

          {/* Email form */}
          <form onSubmit={handleSend} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">
                Your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'sending'}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-fg placeholder:text-muted focus:outline-none focus:border-primary disabled:opacity-60"
              />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div className="flex items-start gap-2 bg-surface border border-border rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={15} className="text-destructive shrink-0 mt-0.5" />
                <div>
                  <span className="text-fg">{errorMsg}</span>
                  <button type="button" onClick={handleRetry} className="block text-primary text-xs mt-1">
                    Try again
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary text-white font-semibold rounded-xl py-4 text-base hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                'Send to email'
              )}
            </button>
          </form>
        </WizardLayout>
      </div>
    </>
  )
}
