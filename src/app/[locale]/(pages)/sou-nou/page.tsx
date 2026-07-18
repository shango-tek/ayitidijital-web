'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { RoutePage } from '@/components/pages/RoutePage'
import { useLocale } from '@/components/i18n/LocaleProvider'

/** The Vorstand, as publicly named in the imprint (§ 5 DDG requires it there). */
const BOARD = [
  { name: 'Glory Pierrette', role: { ht: 'Prezidan', fr: 'Président', en: 'Chair' } },
  {
    name: 'Berlens Legagneur',
    role: { ht: 'Vis-prezidan', fr: 'Vice-président', en: 'Deputy chair' },
  },
] as const

const T = {
  ht: { boardNote: 'Chak manm gen dwa reprezante asosyasyon an pou kont li (§ 26 BGB).' },
  fr: { boardNote: 'Chaque membre peut représenter l’association seul (§ 26 BGB).' },
  en: { boardNote: 'Each member may represent the association individually (§ 26 BGB).' },
} as const

/**
 * "Sou nou" — Mission / Vision / Devise, the origin story, then the board.
 * Anchors (#vizyon, #prensip, #ekip) are the ones the nav dropdown points at.
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
export default function SouNouPage() {
  const { content: c, locale } = useLocale()
  const t = T[locale]
  const a = c.aboutPage
  const [mission, vision, devise] = c.pillars.items
  const reduce = useReducedMotion()

  /* The story reveals stage by stage as you scroll into it — the rule above each
     stage draws left to right, then the stage lifts into place. It is one beat
     per stage rather than a scattering of effects: the section is a chronology,
     so the motion should read as advancing through it.
     `once: true` — it plays on the way down and then stays put. Re-animating on
     the way back up turns a history into a fidget. */
  const EASE = [0.16, 1, 0.3, 1] as const
  const inView = { once: true, amount: 0.4 } as const
  const stage = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: inView,
        transition: { duration: 0.6, ease: EASE },
      }
  const rule = reduce
    ? {}
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: inView,
        transition: { duration: 0.8, ease: EASE },
      }
  /** The number arrives a beat after its stage, so the eye lands on the text first. */
  const numeral = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: inView,
        transition: { duration: 0.5, ease: EASE, delay: 0.12 },
      }

  return (
    <RoutePage path="/sou-nou" subtitle={c.about.lead}>
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
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
            {a.storyLabel}
          </span>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-primary">
            {a.storyTitle}
          </h2>

          {/* A real chronology, so the numbers carry information rather than
              decorate. The hairline between stages is the through-line. */}
          {/* The reveal renders its own start state into the server HTML, which
              means these stages ship as opacity:0. The text is in the DOM either
              way — crawlers and screen readers are fine — but with JS blocked a
              sighted reader would get an empty section where the history should
              be. This is content, not decoration, so it gets a floor. */}
          <noscript>
            {/* eslint-disable-next-line react/no-danger */}
            <style
              dangerouslySetInnerHTML={{
                __html: '.istwa-stage,.istwa-num{opacity:1!important;transform:none!important}.istwa-rule{transform:scaleX(1)!important}',
              }}
            />
          </noscript>

          <ol className="mt-12 lg:mt-16">
            {a.story.map((step, i) => (
              <motion.li
                key={step.title}
                {...stage}
                className="istwa-stage relative grid gap-x-8 gap-y-3 py-8 md:grid-cols-[5rem_1fr] lg:grid-cols-[7rem_15rem_1fr] lg:py-10"
              >
                {/* the rule, as its own element so it can draw — a border cannot */}
                <motion.span
                  aria-hidden="true"
                  {...rule}
                  className="istwa-rule absolute inset-x-0 top-0 h-px origin-left bg-black/[0.09]"
                />
                <motion.span
                  aria-hidden="true"
                  {...numeral}
                  className="istwa-num font-display text-3xl font-extrabold leading-none text-primary/20 lg:text-4xl"
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.span>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep lg:pt-2">
                  {step.kicker}
                </h3>
                <div className="md:col-start-2 lg:col-start-3">
                  <p className="font-display text-xl font-bold leading-snug tracking-tight text-primary lg:text-2xl">
                    {step.title}
                  </p>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The board ─────────────────────────────────────────────────── */}
      <section id="ekip" className="scroll-mt-28 bg-white px-2 pb-16 md:pb-20 lg:pb-[100px]">
        <div className="rounded-feature bg-sand px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[90rem]">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-deep">
              {a.teamLabel}
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-primary">
              {a.teamTitle}
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
              {BOARD.map((m) => (
                <div
                  key={m.name}
                  className="rounded-card border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]"
                >
                  <p className="font-display text-lg font-bold text-primary">{m.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold-deep">
                    {m.role[locale]}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft/85">{t.boardNote}</p>
          </div>
        </div>
      </section>
    </RoutePage>
  )
}
