'use client'

import { useEffect, useState } from 'react'

/**
 * Boot preloader — the growing brand spiral shown while the app first loads.
 *
 * Rendered by React (NOT an inline <script>, which Next never re-executes on
 * the client) and gated by a module-level flag: once it has played this
 * session, client-side navigations — e.g. switching language — skip it
 * entirely. It therefore appears only on a genuine page load, never on a
 * locale change. Visibility is driven by React state + a `data-fade`
 * attribute, so it doesn't depend on an imperative <body> class that React
 * wipes when the locale layout re-renders.
 */
let shownThisSession = false

export function Preloader() {
  const [visible, setVisible] = useState(!shownThisSession)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (shownThisSession) {
      setVisible(false)
      return
    }

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
      <img src="/mark-animated.svg" alt="" />
    </div>
  )
}
