import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Funnel and preview steps: real pages for a visitor mid-estimate, but
        // thin, duplicated and state-dependent for a crawler.
        disallow: [
          '/api/',
          '/*/estimate',
          '/*/rooms',
          '/*/report',
          '/*/download',
          '/*/pobierz',
          '/*/pdf-preview',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
