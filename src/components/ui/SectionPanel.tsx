import type { ReactNode } from 'react'

/**
 * The warm beat in the home page's surface rhythm.
 *
 * Every section from the hero to the footer was `bg-white`, broken only by the
 * navy newsletter card and the dark spiral — which left long unbroken white
 * runs, worst of all on a phone.
 *
 * This is the counter-surface. It uses the page's existing card language rather
 * than inventing a new one: the same 8px gutter as the hero's `inset-2` and the
 * newsletter's `px-2`, the same 2rem `--radius-feature`, and `--color-sand`, the
 * brand's declared "warm neutral background" — which the palette had defined but
 * nothing had ever used as an actual surface.
 *
 * The gutter is horizontal only. Vertical separation already comes from the
 * neighbouring white sections' own `py-16 … lg:py-[100px]`, so the panel keeps
 * that padding INSIDE the card and the page's vertical rhythm is untouched.
 *
 * ── Where it goes ────────────────────────────────────────────────────────────
 * The rule is "never more than two white sections in a row". Only the hero and
 * the footer break the page for free, so the long white run between them needs
 * carving twice:
 *
 *   dark · w · w · SAND · w · SAND · w · w · dark
 *
 * EcosystemCarousel and JournalSection carry the two panels. DomainesGrid —
 * "Nos thématiques" — sits between them and is deliberately NOT one: the beige
 * behind its SDG cards was doing nothing the white ground doesn't do better.
 *
 * This was once conditional. The spiral used to supply a third, dark break on
 * desktop, so the ecosystem panel was suppressed there to avoid over-carving —
 * a `spiral:` CSS variant that had to stay in lockstep with a matchMedia string
 * in HomeView. The spiral is no longer rendered (see SpiralStage), so the two
 * panels are unconditional and that whole mechanism is gone.
 */
export function SectionPanel({
  id,
  className = '',
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={`bg-white px-2 ${className}`}>
      <div className="overflow-hidden rounded-feature bg-sand py-16 md:py-20 lg:py-[100px]">
        {children}
      </div>
    </section>
  )
}
