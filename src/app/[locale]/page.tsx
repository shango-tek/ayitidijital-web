import { notFound } from 'next/navigation'
import { HomeView } from '@/components/pages/HomeView'
import { getSiteContent } from '@/content/site'
import { isLocale } from '@/i18n'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return <HomeView content={getSiteContent(locale)} locale={locale} />
}
