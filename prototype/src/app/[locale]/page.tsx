import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Shield, Clock, Pencil, Layers, FileText, Home, TrendingUp } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { HeroSlider } from '@/components/HeroSlider'
import { articles } from '@/content/articles'
import { CLUSTER_LABELS, CLUSTER_COLORS } from '@/content/clusters'

type Props = { params: Promise<{ locale: string }> }

export default async function LandingPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const localeArticles = (articles[locale] ?? articles['pl']).slice(0, 3)

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-surface py-24 text-center px-6">
        <h1 className="font-bold text-fg text-5xl leading-[56px] tracking-[-0.96px] mb-4 max-w-2xl mx-auto">
          {t('heroTitle')}
        </h1>
        <p className="text-muted text-lg leading-7 mb-7 max-w-lg mx-auto">
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
      <section className="max-w-[1140px] mx-auto px-10 py-8">
        <HeroSlider />
      </section>

      {/* ── Jak to działa? ────────────────────────────────────────── */}
      <section id="jak-to-dziala" className="max-w-[1140px] mx-auto px-10 py-24">
        <h2 className="font-bold text-fg text-[32px] leading-10 tracking-[-0.32px] text-center mb-2">{t('howItWorksTitle')}</h2>
        <p className="text-muted text-base text-center mb-12">{t('howItWorksSubtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: Pencil,   title: t('step1Title'), desc: t('step1Desc') },
            { Icon: Layers,   title: t('step2Title'), desc: t('step2Desc') },
            { Icon: FileText, title: t('step3Title'), desc: t('step3Desc') },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#b9efcf] flex items-center justify-center mb-4">
                <Icon size={24} className="text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-fg text-2xl leading-8 mb-2">{title}</h3>
              <p className="text-muted text-base leading-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dla kogo? ─────────────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-10 py-24">
        <h2 className="font-bold text-fg text-[32px] leading-10 tracking-[-0.32px] text-center mb-10">{t('forWhomTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { Icon: Home,       title: t('forWhom1Title'), desc: t('forWhom1Desc') },
            { Icon: TrendingUp, title: t('forWhom2Title'), desc: t('forWhom2Desc') },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex gap-4 bg-surface border border-border rounded-2xl p-6">
              <div className="w-16 h-16 rounded-full bg-[#b9efcf] flex items-center justify-center shrink-0">
                <Icon size={24} className="text-primary" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-semibold text-fg text-2xl leading-8 mb-2">{title}</h3>
                <p className="text-muted text-base leading-6">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wypróbuj kalkulator ───────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-10 py-24">
        <div className="bg-bg border border-border rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-bold text-fg text-[32px] leading-10 tracking-[-0.32px] mb-3">{t('tryTitle')}</h2>
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

          <div className="bg-surface rounded-xl border border-border p-6 flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block">{t('tryAreaLabel')}</label>
              <div className="flex items-center justify-between border border-border rounded-lg px-3 py-2">
                <span className="text-sm text-muted">m²</span>
                <span className="font-semibold text-fg">65m²</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block">{t('tryFinishLabel')}</label>
              <div className="flex gap-2">
                {[t('tryStandard1'), t('tryStandard2'), t('tryStandard3')].map((s, i) => (
                  <button key={s}
                    className={`flex-1 text-xs py-2 px-1 rounded-lg border font-medium transition-colors ${i === 0 ? 'bg-primary text-white border-primary' : 'border-border text-fg hover:border-primary/40'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Poradniki remontowe ───────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-10 py-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-fg text-[32px] leading-10 tracking-[-0.32px]">{t('articlesTitle')}</h2>
          <Link href={`/${locale}/articles`} className="text-base text-primary font-medium hover:underline flex items-center gap-1">
            {t('articlesAll')} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {localeArticles.map((article) => {
            const tagClass = CLUSTER_COLORS[article.cluster] ?? 'bg-primary-fixed text-fg'
            return (
              <Link key={article.slug} href={`/${locale}/articles/${article.slug}`}
                className="group flex flex-col rounded-[12px] overflow-hidden bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                <div className="relative aspect-[364/205] w-full overflow-hidden shrink-0">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`${tagClass} font-medium text-xs px-3 py-1 rounded-sm tracking-[0.06em]`}>
                      {CLUSTER_LABELS[article.cluster] ?? article.cluster}
                    </span>
                    <span className="text-sm text-[#717973]">{article.publishedAt}</span>
                  </div>
                  <h3 className="font-semibold text-fg text-2xl leading-8 line-clamp-2">{article.title}</h3>
                  <p className="text-[#414943] text-base leading-6 line-clamp-2">{article.description}</p>
                  <div className="flex items-center gap-1 text-primary text-base mt-1">
                    {t('articlesReadMore')} <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── CTA dark green ────────────────────────────────────────── */}
      <section className="max-w-[1140px] mx-auto px-10 py-6 mb-10">
        <div className="bg-[#37684f] rounded-[24px] px-8 py-24 text-center text-white">
          <h2 className="font-bold text-5xl leading-[56px] tracking-[-0.96px] mb-3">{t('ctaTitle')}</h2>
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
