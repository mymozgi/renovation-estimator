'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ROOM_PREVIEWS } from '@/lib/optionPreviews'
import { formatRange } from '@/lib/calculations'
import type { Room, EstimateRange } from '@/lib/types'

interface RoomCardProps {
  room: Room
  estimate: EstimateRange
  onEdit: () => void
  onRemove: () => void
}

export function RoomCard({ room, estimate, onEdit, onRemove }: RoomCardProps) {
  const t = useTranslations('wizard')

  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-10 rounded-lg overflow-hidden bg-bg flex-shrink-0">
              {ROOM_PREVIEWS[room.type]}
            </div>
          <div>
            <div className="font-semibold text-fg">{t(`roomTypes.${room.type}`)}</div>
            <div className="text-muted text-xs mt-0.5">
              {room.width}×{room.length} m · {(room.width * room.length).toFixed(0)} m²
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center text-muted hover:text-fg transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={onRemove}
            className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center text-muted hover:text-destructive transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
          {t(`qualityTiers.${room.qualityTier}`)}
        </span>
        <span className="font-bold text-fg text-sm">{formatRange(estimate)}</span>
      </div>
    </div>
  )
}
