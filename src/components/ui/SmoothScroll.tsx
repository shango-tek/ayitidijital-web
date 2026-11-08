'use client'

import { useEffect } from 'react'

/**
 * Reliable in-page anchor scrolling.
 *
 * The hero scroll-arrow and the section anchors (`<a href="#apropo">`, etc.)
 * relied on CSS `scroll-behavior: smooth` alone — which iOS Safari treats as a
 * no-op for anchor navigation, so tapping them changed the URL hash but never
 * scrolled. This delegates clicks on same-page hash links to `scrollIntoView`,
 * which scrolls everywhere (smooth where supported, instant where not), honours
 * reduced-motion, and keeps the hash in the URL.
 *
 * Document-level delegation covers links rendered anywhere, including ones added
 * after hydration. Only links whose target id actually exists are intercepted,
 * so bare `#` toggles and unrelated handlers are left alone.
 */
export function SmoothScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }
      const target = event.target as Element | null
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (href.length < 2) return // a bare "#" is not a scroll target

      let id: string
      try {
        id = decodeURIComponent(href.slice(1))
      } catch {
        id = href.slice(1)
      }
      const el = document.getElementById(id)
      if (!el) return

      event.preventDefault()
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      try {
        history.pushState(null, '', href)
      } catch {
        /* pushState can throw in rare sandboxes — the scroll already happened */
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
