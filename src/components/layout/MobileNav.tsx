'use client'

import { useEffect, useRef, useState } from 'react'
import { LanbiMark } from '../brand/LanbiMark'
import { SocialIcon } from '../brand/SocialIcon'
import { Button } from '../ui/Button'
import { PlusGrid, PlusGridRow, PlusGridItem } from '../ui/PlusGrid'
import { useLocale } from '../i18n/LocaleProvider'
import { langs } from '@/content/site'
import type { Locale } from '@/i18n'

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M2 6h20v2H2zM2 16h20v2H2z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
    <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
  </svg>
)

const Chevron = () => (
  <svg className="mnav-chev" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Language dropdown — rendered both in the closed bar (left of ☰, always visible)
 * and the open panel header. Each instance owns its open-state + outside-click
 * handling; the glass panel matches the desktop switcher.
 */
function LangDropdown() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const cur = langs.find((o) => o.code === locale) ?? langs[0]

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="mnav-lang" ref={ref} data-open={open ? 'true' : undefined}>
      <button
        type="button"
        className="mnav-langtrigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Chwazi lang"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{cur.label}</span>
        <Chevron />
      </button>
      {open && (
        <ul className="mnav-langmenu" role="listbox" aria-label="Lang">
          {langs.map((o) => (
            <li key={o.code} role="option" aria-selected={o.code === locale}>
              <button
                type="button"
                lang={o.lang}
                className={o.code === locale ? 'is-current' : undefined}
                onClick={() => {
                  setLocale(o.code as Locale)
                  setOpen(false)
                }}
              >
                <span>{o.name ?? o.label}</span>
                <span className="mnav-langcode">{o.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * Mobile / tablet navigation (< 1024px) — a faithful port of the Tailwind Plus
 * "Studio" RootLayout menu:
 *   • a floating CLOSED bar (logo + ☰) and the panel's own OPEN header
 *     (logo + ✕) sit at the exact same position, so the logo holds still and
 *     ☰ morphs to ✕ in place (the panel, z-50, covers the closed bar, z-40);
 *   • the navy PANEL animates height 0 → auto (CSS grid-rows) in normal flow,
 *     pushing the rounded-top content card (the whole page) down to reveal it.
 */
export function MobileNav() {
  const { content, locale } = useLocale()
  const [open, setOpen] = useState(false)
  const [openSubs, setOpenSubs] = useState<Set<string>>(() => new Set())
  const followLabel = locale === 'fr' ? 'Suivez-nous' : locale === 'en' ? 'Follow us' : 'Swiv nou'
  const close = () => setOpen(false)
  const toggleSub = (href: string) =>
    setOpenSubs((prev) => {
      const next = new Set(prev)
      if (next.has(href)) next.delete(href)
      else next.add(href)
      return next
    })

  return (
    <div className={`mnav${open ? ' mnav-open' : ''}`}>
      {/* CLOSED bar — floats over the content card; inert while open (the panel
          header takes over at the same spot). The PlusGrid draws the same
          double-hairline + corner plus-marks as the desktop navbar. */}
      <div className="mnav-bar" aria-hidden={open ? 'true' : undefined} inert={open ? true : undefined}>
        <div className="container">
          <PlusGrid>
            <PlusGridRow className="mnav-pgrow">
              {/* wrapper makes the item :first-child (like desktop's .rn-left), so
                  the left-edge plus-marks render too — not just the right ones */}
              <div className="mnav-pgleft">
                <PlusGridItem className="mnav-pgitem">
                  <div className="mnav-row">
                    <a href="#top" className="mnav-logo" aria-label={content.brandName} onClick={close}>
                      <LanbiMark size={44} />
                      <span className="mnav-brand">{content.brandName}</span>
                    </a>
                    <div className="mnav-actions">
                      <LangDropdown />
                      <button
                        type="button"
                        className="mnav-toggle"
                        aria-label="Ouvri meni"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                      >
                        <MenuIcon />
                      </button>
                    </div>
                  </div>
                </PlusGridItem>
              </div>
            </PlusGridRow>
          </PlusGrid>
        </div>
      </div>

      {/* PANEL — grows in flow, pushing the content card down. */}
      <div className="mnav-panel">
        <div className="mnav-panel-inner">
          <div className="mnav-panel-content" inert={open ? undefined : true}>
            {/* OPEN header — same PlusGrid frame as the closed bar (light-on-navy),
                so the line + plus marks stay when the menu is open. `mnav-head`
                lifts it above the menu so the language dropdown catches clicks
                (the PlusGrid row's `isolation` would otherwise trap it below). */}
            <div className="mnav-head container">
              <PlusGrid>
                <PlusGridRow className="mnav-pgrow">
                  <div className="mnav-pgleft">
                    <PlusGridItem className="mnav-pgitem">
                      <div className="mnav-row">
              <a href="#top" className="mnav-logo" aria-label={content.brandName} onClick={close}>
                <LanbiMark light size={44} />
                <span className="mnav-brand">{content.brandName}</span>
              </a>
              <div className="mnav-actions">
                <LangDropdown />
                <button
                  type="button"
                  className="mnav-toggle"
                  aria-label="Fèmen meni"
                  aria-expanded={open}
                  onClick={() => setOpen(false)}
                >
                  <XIcon />
                </button>
              </div>
                      </div>
                    </PlusGridItem>
                  </div>
                </PlusGridRow>
              </PlusGrid>
            </div>

            {/* Line-separated menu cells — 1 column on phone, 2 on tablet
                (Studio-style). "Sou nou" carries its sub-links. */}
            <nav className="mnav-menu" aria-label="Navigasyon">
              <ul className="mnav-list">
                {content.navLinks.map((l) => {
                  const kids = l.children && l.children.length > 0 ? l.children : null
                  const subOpen = openSubs.has(l.href)
                  return (
                    <li key={l.href} className="mnav-cell">
                      <div className="mnav-cellhead">
                        {/* the label always navigates; a separate chevron toggles the
                            sub-links (accordion), so the overview page stays reachable */}
                        <a href={l.href} className="mnav-link" onClick={close}>
                          <span>{l.label}</span>
                          {!kids && (
                            <svg className="mnav-link-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </a>
                        {kids && (
                          <button
                            type="button"
                            className="mnav-subtoggle"
                            aria-expanded={subOpen}
                            aria-label={l.label}
                            onClick={() => toggleSub(l.href)}
                          >
                            <Chevron />
                          </button>
                        )}
                      </div>
                      {kids && (
                        <div className={`mnav-subwrap${subOpen ? ' is-open' : ''}`}>
                          <div className="mnav-subinner">
                            <div className="mnav-sub">
                              {kids.map((c) => (
                                <a key={c.href} href={c.href} className="mnav-sublink" onClick={close}>
                                  {c.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Foot — support CTA, then a Studio-style "Follow us" social row. */}
            <div className="mnav-foot container">
              <Button variant="red" pill href="#support" className="mnav-support-btn">
                {content.supportLabel}
              </Button>
              <div className="mnav-follow">
                <h2 className="mnav-follow-title">{followLabel}</h2>
                <ul className="mnav-social">
                  {content.footerSocials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener"
                        aria-label={s.label}
                        className="mnav-social-link"
                      >
                        <SocialIcon icon={s.icon} className="mnav-social-ico" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
