import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'
import { LOCALES, type Locale } from '@/i18n'

/**
 * `/` → the best locale for this visitor, decided server-side at the edge:
 *   0. a remembered choice (the `ad-lang` cookie, set when they switch language)
 *      wins over everything — an explicit pick beats any guess;
 *   1. anyone browsing from Haiti always lands in Kreyòl (`/ht`);
 *   2. otherwise the browser's `Accept-Language`, when it is one we ship (fr/en/ht);
 *   3. otherwise the country — a French-speaking country → French;
 *   4. everyone else → English.
 *
 * This serves both "where they are" and "what their phone reads": a French or
 * Kreyòl speaker on a German phone still gets their language (step 2), while a
 * visitor in France whose phone is in another language still gets French (step 3).
 * Reading request headers makes this route dynamic — what a per-visitor redirect
 * needs.
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

export default async function RootPage() {
  const [cookieStore, h] = await Promise.all([cookies(), headers()])

  // 0. A remembered language choice wins over every guess below.
  const saved = cookieStore.get('ad-lang')?.value
  if (saved && (LOCALES as readonly string[]).includes(saved)) redirect(`/${saved}`)

  const country = h.get('x-vercel-ip-country')?.toUpperCase()

  // 1. Anyone in Haiti → Kreyòl.
  if (country === 'HT') redirect('/ht')

  // 2. Honour the browser language when it is one we ship.
  const fromBrowser = pickFromAcceptLanguage(h.get('accept-language'))
  if (fromBrowser) redirect(`/${fromBrowser}`)

  // 3. Decide by country: a French-speaking country → French…
  if (country && FRANCOPHONE.has(country)) redirect('/fr')

  // 4. …everyone else → English.
  redirect('/en')
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
