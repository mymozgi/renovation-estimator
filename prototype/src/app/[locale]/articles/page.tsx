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

      <main className="flex-1 max-w-[1140px] mx-auto w-full px-4 sm:px-10 pt-10 sm:pt-24 pb-10 sm:pb-24">
        <div className="mb-8">
          <p className="font-mono text-xs text-fg mb-3">{t('badge')}</p>
          <h1 className="font-bold text-fg text-3xl sm:text-5xl leading-tight sm:leading-[56px] tracking-[-0.5px] sm:tracking-[-0.96px] mb-3 max-w-md">{t('title')}</h1>
          <p className="font-semibold text-[#414943] text-base sm:text-xl leading-7 max-w-lg">{t('subtitle')}</p>
        </div>

        <ArticlesClient articles={localeArticles} locale={locale} />
      </main>

      <LandingFooter />
    </div>
  )
}
