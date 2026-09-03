import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { CITIES, CITY_MAP } from '@/content/cities'
import { SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string; city: string }> }

export async function generateStaticParams() {
  const locales = ['pl', 'en', 'ru', 'uk']
  return locales.flatMap(locale => CITIES.map(c => ({ locale, city: c.slug })))
}

export async function generateMetadata({ params }: Props) {
  const { locale, city } = await params
  const data = CITY_MAP[city]
  if (!data) return {}
  const c = data.content[locale] ?? data.content['pl']
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `/${locale}/remont/${city}`,
      languages: Object.fromEntries(
        ['pl', 'en', 'ru', 'uk'].map(l => [l, `/${l}/remont/${city}`])
      ),
    },
  }
}

function fmt(n: number) {
  return n.toLocaleString('pl-PL')
}

const TIER_LABELS: Record<string, Record<string, string>> = {
  pl: { economy: 'Ekonomiczny', standard: 'Optymalny', premium: 'Premium' },
  en: { economy: 'Economy', standard: 'Standard', premium: 'Premium' },
  ru: { economy: 'Эконом', standard: 'Оптимальный', premium: 'Премиум' },
  uk: { economy: 'Економ', standard: 'Оптимальний', premium: 'Преміум' },
}

const INCLUDED_LABELS: Record<string, string[]> = {
  pl: [
    'Przygotowanie ścian (gruntowanie, gładź, malowanie)',
    'Podłogi (ułożenie paneli, gresu lub parkietu)',
    'Sufity (malowanie lub montaż sufitu podwieszanego)',
    'Stolarka drzwiowa wewnętrzna',
    'Listwy przypodłogowe i wykończenia',
  ],
  en: [
    'Wall preparation (priming, skim coat, painting)',
    'Flooring (laminate, tiles or hardwood installation)',
    'Ceilings (painting or suspended ceiling)',
    'Interior doors',
    'Skirting boards and finishing',
  ],
  ru: [
    'Подготовка стен (грунтование, шпатлёвка, покраска)',
    'Полы (укладка ламината, плитки или паркета)',
    'Потолки (покраска или натяжной потолок)',
    'Межкомнатные двери',
    'Плинтусы и отделочные элементы',
  ],
  uk: [
    'Підготовка стін (ґрунтування, шпаклівка, фарбування)',
    'Підлоги (укладання ламінату, плитки або паркету)',
    'Стелі (фарбування або підвісна стеля)',
    'Міжкімнатні двері',
    'Плінтуси та оздоблювальні елементи',
  ],
}

const NOT_INCLUDED_LABELS: Record<string, string[]> = {
  pl: [
    'Instalacja elektryczna i hydrauliczna',
    'Meble i sprzęt AGD',
    'Wyburzenia i zmiany układu pomieszczeń',
    'Remont łazienki i kuchni',
  ],
  en: [
    'Electrical and plumbing installation',
    'Furniture and appliances',
    'Demolition and room layout changes',
    'Bathroom and kitchen renovation',
  ],
  ru: [
    'Электрическая и сантехническая установка',
    'Мебель и бытовая техника',
    'Демонтаж и изменение планировки',
    'Ремонт ванной и кухни',
  ],
  uk: [
    'Електрична та сантехнічна установка',
    'Меблі та побутова техніка',
    'Демонтаж та зміна планування',
    'Ремонт ванної та кухні',
  ],
}

