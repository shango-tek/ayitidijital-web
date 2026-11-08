'use client'

import { useEffect } from 'react'

/**
 * Scroll-reveal micro-animations (inspired by sui.io's GSAP/ScrollTrigger reveals,
 * done here with a single IntersectionObserver — no new dependency).
 *
 * Each homepage section below the hero fades in as it enters the viewport, and its
 * headings rise a touch. Deliberately conservative:
 *
 *  - It is purely additive and JS-gated. On the server, with JS disabled, or under
 *    `prefers-reduced-motion`, nothing is hidden — the content renders normally.
 *    The hidden-then-revealed state only exists once this runs and adds `js-fx`.
 *  - Sections keep their own background; only opacity animates on the section box
 *    (transform is limited to headings), so a coloured section never leaves a gap
 *    as it rises.
 *  - Anything already in view on mount is revealed immediately (no first-paint
 *    flash); only below-the-fold sections wait for the observer.
 */
export function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement
    // Respect reduced-motion: leave everything visible, do nothing.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const main = document.getElementById('main')
    if (!main) return

    // Reveal targets: each top-level section except the hero (which has its own
    // entrance + the preloader hand-off).
    const targets = Array.from(main.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement &&
        el.tagName === 'SECTION' &&
        !el.classList.contains('precision-hero'),
    )
    if (targets.length === 0) return

    // Enable the CSS reveal rules only now that JS is driving them.
    root.classList.add('js-fx')
    for (const el of targets) el.setAttribute('data-reveal', '')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-shown', '')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    // Reveal what's already on screen immediately (no flash); observe the rest.
    const vh = window.innerHeight
    for (const el of targets) {
      if (el.getBoundingClientRect().top < vh * 0.9) {
        el.setAttribute('data-shown', '')
      } else {
        io.observe(el)
      }
    }

    return () => io.disconnect()
  }, [])

  return null
}
