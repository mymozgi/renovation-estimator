import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { CheckCircle2, BarChart2, MapPin, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'O nas — Remontowo | Kalkulator kosztów remontu w Polsce',
  description: 'Remontowo to bezpłatne narzędzie do szacowania kosztów remontu w Polsce.',
}

type Props = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'aboutPage' })

  const STATS = [
    { value: t('stat1Value'), label: t('stat1Label'), Icon: MapPin      },
    { value: t('stat2Value'), label: t('stat2Label'), Icon: BarChart2   },
    { value: t('stat3Value'), label: t('stat3Label'), Icon: CheckCircle2 },
    { value: t('stat4Value'), label: t('stat4Label'), Icon: Users        },
  ]

  const VALUES = [
    { title: t('value1Title'), desc: t('value1Desc') },
    { title: t('value2Title'), desc: t('value2Desc') },
    { title: t('value3Title'), desc: t('value3Desc') },
    { title: t('value4Title'), desc: t('value4Desc') },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      {/* Hero */}
      <section className="bg-surface border-b border-border py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-primary-fixed text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            {t('badge')}
          </span>
          <h1 className="font-bold text-fg text-4xl md:text-5xl leading-tight mb-5">
            {t('title')}
          </h1>
          <p className="text-muted text-base leading-relaxed mb-8">
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}/kalkulator`}
            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1440px] mx-auto px-10 py-12">
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
      <section className="max-w-[1440px] mx-auto px-10 py-6">
        <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-bold text-fg text-2xl mb-4">{t('missionTitle')}</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">{t('missionP1')}</p>
            <p className="text-muted text-sm leading-relaxed mb-4">{t('missionP2')}</p>
            <p className="text-muted text-sm leading-relaxed">{t('missionP3')}</p>
          </div>
          <div>
            <h2 className="font-bold text-fg text-2xl mb-4">{t('methodTitle')}</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">{t('methodIntro')}</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: t('method1Label'), desc: t('method1Desc') },
                { label: t('method2Label'), desc: t('method2Desc') },
                { label: t('method3Label'), desc: t('method3Desc') },
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
      <section className="max-w-[1440px] mx-auto px-10 py-10">
        <h2 className="font-bold text-fg text-2xl text-center mb-8">{t('valuesTitle')}</h2>
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
      <section className="max-w-[1440px] mx-auto px-10 py-6 mb-10">
        <div className="bg-primary rounded-2xl px-8 py-12 text-center text-white">
          <h2 className="font-bold text-3xl mb-3">{t('ctaTitle')}</h2>
          <p className="text-white/70 text-sm mb-7 max-w-md mx-auto">{t('ctaSubtitle')}</p>
          <Link
            href={`/${locale}/kalkulator`}
            className="inline-flex items-center gap-2 bg-white text-primary px-7 py-3 rounded-full font-medium text-sm hover:bg-white/90 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
