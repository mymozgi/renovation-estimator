import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-serif font-bold text-fg text-xl mb-3">{title}</h2>
      {children}
    </div>
  )
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-3">
      {rows.map(([label, value], i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3 text-sm border-b border-border last:border-b-0 bg-surface"
        >
          <span className="text-muted">{label}</span>
          <span className="font-medium text-fg">{value}</span>
        </div>
      ))}
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/5 border-l-2 border-primary rounded-r-xl px-4 py-3 text-xs text-muted leading-relaxed mb-3">
      {children}
    </div>
  )
}

export default function MethodologyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <Link
          href="/"
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-fg shrink-0"
        >
          <ArrowLeft size={16} />
        </Link>
        <span className="text-xs font-medium text-muted tracking-wide uppercase">Methodology</span>
      </div>

      <div className="px-5 pb-16">
        <h1 className="font-serif font-bold text-fg text-3xl leading-tight mb-2">
          How estimates are calculated
        </h1>
        <p className="text-muted text-sm leading-relaxed mb-8">
          Every estimate is built from your room dimensions, surface conditions, material choices, and regional labor rates. Here is exactly how.
        </p>

        {/* Formula */}
        <Section title="The estimation formula">
          <p className="text-sm text-muted leading-relaxed mb-4">
            For each room, we calculate four cost components and apply a regional multiplier:
          </p>
          <div className="bg-surface border border-border rounded-xl p-4 mb-3">
            <div className="font-mono text-xs text-fg leading-loose">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">Room total</span>
                <span className="text-muted">= (</span>
              </div>
              <div className="pl-4 space-y-1">
                <div><span className="text-fg">Materials</span></div>
                <div><span className="text-muted">+</span> <span className="text-fg">Labor</span></div>
                <div><span className="text-muted">+</span> <span className="text-fg">Surface preparation</span></div>
                <div><span className="text-muted">+</span> <span className="text-fg">Supporting materials</span></div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-muted">) ×</span>
                <span className="text-primary font-bold">Regional multiplier</span>
              </div>
            </div>
          </div>
          <Note>
            Each component is calculated as a range (min–max), so the final estimate is also a range.
            This reflects real-world variability in contractor pricing and material availability.
          </Note>
        </Section>

        {/* Area calculation */}
        <Section title="Area calculations">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Areas are derived from the dimensions you enter for each room:
          </p>
          <Table rows={[
            ['Floor area',   'width × length'],
            ['Ceiling area', 'width × length'],
            ['Wall area',    '2 × (width + length) × height − windows − doors'],
          ]} />
          <Table rows={[
            ['Window deduction', '1.5 m² per window'],
            ['Door deduction',   '2.0 m² per door'],
          ]} />
          <Note>
            Wall area is reduced by openings. A standard window is approximately 1.5 m²; a standard door is 2.0 m².
          </Note>
        </Section>

        {/* Materials */}
        <Section title="Material costs">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Material cost per m² depends on your chosen finish and quality tier. Three tiers are defined:
          </p>
          <Table rows={[
            ['Economy',  'Basic materials. Functional, widely available.'],
            ['Standard', 'Mid-range materials. Good balance of quality and cost.'],
            ['Premium',  'High-end materials. Luxury finishes, brand products.'],
          ]} />
          <p className="text-sm text-muted leading-relaxed mb-3">Example material costs (PLN/m²):</p>
          <Table rows={[
            ['Wall paint — Economy',    '12–18 PLN/m²'],
            ['Wall paint — Standard',   '22–35 PLN/m²'],
            ['Wall paint — Premium',    '40–65 PLN/m²'],
            ['Floor tile — Economy',    '40–60 PLN/m²'],
            ['Floor tile — Standard',   '75–110 PLN/m²'],
            ['Floor tile — Premium',    '140–220 PLN/m²'],
            ['Laminate — Economy',      '22–32 PLN/m²'],
            ['Stretch ceiling — Std',   '90–130 PLN/m²'],
          ]} />
        </Section>

        {/* Labor */}
        <Section title="Labor rates">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Labor costs are based on 2024 Polish market rates for each finish type.
            Labor is priced per m² of surface area and does not change with quality tier
            (the same installer applies both Economy and Premium materials).
          </p>
          <Table rows={[
            ['Wall painting',      '22–38 PLN/m²'],
            ['Wallpaper',          '32–52 PLN/m²'],
            ['Decorative plaster', '48–78 PLN/m²'],
            ['Laminate flooring',  '22–38 PLN/m²'],
            ['Tile installation',  '55–95 PLN/m²'],
            ['Vinyl flooring',     '18–32 PLN/m²'],
            ['Ceiling paint',      '18–32 PLN/m²'],
            ['Stretch ceiling',    '75–140 PLN/m²'],
            ['Drywall ceiling',    '55–90 PLN/m²'],
          ]} />
          <Note>
            Rates reflect typical contractor pricing in Poland. Independent contractors may be lower;
            renovation companies may be higher. These are averages, not guaranteed quotes.
          </Note>
        </Section>

        {/* Surface preparation */}
        <Section title="Surface preparation">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Preparation costs depend on the current condition of each surface. Better conditions mean less prep work and lower cost.
          </p>
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Walls</p>
          <Table rows={[
            ['Ready to finish',  '+0 PLN/m²'],
            ['Primer needed',    '+6–12 PLN/m²'],
            ['Putty needed',     '+16–26 PLN/m²'],
            ['Full preparation', '+32–52 PLN/m²'],
          ]} />
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Floors</p>
          <Table rows={[
            ['Ready',            '+0 PLN/m²'],
            ['Leveling needed',  '+22–38 PLN/m²'],
          ]} />
          <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Ceilings</p>
          <Table rows={[
            ['Ready',            '+0 PLN/m²'],
            ['Primer needed',    '+6–10 PLN/m²'],
            ['Full preparation', '+20–35 PLN/m²'],
          ]} />
        </Section>

        {/* Supporting materials */}
        <Section title="Supporting materials">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Every renovation requires consumables beyond the main materials:
            adhesives, grout, primer, screws, tape, protective sheeting, and similar items.
            We estimate these at <span className="font-medium text-fg">10–15% of total material cost</span>.
          </p>
          <Note>
            This is a conservative estimate. Actual supporting material cost varies by trade
            and project complexity, but 10–15% is a reliable industry rule of thumb.
          </Note>
        </Section>

        {/* Regional multipliers */}
        <Section title="Regional pricing adjustments">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Labor and material costs vary significantly by city in Poland.
            Warsaw has the highest rates; smaller cities and rural areas are closer to the national baseline.
          </p>
          <Table rows={[
            ['Warsaw',     '×1.20  (+20%)'],
            ['Kraków',     '×1.10  (+10%)'],
            ['Wrocław',    '×1.10  (+10%)'],
            ['Gdańsk',     '×1.05  (+5%)'],
            ['Poznań',     '×1.05  (+5%)'],
            ['Other city', '×1.00  (baseline)'],
          ]} />
          <Note>
            Multipliers reflect 2024 market conditions. The regional adjustment is applied to the full room
            subtotal (materials + labor + preparation + supporting materials).
          </Note>
        </Section>

        {/* What is not included */}
        <Section title="What is NOT included">
          <p className="text-sm text-muted leading-relaxed mb-3">
            This estimator covers surface renovation only. The following are outside scope:
          </p>
          <div className="space-y-2">
            {[
              ['Structural work', 'Load-bearing walls, foundations, beams'],
              ['Electrical work', 'Rewiring, new circuits, consumer unit'],
              ['Plumbing', 'Pipe replacement, boiler installation, radiators'],
              ['Windows & doors', 'Replacement units (only deducted from area)'],
              ['Design fees', 'Interior designer or architect'],
              ['Permits & inspections', 'Planning permission, building control'],
              ['Furniture & appliances', 'Kitchens, bathrooms, fitted wardrobes'],
              ['Contractor overhead', 'Project management fees above labor rates'],
            ].map(([label, desc]) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className="text-destructive font-bold shrink-0">✕</span>
                <span><span className="font-medium text-fg">{label}</span> <span className="text-muted">— {desc}</span></span>
              </div>
            ))}
          </div>
        </Section>

        {/* Data sources */}
        <Section title="Data sources">
          <p className="text-sm text-muted leading-relaxed mb-3">
            Pricing data is sourced from:
          </p>
          <div className="space-y-2 text-sm">
            {[
              'Polish contractor price surveys (2024)',
              'Building material retail price indexes',
              'Regional labor market rate reports',
              'Industry association guidelines (Polska Izba Inżynierów Budownictwa)',
            ].map((source) => (
              <div key={source} className="flex gap-2">
                <span className="text-primary shrink-0">·</span>
                <span className="text-muted">{source}</span>
              </div>
            ))}
          </div>
          <Note>
            Prices are reviewed periodically. This tool provides a budget confidence range,
            not a legally binding quotation. Always get at least two contractor quotes before committing.
          </Note>
        </Section>

        {/* CTA */}
        <Link
          href="/estimate"
          className="block w-full bg-primary text-white font-semibold rounded-xl py-4 text-base text-center hover:bg-primary/90 transition-colors"
        >
          Start free estimate →
        </Link>
      </div>
    </div>
  )
}
