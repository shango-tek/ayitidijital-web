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
 * ── Where it goes, and why it moves ──────────────────────────────────────────
 * The rule is "never more than two white sections in a row". Only the hero, the
 * footer and — on desktop only — the spiral break the page for free, so with the
 * newsletter card gone from the home page there is a long white run to carve up,
 * and where it needs carving depends on whether the spiral is there:
 *
 *   with spiral     dark · w · w · SPIRAL · w · w · SAND · w · w · dark
 *   without spiral  dark · w · SAND · w · w · SAND · w · w · dark
 *
 * So JournalSection is a panel always (it splits the long tail either way), and
 * EcosystemCarousel is one only when the spiral is absent and the head of the
 * page would otherwise run four white sections deep. DomainesGrid — "Nos
 * thématiques" — is deliberately NOT one: it sat between the two and the beige
 * behind its SDG cards was doing nothing the white ground doesn't do better.
 *
 * The `spiral:` variant and HomeView's matchMedia must stay in sync, or the
 * ecosystem panel appears on desktop where it is not wanted.
 */
type Gate = 'always' | 'with-spiral' | 'without-spiral'

const GATE: Record<Gate, { gutter: string; surface: string }> = {
  always: {
    gutter: 'px-2',
    surface: 'rounded-feature bg-sand',
  },
  'with-spiral': {
    gutter: 'spiral:px-2',
    surface: 'spiral:rounded-feature spiral:bg-sand',
  },
  'without-spiral': {
    gutter: 'px-2 spiral:px-0',
    surface: 'rounded-feature bg-sand spiral:rounded-none spiral:bg-transparent',
  },
}

export function SectionPanel({
  id,
  gate = 'always',
  className = '',
  children,
}: {
  id?: string
  gate?: Gate
  className?: string
  children: ReactNode
}) {
  const g = GATE[gate]
  return (
    <section id={id} className={`bg-white ${g.gutter} ${className}`}>
      <div className={`overflow-hidden ${g.surface} py-16 md:py-20 lg:py-[100px]`}>{children}</div>
    </section>
  )
}
