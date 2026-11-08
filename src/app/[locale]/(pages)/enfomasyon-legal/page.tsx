import { getLegalContent } from '@/content/legal'
import { LegalPage } from '@/components/pages/LegalPage'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * Impressum / mentions légales — the provider disclosure required of Ayiti
 * Dijital by § 5 DDG. Wording lives in `src/content/legal`; read the rules at
 * the top of that file before changing anything here.
 *
 * Reachable at /fr|/en|/ht/enfomasyon-legal. The previous Astro site's URLs
 * (/mentions-legales, /en/imprint) redirect here — see `next.config.ts`.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata(
    '/enfomasyon-legal',
    locale,
    getLegalContent(toLocale(locale)).imprint.title,
  )
}

export default async function ImprintRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = toLocale(localeParam)
  return <LegalPage doc={getLegalContent(locale).imprint} />
}
