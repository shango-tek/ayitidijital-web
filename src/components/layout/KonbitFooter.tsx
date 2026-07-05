'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PlusGrid, PlusGridItem, PlusGridRow } from '../ui/PlusGrid'
import { LanbiMark } from '../brand/LanbiMark'
import { SocialIcon } from '../brand/SocialIcon'
import type { SitemapColumn, SocialLink } from './SitemapFooter'
import type { KonbitFooterContent } from '@/content/site'

export interface KonbitFooterProps {
  id?: string
  brandName: string
  content: KonbitFooterContent
  /** Sitemap columns shown in the right card (reuses the footer sitemap). */
  columns: SitemapColumn[]
  copyright: string
  socials: SocialLink[]
  /** Reuses the newsletter strings for the inline subscribe. */
  subscribe: { placeholder: string; button: string; done: string }
  /** Mission marquee rendered along the top of the card. */
  marquee: ReactNode
}

const LuckyArrow = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 20 C 6 14, 10 9, 18 5" />
    <path d="M18 5 L 12 5" />
    <path d="M18 5 L 18 11" />
  </svg>
)

/** Arrow / check glyphs for the compact subscribe button (icon-only, more room for the field). */
const SubmitArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const SubmitCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Ambient Lanbi phyllotaxis field on the navy card — a self-contained,
 * slowly-rotating canvas that stands in for the marketing footer's video.
 */
function KonbitCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext('2d')
    if (!cv || !ctx) return
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const COUNT = 1600
    const GOLDEN = Math.PI * (3 - Math.sqrt(5))
    let W = 0
    let H = 0
    let dots: { x: number; y: number; r: number; red: boolean }[] = []
    let rot = 0
    let raf = 0
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches

    const build = () => {
      W = cv.clientWidth
      H = cv.clientHeight
      if (!W || !H) return
      cv.width = W * DPR
      cv.height = H * DPR
      const maxR = Math.max(W, H) * 0.7
      const sp = maxR / Math.sqrt(COUNT)
      dots = []
      for (let i = 0; i < COUNT; i++) {
        const a = i * GOLDEN
        const r = sp * Math.sqrt(i)
        dots.push({ x: r * Math.cos(a), y: r * Math.sin(a), r: 0.6 + 2.1 * (i / COUNT), red: i % 8 === 0 })
      }
    }
    const draw = () => {
      if (!W || !H) return
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const cx = W * 0.66
      const cy = H * 0.42
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const x = cx + d.x * cos - d.y * sin
        const y = cy + d.x * sin + d.y * cos
        ctx.beginPath()
        ctx.fillStyle = d.red ? 'rgba(210,16,52,0.55)' : 'rgba(169,186,240,0.42)'
        ctx.arc(x, y, d.r, 0, 6.2832)
        ctx.fill()
      }
    }
    const loop = () => {
      rot += 0.0008
      draw()
      raf = requestAnimationFrame(loop)
    }

    build()
    if (reduce) draw()
    else loop()

    const ro = new ResizeObserver(() => {
      build()
      draw()
    })
    ro.observe(cv)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])
  return <canvas ref={ref} className="kf-canvas" aria-hidden="true" />
}

/**
 * Self-contained footer card: a rounded radiant panel holding the mission
 * marquee, a full-width PlusGrid line, the two-card Konbit layout (navy spiral
 * + light sitemap/CTA), a second PlusGrid line with copyright + socials, and
 * the big stroke wordmark below.
 */
