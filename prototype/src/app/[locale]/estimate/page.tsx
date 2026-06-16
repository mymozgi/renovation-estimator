'use client'

import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { WizardLayout } from '@/components/WizardLayout'
import { OptionCard } from '@/components/OptionCard'
import { useEstimatorStore } from '@/lib/store'
import type { PropertyType, PropertyCondition, RenovationScope, City } from '@/lib/types'
import { Button } from '@/components/Button'
const PROPERTY_TYPES: PropertyType[]   = ['apartment', 'house']
const CONDITIONS: PropertyCondition[]  = ['new', 'preowned']
const SCOPES: RenovationScope[]        = ['cosmetic', 'premium', 'full']
const CITIES: City[]                   = ['warsaw', 'krakow', 'wroclaw', 'gdansk', 'poznan', 'other']

function Ph({ bg }: { bg: string }) {
  return <div className={`w-full h-full ${bg}`} />
}

const PROPERTY_PREVIEWS: Record<PropertyType, React.ReactElement> = {
  apartment: <Ph bg="bg-slate-100" />,
  house:     <Ph bg="bg-amber-50"  />,
}

const CONDITION_PREVIEWS: Record<PropertyCondition, React.ReactElement> = {
  new:      <Ph bg="bg-green-50"  />,
  preowned: <Ph bg="bg-stone-100" />,
}

const SCOPE_PREVIEWS: Record<RenovationScope, React.ReactElement> = {
  cosmetic: <Ph bg="bg-yellow-50" />,
  premium:  <Ph bg="bg-purple-50" />,
  full:     <Ph bg="bg-orange-50" />,
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold text-muted uppercase tracking-wide mt-6 mb-3">{children}</div>
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
        <Button onClick={() => router.push(`/${locale}/rooms`)} disabled={!canContinue}
          fullWidth className="disabled:!bg-muted-green disabled:!opacity-100">
          {t('cta')}
        </Button>
      }
    >
      <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('title')}</h2>
      <p className="text-muted text-sm mb-2">{t('subtitle')}</p>

      {/* Property type — 2 large illustrated cards */}
      <SectionLabel>{t('propertyType')}</SectionLabel>
      <div className="grid grid-cols-2 gap-4">
        {PROPERTY_TYPES.map((tp) => (
          <OptionCard key={tp}
            label={t(`types.${tp}`)}
            image={PROPERTY_PREVIEWS[tp]}
            selected={property.type === tp}
            onClick={() => setProperty({ type: tp })}
          />
        ))}
      </div>

      {/* Property condition — 2 cards with visual context */}
      <SectionLabel>{t('propertyCondition')}</SectionLabel>
      <div className="grid grid-cols-2 gap-4">
        {CONDITIONS.map((c) => (
          <OptionCard key={c}
            label={t(`conditions.${c}`)}
            description={t(`conditions.${c}_desc`)}
            image={CONDITION_PREVIEWS[c]}
            selected={property.condition === c}
            onClick={() => setProperty({ condition: c })}
          />
        ))}
      </div>

      {/* Renovation scope — 3 cards showing scope of work */}
      <SectionLabel>{t('renovationScope')}</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SCOPES.map((s) => (
          <OptionCard key={s}
            label={t(`scopes.${s}`)}
            description={t(`scopes.${s}_desc`)}
            image={SCOPE_PREVIEWS[s]}
            selected={property.scope === s}
            onClick={() => setProperty({ scope: s })}
          />
        ))}
      </div>

      {/* City — text only, no preview needed */}
      <SectionLabel>{t('yourCity')}</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-4">
        {CITIES.map((c) => (
          <OptionCard key={c}
            label={t(`cities.${c}`)}
            selected={property.city === c}
            onClick={() => setProperty({ city: c })}
          />
        ))}
      </div>
    </WizardLayout>
  )
}
