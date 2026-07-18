import type { ReactNode } from 'react'

/**
 * The warm beat in the home page's alternating surface rhythm.
 *
 * Every section from the hero to the footer used to be `bg-white`, broken only
 * by the navy newsletter card and — on desktop only — the dark spiral. On a
 * phone or a tablet held upright, where the spiral is gated out entirely, that
 * left seven flat white bands stacked in a row.
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
 * Applied to every other section (WorkOverview / DomainesGrid / FaqSection) so
 * no two white bands ever sit next to each other — at any breakpoint, with or
 * without the spiral. See HomeView for the resulting order.
 */
export function SectionPanel({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="bg-white px-2">
      <div className="rounded-feature bg-sand py-16 md:py-20 lg:py-[100px]">{children}</div>
    </section>
  )
}