export function KonbitFooter({ id, brandName, content, columns, copyright, socials, subscribe, marquee }: KonbitFooterProps) {
  const [done, setDone] = useState(false)
  // Legal (the last column) also renders in the bottom bar; CSS shows it there on
  // desktop/tablet and keeps it in the sitemap grid on mobile (leave mobile as-is).
  const legal = columns[columns.length - 1]

  return (
    <section className="kf-section" id={id}>
      <div className="kf-frame">
        <div className="kf-card">
          <div className="kf-card-inner">
            {/* Mission marquee along the top */}
            <div className="kf-marquee">{marquee}</div>

            <PlusGrid className="kf-grid">
              {/* Row 1 — the two cards (top line sits under the marquee) */}
              <PlusGridRow>
                <PlusGridItem className="kf-cards-item">
                  {/* two extra plus-marks on this top line: one at the start of
                      the navy card, one in the gutter between the two cards */}
                  <svg className="kf-plus kf-plus-a" viewBox="0 0 15 15" aria-hidden="true">
                    <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z" />
                  </svg>
                  <svg className="kf-plus kf-plus-b" viewBox="0 0 15 15" aria-hidden="true">
                    <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z" />
                  </svg>
                  <div className="kf-wrapper">
                    {/* LEFT — navy spiral card */}
                    <div className="kf-left">
                      <KonbitCanvas />
                      <div className="kf-logo">
                        <span className="kf-logo-mark">
                          <LanbiMark size={28} light />
                        </span>
                        <span className="kf-logo-name">{brandName}</span>
                      </div>
                      <p className="kf-tagline">
                        {content.tagline.lead}
                        <br />
                        <span>{content.tagline.muted}</span>
                      </p>
                      <div className="kf-social-row">
                        <span className="kf-social-label">{content.socialLabel}</span>
                        <div className="kf-social-icons">
                          {socials.map((s) => (
                            <a
                              key={s.label}
                              className="kf-social-icon"
                              href={s.href}
                              target="_blank"
                              rel="noopener"
                              aria-label={s.label}
                            >
                              <SocialIcon icon={s.icon} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT — light sitemap + wide CTA card */}
                    <div className="kf-right">
                      <div className="kf-lucky" aria-hidden="true">
                        <div className="kf-cube">
                          <LanbiMark size={62} light className="kf-cube-mark" />
                        </div>
                        <div className="kf-lucky-row">
                          <span className="kf-lucky-arrow">
                            <LuckyArrow />
                          </span>
                          <span className="kf-lucky-text">{content.luckyText}</span>
                        </div>
                      </div>

                      <div className="kf-nav-cols">
                        {columns.map((col, i) => (
                          <div className="kf-col" key={i}>
                            <div className="kf-col-title">{col.heading}</div>
                            {col.links.map((l, j) => (
                              <a key={j} href={l.href} rel={l.external ? 'noopener' : undefined}>
                                {l.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="kf-cta">
                        <h4>
                          {content.ctaLead}
                          <br />
                          <strong>{content.ctaStrong}</strong>
                        </h4>
                        <form
                          className="kf-subscribe"
                          suppressHydrationWarning
                          onSubmit={(e) => {
                            e.preventDefault()
                            setDone(true)
                          }}
                        >
                          <input
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            suppressHydrationWarning
                            placeholder={subscribe.placeholder}
                            aria-label={subscribe.placeholder}
                          />
                          <button
                            type="submit"
                            className="kf-subscribe-btn"
                            disabled={done}
                            aria-label={done ? subscribe.done : subscribe.button}
                            title={done ? subscribe.done : subscribe.button}
                          >
                            {/* text on desktop/tablet, arrow-only on phones (CSS-toggled) */}
                            <span className="kf-btn-label">{done ? subscribe.done : subscribe.button}</span>
                            <span className="kf-btn-icon" aria-hidden="true">{done ? <SubmitCheck /> : <SubmitArrow />}</span>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </PlusGridItem>
              </PlusGridRow>

              {/* Row 2 — copyright (left) + Haitian proverb (right, where the
                  duplicate socials used to sit); both keep their plus-marks */}
              <PlusGridRow className="kf-bottom">
                <div>
                  <PlusGridItem className="kf-copy-item">
                    <div className="kf-copyright">{copyright}</div>
                  </PlusGridItem>
                </div>
                {/* Legal links, moved out of the sitemap into the bottom bar's middle */}
                {legal && (
                  <nav className="kf-legal" aria-label={legal.heading}>
                    {legal.links.map((l, j) => (
                      <a key={j} href={l.href} rel={l.external ? 'noopener' : undefined}>
                        {l.label}
                      </a>
                    ))}
                  </nav>
                )}
                <div className="kf-proverb-wrap">
                  <PlusGridItem className="kf-proverb-item">
                    <span className="kf-proverb">{content.proverb}</span>
                  </PlusGridItem>
                </div>
              </PlusGridRow>
            </PlusGrid>

          </div>
        </div>
      </div>
    </section>
  )
}
