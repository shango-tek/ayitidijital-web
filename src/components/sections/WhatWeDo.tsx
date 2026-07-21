'use client'

import { useState } from 'react'
import type { SiteContent } from '@/content/site'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionPanel } from '@/components/ui/SectionPanel'
import { cn } from '@/lib/utils'

type StatusKey = 'active' | 'dev' | 'coming'

/** ORDER IS LOAD-BEARING — index-aligned with `content.projects`
 *  (LexHaiti → Achiv Dijital → Lekòl Kòd = active → dev → coming). */
const STATUS_BY_INDEX: StatusKey[] = ['active', 'dev', 'coming']
const FILTER_KEYS: StatusKey[] = ['active', 'dev', 'coming']

/**
 * "Travay Nou" (what we do) body — React port of the Angular
 * `ce-que-nous-faisons` page: intro, a status-filterable projects grid using the
 * site's CardSpotlight, and a programs grid with watermark numbers. Copy comes
 * from the existing trilingual `content`; the status/filter structure lives here.
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
      <section className="mx-auto max-w-[90rem] px-5 md:px-10 pt-16 lg:pt-24 pb-4">
        <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
          {c.projectsSection.sub}
        </p>
      </section>

      {/* ── Nos projets ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[90rem] px-5 md:px-10 py-16 lg:py-24">
        <SectionHeader
          variant="split"
          size="sm"
          label={c.projectsSection.kicker}
          title={c.projectsSection.title}
          subtitle={c.projectsSection.sub}
        />

        {/* status filter chips */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          <FilterChip active={!filter} onClick={() => setFilter('')}>
            {c.projectFilters.all}
          </FilterChip>
          {FILTER_KEYS.map((key) => (
            <FilterChip
              key={key}
              active={filter === key}
              onClick={() => setFilter(filter === key ? '' : key)}
            >
              {c.projectFilters[key]}
            </FilterChip>
          ))}
        </div>

        {/* project cards */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.title}
              className="group relative isolate overflow-hidden rounded-2xl p-1.5 border border-black/10 bg-gradient-to-br from-black/[0.05] to-black/[0.02] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_8px_16px_rgb(0_0_0_/_0.15)] transition-shadow duration-300 hover:shadow-[0_12px_22px_rgb(0_0_0_/_0.18)]"
            >
              {/* inner frosted card */}
              <div className="relative flex h-full flex-col rounded-xl p-6 border border-black/[0.06] bg-gradient-to-br from-white/70 to-white/25 backdrop-blur-md backdrop-saturate-150">
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/[0.06] text-primary [&_svg]:h-6 [&_svg]:w-6">
                    {proj.icon}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {c.projectFilters[proj.statusKey]}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl font-extrabold leading-tight text-primary">
                  {proj.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-ink-soft">{proj.kr}</p>
                {proj.tr ? (
                  <p className="mb-6 text-sm italic leading-relaxed text-ink-soft/70" lang={proj.trLang}>
                    {proj.tr}
                  </p>
                ) : null}
                <div className="mt-auto">
                  {proj.statusKey === 'active' ? (
                    <a
                      href={proj.link.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/85"
                    >
                      {proj.link.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink-soft">
                      {proj.link.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Nos programmes ────────────────────────────────────── */}
      {/* The warm panel, for the same two reasons it is used on the home page:
          it breaks a white run that otherwise ran the length of this page, and
          it puts an edge under the white programme cards. It also lands on a
          real content boundary — programmes are not projects — so the surface
          change reinforces the split rather than decorating it.
          The panel supplies the gutter and the vertical padding, and replaces
          the hairline this section used to carry. */}
      <SectionPanel>
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <SectionHeader
            variant="stacked"
            size="sm"
            label={c.hubSection.kicker}
            title={c.hubSection.title}
            subtitle={c.hubSection.sub}
          />

          <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {c.hubPrograms.map((prog, i) => (
              <article
                key={prog.title}
                className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-6 lg:p-8 transition-colors duration-300 hover:border-accent/30"
              >
                {/* watermark number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-3 select-none font-display text-[7rem] font-extrabold leading-none text-primary/[0.05]"
                >
                  0{i + 1}
                </span>

                <div className="relative mb-6 flex items-center">
                  <span className="inline-flex items-center rounded-full border border-ink/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    {c.projectFilters.coming}
                  </span>
                </div>

                <h3 className="relative mb-3 font-display text-xl font-extrabold leading-tight text-primary">
                  {prog.title}
                </h3>
                <p className="relative mb-2 text-sm leading-relaxed text-ink-soft">{prog.kr}</p>
                {prog.en ? (
                  <p className="relative text-sm italic leading-relaxed text-ink-soft/70" lang="en">
                    {prog.en}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </SectionPanel>
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
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200',
        active
          ? 'border-primary bg-primary text-white'
          : 'border-ink/15 text-ink-soft hover:border-primary/40 hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
