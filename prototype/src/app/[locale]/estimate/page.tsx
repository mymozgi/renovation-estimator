'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { WizardLayout } from '@/components/WizardLayout'
import { OptionCard } from '@/components/OptionCard'
import { Button } from '@/components/Button'
import { useEstimatorStore } from '@/lib/store'
import { QUALITY_TIER_PREVIEWS } from '@/lib/optionPreviews'
import type { PropertyType, PropertyCondition, QualityTier, RenovationScope, City } from '@/lib/types'

const PROPERTY_TYPES: PropertyType[]  = ['apartment', 'house']
const CONDITIONS: PropertyCondition[] = ['new', 'preowned']
const QUALITY_TIERS: QualityTier[]   = ['economy', 'standard', 'premium']
const SCOPES: RenovationScope[]       = ['cosmetic', 'premium', 'full']
const CITIES: City[]                  = ['warsaw', 'krakow', 'wroclaw', 'gdansk', 'poznan', 'other']

const BASE = 'https://images.unsplash.com/photo-'
const Q = '?w=800&q=80&auto=format&fit=crop'
function UImg({ id, alt }: { id: string; alt: string }) {
  return <Image src={`${BASE}${id}${Q}`} alt={alt} fill className="object-cover" />
}

const PROPERTY_PREVIEWS: Record<PropertyType, React.ReactElement> = {
  apartment: <UImg id="1502672260266-1c1ef2d93688" alt="Apartment" />,
  house:     <UImg id="1568605114967-8130f3a36994" alt="House"     />,
}

const CONDITION_PREVIEWS: Record<PropertyCondition, React.ReactElement> = {
  new:      <UImg id="1556909114-f6e7ad7d3136"    alt="New property"      />,
  preowned: <UImg id="1567016432779-094069958ea5" alt="Pre-owned property" />,
}

const SCOPE_PREVIEWS: Record<RenovationScope, React.ReactElement> = {
  cosmetic: <UImg id="1586023492125-27b2c045efd7" alt="Cosmetic renovation" />,
  premium:  <UImg id="1618221195710-dd6b41faaea6" alt="Premium renovation"  />,
  full:     <UImg id="1534349762230-e0cadf78f5da" alt="Full renovation"     />,
}

const TOTAL_STEPS = 6

export default function EstimatePage() {
  const [step, setStep] = useState(1)
  const router  = useRouter()
  const locale  = useLocale()
  const t       = useTranslations('estimate')
  const tw      = useTranslations('wizard')

  const { property, setProperty } = useEstimatorStore()

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = step === 1
    ? () => router.push(`/${locale}`)
    : () => setStep((s) => s - 1)

  const selectionDone = [
    property.type        !== null,
    property.condition   !== null,
    property.qualityTier !== null,
    property.scope       !== null,
    property.city        !== null,
  ]

  const footer = step < TOTAL_STEPS ? (
    <Button
      onClick={next}
      disabled={!selectionDone[step - 1]}
      fullWidth
      className="disabled:!bg-muted-green disabled:!opacity-100"
    >
      {tw('continue')}
    </Button>
  ) : (
    <Button onClick={() => router.push(`/${locale}/rooms`)} fullWidth>
      {t('cta')}
    </Button>
  )

  return (
    <WizardLayout step={step} totalSteps={TOTAL_STEPS} onBack={back} footer={footer} containerClass="max-w-[1000px]">

      {/* ── Step 1: Property type ────────────────────────────────────────────── */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('propertyType')}</h2>
          <p className="text-muted text-sm mb-4">{t('subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROPERTY_TYPES.map((tp) => (
              <OptionCard key={tp}
                label={t(`types.${tp}`)}
                image={PROPERTY_PREVIEWS[tp]}
                selected={property.type === tp}
                onClick={() => { setProperty({ type: tp }); next() }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Step 2: Property condition ───────────────────────────────────────── */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('propertyCondition')}</h2>
          <p className="text-muted text-sm mb-4">{t('subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONDITIONS.map((c) => (
              <OptionCard key={c}
                label={t(`conditions.${c}`)}
                description={t(`conditions.${c}_desc`)}
                image={CONDITION_PREVIEWS[c]}
                selected={property.condition === c}
                onClick={() => { setProperty({ condition: c }); next() }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Step 3: Quality standard ─────────────────────────────────────────── */}
      {step === 3 && (
        <>
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{tw('qualityTier')}</h2>
          <p className="text-muted text-sm mb-4">{t('subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {QUALITY_TIERS.map((tier) => (
              <OptionCard key={tier}
                label={tw(`qualityTiers.${tier}`)}
                description={t(`qualityTiers.${tier}_desc`)}
                image={QUALITY_TIER_PREVIEWS[tier]}
                selected={property.qualityTier === tier}
                onClick={() => { setProperty({ qualityTier: tier }); next() }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Step 4: Renovation scope ─────────────────────────────────────────── */}
      {step === 4 && (
        <>
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('renovationScope')}</h2>
          <p className="text-muted text-sm mb-4">{t('subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SCOPES.map((s) => (
              <OptionCard key={s}
                label={t(`scopes.${s}`)}
                description={t(`scopes.${s}_desc`)}
                image={SCOPE_PREVIEWS[s]}
                selected={property.scope === s}
                onClick={() => { setProperty({ scope: s }); next() }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Step 5: City ─────────────────────────────────────────────────────── */}
      {step === 5 && (
        <>
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('yourCity')}</h2>
          <p className="text-muted text-sm mb-4">{t('subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pb-4">
            {CITIES.map((c) => (
              <OptionCard key={c}
                label={t(`cities.${c}`)}
                selected={property.city === c}
                onClick={() => { setProperty({ city: c }); next() }}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Step 6: Summary + CTA ────────────────────────────────────────────── */}
      {step === 6 && (
        <>
          <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('summaryTitle')}</h2>
          <p className="text-muted text-sm mb-6">{t('summarySubtitle')}</p>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { label: t('propertyType'),     value: property.type        ? t(`types.${property.type}`)              : '' },
              { label: t('propertyCondition'), value: property.condition   ? t(`conditions.${property.condition}`)    : '' },
              { label: tw('qualityTier'),      value: property.qualityTier ? tw(`qualityTiers.${property.qualityTier}`) : '' },
              { label: t('renovationScope'),   value: property.scope       ? t(`scopes.${property.scope}`)            : '' },
              { label: t('yourCity'),          value: property.city        ? t(`cities.${property.city}`)             : '' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-xl">
                <span className="text-sm text-muted">{label}</span>
                <span className="text-sm font-semibold text-fg">{value}</span>
              </div>
            ))}
          </div>
        </>
      )}

    </WizardLayout>
  )
}
