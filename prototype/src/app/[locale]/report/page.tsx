'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { WizardLayout } from '@/components/WizardLayout'
import { useEstimatorStore } from '@/lib/store'
import { calcRoomEstimate, calcTotalEstimate, formatRange, formatPLN } from '@/lib/calculations'
import { Button } from '@/components/Button'
import { ROOM_TYPE_LABELS, ROOM_TYPE_ICONS, QUALITY_LABELS, WALL_FINISH_LABELS, FLOOR_FINISH_LABELS, CEILING_FINISH_LABELS, CITY_LABELS, SCOPE_LABELS, PROPERTY_TYPE_LABELS } from '@/lib/labels'
import type { EstimateRange } from '@/lib/types'

function CostBar({ materials, labor, preparation }: { materials: EstimateRange; labor: EstimateRange; preparation: EstimateRange }) {
  const total = materials.min + labor.min + preparation.min
  if (total === 0) return null
  const pct = (v: number) => `${Math.round((v / total) * 100)}%`
  return (
    <div className="flex rounded-full overflow-hidden h-2 mb-3">
      <div className="bg-primary" style={{ width: pct(materials.min) }} />
      <div className="bg-primary/60" style={{ width: pct(labor.min) }} />
      <div className="bg-primary/30" style={{ width: pct(preparation.min) }} />
    </div>
  )
}

export default function ReportPage() {
  const router  = useRouter()
  const locale  = useLocale()
  const t       = useTranslations('report')
  const { rooms, property } = useEstimatorStore()
  const city = property.city ?? 'other'
  const cityLabel = property.city ? CITY_LABELS[property.city] : ''

  const estimates  = rooms.map((r) => calcRoomEstimate(r, city))
  const total      = calcTotalEstimate(rooms, city)
  const aggregated = estimates.reduce(
    (acc, e) => ({
      materials:   { min: acc.materials.min + e.materials.min,     max: acc.materials.max + e.materials.max },
      labor:       { min: acc.labor.min + e.labor.min,             max: acc.labor.max + e.labor.max },
      preparation: { min: acc.preparation.min + e.preparation.min, max: acc.preparation.max + e.preparation.max },
      supporting:  { min: acc.supporting.min + e.supporting.min,   max: acc.supporting.max + e.supporting.max },
    }),
    { materials:{min:0,max:0}, labor:{min:0,max:0}, preparation:{min:0,max:0}, supporting:{min:0,max:0} }
  )

  if (rooms.length === 0) {
    return (
      <WizardLayout backHref={`/${locale}/rooms`} containerClass="max-w-[800px]">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted mb-4">{t('noRooms')}</p>
          <button onClick={() => router.push(`/${locale}/rooms`)} className="text-primary font-medium">{t('addRooms')}</button>
        </div>
      </WizardLayout>
    )
  }

  return (
    <WizardLayout step={3} totalSteps={4} backHref={`/${locale}/rooms`} containerClass="max-w-[800px]"
      footer={
        <Button onClick={() => router.push(`/${locale}/download`)} fullWidth>
          {t('downloadPdf')}
        </Button>
      }
    >
      <div className="mt-2 mb-5">
        <div className="text-xs text-muted mb-1">
          {property.scope ? SCOPE_LABELS[property.scope].label : ''} · {property.type ? PROPERTY_TYPE_LABELS[property.type] : ''} · {cityLabel}
        </div>
        <h2 className="text-2xl font-serif font-bold text-fg">{t('title')}</h2>
        <div className="mt-3 bg-surface border border-border rounded-xl p-4">
          <div className="flex items-end justify-between mb-1">
            <span className="text-muted text-sm">{t('totalEstimate')}</span>
            <span className="text-xs text-muted">{rooms.length} rooms</span>
          </div>
          <div className="text-2xl font-bold text-fg mb-1">{formatRange(total)}</div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted">{t('basedOn', { city: cityLabel })}</span>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{t('precision')}</span>
          </div>
          <CostBar materials={aggregated.materials} labor={aggregated.labor} preparation={aggregated.preparation} />
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" />{t('materials')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/60 inline-block" />{t('labor')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/30 inline-block" />{t('preparation')}</span>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl divide-y divide-border mb-5">
        {[
          { key: 'materials', value: aggregated.materials, icon: '🪵' },
          { key: 'labor',     value: aggregated.labor,     icon: '🔨' },
          { key: 'preparation', value: aggregated.preparation, icon: '🧹' },
          { key: 'supporting',  value: aggregated.supporting,  icon: '📦' },
        ].map(({ key, value, icon }) => (
          <div key={key} className="flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-fg"><span>{icon}</span>{t(key as 'materials')}</span>
            <span className="font-medium text-sm text-fg">{formatRange(value)}</span>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">{t('roomBreakdown')}</h3>
      <div className="space-y-3 pb-2">
        {rooms.map((room, i) => {
          const est = estimates[i]
          return (
            <div key={room.id} className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-semibold text-fg flex items-center gap-2"><span>{ROOM_TYPE_ICONS[room.type]}</span>{ROOM_TYPE_LABELS[room.type]}</span>
                <span className="font-bold text-fg text-sm">{formatRange(est.total)}</span>
              </div>
              <div className="px-4 py-3 space-y-1 text-xs text-muted">
                <div className="flex justify-between">
                  <span>Floor {est.areas.floor.toFixed(1)} m² · Wall {est.areas.wall.toFixed(1)} m²</span>
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-primary/10 text-primary font-medium">{QUALITY_LABELS[room.qualityTier]}</span>
                </div>
                <div className="flex justify-between"><span>{t('materials')}</span><span className="text-fg">{formatPLN(est.materials.min)}–{formatPLN(est.materials.max)}</span></div>
                <div className="flex justify-between"><span>{t('labor')}</span><span className="text-fg">{formatPLN(est.labor.min)}–{formatPLN(est.labor.max)}</span></div>
                {est.preparation.min > 0 && (
                  <div className="flex justify-between"><span>{t('preparation')}</span><span className="text-fg">{formatPLN(est.preparation.min)}–{formatPLN(est.preparation.max)}</span></div>
                )}
                <div className="flex gap-3 pt-1 border-t border-border">
                  <span>{WALL_FINISH_LABELS[room.wallFinish]}</span><span>·</span>
                  <span>{FLOOR_FINISH_LABELS[room.floorFinish]}</span><span>·</span>
                  <span>{CEILING_FINISH_LABELS[room.ceilingFinish]}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="py-4 border-t border-border">
        <p className="text-xs text-muted leading-relaxed">
          {t('disclaimer', { city: cityLabel })}{' '}
          <Link href={`/${locale}/methodology`} className="text-primary hover:underline">{t('methodologyLink')}</Link>
        </p>
      </div>
    </WizardLayout>
  )
}
