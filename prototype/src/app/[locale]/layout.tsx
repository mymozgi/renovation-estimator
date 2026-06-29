import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Manrope, Work_Sans } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'
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

// Inline script rendered server-side inside <head> — never runs in React render cycle,
// executes as plain HTML before any JS loads (true anti-FOUC).
const ANTI_FOUC = `(function(){try{var p=JSON.parse(localStorage.getItem('a11y')||'{}'),h=document.documentElement;if(p.size)h.setAttribute('data-a11y-size',p.size);if(p.contrast)h.setAttribute('data-a11y-contrast',p.contrast);if(p.font)h.setAttribute('data-a11y-font',p.font)}catch(e){}})();`

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'pl' | 'en' | 'ru' | 'uk')) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={`${manrope.variable} ${workSans.variable}`}>
      <body className="min-h-full bg-bg">
        {/* Anti-FOUC: runs before React hydrates, reads a11y prefs from localStorage */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: ANTI_FOUC }} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <AccessibilityWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
