import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Manrope, Work_Sans, Roboto_Mono } from 'next/font/google'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SITE_URL, alternatesFor } from '@/lib/seo'
import '../globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-manrope',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'pl' | 'en' | 'ru' | 'uk')) return {}
  const t = await getTranslations({ locale, namespace: 'home' })

  return {
    // Absolute base for every relative canonical, hreflang and OG URL below.
    metadataBase: new URL(SITE_URL),
    title: {
      default: `Remonta — ${t('heroTitle')}`,
      // Pages set their own full title; this only frames the ones that do not.
      template: '%s',
    },
    description: t('heroSubtitle'),
    alternates: alternatesFor(locale),
    openGraph: {
      type: 'website',
      siteName: 'Remonta',
      locale,
      url: `${SITE_URL}/${locale}`,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'pl' | 'en' | 'ru' | 'uk')) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${manrope.variable} ${workSans.variable} ${robotoMono.variable}`}>
      <body className="min-h-full bg-bg">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
