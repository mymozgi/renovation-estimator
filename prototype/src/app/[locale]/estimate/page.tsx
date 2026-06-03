'use client'

import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { WizardLayout } from '@/components/WizardLayout'
import { OptionCard } from '@/components/OptionCard'
import { useEstimatorStore } from '@/lib/store'
import type { PropertyType, PropertyCondition, RenovationScope, City } from '@/lib/types'

const PROPERTY_TYPES: PropertyType[]   = ['apartment', 'house']
const CONDITIONS: PropertyCondition[]  = ['new', 'preowned']
const SCOPES: RenovationScope[]        = ['cosmetic', 'premium', 'full']
const CITIES: City[]                   = ['warsaw', 'krakow', 'wroclaw', 'gdansk', 'poznan', 'other']

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold text-muted uppercase tracking-wide mt-6 mb-2">{children}</div>
}

export default function EstimatePage() {
  const router  = useRouter()
  const locale  = useLocale()
  const t       = useTranslations('estimate')
  const { property, setProperty } = useEstimatorStore()

  const canContinue = property.type && property.condition && property.scope && property.city

  return (
    <WizardLayout step={1} totalSteps={4} backHref={`/${locale}`}
      footer={
        <button onClick={() => router.push(`/${locale}/rooms`)} disabled={!canContinue}
          className="w-full bg-primary text-white font-semibold rounded-xl py-4 disabled:bg-muted-green disabled:cursor-not-allowed transition-colors hover:bg-primary/90">
          {t('cta')}
        </button>
      }
    >
      <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('title')}</h2>
      <p className="text-muted text-sm mb-2">{t('subtitle')}</p>

      <SectionLabel>{t('propertyType')}</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {PROPERTY_TYPES.map((tp) => (
          <OptionCard key={tp} label={t(`types.${tp}`)} selected={property.type === tp} onClick={() => setProperty({ type: tp })} />
        ))}
      </div>

      <SectionLabel>{t('propertyCondition')}</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {CONDITIONS.map((c) => (
          <OptionCard key={c} label={t(`conditions.${c}`)} description={t(`conditions.${c}_desc`)} selected={property.condition === c} onClick={() => setProperty({ condition: c })} />
        ))}
      </div>

      <SectionLabel>{t('renovationScope')}</SectionLabel>
      <div className="flex flex-col gap-3">
        {SCOPES.map((s) => (
          <OptionCard key={s} label={t(`scopes.${s}`)} description={t(`scopes.${s}_desc`)} selected={property.scope === s} onClick={() => setProperty({ scope: s })} />
        ))}
      </div>

      <SectionLabel>{t('yourCity')}</SectionLabel>
      <div className="grid grid-cols-2 gap-3 pb-4">
        {CITIES.map((c) => (
          <OptionCard key={c} label={t(`cities.${c}`)} selected={property.city === c} onClick={() => setProperty({ city: c })} />
        ))}
      </div>
    </WizardLayout>
  )
}
