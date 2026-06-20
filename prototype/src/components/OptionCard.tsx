import { Check } from 'lucide-react'

interface OptionCardProps {
  label: string
  description?: string
  icon?: string
  image?: React.ReactNode
  selected?: boolean
  onClick: () => void
}

export function OptionCard({ label, description, icon, image, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative w-full text-left rounded-xl border overflow-hidden cursor-pointer',
        'transition-all duration-200 ease-out',
        selected
          ? 'border-primary bg-primary/[0.06] ring-2 ring-primary/20 shadow-sm'
          : 'border-border bg-surface hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)]',
      ].join(' ')}
    >
      {image && (
        <div className="relative aspect-video w-full overflow-hidden bg-bg">
          {image}
          {selected && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary shadow flex items-center justify-center">
              <Check size={13} strokeWidth={3} className="text-white" />
            </div>
          )}
        </div>
      )}

      <div className="p-4 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {icon && !image && <div className="text-2xl mb-2">{icon}</div>}
          <div className={`font-semibold text-sm ${selected ? 'text-primary' : 'text-fg'}`}>
            {label}
          </div>
          {description && (
            <div className="text-muted text-xs mt-0.5 leading-relaxed">{description}</div>
          )}
        </div>

        {!image && (
          <div className={[
            'shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            selected
              ? 'border-primary bg-primary'
              : 'border-border bg-transparent',
          ].join(' ')}>
            {selected && <Check size={11} strokeWidth={3} className="text-white" />}
          </div>
        )}
      </div>
    </button>
  )
}
