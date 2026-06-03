import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mb-8"><h2 className="font-serif font-bold text-fg text-xl mb-3">{title}</h2>{children}</div>
}
function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-3">
      {rows.map(([label, value], i) => (
        <div key={i} className="flex items-center justify-between px-4 py-3 text-sm border-b border-border last:border-b-0 bg-surface">
          <span className="text-muted">{label}</span>
          <span className="font-medium text-fg">{value}</span>
        </div>
      ))}
    </div>
  )
}
function Note({ children }: { children: React.ReactNode }) {
  return <div className="bg-primary/5 border-l-2 border-primary rounded-r-xl px-4 py-3 text-xs text-muted leading-relaxed mb-3">{children}</div>
}

type Props = { params: Promise<{ locale: string }> }

export default async function MethodologyPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('methodology')

  return (
    <div className="flex flex-col min-h-screen bg-bg max-w-md mx-auto">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <Link href={`/${locale}`} className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-fg shrink-0">
          <ArrowLeft size={16} />
        </Link>
        <span className="text-xs font-medium text-muted tracking-wide uppercase">{t('back')}</span>
      </div>

      <div className="px-5 pb-16">
        <h1 className="font-serif font-bold text-fg text-3xl leading-tight mb-2">{t('title')}</h1>
        <p className="text-muted text-sm leading-relaxed mb-8">{t('subtitle')}</p>

        <Section title="The estimation formula">
          <div className="bg-surface border border-border rounded-xl p-4 mb-3">
            <div className="font-mono text-xs text-fg leading-loose">
              <div><span className="text-primary font-bold">Room total</span><span className="text-muted"> = (</span></div>
              <div className="pl-4 space-y-1">
                <div>Materials</div>
                <div><span className="text-muted">+</span> Labor</div>
                <div><span className="text-muted">+</span> Surface preparation</div>
                <div><span className="text-muted">+</span> Supporting materials</div>
              </div>
              <div><span className="text-muted">) ×</span> <span className="text-primary font-bold">Regional multiplier</span></div>
            </div>
          </div>
          <Note>Each component is calculated as a range (min–max), so the final estimate is also a range. This reflects real-world variability in contractor pricing and material availability.</Note>
        </Section>

        <Section title="Area calculations">
          <Table rows={[
            ['Floor area',   'width × length'],
            ['Ceiling area', 'width × length'],
            ['Wall area',    '2 × (width + length) × height − windows − doors'],
          ]} />
          <Table rows={[['Window deduction', '1.5 m² per window'], ['Door deduction', '2.0 m² per door']]} />
        </Section>

        <Section title="Material costs by quality tier">
          <Table rows={[
            ['Economy',  'Basic, functional, widely available'],
            ['Standard', 'Mid-range, good quality-to-cost ratio'],
            ['Premium',  'High-end, luxury finishes, branded products'],
          ]} />
          <Table rows={[
            ['Wall paint — Economy', '12–18 PLN/m²'], ['Wall paint — Standard', '22–35 PLN/m²'], ['Wall paint — Premium', '40–65 PLN/m²'],
            ['Floor tile — Economy', '40–60 PLN/m²'], ['Floor tile — Standard', '75–110 PLN/m²'], ['Floor tile — Premium', '140–220 PLN/m²'],
            ['Laminate — Economy', '22–32 PLN/m²'], ['Stretch ceiling — Std', '90–130 PLN/m²'],
          ]} />
        </Section>

        <Section title="Labor rates (2024 Polish market)">
          <Table rows={[
            ['Wall painting', '22–38 PLN/m²'], ['Wallpaper', '32–52 PLN/m²'], ['Decorative plaster', '48–78 PLN/m²'],
            ['Laminate flooring', '22–38 PLN/m²'], ['Tile installation', '55–95 PLN/m²'], ['Vinyl flooring', '18–32 PLN/m²'],
            ['Ceiling paint', '18–32 PLN/m²'], ['Stretch ceiling', '75–140 PLN/m²'], ['Drywall ceiling', '55–90 PLN/m²'],
          ]} />
          <Note>Labor is priced per m² of surface area and does not change with quality tier.</Note>
        </Section>

        <Section title="Regional pricing adjustments">
          <Table rows={[
            ['Warsaw', '×1.20  (+20%)'], ['Kraków', '×1.10  (+10%)'], ['Wrocław', '×1.10  (+10%)'],
            ['Gdańsk', '×1.05  (+5%)'], ['Poznań', '×1.05  (+5%)'], ['Other city', '×1.00  (baseline)'],
          ]} />
        </Section>

        <Section title="Supporting materials">
          <p className="text-sm text-muted mb-3 leading-relaxed">Consumables (adhesives, grout, primer, tape, etc.) are estimated at <strong className="text-fg">10–15% of total material cost</strong>.</p>
        </Section>

        <Section title="What is NOT included">
          <div className="space-y-2">
            {[
              ['Structural work', 'Load-bearing walls, foundations'],
              ['Electrical', 'Rewiring, new circuits'],
              ['Plumbing', 'Pipe replacement, boiler'],
              ['Design fees', 'Interior designer or architect'],
              ['Permits', 'Planning permission, building control'],
              ['Furniture & appliances', 'Kitchens, bathrooms, wardrobes'],
            ].map(([label, desc]) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="text-destructive font-bold shrink-0">✕</span>
                <span><span className="font-medium text-fg">{label}</span> <span className="text-muted">— {desc}</span></span>
              </div>
            ))}
          </div>
        </Section>

        <Link href={`/${locale}/estimate`} className="block w-full bg-primary text-white font-semibold rounded-xl py-4 text-base text-center hover:bg-primary/90 transition-colors">
          {t('cta')}
        </Link>
      </div>
    </div>
  )
}
