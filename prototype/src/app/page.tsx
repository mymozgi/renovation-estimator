import Link from 'next/link'
import { FileText, Hammer, MapPin, ShieldOff } from 'lucide-react'

const FEATURES = [
  { icon: MapPin,     label: 'Local price ranges' },
  { icon: Hammer,     label: 'Labor included'     },
  { icon: FileText,   label: 'PDF report'         },
  { icon: ShieldOff,  label: 'No account needed'  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg max-w-md mx-auto px-5">
      <div className="flex-1 flex flex-col justify-center py-16">
        <h1 className="font-serif font-bold text-fg text-4xl leading-tight mb-4">
          Fast renovation estimates.
        </h1>
        <p className="text-muted text-base leading-relaxed mb-10">
          Get a realistic renovation budget based on room size, finish quality, and regional Polish pricing.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2">
              <Icon size={20} className="text-primary" />
              <span className="text-fg text-sm font-medium text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-12">
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
