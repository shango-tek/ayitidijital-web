import { redirect } from 'next/navigation'
import { negotiateLocale } from '@/lib/negotiate-locale'

/**
 * `/` → the best locale for this visitor, decided server-side at the edge.
 *
 * The decision itself (remembered `ad-lang` cookie → Haiti → browser language →
 * francophone country → English) lives in `negotiateLocale`, shared with the
 * "coming soon" gate so the two can never disagree. Reading request headers there
 * makes this route dynamic — what a per-visitor redirect needs.
 */
export default async function RootPage() {
  redirect(`/${await negotiateLocale()}`)
}
