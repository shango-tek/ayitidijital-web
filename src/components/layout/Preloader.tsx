'use client'

import { useEffect, useState } from 'react'

/**
 * Boot preloader — the growing brand spiral shown while the app first loads.
 *
 * Plays on a genuine arrival only: a reload, or a first entry from outside the
 * site. It must NOT play when moving between our own pages.
 *
 * A module-level flag isn't enough on its own, because several internal links
 * are still plain <a> (footer, mobile menu, the footer and mobile menu) rather than next/link — so
 * those navigations are real browser loads that reboot the app and reset any
 * module state. Hence the Navigation Timing check below, which distinguishes a
 * reload from a same-origin navigation even across a full document load.
 */
let shownThisSession = false

/** True only for a reload or an entry from off-site. */
function isGenuineArrival(): boolean {
  const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]

  // Explicit reload ("neu laden") — always show.
  if (nav?.type === 'reload') return true
  // Back/forward through history is not an arrival.
  if (nav?.type === 'back_forward') return false

  // Plain 'navigate': ours if the referrer is same-origin, i.e. an internal
  // link that happened to do a full load — skip. No referrer (typed URL,
  // bookmark, external site) counts as arriving.
  try {
    return !document.referrer || new URL(document.referrer).origin !== window.location.origin
  } catch {
    return true
  }
}

export function Preloader() {
  // Pessimistic on the server and on first paint: assume no preloader, then opt
  // in from the effect once we can read Navigation Timing. Rendering it and
  // hiding it would flash the spiral on internal navigations.
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (shownThisSession || !isGenuineArrival()) {
      shownThisSession = true
      return
    }

    setVisible(true)

    const MIN = 1950
    const start = Date.now()
    let fadeTimer: ReturnType<typeof setTimeout>
    let doneTimer: ReturnType<typeof setTimeout>

    const finish = () => {
      const wait = Math.max(0, MIN - (Date.now() - start))
      fadeTimer = setTimeout(() => {
        setFading(true)
        doneTimer = setTimeout(() => {
          shownThisSession = true
          setVisible(false)
        }, 650)
      }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish)
    const safety = setTimeout(finish, 3500)

    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      clearTimeout(safety)
    }
  }, [])

  if (!visible) return null

  return (
    <div id="preloader" data-fade={fading || undefined} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/mark-animated.svg" alt="" />
    </div>
  )
}
