'use client'

import { RoutePage } from '@/components/pages/RoutePage'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { useContent } from '@/components/i18n/LocaleProvider'

/**
 * "Travay Nou" (what we do) — the frosted page header followed by the projects +
 * programs body. Port of the Angular `ce-que-nous-faisons` page onto Next.
 */
export default function TravayNouPage() {
  const c = useContent()

  return (
    <RoutePage
      path="/travay-nou"
      subtitle={c.whatWeDo.subtitle}
      image="/headers/travay-nou.webp"
    >
      <WhatWeDo content={c} />
    </RoutePage>
  )
}
