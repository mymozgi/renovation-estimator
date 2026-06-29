import Link from 'next/link'

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-bold text-fg text-base mb-2">Remontowo</div>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              Bezpłatny kalkulator kosztów remontu oparty na danych z polskiego rynku budowlanego. Kosztorys gotowy w 5 minut — bez rejestracji.
            </p>
          </div>

          {/* Informacje */}
          <div>
            <div className="text-xs font-semibold text-fg uppercase tracking-wider mb-3">Informacje</div>
            <div className="flex flex-col gap-2">
              <Link href="/pl/o-nas" className="text-sm text-muted hover:text-fg transition-colors">O nas</Link>
              <Link href="/pl/regulamin" className="text-sm text-muted hover:text-fg transition-colors">Regulamin</Link>
            </div>
          </div>

          {/* Narzędzia */}
          <div>
            <div className="text-xs font-semibold text-fg uppercase tracking-wider mb-3">Narzędzia</div>
            <div className="flex flex-col gap-2">
              <Link href="/pl/kalkulator" className="text-sm text-muted hover:text-fg transition-colors">Kalkulator remontu</Link>
              <Link href="/pl/articles" className="text-sm text-muted hover:text-fg transition-colors">Poradniki</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted">© {year} Remontowo. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-4">
            <Link href="/pl/regulamin" className="text-xs text-muted hover:text-fg transition-colors">Regulamin</Link>
            <Link href="/pl/o-nas" className="text-xs text-muted hover:text-fg transition-colors">O nas</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
