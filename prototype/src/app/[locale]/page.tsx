import Link from 'next/link'
import { existsSync } from 'fs'
import { join } from 'path'
import { ArrowRight, CheckCircle2, Shield, Clock, Home, TrendingUp, X } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { HeroSlider } from '@/components/HeroSlider'
import { articles } from '@/content/articles'
import { CLUSTER_LABELS } from '@/content/clusters'
import { ArticleCard } from '@/components/ArticleCard'

function CalcPreviewImage() {
  const hasImage = existsSync(join(process.cwd(), 'public', 'calculator-preview.jpg'))
  if (hasImage) {
    return (
      <img
        src="/calculator-preview.jpg"
        alt="Przykładowy raport Remonta"
        className="w-full rounded-2xl object-cover aspect-[4/3] border border-border"
      />
    )
  }
  return (
    <div className="aspect-[4/3] rounded-2xl bg-bg border border-border flex flex-col items-center justify-center gap-3 text-muted">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
        <rect x="4" y="4" width="40" height="40" rx="8" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="20" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 36l10-10 6 6 8-10 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-sm font-medium opacity-30">Zdjęcie — wkrótce</span>
    </div>
  )
}

type Props = { params: Promise<{ locale: string }> }

export default async function LandingPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const localeArticles = (articles[locale] ?? articles['pl']).slice(0, 3)

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-surface py-14 sm:py-24 text-center px-4 sm:px-6">
        <h1 className="font-bold text-fg text-[28px] sm:text-5xl leading-tight sm:leading-[56px] tracking-[-0.5px] sm:tracking-[-0.96px] mb-4 max-w-2xl mx-auto">
          {t('heroTitle')}
        </h1>
        <p className="text-muted text-base sm:text-lg leading-7 mb-7 max-w-lg mx-auto">
          {t('heroSubtitle')}
        </p>
        <Link
          href={`/${locale}/kalkulator`}
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
        >
          {t('heroCta')}
        </Link>

        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {[
            { icon: Shield,       label: t('badgeNoReg')  },
            { icon: Clock,        label: t('badgeTime')   },
            { icon: CheckCircle2, label: t('badgePrices') },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-sm text-muted font-medium">
              <Icon size={14} className="text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Hero image carousel ───────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 py-8">
        <HeroSlider />
      </section>

      {/* ── Jak to działa? ────────────────────────────────────────── */}
      <section id="jak-to-dziala" className="bg-[#f6f3f2] py-14 sm:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-bold text-fg text-3xl sm:text-5xl leading-tight sm:leading-[56px] tracking-[-0.5px] sm:tracking-[-0.96px] text-center max-w-[600px]">{t('howItWorksTitle')}</h2>
            <p className="text-[#414943] text-base leading-6 text-center max-w-[480px]">{t('howItWorksSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { icon: '/icons/edit.svg',             title: t('step1Title'), desc: t('step1Desc') },
              { icon: '/icons/workspace_premium.svg', title: t('step2Title'), desc: t('step2Desc') },
              { icon: '/icons/description.svg',       title: t('step3Title'), desc: t('step3Desc') },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#fcf9f8] rounded-[12px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-center pt-8 px-8 pb-14">
                <div className="w-16 h-16 rounded-full bg-[#b9efcf] flex items-center justify-center mb-6 shrink-0">
                  <img src={icon} alt="" className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-fg text-2xl leading-8 text-center mb-3 w-full">{title}</h3>
                <p className="text-[#414943] text-base leading-6 text-center px-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benchmark: Wykonawca vs Remonta ──────────────────────── */}
      <section className="bg-surface py-14 sm:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col items-center gap-4 mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary bg-primary/10 px-3 py-1 rounded-full">
              {t('benchmarkBadge')}
            </span>
            <h2 className="font-semibold text-fg text-2xl sm:text-[32px] leading-tight sm:leading-10 tracking-[-0.32px] text-center max-w-[600px]">
              {t('benchmarkTitle')}
            </h2>
            <p className="text-base text-[#414943] leading-6 max-w-[520px] text-center">
              {t('benchmarkSubtitle')}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr>
                  <th className="p-4 sm:p-5 text-left text-sm font-medium text-muted bg-bg border-b border-border w-[36%]" />
                  <th className="p-4 sm:p-5 text-center text-sm font-semibold text-fg bg-bg border-b border-border w-[32%]">
                    {t('benchmarkCol1')}
                  </th>
                  <th className="p-4 sm:p-5 text-center text-sm font-semibold text-white bg-primary border-b border-primary w-[32%]">
                    {t('benchmarkCol2')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {([
                  ['benchmarkR1Label', 'benchmarkR1C1', 'benchmarkR1C2'],
                  ['benchmarkR2Label', 'benchmarkR2C1', 'benchmarkR2C2'],
                  ['benchmarkR3Label', 'benchmarkR3C1', 'benchmarkR3C2'],
                  ['benchmarkR4Label', 'benchmarkR4C1', 'benchmarkR4C2'],
                  ['benchmarkR5Label', 'benchmarkR5C1', 'benchmarkR5C2'],
                ] as const).map(([labelKey, c1Key, c2Key], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface/60'}>
                    <td className="p-4 sm:p-5 text-sm font-medium text-fg border-b border-border">
                      {t(labelKey)}
                    </td>
                    <td className="p-4 sm:p-5 border-b border-border">
                      <span className="flex items-center gap-2 text-sm text-muted">
                        <X size={14} className="text-red-400 shrink-0" />
                        {t(c1Key)}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 border-b border-primary/20 bg-primary/5">
                      <span className="flex items-center gap-2 text-sm text-primary font-medium">
                        <CheckCircle2 size={14} className="shrink-0" />
                        {t(c2Key)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${locale}/kalkulator`}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
            >
              {t('benchmarkCta')} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Dla kogo? ─────────────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 py-12 sm:py-24">
        <div className="flex flex-col gap-16 items-center">
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="font-semibold text-fg text-2xl sm:text-[32px] leading-tight sm:leading-10 tracking-[-0.32px]">{t('forWhomTitle')}</h2>
            <p className="text-base text-[#414943] leading-6 max-w-[480px]">{t('forWhomSubtitle')}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 w-full">
            {[
              { Icon: Home,       title: t('forWhom1Title'), desc: t('forWhom1Desc') },
              { Icon: TrendingUp, title: t('forWhom2Title'), desc: t('forWhom2Desc') },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-1 gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-[#b9efcf] flex items-center justify-center shrink-0">
                  <Icon size={32} className="text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold text-fg text-2xl leading-8">{title}</h3>
                  <p className="text-[#414943] text-base leading-6">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wypróbuj kalkulator ───────────────────────────────────── */}
      <section className="bg-surface py-14 sm:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:pl-6 lg:pl-10">
              <h2 className="font-bold text-fg text-2xl sm:text-[32px] leading-tight sm:leading-10 tracking-[-0.32px] mb-3">{t('tryTitle')}</h2>
              <p className="text-muted text-base leading-6 mb-5">{t('tryDesc')}</p>
              <ul className="flex flex-col gap-2 mb-6">
                {[t('tryFeature1'), t('tryFeature2'), t('tryFeature3')].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base text-muted">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/kalkulator`}
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
              >
                {t('tryCta')}
              </Link>
            </div>

            <CalcPreviewImage />
          </div>
        </div>
      </section>

      {/* ── Poradniki remontowe ───────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 py-12 sm:py-24">
        <div className="flex items-start justify-between gap-4 mb-12 flex-wrap">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-fg text-2xl sm:text-[32px] sm:leading-10 tracking-[-0.32px]">{t('articlesTitle')}</h2>
            <p className="text-base text-[#414943] leading-6">{t('articlesSubtitle')}</p>
          </div>
          <Link href={`/${locale}/articles`} className="text-base text-primary font-normal hover:underline flex items-center gap-1 shrink-0 mt-1">
            {t('articlesAll')} <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localeArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              clusterLabel={CLUSTER_LABELS[article.cluster] ?? article.cluster}
              readMoreLabel={t('articlesReadMore')}
            />
          ))}
        </div>
      </section>

      {/* ── CTA dark green ────────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-10 py-6 mb-10">
        <div className="bg-[#37684f] rounded-[24px] px-6 sm:px-8 py-14 sm:py-24 text-center text-white">
          <h2 className="font-bold text-3xl sm:text-5xl leading-tight sm:leading-[56px] tracking-[-0.5px] sm:tracking-[-0.96px] mb-3">{t('ctaTitle')}</h2>
          <p className="text-white/80 text-base leading-6 mb-7">{t('ctaSubtitle')}</p>
          <Link
            href={`/${locale}/kalkulator`}
            className="inline-flex items-center gap-2 bg-green-100 text-fg px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-green-100/90 transition-colors"
          >
            {t('ctaCta')}
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
