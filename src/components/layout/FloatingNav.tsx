'use client'

import { useEffect, useRef, useState } from 'react'
import { RadiantNavbar } from './RadiantNavbar'
import type { LangOption } from '../ui/LangSwitcher'
import type { NavLink } from './SiteNav'

export interface FloatingNavProps {
  brandName: string
  links: NavLink[]
  langs: LangOption[]
  supportLabel?: string
  supportHref?: string
  /** CSS selector for the hero section that owns the "in-page" navbar. While any
   *  part of it is on screen the floating bar stays hidden (the in-hero navbar is
   *  already there); the bar only reveals once the hero has scrolled off. */
  heroSelector?: string
}

/**
 * The real RadiantNavbar — design untouched — re-rendered inside a fixed,
 * full-width liquid-glass bar. Reveal behaviour mirrors a "scroll-up navbar":
 *
 *   • hero in viewport            → hidden (the in-hero navbar is on screen)
 *   • hero scrolled off + scroll ↓ → hidden
 *   • hero scrolled off + scroll ↑ → slides in from the top
 *
 * The in-hero navbar is left exactly as it is. Glass + slide styling lives in
 * `.floatnav` (globals.css).
 */
export function FloatingNav({ heroSelector = '.precision-hero', ...nav }: FloatingNavProps) {
  const [shown, setShown] = useState(false)
  // Hero starts on screen (top of page), so the bar starts gated off.
  const heroInView = useRef(true)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    // Gate: while the hero intersects the viewport, force the bar hidden.
    const hero = document.querySelector(heroSelector)
    let io: IntersectionObserver | null = null
    if (hero) {
      io = new IntersectionObserver(
        ([entry]) => {
          heroInView.current = entry.isIntersecting
          if (entry.isIntersecting) setShown(false) // hero came back → hide at once
        },
        { threshold: 0 },
      )
      io.observe(hero)
    }

    const onScroll = () => {
      const y = window.scrollY
      const goingUp = y < lastY.current
      lastY.current = y

      // Never reveal while the hero (with its own navbar) is on screen.
      if (heroInView.current) {
        setShown(false)
        return
      }
      setShown(goingUp)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [heroSelector])

  return (
    <div className={`floatnav${shown ? ' floatnav-shown' : ''}`} aria-hidden={!shown}>
      <div className="floatnav-inner container">
        <RadiantNavbar {...nav} />
      </div>
    </div>
  )
}
