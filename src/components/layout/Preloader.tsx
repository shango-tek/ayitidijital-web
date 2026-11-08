'use client'

import { useEffect, useRef, useState } from 'react'

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

export function Preloader() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [parting, setParting] = useState(false)
  // Progress is driven from a ref so the rAF loop reads/writes a plain value and
  // terminates cleanly at 100 — never a side-effect inside a state updater (which
  // React's StrictMode double-invokes, which is what stalled the old loop).
  const progressRef = useRef(0)

  useEffect(() => {
    if (shownThisSession || !isGenuineArrival()) {
      shownThisSession = true
      return
    }
    setVisible(true)

    const start = Date.now()
    const MIN = 900
    let loaded = document.readyState === 'complete'
    const onLoad = () => {
      loaded = true
    }
    if (!loaded) window.addEventListener('load', onLoad)

    let raf = 0
    const loop = () => {
      const elapsed = Date.now() - start
      // Ready once the document has loaded AND the minimum display has passed —
      // with a hard safety cap so a stalled asset can never trap the loader.
      const ready = (loaded && elapsed >= MIN) || elapsed >= 3500
      const target = ready ? 100 : 92
      const prev = progressRef.current
      // Ease toward the target; the +0.6 floor guarantees forward motion, Math.min
      // stops any overshoot. While loading it rests at 92, then climbs to 100.
      const next = Math.min(target, prev + (target - prev) * 0.08 + 0.6)
      progressRef.current = next
      setProgress(next)
      if (next < 100) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Hard safety: even if rAF is throttled or paused (a backgrounded tab), force
    // the finish via a plain timer so the curtain can never stay stuck.
    const safety = setTimeout(() => {
      progressRef.current = 100
      setProgress(100)
    }, 3800)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // At 100%: hold a beat, part the curtain, then unmount once it has finished.
  // Guarded by a ref and NOT re-run on `parting`. The old version listed `parting`
  // as a dependency, so flipping it re-ran this effect — and the cleanup cleared
  // the pending unmount timer. The curtain parted but `setVisible(false)` never
  // fired, leaving the fixed #preloader over the page forever (the seam you saw).
  const finished = useRef(false)
  useEffect(() => {
    if (progress < 99.9 || finished.current) return
    finished.current = true
    const t1 = setTimeout(() => setParting(true), 200)
    const t2 = setTimeout(() => {
      shownThisSession = true
      setVisible(false)
    }, 200 + 950)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [progress])

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
