import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { articles } from '@/content/articles'
import { buttonVariants } from '@/components/Button'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'

const HERO_BG: Record<string, string> = {
  budget:      'bg-green-50',
  contractors: 'bg-blue-50',
  rooms:       'bg-amber-50',
  regional:    'bg-purple-50',
  materials:   'bg-orange-50',
  property:    'bg-teal-50',
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations('articles')

  const localeArticles = articles[locale] ?? articles['pl']
  const article = localeArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <LandingHeader />

      <main className="flex-1 max-w-[1000px] mx-auto w-full px-8 py-10">
        {/* Cluster badge */}
        <div className="text-xs font-medium text-muted tracking-wide uppercase mb-4">
          {t(`clusters.${article.cluster}`)}
        </div>

        {/* Title */}
        <div className="text-xs text-muted mb-2">{article.publishedAt}</div>
        <h1 className="font-serif font-bold text-fg text-3xl leading-tight mb-6">{article.title}</h1>

        {/* Hero image placeholder */}
        <div className={`w-full aspect-video rounded-2xl mb-8 ${HERO_BG[article.cluster] ?? 'bg-stone-100'}`} />

        <article>
          {/* Hook */}
          <p className="text-muted text-base leading-relaxed mb-8 border-l-2 border-primary pl-4">{article.hook}</p>

          {/* Problem */}
          <h2 className="font-serif font-bold text-fg text-xl mb-3">Problem</h2>
          <div className="text-muted text-sm leading-relaxed mb-8 whitespace-pre-line">{article.problem}</div>

          {/* Explanation */}
          <h2 className="font-serif font-bold text-fg text-xl mb-3">Rozwiązanie</h2>
          <div className="text-muted text-sm leading-relaxed mb-8 whitespace-pre-line">{article.explanation}</div>

          {/* Checklist */}
          <h2 className="font-serif font-bold text-fg text-xl mb-4">Checklist</h2>
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
            <Link href={`/${locale}/estimate`} className={buttonVariants({ variant: 'primary', fullWidth: true })}>
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
