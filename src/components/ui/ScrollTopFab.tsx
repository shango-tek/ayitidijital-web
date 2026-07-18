'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollTopFabProps {
  /** Section to clear before the button appears — the last one that still counts
   *  as "near the top". Named rather than counted so reordering sections can't
   *  silently move the trigger. */
  afterId: string
  label: string
}

/**
 * Floating back-to-top, tablet-portrait only.
 *
 * A tablet held upright shows roughly one section per screen, so the walk back
 * to the top is long — but the phone layout is short enough not to need this and
 * the desktop has the floating nav, so the button is gated to that one shape via
 * `tablet-portrait:` rather than rendered everywhere.
 *
 * It appears once `afterId` has scrolled fully past the top of the viewport, and
 * disappears again as soon as the footer comes into view — the footer carries its
 * own back-to-top, and two of them on screen at once is one too many.
 *
 * Always in the DOM, shown/hidden with CSS + opacity rather than mounted on a
 * media-query state, so there is no hydration flash and `display: none` keeps it
 * out of the tab order everywhere it does not apply.
 */
export function ScrollTopFab({ afterId, label }: ScrollTopFabProps) {
  const [show, setShow] = useState(false)
  const shown = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const gate = document.getElementById(afterId)
      if (!gate) return
      const footer = document.getElementById('flickering-footer')
      const past = gate.getBoundingClientRect().bottom < 0
      const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight : false
      const next = past && !footerInView
      // Only touch state on an actual transition — this runs on every scroll frame.
      if (next !== shown.current) {
        shown.current = next
        setShow(next)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [afterId])

  return (
    <button
      type="button"
      aria-label={label}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-[0_18px_40px_-18px_rgba(10,20,60,0.7)] transition-all duration-300 hover:bg-gold hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold tablet-portrait:grid ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
