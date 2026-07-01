import { getTranslations } from 'next-intl/server'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'
import { articles } from '@/content/articles'
import { ArticlesClient } from '@/components/ArticlesClient'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'articlesPage' })
  return {
    title: `${t('title')} — Remontowo`,
    description: t('subtitle'),
  }
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'articlesPage' })
  const localeArticles = articles[locale] ?? articles['pl']

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <LandingHeader />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-10 pt-10 pb-20">
        <div className="mb-8">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">{t('badge')}</p>
          <h1 className="font-bold text-fg text-4xl leading-tight mb-3 max-w-md">{t('title')}</h1>
          <p className="text-muted text-sm leading-relaxed max-w-lg">{t('subtitle')}</p>
        </div>

        <ArticlesClient articles={localeArticles} locale={locale} />
      </main>

      <LandingFooter />
    </div>
  )
}
