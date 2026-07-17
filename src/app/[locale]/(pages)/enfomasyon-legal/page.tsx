'use client'

import { useLocale } from '@/components/i18n/LocaleProvider'
import { getLegalContent } from '@/content/legal'
import { LegalPage } from '@/components/pages/LegalPage'

/**
 * Impressum / mentions légales — the provider disclosure required of Ayiti
 * Dijital by § 5 DDG. Wording lives in `src/content/legal`; read the rules at
 * the top of that file before changing anything here.
 *
 * Reachable at /fr|/en|/ht/enfomasyon-legal. The previous Astro site's URLs
 * (/mentions-legales, /en/imprint) redirect here — see `next.config.ts`.
 */
export default function ImprintRoute() {
  const { locale } = useLocale()
  return <LegalPage doc={getLegalContent(locale).imprint} />
}
