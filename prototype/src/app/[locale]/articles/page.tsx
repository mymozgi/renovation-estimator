import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { articles } from '@/content/articles'
import { CLUSTER_COLORS, CLUSTER_FALLBACK } from '@/lib/clusterColors'
import { buttonVariants } from '@/components/Button'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'

type Props = { params: Promise<{ locale: string }> }

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('articles')
  const localeArticles = articles[locale] ?? articles['pl']

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <LandingHeader />

      <main className="flex-1 max-w-[1000px] mx-auto w-full px-8 py-10">
        <h1 className="font-serif font-bold text-fg text-3xl leading-tight mb-2">{t('title')}</h1>
        <p className="text-muted text-sm leading-relaxed mb-8">{t('subtitle')}</p>

        <div className="space-y-4">
          {localeArticles.map((article) => (
            <Link key={article.slug} href={`/${locale}/articles/${article.slug}`}
              className="block bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-colors group">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${CLUSTER_COLORS[article.cluster] ?? CLUSTER_FALLBACK}`}>
                  {t(`clusters.${article.cluster}`)}
                </span>
                <span className="text-xs text-muted shrink-0">{article.publishedAt}</span>
              </div>
              <h2 className="font-serif font-bold text-fg text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
              <p className="text-muted text-sm leading-relaxed mb-3">{article.description}</p>
              <span className="text-primary text-sm font-medium">{t('readMore')}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
          <p className="text-fg font-semibold mb-3">{t('cta')}</p>
          <Link href={`/${locale}/estimate`} className={buttonVariants({ variant: 'primary' })}>
            {t('cta')}
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
