import Link from 'next/link'
import { FileText, Hammer, MapPin, ShieldOff, Info } from 'lucide-react'

const FEATURES = [
  { icon: MapPin,    label: 'Local price ranges' },
  { icon: Hammer,    label: 'Labor included'     },
  { icon: FileText,  label: 'PDF report'         },
  { icon: ShieldOff, label: 'No account needed'  },
]

const TRUST_BADGES = [
  '±10–15% precision',
  'Real Polish market data',
  'Estimate in under 10 min',
  'No account needed',
]

const EXAMPLE_RATES = [
  { item: 'Wall painting',       city: 'Warsaw',  rate: '25–40 PLN/m²' },
  { item: 'Laminate flooring',   city: 'Kraków',  rate: '22–38 PLN/m²' },
  { item: 'Tile installation',   city: 'Gdańsk',  rate: '55–95 PLN/m²' },
  { item: 'Full wall prep',      city: 'Wrocław', rate: '+32–52 PLN/m²' },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg max-w-md mx-auto px-5">
      <div className="flex-1 flex flex-col py-16">

        {/* Hero */}
        <h1 className="font-serif font-bold text-fg text-4xl leading-tight mb-4">
          Fast renovation estimates.
        </h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          Get a realistic renovation budget based on room size, finish quality, and regional Polish pricing.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2">
              <Icon size={20} className="text-primary" />
              <span className="text-fg text-sm font-medium text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Pricing transparency block */}
        <div className="bg-surface border border-border rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-fg text-sm">How we estimate</h2>
            <Link href="/methodology" className="flex items-center gap-1 text-xs text-primary hover:underline">
              <Info size={12} /> Full methodology
            </Link>
          </div>

          {/* Formula */}
          <div className="flex items-center gap-1.5 text-xs mb-4 flex-wrap">
            {['Materials', 'Labor', 'Preparation', 'Regional rate'].map((part, i, arr) => (
              <span key={part} className="flex items-center gap-1.5">
                <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 font-medium">{part}</span>
                {i < arr.length - 1 && <span className="text-muted">+</span>}
              </span>
            ))}
          </div>

          {/* Example rates */}
          <div className="space-y-0 divide-y divide-border rounded-lg border border-border overflow-hidden mb-3">
            {EXAMPLE_RATES.map(({ item, city, rate }) => (
              <div key={item} className="flex items-center justify-between px-3 py-2.5 bg-bg">
                <span className="text-xs text-fg">{item} <span className="text-muted">· {city}</span></span>
                <span className="text-xs font-semibold text-price">{rate}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Prices reflect average {new Date().getFullYear()} Polish market rates.
            Final cost depends on contractor and conditions.{' '}
            <span className="font-medium text-fg">Precision: ±10–15%.</span>
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="pb-12">
        <Link
          href="/estimate"
          className="block w-full bg-primary text-white font-semibold rounded-xl py-4 text-base text-center hover:bg-primary/90 transition-colors"
        >
          Start free estimate →
        </Link>
        <p className="text-center text-xs text-muted mt-3">
          No account · No payment upfront · Takes ~10 minutes
        </p>
      </div>
    </div>
  )
}
