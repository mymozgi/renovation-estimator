import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { articles } from '@/content/articles'
import { CLUSTER_COLORS, CLUSTER_FALLBACK, CLUSTER_HERO, CLUSTER_HERO_FALLBACK } from '@/lib/clusterColors'
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

      <main className="flex-1 max-w-[1464px] mx-auto w-full px-8 py-10">
        <h1 className="font-serif font-bold text-fg text-3xl leading-tight mb-2">{t('title')}</h1>
        <p className="text-muted text-sm leading-relaxed mb-8">{t('subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localeArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/articles/${article.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-primary/30"
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
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${CLUSTER_COLORS[article.cluster] ?? CLUSTER_FALLBACK}`}>
                    {t(`clusters.${article.cluster}`)}
                  </span>
                  <span className="text-xs text-muted shrink-0">{article.publishedAt}</span>
                </div>

                <h2 className="font-serif font-bold text-fg text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h2>

                <p className="text-muted text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                  {article.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-primary text-sm font-medium pt-4 border-t border-border mt-auto">
                  {t('readMore')}
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl px-6 py-8 text-center">
          <p className="font-serif font-bold text-fg text-xl mb-2">{t('cta')}</p>
          <Link href={`/${locale}/estimate`} className={buttonVariants({ variant: 'primary' })}>
            {t('cta')} <ArrowRight size={15} />
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
