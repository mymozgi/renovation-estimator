'use client'

import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { OptionCard } from './OptionCard'
import { ConditionItem } from './ConditionItem'
import { ROOM_TYPE_ICONS, WALL_CONDITION_LABELS, FLOOR_CONDITION_LABELS, CEILING_CONDITION_LABELS } from '@/lib/labels'
import { Button } from './Button'
import {
  ROOM_PREVIEWS,
  WALL_CONDITION_PREVIEWS, FLOOR_CONDITION_PREVIEWS, CEILING_CONDITION_PREVIEWS,
  WALL_FINISH_PREVIEWS, FLOOR_FINISH_PREVIEWS, CEILING_FINISH_PREVIEWS,
  QUALITY_TIER_PREVIEWS,
} from '@/lib/optionPreviews'
import type {
  Room, RoomType, QualityTier,
  WallFinish, FloorFinish, CeilingFinish,
  WallCondition, FloorCondition, CeilingCondition,
} from '@/lib/types'

const ROOM_TYPES: RoomType[]         = ['kitchen', 'living_room', 'bedroom', 'bathroom', 'hallway', 'office']
const QUALITY_TIERS: QualityTier[]   = ['economy', 'standard', 'premium']
const WALL_FINISHES: WallFinish[]    = ['paint', 'wallpaper', 'decorative_plaster']
const FLOOR_FINISHES: FloorFinish[]  = ['laminate', 'tile', 'vinyl']
const CEILING_FINISHES: CeilingFinish[] = ['paint', 'stretch_ceiling', 'drywall']
const WALL_CONDITIONS: WallCondition[]  = ['ready', 'primer', 'putty', 'full_prep']
const FLOOR_CONDITIONS: FloorCondition[] = ['ready', 'leveling']
const CEILING_CONDITIONS: CeilingCondition[] = ['ready', 'primer', 'full_prep']

type DraftRoom = Omit<Room, 'id'>

const DEFAULT_DRAFT: DraftRoom = {
  type: 'living_room',
  width: 4,
  length: 5,
  height: 2.7,
  windows: 1,
  doors: 1,
  wallCondition: 'ready',
  floorCondition: 'ready',
  ceilingCondition: 'ready',
  wallFinish: 'paint',
  floorFinish: 'laminate',
  ceilingFinish: 'paint',
  qualityTier: 'standard',
}

const TOTAL_STEPS = 6

interface RoomWizardProps {
  initial?: Partial<DraftRoom>
  onSave: (room: DraftRoom) => void
  onClose: () => void
}

function Counter({ value, onChange, min = 0, max = 10 }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-full border border-border bg-bg flex items-center justify-center text-fg disabled:opacity-40"
        disabled={value <= min}
      >
        <Minus size={14} />
      </button>
      <span className="font-bold text-fg text-lg w-6 text-center">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 rounded-full border border-border bg-bg flex items-center justify-center text-fg disabled:opacity-40"
        disabled={value >= max}
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

function NumberInput({ label, value, onChange, min = 1, max = 50, step = 0.1 }: {
  label: string; value: number; onChange: (v: number) => void
  min?: number; max?: number; step?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted uppercase tracking-wide">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = parseFloat(e.target.value)
            if (!isNaN(v) && v >= min && v <= max) onChange(v)
          }}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-fg font-bold text-center text-lg focus:outline-none focus:border-primary"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm">m</span>
      </div>
    </div>
  )
}

