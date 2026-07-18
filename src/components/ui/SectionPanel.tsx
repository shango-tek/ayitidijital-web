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
 * USED ONCE, on DomainesGrid — deliberately. The rule is "never more than two
 * white sections in a row", and the hero, spiral, newsletter and footer already
 * supply four of the breaks. That leaves exactly one three-white run, between
 * the spiral and the newsletter, and one panel in the middle of it is enough:
 *
 *   dark · white · white · SPIRAL · white · SAND · white · NAVY · white · white · dark
 *
 * Reach for a second one only if a new section lengthens a white run past two.
 */
export function SectionPanel({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="bg-white px-2">
      <div className="rounded-feature bg-sand py-16 md:py-20 lg:py-[100px]">{children}</div>
    </section>
  )
}
