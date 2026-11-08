import { cookies, headers } from 'next/headers'
import { LOCALES, type Locale } from '@/i18n'

/**
 * Decide the best locale for this visitor from the request, server-side.
 *
 * One source of truth shared by the root `/` redirect (src/app/page.tsx) and the
 * "coming soon" gate (src/app/coming-soon), so both agree on what language a
 * given visitor sees. The order mirrors the redirect's intent:
 *
 *   0. a remembered choice (the `ad-lang` cookie) wins over every guess;
 *   1. anyone browsing from Haiti → Kreyòl (`ht`);
 *   2. otherwise the browser's `Accept-Language`, when it is one we ship;
 *   3. otherwise a French-speaking country → French;
 *   4. everyone else → English.
 *
 * Reading request headers/cookies makes any caller a dynamic route — expected
 * for a per-visitor decision.
 */

/** Countries where French is official or the primary working language. */
const FRANCOPHONE = new Set([
  // Europe
  'FR', 'BE', 'CH', 'LU', 'MC',
  // Africa
  'CI', 'SN', 'ML', 'BF', 'NE', 'TD', 'CG', 'CD', 'GA', 'CM', 'BJ', 'TG', 'GN',
  'MG', 'RW', 'DJ', 'KM', 'CF', 'GQ', 'MR', 'DZ', 'MA', 'TN', 'SC',
  // Pacific / overseas
  'PF', 'NC', 'WF', 'VU',
])

export async function negotiateLocale(): Promise<Locale> {
  const [cookieStore, h] = await Promise.all([cookies(), headers()])

  // 0. A remembered language choice wins over every guess below.
  const saved = cookieStore.get('ad-lang')?.value
  if (saved && (LOCALES as readonly string[]).includes(saved)) return saved as Locale

  const country = h.get('x-vercel-ip-country')?.toUpperCase()

  // 1. Anyone in Haiti → Kreyòl.
  if (country === 'HT') return 'ht'

  // 2. Honour the browser language when it is one we ship.
  const fromBrowser = pickFromAcceptLanguage(h.get('accept-language'))
  if (fromBrowser) return fromBrowser

  // 3. A French-speaking country → French…
  if (country && FRANCOPHONE.has(country)) return 'fr'

  // 4. …everyone else → English.
  return 'en'
}

/** The highest-priority `Accept-Language` entry whose base language we ship. */
function pickFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { base: tag.toLowerCase().split('-')[0], q: q ? Number.parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { base } of ranked) {
    if ((LOCALES as readonly string[]).includes(base)) return base as Locale
  }
  return null
}
