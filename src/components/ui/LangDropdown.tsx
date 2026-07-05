'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from '../i18n/LocaleProvider'
import type { LangOption } from './LangSwitcher'
import { switchLocalePath, type Locale } from '../../i18n'

export interface LangDropdownProps {
  options: LangOption[]
  ariaLabel?: string
}

/**
 * Language selector as a dropdown (button + menu), styled to sit inside a
 * Radiant nav cell. Selecting an option swaps the locale in place via the
 * locale context (no navigation). Closes on outside-click and Escape.
 */
export function LangDropdown({ options, ariaLabel = 'Chwazi lang ou' }: LangDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { locale: active, setLocale } = useLocale()

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const cur = options.find((o) => o.code === active) ?? options[0]

  return (
    <div className="lang-dd" ref={ref} data-open={open ? 'true' : undefined}>
      <button
        type="button"
        className="lang-dd-btn"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {cur.label}
        <svg className="lang-dd-chev" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="lang-dd-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((o) => (
            <li key={o.code} role="option" aria-selected={o.code === active}>
              <a
                href={pathname ? switchLocalePath(pathname, o.code as Locale) : `/${o.code}`}
                lang={o.lang}
                className={o.code === active ? 'is-current' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  setLocale(o.code as Locale)
                  setOpen(false)
                }}
              >
                <span>{o.name ?? o.label}</span>
                <span className="lang-dd-code">{o.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
