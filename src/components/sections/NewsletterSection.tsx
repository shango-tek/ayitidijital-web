'use client'

import { useState } from 'react'
import { LanbiMark } from '../brand/LanbiMark'
import type { NewsletterContent } from '@/content/site'

export interface NewsletterSectionProps {
  id?: string
  content: NewsletterContent
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Full-bleed navy newsletter block placed just before the footer — big
 * editorial heading on the left, name + email form on the right, one red
 * accent on the submit. Adapted to the espiral brand. The submit is a mock
 * (no backend yet) — wire it to a real provider (Mailchimp / Buttondown…).
 */
export function NewsletterSection({ id = 'enfolet', content }: NewsletterSectionProps) {
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    if (!email) return
    // TODO: POST to a real newsletter service.
    setDone(true)
  }

  return (
    <section id={id} className="ns" aria-labelledby="ns-title">
      <LanbiMark size={560} className="ns-watermark" />
      <div className="ns-inner container">
        <div className="ns-copy">
          <div className="ns-head">
            <LanbiMark size={50} className="ns-logo" />
            <span className="ns-rule" aria-hidden="true" />
            <span className="ns-kicker">{content.kicker}</span>
          </div>
          <h2 id="ns-title" className="ns-title">
            {content.title}
          </h2>
          <p className="ns-body">
            {content.body}{' '}
            <a className="ns-privacy" href={content.privacy.href}>
              {content.privacy.label}
            </a>
          </p>
        </div>

        <div className="ns-formwrap">
          {done ? (
            <p className="ns-done" role="status">
              <span className="ns-done-ico" aria-hidden="true">
                <ArrowIcon />
              </span>
              {content.confirm}
            </p>
          ) : (
            <form className="ns-form" onSubmit={handleSubmit} suppressHydrationWarning>
              <div className="ns-row">
                <label className="ns-field">
                  <span className="ns-label">{content.firstName.label}</span>
                  <input
                    name="firstName"
                    className="ns-input"
                    suppressHydrationWarning
                    placeholder={content.firstName.placeholder}
                    autoComplete="given-name"
                  />
                </label>
                <label className="ns-field">
                  <span className="ns-label">{content.lastName.label}</span>
                  <input
                    name="lastName"
                    className="ns-input"
                    suppressHydrationWarning
                    placeholder={content.lastName.placeholder}
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label className="ns-field">
                <span className="ns-label">{content.email.label}</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="ns-input"
                  suppressHydrationWarning
                  placeholder={content.email.placeholder}
                  autoComplete="email"
                />
              </label>
              <p className="ns-consent">{content.consent}</p>
              <button type="submit" className="ns-cta">
                <span className="ns-cta-ico" aria-hidden="true">
                  <ArrowIcon />
                </span>
                <span className="ns-cta-label">{content.button}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
