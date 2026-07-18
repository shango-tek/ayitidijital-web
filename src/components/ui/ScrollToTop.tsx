'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollToTopProps {
  label: string
}

/**
 * Vertical "back to top" affordance — an up-arrow sticker over a rotated label,
 * modelled on the reference footer button. Smooth-scrolls the page to the top.
 *
 * On phones the stylesheet turns this into a fixed button floating bottom-right
 * over the page (see `.kf-scrolltop` under `max-width:640px`). That is
 * deliberate, but it had no visibility rule, so it hung over the content from
 * the very first pixel of every page — including sitting on top of body copy —
 * and offered to scroll you to a top you were already at.
 *
 * `data-scrolled` is the fix: it goes true once you are a full screen down, and
 * ONLY the phone media query acts on it. Everywhere else this button is a normal
 * in-footer element and the attribute is inert, so nothing else changes.
 */
export function ScrollToTop({ label }: ScrollToTopProps) {
  const [scrolled, setScrolled] = useState(false)
  const isScrolled = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      // One viewport down: far enough that "back to top" is a real offer, and
      // early enough to be there when you want it.
      const next = window.scrollY > window.innerHeight
      // Runs on every scroll frame — only touch React state on a transition.
      if (next !== isScrolled.current) {
        isScrolled.current = next
        setScrolled(next)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      className="kf-scrolltop"
      data-scrolled={scrolled ? 'true' : 'false'}
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span className="kf-scrolltop-arrow" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M21.707 4.293L37.5 20 21.707 35.707l-1.414-1.414L33.584 21H6v-2h27.585L20.293 5.707z"
          />
        </svg>
      </span>
      <span className="kf-scrolltop-text">{label}</span>
    </button>
  )
}
