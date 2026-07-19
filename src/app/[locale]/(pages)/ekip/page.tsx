import { RoutePage } from '@/components/pages/RoutePage'
import { TeamSection } from '@/components/ui/TeamSection'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * The people behind Ayiti Dijital, in two groups that are deliberately not
 * merged.
 *
 * The Vorstand is vertretungsberechtigt under § 26 BGB and is named in the
 * imprint because § 5 DDG requires it. Coordination is neither. Merging them
 * would put the § 26 note over a person it does not apply to, so the groups stay
 * apart and the note sits with the Vorstand.
 *
 * No portraits: a photo of a real person needs their consent (§ 22 KunstUrhG),
 * and stock images of strangers under these names would misrepresent them. The
 * cards render monograms until real, cleared photographs exist — at which point
 * `imageSrc` on a member is all that is needed.
 */
const VORSTAND = [
  { name: 'Glory Pierrette', role: { ht: 'Prezidan', fr: 'Président', en: 'Chair' } },
  {
    name: 'Berlens Legagneur',
    role: { ht: 'Vis-prezidan', fr: 'Vice-président', en: 'Deputy chair' },
  },
] as const

const COORDINATION = [
  {
    name: 'Corvil D. Telsaint',
    role: { ht: 'Koòdonatè', fr: 'Coordonnateur', en: 'Coordinator' },
  },
] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/ekip', locale)
}

export default async function EkipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = toLocale(localeParam)
  const c = getSiteContent(locale)
  const t = c.teamPage

  return (
    <RoutePage content={c} path="/ekip" subtitle={t.lead}>
      <TeamSection
        eyebrow={t.label}
        note={t.note}
        groups={[
          {
            label: t.boardLabel,
            members: VORSTAND.map((m) => ({ name: m.name, designation: m.role[locale] })),
          },
          {
            label: t.coordinationLabel,
            members: COORDINATION.map((m) => ({ name: m.name, designation: m.role[locale] })),
          },
        ]}
      />
    </RoutePage>
  )
}
