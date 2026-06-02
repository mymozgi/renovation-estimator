'use client'

import { useRouter } from 'next/navigation'
import { WizardLayout } from '@/components/WizardLayout'
import { OptionCard } from '@/components/OptionCard'
import { useEstimatorStore } from '@/lib/store'
import {
  PROPERTY_TYPE_LABELS,
  PROPERTY_CONDITION_LABELS,
  SCOPE_LABELS,
  CITY_LABELS,
} from '@/lib/labels'
import type { PropertyType, PropertyCondition, RenovationScope, City } from '@/lib/types'

const PROPERTY_TYPES: PropertyType[] = ['apartment', 'house']
const CONDITIONS: PropertyCondition[] = ['new', 'preowned']
const SCOPES: RenovationScope[] = ['cosmetic', 'premium', 'full']
const CITIES: City[] = ['warsaw', 'krakow', 'wroclaw', 'gdansk', 'poznan', 'other']

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold text-muted uppercase tracking-wide mt-6 mb-2">{children}</div>
  )
}

export default function EstimatePage() {
  const router = useRouter()
  const { property, setProperty } = useEstimatorStore()

  const canContinue =
    property.type !== null &&
    property.condition !== null &&
    property.scope !== null &&
    property.city !== null

  return (
    <WizardLayout
      step={1}
      totalSteps={4}
      backHref="/"
      footer={
        <button
          onClick={() => router.push('/rooms')}
          disabled={!canContinue}
          className="w-full bg-primary text-white font-semibold rounded-xl py-4 text-base disabled:bg-muted-green disabled:cursor-not-allowed transition-colors hover:bg-primary/90"
        >
          Start free estimate →
        </button>
      }
    >
      <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">About your property</h2>
      <p className="text-muted text-sm mb-2">Helps calibrate material and labor costs.</p>

      <SectionLabel>Property type</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {PROPERTY_TYPES.map((t) => (
          <OptionCard
            key={t}
            label={PROPERTY_TYPE_LABELS[t]}
            selected={property.type === t}
            onClick={() => setProperty({ type: t })}
          />
        ))}
      </div>

      <SectionLabel>Property condition</SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {CONDITIONS.map((c) => (
          <OptionCard
            key={c}
            label={PROPERTY_CONDITION_LABELS[c].label}
            description={PROPERTY_CONDITION_LABELS[c].description}
            selected={property.condition === c}
            onClick={() => setProperty({ condition: c })}
          />
        ))}
      </div>

      <SectionLabel>Renovation scope</SectionLabel>
      <div className="flex flex-col gap-3">
        {SCOPES.map((s) => (
          <OptionCard
            key={s}
            label={SCOPE_LABELS[s].label}
            description={SCOPE_LABELS[s].description}
            selected={property.scope === s}
            onClick={() => setProperty({ scope: s })}
          />
        ))}
      </div>

      <SectionLabel>Your city</SectionLabel>
      <div className="grid grid-cols-2 gap-3 pb-4">
        {CITIES.map((c) => (
          <OptionCard
            key={c}
            label={CITY_LABELS[c]}
            selected={property.city === c}
            onClick={() => setProperty({ city: c })}
          />
        ))}
      </div>
    </WizardLayout>
  )
}