const UI_STRINGS: Record<string, Record<string, string>> = {
  pl: {
    badge: 'Ceny robocizny 2026',
    priceCardFor50: 'Mieszkanie 50 m²',
    perM2: 'PLN/m²',
    total: 'Łącznie',
    calcCta: 'Oblicz koszt swojego remontu',
    calcSubtext: 'Precyzyjny kosztorys dla Twojego mieszkania — bezpłatnie',
    includedTitle: 'Co wliczone w cenę?',
    notIncludedTitle: 'Co nie jest wliczone?',
    faqTitle: 'Często zadawane pytania',
    otherCitiesTitle: 'Ceny remontu w innych miastach',
    ctaTitle: 'Gotowy na remont?',
    ctaSubtitle: 'Oblicz koszt swojego projektu w 3 minuty',
    ctaBtn: 'Uruchom kalkulator',
    marketNoteLabel: 'Nota rynkowa',
  },
  en: {
    badge: 'Labor Prices 2026',
    priceCardFor50: '50 m² Apartment',
    perM2: 'PLN/m²',
    total: 'Total',
    calcCta: 'Calculate your renovation cost',
    calcSubtext: 'Precise estimate for your apartment — free',
    includedTitle: "What's included in the price?",
    notIncludedTitle: "What's not included?",
    faqTitle: 'Frequently Asked Questions',
    otherCitiesTitle: 'Renovation costs in other cities',
    ctaTitle: 'Ready to renovate?',
    ctaSubtitle: 'Calculate your project cost in 3 minutes',
    ctaBtn: 'Launch Calculator',
    marketNoteLabel: 'Market Note',
  },
  ru: {
    badge: 'Цены на работу 2026',
    priceCardFor50: 'Квартира 50 м²',
    perM2: 'PLN/м²',
    total: 'Итого',
    calcCta: 'Рассчитать стоимость ремонта',
    calcSubtext: 'Точная смета для вашей квартиры — бесплатно',
    includedTitle: 'Что входит в цену?',
    notIncludedTitle: 'Что не входит?',
    faqTitle: 'Часто задаваемые вопросы',
    otherCitiesTitle: 'Стоимость ремонта в других городах',
    ctaTitle: 'Готовы к ремонту?',
    ctaSubtitle: 'Рассчитайте стоимость проекта за 3 минуты',
    ctaBtn: 'Запустить калькулятор',
    marketNoteLabel: 'Замечание о рынке',
  },
  uk: {
    badge: 'Ціни на роботу 2026',
    priceCardFor50: 'Квартира 50 м²',
    perM2: 'PLN/м²',
    total: 'Разом',
    calcCta: 'Розрахувати вартість ремонту',
    calcSubtext: 'Точний кошторис для вашої квартири — безкоштовно',
    includedTitle: 'Що входить у ціну?',
    notIncludedTitle: 'Що не входить?',
    faqTitle: 'Часті запитання',
    otherCitiesTitle: 'Вартість ремонту в інших містах',
    ctaTitle: 'Готові до ремонту?',
    ctaSubtitle: 'Розрахуйте вартість проекту за 3 хвилини',
    ctaBtn: 'Запустити калькулятор',
    marketNoteLabel: 'Примітка про ринок',
  },
}

