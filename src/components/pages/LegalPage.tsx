'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import type { LegalBlock, LegalDoc } from '@/content/legal'

/**
 * Shell for the two statutory documents (Impressum / privacy policy).
 *
 * Sections are ROWS, not a title/prose split: a full-width header you click,
 * with its panel directly underneath. The split (title parked left, prose
 * right) reads well for a document that is always open, but it fights an
 * accordion — the toggle ends up stranded at the far edge of the title rail,
 * away from the text it reveals, and a collapsed row leaves the whole right
 * half empty. Rows keep the control, the label and the content together, which
 * is what makes an accordion learnable.
 *
 * `accordion` only changes whether the rows collapse. Both documents share the
 * same anatomy so they read as one pair.
 */
export function LegalPage({ doc, accordion = false }: { doc: LegalDoc; accordion?: boolean }) {
  const bare = doc.h1.replace(/\.\s*$/, '')
  const [strokeWord, ...rest] = bare.split(' ')
  const [active, setActive] = useState(doc.sections[0]?.id ?? '')

  const navRef = useRef<HTMLOListElement>(null)
  const chipRefs = useRef<Record<string, HTMLLIElement | null>>({})

  // Several sections may be open at once: this is a reference document, so
  // opening one clause must not close the one you were comparing it against.
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(doc.sections[0] ? [doc.sections[0].id] : []),
  )
  const isOpen = (id: string) => !accordion || openIds.has(id)
  const allOpen = doc.sections.every((s) => openIds.has(s.id))

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleAll = () =>
    setOpenIds(allOpen ? new Set() : new Set(doc.sections.map((s) => s.id)))

  // A collapsed section must still be reachable: opening via #anchor covers deep
  // links from outside, the section nav, and the browser's own hash navigation.
  useEffect(() => {
    if (!accordion) return
    const openFromHash = () => {
      const id = window.location.hash.slice(1)
      if (!id || !doc.sections.some((s) => s.id === id)) return
      setOpenIds((prev) => new Set(prev).add(id))
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

  // Keep the active chip visible, centred in the rail. Driving the nav's own
  // scrollLeft (not chip.scrollIntoView) keeps this strictly horizontal —
  // scrollIntoView would also scroll the page and fight the reader. Measured off
  // getBoundingClientRect, not offsetLeft: the chips' offsetParent is the sticky
  // <nav>, not the scrolling <ol>.
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
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.07] blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-primary/[0.06] blur-3xl"
        />

        {/* 64rem: a legal document is read, not scanned — a 90rem row would put
            the toggle a screen-width away from its title, and the prose past a
            comfortable measure. */}
        <div className="relative mx-auto max-w-[64rem] px-5 pb-24 pt-14 md:px-10 lg:pb-32 lg:pt-20">
          <p className="max-w-3xl font-display text-[clamp(1.3rem,2.3vw,1.75rem)] font-medium leading-[1.4] tracking-tight text-primary">
            {doc.lead}
          </p>

          {/* Meta row: when it was last touched, and — for the accordion — a way
              to open everything at once, which readers reach for before Ctrl+F
              or printing. */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft/60">
              {doc.lastUpdatedLabel}
              <span className="ml-2 normal-case tracking-normal text-ink-soft">
                {doc.lastUpdatedValue}
              </span>
            </p>
            {accordion ? (
              <button
                type="button"
                onClick={toggleAll}
                className="rounded-full border border-black/10 px-3.5 py-1.5 font-display text-xs font-semibold text-ink-soft transition-colors hover:border-primary/30 hover:text-primary"
              >
                {allOpen ? doc.collapseAllLabel : doc.expandAllLabel}
              </button>
            ) : null}
          </div>

          <div className="flex flex-col">
            {doc.sections.map((s) => {
              const open = isOpen(s.id)
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24 border-b border-black/[0.08]"
                >
                  <SectionHeading
                    accordion={accordion}
                    open={open}
                    onToggle={() => toggle(s.id)}
                    panelId={`${s.id}-panel`}
                    number={s.number}
                    title={s.title}
                    subtitle={s.subtitle}
                  />

                  {/* Collapsed via grid-rows rather than `hidden`: display:none
                      would drop the text out of the document and break Ctrl+F,
                      and this must stay readily available (§ 5 DDG). The words
                      stay; the row simply has no height. */}
                  <div
                    id={`${s.id}-panel`}
                    role="region"
                    aria-labelledby={`${s.id}-heading`}
                    className={[
                      'legal-panel grid transition-[grid-template-rows] duration-300 ease-out',
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    ].join(' ')}
                  >
                    <div className="overflow-hidden">
                      {/* Aligned under the title, not the number. */}
                      <div className="flex max-w-3xl flex-col gap-5 pb-9 sm:pl-[3.4rem]">
                        {s.blocks.map((b, i) => (
                          <Block key={i} block={b} />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * The row header. Number, title and (optional) subtitle on the left, the
 * affordance on the right edge of the row — one predictable place, next to the
 * thing it opens.
 */
function SectionHeading({
  accordion,
  open,
  onToggle,
  panelId,
  number,
  title,
  subtitle,
}: {
  accordion: boolean
  open: boolean
  onToggle: () => void
  panelId: string
  number: string
  title: string
  subtitle?: string
}) {
  const inner = (
    <>
      <span className="w-8 shrink-0 pt-1 font-mono text-xs text-gold-deep">{number}</span>
      <span className="flex-1">
        <span className="block font-display text-lg font-bold leading-snug tracking-tight text-primary lg:text-xl">
          {title}
        </span>
        {subtitle ? (
          // NOT uppercased: these carry statute citations whose casing is
          // meaningful ("MStV", "DDG") — text-transform would render
          // "§ 18 al. 2 MStV" as "§ 18 AL. 2 MSTV".
          <span className="mt-1 block font-mono text-[11px] tracking-[0.06em] text-ink-soft/70">
            {subtitle}
          </span>
        ) : null}
      </span>
    </>
  )

  if (!accordion) {
    return (
      <h2 id={`${panelId}-heading`} className="flex items-start gap-5 pb-5 pt-9">
        {inner}
      </h2>
    )
  }

  return (
    <h2 id={`${panelId}-heading`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="legal-doc-toggle group flex w-full items-start gap-5 py-6 text-left transition-colors hover:[&_.legal-doc-title]:text-gold-deep"
      >
        <span className="w-8 shrink-0 pt-1 font-mono text-xs text-gold-deep">{number}</span>
        <span className="flex-1">
          <span className="legal-doc-title block font-display text-lg font-bold leading-snug tracking-tight text-primary transition-colors lg:text-xl">
            {title}
          </span>
          {subtitle ? (
            <span className="mt-1 block font-mono text-[11px] tracking-[0.06em] text-ink-soft/70">
              {subtitle}
            </span>
          ) : null}
        </span>
        {/* One fixed spot, right edge of the row. */}
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-black/10 text-primary transition-colors group-hover:border-gold-deep/50 group-hover:bg-gold/10"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          >
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
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

    // Run-in list, not cards. These are clauses of a statutory document — card
    // chrome reads as marketing here. The bold run-in title carries the
    // scanning weight, with a small gold dot echoing the site's kicker.
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
