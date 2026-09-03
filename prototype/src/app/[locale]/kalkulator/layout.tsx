import { getTranslations } from 'next-intl/server'
import { alternatesFor } from '@/lib/seo'

// The calculator page itself is a client component, so its metadata lives here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'calc' })
  return {
    title: `${t('startTitle')} — Remonta`,
    description: t('startSubtitle'),
    alternates: alternatesFor(locale, '/kalkulator'),
  }
}

export default function KalkulatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
