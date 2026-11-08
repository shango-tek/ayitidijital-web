'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import type { SiteContent } from '@/content/site'
import { cn } from '@/lib/utils'

type StatusKey = 'active' | 'dev' | 'coming'

/** ORDER IS LOAD-BEARING — index-aligned with `content.projects`
 *  (LexHaiti → Achiv Dijital → Lekòl Kòd = active → dev → coming). */
const STATUS_BY_INDEX: StatusKey[] = ['active', 'dev', 'coming']
const FILTER_KEYS: StatusKey[] = ['active', 'dev', 'coming']

function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-tum text-xs font-bold uppercase tracking-[0.2em] text-tum-ink">
      <span className="h-2.5 w-2.5 bg-drapo-red" aria-hidden="true" />
      {label}
    </span>
  )
}

/** house headline: emphasis on a `**marked**` word (or the last word if none),
 *  serif-italic electric, with a trailing period in drapo red. */
function Headline({ text }: { text: string }) {
  const t = text.trimEnd()
  const hasDot = t.endsWith('.')
  const base = hasDot ? t.slice(0, -1) : t
  const marked = base.match(/\*\*(.+?)\*\*/)
  let lead: string
  let emph: string
  let tail: string
  if (marked) {
    const idx = base.indexOf(marked[0])
    lead = base.slice(0, idx)
    emph = marked[1]
    tail = base.slice(idx + marked[0].length)
  } else {
    const words = base.split(' ')
    emph = words.pop() ?? base
    lead = words.length ? `${words.join(' ')} ` : ''
    tail = ''
  }
  return (
    <h2 className="mt-6 max-w-4xl font-tum text-[clamp(2.4rem,5.2vw,4.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-tum-ink">
      {lead}
      <span className="font-serif italic font-semibold text-electric">{emph}</span>
      {tail}
      {hasDot && <span className="text-drapo-red">.</span>}
    </h2>
  )
}

/**
 * "Travay Nou" (what we do) body — intro, a status-filterable projects grid, and
 * a programs grid with watermark numbers, in the house register:
 * alternating white / lavender grounds, Albert Sans, sharp cards, electric
 * accents. Filter state and copy sources are unchanged.
 */
export function WhatWeDo({ content: c }: { content: SiteContent }) {
  const [filter, setFilter] = useState<'' | StatusKey>('')

  const projects = c.projects.map((p, i) => ({
    ...p,
    statusKey: STATUS_BY_INDEX[i] ?? 'coming',
  }))
  const filtered = filter ? projects.filter((p) => p.statusKey === filter) : projects

  return (
    <div className="site-page">
      {/* ── Intro ─────────────────────────────────────────────── */}
      <section className="bg-tum-paper">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10 pt-16 lg:pt-24 pb-4">
          <p className="max-w-3xl font-tum text-lg leading-relaxed text-tum-muted">{c.projectsSection.sub}</p>
        </div>
      </section>

      {/* ── Nos projets ───────────────────────────────────────── */}
      <section className="bg-tum-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <Eyebrow label={c.projectsSection.kicker} />
          <Headline text={c.projectsSection.title} />
          <p className="mt-6 max-w-2xl font-tum text-lg leading-relaxed text-tum-muted">{c.projectsSection.sub}</p>

          {/* status filter chips */}
          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            <FilterChip active={!filter} onClick={() => setFilter('')}>
              {c.projectFilters.all}
            </FilterChip>
            {FILTER_KEYS.map((key) => (
              <FilterChip key={key} active={filter === key} onClick={() => setFilter(filter === key ? '' : key)}>
                {c.projectFilters[key]}
              </FilterChip>
            ))}
          </div>

          {/* project cards */}
          <div className="mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((proj) => (
              <div
                key={proj.title}
                className="group flex h-full flex-col border-4 border-double border-tum-ink bg-tum-paper p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-electric lg:p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center bg-tum-ink text-white [&_svg]:h-6 [&_svg]:w-6">
                    {proj.icon}
                  </span>
                  <span className="inline-flex items-center border border-tum-ink/20 px-2.5 py-1 font-tum text-[10px] font-bold uppercase tracking-[0.16em] text-electric">
                    {c.projectFilters[proj.statusKey]}
                  </span>
                </div>
                <h3 className="mb-2 font-tum text-xl font-extrabold leading-tight text-tum-ink">{proj.title}</h3>
                <p className="mb-3 font-tum text-sm leading-relaxed text-tum-muted">{proj.kr}</p>
                {proj.tr ? (
                  <p className="mb-6 font-tum text-sm italic leading-relaxed text-tum-muted/80" lang={proj.trLang}>
                    {proj.tr}
                  </p>
                ) : null}
                <div className="mt-auto">
                  {proj.statusKey === 'active' ? (
                    <a
                      href={proj.link.href}
                      className="group/cta inline-flex items-center gap-2 bg-electric px-5 py-2.5 font-tum text-xs font-bold uppercase tracking-wide text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
                    >
                      {proj.link.label}
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover/cta:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <span className="inline-flex items-center border border-tum-ink/20 px-3.5 py-1.5 font-tum text-xs font-medium text-tum-muted">
                      {proj.link.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nos programmes ────────────────────────────────────── */}
      <section className="bg-lavender py-16 lg:py-24">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <Eyebrow label={c.hubSection.kicker} />
          <Headline text={c.hubSection.title} />
          <p className="mt-6 max-w-2xl font-tum text-lg leading-relaxed text-tum-muted">{c.hubSection.sub}</p>

          <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {c.hubPrograms.map((prog, i) => (
              <article
                key={prog.title}
                className="group relative overflow-hidden border-4 border-double border-tum-ink bg-tum-paper p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-electric lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-3 select-none font-tum text-[6rem] font-black leading-none text-tum-ink/[0.06]"
                >
                  0{i + 1}
                </span>

                <div className="relative mb-6 flex items-center">
                  <span className="inline-flex items-center border border-tum-ink/20 px-2.5 py-1 font-tum text-[10px] font-bold uppercase tracking-[0.16em] text-tum-muted">
                    {c.projectFilters.coming}
                  </span>
                </div>

                <h3 className="relative mb-3 font-tum text-xl font-extrabold leading-tight text-tum-ink">{prog.title}</h3>
                <p className="relative mb-2 font-tum text-sm leading-relaxed text-tum-muted">{prog.kr}</p>
                {prog.en ? (
                  <p className="relative font-tum text-sm italic leading-relaxed text-tum-muted/80" lang="en">
                    {prog.en}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'border-2 px-4 py-2 font-tum text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-200',
        active
          ? 'border-electric bg-electric text-white'
          : 'border-tum-ink text-tum-ink hover:border-electric hover:text-electric',
      )}
    >
      {children}
    </button>
  )
}
