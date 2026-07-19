import { RoutePage } from '@/components/pages/RoutePage'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Timeline } from '@/components/ui/Timeline'
import { getSiteContent } from '@/content/site'
import { toLocale } from '@/i18n'
import { routeMetadata } from '../_metadata'

/**
 * "Sou nou" — Mission / Vision / Devise, then the origin story. The principles
 * and the board have their own routes now (/prensip, /ekip), so neither is
 * restated here where the two copies could drift.
 *
 * The three opening panels are staggered rather than aligned: each starts lower
 * than the one before it, so the eye reads them as a sequence instead of three
 * equal columns. That is the disposition from the reference; the surfaces are
 * the site's own (sand, navy, white) rather than the reference's green and
 * yellow, and they keep the standard card radius instead of bleeding to the
 * page edges.
 *
 * The stagger is desktop-only — stacked in one column it would read as uneven
 * gaps rather than a stair.
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
    <RoutePage content={c} path="/sou-nou" subtitle={c.about.lead}>
      {/* ── Mission · Vision · Devise ─────────────────────────────────── */}
      <section id="vizyon" className="scroll-mt-28 bg-white px-2 pb-4 pt-16 md:pt-20">
        <div className="mx-auto grid max-w-[90rem] gap-4 px-3 md:px-8 lg:grid-cols-3 lg:items-start">
          {/* Mission — sand, the top of the stair */}
          <article className="rounded-card bg-sand p-8 md:p-10 lg:min-h-[26rem]">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
              {a.missionLabel}
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-extrabold leading-tight tracking-tight text-primary">
              {mission?.body}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{a.missionBody}</p>
          </article>

          {/* Vision — navy, one step down. Gold eyebrow, because this is the one
              dark surface in the row. */}
          <article className="rounded-card bg-primary p-8 md:p-10 lg:mt-16 lg:min-h-[26rem]">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              {a.visionLabel}
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-extrabold leading-tight tracking-tight text-white">
              {vision?.body}
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">{a.visionBody}</p>
          </article>

          {/* Devise — white and bordered rather than filled, so the row ends
              quietly instead of with a third slab. */}
          <article
            id="prensip"
            className="scroll-mt-28 rounded-card border border-black/[0.08] bg-white p-8 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)] md:p-10 lg:mt-32 lg:min-h-[26rem]"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
              {a.deviseLabel}
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-extrabold leading-tight tracking-tight text-primary">
              {devise?.body}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{c.whatWeDo.subtitle}</p>
          </article>
        </div>
      </section>

      {/* ── Istwa nou — the origin story ──────────────────────────────── */}
      <section id="istwa" className="scroll-mt-28 bg-white py-16 md:py-20 lg:py-[100px]">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          {/* The shared section header, like every other section on the site —
              three tilted pixels, display title, gold period. This was
              hand-rolled before and quietly lost the mark. */}
          <SectionHeader label={a.storyLabel} title={a.storyTitle} />

          <div className="mt-12 lg:mt-16">
            <Timeline items={timelineItems} statusLabels={a.storyStatus} />
          </div>
        </div>
      </section>

      {/* The board used to close this page. It has its own route now (/ekip), and
          stating it twice would let the two copies drift — so this page ends on
          the story and the nav sends you to the team. */}
    </RoutePage>
  )
}
