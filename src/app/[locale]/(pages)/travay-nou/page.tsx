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
      image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
    >
      <WhatWeDo content={c} />
    </RoutePage>
  )
}
