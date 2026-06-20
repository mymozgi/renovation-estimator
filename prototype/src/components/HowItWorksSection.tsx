import Image from 'next/image'
import { useTranslations } from 'next-intl'

const STEP_IMGS = [
  { id: '1484154218962-a197022b5858', alt: 'Konfiguracja pokoi' },
  { id: '1618221195710-dd6b41faaea6', alt: 'Wybór standardu' },
  { id: '1554224155-8d04cb21cd6c',   alt: 'Gotowy kosztorys' },
]

export function HowItWorksSection() {
  const t = useTranslations('howItWorks')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {([1, 2, 3] as const).map((n, i) => (
        <div key={n} className="rounded-2xl border border-border bg-surface overflow-hidden flex flex-col">
          <div className="relative aspect-[4/3] w-full shrink-0">
            <Image
              src={`https://images.unsplash.com/photo-${STEP_IMGS[i].id}?w=800&q=80&auto=format&fit=crop`}
              alt={STEP_IMGS[i].alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center mb-3 shrink-0">
              {n}
            </div>
            <div className="font-semibold text-fg text-base mb-1.5">{t(`step${n}Title`)}</div>
            <div className="text-muted text-sm leading-relaxed">{t(`step${n}Desc`)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
