import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Info, CheckCircle2, ArrowRight, Clock, FileText, MapPin, ShieldOff, Hammer } from 'lucide-react'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { FAQAccordion } from '@/components/FAQAccordion'
import { articles } from '@/content/articles'

// ── Image placeholder ─────────────────────────────────────────────────────────
function ImgPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`bg-border/40 rounded-2xl flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-border/60 flex items-center justify-center">
        <span className="text-muted text-lg">🖼</span>
      </div>
      <span className="text-xs text-muted">{label}</span>
    </div>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`max-w-2xl mx-auto px-5 py-12 ${className}`}>
      {children}
    </section>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif font-bold text-fg text-2xl mb-6">{children}</h2>
}

// ── Main page ─────────────────────────────────────────────────────────────────
type Props = { params: Promise<{ locale: string }> }

export default async function LandingPage({ params }: Props) {
  const { locale } = await params
  const t   = await getTranslations()
  const faqItems = (t.raw('faq.items') as { q: string; a: string }[])
  const whatItems = (t.raw('whatYouGet.items') as string[])
  const localeArticles = (articles[locale] ?? articles['pl']).slice(0, 3)
  const year = new Date().getFullYear()

  const CLUSTER_COLORS: Record<string, string> = {
    budget: 'bg-green-100 text-green-800',
    contractors: 'bg-blue-100 text-blue-800',
    rooms: 'bg-amber-100 text-amber-800',
  }

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-5 pt-10 pb-4">
        <ImgPlaceholder label="Renovation hero photo" className="w-full h-52 mb-8" />
        <h1 className="font-serif font-bold text-fg text-4xl md:text-5xl leading-tight mb-4">
          {t('landing.title')}
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
          {t('landing.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link href={`/${locale}/estimate`}
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-xl py-4 px-6 text-base hover:bg-primary/90 transition-colors">
            {t('landing.cta')} <ArrowRight size={16} />
          </Link>
          <Link href="#how-it-works"
            className="flex items-center justify-center gap-2 border border-border rounded-xl py-4 px-6 text-sm text-fg font-medium hover:border-primary/40 transition-colors">
            {t('nav.howItWorks')}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <Clock size={13} />
          <span>{t('landing.subtext')}</span>
        </div>
      </section>

      {/* ── Feature pills ─────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {(['precision', 'marketData', 'time', 'noAccount'] as const).map((badge) => (
            <span key={badge} className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted font-medium">
              {t(`landing.badges.${badge}`)}
            </span>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <Section id="how-it-works">
        <SectionTitle>{t('howItWorks.title')}</SectionTitle>
        <ImgPlaceholder label="Wizard screenshot" className="w-full h-44 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="bg-surface border border-border rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mb-3">
                {n}
              </div>
              <div className="font-semibold text-fg text-sm mb-1">{t(`howItWorks.step${n}Title`)}</div>
              <div className="text-muted text-xs leading-relaxed">{t(`howItWorks.step${n}Desc`)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── For whom ──────────────────────────────────────────────────────── */}
      <Section className="bg-surface rounded-3xl">
        <SectionTitle>{t('forWhom.title')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="border border-border rounded-2xl overflow-hidden">
              <ImgPlaceholder label={t(`forWhom.card${n}Title`)} className="h-32 rounded-none rounded-t-2xl" />
              <div className="p-4">
                <div className="font-semibold text-fg text-sm mb-1">{t(`forWhom.card${n}Title`)}</div>
                <div className="text-muted text-xs leading-relaxed">{t(`forWhom.card${n}Desc`)}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── What you get ──────────────────────────────────────────────────── */}
      <Section>
        <SectionTitle>{t('whatYouGet.title')}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {whatItems.map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-3 bg-surface border border-border rounded-xl px-4 py-3">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-fg">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Pricing transparency ──────────────────────────────────────────── */}
      <Section className="bg-primary/5 rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <SectionTitle>{t('landing.howWeEstimate')}</SectionTitle>
          <Link href={`/${locale}/methodology`} className="flex items-center gap-1 text-xs text-primary hover:underline shrink-0">
            <Info size={12} /> {t('landing.fullMethodology')}
          </Link>
        </div>
        <div className="flex items-center gap-1.5 text-xs mb-5 flex-wrap">
          {(['materials', 'labor', 'preparation', 'regional'] as const).map((part, i, arr) => (
            <span key={part} className="flex items-center gap-1.5">
              <span className="bg-primary/10 text-primary rounded-md px-2.5 py-1 font-semibold">{t(`landing.formula.${part}`)}</span>
              {i < arr.length - 1 && <span className="text-muted font-bold">+</span>}
            </span>
          ))}
        </div>
        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden mb-4">
          {[
            { item: 'Wall painting', city: 'Warsaw',  rate: '25–40 PLN/m²' },
            { item: 'Laminate',      city: 'Kraków',  rate: '22–38 PLN/m²' },
            { item: 'Tile install',  city: 'Gdańsk',  rate: '55–95 PLN/m²' },
            { item: 'Full wall prep',city: 'Wrocław', rate: '+32–52 PLN/m²' },
          ].map(({ item, city, rate }) => (
            <div key={item} className="flex items-center justify-between px-4 py-3 bg-surface">
              <span className="text-xs text-fg">{item} <span className="text-muted">· {city}</span></span>
              <span className="text-xs font-bold text-price">{rate}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted leading-relaxed">{t('landing.precisionNote', { year })}</p>
      </Section>

      {/* ── Mid CTA ───────────────────────────────────────────────────────── */}
      <Section>
        <div className="bg-primary rounded-2xl px-6 py-8 text-center text-white">
          <h2 className="font-serif font-bold text-2xl mb-2">{t('finalCta.title')}</h2>
          <p className="text-white/80 text-sm mb-5">{t('finalCta.subtitle')}</p>
          <Link href={`/${locale}/estimate`}
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold rounded-xl py-3 px-6 hover:bg-white/90 transition-colors">
            {t('landing.cta')} <ArrowRight size={15} />
          </Link>
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <Section>
        <SectionTitle>{t('faq.title')}</SectionTitle>
        <FAQAccordion items={faqItems} />
      </Section>

      {/* ── Articles preview ──────────────────────────────────────────────── */}
      <Section className="bg-surface rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>{t('articles.title')}</SectionTitle>
          <Link href={`/${locale}/articles`} className="text-sm text-primary font-medium hover:underline shrink-0">
            {t('articles.readMore')}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {localeArticles.map((article) => (
            <Link key={article.slug} href={`/${locale}/articles/${article.slug}`}
              className="bg-bg border border-border rounded-2xl p-4 hover:border-primary/40 transition-colors group block">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 ${CLUSTER_COLORS[article.cluster] ?? 'bg-gray-100 text-gray-700'}`}>
                {t(`articles.clusters.${article.cluster}`)}
              </span>
              <h3 className="font-semibold text-fg text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
              <p className="text-muted text-xs leading-relaxed line-clamp-2">{article.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl">
          <ImgPlaceholder label="Finished apartment photo" className="absolute inset-0 w-full h-full rounded-2xl opacity-30" />
          <div className="relative z-10 px-6 py-10 text-center">
            <h2 className="font-serif font-bold text-fg text-3xl mb-2">{t('finalCta.title')}</h2>
            <p className="text-muted text-sm mb-6">{t('finalCta.subtitle')}</p>
            <Link href={`/${locale}/estimate`}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold rounded-xl py-4 px-8 text-base hover:bg-primary/90 transition-colors">
              {t('landing.cta')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      <LandingFooter />
    </div>
  )
}
