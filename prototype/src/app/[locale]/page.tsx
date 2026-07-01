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
      <section className="bg-surface pt-14 pb-10 text-center px-6">
        <h1 className="font-bold text-fg text-4xl md:text-5xl leading-tight mb-4 max-w-xl mx-auto">
          {t('heroTitle')}
        </h1>
        <p className="text-muted text-base leading-relaxed mb-7 max-w-lg mx-auto">
          {t('heroSubtitle')}
        </p>
        <Link
          href={`/${locale}/kalkulator`}
          className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          {t('heroCta')}
        </Link>

        <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
          {[
            { icon: Shield,       label: t('badgeNoReg')  },
            { icon: Clock,        label: t('badgeTime')   },
            { icon: CheckCircle2, label: t('badgePrices') },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-muted font-medium">
              <Icon size={13} className="text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Hero image carousel ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <HeroSlider />
      </section>

      {/* ── Jak to działa? ────────────────────────────────────────── */}
      <section id="jak-to-dziala" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="font-bold text-fg text-3xl text-center mb-2">{t('howItWorksTitle')}</h2>
        <p className="text-muted text-sm text-center mb-12">{t('howItWorksSubtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: Pencil,   title: t('step1Title'), desc: t('step1Desc') },
            { Icon: Layers,   title: t('step2Title'), desc: t('step2Desc') },
            { Icon: FileText, title: t('step3Title'), desc: t('step3Desc') },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#C8E6C9] flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-fg text-base mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dla kogo? ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-bold text-fg text-3xl text-center mb-10">{t('forWhomTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { Icon: Home,       title: t('forWhom1Title'), desc: t('forWhom1Desc') },
            { Icon: TrendingUp, title: t('forWhom2Title'), desc: t('forWhom2Desc') },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex gap-4 bg-surface border border-border rounded-2xl p-6">
              <div className="w-10 h-10 rounded-full bg-[#C8E6C9] flex items-center justify-center shrink-0">
                <Icon size={18} className="text-primary" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-semibold text-fg text-sm mb-1">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wypróbuj kalkulator ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-bg border border-border rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-bold text-fg text-2xl mb-3">{t('tryTitle')}</h2>
            <p className="text-muted text-sm leading-relaxed mb-5">{t('tryDesc')}</p>
            <ul className="flex flex-col gap-2 mb-6">
              {[t('tryFeature1'), t('tryFeature2'), t('tryFeature3')].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/kalkulator`}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
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
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-fg text-2xl">{t('articlesTitle')}</h2>
          <Link href={`/${locale}/articles`} className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            {t('articlesAll')} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localeArticles.map((article) => {
            const tagClass = CLUSTER_COLORS[article.cluster] ?? 'bg-primary-fixed text-primary'
            return (
              <Link key={article.slug} href={`/${locale}/articles/${article.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden bg-surface border border-border hover:shadow-md transition-shadow">
                <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className={`absolute top-3 left-3 ${tagClass} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide`}>
                    {CLUSTER_LABELS[article.cluster] ?? article.cluster}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-[10px] text-muted">{article.publishedAt}</p>
                  <h3 className="font-semibold text-fg text-sm leading-snug line-clamp-2">{article.title}</h3>
                  <p className="text-muted text-xs leading-relaxed line-clamp-2">{article.description}</p>
                  <div className="flex items-center gap-1 text-primary text-xs font-medium mt-1">
                    {t('articlesReadMore')} <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── CTA dark green ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-6 mb-10">
        <div className="bg-primary rounded-2xl px-8 py-12 text-center text-white">
          <h2 className="font-bold text-3xl mb-3">{t('ctaTitle')}</h2>
          <p className="text-white/70 text-sm mb-7">{t('ctaSubtitle')}</p>
          <Link
            href={`/${locale}/kalkulator`}
            className="inline-flex items-center gap-2 bg-white text-primary px-7 py-3 rounded-full font-medium text-sm hover:bg-white/90 transition-colors"
          >
            {t('ctaCta')}
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
