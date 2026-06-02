'use client'

import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { OptionCard } from './OptionCard'
import { ConditionItem } from './ConditionItem'
import {
  ROOM_TYPE_LABELS, ROOM_TYPE_ICONS,
  WALL_CONDITION_LABELS, FLOOR_CONDITION_LABELS, CEILING_CONDITION_LABELS,
  WALL_FINISH_LABELS, FLOOR_FINISH_LABELS, CEILING_FINISH_LABELS,
  QUALITY_LABELS,
} from '@/lib/labels'
import type {
  Room, RoomType, QualityTier,
  WallFinish, FloorFinish, CeilingFinish,
  WallCondition, FloorCondition, CeilingCondition,
} from '@/lib/types'

const ROOM_TYPES: RoomType[] = ['kitchen', 'living_room', 'bedroom', 'bathroom', 'hallway', 'office']
const QUALITY_TIERS: QualityTier[] = ['economy', 'standard', 'premium']
const WALL_FINISHES: WallFinish[] = ['paint', 'wallpaper', 'decorative_plaster']
const FLOOR_FINISHES: FloorFinish[] = ['laminate', 'tile', 'vinyl']
const CEILING_FINISHES: CeilingFinish[] = ['paint', 'stretch_ceiling', 'drywall']
const WALL_CONDITIONS: WallCondition[] = ['ready', 'primer', 'putty', 'full_prep']
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
    floor: draft.width * draft.length,
    wall: Math.max(0, 2 * (draft.width + draft.length) * draft.height - draft.windows * 1.5 - draft.doors * 2.0),
    ceiling: draft.width * draft.length,
  }

  return (
    <div className="fixed inset-0 bg-bg z-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={step === 1 ? onClose : () => setStep(s => s - 1)}
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-fg"
        >
          {step === 1 ? <X size={16} /> : <span className="text-sm">←</span>}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted tracking-wide">STEP {step} OF {TOTAL_STEPS}</span>
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i < step ? 'w-5 bg-primary' : 'w-2 bg-border'}`} />
            ))}
          </div>
        </div>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Step 1: Room type */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Room settings</h2>
            <p className="text-muted text-sm mb-5">Areas are calculated automatically.</p>
            <div className="grid grid-cols-3 gap-3">
              {ROOM_TYPES.map((type) => (
                <OptionCard
                  key={type}
                  label={ROOM_TYPE_LABELS[type]}
                  icon={ROOM_TYPE_ICONS[type]}
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
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Dimensions</h2>
            <p className="text-muted text-sm mb-5">Areas are calculated automatically.</p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <NumberInput label="Width" value={draft.width} onChange={(v) => set('width', v)} />
              <NumberInput label="Length" value={draft.length} onChange={(v) => set('length', v)} />
              <NumberInput label="Height" value={draft.height} onChange={(v) => set('height', v)} min={2} max={5} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">Windows</label>
                <Counter value={draft.windows} onChange={(v) => set('windows', v)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">Doors</label>
                <Counter value={draft.doors} onChange={(v) => set('doors', v)} />
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Calculated Areas</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Floor', value: areas.floor },
                  { label: 'Walls', value: areas.wall },
                  { label: 'Ceiling', value: areas.ceiling },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="font-bold text-fg text-lg">{value.toFixed(1)}</div>
                    <div className="text-muted text-xs">m² {label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-2 pt-2 border-t border-border">
                <span className="text-xs text-muted">Doors: {draft.doors}</span>
                <span className="text-xs text-muted">Windows: {draft.windows}</span>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Wall condition */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Wall condition</h2>
            <p className="text-muted text-sm mb-5">Determines preparation costs. Pick what best describes the current state.</p>
            <div className="flex flex-col gap-3">
              {WALL_CONDITIONS.map((cond) => (
                <ConditionItem
                  key={cond}
                  {...WALL_CONDITION_LABELS[cond]}
                  selected={draft.wallCondition === cond}
                  onClick={() => set('wallCondition', cond)}
                />
              ))}
            </div>
          </>
        )}

        {/* Step 4: Floor condition */}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Floor condition</h2>
            <p className="text-muted text-sm mb-5">Determines preparation costs. Pick what best describes the current state.</p>
            <div className="flex flex-col gap-3 mb-5">
              {FLOOR_CONDITIONS.map((cond) => (
                <ConditionItem
                  key={cond}
                  {...FLOOR_CONDITION_LABELS[cond]}
                  selected={draft.floorCondition === cond}
                  onClick={() => set('floorCondition', cond)}
                />
              ))}
            </div>
            <h2 className="text-2xl font-serif font-bold text-fg mt-4 mb-1">Ceiling condition</h2>
            <p className="text-muted text-sm mb-5">Pick what best describes the current ceiling state.</p>
            <div className="flex flex-col gap-3">
              {CEILING_CONDITIONS.map((cond) => (
                <ConditionItem
                  key={cond}
                  {...CEILING_CONDITION_LABELS[cond]}
                  selected={draft.ceilingCondition === cond}
                  onClick={() => set('ceilingCondition', cond)}
                />
              ))}
            </div>
          </>
        )}

        {/* Step 5: Finishers */}
        {step === 5 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Choose finishers</h2>
            <p className="text-muted text-sm mb-5">Select materials and quality tier for this room.</p>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Quality tier</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {QUALITY_TIERS.map((tier) => (
                <OptionCard key={tier} label={QUALITY_LABELS[tier]} selected={draft.qualityTier === tier} onClick={() => set('qualityTier', tier)} />
              ))}
            </div>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Wall finish</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {WALL_FINISHES.map((f) => (
                <OptionCard key={f} label={WALL_FINISH_LABELS[f]} selected={draft.wallFinish === f} onClick={() => set('wallFinish', f)} />
              ))}
            </div>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Floor finish</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {FLOOR_FINISHES.map((f) => (
                <OptionCard key={f} label={FLOOR_FINISH_LABELS[f]} selected={draft.floorFinish === f} onClick={() => set('floorFinish', f)} />
              ))}
            </div>

            <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Ceiling finish</div>
            <div className="grid grid-cols-3 gap-3">
              {CEILING_FINISHES.map((f) => (
                <OptionCard key={f} label={CEILING_FINISH_LABELS[f]} selected={draft.ceilingFinish === f} onClick={() => set('ceilingFinish', f)} />
              ))}
            </div>
          </>
        )}

        {/* Step 6: Summary / confirm */}
        {step === 6 && (
          <>
            <h2 className="text-2xl font-serif font-bold text-fg mt-2 mb-1">Confirm room</h2>
            <p className="text-muted text-sm mb-5">Review settings before saving.</p>
            <div className="space-y-3">
              {[
                { label: 'Room type', value: `${ROOM_TYPE_ICONS[draft.type]} ${ROOM_TYPE_LABELS[draft.type]}` },
                { label: 'Dimensions', value: `${draft.width} × ${draft.length} × ${draft.height} m` },
                { label: 'Floor area', value: `${areas.floor.toFixed(1)} m²` },
                { label: 'Wall area', value: `${areas.wall.toFixed(1)} m²` },
                { label: 'Quality tier', value: QUALITY_LABELS[draft.qualityTier] },
                { label: 'Wall finish', value: WALL_FINISH_LABELS[draft.wallFinish] },
                { label: 'Floor finish', value: FLOOR_FINISH_LABELS[draft.floorFinish] },
                { label: 'Ceiling finish', value: CEILING_FINISH_LABELS[draft.ceilingFinish] },
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
      <div className="px-5 pb-8 pt-3">
        <button
          onClick={() => {
            if (step < TOTAL_STEPS) setStep(s => s + 1)
            else onSave(draft)
          }}
          disabled={!canAdvance()}
          className="w-full bg-primary text-white font-semibold rounded-xl py-4 text-base disabled:bg-muted-green disabled:cursor-not-allowed transition-colors hover:bg-primary/90"
        >
          {step < TOTAL_STEPS ? 'Continue' : 'Save room'}
        </button>
      </div>
    </div>
  )
}
