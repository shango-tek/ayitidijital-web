'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import type { LegalBlock, LegalDoc } from '@/content/legal'

/**
 * Shell for the two statutory documents (Impressum / privacy policy).
 *
 * Deliberately the quietest layout on the site: the dark {@link PageHeader}
 * band with NO photo (these pages must not make a third-party image request —
 * see the privacy policy's own "no third-party content" claim), a sticky
 * horizontal section nav that tracks scroll, an oversized lead, then numbered
 * sections in a single narrow measure. These pages are consulted for reference,
 * not browsed, so nothing here competes with the text.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const bare = doc.h1.replace(/\.\s*$/, '')
  const [strokeWord, ...rest] = bare.split(' ')
  const [active, setActive] = useState(doc.sections[0]?.id ?? '')

  // Scroll-spy: highlight the section nearest the top of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      // Band across the upper third: a section is "active" once its heading
      // clears the sticky nav but before it leaves the top of the screen.
      { rootMargin: '-96px 0px -66% 0px', threshold: 0 },
    )
    for (const s of doc.sections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [doc.sections])

  return (
    <>
      <PageHeader label={doc.eyebrow} strokeWord={strokeWord} titleRest={rest.join(' ')} />

      {/* Section nav — horizontal, sticky, scrolls on narrow screens */}
      <nav
        aria-label={doc.tocTitle}
        className="sticky top-0 z-30 border-b border-black/[0.07] bg-white/85 backdrop-blur-md"
      >
        <ol className="mx-auto flex max-w-[64rem] gap-1 overflow-x-auto px-5 py-3 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {doc.sections.map((s) => {
            const on = active === s.id
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={[
                    'inline-flex items-baseline gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors',
                    on
                      ? 'bg-primary text-white'
                      : 'text-ink-soft hover:bg-black/[0.04] hover:text-primary',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'font-mono text-[10px]',
                      on ? 'text-gold' : 'text-gold-deep',
                    ].join(' ')}
                  >
                    {s.number}
                  </span>
                  {s.title}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="mx-auto max-w-[64rem] px-5 pb-24 pt-14 md:px-10 lg:pb-32 lg:pt-20">
        {/* Oversized lead — the one piece of display type on the page */}
        <p className="max-w-3xl font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.35] tracking-tight text-primary">
          {doc.lead}
        </p>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/60">
          {doc.lastUpdatedLabel}
          <span className="ml-2 normal-case tracking-normal text-ink-soft">
            {doc.lastUpdatedValue}
          </span>
        </p>

        <div className="mt-16 flex flex-col gap-14 lg:mt-20 lg:gap-16">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-black/[0.08] pt-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-gold-deep">{s.number}</span>
                <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-primary lg:text-2xl">
                  {s.title}
                </h2>
              </div>
              {s.subtitle ? (
                // NOT uppercased: these carry statute citations whose casing is
                // meaningful ("MStV", "DDG", "RGPD") — text-transform would
                // render "§ 18 al. 2 MStV" as "§ 18 AL. 2 MSTV".
                <p className="mt-1 pl-8 font-mono text-[11px] tracking-[0.06em] text-ink-soft/70">
                  {s.subtitle}
                </p>
              ) : null}

              <div className="mt-5 flex flex-col gap-5 sm:pl-8">
                {s.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'text':
      return <p className="max-w-2xl leading-relaxed text-ink-soft">{linkify(block.body)}</p>

    case 'note':
      return (
        <p className="max-w-2xl border-l-2 border-gold-deep/35 pl-4 text-sm leading-relaxed text-ink-soft">
          {linkify(block.body)}
        </p>
      )

    case 'dl':
      return (
        <dl className="grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,10rem)_1fr]">
          {block.rows.map((row) => (
            <div key={row.label} className="contents">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft/70 sm:pt-1">
                {row.label}
              </dt>
              <dd className="font-medium text-primary">{linkify(row.value)}</dd>
            </div>
          ))}
        </dl>
      )

    case 'points':
      return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((p) => (
            <li key={p.title} className="rounded-card border border-black/[0.08] bg-[#F8FAFD] p-5">
              <p className="font-display font-bold leading-snug text-primary">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ul>
      )

    case 'email':
      return (
        <a
          href={`mailto:${block.value}`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 font-display text-sm font-bold text-primary transition-transform duration-200 hover:-translate-y-0.5"
        >
          {block.value}
        </a>
      )
  }
}

/**
 * Turn bare URLs, domains and e-mail addresses in legal copy into real links,
 * without altering the wording itself.
 */
function linkify(text: string): ReactNode {
  const parts = text.split(
    /(https?:\/\/[^\s,)]+|[\w.+-]+@[\w-]+\.[\w.]+|\blda\.bayern\.de\b)/g,
  )
  if (parts.length === 1) return text

  const cls =
    'font-medium text-gold-deep underline underline-offset-2 transition-colors hover:text-primary'

  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={cls}>
          {part}
        </a>
      )
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className={cls}>
          {part}
        </a>
      )
    }
    if (/^lda\.bayern\.de$/.test(part)) {
      return (
        <a key={i} href={`https://${part}`} target="_blank" rel="noopener noreferrer" className={cls}>
          {part}
        </a>
      )
    }
    return part
  })
}
