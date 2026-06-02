import { formatRange } from '@/lib/calculations'
import type { EstimateRange } from '@/lib/types'

interface RunningEstimateFooterProps {
  total: EstimateRange
  roomCount: number
}

export function RunningEstimateFooter({ total, roomCount }: RunningEstimateFooterProps) {
  if (roomCount === 0) return null
  return (
    <div className="px-5 py-3 border-t border-border bg-bg">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs text-muted mb-0.5">Running estimate</div>
          <div className="font-bold text-fg text-lg">{formatRange(total)}</div>
        </div>
        <div className="text-sm text-muted">{roomCount} {roomCount === 1 ? 'room' : 'rooms'}</div>
      </div>
    </div>
  )
}
