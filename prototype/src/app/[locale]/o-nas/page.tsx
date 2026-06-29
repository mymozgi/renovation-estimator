import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { CheckCircle2, BarChart2, MapPin, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'O nas — Remontowo | Kalkulator kosztów remontu w Polsce',
  description: 'Remontowo to bezpłatne narzędzie do szacowania kosztów remontu w Polsce. Poznaj naszą misję, dane i metodologię wyceny — transparentnie i bez ukrytych marż.',
  keywords: 'kalkulator remontu Polska, kosztorys remontu online, ile kosztuje remont 2026, wycena remontu Warszawa',
  openGraph: {
    title: 'O nas — Remontowo | Kalkulator kosztów remontu',
    description: 'Bezpłatne narzędzie do szacowania kosztów remontu oparte na aktualnych danych z polskiego rynku budowlanego.',
    type: 'website',
  },
}

type Props = { params: Promise<{ locale: string }> }

const STATS = [
  { value: '6',       label: 'miast w Polsce',              Icon: MapPin     },
  { value: '3',       label: 'standardy wykończenia',       Icon: BarChart2  },
  { value: '2 200+',  label: 'PLN/m² baza cenowa',          Icon: CheckCircle2 },
  { value: 'Q1 2026', label: 'ostatnia aktualizacja cen',   Icon: Users      },
]

const VALUES = [
  {
    title: 'Transparentność',
    desc: 'Pokazujemy z czego składa się kosztorys: materiały, robocizna, przygotowanie. Żadnych „czarnych skrzynek" — każda pozycja jest uzasadniona.',
  },
  {
    title: 'Lokalne dane',
    desc: 'Ceny są kalibrowane regionalnie. Remont w Warszawie kosztuje inaczej niż w Łodzi — nasze mnożniki odzwierciedlają realia rynku, nie średnie krajowe.',
  },
  {
    title: 'Bez rejestracji i reklam',
    desc: 'Remontowo jest bezpłatne i nie wymaga zakładania konta. Nie sprzedajemy danych ani nie zarabiamy na reklamach targetowanych po Twoich planach remontowych.',
  },
  {
    title: 'Aktualizacje co kwartał',
    desc: 'Ceny materiałów budowlanych i stawki robocizny zmieniają się dynamicznie. Aktualizujemy bazę co kwartał, aby kosztorysy oddawały realia bieżącego rynku.',
  },
]

export default async function AboutPage({ params }: Props) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      {/* Hero */}
      <section className="bg-surface border-b border-border py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-primary-fixed text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            O nas
          </span>
          <h1 className="font-bold text-fg text-4xl md:text-5xl leading-tight mb-5">
            Remontowo — wycena remontu bez niespodzianek
          </h1>
          <p className="text-muted text-base leading-relaxed mb-8">
            Stworzyliśmy Remontowo, bo sami doświadczyliśmy, jak bolesny potrafi być remont bez planu finansowego.
            Naszą misją jest dać każdemu właścicielowi mieszkania rzetelne dane — zanim wyda pierwsze złoty na ekipę i materiały.
          </p>
          <Link
            href={`/${locale}/kalkulator`}
            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Wypróbuj kalkulator bezpłatnie
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label, Icon }) => (
            <div key={label} className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-primary" strokeWidth={1.8} />
              </div>
              <div className="font-bold text-fg text-2xl mb-1">{value}</div>
              <div className="text-muted text-xs leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-bold text-fg text-2xl mb-4">Skąd biorą się nasze ceny?</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Bazę cenową budujemy na podstawie rzeczywistych ofert wykonawców z całej Polski, cen materiałów w sieciach budowlanych
              (Castorama, Leroy Merlin, OBI, hurtownie regionalne) oraz publicznie dostępnych danych z GUS i SEKOCENBUD.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Każde miasto ma swój mnożnik regionalny, uwzględniający lokalne stawki robocizny, dostępność wykonawców
              i koszty logistyczne materiałów. Warszawa, Kraków i Trójmiasto — drożej. Łódź i mniejsze ośrodki — taniej.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Aktualizujemy bazę kwartalnie. Ostatnia aktualizacja: <strong className="text-fg">Q1 2026</strong>.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-fg text-2xl mb-4">Metodologia wyceny</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Kalkulator oblicza trzy składniki kosztorysu:
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Materiały (55%)',     desc: 'Farby, płytki, panele, kleje, grunty — wg wybranego standardu i m² pomieszczenia.' },
                { label: 'Robocizna (35%)',     desc: 'Stawki ekip wg branży i miasta. Płytkarz, malarz, elektryk — każda pozycja osobno.' },
                { label: 'Przygotowanie (10%)', desc: 'Demontaż, wylewki, grunty, transport odpadów — pomijany przez większość kalkulatorów.' },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-3">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-fg text-sm">{label}</div>
                    <div className="text-muted text-xs leading-relaxed">{desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-bold text-fg text-2xl text-center mb-8">Nasze zasady</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map(({ title, desc }) => (
            <div key={title} className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-fg text-base mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-6 mb-10">
        <div className="bg-primary rounded-2xl px-8 py-12 text-center text-white">
          <h2 className="font-bold text-3xl mb-3">Zaplanuj remont z rzetelnym kosztorysem</h2>
          <p className="text-white/70 text-sm mb-7 max-w-md mx-auto">
            Bezpłatnie, bez rejestracji. Kosztorys gotowy w 5 minut — zanim zadzwonisz do pierwszego wykonawcy.
          </p>
          <Link
            href={`/${locale}/kalkulator`}
            className="inline-flex items-center gap-2 bg-white text-primary px-7 py-3 rounded-full font-medium text-sm hover:bg-white/90 transition-colors"
          >
            Oblicz kosztorys remontu
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
