'use client'

import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

export interface HoverMenuProps {
  /** Trigger content (label + chevron / icon). */
  trigger: ReactNode
  /** Panel content (links / options). */
  children: ReactNode
  /** Which edge the panel aligns to. */
  align?: 'left' | 'right'
  className?: string
  triggerAriaLabel?: string
}

/**
 * Hover- and focus-activated dropdown with a floating panel. The panel is a
 * child of the wrapper (with a padding "bridge") so moving the pointer from
 * trigger to panel keeps it open. Closes on a short delay to avoid flicker.
 */
export function HoverMenu({ trigger, children, align = 'left', className, triggerAriaLabel }: HoverMenuProps) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const openNow = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    timer.current = setTimeout(() => setOpen(false), 90)
  }

  return (
    <div
      className={`hm ${className ?? ''}`.trim()}
      data-open={open || undefined}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button type="button" className="hm-trigger" aria-haspopup="true" aria-expanded={open} aria-label={triggerAriaLabel}>
        {trigger}
      </button>
      {open && (
        <div className="hm-panel" data-align={align}>
          <div className="hm-panel-inner" role="menu">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
