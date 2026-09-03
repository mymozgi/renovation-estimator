import type { MetadataRoute } from 'next'
import { publishedArticles } from '@/content/articles'
import { CITIES } from '@/content/cities'
import { LOCALES, DEFAULT_LOCALE, SITE_URL } from '@/lib/seo'

// Rebuilt hourly, in step with the article routes, so a scheduled article
// enters the sitemap on its release date without a redeploy.
export const revalidate = 3600

/** Every locale variant of one path, cross-linked through hreflang alternates. */
function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
  lastModified?: string | Date,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALES.map(l => [l, `${SITE_URL}/${l}${path}`]),
  )
  return LOCALES.map(locale => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
    alternates: { languages: { ...languages, 'x-default': `${SITE_URL}/${DEFAULT_LOCALE}${path}` } },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    ...entry('', 'weekly', 1.0),
    ...entry('/kalkulator', 'weekly', 0.9),
    ...entry('/articles', 'daily', 0.8),
    ...entry('/methodology', 'monthly', 0.6),
    ...entry('/o-nas', 'monthly', 0.5),
    ...entry('/regulamin', 'yearly', 0.3),
  ]

  const cityPages = CITIES.flatMap(c => entry(`/remont/${c.slug}`, 'monthly', 0.7))

  // Article slugs differ per locale, so each locale's list is walked on its own
  // and the hreflang map is built from the matching entry in every other locale.
  const byLocale = Object.fromEntries(
    LOCALES.map(l => [l, publishedArticles(l)]),
  ) as Record<string, ReturnType<typeof publishedArticles>>

  const articlePages: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    byLocale[locale].map(article => {
      const languages = Object.fromEntries(
        LOCALES.map(l => {
          const twin = byLocale[l].find(a => a.publishedAt === article.publishedAt && a.cluster === article.cluster)
          return [l, `${SITE_URL}/${l}/articles/${(twin ?? article).slug}`]
        }),
      )
      return {
        url: `${SITE_URL}/${locale}/articles/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            ...languages,
            'x-default': languages[DEFAULT_LOCALE] as string,
          },
        },
      }
    }),
  )

  return [...staticPages, ...cityPages, ...articlePages]
}
