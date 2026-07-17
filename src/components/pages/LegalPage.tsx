'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import type { LegalBlock, LegalDoc } from '@/content/legal'

/**
 * Shell for the two statutory documents (Impressum / privacy policy).
 *
 * Same page furniture as the rest of the site — the dark {@link PageHeader}
 * band, the 90rem measure, the ambient gold/navy glows from PasseALaction —
 * with a sticky section nav under the header that tracks scroll. Each section
 * is a split row (number + title parked on the left, prose on the right), which
 * mirrors the split SectionHeader used across the site and keeps the text at a
 * readable measure even at full width.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const bare = doc.h1.replace(/\.\s*$/, '')
  const [strokeWord, ...rest] = bare.split(' ')
  const [active, setActive] = useState(doc.sections[0]?.id ?? '')

  const navRef = useRef<HTMLOListElement>(null)
  const chipRefs = useRef<Record<string, HTMLLIElement | null>>({})

  // Scroll-spy: the active section is the LAST one whose top has crossed the
  // reading line just under the sticky nav.
  //
  // Deliberately not an IntersectionObserver keyed on "topmost intersecting
  // section": sections are tall, so section 01 stays intersecting — and stays
  // topmost — long after 02 has taken over the viewport, pinning the nav to 01.
  useEffect(() => {
    const READING_LINE = 140 // px from viewport top, clears the ~53px nav

    const onScroll = () => {
      let current = doc.sections[0]?.id ?? ''
      for (const s of doc.sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        if (el.getBoundingClientRect().top > READING_LINE) break
        current = s.id
      }
      // Bottom of the page can't scroll far enough to bring the last section's
      // top over the line — resolve it so the final chip is reachable.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      if (atBottom) current = doc.sections[doc.sections.length - 1]?.id ?? current
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [doc.sections])

  // Keep the active chip visible as you scroll, centring it in the rail.
  //
  // Driving the nav's own scrollLeft rather than chip.scrollIntoView() keeps
  // this strictly horizontal — scrollIntoView would also scroll the page
  // vertically and fight the reader.
  //
  // Measured off getBoundingClientRect, not offsetLeft: the chips' offsetParent
  // is the sticky <nav>, not the scrolling <ol>, so offsetLeft is relative to
  // the wrong box and ignores the rail's current scroll.
  useEffect(() => {
    const nav = navRef.current
    const chip = chipRefs.current[active]
    if (!nav || !chip) return

    const navBox = nav.getBoundingClientRect()
    const chipBox = chip.getBoundingClientRect()
    const delta = chipBox.left + chipBox.width / 2 - (navBox.left + navBox.width / 2)
    const max = nav.scrollWidth - nav.clientWidth
    const target = Math.max(0, Math.min(nav.scrollLeft + delta, max))
    if (Math.abs(target - nav.scrollLeft) < 2) return

    nav.scrollTo({
      left: target,
      // Respect a reduced-motion preference — this is decorative movement.
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [active])

  return (
    <>
      <PageHeader label={doc.eyebrow} strokeWord={strokeWord} titleRest={rest.join(' ')} />

      {/* Section nav — sticky, horizontal, follows the active section */}
      <nav
        aria-label={doc.tocTitle}
        className="sticky top-0 z-30 border-b border-black/[0.07] bg-white/85 backdrop-blur-md"
      >
        <ol
          ref={navRef}
          className="mx-auto flex max-w-[90rem] gap-1 overflow-x-auto px-5 py-3 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {doc.sections.map((s) => {
            const on = active === s.id
            return (
              <li
                key={s.id}
                ref={(el) => {
                  chipRefs.current[s.id] = el
                }}
                className="shrink-0"
              >
                <a
                  href={`#${s.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={[
                    'inline-flex items-baseline gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200',
                    on
                      ? 'bg-primary text-white'
                      : 'text-ink-soft hover:bg-black/[0.04] hover:text-primary',
                  ].join(' ')}
                >
                  <span className={['font-mono text-[10px]', on ? 'text-gold' : 'text-gold-deep'].join(' ')}>
                    {s.number}
                  </span>
                  {s.title}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="relative overflow-hidden bg-white">
        {/* ambient glows — same pair as Passe à l'action */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.07] blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary/[0.06] blur-3xl"
        />

        <div className="relative mx-auto max-w-[90rem] px-5 pb-24 pt-14 md:px-10 lg:pb-32 lg:pt-20">
          {/* Lead — the one piece of display type in the body */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/60 lg:pt-3">
              {doc.lastUpdatedLabel}
              <span className="mt-1 block normal-case tracking-normal text-ink-soft">
                {doc.lastUpdatedValue}
              </span>
            </p>
            <p className="max-w-3xl font-display text-[clamp(1.3rem,2.3vw,1.85rem)] font-medium leading-[1.38] tracking-tight text-primary">
              {doc.lead}
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-12 lg:mt-20 lg:gap-16">
            {doc.sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-24 grid gap-5 border-t border-black/[0.08] pt-9 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16"
              >
                {/* Left rail — number + title, parked while its prose scrolls */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <span className="inline-flex items-center rounded-full border border-gold-deep/30 px-2 py-0.5 font-mono text-[10px] text-gold-deep">
                    {s.number}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-primary lg:text-2xl">
                    {s.title}
                  </h2>
                  {s.subtitle ? (
                    // NOT uppercased: these carry statute citations whose casing
                    // is meaningful ("MStV", "DDG") — text-transform would
                    // render "§ 18 al. 2 MStV" as "§ 18 AL. 2 MSTV".
                    <p className="mt-2 font-mono text-[11px] tracking-[0.06em] text-ink-soft/70">
                      {s.subtitle}
                    </p>
                  ) : null}
                </div>

                <div className="flex max-w-3xl flex-col gap-5">
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'text':
      return <p className="leading-relaxed text-ink-soft">{linkify(block.body)}</p>

    case 'note':
      return (
        <p className="border-l-2 border-gold-deep/35 pl-4 text-sm leading-relaxed text-ink-soft">
          {linkify(block.body)}
        </p>
      )

    case 'dl':
      return (
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,10rem)_1fr]">
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
        <ul className="grid gap-4 sm:grid-cols-3">
          {block.items.map((p) => (
            <li
              key={p.title}
              className="rounded-card border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_-40px_rgba(10,58,96,0.35)]"
            >
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
 * Turn bare URLs, the supervisory authority's domain and e-mail addresses into
 * real links, without altering the wording itself.
 */
function linkify(text: string): ReactNode {
  const parts = text.split(/(https?:\/\/[^\s,)]+|[\w.+-]+@[\w-]+\.[\w.]+|\blda\.bayern\.de\b)/g)
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
