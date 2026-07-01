import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Manrope, Work_Sans } from 'next/font/google'
import { routing } from '@/i18n/routing'
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

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Renovation Estimator',
  description: 'Get a realistic renovation budget based on room size, finish quality, and regional Polish pricing.',
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'pl' | 'en' | 'ru' | 'uk')) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${manrope.variable} ${workSans.variable}`}>
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
