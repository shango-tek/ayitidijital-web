import { RoutePage } from '@/components/pages/RoutePage'
import { Timeline } from '@/components/ui/Timeline'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * "Sou nou" — Mission / Vision / Devise (staggered), then the origin-story
 * timeline, in the UnternehmerTUM register (Albert Sans, electric, sharp). The
 * principles and the board have their own routes (/prensip, /ekip).
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return routeMetadata('/sou-nou', locale)
}

export default async function SouNouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = toLocale(locale)
  const c = getSiteContent(lang)
  const a = c.aboutPage
  const [mission, vision, devise] = c.pillars.items
  const timelineItems = a.story.map((step) => ({
    title: step.title,
    description: step.body,
    category: step.kicker,
    status: step.status,
  }))

  return (
    <RoutePage content={c} path="/sou-nou" title={c.pageTitles.about} subtitle={c.about.lead}>
      {/* ── Mission · Vision · Devise ─────────────────────────────────── */}
      <section id="vizyon" className="scroll-mt-28 bg-tum-paper px-2 pb-4 pt-16 md:pt-20">
        <div className="mx-auto grid max-w-[90rem] gap-4 px-3 md:px-8 lg:grid-cols-3 lg:items-start">
          {/* Mission — lavender, the top of the stair */}
          <article className="border-4 border-double border-tum-ink bg-lavender p-8 md:p-10 lg:min-h-[26rem]">
            <span className="font-tum text-[11px] font-bold uppercase tracking-[0.18em] text-electric">
              {a.missionLabel}
            </span>
            <h2 className="mt-4 font-tum text-[clamp(1.6rem,3.2vw,2.25rem)] font-black leading-tight tracking-tight text-tum-ink">
              {mission?.body}
            </h2>
            <p className="mt-5 font-tum leading-relaxed text-tum-muted">{a.missionBody}</p>
          </article>

          {/* Vision — electric, one step down (the one bold surface in the row) */}
          <article className="border-4 border-double border-white bg-electric p-8 md:p-10 lg:mt-16 lg:min-h-[26rem]">
            <span className="font-tum text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              {a.visionLabel}
            </span>
            <h2 className="mt-4 font-tum text-[clamp(1.6rem,3.2vw,2.25rem)] font-black leading-tight tracking-tight text-white">
              {vision?.body}
            </h2>
            <p className="mt-5 font-tum leading-relaxed text-white/80">{a.visionBody}</p>
          </article>

          {/* Devise — white, bordered, so the row ends quietly */}
          <article
            id="prensip"
            className="scroll-mt-28 border-4 border-double border-tum-ink bg-tum-paper p-8 md:p-10 lg:mt-32 lg:min-h-[26rem]"
          >
            <span className="font-tum text-[11px] font-bold uppercase tracking-[0.18em] text-electric">
              {a.deviseLabel}
            </span>
            <h2 className="mt-4 font-tum text-[clamp(1.6rem,3.2vw,2.25rem)] font-black leading-tight tracking-tight text-tum-ink">
              {devise?.body}
            </h2>
            <p className="mt-5 font-tum leading-relaxed text-tum-muted">{c.whatWeDo.subtitle}</p>
          </article>
        </div>
      </section>

      {/* ── Istwa nou — the origin story ──────────────────────────────── */}
      <section id="istwa" className="scroll-mt-28 bg-tum-paper py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-tum-ink">
            <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
            {a.storyLabel}
          </span>
          <h2 className="mt-6 max-w-4xl font-tum text-[clamp(2.4rem,5.2vw,4.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-tum-ink">
            {a.storyTitle}
          </h2>

          <div className="mt-12 lg:mt-16">
            <Timeline items={timelineItems} statusLabels={a.storyStatus} />
          </div>
        </div>
      </section>
    </RoutePage>
  )
}
