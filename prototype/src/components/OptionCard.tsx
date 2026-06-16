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
      className={`
        w-full text-left rounded-xl border overflow-hidden transition-all
        ${selected
          ? 'border-primary bg-primary/5 ring-1 ring-primary'
          : 'border-border bg-surface hover:border-primary/40'
        }
      `}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-bg">
          {image}
        </div>
      )}
      <div className="p-4">
        {icon && !image && <div className="text-2xl mb-2">{icon}</div>}
        <div className="font-semibold text-fg text-sm">{label}</div>
        {description && (
          <div className="text-muted text-xs mt-0.5 leading-relaxed">{description}</div>
        )}
      </div>
    </button>
  )
}
