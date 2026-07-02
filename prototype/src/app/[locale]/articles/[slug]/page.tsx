import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { articles } from '@/content/articles'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { CLUSTER_HERO, CLUSTER_HERO_FALLBACK } from '@/lib/clusterColors'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'articles' })
  const tHome = await getTranslations({ locale, namespace: 'home' })

  const localeArticles = articles[locale] ?? articles['pl']
  const article = localeArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  const heroSrc = `https://images.unsplash.com/photo-${CLUSTER_HERO[article.cluster] ?? CLUSTER_HERO_FALLBACK}?w=1400&q=80&auto=format&fit=crop`
  const clusterLabel = t(`clusters.${article.cluster}`)

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <LandingHeader />

      <main className="flex-1">
        {/* ── Header area ── */}
        <div className="max-w-[1140px] mx-auto px-10 pt-16 pb-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 font-mono text-xs text-[#717973] mb-6">
            <Link href={`/${locale}`} className="hover:text-fg transition-colors">
              {t('breadcrumbHome')}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/articles`} className="hover:text-fg transition-colors">
              {t('breadcrumbBlog')}
            </Link>
            <span>/</span>
            <span className="text-fg">{clusterLabel.toUpperCase()}</span>
          </nav>

          {/* Category badge + date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#cde9d8] text-[#4b6457] rounded-full px-3 py-1 text-xs font-medium tracking-[0.06em]">
              {clusterLabel}
            </span>
            <span className="text-sm text-[#717973]">{article.publishedAt}</span>
          </div>

          {/* Title */}
          <h1 className="font-bold text-fg text-5xl leading-[56px] tracking-[-0.96px] mb-8 max-w-[896px]">
            {article.title}
          </h1>

          {/* Hero image card */}
          <div className="relative w-full aspect-[1140/490] rounded-[12px] overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            <Image
              src={heroSrc}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="max-w-[1140px] mx-auto px-10 pt-10 pb-16 flex gap-16 items-start">
          {/* Article body */}
          <article className="flex-1 min-w-0">
            {/* Hook */}
            <p className="text-base text-[#414943] leading-7 mb-10">{article.hook}</p>

            {/* Problem */}
            <h2 className="font-bold text-fg text-[32px] leading-10 tracking-[-0.32px] mb-4">
              {t('problem')}
            </h2>
            <div className="text-base text-[#414943] leading-6 mb-10 whitespace-pre-line">
              {article.problem}
            </div>

            {/* Solution — styled as pro-tip callout */}
            <div className="bg-[#cde9d8] border-l-4 border-[#002113] pl-9 pr-8 py-8 rounded-r-md mb-10">
              <p className="font-semibold text-[#003924] text-sm tracking-[0.8px] uppercase mb-3">
                {t('solution')}
              </p>
              <p className="text-base text-[#414943] leading-6 whitespace-pre-line">
                {article.explanation}
              </p>
            </div>

            {/* Checklist */}
            <h2 className="font-bold text-fg text-[32px] leading-10 tracking-[-0.32px] mb-5">
              {t('checklist')}
            </h2>
            <ul className="flex flex-col gap-3">
              {article.checklist.map((item, i) => (
                <li key={i} className="relative pl-7 text-base text-[#414943] leading-6">
                  <span className="absolute left-0 top-[9.6px] w-1.5 h-1.5 rounded-sm bg-[#1c8a5f]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* Sidebar */}
          <aside className="w-80 shrink-0 sticky top-24">
            <div className="bg-[#f6f3f2] border border-[#c0c9c1] rounded-[12px] p-8 flex flex-col gap-6">
              {/* TOC */}
              <div>
                <p className="font-semibold text-fg text-base tracking-[0.8px] uppercase mb-4">
                  {t('tocTitle')}
                </p>
                <ul className="flex flex-col gap-3">
                  {[t('problem'), t('solution'), t('checklist')].map((label) => (
                    <li key={label} className="relative pl-4 font-semibold text-base text-fg leading-6">
                      <span className="absolute left-0 top-[10px] w-1 h-1 rounded-full bg-[#717973]" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#c0c9c1]" />

              {/* CTA widget */}
              <div>
                <h3 className="font-bold text-fg text-2xl leading-8 mb-2">
                  {t('sidebarCtaTitle')}
                </h3>
                <p className="text-base text-[#414943] leading-6 mb-5">
                  {t('sidebarCtaDesc')}
                </p>
                <Link
                  href={`/${locale}/kalkulator`}
                  className="flex items-center justify-center bg-primary text-white rounded-[12px] px-8 py-4 font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
                >
                  {article.ctaText}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Full-width CTA section ── */}
        <section className="bg-[#37684f] py-24 text-center text-white">
          <div className="max-w-[672px] mx-auto px-6">
            <h2 className="font-bold text-5xl leading-[56px] tracking-[-0.96px] mb-3">
              {tHome('ctaTitle')}
            </h2>
            <p className="text-white/80 text-lg leading-7 mb-7">
              {tHome('ctaSubtitle')}
            </p>
            <Link
              href={`/${locale}/kalkulator`}
              className="inline-flex items-center gap-2 bg-green-100 text-fg px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-green-100/90 transition-colors"
            >
              {tHome('ctaCta')}
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const [locale, arts] of Object.entries(articles)) {
    for (const article of arts) {
      params.push({ locale, slug: article.slug })
    }
  }
  return params
}
