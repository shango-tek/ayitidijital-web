import { getLegalContent } from '@/content/legal'
import { LegalPage } from '@/components/pages/LegalPage'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * Privacy policy — Ayiti Dijital's GDPR Art. 13 notice. Wording lives in
 * `src/content/legal`; read the rules at the top of that file before changing
 * anything here. In particular this page asserts that the site sets no cookies
 * and makes no third-party requests, which must stay true of the build.
 *
 * Reachable at /fr|/en|/ht/konfidansyalite. The previous Astro site's URLs
 * (/confidentialite, /en/privacy) redirect here — see `next.config.ts`.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/konfidansyalite', locale, getLegalContent(toLocale(locale)).privacy.title)
}

export default async function PrivacyRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = toLocale(localeParam)
  // Accordion: this document runs to fifteen sections, and most readers arrive
  // for one of them. The imprint stays fully open — it is short.
  return <LegalPage doc={getLegalContent(locale).privacy} accordion />
}
