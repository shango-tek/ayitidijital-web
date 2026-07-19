import { RoutePage } from '@/components/pages/RoutePage'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * "Travay Nou" (what we do) — the frosted page header followed by the projects +
 * programs body. Port of the Angular `ce-que-nous-faisons` page onto Next.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/travay-nou', locale)
}

export default async function TravayNouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = toLocale(locale)
  const c = getSiteContent(lang)

  return (
    <RoutePage
      content={c}
      path="/travay-nou"
      subtitle={c.whatWeDo.subtitle}
      image="/headers/travay-nou.webp"
    >
      <WhatWeDo content={c} />
    </RoutePage>
  )
}
