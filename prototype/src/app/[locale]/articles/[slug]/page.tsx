import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { articles } from '@/content/articles'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations('articles')

  const localeArticles = articles[locale] ?? articles['pl']
  const article = localeArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <div className="flex flex-col min-h-screen bg-bg max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <Link href={`/${locale}/articles`} className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-fg shrink-0">
          <ArrowLeft size={16} />
        </Link>
        <span className="text-xs font-medium text-muted tracking-wide uppercase">{t(`clusters.${article.cluster}`)}</span>
      </div>

      <article className="px-5 pb-20">
        {/* Meta */}
        <div className="text-xs text-muted mb-3">{article.publishedAt}</div>
        <h1 className="font-serif font-bold text-fg text-3xl leading-tight mb-4">{article.title}</h1>
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
          <Link href={`/${locale}/estimate`} className="block w-full bg-primary text-white font-semibold rounded-xl py-4 text-base text-center hover:bg-primary/90 transition-colors">
            {article.ctaText}
          </Link>
        </div>
      </article>
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
