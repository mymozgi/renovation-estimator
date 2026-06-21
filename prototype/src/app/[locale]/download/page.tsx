'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle, Printer } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { WizardLayout } from '@/components/WizardLayout'
import { useEstimatorStore } from '@/lib/store'
import { calcTotalEstimate, formatRange } from '@/lib/calculations'
import { CITY_LABELS } from '@/lib/labels'
import { Button } from '@/components/Button'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not_configured'

export default function DownloadPage() {
  const router  = useRouter()
  const locale  = useLocale()
  const t       = useTranslations('download')
  const { rooms, property } = useEstimatorStore()
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const city      = property.city ?? 'other'
  const cityLabel = property.city ? CITY_LABELS[property.city] : ''
  const total     = calcTotalEstimate(rooms, city)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res  = await fetch('/api/send-report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, property, rooms }) })
      const data = await res.json()
      if (!res.ok) { setStatus(data.code === 'NOT_CONFIGURED' ? 'not_configured' : 'error'); setErrorMsg(data.error ?? ''); return }
      setStatus('sent')
    } catch { setErrorMsg(t('networkError')); setStatus('error') }
  }

  if (rooms.length === 0) return (
    <WizardLayout backHref={`/${locale}/rooms`} containerClass="max-w-[800px]">
      <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
        <p className="text-muted">{t('noEstimate')}</p>
        <button onClick={() => router.push(`/${locale}/rooms`)} className="text-primary font-medium text-sm">{t('addRooms')}</button>
      </div>
    </WizardLayout>
  )

  if (status === 'sent') return (
    <WizardLayout backHref={`/${locale}/report`} containerClass="max-w-[800px]">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-4 px-2">
        <CheckCircle2 size={48} className="text-primary" />
        <h2 className="text-xl font-serif font-bold text-fg">{t('sentTitle')}</h2>
        <p className="text-muted text-sm leading-relaxed">{t('sentDesc', { email, city: cityLabel })}</p>
        <div className="flex flex-col gap-2 w-full mt-4">
          <Button variant="secondary" size="sm" onClick={() => setStatus('idle')} fullWidth>{t('sendAnother')}</Button>
          <button onClick={() => router.push(`/${locale}`)} className="w-full text-muted text-sm py-2">{t('newEstimate')}</button>
        </div>
      </div>
    </WizardLayout>
  )

  if (status === 'not_configured') return (
    <WizardLayout backHref={`/${locale}/report`} containerClass="max-w-[800px]">
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-surface border border-border rounded-xl p-4 flex gap-3">
          <AlertCircle size={18} className="text-muted shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-fg text-sm mb-1">{t('notConfiguredTitle')}</p>
            <p className="text-muted text-xs leading-relaxed">{t('notConfiguredDesc')}</p>
          </div>
        </div>
        <Button onClick={() => window.print()} fullWidth>
          <Printer size={16} /> {t('savePdf')}
        </Button>
        <button onClick={() => setStatus('idle')} className="text-muted text-sm text-center">{t('tryAgain')}</button>
      </div>
    </WizardLayout>
  )

  return (
    <>
      <div className="hidden print:block p-8 font-sans text-sm text-fg">
        <h1 className="text-2xl font-bold mb-1">Renovation Estimate</h1>
        <p className="text-xs text-muted mb-6 border-l-2 border-primary pl-3">
          Prices are average estimates for {cityLabel}. Actual costs may vary ±10–15%.
        </p>
        <div className="border border-border rounded p-4 mb-6">
          <div className="text-muted text-xs mb-1 uppercase tracking-wide">Total estimate</div>
          <div className="text-2xl font-bold">{formatRange(total)}</div>
          <div className="text-xs text-muted mt-1">{rooms.length} rooms · {cityLabel}</div>
        </div>
        <p className="text-muted text-xs mt-8 border-t border-border pt-4">Not a final quote. Prices in PLN.</p>
      </div>

      <div className="print:hidden">
        <WizardLayout step={4} totalSteps={4} backHref={`/${locale}/report`} containerClass="max-w-[800px]"
          footer={
            <Button variant="secondary" size="sm" onClick={() => window.print()} fullWidth>
              <Printer size={15} /> {t('savePdf')}
            </Button>
          }
        >
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('title')}</h2>
          <p className="text-muted text-sm mb-5">{t('subtitle', { city: cityLabel })}</p>

          <div className="bg-surface border border-border rounded-xl p-4 mb-2">
            <div className="text-muted text-xs mb-1">{t('totalEstimate')}</div>
            <div className="font-bold text-fg text-xl">{formatRange(total)}</div>
            <div className="text-muted text-xs mt-1">{rooms.length} rooms · ±10–15%</div>
          </div>
          <div className="text-xs text-muted bg-surface border border-border rounded-xl px-4 py-3 mb-6 leading-relaxed border-l-2 border-l-primary/40">
            {t('disclaimer', { city: cityLabel })}
          </div>

          <form onSubmit={handleSend} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">{t('emailLabel')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('emailPlaceholder')} required disabled={status === 'sending'}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-fg placeholder:text-muted focus:outline-none focus:border-primary disabled:opacity-60" />
            </div>
            {status === 'error' && (
              <div className="flex items-start gap-2 bg-surface border border-border rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={15} className="text-destructive shrink-0 mt-0.5" />
                <div><span className="text-fg">{errorMsg}</span><button type="button" onClick={() => setStatus('idle')} className="block text-primary text-xs mt-1">{t('tryAgain')}</button></div>
              </div>
            )}
            <Button type="submit" disabled={status === 'sending'} fullWidth>
              {status === 'sending' ? <><Loader2 size={16} className="animate-spin" />{t('sending')}</> : t('sendButton')}
            </Button>
          </form>
        </WizardLayout>
      </div>
    </>
  )
}