export function RoomWizard({ initial, onSave, onClose }: RoomWizardProps) {
  const t = useTranslations('wizard')
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState<DraftRoom>({ ...DEFAULT_DRAFT, ...initial })

  const set = <K extends keyof DraftRoom>(key: K, val: DraftRoom[K]) =>
    setDraft((d) => ({ ...d, [key]: val }))

  const canAdvance = () => {
    if (step === 1) return !!draft.type
    if (step === 2) return draft.width > 0 && draft.length > 0 && draft.height > 0
    return true
  }

  const areas = {
    floor:   draft.width * draft.length,
    wall:    Math.max(0, 2 * (draft.width + draft.length) * draft.height - draft.windows * 1.5 - draft.doors * 2.0),
    ceiling: draft.width * draft.length,
  }

  return (
    <div className="fixed inset-0 bg-bg z-50 flex flex-col max-w-[1464px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-5 pb-3">
        <button
          onClick={step === 1 ? onClose : () => setStep(s => s - 1)}
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-fg"
        >
          {step === 1 ? <X size={16} /> : <span className="text-sm">←</span>}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted tracking-wide">
            {t('step', { step, total: TOTAL_STEPS })}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i < step ? 'w-5 bg-primary' : 'w-2 bg-border'}`} />
            ))}
          </div>
        </div>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-4">

        {/* Step 1: Room type */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('roomSettings')}</h2>
            <p className="text-muted text-sm mb-5">{t('roomSettingsDesc')}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ROOM_TYPES.map((type) => (
                <OptionCard
                  key={type}
                  label={t(`roomTypes.${type}`)}
                  image={ROOM_PREVIEWS[type]}
                  selected={draft.type === type}
                  onClick={() => set('type', type)}
                />
              ))}
            </div>
          </>
        )}

        {/* Step 2: Dimensions */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('dimensions')}</h2>
            <p className="text-muted text-sm mb-5">{t('dimensionsDesc')}</p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <NumberInput label={t('width')}  value={draft.width}  onChange={(v) => set('width', v)} />
              <NumberInput label={t('length')} value={draft.length} onChange={(v) => set('length', v)} />
              <NumberInput label={t('height')} value={draft.height} onChange={(v) => set('height', v)} min={2} max={5} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">{t('windows')}</label>
                <Counter value={draft.windows} onChange={(v) => set('windows', v)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">{t('doors')}</label>
                <Counter value={draft.doors} onChange={(v) => set('doors', v)} />
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">{t('calculatedAreas')}</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'floor',   value: areas.floor },
                  { key: 'walls',   value: areas.wall },
                  { key: 'ceiling', value: areas.ceiling },
                ].map(({ key, value }) => (
                  <div key={key} className="text-center">
                    <div className="font-bold text-fg text-lg">{value.toFixed(1)}</div>
                    <div className="text-muted text-xs">m² {t(key as 'floor' | 'walls' | 'ceiling')}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-2 pt-2 border-t border-border">
                <span className="text-xs text-muted">{t('doors')}: {draft.doors}</span>
                <span className="text-xs text-muted">{t('windows')}: {draft.windows}</span>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Wall condition */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('wallCondition')}</h2>
            <p className="text-muted text-sm mb-5">{t('wallConditionDesc')}</p>
            <div className="grid grid-cols-2 gap-4">
              {WALL_CONDITIONS.map((cond) => (
                <ConditionItem
                  key={cond}
                  label={t(`wallConditions.${cond}`)}
                  description={t(`wallConditions.${cond}_desc`)}
                  price={WALL_CONDITION_LABELS[cond].price}
                  image={WALL_CONDITION_PREVIEWS[cond]}
                  selected={draft.wallCondition === cond}
                  onClick={() => set('wallCondition', cond)}
                />
              ))}
            </div>
          </>
        )}

        {/* Step 4: Floor + Ceiling condition */}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('floorCondition')}</h2>
            <p className="text-muted text-sm mb-5">{t('floorConditionDesc')}</p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {FLOOR_CONDITIONS.map((cond) => (
                <ConditionItem
                  key={cond}
                  label={t(`floorConditions.${cond}`)}
                  description={t(`floorConditions.${cond}_desc`)}
                  price={FLOOR_CONDITION_LABELS[cond].price}
                  image={FLOOR_CONDITION_PREVIEWS[cond]}
                  selected={draft.floorCondition === cond}
                  onClick={() => set('floorCondition', cond)}
                />
              ))}
            </div>
            <h2 className="text-2xl font-serif font-bold text-fg mt-4 mb-1">{t('ceilingCondition')}</h2>
            <p className="text-muted text-sm mb-5">{t('ceilingConditionDesc')}</p>
            <div className="grid grid-cols-3 gap-4">
              {CEILING_CONDITIONS.map((cond) => (
                <ConditionItem
                  key={cond}
                  label={t(`ceilingConditions.${cond}`)}
                  description={t(`ceilingConditions.${cond}_desc`)}
                  price={CEILING_CONDITION_LABELS[cond].price}
                  image={CEILING_CONDITION_PREVIEWS[cond]}
                  selected={draft.ceilingCondition === cond}
                  onClick={() => set('ceilingCondition', cond)}
                />
              ))}
            </div>
          </>
        )}

        {/* Step 5: Finishes */}
        {step === 5 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('chooseFinishes')}</h2>
            <p className="text-muted text-sm mb-5">{t('chooseFinishesDesc')}</p>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{t('qualityTier')}</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {QUALITY_TIERS.map((tier) => (
                <OptionCard key={tier} label={t(`qualityTiers.${tier}`)} image={QUALITY_TIER_PREVIEWS[tier]} selected={draft.qualityTier === tier} onClick={() => set('qualityTier', tier)} />
              ))}
            </div>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{t('wallFinish')}</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {WALL_FINISHES.map((f) => (
                <OptionCard key={f} label={t(`wallFinishes.${f}`)} image={WALL_FINISH_PREVIEWS[f]} selected={draft.wallFinish === f} onClick={() => set('wallFinish', f)} />
              ))}
            </div>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{t('floorFinish')}</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {FLOOR_FINISHES.map((f) => (
                <OptionCard key={f} label={t(`floorFinishes.${f}`)} image={FLOOR_FINISH_PREVIEWS[f]} selected={draft.floorFinish === f} onClick={() => set('floorFinish', f)} />
              ))}
            </div>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{t('ceilingFinish')}</div>
            <div className="grid grid-cols-3 gap-3">
              {CEILING_FINISHES.map((f) => (
                <OptionCard key={f} label={t(`ceilingFinishes.${f}`)} image={CEILING_FINISH_PREVIEWS[f]} selected={draft.ceilingFinish === f} onClick={() => set('ceilingFinish', f)} />
              ))}
            </div>
          </>
        )}

        {/* Step 6: Summary */}
        {step === 6 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">{t('confirmRoom')}</h2>
            <p className="text-muted text-sm mb-5">{t('confirmRoomDesc')}</p>
            <div className="space-y-3">
              {[
                { label: t('roomType'),          value: `${ROOM_TYPE_ICONS[draft.type]} ${t(`roomTypes.${draft.type}`)}` },
                { label: t('dimensionsSummary'), value: `${draft.width} × ${draft.length} × ${draft.height} m` },
                { label: t('floorArea'),         value: `${areas.floor.toFixed(1)} m²` },
                { label: t('wallArea'),           value: `${areas.wall.toFixed(1)} m²` },
                { label: t('quality'),            value: t(`qualityTiers.${draft.qualityTier}`) },
                { label: t('wallFinish'),         value: t(`wallFinishes.${draft.wallFinish}`) },
                { label: t('floorFinish'),        value: t(`floorFinishes.${draft.floorFinish}`) },
                { label: t('ceilingFinish'),      value: t(`ceilingFinishes.${draft.ceilingFinish}`) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-border">
                  <span className="text-muted text-sm">{label}</span>
                  <span className="text-fg font-medium text-sm">{value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-8 pb-8 pt-3">
        <Button
          onClick={() => {
            if (step < TOTAL_STEPS) setStep(s => s + 1)
            else onSave(draft)
          }}
          disabled={!canAdvance()}
          fullWidth
          className="disabled:!bg-muted-green disabled:!opacity-100"
        >
          {step < TOTAL_STEPS ? t('continue') : t('saveRoom')}
        </Button>
      </div>
    </div>
  )
}
