import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/i18n'

/**
 * `/` → the best locale for this visitor, decided server-side at the edge:
 *   • anyone browsing from Haiti always lands in Kreyòl (`/ht`);
 *   • otherwise the browser's `Accept-Language` chooses fr / en / ht;
 *   • the fallback is the default locale (fr).
 *
 * Reading request headers makes this route dynamic — exactly what a
 * per-visitor redirect needs.
 */
export default async function RootPage() {
  const h = await headers()

  // Vercel stamps the visitor's country on every edge request. Absent locally.
  const country = h.get('x-vercel-ip-country')?.toUpperCase()
  if (country === 'HT') redirect('/ht')

  const locale = pickFromAcceptLanguage(h.get('accept-language')) ?? DEFAULT_LOCALE
  redirect(`/${locale}`)
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
