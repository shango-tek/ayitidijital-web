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
 * KEEP IN SYNC with the `spiral:` custom variant in globals.css, which moves
 * the warm SectionPanel between EcosystemCarousel and DomainesGrid depending
 * on whether this section is here to break the page.
 *
 * This is the only reason the home page needs any client state at all, which
 * is why it is a component of its own rather than a flag on HomeView.
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
