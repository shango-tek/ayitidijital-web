'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

/* Loaded on demand rather than imported outright: the spiral drags in gsap and
   two canvas engines, and the gate below means most visitors never render it.
   A static import would ship all of that to every phone to then not use it.
   The dynamic() must live in a Client Component — from a Server Component it
   does not code-split (see the lazy-loading guide). */
const SpiralGalaxy = dynamic(() =>
  import('@/components/ui/spiral-galaxy').then((m) => m.SpiralGalaxy),
)

/**
 * Gate for the home page's kinetic spiral.
 *
 * ── DORMANT ──────────────────────────────────────────────────────────────────
 * Nothing renders this. It was removed from the home page deliberately, and the
 * code is kept so the sequence can be brought back without rebuilding it.
 *
 * Why it went: ~950 lines and a 39 KB gzipped chunk (the sole reason `gsap` is a
 * dependency) reached only desktop-with-a-mouse, and its eight orbiting words
 * are the same `marqueeWords` the footer already shows. The only copy unique to
 * it was the three centre verbs.
 *
 * To restore, three edits — they are coupled and half-restoring gives a home
 * page with two sand panels in a row:
 *   1. Render <SpiralStage words={c.marqueeWords} centerWords={c.spiralCenterWords} />
 *      in HomeView, between WorkOverview and EcosystemCarousel.
 *   2. Re-add the `spiral:` custom variant to globals.css, matching the
 *      matchMedia string below exactly.
 *   3. Re-gate SectionPanel so EcosystemCarousel's panel is suppressed wherever
 *      the spiral renders — it exists to break a white run the spiral would
 *      otherwise break itself. See the note in SectionPanel.
 *
 * Two defects to fix if it does come back: the per-character text spiral in
 * spiral-galaxy.tsx is not `aria-hidden`, so a screen reader walks 180+ single
 * character spans; and spiral-animation.tsx runs its rAF loop regardless of
 * `prefers-reduced-motion` (spiral-galaxy honours the preference, its child
 * does not).
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The spiral is a heavy canvas moment — great with a mouse on a wide screen,
 * but a continuous starfield rAF is a poor, battery-hungry fit on touch
 * devices, and the sequence is composed for a landscape stage.
 *
 * Width alone was not enough: iPad Pro 12.9" in PORTRAIT is exactly 1024px
 * wide, so it passed a bare `min-width: 1024px` and got the whole thing.
 * Three conditions, all required:
 *   min-width  — enough room for the stage at all
 *   landscape  — excludes every tablet held upright, whatever its width
 *   hover/fine — excludes touch entirely (a touchscreen laptop still reports
 *                a fine pointer for its mouse, so those keep it)
 *
 * Kept as a component of its own because it is the only client state the home
 * page would need — HomeView itself stays a Server Component either way.
 */
export function SpiralStage({
  words,
  centerWords,
}: {
  words: string[]
  centerWords: string[]
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(
      '(min-width: 1024px) and (orientation: landscape) and (hover: hover) and (pointer: fine)',
    )
    const update = () => setShow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!show) return null
  return <SpiralGalaxy words={words} centerWords={centerWords} />
}
