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
 * The rule is "never more than two white sections in a row", and the panel is
 * the tie-breaker of last resort: the hero, newsletter and footer already break
 * the page for free, and so does the spiral — but only on desktop. So the
 * longest white run is in a different place depending on the spiral, and ONE
 * panel, dropped in the middle of that run, is enough either way:
 *
 *   with spiral     dark · w · w · SPIRAL · w · SAND · w · NAVY · w · w · dark
 *                                          └ domenn, the middle of eko/domenn/jounal
 *   without spiral  dark · w · w · SAND · w · w · NAVY · w · w · dark
 *                                  └ ekosistem, the middle of apropo…jounal
 *
 * Hence the `gate`: DomainesGrid is a panel only under `spiral:`, and
 * EcosystemCarousel only when it is NOT. Never both, never neither — which is
 * why the `spiral:` variant and HomeView's matchMedia must stay in sync.
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
