import { RoutePage } from '@/components/pages/RoutePage'
import { PrinciplesList } from '@/components/sections/PrinciplesList'
import { Kicker } from '@/components/ui/Kicker'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * "Prensip" — the convictions. Four numbered principles, revealed one at a time
 * as you scroll, matching the Istwa nou treatment on the About page: same rule
 * that draws in, same lift, same one-beat-per-item restraint.
 *
 * Numbered because the source copy numbers them, and because four convictions
 * read as a set you can hold rather than an open-ended list.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/prensip', locale)
}

export default async function PrensipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getSiteContent(toLocale(locale))
  const p = c.principlesPage

  return (
    <RoutePage content={c} path="/prensip" subtitle={p.lead}>
      <section className="bg-white py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <Kicker label={p.label} red />

          {/* Same floor as Istwa nou: whileInView writes its start state into the
              server HTML, so without JS this page would be an empty column. */}
          <noscript>
            <style
              dangerouslySetInnerHTML={{
                __html: '.prensip-item{opacity:1!important;transform:none!important}.prensip-rule{transform:scaleX(1)!important}',
              }}
            />
          </noscript>

          <PrinciplesList items={p.items} />
        </div>
      </section>
    </RoutePage>
  )
}
