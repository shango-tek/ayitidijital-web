'use client'

import { useEffect, useState } from 'react'
import { RadiantNavbar } from './RadiantNavbar'
import type { LangOption } from '../ui/LangSwitcher'
import type { NavLink } from './SiteNav'

export interface FloatingNavProps {
  brandName: string
  links: NavLink[]
  langs: LangOption[]
  supportLabel?: string
  supportHref?: string
  /** Scroll distance (px) after which the floating bar fades in — set to the
   *  in-hero navbar's bottom edge so it appears exactly as that nav scrolls off. */
  appearAfter?: number
}

/**
 * The real RadiantNavbar — design untouched — re-rendered inside a fixed,
 * full-width liquid-glass bar that slides in once the page is scrolled past the
 * hero. It stays pinned at the top (same position); the in-hero navbar is left
 * exactly as it is. Glass styling lives in `.floatnav` (globals.css).
 */
export function FloatingNav({ appearAfter = 120, ...nav }: FloatingNavProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > appearAfter)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [appearAfter])

  return (
    <div className={`floatnav${shown ? ' floatnav-shown' : ''}`} aria-hidden={!shown}>
      <div className="floatnav-inner container">
        <RadiantNavbar {...nav} />
      </div>
    </div>
  )
}
