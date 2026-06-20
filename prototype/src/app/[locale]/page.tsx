import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { type LucideIcon, ArrowRight, Clock, LayoutGrid, Layers, MapPin, FileDown, ShieldCheck } from 'lucide-react'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { FAQAccordion } from '@/components/FAQAccordion'
import { articles } from '@/content/articles'
import { CLUSTER_COLORS, CLUSTER_FALLBACK, CLUSTER_HERO, CLUSTER_HERO_FALLBACK } from '@/lib/clusterColors'
import { buttonVariants } from '@/components/Button'
import { HowItWorksSection } from '@/components/HowItWorksSection'

// ── For-whom card images ──────────────────────────────────────────────────────
const FORWHO_IMGS: Record<1 | 2 | 3, string> = {
  1: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop',
  2: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&auto=format&fit=crop',
  3: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop',
}

// ── Benefit icons (index matches whatYouGet.items order) ─────────────────────
const BENEFIT_ICONS: LucideIcon[] = [LayoutGrid, Layers, MapPin, FileDown, ShieldCheck]

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`max-w-[1464px] mx-auto px-8 py-12 ${className}`}>
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

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="max-w-[1464px] mx-auto px-8 pt-10 pb-4">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8">
          <Image
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80&auto=format&fit=crop"
            alt="Renovation"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="font-serif font-bold text-fg text-4xl md:text-5xl leading-tight mb-4">
          {t('landing.title')}
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
          {t('landing.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link href={`/${locale}/estimate`} className={buttonVariants({ variant: 'primary' })}>
            {t('landing.cta')} <ArrowRight size={16} />
          </Link>
          <Link href="#how-it-works" className={buttonVariants({ variant: 'secondary' })}>
            {t('nav.howItWorks')}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <Clock size={13} />
          <span>{t('landing.subtext')}</span>
        </div>
      </section>

      {/* ── Feature pills ─────────────────────────────────────────────────── */}
      <section className="max-w-[1464px] mx-auto px-8 py-4">
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
        <HowItWorksSection />
      </Section>

      {/* ── For whom ──────────────────────────────────────────────────────── */}
      <Section>
        <div className="bg-surface rounded-3xl p-8 sm:p-10">
          <SectionTitle>{t('forWhom.title')}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="border border-border rounded-2xl overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] w-full shrink-0">
                  <Image src={FORWHO_IMGS[n]} alt={t(`forWhom.card${n}Title`)} fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="font-semibold text-fg text-sm mb-1">{t(`forWhom.card${n}Title`)}</div>
                  <div className="text-muted text-xs leading-relaxed">{t(`forWhom.card${n}Desc`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── What you get ──────────────────────────────────────────────────── */}
      <Section>
        <SectionTitle>{t('whatYouGet.title')}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whatItems.map((item: string, i: number) => {
            const Icon: LucideIcon = BENEFIT_ICONS[i] ?? ShieldCheck
            return (
              <div key={i} className="flex flex-col gap-4 bg-surface border border-border rounded-2xl p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-primary" />
                </div>
                <p className="text-sm text-fg leading-relaxed">{item}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ── Mid CTA ───────────────────────────────────────────────────────── */}
      <Section>
        <div className="bg-primary rounded-2xl px-6 py-8 text-center text-white">
          <h2 className="font-serif font-bold text-2xl mb-2">{t('finalCta.title')}</h2>
          <p className="text-white/80 text-sm mb-5">{t('finalCta.subtitle')}</p>
          <Link href={`/${locale}/estimate`} className={buttonVariants({ variant: 'inverse' })}>
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
      <Section>
        <div className="bg-surface rounded-3xl p-8 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <SectionTitle>{t('articles.title')}</SectionTitle>
            <Link href={`/${locale}/articles`} className="text-sm text-primary font-medium hover:underline shrink-0">
              {t('articles.readMore')}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localeArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/articles/${article.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-primary/30"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-border shrink-0">
                  <Image
                    src={`https://images.unsplash.com/photo-${CLUSTER_HERO[article.cluster] ?? CLUSTER_HERO_FALLBACK}?w=800&q=80&auto=format&fit=crop`}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <span className={`self-start inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 ${CLUSTER_COLORS[article.cluster] ?? CLUSTER_FALLBACK}`}>
                    {t(`articles.clusters.${article.cluster}`)}
                  </span>
                  <h3 className="font-serif font-bold text-fg text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed line-clamp-3 flex-1">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover opacity-30"
          />
          <div className="relative z-10 px-6 py-10 text-center">
            <h2 className="font-serif font-bold text-fg text-3xl mb-2">{t('finalCta.title')}</h2>
            <p className="text-muted text-sm mb-6">{t('finalCta.subtitle')}</p>
            <Link href={`/${locale}/estimate`} className={buttonVariants({ variant: 'primary', className: 'px-8' })}>
              {t('landing.cta')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      <LandingFooter />
    </div>
  )
}
