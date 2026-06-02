interface ConditionItemProps {
  label: string
  description: string
  price: string
  selected?: boolean
  onClick: () => void
}

export function ConditionItem({ label, description, price, selected, onClick }: ConditionItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between rounded-xl border px-4 py-4 transition-all
        ${selected
          ? 'border-primary bg-primary/5 ring-1 ring-primary'
          : 'border-border bg-surface hover:border-primary/40'
        }
      `}
    >
      <div className="text-left">
        <div className="font-semibold text-fg text-sm">{label}</div>
        <div className="text-muted text-xs mt-0.5">{description}</div>
      </div>
      <div className="text-price text-sm font-medium ml-4 shrink-0">{price}</div>
    </button>
  )
}
