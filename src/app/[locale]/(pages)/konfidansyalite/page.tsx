'use client'

import { useLocale } from '@/components/i18n/LocaleProvider'
import { getLegalContent } from '@/content/legal'
import { LegalPage } from '@/components/pages/LegalPage'

/**
 * Privacy policy — Ayiti Dijital's GDPR Art. 13 notice. Wording lives in
 * `src/content/legal`; read the rules at the top of that file before changing
 * anything here. In particular this page asserts that the site sets no cookies
 * and makes no third-party requests, which must stay true of the build.
 *
 * Reachable at /fr|/en|/ht/konfidansyalite. The previous Astro site's URLs
 * (/confidentialite, /en/privacy) redirect here — see `next.config.ts`.
 */
export default function PrivacyRoute() {
  const { locale } = useLocale()
  return <LegalPage doc={getLegalContent(locale).privacy} />
}
