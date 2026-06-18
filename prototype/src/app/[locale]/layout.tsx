import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'
import '../globals.css'

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
  if (!routing.locales.includes(locale as 'pl' | 'en' | 'ru')) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      {/*
        <script> inside <head> in a Server Component is emitted as raw HTML.
        React never "renders" it on the client — it's already in the DOM.
        suppressHydrationWarning on both <html> and <script> silences
        the mismatch caused by the anti-FOUC setting data-a11y-* attributes
        before React hydrates.
      */}
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: ANTI_FOUC }}
        />
      </head>
      <body className="min-h-full bg-bg">
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
