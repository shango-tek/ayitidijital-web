import { notFound } from 'next/navigation'
import { HomeView } from '@/components/pages/HomeView'
import { isLocale } from '@/i18n'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // Content + language switching are handled client-side by <LocaleProvider>
  // (wired in the locale layout), seeded from this route's locale.
  return <HomeView />
}
