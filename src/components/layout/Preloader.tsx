'use client'

import { useEffect, useState } from 'react'

/**
 * Boot loader — a split "curtain". A bottom bar + percentage count up (synced to
 * the real page load, not a fake timer); at 100% the curtain parts on the centre
 * line — the left half (AYITI) slides left, the right half (DIJITAL) slides
 * right — revealing the hero beneath, which shares the same ground so the handoff
 * is seamless. Plays only on a genuine arrival (reload, or entry from off-site).
 */
let shownThisSession = false

/** True only for a reload or an entry from off-site. */
function isGenuineArrival(): boolean {
  const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
  if (nav?.type === 'reload') return true
  if (nav?.type === 'back_forward') return false
  try {
    return !document.referrer || new URL(document.referrer).origin !== window.location.origin
  } catch {
    return true
  }
}

// Fixed choreography (ms). The whole thing is time-based and guaranteed: the
// finish NEVER waits on `window.load`, asset decode or rAF, so a slow phone can
// no longer trap the curtain at 100%. Total ≈ FILL + HOLD + PART.
const FILL = 1200 // bar fills to 100%
const HOLD = 140 // beat at 100% before the curtain parts
const PART = 950 // curtain slide duration (CSS .pl-panel transition is .9s)

export function Preloader() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [parting, setParting] = useState(false)

  useEffect(() => {
    // The inline boot script may have painted a first-frame cover (`ad-booting`).
    const clearBoot = () => document.documentElement.classList.remove('ad-booting')

    if (shownThisSession || !isGenuineArrival()) {
      shownThisSession = true
      clearBoot() // not showing the loader → drop the cover now so the hero shows
      return
    }
    shownThisSession = true
    setVisible(true)

    // Hand the boot cover off to our own (opaque, same-wash) panels once they have
    // painted over it — two frames — so there is never a one-frame peek of the hero.
    const bootRaf = requestAnimationFrame(() => requestAnimationFrame(clearBoot))

    // Cosmetic bar fill via rAF — purely visual. If rAF is throttled the bar may
    // lag, but the finish below does not depend on it.
    const start = Date.now()
    let raf = 0
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / FILL) * 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Guaranteed finish — two absolute timers scheduled once, on mount. Even if
    // every rAF frame is dropped, these still fire and the loader unmounts.
    const tPart = setTimeout(() => setParting(true), FILL + HOLD)
    const tDone = setTimeout(() => setVisible(false), FILL + HOLD + PART)

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(bootRaf)
      clearTimeout(tPart)
      clearTimeout(tDone)
      clearBoot()
    }
  }, [])

  if (!visible) return null
  const pct = Math.min(100, Math.round(progress))

  return (
    <div id="preloader" data-parting={parting || undefined} aria-hidden="true">
      <div className="pl-panel pl-panel-left precision-grain">
        <span className="pl-word tahoe-glass-text">Ayiti</span>
      </div>
      <div className="pl-panel pl-panel-right precision-grain">
        <span className="pl-word tahoe-glass-text">Dijital</span>
      </div>
      <div className="pl-progress">
        <span className="pl-bar" style={{ transform: `scaleX(${pct / 100})` }} />
        <span className="pl-pct">{pct}%</span>
      </div>
    </div>
  )
}