export default async function CityPage({ params }: Props) {
  const { locale, city } = await params
  const data = CITY_MAP[city]
  if (!data) return notFound()

  const c = data.content[locale] ?? data.content['pl']
  const ui = UI_STRINGS[locale] ?? UI_STRINGS['pl']
  const tiers = TIER_LABELS[locale] ?? TIER_LABELS['pl']
  const included = INCLUDED_LABELS[locale] ?? INCLUDED_LABELS['pl']
  const notIncluded = NOT_INCLUDED_LABELS[locale] ?? NOT_INCLUDED_LABELS['pl']

  const otherCities = CITIES.filter(c2 => c2.slug !== city)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Remonta', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: c.h1, item: `${SITE_URL}/${locale}/remont/${city}` },
    ],
  }

  const tileStyles = [
    { label: tiers.economy, range: data.ranges.economy, perM2: data.perM2.economy, highlight: false },
    { label: tiers.standard, range: data.ranges.standard, perM2: data.perM2.standard, highlight: true },
    { label: tiers.premium, range: data.ranges.premium, perM2: data.perM2.premium, highlight: false },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <LandingHeader />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-surface py-14 sm:py-20 text-center px-4 sm:px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
          {ui.badge}
        </span>
        <h1 className="font-bold text-fg text-[28px] sm:text-5xl leading-tight sm:leading-[56px] tracking-[-0.5px] sm:tracking-[-0.96px] mb-4 max-w-2xl mx-auto">
          {c.h1}
        </h1>
        <p className="text-muted text-base sm:text-lg leading-7 mb-8 max-w-xl mx-auto">
          {c.subtitle}
        </p>
        <Link
          href={`/${locale}/kalkulator`}
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
        >
          {ui.calcCta} <ArrowRight size={18} />
        </Link>
        <p className="text-xs text-muted mt-3">{ui.calcSubtext}</p>
      </section>

      {/* ── Price tiers ──────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {tileStyles.map(({ label, range, perM2, highlight }) => (
            <div
              key={label}
              className={`rounded-2xl p-6 border flex flex-col gap-3 ${
                highlight
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface border-border'
              }`}
            >
              <div className={`text-sm font-semibold uppercase tracking-wider ${highlight ? 'text-white/70' : 'text-muted'}`}>
                {label}
              </div>
              <div className={`text-3xl font-bold leading-none ${highlight ? 'text-white' : 'text-fg'}`}>
                {fmt(range.min)}–{fmt(range.max)} <span className="text-base font-semibold">PLN</span>
              </div>
              <div className={`text-sm ${highlight ? 'text-white/70' : 'text-muted'}`}>
                {ui.priceCardFor50}
              </div>
              <div className={`text-xs border-t pt-3 mt-1 ${highlight ? 'text-white/60 border-white/20' : 'text-muted border-border'}`}>
                {fmt(perM2.min)}–{fmt(perM2.max)} {ui.perM2}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Intro + Market note ──────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 pb-12 sm:pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-base text-[#414943] leading-7">{c.intro}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">{ui.marketNoteLabel}</div>
            <p className="text-sm text-amber-900 leading-6">{c.marketNote}</p>
          </div>
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────── */}
      <section className="bg-surface py-12 sm:py-16">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="font-semibold text-fg text-xl sm:text-2xl mb-5">{ui.includedTitle}</h2>
              <ul className="flex flex-col gap-3">
                {included.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#414943] leading-6">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-fg text-xl sm:text-2xl mb-5">{ui.notIncludedTitle}</h2>
              <ul className="flex flex-col gap-3">
                {notIncluded.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#414943] leading-6">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full border border-muted/40 flex items-center justify-center">
                      <span className="w-1.5 h-0.5 bg-muted rounded-full" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculator CTA banner ────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 py-12">
        <div className="bg-[#37684f] rounded-2xl px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-white font-bold text-xl sm:text-2xl mb-1">{ui.calcCta}</div>
            <div className="text-white/70 text-sm">{ui.calcSubtext}</div>
          </div>
          <Link
            href={`/${locale}/kalkulator`}
            className="shrink-0 inline-flex items-center gap-2 bg-green-100 text-fg px-7 py-3.5 rounded-[10px] font-semibold text-sm hover:bg-green-100/90 transition-colors"
          >
            {ui.ctaBtn} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 pb-12 sm:pb-16">
        <h2 className="font-semibold text-fg text-2xl sm:text-3xl mb-8">{ui.faqTitle}</h2>
        <div className="flex flex-col divide-y divide-border">
          {c.faq.map(({ q, a }) => (
            <details key={q} className="group py-5 cursor-pointer list-none">
              <summary className="flex items-start justify-between gap-4 font-semibold text-base text-fg select-none list-none">
                <span>{q}</span>
                <span className="mt-0.5 shrink-0 text-muted text-xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-[#414943] leading-6">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Other cities ─────────────────────────────────────── */}
      <section className="bg-surface py-12 sm:py-14">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10">
          <h2 className="font-semibold text-fg text-xl sm:text-2xl mb-6">{ui.otherCitiesTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {otherCities.map(oc => {
              const oc_c = oc.content[locale] ?? oc.content['pl']
              return (
                <Link
                  key={oc.slug}
                  href={`/${locale}/remont/${oc.slug}`}
                  className="rounded-xl border border-border bg-bg p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors flex flex-col gap-1"
                >
                  <div className="font-semibold text-sm text-fg">{oc.displayName}</div>
                  <div className="text-xs text-muted">{fmt(oc.ranges.standard.min)}–{fmt(oc.ranges.standard.max)} PLN</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Dark CTA ─────────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 py-6 mb-10">
        <div className="bg-[#37684f] rounded-[24px] px-6 sm:px-8 py-14 sm:py-20 text-center text-white">
          <h2 className="font-bold text-3xl sm:text-4xl leading-tight mb-3">{ui.ctaTitle}</h2>
          <p className="text-white/80 text-base leading-6 mb-7">{ui.ctaSubtitle}</p>
          <Link
            href={`/${locale}/kalkulator`}
            className="inline-flex items-center gap-2 bg-green-100 text-fg px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-green-100/90 transition-colors"
          >
            {ui.ctaBtn} <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
