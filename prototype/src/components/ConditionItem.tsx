interface ConditionItemProps {
  label: string
  description: string
  price: string
  image?: React.ReactNode
  selected?: boolean
  onClick: () => void
}

export function ConditionItem({ label, description, price, image, selected, onClick }: ConditionItemProps) {
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
      <div className={`flex items-center justify-between ${image ? 'px-4 py-3' : 'px-4 py-4'}`}>
        <div className="text-left">
          <div className="font-semibold text-fg text-sm">{label}</div>
          <div className="text-muted text-xs mt-0.5">{description}</div>
        </div>
        <div className="text-price text-sm font-medium ml-4 shrink-0">{price}</div>
      </div>
    </button>
  )
}
