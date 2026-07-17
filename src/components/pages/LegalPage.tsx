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
export function LegalPage({ doc, accordion = false }: { doc: LegalDoc; accordion?: boolean }) {
  const bare = doc.h1.replace(/\.\s*$/, '')
  const [strokeWord, ...rest] = bare.split(' ')
  const [active, setActive] = useState(doc.sections[0]?.id ?? '')

  const navRef = useRef<HTMLOListElement>(null)
  const chipRefs = useRef<Record<string, HTMLLIElement | null>>({})

  // Which sections are expanded. Only meaningful when `accordion` — the imprint
  // is eight short sections and reads better fully open. Several may be open at
  // once: this is a reference document, so opening one clause must not close the
  // one you were comparing it against.
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(doc.sections[0] ? [doc.sections[0].id] : []),
  )
  const isOpen = (id: string) => !accordion || openIds.has(id)
  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  // A collapsed section must still be reachable: opening via #anchor covers deep
  // links from outside, the section nav, and the browser's own hash navigation.
  useEffect(() => {
    if (!accordion) return
    const openFromHash = () => {
      const id = window.location.hash.slice(1)
      if (!id || !doc.sections.some((s) => s.id === id)) return
      setOpenIds((prev) => new Set(prev).add(id))
      // Let the panel expand before the browser settles on the anchor.
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [accordion, doc.sections])

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
        className="legal-nav sticky top-0 z-30 border-b border-black/[0.07] bg-white/85 backdrop-blur-md"
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

      <div className="legal-body relative overflow-hidden bg-white">
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
                <div className={accordion ? '' : 'lg:sticky lg:top-24 lg:self-start'}>
                  <span className="inline-flex items-center rounded-full border border-gold-deep/30 px-2 py-0.5 font-mono text-[10px] text-gold-deep">
                    {s.number}
                  </span>
                  <Heading
                    accordion={accordion}
                    open={isOpen(s.id)}
                    onToggle={() => toggle(s.id)}
                    panelId={`${s.id}-panel`}
                    title={s.title}
                  />
                  {s.subtitle ? (
                    // NOT uppercased: these carry statute citations whose casing
                    // is meaningful ("MStV", "DDG") — text-transform would
                    // render "§ 18 al. 2 MStV" as "§ 18 AL. 2 MSTV".
                    <p className="mt-2 font-mono text-[11px] tracking-[0.06em] text-ink-soft/70">
                      {s.subtitle}
                    </p>
                  ) : null}
                </div>

                {/* Collapsed via grid-rows rather than `hidden`, deliberately:
                    display:none would drop the text out of the document, so
                    Ctrl+F wouldn't find it. This is a statutory document that
                    must stay readily available (§ 5 DDG) — the words stay in the
                    page, the row simply has no height. Same technique as the
                    FAQ accordion. */}
                <div
                  id={`${s.id}-panel`}
                  className={[
                    'legal-panel grid max-w-3xl transition-[grid-template-rows] duration-300 ease-out',
                    isOpen(s.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  ].join(' ')}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-5">
                      {s.blocks.map((b, i) => (
                        <Block key={i} block={b} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Section heading. A plain <h2> when the document reads open (the imprint); a
 * button that expands its panel when it collapses (the privacy policy, which is
 * long enough that a wall of text buries the parts people came for).
 */
function Heading({
  accordion,
  open,
  onToggle,
  panelId,
  title,
}: {
  accordion: boolean
  open: boolean
  onToggle: () => void
  panelId: string
  title: string
}) {
  const heading = 'font-display text-xl font-bold leading-snug tracking-tight text-primary lg:text-2xl'

  if (!accordion) return <h2 className={`mt-3 ${heading}`}>{title}</h2>

  return (
    <h2 className="mt-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`legal-doc-toggle group flex w-full items-start justify-between gap-4 text-left ${heading}`}
      >
        {title}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`mt-1.5 h-4 w-4 shrink-0 text-gold-deep transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
    </h2>
  )
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'text':
      return <p className="leading-relaxed text-ink-soft">{linkify(block.body)}</p>

    case 'note':
      return <p className="text-sm leading-relaxed text-ink-soft/85">{linkify(block.body)}</p>

    // Sub-label within a section. `mt-2 first:mt-0` so it breathes above the
    // group it introduces without doubling the gap before the first one.
    case 'subheading':
      return (
        <p className="mt-2 font-display text-sm font-bold text-primary first:mt-0">{block.title}</p>
      )

    // The provider block. A real <address> — the element exists for precisely
    // this, and it is what makes the page machine-readable as contact details.
    // `not-italic` because browsers italicise <address> by default.
    case 'address':
      return (
        <address className="not-italic leading-relaxed text-primary">
          {block.lines.map((line, i) => (
            <span key={i} className="block">
              {linkify(line)}
            </span>
          ))}
        </address>
      )

    case 'lines':
      return (
        <div className="leading-relaxed text-primary">
          {block.lines.map((line, i) => (
            <span key={i} className="block">
              {linkify(line)}
            </span>
          ))}
        </div>
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

    // Run-in list, not cards. These are clauses of a statutory document — card
    // chrome (borders, fills, lift shadows) is product styling and reads as
    // marketing here. The bold run-in title carries the scanning weight, with a
    // small gold dot echoing the site's kicker.
    case 'points':
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((p) => (
            <li
              key={p.title}
              className="relative pl-4 leading-relaxed before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-gold-deep/60"
            >
              <span className="font-semibold text-primary">{p.title}</span>{' '}
              <span className="text-ink-soft">{p.body}</span>
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
