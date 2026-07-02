import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { articles } from '@/content/articles'
import { buttonVariants } from '@/components/Button'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'

import { CLUSTER_HERO, CLUSTER_HERO_FALLBACK } from '@/lib/clusterColors'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'articles' })

  const localeArticles = articles[locale] ?? articles['pl']
  const article = localeArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <LandingHeader />

      <main className="flex-1 max-w-[1464px] mx-auto w-full px-8 py-10">
        {/* Cluster badge */}
        <div className="text-xs font-medium text-muted tracking-wide uppercase mb-4">
          {t(`clusters.${article.cluster}`)}
        </div>

        {/* Title */}
        <div className="text-xs text-muted mb-2">{article.publishedAt}</div>
        <h1 className="font-serif font-bold text-fg text-3xl leading-tight mb-6">{article.title}</h1>

        {/* Hero image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={`https://images.unsplash.com/photo-${CLUSTER_HERO[article.cluster] ?? CLUSTER_HERO_FALLBACK}?w=1400&q=80&auto=format&fit=crop`}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <article>
          {/* Hook */}
          <p className="text-muted text-base leading-relaxed mb-8 border-l-2 border-primary pl-4">{article.hook}</p>

          {/* Problem */}
          <h2 className="font-serif font-bold text-fg text-xl mb-3">{t('problem')}</h2>
          <div className="text-muted text-sm leading-relaxed mb-8 whitespace-pre-line">{article.problem}</div>

          {/* Explanation */}
          <h2 className="font-serif font-bold text-fg text-xl mb-3">{t('solution')}</h2>
          <div className="text-muted text-sm leading-relaxed mb-8 whitespace-pre-line">{article.explanation}</div>

          {/* Checklist */}
          <h2 className="font-serif font-bold text-fg text-xl mb-4">{t('checklist')}</h2>
          <div className="space-y-3 mb-10">
            {article.checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-fg leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <Link href={`/${locale}/kalkulator`} className={buttonVariants({ variant: 'primary', fullWidth: true })}>
              {article.ctaText}
            </Link>
          </div>
        </article>
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
