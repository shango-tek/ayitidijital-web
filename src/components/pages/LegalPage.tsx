'use client'

import type { ReactNode } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'

export interface LegalTocItem {
  id: string
  number: string
  title: string
}

/**
 * Shared shell for the two statutory documents (Impressum / privacy policy):
 * the dark {@link PageHeader} band, a sticky table of contents on the left, and
 * the numbered sections on the right. Deliberately plain and high-contrast —
 * these pages are read for reference, not browsed.
 */
export function LegalPage({
  eyebrow,
  h1,
  intro,
  lastUpdatedLabel,
  lastUpdatedValue,
  tocTitle,
  toc,
  children,
}: {
  eyebrow: string
  /** e.g. "Mentions légales." — the first word gets the outlined treatment. */
  h1: string
  intro: string
  lastUpdatedLabel: string
  lastUpdatedValue: string
  tocTitle: string
  toc: LegalTocItem[]
  children: ReactNode
}) {
  const bare = h1.replace(/\.\s*$/, '')
  const [strokeWord, ...rest] = bare.split(' ')
  const titleRest = rest.join(' ')

  return (
    <>
      <PageHeader label={eyebrow} strokeWord={strokeWord} titleRest={titleRest} subtitle={intro} />

      <div className="page-wrap">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft/70">
              {tocTitle}
            </p>
            <nav className="mt-4">
              <ol className="flex flex-col gap-2.5">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline gap-3 text-sm leading-snug text-ink-soft transition-colors hover:text-gold-deep"
                    >
                      <span className="font-mono text-[11px] text-gold-deep">{item.number}</span>
                      <span className="border-b border-transparent group-hover:border-gold-deep">
                        {item.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft/60">
              {lastUpdatedLabel}
              <span className="mt-1 block normal-case tracking-normal text-ink-soft">
                {lastUpdatedValue}
              </span>
            </p>
          </aside>

          {/* Document body */}
          <div className="legal-doc flex flex-col gap-12 lg:gap-14">{children}</div>
        </div>
      </div>
    </>
  )
}

/** One numbered section of a legal document. */
export function LegalSection({
  id,
  number,
  title,
  subtitle,
  children,
}: {
  id: string
  number: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-black/[0.08] pt-7">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-gold-deep">{number}</span>
        <h2 className="font-display text-xl font-bold leading-snug text-primary lg:text-2xl">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="mt-1 pl-9 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft/70">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-4 pl-0 sm:pl-9">{children}</div>
    </section>
  )
}

/** Body paragraph. Bare URLs in the text are linkified. */
export function LegalBody({ children }: { children: string }) {
  return <p className="max-w-3xl leading-relaxed text-ink-soft">{linkify(children)}</p>
}

/** Label/value pairs (publisher, contact …). */
export function LegalDl({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,11rem)_1fr]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft/70 sm:pt-0.5">
            {row.label}
          </dt>
          <dd className="font-medium text-primary">{linkify(row.value)}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Turn bare URLs and e-mail addresses in legal copy into real links, without
 * altering the wording itself.
 */
function linkify(text: string): ReactNode {
  const parts = text.split(/(https?:\/\/[^\s,)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-deep underline underline-offset-2 hover:text-primary"
        >
          {part}
        </a>
      )
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="font-medium text-gold-deep underline underline-offset-2 hover:text-primary"
        >
          {part}
        </a>
      )
    }
    return part
  })
}
