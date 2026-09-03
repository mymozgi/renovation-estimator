import { routing } from '@/i18n/routing'

/**
 * Absolute origin of the production site. Everything canonical, hreflang and
 * Open Graph related is resolved against it, so it must be an absolute URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://remonta.pl'
).replace(/\/$/, '')

export const LOCALES = routing.locales
export const DEFAULT_LOCALE = routing.defaultLocale

/**
 * Canonical URL plus the hreflang map for one page.
 *
 * `path` is the part after the locale segment, with a leading slash or empty
 * for a locale root: '' → /pl, '/articles' → /pl/articles.
 *
 * x-default points at the default locale, which is what Google serves to a
 * visitor whose language matches none of ours.
 */
export function alternatesFor(locale: string, path = '') {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map(l => [l, `/${l}${path}`])),
      'x-default': `/${DEFAULT_LOCALE}${path}`,
    },
  }
}

/** Metadata for pages that must never reach the index (funnel and preview steps). */
export const NOINDEX = {
  robots: { index: false, follow: false },
} as const
